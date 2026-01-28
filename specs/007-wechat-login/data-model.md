# Data Model: WeChat Login

**Feature**: [spec.md](spec.md)
**Date**: 2026-01-27

## Entities

### 1) WeChatAccountLink

Represents the relationship between an application user and a WeChat identity.

**Fields (conceptual)**

- `id`: unique identifier
- `user_id`: reference to the application user
- `openid`: WeChat app-scoped user id (required)
- `unionid`: WeChat Open Platform cross-app user id (optional)
- `primary_subject_type`: one of `unionid` | `openid` (required)
- `primary_subject`: the identifier value used for matching (required)
- `nickname`: optional display name from WeChat userinfo
- `avatar_url`: optional avatar URL from WeChat userinfo
- `created_at`: timestamp
- `updated_at`: timestamp

**Constraints / Relationships**

- Each `WeChatAccountLink` belongs to exactly one application user.
- A given WeChat identity MUST NOT be linked to more than one application user.
  - Enforce uniqueness on `openid`.
  - Enforce uniqueness on `unionid` when present.
  - Also enforce uniqueness on (`primary_subject_type`, `primary_subject`).

**Validation Rules**

- `primary_subject_type` MUST be `unionid` when `unionid` is present; otherwise it MUST be `openid`.
- `primary_subject` MUST equal the field indicated by `primary_subject_type`.

### 2) WeChatLoginAttempt (optional)

A short-lived record for operability and security review.

**Fields (conceptual)**

- `id`: unique identifier
- `created_at`: timestamp
- `completed_at`: optional timestamp
- `status`: `started` | `succeeded` | `failed`
- `failure_category`: optional (e.g., `canceled`, `invalid_code`, `state_mismatch`, `provider_unavailable`)

**Notes**

- This entity can be implemented as a DB table or as structured logs depending on desired persistence.
- The feature spec requires security-relevant events without storing credentials/tokens.

## State Transitions

- `WeChatLoginAttempt.started` → `succeeded` or `failed`
- `WeChatAccountLink` is created on:
  - first-time WeChat sign-in
  - explicit “link WeChat” action by an authenticated user

## Data Minimization

- The system must store only minimal WeChat profile fields needed for the UX.
- The system must not persist WeChat access/refresh tokens.
