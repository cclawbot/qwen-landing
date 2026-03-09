# Feature: Animated Statistics Counters

## Description
Add a statistics section with animated number counters that increment from 0 to their target value when scrolled into view.

## Business Requirement
Display key metrics (tokens served, enterprises, uptime, etc.) with animated counters to build credibility and social proof.

## Business Goal
Increase conversion by showing tangible proof of platform success - "if X other companies trust us, you can too."

## In-Scope
- Animated counter component with count-up animation
- Intersection Observer to trigger animation when visible
- 4 key metrics: Tokens Served, Enterprise Clients, Uptime %, Support Response Time
- Smooth easing animation (ease-out)
- Responsive layout (2x2 grid on mobile, 4x1 on desktop)

## Out-of-Scope
- Real-time data from API (static values for now)
- Additional metrics beyond the 4 defined

## Technical Details
- Client component ("use client") for animation
- useEffect + IntersectionObserver for scroll detection
- useState for animated value, useRef for animation frame
- RequestAnimationFrame for smooth 60fps animation
- CSS transition on the final value

## Implementation Plan
1. Create StatsSection component in /src/components/StatsSection.tsx
2. Add to page.tsx between TrustBadges and HowItWorks
3. Test animation triggers on scroll
4. Verify responsive layout

## Acceptance Criteria
- [ ] Four metric cards render with labels and values
- [ ] Numbers animate from 0 to target when scrolled into view
- [ ] Animation only triggers once (not on every scroll)
- [ ] Responsive: 2x2 grid mobile, 4 columns desktop
- [ ] Dark/light mode compatible
- [ ] Lint passes
- [ ] Type-check passes
- [ ] Build passes
