"""Test factories for Resource model."""

import uuid

from sqlmodel import Session

from app.models import Category, Resource


def get_or_create_category(
    db: Session,
    *,
    name: str = "tutorial",
) -> Category:
    """Get or create a category by name for testing."""
    from sqlalchemy import func
    from sqlmodel import select

    # Try to find existing category (case-insensitive)
    category = db.exec(
        select(Category).where(func.lower(Category.name) == name.lower())
    ).first()
    if category:
        return category

    # Create new category
    category = Category(name=name)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


def create_random_resource(
    db: Session,
    *,
    title: str | None = None,
    description: str | None = None,
    destination_url: str | None = None,
    category_id: uuid.UUID | None = None,
    category_name: str | None = None,
    is_published: bool = True,
) -> Resource:
    """Create a random resource for testing.

    If category_id is provided, it is used directly.
    If category_name is provided without category_id, a matching category is created/retrieved.
    If neither is provided, uses default category "tutorial".
    """
    if title is None:
        title = f"Test Resource {uuid.uuid4().hex[:8]}"
    if description is None:
        description = f"Description for {title}"
    if destination_url is None:
        destination_url = f"https://example.com/{uuid.uuid4().hex}"
    if category_name is None:
        category_name = "tutorial"

    # Resolve category_id if not provided
    if category_id is None:
        category = get_or_create_category(db, name=category_name)
        category_id = category.id

    resource = Resource(
        title=title,
        description=description,
        destination_url=destination_url,
        category_id=category_id,
        is_published=is_published,
    )
    db.add(resource)
    db.commit()
    db.refresh(resource)
    return resource
