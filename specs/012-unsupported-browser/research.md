# Phase 0 — Research: Unsupported Browser Notice

## Decision 1: Minimum supported browser versions

- **Decision**: Use the following minimum supported browser versions in the notice and as the gating thresholds:
  - Chrome ≥ 107
  - Edge ≥ 107
  - Firefox ≥ 104
  - Safari ≥ 16
- **Rationale**: Matches the project’s documented “modern browser” baseline for Vite production builds, and provides a clear support policy for users.
- **Alternatives considered**:
  - Use a custom `build.target` policy (e.g., ES2015) and broaden support — rejected because the feature goal is to *decline* unsupported browsers, not expand compatibility.
  - Support legacy browsers via `@vitejs/plugin-legacy` — rejected because it adds build complexity and payload while contradicting “unsupported” product intent.

## Decision 2: Delivery mechanism (HTML-first fallback + gated boot)

- **Decision**: Render the compatibility notice as plain HTML/CSS in `frontend/index.html` and make it **visible by default**. Only boot the React app when the browser is deemed supported.
- **Rationale**: Old/unsupported browsers may fail to execute the Vite/React bundle. An HTML-first notice ensures users see a clear explanation even when JS can’t run.
- **Alternatives considered**:
  - Gate inside React entry (`frontend/src/main.tsx`) — rejected because module graph evaluation may fail before the check runs.
  - Rely only on `nomodule` fallback — rejected because some browsers support modules but still fall below required versions.

## Decision 3: Browser detection strategy

- **Decision**: Implement a small, dependency-free User-Agent parser in the HTML bootstrap to identify browser family + major version for Chrome/Edge/Firefox/Safari.
- **Rationale**: Keeps the gating logic lightweight and available before app boot. Avoids pulling in additional libraries for a narrow need.
- **Fallback policy**:
  - If browser family/version can’t be determined → treat as **unsupported** and show the notice (matches spec edge cases).
- **Alternatives considered**:
  - Add a UA parsing dependency (e.g., Bowser / UAParser.js) — rejected for now to minimize dependency surface; revisit if false-positives become an issue.
  - Feature-detection only — rejected because the feature contract is explicitly “minimum supported versions”, not “minimum feature set”.

### Limitations (explicit)

- User-Agent parsing is inherently imperfect (UA reduction, embedded webviews, Chromium variants).
- iOS browsers (Chrome/Edge/Firefox on iOS) are WebKit shells; their UA “browser version” may not map cleanly to engine capability.
- Policy choice for this feature: if the browser family/version cannot be determined reliably, treat it as **unsupported** and show the notice (consistent with spec edge cases).

## Decision 4: Test strategy

- **Decision**: Add a Playwright test that sets a custom User-Agent string to simulate an unsupported browser and asserts that the full-page notice renders (and that the app UI does not boot). Add a supported-UA test that asserts the notice is not shown.
- **Rationale**: Playwright can’t easily run ancient browser engines in CI, but UA-based gating is directly testable by overriding UA.
- **Alternatives considered**:
  - Manual-only verification — rejected; this is a template repo with CI quality gates.

## Operational Note: Traefik/TLS can fail before the notice renders

- If a client cannot complete the TLS handshake (due to minimum TLS version / cipher suite restrictions), the browser will not receive any HTML.
- In that scenario, the “unsupported browser” notice cannot be shown because the request never reaches the point where the frontend can respond.
- Conclusion: this feature covers *application-layer* compatibility messaging; it does not guarantee a message for browsers blocked at the TLS layer.
## Decision 5: TLS/Traefik Configuration Review (T014)

- **Finding**: The project uses Traefik 3.6.7 (see `docker-compose.traefik.yml`) with Let's Encrypt TLS certificates.
- **Default TLS behavior**: Traefik 3.x defaults to TLS 1.2 minimum, which is supported by all browsers in our minimum version list:
  - Chrome 107+ ✓ (TLS 1.2+ supported)
  - Edge 107+ ✓ (TLS 1.2+ supported)
  - Firefox 104+ ✓ (TLS 1.2+ supported)
  - Safari 16+ ✓ (TLS 1.2+ supported)
- **Conclusion**: No additional TLS configuration changes are needed. Browsers below our minimum versions may still complete TLS handshakes (TLS 1.2 support goes back further than browser version targets), but they will subsequently see the application-layer compatibility notice.
- **Risk**: Very old browsers (e.g., IE11, Safari < 7) that only support TLS 1.0/1.1 would fail at the TLS layer and never see the notice. This is considered acceptable since these browsers are far below our minimum versions.
