# Research: Resources View Redesign

**Feature**: `010-resources-view-redesign`
**Date**: 2026-02-04

This phase resolves technical decisions needed for design/contracts.

## Decisions

### 1) Uploaded resource images: storage + caching strategy

- Decision: Store uploaded resource images on the backend filesystem (Docker volume) and serve them via a versioned public URL with long-lived immutable caching headers (same pattern as user avatars).
- Rationale: This repo already implements a robust, cache-friendly pattern for avatars (versioned URLs + immutable caching), and reusing it keeps the system simple and predictable in Docker Compose.
- Alternatives considered:
  - Store raw bytes in Postgres: increases DB size and complicates backups/IO.
  - External object storage (S3/R2): adds infra and env complexity not justified for this scope.

### 2) Image source rule: mutual exclusivity

- Decision: A resource can have either an uploaded image OR an external image URL (mutually exclusive). Setting one replaces and clears the other.
- Rationale: Avoids confusing precedence rules and ensures the UI + validation stays deterministic.
- Alternatives considered:
  - Allow both with precedence: creates hidden state and confusing admin UX.

### 3) External image URLs: validation and serving

- Decision: Store external image URLs as-is and return them to the client; validate only basic properties (scheme, length) and do not proxy or fetch them server-side.
- Rationale: Avoids SSRF-style risks and latency from remote hosts; keeps backend stateless for external images.
- Alternatives considered:
  - Proxy external images: adds security surface (SSRF, content sniffing), caching complexity, and higher backend bandwidth.
  - Fetch/HEAD-validate: introduces outbound network coupling and brittle failures.

### 4) Likes count availability on list endpoints

- Decision: Extend the resources list response to include a per-resource `likes_count` so Grid/List views can display likes without N+1 detail fetches.
- Rationale: The redesigned list/grid requires likes for every item; computing/returning it in the list endpoint is more efficient and simpler for the frontend.
- Alternatives considered:
  - Fetch resource detail per row: too many requests, poor performance.
  - Hide likes on list/grid: violates the feature requirements.

### 5) Uploaded image processing constraints

- Decision: Reuse the existing avatar image validation/processing constraints (supported MIME types, size cap, max dimension, standardized output encoding) for uploaded resource images, with a separate set of resource-image settings so they can diverge later without breaking avatars.
- Rationale: Minimizes new image-handling logic while still allowing independent tuning.
- Alternatives considered:
  - No processing (store original): risks huge images, inconsistent formats, and poor load performance.
  - Build a new processing pipeline: unnecessary for a first iteration.

### 6) URL display in List view

- Decision: Render the destination URL column as a clickable link labeled with the destination hostname.
- Rationale: Readable in dense tables while remaining a true link to the destination.
- Alternatives considered:
  - Show full URL: can be excessively long/noisy.
  - “Visit” label only: loses information value.
