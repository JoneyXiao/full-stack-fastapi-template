"""Tests for submission API routes."""
import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from tests.utils.resource import create_random_resource
from tests.utils.submission import create_random_submission
from tests.utils.user import create_random_user


def test_create_submission(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test creating a new submission."""
    data = {
        "title": "Great AI Tool",
        "description": "A helpful tool for AI development",
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "type": "tool",
    }
    response = client.post(
        f"{settings.API_V1_STR}/submissions/",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["title"] == data["title"]
    assert content["status"] == "pending"
    assert "id" in content


def test_create_submission_requires_auth(client: TestClient) -> None:
    """Test that creating a submission requires authentication."""
    data = {
        "title": "Test",
        "destination_url": "https://example.com/test",
        "type": "tutorial",
    }
    response = client.post(f"{settings.API_V1_STR}/submissions/", json=data)
    assert response.status_code == 401


def test_create_submission_duplicate_resource_url(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that submission is rejected if Resource with same URL exists."""
    existing_resource = create_random_resource(db, is_published=True)
    data = {
        "title": "Duplicate submission",
        "destination_url": existing_resource.destination_url,
        "type": "tutorial",
    }
    response = client.post(
        f"{settings.API_V1_STR}/submissions/",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 409
    assert "destination URL already exists" in response.json()["detail"]


def test_list_pending_submissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test listing pending submissions (auth required)."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="pending")

    response = client.get(
        f"{settings.API_V1_STR}/submissions/",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert "data" in content
    # All returned should be pending for non-admin
    for s in content["data"]:
        assert s["status"] == "pending"


def test_list_submissions_requires_auth(client: TestClient) -> None:
    """Test that listing submissions requires authentication."""
    response = client.get(f"{settings.API_V1_STR}/submissions/")
    assert response.status_code == 401


def test_get_submission_by_owner(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test getting own submission."""
    # Create submission as the logged-in user
    data = {
        "title": "My submission",
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "type": "tool",
    }
    response = client.post(
        f"{settings.API_V1_STR}/submissions/",
        headers=normal_user_token_headers,
        json=data,
    )
    submission_id = response.json()["id"]

    # Get it
    response = client.get(
        f"{settings.API_V1_STR}/submissions/{submission_id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200
    assert response.json()["id"] == submission_id


def test_get_submission_not_owner(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that users cannot view others' submissions (except pending list)."""
    other_user = create_random_user(db)
    submission = create_random_submission(db, submitter=other_user)

    response = client.get(
        f"{settings.API_V1_STR}/submissions/{submission.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 403


def test_update_pending_submission(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test updating a pending submission."""
    # Create submission
    data = {
        "title": "Original title",
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "type": "tool",
    }
    response = client.post(
        f"{settings.API_V1_STR}/submissions/",
        headers=normal_user_token_headers,
        json=data,
    )
    submission_id = response.json()["id"]

    # Update it
    update_data = {"title": "Updated title"}
    response = client.put(
        f"{settings.API_V1_STR}/submissions/{submission_id}",
        headers=normal_user_token_headers,
        json=update_data,
    )
    assert response.status_code == 200
    assert response.json()["title"] == update_data["title"]


def test_cannot_update_approved_submission(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that approved submissions cannot be updated."""
    # Create and manually approve a submission
    data = {
        "title": "To be approved",
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "type": "tool",
    }
    response = client.post(
        f"{settings.API_V1_STR}/submissions/",
        headers=normal_user_token_headers,
        json=data,
    )
    submission_id = response.json()["id"]

    # Manually update status in DB to approved
    from app.models import ResourceSubmission
    from app.core.db import engine
    from sqlmodel import Session as SQLSession
    with SQLSession(engine) as session:
        submission = session.get(ResourceSubmission, uuid.UUID(submission_id))
        if submission:
            submission.status = "approved"
            session.add(submission)
            session.commit()

    # Try to update
    update_data = {"title": "Cannot update"}
    response = client.put(
        f"{settings.API_V1_STR}/submissions/{submission_id}",
        headers=normal_user_token_headers,
        json=update_data,
    )
    assert response.status_code == 400


def test_list_my_submissions(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test listing user's own submissions."""
    # Create some submissions
    for _ in range(2):
        data = {
            "title": f"My submission {uuid.uuid4().hex[:8]}",
            "destination_url": f"https://example.com/{uuid.uuid4().hex}",
            "type": "tool",
        }
        client.post(
            f"{settings.API_V1_STR}/submissions/",
            headers=normal_user_token_headers,
            json=data,
        )

    response = client.get(
        f"{settings.API_V1_STR}/submissions/mine",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["count"] >= 2


def test_delete_pending_submission(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test deleting a pending submission."""
    # Create submission
    data = {
        "title": "To delete",
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "type": "tool",
    }
    response = client.post(
        f"{settings.API_V1_STR}/submissions/",
        headers=normal_user_token_headers,
        json=data,
    )
    submission_id = response.json()["id"]

    # Delete it
    response = client.delete(
        f"{settings.API_V1_STR}/submissions/{submission_id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200
