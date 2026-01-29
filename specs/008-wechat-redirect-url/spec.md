# Feature Specification: WeChat Redirect URL Update

**Feature Branch**: `008-wechat-redirect-url`
**Created**: 2026-01-29
**Status**: Draft
**Input**: User description: "Update WeChat login redirect_url to use https://h5.yunxi668.com/passport/wxLogin?from=https://ai.yunxi668.com/wechat-callback and then redirect to https://ai.yunxi668.com/wechat-callback?code=[code]"
**Constitution**: `.specify/memory/constitution.md`

## Clarifications

### Session 2026-01-29

- Q: Where does the user land after WeChat authorization? → A: WeChat redirects to `https://h5.yunxi668.com/passport/wxLogin?...`, which receives `code` and `state` and then redirects to `https://ai.yunxi668.com/wechat-callback?code=[code]&state=[state]`.
- Q: Is `https://ai.yunxi668.com/wechat-callback` handled by frontend or backend? → A: Frontend route reads `code` and `state` and calls backend to complete login.
- Q: Should linking and login share the same callback route? → A: Yes — a single frontend callback route supports both, using `action=link` for linking and default behavior for login.
- Q: Where should users land after a successful callback? → A: Redirect to a `from` destination if present and allowlisted; otherwise fallback (e.g., homepage).
- Q: What destinations are considered allowlisted for `from`? → A: Same-origin relative paths only (e.g., `/settings`), reject full URLs.

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Login via WeChat using updated redirect chain (Priority: P1)

As a user who chooses WeChat login, I want the login flow to complete successfully using the updated redirect URL pattern, so that I can sign in to the AI site without errors.

**Why this priority**: This is the primary login path impacted by the redirect URL change; if it fails, users cannot access the product.

**Independent Test**: Can be fully tested by starting a WeChat login from the AI site and confirming the user ends up signed in after returning to the AI callback URL.

**Acceptance Scenarios**:

1. **Given** a signed-out user, **When** they start WeChat login, **Then** the system sends them to the intermediary URL `https://h5.yunxi668.com/passport/wxLogin?from=<ai-callback-url>`, where `<ai-callback-url>` is `https://ai.yunxi668.com/wechat-callback` (and may include query params like `action=link` and `from=/relative/path`).
2. **Given** the user completes authorization in WeChat, **When** they are redirected to the intermediary URL, **Then** the intermediary receives `code` and `state` query parameters.
3. **Given** the intermediary received `code` and `state`, **When** it redirects to the AI callback URL, **Then** the AI callback includes the same `code` and `state` query parameters and the user is signed in successfully.
4. **Given** the AI callback is reached with `code` and `state`, **When** the frontend processes the callback, **Then** it calls the backend to exchange the code and establish the login session before navigating the user to the post-login destination.
5. **Given** the AI callback is reached with `action=link` and a `code`, **When** the frontend processes the callback, **Then** it calls the backend to link the WeChat identity to the currently signed-in user.
6. **Given** the AI callback is reached with a valid `code` and a `from` destination, **When** the frontend completes login, **Then** it navigates to the `from` destination only if it is allowlisted; otherwise it navigates to the default fallback destination.

---

### User Story 2 - Clear errors when authorization fails (Priority: P2)

As a user attempting WeChat login, I want a clear, actionable message when the authorization step fails or returns an invalid code, so that I know what to do next.

**Why this priority**: Redirect flows fail for many real-world reasons (denied consent, expired code, network issues). Clear handling reduces user frustration and support load.

**Independent Test**: Can be fully tested by simulating callback requests with missing/invalid codes and verifying the user sees a clear failure outcome and can retry.

**Acceptance Scenarios**:

1. **Given** a signed-out user, **When** the callback is reached without a `code` or `state` parameter, **Then** the system does not sign the user in and presents a clear message indicating login did not complete and can be retried.
2. **Given** a signed-out user, **When** the callback is reached with an invalid or expired `code`, **Then** the system does not sign the user in and presents a clear message indicating login failed and can be retried.

---

### Edge Cases

- Callback is reached with no `code` or no `state` parameter (user canceled, intermediary misconfigured, or direct navigation).
- Callback is reached with a `code` that is expired, already used, or malformed.
- Authorization flow is initiated multiple times in parallel (multiple browser tabs).
- User is already signed in when starting WeChat login.
- Temporary upstream failures prevent completing the login (timeouts, provider errors).
- Any unexpected query parameters are ignored safely.
- A malicious or malformed `from` destination is provided (must not allow open redirects).
- A `from` destination is present but not an allowlisted relative path (must use fallback).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST initiate the WeChat login flow using the intermediary base URL `https://h5.yunxi668.com/passport/wxLogin` and MUST pass `from=<ai-callback-url>` where `<ai-callback-url>` is `https://ai.yunxi668.com/wechat-callback` plus any required query parameters.
- **FR-002**: System MUST support completing WeChat login when the AI callback endpoint is reached at `https://ai.yunxi668.com/wechat-callback` with `code` and `state` query parameters forwarded by the intermediary.
- **FR-003**: System MUST exchange the returned authorization code for the information required to identify the user and complete sign-in.
- **FR-004**: System MUST sign the user in when the authorization code is valid and the user identity can be resolved.
- **FR-005**: System MUST fail safely (no sign-in) when the authorization code is missing or invalid.
- **FR-006**: System MUST provide a clear retry path after failed WeChat login (e.g., user can start the flow again).
- **FR-007**: System MUST prevent sensitive credential leakage (authorization codes, access tokens, refresh tokens, secrets) through logs or user-visible error messages.
- **FR-008**: Operators MUST be able to update the redirect URL used for WeChat login without requiring an application code change.
- **FR-009**: The AI callback URL MUST be handled by the frontend and MUST call the backend to complete the login (code exchange + session establishment) using `code` and `state`.
- **FR-010**: The callback route MUST support both login and account linking, differentiated by an `action` query parameter (e.g., `action=link`).
- **FR-011**: If a `from` destination is provided, the frontend MUST only redirect to it when it is allowlisted; otherwise it MUST redirect to a safe fallback destination.
- **FR-012**: The `from` allowlist MUST accept only same-origin relative paths (e.g., `/settings`) and MUST reject full URLs.

### Assumptions & Dependencies

- The intermediary page at `https://h5.yunxi668.com/passport/wxLogin` remains available and continues receiving `code` and `state` from WeChat and redirecting users to `https://ai.yunxi668.com/wechat-callback?code=[code]&state=[state]` when authorization succeeds.
- The AI callback URL `https://ai.yunxi668.com/wechat-callback` is reachable from user devices during the login flow.

### Scope Boundaries

- In scope: Updating the WeChat login initiation to use the new redirect chain and ensuring callback completion using the returned `code` and `state`.
- Out of scope: Changes to WeChat provider-side configuration beyond what is necessary to support the redirect URL update.

### Key Entities *(include if feature involves data)*

- **Authorization Code**: A short-lived code returned to the AI callback URL that can be exchanged to complete login.
- **WeChat Identity**: The external identity attributes returned from WeChat used to uniquely identify the person.
- **User Account**: The internal account that the WeChat identity maps to (existing or newly created, depending on current product rules).
- **Login Session**: The signed-in state established after successful login.

## Success Criteria *(mandatory)*

### Measurable Outcomes

Note: These success criteria are operational KPIs to be monitored post-release; adding new telemetry/metrics pipelines is out of scope for this feature.

- **SC-001**: At least 95% of WeChat login attempts that reach the callback with a valid `code` result in a successful sign-in.
- **SC-002**: A signed-out user can complete WeChat login (start login → signed in) in under 60 seconds for at least 90% of successful attempts.
- **SC-003**: 0 instances of sensitive credentials (authorization codes, access tokens, refresh tokens, secrets) appearing in application logs during normal operations.
- **SC-004**: Support requests related to “WeChat login redirect” decrease by at least 50% within 2 weeks of release.
