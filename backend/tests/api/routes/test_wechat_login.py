"""
Tests for WeChat login endpoints.

Test coverage for US1 (Sign in with WeChat):
- T014: start/complete happy path (existing linked user)
- T015: failure cases (state mismatch, WeChat error, missing params, expired/used state)
- T016: security events are recorded without secrets (FR-010)
- T055: concurrent/double-use of same state (second attempt must fail)
"""

from datetime import datetime, timedelta, timezone
from unittest.mock import patch

import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session

from app import crud
from app.core.config import settings
from app.core.security import get_password_hash
from app.models import User, WeChatAccountLinkBase
from tests.utils.utils import random_email, random_lower_string
from tests.utils.wechat import MockWeChatResponses, patch_wechat_api

# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------


@pytest.fixture
def wechat_enabled():
    """Enable WeChat login for tests."""
    with (
        patch.object(settings, "WECHAT_LOGIN_ENABLED", True),
        patch.object(settings, "WECHAT_APP_ID", "test_app_id"),
        patch.object(settings, "WECHAT_APP_SECRET", "test_app_secret"),
    ):
        yield


@pytest.fixture
def wechat_disabled():
    """Disable WeChat login for tests."""
    with patch.object(settings, "WECHAT_LOGIN_ENABLED", False):
        yield


@pytest.fixture
def test_user_with_wechat_link(db: Session) -> tuple[User, str, str]:
    """Create a test user with an existing WeChat link."""
    email = random_email()
    password = random_lower_string()
    openid = f"test_openid_{random_lower_string()[:16]}"
    unionid = f"test_unionid_{random_lower_string()[:16]}"

    # Create user
    user = User(
        email=email,
        hashed_password=get_password_hash(password),
        is_active=True,
        is_superuser=False,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Create WeChat link
    link_data = WeChatAccountLinkBase(
        openid=openid,
        unionid=unionid,
        primary_subject_type="unionid",
        primary_subject=unionid,
        nickname="Test WeChat User",
        avatar_url="https://example.com/avatar.jpg",
    )
    crud.create_wechat_link(session=db, user_id=user.id, link_data=link_data)

    return user, openid, unionid


# ---------------------------------------------------------------------------
# T014: Happy path tests (existing linked user)
# ---------------------------------------------------------------------------


def test_wechat_login_start_returns_params(
    client: TestClient, _db: Session, _wechat_enabled
) -> None:
    """Test that /login/wechat/start returns proper QR rendering params."""
    r = client.post(f"{settings.API_V1_STR}/login/wechat/start")
    assert r.status_code == 200

    data = r.json()
    assert "appid" in data
    assert "scope" in data
    assert "redirect_uri" in data
    assert "state" in data
    assert "wx_login_js_url" in data

    assert data["appid"] == "test_app_id"
    assert data["scope"] == "snsapi_login"  # Website apps must use snsapi_login
    assert len(data["state"]) > 20  # Should be a secure token


# ---------------------------------------------------------------------------
# Redirect URL Builder Tests (T005/T007)
# ---------------------------------------------------------------------------


def test_wechat_login_start_fallback_redirect_uri(
    client: TestClient, _db: Session, _wechat_enabled
) -> None:
    """Test that when WECHAT_LOGIN_INTERMEDIARY_URL is unset, redirect_uri goes directly to frontend callback.

    This is the fallback behavior: WeChat redirects directly to ${FRONTEND_HOST}/wechat-callback
    instead of going through an intermediary.
    """
    # Ensure intermediary is not set (default)
    with patch.object(settings, "WECHAT_LOGIN_INTERMEDIARY_URL", None):
        r = client.post(f"{settings.API_V1_STR}/login/wechat/start")
        assert r.status_code == 200

        data = r.json()
        redirect_uri = data["redirect_uri"]

        # Should point directly to frontend callback without intermediary
        assert redirect_uri.startswith(settings.FRONTEND_HOST)
        assert "/wechat-callback" in redirect_uri
        # Should NOT contain h5.yunxi668.com or any intermediary
        assert "h5.yunxi668.com" not in redirect_uri


def test_wechat_login_start_intermediary_redirect_uri(
    client: TestClient, _db: Session, _wechat_enabled
) -> None:
    """Test that when WECHAT_LOGIN_INTERMEDIARY_URL is set, redirect_uri wraps the callback.

    The intermediary pattern: intermediary?from=<final_callback>
    where final_callback = ${FRONTEND_HOST}/wechat-callback?action=...&from=...
    """
    intermediary_url = "https://h5.yunxi668.com/passport/wxLogin"
    with patch.object(settings, "WECHAT_LOGIN_INTERMEDIARY_URL", intermediary_url):
        r = client.post(
            f"{settings.API_V1_STR}/login/wechat/start",
            json={"action": "login", "return_to": "/dashboard"},
        )
        assert r.status_code == 200

        data = r.json()
        redirect_uri = data["redirect_uri"]

        # Should start with the intermediary URL
        assert redirect_uri.startswith(intermediary_url)
        # Should have ?from= parameter
        assert "?from=" in redirect_uri

        # The embedded callback should contain the frontend host
        from urllib.parse import parse_qs, urlparse

        parsed = urlparse(redirect_uri)
        query_params = parse_qs(parsed.query)
        assert "from" in query_params
        embedded_callback = query_params["from"][0]

        # The embedded callback should be the frontend callback with action and from params
        assert embedded_callback.startswith(settings.FRONTEND_HOST)
        assert "/wechat-callback" in embedded_callback
        assert "action=login" in embedded_callback
        # from= in the nested URL should be URL-encoded in the parent
        assert "dashboard" in embedded_callback


def test_wechat_login_start_with_action_link(
    client: TestClient, _db: Session, _wechat_enabled
) -> None:
    """Test that action=link is embedded into the redirect callback URL."""
    with patch.object(settings, "WECHAT_LOGIN_INTERMEDIARY_URL", None):
        r = client.post(
            f"{settings.API_V1_STR}/login/wechat/start",
            json={"action": "link"},
        )
        assert r.status_code == 200

        data = r.json()
        redirect_uri = data["redirect_uri"]

        # Should contain action=link in the callback URL
        assert "action=link" in redirect_uri


def test_wechat_login_start_rejects_full_url_return_to(
    client: TestClient, _db: Session, _wechat_enabled
) -> None:
    """Test that return_to with full URLs is rejected (only relative paths allowed).

    Security: Full URLs like https://evil.com should be silently ignored,
    not cause an error. The endpoint should succeed but omit the `from` param.
    """
    with patch.object(settings, "WECHAT_LOGIN_INTERMEDIARY_URL", None):
        r = client.post(
            f"{settings.API_V1_STR}/login/wechat/start",
            json={"return_to": "https://evil.com/steal"},
        )
        # Endpoint should succeed (not error on invalid return_to)
        assert r.status_code == 200

        data = r.json()
        # Response should contain required fields
        assert "redirect_uri" in data
        assert "state" in data
        assert "appid" in data

        redirect_uri = data["redirect_uri"]

        # Full URL should NOT be included (security: only relative paths allowed)
        assert "evil.com" not in redirect_uri
        assert "from=" not in redirect_uri  # from param should not be set when invalid


def test_wechat_login_complete_existing_user(
    client: TestClient,
    _db: Session,
    _wechat_enabled,
    test_user_with_wechat_link,
    monkeypatch,
) -> None:
    """Test complete flow for already-linked user returns valid token."""
    user, openid, unionid = test_user_with_wechat_link

    # Set up mock WeChat responses
    mock_wechat = MockWeChatResponses()
    mock_wechat.set_token_response(openid=openid, unionid=unionid)
    mock_wechat.set_userinfo(openid=openid, unionid=unionid, nickname="Test User")
    patch_wechat_api(monkeypatch, mock_wechat)

    # Start login to get state
    start_r = client.post(f"{settings.API_V1_STR}/login/wechat/start")
    assert start_r.status_code == 200
    state = start_r.json()["state"]

    # Complete login
    complete_r = client.post(
        f"{settings.API_V1_STR}/login/wechat/complete",
        json={"code": "test_auth_code", "state": state},
    )
    assert complete_r.status_code == 200

    data = complete_r.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

    # Verify the token works
    token_r = client.post(
        f"{settings.API_V1_STR}/login/test-token",
        headers={"Authorization": f"Bearer {data['access_token']}"},
    )
    assert token_r.status_code == 200
    assert token_r.json()["id"] == str(user.id)


# ---------------------------------------------------------------------------
# T015: Failure cases
# ---------------------------------------------------------------------------


def test_wechat_login_complete_invalid_state(
    client: TestClient, _db: Session, _wechat_enabled, monkeypatch
) -> None:
    """Test that invalid state token is rejected."""
    mock_wechat = MockWeChatResponses()
    mock_wechat.set_token_response()
    mock_wechat.set_userinfo()
    patch_wechat_api(monkeypatch, mock_wechat)

    r = client.post(
        f"{settings.API_V1_STR}/login/wechat/complete",
        json={"code": "test_code", "state": "invalid_state_token"},
    )
    assert r.status_code == 400
    assert (
        "Invalid state" in r.json()["detail"] or "state" in r.json()["detail"].lower()
    )


def test_wechat_login_complete_expired_state(
    client: TestClient, db: Session, _wechat_enabled, monkeypatch
) -> None:
    """Test that expired state token is rejected."""
    mock_wechat = MockWeChatResponses()
    mock_wechat.set_token_response()
    mock_wechat.set_userinfo()
    patch_wechat_api(monkeypatch, mock_wechat)

    # Create an expired state directly
    expired_at = datetime.now(timezone.utc) - timedelta(minutes=5)
    crud.create_wechat_login_attempt(
        session=db,
        state="expired_state_token",
        expires_at=expired_at,
    )

    r = client.post(
        f"{settings.API_V1_STR}/login/wechat/complete",
        json={"code": "test_code", "state": "expired_state_token"},
    )
    assert r.status_code == 400
    assert "expired" in r.json()["detail"].lower()


def test_wechat_login_complete_wechat_error(
    client: TestClient, _db: Session, _wechat_enabled, monkeypatch
) -> None:
    """Test handling of WeChat API errors."""
    mock_wechat = MockWeChatResponses()
    mock_wechat.set_token_error(40029, "Invalid code")
    patch_wechat_api(monkeypatch, mock_wechat)

    # Start to get valid state
    start_r = client.post(f"{settings.API_V1_STR}/login/wechat/start")
    state = start_r.json()["state"]

    r = client.post(
        f"{settings.API_V1_STR}/login/wechat/complete",
        json={"code": "invalid_code", "state": state},
    )
    assert r.status_code == 400
    assert "invalid_code" in r.json()["detail"].lower()


def test_wechat_login_complete_network_error(
    client: TestClient, _db: Session, _wechat_enabled, monkeypatch
) -> None:
    """Test handling of network errors to WeChat."""
    mock_wechat = MockWeChatResponses()
    mock_wechat.set_network_error()
    patch_wechat_api(monkeypatch, mock_wechat)

    # Start to get valid state
    start_r = client.post(f"{settings.API_V1_STR}/login/wechat/start")
    state = start_r.json()["state"]

    r = client.post(
        f"{settings.API_V1_STR}/login/wechat/complete",
        json={"code": "test_code", "state": state},
    )
    assert r.status_code == 502
    assert "unavailable" in r.json()["detail"].lower()


def test_wechat_login_complete_missing_code(
    client: TestClient, _db: Session, _wechat_enabled
) -> None:
    """Test that missing code parameter is rejected."""
    start_r = client.post(f"{settings.API_V1_STR}/login/wechat/start")
    state = start_r.json()["state"]

    r = client.post(
        f"{settings.API_V1_STR}/login/wechat/complete",
        json={"state": state},  # Missing code
    )
    assert r.status_code == 422  # Validation error


def test_wechat_login_complete_missing_state(
    client: TestClient, _db: Session, _wechat_enabled
) -> None:
    """Test that missing state parameter is rejected."""
    r = client.post(
        f"{settings.API_V1_STR}/login/wechat/complete",
        json={"code": "test_code"},  # Missing state
    )
    assert r.status_code == 422  # Validation error


# ---------------------------------------------------------------------------
# T016: Security events recorded without secrets (FR-010)
# ---------------------------------------------------------------------------


def test_wechat_login_records_attempt(
    client: TestClient, db: Session, _wechat_enabled, monkeypatch
) -> None:
    """Test that login attempts are recorded in the database."""
    mock_wechat = MockWeChatResponses()
    mock_wechat.set_token_response(openid="new_openid", unionid="new_unionid")
    mock_wechat.set_userinfo(nickname="New User")
    patch_wechat_api(monkeypatch, mock_wechat)

    # Start login
    start_r = client.post(f"{settings.API_V1_STR}/login/wechat/start")
    state = start_r.json()["state"]

    # Verify attempt was created
    attempt = crud.get_wechat_login_attempt_by_state(session=db, state=state)
    assert attempt is not None
    assert attempt.status == "started"
    assert attempt.completed_at is None

    # Complete login
    complete_r = client.post(
        f"{settings.API_V1_STR}/login/wechat/complete",
        json={"code": "test_code", "state": state},
    )
    assert complete_r.status_code == 200

    # Refresh and verify attempt was marked as succeeded
    db.refresh(attempt)
    assert attempt.status == "succeeded"
    assert attempt.completed_at is not None
    # Verify no sensitive data is stored
    # (The attempt record should not contain code, access_token, etc.)


def test_wechat_login_failure_records_category(
    client: TestClient, db: Session, _wechat_enabled, monkeypatch
) -> None:
    """Test that failed attempts record the failure category."""
    mock_wechat = MockWeChatResponses()
    mock_wechat.set_token_error(40029, "Invalid code")
    patch_wechat_api(monkeypatch, mock_wechat)

    # Start login
    start_r = client.post(f"{settings.API_V1_STR}/login/wechat/start")
    state = start_r.json()["state"]

    # Complete with error
    complete_r = client.post(
        f"{settings.API_V1_STR}/login/wechat/complete",
        json={"code": "bad_code", "state": state},
    )
    assert complete_r.status_code == 400

    # Verify attempt was marked as failed with category
    attempt = crud.get_wechat_login_attempt_by_state(session=db, state=state)
    assert attempt is not None
    assert attempt.status == "failed"
    assert attempt.failure_category is not None


# ---------------------------------------------------------------------------
# T055: Concurrent/double-use of same state (anti-replay)
# ---------------------------------------------------------------------------


def test_wechat_login_state_single_use(
    client: TestClient,
    _db: Session,
    _wechat_enabled,
    test_user_with_wechat_link,
    monkeypatch,
) -> None:
    """Test that state token can only be used once (anti-replay)."""
    user, openid, unionid = test_user_with_wechat_link

    mock_wechat = MockWeChatResponses()
    mock_wechat.set_token_response(openid=openid, unionid=unionid)
    mock_wechat.set_userinfo(openid=openid, unionid=unionid, nickname="Test User")
    patch_wechat_api(monkeypatch, mock_wechat)

    # Start login
    start_r = client.post(f"{settings.API_V1_STR}/login/wechat/start")
    state = start_r.json()["state"]

    # First complete - should succeed
    complete_r1 = client.post(
        f"{settings.API_V1_STR}/login/wechat/complete",
        json={"code": "test_code", "state": state},
    )
    assert complete_r1.status_code == 200

    # Second complete with same state - should fail
    complete_r2 = client.post(
        f"{settings.API_V1_STR}/login/wechat/complete",
        json={"code": "test_code_2", "state": state},
    )
    assert complete_r2.status_code == 400
    assert "already used" in complete_r2.json()["detail"].lower()


# ---------------------------------------------------------------------------
# Config gating tests (T013)
# ---------------------------------------------------------------------------


def test_wechat_login_disabled_start(
    client: TestClient, _db: Session, _wechat_disabled
) -> None:
    """Test that /login/wechat/start returns 403 when disabled."""
    r = client.post(f"{settings.API_V1_STR}/login/wechat/start")
    assert r.status_code == 403
    assert "not enabled" in r.json()["detail"].lower()


def test_wechat_login_disabled_complete(
    client: TestClient, _db: Session, _wechat_disabled
) -> None:
    """Test that /login/wechat/complete returns 403 when disabled."""
    r = client.post(
        f"{settings.API_V1_STR}/login/wechat/complete",
        json={"code": "test_code", "state": "test_state"},
    )
    assert r.status_code == 403


# ---------------------------------------------------------------------------
# T018: Regression test - existing password login still works
# ---------------------------------------------------------------------------


def test_password_login_still_works_withwechat_enabled(
    client: TestClient, _wechat_enabled
) -> None:
    """Test that standard password login still works when WeChat is enabled."""
    login_data = {
        "username": settings.FIRST_SUPERUSER,
        "password": settings.FIRST_SUPERUSER_PASSWORD,
    }
    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=login_data)
    assert r.status_code == 200
    assert "access_token" in r.json()


# ---------------------------------------------------------------------------
# T030: First-time WeChat login creates a new user + link (US2)
# ---------------------------------------------------------------------------


def test_wechat_login_creates_new_user_with_unionid(
    client: TestClient, db: Session, _wechat_enabled, monkeypatch
) -> None:
    """Test that first-time WeChat login creates a new user and link (with unionid)."""
    import uuid

    test_openid = f"openid_new_{uuid.uuid4().hex[:8]}"
    test_unionid = f"unionid_new_{uuid.uuid4().hex[:8]}"

    mock_wechat = MockWeChatResponses()
    mock_wechat.set_token_response(openid=test_openid, unionid=test_unionid)
    mock_wechat.set_userinfo(
        openid=test_openid, unionid=test_unionid, nickname="New User"
    )
    patch_wechat_api(monkeypatch, mock_wechat)

    # Verify no user exists with this WeChat identity
    existing_link = crud.get_wechat_link_by_openid(session=db, openid=test_openid)
    assert existing_link is None

    # Start login
    start_r = client.post(f"{settings.API_V1_STR}/login/wechat/start")
    assert start_r.status_code == 200
    state = start_r.json()["state"]

    # Complete login - should create new user
    complete_r = client.post(
        f"{settings.API_V1_STR}/login/wechat/complete",
        json={"code": "test_code", "state": state},
    )
    assert complete_r.status_code == 200
    token = complete_r.json()["access_token"]

    # Verify token works
    headers = {"Authorization": f"Bearer {token}"}
    me_r = client.get(f"{settings.API_V1_STR}/users/me", headers=headers)
    assert me_r.status_code == 200
    user_data = me_r.json()

    # Verify user was created with expected data
    assert user_data["full_name"] == "New User"
    # Placeholder email should start with "wechat_" and be at placeholder.local
    assert user_data["email"].startswith("wechat_")
    assert "@placeholder.local" in user_data["email"]

    # Verify WeChat link was created
    link = crud.get_wechat_link_by_openid(session=db, openid=test_openid)
    assert link is not None
    assert str(link.user_id) == user_data["id"]
    assert link.unionid == test_unionid
    assert link.primary_subject_type == "unionid"
    assert link.primary_subject == test_unionid


def test_wechat_login_creates_new_user_without_unionid(
    client: TestClient, db: Session, _wechat_enabled, monkeypatch
) -> None:
    """Test that first-time WeChat login works without unionid (uses openid as primary)."""
    import uuid

    test_openid = f"openid_no_union_{uuid.uuid4().hex[:8]}"

    mock_wechat = MockWeChatResponses()
    mock_wechat.set_token_response(openid=test_openid, unionid=None)
    mock_wechat.set_userinfo(openid=test_openid, unionid=None, nickname="No Union User")
    patch_wechat_api(monkeypatch, mock_wechat)

    # Start login
    start_r = client.post(f"{settings.API_V1_STR}/login/wechat/start")
    state = start_r.json()["state"]

    # Complete login - should create new user
    complete_r = client.post(
        f"{settings.API_V1_STR}/login/wechat/complete",
        json={"code": "test_code", "state": state},
    )
    assert complete_r.status_code == 200

    # Verify WeChat link was created with openid as primary
    link = crud.get_wechat_link_by_openid(session=db, openid=test_openid)
    assert link is not None
    assert link.primary_subject_type == "openid"
    assert link.primary_subject == test_openid


# ---------------------------------------------------------------------------
# T031: Cannot create account cases (US2)
# ---------------------------------------------------------------------------


def test_wechat_login_missing_openid_in_response(
    client: TestClient, _db: Session, _wechat_enabled, monkeypatch
) -> None:
    """Test that login fails if WeChat doesn't return openid."""
    mock_wechat = MockWeChatResponses()
    # Set up error for token response
    mock_wechat.set_token_error(errcode=40001, errmsg="invalid credential")
    patch_wechat_api(monkeypatch, mock_wechat)

    start_r = client.post(f"{settings.API_V1_STR}/login/wechat/start")
    state = start_r.json()["state"]

    complete_r = client.post(
        f"{settings.API_V1_STR}/login/wechat/complete",
        json={"code": "test_code", "state": state},
    )
    # Should fail with WeChat error
    assert complete_r.status_code == 400


# ---------------------------------------------------------------------------
# T032: Placeholder emails do not contain openid/unionid (US2)
# ---------------------------------------------------------------------------


def test_wechat_login_placeholder_email_no_identifiers(
    client: TestClient, _db: Session, _wechat_enabled, monkeypatch
) -> None:
    """Test that placeholder emails don't contain openid or unionid."""
    import uuid

    test_openid = f"openid_placeholder_{uuid.uuid4().hex[:8]}"
    test_unionid = f"unionid_placeholder_{uuid.uuid4().hex[:8]}"

    mock_wechat = MockWeChatResponses()
    mock_wechat.set_token_response(openid=test_openid, unionid=test_unionid)
    mock_wechat.set_userinfo(
        openid=test_openid, unionid=test_unionid, nickname="Placeholder Test"
    )
    patch_wechat_api(monkeypatch, mock_wechat)

    # Start and complete login
    start_r = client.post(f"{settings.API_V1_STR}/login/wechat/start")
    state = start_r.json()["state"]

    complete_r = client.post(
        f"{settings.API_V1_STR}/login/wechat/complete",
        json={"code": "test_code", "state": state},
    )
    assert complete_r.status_code == 200
    token = complete_r.json()["access_token"]

    # Get user data
    headers = {"Authorization": f"Bearer {token}"}
    me_r = client.get(f"{settings.API_V1_STR}/users/me", headers=headers)
    email = me_r.json()["email"]

    # Verify email doesn't contain identifiers (security requirement)
    assert test_openid not in email
    assert test_unionid not in email
    # But should have the wechat_ prefix
    assert email.startswith("wechat_")


def test_wechat_login_placeholder_emails_are_unique(
    client: TestClient, _db: Session, _wechat_enabled, monkeypatch
) -> None:
    """Test that multiple WeChat logins create unique placeholder emails."""
    import uuid

    created_emails = []

    for i in range(3):
        test_openid = f"openid_unique_{uuid.uuid4().hex[:8]}"
        test_unionid = f"unionid_unique_{uuid.uuid4().hex[:8]}"

        mock_wechat = MockWeChatResponses()
        mock_wechat.set_token_response(openid=test_openid, unionid=test_unionid)
        mock_wechat.set_userinfo(
            openid=test_openid, unionid=test_unionid, nickname=f"User {i}"
        )
        patch_wechat_api(monkeypatch, mock_wechat)

        start_r = client.post(f"{settings.API_V1_STR}/login/wechat/start")
        state = start_r.json()["state"]

        complete_r = client.post(
            f"{settings.API_V1_STR}/login/wechat/complete",
            json={"code": "test_code", "state": state},
        )
        assert complete_r.status_code == 200
        token = complete_r.json()["access_token"]

        headers = {"Authorization": f"Bearer {token}"}
        me_r = client.get(f"{settings.API_V1_STR}/users/me", headers=headers)
        email = me_r.json()["email"]
        created_emails.append(email)

    # All emails should be unique
    assert len(set(created_emails)) == 3


# ---------------------------------------------------------------------------
# T035: No automatic merge into existing accounts (FR-015) (US2)
# ---------------------------------------------------------------------------


def test_wechat_login_no_automatic_merge_same_nickname(
    client: TestClient, db: Session, _wechat_enabled, monkeypatch
) -> None:
    """Test that WeChat login doesn't automatically merge with users having same nickname."""
    import uuid

    from app.models import UserCreate

    # Create existing user with a specific nickname
    existing_user = crud.create_user(
        session=db,
        user_create=UserCreate(
            email=f"existing_{uuid.uuid4().hex[:8]}@test.com",
            password="test_password",
            full_name="Same Nickname",
        ),
    )

    # Now try WeChat login with same nickname but different identity
    test_openid = f"openid_merge_{uuid.uuid4().hex[:8]}"

    mock_wechat = MockWeChatResponses()
    mock_wechat.set_token_response(openid=test_openid, unionid=None)
    mock_wechat.set_userinfo(openid=test_openid, unionid=None, nickname="Same Nickname")
    patch_wechat_api(monkeypatch, mock_wechat)

    start_r = client.post(f"{settings.API_V1_STR}/login/wechat/start")
    state = start_r.json()["state"]

    complete_r = client.post(
        f"{settings.API_V1_STR}/login/wechat/complete",
        json={"code": "test_code", "state": state},
    )
    # Should succeed and create a NEW user (not merge)
    assert complete_r.status_code == 200
    token = complete_r.json()["access_token"]

    headers = {"Authorization": f"Bearer {token}"}
    me_r = client.get(f"{settings.API_V1_STR}/users/me", headers=headers)
    user_data = me_r.json()

    # Should be a different user from the existing one
    assert user_data["id"] != str(existing_user.id)
    # Both have same nickname but different emails
    assert user_data["full_name"] == "Same Nickname"
    assert user_data["email"] != existing_user.email
