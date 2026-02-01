"""Test factories for ResourceSubmission model."""

import uuid

from sqlmodel import Session

from app.models import ResourceSubmission, User
from tests.utils.resource import get_or_create_category


def create_random_submission(
    db: Session,
    *,
    submitter: User,
    title: str | None = None,
    description: str | None = None,
    destination_url: str | None = None,
    category_id: uuid.UUID | None = None,
    category_name: str | None = None,
    status: str = "pending",
) -> ResourceSubmission:
    """Create a random submission for testing.

    If category_id is provided, it is used directly.
    If category_name is provided without category_id, a matching category is created/retrieved.
    If neither is provided, uses default category "tutorial".
    """
    if title is None:
        title = f"Test Submission {uuid.uuid4().hex[:8]}"
    if description is None:
        description = f"Description for {title}"
    if destination_url is None:
        destination_url = f"https://example.com/submit/{uuid.uuid4().hex}"
    if category_name is None:
        category_name = "tutorial"

    # Resolve category_id if not provided
    if category_id is None:
        category = get_or_create_category(db, name=category_name)
        category_id = category.id

    submission = ResourceSubmission(
        title=title,
        description=description,
        destination_url=destination_url,
        category_id=category_id,
        submitter_id=submitter.id,
        status=status,
    )
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission
