# Data Model: AI Resource Landing Page

**Feature**: `002-ai-landing-page`
**Date**: 2026-01-13

This feature primarily reuses existing AI Resource Hub entities (Resources) and adds optional user-owned saved chat transcripts.

## Existing Entities (Referenced)

### Resource

- Source: `backend/app/models.py` (AI Resource Hub)
- Purpose: Represents a published AI resource with a title, description, destination URL, and type.
- Search fields (for landing MVP): `title`, `description`

## New Entities

### SavedChatTranscript

Represents a user-owned saved copy of a chat session.

**Fields**

- `id` (UUID, primary key)
- `user_id` (UUID, required; FK → User)
- `title` (string, optional; derived from first user prompt or a short summary)
- `messages` (JSON array, required)
  - Each element: `{ role: "user" | "assistant", content: string, created_at?: datetime }`
- `created_at` (datetime)
- `updated_at` (datetime)

**Validation Rules**

- `messages` must be a non-empty array when saving
- Each message `content` must be non-empty and within a reasonable max size
- Only the owning user can read/write/delete their transcripts

**Relationships**

- User 1 → N SavedChatTranscript

**State Transitions**

- Draft (in-memory) → Saved (persisted)
- Saved → Deleted

## Notes

- Anonymous chat is out of scope; transcripts exist only for signed-in users.
- Deleting a saved transcript is a hard delete for MVP (removed immediately from the user's list).
- Chat transcript contents are user-provided data and must not be logged verbatim (avoid storing prompts/responses in logs).
- If JSON storage is not feasible in the chosen ORM configuration, a fallback is storing serialized JSON as text with the same shape.
