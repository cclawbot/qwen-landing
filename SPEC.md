# SPEC.md - Interactive ROI Calculator

## Feature Name
Interactive ROI Calculator - Business Value Metrics

## Business Requirement
Add a comprehensive ROI (Return on Investment) calculator that helps enterprise prospects understand the full business value of switching to QwenResell. Unlike the pricing calculator (which shows token cost savings), this calculator shows broader metrics including payback period, productivity gains, and total 3-year value.

## Business Goal Alignment
- **Conversion**: Help prospects visualize ROI to justify switch to decision-makers
- **Trust**: Quantifiable business metrics build credibility
- **Differentiation**: Stand out from competitors by showing comprehensive value

## In-Scope
- ROI calculator with multiple input fields
- Metrics calculated:
  - Payback period (months to recover investment)
  - Total 3-year savings
  - Annual productivity hours saved
  - Efficiency improvement percentage
  - Break-even analysis
- Interactive sliders + number inputs for user input
- Results displayed prominently with visualizations
- Responsive layout (mobile + desktop)
- Dark/light mode compatible
- Client-side component with useMemo for calculations
- Placed between PricingCalculator and Features section

## Out-of-Scope
- API integration for real-time pricing
- PDF export of results
- Email results to sales
- Comparison with specific competitors (beyond pricing)

## Technical Details
- "use client" directive for interactivity
- useMemo for calculation performance
- Input validation with sensible defaults
- Formatted currency/number display
- Uses existing color scheme and card styling
- Responsive grid: stacked on mobile, side-by-side on desktop

## Implementation Plan
1. Create ROICalculator component in src/components/ROICalculator.tsx
2. Add input fields: current monthly spend, number of developers, current tool costs, implementation cost
3. Calculate and display: payback period, 3-year savings, productivity gains, efficiency %
4. Import and add to page.tsx between PricingCalculator and Features
5. Run lint, type-check, build
6. E2E browser test
7. Commit and push

## Visual Design
- Section title: "Calculate Your ROI"
- Subtitle: "See the full business value of switching to QwenResell"
- Input cards on left, results dashboard on right
- Large metric numbers with labels
- Color-coded metrics (green for positive, purple for highlights)
- Animated counter effect on results
- "Contact Sales" CTA below results

## Assumptions
- Default implementation cost: $5,000 (one-time)
- Productivity value: $75/hour (senior developer rate)
- Efficiency gain: 30% (conservative estimate based on Qwen capabilities)
- Annual cost increase for competitors: 15%
