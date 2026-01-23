# Quickstart: Rich Text Editor for Submission Descriptions

**Feature**: [spec.md](spec.md)

## Prerequisites

- Repo bootstrapped (see root README / development.md)
- Local stack running (recommended): `docker compose watch`

## Manual Smoke Test

1. Sign in.
2. Navigate to the new submission page (route: `/submissions/new`).
3. In the description editor:
   - Enter Markdown with **bold**, *italics*, and a list.
   - Add a link.
   - Add an image reference using Markdown: `![alt](https://example.com/image.png)`.
4. Switch to preview and confirm the formatted output looks correct.
5. Submit the resource.
6. Verify the saved submission:
   - The description renders as formatted Markdown.
   - Raw HTML in the description (e.g., `<script>alert(1)</script>`) is not rendered.
   - Links open in a new tab/window.
   - In the admin submissions list, the description is rendered (not shown as raw Markdown).

## Validation Notes

- Description is optional; submission should succeed with an empty description.
- Description max length is 10,000 characters; UI shows a character counter below the editor.
- When exceeding the limit, the submit button is disabled and an error message is displayed.
- Links using unsafe protocols (e.g., `javascript:`) are rendered as plain text, not clickable links.
- Broken images show a fallback message instead of a broken image icon.
