"""Category routes for resource classification management."""

import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlalchemy.exc import IntegrityError

from app import crud
from app.api.deps import CurrentUser, SessionDep
from app.models import (
    CategoriesAdmin,
    CategoriesPublic,
    CategoryCreate,
    CategoryPublic,
    CategoryUpdate,
    Message,
)

router = APIRouter(prefix="/categories", tags=["categories"])


# ---------------------------------------------------------------------------
# Public category endpoints
# ---------------------------------------------------------------------------


@router.get("/", response_model=CategoriesPublic)
def list_categories(
    session: SessionDep,
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    List all categories (public, for filtering and selection).
    Returns {data, count} where data is a list of id+name.
    """
    categories, count = crud.list_categories(session=session, skip=skip, limit=limit)
    return CategoriesPublic(
        data=[CategoryPublic(id=c.id, name=c.name) for c in categories],
        count=count,
    )


# ---------------------------------------------------------------------------
# Admin category endpoints
# ---------------------------------------------------------------------------


@router.get("/admin", response_model=CategoriesAdmin)
def list_categories_admin(
    session: SessionDep,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    List all categories with usage information (admin-only).
    Returns {data, count} where data includes in_use and usage counts.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    categories_admin, count = crud.list_categories_admin(
        session=session, skip=skip, limit=limit
    )
    return CategoriesAdmin(data=categories_admin, count=count)


@router.post("/", response_model=CategoryPublic)
def create_category(
    *, session: SessionDep, current_user: CurrentUser, category_in: CategoryCreate
) -> Any:
    """
    Create a new category (admin-only).
    Returns 409 if a category with the same name already exists (case-insensitive).
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    # Check for name uniqueness (case-insensitive)
    name = category_in.name.strip()
    if not name:
        raise HTTPException(status_code=400, detail="Category name cannot be blank")

    existing = crud.get_category_by_name(session=session, name=name)
    if existing:
        raise HTTPException(
            status_code=409,
            detail="A category with this name already exists",
        )

    category = crud.create_category(
        session=session, category_in=CategoryCreate(name=name)
    )
    return CategoryPublic(id=category.id, name=category.name)


@router.put("/{id}", response_model=CategoryPublic)
def update_category(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    category_in: CategoryUpdate,
) -> Any:
    """
    Rename a category (admin-only).
    Returns 409 if a category with the new name already exists (case-insensitive).
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    category = crud.get_category(session=session, category_id=id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    # Check for name uniqueness (case-insensitive)
    name = category_in.name.strip()
    if not name:
        raise HTTPException(status_code=400, detail="Category name cannot be blank")

    # Check if another category has this name (case-insensitive)
    existing = crud.get_category_by_name(session=session, name=name)
    if existing and existing.id != id:
        raise HTTPException(
            status_code=409,
            detail="A category with this name already exists",
        )

    category = crud.update_category(
        session=session, db_category=category, category_in=CategoryUpdate(name=name)
    )
    return CategoryPublic(id=category.id, name=category.name)


@router.delete("/{id}", response_model=Message)
def delete_category(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Any:
    """
    Delete a category (admin-only).
    Returns 409 if category is in use by any resource or submission.
    Uses FK constraint as final guard against race conditions.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    category = crud.get_category(session=session, category_id=id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    # Pre-check: is the category in use?
    if crud.is_category_in_use(session=session, category_id=id):
        resources_count, submissions_count = crud.get_category_usage(
            session=session, category_id=id
        )
        raise HTTPException(
            status_code=409,
            detail=f"Cannot delete category '{category.name}' because it is in use "
            f"({resources_count} resources, {submissions_count} submissions)",
        )

    # Try to delete (FK constraint will catch any race conditions)
    try:
        crud.delete_category(session=session, db_category=category)
    except IntegrityError:
        # Race condition: category became in use between check and delete
        raise HTTPException(
            status_code=409,
            detail=f"Cannot delete category '{category.name}' because it is in use",
        )

    return Message(message="Category deleted successfully")
