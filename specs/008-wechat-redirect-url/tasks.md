---
description: "Task list for feature implementation"
---

# Tasks: WeChat Redirect URL Update

**Input**: Design documents from `specs/008-wechat-redirect-url/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Included (spec.md mandates testable scenarios; repo constitution expects behavior changes to be covered).

## Format: `- [ ] T### [P?] [US#?] Description (file path)`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[US#]**: User story mapping (US1, US2)

---

## Phase 1: Setup (Shared Infrastructure)

- [X] T001 Add `WECHAT_LOGIN_INTERMEDIARY_URL` example/config notes in `.env.example`
- [X] T002 Add `WECHAT_LOGIN_INTERMEDIARY_URL` setting to backend config in `backend/app/core/config.py`

---

## Phase 2: Foundational (Blocking Prerequisites)

- [X] T003 Extend WeChat start request schema with `action` and tighten `return_to` docs in `backend/app/models.py`
- [X] T004 Implement backend helper to build nested redirect URLs (callback → intermediary) in `backend/app/api/routes/wechat_login.py`
- [X] T005 [P] Add backend test for fallback behavior when `WECHAT_LOGIN_INTERMEDIARY_URL` is unset (redirects directly to `${FRONTEND_HOST}/wechat-callback`) in `backend/tests/api/routes/test_wechat_login.py`

**Checkpoint**: Backend can construct redirect URIs deterministically and is configurable via env.

---

## Phase 3: User Story 1 - Login via WeChat using updated redirect chain (Priority: P1) 🎯 MVP

**Goal**: WeChat login/link uses the required first-hop intermediary (`h5.yunxi668.com`) and returns to the frontend callback route, which completes login/link and safely redirects using allowlisted `from`.

**Independent Test**: Starting WeChat login returns a `redirect_uri` pointing at the intermediary; simulating callback completion with `code/state` signs in (or links) and redirects to allowlisted `from` (relative path) or safe fallback.

### Implementation

- [X] T006 [US1] Update `/login/wechat/start` to embed `action` and `return_to` into callback, then wrap via intermediary in `backend/app/api/routes/wechat_login.py`
- [X] T007 [P] [US1] Update start endpoint tests to assert intermediary `redirect_uri` and embedded callback params in `backend/tests/api/routes/test_wechat_login.py`
- [X] T008 [P] [US1] Update link-flow tests to request `action=link` when starting and ensure state acquisition still works in `backend/tests/api/routes/test_wechat_linking.py`

- [X] T009 [P] [US1] Update login QR start call to send optional request body fields (e.g., `action`, `return_to`) in `frontend/src/components/Auth/WeChatQrLogin.tsx`
- [X] T010 [P] [US1] Stop hardcoding `window.location.origin` callback; use backend-provided `startData.redirect_uri` and request `action=link` in `frontend/src/components/UserSettings/WeChatConnection.tsx`

- [X] T011 [P] [US1] Add safe relative-path allowlist helper for `from` redirects in `frontend/src/utils.ts`
- [X] T012 [US1] Enhance callback route to read `from`, validate via allowlist, and redirect to `from` or fallback in `frontend/src/routes/wechat-callback.tsx`

- [X] T013 [P] [US1] Add Playwright test for allowlisted `from` redirect (mock API responses via Playwright route interception for `**/api/v1/login/wechat/complete` and `**/api/v1/users/me/wechat/link`) in `frontend/tests/wechat-callback-us1.spec.ts`

- [X] T014 [US1] Regenerate OpenAPI client after schema changes using `scripts/generate-client.sh` (expect updates under `frontend/src/client/`)
- [X] T015 [US1] Fix any TypeScript compilation issues due to regenerated client signatures in `frontend/src/components/**` and `frontend/src/routes/**`

**Checkpoint**: US1 works end-to-end (login + link) and honors safe `from` redirects.

---

## Phase 4: User Story 2 - Clear errors when authorization fails (Priority: P2)

**Goal**: Missing/invalid callback parameters produce clear, actionable UI states with a retry path.

**Independent Test**: Visiting `/wechat-callback` with missing/invalid `code/state` renders a clear error and allows retry without signing in.

### Implementation

- [X] T016 [US2] Improve callback error classification for missing `code` vs missing/invalid `state` and ensure retry path is clear in `frontend/src/routes/wechat-callback.tsx`
- [X] T017 [P] [US2] Add Playwright test for missing `code`/`state` error UI + retry navigation in `frontend/tests/wechat-callback-us2.spec.ts`
- [X] T018 [P] [US2] Add Playwright test for invalid/expired code (mock 400 from backend) shows actionable message in `frontend/tests/wechat-callback-us2.spec.ts`

**Checkpoint**: US2 failure states are user-friendly and safe.

---

## Phase 5: Polish & Cross-Cutting Concerns

- [X] T019 [P] Update operational verification notes (if needed) in `specs/008-wechat-redirect-url/quickstart.md`
- [X] T020 Run backend quality gates (`backend/scripts/lint.sh`, `backend/scripts/tests-start.sh`) and fix feature-related failures
- [X] T021 Run frontend quality gates (`npm run lint`, `npm run build`, `npx playwright test`) per `frontend/playwright.config.ts`
- [X] T022 Confirm existing one-time-state/replay coverage still passes after redirect changes (see `backend/tests/api/routes/test_wechat_login.py` for double-use/concurrent state tests`)

---

## Dependencies & Execution Order

- Phase 1 (T001–T002) → Phase 2 (T003–T005) → US1 (T006–T015) → US2 (T016–T018) → Polish (T019–T022)

User story order:
- **US1 (P1)** is the MVP and should be completed first.
- **US2 (P2)** can be done after US1, but can also be started once the callback route work is underway (note: it touches the same route file, so coordinate edits).

## Parallel Opportunities

- After T004:
  - T005 and T007 can run in parallel (same test file risk; coordinate if needed).
  - T007 and T008 can run in parallel (different backend test files).
  - T009 and T010 can run in parallel (different frontend component files).
  - T011 can run in parallel with T007–T010 (different frontend file).
  - T013 can run in parallel with backend work (separate frontend test file).

## Parallel Example: US1

```bash
# Parallelizable backend tests updates:
Task: "Update start endpoint tests" (backend/tests/api/routes/test_wechat_login.py)
Task: "Update link-flow tests" (backend/tests/api/routes/test_wechat_linking.py)

# Parallelizable frontend work:
Task: "Update WeChatQrLogin start request" (frontend/src/components/Auth/WeChatQrLogin.tsx)
Task: "Update WeChatConnection link flow" (frontend/src/components/UserSettings/WeChatConnection.tsx)
Task: "Add from-allowlist helper" (frontend/src/utils.ts)
```

## Implementation Strategy

### MVP First (US1)

1. Do T001–T005 (config + schema + helpers + fallback test)
2. Implement US1 (T006–T015)
3. Validate US1 with backend tests + Playwright (T020–T021)

### Incremental Delivery

- Deliver US1 first (updated redirect chain + safe `from`).
- Then deliver US2 (improved error UX) with additional Playwright coverage.
