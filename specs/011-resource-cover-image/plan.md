# Implementation Plan: Resource Submission Cover Images

**Branch**: `011-resource-cover-image` | **Date**: 2026-02-06 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/011-resource-cover-image/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.github/agents/speckit.plan.agent.md` for the execution workflow.

## Summary

Add a cover image to resource submissions so submission cards match the Resources page UI in both grid and list views, including status badges (pending/approved/rejected). Reuse the already-implemented Resource image system (validation, processing, mutual exclusivity between upload and external URL) and extend it to `ResourceSubmission`, including a versioned image-serving endpoint and approval carry-over (submission → published Resource).

## Technical Context

**Language/Version**: Python (>=3.10,<4.0) backend; TypeScript (Node 24) frontend
**Primary Dependencies**:
- Backend: FastAPI, SQLModel, Alembic, Pillow
- Frontend: React, Vite, TanStack Router/Query, Tailwind, shadcn/ui
**Storage**: PostgreSQL for metadata + filesystem for processed images under `/app/data/uploads/**`
**Testing**: Pytest (backend), Playwright (frontend E2E)
**Target Platform**: Docker Compose local/prod-like; Linux containers
**Project Type**: Web application (backend + frontend)
**Performance Goals**: No new performance targets; keep image processing bounded by existing limits (5MB, max dimension 4096) and keep list endpoints paginated.
**Constraints**: Must preserve generated-client discipline; DB changes require Alembic migrations; external image URLs are not proxied by backend.
**Scale/Scope**: Small-to-medium feature; touches submission create/list/detail + image upload and approval flow.

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

Status: PASS (planned)

- OpenAPI: submission schemas/endpoints will change → regenerate `frontend/src/client/` as part of implementation.
- DB: `ResourceSubmission` table will gain image fields → Alembic migration required.
- Frontend: all backend calls will use generated client (SubmissionsService).

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
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
└── app/
   ├── api/
   │   └── routes/
   │       ├── resources.py
   │       ├── resource_images.py
   │       └── submissions.py
   ├── core/
   │   └── config.py
   ├── models.py
   └── utils.py

frontend/
└── src/
   ├── components/
   │   └── Resources/          # reference for grid/list card visuals
   ├── routes/
   │   └── _layout/
   │       ├── submissions/    # submission listing + create flow
   │       └── resources/      # reference behavior
   └── client/                 # generated OpenAPI client
```

**Structure Decision**: Web application; implement backend changes under `backend/app/**` and frontend changes under `frontend/src/**`, using the generated client in `frontend/src/client/**`.

## Phase 0: Research (complete)

Outputs:
- [research.md](research.md)

Key outcomes:
- Submission cover image behavior matches Admin resource image editing: upload or external URL, mutually exclusive.
- Validation constraints are identical to existing resource images.
- Approval carries over the submission cover image to the published Resource.
- Submissions listing UX is “my submissions” (users don’t browse others’ submissions).

## Phase 1: Design & Contracts (complete)

Outputs:
- [data-model.md](data-model.md)
- [contracts/openapi.yaml](contracts/openapi.yaml)
- [quickstart.md](quickstart.md)

Design highlights:
- Extend `ResourceSubmission` with image fields parallel to `Resource` image fields.
- Add submission image upload/clear endpoints and a versioned submission image serving endpoint.
- Ensure API responses include `image_url` to keep frontend rendering symmetrical with resources.

## Phase 2: Implementation Plan (work breakdown)

1. **Backend: schema + migration**
  - Add submission image fields to `ResourceSubmission` model.
  - Create Alembic migration for new columns.

2. **Backend: submission image handling**
  - Add submission image validation + processing reuse (existing resource image validator).
  - Add filesystem save/delete helpers for submission images (parallel to resource images).
  - Add versioned submission image serving endpoint.

3. **Backend: submission endpoints + OpenAPI**
  - Extend submission create/update to accept optional `image_external_url`.
  - Add endpoints: upload cover image, clear cover image.
  - Adjust listing behavior to align to clarified UX:
    - “My submissions” uses `/submissions/mine`.
    - Admin list remains available for admin workflows.

4. **Backend: approval carry-over**
  - On approve, copy cover image to the created Resource (external URL or uploaded file).

5. **Frontend: submission create flow**
  - Add cover image input to the new submission page mirroring Admin UX (upload + external URL + preview + hints).
  - Ensure mutual exclusivity semantics are clear in UI text.

6. **Frontend: submission listings in grid/list modes**
  - Update submissions page to show “My submissions” across statuses.
  - Implement grid/list toggle and card visuals consistent with Resources page.
  - Display status badges for all statuses.

7. **Generated client + tests**
  - Regenerate OpenAPI client after backend schema/route changes.
  - Add/adjust backend tests for image endpoints and approval carry-over.
  - Add/adjust Playwright coverage for submission with image.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
