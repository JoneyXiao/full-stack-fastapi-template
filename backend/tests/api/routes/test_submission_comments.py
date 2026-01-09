"""Tests for submission comment endpoints."""
import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from tests.utils.submission import create_random_submission
from tests.utils.user import create_random_user


def test_list_submission_comments(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test listing comments for a submission."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="pending")

    response = client.get(
        f"{settings.API_V1_STR}/submissions/{submission.id}/comments",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert "data" in content
    assert "count" in content


def test_list_submission_comments_requires_auth(
    client: TestClient, db: Session
) -> None:
    """Test that listing submission comments requires authentication."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="pending")

    response = client.get(f"{settings.API_V1_STR}/submissions/{submission.id}/comments")
    assert response.status_code == 401


def test_create_submission_comment(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test creating a comment on a submission."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="pending")

    data = {"body": "This looks promising!"}
    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/comments",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["body"] == data["body"]
    assert content["submission_id"] == str(submission.id)


def test_create_submission_comment_requires_auth(
    client: TestClient, db: Session
) -> None:
    """Test that creating a submission comment requires authentication."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="pending")

    data = {"body": "Anonymous comment"}
    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/comments",
        json=data,
    )
    assert response.status_code == 401


def test_create_submission_comment_not_found(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test creating a comment on a non-existent submission."""
    data = {"body": "Comment on nothing"}
    response = client.post(
        f"{settings.API_V1_STR}/submissions/{uuid.uuid4()}/comments",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 404


def test_update_submission_comment_by_author(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test updating a submission comment by its author."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="pending")

    # Create comment
    data = {"body": "Original comment"}
    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/comments",
        headers=normal_user_token_headers,
        json=data,
    )
    comment_id = response.json()["id"]

    # Update it
    update_data = {"body": "Updated comment"}
    response = client.put(
        f"{settings.API_V1_STR}/comments/submission/{comment_id}",
        headers=normal_user_token_headers,
        json=update_data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["body"] == update_data["body"]


def test_delete_submission_comment_by_author(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test deleting a submission comment by its author."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="pending")

    # Create comment
    data = {"body": "Comment to delete"}
    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/comments",
        headers=normal_user_token_headers,
        json=data,
    )
    comment_id = response.json()["id"]

    # Delete it
    response = client.delete(
        f"{settings.API_V1_STR}/comments/submission/{comment_id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200


def test_delete_submission_comment_by_admin(
    client: TestClient,
    superuser_token_headers: dict[str, str],
    normal_user_token_headers: dict[str, str],
    db: Session,
) -> None:
    """Test that admins can delete any submission comment."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="pending")

    # Create comment as normal user
    data = {"body": "Comment to be moderated"}
    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/comments",
        headers=normal_user_token_headers,
        json=data,
    )
    comment_id = response.json()["id"]

    # Delete as admin
    response = client.delete(
        f"{settings.API_V1_STR}/comments/submission/{comment_id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
