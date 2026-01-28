"""
Tests for WeChat account linking and unlinking (US3).

T038: API tests for link/unlink endpoints (auth required; uniqueness conflicts; unlink safety)
"""

import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session

from app import crud
from app.core.config import settings
from app.models import UserCreate, WeChatAccountLinkBase
from tests.utils.wechat import MockWeChatResponses, patch_wechat_api

# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------


@pytest.fixture
def wechat_enabled(monkeypatch) -> None:
    """Enable WeChat login for testing."""
    monkeypatch.setattr(settings, "WECHAT_LOGIN_ENABLED", True)
    monkeypatch.setattr(settings, "WECHAT_APP_ID", "test_app_id")
    monkeypatch.setattr(settings, "WECHAT_APP_SECRET", "test_app_secret")


@pytest.fixture
def test_user_without_wechat(db: Session) -> tuple:
    """Create a test user without WeChat link."""
    import uuid

    email = f"test_no_wechat_{uuid.uuid4().hex[:8]}@test.com"
    user = crud.create_user(
        session=db,
        user_create=UserCreate(
            email=email,
            password="test_password",
            full_name="Test User Without WeChat",
        ),
    )
    return user, email, "test_password"


@pytest.fixture
def test_user_with_wechat_only(db: Session) -> tuple:
    """Create a test user with WeChat link but placeholder email (WeChat-only account)."""
    import uuid

    # Simulate WeChat-created user with placeholder email
    placeholder_email = f"wechat_{uuid.uuid4().hex}@placeholder.local"
    user = crud.create_user(
        session=db,
        user_create=UserCreate(
            email=placeholder_email,
            password="random_unusable_password_123456789",
            full_name="WeChat Only User",
        ),
    )

    openid = f"openid_wechat_only_{uuid.uuid4().hex[:8]}"
    unionid = f"unionid_wechat_only_{uuid.uuid4().hex[:8]}"

    link_data = WeChatAccountLinkBase(
        openid=openid,
        unionid=unionid,
        primary_subject_type="unionid",
        primary_subject=unionid,
        nickname="WeChat Only User",
    )
    crud.create_wechat_link(session=db, user_id=user.id, link_data=link_data)

    return user, openid, unionid


@pytest.fixture
def test_user_with_wechat_and_email(db: Session) -> tuple:
    """Create a test user with both real email and WeChat link."""
    import uuid

    email = f"test_with_wechat_{uuid.uuid4().hex[:8]}@test.com"
    user = crud.create_user(
        session=db,
        user_create=UserCreate(
            email=email,
            password="test_password",
            full_name="Test User With WeChat",
        ),
    )

    openid = f"openid_with_email_{uuid.uuid4().hex[:8]}"
    unionid = f"unionid_with_email_{uuid.uuid4().hex[:8]}"

    link_data = WeChatAccountLinkBase(
        openid=openid,
        unionid=unionid,
        primary_subject_type="unionid",
        primary_subject=unionid,
        nickname="Test User With WeChat",
    )
    crud.create_wechat_link(session=db, user_id=user.id, link_data=link_data)

    return user, openid, unionid, email, "test_password"


def get_auth_headers(client: TestClient, email: str, password: str) -> dict:
    """Get authorization headers by logging in with email/password."""
    login_data = {"username": email, "password": password}
    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=login_data)
    assert r.status_code == 200
    token = r.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


# ---------------------------------------------------------------------------
# T038: Link endpoint tests
# ---------------------------------------------------------------------------


def test_wechat_link_requires_auth(client: TestClient, _wechat_enabled) -> None:
    """Test that /users/me/wechat/link requires authentication."""
    r = client.post(
        f"{settings.API_V1_STR}/users/me/wechat/link",
        json={"code": "test_code", "state": "test_state"},
    )
    assert r.status_code == 401


def test_wechat_link_success(
    client: TestClient,
    db: Session,
    _wechat_enabled,
    test_user_without_wechat,
    monkeypatch,
) -> None:
    """Test successful WeChat linking for user without existing link."""
    import uuid

    user, email, password = test_user_without_wechat

    test_openid = f"openid_link_{uuid.uuid4().hex[:8]}"
    test_unionid = f"unionid_link_{uuid.uuid4().hex[:8]}"

    mock_wechat = MockWeChatResponses()
    mock_wechat.set_token_response(openid=test_openid, unionid=test_unionid)
    mock_wechat.set_userinfo(
        openid=test_openid, unionid=test_unionid, nickname="Linked User"
    )
    patch_wechat_api(monkeypatch, mock_wechat)

    headers = get_auth_headers(client, email, password)

    # Start WeChat flow to get state
    start_r = client.post(f"{settings.API_V1_STR}/login/wechat/start")
    state = start_r.json()["state"]

    # Link WeChat to account
    link_r = client.post(
        f"{settings.API_V1_STR}/users/me/wechat/link",
        json={"code": "test_code", "state": state},
        headers=headers,
    )
    assert link_r.status_code == 200

    # Verify link was created
    link = crud.get_wechat_link_by_user_id(session=db, user_id=user.id)
    assert link is not None
    assert link.openid == test_openid
    assert link.unionid == test_unionid


def test_wechat_link_already_linked_self(
    client: TestClient,
    _db: Session,
    _wechat_enabled,
    test_user_with_wechat_and_email,
    monkeypatch,
) -> None:
    """Test that user cannot link if already has a WeChat link."""
    user, openid, unionid, email, password = test_user_with_wechat_and_email

    mock_wechat = MockWeChatResponses()
    mock_wechat.set_token_response(openid="new_openid", unionid="new_unionid")
    mock_wechat.set_userinfo(
        openid="new_openid", unionid="new_unionid", nickname="New Link"
    )
    patch_wechat_api(monkeypatch, mock_wechat)

    headers = get_auth_headers(client, email, password)

    start_r = client.post(f"{settings.API_V1_STR}/login/wechat/start")
    state = start_r.json()["state"]

    link_r = client.post(
        f"{settings.API_V1_STR}/users/me/wechat/link",
        json={"code": "test_code", "state": state},
        headers=headers,
    )
    assert link_r.status_code == 400
    assert "already linked" in link_r.json()["detail"].lower()


def test_wechat_link_identity_linked_to_other_user(
    client: TestClient,
    _db: Session,
    _wechat_enabled,
    test_user_without_wechat,
    test_user_with_wechat_and_email,
    monkeypatch,
) -> None:
    """Test that linking fails if WeChat identity is already linked to another user (FR-007)."""
    user, email, password = test_user_without_wechat
    other_user, other_openid, other_unionid, _, _ = test_user_with_wechat_and_email

    # Try to link with the same WeChat identity that's linked to other_user
    mock_wechat = MockWeChatResponses()
    mock_wechat.set_token_response(openid=other_openid, unionid=other_unionid)
    mock_wechat.set_userinfo(
        openid=other_openid, unionid=other_unionid, nickname="Other User"
    )
    patch_wechat_api(monkeypatch, mock_wechat)

    headers = get_auth_headers(client, email, password)

    start_r = client.post(f"{settings.API_V1_STR}/login/wechat/start")
    state = start_r.json()["state"]

    link_r = client.post(
        f"{settings.API_V1_STR}/users/me/wechat/link",
        json={"code": "test_code", "state": state},
        headers=headers,
    )
    assert link_r.status_code == 409
    assert "already linked to another" in link_r.json()["detail"].lower()


def test_wechat_link_invalid_state(
    client: TestClient,
    _db: Session,
    _wechat_enabled,
    test_user_without_wechat,
    monkeypatch,
) -> None:
    """Test that link fails with invalid state token."""
    user, email, password = test_user_without_wechat

    mock_wechat = MockWeChatResponses()
    mock_wechat.set_token_response(openid="test_openid", unionid="test_unionid")
    patch_wechat_api(monkeypatch, mock_wechat)

    headers = get_auth_headers(client, email, password)

    link_r = client.post(
        f"{settings.API_V1_STR}/users/me/wechat/link",
        json={"code": "test_code", "state": "invalid_state"},
        headers=headers,
    )
    assert link_r.status_code == 400


# ---------------------------------------------------------------------------
# T038: Unlink endpoint tests
# ---------------------------------------------------------------------------


def test_wechat_unlink_requires_auth(client: TestClient, _wechat_enabled) -> None:
    """Test that /users/me/wechat/link DELETE requires authentication."""
    r = client.delete(f"{settings.API_V1_STR}/users/me/wechat/link")
    assert r.status_code == 401


def test_wechat_unlink_success_with_email(
    client: TestClient, db: Session, _wechat_enabled, test_user_with_wechat_and_email
) -> None:
    """Test successful unlink when user has real email (safe to unlink)."""
    user, openid, unionid, email, password = test_user_with_wechat_and_email

    headers = get_auth_headers(client, email, password)

    # Verify link exists before
    link_before = crud.get_wechat_link_by_user_id(session=db, user_id=user.id)
    assert link_before is not None

    # Unlink
    unlink_r = client.delete(
        f"{settings.API_V1_STR}/users/me/wechat/link",
        headers=headers,
    )
    assert unlink_r.status_code == 200

    # Verify link is gone
    link_after = crud.get_wechat_link_by_user_id(session=db, user_id=user.id)
    assert link_after is None


def test_wechat_unlink_blocked_for_wechat_only_user(
    client: TestClient,
    _db: Session,
    _wechat_enabled,
    test_user_with_wechat_only,
    monkeypatch,
) -> None:
    """Test that unlink is blocked for WeChat-only accounts (placeholder email)."""
    user, openid, unionid = test_user_with_wechat_only

    # Log in via WeChat to get token (simulate WeChat-only user)
    mock_wechat = MockWeChatResponses()
    mock_wechat.set_token_response(openid=openid, unionid=unionid)
    mock_wechat.set_userinfo(openid=openid, unionid=unionid, nickname="WeChat Only")
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

    # Try to unlink - should be blocked
    unlink_r = client.delete(
        f"{settings.API_V1_STR}/users/me/wechat/link",
        headers=headers,
    )
    assert unlink_r.status_code == 400
    assert (
        "cannot unlink" in unlink_r.json()["detail"].lower()
        or "no other" in unlink_r.json()["detail"].lower()
    )


def test_wechat_unlink_no_link_exists(
    client: TestClient, _db: Session, _wechat_enabled, test_user_without_wechat
) -> None:
    """Test that unlink returns appropriate error when no link exists."""
    user, email, password = test_user_without_wechat

    headers = get_auth_headers(client, email, password)

    unlink_r = client.delete(
        f"{settings.API_V1_STR}/users/me/wechat/link",
        headers=headers,
    )
    # Should return 404 or similar when no link to unlink
    assert unlink_r.status_code in [400, 404]
