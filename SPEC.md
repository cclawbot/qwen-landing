# Feature SPEC: Multi-Language Support (i18n)

## Feature Name
Multi-language support (i18n)

## Business Requirement
Add support for multiple languages (English, Spanish, Chinese) to the landing page to serve international customers.

## Business Goal Alignment
- Expand market reach to non-English speaking customers
- Improve conversion rates for international B2B buyers
- Zero external dependencies (lightweight i18n implementation)

## In-Scope
- Support English (default), Spanish, Chinese (Simplified)
- Language switcher in header/navbar
- Persist language choice in localStorage
- Translate all visible text: hero, features, pricing, testimonials, FAQ, contact form, footer

## Out-of-Scope
- RTL language support
- Dynamic URL-based routing (/en/, /es/)
- Server-side translation loading
- External i18n libraries (next-intl, react-i18next)

## Technical Details

### Implementation Approach
1. **Translation JSON files** in `/src/lib/i18n/` - language key-value pairs
2. **I18nContext** - React context for current language state
3. **useTranslation hook** - Access translations in components
4. **LanguageToggle component** - Dropdown/button in navbar
5. **Wrap page content** - Use translation keys instead of hardcoded text

### File Structure
```
src/
├── lib/i18n/
│   ├── en.json
│   ├── es.json
│   └── zh.json
├── context/
│   └── I18nContext.tsx
├── hooks/
│   └── useTranslation.ts
└── components/
    └── LanguageToggle.tsx
```

### Translation Keys (sample)
```json
{
  "nav.pricing": "Pricing",
  "nav.features": "Features", 
  "nav.waitlist": "Join Waitlist",
  "hero.title": "Stop Overpaying for Thinking Models.",
  "hero.subtitle": "Access Alibaba's Qwen 0728 architecture with up to 99% savings...",
  "cta.joinWaitlist": "Join the Waitlist",
  "cta.viewComparison": "View Comparison"
}
```

## Implementation Plan

### Phase 1: Setup (10 min)
1. Create translation JSON files (en, es, zh)
2. Create I18nContext provider
3. Create useTranslation hook

### Phase 2: Components (10 min)
1. Create LanguageToggle component
2. Add to navbar
3. Wrap page.tsx with provider

### Phase 3: Translation (15 min)
1. Replace all hardcoded text in page.tsx with translation keys
2. Translate components: PricingCalculator, ContactForm, Testimonials, FAQ

### Phase 4: Polish (5 min)
1. Add language persistence (localStorage)
2. Test language switching
3. Verify all text translates correctly

## Acceptance Criteria
- [ ] Language toggle visible in navbar
- [ ] Three languages available: EN, ES, ZH
- [ ] Clicking language changes all visible text
- [ ] Language preference persists on page reload
- [ ] No layout shift when switching languages
- [ ] All components translated (hero, features, pricing, testimonials, FAQ, contact, footer)
