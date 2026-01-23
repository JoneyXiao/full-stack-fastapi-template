"""Track who published a resource

Revision ID: 005_01_add_resource_published_by
Revises: 005_widen_submission_description
Create Date: 2026-01-23

"""

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "005_01_add_resource_published_by"
down_revision = "005_widen_submission_description"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "resource",
        sa.Column("published_by_id", sa.Uuid(), nullable=True),
    )
    op.create_foreign_key(
        "fk_resource_published_by_id_user",
        "resource",
        "user",
        ["published_by_id"],
        ["id"],
        ondelete="SET NULL",
    )
    op.create_index(
        op.f("ix_resource_published_by_id"),
        "resource",
        ["published_by_id"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(op.f("ix_resource_published_by_id"), table_name="resource")
    op.drop_constraint(
        "fk_resource_published_by_id_user",
        "resource",
        type_="foreignkey",
    )
    op.drop_column("resource", "published_by_id")

