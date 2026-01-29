"""
WeChat Login API Routes.

Endpoints:
- POST /login/wechat/start: Start WeChat login (get state + params for QR)
- POST /login/wechat/complete: Complete WeChat login (exchange code, issue token)
- GET /users/me/wechat: Get current user's WeChat link status
- POST /users/me/wechat/link: Link WeChat to current user
- DELETE /users/me/wechat/link: Unlink WeChat from current user

SECURITY NOTES:
- State tokens have TTL=10 minutes and are one-time use (consumed on complete)
- Sensitive values (code, access_token, refresh_token) are never logged
- Config gating: all endpoints return 403 when WeChat login is disabled
"""

import logging
import secrets
from datetime import datetime, timedelta, timezone

import httpx
from fastapi import APIRouter, Depends, HTTPException, status

from app import crud
from app.api.deps import CurrentUser, SessionDep
from app.core import security
from app.core.config import settings
from app.integrations.wechat import WeChatError, get_wechat_user_profile
from app.models import (
    Message,
    Token,
    WeChatAccountLinkBase,
    WeChatAccountLinkPublic,
    WeChatLinkRequest,
    WeChatLoginCompleteRequest,
    WeChatLoginStartRequest,
    WeChatLoginStartResponse,
)

logger = logging.getLogger(__name__)

router = APIRouter(tags=["wechat-login"])


# ---------------------------------------------------------------------------
# Config Gating Dependency
# ---------------------------------------------------------------------------


def require_wechat_enabled() -> None:
    """
    Dependency that ensures WeChat login is enabled.
    Raises 403 if disabled.
    """
    if not settings.wechat_login_enabled:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="WeChat login is not enabled",
        )


WeChatEnabled = Depends(require_wechat_enabled)


# ---------------------------------------------------------------------------
# Helper Functions
# ---------------------------------------------------------------------------


def is_wechat_placeholder_email(email: str) -> bool:
    """
    Check if an email is a WeChat-created placeholder email.

    Uses strict matching to avoid false positives on legitimate emails.
    Placeholder emails follow the pattern: wechat_{uuid}@placeholder.local
    """
    return email.startswith("wechat_") and email.endswith("@placeholder.local")


def build_wechat_redirect_uri(
    action: str | None = None,
    return_to: str | None = None,
) -> str:
    """
    Build the redirect_uri for WeChat OAuth.

    If WECHAT_LOGIN_INTERMEDIARY_URL is configured, constructs a nested redirect:
      intermediary?from=<final_callback_with_params>

    If not configured, returns the direct callback URL:
      ${FRONTEND_HOST}/wechat-callback?action=...&from=...

    Args:
        action: The login action ("login" or "link"). Embedded in callback params.
        return_to: Optional relative path for post-callback redirect.
                   Must start with "/" for safety (full URLs rejected).

    Returns:
        The redirect_uri to pass to WeChat OAuth.
    """
    from urllib.parse import urlencode

    # Build the final callback URL with embedded params
    callback_base = f"{settings.FRONTEND_HOST}/wechat-callback"

    # Build query params for the callback
    callback_params: dict[str, str] = {}
    if action:
        callback_params["action"] = action
    if return_to and return_to.startswith("/"):
        # Only allow relative paths starting with "/" for security
        callback_params["from"] = return_to

    if callback_params:
        callback_url = f"{callback_base}?{urlencode(callback_params)}"
    else:
        callback_url = callback_base

    # If intermediary is configured, wrap the callback URL
    if settings.WECHAT_LOGIN_INTERMEDIARY_URL:
        # The intermediary expects ?from=<final_callback>
        intermediary_params = {"from": callback_url}
        redirect_uri = (
            f"{settings.WECHAT_LOGIN_INTERMEDIARY_URL}?{urlencode(intermediary_params)}"
        )
    else:
        # Direct redirect to callback
        redirect_uri = callback_url

    return redirect_uri


# ---------------------------------------------------------------------------
# Error Mapping
# ---------------------------------------------------------------------------

# Map WeChat error codes to user-facing error categories
WECHAT_ERROR_CATEGORIES = {
    40029: "invalid_code",  # Invalid code
    40163: "code_used",  # Code already used
    41002: "missing_appid",  # Missing appid
    41004: "missing_secret",  # Missing secret
    42001: "token_expired",  # Access token expired
    42002: "refresh_token_expired",  # Refresh token expired
    42003: "code_expired",  # Code expired
}


def map_wechat_error(error: WeChatError) -> tuple[str, int]:
    """
    Map WeChat error to (category, http_status).
    Returns tuple of (error_category, status_code).
    """
    category = WECHAT_ERROR_CATEGORIES.get(error.errcode, "provider_error")
    # Most WeChat errors should be 400 (bad request from client perspective)
    # except for provider unavailable scenarios
    if category == "provider_error":
        return (category, status.HTTP_502_BAD_GATEWAY)
    return (category, status.HTTP_400_BAD_REQUEST)


def map_state_error(reason: str) -> tuple[str, int]:
    """
    Map state validation error to (detail, http_status).
    """
    if reason == "not_found":
        return ("Invalid state token", status.HTTP_400_BAD_REQUEST)
    elif reason == "expired":
        return ("State token expired", status.HTTP_400_BAD_REQUEST)
    elif reason == "already_used":
        return ("State token already used", status.HTTP_400_BAD_REQUEST)
    return ("State validation failed", status.HTTP_400_BAD_REQUEST)


# ---------------------------------------------------------------------------
# Login Endpoints
# ---------------------------------------------------------------------------


@router.post(
    "/login/wechat/start",
    response_model=WeChatLoginStartResponse,
    dependencies=[WeChatEnabled],
)
def wechat_login_start(
    session: SessionDep,
    body: WeChatLoginStartRequest | None = None,
) -> WeChatLoginStartResponse:
    """
    Start WeChat login flow.

    Returns parameters needed to render the embedded WeChat QR code.
    Creates a state token for anti-replay/CSRF protection (TTL=10 minutes).

    The response MUST NOT include any secrets (AppSecret).

    The redirect_uri embeds optional parameters:
    - action: "login" or "link" (intent for the flow)
    - from (return_to): Safe relative path for post-callback redirect

    If WECHAT_LOGIN_INTERMEDIARY_URL is configured, the redirect_uri points to
    the intermediary with ?from=<final_callback>. Otherwise, redirects directly
    to the frontend callback route.
    """
    # Extract action and return_to from request body
    action = body.action if body else "login"
    return_to = body.return_to if body else None

    # Generate state token
    state = secrets.token_urlsafe(32)

    # Calculate expiration (TTL from config, default 10 minutes)
    expires_at = datetime.now(timezone.utc) + timedelta(
        minutes=settings.WECHAT_STATE_TTL_MINUTES
    )

    # Store state for anti-replay
    crud.create_wechat_login_attempt(
        session=session,
        state=state,
        expires_at=expires_at,
        user_id=None,  # Not logged in yet
    )

    # Build redirect URI using the helper (supports intermediary chain)
    redirect_uri = build_wechat_redirect_uri(action=action, return_to=return_to)

    logger.info(
        "WeChat login started",
        extra={"state_prefix": state[:8]},  # Log only prefix for debugging
    )

    return WeChatLoginStartResponse(
        appid=settings.WECHAT_APP_ID or "",
        scope="snsapi_login",  # Website apps must use snsapi_login
        redirect_uri=redirect_uri,
        state=state,
    )


@router.post(
    "/login/wechat/complete",
    response_model=Token,
    dependencies=[WeChatEnabled],
)
async def wechat_login_complete(
    session: SessionDep,
    body: WeChatLoginCompleteRequest,
) -> Token:
    """
    Complete WeChat login flow.

    Validates the state token (anti-replay), exchanges the code for tokens,
    fetches user profile, and issues an access token.

    For already-linked users: returns access token for the linked account.
    For new users: creates account + link and returns access token.

    SECURITY: State token is consumed (one-time use) on successful completion.
    """
    # Validate state token (anti-replay)
    is_valid, attempt, error_reason = crud.is_wechat_state_valid(
        session=session, state=body.state
    )

    if not is_valid or attempt is None:
        # Record failure if attempt exists
        if attempt is not None:
            crud.consume_wechat_login_attempt(
                session=session,
                attempt=attempt,
                success=False,
                failure_category=f"state_{error_reason}",
            )
        detail, status_code = map_state_error(error_reason or "unknown")
        logger.warning(
            "WeChat login state validation failed",
            extra={
                "reason": error_reason,
                "state_prefix": body.state[:8] if body.state else None,
            },
        )
        raise HTTPException(status_code=status_code, detail=detail)

    # At this point, attempt is guaranteed to be not None
    valid_attempt = attempt

    # Exchange code for tokens and fetch userinfo
    try:
        token_response, userinfo = await get_wechat_user_profile(body.code)
    except WeChatError as e:
        # Record failure
        category, status_code = map_wechat_error(e)
        crud.consume_wechat_login_attempt(
            session=session,
            attempt=valid_attempt,
            success=False,
            failure_category=category,
        )
        logger.warning(
            "WeChat API error during login",
            extra={"errcode": e.errcode, "category": category},
        )
        raise HTTPException(
            status_code=status_code,
            detail=f"WeChat login failed: {category}",
        )
    except httpx.HTTPError:
        # Record failure
        crud.consume_wechat_login_attempt(
            session=session,
            attempt=valid_attempt,
            success=False,
            failure_category="network_error",
        )
        logger.error("Network error during WeChat login", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="WeChat service unavailable",
        )

    # Determine primary subject (prefer unionid if available)
    if userinfo.unionid:
        primary_subject_type = "unionid"
        primary_subject = userinfo.unionid
    else:
        primary_subject_type = "openid"
        primary_subject = userinfo.openid

    # Look up existing link by primary subject
    existing_link = crud.get_wechat_link_by_primary_subject(
        session=session,
        primary_subject_type=primary_subject_type,
        primary_subject=primary_subject,
    )

    if existing_link:
        # Already linked - return token for linked user
        user = crud.get_user_by_id(session=session, user_id=existing_link.user_id)
        if not user:
            # Orphaned link - should not happen
            crud.consume_wechat_login_attempt(
                session=session,
                attempt=valid_attempt,
                success=False,
                failure_category="orphaned_link",
            )
            logger.error(
                "Orphaned WeChat link found",
                extra={"link_id": str(existing_link.id)},
            )
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Account error - please contact support",
            )

        if not user.is_active:
            crud.consume_wechat_login_attempt(
                session=session,
                attempt=valid_attempt,
                success=False,
                failure_category="inactive_user",
            )
            # Use generic message to avoid leaking account existence
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Login failed",
            )

        # Success - consume state and issue token
        crud.consume_wechat_login_attempt(
            session=session,
            attempt=valid_attempt,
            success=True,
        )

        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = security.create_access_token(
            user.id, expires_delta=access_token_expires
        )

        logger.info(
            "WeChat login successful (existing link)",
            extra={"user_id": str(user.id), "state_prefix": body.state[:8]},
        )

        return Token(access_token=access_token, token_type="bearer")

    # No existing link - create new user and link
    # Generate placeholder email (UUID-based, no identifiers)
    import uuid as uuid_module

    placeholder_email = f"wechat_{uuid_module.uuid4().hex}@placeholder.local"

    # Create new user with placeholder credentials
    from app.models import UserCreate

    user_create = UserCreate(
        email=placeholder_email,
        password=secrets.token_urlsafe(32),  # Random password they can't use
        full_name=userinfo.nickname,
        is_active=True,
        is_superuser=False,
    )
    new_user = crud.create_user(session=session, user_create=user_create)

    # Create WeChat link
    link_data = WeChatAccountLinkBase(
        openid=userinfo.openid,
        unionid=userinfo.unionid,
        primary_subject_type=primary_subject_type,
        primary_subject=primary_subject,
        nickname=userinfo.nickname,
        avatar_url=userinfo.headimgurl,
    )
    crud.create_wechat_link(
        session=session,
        user_id=new_user.id,
        link_data=link_data,
    )

    # Success - consume state and issue token
    crud.consume_wechat_login_attempt(
        session=session,
        attempt=valid_attempt,
        success=True,
    )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        new_user.id, expires_delta=access_token_expires
    )

    logger.info(
        "WeChat login successful (new user created)",
        extra={"user_id": str(new_user.id), "state_prefix": body.state[:8]},
    )

    return Token(access_token=access_token, token_type="bearer")


# ---------------------------------------------------------------------------
# Link Status / Link / Unlink Endpoints (Authenticated)
# ---------------------------------------------------------------------------


@router.get(
    "/users/me/wechat",
    response_model=WeChatAccountLinkPublic | None,
    dependencies=[WeChatEnabled],
)
def wechat_link_status(
    session: SessionDep,
    current_user: CurrentUser,
) -> WeChatAccountLinkPublic | None:
    """
    Get current user's WeChat link status.

    Returns the WeChat link details if linked, or null if not linked.
    """
    existing_link = crud.get_wechat_link_by_user_id(
        session=session, user_id=current_user.id
    )
    if not existing_link:
        return None

    return WeChatAccountLinkPublic(
        id=existing_link.id,
        openid=existing_link.openid,
        unionid=existing_link.unionid,
        nickname=existing_link.nickname,
        avatar_url=existing_link.avatar_url,
        created_at=existing_link.created_at,
    )


@router.post(
    "/users/me/wechat/link",
    response_model=Message,
    dependencies=[WeChatEnabled],
)
async def wechat_link(
    session: SessionDep,
    current_user: CurrentUser,
    body: WeChatLinkRequest,
) -> Message:
    """
    Link WeChat to current authenticated user.

    Requires:
    - User must be authenticated
    - Valid state token (from a previous /login/wechat/start call)
    - WeChat identity must not be linked to another user

    This is an explicit user action (FR-003: no automatic merges).
    """
    # Check if user already has a WeChat link
    existing_link = crud.get_wechat_link_by_user_id(
        session=session, user_id=current_user.id
    )
    if existing_link:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account already has a WeChat link. Unlink first to change.",
        )

    # Validate state token
    is_valid, attempt, error_reason = crud.is_wechat_state_valid(
        session=session, state=body.state
    )

    if not is_valid or attempt is None:
        if attempt is not None:
            crud.consume_wechat_login_attempt(
                session=session,
                attempt=attempt,
                success=False,
                failure_category=f"state_{error_reason}",
            )
        detail, status_code = map_state_error(error_reason or "unknown")
        raise HTTPException(status_code=status_code, detail=detail)

    # At this point, attempt is guaranteed to be not None
    valid_attempt = attempt

    # Exchange code for tokens and fetch userinfo
    try:
        token_response, userinfo = await get_wechat_user_profile(body.code)
    except WeChatError as e:
        category, status_code = map_wechat_error(e)
        crud.consume_wechat_login_attempt(
            session=session,
            attempt=valid_attempt,
            success=False,
            failure_category=category,
        )
        raise HTTPException(
            status_code=status_code,
            detail=f"WeChat linking failed: {category}",
        )
    except httpx.HTTPError:
        crud.consume_wechat_login_attempt(
            session=session,
            attempt=valid_attempt,
            success=False,
            failure_category="network_error",
        )
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="WeChat service unavailable",
        )

    # Determine primary subject
    if userinfo.unionid:
        primary_subject_type = "unionid"
        primary_subject = userinfo.unionid
    else:
        primary_subject_type = "openid"
        primary_subject = userinfo.openid

    # Check if this WeChat identity is already linked to another user
    existing_other_link = crud.get_wechat_link_by_primary_subject(
        session=session,
        primary_subject_type=primary_subject_type,
        primary_subject=primary_subject,
    )
    if existing_other_link:
        crud.consume_wechat_login_attempt(
            session=session,
            attempt=valid_attempt,
            success=False,
            failure_category="already_linked_other",
        )
        # FR-007: Return stable error code for already-linked-to-other-user
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="This WeChat account is already linked to another user",
        )

    # Create the link
    link_data = WeChatAccountLinkBase(
        openid=userinfo.openid,
        unionid=userinfo.unionid,
        primary_subject_type=primary_subject_type,
        primary_subject=primary_subject,
        nickname=userinfo.nickname,
        avatar_url=userinfo.headimgurl,
    )
    crud.create_wechat_link(
        session=session,
        user_id=current_user.id,
        link_data=link_data,
    )

    # Consume state token
    crud.consume_wechat_login_attempt(
        session=session,
        attempt=valid_attempt,
        success=True,
    )

    logger.info(
        "WeChat link created",
        extra={"user_id": str(current_user.id)},
    )

    return Message(message="WeChat account linked successfully")


@router.delete(
    "/users/me/wechat/link",
    response_model=Message,
    dependencies=[WeChatEnabled],
)
def wechat_unlink(
    session: SessionDep,
    current_user: CurrentUser,
) -> Message:
    """
    Unlink WeChat from current authenticated user.

    Safety rules (FR-015, spec safety notes):
    - Cannot unlink if it would leave user with no sign-in method
    - Placeholder-email accounts are treated as WeChat-only until email is updated
    - To unlink: user must have non-placeholder email AND password recovery available
    """
    # Get existing link
    existing_link = crud.get_wechat_link_by_user_id(
        session=session, user_id=current_user.id
    )
    if not existing_link:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No WeChat link found for this account",
        )

    # Safety check: ensure user has another sign-in method
    # 1. Check if email is a placeholder (WeChat-created account)
    is_placeholder = is_wechat_placeholder_email(current_user.email)

    # 2. Check if password recovery is available (emails enabled + non-placeholder)
    has_password_recovery = settings.emails_enabled and not is_placeholder

    if not has_password_recovery:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot unlink WeChat: no other sign-in method available. "
            "Please update your email address and ensure password recovery is available first.",
        )

    # Safe to unlink
    crud.delete_wechat_link(session=session, link=existing_link)

    logger.info(
        "WeChat link removed",
        extra={"user_id": str(current_user.id)},
    )

    return Message(message="WeChat account unlinked successfully")
