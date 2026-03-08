# Feature Spec: Analytics Integration

## Feature Name
Analytics Integration

## Business Requirement
Add basic analytics tracking to understand visitor behavior on the landing page. Track page views and key interactions (pricing calculator usage, contact form views, FAQ interactions).

## Business Goal Alignment
- **Primary Goal**: Understand visitor behavior and conversion patterns
- **Secondary Goal**: Make data-driven decisions about the landing page
- **Success Metric**: Analytics events are recorded and viewable

## In-Scope
- Create analytics tracking utility
- Track page views on route changes
- Track key interactions: calculator use, form view, FAQ clicks
- Create simple analytics dashboard API endpoint
- Privacy-focused: no personal data collection, no cookies required

## Out-of-Scope
- Real-time dashboard UI (view via API only)
- User session tracking
- A/B testing
- External analytics service integration (e.g., Google Analytics, Plausible)
- Data persistence (in-memory for demo)

## Technical Details

### Component Structure
- New file: `src/lib/analytics.ts` - Analytics tracking utility
- New file: `src/app/api/analytics/route.ts` - API endpoint to view stats
- Update: `src/app/layout.tsx` - Track page views on route changes

### Event Types
```typescript
type AnalyticsEvent = 
  | { type: 'pageview'; path: string; timestamp: string }
  | { type: 'calculator_used'; timestamp: string }
  | { type: 'form_viewed'; timestamp: string }
  | { type: 'faq_clicked'; questionId: string; timestamp: string }
  | { type: 'theme_toggled'; to: 'light' | 'dark'; timestamp: string }
```

### API Response Format
```json
{
  "totalPageviews": 150,
  "uniquePaths": ["/", "/pricing", "/contact"],
  "events": {
    "calculator_used": 25,
    "form_viewed": 40,
    "faq_clicked": 60,
    "theme_toggled": 15
  },
  "recentEvents": [...]
}
```

### Implementation Plan

### Step 1: Create Analytics Utility
- Create `src/lib/analytics.ts`
- Define AnalyticsEvent type
- Create trackEvent function that sends to API
- Include page path detection

### Step 2: Create Analytics API Route
- Create `src/app/api/analytics/route.ts`
- In-memory storage for events (simple array)
- GET endpoint to retrieve stats
- POST endpoint to record events

### Step 3: Integrate with Layout
- Update `src/app/layout.tsx` to track page views
- Use usePathname from next/navigation for route tracking

### Step 4: Track Key Interactions
- Add tracking to PricingCalculator when used
- Add tracking to ContactForm when viewed
- Add tracking to FAQ when questions clicked
- Add tracking to ThemeToggle when toggled

### Step 5: Test & Verify
- Run lint, type-check, build
- Browser test to confirm events trigger
- Test analytics API returns data

## Acceptance Criteria
- [ ] Page views are tracked automatically on route changes
- [ ] Calculator usage triggers event
- [ ] FAQ clicks trigger events
- [ ] Theme toggle triggers events
- [ ] Analytics API returns event data
- [ ] Lint, type-check, build all pass
- [ ] Browser test confirms tracking works
