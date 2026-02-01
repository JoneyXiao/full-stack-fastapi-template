import uuid
from datetime import datetime, timedelta, timezone
from typing import Any

from sqlmodel import Session, col, func, select

from app.core.security import get_password_hash, verify_password
from app.models import (
    AvatarRateLimit,
    Category,
    CategoryAdmin,
    CategoryCreate,
    CategoryUpdate,
    ChatTranscriptCreate,
    Comment,
    CommentCreate,
    CommentUpdate,
    Favorite,
    Item,
    ItemCreate,
    Like,
    Resource,
    ResourceCreate,
    ResourceSubmission,
    ResourceSubmissionCreate,
    ResourceSubmissionUpdate,
    ResourceUpdate,
    SavedChatTranscript,
    User,
    UserCreate,
    UserUpdate,
    WeChatAccountLink,
    WeChatAccountLinkBase,
    WeChatLoginAttempt,
)


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
    *,
    session: Session,
    submission_in: ResourceSubmissionCreate,
    submitter_id: uuid.UUID,
) -> ResourceSubmission:
    """Create a new resource submission."""
    db_submission = ResourceSubmission(
        title=submission_in.title,
        description=submission_in.description,
        destination_url=submission_in.destination_url,
        category_id=submission_in.category_id,
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
        category_id=db_submission.category_id,
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


# ---------------------------------------------------------------------------
# Category CRUD Operations
# ---------------------------------------------------------------------------


def create_category(*, session: Session, category_in: CategoryCreate) -> Category:
    """Create a new category (admin only)."""
    db_category = Category.model_validate(category_in)
    session.add(db_category)
    session.commit()
    session.refresh(db_category)
    return db_category


def get_category(*, session: Session, category_id: uuid.UUID) -> Category | None:
    """Get a category by ID."""
    return session.get(Category, category_id)


def get_category_by_name(
    *, session: Session, name: str, case_insensitive: bool = True
) -> Category | None:
    """Get a category by name.

    Args:
        session: Database session
        name: Category name to search for
        case_insensitive: If True, performs case-insensitive search (default)
    """
    if case_insensitive:
        statement = select(Category).where(func.lower(Category.name) == name.lower())
    else:
        statement = select(Category).where(Category.name == name)
    return session.exec(statement).first()


def update_category(
    *, session: Session, db_category: Category, category_in: CategoryUpdate
) -> Category:
    """Update/rename a category (admin only)."""
    update_data = category_in.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.now(timezone.utc)
    db_category.sqlmodel_update(update_data)
    session.add(db_category)
    session.commit()
    session.refresh(db_category)
    return db_category


def delete_category(*, session: Session, db_category: Category) -> None:
    """Delete a category (admin only).

    Note: This will fail if the category is in use (FK constraint).
    Use get_category_usage() first to check if deletion is safe.
    """
    session.delete(db_category)
    session.commit()


def get_category_usage(*, session: Session, category_id: uuid.UUID) -> tuple[int, int]:
    """Get the usage counts for a category.

    Returns:
        Tuple of (resources_count, submissions_count)
    """
    resources_count = session.exec(
        select(func.count()).where(Resource.category_id == category_id)
    ).one()
    submissions_count = session.exec(
        select(func.count()).where(ResourceSubmission.category_id == category_id)
    ).one()
    return resources_count, submissions_count


def is_category_in_use(*, session: Session, category_id: uuid.UUID) -> bool:
    """Check if a category is in use by any resource or submission."""
    resources_count, submissions_count = get_category_usage(
        session=session, category_id=category_id
    )
    return resources_count > 0 or submissions_count > 0


def list_categories(
    *, session: Session, skip: int = 0, limit: int = 100
) -> tuple[list[Category], int]:
    """List all categories with pagination.

    Returns:
        Tuple of (categories_list, total_count)
    """
    count = session.exec(select(func.count()).select_from(Category)).one()
    statement = select(Category).offset(skip).limit(limit).order_by(Category.name)
    categories = session.exec(statement).all()
    return list(categories), count


def list_categories_admin(
    *, session: Session, skip: int = 0, limit: int = 100
) -> tuple[list[CategoryAdmin], int]:
    """List all categories with usage info (admin only).

    Uses aggregate queries to avoid N+1 query problem.

    Returns:
        Tuple of (categories_admin_list, total_count)
    """
    count = session.exec(select(func.count()).select_from(Category)).one()
    statement = select(Category).offset(skip).limit(limit).order_by(Category.name)
    categories = session.exec(statement).all()

    if not categories:
        return [], count

    # Get all category IDs for batch query
    category_ids = [cat.id for cat in categories]

    # Use col() to get the proper column reference for SQLAlchemy operations
    resource_cat_col = col(Resource.category_id)
    submission_cat_col = col(ResourceSubmission.category_id)

    # Batch query: count resources per category
    resources_stmt = (
        select(resource_cat_col, func.count().label("cnt"))
        .where(resource_cat_col.in_(category_ids))
        .group_by(resource_cat_col)
    )
    resources_counts = {row[0]: row[1] for row in session.exec(resources_stmt).all()}

    # Batch query: count submissions per category
    submissions_stmt = (
        select(submission_cat_col, func.count().label("cnt"))
        .where(submission_cat_col.in_(category_ids))
        .group_by(submission_cat_col)
    )
    submissions_counts = {
        row[0]: row[1] for row in session.exec(submissions_stmt).all()
    }

    admin_list: list[CategoryAdmin] = []
    for cat in categories:
        resources_count = resources_counts.get(cat.id, 0)
        submissions_count = submissions_counts.get(cat.id, 0)
        admin_list.append(
            CategoryAdmin(
                id=cat.id,
                name=cat.name,
                in_use=resources_count > 0 or submissions_count > 0,
                resources_count=resources_count,
                submissions_count=submissions_count,
            )
        )
    return admin_list, count


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


# ---------------------------------------------------------------------------
# Saved Chat Transcript CRUD Operations
# ---------------------------------------------------------------------------


def create_chat_transcript(
    *, session: Session, transcript_in: ChatTranscriptCreate, user_id: uuid.UUID
) -> SavedChatTranscript:
    """Create a new saved chat transcript for a user."""
    messages_data = [msg.model_dump() for msg in transcript_in.messages]
    db_transcript = SavedChatTranscript(
        user_id=user_id,
        title=transcript_in.title,
        messages=messages_data,
    )
    session.add(db_transcript)
    session.commit()
    session.refresh(db_transcript)
    return db_transcript


def get_chat_transcript(
    *, session: Session, transcript_id: uuid.UUID
) -> SavedChatTranscript | None:
    """Get a chat transcript by ID."""
    return session.get(SavedChatTranscript, transcript_id)


def get_chat_transcript_by_user(
    *, session: Session, transcript_id: uuid.UUID, user_id: uuid.UUID
) -> SavedChatTranscript | None:
    """Get a chat transcript by ID, only if owned by the given user."""
    statement = select(SavedChatTranscript).where(
        SavedChatTranscript.id == transcript_id,
        SavedChatTranscript.user_id == user_id,
    )
    return session.exec(statement).first()


def list_chat_transcripts(
    *, session: Session, user_id: uuid.UUID, skip: int = 0, limit: int = 50
) -> tuple[list[SavedChatTranscript], int]:
    """List chat transcripts owned by a user with pagination."""
    # Count total
    count = session.exec(
        select(func.count())
        .select_from(SavedChatTranscript)
        .where(SavedChatTranscript.user_id == user_id)
    ).one()

    # Fetch paginated
    statement = (
        select(SavedChatTranscript)
        .where(SavedChatTranscript.user_id == user_id)
        .order_by(SavedChatTranscript.updated_at.desc())
        .offset(skip)
        .limit(limit)
    )
    transcripts = list(session.exec(statement).all())
    return transcripts, count


def delete_chat_transcript(
    *, session: Session, db_transcript: SavedChatTranscript
) -> None:
    """Delete a chat transcript (hard delete)."""
    session.delete(db_transcript)
    session.commit()


# ---------------------------------------------------------------------------
# Avatar CRUD Operations
# ---------------------------------------------------------------------------


def check_avatar_rate_limit(
    *, session: Session, user_id: uuid.UUID, max_attempts: int, window_hours: int
) -> bool:
    """
    Check if user can perform an avatar change operation.
    Returns True if allowed, False if rate limited.

    Uses atomic upsert to prevent race conditions.
    """
    now = datetime.now(timezone.utc)
    window_start = now - timedelta(hours=window_hours)

    # Get existing rate limit record
    rate_limit = session.get(AvatarRateLimit, user_id)

    if rate_limit is None:
        # First attempt - create record
        rate_limit = AvatarRateLimit(
            user_id=user_id,
            window_start_utc=now.replace(tzinfo=None),
            attempt_count=1,
            first_attempt_at=now.replace(tzinfo=None),
            last_attempt_at=now.replace(tzinfo=None),
        )
        session.add(rate_limit)
        session.commit()
        return True

    # Check if window has expired (reset if so)
    # Compare as naive datetimes (DB stores without timezone)
    if rate_limit.window_start_utc < window_start.replace(tzinfo=None):
        rate_limit.window_start_utc = now.replace(tzinfo=None)
        rate_limit.attempt_count = 1
        rate_limit.first_attempt_at = now.replace(tzinfo=None)
        rate_limit.last_attempt_at = now.replace(tzinfo=None)
        session.add(rate_limit)
        session.commit()
        return True

    # Window still active - check count
    if rate_limit.attempt_count >= max_attempts:
        return False

    # Increment count
    rate_limit.attempt_count += 1
    rate_limit.last_attempt_at = now.replace(tzinfo=None)
    session.add(rate_limit)
    session.commit()
    return True


def update_user_avatar_metadata(
    *,
    session: Session,
    user: User,
    avatar_key: str | None,
    content_type: str | None,
) -> User:
    """
    Update user avatar metadata and increment version.
    avatar_key=None clears the avatar.
    """
    user.avatar_key = avatar_key
    user.avatar_content_type = content_type
    user.avatar_version += 1
    user.avatar_updated_at = datetime.now(timezone.utc)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


def get_user_by_id(*, session: Session, user_id: uuid.UUID) -> User | None:
    """Get a user by ID."""
    return session.get(User, user_id)


# ---------------------------------------------------------------------------
# WeChat Login CRUD Operations
# ---------------------------------------------------------------------------


def get_wechat_link_by_openid(
    *, session: Session, openid: str
) -> WeChatAccountLink | None:
    """Get WeChat account link by openid."""
    statement = select(WeChatAccountLink).where(WeChatAccountLink.openid == openid)
    return session.exec(statement).first()


def get_wechat_link_by_unionid(
    *, session: Session, unionid: str
) -> WeChatAccountLink | None:
    """Get WeChat account link by unionid."""
    statement = select(WeChatAccountLink).where(WeChatAccountLink.unionid == unionid)
    return session.exec(statement).first()


def get_wechat_link_by_primary_subject(
    *, session: Session, primary_subject_type: str, primary_subject: str
) -> WeChatAccountLink | None:
    """Get WeChat account link by primary subject (unionid or openid)."""
    statement = select(WeChatAccountLink).where(
        WeChatAccountLink.primary_subject_type == primary_subject_type,
        WeChatAccountLink.primary_subject == primary_subject,
    )
    return session.exec(statement).first()


def get_wechat_link_by_user_id(
    *, session: Session, user_id: uuid.UUID
) -> WeChatAccountLink | None:
    """Get WeChat account link for a specific user."""
    statement = select(WeChatAccountLink).where(WeChatAccountLink.user_id == user_id)
    return session.exec(statement).first()


def create_wechat_link(
    *,
    session: Session,
    user_id: uuid.UUID,
    link_data: WeChatAccountLinkBase,
) -> WeChatAccountLink:
    """Create a new WeChat account link."""
    db_link = WeChatAccountLink.model_validate(
        link_data,
        update={
            "user_id": user_id,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc),
        },
    )
    session.add(db_link)
    session.commit()
    session.refresh(db_link)
    return db_link


def delete_wechat_link(*, session: Session, link: WeChatAccountLink) -> None:
    """Delete a WeChat account link."""
    session.delete(link)
    session.commit()


def create_wechat_login_attempt(
    *,
    session: Session,
    state: str,
    expires_at: datetime,
    user_id: uuid.UUID | None = None,
) -> WeChatLoginAttempt:
    """Create a new WeChat login attempt for state anti-replay."""
    attempt = WeChatLoginAttempt(
        state=state,
        created_at=datetime.now(timezone.utc),
        expires_at=expires_at,
        status="started",
        user_id=user_id,
    )
    session.add(attempt)
    session.commit()
    session.refresh(attempt)
    return attempt


def get_wechat_login_attempt_by_state(
    *, session: Session, state: str
) -> WeChatLoginAttempt | None:
    """Get WeChat login attempt by state token."""
    statement = select(WeChatLoginAttempt).where(WeChatLoginAttempt.state == state)
    return session.exec(statement).first()


def consume_wechat_login_attempt(
    *,
    session: Session,
    attempt: WeChatLoginAttempt,
    success: bool,
    failure_category: str | None = None,
) -> WeChatLoginAttempt:
    """
    Consume a WeChat login attempt (mark as succeeded or failed).
    Once consumed, the state token cannot be reused.
    """
    attempt.completed_at = datetime.now(timezone.utc)
    attempt.status = "succeeded" if success else "failed"
    attempt.failure_category = failure_category
    session.add(attempt)
    session.commit()
    session.refresh(attempt)
    return attempt


def is_wechat_state_valid(
    *, session: Session, state: str, now: datetime | None = None
) -> tuple[bool, WeChatLoginAttempt | None, str | None]:
    """
    Validate a WeChat state token for anti-replay.

    Returns:
        (is_valid, attempt, error_reason)
        - is_valid: True if state is valid and can be consumed
        - attempt: The attempt record if found
        - error_reason: One of: "not_found", "expired", "already_used", None if valid
    """
    if now is None:
        now = datetime.now(timezone.utc)

    attempt = get_wechat_login_attempt_by_state(session=session, state=state)
    if attempt is None:
        return (False, None, "not_found")

    # Check expiration
    expires_at = attempt.expires_at
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if now > expires_at:
        return (False, attempt, "expired")

    # Check if already used (one-time use)
    if attempt.completed_at is not None:
        return (False, attempt, "already_used")

    return (True, attempt, None)
