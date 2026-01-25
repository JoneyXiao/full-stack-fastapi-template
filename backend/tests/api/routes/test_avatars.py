"""Tests for avatar upload, retrieval, and deletion endpoints."""

import io
import uuid
from pathlib import Path
from unittest.mock import patch

from fastapi.testclient import TestClient
from PIL import Image
from sqlmodel import Session

from app import crud
from app.core.config import settings
from app.models import UserCreate
from tests.utils.utils import random_email, random_lower_string


def create_test_image(
    width: int = 200,
    height: int = 200,
    format: str = "PNG",
    mode: str = "RGB",
) -> bytes:
    """Create a test image as bytes."""
    img = Image.new(mode, (width, height), color="red")
    buffer = io.BytesIO()
    img.save(buffer, format=format)
    buffer.seek(0)
    return buffer.getvalue()


def create_test_user_with_auth(
    client: TestClient, db: Session
) -> tuple[dict[str, str], uuid.UUID]:
    """Create a test user and return (auth headers, user_id)."""
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = crud.create_user(session=db, user_create=user_in)

    login_data = {"username": email, "password": password}
    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=login_data)
    tokens = r.json()
    headers = {"Authorization": f"Bearer {tokens['access_token']}"}

    return headers, user.id


class TestAvatarUpload:
    """Tests for POST /users/me/avatar."""

    def test_upload_avatar_success(
        self, client: TestClient, db: Session, tmp_path: Path
    ) -> None:
        """Test successful avatar upload."""
        headers, user_id = create_test_user_with_auth(client, db)
        image_data = create_test_image()

        with patch.object(settings, "AVATAR_STORAGE_PATH", str(tmp_path)):
            r = client.post(
                f"{settings.API_V1_STR}/users/me/avatar",
                headers=headers,
                files={"file": ("test.png", image_data, "image/png")},
            )

        assert r.status_code == 200
        data = r.json()
        assert data["avatar_url"] is not None
        assert data["avatar_version"] == 1
        assert f"/avatars/{user_id}/1" in data["avatar_url"]

    def test_upload_avatar_replaces_existing(
        self, client: TestClient, db: Session, tmp_path: Path
    ) -> None:
        """Test that uploading replaces existing avatar and bumps version."""
        headers, user_id = create_test_user_with_auth(client, db)
        image_data = create_test_image()

        with patch.object(settings, "AVATAR_STORAGE_PATH", str(tmp_path)):
            # First upload
            r1 = client.post(
                f"{settings.API_V1_STR}/users/me/avatar",
                headers=headers,
                files={"file": ("test1.png", image_data, "image/png")},
            )
            assert r1.status_code == 200
            assert r1.json()["avatar_version"] == 1

            # Second upload
            r2 = client.post(
                f"{settings.API_V1_STR}/users/me/avatar",
                headers=headers,
                files={"file": ("test2.png", image_data, "image/png")},
            )
            assert r2.status_code == 200
            assert r2.json()["avatar_version"] == 2

    def test_upload_avatar_rejects_large_file(
        self, client: TestClient, db: Session
    ) -> None:
        """Test that files exceeding max size are rejected."""
        headers, _ = create_test_user_with_auth(client, db)
        # Create oversized data (> 5MB)
        large_data = b"x" * (6 * 1024 * 1024)

        r = client.post(
            f"{settings.API_V1_STR}/users/me/avatar",
            headers=headers,
            files={"file": ("large.png", large_data, "image/png")},
        )

        assert r.status_code == 400
        assert "size" in r.json()["detail"].lower()

    def test_upload_avatar_rejects_invalid_content_type(
        self, client: TestClient, db: Session
    ) -> None:
        """Test that non-image content types are rejected."""
        headers, _ = create_test_user_with_auth(client, db)

        r = client.post(
            f"{settings.API_V1_STR}/users/me/avatar",
            headers=headers,
            files={"file": ("test.txt", b"not an image", "text/plain")},
        )

        assert r.status_code == 400
        assert "unsupported" in r.json()["detail"].lower()

    def test_upload_avatar_rejects_corrupted_image(
        self, client: TestClient, db: Session
    ) -> None:
        """Test that corrupted image files are rejected."""
        headers, _ = create_test_user_with_auth(client, db)

        r = client.post(
            f"{settings.API_V1_STR}/users/me/avatar",
            headers=headers,
            files={"file": ("bad.png", b"not valid image data", "image/png")},
        )

        assert r.status_code == 400
        assert (
            "invalid" in r.json()["detail"].lower()
            or "corrupt" in r.json()["detail"].lower()
        )

    def test_upload_avatar_rejects_oversized_dimensions(
        self, client: TestClient, db: Session
    ) -> None:
        """Test that images exceeding max dimensions are rejected."""
        headers, _ = create_test_user_with_auth(client, db)
        # Create image with dimensions > 4096
        huge_image = create_test_image(width=5000, height=5000)

        r = client.post(
            f"{settings.API_V1_STR}/users/me/avatar",
            headers=headers,
            files={"file": ("huge.png", huge_image, "image/png")},
        )

        assert r.status_code == 400
        assert "dimension" in r.json()["detail"].lower()

    def test_upload_avatar_accepts_various_formats(
        self, client: TestClient, db: Session, tmp_path: Path
    ) -> None:
        """Test that JPEG, PNG, GIF, and WebP are all accepted."""
        headers, _ = create_test_user_with_auth(client, db)

        formats = [
            ("test.jpg", "image/jpeg", "JPEG"),
            ("test.png", "image/png", "PNG"),
            ("test.gif", "image/gif", "GIF"),
            ("test.webp", "image/webp", "WEBP"),
        ]

        with patch.object(settings, "AVATAR_STORAGE_PATH", str(tmp_path)):
            for filename, content_type, pil_format in formats:
                image_data = create_test_image(format=pil_format)
                r = client.post(
                    f"{settings.API_V1_STR}/users/me/avatar",
                    headers=headers,
                    files={"file": (filename, image_data, content_type)},
                )
                assert r.status_code == 200, f"Failed for {content_type}"

    def test_upload_avatar_requires_auth(self, client: TestClient) -> None:
        """Test that unauthenticated requests are rejected."""
        image_data = create_test_image()

        r = client.post(
            f"{settings.API_V1_STR}/users/me/avatar",
            files={"file": ("test.png", image_data, "image/png")},
        )

        assert r.status_code == 401

    def test_upload_avatar_rate_limit(
        self, client: TestClient, db: Session, tmp_path: Path
    ) -> None:
        """Test that rate limiting kicks in after max attempts."""
        headers, _ = create_test_user_with_auth(client, db)
        image_data = create_test_image()

        with patch.object(settings, "AVATAR_STORAGE_PATH", str(tmp_path)), \
             patch.object(settings, "AVATAR_RATE_LIMIT_MAX_ATTEMPTS", 3):
            # Make max_attempts requests
            for i in range(3):
                r = client.post(
                    f"{settings.API_V1_STR}/users/me/avatar",
                    headers=headers,
                    files={"file": (f"test{i}.png", image_data, "image/png")},
                )
                assert r.status_code == 200

            # Next request should be rate limited
            r = client.post(
                f"{settings.API_V1_STR}/users/me/avatar",
                headers=headers,
                files={"file": ("test_final.png", image_data, "image/png")},
            )
            assert r.status_code == 429


class TestAvatarDeletion:
    """Tests for DELETE /users/me/avatar."""

    def test_delete_avatar_success(
        self, client: TestClient, db: Session, tmp_path: Path
    ) -> None:
        """Test successful avatar deletion."""
        headers, _ = create_test_user_with_auth(client, db)
        image_data = create_test_image()

        with patch.object(settings, "AVATAR_STORAGE_PATH", str(tmp_path)):
            # Upload first
            r1 = client.post(
                f"{settings.API_V1_STR}/users/me/avatar",
                headers=headers,
                files={"file": ("test.png", image_data, "image/png")},
            )
            assert r1.status_code == 200
            assert r1.json()["avatar_url"] is not None

            # Delete
            r2 = client.delete(
                f"{settings.API_V1_STR}/users/me/avatar",
                headers=headers,
            )
            assert r2.status_code == 200
            assert r2.json()["avatar_url"] is None
            assert r2.json()["avatar_version"] == 2  # Version incremented

    def test_delete_avatar_idempotent(self, client: TestClient, db: Session) -> None:
        """Test that deleting non-existent avatar is idempotent."""
        headers, _ = create_test_user_with_auth(client, db)

        # Delete when no avatar exists
        r = client.delete(
            f"{settings.API_V1_STR}/users/me/avatar",
            headers=headers,
        )

        # Should succeed but not error
        assert r.status_code == 200
        assert r.json()["avatar_url"] is None

    def test_delete_avatar_requires_auth(self, client: TestClient) -> None:
        """Test that unauthenticated requests are rejected."""
        r = client.delete(f"{settings.API_V1_STR}/users/me/avatar")
        assert r.status_code == 401


class TestAvatarRetrieval:
    """Tests for GET /avatars/{user_id}/{version}.{ext}."""

    def test_get_avatar_success(
        self, client: TestClient, db: Session, tmp_path: Path
    ) -> None:
        """Test successful avatar retrieval."""
        headers, user_id = create_test_user_with_auth(client, db)
        image_data = create_test_image()

        with patch.object(settings, "AVATAR_STORAGE_PATH", str(tmp_path)):
            # Upload avatar
            r1 = client.post(
                f"{settings.API_V1_STR}/users/me/avatar",
                headers=headers,
                files={"file": ("test.png", image_data, "image/png")},
            )
            assert r1.status_code == 200
            avatar_url = r1.json()["avatar_url"]

            # Retrieve avatar (no auth required)
            r2 = client.get(avatar_url)
            assert r2.status_code == 200
            assert r2.headers["content-type"] in ["image/webp", "image/jpeg"]
            assert "max-age=31536000" in r2.headers.get("cache-control", "")
            assert "immutable" in r2.headers.get("cache-control", "")

    def test_get_avatar_wrong_version_404(
        self, client: TestClient, db: Session, tmp_path: Path
    ) -> None:
        """Test that wrong version returns 404."""
        headers, user_id = create_test_user_with_auth(client, db)
        image_data = create_test_image()

        with patch.object(settings, "AVATAR_STORAGE_PATH", str(tmp_path)):
            # Upload avatar
            client.post(
                f"{settings.API_V1_STR}/users/me/avatar",
                headers=headers,
                files={"file": ("test.png", image_data, "image/png")},
            )

            # Try to get wrong version
            r = client.get(f"{settings.API_V1_STR}/avatars/{user_id}/99.webp")
            assert r.status_code == 404

    def test_get_avatar_nonexistent_user_404(self, client: TestClient) -> None:
        """Test that non-existent user returns 404."""
        fake_id = uuid.uuid4()
        r = client.get(f"{settings.API_V1_STR}/avatars/{fake_id}/1.webp")
        assert r.status_code == 404

    def test_get_avatar_no_avatar_404(self, client: TestClient, db: Session) -> None:
        """Test that user with no avatar returns 404."""
        headers, user_id = create_test_user_with_auth(client, db)

        r = client.get(f"{settings.API_V1_STR}/avatars/{user_id}/0.webp")
        assert r.status_code == 404

    def test_get_avatar_wrong_extension_404(
        self, client: TestClient, db: Session, tmp_path: Path
    ) -> None:
        """Test that wrong extension returns 404."""
        headers, user_id = create_test_user_with_auth(client, db)
        image_data = create_test_image()

        with patch.object(settings, "AVATAR_STORAGE_PATH", str(tmp_path)):
            # Upload avatar (will be stored as webp)
            r1 = client.post(
                f"{settings.API_V1_STR}/users/me/avatar",
                headers=headers,
                files={"file": ("test.png", image_data, "image/png")},
            )
            avatar_url = r1.json()["avatar_url"]

            # Determine actual extension used
            actual_ext = avatar_url.split(".")[-1]
            wrong_ext = "jpg" if actual_ext == "webp" else "webp"

            # Try wrong extension
            r = client.get(f"{settings.API_V1_STR}/avatars/{user_id}/1.{wrong_ext}")
            assert r.status_code == 404


class TestUserPublicAvatarFields:
    """Tests that UserPublic includes avatar fields."""

    def test_get_me_includes_avatar_fields(
        self, client: TestClient, db: Session
    ) -> None:
        """Test that GET /users/me includes avatar_url and avatar_version."""
        headers, _ = create_test_user_with_auth(client, db)

        r = client.get(f"{settings.API_V1_STR}/users/me", headers=headers)
        assert r.status_code == 200
        data = r.json()
        assert "avatar_url" in data
        assert "avatar_version" in data
        assert data["avatar_version"] == 0  # Default value

    def test_avatar_url_populated_after_upload(
        self, client: TestClient, db: Session, tmp_path: Path
    ) -> None:
        """Test that avatar_url is populated in GET /me after upload."""
        headers, user_id = create_test_user_with_auth(client, db)
        image_data = create_test_image()

        with patch.object(settings, "AVATAR_STORAGE_PATH", str(tmp_path)):
            # Upload avatar
            client.post(
                f"{settings.API_V1_STR}/users/me/avatar",
                headers=headers,
                files={"file": ("test.png", image_data, "image/png")},
            )

            # Check GET /me
            r = client.get(f"{settings.API_V1_STR}/users/me", headers=headers)
            assert r.status_code == 200
            data = r.json()
            assert data["avatar_url"] is not None
            assert f"/avatars/{user_id}/1" in data["avatar_url"]
            assert data["avatar_version"] == 1
