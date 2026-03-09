# Feature: Customer Logo Ticker

## Description
Add an animated horizontal ticker of customer/partner logos to provide social proof. Logos scroll continuously in a loop to show enterprise customers without taking much vertical space.

## Business Requirement
Add visual social proof through scrolling customer logos to build trust and credibility with potential enterprise customers.

## Business Goal
Increase conversion by showcasing trusted companies using QwenResell, reinforcing the product's legitimacy and enterprise readiness.

## In-Scope
- Horizontal scrolling logo animation (infinite loop)
- 8-10 placeholder company logos with names
- Smooth continuous scroll animation
- Pause on hover for user readability
- Responsive: fewer logos shown on mobile
- Subtle section wrapper with heading
- Placed between TrustBadges and StatsSection

## Out-of-Scope
- Real company logo images (use styled placeholders)
- Video backgrounds
- Click interactions on logos

## Technical Details
- CSS animation (@keyframes) for horizontal scroll
- Two identical logo rows that offset to create seamless loop
- "use client" directive for hover interaction
- Tailwind for styling
- Animation: translateX from 0% to -50% (half width for seamless loop)
- Duration: ~30 seconds for full loop
- Pause on hover: animation-play-state: paused

## Implementation Plan
1. Create CustomerLogos component in /src/components/CustomerLogos.tsx
2. Add to page.tsx between TrustBadges and StatsSection
3. Test animation runs smoothly
4. Test pause on hover works
5. Run lint, type-check, build

## Acceptance Criteria
- [ ] Logos scroll horizontally in infinite loop
- [ ] Animation pauses when user hovers
- [ ] Section has heading "Trusted by Leading Enterprises"
- [ ] 8-10 company logos displayed
- [ ] Responsive: shows fewer logos on mobile
- [ ] Lint passes
- [ ] Type-check passes
- [ ] Build passes
- [ ] Browser test confirms animation visible
