# Research: WeChat Login

**Feature**: [spec.md](spec.md)
**Date**: 2026-01-27

This document resolves open questions and records decisions for implementing WeChat login in this repository.

## Decisions

### Decision 1: Desktop UX uses embedded QR login

- **Decision**: Use WeChat’s embedded QR approach via `wxLogin.js` (iframe) on the app’s login UI.
- **Rationale**: Keeps users on-site, improves completion rate, and matches WeChat’s supported “embed QR” flow.
- **Alternatives considered**:
  - Redirect to `qrconnect` (simpler but leaves site and reduces UI control).
  - Support both (adds complexity; can be revisited later).

### Decision 2: Identity matching prefers `unionid`, falls back to `openid`

- **Decision**: Prefer `unionid` for long-term identity matching when available; otherwise use `openid`. Persist which identifier was used.
- **Rationale**: `unionid` is stable across apps under the same Open Platform account; `openid` is app-scoped and may be the only available identifier in some cases.
- **Alternatives considered**:
  - `unionid`-only (would fail for users where `unionid` is absent).
  - `openid`-only (higher risk of fragmentation if multiple apps are added later).

### Decision 3: Request profile permissions and fetch basic userinfo

- **Decision**: Request authorization sufficient to fetch basic profile (nickname, avatar) and store only minimal profile fields.
- **Rationale**: Improves UX (display name/avatar), and WeChat’s `userinfo` response includes `unionid`.
- **Alternatives considered**:
  - Login-only (`snsapi_login`) without userinfo (less data but fewer UX benefits and may reduce availability of `unionid`).

### Decision 4: No automatic merges to existing accounts

- **Decision**: Do not auto-merge based on non-unique signals (e.g., email). If user wants to link WeChat to an existing account, they must sign in first and explicitly link.
- **Rationale**: Avoids account takeover risks and ambiguous matching.
- **Alternatives considered**:
  - Auto-merge into “matching email” account (unsafe unless email is verified by a trusted channel).
  - Create a new account then resolve later (creates duplicates and support burden).

### Decision 5: Do not persist WeChat access/refresh tokens

- **Decision**: Use WeChat tokens transiently during login to fetch userinfo, then discard. Do not store `access_token` or `refresh_token` beyond the login flow.
- **Rationale**: Minimizes breach impact and aligns with WeChat guidance to keep secrets/tokens server-side and minimize sensitive storage.
- **Alternatives considered**:
  - Persist refresh token encrypted for later API calls (not needed for this feature scope; increases risk and compliance burden).

## Key Reference Notes (from official docs)

- Authorize URL (PC QR):
  - `https://open.weixin.qq.com/connect/qrconnect?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect`
- Embedded QR script:
  - `https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js`
- Exchange `code` → tokens:
  - `https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code`
- Fetch user profile:
  - `https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID`
- Security properties:
  - `code` expires quickly and can only be used once; use `state` to defend against CSRF.
