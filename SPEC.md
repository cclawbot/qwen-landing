# SPEC.md - Pricing Calculator Feature

## Feature Name
**Pricing Savings Calculator**

## Business Requirement
Add an interactive calculator that lets users estimate their monthly savings by switching from competitor models (GPT-5, Claude) to Qwen pricing. Users input their token usage and see real-time savings projections.

## Business Goal Alignment
- **Primary**: Increase conversion by demonstrating tangible cost savings
- **Secondary**: Reduce friction in pricing understanding - users don't need to do math

## In-Scope
- Input fields for monthly input tokens (in millions)
- Input fields for monthly output tokens (in millions)
- Dropdown to select current model (GPT-5.4 Pro, Claude Opus 4.6, Claude Sonnet 4.6, GPT-5.1, Claude Haiku 4.5, GPT-5 Nano)
- Real-time calculation of monthly savings
- Display savings as dollar amount and percentage
- Visual highlight showing savings (green badge)
- Responsive design matching existing theme

## Out-of-Scope
- API key generation or actual cost estimation
- Historical data or charts
- Email capture integration
- Dark/light mode toggle (existing theme is dark-only)

## Technical Details
- **Component**: `src/components/PricingCalculator.tsx`
- **Styling**: Tailwind CSS (matching existing dark theme)
- **Pricing Data**: Hardcoded from pricing table (single source of truth)
- **State**: React useState for inputs and calculation

### Pricing Data (per 1M tokens)
| Model | Input | Output |
|-------|-------|--------|
| GPT-5.4 Pro | $30.00 | $180.00 |
| Claude Opus 4.6 | $5.00 | $25.00 |
| Claude Sonnet 4.6 | $3.00 | $15.00 |
| GPT-5.1 | $1.25 | $10.00 |
| Claude Haiku 4.5 | $1.00 | $5.00 |
| GPT-5 Nano | $0.05 | $0.40 |
| Qwen Plus | $0.26 | $0.78 |
| Qwen Turbo | $0.30 | $0.60 |
| Qwen Flash | $0.10 | $0.40 |

### Calculations
```
currentCost = (inputTokens × competitorInputPrice) + (outputTokens × competitorOutputPrice)
qwenCost = (inputTokens × qwenInputPrice) + (outputTokens × qwenOutputPrice)
savings = currentCost - qwenCost
savingsPercent = (savings / currentCost) × 100
```

## Implementation Plan
1. Create `src/components/PricingCalculator.tsx`
2. Add to page.tsx after the pricing tables, before Features section
3. Test with sample values
4. Verify responsive layout

## Acceptance Criteria
- [ ] Calculator displays input field for input tokens (in millions)
- [ ] Calculator displays input field for output tokens (in millions)
- [ ] Calculator has dropdown to select competitor model
- [ ] Default selection shows reasonable defaults
- [ ] Savings amount updates in real-time as inputs change
- [ ] Savings percentage displays correctly
- [ ] Green visual indicator for savings
- [ ] Mobile responsive (stacks vertically on small screens)
- [ ] Matches existing dark theme styling
