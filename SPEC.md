# SPEC.md - Blog Section Feature

## Feature Name
Blog Section - Company Updates & API Tutorials

## Business Requirement
Add a blog section to the landing page to showcase company updates, API tutorials, and industry insights. This helps with SEO, establishes thought leadership, and provides valuable content to potential customers.

## Business Goal Alignment
- **SEO**: Fresh content improves search rankings
- **Trust**: Educational content shows expertise
- **Engagement**: Tutorial content can convert visitors to users

## In-Scope
- Blog section component with 3 featured posts
- Each post card shows: title, excerpt, date, category tag
- Responsive grid layout (1/2/3 columns)
- Category tags (Product Update, Tutorial, Industry)
- Hover effects on cards for interactivity
- Placed between Integrations and Team sections
- "use client" directive for potential future interactivity

## Out-of-Scope
- Full blog post pages (single post navigation)
- Blog API routes
- CMS integration
- Comments section
- Social sharing buttons

## Technical Details
- Static content (no API calls)
- 3 sample blog posts with varied categories
- Category tag colors: blue for Product Update, green for Tutorial, purple for Industry
- Responsive: 1 col mobile, 2 col tablet, 3 col desktop
- Uses existing card styling pattern from other sections
- No external dependencies (inline styles/Tailwind)

## Implementation Plan
1. Create BlogSection component in src/components/BlogSection.tsx
2. Add 3 sample blog posts with realistic content
3. Import and add to page.tsx between Integrations and Team
4. Run lint, type-check, build
5. E2E browser test
6. Commit and push

## Visual Design
- Section title: "Latest Updates & Tutorials"
- Subtitle: "Insights from the QwenResell team"
- Cards: title, 2-line excerpt, date, category tag
- Hover: scale and shadow effect
- Category tags: pill-shaped badges with category-specific colors
