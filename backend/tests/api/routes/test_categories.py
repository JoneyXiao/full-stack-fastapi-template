"""Tests for category API routes."""

import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from app.models import Category
from tests.utils.resource import create_random_resource, get_or_create_category
from tests.utils.submission import create_random_submission
from tests.utils.user import create_random_user

# =========================================================================
# T018: Tests for listing categories
# =========================================================================


def test_list_categories_public(client: TestClient, db: Session) -> None:
    """Test listing categories (public endpoint)."""
    # Create a category
    category = get_or_create_category(db, name=f"test-category-{uuid.uuid4().hex[:8]}")

    # Use limit=1000 to ensure we get all categories in test DB
    response = client.get(f"{settings.API_V1_STR}/categories/", params={"limit": 1000})
    assert response.status_code == 200
    content = response.json()
    assert "data" in content
    assert "count" in content
    assert content["count"] >= 1

    # Check that our category is in the list
    category_ids = [c["id"] for c in content["data"]]
    assert str(category.id) in category_ids


def test_list_categories_returns_name_and_id(client: TestClient, db: Session) -> None:
    """Test that public list returns only id and name."""
    category = get_or_create_category(db, name=f"test-category-{uuid.uuid4().hex[:8]}")

    # Use limit=1000 to ensure we get all categories in test DB
    response = client.get(f"{settings.API_V1_STR}/categories/", params={"limit": 1000})
    assert response.status_code == 200
    content = response.json()

    # Find our category
    our_cat = next((c for c in content["data"] if c["id"] == str(category.id)), None)
    assert our_cat is not None
    assert "id" in our_cat
    assert "name" in our_cat
    # Public endpoint should not include usage counts
    assert "resources_count" not in our_cat
    assert "submissions_count" not in our_cat
    assert "in_use" not in our_cat


def test_list_categories_admin_requires_auth(client: TestClient) -> None:
    """Test that admin category list requires authentication."""
    response = client.get(f"{settings.API_V1_STR}/categories/admin")
    assert response.status_code == 401


def test_list_categories_admin_requires_superuser(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test that admin category list requires superuser."""
    response = client.get(
        f"{settings.API_V1_STR}/categories/admin",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 403


def test_list_categories_admin_success(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test admin can list categories with usage info."""
    category = get_or_create_category(db, name=f"admin-cat-{uuid.uuid4().hex[:8]}")

    response = client.get(
        f"{settings.API_V1_STR}/categories/admin",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert "data" in content
    assert "count" in content

    # Find our category
    our_cat = next((c for c in content["data"] if c["id"] == str(category.id)), None)
    assert our_cat is not None
    assert "id" in our_cat
    assert "name" in our_cat
    assert "in_use" in our_cat
    assert "resources_count" in our_cat
    assert "submissions_count" in our_cat


def test_list_categories_admin_shows_usage(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that admin list shows correct usage counts."""
    category = get_or_create_category(db, name=f"usage-cat-{uuid.uuid4().hex[:8]}")

    # Create a resource with this category
    create_random_resource(db, category_id=category.id, is_published=True)

    # Create a submission with this category
    submitter = create_random_user(db)
    create_random_submission(db, submitter=submitter, category_id=category.id)

    # Use limit=1000 to ensure we get all categories in test DB
    response = client.get(
        f"{settings.API_V1_STR}/categories/admin",
        headers=superuser_token_headers,
        params={"limit": 1000},
    )
    assert response.status_code == 200
    content = response.json()

    our_cat = next((c for c in content["data"] if c["id"] == str(category.id)), None)
    assert our_cat is not None
    assert our_cat["in_use"] is True
    assert our_cat["resources_count"] >= 1
    assert our_cat["submissions_count"] >= 1


# =========================================================================
# T025: Tests for create/rename categories
# =========================================================================


def test_create_category_requires_auth(client: TestClient) -> None:
    """Test that creating a category requires authentication."""
    response = client.post(
        f"{settings.API_V1_STR}/categories/",
        json={"name": "Test Category"},
    )
    assert response.status_code == 401


def test_create_category_requires_superuser(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test that creating a category requires superuser."""
    response = client.post(
        f"{settings.API_V1_STR}/categories/",
        json={"name": "Test Category"},
        headers=normal_user_token_headers,
    )
    assert response.status_code == 403


def test_create_category_success(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    """Test creating a category successfully."""
    category_name = f"NewCategory{uuid.uuid4().hex[:8]}"
    response = client.post(
        f"{settings.API_V1_STR}/categories/",
        json={"name": category_name},
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["name"] == category_name
    assert "id" in content


def test_create_category_trims_whitespace(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    """Test that category names are trimmed."""
    category_name = f"  Trimmed Category{uuid.uuid4().hex[:8]}  "
    response = client.post(
        f"{settings.API_V1_STR}/categories/",
        json={"name": category_name},
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["name"] == category_name.strip()


def test_create_category_blank_name_rejected(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    """Test that blank category names are rejected."""
    response = client.post(
        f"{settings.API_V1_STR}/categories/",
        json={"name": "   "},
        headers=superuser_token_headers,
    )
    assert response.status_code == 400
    assert "blank" in response.json()["detail"].lower()


def test_create_category_duplicate_conflict(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that creating a duplicate category returns 409."""
    category = get_or_create_category(db, name=f"DupeCat{uuid.uuid4().hex[:8]}")

    response = client.post(
        f"{settings.API_V1_STR}/categories/",
        json={"name": category.name},
        headers=superuser_token_headers,
    )
    assert response.status_code == 409
    assert "already exists" in response.json()["detail"].lower()


def test_create_category_duplicate_case_insensitive(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that case-insensitive duplicates are rejected."""
    category_name = f"CaseTest{uuid.uuid4().hex[:8]}"
    category = get_or_create_category(db, name=category_name)

    # Try to create with different case
    response = client.post(
        f"{settings.API_V1_STR}/categories/",
        json={"name": category.name.upper()},
        headers=superuser_token_headers,
    )
    assert response.status_code == 409


def test_rename_category_requires_auth(client: TestClient, db: Session) -> None:
    """Test that renaming a category requires authentication."""
    category = get_or_create_category(db, name=f"RenameTest{uuid.uuid4().hex[:8]}")

    response = client.put(
        f"{settings.API_V1_STR}/categories/{category.id}",
        json={"name": "New Name"},
    )
    assert response.status_code == 401


def test_rename_category_requires_superuser(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that renaming a category requires superuser."""
    category = get_or_create_category(db, name=f"RenameTest{uuid.uuid4().hex[:8]}")

    response = client.put(
        f"{settings.API_V1_STR}/categories/{category.id}",
        json={"name": "New Name"},
        headers=normal_user_token_headers,
    )
    assert response.status_code == 403


def test_rename_category_success(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test renaming a category successfully."""
    category = get_or_create_category(db, name=f"OldName{uuid.uuid4().hex[:8]}")
    new_name = f"NewName{uuid.uuid4().hex[:8]}"

    response = client.put(
        f"{settings.API_V1_STR}/categories/{category.id}",
        json={"name": new_name},
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["name"] == new_name
    assert content["id"] == str(category.id)


def test_rename_category_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    """Test renaming a non-existent category returns 404."""
    fake_id = str(uuid.uuid4())
    response = client.put(
        f"{settings.API_V1_STR}/categories/{fake_id}",
        json={"name": "Whatever"},
        headers=superuser_token_headers,
    )
    assert response.status_code == 404


def test_rename_category_duplicate_conflict(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that renaming to an existing name returns 409."""
    cat1 = get_or_create_category(db, name=f"ExistingCat{uuid.uuid4().hex[:8]}")
    cat2 = get_or_create_category(db, name=f"ToRename{uuid.uuid4().hex[:8]}")

    response = client.put(
        f"{settings.API_V1_STR}/categories/{cat2.id}",
        json={"name": cat1.name},
        headers=superuser_token_headers,
    )
    assert response.status_code == 409


# =========================================================================
# T033: Tests for delete category
# =========================================================================


def test_delete_category_requires_auth(client: TestClient, db: Session) -> None:
    """Test that deleting a category requires authentication."""
    category = get_or_create_category(db, name=f"DeleteTest{uuid.uuid4().hex[:8]}")

    response = client.delete(f"{settings.API_V1_STR}/categories/{category.id}")
    assert response.status_code == 401


def test_delete_category_requires_superuser(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    """Test that deleting a category requires superuser."""
    category = get_or_create_category(db, name=f"DeleteTest{uuid.uuid4().hex[:8]}")

    response = client.delete(
        f"{settings.API_V1_STR}/categories/{category.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 403


def test_delete_category_success(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test deleting an unused category successfully."""
    category = get_or_create_category(db, name=f"ToDelete{uuid.uuid4().hex[:8]}")

    response = client.delete(
        f"{settings.API_V1_STR}/categories/{category.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    assert "deleted" in response.json()["message"].lower()

    # Verify it's gone
    from app.core.db import engine

    with Session(engine) as session:
        deleted = session.get(Category, category.id)
        assert deleted is None


def test_delete_category_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    """Test deleting a non-existent category returns 404."""
    fake_id = str(uuid.uuid4())
    response = client.delete(
        f"{settings.API_V1_STR}/categories/{fake_id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404


def test_delete_category_in_use_by_resource(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that deleting a category in use by a resource returns 409."""
    category = get_or_create_category(db, name=f"UsedCat{uuid.uuid4().hex[:8]}")
    create_random_resource(db, category_id=category.id, is_published=True)

    response = client.delete(
        f"{settings.API_V1_STR}/categories/{category.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 409
    assert "in use" in response.json()["detail"].lower()


def test_delete_category_in_use_by_submission(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that deleting a category in use by a submission returns 409."""
    category = get_or_create_category(db, name=f"UsedCat{uuid.uuid4().hex[:8]}")
    submitter = create_random_user(db)
    create_random_submission(db, submitter=submitter, category_id=category.id)

    response = client.delete(
        f"{settings.API_V1_STR}/categories/{category.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 409
    assert "in use" in response.json()["detail"].lower()


def test_delete_category_in_use_message_shows_counts(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    """Test that the 'in use' error message includes usage counts."""
    category = get_or_create_category(db, name=f"CountCat{uuid.uuid4().hex[:8]}")
    create_random_resource(db, category_id=category.id, is_published=True)

    response = client.delete(
        f"{settings.API_V1_STR}/categories/{category.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 409
    detail = response.json()["detail"]
    # Should mention counts
    assert "1 resource" in detail or "1 resources" in detail
