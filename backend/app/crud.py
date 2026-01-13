import uuid
from typing import Any

from sqlmodel import Session, select

from app.core.security import get_password_hash, verify_password
from app.models import Item, ItemCreate, User, UserCreate, UserUpdate


def create_user(*, session: Session, user_create: UserCreate) -> User:
    db_obj = User.model_validate(
        user_create, update={"hashed_password": get_password_hash(user_create.password)}
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj


def update_user(*, session: Session, db_user: User, user_in: UserUpdate) -> Any:
    user_data = user_in.model_dump(exclude_unset=True)
    extra_data = {}
    if "password" in user_data:
        password = user_data["password"]
        hashed_password = get_password_hash(password)
        extra_data["hashed_password"] = hashed_password
    db_user.sqlmodel_update(user_data, update=extra_data)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def get_user_by_email(*, session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    session_user = session.exec(statement).first()
    return session_user


def authenticate(*, session: Session, email: str, password: str) -> User | None:
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user


def create_item(*, session: Session, item_in: ItemCreate, owner_id: uuid.UUID) -> Item:
    db_item = Item.model_validate(item_in, update={"owner_id": owner_id})
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item


# ---------------------------------------------------------------------------
# AI Resource Hub CRUD Operations
# ---------------------------------------------------------------------------

from app.models import (
    Comment,
    CommentCreate,
    CommentUpdate,
    Favorite,
    Like,
    Resource,
    ResourceCreate,
    ResourceSubmission,
    ResourceSubmissionCreate,
    ResourceSubmissionUpdate,
    ResourceUpdate,
)


# Resource CRUD
def create_resource(*, session: Session, resource_in: ResourceCreate) -> Resource:
    """Create a new resource (admin only)."""
    db_resource = Resource.model_validate(resource_in, update={"is_published": True})
    session.add(db_resource)
    session.commit()
    session.refresh(db_resource)
    return db_resource


def get_resource(*, session: Session, resource_id: uuid.UUID) -> Resource | None:
    """Get a resource by ID."""
    return session.get(Resource, resource_id)


def get_resource_by_url(*, session: Session, destination_url: str) -> Resource | None:
    """Get a resource by destination URL."""
    statement = select(Resource).where(Resource.destination_url == destination_url)
    return session.exec(statement).first()


def update_resource(
    *, session: Session, db_resource: Resource, resource_in: ResourceUpdate
) -> Resource:
    """Update a resource."""
    update_data = resource_in.model_dump(exclude_unset=True)
    db_resource.sqlmodel_update(update_data)
    session.add(db_resource)
    session.commit()
    session.refresh(db_resource)
    return db_resource


def delete_resource(*, session: Session, db_resource: Resource) -> None:
    """Delete a resource."""
    session.delete(db_resource)
    session.commit()


# Submission CRUD
def create_submission(
    *, session: Session, submission_in: ResourceSubmissionCreate, submitter_id: uuid.UUID
) -> ResourceSubmission:
    """Create a new resource submission."""
    db_submission = ResourceSubmission(
        title=submission_in.title,
        description=submission_in.description,
        destination_url=submission_in.destination_url,
        type=submission_in.type,
        submitter_id=submitter_id,
        status="pending",
    )
    session.add(db_submission)
    session.commit()
    session.refresh(db_submission)
    return db_submission


def get_submission(
    *, session: Session, submission_id: uuid.UUID
) -> ResourceSubmission | None:
    """Get a submission by ID."""
    return session.get(ResourceSubmission, submission_id)


def update_submission(
    *,
    session: Session,
    db_submission: ResourceSubmission,
    submission_in: ResourceSubmissionUpdate,
) -> ResourceSubmission:
    """Update a submission."""
    update_data = submission_in.model_dump(exclude_unset=True)
    db_submission.sqlmodel_update(update_data)
    session.add(db_submission)
    session.commit()
    session.refresh(db_submission)
    return db_submission


def delete_submission(*, session: Session, db_submission: ResourceSubmission) -> None:
    """Delete a submission."""
    session.delete(db_submission)
    session.commit()


def approve_submission(
    *, session: Session, db_submission: ResourceSubmission
) -> tuple[ResourceSubmission, Resource]:
    """Approve a submission and create the corresponding resource."""
    # Create the published resource
    resource = Resource(
        title=db_submission.title,
        description=db_submission.description,
        destination_url=db_submission.destination_url,
        type=db_submission.type,
        is_published=True,
    )
    session.add(resource)

    # Update submission status
    db_submission.status = "approved"
    session.add(db_submission)

    session.commit()
    session.refresh(db_submission)
    session.refresh(resource)
    return db_submission, resource


def reject_submission(
    *, session: Session, db_submission: ResourceSubmission
) -> ResourceSubmission:
    """Reject a submission."""
    db_submission.status = "rejected"
    session.add(db_submission)
    session.commit()
    session.refresh(db_submission)
    return db_submission


# Comment CRUD
def create_comment(
    *,
    session: Session,
    comment_in: CommentCreate,
    author_id: uuid.UUID,
    resource_id: uuid.UUID,
) -> Comment:
    """Create a new comment on a resource."""
    db_comment = Comment(
        body=comment_in.body,
        author_id=author_id,
        resource_id=resource_id,
    )
    session.add(db_comment)
    session.commit()
    session.refresh(db_comment)
    return db_comment


def get_comment(*, session: Session, comment_id: uuid.UUID) -> Comment | None:
    """Get a comment by ID."""
    return session.get(Comment, comment_id)


def update_comment(
    *, session: Session, db_comment: Comment, comment_in: CommentUpdate
) -> Comment:
    """Update a comment."""
    update_data = comment_in.model_dump(exclude_unset=True)
    db_comment.sqlmodel_update(update_data)
    session.add(db_comment)
    session.commit()
    session.refresh(db_comment)
    return db_comment


def delete_comment(*, session: Session, db_comment: Comment) -> None:
    """Delete a comment."""
    session.delete(db_comment)
    session.commit()


# Like/Favorite CRUD (toggle semantics)
def toggle_like(
    *, session: Session, user_id: uuid.UUID, resource_id: uuid.UUID
) -> tuple[bool, int]:
    """
    Toggle like on a resource.
    Returns (is_liked, total_count).
    """
    existing = session.exec(
        select(Like).where(Like.user_id == user_id, Like.resource_id == resource_id)
    ).first()

    if existing:
        session.delete(existing)
        session.commit()
        is_liked = False
    else:
        like = Like(user_id=user_id, resource_id=resource_id)
        session.add(like)
        session.commit()
        is_liked = True

    # Count total likes
    from sqlmodel import func

    count = session.exec(
        select(func.count()).select_from(Like).where(Like.resource_id == resource_id)
    ).one()

    return is_liked, count


def toggle_favorite(
    *, session: Session, user_id: uuid.UUID, resource_id: uuid.UUID
) -> tuple[bool, int]:
    """
    Toggle favorite on a resource.
    Returns (is_favorited, total_count).
    """
    existing = session.exec(
        select(Favorite).where(
            Favorite.user_id == user_id, Favorite.resource_id == resource_id
        )
    ).first()

    if existing:
        session.delete(existing)
        session.commit()
        is_favorited = False
    else:
        favorite = Favorite(user_id=user_id, resource_id=resource_id)
        session.add(favorite)
        session.commit()
        is_favorited = True

    # Count total favorites
    from sqlmodel import func

    count = session.exec(
        select(func.count())
        .select_from(Favorite)
        .where(Favorite.resource_id == resource_id)
    ).one()

    return is_favorited, count


def is_liked_by_user(
    *, session: Session, user_id: uuid.UUID, resource_id: uuid.UUID
) -> bool:
    """Check if a resource is liked by a user."""
    existing = session.exec(
        select(Like).where(Like.user_id == user_id, Like.resource_id == resource_id)
    ).first()
    return existing is not None


def is_favorited_by_user(
    *, session: Session, user_id: uuid.UUID, resource_id: uuid.UUID
) -> bool:
    """Check if a resource is favorited by a user."""
    existing = session.exec(
        select(Favorite).where(
            Favorite.user_id == user_id, Favorite.resource_id == resource_id
        )
    ).first()
    return existing is not None
