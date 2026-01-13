"""Tests for submission review endpoints (admin approve/reject)."""

import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from tests.utils.resource import create_random_resource
from tests.utils.submission import create_random_submission
from tests.utils.user import create_random_user


def test_approve_submission(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test approving a submission creates a published resource."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="pending")

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/approve",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["status"] == "approved"

    # Verify resource was created
    response = client.get(f"{settings.API_V1_STR}/resources/")
    resources = response.json()["data"]
    urls = [r["destination_url"] for r in resources]
    assert submission.destination_url in urls


def test_approve_submission_requires_admin(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that only admins can approve submissions."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="pending")

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/approve",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 403


def test_approve_submission_duplicate_url(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that approval fails if a resource with the URL already exists."""
    user = create_random_user(db)
    # Create a resource first
    existing = create_random_resource(db, is_published=True)
    # Create submission with same URL
    submission = create_random_submission(
        db, submitter=user, destination_url=existing.destination_url, status="pending"
    )

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/approve",
        headers=superuser_token_headers,
    )
    assert response.status_code == 409


def test_approve_non_pending_submission(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that already approved/rejected submissions cannot be approved."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="rejected")

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/approve",
        headers=superuser_token_headers,
    )
    assert response.status_code == 400


def test_reject_submission(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test rejecting a submission."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="pending")

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/reject",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["status"] == "rejected"


def test_reject_submission_requires_admin(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that only admins can reject submissions."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="pending")

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/reject",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 403


def test_reject_non_pending_submission(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that already approved/rejected submissions cannot be rejected."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="approved")

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/reject",
        headers=superuser_token_headers,
    )
    assert response.status_code == 400


def test_approve_submission_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    """Test approving a non-existent submission."""
    response = client.post(
        f"{settings.API_V1_STR}/submissions/{uuid.uuid4()}/approve",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404


def test_reject_submission_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    """Test rejecting a non-existent submission."""
    response = client.post(
        f"{settings.API_V1_STR}/submissions/{uuid.uuid4()}/reject",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404


def test_admin_can_filter_submissions_by_status(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that admins can filter submissions by status."""
    user = create_random_user(db)
    create_random_submission(db, submitter=user, status="pending")
    create_random_submission(db, submitter=user, status="approved")
    create_random_submission(db, submitter=user, status="rejected")

    # Filter by approved
    response = client.get(
        f"{settings.API_V1_STR}/submissions/",
        headers=superuser_token_headers,
        params={"status": "approved"},
    )
    assert response.status_code == 200
    for s in response.json()["data"]:
        assert s["status"] == "approved"
