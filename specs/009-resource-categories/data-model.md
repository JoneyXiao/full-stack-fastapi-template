# Data Model: Resource Categories Management

Date: 2026-02-01
Feature: `009-resource-categories`

## Entities

### Category

Represents a database-managed category used to classify both resources and submissions.

Fields (conceptual):
- `id`: Unique identifier
- `name`: Display name (not localized)
- `created_at`: Creation timestamp
- `updated_at`: Update timestamp

Constraints / Validation:
- `name` is required and must not be blank/whitespace
- `name` is unique, case-insensitive

Relationships:
- One `Category` → many `Resource`
- One `Category` → many `ResourceSubmission`

Deletion rule:
- A category can be deleted only if it is not referenced by any `Resource` and not referenced by any `ResourceSubmission` (including pending).

### Resource

Existing entity; will reference a `Category`.

Relevant fields (conceptual):
- `id`
- `title`
- `description`
- `destination_url`
- `is_published`
- `category_id` (new)

Relationship:
- Many `Resource` → one `Category`

### ResourceSubmission

Existing entity; will reference a `Category`.

Relevant fields (conceptual):
- `id`
- `title`
- `description`
- `destination_url`
- `status` (pending/approved/rejected)
- `category_id` (new)

Relationship:
- Many `ResourceSubmission` → one `Category`

## Migration Notes (conceptual)

- Backfill categories from the distinct existing resource/submission `type` strings.
- After the application switches to `category_id`, the legacy `type` string columns can be removed.
