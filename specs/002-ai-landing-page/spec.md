# Feature Specification: AI Resource Landing Page

**Feature Branch**: `002-ai-landing-page`
**Created**: 2026-01-13
**Status**: Draft
**Input**: User description: "Build a landing page for this AI resources sharing website. Playful and friendly style, with keyword search and AI chat."
**Constitution**: `.specify/memory/constitution.md`

## Clarifications

### Session 2026-01-13

- Q: Should landing-page chat messages be persisted (stored) or session-only? → A: Persist only for signed-in users (optional “save chats”).
- Q: Who can use the AI chat on the landing page? → A: Signed-in users only.
- Q: Where should this landing page live in the app? → A: Replace the home page at `/`.
- Q: What matching behavior should keyword search use by default? → A: Partial match on title/summary.
- Q: Should the landing page support dark mode? → A: Yes (light + dark).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Find resources with keyword search (Priority: P1)

As a first-time visitor, I want to search for AI resources by keyword from the landing page so I can quickly find something relevant without having to browse the entire catalog.

**Why this priority**: Keyword search is the fastest path to value and the most direct way to confirm the site is useful.

**Independent Test**: A tester can open the landing page, enter keywords, and confirm the experience returns relevant resources (or an appropriate empty state) without requiring any other features.

**Acceptance Scenarios**:

1. **Given** the visitor is on the landing page, **When** they enter a keyword and submit, **Then** they see a list of matching resources with enough summary information to decide what to open.
2. **Given** the visitor submits a keyword that matches no resources, **When** results are shown, **Then** the page displays a friendly “no results” message with suggestions to adjust the query and/or try browsing.
3. **Given** the visitor submits an empty query, **When** they attempt to search, **Then** the page prevents a confusing “blank search” and guides them to enter a keyword.

---

### User Story 2 - Get guided recommendations via chat (Priority: P2)

As a signed-in user, I want to describe what I’m trying to learn or build in a chat so I can get friendly, guided recommendations to relevant resources.

**Why this priority**: Chat supports users who don’t know the right keywords and reinforces the site’s “AI-friendly” identity.

**Independent Test**: A tester can ask the chat for a specific need (e.g., “I want beginner-friendly prompt engineering resources”) and verify the assistant provides actionable suggestions and safe, helpful fallbacks.

**Acceptance Scenarios**:

1. **Given** the user is signed in and opens the chat on the landing page, **When** they ask for resources on a topic, **Then** the assistant replies with a short set of suggested resources that can be opened from the response.
2. **Given** the user is not signed in, **When** they attempt to use chat, **Then** the landing page prompts them to sign in and offers keyword search as a fallback.
3. **Given** chat is temporarily unavailable, **When** the signed-in user tries to use chat, **Then** the landing page shows a friendly error and offers keyword search as a fallback.

---

### User Story 3 - Feel welcomed and know where to start (Priority: P3)

As a visitor, I want the landing page to feel playful and friendly while clearly explaining what this site is, so I can confidently choose a next step (search, chat, browse, or contribute).

**Why this priority**: A clear, welcoming first impression improves trust and helps visitors self-direct.

**Independent Test**: A tester can open the landing page and verify they can identify the purpose and take a primary action within a few seconds.

**Acceptance Scenarios**:

1. **Given** the visitor lands on the page, **When** they scan the hero area, **Then** they can understand the site’s purpose and see primary calls-to-action for search and chat.
2. **Given** the visitor prefers browsing, **When** they view the landing page, **Then** they can access featured categories/topics and open a category view.

### Edge Cases

- Very long search queries (e.g., pasted paragraphs) should not break layout and should still produce a clear outcome.
- No network / offline mode should show an understandable error and a way to retry.
- Slow responses should show visible loading states for both search and chat.
- Unsafe or disallowed chat requests should be refused with a helpful, non-judgmental explanation and a safe alternative (e.g., “I can help you find learning resources instead”).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The landing page MUST communicate the site’s purpose (sharing AI resources) in clear, friendly language.
- **FR-002**: The landing page MUST provide a prominent keyword search entry point.
- **FR-003**: Users MUST be able to submit a search via keyboard and pointer/tap interactions.
- **FR-004**: Search results MUST present resource previews (at minimum: title and a short summary) and provide a clear way to open a selected resource.
- **FR-005**: The landing page MUST show an explicit “no results” state when search returns no matches, including suggestions for next steps.
- **FR-006**: The landing page MUST provide an AI chat entry point that allows signed-in users to ask for resource recommendations in natural language.
- **FR-007**: Chat responses MUST only recommend resources that exist in the site’s catalog; if the assistant is uncertain, it MUST say so and guide the user to search or browse.
- **FR-008**: The landing page MUST provide clear loading and error states for search and chat interactions.
- **FR-009**: The landing page MUST be usable on both mobile and desktop form factors.
- **FR-010**: The landing page MUST follow a playful and friendly tone without obscuring readability, trust, or accessibility.
- **FR-011**: The landing page MUST allow a user to clear or restart the chat conversation from the landing page.
- **FR-012**: Interactive elements MUST provide visible hover, active, and focus states.
- **FR-013**: The landing page MUST respect reduced-motion preferences by limiting or disabling non-essential motion.
- **FR-014**: The landing page MUST avoid emoji as UI icons and MUST use a consistent icon style across the page.
- **FR-015**: The landing page MUST meet baseline accessibility expectations for contrast and keyboard navigation.
- **FR-016**: The landing page chat MUST be available only to signed-in users.
- **FR-017**: Chat history persistence MUST be available only to signed-in users who explicitly choose to save chats.
- **FR-018**: The landing page MUST be served as the default home page at `/`.
- **FR-019**: Keyword search MUST use partial matching over resource title and summary/description by default.
- **FR-020**: The landing page MUST support both light and dark color modes.

### Acceptance Criteria (Functional Requirements)

- **AC-001 (FR-001)**: A first-time visitor can describe what the site offers after reading the hero content, without additional navigation.
- **AC-002 (FR-002)**: The keyword search input is visible without scrolling on common screen sizes.
- **AC-003 (FR-003)**: Search can be submitted via keyboard (e.g., Enter) and via a pointer/tap action.
- **AC-004 (FR-004)**: Each result shows a title and short summary and includes a clear action to open the resource.
- **AC-005 (FR-005)**: A “no results” search shows a friendly message plus at least one concrete suggestion (change keywords, browse, or try chat).
- **AC-006 (FR-006)**: A signed-in user can open chat, submit a message, and receive a reply without leaving the landing page.
- **AC-007 (FR-007)**: Chat recommendations always link to real resources; if none match, the assistant asks clarifying questions and/or directs the user to search/browse.
- **AC-008 (FR-008)**: During search/chat requests, a loading state is visible; on failure, an error state is shown with a retry path.
- **AC-009 (FR-009)**: On both mobile and desktop layouts, all primary actions (search, open results, open chat, send message) remain usable without overlapping or hidden controls.
- **AC-010 (FR-010)**: Copy and visuals maintain a friendly tone while meeting accessibility expectations (readable text, clear contrast, understandable labels).
- **AC-011 (FR-011)**: A visitor can clear/restart chat and see that the previous conversation is no longer shown.
- **AC-012 (FR-012)**: All clickable elements show a pointer cursor, a hover change, and a keyboard-visible focus indicator.
- **AC-013 (FR-013)**: With reduced-motion preference enabled, decorative motion is removed and transitions are minimal.
- **AC-014 (FR-014)**: No emoji are used as functional UI icons; icons share consistent visual weight and size.
- **AC-015 (FR-015)**: Users can complete primary flows using a keyboard only, and text contrast meets $\ge 4.5:1$ for normal text.
- **AC-016 (FR-016)**: When signed out, the landing page does not allow sending chat messages and instead guides the user to sign in.
- **AC-017 (FR-017)**: When signed in and “save chats” is used, the saved transcript is available to the user later.
- **AC-018 (FR-018)**: Visiting `/` shows the landing page experience described in this spec.
- **AC-019 (FR-019)**: Searching for a partial term that appears in a resource title or summary returns that resource in results.
- **AC-020 (FR-020)**: Users can view the landing page in both light and dark mode with readable text, visible borders, and accessible contrast.

## UI/UX Specification

### Visual Style

**Style direction**: Playful and friendly, but still trustworthy and readable.

- Use bold, block-based sections with generous spacing.
- Keep motion subtle and purposeful (avoid continuous decorative animation).
- Use soft depth (subtle shadows/borders) rather than heavy skeuomorphism.

### Color Palette (Light-first)

Primary palette option (community-friendly):

- **Primary**: #7C3AED
- **Secondary**: #A78BFA
- **CTA/Accent**: #F97316
- **Background**: #FAF5FF
- **Text**: #4C1D95
- **Border**: #DDD6FE

Accessibility constraint: body text and interactive labels must meet $\ge 4.5:1$ contrast against their backgrounds.

### Dark Mode

- The landing page supports **light + dark** modes.
- The header includes a theme control (toggle or equivalent) so users can switch modes.
- Dark mode must preserve readability (avoid overly transparent surfaces) and maintain visible borders and focus states.

Suggested dark palette (brand-consistent, high-contrast):

- **Background**: #0B0B10
- **Text**: #F8FAFC
- **Border**: #1E293B
- **Primary**: #A78BFA
- **CTA/Accent**: #F97316

### Typography

Recommended pairing (friendly + readable):

- **Headings**: Fredoka (rounded, approachable)
- **Body**: Nunito (high readability)

### Page Structure (Landing Pattern)

Use a hero-centric structure with social proof elements (this is the default content at `/`):

1. **Floating header**: brand + primary actions (Search, Chat) + secondary actions (Browse, Contribute) + theme control
2. **Hero**: value proposition + short subtext + primary CTA(s)
3. **Primary interaction zone**: keyword search (prominent) + chat entry (equally visible)
4. **Featured topics/categories**: quick-start tiles for browsing (MVP: a small, curated static list maintained in the frontend)
5. **How it works**: 3-step explanation (Search → Open → Save/Share)
6. **Social proof**: optional; if no testimonials/metrics exist, omit this section rather than adding placeholder content
7. **Footer**: helpful links (Docs/FAQ, Privacy, Contact)

### Component Behavior & States

**Search**

- Input has a visible label (or equivalent accessible labeling) and clear placeholder guidance.
- Submitting empty input should show inline guidance (not a generic error).
- Search matching uses a case-insensitive substring match over resource `title` and `description` (treat the user input as a single string; no tokenization required for MVP).
- Results display supports: loading, success, empty, error.

**Search Results**

- Each item includes: title, short summary, and a clear “open” action.
- Hover states must not cause layout shift.

**Chat**

- Chat is available on the landing page without navigation.
- The chat entry point clearly communicates what it can do (“Ask for recommendations”) and indicates sign-in is required.
- Provide a clear action to restart/clear the conversation.
- Only signed-in users can send chat messages; signed-out users are prompted to sign in.
- Signed-in users may optionally save chats.
- Responses should be concise; if uncertain, ask a clarifying question rather than guessing.

### Interaction & Feedback

- All interactive elements provide: pointer cursor, hover feedback, and a visible focus indicator.
- Async operations (search/chat) show immediate feedback: loading indicator within 250ms.
- Error states are friendly, specific, and provide a retry path.

### Motion Guidelines

- Animate at most 1–2 key elements per view.
- Avoid parallax/scroll-jacking.
- Avoid infinite decorative animations; continuous motion is reserved for loading indicators.
- Respect reduced-motion preferences by disabling decorative effects and limiting transitions to subtle, non-essential changes (loading indicators are allowed).

### Accessibility Guidelines

- Keyboard navigation supports the primary flows end-to-end.
- Primary flows (keyboard-only): (1) search and open a resource, (2) open chat (signed-in), send a message, and receive a response, (3) clear/restart chat, (4) save a transcript (signed-in) and then open/delete it.
- Focus indicators must be visible in both light and dark modes and must not be clipped/hidden by layout/overflow.
- Contrast: normal text $\ge 4.5:1$.
- Non-text UI (borders, focus rings, and icon-only controls) must remain perceptible in both color modes (WCAG-style expectation: $\ge 3:1$ against adjacent colors).
- Forms: inputs have labels and clear error messages.
- Do not rely on color alone to communicate state.

### Navigation Targets (Landing CTAs)

- **Browse** CTA links to `/resources`.
- **Contribute** CTA links to `/submissions/new` (if the user is signed out, the app may require sign-in and then return the user to the submission page).

### Content Voice

Voice is warm, playful, and helpful; avoid jargon-heavy marketing.

Example microcopy (non-binding):

- Hero: “Find the best AI resources—fast.”
- Subtext: “Search curated links or ask the assistant for recommendations.”
- Search placeholder: “Try: ‘RAG tutorial’, ‘prompt engineering’, ‘agents’…”
- Empty state: “No matches yet. Try a shorter keyword, or ask the chat for suggestions.”

Note: When chat requires sign-in, empty-state prompts that mention chat should also indicate “Sign in to use chat”.

### Assumptions

- The site already has (or will have) a resource catalog that can be searched and linked to from the landing page.
- Visitors can use landing-page search without creating an account.
- If the product supports sign-in, it is required for AI chat, and it is also used for optional features such as saving chat transcripts.
- The primary language for landing content is English.

### Transcript Persistence & Privacy Notes

- In-memory chat on the landing page is session-only unless the user explicitly saves a transcript.
- Saving a transcript is an explicit user action (e.g., clicking a “Save chat” button) and is available only to signed-in users.
- Deleting a transcript removes it immediately from the user’s saved list (hard delete for MVP).
- Logs must not include raw chat transcript contents; operational logging should use minimal metadata and avoid PII.

### Routing Notes

- This feature replaces the existing home page route at `/`.

### Out of Scope

- Supporting anonymous (signed-out) chat prompts.

### Key Entities *(include if feature involves data)*

- **Search Query**: The user-entered keyword(s) used to find resources.
- **Resource Preview**: A compact summary of a resource shown in search/chat suggestions (e.g., title, short description, tags).
- **Chat Session**: A single conversational context on the landing page that can be cleared/restarted by the user.
- **Chat Message**: A user or assistant message within a chat session.
- **Recommendation**: A suggestion that links a user need to one or more resources.
- **Saved Chat Transcript**: A user-owned saved copy of a chat session (available only to signed-in users who choose to save).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 80% of first-time visitors in usability testing can find and open a relevant resource within 60 seconds using search (or chat after signing in).
- **SC-002**: For at least 95% of interactions, visitors see either search results or a clear empty/error state within 2 seconds of submitting a keyword.
- **SC-003**: For at least 95% of signed-in chat prompts, users receive a first assistant response (or a clear error) within 5 seconds.
- **SC-004**: In post-launch feedback, at least 4 out of 5 respondents rate the landing page as “clear” and “friendly” (or equivalent positive rating) when asked about first impression.
