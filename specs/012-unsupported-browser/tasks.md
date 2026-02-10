# Tasks: Unsupported Browser Notice

**Input**: Design documents from `/specs/012-unsupported-browser/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Implementation files (expected)**:
- `frontend/index.html`
- `frontend/src/bootstrap.ts`
- `frontend/src/lib/unsupportedBrowser.ts`
- `frontend/tests/unsupported-browser.spec.ts`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish minimal scaffolding used by the feature

- [X] T001 Create the bootstrap entry module in frontend/src/bootstrap.ts
- [X] T002 [P] Create the browser detection utility module in frontend/src/lib/unsupportedBrowser.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Entry-point gating that MUST exist before user story behavior can be verified

- [X] T003 Update frontend/index.html to add a default-visible full-page notice container and switch the module entry to /src/bootstrap.ts
- [X] T004 Implement supported/unsupported gating in frontend/src/bootstrap.ts (hide notice + import ./main.tsx only when supported)

**Checkpoint**: Foundation ready — app boot is gated by browser support

---

## Phase 3: User Story 1 — See compatibility notice (Priority: P1) 🎯 MVP

**Goal**: Unsupported browsers see a full-page bilingual notice with minimum supported versions

**Independent Test**: Override User-Agent to an unsupported version and verify the notice is visible and the app UI is not shown

### Tests for User Story 1

- [X] T005 [P] [US1] Add Playwright test for an unsupported UA in frontend/tests/unsupported-browser.spec.ts (assert full-page notice visible; app root not visible; exact EN+ZH message + helper text present; minimum versions list includes Chrome/Edge/Firefox/Safari thresholds)

### Implementation for User Story 1

- [X] T006 [US1] Implement the exact bilingual message + helper text and the minimum-version list in frontend/index.html
- [X] T007 [US1] Ensure unknown/unparseable UA results in unsupported behavior in frontend/src/lib/unsupportedBrowser.ts

**Checkpoint**: On unsupported UA, the full-page notice reliably replaces the app UI

---

## Phase 4: User Story 2 — No false warnings (Priority: P2)

**Goal**: Supported browsers are not blocked by an incorrect notice

**Independent Test**: Override User-Agent to a supported version and verify the notice is not shown and the app loads

### Tests for User Story 2

- [X] T008 [P] [US2] Add Playwright test for a supported UA in frontend/tests/unsupported-browser.spec.ts (assert notice hidden; app root visible; notice copy not present)

### Implementation for User Story 2

- [X] T009 [US2] Refine browser-family/version parsing to avoid common false positives (Edge vs Chrome ordering; Safari requires Version/…) in frontend/src/lib/unsupportedBrowser.ts
- [X] T010 [US2] Verify bootstrap behavior does not regress supported browsers in frontend/src/bootstrap.ts

**Checkpoint**: Supported UA boots the app; notice does not appear

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Validation, docs, and operational checks that span the feature

- [X] T011 [P] (Risk documentation) Document the TLS/Traefik limitation: if the client cannot complete the TLS handshake, the notice cannot render because no HTML is delivered (specs/012-unsupported-browser/research.md)
- [X] T012 Run the quickstart scenarios and update specs/012-unsupported-browser/quickstart.md if any steps differ in practice
- [X] T013 [P] Run frontend lint/build (frontend/package.json) and fix any issues in frontend/index.html and frontend/src/**
- [X] T014 [P] (Risk documentation) Review Traefik/deployment configuration for minimum TLS compatibility in docker-compose.traefik.yml and deployment.md; record findings in specs/012-unsupported-browser/research.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Phase 1
- **User Stories (Phase 3–4)**: Depend on Phase 2
- **Polish (Phase 5)**: Depends on desired user stories

### User Story Dependencies

- **US1 (P1)**: Depends on Foundational phase only
- **US2 (P2)**: Depends on Foundational phase only (should remain independently testable)

---

## Parallel Execution Examples

### Parallel Example: US1

- Run in parallel:
  - T005 (Playwright test) in `frontend/tests/unsupported-browser.spec.ts`
  - T006 (notice copy + versions list) in `frontend/index.html`

### Parallel Example: US2

- Run in parallel:
  - T008 (supported UA Playwright test) in `frontend/tests/unsupported-browser.spec.ts`
  - T009 (parser refinement) in `frontend/src/lib/unsupportedBrowser.ts`

---

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Phase 1–2
2. Complete US1 (Phase 3)
3. Validate via `specs/012-unsupported-browser/quickstart.md`

### Incremental Delivery

- Add US2 only after US1 is stable, since US2 is primarily about preventing false positives and regression-proofing the gate
