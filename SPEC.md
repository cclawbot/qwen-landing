# Feature: Back to Top Button

## Description
Add a floating "Back to Top" button that appears when the user scrolls down the page and smoothly scrolls to the top when clicked.

## Business Requirement
Improve user navigation on long landing pages by providing an easy way to return to the top without manual scrolling.

## Business Goal
Enhance user experience and reduce friction for users who want to revisit the hero section or navigation.

## In-Scope
- Floating button fixed to bottom-right corner
- Appears only after scrolling past hero (200px threshold)
- Smooth scroll-to-top animation
- Hover effect for visual feedback
- Dark/light mode compatible
- Mobile-friendly (larger touch target)

## Out-of-Scope
- Keyboard shortcut (not needed for MVP)
- Configurable position (always bottom-right)

## Technical Details
- Client component ("use client") for scroll detection
- useState for visibility state
- useEffect to track scroll position
- CSS transition for fade in/out
- window.scrollTo({ top: 0, behavior: 'smooth' }) for animation

## Implementation Plan
1. Create BackToTop component in /src/components/BackToTop.tsx
2. Add to page.tsx (inside main content, at the end before footer)
3. Test scroll threshold and click behavior

## Acceptance Criteria
- [ ] Button hidden initially (above fold)
- [ ] Button appears after scrolling 200px+
- [ ] Button scrolls smoothly to top when clicked
- [ ] Hover effect provides visual feedback
- [ ] Dark/light mode compatible
- [ ] Lint passes
- [ ] Type-check passes
- [ ] Build passes
