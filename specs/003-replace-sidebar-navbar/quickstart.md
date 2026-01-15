# Quickstart — Replace Sidebar with Navigation Bar

## Goal

Verify the new two-row navigation bar renders consistently across pages and that search/chat dialogs and the mobile menu drawer behave correctly.

## Prerequisites

- Docker Compose installed (recommended)
- Node.js for frontend development (if running frontend locally)

## Run (Docker Compose)

From repo root:

- `docker compose up --build`

Then open the frontend in the browser (URL depends on your compose setup; see `development.md`).

## Run (Frontend-only)

From repo root:

- `cd frontend`
- `npm install`
- `npm run dev`

## Manual Verification Checklist

1) **Global nav present**
- Visit `/`, `/resources`, `/items` (and any other existing routes).
- Confirm the same two-row navigation bar appears on every page.

2) **Upper row content/order**
- Left-to-right: logo, centered search trigger, centered chat trigger, language switcher, appearance switcher, auth actions.
- Confirm no GitHub/Discord links.

3) **Logo behavior**
- Click logo → navigates to the main landing/home page.

4) **Dialogs**
- Click keyword search → dialog opens; Escape closes; focus returns to trigger.
- Click AI chat → dialog opens; Escape closes; focus returns to trigger.

5) **Lower row navigation**
- Destinations match the original sidebar destinations.
- Active state indicates the current page.

6) **Small screen behavior**
- At a narrow viewport, the lower row collapses to a single “Menu” control.
- Activating “Menu” opens a drawer containing the navigation items.

## Automated Tests (optional, recommended)

- Run frontend Playwright tests from `frontend/`:
  - `npm run test` (if configured) or use the repo’s `scripts/test.sh`.

(Exact command may vary; follow existing frontend test scripts in the repo.)
## Playwright Test ID Conventions

The navbar uses consistent `data-testid` attributes for Playwright selectors:

| Element                | `data-testid`           |
|------------------------|-------------------------|
| Logo / Home link       | `nav-logo`              |
| Search trigger button  | `nav-search-trigger`    |
| Chat trigger button    | `nav-chat-trigger`      |
| Theme switcher         | `nav-theme-switcher`    |
| Locale switcher        | `nav-locale-switcher`   |
| Login button           | `nav-login`             |
| Sign Up button         | `nav-signup`            |
| Account menu trigger   | `nav-account-menu`      |
| Lower-row nav links    | `nav-link-{path}`       |
| Mobile menu trigger    | `nav-mobile-menu`       |
| Mobile menu drawer     | `nav-mobile-drawer`     |

Use these identifiers in Playwright tests:

```ts
await page.getByTestId("nav-search-trigger").click()
await page.getByTestId("nav-mobile-menu").click()
```
