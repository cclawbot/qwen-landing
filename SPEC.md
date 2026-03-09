# SPEC.md - Case Studies Section

## Feature Name
Case Studies Section - Detailed Customer Success Stories

## Business Requirement
Add a case studies section to provide detailed customer success stories with quantifiable results. This adds deeper social proof than testimonials by showing specific metrics, use cases, and business outcomes.

## Business Goal Alignment
- **Trust**: Detailed success stories with real metrics build credibility
- **Conversion**: Case studies help prospects visualize ROI
- **SEO**: Long-form content improves search engine visibility

## In-Scope
- Case studies section with 3 detailed customer success stories
- Each case study: company name, industry, challenge, solution, results (with metrics)
- Metrics displayed prominently (cost savings %, time saved, etc.)
- Responsive grid layout (1/2/3 columns)
- Placed between Team and Testimonials sections
- Dark/light mode compatible
- Static content (no API calls)

## Out-of-Scope
- Interactive case study filters
- Video case studies
- Customer photos/headshots
- Dynamic case study API
- Full blog-style case study pages

## Technical Details
- Static component (no "use client" needed)
- Inline SVG icons for metrics
- Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop
- Uses existing color scheme and card styling
- Hover effects on cards for interactivity

## Implementation Plan
1. Create CaseStudies component in src/components/CaseStudies.tsx
2. Add 3 case studies with company, industry, challenge, solution, results
3. Import and add to page.tsx between Team and Testimonials
4. Run lint, type-check, build
5. E2E browser test
6. Commit and push

## Visual Design
- Section title: "Success Stories"
- Subtitle: "See how enterprises are saving with QwenResell"
- Cards with: Company name, industry tag, challenge summary, solution summary, key metrics
- Metrics shown as large numbers with labels (e.g., "92%", "$2.4M saved")
- Industry tags use color coding
- Background: slightly different from page background for emphasis
- Hover: subtle scale and shadow increase
