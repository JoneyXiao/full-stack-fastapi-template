# Research: AI Resource Landing Page

**Feature**: `002-ai-landing-page`
**Date**: 2026-01-13

This phase resolves technical decisions needed for design/contracts.

## Decisions

### 1) Landing page routing

- Decision: Replace the default home page at `/` with the new landing page.
- Rationale: A single canonical entry point matches user expectations for “landing page” and simplifies navigation.
- Alternatives considered:
  - Add `/landing` route: avoids changing home, but adds ambiguity and splits traffic
  - Conditional `/` (signed-in vs signed-out): adds complexity and mixed UX expectations

### 2) Keyword search behavior

- Decision: Use partial (substring) matching across resource title + description/summary.
- Rationale: Simple and predictable for MVP; aligns with existing AI Resource Hub search strategy.
- Alternatives considered:
  - Exact match only: too strict, worse discovery
  - Tags-only search: less flexible for newcomers
  - Full PostgreSQL FTS: better relevance, more complexity/migrations

### 3) Chat access control

- Decision: AI chat is available to signed-in users only.
- Rationale: Reduces anonymous abuse surface and aligns with existing authentication patterns.
- Alternatives considered:
  - Anonymous chat: higher spam/abuse and higher operational risk
  - Anonymous trial then sign-in: better funnel, but more policy + rate-limit complexity

### 4) Chat persistence

- Decision: Chat history persistence is available only to signed-in users who explicitly choose to save chats.
- Rationale: Minimizes privacy footprint while enabling user value (“save this conversation”).
- Alternatives considered:
  - Persist all chats by default: increases privacy/compliance burden
  - Session-only always: simplest but does not meet the persistence requirement

### 5) Chat recommendation approach (MVP)

- Decision: Implement a server-side “recommend resources” endpoint that uses existing resource data for grounding.
  - Fetch candidate resources using the existing keyword search logic.
  - Generate a short assistant response that recommends only from those candidates.
- Rationale: Enforces “recommend only real resources” and makes behavior testable.
- Alternatives considered:
  - Free-form LLM without grounding: higher risk of hallucinating non-existent resources
  - Pure rule-based chat (no LLM): simplest, but weaker “AI chat” experience

### 6) LLM provider integration strategy

- Decision: Use an OpenAI-compatible HTTP API via existing `httpx` (no new backend dependency), with API key provided via environment variable.
- Rationale: Keeps dependency footprint minimal while enabling a real conversational response.
- Alternatives considered:
  - Add a dedicated SDK dependency: convenience, but requires dependency updates/lock changes
  - Local LLM (e.g., Ollama): reduces external dependency but requires additional infra not present in this template

Operational behavior (MVP):
- If an LLM API key is not configured, the endpoint returns a clear “chat unavailable” error and the UI falls back to keyword search.

### 7) Dark mode support

- Decision: Support both light and dark modes with a user-facing theme control.
- Rationale: Common expectation for dev/AI audiences; reduces redesign later.
- Alternatives considered:
  - Light-only: simpler but lower user satisfaction
  - Auto-only: simpler UI, but less user control
