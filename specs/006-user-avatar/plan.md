# Implementation Plan: User Avatar Upload

**Branch**: `006-user-avatar` | **Date**: 2026-01-24 | **Spec**: [specs/006-user-avatar/spec.md](specs/006-user-avatar/spec.md)
**Input**: Feature specification from `/specs/006-user-avatar/spec.md`

## Summary

Implement Settings-page avatar upload with client-side processing (center-crop square, downscale to 512×512, flatten transparency to white, encode WebP with JPEG fallback) and server-side validation + normalization. Store avatar bytes on a durable filesystem volume and serve avatars publicly via versioned URLs with immutable caching.

## Technical Context

**Language/Version**: Backend Python `>=3.10`; Frontend TypeScript (React) on Node `24`

**Primary Dependencies**:
- Backend: FastAPI, SQLModel, Alembic, Postgres, `python-multipart`
- Frontend: React, TanStack Router/Query, shadcn/ui, generated OpenAPI client (`frontend/src/client/`)

**Storage**:
- Postgres for user metadata + rate limiting
- Filesystem (Docker volume) for avatar image bytes

**Testing**:
- Backend: Pytest
- Frontend: Playwright E2E

**Target Platform**:
- Docker Compose with Traefik (local + production-like)

**Project Type**: Web application (FastAPI backend + React frontend)

**Performance Goals**:
- Public avatar GET is cacheable (versioned URL, immutable caching)
- Old avatar stops showing quickly by switching to a new versioned URL

**Constraints**:
- No secrets committed
- OpenAPI changes require regenerating the frontend client
- DB schema changes require Alembic migrations

**Scale/Scope**:
- One avatar per user; read traffic dominated by cached requests

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

**Gate status**: PASS (plan includes migrations, contract updates + client regeneration, and tests)

## Project Structure

### Documentation (this feature)

```text
specs/006-user-avatar/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── avatar.openapi.yaml
└── tasks.md             # Created by /speckit.tasks
```

### Source Code (repository root)

```text
backend/
├── app/
│   ├── api/
│   │   ├── main.py
│   │   └── routes/
│   │       ├── users.py            # add /users/me/avatar
│   │       └── avatars.py          # new public avatar route
│   ├── core/
│   │   └── config.py               # avatar storage settings
│   ├── models.py                   # User avatar fields + rate limit model
│   └── crud.py                     # avatar + rate-limit helpers
└── tests/
    └── api/
        └── routes/
            └── test_avatars.py     # new

frontend/
├── src/
│   ├── components/
│   │   └── UserSettings/           # add Avatar section
│   ├── routes/
│   │   └── _layout/settings.tsx    # existing Settings page tabs
│   └── client/                     # regenerated OpenAPI client
└── tests/
    └── user-settings.spec.ts       # extend avatar coverage
```

**Structure Decision**: Web application (use existing `backend/` + `frontend/` structure).

## Complexity Tracking

No constitutional violations expected for this feature.

## Phase 0: Research (complete)

Artifact: [specs/006-user-avatar/research.md](specs/006-user-avatar/research.md)

Adopted decisions:
- Filesystem avatar storage on a Docker volume; DB stores metadata
- Public avatar serving uses versioned URLs + immutable caching
- Server validates and re-encodes uploads; do not trust client output
- Client-side Canvas pipeline provides preview + reduces bandwidth
- Rate limiting implemented with Postgres-backed atomic updates

## Phase 1: Design & Contracts (complete)

Artifacts:
- [specs/006-user-avatar/data-model.md](specs/006-user-avatar/data-model.md)
- [specs/006-user-avatar/contracts/avatar.openapi.yaml](specs/006-user-avatar/contracts/avatar.openapi.yaml)
- [specs/006-user-avatar/quickstart.md](specs/006-user-avatar/quickstart.md)

Design notes:
- Add avatar metadata to `User` (key, version, content-type, updated-at)
- Add a DB-backed rate limit table (10 attempts/hour/user)
- Add authenticated endpoints to upload/remove avatar
- Add public endpoint to fetch avatar bytes by `user_id` + `version` + `ext`
- Extend `UserPublic` with `avatar_url` + `avatar_version` so the frontend updates immediately

## Phase 2: Implementation Plan (high level)

Backend
- Models + migration: add User avatar fields; add avatar rate-limit table.
- Settings: add avatar storage directory configuration.
- Upload endpoint:
  - Authenticate current user
  - Enforce max file size and decode validity
  - Normalize and re-encode output (WebP preferred; JPEG fallback)
  - Atomic file write in avatar storage
  - Increment `avatar_version` and return updated `UserPublic`.
- Delete endpoint:
  - Remove avatar metadata, increment version, delete stored files best-effort.
- Public GET endpoint:
  - Serve `FileResponse` with `Cache-Control: public, max-age=31536000, immutable` and `X-Content-Type-Options: nosniff`.

Frontend
- Add avatar UI to Settings (upload, preview, save, remove).
- Implement client-side processing: crop/downscale/flatten + WebP/JPEG fallback.
- Use generated OpenAPI client for upload/remove calls.

Contract & Client
- Update backend OpenAPI.
- Regenerate frontend client via `./scripts/generate-client.sh`.

Compose parity
- Add a Docker volume for avatar storage and mount it into the backend container.

Testing
- Backend pytest: validation errors, rate limiting, and avatar GET headers.
- Frontend Playwright: upload/preview/save/remove flow in Settings.

## Constitution Check (post-design)

- Secrets: No secrets introduced.
- OpenAPI: Contract changes require regeneration of `frontend/src/client/`.
- DB: Alembic migration required.
- Tooling: ruff/mypy/biome/tsc remain mandatory.
- Tests: pytest + Playwright additions planned.
