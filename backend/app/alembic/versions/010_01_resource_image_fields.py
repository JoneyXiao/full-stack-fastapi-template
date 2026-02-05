"""Add resource image fields for uploaded and external images.

Revision ID: 010_01_resource_image_fields
Revises: 009_01_categories
Create Date: 2026-02-04

"""

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "010_01_resource_image_fields"
down_revision = "009_01_categories"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add resource image fields (mutually exclusive: external URL OR uploaded image)
    op.add_column(
        "resource",
        sa.Column("image_external_url", sa.String(length=2048), nullable=True),
    )
    op.add_column(
        "resource",
        sa.Column("image_key", sa.String(length=255), nullable=True),
    )
    op.add_column(
        "resource",
        sa.Column("image_version", sa.Integer(), nullable=False, server_default="0"),
    )
    op.add_column(
        "resource",
        sa.Column("image_content_type", sa.String(length=50), nullable=True),
    )
    op.add_column(
        "resource",
        sa.Column("image_updated_at", sa.DateTime(), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("resource", "image_updated_at")
    op.drop_column("resource", "image_content_type")
    op.drop_column("resource", "image_version")
    op.drop_column("resource", "image_key")
    op.drop_column("resource", "image_external_url")
