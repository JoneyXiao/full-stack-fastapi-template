<!--
Sync Impact Report

- Version change: 0.2.1 -> 0.2.2
- Modified sections:
  - VII. Reproducible Environments (Docker Compose) -> clarified local vs prod Traefik usage
  - Project Constraints & Stack -> clarified Traefik/Compose topology
- Added sections: None
- Removed sections: None
- Templates requiring updates:
  - ✅ updated: .specify/templates/plan-template.md
  - ✅ reviewed: .specify/templates/spec-template.md
  - ✅ reviewed: .specify/templates/tasks-template.md
  - ✅ reviewed: .specify/templates/checklist-template.md
  - ✅ reviewed: .specify/templates/agent-file-template.md
- Follow-up TODOs:
  - Ratification date: 2026-01-03
-->

# Full Stack FastAPI Template Constitution

## Core Principles

### I. Security & Secrets (Non-Negotiable)

- MUST never commit secrets (tokens, passwords, private keys) to the repo. Use
  environment variables and documented secret management for deployment.
- MUST treat auth, password recovery, and token flows as security-critical:
  validate inputs, handle errors safely, and apply least-privilege access controls.
- MUST avoid logging sensitive data (credentials, tokens, PII). When in doubt,
  redact.
- SHOULD add tests for security-sensitive changes (auth, permissions, token
  handling, password reset, email flows).

Rationale: This template is often deployed as-is; unsafe defaults propagate.

### II. API-First Contracts (OpenAPI) & Generated Client

- MUST keep the backend OpenAPI schema accurate whenever API behavior changes.
- MUST regenerate and commit the frontend client when the OpenAPI schema changes
  (preferred: `./scripts/generate-client.sh`; alternative: `npm run generate-client`
  from `frontend/`).
- MUST minimize breaking API changes. If breaking changes are unavoidable, document
  migration impact in the feature spec/plan and provide backwards-compatible paths
  when feasible.

Rationale: A typed generated client prevents drift and reduces runtime errors.

### III. Database Change Discipline (SQLModel + Alembic)

- MUST implement schema changes via SQLModel models and Alembic migrations.
- MUST create an Alembic revision and apply it for any model/table change; commit
  generated migration files.
- MUST keep migrations incremental and reviewable (clear message; no manual DB
  drift).

Rationale: Downstream forks rely on clean upgrade paths.

### IV. Frontend-Backend Integration Discipline

- MUST implement frontend-to-backend communication using the generated client
  (`frontend/src/client/`).
- MUST NOT introduce ad-hoc direct calls to backend endpoints (e.g., raw `fetch`
  or `axios`) that bypass generated types, auth, or error-handling conventions.
  Exceptions require explicit documentation in the feature plan (what/why) and must
  keep auth/error handling consistent.

Rationale: Consistent integration reduces bugs and keeps contracts enforceable.

### V. Testing & Quality Gates

- MUST keep changes independently testable. Feature specs MUST include acceptance
  scenarios.
- SHOULD add/adjust backend tests (Pytest) for changed business logic and API
  endpoints.
- SHOULD add/adjust frontend tests for user-facing flows; use Playwright for
  end-to-end flows where appropriate.
- If tests are intentionally omitted, the plan MUST include a written
  justification and a concrete follow-up (issue/ticket, timeframe, or explicit risk
  acceptance).
- SHOULD ensure GitHub Actions checks pass before merging; failing CI blocks merge.

Rationale: This is a template; regressions multiply across downstream users.

### VI. Tooling & Quality Discipline

- MUST keep the established tooling discipline:

  - Backend: `uv` for dependency management; update `backend/pyproject.toml` and
    `backend/uv.lock` together.
  - Backend quality gates: `ruff` + strict `mypy`.
  - Frontend quality gates: `biome` + TypeScript typecheck.
- MUST pass repo lint/format/typecheck tasks used by CI.
- MUST use `prek` (pre-commit hooks) for local lint/format discipline. Prefer:
  - Install hooks: `uv run prek install -f` (in `backend/`)
  - Run hooks manually: `uv run prek run --all-files` (in `backend/`)
- MUST keep generated artifacts generated (e.g., OpenAPI client). Do not leave the
  repo in a half-generated state.

Rationale: Predictable CI and low contributor overhead.

### VII. Reproducible Environments (Docker Compose)

- MUST keep local and production-like environments reproducible and documented.
- Changes that affect runtime behavior MUST work in Docker Compose.
- `docker-compose.yml`, `docker-compose.override.yml`, and `docker-compose.traefik.yml`
  MUST stay in sync with code and docs.

Note: Local development uses the `proxy` service from `docker-compose.override.yml`
(Traefik with an insecure dashboard on port 8090). Production/staging HTTPS routing is
handled by Traefik in `docker-compose.traefik.yml` (sharing the external
`traefik-public` network).

Rationale: Reproducibility is a core promise of this repository.

### VIII. Spec-Driven Development (SpecKit Articles)

When using SpecKit workflows, work MUST be scoped under `specs/<feature>/` and plans
MUST include a "Constitution Check" gate.

These articles guide spec-driven feature work. If they conflict with project
reality, document the exception in the feature plan's "Complexity Tracking" table.

- Article I — Library-First Principle: New reusable capabilities MUST have a clear
  boundary and be independently testable.
- Article II — CLI Interface Mandate: New automation/tooling libraries SHOULD
  expose a CLI entrypoint.
- Article III — Test-First Imperative: For contract/security-critical work, tests
  MUST be added/updated before or alongside implementation.
- Article IV — Integration Testing: End-to-end flows SHOULD be covered with
  integration tests (Pytest) and/or Playwright where applicable.
- Article V — Observability: Changes MUST be operable: actionable errors, clear
  failure modes, and logs that help debugging without leaking secrets/PII.
- Article VI — Versioning & Breaking Changes: Breaking API/contract changes MUST
  be avoided when feasible; if unavoidable, document migration impact.
- Article VII — Simplicity Gate: Start simple (YAGNI). Any added complexity MUST
  be justified in the feature plan.
- Article VIII — Anti-Abstraction Gate: Prefer using frameworks directly (FastAPI,
  SQLModel, TanStack) instead of wrapper layers unless needed.
- Article IX — Integration-First Testing: Prefer realistic tests over heavy mocking
  when feasible.

### IX. Tooling: Use Available MCP Servers

- When using agent tooling, MUST use available installed MCP servers where
  applicable (e.g., for up-to-date library docs or project-specific tooling).
- MUST prefer MCP-provided documentation and APIs over assumptions from model
  memory when an MCP server exists for that library/framework.
- If an MCP server exists but is not used, MUST document why (insufficient
  coverage, access limitations, or not relevant to the task).

### X. Operability & Developer Experience

- MUST provide actionable error messages and handle failures explicitly (avoid
  silent failures).
- SHOULD log important events for debugging/operations without leaking sensitive
  data.
- SHOULD keep changes small, reviewable, and aligned with existing project
  structure.
- SHOULD use Docker Compose watch mode for local development to maintain parity
  with the production-like environment.

Rationale: Operability and developer ergonomics are part of the template's value.

## Project Constraints & Stack

- Backend: FastAPI + SQLModel + Alembic + PostgreSQL; tests with Pytest;
  dependencies managed with `uv` (`backend/`).
- Frontend: React + TypeScript + Vite + Tailwind CSS + shadcn/ui + TanStack Router/
  Query; end-to-end tests with Playwright (`frontend/`).
- Runtime/Dev: Docker Compose is the default stack runner (local and production-
  like).
- Infrastructure: Traefik reverse proxy handles routing; production/staging TLS
  termination is configured via `docker-compose.traefik.yml` on the shared
  `traefik-public` network. Local development uses the `proxy` service from
  `docker-compose.override.yml`.
- CI/CD: GitHub Actions provides automated testing, linting, and related checks.
- Docs to consult before changing behavior: `development.md`, `deployment.md`,
  `backend/README.md`, `frontend/README.md`.

## Development Workflow & Change Management

All feature work follows this sequence (when applicable):

1. Design data model
2. Create/update migrations (Alembic) and verify upgrade path
3. Implement backend logic and keep OpenAPI accurate
4. Test backend changes
5. Regenerate frontend client when contracts change and commit artifacts
6. Implement frontend changes using the generated client
7. Validate end-to-end behavior and fix regressions
8. Ensure CI passes (tests, linting, typechecks) before requesting review

Review expectations:

- PRs MUST state whether they change OpenAPI and whether client regeneration is
  included.
- PRs MUST state whether they include tests; if not, include explicit
  justification.
- PRs SHOULD pass CI checks before merge approval.

## Governance

- Authority: This constitution supersedes local conventions, templates, and
  generated plans.
- Amendments: Changes MUST be made explicitly via PR that includes rationale,
  migration impact (if any), and a version bump.
- Versioning: Semantic versioning applies.
  - MAJOR: backward-incompatible governance/principle redefinition or removals.
  - MINOR: new principle/section added or materially expanded guidance.
  - PATCH: wording/clarifications that do not change meaning.
- Compliance review: Specs/plans/tasks MUST be reviewed for constitution alignment
  before implementation begins.

**Version**: 0.2.2 | **Ratified**: 2026-01-03 | **Last Amended**: 2026-01-03

