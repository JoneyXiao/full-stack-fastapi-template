"""Tests for submission image serving routes (T018)."""

import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from tests.utils.submission import create_random_submission
from tests.utils.user import create_random_user, get_test_user


def test_serve_submission_image_not_found(client: TestClient) -> None:
    """Test serving an image for a non-existent submission returns 404."""
    fake_id = uuid.uuid4()
    response = client.get(f"{settings.API_V1_STR}/submission-images/{fake_id}")
    assert response.status_code == 404
    assert response.json()["detail"] == "Submission image not found"


def test_serve_submission_image_success(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test successful image serving after upload."""
    import io

    from PIL import Image

    # Use the test user that matches normal_user_token_headers
    user = get_test_user(db)
    submission = create_random_submission(db, submitter=user)

    # Upload an image first
    img = Image.new("RGB", (64, 64), color="purple")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format="PNG")
    img_buffer.seek(0)

    upload_response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/image",
        headers=normal_user_token_headers,
        files={"file": ("test.png", img_buffer, "image/png")},
    )
    assert upload_response.status_code == 200
    image_url = upload_response.json()["image_url"]
    assert image_url is not None

    # Serve the image (URL is already complete with /api/v1 prefix)
    serve_response = client.get(image_url)
    assert serve_response.status_code == 200
    assert serve_response.headers["content-type"] in ("image/webp", "image/jpeg")
    assert "Cache-Control" in serve_response.headers
    assert "max-age=31536000" in serve_response.headers["Cache-Control"]


def test_serve_submission_image_caching_headers(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that served images have appropriate caching headers."""
    import io

    from PIL import Image

    # Use the test user that matches normal_user_token_headers
    user = get_test_user(db)
    submission = create_random_submission(db, submitter=user)

    # Upload an image
    img = Image.new("RGB", (64, 64), color="cyan")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format="JPEG")
    img_buffer.seek(0)

    upload_response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/image",
        headers=normal_user_token_headers,
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


def test_serve_submission_image_version_query_param(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that version query parameter works for cache busting."""
    import io

    from PIL import Image

    # Use the test user that matches normal_user_token_headers
    user = get_test_user(db)
    submission = create_random_submission(db, submitter=user)

    # Upload an image
    img = Image.new("RGB", (64, 64), color="red")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format="PNG")
    img_buffer.seek(0)

    upload_response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/image",
        headers=normal_user_token_headers,
        files={"file": ("test.png", img_buffer, "image/png")},
    )
    assert upload_response.status_code == 200
    image_url = upload_response.json()["image_url"]

    # The URL should have v=1 query param
    assert "v=1" in image_url

    # Upload again to increment version
    img_buffer.seek(0)
    upload_response2 = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/image",
        headers=normal_user_token_headers,
        files={"file": ("test2.png", img_buffer, "image/png")},
    )
    assert upload_response2.status_code == 200
    image_url2 = upload_response2.json()["image_url"]

    # Version should have incremented
    assert "v=2" in image_url2


def test_serve_submission_image_no_auth_required(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that serving images does not require authentication."""
    import io

    from PIL import Image

    # Use the test user that matches normal_user_token_headers
    user = get_test_user(db)
    submission = create_random_submission(db, submitter=user)

    # Upload with auth
    img = Image.new("RGB", (64, 64), color="green")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format="PNG")
    img_buffer.seek(0)

    upload_response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/image",
        headers=normal_user_token_headers,
        files={"file": ("test.png", img_buffer, "image/png")},
    )
    assert upload_response.status_code == 200
    image_url = upload_response.json()["image_url"]

    # Serve without auth headers should still work
    serve_response = client.get(image_url)
    assert serve_response.status_code == 200
