import secrets
import warnings
from typing import Annotated, Any, Literal

from pydantic import (
    AnyUrl,
    BeforeValidator,
    EmailStr,
    HttpUrl,
    PostgresDsn,
    computed_field,
    model_validator,
)
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing_extensions import Self


def parse_cors(v: Any) -> list[str] | str:
    if isinstance(v, str) and not v.startswith("["):
        return [i.strip() for i in v.split(",") if i.strip()]
    elif isinstance(v, list | str):
        return v
    raise ValueError(v)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        # Use top level .env file (one level above ./backend/)
        env_file="../.env",
        env_ignore_empty=True,
        extra="ignore",
    )
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    FRONTEND_HOST: str = "http://localhost:5173"
    ENVIRONMENT: Literal["local", "staging", "production"] = "local"

    BACKEND_CORS_ORIGINS: Annotated[
        list[AnyUrl] | str, BeforeValidator(parse_cors)
    ] = []

    @computed_field  # type: ignore[prop-decorator]
    @property
    def all_cors_origins(self) -> list[str]:
        return [str(origin).rstrip("/") for origin in self.BACKEND_CORS_ORIGINS] + [
            self.FRONTEND_HOST
        ]

    PROJECT_NAME: str
    SENTRY_DSN: HttpUrl | None = None
    POSTGRES_SERVER: str
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str = ""
    POSTGRES_DB: str = ""

    @computed_field  # type: ignore[prop-decorator]
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> PostgresDsn:
        return PostgresDsn.build(
            scheme="postgresql+psycopg",
            username=self.POSTGRES_USER,
            password=self.POSTGRES_PASSWORD,
            host=self.POSTGRES_SERVER,
            port=self.POSTGRES_PORT,
            path=self.POSTGRES_DB,
        )

    SMTP_TLS: bool = True
    SMTP_SSL: bool = False
    SMTP_PORT: int = 587
    SMTP_HOST: str | None = None
    SMTP_USER: str | None = None
    SMTP_PASSWORD: str | None = None
    EMAILS_FROM_EMAIL: EmailStr | None = None
    EMAILS_FROM_NAME: str | None = None

    @model_validator(mode="after")
    def _set_default_emails_from(self) -> Self:
        if not self.EMAILS_FROM_NAME:
            self.EMAILS_FROM_NAME = self.PROJECT_NAME
        return self

    EMAIL_RESET_TOKEN_EXPIRE_HOURS: int = 48

    @computed_field  # type: ignore[prop-decorator]
    @property
    def emails_enabled(self) -> bool:
        return bool(self.SMTP_HOST and self.EMAILS_FROM_EMAIL)

    EMAIL_TEST_USER: EmailStr = "test@example.com"
    FIRST_SUPERUSER: EmailStr
    FIRST_SUPERUSER_PASSWORD: str

    # OpenAI-compatible chat provider settings (landing page AI chat)
    OPENAI_API_KEY: str | None = None
    OPENAI_BASE_URL: str | None = None
    OPENAI_MODEL: str | None = None

    @computed_field  # type: ignore[prop-decorator]
    @property
    def chat_enabled(self) -> bool:
        return bool(self.OPENAI_API_KEY)

    # Avatar storage settings
    AVATAR_STORAGE_PATH: str = "/app/data/uploads/avatars"
    AVATAR_MAX_SIZE_BYTES: int = 5 * 1024 * 1024  # 5MB
    AVATAR_MAX_DIMENSION: int = 4096  # max input dimension
    AVATAR_OUTPUT_SIZE: int = 512  # output dimension after processing
    AVATAR_SUPPORTED_CONTENT_TYPES: list[str] = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
    ]
    AVATAR_RATE_LIMIT_MAX_ATTEMPTS: int = 10
    AVATAR_RATE_LIMIT_WINDOW_HOURS: int = 1

    # Resource image storage settings (patterned after avatar settings)
    RESOURCE_IMAGE_STORAGE_PATH: str = "/app/data/uploads/resource-images"
    RESOURCE_IMAGE_MAX_SIZE_BYTES: int = 5 * 1024 * 1024  # 5MB
    RESOURCE_IMAGE_MAX_DIMENSION: int = 4096  # max input dimension
    RESOURCE_IMAGE_OUTPUT_SIZE: int = 800  # output dimension after processing
    RESOURCE_IMAGE_SUPPORTED_CONTENT_TYPES: list[str] = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
    ]

    # WeChat Login (Open Platform "Website Application")
    WECHAT_LOGIN_ENABLED: bool = False
    WECHAT_APP_ID: str | None = None
    WECHAT_APP_SECRET: str | None = None
    # State token TTL for anti-replay (minutes)
    WECHAT_STATE_TTL_MINUTES: int = 10

    @computed_field  # type: ignore[prop-decorator]
    @property
    def wechat_login_enabled(self) -> bool:
        """WeChat login requires both enabled flag and valid credentials."""
        return bool(
            self.WECHAT_LOGIN_ENABLED and self.WECHAT_APP_ID and self.WECHAT_APP_SECRET
        )

    def _check_default_secret(self, var_name: str, value: str | None) -> None:
        if value == "changethis":
            message = (
                f'The value of {var_name} is "changethis", '
                "for security, please change it, at least for deployments."
            )
            if self.ENVIRONMENT == "local":
                warnings.warn(message, stacklevel=1)
            else:
                raise ValueError(message)

    @model_validator(mode="after")
    def _enforce_non_default_secrets(self) -> Self:
        self._check_default_secret("SECRET_KEY", self.SECRET_KEY)
        self._check_default_secret("POSTGRES_PASSWORD", self.POSTGRES_PASSWORD)
        self._check_default_secret(
            "FIRST_SUPERUSER_PASSWORD", self.FIRST_SUPERUSER_PASSWORD
        )

        return self


settings = Settings()  # type: ignore
