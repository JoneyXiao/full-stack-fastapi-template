# Contracts — Replace Sidebar with Navigation Bar

## Backend API

No backend API changes are required for this feature.

- OpenAPI schema: unchanged
- Generated client: unchanged

## Frontend “Contracts” (UI)

This feature introduces/standardizes UI interaction contracts:

- Search trigger opens Keyword Search dialog
- Chat trigger opens AI Chat dialog
- Mobile “Menu” opens a navigation drawer

All overlays must be accessible (Escape-to-close, focus trap, restore focus).
