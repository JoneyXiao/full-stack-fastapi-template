"""Tests for submission review endpoints (admin approve/reject)."""

import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from tests.utils.resource import create_random_resource
from tests.utils.submission import create_random_submission
from tests.utils.user import create_random_user


def test_approve_submission(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test approving a submission creates a published resource."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="pending")

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/approve",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["status"] == "approved"

    # Verify resource was created
    response = client.get(f"{settings.API_V1_STR}/resources/")
    resources = response.json()["data"]
    urls = [r["destination_url"] for r in resources]
    assert submission.destination_url in urls


def test_approve_submission_requires_admin(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that only admins can approve submissions."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="pending")

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/approve",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 403


def test_approve_submission_duplicate_url(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that approval fails if a resource with the URL already exists."""
    user = create_random_user(db)
    # Create a resource first
    existing = create_random_resource(db, is_published=True)
    # Create submission with same URL
    submission = create_random_submission(
        db, submitter=user, destination_url=existing.destination_url, status="pending"
    )

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/approve",
        headers=superuser_token_headers,
    )
    assert response.status_code == 409


def test_approve_non_pending_submission(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that already approved/rejected submissions cannot be approved."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="rejected")

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/approve",
        headers=superuser_token_headers,
    )
    assert response.status_code == 400


def test_reject_submission(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test rejecting a submission."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="pending")

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/reject",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["status"] == "rejected"


def test_reject_submission_requires_admin(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that only admins can reject submissions."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="pending")

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/reject",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 403


def test_reject_non_pending_submission(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that already approved/rejected submissions cannot be rejected."""
    user = create_random_user(db)
    submission = create_random_submission(db, submitter=user, status="approved")

    response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/reject",
        headers=superuser_token_headers,
    )
    assert response.status_code == 400


def test_approve_submission_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    """Test approving a non-existent submission."""
    response = client.post(
        f"{settings.API_V1_STR}/submissions/{uuid.uuid4()}/approve",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404


def test_reject_submission_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    """Test rejecting a non-existent submission."""
    response = client.post(
        f"{settings.API_V1_STR}/submissions/{uuid.uuid4()}/reject",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404


def test_admin_can_filter_submissions_by_status(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that admins can filter submissions by status."""
    user = create_random_user(db)
    create_random_submission(db, submitter=user, status="pending")
    create_random_submission(db, submitter=user, status="approved")
    create_random_submission(db, submitter=user, status="rejected")

    # Filter by approved
    response = client.get(
        f"{settings.API_V1_STR}/submissions/",
        headers=superuser_token_headers,
        params={"status": "approved"},
    )
    assert response.status_code == 200
    for s in response.json()["data"]:
        assert s["status"] == "approved"


# ---------------------------------------------------------------------------
# Approval Image Carry-Over Tests (T031)
# ---------------------------------------------------------------------------


def test_approve_submission_carries_over_external_image_url(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that approving a submission with external image URL carries it to the resource."""
    from tests.utils.user import get_first_superuser

    superuser = get_first_superuser(db)
    submission = create_random_submission(db, submitter=superuser, status="pending")

    # Set external URL via update
    update_response = client.put(
        f"{settings.API_V1_STR}/submissions/{submission.id}",
        headers=superuser_token_headers,
        json={"image_external_url": "https://example.com/test-image.jpg"},
    )
    assert update_response.status_code == 200

    # Approve the submission
    approve_response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/approve",
        headers=superuser_token_headers,
    )
    assert approve_response.status_code == 200

    # Find the created resource
    resources_response = client.get(
        f"{settings.API_V1_STR}/resources/",
        params={"q": submission.title},
    )
    resources = resources_response.json()["data"]
    matching = [r for r in resources if r["destination_url"] == submission.destination_url]
    assert len(matching) == 1

    # Verify the image URL was carried over
    assert matching[0]["image_url"] == "https://example.com/test-image.jpg"


def test_approve_submission_carries_over_uploaded_image(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that approving a submission with uploaded image carries it to the resource."""
    import io

    from PIL import Image
    from tests.utils.user import get_first_superuser

    superuser = get_first_superuser(db)
    submission = create_random_submission(db, submitter=superuser, status="pending")

    # Upload an image
    img = Image.new("RGB", (64, 64), color="blue")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format="PNG")
    img_buffer.seek(0)

    upload_response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/image",
        headers=superuser_token_headers,
        files={"file": ("test.png", img_buffer, "image/png")},
    )
    assert upload_response.status_code == 200
    submission_image_url = upload_response.json()["image_url"]
    assert "/submission-images/" in submission_image_url

    # Approve the submission
    approve_response = client.post(
        f"{settings.API_V1_STR}/submissions/{submission.id}/approve",
        headers=superuser_token_headers,
    )
    assert approve_response.status_code == 200

    # Find the created resource
    resources_response = client.get(
        f"{settings.API_V1_STR}/resources/",
        params={"q": submission.title},
    )
    resources = resources_response.json()["data"]
    matching = [r for r in resources if r["destination_url"] == submission.destination_url]
    assert len(matching) == 1

    # Verify the resource has an internal image URL (resource-images, not submission-images)
    resource_image_url = matching[0]["image_url"]
    assert resource_image_url is not None
    assert "/resource-images/" in resource_image_url

    # Verify the image is actually servable
    serve_response = client.get(resource_image_url)
    assert serve_response.status_code == 200
    assert serve_response.headers["content-type"] in ("image/webp", "image/jpeg")
