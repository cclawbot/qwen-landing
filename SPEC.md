# Feature Spec: FAQ Accordion Section

## Feature Name
FAQ Accordion - Expandable Questions & Answers

## Business Requirement
Add an interactive FAQ section to the landing page that addresses common customer questions about pricing, API usage, and enterprise features. Accordion style keeps the page clean while allowing users to find answers quickly.

## Business Goal Alignment
- **Primary Goal**: Reduce support burden by answering common questions upfront
- **Secondary Goal**: Build trust by demonstrating transparency about pricing and capabilities
- **Success Metric**: Visitors who engage with FAQ sections have higher conversion rates

## In-Scope
- Display 5-6 frequently asked questions about QwenResell API
- Click-to-expand accordion interaction (one open at a time)
- Questions cover: pricing, getting started, enterprise features, volume discounts, support
- Smooth expand/collapse animation
- Dark theme matching existing site styling
- Mobile-responsive (full-width on mobile)

## Out-of-Scope
- Search functionality within FAQ
- Multiple accordions open at once
- Nested accordions
- Dynamic/CMS-driven FAQ content
- FAQ categories/tabs

## Technical Details

### Component Structure
- New component: `FAQ.tsx` in `src/components/`
- Section added to `page.tsx` after Testimonials section, before Contact Form
- Uses React state to track open/closed state

### Data Model
```typescript
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}
```

### FAQ Content
1. **How much can I save with QwenResell?** - Pricing comparison details
2. **How do I get started?** - API key signup process
3. **What volume discounts do you offer?** - Enterprise pricing tiers
4. **Is there a free tier?** - Free tier details
5. **What enterprise features are available?** - SLA, support, custom contracts
6. **How is the API different from direct Alibaba Cloud?** - Reseller benefits

### Styling
- Dark card backgrounds with subtle borders
- Question row: clickable, cursor pointer, hover highlight
- Plus/minus icon indicator (rotates on open)
- Answer text with smooth height transition
- Match existing dark theme: bg-[#030712], gray-400/500 text

## Implementation Plan

### Step 1: Create FAQ Component
- Create `src/components/FAQ.tsx` with "use client" directive
- Define FAQItem interface
- Create static FAQ array with 6 items
- Implement accordion state with useState
- Render expandable list with animation

### Step 2: Add to Page
- Import and add `<FAQ />` section in `page.tsx`
- Place between Testimonials and Contact Form sections

### Step 3: Test & Verify
- Run lint, type-check, build
- Browser snapshot test

## Acceptance Criteria
- [ ] FAQ section renders on the page with 6 questions
- [ ] Clicking a question expands its answer with smooth animation
- [ ] Only one answer open at a time (clicking another closes current)
- [ ] Plus/minus icon rotates correctly on expand/collapse
- [ ] Dark theme matches existing site styling
- [ ] Mobile-responsive layout
- [ ] No console errors
- [ ] Lint, type-check, build all pass
