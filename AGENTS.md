# Agents Guide (`full-stack-fastapi-template`)

This file tells coding agents how to work in this repository without breaking core workflows (Docker Compose, OpenAPI client generation, migrations, CI quality gates).

## Non‑negotiables (project constitution)

- **Never commit secrets**: no tokens/passwords/private keys in git. Use env vars / secret managers. `.env` is expected to be untracked; update `.env.example` when you add config.
- **OpenAPI is the contract**: if API behavior/schema changes, **keep OpenAPI accurate** and **regenerate + commit** the frontend client.
- **DB changes require migrations**: update SQLModel models **and** add Alembic migrations; commit migration files.
- **Frontend must use the generated client**: use `frontend/src/client/` (generated). Don’t introduce ad-hoc `fetch`/`axios` calls that bypass generated types/auth/error conventions.
- **Quality gates must pass**:
  - Backend: `uv` + `ruff` + **strict** `mypy`
  - Frontend: `biome` + TypeScript build/typecheck
- **Docker Compose parity**: runtime-affecting changes must work in Compose. Local dev proxy is in `docker-compose.override.yml`; prod/staging Traefik is `docker-compose.traefik.yml` with external `traefik-public` network.

## What this repo is

- **Backend**: FastAPI + SQLModel + Alembic + PostgreSQL, JWT auth, password recovery emails, optional Sentry.
- **Frontend**: React + TypeScript + Vite + Tailwind + shadcn/ui + TanStack Router/Query.
- **Generated API client**: OpenAPI → `@hey-api/openapi-ts` output to `frontend/src/client/` (axios-based generator).
- **Infra**: Docker Compose for local and production-like runs; Traefik routing.
- **Specs**: Feature work often lives under `specs/<id-feature>/` (SpecKit workflow).

## Repo map (where to change things)

- **Backend entrypoint**: `backend/app/main.py`
- **Backend settings/env**: `backend/app/core/config.py` (reads `../.env`)
- **DB models (SQLModel)**: `backend/app/models.py`
- **CRUD layer**: `backend/app/crud.py`
- **API routers**: `backend/app/api/routes/*.py` mounted in `backend/app/api/main.py`
- **Migrations**: `backend/app/alembic/` (versions in `backend/app/alembic/versions/`)
- **Backend tests**: `backend/tests/` (plus startup checks in `backend/app/tests_pre_start.py`)

- **Frontend app**: `frontend/src/`
- **Routes**: `frontend/src/routes/`
- **Reusable UI/components**: `frontend/src/components/`
- **Generated client (DO NOT hand-edit)**: `frontend/src/client/`

## Local development (recommended)

### Full stack (Docker Compose watch)

```bash
cp .env.example .env
docker compose watch
```

Key local URLs:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000` (OpenAPI docs at `http://localhost:8000/docs`)
- Adminer: `http://localhost:8080`
- Traefik UI (local dev proxy): `http://localhost:8090`
- Mailcatcher: `http://localhost:1080`

### Backend local (without Docker backend service)

```bash
cd backend
uv sync
source .venv/bin/activate
fastapi dev app/main.py
```

### Frontend local (without Docker frontend service)

Node version is pinned in `frontend/.nvmrc`.

```bash
cd frontend
npm install
npm run dev
```

## Tests and quality gates (match CI)

### Backend

- **Lint/typecheck**:

```bash
cd backend
uv run bash scripts/lint.sh
```

- **Auto-fix formatting/lint**:

```bash
cd backend
uv run bash scripts/format.sh
```

- **Run tests**:

```bash
cd backend
uv run bash scripts/tests-start.sh
```

Notes:
- CI enforces **coverage ≥ 90%**.
- DB migrations + initial data are run via `backend/scripts/prestart.sh`.

### Frontend

```bash
cd frontend
npm run lint
npm run build
```

### Full stack (Docker Compose, closest to CI smoke)

```bash
./scripts/test.sh
```

## OpenAPI client generation (required on API contract changes)

Preferred:

```bash
./scripts/generate-client.sh
git add frontend/src/client
```

This script:
- Dumps backend OpenAPI to `frontend/openapi.json`
- Runs `npm run generate-client` (configured by `frontend/openapi-ts.config.ts`)

Rule of thumb: if you touched `backend/app/api/**`, `backend/app/models.py`, or response/request schemas, run the generator and commit the updated `frontend/src/client/`.

## Database migrations (required on schema changes)

When changing SQLModel tables in `backend/app/models.py`:

```bash
docker compose exec backend bash
alembic revision --autogenerate -m "Describe change"
alembic upgrade head
```

Then commit the new files under `backend/app/alembic/versions/`.

## Pre-commit hooks (recommended locally)

From `backend/`:

```bash
uv run prek install -f
uv run prek run --all-files
```

## Environment variables & secrets

- Start from `.env.example` → `.env`.
- `ENVIRONMENT` controls enforcement: in non-`local`, default `"changethis"` secrets cause startup failure.
- Optional landing-page chat feature is controlled by `OPENAI_API_KEY` (+ optional `OPENAI_BASE_URL`, `OPENAI_MODEL`).
- Never log or persist sensitive values.

## Generated / vendored artifacts (be careful)

- `frontend/src/client/**` is generated: do not hand-edit; regenerate instead.
- `backend/app/email-templates/build/**` is built output; edit `backend/app/email-templates/src/**` and re-export to HTML when changing templates.

## CI workflows to keep green (quick mental model)

- **Backend tests + coverage**: `.github/workflows/test-backend.yml`
- **Docker Compose smoke**: `.github/workflows/test-docker-compose.yml`
- **Pre-commit formatting** (prek / biome / ruff): `.github/workflows/pre-commit.yml`
- **Client generation check/auto-commit**: `.github/workflows/generate-client.yml`

## When adding/changing features (expected flow)

- Update data model → add Alembic migration → implement backend endpoints → update tests
- Regenerate frontend client if OpenAPI changed → implement frontend using generated client
- Ensure Compose works and CI gates pass

## Existing agent guidance (auto-generated)

There is additional, feature-plan-derived guidance in:
- `.github/agents/copilot-instructions.md`

If this `AGENTS.md` conflicts with those, follow this file + the project constitution, and update the plan-derived guidance as needed.
