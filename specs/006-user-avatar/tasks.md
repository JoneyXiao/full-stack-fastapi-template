---

description: "Task list for implementing the 006-user-avatar feature"
---

# Tasks: User Avatar Upload

**Input**: Design documents from `/specs/006-user-avatar/`
**Prerequisites**: `plan.md` (required), `spec.md` (required for user stories), `research.md`, `data-model.md`, `contracts/avatar.openapi.yaml`

**Tests**: Included (required by repo quality gates and the plan).

## Format: `T### [P?] [US#?] Description (with file paths)`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[US#]**: User story label (only in story phases)
- Every task includes an explicit file path

---

## Phase 1: Setup (Shared Infrastructure)

- [X] T001 [P] Confirm server image-processing deps in backend/Dockerfile (e.g., libjpeg/libpng/libwebp) in backend/Dockerfile
- [X] T002 [P] Add backend Python deps for uploads + image normalization (e.g., pillow, python-multipart if missing) in backend/pyproject.toml
- [X] T003 [P] Record any new env vars in .env.example for avatar storage (no secrets) in .env.example
- [X] T042 Add/update backend dependency lockfile for any new deps (commit backend/uv.lock changes) in backend/uv.lock

---

## Phase 2: Foundational (Blocking Prerequisites)

**⚠️ CRITICAL**: No user story work should be merged until this phase is complete.

- [X] T004 Add User avatar metadata fields + new rate-limit model to backend/app/models.py
- [X] T005 Create Alembic migration for avatar fields + rate-limit table in backend/app/alembic/versions/006_01_user_avatar_fields_and_rate_limit.py
- [X] T006 Add avatar storage settings (directory path, max upload size, max dimensions, supported content types) in backend/app/core/config.py
- [X] T007 Add docker volume mount for avatar storage in docker-compose.yml
- [X] T008 [P] Add CRUD helpers for avatar metadata and rate limiting in backend/app/crud.py
- [X] T009 [P] Add API router skeleton for public avatar serving in backend/app/api/routes/avatars.py
- [X] T010 Register the avatars router in backend/app/api/main.py

**Checkpoint**: Foundation ready (DB+config+router wiring done).

---

## Phase 3: User Story 1 — Upload a profile picture (Priority: P1) 🎯 MVP

**Goal**: Signed-in user can upload/replace avatar from Settings; image is client-processed (center-crop square, downscale 512×512, flatten to white, WebP/JPEG fallback) and server-validated; avatar becomes visible quickly via versioned public URL.

**Independent Test**: Upload a valid image on Settings and verify the avatar updates for the signed-in user and is publicly fetchable via a versioned URL.

### Tests for User Story 1

- [X] T011 [P] [US1] Add backend API tests for upload validation + success + rate limiting (429) + public GET cache headers + 404 behavior (wrong version/ext) in backend/tests/api/routes/test_avatars.py
- [ ] T012 [P] [US1] Add Playwright E2E coverage for uploading an avatar in Settings in frontend/tests/user-settings.spec.ts

### Backend implementation (US1)

- [X] T013 [US1] Implement POST /users/me/avatar endpoint (multipart upload + auth + rate limit) in backend/app/api/routes/users.py
- [X] T014 [US1] Implement server-side image validation + normalization (decode, enforce 5MB/4096px, force square crop + max 512×512 output, flatten transparency to white, re-encode WebP/JPEG) in backend/app/utils.py
- [X] T015 [US1] Implement atomic avatar file write + metadata update (increment version, content-type, updated_at) in backend/app/crud.py
- [X] T016 [US1] Extend UserPublic to include avatar_url + avatar_version in backend/app/models.py
- [X] T017 [US1] Implement public GET /avatars/{user_id}/{version}.{ext} with cache headers + nosniff in backend/app/api/routes/avatars.py
- [X] T018 [US1] Ensure OpenAPI correctly reflects new endpoints and UserPublic fields in backend/app/main.py

### Contract & generated client (US1)

- [X] T019 [US1] Regenerate frontend OpenAPI client after backend OpenAPI changes via scripts/generate-client.sh

### Frontend implementation (US1)

- [X] T020 [P] [US1] Add avatar processing helper (center-crop, 512×512 downscale, flatten white, WebP->JPEG fallback) in frontend/src/lib/avatarProcessing.ts
- [X] T021 [P] [US1] Add Avatar settings UI component (file input, preview, save) in frontend/src/components/UserSettings/AvatarSettings.tsx
- [X] T022 [US1] Wire avatar UI into Settings page (My Profile tab) in frontend/src/components/UserSettings/UserInformation.tsx
- [X] T023 [US1] Call generated client to upload avatar (multipart) and refresh user state in frontend/src/components/UserSettings/AvatarSettings.tsx
- [X] T043 [US1] Display avatar consistently across primary identity surfaces using UserPublic.avatar_url in frontend/src/components/Nav/AccountMenu.tsx and frontend/src/components/Sidebar/User.tsx (and any other existing avatar/badge surfaces discovered during implementation)
- [X] T044 [P] [US1] Ensure accessible avatar fallback (placeholder/initials + non-broken layout if image fails) in frontend/src/components/ui/avatar.tsx and add a Playwright assertion for fallback behavior in frontend/tests/user-settings.spec.ts
- [X] T024 [P] [US1] Add i18n strings for avatar UI + errors in frontend/src/i18n/locales/en.json
- [X] T025 [P] [US1] Add i18n strings for avatar UI + errors in frontend/src/i18n/locales/zh.json

**Checkpoint**: US1 complete (upload/replace works; public URL serves; tests pass).

---

## Phase 4: User Story 2 — Preview and confirm changes (Priority: P2)

**Goal**: User can preview before saving and cancel without changing the saved avatar.

**Independent Test**: Select an image, verify preview; cancel; verify avatar stays unchanged.

- [X] T026 [US2] Add cancel/reset behavior for pending avatar changes (no server call) in frontend/src/components/UserSettings/AvatarSettings.tsx
- [X] T027 [US2] Ensure preview matches processed output (crop/downscale/flatten) in frontend/src/lib/avatarProcessing.ts
- [ ] T028 [P] [US2] Add Playwright test for cancel flow in frontend/tests/user-settings.spec.ts
- [X] T029 [P] [US2] Add backend test ensuring failed validation does not modify avatar metadata in backend/tests/api/routes/test_avatars.py

**Checkpoint**: US2 complete (preview + cancel reliable; no accidental saves).

---

## Phase 5: User Story 3 — Remove avatar and revert to default (Priority: P3)

**Goal**: User can remove avatar and return to placeholder.

**Independent Test**: Remove avatar from Settings and verify placeholder appears and public URL no longer serves the old version.

- [X] T030 [US3] Implement DELETE /users/me/avatar endpoint (auth + rate limit) in backend/app/api/routes/users.py
- [X] T031 [US3] Implement avatar metadata removal + version increment + best-effort file deletion in backend/app/crud.py
- [X] T032 [P] [US3] Add backend tests for delete + idempotency + version bump in backend/tests/api/routes/test_avatars.py
- [X] T033 [US3] Add "Remove avatar" UI action in frontend/src/components/UserSettings/AvatarSettings.tsx
- [ ] T034 [P] [US3] Add Playwright test for remove flow in frontend/tests/user-settings.spec.ts
- [X] T035 [P] [US3] Add i18n strings for remove-avatar UI and errors in frontend/src/i18n/locales/en.json
- [X] T036 [P] [US3] Add i18n strings for remove-avatar UI and errors in frontend/src/i18n/locales/zh.json

**Checkpoint**: US3 complete (remove works; placeholder shown; tests pass).

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T037 [P] Add documentation notes about public avatar visibility + caching semantics in specs/006-user-avatar/quickstart.md
- [X] T038 Add security hardening checks for avatar serving (path safety, content-type, 404 behavior) in backend/app/api/routes/avatars.py
- [X] T039 Run backend lint/typecheck/tests (CI parity) via backend/scripts/lint.sh and backend/scripts/test.sh
- [X] T040 Run frontend lint/build/tests via frontend/package.json scripts (npm run lint, npm run build) in frontend/package.json
- [ ] T041 Run full-stack smoke via scripts/test.sh and validate manual flow steps in specs/006-user-avatar/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 (Setup) → Phase 2 (Foundational) → User Story phases (US1 → US2/US3) → Phase 6 (Polish)

### User Story Dependencies

- **US1 (P1)**: Depends on Phase 2. No dependency on other stories.
- **US2 (P2)**: Depends on US1 UI/component structure (Phase 3 tasks T020–T023).
- **US3 (P3)**: Depends on Phase 2 + shared avatar UI; can proceed after US1 foundation.

---

## Parallel Execution Examples

### Parallel Example: US1

- Backend in parallel:
  - T013 (upload endpoint) in backend/app/api/routes/users.py
  - T017 (public GET) in backend/app/api/routes/avatars.py
- Frontend in parallel:
  - T020 (processing helper) in frontend/src/lib/avatarProcessing.ts
  - T021 (avatar UI component) in frontend/src/components/UserSettings/AvatarSettings.tsx
- Tests in parallel:
  - T011 (pytest) in backend/tests/api/routes/test_avatars.py
  - T012 (Playwright) in frontend/tests/user-settings.spec.ts

### Parallel Example: US3

- T031 (backend deletion logic) in backend/app/crud.py
- T033 (frontend remove UI) in frontend/src/components/UserSettings/AvatarSettings.tsx
- T032/T034 (tests) in backend/tests/api/routes/test_avatars.py and frontend/tests/user-settings.spec.ts

### Parallel Example: US2

- T026 (cancel/reset UI state) in frontend/src/components/UserSettings/AvatarSettings.tsx
- T028 (Playwright cancel test) in frontend/tests/user-settings.spec.ts
- T029 (backend “no mutation on validation failure” test) in backend/tests/api/routes/test_avatars.py

---

## Implementation Strategy

### MVP First (US1 only)

1. Complete Phase 1–2 (Setup + Foundational)
2. Complete Phase 3 (US1)
3. Regenerate client (T019)
4. Validate via T011 + T012 and the smoke steps in specs/006-user-avatar/quickstart.md

### Incremental Delivery

- Ship US1 → add US2 (cancel/preview hardening) → add US3 (remove)
