import uuid
from typing import Literal

from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel

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
    items: list["Item"] = Relationship(back_populates="owner", cascade_delete=True)


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID
    locale: SupportedLocale | None = None


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
# AI Resource Hub Models
# ---------------------------------------------------------------------------


from datetime import datetime  # noqa: E402


# Resource base properties
class ResourceBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=1024)
    destination_url: str = Field(max_length=2048)
    type: str = Field(max_length=50)  # e.g., "tutorial", "tool", "paper", etc.


# Properties to receive on resource creation
class ResourceCreate(ResourceBase):
    pass


# Properties to receive on resource update
class ResourceUpdate(SQLModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=1024)
    destination_url: str | None = Field(default=None, max_length=2048)
    type: str | None = Field(default=None, max_length=50)
    is_published: bool | None = None


# Database model for Resource
class Resource(ResourceBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    is_published: bool = Field(default=False, index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Unique constraint on destination_url
    destination_url: str = Field(max_length=2048, unique=True, index=True)

    # Relationships
    likes: list["Like"] = Relationship(back_populates="resource", cascade_delete=True)
    favorites: list["Favorite"] = Relationship(
        back_populates="resource", cascade_delete=True
    )
    comments: list["Comment"] = Relationship(
        back_populates="resource", cascade_delete=True
    )


# Properties to return via API
class ResourcePublic(ResourceBase):
    id: uuid.UUID
    is_published: bool
    created_at: datetime
    updated_at: datetime


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
    description: str | None = Field(default=None, max_length=1024)
    destination_url: str = Field(max_length=2048)
    type: str = Field(max_length=50)


# Properties to receive on submission creation
class ResourceSubmissionCreate(ResourceSubmissionBase):
    pass


# Properties to receive on submission update
class ResourceSubmissionUpdate(SQLModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=1024)
    destination_url: str | None = Field(default=None, max_length=2048)
    type: str | None = Field(default=None, max_length=50)


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
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    submitter: User | None = Relationship()


# Properties to return via API
class ResourceSubmissionPublic(ResourceSubmissionBase):
    id: uuid.UUID
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
    type: str


class LandingChatResponse(SQLModel):
    """Response from landing chat recommendations endpoint."""

    assistant_message: str
    recommendations: list[ResourcePreview]
