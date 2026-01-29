# Quickstart: WeChat Redirect URL Update

This feature changes how the WeChat QR login redirect is constructed so WeChat first redirects to `h5.yunxi668.com`, which forwards the `code` to the frontend callback route.

## Configure

Backend environment variables (existing):
- `WECHAT_LOGIN_ENABLED=true`
- `WECHAT_APP_ID=...`
- `WECHAT_APP_SECRET=...`
- `FRONTEND_HOST=https://ai.yunxi668.com`

Planned new backend configuration (for operator control, no frontend code change):
- `WECHAT_LOGIN_INTERMEDIARY_URL=https://h5.yunxi668.com/passport/wxLogin`

Behavior:
- If `WECHAT_LOGIN_INTERMEDIARY_URL` is set, backend constructs `redirect_uri` as:
  - `WECHAT_LOGIN_INTERMEDIARY_URL?from=<ai-callback-url>`
- Otherwise it falls back to direct callback:
  - `${FRONTEND_HOST}/wechat-callback`

WeChat Open Platform configuration (operational prerequisite):
- The Website Application “authorized callback domain” must match the domain used in `redirect_uri`.
  - For this feature: authorize `h5.yunxi668.com`.

## Run locally

- Full stack: `docker compose watch`
- Backend only: `cd backend && uv sync && source .venv/bin/activate && fastapi dev app/main.py`
- Frontend only: `cd frontend && npm install && npm run dev`

## Verify flows

1) Login flow
- Open the login page that uses the WeChat QR component.
- Scan QR code.
- Expect browser to land on `/wechat-callback?code=...&state=...` (forwarded by `h5.yunxi668.com`).
- Callback route calls `/login/wechat/complete`, stores token, redirects to the allowlisted destination.

2) Link flow
- Go to Settings → Connected Accounts.
- Click “Link WeChat”.
- Scan QR.
- Expect browser to land on `/wechat-callback?action=link&code=...&state=...`.
- Callback route calls `/users/me/wechat/link`, then redirects to `/settings`.

## Quality gates

Backend:
- `cd backend && uv run bash scripts/lint.sh`
- `cd backend && uv run bash scripts/tests-start.sh`

Frontend:
- `cd frontend && npm run lint`
- `cd frontend && npm run build`

If OpenAPI contract changes:
- `./scripts/generate-client.sh`
