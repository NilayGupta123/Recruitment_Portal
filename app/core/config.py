from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "Recruitment Portal API"
    debug: bool = True

    # Use async driver in URLs (postgresql+asyncpg://)
    database_url: str = "postgresql+asyncpg://user:password@host:5432/dbname"
    # JWT settings
    # Override this via environment variable `JWT_SECRET_KEY` in production.
    jwt_secret_key: str = "your-secret-key"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    s3_bucket_name: str = ""
    s3_region_name: str = "us-east-1"
    s3_access_key_id: str = ""
    s3_secret_access_key: str = ""
    s3_endpoint_url: str = ""
    upload_dir: str = "recruitment_portal"

    gemini_api_key: str = ""
    gemini_model: str = "gemini-flash-latest"

    # Celery / Redis
    celery_broker_url: str = "redis://localhost:6379/0"
    celery_result_backend: str = "redis://localhost:6379/1"


settings = Settings()  # type: ignore[misc]
