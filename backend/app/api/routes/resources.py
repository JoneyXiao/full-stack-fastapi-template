"""Resource routes for AI Resource Hub."""

import uuid
from datetime import datetime
from typing import Any
from urllib.parse import urlparse

from fastapi import APIRouter, HTTPException, UploadFile
from sqlmodel import col, func, or_, select

from app.api.deps import CurrentUser, OptionalUser, SessionDep
from app.api.routes.avatars import get_avatar_url
from app.core.config import settings
from app.models import (
    Category,
    Comment,
    CommentCreate,
    CommentPublic,
    CommentsPublic,
    Favorite,
    Like,
    Message,
    ReactionState,
    Resource,
    ResourceCreate,
    ResourceDetailPublic,
    ResourcePublic,
    ResourcesPublic,
    ResourceUpdate,
    User,
)
from app.utils import (
    ProcessedResourceImage,
    ResourceImageValidationError,
    delete_resource_image_file,
    save_resource_image_file,
    validate_and_process_resource_image,
)

router = APIRouter(prefix="/resources", tags=["resources"])


# ---------------------------------------------------------------------------
# Resource image URL helper
# ---------------------------------------------------------------------------


def get_resource_image_url(resource: Resource) -> str | None:
    """
    Compute the public image URL for a resource.
    - If image_external_url is set, return that.
    - If uploaded image metadata is present (image_key), return versioned API URL.
    - Otherwise, return None.
    """
    if resource.image_external_url:
        return resource.image_external_url

    if resource.image_key and resource.image_content_type:
        # Determine extension from content type
        ext = "webp"
        if resource.image_content_type == "image/jpeg":
            ext = "jpg"
        return f"{settings.API_V1_STR}/resource-images/{resource.id}/{resource.image_version}.{ext}"

    return None


def validate_image_external_url(url: str | None) -> None:
    """
    Validate that an external image URL uses http/https scheme.
    Raises HTTPException(400) if invalid.
    """
    if url is None:
        return
    try:
        parsed = urlparse(url)
        if parsed.scheme not in ("http", "https"):
            raise HTTPException(
                status_code=400,
                detail="image_external_url must use http or https scheme",
            )
        if not parsed.netloc:
            raise HTTPException(
                status_code=400,
                detail="image_external_url must include a valid host",
            )
    except Exception as e:
        if isinstance(e, HTTPException):
            raise
        raise HTTPException(
            status_code=400,
            detail="image_external_url is not a valid URL",
        ) from e


# ---------------------------------------------------------------------------
# Public resource endpoints
# ---------------------------------------------------------------------------


@router.get("/", response_model=ResourcesPublic)
def list_resources(
    session: SessionDep,
    current_user: OptionalUser,
    skip: int = 0,
    limit: int = 50,
    q: str | None = None,
    category_id: uuid.UUID | None = None,
    is_published: bool | None = None,
) -> Any:
    """
    List resources with category names and likes counts (uses JOINs to avoid N+1).
    Non-admins see only published resources.
    """
    # Build filter conditions once (applied to both count and data queries)
    filters: list[Any] = []
    if current_user is None or not current_user.is_superuser:
        filters.append(Resource.is_published == True)  # noqa: E712
    elif is_published is not None:
        filters.append(Resource.is_published == is_published)
    if q:
        pattern = f"%{q}%"
        filters.append(
            or_(
                col(Resource.title).ilike(pattern),
                col(Resource.description).ilike(pattern),
            )
        )
    if category_id:
        filters.append(Resource.category_id == category_id)

    # Count query
    count_query = select(func.count()).select_from(Resource)
    for f in filters:
        count_query = count_query.where(f)
    count = session.exec(count_query).one()

    # Subquery for likes counts
    likes_subq = (
        select(Like.resource_id, func.count().label("likes_count"))
        .group_by(col(Like.resource_id))
        .subquery()
    )

    # Data query with JOINs
    query = (
        select(
            Resource,
            Category.name.label("category_name"),
            func.coalesce(likes_subq.c.likes_count, 0).label("likes_count"),
        )
        .outerjoin(Category, Resource.category_id == Category.id)
        .outerjoin(likes_subq, Resource.id == likes_subq.c.resource_id)  # type: ignore[arg-type]
    )
    for f in filters:
        query = query.where(f)
    query = query.offset(skip).limit(limit).order_by(Resource.created_at.desc())

    # Build response
    data = [
        ResourcePublic(
            id=resource.id,
            title=resource.title,
            description=resource.description,
            destination_url=resource.destination_url,
            is_published=resource.is_published,
            created_at=resource.created_at,
            updated_at=resource.updated_at,
            published_by_id=resource.published_by_id,
            category_id=resource.category_id,
            category_name=category_name,
            likes_count=likes_count,
            image_url=get_resource_image_url(resource),
        )
        for resource, category_name, likes_count in session.exec(query).all()
    ]

    return ResourcesPublic(data=data, count=count)


@router.get("/{id}", response_model=ResourceDetailPublic)
def get_resource(session: SessionDep, current_user: OptionalUser, id: uuid.UUID) -> Any:
    """
    Get resource by ID with reaction counts and per-user state.
    Includes image_url (external or uploaded).
    """
    resource = session.get(Resource, id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")

    # Non-admin users can only see published resources
    if not resource.is_published:
        if current_user is None or not current_user.is_superuser:
            raise HTTPException(status_code=404, detail="Resource not found")

    # Compute reaction counts
    likes_count = session.exec(
        select(func.count()).select_from(Like).where(Like.resource_id == id)
    ).one()
    favorites_count = session.exec(
        select(func.count()).select_from(Favorite).where(Favorite.resource_id == id)
    ).one()

    # Compute per-user state
    liked_by_me = False
    favorited_by_me = False
    if current_user is not None:
        liked_by_me = (
            session.exec(
                select(Like).where(
                    Like.user_id == current_user.id, Like.resource_id == id
                )
            ).first()
            is not None
        )
        favorited_by_me = (
            session.exec(
                select(Favorite).where(
                    Favorite.user_id == current_user.id, Favorite.resource_id == id
                )
            ).first()
            is not None
        )

    published_by_display = None
    published_by_avatar_url = None
    if resource.published_by_id is not None:
        publisher = session.get(User, resource.published_by_id)
        if publisher is not None:
            published_by_display = publisher.full_name or publisher.email
            published_by_avatar_url = get_avatar_url(publisher)

    # Get category name if category is set
    category_name = None
    if resource.category_id:
        category = session.get(Category, resource.category_id)
        if category:
            category_name = category.name

    # Compute image_url
    image_url = get_resource_image_url(resource)

    return ResourceDetailPublic(
        id=resource.id,
        title=resource.title,
        description=resource.description,
        destination_url=resource.destination_url,
        category_id=resource.category_id,
        category_name=category_name,
        is_published=resource.is_published,
        published_by_id=resource.published_by_id,
        published_by_display=published_by_display,
        published_by_avatar_url=published_by_avatar_url,
        created_at=resource.created_at,
        updated_at=resource.updated_at,
        likes_count=likes_count,
        favorites_count=favorites_count,
        liked_by_me=liked_by_me,
        favorited_by_me=favorited_by_me,
        image_url=image_url,
    )


# ---------------------------------------------------------------------------
# Admin resource endpoints
# ---------------------------------------------------------------------------


@router.post("/", response_model=ResourcePublic)
def create_resource(
    *, session: SessionDep, current_user: CurrentUser, resource_in: ResourceCreate
) -> Any:
    """
    Create a resource (admin only).
    Optionally accepts image_external_url (http/https only).
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    # Validate image_external_url if provided
    validate_image_external_url(resource_in.image_external_url)

    # Check for duplicate destination_url
    existing = session.exec(
        select(Resource).where(Resource.destination_url == resource_in.destination_url)
    ).first()
    if existing:
        raise HTTPException(
            status_code=409,
            detail="A resource with this destination URL already exists",
        )

    resource = Resource(
        title=resource_in.title,
        description=resource_in.description,
        destination_url=resource_in.destination_url,
        category_id=resource_in.category_id,
        is_published=True,
        published_by_id=current_user.id,
        image_external_url=resource_in.image_external_url,
    )
    session.add(resource)
    session.commit()
    session.refresh(resource)

    # Build response with category_name, likes_count, image_url
    category_name = None
    if resource.category_id:
        cat = session.get(Category, resource.category_id)
        if cat:
            category_name = cat.name

    return ResourcePublic(
        id=resource.id,
        title=resource.title,
        description=resource.description,
        destination_url=resource.destination_url,
        category_id=resource.category_id,
        category_name=category_name,
        is_published=resource.is_published,
        published_by_id=resource.published_by_id,
        created_at=resource.created_at,
        updated_at=resource.updated_at,
        likes_count=0,  # New resource has no likes
        image_url=get_resource_image_url(resource),
    )


@router.put("/{id}", response_model=ResourcePublic)
def update_resource(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    resource_in: ResourceUpdate,
) -> Any:
    """
    Update a resource (admin only).
    Setting image_external_url enforces mutual exclusivity (clears uploaded image metadata).
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    resource = session.get(Resource, id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")

    # Validate image_external_url if provided
    if resource_in.image_external_url is not None:
        validate_image_external_url(resource_in.image_external_url)

    # Check for duplicate destination_url if changed
    if (
        resource_in.destination_url
        and resource_in.destination_url != resource.destination_url
    ):
        existing = session.exec(
            select(Resource).where(
                Resource.destination_url == resource_in.destination_url
            )
        ).first()
        if existing:
            raise HTTPException(
                status_code=409,
                detail="A resource with this destination URL already exists",
            )

    update_data = resource_in.model_dump(exclude_unset=True)

    # Enforce mutual exclusivity: if setting image_external_url, clear uploaded image metadata
    if "image_external_url" in update_data and update_data["image_external_url"]:
        resource.image_key = None
        resource.image_content_type = None
        resource.image_updated_at = None
        # Note: actual file deletion is handled elsewhere (e.g., scheduled cleanup or DELETE endpoint)

    resource.sqlmodel_update(update_data)
    resource.updated_at = datetime.utcnow()
    session.add(resource)
    session.commit()
    session.refresh(resource)

    # Build response with category_name, likes_count, image_url
    category_name = None
    if resource.category_id:
        cat = session.get(Category, resource.category_id)
        if cat:
            category_name = cat.name

    likes_count = session.exec(
        select(func.count()).select_from(Like).where(Like.resource_id == resource.id)
    ).one()

    return ResourcePublic(
        id=resource.id,
        title=resource.title,
        description=resource.description,
        destination_url=resource.destination_url,
        category_id=resource.category_id,
        category_name=category_name,
        is_published=resource.is_published,
        published_by_id=resource.published_by_id,
        created_at=resource.created_at,
        updated_at=resource.updated_at,
        likes_count=likes_count,
        image_url=get_resource_image_url(resource),
    )


@router.delete("/{id}", response_model=Message)
def delete_resource(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Any:
    """
    Delete a resource (admin only).
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    resource = session.get(Resource, id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")

    # Delete uploaded image file if exists
    if resource.image_key:
        delete_resource_image_file(resource.image_key)

    session.delete(resource)
    session.commit()
    return Message(message="Resource deleted successfully")


# ---------------------------------------------------------------------------
# Admin resource image management
# ---------------------------------------------------------------------------


@router.post("/{id}/image-upload", response_model=ResourcePublic)
async def upload_resource_image(
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    file: UploadFile,
) -> Any:
    """
    Upload an image for a resource (admin only).

    Enforces mutual exclusivity: uploading clears any image_external_url.
    Validates and processes the image (resize, format conversion).
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    resource = session.get(Resource, id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")

    # Read file data
    file_data = await file.read()
    content_type = file.content_type or "application/octet-stream"

    # Validate and process the image
    try:
        processed: ProcessedResourceImage = validate_and_process_resource_image(
            file_data, content_type
        )
    except ResourceImageValidationError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Delete old image file if exists
    if resource.image_key:
        delete_resource_image_file(resource.image_key)

    # Save new image file
    image_key = save_resource_image_file(
        resource.id, processed.data, processed.extension
    )

    # Update resource - enforce mutual exclusivity (clear external URL)
    resource.image_key = image_key
    resource.image_content_type = processed.content_type
    resource.image_version = (resource.image_version or 0) + 1
    resource.image_updated_at = datetime.utcnow()
    resource.image_external_url = None  # Clear external URL
    resource.updated_at = datetime.utcnow()

    session.add(resource)
    session.commit()
    session.refresh(resource)

    # Build response
    category_name = None
    if resource.category_id:
        cat = session.get(Category, resource.category_id)
        if cat:
            category_name = cat.name

    likes_count = session.exec(
        select(func.count()).select_from(Like).where(Like.resource_id == resource.id)
    ).one()

    return ResourcePublic(
        id=resource.id,
        title=resource.title,
        description=resource.description,
        destination_url=resource.destination_url,
        category_id=resource.category_id,
        category_name=category_name,
        is_published=resource.is_published,
        published_by_id=resource.published_by_id,
        created_at=resource.created_at,
        updated_at=resource.updated_at,
        likes_count=likes_count,
        image_url=get_resource_image_url(resource),
    )


@router.delete("/{id}/image", response_model=ResourcePublic)
def clear_resource_image(
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
) -> Any:
    """
    Clear the image for a resource (admin only).

    Removes both uploaded image and external URL, returning resource to no-image state.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    resource = session.get(Resource, id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")

    # Delete uploaded image file if exists
    if resource.image_key:
        delete_resource_image_file(resource.image_key)

    # Clear all image-related fields
    resource.image_key = None
    resource.image_content_type = None
    resource.image_updated_at = None
    resource.image_external_url = None
    resource.updated_at = datetime.utcnow()

    session.add(resource)
    session.commit()
    session.refresh(resource)

    # Build response
    category_name = None
    if resource.category_id:
        cat = session.get(Category, resource.category_id)
        if cat:
            category_name = cat.name

    likes_count = session.exec(
        select(func.count()).select_from(Like).where(Like.resource_id == resource.id)
    ).one()

    return ResourcePublic(
        id=resource.id,
        title=resource.title,
        description=resource.description,
        destination_url=resource.destination_url,
        category_id=resource.category_id,
        category_name=category_name,
        is_published=resource.is_published,
        published_by_id=resource.published_by_id,
        created_at=resource.created_at,
        updated_at=resource.updated_at,
        likes_count=likes_count,
        image_url=get_resource_image_url(resource),
    )


# ---------------------------------------------------------------------------
# Reaction endpoints (like/favorite)
# ---------------------------------------------------------------------------


@router.post("/{id}/like", response_model=ReactionState)
def like_resource(session: SessionDep, current_user: CurrentUser, id: uuid.UUID) -> Any:
    """
    Like a resource (toggle on).
    """
    resource = session.get(Resource, id)
    if not resource or not resource.is_published:
        raise HTTPException(status_code=404, detail="Resource not found")

    # Check if already liked
    existing = session.exec(
        select(Like).where(Like.user_id == current_user.id, Like.resource_id == id)
    ).first()

    if not existing:
        like = Like(user_id=current_user.id, resource_id=id)
        session.add(like)
        session.commit()

    # Count total likes
    like_count = session.exec(
        select(func.count()).select_from(Like).where(Like.resource_id == id)
    ).one()

    return ReactionState(active=True, count=like_count)


@router.delete("/{id}/like", response_model=ReactionState)
def unlike_resource(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Any:
    """
    Remove like from a resource (toggle off).
    """
    resource = session.get(Resource, id)
    if not resource or not resource.is_published:
        raise HTTPException(status_code=404, detail="Resource not found")

    existing = session.exec(
        select(Like).where(Like.user_id == current_user.id, Like.resource_id == id)
    ).first()

    if existing:
        session.delete(existing)
        session.commit()

    # Count total likes
    like_count = session.exec(
        select(func.count()).select_from(Like).where(Like.resource_id == id)
    ).one()

    return ReactionState(active=False, count=like_count)


@router.post("/{id}/favorite", response_model=ReactionState)
def favorite_resource(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Any:
    """
    Favorite a resource (toggle on).
    """
    resource = session.get(Resource, id)
    if not resource or not resource.is_published:
        raise HTTPException(status_code=404, detail="Resource not found")

    existing = session.exec(
        select(Favorite).where(
            Favorite.user_id == current_user.id, Favorite.resource_id == id
        )
    ).first()

    if not existing:
        favorite = Favorite(user_id=current_user.id, resource_id=id)
        session.add(favorite)
        session.commit()

    # Count total favorites
    fav_count = session.exec(
        select(func.count()).select_from(Favorite).where(Favorite.resource_id == id)
    ).one()

    return ReactionState(active=True, count=fav_count)


@router.delete("/{id}/favorite", response_model=ReactionState)
def unfavorite_resource(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Any:
    """
    Remove favorite from a resource (toggle off).
    """
    resource = session.get(Resource, id)
    if not resource or not resource.is_published:
        raise HTTPException(status_code=404, detail="Resource not found")

    existing = session.exec(
        select(Favorite).where(
            Favorite.user_id == current_user.id, Favorite.resource_id == id
        )
    ).first()

    if existing:
        session.delete(existing)
        session.commit()

    fav_count = session.exec(
        select(func.count()).select_from(Favorite).where(Favorite.resource_id == id)
    ).one()

    return ReactionState(active=False, count=fav_count)


# ---------------------------------------------------------------------------
# User favorites list
# ---------------------------------------------------------------------------


@router.get("/me/favorites", response_model=ResourcesPublic)
def list_my_favorites(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 50
) -> Any:
    """
    List resources favorited by the current user.
    """
    # Count favorites
    count_query = (
        select(func.count())
        .select_from(Favorite)
        .where(Favorite.user_id == current_user.id)
    )
    count = session.exec(count_query).one()

    # Get favorited resources
    query = (
        select(Resource)
        .join(Favorite, Favorite.resource_id == Resource.id)
        .where(Favorite.user_id == current_user.id, Resource.is_published == True)  # noqa: E712
        .offset(skip)
        .limit(limit)
    )
    resources = session.exec(query).all()

    return ResourcesPublic(data=resources, count=count)


# ---------------------------------------------------------------------------
# Resource comments
# ---------------------------------------------------------------------------


@router.get("/{id}/comments", response_model=CommentsPublic)
def list_resource_comments(
    session: SessionDep, id: uuid.UUID, skip: int = 0, limit: int = 50
) -> Any:
    """
    List comments for a resource (public read).
    """
    resource = session.get(Resource, id)
    if not resource or not resource.is_published:
        raise HTTPException(status_code=404, detail="Resource not found")

    count_query = (
        select(func.count()).select_from(Comment).where(Comment.resource_id == id)
    )
    count = session.exec(count_query).one()

    query = (
        select(Comment, User.full_name, User.email)
        .join(User, User.id == Comment.author_id)
        .where(Comment.resource_id == id)
        .offset(skip)
        .limit(limit)
        .order_by(Comment.created_at.asc())
    )
    rows = session.exec(query).all()

    comments = [
        CommentPublic.model_validate(
            {
                **c.model_dump(),
                "author_display": full_name or email,
            }
        )
        for c, full_name, email in rows
    ]

    return CommentsPublic(data=comments, count=count)


@router.post("/{id}/comments", response_model=CommentPublic)
def create_resource_comment(
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    comment_in: CommentCreate,
) -> Any:
    """
    Create a comment on a resource (auth required).
    """
    resource = session.get(Resource, id)
    if not resource or not resource.is_published:
        raise HTTPException(status_code=404, detail="Resource not found")

    comment = Comment(
        body=comment_in.body,
        author_id=current_user.id,
        resource_id=id,
    )
    session.add(comment)
    session.commit()
    session.refresh(comment)
    return CommentPublic.model_validate(
        {
            **comment.model_dump(),
            "author_display": (current_user.full_name or current_user.email),
        }
    )
