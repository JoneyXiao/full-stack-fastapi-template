import logging
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

import emails  # type: ignore
import httpx
import jwt
from jinja2 import Template
from jwt.exceptions import InvalidTokenError
from sqlmodel import Session, col, or_, select

from app.core import security
from app.core.config import settings
from app.models import LandingChatResponse, Resource, ResourcePreview

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@dataclass
class EmailData:
    html_content: str
    subject: str


def render_email_template(*, template_name: str, context: dict[str, Any]) -> str:
    template_str = (
        Path(__file__).parent / "email-templates" / "build" / template_name
    ).read_text()
    html_content = Template(template_str).render(context)
    return html_content


def send_email(
    *,
    email_to: str,
    subject: str = "",
    html_content: str = "",
) -> None:
    assert settings.emails_enabled, "no provided configuration for email variables"
    message = emails.Message(
        subject=subject,
        html=html_content,
        mail_from=(settings.EMAILS_FROM_NAME, settings.EMAILS_FROM_EMAIL),
    )
    smtp_options = {"host": settings.SMTP_HOST, "port": settings.SMTP_PORT}
    if settings.SMTP_TLS:
        smtp_options["tls"] = True
    elif settings.SMTP_SSL:
        smtp_options["ssl"] = True
    if settings.SMTP_USER:
        smtp_options["user"] = settings.SMTP_USER
    if settings.SMTP_PASSWORD:
        smtp_options["password"] = settings.SMTP_PASSWORD
    response = message.send(to=email_to, smtp=smtp_options)
    logger.info(f"send email result: {response}")


def generate_test_email(email_to: str) -> EmailData:
    project_name = settings.PROJECT_NAME
    subject = f"{project_name} - Test email"
    html_content = render_email_template(
        template_name="test_email.html",
        context={"project_name": settings.PROJECT_NAME, "email": email_to},
    )
    return EmailData(html_content=html_content, subject=subject)


def generate_reset_password_email(email_to: str, email: str, token: str) -> EmailData:
    project_name = settings.PROJECT_NAME
    subject = f"{project_name} - Password recovery for user {email}"
    link = f"{settings.FRONTEND_HOST}/reset-password?token={token}"
    html_content = render_email_template(
        template_name="reset_password.html",
        context={
            "project_name": settings.PROJECT_NAME,
            "username": email,
            "email": email_to,
            "valid_hours": settings.EMAIL_RESET_TOKEN_EXPIRE_HOURS,
            "link": link,
        },
    )
    return EmailData(html_content=html_content, subject=subject)


def generate_new_account_email(
    email_to: str, username: str, password: str
) -> EmailData:
    project_name = settings.PROJECT_NAME
    subject = f"{project_name} - New account for user {username}"
    html_content = render_email_template(
        template_name="new_account.html",
        context={
            "project_name": settings.PROJECT_NAME,
            "username": username,
            "password": password,
            "email": email_to,
            "link": settings.FRONTEND_HOST,
        },
    )
    return EmailData(html_content=html_content, subject=subject)


def generate_password_reset_token(email: str) -> str:
    delta = timedelta(hours=settings.EMAIL_RESET_TOKEN_EXPIRE_HOURS)
    now = datetime.now(timezone.utc)
    expires = now + delta
    exp = expires.timestamp()
    encoded_jwt = jwt.encode(
        {"exp": exp, "nbf": now, "sub": email},
        settings.SECRET_KEY,
        algorithm=security.ALGORITHM,
    )
    return encoded_jwt


def verify_password_reset_token(token: str) -> str | None:
    try:
        decoded_token = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        return str(decoded_token["sub"])
    except InvalidTokenError:
        return None


# ---------------------------------------------------------------------------
# Landing Chat Recommendation Utilities
# ---------------------------------------------------------------------------


def _search_resources(session: Session, query: str, limit: int = 5) -> list[Resource]:
    """Search resources by partial match on title and description."""
    pattern = f"%{query}%"
    statement = (
        select(Resource)
        .where(
            Resource.is_published == True,  # noqa: E712
            or_(
                col(Resource.title).ilike(pattern),
                col(Resource.description).ilike(pattern),
            ),
        )
        .limit(limit)
    )
    return list(session.exec(statement).all())


def _call_llm(user_message: str, resources: list[Resource]) -> str:
    """
    Call the OpenAI-compatible LLM API to generate a recommendation message.
    Returns a friendly assistant message grounded in the provided resources.
    """
    # Build a grounding context with real resource titles
    if resources:
        resource_list = "\n".join(
            f"- {r.title}: {r.description or 'No description'}" for r in resources
        )
        system_prompt = (
            "You are a helpful assistant for an AI resource hub. "
            "Recommend resources from the following catalog only. "
            "If nothing matches, suggest the user try a different search. "
            "Be friendly and concise.\n\n"
            f"Available resources:\n{resource_list}"
        )
    else:
        system_prompt = (
            "You are a helpful assistant for an AI resource hub. "
            "No resources match the user's request. "
            "Politely suggest they try different keywords or browse categories. "
            "Be friendly and concise."
        )

    payload = {
        "model": settings.OPENAI_MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message},
        ],
        "max_tokens": 300,
        "temperature": 0.7,
    }

    headers = {
        "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
        "Content-Type": "application/json",
    }

    with httpx.Client(timeout=30.0) as client:
        response = client.post(
            f"{settings.OPENAI_BASE_URL}/chat/completions",
            json=payload,
            headers=headers,
        )
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"]


def get_chat_recommendations(
    *, session: Session, user_message: str
) -> LandingChatResponse:
    """
    Generate AI-powered resource recommendations based on user message.
    Grounds recommendations in actual catalog resources.
    """
    # Extract keywords from user message (simple: use first few significant words)
    # For MVP, use the whole message as the search query
    query = user_message.strip()[:100]
    resources = _search_resources(session, query, limit=5)

    # Generate assistant message via LLM
    assistant_message = _call_llm(user_message, resources)

    # Build response with resource previews
    recommendations = [
        ResourcePreview(
            id=r.id,
            title=r.title,
            description=r.description,
            type=r.type,
        )
        for r in resources
    ]

    return LandingChatResponse(
        assistant_message=assistant_message,
        recommendations=recommendations,
    )
