# Quickstart: Resources View Redesign

**Feature**: `010-resources-view-redesign`

## Prerequisites

- Docker + Docker Compose
- Node (per `frontend/.nvmrc`)

## Run locally (full stack)

1) Create env file:
- `cp .env.example .env`

2) Start the stack:
- `docker compose watch`

3) Open the app:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000` (OpenAPI: `http://localhost:8000/api/v1/openapi.json`)

## After backend contract changes

If you change response/request schemas or add endpoints:

- Generate and commit the frontend client:
  - `./scripts/generate-client.sh`

## After DB schema changes

If you change SQLModel tables:

- Create and apply Alembic migrations (inside the backend container):
  - `docker compose exec backend bash`
  - `alembic revision --autogenerate -m "resource image fields"`
  - `alembic upgrade head`

## Quality gates (match CI)

Backend:
- `cd backend && uv run bash scripts/lint.sh`
- `cd backend && uv run bash scripts/tests-start.sh`

Frontend:
- `cd frontend && npm run lint`
- `cd frontend && npm run build`

Optional full-stack smoke:
- `./scripts/test.sh`
