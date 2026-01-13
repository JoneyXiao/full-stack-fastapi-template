"""Test factories for Resource model."""

import uuid

from sqlmodel import Session

from app.models import Resource


def create_random_resource(
    db: Session,
    *,
    title: str | None = None,
    description: str | None = None,
    destination_url: str | None = None,
    type: str | None = None,
    is_published: bool = True,
) -> Resource:
    """Create a random resource for testing."""
    if title is None:
        title = f"Test Resource {uuid.uuid4().hex[:8]}"
    if description is None:
        description = f"Description for {title}"
    if destination_url is None:
        destination_url = f"https://example.com/{uuid.uuid4().hex}"
    if type is None:
        type = "tutorial"

    resource = Resource(
        title=title,
        description=description,
        destination_url=destination_url,
        type=type,
        is_published=is_published,
    )
    db.add(resource)
    db.commit()
    db.refresh(resource)
    return resource
