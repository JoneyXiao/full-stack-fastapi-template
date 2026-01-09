# Data Model: AI Resource Hub

**Feature**: `001-ai-resource-hub`
**Date**: 2026-01-05

## Entities

### Resource
Represents a published AI-related resource.

Fields:
- `id`: UUID (primary key)
- `title`: string (required)
- `description`: string (required, short)
- `type`: enum (required): `github_repo | tool | website | article | other`
- `destination_url`: URL string (required, globally unique among Resources)
- `is_published`: bool (default true for admin-created; true after submission approval)
- `created_at`: datetime
- `updated_at`: datetime

Relationships:
- One Resource has many Comments
- One Resource has many Likes
- One Resource has many Favorites

Validation rules:
- `destination_url` must be a valid URL
- `title` length bounded (UI-friendly)

### ResourceSubmission
Represents a user-submitted resource awaiting review.

Fields:
- `id`: UUID
- `submitter_id`: UUID (FK → User)
- `title`: string (required)
- `description`: string (required)
- `type`: enum (same as Resource)
- `destination_url`: URL string (required)
- `state`: enum (required): `pending | approved | rejected`
- `reviewed_by_id`: UUID (FK → User, optional)
- `reviewed_at`: datetime (optional)
- `created_at`: datetime
- `updated_at`: datetime

Relationships:
- One Submission has many Comments

State transitions:
- `pending -> approved`
- `pending -> rejected`
- `approved` and `rejected` are terminal (submitter cannot edit)

Validation rules:
- Only submitter can edit while `pending`
- Only admins can approve/reject
- Approval creates/publishes a Resource
- Submission creation is rejected if `destination_url` already exists as a Resource

### Comment
Represents a comment authored by a registered user.

Fields:
- `id`: UUID
- `author_id`: UUID (FK → User)
- `body`: string (required)
- `resource_id`: UUID (FK → Resource, nullable)
- `submission_id`: UUID (FK → ResourceSubmission, nullable)
- `created_at`: datetime
- `updated_at`: datetime (serves as “edited timestamp”)

Relationships:
- Comment belongs to exactly one target: either Resource or ResourceSubmission.

Validation rules:
- Exactly one of (`resource_id`, `submission_id`) is set
- Only author can edit/delete
- Admin can delete any comment

### Like
Represents a user “liking” a Resource.

Fields:
### Favorite
Represents a user favoriting a Resource.
- `user_id`: UUID (FK → User)
- `resource_id`: UUID (FK → Resource)

## Notes

- Counts (like_count, comment_count, favorite_count) can be computed via queries initially; later can be denormalized if needed.
- Search MVP operates on `title` + `description` (case-insensitive substring match).
