# Feature Specification: WeChat Login

**Feature Branch**: `007-wechat-login`
**Created**: 2026-01-27
**Status**: Draft
**Input**: User description: "Please read the wechat login documents https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html, integrate wechat login."
**Constitution**: `.specify/memory/constitution.md`

## Clarifications

### Session 2026-01-27

- Q: Which WeChat identifier should the system use for account linking and login matching? → A: Prefer `unionid`, fallback to `openid`.
- Q: Which desktop login UX should we implement? → A: Embed QR in our page (iframe-based).
- Q: Do we request WeChat profile permissions (`snsapi_userinfo`) or keep login-only (`snsapi_login`)? → A: Request profile permissions (`snsapi_userinfo`).
- Q: When a WeChat identity matches an existing account but is not yet linked, what should happen? → A: Block automatic merge; require user to sign in first, then link WeChat.
- Q: Should the system persist WeChat `access_token` / `refresh_token` after login? → A: Do not persist long-term; use once to fetch profile, then discard.

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

### User Story 1 - Sign in with WeChat (Priority: P1)

A user can sign in using their WeChat account from the standard login entry points. On desktop, the QR login experience is embedded in the application UI (no required full-page redirect away from the site) and returns the user to the application already signed in.

**Why this priority**: Enables a common, low-friction login method for users who prefer WeChat, increasing successful sign-ins.

**Independent Test**: Can be tested by initiating a WeChat sign-in, completing authorization, and verifying the user ends up authenticated in the application.

**Acceptance Scenarios**:

1. **Given** I am logged out, **When** I choose “Continue with WeChat” and complete authorization, **Then** I am signed in and returned to the app.
2. **Given** I am logged out, **When** I cancel or deny authorization, **Then** I remain logged out and see a clear message with an option to retry.

---

### User Story 2 - First-time WeChat sign-in creates an account (Priority: P2)

A first-time user who signs in with WeChat is able to get access without manually creating credentials first.

**Why this priority**: Ensures WeChat login is a complete onboarding path, not just an alternative for existing users.

**Independent Test**: Can be tested by signing in with a WeChat account that has never been used before and confirming a new application account is created and usable.

**Acceptance Scenarios**:

1. **Given** I have never signed in before, **When** I complete WeChat authorization, **Then** an application account is created for me and I am signed in.
2. **Given** I sign in with WeChat, **When** the application cannot retrieve sufficient identity information to create an account, **Then** I see a clear explanation and am not signed in.

---

### User Story 3 - Link and unlink WeChat to an existing account (Priority: P3)

A signed-in user can connect WeChat login to their existing account, and optionally disconnect it later.

**Why this priority**: Prevents duplicate accounts and gives users control over their sign-in methods.

**Independent Test**: Can be tested by logging in with an existing account, linking WeChat, signing out, then signing back in using WeChat.

**Acceptance Scenarios**:

1. **Given** I am signed in, **When** I link my WeChat account successfully, **Then** I can later sign in using WeChat and reach the same account.
2. **Given** I am signed in and have at least one other sign-in method available, **When** I unlink WeChat, **Then** I can no longer sign in with WeChat.
3. **Given** I have an existing account and my WeChat identity is not linked yet, **When** I attempt to sign in with WeChat, **Then** I am prompted to sign in using my existing method and then link WeChat (no automatic merge).

---

### Edge Cases
- User scans QR code but never confirms (login attempt times out).
- User attempts to reuse a previously completed or expired authorization response.
- Authorization callback is missing required parameters or contains unexpected values.
- WeChat account is already linked to a different application user.
- WeChat token response does not include `unionid`.
- User is blocked/disabled in the application and attempts WeChat sign-in.
- Temporary WeChat service disruption or degraded connectivity.
- WeChat profile fetch succeeds but token cannot be reused (tokens are intentionally not retained).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST present “Continue with WeChat” as a login option anywhere standard sign-in is offered.
- **FR-001a**: For desktop users, the WeChat login experience MUST be able to render within the application’s login UI (embedded QR experience).
- **FR-002**: System MUST initiate a WeChat authorization request in a way that prevents forged or replayed login responses.
- **FR-003**: System MUST handle the WeChat authorization callback and either (a) complete sign-in or (b) show a clear failure state without signing the user in.
- **FR-004**: System MUST create a new application account on first successful WeChat sign-in when no prior link exists.
- **FR-005**: System MUST sign the user into the correct existing account when their WeChat identity is already linked.
- **FR-006**: System MUST allow a signed-in user to link a WeChat identity to their current account.
- **FR-007**: System MUST prevent linking a WeChat identity that is already linked to another account, and MUST provide a user-friendly resolution path.
- **FR-008**: System MUST allow a signed-in user to unlink WeChat, unless unlinking would leave the account with no remaining way to sign in.
- **FR-009**: System MUST keep existing non-WeChat sign-in methods working unchanged.
- **FR-010**: System MUST record security-relevant events for WeChat sign-in attempts (success, failure reason category, and time) without storing sensitive authorization credentials in logs.
- **FR-011**: System MUST allow WeChat login to be enabled/disabled via configuration.
- **FR-012**: System MUST provide clear end-user error messages for common failure cases (canceled authorization, expired response, temporarily unavailable service) and provide a retry path.
- **FR-013**: System MUST match and link users using `unionid` when available; otherwise it MUST use `openid`, and it MUST persist which identifier type was used for the link.
- **FR-014**: System MUST request WeChat authorization sufficient to retrieve the user’s basic profile (e.g., display name and avatar) and MUST store only the minimum profile fields required for the product experience.
- **FR-015**: System MUST NOT automatically merge a WeChat identity into an existing account based on non-unique signals (e.g., matching email); instead it MUST require the user to sign in to the target account first and explicitly link WeChat.
- **FR-016**: System MUST NOT persist WeChat `access_token` or `refresh_token` beyond the immediate login flow; it MAY use tokens transiently to fetch profile data, and MUST discard tokens immediately afterward.

### Policy & Safety Notes

- **Anti-replay/CSRF (`state`)**: The system MUST validate `state` server-side, enforce a short TTL (10 minutes), and ensure one-time use by consuming `state` on successful completion.
- **WeChat-created accounts**: If a new user is created during WeChat login, the system MUST assign a non-sensitive placeholder email (must not contain `openid`/`unionid`) and allow the user to update their email later.
- **Unlink safety**: A user MUST NOT be allowed to unlink WeChat if they would be left without a viable alternative sign-in path. Placeholder-email accounts MUST be treated as *WeChat-only* until the user updates their email AND password recovery is available (i.e., emails are enabled in the environment).

### Key Entities *(include if feature involves data)*

- **WeChat Identity**: The external WeChat user identifiers used for future recognition. The system prefers `unionid` when available; otherwise it uses `openid`.
- **WeChat Profile**: Basic user-facing profile fields from WeChat used for the application experience (e.g., display name, avatar URL), with explicit minimization.
- **Account Link**: A relationship connecting one application user to one WeChat Identity.
- **Login Attempt**: A short-lived record representing an in-progress sign-in (status, timestamps, error category).
- **WeChat Login Configuration**: Admin/config-provided values that enable the feature and define allowed callback destinations.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 90% of WeChat sign-in attempts that reach the authorization step complete successfully.
- **SC-002**: Median time from choosing “Continue with WeChat” to being signed in is under 45 seconds on desktop.
- **SC-003**: 0 incidents of sensitive WeChat authorization credentials being exposed in application logs.
- **SC-004**: Support tickets related to “can’t sign in” decrease by 20% within 30 days of release (for users who use WeChat login).

## Scope & Non-Goals

- In scope: WeChat-based sign-in for the website experience, including first-time account creation and account linking.
- Out of scope: Payments, messaging, WeChat mini-program login, and any WeChat features beyond authentication.

## Assumptions

- The product already has a working authentication system and user accounts.
- The organization can obtain and maintain the required approvals/configuration in the WeChat Open Platform for the intended domains.
- WeChat login is optional; users can still sign in using existing methods.
