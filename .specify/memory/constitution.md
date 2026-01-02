<!--
Sync Impact Report

- Version change: template placeholders -> 0.1.0
- Modified principles:
  - Principle 1 placeholder -> I. Secure Defaults & Secret Hygiene
  - Principle 2 placeholder -> II. Contract-Driven API & Generated Client
  - Principle 3 placeholder -> III. Consistent Tooling & Types
  - Principle 4 placeholder -> IV. Tests for Behavior Changes
  - Principle 5 placeholder -> V. Reproducible Environments (Docker Compose)
- Added sections:
  - Stack Constraints
  - Spec-Driven Workflow (SpecKit)
- Removed sections: None
- Templates requiring updates:
  - ✅ updated: .specify/templates/plan-template.md
  - ✅ updated: .specify/templates/tasks-template.md
  - ✅ updated: .specify/templates/checklist-template.md (clarification only)
  - ✅ updated: .specify/templates/agent-file-template.md (project name placeholder alignment)
  - ✅ reviewed: .specify/templates/spec-template.md (no constitution-specific changes needed)
- Follow-up TODOs:
  - TODO(RATIFICATION_DATE): determine original ratification date (YYYY-MM-DD)
-->

# Full Stack FastAPI Template Constitution

## Core Principles

### I. Secure Defaults & Secret Hygiene
This repository MUST remain safe-by-default. Any change that touches auth, user data,
credentials, or deployment MUST prioritize security over convenience.

Non-negotiables:
- Secrets MUST come from environment variables or secret managers (never committed).
- Default placeholder secrets (e.g., `changethis`) MUST NOT be used in production.
- Authentication and authorization checks MUST be enforced server-side.
- User input MUST be validated at boundaries (API schemas + server validation).

Rationale: This template is often deployed as-is; insecure defaults propagate.

### II. Contract-Driven API & Generated Client
The backend API contract is the source of truth and MUST remain consistent with the
generated frontend client.

Non-negotiables:
- Backend changes that affect requests/responses MUST be reflected in OpenAPI.
- If OpenAPI changes, the frontend client MUST be regenerated via the repo script
	(do not hand-edit generated client files).
- Backward-incompatible API changes MUST be explicit and justified (prefer additive
	changes where possible).

Rationale: A typed generated client prevents drift and reduces runtime errors.

### III. Consistent Tooling & Types
The project MUST follow the established tooling and type discipline.

Non-negotiables:
- Backend Python MUST stay compatible with the configured supported version range.
- Backend code MUST pass lint/type checks consistent with `ruff` and strict `mypy`.
- Frontend TypeScript MUST typecheck, and formatting/linting MUST follow `biome`.
- Do not introduce additional linters/formatters/type checkers unless replacing the
	existing ones with a clear migration plan.

Rationale: Consistent tooling keeps CI predictable and contributor overhead low.

### IV. Tests for Behavior Changes
Behavior changes MUST be accompanied by tests appropriate to the layer.

Non-negotiables:
- Backend behavior changes (routes/CRUD/security) MUST include or update `pytest`
	coverage in `backend/tests/`.
- Frontend behavior changes that affect critical user flows SHOULD include or
	update Playwright tests in `frontend/tests/`.
- Bug fixes MUST add a regression test unless the change is purely documentation.

Rationale: This template is a baseline; regressions multiply across downstream forks.

### V. Reproducible Environments (Docker Compose)
Development and production environments MUST remain reproducible and documented.

Non-negotiables:
- Changes that affect runtime behavior MUST work in Docker Compose.
- `docker-compose.yml` and related deployment docs MUST stay in sync with code.
- Prefer environment-based configuration; avoid machine-specific assumptions.

Rationale: Reproducibility is core to the templates value.

## Stack Constraints

This template is opinionated. Changes SHOULD preserve the intended architecture.

Baseline stack:
- Backend: FastAPI + SQLModel + Alembic + PostgreSQL; JWT auth; email workflows.
- Frontend: React + TypeScript + Vite; TanStack Router/Query; Tailwind CSS;
	shadcn/ui components.
- Local/Prod orchestration: Docker Compose; Traefik reverse proxy.

Constraints:
- Prefer additive changes over replacements (e.g., do not swap ORMs/routing
	libraries without strong justification).
- Keep generated artifacts generated (frontend OpenAPI client; email template build
	outputs as applicable).

## Spec-Driven Workflow (SpecKit)

When using SpecKit workflows, the following expectations apply:

- Work MUST be scoped and documented under `specs/<feature>/` using `spec.md`,
	`plan.md`, and `tasks.md`.
- Any plan MUST include a "Constitution Check" section that maps work to these
	principles and explicitly calls out any violations.
- If a principle blocks a feature, adjust the design/spec. Do not silently
	reinterpret the constitution.

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

**Version**: 0.1.0 | **Ratified**: TODO(RATIFICATION_DATE) | **Last Amended**: 2026-01-03
