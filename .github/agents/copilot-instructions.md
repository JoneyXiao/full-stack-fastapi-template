# full-stack-fastapi-template Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-01-05

## Active Technologies
- Python >=3.10,<4.0 (backend), TypeScript (frontend) + FastAPI, SQLModel, Alembic, PostgreSQL; React, TanStack Router/Query, Vite, Tailwind, shadcn/ui (001-ai-resource-hub)
- Python >=3.10,<4.0 (backend) + TypeScript (frontend) + Node.js v22 (dev toolchain) (002-ai-landing-page)
- PostgreSQL (no changes required for this feature) (003-replace-sidebar-navbar)
- Python >= 3.10 (backend), TypeScript (frontend), React 19, Vite + FastAPI, SQLModel, Alembic; React, TanStack Router/Query, Tailwind CSS, shadcn/ui (Radix) (003-replace-sidebar-navbar)
- Backend Python >=3.10; Frontend TypeScript (React 19) + FastAPI + SQLModel + Alembic; React + Vite + TanStack Router/Query + shadcn/ui (004-localization)
- PostgreSQL (Docker Compose) (005-rich-text-editor)
- Backend Python `>=3.10,<4.0` (ruff target-version `py310`); Frontend TypeScript `^5.9.3` + React `^19.x` + Backend FastAPI + SQLModel + Alembic; Frontend React + TanStack Router/Query + shadcn/ui (Radix) + Vite + Tailwind; Proposed (new) `@uiw/react-md-editor`, `react-markdown`, `remark-gfm` (005-rich-text-editor)
- Backend Python `>=3.10`; Frontend TypeScript (React) on Node `24` (006-user-avatar)
- Python >=3.10 (backend), TypeScript 5.9 (frontend), Node 24 (frontend) + FastAPI, SQLModel, Alembic, httpx, PostgreSQL; React, TanStack Router/Query, Vite, Playwrigh (007-wechat-login)

## Project Structure

```text
backend/
	app/
	tests/
frontend/
	src/
	tests/
```

## Commands

Backend:
- cd backend && uv sync
- cd backend && bash ./scripts/lint.sh
- cd backend && bash ./scripts/test.sh

Frontend:
- cd frontend && npm install
- cd frontend && npm run lint
- cd frontend && npm run build
- cd frontend && npm run generate-client

## Code Style

Python >=3.10,<4.0 (backend), TypeScript (frontend): Follow standard conventions

## Recent Changes
- 007-wechat-login: Added Python >=3.10 (backend), TypeScript 5.9 (frontend), Node 24 (frontend) + FastAPI, SQLModel, Alembic, httpx, PostgreSQL; React, TanStack Router/Query, Vite, Playwrigh
- 007-wechat-login: Added [if applicable, e.g., PostgreSQL, CoreData, files or N/A]
- 006-user-avatar: Added Backend Python `>=3.10`; Frontend TypeScript (React) on Node `24`

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
