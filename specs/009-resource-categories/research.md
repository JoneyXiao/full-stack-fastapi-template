# Research: Resource Categories Management

Date: 2026-02-01
Feature: `009-resource-categories`

This document records key technical decisions and rationale to support implementation planning.

## Decision 1: Categories are DB-driven records

- Decision: Replace the hard-coded “resource type” string list with a database-managed `Category` entity. Resources and submissions reference a category record.
- Rationale: Keeps frontend and backend in sync automatically, enables admin CRUD, and avoids redeploys for taxonomy changes.
- Alternatives considered:
  - Keep existing fixed string enum and only rename UI label (“Categories”). Rejected because it does not satisfy “manage in database”.
  - Hybrid allowlist + rename-only. Rejected because it limits admin control and still requires code changes to adjust the allowlist.

## Decision 2: Deletion safeguard is enforced at both app and DB layers

- Decision: Prevent category deletion when it is referenced by any `Resource` or any `ResourceSubmission` (including pending). Enforce with:
  - Application-level pre-check for friendly messaging (counts / “in use” indicator)
  - Database FK constraints to make the rule race-condition safe
- Rationale: Pre-check provides good UX, while FK constraints remain the final guardrail under concurrency.
- Alternatives considered:
  - App-only check. Rejected due to race conditions (a new reference could be created between check and delete).
  - Soft delete categories instead of hard delete. Deferred; not required by spec but can be revisited if product semantics evolve.

## Decision 3: Schema migration strategy (expand/contract)

- Decision: Use a two-phase “expand/contract” migration strategy.
  - Phase A (expand): create categories table; add nullable `category_id` on resources/submissions; backfill from existing `type` strings; add FK constraints; keep old `type` columns temporarily.
  - Phase B (contract): after code is switched, enforce not-null (if category is required) and drop old `type` columns.
- Rationale: Minimizes downtime and reduces risk by supporting safe rollback between phases.
- Alternatives considered:
  - Single migration that drops `type` immediately. Rejected as higher risk.
  - Use the existing string `type` as an FK key (category name as key). Rejected because rename becomes hard (renaming a referenced key is disruptive).

## Decision 4: Category name uniqueness is case-insensitive

- Decision: Treat category names as unique ignoring case (e.g., “Tool” conflicts with “tool”).
- Rationale: Matches the spec requirement and prevents confusing duplicates.
- Implementation notes (for planning): Prefer enforcing in the database with a unique index on `lower(name)` to prevent drift.
- Alternatives considered:
  - App-only normalization. Rejected because concurrent creates can still violate uniqueness.
  - `CITEXT`. Deferred; would require enabling an extension and changes to how the model is declared.

## Decision 5: API shape supports both public selection and admin management

- Decision: Provide category list access for public UI (so users can filter/select categories) while restricting mutations to administrators.
- Rationale: Users need the list to browse/filter resources and create submissions; admins need full CRUD.
- Alternatives considered:
  - Admin-only categories endpoints. Rejected because public UI needs categories for filtering/selection.

## Decision 6: Admin UI pattern

- Decision: Implement an in-app Categories admin screen (likely as a tab within the existing Admin page) using TanStack Query and the generated OpenAPI client.
- Rationale: Matches the repo’s established admin UI pattern and satisfies the “administrator manage” story end-to-end.
- UX conventions:
  - Prefer invalidate-on-success over optimistic updates for CRUD
  - Special-case HTTP `409 Conflict` (e.g., cannot delete in-use category, duplicate name) into a user-actionable toast message
