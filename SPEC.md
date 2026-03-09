# SPEC.md - How It Works Section

## Feature Name
How It Works Section

## Business Requirement
Add a section explaining the 3-step process to get started with QwenResell. Clear onboarding explanation reduces friction and increases conversion.

## Business Goal Alignment
- Reduce onboarding friction by explaining the simple signup process
- Build trust through transparency
- Increase conversion by showing "it only takes 3 steps"

## In-Scope
- "How It Works" section with 3 steps
- Icons for each step (inline SVG)
- Step numbers for visual progression
- Brief description for each step
- Responsive layout (1 col mobile, 3 cols desktop)
- Dark/light mode theming

## Out-of-Scope
- Animated step progression
- Interactive step-by-step wizard
- Integration with actual signup flow

## Technical Details
- Component: `HowItWorks.tsx` in `/src/components/`
- Placement: Between Hero and Pricing Section (shows early in funnel)
- Styling: Match existing section styling with cards
- "use client" directive not needed (static component)

## Implementation Plan
1. Create HowItWorks component with 3-step grid
2. Add to page.tsx between Hero and PricingSection
3. Test in browser
4. Lint, type-check, build
