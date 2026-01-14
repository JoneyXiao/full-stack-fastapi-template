# Phase 0 Research — Replace Sidebar with Navigation Bar

## Decisions

### 1) Use shadcn/ui overlays for dialogs and mobile menu

- Decision: Use `@shadcn/dialog` for Keyword Search + AI Chat dialogs, and `@shadcn/sheet` for the small-screen “Menu” drawer that contains the former sidebar destinations.
- Rationale:
  - Aligns with the repository’s frontend stack (React + Tailwind + shadcn/ui + Radix).
  - Provides accessibility primitives (focus trapping, Escape-to-close) required by the spec.
  - Reuses patterns already present in the repo (the existing sidebar uses `Sheet` on mobile).
- Alternatives considered:
  - Custom modal/drawer from scratch (rejected: higher a11y risk, more maintenance).
  - Popover-based menu for mobile nav (rejected: harder to fit full navigation list).

### 2) Reuse existing navigation item definitions as the source of truth

- Decision: Preserve destinations/labels by reusing the current sidebar “items” data (the same titles/paths and active-state rules), but render them in the new lower navigation bar.
- Rationale:
  - Satisfies “retain original sidebar items” while minimizing drift.
  - Keeps route/permission logic unchanged; only presentation changes.
- Alternatives considered:
  - Copy-paste a new nav list for the header (rejected: guaranteed duplication/drift).

### 3) Implement Keyword Search dialog with a Command-style UI

- Decision: Use `@shadcn/command` inside the Keyword Search dialog to provide a familiar searchable list UI.
- Rationale:
  - Matches the requested “search-bar-like” trigger and dialog-based UX.
  - Provides a fast, keyboard-friendly interface.
- Alternatives considered:
  - Plain input + list (rejected: more bespoke behavior to implement and test).

### 4) Keep backend/API contracts unchanged

- Decision: No backend endpoints or OpenAPI schema changes are required for this layout/navigation change.
- Rationale:
  - Feature scope is UI/layout + overlay triggers.
  - Existing auth flows/routes remain unchanged.
- Alternatives considered:
  - Adding new API endpoints for search/chat (rejected: not required by spec; would expand scope).

### 5) Provide a minimal “language switcher” as locale selection

- Decision: Implement a locale selector in the nav (e.g., `en`, `zh`), persisting the chosen locale, updating the document’s `lang` attribute, and using the selected locale where formatting is already locale-aware (e.g., `toLocaleDateString`).
- Rationale:
  - The repo currently has no full translation framework; locale selection is the smallest compliant step.
  - Establishes a single place for locale preference without forcing a full i18n migration.
- Alternatives considered:
  - Full string translation framework (e.g., i18next/react-intl) (rejected: broad scope increase).

## Notes / Best Practices

- Use TanStack Router `Link` for navigation and `useRouterState()` for active-state.
- Ensure overlays are keyboard accessible: focus trap, Escape closes, focus returns to trigger.
- Ensure the navigation bar content uses the same `container` sizing as existing pages.
