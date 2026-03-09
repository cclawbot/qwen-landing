# SPEC.md - Trust & Security Badges

## Feature Name
Trust & Security Badges - Enterprise Credibility Indicators

## Business Requirement
Add a trust/security badges section to establish enterprise credibility. Display SOC2 compliance, security certifications, and enterprise partner logos to build trust with potential B2B customers.

## Business Goal Alignment
- **Trust**: Security certifications signal enterprise-readiness
- **Conversion**: B2B buyers need social proof before purchase
- **Differentiation**: Stand out from competitors without compliance badges

## In-Scope
- Trust badges section component with 4-6 badge items
- Display: SOC2 Type II, ISO 27001, Enterprise security, Data privacy
- Responsive grid layout (2/3/4 columns)
- Placed between Hero and How It Works sections (high visibility)
- Clean badge design with icons and labels
- Dark/light mode compatible
- Static content (no API calls)

## Out-of-Scope
- Clickable badges (linking to compliance pages)
- Dynamic compliance status API
- Enterprise logos section (covered by Integrations)
- Third-party verification badges (Trustpilot, etc.)

## Technical Details
- Static component (no "use client" needed)
- Inline SVG icons for each badge type
- Responsive: 2 cols mobile, 3 cols tablet, 4 cols desktop
- Uses existing color scheme and card styling
- Subtle background to make badges pop

## Implementation Plan
1. Create TrustBadges component in src/components/TrustBadges.tsx
2. Add 4 trust/security badges with icons and descriptions
3. Import and add to page.tsx between Hero and How It Works
4. Run lint, type-check, build
5. E2E browser test
6. Commit and push

## Visual Design
- Section title: "Enterprise-Grade Security"
- Subtitle: "Your data is protected by industry-leading standards"
- Badge items: icon + title + short description
- Badges in pill/rectangle containers with subtle borders
- Grid layout with consistent spacing
- Background: slightly different from page background for emphasis
