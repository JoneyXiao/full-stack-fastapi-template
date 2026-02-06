# Quickstart: Resource Submission Cover Images

**Feature**: `011-resource-cover-image`
**Date**: 2026-02-06

This quickstart is for developers implementing and validating the feature end-to-end.

## Prerequisites

- A working local stack (recommended):
  - `cp .env.example .env`
  - `docker compose watch`
- Or run backend + frontend locally per repo docs.

## What to Validate

### 1) Submit a resource with a cover image (upload)

- Sign in
- Go to Submissions → “Submit Resource”
- Provide required fields
- Upload a cover image (<= 5MB; JPEG/PNG/GIF/WebP)
- Submit
- Confirm the new submission appears in “My Submissions” with:
  - Cover image shown in the same visual frame rules used on the Resources page
  - Status badge shown (pending/approved/rejected)

### 2) Submit a resource with a cover image (external URL)

- Repeat submission flow but set `image_external_url`
- Confirm it replaces any uploaded image (mutual exclusivity)
- Confirm invalid external URLs are rejected (non-http(s) scheme or missing host)

### 3) Submit without a cover image

- Confirm submission succeeds and the listing shows the fallback cover visual.

### 4) Image load failure fallback

- Use a deliberately broken external URL and confirm the UI falls back gracefully.

### 5) Approval carry-over (admin)

- As an admin, approve a submission that has a cover image.
- Confirm the published Resource inherits the cover image.

## API Contract Notes

- Feature contract lives at:
  - [specs/011-resource-cover-image/contracts/openapi.yaml](specs/011-resource-cover-image/contracts/openapi.yaml)

## When implementing

- If backend OpenAPI changes, regenerate the frontend client:
  - `./scripts/generate-client.sh`
- If DB schema changes, add Alembic migration(s) and ensure they upgrade cleanly.

## Tests (suggested)

- Backend: add/adjust pytest coverage for new endpoints and approval carry-over behavior.
- Frontend: add/adjust Playwright coverage for submission creation with cover image and for “My submissions” listing rendering.
