"""
Test utilities for mocking WeChat API calls.

These helpers use monkeypatch/pytest fixtures to mock httpx calls
to WeChat endpoints during tests.
"""

import uuid
from typing import Any

import httpx

from app.integrations.wechat import (
    WeChatError,
    WeChatTokenResponse,
    WeChatUserInfo,
)


def create_mock_wechat_token_response(
    openid: str | None = None,
    unionid: str | None = None,
    access_token: str | None = None,
) -> WeChatTokenResponse:
    """Create a mock WeChat token response for testing."""
    return WeChatTokenResponse(
        access_token=access_token or f"mock_access_token_{uuid.uuid4().hex[:8]}",
        openid=openid or f"mock_openid_{uuid.uuid4().hex[:16]}",
        unionid=unionid,
        expires_in=7200,
        refresh_token=f"mock_refresh_token_{uuid.uuid4().hex[:8]}",
    )


def create_mock_wechat_userinfo(
    openid: str | None = None,
    unionid: str | None = None,
    nickname: str | None = None,
    headimgurl: str | None = None,
) -> WeChatUserInfo:
    """Create a mock WeChat userinfo response for testing."""
    return WeChatUserInfo(
        openid=openid or f"mock_openid_{uuid.uuid4().hex[:16]}",
        unionid=unionid,
        nickname=nickname or "Test User",
        headimgurl=headimgurl or "https://example.com/avatar.jpg",
    )


class MockWeChatResponses:
    """
    Helper class to configure mock WeChat API responses.

    Usage:
        mock_wechat = MockWeChatResponses()
        mock_wechat.set_token_response(openid="test_openid", unionid="test_unionid")
        monkeypatch.setattr(
            "app.integrations.wechat.exchange_code_for_token",
            mock_wechat.mock_exchange_code
        )
        monkeypatch.setattr(
            "app.integrations.wechat.fetch_userinfo",
            mock_wechat.mock_fetch_userinfo
        )
    """

    def __init__(self) -> None:
        self.token_response: WeChatTokenResponse | None = None
        self.userinfo: WeChatUserInfo | None = None
        self.token_error: WeChatError | None = None
        self.userinfo_error: WeChatError | None = None
        self.network_error: bool = False

    def set_token_response(
        self,
        openid: str | None = None,
        unionid: str | None = None,
        access_token: str | None = None,
    ) -> "MockWeChatResponses":
        """Set successful token response."""
        self.token_response = create_mock_wechat_token_response(
            openid=openid, unionid=unionid, access_token=access_token
        )
        self.token_error = None
        return self

    def set_userinfo(
        self,
        openid: str | None = None,
        unionid: str | None = None,
        nickname: str | None = None,
        headimgurl: str | None = None,
    ) -> "MockWeChatResponses":
        """Set successful userinfo response."""
        # Use openid from token response if available
        if openid is None and self.token_response:
            openid = self.token_response.openid
        # Use unionid from token response if available
        if unionid is None and self.token_response:
            unionid = self.token_response.unionid
        self.userinfo = create_mock_wechat_userinfo(
            openid=openid, unionid=unionid, nickname=nickname, headimgurl=headimgurl
        )
        self.userinfo_error = None
        return self

    def set_token_error(
        self, errcode: int, errmsg: str = "Error"
    ) -> "MockWeChatResponses":
        """Set token exchange error."""
        self.token_error = WeChatError(errcode, errmsg)
        self.token_response = None
        return self

    def set_userinfo_error(
        self, errcode: int, errmsg: str = "Error"
    ) -> "MockWeChatResponses":
        """Set userinfo fetch error."""
        self.userinfo_error = WeChatError(errcode, errmsg)
        self.userinfo = None
        return self

    def set_network_error(self) -> "MockWeChatResponses":
        """Set network error for all calls."""
        self.network_error = True
        return self

    async def mock_exchange_code(self, code: str) -> WeChatTokenResponse:
        """Mock implementation of exchange_code_for_token."""
        if self.network_error:
            raise httpx.ConnectError("Mock network error")
        if self.token_error:
            raise self.token_error
        if self.token_response is None:
            raise ValueError("Token response not configured")
        return self.token_response

    async def mock_fetch_userinfo(
        self, access_token: str, openid: str
    ) -> WeChatUserInfo:
        """Mock implementation of fetch_userinfo."""
        if self.network_error:
            raise httpx.ConnectError("Mock network error")
        if self.userinfo_error:
            raise self.userinfo_error
        if self.userinfo is None:
            raise ValueError("Userinfo not configured")
        return self.userinfo

    async def mock_get_wechat_user_profile(
        self, code: str
    ) -> tuple[WeChatTokenResponse, WeChatUserInfo]:
        """Mock implementation of get_wechat_user_profile."""
        token = await self.mock_exchange_code(code)
        userinfo = await self.mock_fetch_userinfo(token.access_token, token.openid)
        return token, userinfo


def patch_wechat_api(monkeypatch: Any, mock_wechat: MockWeChatResponses) -> None:
    """
    Convenience function to patch all WeChat API calls.

    Usage:
        mock_wechat = MockWeChatResponses()
        mock_wechat.set_token_response(openid="test", unionid="test_union")
        mock_wechat.set_userinfo(nickname="Test User")
        patch_wechat_api(monkeypatch, mock_wechat)
    """
    monkeypatch.setattr(
        "app.integrations.wechat.exchange_code_for_token",
        mock_wechat.mock_exchange_code,
    )
    monkeypatch.setattr(
        "app.integrations.wechat.fetch_userinfo",
        mock_wechat.mock_fetch_userinfo,
    )
    monkeypatch.setattr(
        "app.integrations.wechat.get_wechat_user_profile",
        mock_wechat.mock_get_wechat_user_profile,
    )
    # Also patch the imports in the router module
    monkeypatch.setattr(
        "app.api.routes.wechat_login.get_wechat_user_profile",
        mock_wechat.mock_get_wechat_user_profile,
    )
