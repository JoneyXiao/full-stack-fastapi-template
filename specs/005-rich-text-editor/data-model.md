# Data Model: Rich Text Editor for Submission Descriptions

**Feature**: [spec.md](spec.md)
**Date**: 2026-01-23

## Entities

### ResourceSubmission

Represents a user-submitted resource proposal.

**Relevant fields**

- `id` (UUID)
- `title` (string, required)
- `description` (string, optional)
  - **Format**: Markdown text
  - **Max length**: 10,000 characters
  - **Security**: raw HTML is not rendered when displaying
- `destination_url` (string, required)
- `type` (string, required)
- `status` (enum-like string: `pending` | `approved` | `rejected`)
- `submitter_id` (UUID)
- `created_at`, `updated_at` (datetime)

## Validation Rules

- `description` may be empty/omitted.
- If provided, `description.length <= 10000`.
- Markdown is stored as-is; rendering applies safety rules (no raw HTML rendering; safe URL handling).

## State / Transitions

- This feature does not change submission state transitions.
- No new “edit submission” capability is introduced by this feature (existing backend behavior remains unchanged).
