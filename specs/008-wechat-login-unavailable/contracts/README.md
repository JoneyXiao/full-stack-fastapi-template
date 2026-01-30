# Contracts: WeChat Login Unavailable Toast

## Summary

This feature does **not** introduce new endpoints or modify existing request/response schemas.

## Existing behavior relied upon

- Frontend calls `WechatLoginService.wechatLoginStart()` (generated client) to start WeChat QR login.
- When WeChat login is disabled in backend configuration, the backend responds with an HTTP `403` (and the frontend may also treat `404` equivalently).

## OpenAPI impact

- No OpenAPI schema changes planned.
- No client regeneration required.
