# Feature: Video Demo Section

## Description
Add a video demo section that showcases the QwenResell product in action. Includes a placeholder for product demo with play button overlay, creating an engaging visual that can be replaced with an actual video later.

## Business Requirement
Add visual product demonstration section to help potential customers understand the value proposition quickly through video content.

## Business Goal
Increase conversion by providing visual product walkthrough that demonstrates ease of use and enterprise capabilities.

## In-Scope
- Video demo section with placeholder thumbnail
- Play button overlay that triggers video modal
- Video modal with close button
- Responsive: full-width on mobile, centered on desktop
- Section placed between Hero and TrustBadges (high visibility)
- Dark-themed section to make video pop

## Out-of-Scope
- Actual video file (placeholder only)
- Video hosting/streaming
- Autoplay functionality

## Technical Details
- Client component ("use client") for modal state
- useState for modal open/close
- Fixed position modal with backdrop blur
- Inline SVG play button and close icons
- Tailwind for styling
- Responsive padding and sizing

## Implementation Plan
1. Create VideoDemo component in /src/components/VideoDemo.tsx
2. Add to page.tsx between Hero and TrustBadges
3. Test play button opens modal
4. Test close button/click outside closes modal
5. Run lint, type-check, build
6. E2E browser test

## Acceptance Criteria
- [ ] Section has heading "See QwenResell in Action"
- [ ] Video thumbnail placeholder with play button overlay
- [ ] Clicking play opens modal
- [ ] Modal has close button
- [ ] Clicking backdrop closes modal
- [ ] Escape key closes modal
- [ ] Responsive design works on mobile/desktop
- [ ] Lint passes
- [ ] Type-check passes
- [ ] Build passes
- [ ] Browser test confirms section renders
