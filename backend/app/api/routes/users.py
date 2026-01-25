import uuid
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, UploadFile
from sqlmodel import col, delete, func, select

from app import crud
from app.api.deps import (
    CurrentUser,
    SessionDep,
    get_current_active_superuser,
)
from app.api.routes.avatars import get_avatar_url
from app.core.config import settings
from app.core.security import get_password_hash, verify_password
from app.models import (
    Item,
    Message,
    UpdatePassword,
    User,
    UserCreate,
    UserPublic,
    UserRegister,
    UsersPublic,
    UserUpdate,
    UserUpdateMe,
)
from app.utils import (
    AvatarValidationError,
    delete_avatar_file,
    generate_new_account_email,
    save_avatar_file,
    send_email,
    validate_and_process_avatar,
)

router = APIRouter(prefix="/users", tags=["users"])


@router.get(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=UsersPublic,
)
def read_users(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve users.
    """

    count_statement = select(func.count()).select_from(User)
    count = session.exec(count_statement).one()

    statement = select(User).offset(skip).limit(limit)
    users = session.exec(statement).all()

    # Convert to UserPublic with avatar_url
    user_publics = [_user_public_with_avatar(user) for user in users]
    return UsersPublic(data=user_publics, count=count)


@router.post(
    "/", dependencies=[Depends(get_current_active_superuser)], response_model=UserPublic
)
def create_user(*, session: SessionDep, user_in: UserCreate) -> Any:
    """
    Create new user.
    """
    user = crud.get_user_by_email(session=session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )

    user = crud.create_user(session=session, user_create=user_in)
    if settings.emails_enabled and user_in.email:
        email_data = generate_new_account_email(
            email_to=user_in.email, username=user_in.email, password=user_in.password
        )
        send_email(
            email_to=user_in.email,
            subject=email_data.subject,
            html_content=email_data.html_content,
        )
    return _user_public_with_avatar(user)


@router.patch("/me", response_model=UserPublic)
def update_user_me(
    *, session: SessionDep, user_in: UserUpdateMe, current_user: CurrentUser
) -> Any:
    """
    Update own user.
    """

    if user_in.email:
        existing_user = crud.get_user_by_email(session=session, email=user_in.email)
        if existing_user and existing_user.id != current_user.id:
            raise HTTPException(
                status_code=409, detail="User with this email already exists"
            )
    user_data = user_in.model_dump(exclude_unset=True)
    current_user.sqlmodel_update(user_data)
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    return _user_public_with_avatar(current_user)


@router.patch("/me/password", response_model=Message)
def update_password_me(
    *, session: SessionDep, body: UpdatePassword, current_user: CurrentUser
) -> Any:
    """
    Update own password.
    """
    if not verify_password(body.current_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect password")
    if body.current_password == body.new_password:
        raise HTTPException(
            status_code=400, detail="New password cannot be the same as the current one"
        )
    hashed_password = get_password_hash(body.new_password)
    current_user.hashed_password = hashed_password
    session.add(current_user)
    session.commit()
    return Message(message="Password updated successfully")


@router.get("/me", response_model=UserPublic)
def read_user_me(current_user: CurrentUser) -> Any:
    """
    Get current user.
    """
    return _user_public_with_avatar(current_user)


@router.delete("/me", response_model=Message)
def delete_user_me(session: SessionDep, current_user: CurrentUser) -> Any:
    """
    Delete own user.
    """
    if current_user.is_superuser:
        raise HTTPException(
            status_code=403, detail="Super users are not allowed to delete themselves"
        )
    session.delete(current_user)
    session.commit()
    return Message(message="User deleted successfully")


@router.post("/me/avatar", response_model=UserPublic)
async def upload_avatar(
    session: SessionDep,
    current_user: CurrentUser,
    file: UploadFile,
) -> Any:
    """
    Upload or replace the current user's avatar.

    - Accepts JPEG, PNG, GIF, or WebP images
    - Maximum file size: 5MB
    - Maximum input dimensions: 4096x4096
    - Image will be center-cropped to square and resized to 512x512
    - Transparency is flattened to white background
    - Output format: WebP (or JPEG fallback)
    - Rate limited: 10 attempts per hour
    """
    # Check rate limit
    if not crud.check_avatar_rate_limit(
        session=session,
        user_id=current_user.id,
        max_attempts=settings.AVATAR_RATE_LIMIT_MAX_ATTEMPTS,
        window_hours=settings.AVATAR_RATE_LIMIT_WINDOW_HOURS,
    ):
        raise HTTPException(
            status_code=429,
            detail="Too many avatar change attempts. Please try again later.",
        )

    # Read file data
    content_type = file.content_type or "application/octet-stream"
    try:
        file_data = await file.read()
    except Exception:
        raise HTTPException(status_code=400, detail="Failed to read uploaded file")

    # Validate and process
    try:
        processed = validate_and_process_avatar(file_data, content_type)
    except AvatarValidationError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Delete old avatar file if exists
    if current_user.avatar_key:
        delete_avatar_file(current_user.avatar_key)

    # Save new avatar
    avatar_key = save_avatar_file(current_user.id, processed.data, processed.extension)

    # Update user metadata
    updated_user = crud.update_user_avatar_metadata(
        session=session,
        user=current_user,
        avatar_key=avatar_key,
        content_type=processed.content_type,
    )

    # Return user with avatar_url populated
    return _user_public_with_avatar(updated_user)


@router.delete("/me/avatar", response_model=UserPublic)
def delete_avatar(
    session: SessionDep,
    current_user: CurrentUser,
) -> Any:
    """
    Remove the current user's avatar.

    The avatar will be removed and the user will return to the default placeholder.
    Rate limited: 10 attempts per hour (shared with upload).
    """
    # Check rate limit (delete also counts toward limit)
    if not crud.check_avatar_rate_limit(
        session=session,
        user_id=current_user.id,
        max_attempts=settings.AVATAR_RATE_LIMIT_MAX_ATTEMPTS,
        window_hours=settings.AVATAR_RATE_LIMIT_WINDOW_HOURS,
    ):
        raise HTTPException(
            status_code=429,
            detail="Too many avatar change attempts. Please try again later.",
        )

    # Delete avatar file if exists
    if current_user.avatar_key:
        delete_avatar_file(current_user.avatar_key)

    # Clear avatar metadata (increments version)
    updated_user = crud.update_user_avatar_metadata(
        session=session,
        user=current_user,
        avatar_key=None,
        content_type=None,
    )

    return _user_public_with_avatar(updated_user)


def _user_public_with_avatar(user: User) -> UserPublic:
    """Convert User to UserPublic with avatar_url populated."""
    avatar_url = get_avatar_url(user)
    return UserPublic(
        id=user.id,
        email=user.email,
        is_active=user.is_active,
        is_superuser=user.is_superuser,
        full_name=user.full_name,
        locale=user.locale,
        avatar_url=avatar_url,
        avatar_version=user.avatar_version,
    )


@router.post("/signup", response_model=UserPublic)
def register_user(session: SessionDep, user_in: UserRegister) -> Any:
    """
    Create new user without the need to be logged in.
    """
    user = crud.get_user_by_email(session=session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system",
        )
    user_create = UserCreate.model_validate(user_in)
    user = crud.create_user(session=session, user_create=user_create)
    return _user_public_with_avatar(user)


@router.get("/{user_id}", response_model=UserPublic)
def read_user_by_id(
    user_id: uuid.UUID, session: SessionDep, current_user: CurrentUser
) -> Any:
    """
    Get a specific user by id.
    """
    user = session.get(User, user_id)
    if user == current_user:
        return _user_public_with_avatar(user)
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=403,
            detail="The user doesn't have enough privileges",
        )
    return _user_public_with_avatar(user) if user else None


@router.patch(
    "/{user_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=UserPublic,
)
def update_user(
    *,
    session: SessionDep,
    user_id: uuid.UUID,
    user_in: UserUpdate,
) -> Any:
    """
    Update a user.
    """

    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="The user with this id does not exist in the system",
        )
    if user_in.email:
        existing_user = crud.get_user_by_email(session=session, email=user_in.email)
        if existing_user and existing_user.id != user_id:
            raise HTTPException(
                status_code=409, detail="User with this email already exists"
            )

    updated_user: User = crud.update_user(
        session=session, db_user=db_user, user_in=user_in
    )
    return _user_public_with_avatar(updated_user)


@router.delete("/{user_id}", dependencies=[Depends(get_current_active_superuser)])
def delete_user(
    session: SessionDep, current_user: CurrentUser, user_id: uuid.UUID
) -> Message:
    """
    Delete a user.
    """
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user == current_user:
        raise HTTPException(
            status_code=403, detail="Super users are not allowed to delete themselves"
        )
    statement = delete(Item).where(col(Item.owner_id) == user_id)
    session.exec(statement)  # type: ignore
    session.delete(user)
    session.commit()
    return Message(message="User deleted successfully")
