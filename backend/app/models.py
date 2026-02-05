import uuid
from datetime import datetime
from typing import TYPE_CHECKING, Literal, Optional

from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models import Category

# Supported locale codes
SupportedLocale = Literal["en", "zh"]


# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=128)


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=128)
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=128)


class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)
    locale: SupportedLocale | None = Field(default=None)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=128)
    new_password: str = Field(min_length=8, max_length=128)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    locale: str | None = Field(default=None, max_length=10)
    # Avatar metadata fields (bytes stored on filesystem, not in DB)
    avatar_key: str | None = Field(default=None, max_length=255)
    avatar_version: int = Field(default=0)
    avatar_content_type: str | None = Field(default=None, max_length=50)
    avatar_updated_at: datetime | None = Field(default=None)
    items: list["Item"] = Relationship(back_populates="owner", cascade_delete=True)


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID
    locale: SupportedLocale | None = None
    avatar_url: str | None = None
    avatar_version: int = 0


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int


# Shared properties
class ItemBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=255)


# Properties to receive on item creation
class ItemCreate(ItemBase):
    pass


# Properties to receive on item update
class ItemUpdate(ItemBase):
    title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore


# Database model, database table inferred from class name
class Item(ItemBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    owner: User | None = Relationship(back_populates="items")


# Properties to return via API, id is always required
class ItemPublic(ItemBase):
    id: uuid.UUID
    owner_id: uuid.UUID


class ItemsPublic(SQLModel):
    data: list[ItemPublic]
    count: int


# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: str | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=128)


# ---------------------------------------------------------------------------
# Avatar Rate Limit Model
# ---------------------------------------------------------------------------


class AvatarRateLimit(SQLModel, table=True):
    """Track avatar change attempts for rate limiting (max 10/hour/user)."""

    __tablename__ = "avatarratelimit"

    user_id: uuid.UUID = Field(
        primary_key=True, foreign_key="user.id", ondelete="CASCADE"
    )
    window_start_utc: datetime
    attempt_count: int = Field(default=1)
    first_attempt_at: datetime
    last_attempt_at: datetime


# ---------------------------------------------------------------------------
# WeChat Login Models
# ---------------------------------------------------------------------------

# Primary subject type for WeChat identity matching
WeChatPrimarySubjectType = Literal["unionid", "openid"]


class WeChatAccountLinkBase(SQLModel):
    """Base fields for WeChat account link."""

    openid: str = Field(max_length=64, index=True)
    unionid: str | None = Field(default=None, max_length=64, index=True)
    # Use str for DB compatibility; validation happens at API layer
    primary_subject_type: str = Field(max_length=20)
    primary_subject: str = Field(max_length=64)
    nickname: str | None = Field(default=None, max_length=255)
    avatar_url: str | None = Field(default=None, max_length=2048)


class WeChatAccountLink(WeChatAccountLinkBase, table=True):
    """WeChat identity linked to an application user."""

    __tablename__ = "wechataccountlink"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE", index=True
    )
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(tz=__import__("datetime").timezone.utc)
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(tz=__import__("datetime").timezone.utc)
    )

    user: User | None = Relationship()


class WeChatAccountLinkPublic(SQLModel):
    """Public representation of WeChat account link."""

    id: uuid.UUID
    openid: str
    unionid: str | None
    nickname: str | None
    avatar_url: str | None
    created_at: datetime


# WeChat Login Attempt status
WeChatLoginAttemptStatus = Literal["started", "succeeded", "failed"]


class WeChatLoginAttempt(SQLModel, table=True):
    """Short-lived record for WeChat login attempts (anti-replay + audit)."""

    __tablename__ = "wechatloginattempt"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    state: str = Field(max_length=64, unique=True, index=True)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(tz=__import__("datetime").timezone.utc)
    )
    expires_at: datetime
    completed_at: datetime | None = None
    # Use str for DB compatibility; Literal type for validation in API schemas
    status: str = Field(default="started", max_length=20)
    failure_category: str | None = Field(default=None, max_length=50)
    # Optional: track user_id if available (for linking flows)
    user_id: uuid.UUID | None = Field(
        default=None, foreign_key="user.id", nullable=True, ondelete="SET NULL"
    )


# ---------------------------------------------------------------------------
# WeChat Login API Schemas
# ---------------------------------------------------------------------------


class WeChatLoginStartRequest(SQLModel):
    """Request body for starting WeChat login."""

    return_to: str | None = Field(default=None, max_length=2048)


class WeChatLoginStartResponse(SQLModel):
    """Response with parameters to render embedded WeChat QR."""

    appid: str
    scope: str
    redirect_uri: str
    state: str
    wx_login_js_url: str = (
        "https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"
    )


class WeChatLoginCompleteRequest(SQLModel):
    """Request body for completing WeChat login."""

    code: str = Field(min_length=1, max_length=512)
    state: str = Field(min_length=1, max_length=64)


class WeChatLinkRequest(SQLModel):
    """Request body for linking WeChat to current user."""

    code: str = Field(min_length=1, max_length=512)
    state: str = Field(min_length=1, max_length=64)


# ---------------------------------------------------------------------------
# AI Resource Hub Models
# ---------------------------------------------------------------------------


# ---------------------------------------------------------------------------
# Category Models (for resource classification)
# ---------------------------------------------------------------------------


# Category base properties
class CategoryBase(SQLModel):
    name: str = Field(min_length=1, max_length=100)


# Properties to receive on category creation
class CategoryCreate(CategoryBase):
    pass


# Properties to receive on category update (rename)
class CategoryUpdate(CategoryBase):
    pass


# Database model for Category
class Category(CategoryBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    resources: list["Resource"] = Relationship(back_populates="category")
    submissions: list["ResourceSubmission"] = Relationship(back_populates="category")


# Properties to return via API (public)
class CategoryPublic(CategoryBase):
    id: uuid.UUID


# Extended response for admin with usage info
class CategoryAdmin(CategoryPublic):
    in_use: bool = False
    resources_count: int = 0
    submissions_count: int = 0


class CategoriesPublic(SQLModel):
    data: list[CategoryPublic]
    count: int


class CategoriesAdmin(SQLModel):
    data: list[CategoryAdmin]
    count: int


# ---------------------------------------------------------------------------
# Resource Models
# ---------------------------------------------------------------------------


# Resource base properties
class ResourceBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=10000)
    destination_url: str = Field(max_length=2048)
    category_id: uuid.UUID | None = Field(default=None)


# Properties to receive on resource creation
class ResourceCreate(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=10000)
    destination_url: str = Field(max_length=2048)
    category_id: uuid.UUID | None = Field(default=None)
    image_external_url: str | None = Field(default=None, max_length=2048)


# Properties to receive on resource update
class ResourceUpdate(SQLModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=10000)
    destination_url: str | None = Field(default=None, max_length=2048)
    category_id: uuid.UUID | None = Field(default=None)
    is_published: bool | None = None
    image_external_url: str | None = Field(default=None, max_length=2048)


# Database model for Resource
class Resource(ResourceBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    is_published: bool = Field(default=False, index=True)
    published_by_id: uuid.UUID | None = Field(
        default=None, foreign_key="user.id", nullable=True, ondelete="SET NULL"
    )
    # Category FK (nullable during migration; FK constraint added via migration)
    category_id: uuid.UUID | None = Field(
        default=None, foreign_key="category.id", nullable=True, index=True
    )
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Unique constraint on destination_url
    destination_url: str = Field(max_length=2048, unique=True, index=True)

    # Resource image fields (mutually exclusive: external URL OR uploaded image)
    # External image URL (stored directly, backend does not proxy/fetch)
    image_external_url: str | None = Field(default=None, max_length=2048)
    # Uploaded image metadata (bytes stored on filesystem, not in DB)
    image_key: str | None = Field(default=None, max_length=255)
    image_version: int = Field(default=0)
    image_content_type: str | None = Field(default=None, max_length=50)
    image_updated_at: datetime | None = Field(default=None)

    # Relationships
    category: Optional["Category"] = Relationship(back_populates="resources")
    likes: list["Like"] = Relationship(back_populates="resource", cascade_delete=True)
    favorites: list["Favorite"] = Relationship(
        back_populates="resource", cascade_delete=True
    )
    comments: list["Comment"] = Relationship(
        back_populates="resource", cascade_delete=True
    )


# Properties to return via API
class ResourcePublic(SQLModel):
    id: uuid.UUID
    title: str
    description: str | None = None
    destination_url: str
    category_id: uuid.UUID | None = None
    category_name: str | None = None  # Denormalized for convenience
    is_published: bool
    published_by_id: uuid.UUID | None = None
    published_by_display: str | None = None
    published_by_avatar_url: str | None = None
    created_at: datetime
    updated_at: datetime
    # New fields for resources view redesign
    likes_count: int = 0  # Likes count for Grid/List display (avoids N+1 fetches)
    image_url: str | None = (
        None  # Computed: external URL or versioned uploaded-image URL
    )


# Extended response for resource detail (single resource) with reaction info
class ResourceDetailPublic(ResourcePublic):
    likes_count: int = 0
    favorites_count: int = 0
    liked_by_me: bool = False
    favorited_by_me: bool = False


class ResourcesPublic(SQLModel):
    data: list[ResourcePublic]
    count: int


# ResourceSubmission base properties
class ResourceSubmissionBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=10000)
    destination_url: str = Field(max_length=2048)
    category_id: uuid.UUID | None = Field(default=None)


# Properties to receive on submission creation
class ResourceSubmissionCreate(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=10000)
    destination_url: str = Field(max_length=2048)
    category_id: uuid.UUID | None = Field(default=None)


# Properties to receive on submission update
class ResourceSubmissionUpdate(SQLModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=10000)
    destination_url: str | None = Field(default=None, max_length=2048)
    category_id: uuid.UUID | None = Field(default=None)


# Database model for ResourceSubmission
class ResourceSubmission(ResourceSubmissionBase, table=True):
    __tablename__ = "resourcesubmission"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    status: str = Field(
        default="pending", max_length=20, index=True
    )  # pending, approved, rejected
    submitter_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    # Category FK (nullable during migration; FK constraint added via migration)
    category_id: uuid.UUID | None = Field(
        default=None, foreign_key="category.id", nullable=True, index=True
    )
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    submitter: User | None = Relationship()
    category: Optional["Category"] = Relationship(back_populates="submissions")


# Properties to return via API
class ResourceSubmissionPublic(SQLModel):
    id: uuid.UUID
    title: str
    description: str | None = None
    destination_url: str
    category_id: uuid.UUID | None = None
    category_name: str | None = None  # Denormalized for convenience
    status: str
    submitter_id: uuid.UUID
    created_at: datetime
    updated_at: datetime


class ResourceSubmissionsPublic(SQLModel):
    data: list[ResourceSubmissionPublic]
    count: int


# Like model (many-to-many: User <-> Resource)
class Like(SQLModel, table=True):
    user_id: uuid.UUID = Field(
        foreign_key="user.id", primary_key=True, ondelete="CASCADE"
    )
    resource_id: uuid.UUID = Field(
        foreign_key="resource.id", primary_key=True, ondelete="CASCADE"
    )
    created_at: datetime = Field(default_factory=datetime.utcnow)

    user: User | None = Relationship()
    resource: Resource | None = Relationship(back_populates="likes")


# Favorite model (many-to-many: User <-> Resource)
class Favorite(SQLModel, table=True):
    user_id: uuid.UUID = Field(
        foreign_key="user.id", primary_key=True, ondelete="CASCADE"
    )
    resource_id: uuid.UUID = Field(
        foreign_key="resource.id", primary_key=True, ondelete="CASCADE"
    )
    created_at: datetime = Field(default_factory=datetime.utcnow)

    user: User | None = Relationship()
    resource: Resource | None = Relationship(back_populates="favorites")


# Comment base properties
class CommentBase(SQLModel):
    body: str = Field(min_length=1, max_length=2048)


# Properties to receive on comment creation
class CommentCreate(CommentBase):
    pass


# Properties to receive on comment update
class CommentUpdate(SQLModel):
    body: str | None = Field(default=None, min_length=1, max_length=2048)


# Database model for Comment
class Comment(CommentBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    author_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    resource_id: uuid.UUID = Field(
        foreign_key="resource.id", nullable=False, ondelete="CASCADE"
    )
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    author: User | None = Relationship()
    resource: Resource | None = Relationship(back_populates="comments")


# Properties to return via API
class CommentPublic(CommentBase):
    id: uuid.UUID
    author_id: uuid.UUID
    author_display: str | None = None
    resource_id: uuid.UUID
    created_at: datetime
    updated_at: datetime


class CommentsPublic(SQLModel):
    data: list[CommentPublic]
    count: int


# Reaction state for like/favorite responses
class ReactionState(SQLModel):
    active: bool
    count: int


# SubmissionComment model for comments on submissions
class SubmissionComment(SQLModel, table=True):
    __tablename__ = "submissioncomment"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    body: str = Field(min_length=1, max_length=2048)
    author_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    submission_id: uuid.UUID = Field(
        foreign_key="resourcesubmission.id", nullable=False, ondelete="CASCADE"
    )
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    author: User | None = Relationship()


class SubmissionCommentPublic(SQLModel):
    id: uuid.UUID
    body: str
    author_id: uuid.UUID
    author_display: str | None = None
    submission_id: uuid.UUID
    created_at: datetime
    updated_at: datetime


class SubmissionCommentsPublic(SQLModel):
    data: list[SubmissionCommentPublic]
    count: int


# ---------------------------------------------------------------------------
# Saved Chat Transcript Models (Landing Page AI Chat)
# ---------------------------------------------------------------------------


from sqlalchemy import JSON, Column  # noqa: E402


class ChatMessageSchema(SQLModel):
    """Schema for a single chat message in a transcript."""

    role: str = Field(max_length=20)  # "user" or "assistant"
    content: str = Field(min_length=1, max_length=4000)
    created_at: datetime | None = None


class ChatTranscriptCreate(SQLModel):
    """Request body for saving a chat transcript."""

    title: str | None = Field(default=None, max_length=120)
    messages: list[ChatMessageSchema] = Field(min_length=1)


class SavedChatTranscript(SQLModel, table=True):
    """User-owned saved copy of a chat session."""

    __tablename__ = "savedchattranscript"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE", index=True
    )
    title: str | None = Field(default=None, max_length=120)
    # Store messages as JSON array in PostgreSQL
    messages: list = Field(default_factory=list, sa_column=Column(JSON, nullable=False))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    user: User | None = Relationship()


class ChatTranscriptPublic(SQLModel):
    """Response schema for a saved chat transcript."""

    id: uuid.UUID
    title: str | None
    messages: list[ChatMessageSchema]
    created_at: datetime
    updated_at: datetime


class ChatTranscriptsPublic(SQLModel):
    """Paginated list of saved chat transcripts."""

    data: list[ChatTranscriptPublic]
    count: int


# ---------------------------------------------------------------------------
# Landing Chat Request/Response Schemas
# ---------------------------------------------------------------------------


class LandingChatRequest(SQLModel):
    """Request body for landing chat recommendations."""

    message: str = Field(min_length=1, max_length=4000)


class ResourcePreview(SQLModel):
    """Compact resource summary for chat recommendations."""

    id: uuid.UUID
    title: str
    description: str | None
    category_id: uuid.UUID | None = None
    category_name: str | None = None


class LandingChatResponse(SQLModel):
    """Response from landing chat recommendations endpoint."""

    assistant_message: str
    recommendations: list[ResourcePreview]
