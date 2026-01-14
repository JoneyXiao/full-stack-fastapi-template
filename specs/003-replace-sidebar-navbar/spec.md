# Feature Specification: Replace Sidebar with Navigation Bar

**Feature Branch**: `003-replace-sidebar-navbar`
**Created**: 2026-01-14
**Status**: Draft
**Input**: User description: "Replace sidebar with top navigation bar (upper and lower areas) per provided UI screenshot; upper: logo, centered keyword search and AI chat (open dialogs), language switcher, theme switcher, Log In, Sign Up; remove GitHub/Discord links; lower retains original sidebar items; consistent across all pages; navbar has max width."
**Constitution**: `.specify/memory/constitution.md`

## Clarifications

### Session 2026-01-14

- Q: How should the Log In and Sign Up items behave when the user is already signed in? → A: Replace Log In + Sign Up with an account entry (e.g., avatar/menu) when signed in.
- Q: On small screens, how should the lower navigation area (former sidebar items) behave? → A: Collapse into a single “Menu” button that opens a menu/drawer containing the sidebar items.
- Q: What should “maximum width” mean for the navigation bar? → A: Match the app’s existing main content max-width/container.
- Q: In the upper area center, how should Keyword Search and AI Chat be presented visually? → A: Two prominent pill/button triggers (search looks like a search bar; chat looks like a pill/button), both open dialogs.
- Q: When the user clicks the logo in the upper navigation, what should it do? → A: Navigate to the app’s main landing/home page.
## Design Learnings & Experience

Based on implementation and usability review, the following non-technical insights shaped the final navigation experience:

1. **Header Congestion**: On narrow viewports, cramming every functional control (Search, Chat, Language, Theme) into a fixed header reduces usability. Primary actions (Search/Chat) must be prioritized, while secondary preferences (Language/Theme) are better housed in the mobile menu.
2. **Contextual Focus**: Global navigation is often counter-productive in highly focused user flows like Login or Signup. Removing the navbar from these pages improves conversion focus and reduces UI noise.
3. **Visual Harmony**: Transparency-based hover effects in the navigation menu provide better visual continuity across different page themes and background colors compared to solid background color shifts.
4. **Interaction Efficiency**: Providing a "mock input" look for the search trigger with visible keyboard shortcuts (⌘K) increases user confidence and perceived app professionalism.
5. **Mobile Drawer Ergonomics**: A mobile menu that includes both navigation and preferences requires a dedicated scrollable areas and sticky titles to remain usable on short devices.
## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Consistent Top Navigation (Priority: P1)

As a visitor or signed-in user, I want a consistent navigation bar across all pages so I can orient myself and reach key destinations without relying on a sidebar layout.

**Why this priority**: This is the primary layout change and unlocks all other navigation behavior.

**Independent Test**: Can be fully tested by visiting multiple pages and verifying the navigation bar layout, items, and link destinations.

**Acceptance Scenarios**:

1. **Given** I am on any page in the app, **When** the page loads, **Then** I see the same two-row navigation bar (upper area + lower area).
2. **Given** the navigation bar is displayed, **When** I look at the upper area left-to-right, **Then** I see: logo, centered keyword search trigger, centered AI chat trigger, language switcher, appearance switcher, and an auth control area that shows (signed out) Log In + Sign Up or (signed in) a single account entry.
3. **Given** the navigation bar is displayed, **When** I look for external community links, **Then** there are no GitHub or Discord links in the navigation bar.
4. **Given** the navigation bar is displayed, **When** I resize the window to a wide desktop size, **Then** the navigation content does not exceed the app’s maximum content width and remains horizontally centered.
5. **Given** I am signed in, **When** the page loads, **Then** the Log In and Sign Up actions are replaced by an account entry (e.g., avatar/menu) in the upper navigation bar.
6. **Given** the navigation bar is displayed, **When** I click the logo, **Then** I am navigated to the app’s main landing/home page.

---

### User Story 2 - Keyword Search Dialog (Priority: P2)

As a user, I want to open keyword search from the navigation bar so I can quickly find relevant content without leaving the page context.

**Why this priority**: Search is a primary top-nav action and is explicitly required to open as a dialog.

**Independent Test**: Can be fully tested by clicking the keyword search entry in the upper nav and validating dialog open/close behavior.

**Acceptance Scenarios**:

1. **Given** I am on any page, **When** I activate the keyword search entry in the upper navigation bar, **Then** a search dialog opens.
2. **Given** the search dialog is open, **When** I press Escape or activate the close control, **Then** the dialog closes and focus returns to the control that opened it.
3. **Given** the upper navigation bar is displayed, **When** I view the layout, **Then** the keyword search entry appears in the centered portion of the upper area.

---

### User Story 3 - AI Chat Dialog (Priority: P3)

As a user, I want to open AI chat from the navigation bar so I can get help or answers without navigating away.

**Why this priority**: AI chat is a top-level action in the design and is explicitly required to open as a dialog.

**Independent Test**: Can be fully tested by clicking the AI chat entry in the upper nav and validating dialog open/close behavior.

**Acceptance Scenarios**:

1. **Given** I am on any page, **When** I activate the AI chat entry in the upper navigation bar, **Then** an AI chat dialog opens.
2. **Given** the AI chat dialog is open, **When** I close the dialog, **Then** the dialog closes and focus returns to the control that opened it.
3. **Given** the upper navigation bar is displayed, **When** I view the layout, **Then** the AI chat entry appears in the centered portion of the upper area (next to keyword search).

---

### Edge Cases

- Narrow screens: the upper area remains usable (items stay reachable without overlap or loss of essential actions).
- Narrow screens: the lower navigation destinations remain reachable via a “Menu” entry that opens a menu/drawer.
- Keyboard-only use: all nav items and dialogs are operable via keyboard, and dialogs trap focus while open.
- Logged-in vs logged-out: auth actions behave sensibly (e.g., Log In/Sign Up are not shown when already signed in, or are replaced by an account entry consistent with current product behavior).
- Search/chat unavailable: if a dependency is unavailable, the dialog still opens and clearly communicates that the feature is temporarily unavailable.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST replace the sidebar-based primary navigation with a two-row navigation bar shown at the top of the page.
- **FR-002**: The system MUST render the same navigation bar on all pages (no page-specific variants), except for state-based changes (e.g., signed-in vs signed-out).
- **FR-003**: The upper area of the navigation bar MUST contain these items in this left-to-right order: logo, centered keyword search trigger, centered AI chat trigger, language switcher, appearance switcher, and an auth control area that shows (signed out) Log In + Sign Up or (signed in) a single account entry (e.g., avatar/menu).
- **FR-004**: The keyword search and AI chat items MUST be positioned in the centered portion of the upper area.
- **FR-005**: The navigation bar MUST NOT include GitHub links or Discord links.
- **FR-006**: Activating keyword search MUST open a dialog.
- **FR-007**: Activating AI chat MUST open a dialog.
- **FR-008**: Dialogs MUST be dismissible via a visible close control and via the Escape key.
- **FR-009**: When a dialog closes, focus MUST return to the control that opened it.
- **FR-010**: The lower area of the navigation bar MUST include the same navigation destinations as the original sidebar (labels and destinations preserved).
- **FR-011**: The lower-area navigation MUST visibly indicate the current/active page.
- **FR-012**: The navigation bar content MUST use the same max-width/container constraints as the app’s main page content (with the navigation content horizontally centered within that container).
- **FR-013**: The navigation bar MUST remain usable on common viewport sizes (mobile through desktop), maintaining access to all required actions.
- **FR-014**: Language switching MUST continue to work from the navigation bar as **locale selection** (at minimum: `en`, `zh`), persisting the selection client-side (e.g., localStorage) and updating `document.documentElement.lang`. Full string translation is out of scope.
- **FR-015**: Appearance/theme switching MUST continue to work from the navigation bar.
- **FR-016**: When the user is signed in, the Log In and Sign Up actions MUST be replaced by a single account entry (e.g., avatar/menu) in the upper navigation bar.
- **FR-017**: On small screens, the lower navigation area MUST collapse into a single “Menu” entry that opens a menu/drawer containing the original sidebar destinations.
- **FR-018**: The menu/drawer for the lower navigation MUST be dismissible and MUST support keyboard navigation.
- **FR-019**: In the upper area center, keyword search and AI chat MUST be rendered as prominent pill/button triggers; keyword search MUST appear visually as a search-bar-like control, and both MUST open dialogs when activated.
- **FR-020**: Activating the logo MUST navigate the user to the app’s main landing/home page.
- **FR-021**: The system MUST EXCLUDE the global navigation bar from specific authentication layouts (e.g., `/login`, `/signup`) to minimize distractions and focus on the authentication flow.
- **FR-022**: On mobile screens (< 768px), the system MUST MOVE the Language and Appearance switchers from the main header into the mobile menu drawer under a "Preferences" section to reduce header congestion.
- **FR-023**: The mobile menu drawer MUST implement a scrollable container with a sticky header to ensure all navigation and preference items are accessible on devices with limited vertical space.
- **FR-024**: Hover effects on the lower-area navigation items MUST use transparency/opacity adjustments rather than background color changes to maintain visual consistency across themes.
- **FR-025**: The keyword search trigger MUST display a keyboard shortcut hint (e.g., ⌘K) to facilitate user discovery of faster navigation patterns.
- **FR-026**: The system MUST render a visual separator (line) between the upper and lower navigation areas to establish clear visual hierarchy.

### Assumptions

- The app already has working routes/destinations for the existing sidebar items; this feature changes the navigation presentation, not the information architecture.
- The existing behavior for signed-in users in the header (if any) remains the source of truth; the nav bar adapts to authentication state without changing authentication flows.

### Key Entities *(include if feature involves data)*

- **Navigation Item**: A user-visible entry that routes to a destination; includes label, destination, and active-state rules.
- **User Preference**: A persisted or session-level preference affecting UI (e.g., selected language, selected appearance mode).

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: From any page, users can reach any destination previously available in the sidebar in ≤ 2 interactions.
- **SC-002**: 100% of existing sidebar destinations remain reachable via the lower navigation area (no broken or missing destinations).
- **SC-003**: Users can open and close keyword search and AI chat dialogs successfully on the first attempt in a usability test with a ≥ 90% task completion rate (manual usability metric).
- **SC-004**: On desktop-sized viewports, the navigation bar content matches the app’s standard max-width/container and remains centered.
- **SC-005**: Playwright verifies keyword search + AI chat dialogs open and close via click + Escape with focus restoration on representative routes (e.g., `/`, `/resources`, `/dashboard`).
