from __future__ import annotations

from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.core.config import settings


def _ensure_asyncpg(url: str) -> str:
    # Normalize various postgres URL forms to asyncpg
    if url.startswith("postgres://"):
        return "postgresql+asyncpg://" + url[len("postgres://") :]
    if url.startswith("postgresql://") and "+asyncpg" not in url:
        return url.replace("postgresql://", "postgresql+asyncpg://", 1)
    return url


ASYNC_DATABASE_URL = _ensure_asyncpg(settings.database_url)

# Supabase transaction pooler needs statement_cache_size=0.
# Avoid pool_pre_ping (extra RTT) and SQL echo in normal runs.
engine = create_async_engine(
    ASYNC_DATABASE_URL,
    echo=False,
    future=True,
    pool_pre_ping=False,
    pool_size=5,
    max_overflow=5,
    pool_recycle=280,
    connect_args={"statement_cache_size": 0},
)
AsyncSessionLocal = async_sessionmaker(
    bind=engine, expire_on_commit=False, autoflush=False
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:  # type: ignore[call-arg]
        yield session
