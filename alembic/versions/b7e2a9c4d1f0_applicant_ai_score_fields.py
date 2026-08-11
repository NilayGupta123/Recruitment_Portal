"""add AI score fields on applicants

Revision ID: b7e2a9c4d1f0
Revises: a8c3e1f4b2d0
Create Date: 2026-08-11 11:50:00.000000

"""
from __future__ import annotations

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "b7e2a9c4d1f0"
down_revision: Union[str, None] = "a8c3e1f4b2d0"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("applicants", sa.Column("ai_score", sa.Numeric(4, 1), nullable=True))
    op.add_column("applicants", sa.Column("ai_decision", sa.String(length=32), nullable=True))
    op.add_column("applicants", sa.Column("ai_summary", sa.Text(), nullable=True))
    op.add_column("applicants", sa.Column("ai_praise_html", sa.Text(), nullable=True))
    op.add_column("applicants", sa.Column("ai_critique_html", sa.Text(), nullable=True))
    op.add_column("applicants", sa.Column("ai_score_status", sa.String(length=20), nullable=True))
    op.add_column("applicants", sa.Column("ai_score_error", sa.Text(), nullable=True))
    op.add_column(
        "applicants",
        sa.Column("ai_scored_at", sa.DateTime(timezone=True), nullable=True),
    )
    op.add_column(
        "applicants",
        sa.Column("ai_score_raw", postgresql.JSONB(astext_type=sa.Text()), nullable=True),
    )
    op.create_index(
        op.f("ix_applicants_ai_score_status"),
        "applicants",
        ["ai_score_status"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(op.f("ix_applicants_ai_score_status"), table_name="applicants")
    op.drop_column("applicants", "ai_score_raw")
    op.drop_column("applicants", "ai_scored_at")
    op.drop_column("applicants", "ai_score_error")
    op.drop_column("applicants", "ai_score_status")
    op.drop_column("applicants", "ai_critique_html")
    op.drop_column("applicants", "ai_praise_html")
    op.drop_column("applicants", "ai_summary")
    op.drop_column("applicants", "ai_decision")
    op.drop_column("applicants", "ai_score")
