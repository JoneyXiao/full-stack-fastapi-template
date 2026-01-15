---
description: "Task list for 004-localization implementation"
---

# Tasks: Application Localization (English + Chinese)

**Input**: Design documents from `specs/004-localization/`
**Prerequisites**: `plan.md` (required), `spec.md` (required)

**Tests**: Included (behavior change + repository constitution expectations)

**Organization**: Tasks are grouped by user story so each story can be implemented and tested independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish a safe baseline before behavior changes.

- [X] T001 Run baseline checks using `backend/scripts/lint.sh`, `backend/scripts/test.sh`, and frontend scripts in `frontend/package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared frontend infrastructure required for any localization work (reactive locale state + translation helper).

**Checkpoint**: Locale changes trigger re-render; translation helper available; app boots with no UI regressions.

- [X] T002 Add i18n dependencies (`i18next`, `react-i18next`) and initialize i18n in `frontend/src/i18n/i18n.ts` using `initReactI18next`, bundled JSON resources, `fallbackLng: "en"`, `supportedLngs: ["en", "zh"]`, and `interpolation.escapeValue: false`
- [X] T003 [P] Refactor `frontend/src/hooks/useLocale.ts` to integrate with i18n (read/write `frontend/src/lib/locale.ts`, call `i18n.changeLanguage`, and keep `document.documentElement.lang` in sync) and update callsites in `frontend/src/components/Nav/LocaleSwitcher.tsx` and `frontend/src/components/Nav/MobileMenuSheet.tsx`
- [X] T004 [P] Create translation resources for `en` and `zh` in `frontend/src/i18n/locales/en.json` and `frontend/src/i18n/locales/zh.json` and add a small wrapper hook (optional) in `frontend/src/i18n/useT.ts` for consistent key usage
- [X] T005 Wire i18n bootstrap into the app root in `frontend/src/main.tsx` (import the i18n init once before render; optionally add `I18nextProvider` if needed for explicit instance wiring)

---

## Phase 3: User Story 1 - View the UI in a chosen language (Priority: P1) 🎯 MVP

**Goal**: A user can switch UI language (English/Chinese) anywhere (including auth pages) and see core UI text update consistently.

**Independent Test**:
- Visit `/login`, switch to Chinese, and confirm auth page UI text changes.
- Navigate to a signed-in page, switch language, and confirm navbar + page content changes without requiring refresh.

### Tests for User Story 1

- [X] T006 [P] [US1] Add Playwright coverage for locale switching on auth pages in `frontend/tests/localization-auth-pages.spec.ts`
- [X] T007 [P] [US1] Add Playwright coverage for locale switching in the signed-in shell/navbar in `frontend/tests/localization-navbar.spec.ts`
- [X] T024 [P] [US1] Add Playwright test that switching locale does not mutate auth form input values (FR-009) in `frontend/tests/localization-form-inputs.spec.ts`

### Implementation for User Story 1

- [X] T008 [P] [US1] Add the language switch control to auth pages via `frontend/src/components/Common/AuthLayout.tsx` (reuse `frontend/src/components/Nav/LocaleSwitcher.tsx`)
- [X] T009 [P] [US1] Localize auth routes (head titles + visible labels/buttons/links) in `frontend/src/routes/login.tsx`, `frontend/src/routes/signup.tsx`, `frontend/src/routes/recover-password.tsx`, `frontend/src/routes/reset-password.tsx`
- [X] T010 [P] [US1] Localize navigation UI text in `frontend/src/components/Nav/AppNavbar.tsx`, `frontend/src/components/Nav/AuthControls.tsx`, `frontend/src/components/Nav/LowerNav.tsx`, `frontend/src/components/Nav/MobileMenuSheet.tsx`, `frontend/src/components/Nav/LocaleSwitcher.tsx`, `frontend/src/components/Nav/navItems.ts`
- [X] T011 [P] [US1] Localize shared pages/messages in `frontend/src/components/Common/NotFound.tsx`, `frontend/src/components/Common/ErrorComponent.tsx`, and dashboard greeting in `frontend/src/routes/_layout/dashboard.tsx`

**Checkpoint**: With locale set to `zh`, core navigation + auth pages display Chinese; switching back returns to English.

---

## Phase 4: User Story 2 - Remember language preference across visits (Priority: P2)

**Goal**: Locale persists across visits (signed-out via localStorage; signed-in optionally via account field). On sign-in, device preference wins unless the account has an explicit saved preference.

**Independent Test**:
- Signed-out: switch to Chinese → reload → stays Chinese.
- Signed-in: if `User.locale` is set, it overrides device locale on sign-in; if not set, device locale remains.

### Tests for User Story 2

- [X] T012 [P] [US2] Add backend API tests for locale read/write/validation in `backend/tests/api/routes/test_users.py`
- [X] T013 [P] [US2] Add Playwright coverage for signed-in locale persistence in `frontend/tests/localization-signed-in-persistence.spec.ts`

### Implementation for User Story 2

- [X] T014 [US2] Add `SupportedLocale` typing + `locale` fields to user schemas and model in `backend/app/models.py` (update `User`, `UserUpdateMe`, `UserPublic`)
- [X] T015 [US2] Add Alembic migration adding nullable `locale` column to user table in `backend/app/alembic/versions/` (new migration file)
- [X] T016 [US2] Enforce allowed locale values and persist updates in `backend/app/api/routes/users.py` for `PATCH /users/me`
- [X] T017 [P] [US2] Regenerate and commit the frontend OpenAPI client via `scripts/generate-client.sh` (updates `frontend/src/client/` types/services)
- [X] T018 [US2] Sync locale on sign-in/current-user load in `frontend/src/hooks/useAuth.ts` (if `currentUser.locale` exists, apply it via `i18n.changeLanguage`; otherwise keep the current device app locale from localStorage/browser defaulting)
- [X] T019 [P] [US2] Persist explicit locale changes for signed-in users by updating `frontend/src/components/Nav/LocaleSwitcher.tsx` and `frontend/src/components/Nav/MobileMenuSheet.tsx` to call the generated client (e.g. `UsersService.updateUserMe`) and keep UI responsive

**Checkpoint**: Signed-in users see consistent locale across reloads and new sessions when `User.locale` is set.

---

## Phase 5: User Story 3 - Graceful fallback when translations are missing (Priority: P3)

**Goal**: No broken/blank UI when a translation is missing; readable fallback is shown.

**Independent Test**:
- Temporarily remove a `zh` translation key in `frontend/src/i18n/locales/zh.json`, set locale to `zh`, and verify the UI shows English for that string via fallback (then restore the translation).

### Implementation for User Story 3

- [X] T020 [US3] Implement and document fallback behavior + dev warnings for missing keys in `frontend/src/i18n/i18n.ts` (ensure missing `zh` keys fall back to `en`; in development, log missing keys via an i18next `missingKeyHandler` or equivalent; in production, avoid noisy logging)
- [X] T021 [P] [US3] Document the fallback verification step in `specs/004-localization/quickstart.md`

**Checkpoint**: Missing translation never renders as blank or placeholder token.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finish quality gates and ensure contracts/tooling stay correct.

- [X] T022 [P] Localize user-facing toast titles/messages in `frontend/src/hooks/useCustomToast.ts` and error fallback text in `frontend/src/utils.ts`
- [X] T023 Run end-to-end validation using `backend/scripts/lint.sh`, `backend/scripts/test.sh`, frontend scripts in `frontend/package.json`, and Playwright tests in `frontend/tests/`
- [X] T025 [P] [US2] Add Playwright coverage for first-use defaulting and `zh-*` → `zh` mapping using Playwright context locale in `frontend/tests/localization-defaulting.spec.ts`
- [X] T026 [P] Implement localized API error normalization/mapping (auth/validation/permission) in `frontend/src/i18n/errors.ts` and integrate it into `frontend/src/utils.ts` and toast usage (`frontend/src/hooks/useCustomToast.ts`) to satisfy FR-010
- [X] T027 [P] Add a guardrail against accidental locale-aware formatting changes: audit existing `toLocale*` usage and document the invariant in `specs/004-localization/quickstart.md` (UI text localization only)
- [X] T028 [P] Add an explicit audit/checklist step to ensure user-generated content is never translated (FR-008): review key UI surfaces (e.g., chat/messages, names, emails) and ensure only UI chrome uses `t()`/translation keys

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Start immediately
- **Foundational (Phase 2)**: Depends on Setup; BLOCKS user story work (reactive locale + `useTranslation()` required; optional wrapper via `useT()` is allowed)
- **User Stories (Phase 3+)**: Depend on Foundational
- **Polish (Phase 6)**: Depends on desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: Depends on Phase 2 only
- **US2 (P2)**: Depends on Phase 2; backend changes are independent of US1 but easiest after US1’s i18n groundwork
- **US3 (P3)**: Depends on Phase 2

---

## Parallel Opportunities

- Phase 2: T003 and T004 can proceed in parallel (different files)
- US1: T006–T011 are largely parallelizable by file area (auth routes vs nav shell vs shared pages)
- US2: T012 (backend tests) can be written before T014–T016; T013 can be developed alongside backend work using mocked locale where helpful

---

## Parallel Example: User Story 1

```bash
# In parallel (different files/areas):
Task: "[US1] Localize auth routes" (frontend/src/routes/*.tsx)
Task: "[US1] Localize navbar + nav items" (frontend/src/components/Nav/*)
Task: "[US1] Localize shared pages" (frontend/src/components/Common/*)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 + Phase 2
2. Complete US1 (Phase 3)
3. Validate US1 independently (auth pages + navbar language switching)

### Incremental Delivery

1. US1 → demo language switching everywhere
2. US2 → demo persistence + account-level preference
3. US3 → demonstrate safe fallback under missing translations
