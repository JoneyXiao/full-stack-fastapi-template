"""Resource routes for AI Resource Hub."""

import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import col, func, or_, select

from app.api.deps import CurrentUser, OptionalUser, SessionDep
from app.models import (
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

router = APIRouter(prefix="/resources", tags=["resources"])


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
    type: str | None = None,
    is_published: bool | None = None,
) -> Any:
    """
    List published resources. Admins can filter by is_published; others always see published.
    """
    # Base query
    query = select(Resource)

    # Non-admin users can only see published resources
    if current_user is None or not current_user.is_superuser:
        query = query.where(Resource.is_published == True)  # noqa: E712
    elif is_published is not None:
        query = query.where(Resource.is_published == is_published)

    # Keyword search across title and description
    if q:
        pattern = f"%{q}%"
        query = query.where(
            or_(
                col(Resource.title).ilike(pattern),
                col(Resource.description).ilike(pattern),
            )
        )

    # Filter by type
    if type:
        query = query.where(Resource.type == type)

    # Count before pagination
    count_query = select(func.count()).select_from(query.subquery())
    count = session.exec(count_query).one()

    # Apply pagination
    query = query.offset(skip).limit(limit).order_by(Resource.created_at.desc())
    resources = session.exec(query).all()

    return ResourcesPublic(data=resources, count=count)


@router.get("/{id}", response_model=ResourceDetailPublic)
def get_resource(session: SessionDep, current_user: OptionalUser, id: uuid.UUID) -> Any:
    """
    Get resource by ID with reaction counts and per-user state.
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
    if resource.published_by_id is not None:
        publisher = session.get(User, resource.published_by_id)
        if publisher is not None:
            published_by_display = publisher.full_name or publisher.email

    return ResourceDetailPublic(
        **resource.model_dump(),
        likes_count=likes_count,
        favorites_count=favorites_count,
        liked_by_me=liked_by_me,
        favorited_by_me=favorited_by_me,
        published_by_display=published_by_display,
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
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    # Check for duplicate destination_url
    existing = session.exec(
        select(Resource).where(Resource.destination_url == resource_in.destination_url)
    ).first()
    if existing:
        raise HTTPException(
            status_code=409,
            detail="A resource with this destination URL already exists",
        )

    resource = Resource.model_validate(
        resource_in,
        update={"is_published": True, "published_by_id": current_user.id},
    )
    session.add(resource)
    session.commit()
    session.refresh(resource)
    return resource


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
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    resource = session.get(Resource, id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")

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
    resource.sqlmodel_update(update_data)
    session.add(resource)
    session.commit()
    session.refresh(resource)
    return resource


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

    session.delete(resource)
    session.commit()
    return Message(message="Resource deleted successfully")


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
