"""Tests for resource image serving routes (T034)."""

import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from tests.utils.resource import create_random_resource


def test_serve_resource_image_not_found(client: TestClient) -> None:
    """Test serving an image for a non-existent resource returns 404."""
    fake_id = uuid.uuid4()
    response = client.get(f"{settings.API_V1_STR}/resource-images/{fake_id}/1.webp")
    assert response.status_code == 404
    assert response.json()["detail"] == "Resource image not found"


def test_serve_resource_image_invalid_extension(client: TestClient) -> None:
    """Test that invalid extensions return 404."""
    fake_id = uuid.uuid4()
    response = client.get(f"{settings.API_V1_STR}/resource-images/{fake_id}/1.gif")
    assert response.status_code == 404


def test_serve_resource_image_success(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test successful image serving after upload (T034)."""
    import io

    from PIL import Image

    resource = create_random_resource(db, is_published=True)

    # Upload an image first
    img = Image.new("RGB", (64, 64), color="purple")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format="PNG")
    img_buffer.seek(0)

    upload_response = client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/image-upload",
        headers=superuser_token_headers,
        files={"file": ("test.png", img_buffer, "image/png")},
    )
    assert upload_response.status_code == 200
    image_url = upload_response.json()["image_url"]
    assert image_url is not None

    # Extract the path from the URL (remove the API prefix)
    # image_url format: /api/v1/resource-images/{resource_id}/{version}.{ext}
    serve_path = image_url  # Already includes /api/v1

    # Serve the image
    serve_response = client.get(serve_path)
    assert serve_response.status_code == 200
    assert serve_response.headers["content-type"] in ("image/webp", "image/jpeg")
    assert "Cache-Control" in serve_response.headers
    assert "max-age=31536000" in serve_response.headers["Cache-Control"]


def test_serve_resource_image_caching_headers(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that served images have appropriate caching headers (T034)."""
    import io

    from PIL import Image

    resource = create_random_resource(db, is_published=True)

    # Upload an image
    img = Image.new("RGB", (64, 64), color="cyan")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format="JPEG")
    img_buffer.seek(0)

    upload_response = client.post(
        f"{settings.API_V1_STR}/resources/{resource.id}/image-upload",
        headers=superuser_token_headers,
        files={"file": ("test.jpg", img_buffer, "image/jpeg")},
    )
    assert upload_response.status_code == 200
    image_url = upload_response.json()["image_url"]

    # Serve and check headers
    serve_response = client.get(image_url)
    assert serve_response.status_code == 200
    cache_control = serve_response.headers.get("Cache-Control", "")
    assert "public" in cache_control
    assert "immutable" in cache_control
