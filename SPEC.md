# Feature Comparison Table - SPEC.md

## Feature Name
Feature Comparison Table

## Description
A detailed comparison table showing features included at each pricing tier (Starter, Pro, Enterprise). Complements the PricingSection by providing granular feature breakdown.

## Business Requirement
Users need to understand exactly what features are included at each pricing level to make informed purchase decisions. The pricing section shows prices, but users want to see what's actually included.

## Business Goal Alignment
- Increase conversion rates by reducing purchase friction
- Build trust through transparency
- Support enterprise sales with detailed feature specifications

## In-Scope
- Three tiers: Starter, Pro, Enterprise
- 10-12 comparison features/rows
- Check/cross visual indicators
- Tooltip explanations for technical features
- Responsive design (horizontal scroll on mobile)
- Highlighted "Popular" tier (Pro)
- CTA buttons matching existing design

## Out-of-Scope
- Interactive feature selection
- Dynamic pricing calculations
- Feature request functionality

## Technical Details
- Static React component (no API calls needed)
- Tailwind CSS for styling
- Follow existing design system (CSS variables, colors)
- Inline SVG icons for checkmarks/crosses
- Use "use client" directive for potential tooltips

## Implementation Plan
1. Create FeatureComparison.tsx component
2. Add to page.tsx after PricingSection
3. Run quality checks (lint, type-check, build)
4. Browser test
5. Commit and push

## Acceptance Criteria
- [ ] Table displays 3 tiers with headers
- [ ] At least 10 features compared across tiers
- [ ] Checkmarks for included features, crosses for not included
- [ ] Pro tier visually highlighted as "Most Popular"
- [ ] CTA buttons link to waitlist
- [ ] Responsive: horizontal scroll on mobile
- [ ] Dark/light mode compatible
- [ ] Lint passes
- [ ] Type-check passes
- [ ] Build passes
- [ ] Browser test shows correct rendering
