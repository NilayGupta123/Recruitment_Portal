"""add user_type to users

Revision ID: 72a6265d89dc
Revises: 32cf7d710b74
Create Date: 2026-06-04 12:00:07.974828

"""
from __future__ import annotations

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '72a6265d89dc'
down_revision: Union[str, None] = '32cf7d710b74'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create the PostgreSQL ENUM type before adding the column
    user_type = sa.Enum('ADMIN', 'HR', 'APPLICANT', name='user_type')
    user_type.create(op.get_bind(), checkfirst=True)

    # Now add the column using the created type
    op.add_column(
        'users',
        sa.Column('user_type', user_type, server_default='APPLICANT', nullable=False),
    )


def downgrade() -> None:
    # Drop the column first, then drop the ENUM type
    op.drop_column('users', 'user_type')
    user_type = sa.Enum('ADMIN', 'HR', 'APPLICANT', name='user_type')
    user_type.drop(op.get_bind(), checkfirst=True)
