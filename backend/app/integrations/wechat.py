"""
WeChat HTTP client helpers for OAuth login flow.

This module handles server-side calls to WeChat endpoints:
- Exchange authorization code for access token
- Fetch user profile (userinfo)

SECURITY NOTES:
- Tokens are used transiently and not persisted
- AppSecret is never logged or exposed
- Authorization code and tokens are not logged
"""

import logging
from typing import NamedTuple

import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)

# WeChat API endpoints
WECHAT_TOKEN_URL = "https://api.weixin.qq.com/sns/oauth2/access_token"
WECHAT_USERINFO_URL = "https://api.weixin.qq.com/sns/userinfo"

# Timeout for WeChat API calls (seconds)
WECHAT_API_TIMEOUT = 10.0


class WeChatTokenResponse(NamedTuple):
    """Response from WeChat token exchange."""

    access_token: str
    openid: str
    unionid: str | None
    expires_in: int
    refresh_token: str | None


class WeChatUserInfo(NamedTuple):
    """User profile from WeChat userinfo endpoint."""

    openid: str
    unionid: str | None
    nickname: str | None
    headimgurl: str | None  # avatar URL


class WeChatError(Exception):
    """Error from WeChat API."""

    def __init__(self, errcode: int, errmsg: str):
        self.errcode = errcode
        self.errmsg = errmsg
        super().__init__(f"WeChat error {errcode}: {errmsg}")


async def exchange_code_for_token(code: str) -> WeChatTokenResponse:
    """
    Exchange authorization code for access token.

    This is a server-side call that uses the AppSecret.
    The token is used transiently and should not be persisted.

    Args:
        code: Authorization code from WeChat redirect

    Returns:
        WeChatTokenResponse with access_token, openid, unionid

    Raises:
        WeChatError: If WeChat API returns an error
        httpx.HTTPError: If network error occurs
    """
    params = {
        "appid": settings.WECHAT_APP_ID,
        "secret": settings.WECHAT_APP_SECRET,
        "code": code,
        "grant_type": "authorization_code",
    }

    async with httpx.AsyncClient(timeout=WECHAT_API_TIMEOUT) as client:
        response = await client.get(WECHAT_TOKEN_URL, params=params)
        response.raise_for_status()
        data = response.json()

    # Check for error response
    if "errcode" in data and data["errcode"] != 0:
        logger.warning(
            "WeChat token exchange failed",
            extra={"errcode": data.get("errcode"), "errmsg": data.get("errmsg")},
        )
        raise WeChatError(data["errcode"], data.get("errmsg", "Unknown error"))

    # Log success without sensitive data
    logger.info("WeChat token exchange successful")

    return WeChatTokenResponse(
        access_token=data["access_token"],
        openid=data["openid"],
        unionid=data.get("unionid"),
        expires_in=data.get("expires_in", 7200),
        refresh_token=data.get("refresh_token"),
    )


async def fetch_userinfo(access_token: str, openid: str) -> WeChatUserInfo:
    """
    Fetch user profile from WeChat userinfo endpoint.

    Args:
        access_token: Access token from token exchange
        openid: User's openid from token exchange

    Returns:
        WeChatUserInfo with profile data

    Raises:
        WeChatError: If WeChat API returns an error
        httpx.HTTPError: If network error occurs
    """
    params = {
        "access_token": access_token,
        "openid": openid,
    }

    async with httpx.AsyncClient(timeout=WECHAT_API_TIMEOUT) as client:
        response = await client.get(WECHAT_USERINFO_URL, params=params)
        response.raise_for_status()
        data = response.json()

    # Check for error response
    if "errcode" in data and data["errcode"] != 0:
        logger.warning(
            "WeChat userinfo fetch failed",
            extra={"errcode": data.get("errcode"), "errmsg": data.get("errmsg")},
        )
        raise WeChatError(data["errcode"], data.get("errmsg", "Unknown error"))

    logger.info("WeChat userinfo fetch successful")

    return WeChatUserInfo(
        openid=data["openid"],
        unionid=data.get("unionid"),
        nickname=data.get("nickname"),
        headimgurl=data.get("headimgurl"),
    )


async def get_wechat_user_profile(
    code: str,
) -> tuple[WeChatTokenResponse, WeChatUserInfo]:
    """
    Complete flow: exchange code and fetch userinfo.

    This is a convenience function that:
    1. Exchanges the authorization code for tokens
    2. Fetches the user profile using the access token
    3. Returns both results (tokens are not persisted)

    Args:
        code: Authorization code from WeChat redirect

    Returns:
        Tuple of (token_response, userinfo)

    Raises:
        WeChatError: If WeChat API returns an error
        httpx.HTTPError: If network error occurs
    """
    token_response = await exchange_code_for_token(code)
    userinfo = await fetch_userinfo(token_response.access_token, token_response.openid)
    return token_response, userinfo
