"""Add AI Resource Hub tables

Revision ID: 002_ai_resource_hub
Revises: 1a31ce608336
Create Date: 2026-01-05 12:00:00.000000

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "002_ai_resource_hub"
down_revision = "1a31ce608336"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create resource table
    op.create_table(
        "resource",
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("description", sa.String(length=1024), nullable=True),
        sa.Column("destination_url", sa.String(length=2048), nullable=False),
        sa.Column("type", sa.String(length=50), nullable=False),
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("is_published", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("destination_url"),
    )
    op.create_index(op.f("ix_resource_is_published"), "resource", ["is_published"], unique=False)
    op.create_index(op.f("ix_resource_destination_url"), "resource", ["destination_url"], unique=True)

    # Create resourcesubmission table
    op.create_table(
        "resourcesubmission",
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("description", sa.String(length=1024), nullable=True),
        sa.Column("destination_url", sa.String(length=2048), nullable=False),
        sa.Column("type", sa.String(length=50), nullable=False),
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("status", sa.String(length=20), nullable=False, server_default="pending"),
        sa.Column("submitter_id", sa.Uuid(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["submitter_id"], ["user.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_resourcesubmission_status"), "resourcesubmission", ["status"], unique=False)

    # Create like table (composite primary key)
    op.create_table(
        "like",
        sa.Column("user_id", sa.Uuid(), nullable=False),
        sa.Column("resource_id", sa.Uuid(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["user.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["resource_id"], ["resource.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("user_id", "resource_id"),
    )

    # Create favorite table (composite primary key)
    op.create_table(
        "favorite",
        sa.Column("user_id", sa.Uuid(), nullable=False),
        sa.Column("resource_id", sa.Uuid(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["user.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["resource_id"], ["resource.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("user_id", "resource_id"),
    )

    # Create comment table
    op.create_table(
        "comment",
        sa.Column("body", sa.String(length=2048), nullable=False),
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("author_id", sa.Uuid(), nullable=False),
        sa.Column("resource_id", sa.Uuid(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["author_id"], ["user.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["resource_id"], ["resource.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )

    # Create submissioncomment table
    op.create_table(
        "submissioncomment",
        sa.Column("body", sa.String(length=2048), nullable=False),
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("author_id", sa.Uuid(), nullable=False),
        sa.Column("submission_id", sa.Uuid(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["author_id"], ["user.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["submission_id"], ["resourcesubmission.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade() -> None:
    op.drop_table("submissioncomment")
    op.drop_table("comment")
    op.drop_table("favorite")
    op.drop_table("like")
    op.drop_index(op.f("ix_resourcesubmission_status"), table_name="resourcesubmission")
    op.drop_table("resourcesubmission")
    op.drop_index(op.f("ix_resource_destination_url"), table_name="resource")
    op.drop_index(op.f("ix_resource_is_published"), table_name="resource")
    op.drop_table("resource")
