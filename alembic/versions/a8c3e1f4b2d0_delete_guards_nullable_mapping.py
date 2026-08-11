"""nullable applicant mapping_id and cascade FKs for job/campaign delete

Revision ID: a8c3e1f4b2d0
Revises: d41f7c9a2b3e
Create Date: 2026-08-11 11:10:00.000000

"""
from __future__ import annotations

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "a8c3e1f4b2d0"
down_revision: Union[str, None] = "d41f7c9a2b3e"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column(
        "applicants",
        "mapping_id",
        existing_type=sa.Integer(),
        nullable=True,
    )
    op.drop_constraint("applicants_mapping_id_fkey", "applicants", type_="foreignkey")
    op.create_foreign_key(
        "applicants_mapping_id_fkey",
        "applicants",
        "campaign_job_mapping",
        ["mapping_id"],
        ["id"],
        ondelete="SET NULL",
    )

    op.drop_constraint(
        "campaign_job_mapping_job_id_fkey",
        "campaign_job_mapping",
        type_="foreignkey",
    )
    op.create_foreign_key(
        "campaign_job_mapping_job_id_fkey",
        "campaign_job_mapping",
        "jobs",
        ["job_id"],
        ["id"],
        ondelete="CASCADE",
    )

    op.drop_constraint(
        "campaign_job_mapping_campaign_id_fkey",
        "campaign_job_mapping",
        type_="foreignkey",
    )
    op.create_foreign_key(
        "campaign_job_mapping_campaign_id_fkey",
        "campaign_job_mapping",
        "campaigns",
        ["campaign_id"],
        ["id"],
        ondelete="CASCADE",
    )

    op.drop_constraint(
        "job_skills_mapping_job_id_fkey",
        "job_skills_mapping",
        type_="foreignkey",
    )
    op.create_foreign_key(
        "job_skills_mapping_job_id_fkey",
        "job_skills_mapping",
        "jobs",
        ["job_id"],
        ["id"],
        ondelete="CASCADE",
    )


def downgrade() -> None:
    op.execute("DELETE FROM applicants WHERE mapping_id IS NULL")

    op.drop_constraint(
        "job_skills_mapping_job_id_fkey",
        "job_skills_mapping",
        type_="foreignkey",
    )
    op.create_foreign_key(
        "job_skills_mapping_job_id_fkey",
        "job_skills_mapping",
        "jobs",
        ["job_id"],
        ["id"],
    )

    op.drop_constraint(
        "campaign_job_mapping_campaign_id_fkey",
        "campaign_job_mapping",
        type_="foreignkey",
    )
    op.create_foreign_key(
        "campaign_job_mapping_campaign_id_fkey",
        "campaign_job_mapping",
        "campaigns",
        ["campaign_id"],
        ["id"],
    )

    op.drop_constraint(
        "campaign_job_mapping_job_id_fkey",
        "campaign_job_mapping",
        type_="foreignkey",
    )
    op.create_foreign_key(
        "campaign_job_mapping_job_id_fkey",
        "campaign_job_mapping",
        "jobs",
        ["job_id"],
        ["id"],
    )

    op.drop_constraint("applicants_mapping_id_fkey", "applicants", type_="foreignkey")
    op.create_foreign_key(
        "applicants_mapping_id_fkey",
        "applicants",
        "campaign_job_mapping",
        ["mapping_id"],
        ["id"],
    )
    op.alter_column(
        "applicants",
        "mapping_id",
        existing_type=sa.Integer(),
        nullable=False,
    )
