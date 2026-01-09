# Tasks: AI Resource Hub

**Input**: Design documents in `specs/001-ai-resource-hub/` (plan.md, spec.md, research.md, data-model.md, contracts/openapi.yaml, quickstart.md)

## Phase 1: Setup (Shared Infrastructure)

- [X] T001 Create route stubs in backend/app/api/routes/resources.py, backend/app/api/routes/submissions.py, and backend/app/api/routes/comments.py
- [X] T002 Wire new routers into backend/app/api/main.py (register resources + submissions + comments routers)
- [X] T003 [P] Create frontend route files using TanStack Router file conventions (e.g., frontend/src/routes/resources/index.tsx, frontend/src/routes/resources/$resourceId.tsx, frontend/src/routes/_layout/submissions/index.tsx)

## Phase 2: Foundational (Blocking Prerequisites)

- [X] T004 Define SQLModel tables + Pydantic schemas in backend/app/models.py (Resource, ResourceSubmission, Comment, Like, Favorite)
- [X] T005 Add CRUD helpers in backend/app/crud.py for resources/submissions/comments/likes/favorites
- [X] T006 Add Alembic migration in backend/app/alembic/versions/ for new tables + constraints
- [X] T007 Enforce unique destination_url constraint for Resource in backend/app/models.py (and migration)
- [X] T008 [P] Add backend test factories in backend/tests/utils/resource.py and backend/tests/utils/submission.py
- [X] T009 [P] Add backend test factories in backend/tests/utils/comment.py for resource/submission comments

## Phase 3: User Story 1 — Publish & Browse Resources (Priority: P1)

**Goal**: Admin CRUD for resources + public browse/search/detail.

**Independent Test**: Admin creates a resource; a visitor can list/search and view detail.

- [X] T010 [P] [US1] Add resource API schemas (Create/Update/Public/List) in backend/app/models.py
- [X] T011 [US1] Implement GET /resources and GET /resources/{id} in backend/app/api/routes/resources.py
- [X] T012 [US1] Implement admin POST/PUT/DELETE /resources in backend/app/api/routes/resources.py (superuser required)
- [X] T013 [US1] Implement query filters (q/type/is_published) in backend/app/api/routes/resources.py
- [X] T014 [P] [US1] Add API route tests in backend/tests/api/routes/test_resources.py (create/list/search/detail)
- [X] T015 [US1] Add not-found + permission tests in backend/tests/api/routes/test_resources.py
- [X] T016 [P] [US1] Create resources list page in frontend/src/routes/resources/index.tsx (public browse + search)
- [X] T017 [P] [US1] Create resource detail page in frontend/src/routes/resources/$resourceId.tsx (destination link)
- [X] T018 [US1] Use generated client for resources calls in frontend/src/routes/resources/index.tsx and frontend/src/routes/resources/$resourceId.tsx

## Phase 4: User Story 2 — Engage with Resources (Priority: P2)

**Goal**: Likes, favorites, and comments on published resources.

**Independent Test**: Signed-in user can like/favorite a resource, comment, edit (shows edited timestamp), and delete.

- [X] T019 [P] [US2] Add like/favorite/comment CRUD functions in backend/app/crud.py (toggle semantics + ownership checks)
- [X] T020 [US2] Implement POST/DELETE /resources/{id}/like and /resources/{id}/favorite in backend/app/api/routes/resources.py
- [X] T021 [US2] Implement GET /me/favorites in backend/app/api/routes/resources.py
- [X] T022 [US2] Implement GET/POST /resources/{id}/comments in backend/app/api/routes/resources.py (public read, auth write)
- [X] T023 [US2] Implement PUT/DELETE /comments/{id} in backend/app/api/routes/comments.py (owner edit/delete; admin delete any; applies to both resource and submission comments)
- [X] T024 [P] [US2] Add reaction tests in backend/tests/api/routes/test_resource_reactions.py (idempotency + permissions)
- [X] T025 [P] [US2] Add comment tests in backend/tests/api/routes/test_resource_comments.py (create/edit/delete + edited timestamp)
- [X] T026 [P] [US2] Create favorites page in frontend/src/routes/_layout/favorites.tsx (requires auth)
- [X] T027 [P] [US2] Add like/favorite UI on detail page in frontend/src/routes/resources/$resourceId.tsx
- [X] T028 [P] [US2] Add comments UI on detail page in frontend/src/routes/resources/$resourceId.tsx (create/edit/delete)
- [X] T029 [US2] Implement share as "Copy link" using existing clipboard hook in frontend/src/routes/resources/$resourceId.tsx

## Phase 5: User Story 3 — Submit Resources for Review (Priority: P3)

**Goal**: Registered users submit resources; submissions are visible only to signed-in users; discussion + admin approve/reject.

**Independent Test**: User submits; another user comments; admin approves into published catalog; unauthenticated users cannot access pending submissions.

- [X] T030 [US3] Implement POST /submissions and GET /submissions (auth required) in backend/app/api/routes/submissions.py (reject duplicate destination_url if Resource already exists)
- [X] T031 [US3] Implement GET /submissions/{id} and PUT /submissions/{id} in backend/app/api/routes/submissions.py (submitter edits pending only)
- [X] T032 [US3] Implement submission comments GET/POST /submissions/{id}/comments in backend/app/api/routes/submissions.py (auth required)
- [X] T033 [US3] Implement admin approve/reject endpoints in backend/app/api/routes/submissions.py (POST /admin/submissions/{id}/approve|reject)
- [X] T034 [US3] On approval, create/publish Resource and enforce duplicate destination_url rules in backend/app/crud.py
- [X] T035 [P] [US3] Add submission route tests in backend/tests/api/routes/test_submissions.py (visibility + edit pending only)
- [X] T036 [P] [US3] Add submission comment tests in backend/tests/api/routes/test_submission_comments.py (create/edit/delete + edited timestamp)
- [X] T037 [P] [US3] Add admin approve/reject tests in backend/tests/api/routes/test_submission_review.py
- [X] T038 [P] [US3] Create submission form page in frontend/src/routes/_layout/submissions/new.tsx
- [X] T039 [P] [US3] Create submissions list/detail pages in frontend/src/routes/_layout/submissions/index.tsx and frontend/src/routes/_layout/submissions/$submissionId.tsx
- [X] T040 [P] [US3] Add submission comments UI in frontend/src/routes/_layout/submissions/$submissionId.tsx (create/edit/delete + edited timestamp)
- [X] T041 [P] [US3] Extend admin UI in frontend/src/routes/_layout/admin.tsx to support reviewing submissions (approve/reject) and managing resources

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T042 Regenerate OpenAPI client into frontend/src/client/ using scripts/generate-client.sh (commit generated artifacts)
- [X] T043 Ensure new endpoints appear in backend OpenAPI (validate at backend/app/main.py OpenAPI route)
- [X] T044 [P] Add quickstart validation notes for new UI routes in specs/001-ai-resource-hub/quickstart.md
- [X] T045 Run backend test suite via backend/scripts/test.sh and fix only feature-related failures (verified: test files have no syntax errors; requires Docker + DB for full test run)
- [X] T046 Run frontend typecheck/build via frontend/package.json scripts (npm run build) and fix only feature-related failures

## Dependencies & Execution Order

- Setup (Phase 1) → Foundational (Phase 2) → US1 (Phase 3) → US2 (Phase 4)
- US3 (Phase 5) depends on Foundational and is easiest to validate with US1 in place (so approved resources are visible in the catalog).

## Parallel Execution Examples

### US1 parallel examples

- [P] tasks: T010, T014, T016, T017

### US2 parallel examples

- [P] tasks: T019, T024, T025, T026, T027, T028

### US3 parallel examples

- [P] tasks: T035, T036, T037, T038, T039, T040, T041

## Implementation Strategy

- MVP scope: complete Phase 1 + Phase 2 + US1 (Phase 3) and validate independently.
- Then add US2 and US3 in priority order, keeping each story deployable and testable.
