# Quickstart: AI Resource Hub

**Feature**: `001-ai-resource-hub`

This quickstart validates the intended behavior from the feature spec.

## Prerequisites

- Docker + Docker Compose
- Backend tooling: `uv`
- Frontend tooling: Node.js (via `fnm` or `nvm`)

## Run the stack

From repository root:

- Start the development stack:
  - `docker compose watch`

Alternative (no watch):
- `docker compose up -d --wait`

## Verify API is up

- Open API docs: `http://localhost/api/v1/docs`
- Open OpenAPI JSON: `http://localhost/api/v1/openapi.json`

## User Story 1 (P1): Publish & Browse Resources

1. Sign in as admin (use the configured first superuser).
2. Create a Resource via the admin endpoint.
3. As a visitor, open the public resource list and verify the new resource appears.
4. Open the resource detail view and confirm fields:
   - title, description, type, destination link
5. Search for the resource by keyword and verify it appears.

## User Story 2 (P2): Engage with Resources

1. Sign in as a registered user.
2. Like a resource and verify:
   - your like state is active
   - like count increments
3. Favorite a resource and verify it appears in `my favorites`.
4. Create a comment on the resource.
5. Edit your comment and verify an edited timestamp is visible.
6. Delete your comment and verify it no longer appears.

## User Story 3 (P3): Submit Resources for Review

1. Sign in as a registered user.
2. Create a submission.
3. Sign in as a different registered user and verify the submission is visible.
4. Add a comment to the submission.
5. As the submitter, edit the submission while it is pending.
6. As admin:
   - Approve the submission and verify it appears in the published resource catalog.
7. Verify pending submissions are not visible to unauthenticated visitors.

## Developer commands

Backend (from `backend/`):
- Install deps: `uv sync`
- Run tests: `bash ./scripts/test.sh`
- Lint/typecheck: `bash ./scripts/lint.sh`

Frontend (from `frontend/`):
- Install deps: `npm install`
- Dev server: `npm run dev`
- Lint: `npm run lint`

## UI Routes

Frontend routes added for the AI Resource Hub feature:

| Route | Auth | Description |
|-------|------|-------------|
| `/resources` | Public | Browse published resources (search/filter) |
| `/resources/:resourceId` | Public | Resource detail (like/favorite/comments for logged-in users) |
| `/submissions` | Required | View your submissions (create/edit/delete) |
| `/submissions/new` | Required | Submit a new resource for review |
| `/submissions/:submissionId` | Required | View submission detail + discussion comments |
| `/favorites` | Required | View your favorited resources |
| `/admin` | Admin | Extended with Resources and Pending Submissions tabs |

## Contract regeneration rule

If API schemas change:
- Regenerate client: `./scripts/generate-client.sh`
- Commit updated `frontend/src/client/` artifacts
