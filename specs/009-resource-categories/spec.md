# Feature Specification: Resource Categories Management

**Feature Branch**: `009-resource-categories`
**Created**: 2026-01-31
**Status**: Draft
**Input**: User description: "As an administrator, I want to manage (create, read, update, delete) resource categories (rename Resource type to Categories) in the database, with safeguards to prevent the deletion of categories currently in use."
**Constitution**: `.specify/memory/constitution.md`

## Clarifications

### Session 2026-01-31

- Q: For the delete safeguard, what counts as “category currently in use”? → A: In use means referenced by at least one resource OR any submission (including pending).
- Q: Should category names be localized? → A: No—category names are not localized.
- Q: Are categories meant to be a DB-driven dynamic list, or just a UI rename of the existing fixed “type” list? → A: Categories are DB-driven (dynamic list); resources/submissions reference a category record.

### Session 2026-02-01

- Q: How should administrators manage categories: via an admin UI screen, API-only, or both? → A: Provide an admin UI screen in the web app to CRUD categories.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse categories and usage (Priority: P1)

As an administrator, I can view a list of all resource categories and understand which categories are currently in use, so I can safely manage them without breaking existing resources.

**Why this priority**: Safe visibility is the prerequisite for any category maintenance and prevents accidental disruption.

**Independent Test**: Can be fully tested by logging in as an administrator, navigating to the Categories admin screen, and verifying the list displays categories and their “in use” status.

**Acceptance Scenarios**:

1. **Given** at least one category exists, **When** an administrator views the categories list, **Then** the system shows all categories with their names and an indicator of whether each category is in use.
2. **Given** no categories exist, **When** an administrator views the categories list, **Then** the system shows an empty state with guidance to create a category.
3. **Given** a category is renamed or deleted, **When** the administrator returns to the categories list, **Then** the list reflects the change.

---

### User Story 2 - Create and rename categories (Priority: P2)

As an administrator, I can create new categories and rename existing categories, so the category set stays aligned with the content strategy and user expectations.

**Why this priority**: Category creation/rename is the core maintenance workflow that keeps the taxonomy current.

**Independent Test**: Can be fully tested by creating a new category and renaming an existing category from the Categories admin screen, then verifying the updated names appear anywhere categories are shown.

**Acceptance Scenarios**:

1. **Given** an administrator provides a new category name that is not already used, **When** they create the category, **Then** the category becomes available for use throughout the product.
2. **Given** a category exists and the administrator provides a new unique name, **When** they rename the category, **Then** existing resources previously assigned to the category now display the new name.
3. **Given** the administrator attempts to create or rename a category to a name that conflicts with an existing category, **When** they submit the change, **Then** the system prevents the change and explains the conflict.

---

### User Story 3 - Delete categories safely (Priority: P3)

As an administrator, I can delete categories that are not in use, and I am prevented from deleting categories that are currently in use, so existing resources remain valid and discoverable.

**Why this priority**: Deletion is the highest-risk operation; safeguards prevent broken or inconsistent content.

**Independent Test**: Can be fully tested from the Categories admin screen by attempting to delete both an unused category and an in-use category, confirming the unused one is removed and the in-use one is blocked.

**Acceptance Scenarios**:

1. **Given** a category has zero resources using it, **When** an administrator deletes the category, **Then** the category is removed and no longer selectable.
2. **Given** a category has one or more resources or submissions using it, **When** an administrator attempts to delete the category, **Then** the system blocks deletion and clearly states that the category is in use.
3. **Given** a category becomes in use between viewing the list and attempting deletion, **When** the administrator confirms deletion, **Then** the system blocks deletion and explains why.

### Edge Cases

- Attempting to create a category with a blank name or a name that is only whitespace.
- Attempting to create or rename a category to a duplicate name (including case-only differences).
- Renaming a category while a different administrator is also editing categories.
- Deleting a category immediately after a resource was assigned to it (two actions happening nearly at the same time).
- Deleting a category that is referenced by a pending submission.
- If audit/history records are introduced later, they should remain readable; this feature does not implement soft-delete or historical snapshots for categories.
- Changing application language does not change category names.
- User-facing terminology updates: areas previously labeled “Resource type” should not remain partially updated.
- Non-admin users cannot access the Categories admin screen.

### Assumptions

- Only authenticated administrators can create, rename, or delete categories.
- Each resource is assigned exactly one category at any given time.
- Categories are visible anywhere users select or filter resources by category.
- Category names are stored and displayed as-is across all locales.
- Categories are managed as records in the database (not a fixed, hard-coded list).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow administrators to view a list of all categories.
- **FR-001a**: The system MUST provide an in-app Categories admin screen for administrators.
- **FR-002**: The system MUST show whether each category is currently in use by at least one resource or submission (including pending).
- **FR-003**: The system MUST allow administrators to create a new category with a name.
- **FR-004**: The system MUST require category names to be unique (treating case-only differences as conflicts).
- **FR-005**: The system MUST allow administrators to rename an existing category.
- **FR-006**: When a category is renamed, the system MUST continue to associate existing resources with that category and display the updated name.
- **FR-006a**: Resources and submissions MUST reference categories from the database-managed category list.
- **FR-007**: The system MUST allow administrators to delete a category only when it is not in use.
- **FR-008**: The system MUST prevent deletion of any category that is currently in use by one or more resources or submissions (including pending) and MUST provide a clear, user-friendly explanation.
- **FR-009**: The system MUST use the term “Categories” (instead of “Resource type”) in user-facing labels and navigation wherever this concept is displayed.
- **FR-009a**: The system MUST not require localized per-language category names; category names display identically across locales.
- **FR-010**: The system MUST ensure category data changes are persistent and remain consistent across sessions.

### Key Entities *(include if feature involves data)*

- **Category**: A named classification administrators manage; used to organize resources and support filtering/browsing.
- **Resource**: A user-visible item in the hub (e.g., link/article/tool) that is assigned exactly one category from the database-managed category list.
- **Submission**: A user-submitted candidate resource that is assigned exactly one category from the database-managed category list and may be pending moderation.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An administrator can create a new category and see it available for selection within 1 minute.
- **SC-002**: An administrator can rename a category and verify all existing resources show the new name within 2 minutes.
- **SC-003**: 100% of attempts to delete an in-use category are blocked with a clear explanation.
- **SC-004**: In a basic usability check, at least 90% of administrators can successfully complete “create category”, “rename category”, and “delete unused category” without external help.
