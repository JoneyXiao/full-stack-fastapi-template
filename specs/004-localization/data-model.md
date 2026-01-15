# Phase 1 Data Model: Application Localization (English + Chinese)

**Branch**: 004-localization
**Date**: 2026-01-15

## Entities

### User

- **Purpose**: Store an optional, explicit language preference for signed-in users.
- **New Field**: `locale`
  - Type: string (nullable)
  - Allowed values: `en`, `zh`
  - Notes:
    - `locale` values are stable UI language identifiers and should align with the
      frontend i18n language codes (e.g., i18next language keys).
  - Meaning:
    - `null` / unset → user has not explicitly chosen an account-level language; device/browser preference may be used.
    - `en` / `zh` → explicit account preference to apply on sign-in (cross-device).

### Language (conceptual)

- Allowed values: `en`, `zh`
- Chinese variant: Simplified Chinese.

### Language Preference (conceptual)

- **Signed-out**: stored on device via localStorage key `app-locale`.
- **Signed-in**: stored both on device (`app-locale`) and optionally on the account (`User.locale`).

## Relationships

- No new tables or relationships; `User.locale` is a single nullable attribute.

## Validation Rules

- `locale` MUST be one of `en` or `zh` when provided.

## State / Precedence Rules

- If `User.locale` is set → it is authoritative on sign-in (cross-device).
- If `User.locale` is not set → use device/browser preference when available; otherwise default to `en`.
