# Data Model — Replace Sidebar with Navigation Bar

This feature is primarily UI/layout. No backend data model changes are required.

## Entities

### NavigationItem (UI)

Represents a primary navigation destination rendered in the lower navigation area.

- Fields:
  - `title`: string (user-visible label)
  - `path`: string (route destination)
  - `icon`: icon identifier (optional, UI-only)
  - `isActive(pathname)`: rule for active-state
- Relationships:
  - Derived from the existing sidebar configuration (single source of truth).

### UserPreference (UI)

Represents persisted UI preferences affecting presentation.

- Fields:
  - `theme`: `light | dark | system` (already exists conceptually)
  - `locale`: string (e.g., `en`, `zh`) (new UI preference)
- Persistence:
  - Stored client-side (e.g., localStorage) to match existing theme behavior.

## State Transitions (UI)

- `SearchDialog`: closed → open → closed
- `ChatDialog`: closed → open → closed
- `MobileMenuDrawer`: closed → open → closed

All overlays must support Escape-to-close and restore focus to the trigger.
