"""Test factories for Comment model."""
import uuid

from sqlmodel import Session

from app.models import Comment, Resource, User


def create_random_comment(
    db: Session,
    *,
    author: User,
    resource: Resource,
    body: str | None = None,
) -> Comment:
    """Create a random comment for testing."""
    if body is None:
        body = f"Test comment {uuid.uuid4().hex[:8]}"

    comment = Comment(
        body=body,
        author_id=author.id,
        resource_id=resource.id,
    )
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment
