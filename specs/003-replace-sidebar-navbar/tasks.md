# Tasks: Replace Sidebar with Navigation Bar

**Input**: Design documents from `specs/003-replace-sidebar-navbar/` (`plan.md`, `spec.md`, `research.md`, `data-model.md`, `quickstart.md`, `contracts/`)

## Phase 1: Setup (Shared Infrastructure)

- [x] T001 Confirm existing shadcn config and component paths in frontend/components.json
- [x] T002 Add shadcn `command` UI primitive (creates frontend/src/components/ui/command.tsx)
- [x] T003 [P] Create navigation component folder frontend/src/components/Nav/ (and index barrel if desired in frontend/src/components/Nav/index.ts)

---

## Phase 2: Foundational (Blocking Prerequisites)

- [x] T004 Extract sidebar destination definitions into a shared module frontend/src/components/Nav/navItems.ts (source: frontend/src/components/Sidebar/AppSidebar.tsx)
- [x] T005 [P] Add shared active-route helper for nav items in frontend/src/components/Nav/isNavItemActive.ts
- [x] T006 [P] Implement persisted locale preference helper (localStorage + document.lang) in frontend/src/lib/locale.ts
- [x] T007 [P] Add locale hook for components to read/update locale in frontend/src/hooks/useLocale.ts
- [x] T008 Add Playwright data-testid conventions for the new navbar in specs/003-replace-sidebar-navbar/quickstart.md (update verification steps for selectors)

**Checkpoint**: Shared nav config + locale plumbing exists; story work can begin.

---

## Phase 3: User Story 1 - Consistent Top Navigation (Priority: P1) 🎯 MVP

**Goal**: Replace sidebar layout with a two-row top navbar across all pages (upper controls + lower destinations), matching existing max width and responsive behavior.

**Independent Test**: Visit `/`, `/resources`, `/dashboard` (signed in), confirm navbar renders with correct elements and no sidebar.

### Tests for User Story 1

- [x] T009 [P] [US1] Add navbar smoke coverage in frontend/tests/navbar-layout.spec.ts (navbar visible on `/`, `/resources`, `/login`, `/_layout` routes)
- [x] T010 [P] [US1] Update any sidebar-dependent test to reflect navbar placement (e.g., replace "Appearance button is visible in sidebar") in frontend/tests/user-settings.spec.ts
- [x] T044 [P] [US1] Extend frontend/tests/navbar-layout.spec.ts to verify logo click navigates to `/` (FR-020)
- [x] T045 [P] [US1] Extend frontend/tests/navbar-layout.spec.ts to verify mobile Menu drawer is dismissible (Escape) and keyboard-accessible (tab/arrow to an item and activate) (FR-018)

### Implementation for User Story 1

- [x] T011 [P] [US1] Implement locale switcher dropdown (e.g., `en`, `zh`) in frontend/src/components/Nav/LocaleSwitcher.tsx (uses frontend/src/hooks/useLocale.ts)
- [x] T012 [P] [US1] Implement account/auth controls for upper nav in frontend/src/components/Nav/AuthControls.tsx (signed-out: links to `/login` + `/signup`; signed-in: account menu)
- [x] T013 [P] [US1] Implement signed-in account dropdown menu (avatar + Settings/Logout) in frontend/src/components/Nav/AccountMenu.tsx
- [x] T014 [P] [US1] Implement upper-row centered trigger buttons (Search + AI Chat) skeleton in frontend/src/components/Nav/NavPrimaryActions.tsx
- [x] T015 [P] [US1] Implement lower-row desktop nav (horizontal list) in frontend/src/components/Nav/LowerNav.tsx using items from frontend/src/components/Nav/navItems.ts
- [x] T016 [P] [US1] Implement mobile “Menu” drawer (Sheet) that lists nav items in frontend/src/components/Nav/MobileMenuSheet.tsx
- [x] T017 [US1] Implement the composed two-row navbar wrapper with max-width constraints in frontend/src/components/Nav/AppNavbar.tsx

- [x] T018 [US1] Render the new navbar on all pages by updating frontend/src/routes/__root.tsx to include <AppNavbar /> above <Outlet />
- [x] T019 [US1] Remove LandingHeader usage and rely on AppNavbar in frontend/src/routes/index.tsx (and remove export from frontend/src/components/Landing/index.tsx if needed)
- [x] T020 [US1] Delete or retire the old landing-only header component frontend/src/components/Landing/LandingHeader.tsx (or refactor it to wrap AppNavbar and re-export)

- [x] T021 [US1] Replace the sidebar-based authenticated layout with navbar-only layout in frontend/src/routes/_layout.tsx (remove SidebarProvider/AppSidebar/SidebarInset/SidebarTrigger; keep auth guard + max-width container + Footer)
- [x] T022 [US1] Remove theme toggle duplication on auth pages by updating frontend/src/components/Common/AuthLayout.tsx (remove <Appearance /> header row if AppNavbar provides it)

- [x] T023 [US1] Verify no GitHub/Discord links appear in the new navbar by auditing frontend/src/components/Nav/AppNavbar.tsx and removing any external social links

- [x] T037 [P] [US1] Render the existing theme control in the new navbar (reuse `Appearance` / theme-provider behavior) in frontend/src/components/Nav/AppNavbar.tsx and ensure it is visible on `/`, `/login`, and authenticated routes

**Checkpoint**: Sidebar removed; the same two-row navbar appears everywhere with responsive mobile menu.

---

## Phase 4: User Story 2 - Keyword Search Dialog (Priority: P2)

**Goal**: Add a centered “search-bar-like” trigger in the navbar that opens a keyword search dialog.

**Independent Test**: From any route, click the search trigger → dialog opens; Escape closes; focus returns to trigger.

### Tests for User Story 2

- [x] T024 [P] [US2] Add Playwright coverage for search dialog open/close + Escape + focus restore in frontend/tests/navbar-search-dialog.spec.ts

### Implementation for User Story 2

- [x] T025 [P] [US2] Implement search dialog shell (Dialog) and trigger wiring in frontend/src/components/Nav/SearchDialog.tsx
- [x] T026 [US2] Implement Command-based search UI inside the dialog using frontend/src/components/ui/command.tsx and query ResourcesService in frontend/src/components/Nav/SearchDialog.tsx
- [x] T027 [US2] Add result navigation behavior (select result navigates via TanStack Router and closes dialog) in frontend/src/components/Nav/SearchDialog.tsx
- [x] T028 [US2] Wire SearchDialog trigger into the upper centered controls in frontend/src/components/Nav/NavPrimaryActions.tsx

- [x] T038 [US2] Add explicit “search unavailable/error” empty-state copy inside frontend/src/components/Nav/SearchDialog.tsx (dialog still opens; close + Escape + focus restore still work)
- [x] T040 [P] [US2] Add Playwright assertion for search dialog error/empty state in frontend/tests/navbar-search-dialog.spec.ts
- [x] T042 [US2] Ensure SearchDialog trigger uses shadcn/Radix `DialogTrigger` patterns so focus restoration is guaranteed (avoid custom focus hacks unless required)

**Checkpoint**: Search dialog is accessible, keyboard-friendly, and works from any page.

---

## Phase 5: User Story 3 - AI Chat Dialog (Priority: P3)

**Goal**: Add a centered AI chat trigger in the navbar that opens an AI chat dialog.

**Independent Test**: From any route, click the chat trigger → dialog opens; Escape closes; focus returns to trigger.

### Tests for User Story 3

- [x] T029 [P] [US3] Add Playwright coverage for chat dialog open/close + Escape + focus restore in frontend/tests/navbar-chat-dialog.spec.ts

### Implementation for User Story 3

- [x] T030 [P] [US3] Implement chat dialog shell (Dialog) in frontend/src/components/Nav/ChatDialog.tsx
- [x] T031 [US3] Reuse existing landing chat UI inside the dialog (or extract shared component) in frontend/src/components/Nav/ChatDialog.tsx and/or frontend/src/components/Landing/LandingChat.tsx
- [x] T032 [US3] Wire ChatDialog trigger into the upper centered controls in frontend/src/components/Nav/NavPrimaryActions.tsx

- [x] T039 [US3] Add explicit “chat unavailable” state inside frontend/src/components/Nav/ChatDialog.tsx (reuse existing 503 handling patterns; show guidance to use keyword search)
- [x] T041 [P] [US3] Add Playwright assertion for chat unavailable messaging in frontend/tests/navbar-chat-dialog.spec.ts
- [x] T043 [US3] Ensure ChatDialog trigger uses shadcn/Radix `DialogTrigger` patterns so focus restoration is guaranteed (avoid custom focus hacks unless required)

**Checkpoint**: Chat dialog opens from any page; unauthenticated users see sign-in CTA; authenticated users can chat.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T033 [P] Ensure navbar max-width matches main content container (audit + align classes) in frontend/src/components/Nav/AppNavbar.tsx and frontend/src/routes/_layout.tsx
- [x] T034 [P] Add/standardize data-testid attributes for navbar elements (logo, menu, search/chat triggers, theme, locale) in frontend/src/components/Nav/*.tsx
- [x] T035 Run and fix Playwright selectors impacted by layout change in frontend/tests/*.spec.ts
- [x] T036 Validate manual steps in specs/003-replace-sidebar-navbar/quickstart.md and update if any steps changed

---

## Dependencies & Execution Order

- Setup (Phase 1) → Foundational (Phase 2) → User stories.
- US1 is the MVP foundation for rendering the navbar everywhere.
- US2 and US3 depend on US1 (they need the navbar triggers), but can be implemented in parallel after US1’s navbar scaffold exists.

### User Story Dependencies

- US1 (P1): Depends on Phase 1–2 only.
- US2 (P2): Depends on US1 tasks T014/T017 (center triggers + navbar composition) and Phase 1–2.
- US3 (P3): Depends on US1 tasks T014/T017 (center triggers + navbar composition) and Phase 1–2.

---

## Parallel Examples

### US1 parallelizable tasks

- Run in parallel: T011, T012, T013, T015, T016 (all independent frontend/src/components/Nav/*.tsx files)

### US2 parallelizable tasks

- Run in parallel: T024 and T025 (tests vs implementation file)

### US3 parallelizable tasks

- Run in parallel: T029 and T030 (tests vs implementation file)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (T001–T003)
2. Complete Phase 2 (T004–T008)
3. Complete US1 (T009–T023)
4. Validate against specs/003-replace-sidebar-navbar/quickstart.md and ensure Playwright passes

### Incremental Delivery

1. Ship US1 (navbar + responsive lower nav + auth/theme/locale)
2. Add US2 (search dialog) and validate independently
3. Add US3 (chat dialog) and validate independently
