from __future__ import annotations

import logging
from fastapi import FastAPI
from sqlalchemy import text

from app.core.config import settings
from app.db.session import engine
from app.models.file import File
from app.routers import users
from app.routers import auth
from app.routers import jobs
from app.routers import skill
from app.routers import campaign
from app.routers import applicant_detail
from app.routers import applicant
from app.routers import public
from app.services.healthcheck import check_database_connection, check_s3_connection, run_startup_health_checks

from fastapi.middleware.cors import CORSMiddleware

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logging.getLogger("app").setLevel(logging.INFO)
logging.basicConfig(level=logging.INFO, format="%(levelname)s:%(name)s:%(message)s")
app = FastAPI(title=settings.app_name, debug=settings.debug)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Migrations are managed by Alembic; no implicit table creation on startup.


@app.on_event("startup")
async def startup_event() -> None:
    logger.info("Running startup health checks for database and S3")
    try:
        await run_startup_health_checks()
    except Exception as exc:
        logger.critical("Application startup aborted: %s", exc)
        raise


@app.get("/")
async def root():
    return {"app": settings.app_name, "status": "ok"}


@app.get("/healthz")
async def healthz():
    db_ok, db_message = await check_database_connection()
    s3_ok, s3_message = await check_s3_connection()
    return {
        "ok": db_ok and s3_ok,
        "database": {"ok": db_ok, "detail": db_message},
        "s3": {"ok": s3_ok, "detail": s3_message},
    }


@app.get("/db-check")
async def db_check():
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        return {"database": "ok"}
    except Exception as e:  # pragma: no cover - connectivity varies
        return {"database": "error", "detail": str(e)}


app.include_router(users.router)
app.include_router(auth.router)
app.include_router(jobs.router)
app.include_router(skill.router)
app.include_router(campaign.router)
app.include_router(applicant_detail.router)
app.include_router(applicant.router)
app.include_router(public.router)
