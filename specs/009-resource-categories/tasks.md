---

description: "Executable task list for implementing Resource Categories"
---

# Tasks: Resource Categories Management

**Input**: Design documents from `specs/009-resource-categories/`
**Prerequisites**: `specs/009-resource-categories/plan.md` (required), `specs/009-resource-categories/spec.md` (required), plus `research.md`, `data-model.md`, `contracts/`, `quickstart.md`.

## Format: `- [ ] T### [P?] [US?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependency on incomplete tasks)
- **[US#]**: User story label (US1/US2/US3) — required only inside that story’s phase
- Every task includes exact file paths

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add the minimum shared wiring so backend + frontend can host category functionality.

- [x] T001 Create backend router skeleton in backend/app/api/routes/categories.py
- [x] T002 Mount categories router in backend/app/api/main.py
- [x] T003 [P] Add frontend admin UI placeholder section for Categories in frontend/src/routes/_layout/admin.tsx

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Database + API contract changes required before any user story is truly implementable.

**⚠️ CRITICAL**: No user story work should start until this phase is complete.

- [x] T004 [P] Define `Category` SQLModel + category list response schemas in backend/app/models.py (Category table + CategoryPublic/CategoryAdmin + list wrappers)
- [x] T005 [P] Add category CRUD helpers in backend/app/crud.py (create, rename, delete, list)
- [x] T006 Create Alembic migration (expand phase) in backend/app/alembic/versions/009_01_resource_categories.py
- [x] T007 In migration file backend/app/alembic/versions/009_01_resource_categories.py: create `category` table + case-insensitive unique index on `lower(name)`
- [x] T008 In migration file backend/app/alembic/versions/009_01_resource_categories.py: add nullable `category_id` columns + indexes to resource and resourcesubmission tables
- [x] T009 In migration file backend/app/alembic/versions/009_01_resource_categories.py: backfill categories from distinct legacy `type` values and populate `category_id` for existing rows
- [x] T010 In migration file backend/app/alembic/versions/009_01_resource_categories.py: add FK constraints on `category_id` with `ON DELETE RESTRICT` (race-condition safe delete guard)
- [x] T011 Update Resource/Submission schemas to include `category_id` and keep legacy `type` as a deprecated compatibility field during rollout in backend/app/models.py
- [x] T012 Update resources endpoints to accept/return/filter by `category_id`, while supporting `type` as a backwards-compatible alias filter in backend/app/api/routes/resources.py
- [x] T013 Update submissions endpoints to accept `category_id` (preferred) while accepting legacy `type` and mapping it via case-insensitive match on category name; if no match, reject with 400 (do not auto-create categories) in backend/app/api/routes/submissions.py
- [x] T014 Update backend tests impacted by schema change and add coverage for legacy compatibility (`type` alias/filter and type-to-category mapping + 400 on unknown type) in backend/tests/api/routes/test_resources.py and backend/tests/api/routes/test_submissions.py
- [x] T015 Regenerate frontend API client after OpenAPI changes with ./scripts/generate-client.sh (updates frontend/src/client/)
- [x] T016 Update frontend resources filter UI to use fetched categories (remove hard-coded types) in frontend/src/routes/_layout/resources/index.tsx
- [x] T017 Update frontend submission form to select category from fetched list (remove hard-coded types) in frontend/src/routes/_layout/submissions/new.tsx

**Checkpoint**: DB schema + API + generated client updated; app can run with category-backed resources/submissions.

---

## Phase 3: User Story 1 — Browse categories and usage (Priority: P1) 🎯 MVP

**Goal**: Admin can view categories and see which are in use.

**Independent Test**:
- As admin, open Admin → Categories and see a list.
- Each category row shows an “in use” indicator based on references from resources OR submissions (including pending).

### Tests (recommended; behavior is new and high risk)

- [x] T018 [P] [US1] Add API route tests for listing categories in backend/tests/api/routes/test_categories.py
- [x] T019 [P] [US1] Add CRUD-level tests for usage checks in backend/tests/crud/test_category.py

### Implementation

- [x] T020 [US1] Implement `GET /categories` public list in backend/app/api/routes/categories.py (returns `{data, count}` of id+name)
- [x] T021 [US1] Implement admin usage listing via `GET /categories/admin` (admin-only) in backend/app/api/routes/categories.py (returns `{data, count}` with in_use + counts)
- [x] T022 [US1] Add usage query implementation in backend/app/crud.py (counts resources + submissions, including pending)
- [x] T023 [US1] Build Categories list UI in frontend/src/routes/_layout/admin.tsx (table + empty state + usage indicator)
- [x] T024 [US1] Add TanStack Query hooks for category listing using generated client in frontend/src/hooks/useCategories.ts

**Checkpoint**: Admin can browse categories with correct in-use status.

---

## Phase 4: User Story 2 — Create and rename categories (Priority: P2)

**Goal**: Admin can create and rename categories with case-insensitive uniqueness and good error messages.

**Independent Test**:
- Admin creates a category; it appears in the list and becomes selectable on submission form.
- Admin renames a category; the new name appears across the app.
- Duplicate (case-insensitive) create/rename returns a user-facing conflict message.

### Tests

- [x] T025 [P] [US2] Add API tests for create/rename + 409 conflict in backend/tests/api/routes/test_categories.py
- [x] T026 [P] [US2] Add Playwright test for create/rename in frontend/tests/admin-categories.spec.ts

### Implementation

- [x] T027 [US2] Implement `POST /categories` (admin-only) with validation + 409 on duplicate in backend/app/api/routes/categories.py
- [x] T028 [US2] Implement `PUT /categories/{id}` (admin-only) with validation + 409 on duplicate in backend/app/api/routes/categories.py
- [x] T029 [US2] Add backend validation helpers for trimming/blank-name rejection in backend/app/crud.py
- [x] T030 [US2] Implement create/rename UI (dialogs/forms) in frontend/src/routes/_layout/admin.tsx
- [x] T031 [US2] Wire create/rename mutations using generated client + invalidate queries in frontend/src/hooks/useCategories.ts
- [x] T032 [US2] Ensure category name changes show in resources/submissions UIs (verify no remaining "Resource type" labels) in frontend/src/routes/_layout/resources/index.tsx and frontend/src/routes/_layout/submissions/new.tsx

**Checkpoint**: Create + rename fully usable; conflicts handled cleanly.

---

## Phase 5: User Story 3 — Delete categories safely (Priority: P3)

**Goal**: Admin can delete unused categories; deletion is blocked for in-use categories (resources or submissions, including pending).

**Independent Test**:
- Deleting unused category succeeds and it disappears.
- Deleting in-use category is blocked with clear “in use” messaging.
- Deletion remains safe under race conditions (FK restrict is final guard).

### Tests

- [x] T033 [P] [US3] Add API tests for delete success + delete blocked (409) in backend/tests/api/routes/test_categories.py
- [x] T034 [P] [US3] Add Playwright test for delete blocked when category used by a submission in frontend/tests/admin-categories.spec.ts

### Implementation

- [x] T035 [US3] Implement `DELETE /categories/{id}` (admin-only) with pre-check + 409 "in use" in backend/app/api/routes/categories.py
- [x] T036 [US3] Catch FK-violation delete errors and map to 409 in backend/app/api/routes/categories.py (race-condition safe)
- [x] T037 [US3] Add delete UI with confirmation + disabled state when in_use in frontend/src/routes/_layout/admin.tsx
- [x] T038 [US3] Wire delete mutation using generated client + invalidate queries in frontend/src/hooks/useCategories.ts

**Checkpoint**: Safe delete workflow end-to-end.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Close gaps, remove legacy paths, and validate quickstart.

- [x] T039 Update user-facing terminology ("Categories" vs "Resource type") across frontend/src/routes/** and frontend/src/components/**
- [x] T040 Drop legacy `type` columns (already done in 009_01_resource_categories.py migration)
- [x] T041 Run backend lint/typecheck/tests via backend/scripts/lint.sh and backend/scripts/tests-start.sh
- [x] T042 Run frontend checks via frontend/package.json scripts: `npm run lint` and `npm run build`
- [x] T043 Run quickstart validation steps from specs/009-resource-categories/quickstart.md
- [x] T044 Verify FR-009a: category names display as-is (no i18n/localization lookup) in frontend/src/routes/_layout/admin.tsx, frontend/src/routes/_layout/resources/index.tsx, and frontend/src/routes/_layout/submissions/new.tsx

---

## Dependencies & Execution Order

### Story Completion Order (dependency graph)

- **Phase 1 → Phase 2**: Wiring then DB/API/client foundation
- **Phase 2 → US1/US2/US3**: All stories depend on schema + API switching to `category_id`
- **User story order**: US1 (list + in-use visibility) → US2 (create/rename) → US3 (delete)
  - US2 depends on US1 UI being present.
  - US3 depends on US1’s in-use computation (or equivalent) for safe UX.

### Parallel opportunities (high value)

- Within Phase 2:
  - T004 and T005 can be done in parallel, but both must land before T006–T013 are complete.
  - Frontend updates (T016–T017) should wait until after T015 (client regen).
- Within each story:
  - Backend tests and frontend UI work can proceed in parallel once endpoints exist.

---

## Parallel Execution Examples

### US1

- [P] T018 backend route tests (backend/tests/api/routes/test_categories.py)
- [P] T019 CRUD usage tests (backend/tests/crud/test_category.py)
- In parallel after backend endpoints exist:
  - T023 admin UI list (frontend/src/routes/_layout/admin.tsx)
  - T024 query hook (frontend/src/hooks/useCategories.ts)

### US2

- [P] T025 backend conflict tests (backend/tests/api/routes/test_categories.py)
- [P] T026 Playwright CRUD test (frontend/tests/admin-categories.spec.ts)
- In parallel after API is done:
  - T030 UI dialogs/forms (frontend/src/routes/_layout/admin.tsx)
  - T031 mutations + invalidation (frontend/src/hooks/useCategories.ts)

### US3

- [P] T033 backend delete tests (backend/tests/api/routes/test_categories.py)
- [P] T034 Playwright delete-blocked test (frontend/tests/admin-categories.spec.ts)
- In parallel after API is done:
  - T037 delete UI/confirm (frontend/src/routes/_layout/admin.tsx)
  - T038 delete mutation wiring (frontend/src/hooks/useCategories.ts)

---

## Implementation Strategy

### MVP (US1 only)

1. Complete Phase 1 + Phase 2 to establish `Category` and `category_id` support.
2. Implement US1 endpoints + admin list.
3. Validate the US1 Independent Test.

### Incremental Delivery

- Add US2 (create/rename) → validate independent test
- Add US3 (delete) → validate independent test
- Finish polish tasks (including legacy column removal when safe)
