# Quickstart: AI Resource Landing Page

**Feature**: `002-ai-landing-page`

This quickstart explains how to run and verify the landing page (search + chat) locally.

## Prerequisites

- Docker + Docker Compose
- Node.js + npm (for local frontend dev outside Docker, optional)

## Run locally (Docker Compose)

From repo root:

- Start stack: `docker compose up --build`
- Open frontend: use the URL documented in the repo (typically via Traefik proxy)

## Verify: Landing page is at `/`

- Visit `/` and confirm you see:
  - Hero content + primary CTAs
  - Keyword search input
  - Dark mode toggle

## Verify: Browse & Contribute CTAs

- Click **Browse** and confirm it navigates to `/resources`.
- Click **Contribute** and confirm it navigates to `/submissions/new`.
  - If you are signed out and the app requires auth for submissions, confirm you are prompted to sign in and then returned to the submission page.

## Verify: Keyword search

- Enter a query that matches existing resource titles/descriptions.
- Confirm results show title + short summary and that “open” navigates to the resource.
- Enter nonsense input and confirm the friendly empty state appears.

## Verify: Chat gating (signed-in only)

- While signed out, try to use chat and confirm the UI prompts to sign in.
- Sign in, then open chat and send a message.

## Verify: Chat recommendations

- Ask for a topic that is likely in the catalog (e.g., “prompt engineering basics”).
- Confirm recommendations are real resources and can be opened.

## Optional: Enable LLM-backed responses

The backend chat endpoint is designed to use an external LLM provider via environment variables.

- Set `OPENAI_API_KEY` (or the chosen provider key) in the backend environment
- Restart the backend

If the key is not configured, the chat endpoint should return a clear “unavailable” error and the UI should fall back to keyword search.

## Verify: Accessibility, motion, and contrast (manual)

- Keyboard-only:
  - Navigate through primary CTAs, search input, results, and chat controls using `Tab`/`Shift+Tab`.
  - Confirm a visible focus indicator is always present and is not clipped.
  - Verify Enter key submits search and chat forms.
- Reduced motion:
  - Enable "Reduce motion" in OS accessibility settings.
  - Reload the page and confirm decorative motion/transitions are reduced/disabled (loading indicators are allowed).
- Contrast:
  - Spot-check readability in light + dark mode.
  - Confirm borders and focus rings remain clearly visible in dark mode.
  - Confirm status states (loading/error/empty) are not communicated by color alone (text + icon/structure).
- Mobile responsiveness:
  - Test at 320px, 768px, and 1024px viewport widths.
  - Confirm no horizontal scrolling at 320px.
  - Confirm all primary actions (search, chat, browse) are reachable without scrolling horizontally.

## Verify: Performance targets

- **Search**: Results should appear within 2 seconds of submission.
- **Chat**: First response (or loading indicator) should appear within 250ms; full response within 5 seconds under normal conditions.
- **Page load**: Hero content should be visible within 3 seconds on a reasonable connection.

To measure:
```bash
# In browser DevTools > Network tab, check:
# - Time to first byte (TTFB) for landing page
# - Time for /api/v1/resources/ response (search)
# - Time for /api/v1/landing/chat/recommendations response (chat)
```

## Verify: Save chat transcript (signed-in)

- After a chat session, use “save chat”
- Confirm it appears in your saved transcripts list
- Confirm you can open and delete a saved transcript

## Verify: Transcript privacy (manual)

- Confirm transcript contents are not printed verbatim in frontend console logs.
