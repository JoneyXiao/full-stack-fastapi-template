# Feature Specification: WeChat Login Unavailable Toast

**Feature Branch**: `008-wechat-login-unavailable`
**Created**: 2026-01-30
**Status**: Draft
**Input**: User description: "If WECHAT_LOGIN_ENABLED=False, toasts users that the wechat login is unavailable currently."
**Constitution**: `.specify/memory/constitution.md`

## Clarifications

### Session 2026-01-30

- Q: When `WECHAT_LOGIN_ENABLED=False`, should the WeChat login option be hidden, disabled, or still clickable but show a toast? → A: Keep it visible and clickable; on click show a toast and do not start auth.
- Q: When `WECHAT_LOGIN_ENABLED=False`, how should repeat-click notifications behave? → A: Debounce; show at most 1 toast per 2 seconds while disabled.
- Q: What exact toast message should be shown when WeChat login is unavailable? → A: “WeChat login is currently unavailable.”
- Q: What toast severity/variant should be used? → A: Warning.

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

### User Story 1 - Clear feedback when WeChat login is disabled (Priority: P1)

As a user who wants to sign in using WeChat, I want to be clearly informed when WeChat login is unavailable so I can choose another sign-in method without confusion.

**Why this priority**: Prevents dead-end actions and reduces user frustration on the sign-in flow.

**Independent Test**: Can be fully tested by setting WeChat login availability to disabled and attempting to start WeChat sign-in from the UI; value is delivered if the user receives immediate, clear feedback and the login flow does not start.

**Acceptance Scenarios**:

1. **Given** WeChat login availability is disabled (`WECHAT_LOGIN_ENABLED=False`), **When** the user selects the WeChat login option, **Then** the user sees a non-blocking notification with the message “WeChat login is currently unavailable.”
2. **Given** WeChat login availability is disabled (`WECHAT_LOGIN_ENABLED=False`), **When** the toast is shown, **Then** it uses the Warning severity/variant.
3. **Given** WeChat login availability is disabled (`WECHAT_LOGIN_ENABLED=False`), **When** the user selects the WeChat login option, **Then** the system does not initiate any WeChat sign-in flow (no navigation/redirect, and the user remains on the current screen).

---

### User Story 2 - Repeated clicks remain usable and non-disruptive (Priority: P2)

As a user, I want repeated attempts to use WeChat login to remain non-disruptive so I can quickly switch to an alternative sign-in method.

**Why this priority**: Protects the usability of the sign-in screen even if the user clicks multiple times.

**Independent Test**: Can be tested by rapidly selecting the WeChat login option multiple times while disabled and verifying the user can still use other sign-in options.

**Acceptance Scenarios**:

1. **Given** WeChat login availability is disabled (`WECHAT_LOGIN_ENABLED=False`), **When** the user selects the WeChat login option repeatedly in a short period, **Then** the user receives clear feedback without the UI becoming unusable or blocking access to other sign-in methods.
2. **Given** WeChat login availability is disabled (`WECHAT_LOGIN_ENABLED=False`), **When** the user selects the WeChat login option repeatedly, **Then** the notification is rate-limited to at most one toast every 2 seconds.

---

### Edge Cases

Definition note: “per page” means “per browser tab (single JS runtime)”; rate limiting is not required to be shared across multiple tabs.

- WeChat login availability toggles while the sign-in screen is open.
- The user is offline or has intermittent connectivity (should still get the “unavailable” message when disabled).
- The user clicks the WeChat login option multiple times quickly.
- The user clicks the WeChat login option repeatedly (toast should not spam due to rate limiting).
- The sign-in screen is opened in multiple tabs.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: When WeChat login availability is disabled (`WECHAT_LOGIN_ENABLED=False`), the system MUST show a clear, user-friendly notification when the user selects the WeChat login option.
- **FR-002**: When WeChat login availability is disabled (`WECHAT_LOGIN_ENABLED=False`), the system MUST NOT initiate the WeChat sign-in flow.
- **FR-003**: The “WeChat login is unavailable” notification MUST NOT block the user from using alternative sign-in methods.
- **FR-004**: The message content MUST be exactly: “WeChat login is currently unavailable.”
- **FR-005**: The behavior MUST be consistent anywhere the WeChat login option is presented to users (at minimum: the `/login` screen).
- **FR-006**: When WeChat login availability is disabled (`WECHAT_LOGIN_ENABLED=False`), the WeChat login option MUST remain visible and clickable; clicking it triggers the notification and no sign-in flow.
- **FR-007**: When WeChat login availability is disabled (`WECHAT_LOGIN_ENABLED=False`), the “WeChat login is unavailable” notification MUST be rate-limited to at most one toast every 2 seconds per page.
- **FR-008**: The notification MUST use the Warning severity/variant.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: When WeChat login availability is disabled, 100% of attempts to use WeChat login result in a clear “currently unavailable” notification.
- **SC-002**: When WeChat login availability is disabled, 0% of attempts to use WeChat login initiate a WeChat sign-in flow.
- **SC-003**: In an end-to-end automated test, after the toast is shown, the user can still successfully use an alternative sign-in method without the UI being blocked.
- **SC-004**: Post-release metric (out of implementation scope): support requests related to “WeChat login not working” decrease over a defined evaluation window (e.g., 30 days after release).

## Assumptions

- The product already has at least one alternative sign-in method available when WeChat login is disabled.
- A user-visible notification pattern exists (e.g., a toast or banner) that can be used for non-blocking feedback.
- The WeChat login option remains visible and clickable in the UI even when disabled; the core requirement is to provide clear feedback if the user attempts to use it.
