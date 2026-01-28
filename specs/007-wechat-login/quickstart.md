# Quickstart: WeChat Login

**Feature**: [spec.md](spec.md)

## Prerequisites

- A WeChat Open Platform developer account.
- A reviewed/approved "Website Application" with:
  - AppID
  - AppSecret
  - Authorized domain configured to match the environment domain(s) you will use.

## Environment Variables

Add the following to your `.env` file (see `.env.example` for reference):

```env
# WeChat Login Configuration
WECHAT_LOGIN_ENABLED=true       # Set to false to disable WeChat login
WECHAT_APP_ID=your_app_id       # From WeChat Open Platform
WECHAT_APP_SECRET=your_secret   # From WeChat Open Platform (server-side only, never expose)
```

### Security Notes

- **Never commit secrets**: Store `.env` locally and use a secret manager for deployment.
- **Never log sensitive values**: WeChat `code`, `access_token`, and `refresh_token` must not appear in logs.
- **State anti-replay**: The backend uses TTL=10min + one-time-use tokens to prevent CSRF/replay attacks.

## Local Development

### Full Stack (Docker Compose)

```bash
cp .env.example .env
# Edit .env to add WeChat credentials
docker compose watch
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- OpenAPI docs: http://localhost:8000/docs

### Backend Only

```bash
cd backend
uv sync
source .venv/bin/activate
fastapi dev app/main.py
```

### Frontend Only

```bash
cd frontend
npm install
npm run dev
```

## Testing Locally

### Backend Tests

```bash
cd backend

# Run all tests (includes WeChat tests)
uv run bash scripts/tests-start.sh

# Run only WeChat-related tests
uv run pytest tests/api/routes/test_wechat_login.py tests/api/routes/test_wechat_linking.py -v
```

### Backend Quality Gates

```bash
cd backend

# Lint and format
uv run bash scripts/lint.sh

# Type checking (strict mypy)
uv run mypy app/api/routes/wechat_login.py
```

### Frontend Build & Lint

```bash
cd frontend

# Type check and build
npm run build

# Lint with Biome
npm run lint
```

## Basic Flow (Developer View)

### Sign In with WeChat (US1)

1. User opens `/login` and sees WeChat sign-in option.
2. Frontend requests `POST /api/v1/login/wechat/start` to obtain `state` and QR parameters.
3. Frontend renders embedded WeChat QR using official `wxLogin.js`.
4. User scans QR with WeChat mobile app and authorizes.
5. WeChat redirects to `/wechat-callback?code=...&state=...`.
6. Callback page calls `POST /api/v1/login/wechat/complete` with code + state.
7. Backend validates state, exchanges code with WeChat, and returns JWT access token.

### First-Time WeChat Sign-In (US2)

- If the WeChat identity is not linked to any user, a new account is created.
- Placeholder email: `wechat_{uuid}@placeholder.local` (no identifiers exposed).
- User can later update their email in settings.

### Link/Unlink WeChat (US3)

1. Signed-in user goes to Settings -> Connected Accounts.
2. User clicks "Link WeChat" and scans QR.
3. After authorization, `POST /api/v1/users/me/wechat/link` creates the link.
4. To unlink: `DELETE /api/v1/users/me/wechat/link` (blocked if no other sign-in method).

## API Endpoints

| Method | Path | Auth Required | Description |
|--------|------|---------------|-------------|
| POST | /api/v1/login/wechat/start | No | Get QR parameters + state token |
| POST | /api/v1/login/wechat/complete | No | Exchange code for JWT |
| POST | /api/v1/users/me/wechat/link | Yes | Link WeChat to current user |
| DELETE | /api/v1/users/me/wechat/link | Yes | Unlink WeChat from current user |

## Troubleshooting

### WeChat QR Not Loading

- Check browser console for wxLogin.js loading errors.
- Verify `WECHAT_APP_ID` is correct.
- Ensure domain is authorized in WeChat Open Platform.

### "State validation failed" Error

- State tokens expire after 10 minutes.
- State tokens can only be used once.
- Solution: Start the login flow again.

### "Cannot unlink WeChat" Error

- Users with placeholder emails (WeChat-only accounts) cannot unlink until they:
  1. Update their email to a real address
  2. Set up password recovery

### 403 "WeChat login not enabled" Error

- Set `WECHAT_LOGIN_ENABLED=true` in `.env`.
- Restart the backend server.
