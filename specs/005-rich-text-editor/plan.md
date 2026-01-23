# Implementation Plan: Rich Text Editor for Submission Descriptions

**Branch**: `005-rich-text-editor` | **Date**: 2026-01-23 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from [spec.md](spec.md)

## Summary

Replace the plain textarea on the new submission page with a GitHub-style Markdown editor (toolbar + preview), persist Markdown text in the existing `ResourceSubmission.description` field, enforce the clarified 10,000 character limit, and render Markdown consistently across views (admin list + detail) while explicitly not rendering raw HTML.

HTML tags in user input must be displayed as escaped literal text (not interpreted).

Research and design outputs:

- Phase 0: [research.md](research.md)
- Phase 1: [data-model.md](data-model.md), [contracts/submissions.openapi.yaml](contracts/submissions.openapi.yaml), [quickstart.md](quickstart.md)

## Technical Context

**Language/Version**: Backend Python `>=3.10,<4.0` (ruff target-version `py310`); Frontend TypeScript `^5.9.3` + React `^19.x`
**Primary Dependencies**: Backend FastAPI + SQLModel + Alembic; Frontend React + TanStack Router/Query + shadcn/ui (Radix) + Vite + Tailwind; Proposed (new) `@uiw/react-md-editor`, `react-markdown`, `remark-gfm`
**Storage**: PostgreSQL (Docker Compose)
**Testing**: Backend pytest; Frontend Playwright; Quality gates: ruff+mypy and biome+tsc
**Target Platform**: Docker Compose local dev; modern browsers
**Project Type**: Web application (FastAPI backend + React frontend)
**Performance Goals**: Responsive editing and preview for descriptions up to 10,000 characters
**Constraints**: No raw HTML rendering; links open in a new tab/window; generated client required for backend calls
**Scale/Scope**: Limited to replacing the description editor on the “new submission” page and rendering Markdown wherever submission descriptions are displayed

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Status: **PASS (expected)**

- Security/secret hygiene preserved: **PASS** (no secrets involved)
- OpenAPI accuracy + regenerated client if changed: **REQUIRED** (description max length change will update schema)
- Frontend uses generated client: **PASS** (no new direct calls planned)
- DB change discipline: **REQUIRED** (increase `description` max length → Alembic migration)
- Tooling discipline: **PASS** (keep ruff/mypy + biome/tsc green)
- Backend deps via `uv`: **PASS** (no backend deps expected)
- Pre-commit hooks: **PASS (expected)**
- Tests updated: **REQUIRED** (at least one focused frontend test and/or backend validation test)
- CI expected to pass: **PASS (expected)**

## Project Structure

### Documentation (this feature)

```text
specs/005-rich-text-editor/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── submissions.openapi.yaml
└── tasks.md             # produced later by /speckit.tasks
```

### Source Code (repository root)

```text
backend/
└── app/
   ├── models.py
   ├── api/routes/submissions.py
   └── alembic/versions/   # new migration

frontend/
└── src/
   ├── routes/_layout/submissions/new.tsx
   ├── routes/_layout/admin.tsx
   ├── routes/_layout/submissions/$submissionId.tsx   # if present (rendering)
   └── components/
      └── [new] markdown/   # editor + renderer wrappers
```

**Structure Decision**: Use the existing `frontend/` + `backend/` web-app structure; add small reusable components under `frontend/src/components/` to avoid duplicating Markdown rendering logic.

## Phase 0: Research (complete)

Output: [research.md](research.md)

Key outcomes:

- Choose a Markdown editor component (`@uiw/react-md-editor`) to match GitHub-style UX.
- Render with `react-markdown` + `remark-gfm` while skipping raw HTML.
- Sanitize URLs and force link target behavior.

## Phase 1: Design & Contracts (complete)

Outputs:

- Data model: [data-model.md](data-model.md)
- API contract excerpt: [contracts/submissions.openapi.yaml](contracts/submissions.openapi.yaml)
- Quickstart: [quickstart.md](quickstart.md)

Design notes:

- Storage remains Markdown text in `ResourceSubmission.description`.
- Rendering is unified across all description display surfaces (admin list + detail).

### Constitution Re-check (post-design)

Status: **PASS (with required implementation follow-through)**

- Migration required: **YES** (increase max length)
- OpenAPI/client regeneration required: **YES**

## Phase 2: Implementation Plan (outline)

1. Backend
  - Increase `description` `max_length` to 10,000 for submission schemas and table.
  - Add Alembic migration to widen the DB column.
  - Verify OpenAPI reflects `maxLength: 10000`.
2. Frontend
  - Replace textarea in the new submission page with the Markdown editor.
  - Add a shared Markdown renderer wrapper (no raw HTML, safe URLs, links open new tab).
  - Render descriptions using the wrapper in admin list and submission detail.
  - Add UI feedback for length limit.
3. Contracts
  - Regenerate OpenAPI client: `./scripts/generate-client.sh` and commit `frontend/src/client/`.
4. Tests
  - Add/adjust Playwright coverage for formatted descriptions rendering safely.
  - Add backend test if needed for max-length validation.
5. Quality gates
  - Backend: `cd backend && uv run bash scripts/lint.sh && uv run bash scripts/tests-start.sh`
  - Frontend: `cd frontend && npm run lint && npm run build`
