# Research: WeChat Redirect URL Update

This document resolves remaining technical unknowns and records decisions made while planning `008-wechat-redirect-url`.

## Decision 1: Build `redirect_uri` with two-layer URL encoding

**Decision**: Build an inner callback URL on `ai.yunxi668.com` (optionally including `action=link` and `from=/relative/path`), embed it into the intermediary URL as the `from` query parameter, then pass the entire outer URL to WeChat via `wxLogin.js` after applying `encodeURIComponent` exactly once.

**Rationale**:
- WeChat Website QR login requires `redirect_uri` to be URL-encoded.
- The intermediary needs the full callback URL as a query parameter value; therefore the inner URL must be encoded as a value (so its `?`/`&` do not break the outer query string).
- Doing one encoding per “layer” avoids both query-string corruption and double-encoding bugs.

**Implementation notes (encoding order)**:
- Inner callback URL: build as a normal URL string (not pre-encoded)
- Outer intermediary URL: use `URL`/`URLSearchParams` to set `from=<inner-callback-url>` (this encodes the inner URL as a parameter value)
- WeChat `redirect_uri`: `encodeURIComponent(outerUrlString)` when passing into `WxLogin({ redirect_uri })`

**Alternatives considered**:
- Direct WeChat redirect to `ai.yunxi668.com/wechat-callback` (simpler, but does not match the required new flow).
- Manually concatenating strings with custom encoding (more error-prone vs `URL`/`URLSearchParams`).

## Decision 2: WeChat Open Platform configuration must match the first-hop domain

**Decision**: Configure the WeChat Website Application “authorized callback domain” to match the domain used in `redirect_uri`.

**Rationale**:
- WeChat enforces that `redirect_uri`’s domain matches the domain configured/approved in WeChat Open Platform; mismatches cause login failures.
- With the new flow, WeChat’s first redirect target becomes `h5.yunxi668.com`, so that is the domain that must be authorized.

**Alternatives considered**:
- Keep authorization domain as `ai.yunxi668.com` (does not work if `redirect_uri` points to `h5.yunxi668.com`).

## Decision 3: Safe post-success redirect (“from” allowlist) uses relative paths only

**Decision**: Support an optional `from` parameter on the frontend callback route for post-success navigation, but accept only same-origin relative paths (must start with `/`, must not start with `//`, must not contain `\\`, and must not contain leftover encoded separators like `%2f` or `%5c` after the initial decode). On validation failure, fall back to a safe default.

**Rationale**:
- Prevents open redirect vulnerabilities and phishing vectors.
- Keeps behavior predictable across environments and does not require maintaining a domain allowlist.

**Alternatives considered**:
- Allow full URLs to `ai.yunxi668.com/*` (more complex; easier to get wrong).
- Allow a fixed set of domains (requires maintenance and still needs careful parsing).

## Open Questions

None remaining for planning. Any additional environment-specific requirements (e.g., which callback domain is approved in WeChat Open Platform for this app) should be validated during deployment configuration.
