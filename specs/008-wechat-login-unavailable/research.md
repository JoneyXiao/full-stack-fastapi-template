# Research: WeChat Login Unavailable Toast

**Feature**: specs/008-wechat-login-unavailable/spec.md
**Date**: 2026-01-30

## Decision 1: Source of truth for “WeChat login disabled”

**Decision**: Use backend responses from WeChat login endpoints as the availability signal. Specifically, treat HTTP `403` (and optionally `404`) from `WechatLoginService.wechatLoginStart()` as “WeChat login disabled/unavailable”.

**Rationale**:
- Backend already computes `settings.wechat_login_enabled` from `WECHAT_LOGIN_ENABLED` plus required WeChat credentials.
- Backend already gates WeChat endpoints (e.g., `/login/wechat/start`) and returns `403` when disabled.
- Avoids introducing new “capabilities/config” endpoint and keeps behavior consistent with the actual runtime configuration.

**Alternatives considered**:
- Add a dedicated “auth providers status” endpoint: rejected as unnecessary API surface for a small UI behavior change.
- Read `WECHAT_LOGIN_ENABLED` directly in the frontend: rejected because frontend does not (and should not) own the backend’s secret/config truth.

## Decision 2: Where to implement UI behavior

**Decision**: Implement the toast + gating primarily in the login page (`frontend/src/routes/login.tsx`) and reuse the existing disabled signal emitted by `WeChatQrLogin`.

**Rationale**:
- The WeChat button click handler lives in the login route; it can short-circuit opening the QR popup when disabled.
- `WeChatQrLogin` already detects disabled states (403/404) and calls `onDisabled`, which can set a local “disabled” flag to prevent future backend calls.
- Keeps changes localized and reduces risk of regressions in other auth flows.

**Alternatives considered**:
- Move toast logic into `WeChatQrLogin`: rejected because it would couple a reusable component to UX decisions and toast presentation.

## Decision 3: Toast implementation (warning + debounce)

**Decision**: Use Sonner (existing toast library) and add/extend a wrapper method to show a warning toast. Implement a per-page rate limit of 2 seconds without adding new dependencies.

**Rationale**:
- Repo already uses Sonner and a wrapper hook `useCustomToast`.
- Sonner supports `toast.warning(...)`.
- A simple timestamp-based limiter in a hook (or route) meets the “at most once per 2 seconds per page” requirement without introducing lodash or other deps.

**Alternatives considered**:
- Add a debounce/rate-limit dependency: rejected (unnecessary dependency for a small behavior).
- Show toast on every click: rejected (spec explicitly requires rate limiting).

## Decision 4: Copy + i18n placement

**Decision**: Reuse existing i18n key `auth.wechat.providerUnavailable` for the toast description, and set the English translation value to exactly: “WeChat login is currently unavailable.”

**Rationale**:
- The repo is localized and already uses `auth.wechat.*` keys for WeChat auth messaging.
- Reusing an existing key reduces translation sprawl and aligns with existing error mapping (e.g., callback route uses `providerUnavailable`).
- The specification’s “exact message” can be satisfied for the English locale while still allowing localization.

**Alternatives considered**:
- Hardcode the English string in the UI: rejected (breaks established localization conventions).
- Add a brand-new key: optional, but not required because an existing key already expresses this concept.
