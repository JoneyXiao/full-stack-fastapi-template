# OpenAPI Patch Notes (proposed): Resources/Submissions use Categories

This feature changes the classification field from `type: string` to `category_id: uuid` (and optionally returns `category` details).

## Compatibility strategy (recommended)

To minimize breaking API changes during rollout:

- Requests SHOULD accept `category_id` (preferred) and MAY accept legacy `type` as a temporary compatibility input.
- Responses SHOULD include `category_id` as the primary field and MAY include legacy `type` (deprecated) until a follow-up contract/migration removes it.
- Filtering SHOULD support `category_id` (preferred) and MAY support `type` as a backwards-compatible alias.

Legacy mapping rule (recommended):

- If a request provides `type`, resolve it by case-insensitive match against `Category.name`.
- If no matching category exists, reject with `400` (do not auto-create categories from non-admin requests).

## Resources

- List resources
  - Prefer query param `category_id`
  - Temporarily allow legacy query param `type` as an alias that resolves to a category
- Resource schema
  - Add `category_id: uuid` (primary)
  - Keep `type: string` temporarily as deprecated (optional)
  - Optional: include `category_name` (denormalized) or `category: CategoryPublic`

## Submissions

- Create submission
  - Prefer request field `category_id`
  - Temporarily allow legacy request field `type` and map it to a category
- Submission schema
  - Add `category_id: uuid` (primary)
  - Keep `type: string` temporarily as deprecated (optional)

## Migration compatibility

- Recommended: expand/contract rollout where the API temporarily accepts both `type` and `category_id` (and may temporarily return both), then removes `type` in a later breaking change.
