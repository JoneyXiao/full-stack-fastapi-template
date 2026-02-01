"""Tests for category CRUD operations."""

import uuid

from sqlmodel import Session

from app import crud
from app.models import CategoryCreate, CategoryUpdate
from tests.utils.resource import create_random_resource, get_or_create_category
from tests.utils.submission import create_random_submission
from tests.utils.user import create_random_user


def test_create_category(db: Session) -> None:
    """Test creating a category."""
    name = f"TestCat{uuid.uuid4().hex[:8]}"
    category_in = CategoryCreate(name=name)
    category = crud.create_category(session=db, category_in=category_in)

    assert category.name == name
    assert category.id is not None


def test_get_category(db: Session) -> None:
    """Test getting a category by ID."""
    category = get_or_create_category(db, name=f"GetCat{uuid.uuid4().hex[:8]}")

    fetched = crud.get_category(session=db, category_id=category.id)
    assert fetched is not None
    assert fetched.id == category.id
    assert fetched.name == category.name


def test_get_category_not_found(db: Session) -> None:
    """Test getting a non-existent category returns None."""
    fake_id = uuid.uuid4()
    fetched = crud.get_category(session=db, category_id=fake_id)
    assert fetched is None


def test_get_category_by_name(db: Session) -> None:
    """Test getting a category by name (case-insensitive)."""
    name = f"NameCat{uuid.uuid4().hex[:8]}"
    category = get_or_create_category(db, name=name)

    # Exact match
    fetched = crud.get_category_by_name(session=db, name=name)
    assert fetched is not None
    assert fetched.id == category.id

    # Case-insensitive match
    fetched_upper = crud.get_category_by_name(session=db, name=name.upper())
    assert fetched_upper is not None
    assert fetched_upper.id == category.id

    fetched_lower = crud.get_category_by_name(session=db, name=name.lower())
    assert fetched_lower is not None
    assert fetched_lower.id == category.id


def test_get_category_by_name_not_found(db: Session) -> None:
    """Test getting a non-existent category by name returns None."""
    fetched = crud.get_category_by_name(
        session=db, name=f"NonExistent{uuid.uuid4().hex}"
    )
    assert fetched is None


def test_update_category(db: Session) -> None:
    """Test updating a category name."""
    category = get_or_create_category(db, name=f"OldName{uuid.uuid4().hex[:8]}")
    new_name = f"NewName{uuid.uuid4().hex[:8]}"

    updated = crud.update_category(
        session=db,
        db_category=category,
        category_in=CategoryUpdate(name=new_name),
    )

    assert updated.id == category.id
    assert updated.name == new_name


def test_delete_category(db: Session) -> None:
    """Test deleting a category."""
    category = get_or_create_category(db, name=f"ToDelete{uuid.uuid4().hex[:8]}")
    category_id = category.id

    crud.delete_category(session=db, db_category=category)

    # Should be gone
    fetched = crud.get_category(session=db, category_id=category_id)
    assert fetched is None


def test_list_categories(db: Session) -> None:
    """Test listing categories."""
    # Create a few categories
    cat1 = get_or_create_category(db, name=f"ListCat1{uuid.uuid4().hex[:8]}")
    cat2 = get_or_create_category(db, name=f"ListCat2{uuid.uuid4().hex[:8]}")

    # Use high limit to ensure we get all categories (DB may have accumulated test data)
    data, count = crud.list_categories(session=db, limit=1000)

    assert count >= 2
    category_ids = [c.id for c in data]
    assert cat1.id in category_ids
    assert cat2.id in category_ids


def test_list_categories_with_pagination(db: Session) -> None:
    """Test listing categories with pagination."""
    # Create multiple categories
    for i in range(5):
        get_or_create_category(db, name=f"PageCat{i}{uuid.uuid4().hex[:8]}")

    # Get first page
    data, count = crud.list_categories(session=db, skip=0, limit=2)
    assert len(data) == 2
    assert count >= 5

    # Get second page
    data2, count2 = crud.list_categories(session=db, skip=2, limit=2)
    assert len(data2) == 2
    assert count2 == count


# =========================================================================
# T019: Tests for usage checks
# =========================================================================


def test_get_category_usage_empty(db: Session) -> None:
    """Test usage counts for an unused category."""
    category = get_or_create_category(db, name=f"EmptyCat{uuid.uuid4().hex[:8]}")

    resources_count, submissions_count = crud.get_category_usage(
        session=db, category_id=category.id
    )

    assert resources_count == 0
    assert submissions_count == 0


def test_get_category_usage_with_resources(db: Session) -> None:
    """Test usage counts with resources."""
    category = get_or_create_category(db, name=f"ResCat{uuid.uuid4().hex[:8]}")

    # Create resources with this category
    create_random_resource(db, category_id=category.id, is_published=True)
    create_random_resource(db, category_id=category.id, is_published=False)

    resources_count, submissions_count = crud.get_category_usage(
        session=db, category_id=category.id
    )

    assert resources_count == 2
    assert submissions_count == 0


def test_get_category_usage_with_submissions(db: Session) -> None:
    """Test usage counts with submissions."""
    category = get_or_create_category(db, name=f"SubCat{uuid.uuid4().hex[:8]}")
    submitter = create_random_user(db)

    # Create submissions with this category
    create_random_submission(db, submitter=submitter, category_id=category.id)
    create_random_submission(db, submitter=submitter, category_id=category.id)

    resources_count, submissions_count = crud.get_category_usage(
        session=db, category_id=category.id
    )

    assert resources_count == 0
    assert submissions_count == 2


def test_get_category_usage_with_both(db: Session) -> None:
    """Test usage counts with both resources and submissions."""
    category = get_or_create_category(db, name=f"BothCat{uuid.uuid4().hex[:8]}")
    submitter = create_random_user(db)

    create_random_resource(db, category_id=category.id, is_published=True)
    create_random_submission(db, submitter=submitter, category_id=category.id)

    resources_count, submissions_count = crud.get_category_usage(
        session=db, category_id=category.id
    )

    assert resources_count == 1
    assert submissions_count == 1


def test_is_category_in_use_false(db: Session) -> None:
    """Test that unused category is not in use."""
    category = get_or_create_category(db, name=f"UnusedCat{uuid.uuid4().hex[:8]}")

    assert crud.is_category_in_use(session=db, category_id=category.id) is False


def test_is_category_in_use_with_resource(db: Session) -> None:
    """Test that category with resource is in use."""
    category = get_or_create_category(db, name=f"UsedResCat{uuid.uuid4().hex[:8]}")
    create_random_resource(db, category_id=category.id, is_published=True)

    assert crud.is_category_in_use(session=db, category_id=category.id) is True


def test_is_category_in_use_with_submission(db: Session) -> None:
    """Test that category with submission is in use."""
    category = get_or_create_category(db, name=f"UsedSubCat{uuid.uuid4().hex[:8]}")
    submitter = create_random_user(db)
    create_random_submission(db, submitter=submitter, category_id=category.id)

    assert crud.is_category_in_use(session=db, category_id=category.id) is True


def test_list_categories_admin(db: Session) -> None:
    """Test listing categories with admin info (usage)."""
    category = get_or_create_category(db, name=f"AdminCat{uuid.uuid4().hex[:8]}")
    create_random_resource(db, category_id=category.id, is_published=True)

    data, count = crud.list_categories_admin(session=db)

    # Find our category
    our_cat = next((c for c in data if c.id == category.id), None)
    assert our_cat is not None
    assert our_cat.name == category.name
    assert our_cat.in_use is True
    assert our_cat.resources_count >= 1
    assert our_cat.submissions_count >= 0
