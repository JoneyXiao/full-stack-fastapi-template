# Implementation Plan: Replace Sidebar with Navigation Bar

**Branch**: `003-replace-sidebar-navbar` | **Date**: 2026-01-14 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from [spec.md](spec.md)

## Summary

Replace the current sidebar-centric layout with a consistent, two-row top navigation bar across all pages.

- Upper row: logo (links to home), centered Keyword Search + AI Chat triggers (open dialogs), language switcher, appearance switcher, and auth controls (Log In/Sign Up when signed out; account entry when signed in).
- Lower row: the same destinations currently shown in the sidebar (preserving labels, routes, and active-state). On small screens, the lower row collapses into a single “Menu” control that opens a drawer.

Technical approach focuses on reusing existing navigation definitions and established UI primitives (shadcn/ui overlays and menus) to minimize drift and maximize accessibility.

## Technical Context

**Language/Version**: Python >= 3.10 (backend), TypeScript (frontend), React 19, Vite
**Primary Dependencies**: FastAPI, SQLModel, Alembic; React, TanStack Router/Query, Tailwind CSS, shadcn/ui (Radix)
**Storage**: PostgreSQL (no changes required for this feature)
**Testing**: Pytest (backend), Playwright (frontend)
**Target Platform**: Web (Docker Compose supported; local Vite dev supported)
**Project Type**: Web application (separate `frontend/` + `backend/`)
**Performance Goals**: No new performance requirements; keep navigation interactions responsive.
**Constraints**: No backend API or DB schema changes; match existing content container/max-width; accessible overlays (Escape, focus trap, restore focus)
**Scale/Scope**: Global layout change across all frontend pages.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Minimum gates for this repository:
- Security/secret hygiene preserved (no secrets committed; env-based config)
- OpenAPI remains accurate; regenerate + commit frontend client if contract changed
- Frontend uses generated client for backend calls (no ad-hoc direct endpoint calls)
- DB schema changes include Alembic migration(s) committed and upgradeable
- Tooling discipline preserved (backend ruff+mypy; frontend biome+tsc)
- Backend dependency changes use `uv` and update `backend/uv.lock`
- Pre-commit hooks (`prek`) expected to pass (or documented exception)
- Tests updated for behavior changes or explicit omission justification recorded
- CI checks expected to pass (do not merge with failing checks)

Gate evaluation (pre-Phase 0):

- Security/secret hygiene preserved: PASS (no secrets needed)
- OpenAPI accurate / client regen: PASS (no API change planned)
- Frontend uses generated client: PASS (no new backend calls planned)
- DB schema discipline: PASS (no schema changes)
- Tooling discipline: PASS (frontend stays TS+biome; backend stays uv+ruff+mypy)
- Tests: PASS (plan includes Playwright updates if needed)

## Project Structure

### Documentation (this feature)

```text
specs/003-replace-sidebar-navbar/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)
```text
backend/
├── app/
│   ├── api/
│   ├── core/
│   ├── models.py
│   └── crud.py
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── routes/
│   └── client/          # generated OpenAPI client
└── tests/               # Playwright
```

**Structure Decision**: Web application; changes are frontend-only (layout + UI components).

## Complexity Tracking

No constitution violations are expected for this feature.

## Phase 0 — Outline & Research (complete)

Output: [research.md](research.md)

Key outcomes:

- shadcn/ui overlays selected: Dialog for Search/Chat; Sheet for mobile Menu drawer
- Reuse existing sidebar destination definitions to preserve labels/routes
- Keep backend OpenAPI/client unchanged
- Implement minimal locale selection (language switcher) consistent with current repo reality

## Phase 1 — Design & Contracts (complete)

Outputs:

- Data model: [data-model.md](data-model.md)
- Contracts: [contracts/README.md](contracts/README.md), [contracts/openapi-change.md](contracts/openapi-change.md)
- Verification steps: [quickstart.md](quickstart.md)

Post-design Constitution Check (re-evaluation):

- No API/DB changes introduced: PASS
- Uses shadcn/ui + existing stack primitives: PASS
- Testing strategy identified (Playwright): PASS

## Phase 2 — Implementation Plan (next)

1) **Create a shared top navigation component**
  - Two-row navbar with content constrained to the same container/max-width as page content.
  - Upper row: logo (links to `/`), centered triggers (Search + Chat), right-side controls (locale, appearance, auth/account).

2) **Retain sidebar destinations in lower row**
  - Use the existing sidebar items list as the source of truth.
  - Desktop: render items horizontally with active-state.
  - Mobile: replace with “Menu” control that opens a drawer listing the same destinations.

3) **Dialogs**
  - Search trigger opens a dialog; implement a Command-style UI for keyboard-friendly search.
  - Chat trigger opens a dialog.
  - Ensure Escape-to-close and focus restoration to trigger.

4) **Auth controls**
  - Signed out: show Log In + Sign Up actions.
  - Signed in: show a single account entry (menu) consistent with existing behavior.

5) **Locale + theme controls**
  - Theme control: reuse existing theme toggling behavior.
  - Locale control: persist selection and set document `lang`; use locale-aware formatting where applicable.

6) **Replace sidebar layout usage**
  - Update the main authenticated layout to use the navbar instead of the sidebar.
  - Ensure landing page and authenticated pages both render the same navbar.

7) **Tests**
  - Update/add Playwright coverage to assert:
    - Navbar renders on key routes
    - Search/Chat dialogs open/close via click + Escape
    - Mobile Menu drawer opens and contains destinations

8) **Quality gates**
  - Frontend: biome + TS build
  - Keep OpenAPI/client untouched (no schema changes)
