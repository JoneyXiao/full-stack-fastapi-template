# Data Model: Resource Submission Cover Images

**Feature**: `011-resource-cover-image`
**Date**: 2026-02-06

## Entities

### ResourceSubmission (existing; extended)
Represents a user-submitted resource awaiting review.

**Existing fields (subset)**
- `id`: UUID (primary key)
- `submitter_id`: UUID (FK → User)
- `title`: string
- `description`: string?
- `destination_url`: string
- `category_id`: UUID?
- `status`: enum: `pending | approved | rejected`
- `created_at`, `updated_at`: datetime

**New fields (for cover image; mirrors `Resource` image fields)**
- `image_external_url`: string? (max length 2048)
- `image_key`: string? (filename key in submission image storage)
- `image_version`: int (default 0; increments when uploaded image changes)
- `image_content_type`: string? (e.g., `image/webp`, `image/jpeg`)
- `image_updated_at`: datetime?

**Derived/public field**
- `image_url`: string? (computed):
  - If `image_external_url` is set → use that.
  - Else if `image_key` and `image_content_type` exist → use versioned API URL for submission images.
  - Else → null.

**Invariants / Validation**
- Mutual exclusivity:
  - At most one of (`image_external_url`, uploaded image metadata) is active.
  - Setting one clears the other.
- Upload validation (must match existing resource image rules):
  - Max file size: 5MB
  - Supported types: JPEG, PNG, GIF, WebP
  - Min dimensions: 32×32
  - Max input dimension: 4096×4096
- External URL validation:
  - Scheme: http/https only
  - Must include a host

### Resource (existing; approval carry-over)
When approving a submission:
- Create `Resource` from submission core fields.
- Carry over cover image:
  - If submission has `image_external_url` → set `Resource.image_external_url`.
  - If submission has an uploaded image → copy/save into resource image storage and set `Resource.image_*` metadata.

## Storage

### Submission image files (filesystem)
- Stored on disk in a submission-specific storage path.
- Key convention: `{submission_id}.{ext}` (ext is `webp` or `jpg` after processing).
- Served via a versioned endpoint to enable immutable caching.

## Notes

- This approach is intentionally symmetrical with existing `Resource` image handling to reduce complexity and reuse existing validation and processing logic.
