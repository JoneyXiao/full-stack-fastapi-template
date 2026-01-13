# Research: AI Resource Hub

**Feature**: `001-ai-resource-hub`
**Date**: 2026-01-05

This phase resolves technical decisions needed for design/contracts.

## Decisions

### 1) Submission visibility and access

- Decision: Pending submissions (and their comments) are visible only to registered users and admins.
- Rationale: Keeps the “community review” loop while reducing spam and exposing fewer unauthenticated surfaces.
- Alternatives considered:
  - Public pending submissions: higher spam/moderation and privacy risk
  - Private (submitter+admin only): reduces community feedback value

### 2) Submission edit rules

- Decision: Submitter can edit a submission while it is `pending`; once `approved` or `rejected`, it becomes read-only for the submitter.
- Rationale: Allows corrections without undermining review outcomes.
- Alternatives considered:
  - No edits (resubmit): high friction
  - Edits after approval/rejection: confusing audit/review semantics

### 3) Comment rules (resource + submission)

- Decision: Users can create/edit/delete their own comments; edits show an edited timestamp; admins can delete any comment.
- Rationale: Balances usability with moderation.
- Alternatives considered:
  - Immutable comments: simplest, but poor UX
  - No user delete: forces admin intervention for mistakes

### 4) Comment visibility

- Decision: Comments on published resources are publicly viewable; only registered users can post/edit/delete.
- Rationale: Maximizes discovery/community value while keeping write access controlled.
- Alternatives considered:
  - Registered-only viewing: reduces public value and SEO/discovery

### 5) Search strategy (MVP)

- Decision: MVP search uses case-insensitive substring match across title + description (database-level filtering).
- Rationale: Simple, predictable, and adequate at initial scale.
- Alternatives considered:
  - PostgreSQL full-text search: better relevance, more setup/migrations
  - External search engine: too heavy for MVP

### 6) Duplicate destination link policy

- Decision: Prevent multiple resources from having the exact same destination link.
- Rationale: Avoids spam/duplicates and simplifies “canonical resource” behavior.
- Alternatives considered:
  - Allow duplicates + disambiguation: more UI/UX complexity

Operational policy (MVP):
- Reject creating a submission if its destination link already exists as a resource.
- Also block admin creation of a resource if the destination link already exists.

### 7) Comment deletion semantics

- Decision: Deleting a comment removes it from user-visible views (MVP will treat delete as removal rather than preserving content).
- Rationale: Keeps implementation simple while meeting “not visible” requirements.
- Alternatives considered:
  - Soft-delete with tombstones: more auditability, more schema + UI logic

### 8) Share UX (MVP)

- Decision: Share is implemented as “Copy link” from the resource detail page.
- Rationale: Minimal UX that satisfies stable-link sharing without adding platform-dependent share dialogs.
