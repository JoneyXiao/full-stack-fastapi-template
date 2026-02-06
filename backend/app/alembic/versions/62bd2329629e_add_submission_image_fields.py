"""add_submission_image_fields

Revision ID: 62bd2329629e
Revises: 010_01_resource_image_fields
Create Date: 2026-02-06 10:58:08.760646

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '62bd2329629e'
down_revision = '010_01_resource_image_fields'
branch_labels = None
depends_on = None


def upgrade():
    # Add submission cover image fields (mirrors Resource image fields)
    op.add_column('resourcesubmission', sa.Column('image_external_url', sqlmodel.sql.sqltypes.AutoString(length=2048), nullable=True))
    op.add_column('resourcesubmission', sa.Column('image_key', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=True))
    op.add_column('resourcesubmission', sa.Column('image_version', sa.Integer(), nullable=False, server_default='0'))
    op.add_column('resourcesubmission', sa.Column('image_content_type', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=True))
    op.add_column('resourcesubmission', sa.Column('image_updated_at', sa.DateTime(), nullable=True))


def downgrade():
    op.drop_column('resourcesubmission', 'image_updated_at')
    op.drop_column('resourcesubmission', 'image_content_type')
    op.drop_column('resourcesubmission', 'image_version')
    op.drop_column('resourcesubmission', 'image_key')
    op.drop_column('resourcesubmission', 'image_external_url')
