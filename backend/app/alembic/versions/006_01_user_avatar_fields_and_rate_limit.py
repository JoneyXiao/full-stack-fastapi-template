"""add user avatar fields and rate limit table

Revision ID: 006_01_user_avatar
Revises: 005_01_add_resource_published_by
Create Date: 2026-01-24 10:00:00.000000

"""

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = "006_01_user_avatar"
down_revision = "005_01_add_resource_published_by"
branch_labels = None
depends_on = None


def upgrade():
    # Add avatar metadata fields to user table
    op.add_column(
        "user",
        sa.Column(
            "avatar_key", sqlmodel.sql.sqltypes.AutoString(length=255), nullable=True
        ),
    )
    op.add_column(
        "user",
        sa.Column("avatar_version", sa.Integer(), nullable=False, server_default="0"),
    )
    op.add_column(
        "user",
        sa.Column(
            "avatar_content_type",
            sqlmodel.sql.sqltypes.AutoString(length=50),
            nullable=True,
        ),
    )
    op.add_column(
        "user",
        sa.Column("avatar_updated_at", sa.DateTime(), nullable=True),
    )

    # Create avatar rate limit table
    op.create_table(
        "avatarratelimit",
        sa.Column("user_id", sa.Uuid(), nullable=False),
        sa.Column("window_start_utc", sa.DateTime(), nullable=False),
        sa.Column("attempt_count", sa.Integer(), nullable=False),
        sa.Column("first_attempt_at", sa.DateTime(), nullable=False),
        sa.Column("last_attempt_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["user.id"],
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("user_id"),
    )


def downgrade():
    # Drop avatar rate limit table
    op.drop_table("avatarratelimit")

    # Remove avatar fields from user table
    op.drop_column("user", "avatar_updated_at")
    op.drop_column("user", "avatar_content_type")
    op.drop_column("user", "avatar_version")
    op.drop_column("user", "avatar_key")
