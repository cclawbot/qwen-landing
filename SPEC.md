# SPEC.md - Newsletter Signup Feature

## Feature Name
Newsletter Signup Section

## Business Requirement
Add a newsletter signup section to capture leads who may not be ready for full contact yet. Simple email-only form with validation and success state.

## Business Goal Alignment
- Increase lead capture conversion (lower friction than full contact form)
- Build email list for product updates and promotions
- Non-intrusive placement between Testimonials and FAQ

## In-Scope
- Newsletter signup component with email input
- Client-side email validation
- Success state with confirmation message
- Integration with existing i18n (translations)
- Dark/light mode theming
- Analytics tracking for form views and submissions

## Out-of-Scope
- Backend email storage (just log to console for now)
- Email confirmation workflow
- Multiple newsletter categories

## Technical Details
- Component: `Newsletter.tsx` in `/src/components/`
- Placement: Between Testimonials and FAQ sections
- Styling: Match existing card design with backdrop blur
- "use client" directive for form interactivity

## Implementation Plan
1. Create Newsletter component with email form
2. Add to page.tsx between Testimonials and FAQ
3. Add translations for i18n
4. Add analytics tracking
5. Test in browser
