# Quickstart: User Avatar Upload

**Feature**: [spec.md](./spec.md)
**Branch**: `006-user-avatar`

## Prerequisites

- Backend: Python `>=3.10` (managed via `uv`)
- Frontend: Node `24` (see `frontend/.nvmrc`)
- Docker (recommended) for Postgres + full-stack parity

## Run Locally (recommended: Docker Compose)

1. Create local env:

   - Copy `.env.example` to `.env` and fill required variables.

2. Start the stack:

   - `docker compose watch`

3. Verify:

   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:8000/docs`

## Smoke Test the Feature (manual)

1. Sign up / sign in.
2. Navigate to Settings.
3. Select a large image, verify preview shows a centered square crop.
4. Save avatar, verify:
   - Avatar updates in UI.
   - Upload is processed client-side (smaller transferred size).
5. Remove avatar, verify placeholder is shown.

## Notes

### Public Avatar Visibility

- Avatars are publicly visible via `/api/v1/avatars/{user_id}/{version}.{ext}`.
- No authentication is required to fetch avatar images.
- Avoid uploading images containing sensitive or private information.

### Caching Semantics

- Avatar URLs are versioned: `/avatars/{user_id}/{version}.{ext}`
- The version number increments on each upload or deletion.
- Response headers: `Cache-Control: public, max-age=31536000, immutable`
- Browsers/CDNs cache aggressively; version changes force cache invalidation.
- The `X-Content-Type-Options: nosniff` header prevents MIME-type sniffing.

### Rate Limiting

- Upload/delete operations are rate-limited to 10 attempts per hour per user.
- Exceeding the limit returns HTTP 429 (Too Many Requests).
- The rate limit resets after one hour from the first attempt in the window.

### Image Processing

- Client-side: Center-crop to square, downscale to 512×512, flatten transparency to white, WebP with JPEG fallback.
- Server-side: Validates format/size, re-encodes for safety, enforces 512×512 max output.

## Expected Automated Coverage (to be implemented)

- Backend: tests for avatar upload validation + rate limiting.
- Frontend: Playwright test for Settings avatar flow (upload, preview, save, remove).
