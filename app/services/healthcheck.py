from __future__ import annotations

import logging
from typing import Tuple
from urllib.parse import urlparse

import asyncpg

from app.core.config import settings

try:
    import boto3
    from botocore.exceptions import ClientError
except ImportError:  # pragma: no cover - optional dependency
    boto3 = None
    ClientError = Exception

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


def _normalize_database_dsn(database_url: str) -> str:
    url = database_url
    if url.startswith("postgres://"):
        url = "postgresql://" + url[len("postgres://") :]
    elif url.startswith("postgresql+asyncpg://"):
        url = "postgresql://" + url[len("postgresql+asyncpg://") :]

    if "sslmode=" not in url:
        separator = "&" if "?" in url else "?"
        url = f"{url}{separator}sslmode=require"

    return url


def _database_target_for_logging(database_url: str) -> str:
    parsed = urlparse(database_url)
    host = parsed.hostname or "<unknown>"
    port = parsed.port or 5432
    db_name = parsed.path.lstrip("/") or "<default>"
    return f"{host}:{port}/{db_name}"


def _s3_target_for_logging() -> str:
    endpoint = settings.s3_endpoint_url or "https://s3.amazonaws.com"
    return f"{endpoint} -> bucket:{settings.s3_bucket_name}"


async def check_database_connection() -> Tuple[bool, str]:
    dsn = _normalize_database_dsn(settings.database_url)
    target = _database_target_for_logging(dsn)
    logger.info("Performing database health check for %s", target)

    try:
        # Disable prepared statements for Supabase/PgBouncer transaction poolers.
        conn = await asyncpg.connect(dsn, statement_cache_size=0)
    except Exception as exc:  # pragma: no cover - depends on environment
        logger.error("Database health check failed while connecting to %s: %s", target, exc, exc_info=True)
        return False, f"database connection failed to {target}: {exc}"

    try:
        await conn.execute("SELECT 1")
    except Exception as exc:  # pragma: no cover - depends on environment
        logger.error("Database health check failed during query execution for %s: %s", target, exc, exc_info=True)
        return False, f"database query failed at {target}: {exc}"
    finally:
        await conn.close()

    logger.info("Database health check succeeded for %s", target)
    return True, f"database connection ok for {target}"


async def check_s3_connection() -> Tuple[bool, str]:
    if not settings.s3_bucket_name or not settings.s3_access_key_id or not settings.s3_secret_access_key:
        message = "S3 health check failed: bucket or credentials are not configured"
        logger.error(message)
        return False, message

    target = _s3_target_for_logging()
    logger.info("Performing S3 health check for %s", target)

    if boto3 is None:
        message = "S3 health check failed: boto3 is not installed"
        logger.error(message)
        return False, message

    try:
        client_kwargs = {
            "region_name": settings.s3_region_name,
            "aws_access_key_id": settings.s3_access_key_id,
            "aws_secret_access_key": settings.s3_secret_access_key,
        }
        if settings.s3_endpoint_url:
            client_kwargs["endpoint_url"] = settings.s3_endpoint_url

        client = boto3.client("s3", **client_kwargs)
        client.head_bucket(Bucket=settings.s3_bucket_name)
    except ClientError as exc:  # pragma: no cover - depends on environment
        logger.error("S3 health check failed while accessing %s: %s", target, exc, exc_info=True)
        return False, f"S3 bucket access failed for {target}: {exc}"
    except Exception as exc:  # pragma: no cover - depends on environment
        logger.error("S3 health check failed while accessing %s: %s", target, exc, exc_info=True)
        return False, f"S3 health check failed for {target}: {exc}"

    logger.info("S3 health check succeeded for %s", target)
    return True, f"S3 bucket accessible for {target}"


async def run_startup_health_checks() -> None:
    db_ok, db_message = await check_database_connection()
    s3_ok, s3_message = await check_s3_connection()

    if not db_ok or not s3_ok:
        details = []
        if not db_ok:
            details.append(db_message)
        if not s3_ok:
            details.append(s3_message)
        message = "Startup health checks failed: " + " | ".join(details)
        logger.critical(message)
        raise RuntimeError(message)

    logger.info("Startup health checks succeeded for database and S3")
