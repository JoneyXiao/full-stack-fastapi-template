---

description: "Task list for feature implementation"
---

# Tasks: AI Resource Landing Page

**Input**: Design documents from `/specs/002-ai-landing-page/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Included (repository constitution expects tests for behavior changes; this feature changes `/` routing and adds new API endpoints).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Every task includes an exact file path

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Minimal shared setup for this feature

- [x] T001 Update environment template with chat provider variables (OPENAI_API_KEY, OPENAI_BASE_URL, OPENAI_MODEL) in .env.example

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core building blocks shared by multiple stories

- [x] T002 Add optional OpenAI-compatible settings (API key/base URL/model) to backend/app/core/config.py
- [x] T003 Add SavedChatTranscript SQLModel + request/response schemas to backend/app/models.py
- [x] T004 Create Alembic revision for saved chat transcripts (generated filename) under backend/app/alembic/versions/ (message: "saved chat transcripts")
- [x] T005 Implement CRUD helpers for SavedChatTranscript in backend/app/crud.py
- [x] T006 Add landing chat + chat transcripts API routers and include them in backend/app/api/main.py
- [x] T007 Create public landing route shell at '/' in frontend/src/routes/index.tsx

**Checkpoint**: Foundation ready - user story work can proceed

---

## Phase 3: User Story 1 - Find resources with keyword search (Priority: P1) 🎯 MVP

**Goal**: Visitors can search resources by keyword directly on the landing page.

**Independent Test**: Open `/`, enter keywords, see matching resources (or friendly empty state) without needing chat.

### Tests for User Story 1

- [x] T008 [P] [US1] Add Playwright coverage for landing search states + keyboard submit (Enter) + partial-match assertion in frontend/tests/landing-search.spec.ts

### Implementation for User Story 1

- [x] T009 [P] [US1] Create landing search components in frontend/src/components/Landing/LandingSearch.tsx and frontend/src/components/Landing/ResourceResultCard.tsx
- [x] T010 [US1] Wire landing search to ResourcesService.listResources in frontend/src/routes/index.tsx
- [x] T011 [US1] Implement empty-query guard + labeled input + loading/error/empty states (loading indicator within 250ms; friendly retry copy) in frontend/src/routes/index.tsx
- [x] T012 [US1] Implement result click-through to /resources/$resourceId in frontend/src/routes/index.tsx

**Checkpoint**: US1 search is usable and testable

---

## Phase 4: User Story 2 - Get guided recommendations via chat (Priority: P2)

**Goal**: Signed-in users can ask for recommendations via chat, and optionally save transcripts.

**Independent Test**: Signed-in user can send a prompt and get recommendations that link only to real resources; signed-out users are prompted to sign in.

### Tests for User Story 2

- [x] T013 [P] [US2] Add API tests for /landing/chat/recommendations auth + 503 fallback in backend/tests/api/routes/test_landing_chat.py
- [x] T014 [P] [US2] Add API tests for /me/chat-transcripts CRUD ownership rules in backend/tests/api/routes/test_chat_transcripts.py
- [x] T015 [P] [US2] Add Playwright test for signed-out chat gating in frontend/tests/landing-chat-gating.spec.ts
- [x] T016 [P] [US2] Add Playwright test for signed-in chat + save transcript in frontend/tests/landing-chat-signedin.spec.ts

### Implementation for User Story 2

- [x] T017 [US2] Implement grounded chat recommendations endpoint in backend/app/api/routes/landing_chat.py
- [x] T018 [US2] Implement LLM HTTP client helper + error handling in backend/app/utils.py
- [x] T019 [US2] Implement chat transcript CRUD endpoints in backend/app/api/routes/chat_transcripts.py
- [x] T020 [US2] Regenerate OpenAPI + frontend client via scripts/generate-client.sh (updates frontend/openapi.json and frontend/src/client/)
- [x] T021 [P] [US2] Add TanStack Query hooks for landing chat + transcripts in frontend/src/hooks/useLandingChat.ts and frontend/src/hooks/useChatTranscripts.ts
- [x] T022 [P] [US2] Build landing chat UI components (loading indicator within 250ms; friendly error + retry) in frontend/src/components/Landing/LandingChat.tsx and frontend/src/components/Landing/ChatMessageList.tsx
- [x] T023 [P] [US2] Build saved transcript UI (list/open/delete) in frontend/src/components/Landing/SavedTranscriptsDialog.tsx
- [x] T024 [US2] Wire chat section into landing route with sign-in gating + /login CTA in frontend/src/routes/index.tsx

- [x] T036 [US2] Add explicit clear/restart chat control + behavior (resets in-memory conversation) in frontend/src/components/Landing/LandingChat.tsx
- [x] T037 [P] [US2] Extend frontend/tests/landing-chat-signedin.spec.ts to assert clear/restart chat empties the transcript UI

**Checkpoint**: US2 chat works for signed-in users; transcripts can be saved and managed

---

## Phase 5: User Story 3 - Feel welcomed and know where to start (Priority: P3)

**Goal**: Landing feels playful/friendly and clearly communicates purpose + next steps.

**Independent Test**: Open `/` and identify purpose + primary actions (search/chat/browse) within a few seconds.

### Tests for User Story 3

- [x] T025 [P] [US3] Add Playwright smoke for landing hero + CTAs in frontend/tests/landing-smoke.spec.ts

### Implementation for User Story 3

- [x] T026 [P] [US3] Implement landing hero content + CTAs in frontend/src/components/Landing/Hero.tsx
- [x] T027 [P] [US3] Implement featured topic tiles linking to /resources?q=... in frontend/src/components/Landing/FeaturedTopics.tsx
- [x] T028 [P] [US3] Implement "How it works" section in frontend/src/components/Landing/HowItWorks.tsx
- [x] T029 [US3] Implement floating landing header (brand + Search/Chat actions + Browse/Contribute links + theme control) with mobile-reachable actions (no horizontal scroll at 320px) in frontend/src/components/Landing/LandingHeader.tsx
- [x] T030 [US3] Assemble sections + ensure pointer cursor + hover/active/focus states (no layout shift), reduced-motion, no parallax/scroll-jacking, no continuous decorative animation, and responsive layout at 320/768/1024px in frontend/src/routes/index.tsx

**Checkpoint**: US3 welcome experience is clear, accessible, and consistent with the UI/UX spec

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finish + harden the feature across stories

- [x] T031 [P] Document chat provider env vars (OPENAI_API_KEY, OPENAI_BASE_URL, OPENAI_MODEL) and landing behavior in development.md and deployment.md
- [x] T032 Validate quickstart steps and update specs/002-ai-landing-page/quickstart.md if needed
- [x] T033 Run backend checks and fix feature-related issues: backend/scripts/lint.sh and backend/scripts/test.sh
- [x] T034 Run frontend checks and fix feature-related issues: frontend/package.json scripts (npm run lint, npm run build)
- [ ] T035 Run Playwright suite for landing tests via frontend/Dockerfile.playwright or npx playwright test (requires full stack running)

- [x] T038 [P] Manual accessibility verification checklist (keyboard-only navigation, focus visibility, contrast spot-check incl dark mode borders/contrast, and non-color-only status indicators) for the landing page in specs/002-ai-landing-page/quickstart.md
- [x] T039 [P] Ensure no emoji are used as functional UI icons and icons come from one consistent set (e.g., lucide-react) on landing; validate in frontend/tests/landing-smoke.spec.ts and/or a quick manual review
- [x] T040 [P] Validate performance targets (search <2s, chat <5s) and document measurement notes in specs/002-ai-landing-page/quickstart.md

---

## Dependencies & Execution Order

### Dependency graph (story completion order)

Setup (Phase 1)
→ Foundational (Phase 2)
→ US1 (P1 search MVP)
→ US2 (P2 chat + transcripts)
→ US3 (P3 welcome/polish of landing content)
→ Polish (Phase 6)

### User Story Dependencies

- **US1**: Depends on Phase 2 (public landing route exists); no dependency on US2/US3.
- **US2**: Depends on Phase 2 (backend models/migration/routers) and client regeneration (T020).
- **US3**: Depends on Phase 2 (public landing route exists); can be developed alongside US1.

---

## Parallel execution examples

### US1 (Search)

- Run in parallel: T008 (tests) and T009 (components)
- Then: T010–T012 (wiring + states + navigation)

### US2 (Chat)

- Run in parallel: T013–T016 (backend+frontend tests)
- Then: T017–T019 (backend endpoints) → T020 (client regen)
- Then in parallel: T021–T023 (hooks + UI components)
- Finally: T024 (wire into landing)

### US3 (Welcome)

- Run in parallel: T025 (smoke test) and T026–T028 (sections)
- Then: T029–T030 (header + assembly/a11y/motion)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1–2 (T001–T007)
2. Complete US1 (T008–T012)
3. STOP and validate: run the US1 Playwright test(s) in frontend/tests/landing-search.spec.ts

### Incremental Delivery

1. Ship US1 (search) as the first increment
2. Add US2 (chat + transcripts) and re-run backend + Playwright coverage
3. Add US3 (welcome content) and re-run landing smoke coverage
4. Finish Phase 6 polish and run full checks (T031–T040)
