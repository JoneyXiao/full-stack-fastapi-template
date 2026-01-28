# Implementation Plan: WeChat Login

**Branch**: `007-wechat-login` | **Date**: 2026-01-27 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/007-wechat-login/spec.md`

## Summary

Implement WeChat login (WeChat Open Platform “Website Application”) in this repo’s existing auth system.

- Frontend renders an embedded QR login experience (WeChat `wxLogin.js`).
- Backend exchanges `code` server-side, fetches minimal WeChat user profile, links identity, and issues the existing JWT access token.
- Signed-in users can link/unlink WeChat explicitly; automatic merges are not allowed.

Phase outputs produced by this plan:

- Phase 0: [research.md](research.md)
- Phase 1: [data-model.md](data-model.md), [contracts/openapi.wechat-login.yaml](contracts/openapi.wechat-login.yaml), [quickstart.md](quickstart.md)

## Technical Context

**Language/Version**: Python >=3.10 (backend), TypeScript 5.9 (frontend), Node 24 (frontend)
**Primary Dependencies**: FastAPI, SQLModel, Alembic, httpx, PostgreSQL; React, TanStack Router/Query, Vite, Playwright
**Storage**: PostgreSQL
**Testing**: Pytest (backend), Playwright (frontend e2e)
**Target Platform**: Docker Compose local dev; Traefik proxy topology per repo docs
**Project Type**: Web application (backend + frontend) with generated OpenAPI client
**Performance Goals**: Keep QR login UX responsive; target <300ms p95 backend handler time (excluding external WeChat latency)
**Constraints**:
- No secrets committed; WeChat AppSecret via env only.
- Do not log WeChat `code`/tokens or AppSecret.
- Frontend must call backend JSON endpoints via generated client (`frontend/src/client/`).
- OpenAPI must be updated and client regenerated when endpoints are added/changed.
**Scale/Scope**: Typical auth-scale traffic; prioritize security and correctness.

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

**Gate status (pre-research)**: PASS

- Security: token/secret hygiene explicitly required.
- OpenAPI/client: new endpoints require OpenAPI updates + `./scripts/generate-client.sh`.
- DB migrations: adding identity linking requires Alembic migrations committed.

## Project Structure

### Documentation (this feature)

```text
specs/007-wechat-login/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
```text
# Web application (backend + frontend)
backend/
├── app/
│   ├── api/
│   │   ├── main.py
│   │   └── routes/
│   │       ├── login.py
│   │       └── (new) wechat_login.py
│   ├── core/
│   ├── models.py
│   └── crud.py
└── tests/

backend/app/alembic/
└── versions/            # new migrations if schema changes

frontend/
├── src/
│   ├── components/
│   ├── routes/
│   │   ├── login.tsx
│   │   └── (new) wechat-callback.tsx
│   └── client/          # generated OpenAPI client
└── tests/
```

**Structure Decision**: Web application. Backend under `backend/app/`, frontend under `frontend/src/`, with the generated OpenAPI client under `frontend/src/client/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |

## Phase 0: Research

Output: [research.md](research.md)

All clarifications are resolved in the feature spec; research consolidates the external OAuth/provider details needed for implementation.

## Phase 1: Design & Contracts

Outputs:

- Data model: [data-model.md](data-model.md)
- API contract sketch: [contracts/openapi.wechat-login.yaml](contracts/openapi.wechat-login.yaml)
- Developer quickstart: [quickstart.md](quickstart.md)

**Gate status (post-design)**: PASS

## Phase 2: Implementation Plan (stop here for /speckit.plan)

### Backend implementation steps

1. Add env-based configuration for:
  - enable/disable flag
  - WeChat AppID + AppSecret
  - allowed redirect/callback origin(s)
2. Add routes:
  - `POST /api/v1/login/wechat/start`
  - `POST /api/v1/login/wechat/complete`
  - `POST /api/v1/users/me/wechat/link`
  - `DELETE /api/v1/users/me/wechat/link`
3. Implement server-side state storage and one-time `state` validation (anti-replay/CSRF), plus security-relevant attempt recording.
4. Implement server-side calls to WeChat endpoints using `httpx`:
  - exchange `code` for tokens
  - fetch `/sns/userinfo`
  - discard tokens after profile fetch (no persistence)
5. Add schema for `WeChatAccountLink` (see data-model) and an Alembic migration.
6. Update OpenAPI and regenerate `frontend/src/client/`.
7. Add backend tests covering success and failure cases.

### Frontend implementation steps

1. Add “Continue with WeChat” to the existing login route.
2. Call `wechat/start` via generated client to get `state` and rendering params.
3. Load and render embedded QR using the official `wxLogin.js` script.
4. Add a callback route that reads `code/state` and calls `wechat/complete`.
5. Store JWT in localStorage and reuse existing auth state and redirects.

### Validation steps

- Backend: `cd backend && uv run bash scripts/lint.sh` and `uv run bash scripts/tests-start.sh`
- Frontend: `cd frontend && npm run lint && npm run build`
- Client generation: `./scripts/generate-client.sh` after OpenAPI updates
