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

from fastapi.middleware.cors import CORSMiddleware
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


@app.get("/")
async def root():
    return {"app": settings.app_name, "status": "ok"}


@app.get("/healthz")
async def healthz():
    return {"ok": True}


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
