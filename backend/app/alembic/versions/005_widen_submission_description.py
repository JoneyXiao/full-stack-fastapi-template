"""Widen description columns to 10000 characters

Revision ID: 005_widen_submission_description
Revises: 004_add_user_locale
Create Date: 2026-01-23

"""

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "005_widen_submission_description"
down_revision = "004_add_user_locale"
branch_labels = None
depends_on = None


def upgrade():
    # Widen the description columns to support Markdown content up to 10,000 characters
    op.alter_column(
        "resourcesubmission",
        "description",
        existing_type=sa.String(length=1024),
        type_=sa.String(length=10000),
        existing_nullable=True,
    )
    op.alter_column(
        "resource",
        "description",
        existing_type=sa.String(length=1024),
        type_=sa.String(length=10000),
        existing_nullable=True,
    )


def downgrade():
    # Revert to 1024 character limit (may truncate existing data)
    op.alter_column(
        "resourcesubmission",
        "description",
        existing_type=sa.String(length=10000),
        type_=sa.String(length=1024),
        existing_nullable=True,
    )
    op.alter_column(
        "resource",
        "description",
        existing_type=sa.String(length=10000),
        type_=sa.String(length=1024),
        existing_nullable=True,
    )
