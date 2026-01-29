# Implementation Plan: WeChat Redirect URL Update

**Branch**: `008-wechat-redirect-url` | **Date**: 2026-01-29 | **Spec**: specs/008-wechat-redirect-url/spec.md
**Input**: Feature specification from `specs/008-wechat-redirect-url/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.github/agents/speckit.plan.agent.md` for the execution workflow.

## Summary

Update the WeChat QR login/link redirect chain so WeChat redirects to `https://h5.yunxi668.com/passport/wxLogin?from=<ai-callback-url>`, and `h5.yunxi668.com` forwards `code` and `state` to the frontend callback route `/wechat-callback`.

Implementation keeps code exchange server-side (existing backend `/login/wechat/complete` and `/users/me/wechat/link`), while the frontend callback route orchestrates login/link and performs a safe post-success redirect using an allowlisted `from` destination (relative paths only).

## Technical Context

**Language/Version**: Python >=3.10 (backend), TypeScript (frontend)
**Primary Dependencies**: FastAPI + SQLModel + httpx (backend); React + TanStack Router/Query + Vite (frontend)
**Storage**: PostgreSQL (via SQLModel/Alembic)
**Testing**: Pytest (backend), Playwright (frontend e2e), TypeScript build/typecheck
**Target Platform**: Docker Compose (local/prod-like); Linux containers in deployment
**Project Type**: Web application (backend + frontend)
**Performance Goals**: N/A (auth callback flow; correctness + reliability prioritized)
**Constraints**:
- Do not log secrets or sensitive values (code/tokens/state)
- Keep OpenAPI accurate; regenerate frontend client on contract changes
- Frontend must use generated client for backend calls
**Scale/Scope**: Small, localized changes to WeChat login/link redirect handling

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Minimum gates for this repository:
- Security/secret hygiene preserved (no secrets committed; env-based config)
- OpenAPI remains accurate; regenerate + commit frontend client if contract changed
- Frontend uses generated client for backend calls (no ad-hoc direct endpoint calls)
- DB schema changes include Alembic migration(s) committed and upgradeable
- Tooling discipline preserved (backend ruff+mypy; frontend biome+tsc)
- Backend dependency changes use `uv` and update `backend/uv.lock`
- Pre-commit hooks (`prek`) expected to pass (or documented exception)
- Tests updated for behavior changes or explicit omission justification recorded
- CI checks expected to pass (do not merge with failing checks)

Gate evaluation (current plan):
- Security/secret hygiene: PASS (no new secrets; keep code/tokens out of logs)
- OpenAPI + generated client: PASS (plan includes regeneration if schema changes)
- Generated client usage: PASS (callback already uses `WechatLoginService`)
- DB migrations: PASS (no DB schema change planned)
- Tooling discipline: PASS (use existing scripts: backend `uv`/ruff/mypy; frontend biome/tsc)
- Tests: PASS (plan includes targeted tests for redirect building + callback redirect safety)

## Project Structure

### Documentation (this feature)

```text
specs/008-wechat-redirect-url/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
backend/
├── app/
│   ├── api/
│   │   └── routes/
│   │       └── wechat_login.py
│   ├── core/
│   │   └── config.py
│   ├── models.py
│   └── crud.py
└── tests/

frontend/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   └── WeChatQrLogin.tsx
│   │   └── UserSettings/
│   │       └── WeChatConnection.tsx
│   ├── routes/
│   │   └── wechat-callback.tsx
│   └── client/          # generated OpenAPI client
└── tests/
```

**Structure Decision**: Web application; changes span backend WeChat start config + frontend QR/embed + frontend callback routing.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| _None_ |  |  |

## Phase 0 — Outline & Research

Research goals (resolve before design finalization):
- Confirm correct URL encoding expectations for `wxLogin.js` `redirect_uri` when the redirect URI itself contains query parameters (nested `from`).
- Confirm practical WeChat Open Platform constraints relevant to this change (redirect URI domain matching / whitelisting) to avoid broken QR flows.
- Confirm best-practice approach for avoiding open redirects when honoring a `from` query param.

Deliverable: `specs/008-wechat-redirect-url/research.md`

## Phase 1 — Design & Contracts

### Design Overview

- Backend remains the source of truth for the WeChat `redirect_uri` used by `wxLogin.js`, so operators can change it via environment configuration (no frontend code changes required).
- Frontend callback route `/wechat-callback` continues to call backend endpoints to (a) link (`/users/me/wechat/link`) or (b) login (`/login/wechat/complete`), and then redirects to an allowlisted destination.
- `from` allowlist policy: same-origin relative paths only (e.g., `/settings`), reject full URLs.

### Contract Changes (expected)

- Extend `WeChatLoginStartRequest` to support distinguishing the flow (`login` vs `link`) so the backend can embed `action=link` into the callback URL when needed.
- Keep `WeChatLoginStartResponse` returning an unencoded `redirect_uri` string that the frontend continues to pass through `encodeURIComponent(...)` before giving it to `wxLogin.js`.

Deliverables:
- `specs/008-wechat-redirect-url/data-model.md`
- `specs/008-wechat-redirect-url/contracts/wechat-login.openapi.yaml`
- `specs/008-wechat-redirect-url/quickstart.md`

Post-design Constitution Check: PASS (no changes required beyond standard OpenAPI/client regeneration and test updates if schema changes).

## Phase 2 — Implementation Plan

1. Backend config
  - Add an env-driven setting for the WeChat redirect template (default to current `${FRONTEND_HOST}/wechat-callback`).
  - Support the new h5 intermediary pattern: `https://h5.yunxi668.com/passport/wxLogin?from=<callback-url>`.

2. Backend start endpoint
  - Update `/login/wechat/start` to build the correct `redirect_uri` based on:
    - flow (`login` vs `link`) → affects callback query `action=link`
    - optional post-login destination (`return_to`) → used to create callback query `from=/relative/path`
  - Keep logging non-sensitive data only.

3. Frontend QR/link initiation
  - Update `WeChatQrLogin` and `WeChatConnection` to use the backend-provided `startData.redirect_uri`.
  - For link flow, pass the request parameter indicating link flow instead of hand-building a browser-origin callback URL.

4. Frontend callback route
  - Update `/wechat-callback` to accept optional `from` and apply allowlist (relative paths only), falling back to current defaults (`/resources` for login, `/settings` for link).

5. OpenAPI + generated client
  - If request/response schemas change, run `./scripts/generate-client.sh` and commit updates under `frontend/src/client/`.

6. Tests & gates
  - Add/adjust backend tests for start response redirect building and state handling.
  - Add/adjust frontend tests for callback redirect allowlist.
