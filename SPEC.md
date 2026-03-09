# SPEC.md - Team Section Feature

## Feature Name
Team Section - Show founders and advisors

## Business Requirement
Add a team section to build trust by displaying company leadership and advisors. This provides social proof that the business is run by credible professionals.

## Business Goal Alignment
- **Goal**: Increase conversion rate by building trust
- **Metric**: Trust signals on landing page

## In-Scope
- Team section with 3-4 team members (founders/advisors)
- Photo placeholder, name, role, and brief bio
- Responsive grid layout (1 col mobile, 2 col tablet, 4 col desktop)
- Placed between Integrations and Testimonials sections

## Out-of-Scope
- LinkedIn profile links
- Real photos (using placeholders for now)
- Multiple pages/filtering

## Technical Details
- Static React component (server-side rendered)
- Same card styling as other sections for visual consistency
- Use inline SVG avatars or initials for placeholders

## Implementation Plan
1. Create `src/components/Team.tsx` component
2. Add to page.tsx between Integrations and Testimonials
3. Run quality checks
4. Test in browser

## Design
- Card-based layout matching existing section styles
- Avatar: circular with gradient background + initials
- Role in accent color (blue-400 for founders, purple-400 for advisors)
- Brief one-line bio in secondary text color
- Hover effect: subtle scale
