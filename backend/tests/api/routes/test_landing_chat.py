"""Tests for landing chat recommendation endpoint."""

from unittest.mock import patch

from fastapi.testclient import TestClient

from app.core.config import settings


def test_landing_chat_requires_auth(client: TestClient) -> None:
    """Test that anonymous users cannot access chat recommendations."""
    response = client.post(
        f"{settings.API_V1_STR}/landing/chat/recommendations",
        json={"message": "hello"},
    )
    assert response.status_code == 401


def test_landing_chat_auth_user(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test that authenticated users can access chat recommendations endpoint."""
    # This test may return 503 if chat is disabled, but should not return 401
    response = client.post(
        f"{settings.API_V1_STR}/landing/chat/recommendations",
        headers=normal_user_token_headers,
        json={"message": "find me tutorials"},
    )
    # Either 200 (chat enabled) or 503 (chat disabled), but not 401/403
    assert response.status_code in (200, 503)


def test_landing_chat_503_when_disabled(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test that 503 is returned when chat is disabled (no API key)."""
    # Patch chat_enabled to False
    with patch.object(settings, "chat_enabled", False):
        response = client.post(
            f"{settings.API_V1_STR}/landing/chat/recommendations",
            headers=normal_user_token_headers,
            json={"message": "find me tutorials"},
        )
        assert response.status_code == 503
        assert "unavailable" in response.json()["detail"].lower()


def test_landing_chat_requires_message(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test that request body must include message field."""
    response = client.post(
        f"{settings.API_V1_STR}/landing/chat/recommendations",
        headers=normal_user_token_headers,
        json={},  # Missing message
    )
    assert response.status_code == 422
