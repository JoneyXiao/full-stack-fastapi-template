# Implementation Plan: WeChat Login Unavailable Toast

**Branch**: `008-wechat-login-unavailable` | **Date**: 2026-01-30 | **Spec**: specs/008-wechat-login-unavailable/spec.md
**Input**: Feature specification from `specs/008-wechat-login-unavailable/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.github/agents/speckit.plan.agent.md` for the execution workflow.

## Summary

When WeChat login is disabled on the backend (provider unavailable as declared by the backend, e.g., `WECHAT_LOGIN_ENABLED=False` and/or missing WeChat credentials), keep the WeChat login button visible on the login page. If the user clicks it, show a warning toast (“WeChat login is currently unavailable.”) rate-limited to once per 2 seconds per browser tab, and do not start the WeChat login flow.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: Backend Python 3.11; Frontend TypeScript (Vite)
**Primary Dependencies**: FastAPI, SQLModel, React, TanStack Router/Query, sonner (toasts), i18next
**Storage**: N/A (no new persistence)
**Testing**: Backend pytest; Frontend Playwright
**Target Platform**: Web application (SPA) + FastAPI backend
**Project Type**: Web application (separate `frontend/` and `backend/`)
**Performance Goals**: N/A (UI-only change; avoid toast spam)
**Constraints**:
- Must keep WeChat login button visible and clickable while disabled
- Must not introduce ad-hoc backend calls (use generated client)
- Must not commit secrets; feature flag remains env-based
- Must keep behavior independently testable (Playwright)
**Scale/Scope**: One login screen interaction; no schema or API contract changes

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

Status (initial): PASS

- Security/secret hygiene: PASS (no secret changes; only UI behavior)
- OpenAPI/client regeneration: PASS (no endpoint/schema change planned)
- Generated client usage: PASS (WeChat calls already use `WechatLoginService`)
- DB migrations: PASS (no DB changes)
- Tooling discipline: PASS (frontend Biome/TS; Playwright test planned)

## Project Structure

### Documentation (this feature)

```text
specs/008-wechat-login-unavailable/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
backend/
└── app/
  ├── api/
  │   └── routes/
  │       └── wechat_login.py          # existing 403 gating when disabled
  └── core/
    └── config.py                   # reads WECHAT_LOGIN_ENABLED / WeChat credentials

frontend/
└── src/
  ├── routes/
  │   └── login.tsx                   # WeChat button + QR popup entrypoint
  ├── components/
  │   └── Auth/
  │       └── WeChatQrLogin.tsx       # calls WechatLoginService.wechatLoginStart()
  ├── hooks/
  │   └── useCustomToast.ts           # wraps sonner toast API
  └── i18n/
    └── locales/*                   # auth.wechat.* translation keys

frontend/tests/
└── (Playwright)                        # add/extend e2e coverage for disabled toast
```

**Structure Decision**: Web application. Changes are scoped to frontend UI logic (login screen) and reuse existing backend gating behavior.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

N/A (no constitution violations).

## Phase 0 — Outline & Research

Research goals:
- Confirm how “WeChat disabled” is signaled end-to-end (backend status codes; frontend behavior)
- Confirm toast library capabilities for Warning variant and rate limiting
- Align toast copy with existing i18n conventions and existing WeChat error keys

Output: `specs/008-wechat-login-unavailable/research.md`

## Phase 1 — Design & Contracts

Design decisions:
- Source of truth for availability: backend-declared “provider unavailable” state (e.g., 403 when WeChat login is disabled; optionally treat 404 as unavailable if legacy routing exists).
- UI behavior: keep WeChat button visible and clickable; when disabled, show warning toast and do not open QR popup.
- Rate limiting: toast shown at most once per 2 seconds per browser tab.
- Copy: “WeChat login is currently unavailable.” (English locale value).

Contracts:
- No new backend endpoints.
- No changes to existing OpenAPI schemas planned.

Outputs:
- `specs/008-wechat-login-unavailable/data-model.md` (N/A for this feature)
- `specs/008-wechat-login-unavailable/contracts/` (documented as no contract changes)
- `specs/008-wechat-login-unavailable/quickstart.md` (how to verify locally)

Re-check Constitution Check (post-design): expected PASS (no OpenAPI/DB changes).

Status (post-design): PASS

## Phase 2 — Implementation Planning (high level)

1. Frontend behavior
  - Update `frontend/src/routes/login.tsx`:
    - Keep the WeChat button visible even after backend reports disabled.
    - If disabled flag is set, clicking the button shows the warning toast (rate-limited) and does not open the QR popup.
    - If backend reports disabled while QR popup is open (first attempt), close the popup and show the same toast.
  - Update `frontend/src/hooks/useCustomToast.ts` to support Warning toasts (sonner) and add a simple 2-second per-page rate limit option.

2. i18n
  - Reuse existing `auth.wechat.providerUnavailable` key, set English value to exactly “WeChat login is currently unavailable.”

3. Tests
  - Add/extend Playwright test(s) to:
    - Set backend WeChat disabled (`WECHAT_LOGIN_ENABLED=False`) and verify clicking the WeChat button shows the toast and does not open the QR UI.
    - Verify rate limiting (rapid clicks produce at most one toast per ~2s window).

4. Validation
  - Run `npm run lint` and `npm run build` in `frontend/`.
  - Run Playwright e2e for the login page scenario.
