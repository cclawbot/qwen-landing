# Feature: Floating CTA Button

## Description
Add a floating CTA button that appears when users scroll down the page, providing persistent access to join the waitlist. This improves conversion by keeping the primary CTA visible throughout the user journey.

## Business Requirement
Increase waitlist signups by providing persistent, easy access to the conversion point regardless of scroll position.

## Business Goal
Improve conversion rate by reducing friction for users who want to join the waitlist after viewing the content.

## In-Scope
- Floating button appears after scrolling 500px
- Smooth fade-in animation
- Positioned bottom-right corner
- Waitlist link (#waitlist anchor)
- Respects user's theme preference (dark/light)
- Hidden on mobile to avoid interfering with navigation

## Out-of-Scope
- Multiple CTA options
- Animated floating motion
- Different button variants

## Technical Details
- Client component ("use client") for scroll detection
- useState for visibility state
- useEffect with scroll event listener
- CSS transition for smooth fade in/out
- Fixed position with z-index
- Inline SVG icon for visual appeal

## Implementation Plan
1. Create FloatingCTA component in /src/components/FloatingCTA.tsx
2. Add to page.tsx at the end of the page (before CookieConsent)
3. Test visibility toggles on scroll
4. Run lint, type-check, build
5. E2E browser test

## Acceptance Criteria
- [ ] Button hidden initially (scrollY < 500)
- [ ] Button appears after scrolling 500px
- [ ] Smooth fade transition
- [ ] Button links to #waitlist
- [ ] Matches theme (dark/light)
- [ ] Hidden on mobile (CSS media query)
- [ ] Lint passes
- [ ] Type-check passes
- [ ] Build passes
- [ ] Browser test confirms visibility toggle
