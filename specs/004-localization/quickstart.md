# Quickstart: Application Localization (English + Chinese)

**Branch**: 004-localization

## Goal

Enable the application UI to be viewed in English or Chinese, with:
- A language switch available on all pages (including auth pages)
- Persistence for signed-out users (device/localStorage)
- Optional persistence for signed-in users (account-level)

## Run locally

- Start the stack (recommended):
  - `docker compose watch`

## Manual test checklist

### Signed-out behavior

1. Open the app in a fresh browser profile (no localStorage).
2. Confirm initial language is selected from browser language, otherwise English.
3. Navigate to an auth page (e.g., login) and switch language.
4. Refresh and confirm the selected language persists.

### Signed-in behavior

1. Sign in.
2. If the user has no explicit account language preference, verify the app uses device/browser preference.
3. Change language via the switch.
4. Refresh and confirm the UI stays in the selected language.
5. Sign in from a different browser/device:
   - If account locale was explicitly saved, verify it is applied on sign-in.
   - If account locale was not explicitly saved, verify device/browser preference is used.

### Error message localization

1. Trigger a known auth error (e.g., invalid credentials) and verify the displayed message is localized.
2. Trigger a validation error (e.g., required field missing) and verify the displayed message is localized.

### Formatting invariant (out of scope)

1. Confirm UI text changes with locale selection, but date/number/currency formatting behavior is unchanged by this feature.
2. Avoid passing the selected UI locale into `toLocaleString()` / `toLocaleDateString()` calls as part of localization work.

**Current toLocale* usage** (audit as of implementation):
- `frontend/src/routes/_layout/admin.tsx` - date display
- `frontend/src/routes/_layout/submissions/$submissionId.tsx` - date display (2 occurrences)
- `frontend/src/routes/_layout/resources/$resourceId.tsx` - date display
- `frontend/src/routes/_layout/submissions/index.tsx` - date display
- `frontend/src/components/Landing/SavedTranscriptsDialog.tsx` - date display

**Invariant**: These calls should continue to use the browser's default locale (not the UI locale). Do not modify these to use the i18n locale. This is intentional - date/number formatting follows user's OS/browser settings, while UI text follows the explicit language preference.

### User-generated content audit (FR-008)

**Invariant**: User-generated content must NEVER be passed through `t()` or translation functions.

**Audit results** (verified during implementation):

✅ **Correctly handled (not translated):**
- `user.full_name` - displayed directly in AccountMenu, passed as interpolation value (not key) to `t("dashboard.welcome", { name: ... })`
- `user.email` - displayed directly in AccountMenu
- `message.content` - chat messages displayed directly in ChatMessageList
- `item.title` / `item.description` - Items (user data) displayed directly in EditItem and data tables
- `submission.*` - user submissions displayed directly
- `resource.*` - resource content displayed directly
- `comment.content` - user comments displayed directly

✅ **Correctly localized (UI chrome only):**
- Navigation item titles (navItems.ts) - use `t(item.titleKey, item.title)` for static nav labels
- Page titles, button labels, form labels - use `t()` calls
- Error messages and toasts - use localized error mapping

**Rule for future development**: Only UI chrome (labels, buttons, titles, messages authored by developers) should use `t()`. User-supplied data (names, emails, chat content, item titles, comments) must be rendered directly.

### Translation fallback behavior verification

The i18n system falls back to English when a Chinese translation key is missing. To verify:

1. **Development mode verification**:
   - Temporarily remove or comment out a translation key from `frontend/src/i18n/locales/zh.json` (e.g., remove `"common.loading"`).
   - Start the app in dev mode (`npm run dev`).
   - Set the locale to Chinese.
   - Navigate to a page using that key.
   - **Expected**: The UI shows the English fallback text (not blank or raw key).
   - **Expected**: Console logs a warning: `[i18n] Missing translation key: "common.loading" (fallback: "Loading...")`.
   - Restore the removed key after testing.

2. **Production behavior**:
   - In production builds, missing key warnings are suppressed (no console spam).
   - The UI still shows English fallback text gracefully.

3. **Key completeness audit**:
   - Compare `en.json` and `zh.json` to ensure all keys exist in both files.
   - Use a JSON diff tool or CI script to catch missing keys before deployment.

**Invariant**: The UI must never render blank text or raw translation keys. Missing translations always fall back to English.

## Developer checks

### Backend

- Run tests: `cd backend && ./scripts/test.sh`
- Run lint/typecheck: `cd backend && ./scripts/lint.sh`

### Frontend

- Run lint/typecheck/build: `cd frontend && npm run lint && npm run build`
- Run Playwright (if added/updated by implementation): `cd frontend && npx playwright test`

## Contract note

This feature updates `/api/v1/users/me` schemas to include an optional `locale` field.
After implementation, regenerate and commit the frontend client:
- `./scripts/generate-client.sh`
