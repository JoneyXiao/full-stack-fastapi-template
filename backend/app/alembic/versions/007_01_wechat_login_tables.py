"""add wechat login tables

Revision ID: 007_01_wechat_login
Revises: 006_01_user_avatar
Create Date: 2026-01-27 10:00:00.000000

"""

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = "007_01_wechat_login"
down_revision = "006_01_user_avatar"
branch_labels = None
depends_on = None


def upgrade():
    # Create WeChatAccountLink table
    op.create_table(
        "wechataccountlink",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("user_id", sa.Uuid(), nullable=False),
        sa.Column(
            "openid", sqlmodel.sql.sqltypes.AutoString(length=64), nullable=False
        ),
        sa.Column(
            "unionid", sqlmodel.sql.sqltypes.AutoString(length=64), nullable=True
        ),
        sa.Column(
            "primary_subject_type",
            sqlmodel.sql.sqltypes.AutoString(length=20),
            nullable=False,
        ),
        sa.Column(
            "primary_subject",
            sqlmodel.sql.sqltypes.AutoString(length=64),
            nullable=False,
        ),
        sa.Column(
            "nickname", sqlmodel.sql.sqltypes.AutoString(length=255), nullable=True
        ),
        sa.Column(
            "avatar_url", sqlmodel.sql.sqltypes.AutoString(length=2048), nullable=True
        ),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["user.id"],
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # Create indexes for WeChatAccountLink
    op.create_index(
        "ix_wechataccountlink_user_id", "wechataccountlink", ["user_id"], unique=False
    )
    op.create_index(
        "ix_wechataccountlink_openid", "wechataccountlink", ["openid"], unique=True
    )
    op.create_index(
        "ix_wechataccountlink_unionid", "wechataccountlink", ["unionid"], unique=True
    )
    # Unique constraint on (primary_subject_type, primary_subject)
    op.create_index(
        "ix_wechataccountlink_primary_subject",
        "wechataccountlink",
        ["primary_subject_type", "primary_subject"],
        unique=True,
    )

    # Create WeChatLoginAttempt table
    op.create_table(
        "wechatloginattempt",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column(
            "state", sqlmodel.sql.sqltypes.AutoString(length=64), nullable=False
        ),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("expires_at", sa.DateTime(), nullable=False),
        sa.Column("completed_at", sa.DateTime(), nullable=True),
        sa.Column(
            "status",
            sqlmodel.sql.sqltypes.AutoString(length=20),
            nullable=False,
            server_default="started",
        ),
        sa.Column(
            "failure_category",
            sqlmodel.sql.sqltypes.AutoString(length=50),
            nullable=True,
        ),
        sa.Column("user_id", sa.Uuid(), nullable=True),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["user.id"],
            ondelete="SET NULL",
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # Create indexes for WeChatLoginAttempt
    op.create_index(
        "ix_wechatloginattempt_state", "wechatloginattempt", ["state"], unique=True
    )


def downgrade():
    # Drop WeChatLoginAttempt table and indexes
    op.drop_index("ix_wechatloginattempt_state", table_name="wechatloginattempt")
    op.drop_table("wechatloginattempt")

    # Drop WeChatAccountLink table and indexes
    op.drop_index(
        "ix_wechataccountlink_primary_subject", table_name="wechataccountlink"
    )
    op.drop_index("ix_wechataccountlink_unionid", table_name="wechataccountlink")
    op.drop_index("ix_wechataccountlink_openid", table_name="wechataccountlink")
    op.drop_index("ix_wechataccountlink_user_id", table_name="wechataccountlink")
    op.drop_table("wechataccountlink")
