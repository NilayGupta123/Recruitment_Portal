"""applicant linked to campaign_job_mapping instead of job

Revision ID: d41f7c9a2b3e
Revises: 56fed2ebdd69
Create Date: 2026-08-11 00:00:00.000000

"""
from __future__ import annotations

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'd41f7c9a2b3e'
down_revision: Union[str, None] = '56fed2ebdd69'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Existing applicant rows only reference job_id with no campaign context,
    # so there is no safe way to backfill mapping_id — this is test data, wipe it.
    op.execute("DELETE FROM applicants")

    op.drop_constraint('uq_job_applicant', 'applicants', type_='unique')
    op.drop_index(op.f('ix_applicants_job_id'), table_name='applicants')
    op.drop_column('applicants', 'job_id')

    op.add_column('applicants', sa.Column('mapping_id', sa.Integer(), nullable=False))
    op.create_index(op.f('ix_applicants_mapping_id'), 'applicants', ['mapping_id'], unique=False)
    op.create_foreign_key(
        'applicants_mapping_id_fkey',
        'applicants', 'campaign_job_mapping',
        ['mapping_id'], ['id'],
    )
    op.create_unique_constraint('uq_mapping_applicant', 'applicants', ['mapping_id', 'applicant_id'])


def downgrade() -> None:
    op.execute("DELETE FROM applicants")

    op.drop_constraint('uq_mapping_applicant', 'applicants', type_='unique')
    op.drop_constraint('applicants_mapping_id_fkey', 'applicants', type_='foreignkey')
    op.drop_index(op.f('ix_applicants_mapping_id'), table_name='applicants')
    op.drop_column('applicants', 'mapping_id')

    op.add_column('applicants', sa.Column('job_id', sa.Integer(), nullable=False))
    op.create_index(op.f('ix_applicants_job_id'), 'applicants', ['job_id'], unique=False)
    op.create_foreign_key(
        'applicants_job_id_fkey',
        'applicants', 'jobs',
        ['job_id'], ['id'],
    )
    op.create_unique_constraint('uq_job_applicant', 'applicants', ['job_id', 'applicant_id'])
