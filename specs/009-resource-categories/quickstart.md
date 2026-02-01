# Quickstart: Resource Categories Management

Date: 2026-02-01
Feature: `009-resource-categories`

This guide explains how to verify the feature locally once implemented.

## Prerequisites

- `.env` configured (start from `.env.example`)
- Docker Compose available

## Run the stack

From repo root:

- `docker compose watch`

Frontend: `http://localhost:5173`
Backend: `http://localhost:8000` (OpenAPI docs: `http://localhost:8000/docs`)

## Verify category management (admin)

1. Sign in as an administrator.
2. Navigate to the Admin area.
3. Open the Categories admin screen.
4. Create a category.
5. Rename the category.
6. Attempt to delete:
   - An unused category → should succeed
   - A category used by at least one resource or submission → should be blocked with a clear message

## Verify category usage (public)

1. Go to Resources.
2. Use Categories filter to narrow results.
3. Create a new submission and select a Category.

## Regenerate client (when OpenAPI changes)

If API contracts are updated:

- `./scripts/generate-client.sh`

Then ensure `frontend/src/client/` is updated.
