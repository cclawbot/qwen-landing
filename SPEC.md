# Feature: Scroll Progress Indicator

## Description
Add a visual progress bar at the top of the page that indicates how far the user has scrolled down the landing page.

## Business Requirement
Enhance user experience by providing visual feedback on page scroll position, helping users understand their progress through the long landing page.

## Business Goal
Improve user engagement and navigation on the content-rich landing page.

## In-Scope
- Fixed position progress bar at top of viewport
- Shows percentage of page scrolled (0-100%)
- Smooth width transition as user scrolls
- Resets when page is at top
- Thin, non-intrusive design

## Out-of-Scope
- Reading time estimate
- Chapter/section markers
- Click to jump to section

## Technical Details
- "use client" directive for scroll event handling
- useState for scroll percentage
- useEffect for scroll event listener
- Fixed position at top with z-index above other content
- Gradient color matching brand (purple)
- Height: 3px for subtle appearance

## Implementation Plan
1. Create ScrollProgress component in /src/components/ScrollProgress.tsx
2. Add to page.tsx at the top of the main content wrapper
3. Test scroll behavior

## Acceptance Criteria
- [ ] Progress bar appears at top of viewport
- [ ] Width updates smoothly as user scrolls
- [ ] Shows 0% at top, 100% at bottom
- [ ] Thin, non-intrusive appearance
- [ ] Matches brand purple color scheme
- [ ] Lint passes
- [ ] Type-check passes
- [ ] Build passes
