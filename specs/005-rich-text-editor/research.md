# Research: Rich Text Editor for Submission Descriptions

**Feature**: [spec.md](spec.md)
**Date**: 2026-01-23

## Decisions

### 1) Use a Markdown editor component (GitHub-like) instead of a WYSIWYG HTML editor

- **Decision**: Implement the submission description editor as a Markdown editor with toolbar + preview (GitHub-style “Write / Preview”), storing Markdown text.
- **Rationale**:
  - Matches the product request (“GitHub comment style”).
  - Keeps storage format simple and portable (plain text Markdown).
  - Avoids storing HTML, reducing XSS risk and content drift.
- **Alternatives considered**:
  - WYSIWYG HTML editor (Tiptap/ProseMirror): richer editing, but increases complexity and security surface, and conflicts with “no raw HTML rendered” decision.

### 2) Editor library choice

- **Decision**: Use `@uiw/react-md-editor` for the write/preview experience and toolbar.
- **Rationale**:
  - Provides an integrated Markdown editor with preview and extensible toolbar commands.
  - Fits React + TypeScript stack.
- **Alternatives considered**:
  - Build custom textarea + toolbar + preview: higher maintenance burden.
  - MDXEditor / other markdown editors: viable, but more moving parts than needed for this feature.

### 3) Rendering Markdown safely (no raw HTML)

- **Decision**: Render submission descriptions with `react-markdown` + `remark-gfm`, with raw HTML not rendered.
- **Rationale**:
  - `react-markdown` supports `skipHtml` to ignore HTML in user content.
  - `react-markdown` provides URL sanitization helpers (`defaultUrlTransform`) for safe link/image URL handling.
  - `remark-gfm` enables GitHub Flavored Markdown features (tables, task lists, autolinks, strikethrough).
- **Alternatives considered**:
  - Render Markdown by converting to HTML and then sanitizing with DOMPurify: workable, but increases risk of subtle sanitizer misconfigurations.
  - Allow raw HTML rendering: explicitly rejected in clarifications.

### 4) Link behavior

- **Decision**: Rendered links open in a new tab/window.
- **Rationale**: Prevents users from losing context; common expectation for user-generated content.
- **Alternatives considered**: Same-tab navigation.

### 5) Description length

- **Decision**: Enforce maximum description length of 10,000 characters.
- **Rationale**: Allows meaningful formatting plus URLs/images while remaining bounded.
- **Alternatives considered**: 1,024 or 5,000 character limits.

## Notes / Best-practice reminders

- Disallow raw HTML rendering (treat HTML tags as plain text / ignore).
- Sanitize URLs (disallow `javascript:` and other unsafe protocols).
- Ensure consistent rendering wherever the description appears (admin list + detail pages).
