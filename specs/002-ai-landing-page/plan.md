# Implementation Plan: AI Resource Landing Page

**Branch**: `002-ai-landing-page` | **Date**: 2026-01-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-ai-landing-page/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.github/agents/speckit.plan.agent.md` for the execution workflow.

## Summary

Replace the default home page (`/`) with a playful, friendly landing page for the AI Resource Hub featuring:

- Keyword search (partial match over resource title + description)
- AI chat for signed-in users only (with optional “save chat” transcripts)
- Light + dark modes, accessible interactions, and reduced-motion support

Backend changes focus on a small authenticated chat recommendation API and optional saved transcript storage; frontend changes focus on a new `/` route UI using the generated OpenAPI client.

## Technical Context

**Language/Version**: Python >=3.10,<4.0 (backend) + TypeScript (frontend) + Node.js v22 (dev toolchain)

**Primary Dependencies**:
- Backend: FastAPI, SQLModel, Alembic, PostgreSQL, httpx
- Frontend: React, TanStack Router, TanStack Query, Tailwind CSS, shadcn/ui, next-themes, lucide-react

**Storage**:
- PostgreSQL (existing)
- New (this feature): optional saved chat transcripts (user-owned)

**Testing**:
- Backend: pytest
- Frontend E2E: Playwright

**Target Platform**: Web app (Docker Compose local + production-like)

**Project Type**: Web application (separate `backend/` + `frontend/`)

**Performance Goals**:
- Search: return results or empty/error state within 2s for typical queries
- Chat: first response (or clear error) within 5s for signed-in users

**Constraints**:
- No secrets committed; API keys via environment variables only
- Frontend must use generated OpenAPI client (no ad-hoc `fetch`/axios calls)
- OpenAPI must be updated when API changes; client regeneration committed
- Dark mode + reduced motion + keyboard accessibility are required

**Scale/Scope**:
- MVP scope: landing page UI + search wiring + authenticated chat recommendations + optional transcript saving
- Avoid premature search infra (no external search engine in MVP)

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

Status (initial): PASS (plan scope aligns; implementation must maintain these gates)
Status (post-design): PASS (no gate violations required by design)

## Project Structure

### Documentation (this feature)

```text
specs/002-ai-landing-page/
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
│   ├── core/
│   ├── models.py
│   └── crud.py
└── tests/

frontend/
├── src/
│   ├── routes/           # landing page route at '/'
│   ├── components/
│   └── client/           # generated OpenAPI client
└── tests/
```

**Structure Decision**: Web application (`backend/` + `frontend/`) using the existing routing and OpenAPI-generated client.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

## Phase 0: Research (Output)

- [research.md](./research.md) records decisions needed to implement chat recommendations and transcript persistence without violating the constitution.

## Phase 1: Design (Outputs)

- [data-model.md](./data-model.md) defines the saved transcript entities and relationships.
- [contracts/](./contracts/) contains feature-level OpenAPI additions (chat + transcript endpoints).
- [quickstart.md](./quickstart.md) explains how to run and verify landing search + chat locally.

## Phase 2: Planning Notes (High-Level)

Backend:
- Add authenticated chat recommendation endpoint.
- Add optional saved transcript storage and CRUD.
- Update canonical OpenAPI and regenerate frontend client.

Frontend:
- Replace `/` route with landing page UI.
- Wire search to existing resources listing endpoint with `q`.
- Gate chat UI behind sign-in; add “save chat” UX for signed-in users.

Testing:
- Add backend tests for chat endpoints and transcript behavior.
- Add/extend Playwright E2E smoke for landing page search and chat sign-in gating.
