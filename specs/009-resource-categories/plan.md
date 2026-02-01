# Implementation Plan: Resource Categories Management

**Branch**: `009-resource-categories` | **Date**: 2026-02-01 | **Spec**: `specs/009-resource-categories/spec.md`
**Input**: Feature specification from `specs/009-resource-categories/spec.md`

## Summary

Implement database-driven resource categories with an admin CRUD UI and safeguards preventing deletion of categories that are in use (by any resource or any submission, including pending). This replaces the current hard-coded “resource type” lists and the backend `type: string` fields with references to a `Category` entity, updates API contracts, regenerates the frontend client, and updates UI flows for resources filtering and submissions.

## Technical Context

**Language/Version**: Python >=3.10 (backend), TypeScript (frontend)
**Primary Dependencies**: FastAPI, SQLModel, Alembic, PostgreSQL, React, TanStack Router/Query, shadcn/ui, @hey-api/openapi-ts (generated client)
**Storage**: PostgreSQL
**Testing**: Pytest (backend), Playwright + TypeScript build/typecheck + Biome (frontend)
**Target Platform**: Docker Compose (local) + Linux containers
**Project Type**: web
**Performance Goals**: Standard CRUD performance; category usage checks must be index-backed.
**Constraints**: OpenAPI/client regeneration required; DB changes require Alembic migrations; avoid logging sensitive data.
**Scale/Scope**: Admin CRUD + resource/submission linkage; expected small-to-medium data volumes.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Security/secret hygiene preserved: PASS (no secrets required)
- OpenAPI accurate + regenerate client: PASS (planned)
- Frontend uses generated client: PASS (planned)
- DB schema changes include Alembic migrations: PASS (planned)
- Tooling discipline preserved: PASS (planned)
- Backend dependency changes use `uv`: PASS (no new deps planned)
- Pre-commit hooks expected to pass: PASS (planned)
- Tests updated or omission justified: PASS (planned)
- CI checks expected to pass: PASS (planned)

## Project Structure

### Documentation (this feature)

```text
specs/009-resource-categories/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── categories.openapi.yaml
│   └── resources-submissions.openapi.patch.md
└── tasks.md             # (to be created by /speckit.tasks)
```

### Source Code (repository root)

```text
backend/
├── app/
│   ├── models.py                  # add Category model + replace Resource/Submission type -> category
│   ├── crud.py                    # category CRUD helpers + usage checks
│   └── api/
│       └── routes/
│           ├── resources.py        # filter by category; request/response updates
│           ├── submissions.py      # request/response updates
│           └── categories.py       # (new) category CRUD endpoints
└── app/alembic/versions/           # migration(s) for categories and FK backfill

frontend/
├── src/
│   ├── client/                     # regenerated
│   ├── routes/
│   │   ├── _layout/admin.tsx        # add Categories admin UI
│   │   ├── _layout/resources/       # replace hard-coded types with fetched categories
│   │   └── _layout/submissions/     # submission form uses categories
│   └── components/                 # admin categories components if needed
└── tests/                           # Playwright coverage additions/updates
```

**Structure Decision**: Use the existing backend/frontend split and implement category management as a new API router plus an admin UI section integrated into the existing Admin page.

## Complexity Tracking

No constitution violations are required for this feature.

## Phase 0: Outline & Research (complete)

Artifacts:
- `specs/009-resource-categories/research.md`

Key outcomes:
- Categories are DB-driven records
- “In use” includes resources and submissions (including pending)
- Use DB FK constraints + app-level friendly checks/messages
- Prefer expand/contract migration strategy
- Case-insensitive uniqueness required

## Phase 1: Design & Contracts (complete)

Artifacts:
- `specs/009-resource-categories/data-model.md`
- `specs/009-resource-categories/contracts/categories.openapi.yaml`
- `specs/009-resource-categories/contracts/resources-submissions.openapi.patch.md`
- `specs/009-resource-categories/quickstart.md`

Design notes:
- Introduce `Category` table; add `category_id` FK on resources and submissions.
- Uniqueness is case-insensitive; enforce at DB layer (unique index on `lower(name)`) and validate at API layer.
- Delete endpoint returns `409` on “in use” and on duplicate name conflicts.
- Public UI uses `GET /categories` (no usage data); admin UI uses a dedicated admin list endpoint (e.g., `GET /categories/admin`) to include usage.

## Constitution Check (post-design)

PASS: Design maintains OpenAPI accuracy requirements, uses generated client, and includes migrations.

## Phase 2: Implementation Plan (ready)

### Backend

1. Add `Category` model and API schemas in `backend/app/models.py`.
2. Add Alembic migration(s):
   - Create categories table
   - Add nullable `category_id` columns to `resource` and `resourcesubmission`
   - Backfill categories from existing distinct `type` strings and populate `category_id`
   - Add FK constraints (`ON DELETE RESTRICT`) and indexes on `category_id`
   - (Later/contract) drop legacy `type` columns after code switch
3. Update resource/submission endpoints:
   - Add `category_id` as the primary field and keep legacy `type` temporarily as a deprecated compatibility field during rollout
   - Prefer resources list filter `category_id`, but temporarily support `type` as a backwards-compatible alias
   - Prefer submission create/update field `category_id`, but temporarily accept legacy `type` and map it to a category by case-insensitive match on category name; if no match, return 400
4. Add category endpoints:
   - Public list
   - Admin create/rename/delete with safeguards + clear `409` messages
5. Tests:
   - Backend tests for category CRUD, case-insensitive uniqueness, and delete-in-use behavior

### OpenAPI + Client

1. Ensure FastAPI OpenAPI reflects new schemas/endpoints.
   - Document the temporary compatibility behavior (legacy `type` accepted/optionally returned) to minimize breaking changes.
2. Run `./scripts/generate-client.sh` and commit regenerated `frontend/src/client/`.

### Frontend

1. Replace hard-coded `RESOURCE_TYPES` usage with fetched categories.
2. Update Resources list filtering to use category IDs.
3. Update submission form to select category.
4. Add Categories admin UI screen (prefer a new tab in `/_layout/admin`) with:
   - list + create + rename + delete
   - invalidation on mutation success
   - friendly handling of `409` conflict responses

### E2E / QA

1. Update/add Playwright coverage for:
   - Admin category CRUD flows
   - Deletion blocked when category is used by a submission
   - Resources filter uses categories
### Backend
