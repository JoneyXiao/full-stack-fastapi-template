---
description: "Executable task list for implementing 005-rich-text-editor"
---

# Tasks: Rich Text Editor for Submission Descriptions

**Input**: Design documents from `specs/005-rich-text-editor/`
**Prerequisites**: `specs/005-rich-text-editor/plan.md`, `specs/005-rich-text-editor/spec.md`

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Every task includes exact file paths

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install frontend deps + prepare shared Markdown components

- [X] T001 Review feature requirements in specs/005-rich-text-editor/spec.md and specs/005-rich-text-editor/plan.md
- [X] T002 Add Markdown editor + renderer deps in frontend/package.json (`@uiw/react-md-editor`, `react-markdown`, `remark-gfm`)
- [X] T003 [P] Add CSS imports required by `@uiw/react-md-editor` in frontend/src/index.css (and verify dark mode readability)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Backend schema/validation + shared frontend primitives that all stories depend on

- [X] T004 Update description length constraints to 10000 in backend/app/models.py (ResourceSubmissionBase.description and ResourceSubmissionUpdate.description)
- [X] T005 Create Alembic migration to widen `resourcesubmission.description` column to 10000 in backend/app/alembic/versions/ (new revision file)
- [X] T006 Add/adjust backend validation tests for description length boundaries in backend/tests/api/routes/test_submissions.py (allow exactly 10,000 chars; reject 10,001 chars)
- [X] T007 Run scripts/generate-client.sh once to regenerate frontend/openapi.json and frontend/src/client/ (ensures OpenAPI has `description.maxLength: 10000`)
- [X] T008 Verify the regenerated artifacts are present and up to date in frontend/openapi.json and frontend/src/client/ (no hand-edits under frontend/src/client/)
- [X] T009 [P] Create safe Markdown renderer component in frontend/src/components/markdown/Markdown.tsx (GFM enabled; no raw HTML rendering; HTML tags displayed as literal text; safe URL handling hook)
- [X] T010 [P] Create Markdown editor wrapper in frontend/src/components/markdown/MarkdownEditor.tsx using `@uiw/react-md-editor` (controlled value/onChange; toolbar configured for required formatting; accessible labels)

**Checkpoint**: Backend accepts 10,000 chars; frontend has reusable Markdown editor/renderer primitives

---

## Phase 3: User Story 1 - Write a formatted description while submitting (Priority: P1) 🎯 MVP

**Goal**: Replace textarea with a GitHub-like Markdown editor and render formatting after submit

**Independent Test**: Create a submission containing bold/italics/lists and verify it renders formatted on the submission detail page.

### Implementation for User Story 1

- [X] T011 [US1] Replace the description `<Textarea>` with MarkdownEditor in frontend/src/routes/_layout/submissions/new.tsx
- [X] T012 [US1] Enforce 10,000 character limit in frontend/src/routes/_layout/submissions/new.tsx (inline error + disable submit when exceeded)
- [X] T013 [US1] Render saved submission description as Markdown in frontend/src/routes/_layout/submissions/$submissionId.tsx using frontend/src/components/markdown/Markdown.tsx
- [X] T014 [US1] Render pending submission descriptions as Markdown in frontend/src/routes/_layout/admin.tsx using frontend/src/components/markdown/Markdown.tsx (preserve existing `line-clamp-2` layout)
- [X] T015 [US1] Ensure optional description remains supported in frontend/src/routes/_layout/submissions/new.tsx (empty string → `null` in requestBody)

### Accessibility checks for User Story 1

- [X] T016 [US1] Verify keyboard accessibility: toolbar buttons are focusable and have accessible names; switching Write/Preview is keyboard-reachable in frontend/src/components/markdown/MarkdownEditor.tsx

### Tests for User Story 1

- [X] T017 [P] [US1] Add Playwright e2e test creating a submission with bold/list and verifying rendered HTML in frontend/tests/submissions-markdown-us1.spec.ts

**Checkpoint**: New submission page supports Markdown editing; formatting is preserved and rendered in detail + admin list

---

## Phase 4: User Story 2 - Add links and verify appearance before submitting (Priority: P2)

**Goal**: Links work in preview/view, open in new tab/window, and unsafe URLs are not rendered as clickable

**Independent Test**: Insert a Markdown link, preview it, submit, and verify the rendered link opens in a new tab and unsafe protocols are blocked.

### Implementation for User Story 2

- [X] T018 [US2] Add link rendering policy in frontend/src/components/markdown/Markdown.tsx: force `target="_blank"` + `rel="noopener noreferrer"` for links
- [X] T019 [US2] Add safe URL handling for links/images in frontend/src/components/markdown/Markdown.tsx (block `javascript:` and other unsafe protocols; do not create clickable links for blocked URLs)
- [X] T020 [US2] Ensure the editor supports link insertion UI (e.g., toolbar command to insert `[text](url)`) in frontend/src/components/markdown/MarkdownEditor.tsx
- [X] T021 [US2] Ensure the editor provides a preview mode and that preview is reachable via keyboard in frontend/src/components/markdown/MarkdownEditor.tsx
- [X] T022 [US2] Add a clear user-facing validation message for malformed OR unsafe link/image URLs (e.g., missing scheme, invalid URL, `javascript:`) on the new submission page in frontend/src/routes/_layout/submissions/new.tsx

### Tests for User Story 2

- [X] T023 [P] [US2] Add Playwright test verifying rendered links open new tab + malformed/unsafe URLs are not rendered as clickable links in frontend/tests/submissions-markdown-us2-links.spec.ts

**Checkpoint**: Link behavior is safe and consistent in preview + display

---

## Phase 5: User Story 3 - Include images in descriptions safely (Priority: P3)

**Goal**: Image URLs render inline safely and failures degrade gracefully

**Independent Test**: Add a valid image URL and see it render; add an invalid image URL and confirm the page remains usable.

### Implementation for User Story 3

- [X] T024 [US3] Add image rendering behavior in frontend/src/components/markdown/Markdown.tsx (allow only safe URL protocols; add `loading="lazy"`; provide a visible fallback on image load error)
- [X] T025 [US3] Ensure the editor supports inserting image Markdown syntax (toolbar command or documented pattern) in frontend/src/components/markdown/MarkdownEditor.tsx

### Tests for User Story 3

- [X] T026 [P] [US3] Add Playwright test verifying image renders and broken images degrade gracefully in frontend/tests/submissions-markdown-us3-images.spec.ts

**Checkpoint**: Images render safely; broken images don’t break the page

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T027 [P] Add i18n strings for length validation/help text in frontend/src/i18n/locales/en.json and frontend/src/i18n/locales/zh.json
- [X] T028 [P] Add a small XSS regression check in Playwright (e.g., `<script>` does not execute) in one of frontend/tests/submissions-markdown-*.spec.ts files
- [X] T029 Run backend quality gates: backend/scripts/lint.sh and backend/scripts/tests-start.sh
- [X] T030 Run frontend quality gates via frontend/package.json scripts: `npm run lint` and `npm run build`
- [X] T031 Validate the manual smoke steps in specs/005-rich-text-editor/quickstart.md and update it if any steps changed

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup completion; blocks all user stories
- **User Stories (Phases 3–5)**: Depend on Foundational completion; can be implemented sequentially (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on completing desired user stories

### User Story Dependencies

- **US1 (P1)**: Requires Phase 2; provides MVP
- **US2 (P2)**: Builds on the shared renderer from Phase 2; may reuse US1 wiring
- **US3 (P3)**: Builds on the shared renderer from Phase 2; may reuse US1 wiring

---

## Parallel Execution Examples

### US1 (after Phase 2)

- T016 and T017 can run in parallel (backend vs frontend tests)

### US2

- T021 can run in parallel with T018–T020 once the renderer changes are in place

### US3

- T026 can run in parallel with T024–T025 once the renderer changes are in place
