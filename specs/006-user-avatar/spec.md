# Feature Specification: User Avatar Upload

**Feature Branch**: `006-user-avatar`
**Created**: 2026-01-24
**Status**: Draft
**Input**: User description: "As a registered user, I want to upload a profile picture (avatar) in the Settings page, so that I can personalize my account and make it easily recognizable."
**Constitution**: `.specify/memory/constitution.md`

## Assumptions

- Users are already authenticated to access the Settings page.
- Avatars are intended to be shown anywhere the product displays a user identity (e.g., navigation/account surfaces, user profile screens, and authored content).
- Avatars are public-facing content; users should avoid uploading sensitive information.
- The product will support common image formats and enforce limits on file size and dimensions to protect performance and safety.
- Default limits:
  - Supported formats: JPEG, PNG, WebP
  - Maximum file size: 5 MB
  - Maximum image dimensions: 4096 × 4096 pixels
- To reduce bandwidth and storage usage, the system will reduce (compress) image file size before transmitting it to the server while keeping the avatar recognizable.

  Note: “recognizable” is a UX quality goal; hard guarantees are enforced via the concrete constraints (square crop, max 512×512 output, supported formats, and size/dimension limits).
- Default processed output format: WebP (fallback to JPEG if WebP processing is not available).
- If a user does not have an avatar (or removes it), the product displays a default placeholder.

## Out of Scope

- Advanced photo editing (filters, manual cropping tools, background removal)
- Animated avatars
- Moderation workflows beyond basic validation (e.g., reporting/review queues)

## Clarifications

### Session 2026-01-24

- Q: What maximum avatar dimension should pre-upload downscaling/compression target? → A: 512×512 max (square)
- Q: Should the avatar output be forced to square, and how? → A: Yes; center-crop to square (preview matches final)
- Q: After client-side processing, what image format should be uploaded? → A: Convert to WebP (fallback to JPEG if needed)
- Q: Who should be able to view user avatars? → A: Publicly visible (no login required)
- Q: How should transparency be handled during processing? → A: Flatten onto a solid background color

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

### User Story 1 - Upload a profile picture (Priority: P1)

As a signed-in user, I can select an image in the Settings page and save it as my avatar.

**Why this priority**: This is the core user value—personalization and recognizability.

**Independent Test**: Can be fully tested by uploading a valid image in Settings and verifying the avatar updates for the same signed-in user.

**Acceptance Scenarios**:

1. **Given** I am signed in and have no avatar, **When** I upload a valid image and save, **Then** my avatar is updated and displayed as my profile picture.
2. **Given** I am signed in and already have an avatar, **When** I upload a different valid image and save, **Then** my avatar is replaced with the new image.
3. **Given** I am signed in, **When** I attempt to upload an invalid or unsupported file, **Then** I see a clear error message and my current avatar remains unchanged.
4. **Given** I am signed in and I select a very large valid image, **When** I save my new avatar, **Then** the system reduces the image file size before transmitting it.
5. **Given** I am signed in and I select a non-square image, **When** I preview and save my new avatar, **Then** the preview shows a centered square crop and the saved avatar matches that preview.
6. **Given** I am signed in and I select a valid image, **When** I save my new avatar, **Then** the uploaded avatar uses WebP format when possible (otherwise JPEG).
7. **Given** I am signed in and I select an image with transparency, **When** I preview and save my new avatar, **Then** the preview and saved avatar have no transparency (flattened).

---

### User Story 2 - Preview and confirm changes (Priority: P2)

As a signed-in user, I can preview the selected image before saving, so I can avoid accidentally setting the wrong picture.

**Why this priority**: Prevents mistakes and improves confidence without requiring support.

**Independent Test**: Can be tested by selecting an image, confirming the preview is shown, cancelling, and verifying the saved avatar is unchanged.

**Acceptance Scenarios**:

1. **Given** I am signed in, **When** I select an image, **Then** I see a preview before committing the change.
2. **Given** I am signed in and have selected a new image, **When** I cancel or navigate away without saving, **Then** my avatar remains unchanged.

---

### User Story 3 - Remove avatar and revert to default (Priority: P3)

As a signed-in user, I can remove my current avatar and revert to the default placeholder.

**Why this priority**: Gives users control over their profile presentation and privacy.

**Independent Test**: Can be tested by removing the avatar in Settings and verifying the default placeholder is shown.

**Acceptance Scenarios**:

1. **Given** I am signed in and have an avatar, **When** I remove it, **Then** the default placeholder is shown anywhere my avatar appears.

---

### Edge Cases

- Upload fails mid-way (network interruption) and the UI must clearly indicate failure with no partial avatar update.
- File is too large or dimensions are unreasonably large; user gets an actionable message.
- User uploads an image with unusual aspect ratio; the center-crop still produces a recognizable avatar and does not break layout.
- User rapidly retries uploads; the system continues to behave predictably and safely.
- Image size reduction fails (e.g., due to file corruption or unsupported encoding); the user receives a clear error and the avatar remains unchanged.
- WebP processing is not available; the system falls back to uploading a JPEG.
- Source image includes transparency; the system flattens it to a solid background without unexpected visual artifacts.
- After a user updates or removes their avatar, previously visible public avatar views must stop showing the old image within the consistency window.
- User opens Settings in two tabs and saves different avatars; the last saved change wins and is reflected consistently.
- User removes avatar and then refreshes; the default placeholder remains.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a Settings-page control that allows a signed-in user to select an image and set it as their avatar.
- **FR-002**: The system MUST accept only JPEG, PNG, and WebP avatar uploads and reject other formats.
- **FR-003**: The system MUST reject avatar uploads larger than 5 MB and show an error message that includes the limit.
- **FR-004**: The system MUST reject avatar uploads with dimensions larger than 4096 × 4096 pixels and show a clear error message.
- **FR-005**: The system MUST allow the user to preview the selected image before saving the change.
- **FR-006**: The system MUST allow the user to cancel without changing the saved avatar.
- **FR-007**: The system MUST allow the user to remove their avatar and revert to a default placeholder.
- **FR-008**: The system MUST ensure users can only create/update/remove their own avatar (no user can change another user’s avatar).
- **FR-009**: The system MUST keep the user’s current avatar unchanged if an upload attempt fails validation or cannot be saved.
- **FR-010**: The system MUST display the updated avatar consistently anywhere avatars are shown after the change is saved.
- **FR-011**: The system MUST provide accessible presentation for avatars (e.g., meaningful fallback when images cannot be loaded).
- **FR-012**: The system MUST limit avatar change attempts to at most 10 attempts per hour per user; users exceeding the limit MUST see a clear message indicating they should try again later.
- **FR-013**: The system MUST reduce the avatar image file size before sending it to the server, while still meeting the required output constraints (square crop, max 512×512, WebP/JPEG output).
- **FR-014**: The system MUST downscale the avatar image before upload so the resulting avatar image is at most 512 × 512 pixels.
- **FR-015**: The system MUST produce a square avatar image by applying a centered crop, and the preview MUST match the saved avatar.
- **FR-016**: The system MUST upload the processed avatar image as WebP when possible; if WebP processing is not available, it MUST upload JPEG instead.
- **FR-017**: The system MUST make user avatars publicly viewable (no login required) wherever avatars are exposed.
- **FR-018**: If the source image contains transparency, the system MUST flatten the processed avatar onto a solid background color (default: white) before upload.

### Key Entities *(include if feature involves data)*

- **User**: The account holder who can set or remove an avatar.
- **Avatar Image**: The user-selected profile picture associated with a User, including metadata needed to validate and display it (e.g., image type, size, and last-updated time).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 90% of users who attempt to change their avatar successfully complete the change without external help.
- **SC-002**: A user can complete an avatar change (select → save → see updated avatar) in under 60 seconds in typical conditions.
- **SC-003**: Invalid uploads (wrong file type or too large) show a clear error message, and fewer than 5% of upload attempts result in an “unclear failure” (user reports it didn’t work and cannot tell why).
- **SC-004**: Avatar changes become visible across the product for the user within 5 seconds of saving (or by the next page load), with consistent display (no mixed old/new state).
- **SC-005**: For avatar updates where the originally selected image is larger than 1 MB, the transferred image size is reduced by at least 50% in at least 90% of successful avatar updates.
