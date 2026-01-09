"""Test factories for ResourceSubmission model."""
import uuid

from sqlmodel import Session

from app.models import ResourceSubmission, User


def create_random_submission(
    db: Session,
    *,
    submitter: User,
    title: str | None = None,
    description: str | None = None,
    destination_url: str | None = None,
    type: str | None = None,
    status: str = "pending",
) -> ResourceSubmission:
    """Create a random submission for testing."""
    if title is None:
        title = f"Test Submission {uuid.uuid4().hex[:8]}"
    if description is None:
        description = f"Description for {title}"
    if destination_url is None:
        destination_url = f"https://example.com/submit/{uuid.uuid4().hex}"
    if type is None:
        type = "tutorial"

    submission = ResourceSubmission(
        title=title,
        description=description,
        destination_url=destination_url,
        type=type,
        submitter_id=submitter.id,
        status=status,
    )
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission
