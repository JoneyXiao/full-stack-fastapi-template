# Phase 0 Research: Application Localization (English + Chinese)

**Branch**: 004-localization
**Date**: 2026-01-15

## Decision 1: Reuse existing locale preference utilities

- **Decision**: Use the existing frontend locale utilities in `frontend/src/lib/locale.ts` and the hook `frontend/src/hooks/useLocale.ts` to:
  - Persist locale to localStorage (`app-locale`)
  - Detect initial locale from `navigator.language` (already maps `zh-*` → `zh`)
  - Set `document.documentElement.lang`
- **Rationale**: The repository already has a minimal, working locale-preference foundation that matches the feature spec’s defaulting and `zh-*` mapping requirements.
- **Alternatives considered**:
  - Introduce a new locale storage key or new preference mechanism (rejected: increases churn and risk).

## Decision 2: Keep i18n implementation simple (no new i18n framework)

 **Decision**: Use a standard i18n library (`i18next` + `react-i18next`) with a deliberately small integration surface (single namespace, explicit keys, simple resource bundles).
 **Rationale**:
  - The project intends to add more locales in the future; a mature library avoids reinventing pluralization, interpolation, and runtime switching patterns.
  - Keeps translation mechanics consistent and maintainable as the UI grows.
  - Still compatible with the constitution’s Simplicity Gate by keeping configuration minimal and avoiding premature abstraction.
   - React integration follows the standard pattern: initialize i18next with `initReactI18next`, set `fallbackLng: "en"`, and set `interpolation.escapeValue: false` (React already escapes output).
 **Alternatives considered**:
  - Custom dictionary + `t(key)` helper (rejected: becomes maintenance-heavy and error-prone as locales and message complexity grow).

## Decision 2a: Do not add automatic language detection plugins (initially)

- **Decision**: Do not use `i18next-browser-languagedetector` for this feature.
- **Rationale**:
  - The repo already has locale selection/persistence utilities (`frontend/src/lib/locale.ts`) with explicit product rules (localStorage `app-locale` precedence and `zh-*` mapping).
  - Using both a detector plugin and our custom precedence rules would add hidden behavior and make sign-in precedence harder to reason about.

## Decision 3: Persist signed-in user preference in the backend user model

- **Decision**: Add an optional `locale` field to the `User` model (nullable). Expose it via the existing `/api/v1/users/me` GET/PATCH contract.
- **Rationale**: The feature spec requires cross-device persistence for signed-in users.
- **Alternatives considered**:
  - Separate `user_preferences` table (rejected: unnecessary complexity for a single attribute).
  - Frontend-only storage (rejected: fails cross-device requirement).

## Decision 4: Preference precedence (signed-in vs device)

- **Decision**: On sign-in, use device/browser locale unless the account already has an explicitly saved locale.
- **Rationale**: Avoids surprising language flips on sign-in while still converging to a stable account preference once explicitly set.
- **Alternatives considered**:
  - Always prefer account locale (rejected: can override device preference unexpectedly).
  - Prompt on sign-in (rejected: extra UX step).

## Decision 5: Localize “system messages” on the frontend

- **Decision**: Keep backend error strings as-is, but localize user-visible error messages in the frontend UI layer by mapping common known cases (status codes and common `detail` strings) to translation keys.
- **Rationale**:
  - Avoids coupling backend error strings to localization concerns.
  - Keeps API stable while meeting the spec’s requirement that critical user-facing messages are localized.
- **Alternatives considered**:
  - Backend-driven localization via `Accept-Language` and translated `detail` strings (rejected for now: larger scope and requires internationalizing backend error generation).

## Notes / Risks

- Some screens currently use `Date(...).toLocaleDateString()`. The feature spec explicitly excludes locale-specific formatting changes, so this work should avoid passing a selected locale into formatting functions.
