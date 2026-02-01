"""Add resource categories

Revision ID: 009_01_categories
Revises: 007_01_wechat_login
Create Date: 2026-01-30 12:00:00.000000

This migration adds the Category table and category_id columns to
resource and resourcesubmission tables:
1. Create category table with case-insensitive unique index
2. Add nullable category_id columns to resource and resourcesubmission
3. Backfill categories from existing distinct type values
4. Add FK constraints with ON DELETE RESTRICT
5. Drop the legacy type column
"""

import uuid
from datetime import datetime

import sqlalchemy as sa
from alembic import op
from sqlalchemy.orm import Session

# revision identifiers, used by Alembic.
revision = "009_01_categories"
down_revision = "007_01_wechat_login"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # 1. Create category table
    op.create_table(
        "category",
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )

    # 2. Create case-insensitive unique index on category name
    op.create_index(
        "ix_category_name_lower",
        "category",
        [sa.text("lower(name)")],
        unique=True,
    )

    # 3. Add nullable category_id columns to resource and resourcesubmission
    op.add_column(
        "resource",
        sa.Column("category_id", sa.Uuid(), nullable=True),
    )
    op.add_column(
        "resourcesubmission",
        sa.Column("category_id", sa.Uuid(), nullable=True),
    )

    # 4. Backfill: Create categories from existing type values and link them
    bind = op.get_bind()
    session = Session(bind=bind)

    # Get distinct type values from resources
    resource_types = session.execute(
        sa.text("SELECT DISTINCT type FROM resource WHERE type IS NOT NULL")
    ).fetchall()

    # Get distinct type values from submissions
    submission_types = session.execute(
        sa.text("SELECT DISTINCT type FROM resourcesubmission WHERE type IS NOT NULL")
    ).fetchall()

    # Combine and deduplicate type values (case-insensitive)
    all_types: dict[str, str] = {}  # lowercase -> original case
    for (type_val,) in resource_types:
        if type_val and type_val.lower() not in all_types:
            all_types[type_val.lower()] = type_val
    for (type_val,) in submission_types:
        if type_val and type_val.lower() not in all_types:
            all_types[type_val.lower()] = type_val

    # Create categories and build mapping
    type_to_category_id: dict[str, uuid.UUID] = {}  # lowercase type -> category_id
    now = datetime.utcnow()

    for lower_type, original_type in all_types.items():
        category_id = uuid.uuid4()
        session.execute(
            sa.text(
                "INSERT INTO category (id, name, created_at, updated_at) "
                "VALUES (:id, :name, :created_at, :updated_at)"
            ),
            {
                "id": category_id,
                "name": original_type,
                "created_at": now,
                "updated_at": now,
            },
        )
        type_to_category_id[lower_type] = category_id

    # Update resources with category_id
    for lower_type, category_id in type_to_category_id.items():
        session.execute(
            sa.text(
                "UPDATE resource SET category_id = :category_id "
                "WHERE lower(type) = :lower_type"
            ),
            {"category_id": category_id, "lower_type": lower_type},
        )

    # Update submissions with category_id
    for lower_type, category_id in type_to_category_id.items():
        session.execute(
            sa.text(
                "UPDATE resourcesubmission SET category_id = :category_id "
                "WHERE lower(type) = :lower_type"
            ),
            {"category_id": category_id, "lower_type": lower_type},
        )

    session.commit()

    # 5. Add FK constraints with ON DELETE RESTRICT
    op.create_foreign_key(
        "fk_resource_category_id",
        "resource",
        "category",
        ["category_id"],
        ["id"],
        ondelete="RESTRICT",
    )
    op.create_foreign_key(
        "fk_resourcesubmission_category_id",
        "resourcesubmission",
        "category",
        ["category_id"],
        ["id"],
        ondelete="RESTRICT",
    )

    # 6. Create indexes on category_id for performance
    op.create_index(
        op.f("ix_resource_category_id"),
        "resource",
        ["category_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_resourcesubmission_category_id"),
        "resourcesubmission",
        ["category_id"],
        unique=False,
    )

    # 7. Drop the legacy type column (no longer needed)
    op.drop_column("resource", "type")
    op.drop_column("resourcesubmission", "type")


def downgrade() -> None:
    # Recreate type column (will be NULL for all rows initially)
    op.add_column(
        "resource",
        sa.Column("type", sa.String(length=50), nullable=True),
    )
    op.add_column(
        "resourcesubmission",
        sa.Column("type", sa.String(length=50), nullable=True),
    )

    # Backfill type from category name
    bind = op.get_bind()
    session = Session(bind=bind)
    session.execute(
        sa.text(
            "UPDATE resource r SET type = c.name "
            "FROM category c WHERE r.category_id = c.id"
        )
    )
    session.execute(
        sa.text(
            "UPDATE resourcesubmission rs SET type = c.name "
            "FROM category c WHERE rs.category_id = c.id"
        )
    )
    session.commit()

    # Remove indexes
    op.drop_index(
        op.f("ix_resourcesubmission_category_id"), table_name="resourcesubmission"
    )
    op.drop_index(op.f("ix_resource_category_id"), table_name="resource")

    # Remove FK constraints
    op.drop_constraint(
        "fk_resourcesubmission_category_id",
        "resourcesubmission",
        type_="foreignkey",
    )
    op.drop_constraint("fk_resource_category_id", "resource", type_="foreignkey")

    # Remove category_id columns
    op.drop_column("resourcesubmission", "category_id")
    op.drop_column("resource", "category_id")

    # Drop category table and index
    op.drop_index("ix_category_name_lower", table_name="category")
    op.drop_table("category")
