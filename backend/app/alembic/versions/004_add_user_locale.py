"""add user locale column

Revision ID: 004_add_user_locale
Revises: e8b2e85b631b
Create Date: 2026-01-14 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '004_add_user_locale'
down_revision = 'e8b2e85b631b'
branch_labels = None
depends_on = None


def upgrade():
    # Add nullable locale column to user table
    # Allowed values: 'en', 'zh' (enforced at application level via Pydantic Literal)
    op.add_column(
        'user',
        sa.Column('locale', sqlmodel.sql.sqltypes.AutoString(length=10), nullable=True)
    )


def downgrade():
    op.drop_column('user', 'locale')
