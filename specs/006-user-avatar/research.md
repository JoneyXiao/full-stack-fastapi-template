# Research: User Avatar Upload

**Date**: 2026-01-24
**Feature**: [spec.md](./spec.md)

## Decision 1: Storage strategy

- **Decision**: Store avatar files on the filesystem (mounted Docker volume) and store only metadata + a stable key/version on the User record.
- **Rationale**: Keeps the database small and fast, is simple to implement with FastAPI/Starlette file responses, and works well for a template repo. A Docker volume makes the storage durable across container restarts.
- **Alternatives considered**:
  - Store bytes in Postgres (BYTEA): simplifies infra but bloats DB and slows reads/backups.
  - Object storage (S3/R2/GCS): best long-term scaling, but adds infra/credentials and a heavier local-dev story.

## Decision 2: Public serving + caching

- **Decision**: Use **versioned avatar URLs** (version token in URL) and serve with long-lived immutable caching.
- **Rationale**: Meets the requirement that old avatars stop showing quickly without relying on cache purges; updating the avatar changes the URL so clients request the new image immediately.
- **Alternatives considered**:
  - Stable URL with short TTL/revalidation: simpler URLs but more traffic and weaker consistency.
  - CDN purge/invalidation: operationally complex and not reliable for browser caches.

## Decision 3: Server-side validation and normalization

- **Decision**: Never trust client-side processing; validate and normalize on the server by decoding, enforcing limits, and re-encoding to a safe output.
- **Rationale**: Prevents malformed uploads and ensures consistent output/content-type regardless of what clients send.
- **Alternatives considered**:
  - Trust client output only: reduces server work but is unsafe and unreliable.

## Decision 4: Client-side processing approach

- **Decision**: Implement client-side preview + processing with a minimal Canvas-based pipeline:
  - decode image
  - center-crop to square
  - downscale to 512×512
  - flatten transparency to white
  - encode to WebP, fallback to JPEG
- **Rationale**: Avoids heavyweight dependencies while meeting requirements; provides a preview that matches the final processed avatar.
- **Alternatives considered**:
  - Add a dedicated image processing library: potentially better quality/compatibility but adds dependency surface area.

## Decision 5: Rate limiting (10 avatar changes/hour)

- **Decision**: Enforce rate limit via a Postgres-backed, atomic UPSERT (distributed-safe) rather than middleware.
- **Rationale**: No new infrastructure dependency; works across multiple app instances because state lives in the DB.
- **Alternatives considered**:
  - Redis-backed limiter (slowapi/limits): very standard, but introduces new infra and dependency.

## Notes / Risks

- Some browsers (notably older Safari versions) may not support Canvas WebP encoding. The plan accounts for this by falling back to JPEG and by detecting support via the resulting Blob MIME type.
- EXIF orientation handling can vary across browsers; prefer decode paths that respect EXIF orientation to keep preview aligned with the uploaded avatar.
