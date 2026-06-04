# FastAPI + PostgreSQL (Supabase-ready) Starter

This is a minimal FastAPI starter wired for PostgreSQL using SQLAlchemy 2.x async engine (`asyncpg`). It treats Supabase purely as a hosted PostgreSQL database via a standard connection string — no Supabase SDK required.

## Quickstart

1. Create and activate a virtual environment (Windows PowerShell):

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -U pip
pip install -r requirements.txt
```

2. Configure environment variables:
- Copy `.env.example` to `.env` and edit as needed.
- Set `DATABASE_URL` to your Postgres connection string using `postgresql://` (the app auto-converts to `+asyncpg`).
  - Local: `postgresql://postgres:postgres@localhost:5432/postgres`
  - Supabase: `postgresql://postgres:[YOUR-PASSWORD]@db.ygxbylbrcgkganmntdze.supabase.co:5432/postgres`

3. Run the server:

```powershell
uvicorn app.main:app --reload
```

- API docs: http://127.0.0.1:8000/docs
- Health: GET `/healthz`
- DB check: GET `/db-check`
- Sample users: `POST /users` and `GET /users`

## Notes on Supabase
- Treat Supabase as a managed Postgres: use the Postgres connection string from the Supabase dashboard (with your DB password).
- No Supabase SDK is used here. If you later need Supabase Auth/Storage/RPC, add the SDK and wire it up separately.

## Migrations (Alembic)

This starter uses Alembic for schema changes.

Common workflow:

1) Create a revision from your models

```powershell
alembic revision --autogenerate -m "add users table"
```

2) Apply the migration

```powershell
alembic upgrade head
```

3) If you already created tables at runtime previously and want to start tracking with Alembic, create a baseline and stamp:

```powershell
alembic revision -m "baseline"
alembic stamp head
```

After that, modify SQLAlchemy models under `app/models/` and repeat steps (1) and (2).

Configuration details:
- Alembic uses the same `DATABASE_URL` as the app (see `alembic/env.py`).
- Async engine is used under the hood; offline migrations strip `+asyncpg` automatically.

## Project Layout

```
app/
  core/config.py         # Settings via pydantic-settings
  db/base.py             # SQLAlchemy Declarative Base
  db/session.py          # Async engine + session dependency
  models/user.py         # Sample model
  schemas/user.py        # Pydantic schemas
  routers/users.py       # Sample CRUD endpoints
  services/supabase.py   # Optional Supabase client helper
  main.py                # FastAPI app and routes
```

## Migrations
This starter creates tables automatically on startup for convenience. For production, add Alembic and manage migrations explicitly.
