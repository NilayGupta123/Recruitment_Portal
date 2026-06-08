from __future__ import annotations

import logging
from fastapi import FastAPI
from sqlalchemy import text

from app.core.config import settings
from app.db.session import engine   
from app.routers import users

app = FastAPI(title=settings.app_name, debug=settings.debug)


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
