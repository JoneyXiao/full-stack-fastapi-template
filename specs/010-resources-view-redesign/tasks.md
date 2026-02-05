---
description: "Executable task list for implementing 010-resources-view-redesign"
---

# Tasks: Resources View Redesign

**Input**: Design docs in `specs/010-resources-view-redesign/` (plan.md, spec.md, research.md, data-model.md, contracts/openapi.yaml, quickstart.md)

## Phase 1: Setup (Shared)

- [X] T001 Review feature runbook and gates in specs/010-resources-view-redesign/quickstart.md
- [X] T002 [P] Verify .env.example documents RESOURCE_IMAGE_STORAGE_PATH and aligns with backend defaults

---

## Phase 2: Foundational (Blocking prerequisites)

**Purpose**: Backend contract + data model changes required by US1/US2/US3.

- [X] T003 [P] Add resource image settings to backend/app/core/config.py (RESOURCE_IMAGE_STORAGE_PATH, max sizes/types)
- [X] T004 Add Docker Compose volume + env wiring for RESOURCE_IMAGE_STORAGE_PATH in docker-compose.yml (prestart + backend + named volume)
- [X] T005 [P] Extend Resource models/schemas in backend/app/models.py (DB columns + ResourceCreate/ResourceUpdate.image_external_url + ResourcePublic.likes_count/image_url)
- [X] T006 Create Alembic migration in backend/app/alembic/versions/ for new Resource image columns
- [X] T007 Update list response shaping in backend/app/api/routes/resources.py to return likes_count and image_url in ResourcePublic items
- [X] T008 Update detail response shaping in backend/app/api/routes/resources.py to include image_url in ResourceDetailPublic
- [X] T009 Enforce mutual exclusivity when setting image_external_url in backend/app/api/routes/resources.py (clear uploaded metadata fields)
- [X] T010 Add backend validation for image_external_url on create/update (http/https only, max length; reject unsafe schemes) in backend/app/models.py and/or backend/app/api/routes/resources.py
- [X] T011 Add backend tests for invalid image_external_url in backend/tests/api/routes/test_resources.py (assert 400 + clear error)
- [X] T012 Regenerate OpenAPI client after Phase 2 schema/contract changes (likes_count/image_url fields) via scripts/generate-client.sh
- [X] T013 Update backend tests in backend/tests/api/routes/test_resources.py to assert likes_count (present, default 0) + image_url are present on list/detail responses
- [X] T014 Add backend test coverage for likes_count aggregation in backend/tests/api/routes/test_resources.py (create Like rows and assert counts)

**Checkpoint**: Resources list API returns `likes_count` and `image_url`; client is regenerated; backend tests pass.

---

## Phase 3: User Story 1 - Browse resources in a visual grid (Priority: P1)

**Goal**: Grid cards show resource image (or fallback), category badge next to created date, likes count in place of “View details”, and horizontal media/text alignment.

**Independent Test**: Open `/resources`, switch to Grid view, verify image/fallback, metadata placement, likes count display-only, and horizontal alignment at multiple screen widths.

- [X] T015 [US1] Create grid card component with horizontal layout in frontend/src/components/Resources/ResourceGridCard.tsx
- [X] T016 [US1] Render image_url (with onError fallback) in frontend/src/components/Resources/ResourceGridCard.tsx
- [X] T017 [US1] Move category badge next to created_at in frontend/src/components/Resources/ResourceGridCard.tsx
- [X] T018 [US1] Replace "View details" summary area with likes_count display in frontend/src/components/Resources/ResourceGridCard.tsx
- [X] T019 [US1] Wire ResourceGridCard into frontend/src/routes/_layout/resources/index.tsx Grid rendering path

---

## Phase 4: User Story 2 - Compare resources in a sortable list (Priority: P2)

**Goal**: List view shows a “Trends” (likes) column and renders destination URL as a hostname-labeled link.

**Independent Test**: Switch to List view and verify the “Trends” header, likes counts (display-only), and hostname links open in a new tab.

- [X] T020 [US2] Create list table component in frontend/src/components/Resources/ResourcesTable.tsx
- [X] T021 [US2] Rename "Actions" → "Trends" and display likes_count in frontend/src/components/Resources/ResourcesTable.tsx
- [X] T022 [US2] Render destination_url as hostname link (target=_blank, rel=noopener) in frontend/src/components/Resources/ResourcesTable.tsx
- [X] T023 [US2] Render non-link placeholder when destination_url is missing/invalid in frontend/src/components/Resources/ResourcesTable.tsx
- [X] T024 [US2] Wire ResourcesTable into frontend/src/routes/_layout/resources/index.tsx List rendering path

---

## Phase 5: User Story 3 - Provide an image for a resource (Priority: P3)

**Goal**: Admins can set a resource image via upload or external URL (mutually exclusive) and clear images.

**Independent Test**: In admin UI, set an external image URL and confirm it renders in Grid; upload an image and confirm it replaces external; clear image and confirm fallback.

### Backend (image upload + serving)

- [X] T025 [P] [US3] Add resource image processing helpers to backend/app/utils.py (validate/process/save/delete) using RESOURCE_IMAGE_* settings
- [X] T026 [P] [US3] Add public resource image serving router backend/app/api/routes/resource_images.py (GET /resource-images/{resource_id}/{version}.{ext})
- [X] T027 [US3] Mount resource images router in backend/app/api/main.py via include_router(..., prefix="/resource-images", tags=["resource-images"])
- [X] T028 [US3] Add image URL helper and include uploaded-image URL in image_url computation in backend/app/api/routes/resources.py
- [X] T029 [US3] Add admin upload endpoint POST /resources/{id}/image-upload in backend/app/api/routes/resources.py (multipart UploadFile)
- [X] T030 [US3] Add admin clear endpoint DELETE /resources/{id}/image in backend/app/api/routes/resources.py (clears both sources)
- [X] T031 [US3] Enforce mutual exclusivity for upload path in backend/app/api/routes/resources.py (upload clears image_external_url)
- [X] T032 [US3] Regenerate OpenAPI client after US3 new endpoints (upload/clear/serve image) via scripts/generate-client.sh
- [X] T033 [US3] Add backend tests for resource image upload/clear in backend/tests/api/routes/test_resources.py
- [X] T034 [US3] Add backend tests for public image serving in backend/tests/api/routes/test_resource_images.py

### Frontend (admin image controls)

- [X] T035 [US3] Add resource image controls to admin UI in frontend/src/routes/_layout/admin.tsx (upload, external URL, clear; enforce mutual exclusivity)
- [X] T036 [US3] Use generated client methods for image upload/clear in frontend/src/routes/_layout/admin.tsx (frontend/src/client)

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T037 [P] Add minimal documentation of RESOURCE_IMAGE_* settings in docs/production.md
- [X] T038 Run backend quality gates via backend/scripts/lint.sh and backend/scripts/tests-start.sh
- [X] T039 Run frontend quality gates via frontend/package.json scripts (npm run lint, npm run build)
- [X] T040 Add minimal Playwright coverage for resources list UI in frontend/tests/landing-smoke.spec.ts (assert Trends column + hostname link rendering)

---

## Dependencies & Execution Order

### Story dependency graph

- **Phase 1 → Phase 2**: Setup → Foundational
- **US1 (P1)** depends on **Phase 2** (needs `likes_count` + `image_url` in list responses + regenerated client)
- **US2 (P2)** depends on **Phase 2** (needs `likes_count` + regenerated client)
- **US3 (P3)** depends on **Phase 2** (needs DB columns + schemas); does not depend on US1/US2

### Suggested completion order

1) Phase 1 (T001–T002)
2) Phase 2 (T003–T014)
3) US1 (T015–T019) as MVP
4) US2 (T020–T024)
5) US3 (T025–T036)
6) Polish (T037–T040)

---

## Parallel Execution Examples

### Phase 2

- T003 (backend/app/core/config.py) and T005 (backend/app/models.py) and T004 (docker-compose.yml) can run in parallel.

### US1

- US1 tasks are mostly single-threaded within frontend/src/components/Resources/ResourceGridCard.tsx; US1 can be developed in parallel with US2 after Phase 2.

### US3

- T025 (backend/app/utils.py) and T026 (backend/app/api/routes/resource_images.py) can run in parallel.
- T035 (frontend/src/routes/_layout/admin.tsx) can start once T032 regenerates the client and exposes the new service methods.

---

## Implementation Strategy

### MVP scope (recommended)

- **MVP = Phase 1 + Phase 2 + US1**: Grid redesign shipped with reliable `likes_count` + `image_url` data.

### Incremental delivery

- Add US2 next (List improvements), then US3 (admin image management + upload serving), then polish.
