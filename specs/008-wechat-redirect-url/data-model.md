# Data Model: WeChat Redirect URL Update

This feature primarily changes URL construction and callback navigation. No new database tables are required.

## Existing Entities (unchanged)

### WeChatLoginAttempt (`backend/app/models.py`)

**Purpose**: Short-lived anti-replay/CSRF record for WeChat login attempts, keyed by `state`.

Key fields:
- `state` (unique, indexed)
- `created_at`, `expires_at`, `completed_at`
- `status` (`started`/`succeeded`/`failed`)
- `failure_category`
- `user_id` (optional; can be used for link flows)

### WeChatAccountLink (`backend/app/models.py`)

**Purpose**: Persistent link from an app user to a WeChat identity.

Key fields (high-level):
- `user_id`
- `openid`, `unionid`
- `primary_subject_type` + `primary_subject`
- display attributes like `nickname`, `avatar_url` (if present in current schema)

## API Schemas (contract-level)

### WeChatLoginStartRequest

Current:
- `return_to?: string | null` (intended post-success destination)

Planned extension:
- `action?: "login" | "link"` (defaults to `login`)

### WeChatLoginStartResponse

- `appid`, `scope`, `redirect_uri`, `state`, `wx_login_js_url`

Notes:
- `redirect_uri` returned by backend is *not* URL-encoded; frontend passes it through `encodeURIComponent(...)` when calling `wxLogin.js`.

## Validation Rules

- `return_to` / `from` allowlist (post-success redirect): same-origin relative paths only (e.g., `/settings`), reject full URLs.
