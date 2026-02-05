# Implementation Plan: Resources View Redesign

**Branch**: `010-resources-view-redesign` | **Date**: 2026-02-04 | **Spec**: [specs/010-resources-view-redesign/spec.md](spec.md)
**Input**: Feature specification from `/specs/010-resources-view-redesign/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.github/agents/speckit.plan.agent.md` for the execution workflow.

## Summary

Redesign the Resources list page to (1) show a representative image per resource in Grid view (uploaded image or external image URL), (2) display likes count in both Grid and List (“Trends”) views, and (3) make destination URLs clickable in List view (hostname label). This requires extending the backend resource list response with `likes_count` and image fields, adding admin image management endpoints, and regenerating the frontend OpenAPI client.

## Technical Context
**Language/Version**: Backend Python >=3.10; Frontend TypeScript (repo uses TypeScript 5.9.x).
**Primary Dependencies**: FastAPI, SQLModel, Alembic, PostgreSQL; React, TanStack Router/Query, shadcn/ui; OpenAPI client generated via `@hey-api/openapi-ts`.
**Storage**: PostgreSQL for resource metadata; filesystem (Docker volume) for uploaded images (new resource image storage, patterned after avatar storage).
**Testing**: Backend pytest + coverage; backend ruff + strict mypy; frontend biome + TypeScript build; Playwright E2E present.
**Target Platform**: Docker Compose local dev + Linux container runtime; modern browsers.
**Project Type**: Web application (FastAPI backend + React frontend).
**Performance Goals**: Keep resources list performant and avoid per-row detail fetches (no N+1 HTTP on list).
**Constraints**: Must keep OpenAPI accurate and regenerate/commit the frontend client on contract changes; DB changes require Alembic migrations; frontend must use generated client.
**Scale/Scope**: Paginated resources list; images are optional and nullable; external image URLs must not trigger backend outbound fetches.

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

Gate status (pre-research): PASS (no violations required)

Gate status (post-design): PASS (design includes OpenAPI updates + client regeneration, and Alembic migration for DB changes).

## Project Structure

### Documentation (this feature)

```text
specs/010-resources-view-redesign/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
- Backend entrypoint: `backend/app/main.py`
- Backend settings/env: `backend/app/core/config.py`
- DB models (SQLModel) + schemas: `backend/app/models.py`
- CRUD layer: `backend/app/crud.py`
- API routers: `backend/app/api/routes/*.py` (notably `resources.py` and new `resource_images.py`)
- Router mounting: `backend/app/api/main.py`
- Migrations: `backend/app/alembic/versions/`
- Backend tests: `backend/tests/`

- Frontend routes: `frontend/src/routes/_layout/resources/index.tsx` and `frontend/src/routes/_layout/admin.tsx`
- Frontend reusable components: `frontend/src/components/`
- Generated API client (do not hand-edit): `frontend/src/client/`

**Structure Decision**: Web application structure (backend + frontend) using the existing repository layout.

## Complexity Tracking
| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

No constitution violations required for this feature.

## Phase 0: Research (Complete)

- Output: [specs/010-resources-view-redesign/research.md](research.md)
- Key outcomes:
  - Uploaded images follow the existing avatar pattern (filesystem + versioned immutable URL).
  - External image URLs are stored and returned; backend does not proxy/fetch.
  - List endpoints must include `likes_count` to support the redesigned views.

## Phase 1: Design & Contracts (Complete)

- Data model: [specs/010-resources-view-redesign/data-model.md](data-model.md)
- Feature contract: [specs/010-resources-view-redesign/contracts/openapi.yaml](contracts/openapi.yaml)
- Runbook: [specs/010-resources-view-redesign/quickstart.md](quickstart.md)

### Backend design

- Extend `Resource` (DB) with nullable image metadata + optional external image URL.
- Add a public serving endpoint for uploaded resource images with versioned URLs (cache-busting via version).
- Add admin endpoints for:
  - uploading/replacing an uploaded resource image (multipart)
  - clearing the resource image (and deleting the stored file best-effort)
  - setting an external image URL via the existing update flow (and clearing uploaded metadata/files)
- Extend list responses to include `likes_count` and computed `image_url`.

### Frontend design

- Redesign [frontend/src/routes/_layout/resources/index.tsx](../../frontend/src/routes/_layout/resources/index.tsx):
  - Grid view displays `image_url` (or fallback), category badge next to created date, likes count in place of “View details”, and horizontal alignment between header/content.
  - List view changes “Actions” → “Trends” with likes count, and renders destination hostname as a clickable link.
- Extend admin UI (likely [frontend/src/routes/_layout/admin.tsx](../../frontend/src/routes/_layout/admin.tsx)) to support setting/removing resource images (upload or external URL) while enforcing mutual exclusivity.

## Phase 2: Implementation Plan (Ready)

1) **Backend: DB + models**
  - Add new `Resource` columns for image metadata + external URL.
  - Create Alembic migration and verify `upgrade head` works.

2) **Backend: public image serving**
  - Implement `GET /resource-images/{resource_id}/{version}.{ext}` (mirrors avatar endpoint semantics and caching headers).

3) **Backend: admin image management**
  - Add `POST /resources/{id}/image-upload` (multipart upload).
  - Add `DELETE /resources/{id}/image` (clears both sources).
  - Update create/update schemas to accept `image_external_url` and enforce mutual exclusivity.

4) **Backend: list response enrichment**
  - Extend list query/response to include `likes_count` per item.
  - Add computed `image_url` to list items and detail responses.

5) **OpenAPI + generated client**
  - Ensure backend OpenAPI reflects schema/endpoint changes.
  - Run `./scripts/generate-client.sh` and commit changes under `frontend/src/client/`.

6) **Frontend: resources page redesign**
  - Implement Grid/List UI changes per spec.

7) **Frontend: admin image controls**
  - Add UI controls for upload/external URL, using generated client for new endpoints.
  - Enforce mutually exclusive selection in the UI.

8) **Tests & quality gates**
  - Backend: add/update tests covering list response fields and image endpoints.
  - Frontend: update/add Playwright smoke assertions for resources list rendering (optional but recommended).
  - Run repo lint/typecheck/test scripts noted in quickstart.
