# Implementation Plan: Application Localization (English + Chinese)

**Branch**: `004-localization` | **Date**: 2026-01-15 | **Spec**: specs/004-localization/spec.md
**Input**: Feature specification from `/specs/004-localization/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.github/agents/speckit.plan.agent.md` for the execution workflow.

## Summary

Add first-class UI localization (English + Simplified Chinese) across the app, including signed-out/auth pages.

Approach:
- Reuse existing locale preference utilities (`frontend/src/lib/locale.ts`, `frontend/src/hooks/useLocale.ts`) for localStorage persistence and browser-language detection.
- Adopt a standard i18n library (`i18next` + `react-i18next`) and migrate user-facing UI strings to translation keys/resources to keep the implementation scalable to additional locales.
- Persist account-level language preference for signed-in users via an optional `locale` field on the backend `User` model (nullable), exposed through the existing `/api/v1/users/me` GET/PATCH.
- Localize critical user-facing system messages in the UI layer (status-code / known-error mapping), while keeping backend error generation unchanged.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: Backend Python >=3.10; Frontend TypeScript (React 19)
**Primary Dependencies**: FastAPI + SQLModel + Alembic; React + Vite + TanStack Router/Query + shadcn/ui
**Storage**: PostgreSQL
**Testing**: Pytest (backend); Playwright (frontend e2e)
**Target Platform**: Docker Compose (local + production-like)
**Project Type**: Web application (frontend + backend)
**Performance Goals**: N/A for initial localization; keep UI responsive during language switching
**Constraints**:
- Must keep OpenAPI accurate and regenerate + commit the frontend client when contracts change
- Must follow DB migration discipline (SQLModel + Alembic)
- Must avoid introducing ad-hoc backend calls from the frontend (use generated client)
**Scale/Scope**: 2 locales (en, zh), UI text only (no locale formatting changes)

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

Status (pre-Phase 0): PASS
- Security/secret hygiene: no secrets required for this feature.
- OpenAPI accuracy: this feature changes user schemas; implementation must update OpenAPI and regenerate the frontend client.
- Frontend-backend integration: locale persistence for signed-in users will use the generated client.
- DB discipline: adding `User.locale` requires an Alembic migration.
- Tooling discipline: adhere to backend ruff+mypy and frontend biome+tsc.
- Tests: add/adjust backend tests for `/users/me` locale updates; add/adjust Playwright coverage for language switch on auth + persistence.

## Project Structure

### Documentation (this feature)

```text
specs/004-localization/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
backend/
├── app/
│   ├── api/
│   ├── core/
│   ├── models.py
│   └── crud.py
├── alembic/
│   └── versions/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── routes/
│   └── client/          # generated OpenAPI client
└── tests/
```

**Structure Decision**: Web application structure (backend/ + frontend/). Localization touches both: frontend UI translations and backend user preference storage.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Added frontend i18n dependency (`i18next` + `react-i18next`) | Future locale expansion is an explicit project direction; a well-supported library avoids reinventing extraction, interpolation, and runtime language switching patterns. | A custom dictionary + `t(key)` helper is simpler for 2 locales but becomes maintenance-heavy as locales and message complexity grow. |

## Phase 0: Research (completed)

Output: specs/004-localization/research.md

Key outcomes:
- Reuse existing locale utilities already present in the repo.
- Use a standard i18n library (`i18next` + `react-i18next`) while keeping the surface area small (single namespace, explicit keys) to balance future scalability with the Simplicity Gate.
- Persist signed-in preference in `User.locale` and use `/api/v1/users/me`.

## Phase 1: Design & Contracts (completed)

Outputs:
- Data model: specs/004-localization/data-model.md
- API contract delta: specs/004-localization/contracts/openapi.yaml
- Quickstart: specs/004-localization/quickstart.md

Post-design Constitution Check: PASS (no justified violations).

## Phase 2: Implementation Plan

### Backend

1. Add `locale` (nullable) to `User` model and relevant API schemas:
  - `backend/app/models.py`: `UserBase`, `UserUpdateMe`, `UserPublic`, and table model `User`.
2. Add Alembic migration to add `user.locale` column.
3. Validate the locale value on update (`en` or `zh`).
4. Ensure `/api/v1/users/me` GET/PATCH includes the new field.
5. Add/adjust backend tests for updating and reading `locale` via `/users/me`.

### Frontend

1. Keep using `frontend/src/lib/locale.ts` + `useLocale()` for persistence and browser detection.
2. Add an i18n layer using `i18next` + `react-i18next`:
  - Resource bundles for `en` and `zh`.
  - Initialize i18n via `initReactI18next` and bundled JSON resources.
  - Use `useTranslation()` (and a thin wrapper if helpful) for translated strings.
  - Fallback to English when a key is missing.
  - Recommended init options (keep minimal):
    - `fallbackLng: "en"`
    - `supportedLngs: ["en", "zh"]`
    - `defaultNS: "translation"` (single namespace to start)
    - `interpolation.escapeValue: false` (React already escapes)
  - Do NOT use `i18next-browser-languagedetector` initially; locale precedence is handled by the existing `frontend/src/lib/locale.ts` and product rules.
3. Add a language switch UI component that is visible on:
  - Signed-out/auth pages
  - Signed-in pages
4. Wire signed-in persistence:
  - On sign-in / current-user load, apply preference precedence:
    - If `currentUser.locale` exists → use it
    - Else → keep the device's current app locale (localStorage `app-locale` if present), otherwise use browser locale
  - When a signed-in user changes locale via the switch → call `PATCH /users/me` with `locale`.
5. Localize critical user-facing error messages:
  - Map common auth/permission/validation errors to translation keys.
  - Fallback to raw error text when unknown.
6. Update tests:
  - Add/adjust Playwright tests for switching language on auth pages and persistence.

### Contracts & Generated Client

- Because the OpenAPI schema changes (user locale), regenerate and commit the frontend client during implementation:
  - `./scripts/generate-client.sh`

### Validation

- Backend: run `backend/scripts/lint.sh` and `backend/scripts/test.sh`.
- Frontend: run `npm run lint` and `npm run build` in `frontend/`; run Playwright if tests are added/updated.
