# Feature Specification: Resource Cover Image Submission

**Feature Branch**: `011-resource-cover-image`
**Created**: 2026-02-06
**Status**: Draft
**Input**: User description: "As a frontend user, I want to add a cover image when I submit a new resource so that my resource has a consistent UI with the resources page in both grid view and list view, including badges (pending/approved/rejected)."
**Constitution**: `.specify/memory/constitution.md`

## Clarifications

### Session 2026-02-06

- Q: For new resource submission, what cover image input types should be allowed? → A: Show both upload and external image URL inputs, but they are mutually exclusive in effect (setting one replaces/clears the other).
- Q: Where should “pending/approved/rejected” resources be visible in the grid/list views? → A: A logged-in user can see their own submissions with all statuses; users do not see other users’ submissions in these listings.
- Q: Should approved items display an “approved” badge in grid/list cards? → A: Yes—show badges for all three statuses: pending, approved, rejected.
- Q: When a submission is approved and becomes a published Resource, what should happen to the submission’s cover image? → A: Automatically carry it over to the published Resource.
- Q: Should submission cover image constraints match the existing Admin resource image editing constraints? → A: Yes—match the existing constraints: max file size 5MB; supported upload formats JPEG/PNG/GIF/WebP; minimum dimensions 32x32; maximum input dimension 4096x4096; external image URLs must be valid http/https URLs with a host.

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

### User Story 1 - Add a cover image on submission (Priority: P1)

As a signed-in user submitting a new resource, I can optionally choose a cover image during submission so the resource is visually consistent with other resources when shown in listings.

**Why this priority**: A cover image is the primary visual element of a resource card; adding it at submission time prevents incomplete-looking cards and reduces follow-up edits.

**Independent Test**: Can be fully tested by submitting a new resource with a cover image and verifying the created submission displays that image in the “My submissions” listing card.

**Acceptance Scenarios**:

1. **Given** I am signed in and am submitting a new resource, **When** I provide a valid cover image (either by uploading an image file or by providing an external image URL) and submit, **Then** the submission is created with that cover image associated to it.
2. **Given** I am signed in and am submitting a new resource, **When** I do not select a cover image and submit, **Then** the submission is created successfully and uses the standard fallback visual treatment used for items without a cover image.
3. **Given** I am signed in and am submitting a new resource, **When** I select an unsupported image type or an image that exceeds the allowed size limit, **Then** I am shown a clear validation message at the relevant input and the submission does not complete until the issue is resolved.
4. **Given** I have already provided an uploaded cover image, **When** I provide an external image URL instead (or vice versa), **Then** only the most recently provided cover image source is used.

---

### User Story 2 - Resource cards stay consistent in grid and list views (Priority: P2)

As a signed-in user viewing my submissions, I see submission cards rendered with the same layout rules as Resources cards in both grid view and list view, including a cover image area and status badge.

**Why this priority**: The same resource can appear in multiple views; inconsistent visuals (missing image slot, badge placement differences) harms trust and scanability.

**Independent Test**: Can be tested by creating two submissions (one with cover image, one without), then verifying both display correctly in grid and list views without layout breakage.

**Acceptance Scenarios**:

1. **Given** submissions are shown in grid view, **When** a submission has a cover image, **Then** the card displays the cover image in the standard cover image area.
2. **Given** submissions are shown in list view, **When** a submission does not have a cover image, **Then** the card still reserves the cover image area and displays the standard fallback visual treatment.
3. **Given** a submission has a cover image, **When** the image cannot be loaded for any reason, **Then** the standard fallback visual treatment is displayed and the rest of the card content remains usable.

---

### User Story 3 - Status badges appear consistently (Priority: P3)

As a signed-in user viewing my submissions, I can quickly identify whether a submission is pending, approved, or rejected via a badge shown consistently across grid and list cards.

**Why this priority**: Status is key context for how users should interpret a resource (e.g., pending review vs. approved content).

**Independent Test**: Can be tested by viewing submissions with each status and verifying the correct badge label appears in both grid and list views.

**Acceptance Scenarios**:

1. **Given** a submission has status “pending”, **When** it is displayed in grid view or list view, **Then** the “pending” badge is visible and matches the standard badge style.
2. **Given** a submission has status “approved”, **When** it is displayed in grid view or list view, **Then** the “approved” badge is visible and matches the standard badge style.
3. **Given** a submission has status “rejected”, **When** it is displayed in grid view or list view, **Then** the “rejected” badge is visible and matches the standard badge style.
4. **Given** I am signed in, **When** I browse my submissions in grid view or list view, **Then** I can see my own submissions (including pending/approved/rejected) and I do not see other users’ submissions.
5. **Given** I have a submission with a cover image, **When** that submission is approved and becomes a published Resource, **Then** the published Resource uses the same cover image (and the cover image remains mutually exclusive: uploaded image OR external image URL).

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- User selects an unsupported image type or a corrupted image file.
- User selects an image that exceeds the allowed size limit.
- Network interruption during submission after selecting a cover image.
- Cover image fails to load in listings (broken image reference) and must fall back gracefully.
- Very wide/tall images that could cause awkward cropping or aspect ratio issues.
- Signed-out user browsing listings (should not see any user submissions if submissions are user-scoped).
- User uploads an image smaller than the minimum allowed dimensions.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow a signed-in user to provide a cover image during new resource submission by either uploading an image file or providing an external image URL.
- **FR-001a**: The cover image source MUST be mutually exclusive: a submission MUST NOT have both an uploaded cover image and an external cover image URL at the same time.
- **FR-001b**: If a user sets one cover image source while the other is present, the system MUST replace the previous source so only one remains.
- **FR-002**: System MUST validate the selected cover image before submission completes.
- **FR-002a**: For uploaded cover images, the system MUST enforce: maximum file size 5MB; supported formats JPEG/PNG/GIF/WebP; minimum dimensions 32x32; maximum input dimension 4096x4096.
- **FR-002b**: For external cover image URLs, the system MUST enforce: scheme is http or https; URL includes a valid host; invalid URLs are rejected with a clear validation message.
- **FR-003**: System MUST allow resource submission to succeed when no cover image is provided.
- **FR-004**: System MUST display a user’s submissions in a consistent card layout in both grid and list views, matching the Resources page layout conventions, including a cover image area.
- **FR-005**: System MUST display a fallback visual treatment in the cover image area when a submission has no cover image.
- **FR-006**: System MUST display a status badge for submissions in both grid and list views, with supported statuses: pending, approved, rejected.
- **FR-007**: System MUST ensure the badge shown matches the submission’s current status.
- **FR-008**: System MUST fail gracefully when a cover image cannot be loaded, using the same fallback visual treatment as “no cover image”, and MUST NOT show a broken-image UI.

#### Definition: Fallback Visual Treatment

The “fallback visual treatment” for missing or broken cover images MUST match the existing Resources page behavior for resources with no cover image (i.e., the same reserved image area + placeholder UI used by Resources cards).
- **FR-009**: System MUST only display a user’s own submissions in grid/list listings when the user is signed in; users MUST NOT see other users’ submissions in these listings.
- **FR-010**: When a submission is approved and a published Resource is created, the published Resource MUST inherit the submission’s cover image (uploaded image OR external image URL).

#### Assumptions

- Cover image is optional for submission (recommended but not required).
- Submission cover image validation matches existing Admin resource image editing validation.

#### Out of Scope

- Adding multiple images per resource.
- Advanced image editing features (cropping, filters, focal point selection).
- Changing the set of moderation statuses beyond pending/approved/rejected.
- Redesigning the overall resources page layout beyond ensuring consistency for the cover image area and status badge.

### Key Entities *(include if feature involves data)*

- **Resource**: A user-submitted item shown in resource listings; includes a title/summary, a moderation status (pending/approved/rejected), and an optional cover image.
- **Cover Image**: An image associated with a Resource used as the primary visual in grid/list cards; has basic attributes such as format, size, and display-friendly dimensions.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 90% of attempted resource submissions with a valid cover image complete successfully on the first attempt.
- **SC-002**: Users can submit a resource with a cover image in under 3 minutes end-to-end in typical conditions.
- **SC-003**: In a basic QA sample of 50 submissions (mix of with/without cover images), 0 submissions display broken image UI in grid or list views.
- **SC-004**: In usability testing, at least 90% of participants correctly identify a submission’s status (pending/approved/rejected) from the badge in both grid and list views.
