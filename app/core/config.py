from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "Recruitment Portal API"
    debug: bool = True

    # Use async driver in URLs (postgresql+asyncpg://)
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/postgres"
    # JWT settings
    # Override this via environment variable `JWT_SECRET_KEY` in production.
    jwt_secret_key: str = "4f2b9e8c7d6a5b3c2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60


settings = Settings()  # type: ignore[misc]
