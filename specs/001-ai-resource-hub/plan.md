# Implementation Plan: AI Resource Hub

**Branch**: `001-ai-resource-hub` | **Date**: 2026-01-05 | **Spec**: [specs/001-ai-resource-hub/spec.md](spec.md)
**Input**: Feature specification from `specs/001-ai-resource-hub/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.github/agents/speckit.plan.agent.md` for the execution workflow.

## Summary

Build a modern AI resource hub:
- Admins manage published resources (CRUD).
- Visitors browse/search and view resource details.
- Registered users like/favorite/comment.
- Registered users submit new resources for review; submissions are visible only to signed-in users; submitters can edit while pending; admins approve/reject.

Implementation: add SQLModel entities + Alembic migrations, implement new FastAPI routes under `/api/v1`, keep OpenAPI accurate and regenerate the frontend client, then build frontend views using the generated client.

## Technical Context

**Language/Version**: Python >=3.10,<4.0 (backend), TypeScript (frontend)
**Primary Dependencies**: FastAPI, SQLModel, Alembic, PostgreSQL; React, TanStack Router/Query, Vite, Tailwind, shadcn/ui
**Storage**: PostgreSQL (SQLModel + Alembic migrations)
**Testing**: Pytest (backend), Playwright (frontend E2E)
**Target Platform**: Docker Compose; API served under `/api/v1`
**Project Type**: web
**Performance Goals**: list/search endpoints respond within 2s under typical dev dataset sizes
**Constraints**: frontend uses generated OpenAPI client; keep OpenAPI accurate; commit migrations for schema changes
**Scale/Scope**: MVP targets ~10k resources and ~100k reactions/comments

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

## Project Structure

### Documentation (this feature)

```text
specs/001-ai-resource-hub/
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
│   │   ├── main.py
│   │   └── routes/
│   │       ├── items.py
│   │       ├── login.py
│   │       ├── users.py
│   │       ├── utils.py
│   │       ├── resources.py            # NEW
│   │       ├── submissions.py          # NEW
│   │       └── comments.py             # NEW (shared comment edit/delete)
│   ├── core/
│   ├── models.py                       # extend with new models/schemas
│   └── crud.py                         # extend with new CRUD
└── tests/

backend/app/alembic/versions/           # NEW migrations

frontend/
├── src/
│   ├── routes/
│   │   ├── resources/                  # NEW (public)
│   │   │   ├── index.tsx
│   │   │   └── $resourceId.tsx
│   │   └── _layout/
│   │       ├── submissions/            # NEW (auth-only)
│   │       │   ├── index.tsx
│   │       │   ├── new.tsx
│   │       │   └── $submissionId.tsx
│   │       ├── favorites.tsx           # NEW (auth-only)
│   │       └── admin.tsx               # EXTEND (resources + submission review)
│   └── client/                         # generated OpenAPI client
└── tests/
```

**Structure Decision**: Web application structure (existing `backend/app` + `frontend/src`).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

## Phase 0: Research

- Output: [specs/001-ai-resource-hub/research.md](research.md)

## Phase 1: Design & Contracts

- Data model: [specs/001-ai-resource-hub/data-model.md](data-model.md)
- Contracts: [specs/001-ai-resource-hub/contracts/openapi.yaml](contracts/openapi.yaml)
- Quickstart: [specs/001-ai-resource-hub/quickstart.md](quickstart.md)

## Constitution Check (Post-Design)

- Pass: Design respects generated-client discipline, migrations discipline, and route conventions.
- Reminder gates for implementation: commit Alembic migrations, keep `/api/v1/openapi.json` accurate, regenerate and commit `frontend/src/client/`, and update/add tests for new behavior.

## Agent Context Update

- Run: `.specify/scripts/bash/update-agent-context.sh copilot`
- Expected output file: `.github/agents/copilot-instructions.md`
