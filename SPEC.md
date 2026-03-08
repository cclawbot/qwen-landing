# Feature Spec: Testimonials / Social Proof Section

## Feature Name
Testimonials Section - Social Proof Component

## Business Requirement
Add a testimonials section to the landing page that displays customer quotes and trust indicators to build credibility and encourage conversions.

## Business Goal Alignment
- **Primary Goal**: Increase conversion rate by building trust
- **Secondary Goal**: Provide social proof that enterprise customers trust the service
- **Success Metric**: Visitors who see testimonials are more likely to join the waitlist

## In-Scope
- Display 3-4 customer testimonials with quotes, names, titles, and companies
- Include company logos (placeholder SVGs or styled text)
- Add a "Trusted by" heading
- Responsive grid layout (1 col mobile, 2 col tablet, 3-4 col desktop)
- Match existing dark theme styling

## Out-of-Scope
- Animated carousel/slider (keep it static for simplicity)
- Video testimonials
- Integration with external review platforms
- Dynamic/CMS-driven testimonials

## Technical Details

### Component Structure
- New component: `Testimonials.tsx` in `src/components/`
- Section added to `page.tsx` after Features section, before Contact Form

### Data Model
```typescript
interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  companyLogo?: string; // Optional logo identifier
}
```

### Sample Testimonials (Placeholder/Fictional)
1. **Enterprise CTO** - "Saved $2.3M annually switching from GPT-5"
2. **AI Startup Founder** - "Qwen Turbo powers our agent infrastructure"
3. **Product Lead** - "92% cost reduction let us scale 10x"

### Styling
- Dark card backgrounds with subtle borders (matching existing theme)
- Quote icon styling
- Name/title/company typography matching existing hierarchy
- Responsive grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

## Implementation Plan

### Step 1: Create Testimonials Component
- Create `src/components/Testimonials.tsx`
- Define Testimonial interface
- Create static testimonials array
- Render grid of testimonial cards

### Step 2: Add to Page
- Import and add `<Testimonials />` section in `page.tsx`
- Place between Features and Contact Form sections

### Step 3: Test & Verify
- Run lint, type-check, build
- Browser snapshot test

## Acceptance Criteria
- [ ] Testimonials section renders on the page
- [ ] Shows at least 3 testimonials with quote, name, title, company
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] Dark theme matches existing site styling
- [ ] No console errors
- [ ] Lint, type-check, build all pass
