"""Tests for resource API routes."""

import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from tests.utils.resource import create_random_resource, get_or_create_category


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


def test_list_resources_with_category_id_filter(
    client: TestClient, db: Session
) -> None:
    """Test filtering resources by category_id."""
    unique_name = f"testcategory{uuid.uuid4().hex[:8]}"
    category = get_or_create_category(db, name=unique_name)
    resource = create_random_resource(db, category_id=category.id, is_published=True)
    response = client.get(
        f"{settings.API_V1_STR}/resources/", params={"category_id": str(category.id)}
    )
    assert response.status_code == 200
    content = response.json()
    assert content["count"] >= 1
    resource_ids = [r["id"] for r in content["data"]]
    assert str(resource.id) in resource_ids
    # All returned resources should have this category_id
    for r in content["data"]:
        assert r["category_id"] == str(category.id)


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
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test creating a resource as admin with category_id."""
    category = get_or_create_category(db, name="tutorial")
    data = {
        "title": "Test Resource",
        "description": "A test resource",
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "category_id": str(category.id),
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
    assert content["category_id"] == str(category.id)
    assert content["category_name"] == "tutorial"


def test_create_resource_forbidden_for_normal_user(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that normal users cannot create resources."""
    category = get_or_create_category(db, name="tutorial")
    data = {
        "title": "Test Resource",
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "category_id": str(category.id),
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
    category = get_or_create_category(db, name="tutorial")
    data = {
        "title": "Another Resource",
        "destination_url": existing.destination_url,
        "category_id": str(category.id),
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


# ---------------------------------------------------------------------------
# Tests for resources view redesign (T011, T013, T014)
# ---------------------------------------------------------------------------


def test_list_resources_includes_likes_count_and_image_url(
    client: TestClient, db: Session
) -> None:
    """Test that list response includes likes_count and image_url fields (T013)."""
    resource = create_random_resource(db, is_published=True)
    response = client.get(f"{settings.API_V1_STR}/resources/")
    assert response.status_code == 200
    content = response.json()
    # Find our resource in the list
    resource_data = next(
        (r for r in content["data"] if r["id"] == str(resource.id)), None
    )
    assert resource_data is not None
    # Check likes_count is present and defaults to 0
    assert "likes_count" in resource_data
    assert resource_data["likes_count"] == 0
    # Check image_url is present (can be None for resources without images)
    assert "image_url" in resource_data


def test_get_resource_includes_image_url(client: TestClient, db: Session) -> None:
    """Test that detail response includes image_url field (T013)."""
    resource = create_random_resource(db, is_published=True)
    response = client.get(f"{settings.API_V1_STR}/resources/{resource.id}")
    assert response.status_code == 200
    content = response.json()
    # Check image_url is present (can be None for resources without images)
    assert "image_url" in content


def test_create_resource_with_valid_image_external_url(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test creating a resource with a valid image_external_url."""
    category = get_or_create_category(db, name="tutorial")
    data = {
        "title": "Test Resource With Image",
        "description": "A test resource",
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "category_id": str(category.id),
        "image_external_url": "https://example.com/image.png",
    }
    response = client.post(
        f"{settings.API_V1_STR}/resources/",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["image_url"] == "https://example.com/image.png"


def test_create_resource_invalid_image_external_url_scheme(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that invalid image_external_url schemes are rejected (T011)."""
    category = get_or_create_category(db, name="tutorial")
    data = {
        "title": "Test Resource",
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "category_id": str(category.id),
        "image_external_url": "ftp://example.com/image.png",
    }
    response = client.post(
        f"{settings.API_V1_STR}/resources/",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 400
    assert "http or https" in response.json()["detail"].lower()


def test_create_resource_invalid_image_external_url_no_host(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that image_external_url without host is rejected (T011)."""
    category = get_or_create_category(db, name="tutorial")
    data = {
        "title": "Test Resource",
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "category_id": str(category.id),
        "image_external_url": "https:///no-host.png",
    }
    response = client.post(
        f"{settings.API_V1_STR}/resources/",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 400


def test_update_resource_invalid_image_external_url(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that invalid image_external_url is rejected on update (T011)."""
    resource = create_random_resource(db, is_published=True)
    data = {"image_external_url": "javascript:alert('xss')"}
    response = client.put(
        f"{settings.API_V1_STR}/resources/{resource.id}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 400


def test_likes_count_aggregation(
    client: TestClient,
    normal_user_token_headers: dict[str, str],
    db: Session,
) -> None:
    """Test that likes_count correctly aggregates likes (T014)."""
    resource = create_random_resource(db, is_published=True)

    # Initially no likes
    response = client.get(f"{settings.API_V1_STR}/resources/")
    content = response.json()
    resource_data = next(
        (r for r in content["data"] if r["id"] == str(resource.id)), None
    )
    assert resource_data is not None
    assert resource_data["likes_count"] == 0

    # Like the resource as normal user
    response = client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/like",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200

    # Check likes_count is now 1
    response = client.get(f"{settings.API_V1_STR}/resources/")
    content = response.json()
    resource_data = next(
        (r for r in content["data"] if r["id"] == str(resource.id)), None
    )
    assert resource_data is not None
    assert resource_data["likes_count"] == 1


# ---------------------------------------------------------------------------
# Resource image upload/clear tests (T033)
# ---------------------------------------------------------------------------


def test_upload_resource_image_admin(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test uploading an image for a resource as admin (T033)."""
    resource = create_random_resource(db, is_published=True)

    # Create a simple 64x64 red PNG image
    import io

    from PIL import Image

    img = Image.new("RGB", (64, 64), color="red")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format="PNG")
    img_buffer.seek(0)

    response = client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/image-upload",
        headers=superuser_token_headers,
        files={"file": ("test.png", img_buffer, "image/png")},
    )
    assert response.status_code == 200
    content = response.json()
    assert content["image_url"] is not None
    assert "resource-images" in content["image_url"]


def test_upload_resource_image_clears_external_url(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that uploading an image clears image_external_url (T033)."""

    # Create resource with external URL
    resource = create_random_resource(db, is_published=True)
    resource.image_external_url = "https://example.com/old-image.png"
    db.add(resource)
    db.commit()
    db.refresh(resource)

    # Upload new image
    import io

    from PIL import Image

    img = Image.new("RGB", (64, 64), color="blue")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format="PNG")
    img_buffer.seek(0)

    response = client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/image-upload",
        headers=superuser_token_headers,
        files={"file": ("test.png", img_buffer, "image/png")},
    )
    assert response.status_code == 200
    content = response.json()
    # image_url should now point to uploaded image, not external
    assert content["image_url"] is not None
    assert "resource-images" in content["image_url"]
    assert "example.com" not in content["image_url"]

    # Verify in database
    db.refresh(resource)
    assert resource.image_external_url is None
    assert resource.image_key is not None


def test_upload_resource_image_forbidden_for_normal_user(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that normal users cannot upload resource images (T033)."""
    resource = create_random_resource(db, is_published=True)

    import io

    from PIL import Image

    img = Image.new("RGB", (64, 64), color="green")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format="PNG")
    img_buffer.seek(0)

    response = client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/image-upload",
        headers=normal_user_token_headers,
        files={"file": ("test.png", img_buffer, "image/png")},
    )
    assert response.status_code == 403


def test_upload_resource_image_invalid_content_type(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that invalid content types are rejected (T033)."""
    resource = create_random_resource(db, is_published=True)

    response = client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/image-upload",
        headers=superuser_token_headers,
        files={"file": ("test.txt", b"not an image", "text/plain")},
    )
    assert response.status_code == 400
    assert "Unsupported image type" in response.json()["detail"]


def test_clear_resource_image_admin(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test clearing a resource image as admin (T033)."""

    resource = create_random_resource(db, is_published=True)
    resource.image_external_url = "https://example.com/image.png"
    db.add(resource)
    db.commit()
    db.refresh(resource)

    response = client.delete(
        f"{settings.API_V1_STR}/resources/{resource.id}/image",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["image_url"] is None

    # Verify in database
    db.refresh(resource)
    assert resource.image_external_url is None
    assert resource.image_key is None


def test_clear_resource_image_forbidden_for_normal_user(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that normal users cannot clear resource images (T033)."""
    resource = create_random_resource(db, is_published=True)

    response = client.delete(
        f"{settings.API_V1_STR}/resources/{resource.id}/image",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 403


def test_clear_resource_image_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    """Test clearing image on non-existent resource (T033)."""
    response = client.delete(
        f"{settings.API_V1_STR}/resources/{uuid.uuid4()}/image",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
