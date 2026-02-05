# Feature Specification: Resources View Redesign

**Feature Branch**: `010-resources-view-redesign`
**Created**: 2026-02-04
**Status**: Draft
**Input**: User description: "Redesign the resources view page: Grid view supports resource image via upload or external link; category badge placed next to created date; replace View Details with number of likes; align CardHeader and CardContent horizontally. List view renames Actions column to Trends showing likes; URL column becomes clickable."
**Constitution**: `.specify/memory/constitution.md`

## Clarifications

### Session 2026-02-04

- Q: If both an uploaded image and an external image URL are provided, what wins? → A: Mutually exclusive: a resource can have either an uploaded image or an external image URL (not both).
- Q: In List view, how should the URL link be displayed? → A: Display the hostname as the clickable label.
- Q: Should likes be interactive from Grid/List views? → A: Display-only likes count (not clickable).

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

### User Story 1 - Browse resources in a visual grid (Priority: P1)

As a user browsing the resources library, I want each resource card in Grid view to show a representative image and key metadata (category, date, likes) so I can quickly scan and choose what to open.

**Why this priority**: Grid view is the primary discovery experience; improving scan-ability and surfacing popularity (likes) directly impacts engagement.

**Independent Test**: Can be fully tested by opening the Resources page, switching to Grid view, and verifying that cards render the new visual/media layout and display likes and metadata correctly for a mix of resources.

**Acceptance Scenarios**:

1. **Given** a resource has an image set, **When** I view the Resources page in Grid view, **Then** I see that image displayed on the card instead of a generic icon.
2. **Given** a resource has no image set, **When** I view the Resources page in Grid view, **Then** I see a consistent fallback visual that does not break the card layout.
3. **Given** a resource has a category and a created date, **When** I view the card metadata, **Then** the category badge is displayed next to the created date.
4. **Given** a resource has a like count, **When** I view the card footer/summary area, **Then** I see the number of likes (and I do not see a “View details” call-to-action in that area).
5. **Given** I am viewing likes in Grid view, **When** I click/tap on the likes display, **Then** no like/unlike action occurs (display-only).
6. **Given** I view multiple cards on different screen sizes, **When** I scroll the grid, **Then** card content remains horizontally aligned (media and text aligned side-by-side) without overlapping or truncating critical information.

---

### User Story 2 - Compare resources in a sortable list (Priority: P2)

As a user comparing resources, I want List view to show a “Trends” column with like counts and a clickable URL so I can quickly judge popularity and open destinations.

**Why this priority**: List view is optimized for comparison; a dedicated popularity signal and direct link improve efficiency and reduce unnecessary clicks.

**Independent Test**: Can be fully tested by switching to List view and confirming the column label/value changes and link behavior without needing to use Grid view.

**Acceptance Scenarios**:

1. **Given** I am in List view, **When** I look at the rightmost column header, **Then** it is labeled “Trends” and shows the resource’s like count for each row.
2. **Given** I am in List view, **When** I click/tap on a Trends (likes) value, **Then** no like/unlike action occurs (display-only).
3. **Given** a resource has a destination URL, **When** I view the URL column, **Then** I see a clickable link labeled with the destination hostname.
4. **Given** a resource has a destination URL, **When** I click the URL link, **Then** it opens the destination in a new tab/window.
5. **Given** a resource has no destination URL or it is invalid, **When** I view the URL column, **Then** the UI indicates the URL is unavailable and does not present a broken link.
6. **Given** a resource has an image set, **When** I view the Resources page in List view, **Then** I see a small thumbnail next to the resource title to help recognition.
7. **Given** a resource has no image set or the image cannot be displayed, **When** I view the Resources page in List view, **Then** I see a consistent fallback thumbnail and the row layout remains aligned.
8. **Given** the resources list is loading, **When** the loading state is displayed in List view, **Then** the loading placeholders resemble the final list layout to minimize distracting layout shifts.

---

### User Story 3 - Provide an image for a resource (Priority: P3)

As an admin who creates or edits resources, I want to provide a representative image either by uploading one or by pasting an external image link so the resource cards look trustworthy and recognizable.

**Why this priority**: This enables the Grid view visual redesign to stay high-quality over time and reduces reliance on generic visuals.

**Independent Test**: Can be tested independently by editing a single resource to set an image via upload or external link and verifying it appears in Grid view.

**Acceptance Scenarios**:

1. **Given** I am an admin user who can manage resources, **When** I upload an image for a resource, **Then** the resource shows that image in Grid view after saving.
2. **Given** I am an admin user who can manage resources, **When** I provide an external image link for a resource, **Then** the resource shows that image in Grid view after saving.
3. **Given** I provide an image that does not meet allowed constraints (type/size) or an invalid external link, **When** I attempt to save, **Then** I get a clear validation message and the image is not applied.
4. **Given** a resource already has an uploaded image, **When** I set an external image URL, **Then** the resource uses the external image and no longer has an uploaded image associated.
5. **Given** a resource already has an external image URL, **When** I upload an image, **Then** the resource uses the uploaded image and no longer has an external image URL associated.
6. **Given** I am setting a resource image, **When** I view the image preview in the admin flow, **Then** the preview reflects how the image will appear in the primary browsing views (Grid view and list thumbnails).
7. **Given** I provide an image with extreme proportions (e.g., a logo-like image that is very wide or very tall), **When** I preview and save it, **Then** the image remains readable/recognizable within the standard cover frame.
8. **Given** I am choosing an image to upload, **When** I view the image controls, **Then** I see clear, localized guidance about recommended cover proportions and basic constraints (supported formats and maximum file size).
9. **Given** I am editing a resource and content is still loading, **When** the admin UI shows loading placeholders, **Then** the placeholders resemble the final form layout to reduce perceived jank.

---

### Edge Cases

- Image fails to load (broken external link, unavailable host) after it was previously saved.
- Image is extremely large or has unusual dimensions.
- Resource has no category, no description, or a like count of 0.
- Destination URL is missing, malformed, or uses an unsafe/unsupported scheme.
- Mixed content concerns (e.g., external image link that would be blocked by common browser security settings).

## Learnings & Experience Notes *(non-technical)*

This section captures what we learned while iterating on the UX, focusing on user experience and product behavior (not implementation details).

- **Creators need clear guidance to succeed**: When admins set cover images, they benefit from explicit guidance on *what “good” looks like* (recommended aspect ratio, practical size guidance, supported formats, and maximum upload size). Without this, image quality varies and support questions increase.
- **Preview must match reality**: If the admin preview renders differently than the card users see in the grid/list, admins will unintentionally ship cropped or awkward covers. The preview should reflect the same visual constraints as the browsing views.
- **Cropping is acceptable until it isn’t**: Most photos/illustrations look fine when cropped to a consistent frame, but logo-like or extreme-ratio images (very wide/tall) become unreadable when cropped. The product should keep the layout consistent *without destroying the content*.
- **Consistency beats perfection**: A fixed frame for covers creates a calm, scannable grid; the goal is a consistent browsing rhythm even when sources vary.
- **List view scanning improves with a thumbnail**: In list mode, a small image next to the title helps recognition and reduces time-to-click, especially for repeated domains and similar titles.
- **Loading states are part of the UX**: Skeletons should roughly match final layout in both grid and list modes to reduce perceived jank and layout shift.
- **Localization is not optional UI polish**: Helper text and hints in the admin flow should be localized so all admins can reliably set images.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support associating an optional representative image with each resource.
- **FR-002**: Admin users MUST be able to set a resource image by either uploading an image file or providing an external image URL.
- **FR-002a**: A resource image MUST be mutually exclusive: a resource MUST NOT have both an uploaded image and an external image URL at the same time.
- **FR-002b**: If a user sets one image source while the other is present, the system MUST replace the previous source so only one remains.
- **FR-003**: System MUST validate resource images and reject inputs that do not meet defined constraints (at minimum: supported image formats, maximum size, and valid URL syntax for external links).
- **FR-004**: When a resource has an associated image, the Resources Grid view MUST display that image on the resource card.
- **FR-005**: When a resource does not have an associated image or the image cannot be displayed, the Grid view MUST display a consistent fallback visual and MUST NOT break card layout.
- **FR-006**: In Grid view, the category badge MUST be displayed adjacent to the created date for each resource card.
- **FR-007**: In Grid view, the resource card MUST display the resource’s like count and MUST NOT show a “View details” call-to-action in that same summary area.
- **FR-007a**: Like counts shown in Grid view and List view (Trends) MUST be display-only (no like/unlike action from these views).
- **FR-008**: In Grid view, the card’s media area and primary text area MUST be horizontally aligned (side-by-side) in the default layout and remain readable across common screen sizes.
- **FR-009**: In List view, the column previously labeled “Actions” MUST be labeled “Trends” and MUST display the resource’s like count for each row.
- **FR-010**: In List view, the destination URL column MUST render as a clickable link when a valid URL is present.
- **FR-010a**: The link label MUST be the destination hostname (not the full URL).
- **FR-010b**: Clicking the link MUST open the destination without navigating away from the resources list.
- **FR-011**: If a destination URL is missing or invalid, the List view MUST NOT present a clickable link and MUST provide a clear non-interactive indicator (e.g., placeholder text).

#### Experience-Derived Requirements

- **FR-012**: Admin resource image controls MUST include clear, localized guidance covering: recommended cover image aspect ratio, recommended image size guidance, supported image formats, and maximum upload size.
- **FR-013**: The admin image preview MUST reflect the same visual framing used in the primary browsing experiences (Grid view and any list thumbnails), so creators can predict how the cover will appear.
- **FR-014**: The browsing UI MUST present resource cover images in a consistent frame without distortion.
- **FR-014a**: For images where cropping would likely make the content unreadable (e.g., logo-like images with extreme aspect ratios), the UI MUST prefer a non-destructive fit within the frame (e.g., letterboxing) rather than aggressive cropping.
- **FR-015**: In List view, each resource row SHOULD display a small thumbnail when an image is available, and MUST gracefully fall back when the image is missing or fails to load.
- **FR-016**: Loading skeletons for Resources Grid and List views MUST roughly match the final layouts they represent (including image placeholders where images will appear) to minimize layout shift.

#### Assumptions

- “Admin users” are the same users who can currently create/edit resources (superuser/admin access).
- “Likes” already exist as a countable signal per resource; this feature only changes how the count is displayed in Grid/List views.

#### Out of Scope

- Changing how likes are created/removed or introducing new ranking algorithms.
- Bulk image import for existing resources (beyond normal edit/update flows).
- Redesigning the resource detail page (except where necessary to support image management).

### Key Entities *(include if feature involves data)*

- **Resource**: A curated item with title, description, destination URL, category, created date, like count, and an optional representative image.
- **Resource Image**: An optional representation for a resource, sourced either from an uploaded image OR an external image URL (mutually exclusive), with basic metadata (e.g., source type and validation state).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can identify a relevant resource from the first page of results in under 60 seconds in Grid view (measured in usability testing).
- **SC-002**: At least 90% of resources displayed in Grid view show a representative image or an intentional fallback visual with no broken layout.
- **SC-003**: In List view, users can open a destination from a list row in 1 click (measured by interaction count).
- **SC-004**: 95% of validation errors for resource images (invalid link/unsupported file) present a clear message that allows a user to correct the input on the next attempt.
