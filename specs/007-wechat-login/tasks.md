---
description: "Task list for WeChat login feature implementation"
---

# Tasks: WeChat Login

**Input**: Design documents from `/specs/007-wechat-login/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Every task includes an exact file path

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Wire configuration + create scaffolding to start implementation safely.

- [x] T001 Add WeChat env var placeholders (no secrets) in .env.example
- [x] T002 Add WeChat config settings (enabled/app id/secret/callback URL pieces) in backend/app/core/config.py
- [x] T003 [P] Add i18n strings for WeChat login UI in frontend/src/i18n/locales/en.json
- [x] T004 [P] Add i18n strings for WeChat login UI in frontend/src/i18n/locales/zh.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core backend primitives required by all user stories.

**⚠️ CRITICAL**: No user story work begins until this phase is complete.

- [x] T005 Add WeChat models + API schemas (WeChatAccountLink + WeChatLoginAttempt + request/response models) in backend/app/models.py
- [x] T006 Create Alembic migration for WeChat link + login attempt tables in backend/app/alembic/versions/ (new revision file)
- [x] T007 [P] Add CRUD helpers for WeChat link lookup/create/delete and attempt state create/consume in backend/app/crud.py
- [x] T008 [P] Add WeChat HTTP client helpers (code exchange + userinfo fetch; do not persist tokens) in backend/app/integrations/wechat.py
- [x] T009 Add WeChat login router skeleton + shared error mapping in backend/app/api/routes/wechat_login.py
- [x] T010 Implement server-side `state` anti-replay (TTL=10m + one-time use consumed on successful complete, backed by WeChatLoginAttempt) in backend/app/api/routes/wechat_login.py
- [x] T011 Wire the new router into the API in backend/app/api/main.py
- [x] T012 Add backend test helpers to mock WeChat API calls (monkeypatch httpx) in backend/tests/utils/wechat.py
- [x] T013 Add config gating for WECHAT_LOGIN_ENABLED in backend/app/api/routes/wechat_login.py (return 404 or 403 when disabled)
- [x] T054 Add DB uniqueness constraints for WeChatAccountLink (unique openid; unique unionid when present; unique primary_subject_type+primary_subject) in backend/app/models.py and backend/app/alembic/versions/

**Checkpoint**: Foundation ready — user story work can now begin.

---

## Phase 3: User Story 1 — Sign in with WeChat (Priority: P1) 🎯 MVP

**Goal**: A logged-out user can start WeChat login via embedded QR and complete login when their WeChat identity is already linked.

**Independent Test**: Create an account, create a WeChat link for it, then complete `/api/v1/login/wechat/complete` and verify the returned JWT works with `/api/v1/users/me`.

### Tests for User Story 1

- [x] T014 [P] [US1] Add API tests for start/complete happy path (existing linked user) in backend/tests/api/routes/test_wechat_login.py
- [x] T015 [P] [US1] Add API tests for failure cases (state mismatch, WeChat error, missing params, expired/used state) in backend/tests/api/routes/test_wechat_login.py
- [x] T016 [P] [US1] Add API tests that security events are recorded without secrets (FR-010) in backend/tests/api/routes/test_wechat_login.py
- [x] T055 [P] [US1] Add API test for concurrent/double-use of the same state (second attempt must fail) in backend/tests/api/routes/test_wechat_login.py
- [ ] T017 [P] [US1] Add Playwright UI test that WeChat option renders QR container and handles mocked start response in frontend/tests/login-wechat-us1.spec.ts
- [x] T018 [P] [US1] Add regression tests to confirm existing password login still works (FR-009) in backend/tests/api/routes/test_login.py

### Backend implementation (US1)

- [x] T019 [US1] Implement POST /api/v1/login/wechat/start response (state + params; no secrets; respects enable flag) in backend/app/api/routes/wechat_login.py
- [x] T020 [US1] Implement POST /api/v1/login/wechat/complete for already-linked users (validate/consume state, exchange code, fetch userinfo, issue Token) in backend/app/api/routes/wechat_login.py
- [x] T021 [US1] Record security-relevant attempt events (success/failure category/time) without logging credentials (FR-010) in backend/app/api/routes/wechat_login.py
- [x] T022 [US1] Ensure sensitive values are never logged (no code/access_token/refresh_token) in backend/app/api/routes/wechat_login.py

### OpenAPI + client generation (US1)

- [x] T023 [US1] Confirm OpenAPI shows the new endpoints + schemas (via FastAPI models) in backend/app/api/routes/wechat_login.py
- [x] T024 [US1] Regenerate frontend client after backend OpenAPI changes using scripts/generate-client.sh

### Frontend implementation (US1)

- [x] T025 [P] [US1] Add WeChat login CTA + container to frontend login page in frontend/src/routes/login.tsx
- [x] T026 [P] [US1] Implement embedded QR renderer (loads wxLogin.js, renders iframe) in frontend/src/components/Auth/WeChatQrLogin.tsx
- [x] T027 [US1] Add callback route to complete login (reads code/state; calls generated client; stores access_token) in frontend/src/routes/wechat-callback.tsx
- [x] T028 [US1] Reuse existing auth flow (invalidate currentUser, redirect) after WeChat login in frontend/src/hooks/useAuth.ts
- [x] T029 [US1] Add user-facing error mapping + retry UX for common categories (canceled/expired/provider unavailable/state mismatch) in frontend/src/routes/wechat-callback.tsx
- [x] T056 [US1] Disable WeChat CTA when backend is disabled (handle 403/404 from start with a clear message, no QR render) in frontend/src/routes/login.tsx

**Checkpoint**: US1 works end-to-end for already-linked users.

---

## Phase 4: User Story 2 — First-time WeChat sign-in creates an account (Priority: P2)

**Goal**: A new user can complete WeChat login without pre-existing credentials and end up with a usable account.

**Independent Test**: Complete `/api/v1/login/wechat/complete` for a WeChat identity not seen before and verify a new user exists and is authenticated.

### Tests for User Story 2

- [x] T030 [P] [US2] Add API test for first-time WeChat login creating a new user + link in backend/tests/api/routes/test_wechat_login.py
- [x] T031 [P] [US2] Add API test for "cannot create account" cases (missing identifiers) in backend/tests/api/routes/test_wechat_login.py
- [x] T032 [P] [US2] Add API test that placeholder emails do not contain openid/unionid and are unique in backend/tests/api/routes/test_wechat_login.py

### Backend implementation (US2)

- [x] T033 [US2] Implement a safe placeholder email strategy for WeChat-created accounts (MUST NOT embed openid/unionid; use random UUID) in backend/app/api/routes/wechat_login.py
- [x] T034 [US2] Extend complete flow to create new User + WeChatAccountLink when no link exists in backend/app/api/routes/wechat_login.py
- [x] T035 [US2] Ensure no automatic merge into existing accounts without an explicit link (FR-015) in backend/app/api/routes/wechat_login.py
- [x] T036 [US2] Enforce unionid-first matching and persist primary_subject_type/primary_subject (FR-013) in backend/app/api/routes/wechat_login.py

### Frontend implementation (US2)

- [x] T037 [US2] Add user-facing error message + guidance when backend blocks merge (e.g., "Sign in then link WeChat") in frontend/src/routes/wechat-callback.tsx

**Checkpoint**: US2 works end-to-end for new users.

---

## Phase 5: User Story 3 — Link and unlink WeChat to an existing account (Priority: P3)

**Goal**: A signed-in user can explicitly link WeChat to their account and later unlink it (when safe).

**Independent Test**: Sign in with email/password, link WeChat, sign out, sign back in via WeChat and confirm same account; then unlink and confirm WeChat login no longer works.

### Tests for User Story 3

- [x] T038 [P] [US3] Add API tests for link/unlink endpoints (auth required; uniqueness conflicts; unlink safety) in backend/tests/api/routes/test_wechat_linking.py
- [ ] T039 [P] [US3] Add Playwright test for linking/unlinking UI with mocked backend in frontend/tests/user-settings-wechat-us3.spec.ts

### Backend implementation (US3)

- [x] T040 [US3] Implement POST /api/v1/users/me/wechat/link (explicit linking) in backend/app/api/routes/wechat_login.py
- [x] T041 [US3] Implement DELETE /api/v1/users/me/wechat/link (prevent unlink if no other viable login path) in backend/app/api/routes/wechat_login.py
- [x] T042 [US3] Define and enforce unlink safety rules (treat placeholder-email accounts as WeChat-only until email updated) in backend/app/api/routes/wechat_login.py
- [x] T043 [US3] Ensure FR-007 "user-friendly resolution path" by returning a stable error code/message for already-linked-to-other-user conflicts in backend/app/api/routes/wechat_login.py

### Frontend implementation (US3)

- [x] T044 [P] [US3] Add "Connected accounts: WeChat" settings section in frontend/src/components/UserSettings/WeChatConnection.tsx
- [x] T045 [US3] Wire WeChat settings section into profile/settings UI in frontend/src/components/UserSettings/UserInformation.tsx
- [x] T046 [US3] Use generated client for link/unlink calls and refresh current user in frontend/src/components/UserSettings/WeChatConnection.tsx
- [x] T047 [US3] Show user-friendly guidance for link conflict (already linked elsewhere) and unlink blocked (no other method) in frontend/src/components/UserSettings/WeChatConnection.tsx

**Checkpoint**: US3 works end-to-end and does not permit unsafe unlink.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Hardening, documentation, and CI gates.

- [x] T048 [P] Document WeChat env vars + local dev flow in specs/007-wechat-login/quickstart.md
- [x] T049 Add backend lint/typecheck/test commands to the feature checklist (verify locally) in specs/007-wechat-login/quickstart.md
- [x] T050 [P] Remove/clean any remaining template placeholder comments in specs/007-wechat-login/spec.md
- [x] T051 Run backend quality gates and fix only WeChat-related failures using backend/scripts/lint.sh
- [ ] T052 Run backend tests and fix only WeChat-related failures using backend/scripts/tests-start.sh (Note: Requires migration to be applied first)
- [x] T053 Run frontend lint/build and fix only WeChat-related failures using frontend/package.json scripts

---

## Dependencies & Execution Order

- Phase 1 (Setup) blocks Phase 2.
- Phase 2 (Foundational) blocks all user stories.
- US1 (P1) should be implemented first as the MVP.
- US2 (P2) depends on US1’s complete flow but is independently testable once implemented.
- US3 (P3) depends on shared WeChat primitives and is independently testable once implemented.

## Parallel Opportunities

- Phase 1: T003 and T004 can run in parallel.
- Phase 2: T007 and T008 can run in parallel.
- Phase 2: T007 and T008 can run in parallel.
- US1: backend (T019–T022) and frontend scaffolding (T025–T027) can be developed in parallel; client generation (T024) follows backend endpoint/schema completion.
- US3: settings UI tasks (T044–T047) can be parallelized with backend linking tasks (T040–T043).

## Implementation Strategy

- MVP scope: Phase 1 + Phase 2 + US1 (linked-user login only).
- Next: US2 to enable first-time WeChat onboarding.
- Finally: US3 to support explicit linking/unlinking for existing accounts.
