# Tasks: WeChat Login Unavailable Toast

**Input**: Design documents from `specs/008-wechat-login-unavailable/`
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `contracts/`, `quickstart.md`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm baseline behavior and prepare for small, focused frontend changes

- [X] T001 Identify all WeChat login UI entrypoints (at minimum `frontend/src/routes/login.tsx` + `frontend/src/components/Auth/WeChatQrLogin.tsx`) and document where the “provider unavailable” behavior must be consistent (FR-005)
- [X] T002 Confirm backend signals “provider unavailable” via HTTP 403 for the start-login endpoint (as invoked by the generated client, e.g., `WechatLoginService.wechatLoginStart`) in `backend/app/api/routes/wechat_login.py` (reference for frontend gating)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared UI primitives required by all user stories

**⚠️ CRITICAL**: No user story work should start until this phase is complete

- [X] T003 Add `showWarningToast()` to `frontend/src/hooks/useCustomToast.ts` using Sonner `toast.warning()` and title `t("toast.warning")`
- [X] T004 Add optional per-page rate limiting support (2s window) to `frontend/src/hooks/useCustomToast.ts` (e.g., `debounceMs?: number`) without adding new dependencies

**Checkpoint**: Toast API supports Warning + optional rate limiting

---

## Phase 3: User Story 1 - Clear feedback when WeChat login is disabled (Priority: P1) 🎯 MVP

**Goal**: Keep the WeChat login option visible; when disabled, clicking it shows a warning toast (“WeChat login is currently unavailable.”) and does not proceed into the login flow.

**Independent Test**: With `WECHAT_LOGIN_ENABLED=False`, open `/login`, click the WeChat icon, and verify a warning toast appears and the user remains on the login page (no redirect/navigation).

### Implementation for User Story 1

- [X] T005 [P] [US1] Update `auth.wechat.providerUnavailable` English copy to exactly “WeChat login is currently unavailable.” in `frontend/src/i18n/locales/en.json`
- [X] T006 [US1] Keep the WeChat icon button visible even after disabled detection (remove/harden `wechatDisabled` conditional rendering) in `frontend/src/routes/login.tsx`
- [X] T007 [US1] When `wechatDisabled` is true, clicking the WeChat button shows a Warning toast (using `showWarningToast`) and does not open the QR popup in `frontend/src/routes/login.tsx`
- [X] T008 [US1] When the backend reports disabled (via `WeChatQrLogin` `onDisabled` callback), set `wechatDisabled=true`, close the QR popup, and show the same Warning toast in `frontend/src/routes/login.tsx`
- [X] T009 [P] [US1] Ensure disabled detection treats HTTP 403 (and 404 if present) as “provider unavailable” in `frontend/src/components/Auth/WeChatQrLogin.tsx` (keep callback behavior stable)

**Checkpoint**: US1 is fully functional and independently verifiable

---

## Phase 4: User Story 2 - Repeated clicks remain usable and non-disruptive (Priority: P2)

**Goal**: Repeated clicking of the WeChat login option while disabled does not spam notifications and does not block alternative sign-in flows.

**Independent Test**: With `WECHAT_LOGIN_ENABLED=False`, click the WeChat icon repeatedly and confirm at most one toast appears every ~2 seconds and other login actions remain usable.

### Implementation for User Story 2

- [X] T010 [US2] Apply 2-second rate limit to the WeChat “provider unavailable” toast usage in `frontend/src/routes/login.tsx` (via the `useCustomToast` rate limit option)
- [X] T011 [US2] Verify the toast is still shown as Warning severity/variant (not error) in `frontend/src/hooks/useCustomToast.ts`

**Checkpoint**: US2 behavior meets the debounce requirement and remains usable

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Validation and cleanup that affects multiple stories

- [X] T012 [P] Run frontend lint in `frontend/` via `npm run lint` (see `frontend/package.json`)
- [X] T013 [P] Run frontend build in `frontend/` via `npm run build` (see `frontend/package.json`)
- [X] T014 Validate manual steps in `specs/008-wechat-login-unavailable/quickstart.md` still match the implemented UX
- [X] T015 [P] Add/extend a Playwright e2e test that verifies: when WeChat is disabled, clicking the WeChat button shows a Warning toast and does not open QR UI
- [X] T016 [P] Add/extend a Playwright e2e test that verifies toast rate limiting (rapid clicks show at most one toast per ~2 seconds per browser tab)
- [X] T017 [P] Run Playwright e2e locally via `npx playwright test` (or the repo's standard Playwright invocation) and ensure it passes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup completion; BLOCKS user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **User Story 2 (Phase 4)**: Depends on Foundational completion; builds on the toast behavior used by US1
- **Polish (Phase 5)**: Depends on US1 + US2 completion

### User Story Dependencies

- **US1 (P1)**: No dependencies on other stories
- **US2 (P2)**: Depends on the shared toast rate limiting capability from Phase 2

## Parallel Execution Examples

### Parallel Example: US1

- Task: “Update translation string” → `frontend/src/i18n/locales/en.json` (T005)
- Task: “Ensure disabled detection callback behavior” → `frontend/src/components/Auth/WeChatQrLogin.tsx` (T009)

### Parallel Example: Polish

- Task: “Run frontend lint” → `frontend/package.json` scripts (T012)
- Task: “Run frontend build” → `frontend/package.json` scripts (T013)

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 + Phase 2
2. Implement Phase 3 (US1)
3. Validate US1 via the independent test criteria

### Incremental Delivery

1. Deliver US1 (clear feedback + no flow)
2. Deliver US2 (debounced toasts)
3. Run Polish validation steps
