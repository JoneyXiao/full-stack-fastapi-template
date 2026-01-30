# Quickstart: WeChat Login Unavailable Toast

## Goal

Verify that when WeChat login is disabled, clicking the WeChat login button shows a warning toast (“WeChat login is currently unavailable.”), rate-limited to once per 2 seconds per page, and does not open the QR login UI.

## Prerequisites

- Repo root `.env` (or Compose env) sets WeChat login disabled:
  - `WECHAT_LOGIN_ENABLED=False`
  - (Optionally) leave `WECHAT_APP_ID` / `WECHAT_APP_SECRET` unset

## Run (Docker Compose)

From repo root:

- `docker compose up -d`

Open:

- Frontend: `http://localhost:5173/login`

## Manual verification steps

1. On the login page, locate the WeChat icon button.
2. Click the WeChat icon button.
3. Expected:
   - A warning toast appears with the message “WeChat login is currently unavailable.”
   - The QR popup does not open.
4. Click the button repeatedly.
5. Expected:
   - Toast does not spam (at most one toast every ~2 seconds on that page).

## Automated verification (planned)

- Playwright e2e test to cover the login page WeChat disabled toast behavior and rate limiting.
