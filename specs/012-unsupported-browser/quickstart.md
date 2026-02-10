# Quickstart: Unsupported Browser Notice

## Goal

Verify that:
- Unsupported browsers see a **full-page** notice with bilingual (English + Chinese) text and minimum supported versions.
- Supported browsers do **not** see the notice and the app loads normally.

## Run locally (recommended)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Manual verification (User-Agent override)

1. Open DevTools in Chrome.
2. Open **More tools → Network conditions**.
3. Uncheck **Use browser default** under **User agent**.
4. Set a custom UA string that simulates an older browser, e.g. a Chrome UA with `Chrome/90`.
5. Reload the page.

Expected:
- You see the full-page unsupported-browser notice.
- The React app UI is not shown.

Then switch back to the default UA and reload.

Expected:
- The notice is not shown.
- The app loads.

## Automated verification (Playwright)

From `frontend/`:

```bash
npx playwright test tests/unsupported-browser.spec.ts
```

(Use the repo’s existing Playwright configuration; the test should override UA per test case.)
