"""Tests for resource comment endpoints."""
import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from tests.utils.resource import create_random_resource
from tests.utils.comment import create_random_comment
from tests.utils.user import create_random_user


def test_list_resource_comments(client: TestClient, db: Session) -> None:
    """Test listing comments for a resource (public endpoint)."""
    resource = create_random_resource(db, is_published=True)
    user = create_random_user(db)
    comment = create_random_comment(db, author=user, resource=resource)

    response = client.get(f"{settings.API_V1_STR}/resources/{resource.id}/comments")
    assert response.status_code == 200
    content = response.json()
    assert "data" in content
    assert "count" in content
    assert content["count"] >= 1
    comment_ids = [c["id"] for c in content["data"]]
    assert str(comment.id) in comment_ids


def test_list_comments_resource_not_found(client: TestClient) -> None:
    """Test listing comments for a non-existent resource."""
    response = client.get(f"{settings.API_V1_STR}/resources/{uuid.uuid4()}/comments")
    assert response.status_code == 404


def test_create_comment(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test creating a comment on a resource."""
    resource = create_random_resource(db, is_published=True)
    data = {"body": "This is a great resource!"}
    response = client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/comments",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["body"] == data["body"]
    assert "id" in content
    assert "author_id" in content
    assert content["resource_id"] == str(resource.id)


def test_create_comment_requires_auth(client: TestClient, db: Session) -> None:
    """Test that creating a comment requires authentication."""
    resource = create_random_resource(db, is_published=True)
    data = {"body": "Anonymous comment"}
    response = client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/comments",
        json=data,
    )
    assert response.status_code == 401


def test_create_comment_resource_not_found(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test creating a comment on a non-existent resource."""
    data = {"body": "Comment on nothing"}
    response = client.post(
        f"{settings.API_V1_STR}/resources/{uuid.uuid4()}/comments",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 404


def test_update_comment_by_author(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test updating a comment by its author."""
    resource = create_random_resource(db, is_published=True)
    # Create comment
    data = {"body": "Original comment"}
    response = client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/comments",
        headers=normal_user_token_headers,
        json=data,
    )
    comment_id = response.json()["id"]

    # Update it
    update_data = {"body": "Updated comment"}
    response = client.put(
        f"{settings.API_V1_STR}/comments/{comment_id}",
        headers=normal_user_token_headers,
        json=update_data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["body"] == update_data["body"]


def test_update_comment_not_author(
    client: TestClient,
    superuser_token_headers: dict[str, str],
    normal_user_token_headers: dict[str, str],
    db: Session,
) -> None:
    """Test that users cannot update others' comments."""
    resource = create_random_resource(db, is_published=True)
    # Create comment as normal user
    data = {"body": "Normal user comment"}
    response = client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/comments",
        headers=normal_user_token_headers,
        json=data,
    )
    comment_id = response.json()["id"]

    # Try to update as superuser (should fail - superuser can delete but not edit others' comments)
    update_data = {"body": "Hijacked comment"}
    response = client.put(
        f"{settings.API_V1_STR}/comments/{comment_id}",
        headers=superuser_token_headers,
        json=update_data,
    )
    assert response.status_code == 403


def test_delete_comment_by_author(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test deleting a comment by its author."""
    resource = create_random_resource(db, is_published=True)
    # Create comment
    data = {"body": "Comment to delete"}
    response = client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/comments",
        headers=normal_user_token_headers,
        json=data,
    )
    comment_id = response.json()["id"]

    # Delete it
    response = client.delete(
        f"{settings.API_V1_STR}/comments/{comment_id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200


def test_delete_comment_by_admin(
    client: TestClient,
    superuser_token_headers: dict[str, str],
    normal_user_token_headers: dict[str, str],
    db: Session,
) -> None:
    """Test that admins can delete any comment."""
    resource = create_random_resource(db, is_published=True)
    # Create comment as normal user
    data = {"body": "Comment to be moderated"}
    response = client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/comments",
        headers=normal_user_token_headers,
        json=data,
    )
    comment_id = response.json()["id"]

    # Delete as admin
    response = client.delete(
        f"{settings.API_V1_STR}/comments/{comment_id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200


def test_delete_comment_not_author_not_admin(
    client: TestClient, db: Session
) -> None:
    """Test that users cannot delete others' comments unless admin."""
    resource = create_random_resource(db, is_published=True)
    user1 = create_random_user(db)
    comment = create_random_comment(db, author=user1, resource=resource)

    # Create another user
    from tests.utils.user import authentication_token_from_email
    user2 = create_random_user(db)
    from fastapi.testclient import TestClient
    from app.main import app
    with TestClient(app) as c:
        user2_headers = authentication_token_from_email(
            client=c, email=user2.email, db=db
        )
        response = c.delete(
            f"{settings.API_V1_STR}/comments/{comment.id}",
            headers=user2_headers,
        )
        assert response.status_code == 403


def test_comment_not_found(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test operations on non-existent comment."""
    response = client.put(
        f"{settings.API_V1_STR}/comments/{uuid.uuid4()}",
        headers=normal_user_token_headers,
        json={"body": "Update nothing"},
    )
    assert response.status_code == 404

    response = client.delete(
        f"{settings.API_V1_STR}/comments/{uuid.uuid4()}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 404
