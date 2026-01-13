"""Tests for resource API routes."""

import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from tests.utils.resource import create_random_resource


def test_list_resources_public(client: TestClient, db: Session) -> None:
    """Test listing published resources (public endpoint)."""
    resource = create_random_resource(db, is_published=True)
    response = client.get(f"{settings.API_V1_STR}/resources/")
    assert response.status_code == 200
    content = response.json()
    assert "data" in content
    assert "count" in content
    # Check our resource is in the list
    resource_ids = [r["id"] for r in content["data"]]
    assert str(resource.id) in resource_ids


def test_list_resources_hides_unpublished(client: TestClient, db: Session) -> None:
    """Test that unpublished resources are hidden from public listing."""
    unpublished = create_random_resource(db, is_published=False)
    response = client.get(f"{settings.API_V1_STR}/resources/")
    assert response.status_code == 200
    content = response.json()
    resource_ids = [r["id"] for r in content["data"]]
    assert str(unpublished.id) not in resource_ids


def test_list_resources_with_search(client: TestClient, db: Session) -> None:
    """Test searching resources by keyword."""
    unique_title = f"UniqueSearchTerm{uuid.uuid4().hex[:8]}"
    resource = create_random_resource(db, title=unique_title, is_published=True)
    response = client.get(
        f"{settings.API_V1_STR}/resources/", params={"q": unique_title}
    )
    assert response.status_code == 200
    content = response.json()
    assert content["count"] >= 1
    resource_ids = [r["id"] for r in content["data"]]
    assert str(resource.id) in resource_ids


def test_list_resources_with_type_filter(client: TestClient) -> None:
    """Test filtering resources by type."""
    unique_type = f"testtype{uuid.uuid4().hex[:8]}"
    response = client.get(
        f"{settings.API_V1_STR}/resources/", params={"type": unique_type}
    )
    assert response.status_code == 200
    content = response.json()
    assert content["count"] >= 1
    for r in content["data"]:
        assert r["type"] == unique_type


def test_get_resource(client: TestClient, db: Session) -> None:
    """Test getting a published resource by ID."""
    resource = create_random_resource(db, is_published=True)
    response = client.get(f"{settings.API_V1_STR}/resources/{resource.id}")
    assert response.status_code == 200
    content = response.json()
    assert content["id"] == str(resource.id)
    assert content["title"] == resource.title
    assert content["destination_url"] == resource.destination_url


def test_get_resource_not_found(client: TestClient) -> None:
    """Test getting a non-existent resource."""
    response = client.get(f"{settings.API_V1_STR}/resources/{uuid.uuid4()}")
    assert response.status_code == 404
    assert response.json()["detail"] == "Resource not found"


def test_get_unpublished_resource_forbidden(client: TestClient, db: Session) -> None:
    """Test that unpublished resources are not visible to anonymous users."""
    resource = create_random_resource(db, is_published=False)
    response = client.get(f"{settings.API_V1_STR}/resources/{resource.id}")
    assert response.status_code == 404


def test_create_resource_admin(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    """Test creating a resource as admin."""
    data = {
        "title": "Test Resource",
        "description": "A test resource",
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "type": "tutorial",
    }
    response = client.post(
        f"{settings.API_V1_STR}/resources/",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["title"] == data["title"]
    assert content["destination_url"] == data["destination_url"]
    assert content["is_published"] is True


def test_create_resource_forbidden_for_normal_user(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test that normal users cannot create resources."""
    data = {
        "title": "Test Resource",
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "type": "tutorial",
    }
    response = client.post(
        f"{settings.API_V1_STR}/resources/",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 403


def test_create_resource_duplicate_url(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that duplicate destination URLs are rejected."""
    existing = create_random_resource(db, is_published=True)
    data = {
        "title": "Another Resource",
        "destination_url": existing.destination_url,
        "type": "tutorial",
    }
    response = client.post(
        f"{settings.API_V1_STR}/resources/",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 409
    assert "destination URL already exists" in response.json()["detail"]


def test_update_resource_admin(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test updating a resource as admin."""
    resource = create_random_resource(db, is_published=True)
    data = {"title": "Updated Title", "description": "Updated description"}
    response = client.put(
        f"{settings.API_V1_STR}/resources/{resource.id}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["title"] == data["title"]
    assert content["description"] == data["description"]


def test_update_resource_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    """Test updating a non-existent resource."""
    data = {"title": "Updated Title"}
    response = client.put(
        f"{settings.API_V1_STR}/resources/{uuid.uuid4()}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 404


def test_delete_resource_admin(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test deleting a resource as admin."""
    resource = create_random_resource(db, is_published=True)
    response = client.delete(
        f"{settings.API_V1_STR}/resources/{resource.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    # Verify deletion
    response = client.get(f"{settings.API_V1_STR}/resources/{resource.id}")
    assert response.status_code == 404


def test_delete_resource_forbidden_for_normal_user(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that normal users cannot delete resources."""
    resource = create_random_resource(db, is_published=True)
    response = client.delete(
        f"{settings.API_V1_STR}/resources/{resource.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 403


def test_admin_can_see_unpublished(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that admins can see unpublished resources."""
    resource = create_random_resource(db, is_published=False)
    response = client.get(
        f"{settings.API_V1_STR}/resources/{resource.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    assert response.json()["id"] == str(resource.id)


def test_admin_can_filter_by_published_status(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that admins can filter resources by is_published."""
    create_random_resource(db, is_published=False)
    response = client.get(
        f"{settings.API_V1_STR}/resources/",
        headers=superuser_token_headers,
        params={"is_published": False},
    )
    assert response.status_code == 200
    content = response.json()
    # All returned resources should be unpublished
    for r in content["data"]:
        assert r["is_published"] is False
