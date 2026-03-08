# Feature Spec: Live Pricing API Integration

## Feature Name
Live Pricing API Integration

## Business Requirement
Extract hardcoded pricing data into a dynamic API endpoint. The landing page should fetch pricing from a simulated live API, enabling easy price updates without code changes.

## Business Goal Alignment
- **Primary Goal**: Enable dynamic pricing updates without redeployment
- **Secondary Goal**: Demonstrate API integration capability for potential real integrations
- **Success Metric**: Pricing page loads data from API with proper loading/error states

## In-Scope
- Create mock API route `/api/pricing` returning JSON pricing data
- Create `PricingData` type definition
- Fetch pricing data on page load using React Suspense or useEffect
- Display loading skeleton while fetching
- Handle API errors gracefully with retry option
- Cache pricing data to prevent excessive fetches

## Out-of-Scope
- Real-time pricing updates (polling)
- Authentication for API
- Price update admin panel
- Multiple currency support

## Technical Details

### Component Structure
- New file: `src/app/api/pricing/route.ts` - API route returning pricing JSON
- New file: `src/types/pricing.ts` - TypeScript interfaces
- New file: `src/hooks/usePricing.ts` - Custom hook for fetching pricing
- Update: `src/app/page.tsx` - Fetch data from API instead of hardcoded

### API Response Format
```json
{
  "lastUpdated": "2026-03-08T15:30:00Z",
  "models": [
    {
      "id": "qwen-plus-0728",
      "name": "Qwen Plus (0728)",
      "category": "flagship",
      "inputPrice": 0.26,
      "outputPrice": 0.78,
      "status": "available"
    }
  ]
}
```

### State Management
- useEffect to fetch on mount
- React Suspense for loading state
- Error boundary for failure handling

### Data Categories
- Flagship/Thinking Models
- Standard/Mid-tier
- Lightweight/Fast

## Implementation Plan

### Step 1: Create TypeScript Types
- Create `src/types/pricing.ts`
- Define `PricingModel`, `PricingCategory`, `PricingResponse` interfaces

### Step 2: Create API Route
- Create `src/app/api/pricing/route.ts`
- Return mock pricing data matching current hardcoded values
- Add CORS headers for potential external access

### Step 3: Create Custom Hook
- Create `src/hooks/usePricing.ts`
- Fetch from `/api/pricing`
- Handle loading and error states
- Implement simple caching (sessionStorage)

### Step 4: Update Page Component
- Remove hardcoded table data
- Use usePricing hook to fetch and display
- Add loading skeleton component
- Add error boundary with retry

### Step 5: Test & Verify
- Run lint, type-check, build
- Browser snapshot test
- Verify data loads correctly

## Acceptance Criteria
- [ ] API route returns valid JSON pricing data
- [ ] Page displays loading skeleton while fetching
- [ ] Pricing data renders correctly from API response
- [ ] Error state shows with retry button if fetch fails
- [ ] Lint, type-check, build all pass
- [ ] Browser test confirms pricing displays correctly
