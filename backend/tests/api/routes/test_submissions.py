"""Tests for submission API routes."""

import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from tests.utils.resource import create_random_resource, get_or_create_category
from tests.utils.submission import create_random_submission
from tests.utils.user import create_random_user


def test_create_submission_with_category_id(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test creating a new submission with category_id."""
    category = get_or_create_category(db, name="tool")
    data = {
        "title": "Great AI Tool",
        "description": "A helpful tool for AI development",
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "category_id": str(category.id),
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
    assert content["category_id"] == str(category.id)
    assert content["category_name"] == "tool"
    assert "id" in content


def test_create_submission_requires_auth(client: TestClient, db: Session) -> None:
    """Test that creating a submission requires authentication."""
    category = get_or_create_category(db, name="tutorial")
    data = {
        "title": "Test",
        "destination_url": "https://example.com/test",
        "category_id": str(category.id),
    }
    response = client.post(f"{settings.API_V1_STR}/submissions/", json=data)
    assert response.status_code == 401


def test_create_submission_duplicate_resource_url(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that submission is rejected if Resource with same URL exists."""
    existing_resource = create_random_resource(db, is_published=True)
    category = get_or_create_category(db, name="tutorial")
    data = {
        "title": "Duplicate submission",
        "destination_url": existing_resource.destination_url,
        "category_id": str(category.id),
    }
    response = client.post(
        f"{settings.API_V1_STR}/submissions/",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 409
    assert "destination URL already exists" in response.json()["detail"]


def test_list_submissions_admin_only(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    """Test listing all submissions (admin required)."""

    response = client.get(
        f"{settings.API_V1_STR}/submissions/",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert "data" in content


def test_list_submissions_requires_auth(client: TestClient) -> None:
    """Test that listing submissions requires authentication."""
    response = client.get(f"{settings.API_V1_STR}/submissions/")
    assert response.status_code == 401


def test_get_submission_by_owner(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test getting own submission."""
    category = get_or_create_category(db, name="tool")
    # Create submission as the logged-in user
    data = {
        "title": "My submission",
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "category_id": str(category.id),
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
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test updating a pending submission."""
    category = get_or_create_category(db, name="tool")
    # Create submission
    data = {
        "title": "Original title",
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "category_id": str(category.id),
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
    category = get_or_create_category(db, name="tool")
    # Create and manually approve a submission
    data = {
        "title": "To be approved",
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "category_id": str(category.id),
    }
    response = client.post(
        f"{settings.API_V1_STR}/submissions/",
        headers=normal_user_token_headers,
        json=data,
    )
    submission_id = response.json()["id"]

    # Manually update status in DB to approved
    from sqlmodel import Session as SQLSession

    from app.core.db import engine
    from app.models import ResourceSubmission

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
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test listing user's own submissions."""
    category = get_or_create_category(db, name="tool")
    # Create some submissions
    for _ in range(2):
        data = {
            "title": f"My submission {uuid.uuid4().hex[:8]}",
            "destination_url": f"https://example.com/{uuid.uuid4().hex}",
            "category_id": str(category.id),
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
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test deleting a pending submission."""
    category = get_or_create_category(db, name="tool")
    # Create submission
    data = {
        "title": "To delete",
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "category_id": str(category.id),
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


def test_create_submission_with_max_description_length(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test creating a submission with exactly 10,000 character description."""
    category = get_or_create_category(db, name="tool")
    # Create a description with exactly 10,000 characters
    max_description = "x" * 10000
    data = {
        "title": "Long Description Test",
        "description": max_description,
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "category_id": str(category.id),
    }
    response = client.post(
        f"{settings.API_V1_STR}/submissions/",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content["description"]) == 10000


def test_create_submission_with_description_exceeds_max_length(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that creating a submission with >10,000 char description fails."""
    category = get_or_create_category(db, name="tool")
    # Create a description with 10,001 characters
    over_max_description = "x" * 10001
    data = {
        "title": "Too Long Description Test",
        "description": over_max_description,
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "category_id": str(category.id),
    }
    response = client.post(
        f"{settings.API_V1_STR}/submissions/",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 422  # Validation error


def test_create_submission_with_markdown_description(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that Markdown content is preserved in description."""
    category = get_or_create_category(db, name="tutorial")
    markdown_description = """# Header

This is a **bold** and *italic* text.

- Item 1
- Item 2
- Item 3

[Link](https://example.com)

```python
def hello():
    print("Hello, World!")
```
"""
    data = {
        "title": "Markdown Description Test",
        "description": markdown_description,
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "category_id": str(category.id),
    }
    response = client.post(
        f"{settings.API_V1_STR}/submissions/",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    # Verify Markdown is preserved exactly
    assert content["description"] == markdown_description
    assert "**bold**" in content["description"]
    assert "- Item 1" in content["description"]


# ---------------------------------------------------------------------------
# Submission Cover Image Tests (T017)
# ---------------------------------------------------------------------------


def test_upload_submission_image_success(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test uploading a submission cover image successfully."""
    import io

    from PIL import Image

    # Import using the correct module path
    from tests.utils.user import get_test_user

    user = get_test_user(db)
    submission = create_random_submission(db, submitter=user)

    # Create a valid test image
    img = Image.new("RGB", (64, 64), color="blue")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format="PNG")
    img_buffer.seek(0)

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/image",
        headers=normal_user_token_headers,
        files={"file": ("test.png", img_buffer, "image/png")},
    )
    assert response.status_code == 200
    content = response.json()
    assert content["image_url"] is not None
    assert f"/submission-images/{submission.id}" in content["image_url"]


def test_upload_submission_image_not_owner(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that only the owner can upload images."""
    import io

    from PIL import Image

    # Create submission by a different user
    other_user = create_random_user(db)
    submission = create_random_submission(db, submitter=other_user)

    img = Image.new("RGB", (64, 64), color="red")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format="PNG")
    img_buffer.seek(0)

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/image",
        headers=normal_user_token_headers,
        files={"file": ("test.png", img_buffer, "image/png")},
    )
    assert response.status_code == 403


def test_upload_submission_image_rejects_unsupported_type(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that unsupported image types are rejected."""
    from tests.utils.user import get_test_user

    user = get_test_user(db)
    submission = create_random_submission(db, submitter=user)

    # Send a text file pretending to be an image
    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/image",
        headers=normal_user_token_headers,
        files={"file": ("test.txt", b"not an image", "text/plain")},
    )
    assert response.status_code == 400
    assert "Unsupported image type" in response.json()["detail"]


def test_upload_submission_image_rejects_too_large(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that files over 5MB are rejected."""
    from tests.utils.user import get_test_user

    user = get_test_user(db)
    submission = create_random_submission(db, submitter=user)

    # Create a file larger than 5MB
    large_data = b"x" * (5 * 1024 * 1024 + 1)

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/image",
        headers=normal_user_token_headers,
        files={"file": ("large.png", large_data, "image/png")},
    )
    assert response.status_code == 400
    assert "exceeds maximum" in response.json()["detail"]


def test_upload_submission_image_rejects_too_small(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that images smaller than 32x32 are rejected."""
    import io

    from PIL import Image
    from tests.utils.user import get_test_user

    user = get_test_user(db)
    submission = create_random_submission(db, submitter=user)

    # Create a 16x16 image (too small)
    img = Image.new("RGB", (16, 16), color="green")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format="PNG")
    img_buffer.seek(0)

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/image",
        headers=normal_user_token_headers,
        files={"file": ("small.png", img_buffer, "image/png")},
    )
    assert response.status_code == 400
    assert "at least 32x32" in response.json()["detail"]


def test_upload_submission_image_rejects_too_large_dimensions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that images with dimensions over 4096 are rejected."""
    import io

    from PIL import Image
    from tests.utils.user import get_test_user

    user = get_test_user(db)
    submission = create_random_submission(db, submitter=user)

    # Create a 4097x4097 image (too large)
    img = Image.new("RGB", (4097, 4097), color="yellow")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format="PNG", compress_level=9)
    img_buffer.seek(0)

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/image",
        headers=normal_user_token_headers,
        files={"file": ("huge.png", img_buffer, "image/png")},
    )
    assert response.status_code == 400
    assert "exceed maximum" in response.json()["detail"]


def test_clear_submission_image(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test clearing a submission cover image."""
    import io

    from PIL import Image
    from tests.utils.user import get_test_user

    user = get_test_user(db)
    submission = create_random_submission(db, submitter=user)

    # First upload an image
    img = Image.new("RGB", (64, 64), color="purple")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format="PNG")
    img_buffer.seek(0)

    client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/image",
        headers=normal_user_token_headers,
        files={"file": ("test.png", img_buffer, "image/png")},
    )

    # Now clear the image
    response = client.delete(
        f"{settings.API_V1_STR}/submissions/{submission.id}/image",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["image_url"] is None


def test_create_submission_with_external_image_url(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test creating a submission with an external image URL."""
    category = get_or_create_category(db, name="tool")
    data = {
        "title": "External Image Test",
        "description": "Testing external image URL",
        "destination_url": f"https://example.com/{uuid.uuid4().hex}",
        "category_id": str(category.id),
        "image_external_url": "https://example.com/image.jpg",
    }
    response = client.post(
        f"{settings.API_V1_STR}/submissions/",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["image_url"] == "https://example.com/image.jpg"


def test_update_submission_external_url_clears_uploaded_image(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that setting external URL clears the uploaded image."""
    import io

    from PIL import Image
    from tests.utils.user import get_test_user

    user = get_test_user(db)
    submission = create_random_submission(db, submitter=user)

    # First upload an image
    img = Image.new("RGB", (64, 64), color="orange")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format="PNG")
    img_buffer.seek(0)

    upload_response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/image",
        headers=normal_user_token_headers,
        files={"file": ("test.png", img_buffer, "image/png")},
    )
    assert upload_response.status_code == 200
    assert "/submission-images/" in upload_response.json()["image_url"]

    # Now set an external URL
    update_response = client.put(
        f"{settings.API_V1_STR}/submissions/{submission.id}",
        headers=normal_user_token_headers,
        json={"image_external_url": "https://example.com/new-image.jpg"},
    )
    assert update_response.status_code == 200
    content = update_response.json()
    assert content["image_url"] == "https://example.com/new-image.jpg"


def test_upload_image_clears_external_url(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that uploading an image clears the external URL."""
    import io

    from PIL import Image
    from tests.utils.user import get_test_user

    user = get_test_user(db)
    submission = create_random_submission(db, submitter=user)

    # First set an external URL via update
    update_response = client.put(
        f"{settings.API_V1_STR}/submissions/{submission.id}",
        headers=normal_user_token_headers,
        json={"image_external_url": "https://example.com/external.jpg"},
    )
    assert update_response.status_code == 200
    assert update_response.json()["image_url"] == "https://example.com/external.jpg"

    # Now upload an image
    img = Image.new("RGB", (64, 64), color="teal")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format="PNG")
    img_buffer.seek(0)

    upload_response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/image",
        headers=normal_user_token_headers,
        files={"file": ("test.png", img_buffer, "image/png")},
    )
    assert upload_response.status_code == 200
    content = upload_response.json()
    # Should now be internal URL, not external
    assert "/submission-images/" in content["image_url"]
    assert "external.jpg" not in content["image_url"]


def test_cannot_upload_image_to_approved_submission(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that images cannot be uploaded to approved submissions."""
    import io

    from PIL import Image

    # Create and approve a submission
    from tests.utils.user import get_first_superuser

    superuser = get_first_superuser(db)
    submission = create_random_submission(db, submitter=superuser)

    # Approve the submission
    client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/approve",
        headers=superuser_token_headers,
    )

    # Try to upload an image
    img = Image.new("RGB", (64, 64), color="pink")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format="PNG")
    img_buffer.seek(0)

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/image",
        headers=superuser_token_headers,
        files={"file": ("test.png", img_buffer, "image/png")},
    )
    assert response.status_code == 400
    assert "not pending" in response.json()["detail"]


# ---------------------------------------------------------------------------
# Admin Permissions Tests (T030)
# ---------------------------------------------------------------------------


def test_admin_list_submissions_requires_admin(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test that the admin submissions list endpoint requires admin permissions."""
    response = client.get(
        f"{settings.API_V1_STR}/submissions/",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 403
    assert "Not enough permissions" in response.json()["detail"]


def test_admin_list_submissions_success(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    """Test that admins can access the submissions list endpoint."""
    response = client.get(
        f"{settings.API_V1_STR}/submissions/",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    assert "data" in response.json()
    assert "count" in response.json()


def test_admin_list_submissions_filter_by_status(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that admins can filter submissions by status."""
    from tests.utils.user import get_first_superuser

    superuser = get_first_superuser(db)
    # Create a submission
    create_random_submission(db, submitter=superuser)

    # Filter by pending status
    response = client.get(
        f"{settings.API_V1_STR}/submissions/",
        headers=superuser_token_headers,
        params={"status": "pending"},
    )
    assert response.status_code == 200
    # All returned should be pending
    for sub in response.json()["data"]:
        assert sub["status"] == "pending"
