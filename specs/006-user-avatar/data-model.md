# Data Model: User Avatar Upload

**Date**: 2026-01-24
**Feature**: [spec.md](./spec.md)

## Entities

### User (existing)

Add avatar metadata fields (no avatar bytes stored in DB):

- `avatar_key: str | None`
  - Stable identifier for the stored avatar file (implementation-defined; not user-controlled).
  - Internal-only: not exposed via `UserPublic`; the public surface uses `avatar_url` + `avatar_version`.
- `avatar_version: int`
  - Monotonic version for cache-busting. Increments whenever a user sets or removes an avatar.
- `avatar_content_type: str | None`
  - Expected values: `image/webp` or `image/jpeg`.
- `avatar_updated_at: datetime | None`
  - Last change timestamp.

Validation rules:

- `avatar_version` defaults to 0.
- When `avatar_key` is null, the user is treated as having no avatar.

### Avatar Rate Limit (new)

Purpose: enforce **max 10 avatar change attempts per hour per user**.

- `user_id: uuid` (FK → `user.id`, unique)
- `window_start_utc: datetime`
- `attempt_count: int`
- `first_attempt_at: datetime`
- `last_attempt_at: datetime`

Rules:

- Rate limit window is 1 hour.
- The limiter must be updated atomically (single DB statement) to prevent race conditions.

## Derived Values

### Public Avatar URL

A public URL is derived from `user_id` + `avatar_version` + `avatar_content_type`.

- If no avatar: use placeholder.
- If avatar exists: produce a versioned URL so caches can be immutable.
