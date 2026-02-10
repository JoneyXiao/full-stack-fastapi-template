# Implementation Plan: Unsupported Browser Notice

**Branch**: `012-unsupported-browser` | **Date**: 2026-02-10 | **Spec**: [specs/012-unsupported-browser/spec.md](spec.md)
**Input**: Feature specification from `/specs/012-unsupported-browser/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.github/agents/speckit.plan.agent.md` for the execution workflow.

## Summary

Show a full-page “unsupported browser” notice for browsers below the minimum supported versions, with a polished bilingual (English + Chinese) message and a minimum-version list. Implement this as an HTML-first fallback that is visible by default, and only boot the React app (via a small module bootstrap) when the browser is deemed supported.

Implementation approach (high level):
- Add a full-page notice container in `frontend/index.html` (visible by default)
- Use a dedicated bootstrap entry module `frontend/src/bootstrap.ts` and load it from `frontend/index.html` via a module script that:
  - Parses browser family + major version (or treats unknown as unsupported)
  - If supported: hides the notice, shows `#root`, and loads the app entry
  - If unsupported: keeps the notice visible and does not load the app
- Add/adjust Playwright coverage using a custom User-Agent to exercise supported vs unsupported flows

## Technical Context

**Language/Version**: TypeScript (frontend) + Python 3.x (backend, unchanged)
**Primary Dependencies**: React 19, Vite 7, TanStack Router/Query, Tailwind, shadcn/ui
**Storage**: N/A (no new persistence)
**Testing**: Playwright for frontend E2E (add/update for this feature)
**Target Platform**: Web browsers; minimum supported versions per spec (Chrome ≥ 107, Edge ≥ 107, Firefox ≥ 104, Safari ≥ 16)
**Project Type**: Web application (backend + frontend)
**Performance Goals**: Unsupported-browser check runs before app boot; negligible overhead for supported browsers
**Constraints**: No new backend/API/DB changes; avoid hardcoding new theme tokens; keep HTML fallback functional when JS app cannot run
**Scale/Scope**: Single UX behavior gate at app entry; no new routes/pages beyond the notice container in HTML

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Minimum gates for this repository:
- Security/secret hygiene preserved (no secrets committed; env-based config)
- OpenAPI remains accurate; regenerate + commit frontend client if contract changed
- Frontend uses generated client for backend calls (no ad-hoc direct endpoint calls)
- DB schema changes include Alembic migration(s) committed and upgradeable
- Tooling discipline preserved (backend ruff+mypy; frontend biome+tsc)
- Backend dependency changes use `uv` and update `backend/uv.lock`
- Pre-commit hooks (`prek`) expected to pass (or documented exception)
- Tests updated for behavior changes or explicit omission justification recorded
- CI checks expected to pass (do not merge with failing checks)

Status (pre-Phase 0):
- Security/secrets: PASS (no secrets introduced)
- OpenAPI/client generation: PASS (no API changes)
- Generated client usage: PASS (no new backend calls)
- DB/migrations: PASS (no schema changes)
- Tooling discipline: PASS (frontend TypeScript + Biome; keep consistent)
- Tests: PASS (plan includes Playwright coverage)

Status (post-Phase 1):
- Security/secrets: PASS
- OpenAPI/client generation: PASS
- Generated client usage: PASS
- DB/migrations: PASS
- Tooling discipline: PASS
- Tests: PASS (Playwright coverage planned; add test(s) during implementation)

## Project Structure

### Documentation (this feature)

```text
specs/012-unsupported-browser/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
```text
backend/
├── app/
│   ├── api/
│   ├── core/
│   ├── models.py
│   └── crud.py
└── tests/

frontend/
├── index.html           # Add HTML-first notice + bootstrap gate here
├── src/
│   ├── main.tsx         # App boot happens only when gate allows
│   └── i18n/             # Existing localization (not used for notice; notice is bilingual)
│   ├── components/
│   ├── routes/
│   └── client/          # generated OpenAPI client
└── tests/
    └── unsupported-browser.spec.ts
```

**Structure Decision**: Web app structure. Implement the feature at the frontend entry boundary (`frontend/index.html`) so unsupported browsers can see the notice even when the React bundle cannot reliably boot.

## Complexity Tracking

N/A (no constitution violations).
