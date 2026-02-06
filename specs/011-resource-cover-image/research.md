# Research: Resource Cover Image Submission

**Feature**: `011-resource-cover-image`
**Date**: 2026-02-06

This research consolidates implementation-relevant decisions and patterns already present in the repository so the feature can be implemented with minimal new surface area.

## Decisions

### 1) Reuse the existing resource image constraints

- **Decision**: Submission cover images follow the same validation constraints as existing admin resource image editing.
- **Rationale**: Avoids inconsistent UX and duplicated validation logic; ensures existing i18n hints remain accurate.
- **Constraints (source of truth already in backend settings + image utils)**:
  - Upload: max 5MB; formats: JPEG/PNG/GIF/WebP; min 32×32; max input dimension 4096×4096.
  - External image URL: must be a valid URL with `http`/`https` scheme and a host.
- **Alternatives considered**:
  - Use separate limits for submissions (rejected: would diverge UX and requires more configuration).

### 2) Match Admin’s “upload or external URL, mutually exclusive” model

- **Decision**: Submission cover image input supports both file upload and external URL, mutually exclusive in effect.
- **Rationale**: Aligns with existing admin image editing UX and backend mutual exclusivity patterns.
- **Alternatives considered**:
  - Upload-only (rejected: you requested parity with Admin).
  - URL-only (rejected: less user-friendly for non-technical users).

### 3) Store submission images similarly to resource images

- **Decision**: Add uploaded-image metadata columns to `ResourceSubmission` and store processed bytes on disk using a submission-specific storage folder and key.
- **Rationale**: Mirrors the existing `Resource` image system (versioned file, immutable caching) without storing image blobs in Postgres.
- **Alternatives considered**:
  - Store images in the DB (rejected: unnecessary size/cost + deviates from repo patterns).
  - Reuse the same `RESOURCE_IMAGE_STORAGE_PATH` for submissions (rejected: harder to reason about ownership/lifecycle).

### 4) Approval carries over the cover image

- **Decision**: When a submission is approved and a published `Resource` is created, the `Resource` inherits the submission cover image.
- **Rationale**: Prevents manual re-work for admins and fulfills “consistent UI” immediately post-approval.
- **Alternatives considered**:
  - Do not carry over (rejected: creates extra admin work and inconsistent UI).
  - Admin-confirm carry over (rejected: adds review friction with little benefit).

### 5) Submissions visibility aligns to “my submissions only”

- **Decision**: The primary submissions listing UX is “my submissions”, showing the signed-in user’s submissions across statuses.
- **Rationale**: Matches clarified product behavior: users should not see other users’ submissions in listings.
- **Alternatives considered**:
  - Keep public/pending browsing for all authenticated users (rejected: conflicts with clarified requirement).

## Implementation Notes (pattern alignment)

- Backend already has a solid reference implementation for resource images:
  - Upload → validate/process → save file → update DB metadata → computed `image_url`.
  - External URL validation enforces scheme/host and mutual exclusivity.
- This feature should reuse those patterns for submissions to reduce risk.
