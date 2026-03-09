# SPEC.md - Integrations Showcase Feature

## Feature Name
Integrations Showcase Section

## Business Requirement
Add a section showcasing tools and platforms that integrate with Qwen API. Display partner/ecosystem logos in a grid to build trust and demonstrate ecosystem maturity.

## Business Goal Alignment
- Build trust through social proof of ecosystem
- Show potential customers their existing tools work with Qwen
- Increase conversion by reducing integration concerns

## In-Scope
- Integrations showcase component with logo grid
- Minimum 6 integration partners (popular dev tools)
- Responsive grid layout (2 cols mobile, 3 cols tablet, 6 cols desktop)
- Dark/light mode theming
- Use inline SVG placeholders for logos (no external dependencies)
- Subtle hover effect on integration cards

## Out-of-Scope
- Real partnership verification
- Dynamic integration fetching from API
- Integration detail pages
- Animated logo marquee

## Technical Details
- Component: `Integrations.tsx` in `/src/components/`
- Placement: Between Features and Testimonials sections
- Styling: Match existing card design, grayscale logos with color on hover
- "use client" directive not needed (static component)

## Implementation Plan
1. Create Integrations component with SVG logo grid
2. Add to page.tsx between Features and Testimonials
3. Test in browser
4. Lint, type-check, build
