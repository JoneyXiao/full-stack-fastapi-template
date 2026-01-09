"""Tests for resource reaction endpoints (like/favorite)."""
import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from tests.utils.resource import create_random_resource


def test_like_resource(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test liking a resource."""
    resource = create_random_resource(db, is_published=True)
    response = client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/like",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["active"] is True
    assert content["count"] >= 1


def test_like_resource_idempotent(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that liking a resource multiple times is idempotent."""
    resource = create_random_resource(db, is_published=True)
    # Like twice
    client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/like",
        headers=normal_user_token_headers,
    )
    response = client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/like",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200
    assert response.json()["active"] is True


def test_unlike_resource(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test unliking a resource."""
    resource = create_random_resource(db, is_published=True)
    # Like first
    client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/like",
        headers=normal_user_token_headers,
    )
    # Unlike
    response = client.delete(
        f"{settings.API_V1_STR}/resources/{resource.id}/like",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["active"] is False


def test_like_requires_auth(client: TestClient, db: Session) -> None:
    """Test that liking requires authentication."""
    resource = create_random_resource(db, is_published=True)
    response = client.post(f"{settings.API_V1_STR}/resources/{resource.id}/like")
    assert response.status_code == 401


def test_like_resource_not_found(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test liking a non-existent resource."""
    response = client.post(
        f"{settings.API_V1_STR}/resources/{uuid.uuid4()}/like",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 404


def test_favorite_resource(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test favoriting a resource."""
    resource = create_random_resource(db, is_published=True)
    response = client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/favorite",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["active"] is True
    assert content["count"] >= 1


def test_unfavorite_resource(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test unfavoriting a resource."""
    resource = create_random_resource(db, is_published=True)
    # Favorite first
    client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/favorite",
        headers=normal_user_token_headers,
    )
    # Unfavorite
    response = client.delete(
        f"{settings.API_V1_STR}/resources/{resource.id}/favorite",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["active"] is False


def test_list_my_favorites(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test listing user's favorited resources."""
    resource = create_random_resource(db, is_published=True)
    # Favorite it
    client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/favorite",
        headers=normal_user_token_headers,
    )
    # List favorites
    response = client.get(
        f"{settings.API_V1_STR}/resources/me/favorites",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert "data" in content
    assert "count" in content
    resource_ids = [r["id"] for r in content["data"]]
    assert str(resource.id) in resource_ids


def test_list_my_favorites_requires_auth(client: TestClient) -> None:
    """Test that listing favorites requires authentication."""
    response = client.get(f"{settings.API_V1_STR}/resources/me/favorites")
    assert response.status_code == 401
