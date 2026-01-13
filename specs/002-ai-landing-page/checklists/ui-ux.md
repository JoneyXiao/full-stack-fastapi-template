# UI/UX Pre-Delivery Checklist: AI Resource Landing Page

**Feature**: [spec.md](../spec.md)
**Created**: 2026-01-13

## Visual Quality

- [x] No emoji used as UI icons (SVG icons only)
- [x] Icons come from one consistent set (style/weight/size consistent)
- [x] Hover states do not cause layout shift
- [x] Text contrast meets $\ge 4.5:1$ for normal text
- [x] Dark mode contrast and borders are verified
- [x] Decorative effects do not reduce readability (borders remain visible)

## Interaction

- [x] All clickable elements show pointer cursor
- [x] Hover feedback is present on all interactive elements
- [x] Focus states are visible for keyboard navigation
- [x] Search and chat show loading feedback quickly and consistently
- [x] Error states are friendly and include a retry path

## Motion

- [x] No parallax / scroll-jacking
- [x] No continuous decorative animation
- [x] Reduced motion preference is respected
- [x] Animations are limited (1–2 key elements per view)

## Responsive

- [x] Usable at 320px width (no horizontal scroll)
- [x] Usable at 768px and 1024px without cramped layout
- [x] Header actions remain reachable on mobile
- [x] Search and chat entry points remain prominent at all sizes

## Accessibility

- [x] Inputs have labels and clear error messages
- [x] Color is not the only indicator for status
- [x] Keyboard-only user can complete primary flows (search, open result, open chat, send message, restart chat)
