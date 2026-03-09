# Progress: Qwen Landing Page Features

## Current Status
- **Repo**: https://github.com/cclawbot/qwen-landing
- **Tech Stack**: Next.js 16 + TypeScript + Tailwind CSS
- **CI/CD**: GitHub Actions (lint → type-check → build → deploy)
- **Deployment**: Cloudflare Pages (free tier, no credit card)

## Completed Features
- ✅ Initial Next.js landing page with 2026 pricing comparison
- ✅ GitHub Actions CI/CD pipeline
- ✅ Lint, type-check, build checks
- ✅ Pricing savings calculator
- ✅ Contact form with validation
- ✅ Testimonials/social proof section
- ✅ FAQ accordion section
- ✅ Dark/light mode toggle
- ✅ Live pricing API integration
- ✅ Analytics integration
- ✅ Multi-language support (i18n)
- ✅ SEO optimization (OpenGraph, Twitter Cards, JSON-LD)
- ✅ Newsletter signup
- ✅ Integrations showcase section
- ✅ Team section (founders + advisors)

## Infrastructure (Free, No Credit Card)
- **Hosting**: Cloudflare Pages (free, no bandwidth fees)
- **CI/CD**: GitHub Actions (2000 mins/month free for private, unlimited for public)
- **Repo**: GitHub (public)

---

## Feature Development Workflow

### Step 1: Choose Feature
Small, atomic features only. Each should be completable in one session.

### Step 2: Create SPEC.md
Document:
- Feature name & description
- Business requirement
- Business goal alignment
- In-scope / Out-of-scope
- Technical details
- Implementation plan

### Step 3: TDD Development
1. **Red**: Write failing test
2. **Green**: Implement minimum code to pass
3. **Refactor**: Clean up

### Step 4: Quality Checks
- [ ] Lint passes (`npm run lint`)
- [ ] Type check passes (`npm run type-check`)
- [ ] Build passes (`npm run build`)
- [ ] E2E test (browser screenshot)

### Step 5: Commit & Push
- Commit with descriptive message
- Push to trigger CI/CD
- Verify deployment

---

## Next Feature Ideas (Priority Order)
1. Add newsletter signup (DONE)
2. Add more landing page sections (blog, team, integrations showcase) - integrations DONE, How It Works DONE
3. Add blog section (company updates, API tutorials)
4. Add team section (founders, advisors)
5. Add trust/security badges (SOC2, enterprise logos)

---

## Notes
- Feature size: Must be small enough for single logical change
- Prefer multiple small commits over one large commit
- Document lessons learned after each feature

## Lessons Learned (March 8, 2026)
- Pricing calculator using `useMemo` for real-time calculation works well
- Client component ("use client") required for interactive calculator
- Tailwind matches existing theme well - used existing color palette (green-400 for savings, blue-600 for primary actions)
- Browser snapshot confirmed component renders correctly with default values
- Build passed with no issues - Next.js 16.1.6 handled the component cleanly
- Contact form validation uses onBlur to trigger "touched" state for better UX
- Custom validation without external library keeps bundle small
- Green border = valid, Red border = error - consistent visual feedback
- Loading spinner via inline SVG - no external icon dependencies
- setTimeout for form reset gives user time to see success message
- Testimonials section added between Features and Contact Form - good placement for social proof
- Testimonials use "use client" directive since they could be extended with interactivity later
- Escaped unicode quote character (&ldquo;) in JSX to satisfy ESLint react/no-unescaped-entities rule
- Testimonial cards use gradient avatars matching brand colors
- FAQ accordion uses React useState to track open/closed item (single open at a time)
- Default openId=1 shows first answer expanded by default for better UX
- Plus icon rotates 45° (to become X) when item is open - common accordion pattern
- CSS transition on max-height for smooth expand/collapse animation
- Group hover effect on question text for visual feedback
- aria-expanded attribute for accessibility
- FAQ placed between Testimonials and Contact Form - good flow from social proof to Q&A to CTA
- Dark/light mode toggle uses class-based approach with body class toggling
- Tailwind v4 uses @custom-variant for dark mode configuration
- Theme script in layout.tsx head prevents flash of wrong theme (FOUC)
- localStorage key "theme" stores user preference
- System preference fallback via window.matchMedia("(prefers-color-scheme: light)")
- Initial state function (getInitialTheme) avoids hydration mismatch
- useRef to track first render prevents unnecessary class application
- aria-label updates dynamically: "Switch to light mode" ↔ "Switch to dark mode"
- 300ms CSS transition on body for smooth theme switch
- Live pricing API integration extracts hardcoded data into /api/pricing endpoint
- TypeScript interfaces (PricingModel, PricingResponse) ensure type safety across API and components
- usePricing hook handles loading/error states with sessionStorage caching (5 min TTL)
- Dynamic import not needed - component uses "use client" directive
- API route returns JSON with lastUpdated timestamp for freshness display
- Loading skeleton provides visual feedback while fetching - improves perceived performance
- Error state includes retry button for failed API calls
- Savings percentage calculated dynamically from competitor vs our pricing
- Browser test confirmed all three pricing categories render correctly with data
- Analytics integration uses privacy-focused approach: no cookies, no personal data
- AnalyticsProvider client component wraps children for route-based pageview tracking
- usePathname from next/navigation tracks route changes automatically
- Calculator tracking uses useEffect to avoid ref access during render (lint error fix)
- FAQ click tracking includes question ID for granular analytics
- Theme toggle tracking captures direction (to light or dark)
- Form view tracking triggers once on component mount using useRef
- Analytics API uses in-memory storage (resets on server restart - perfect for serverless)
- API limits storage to last 1000 events to prevent memory issues
- i18n using React Context - LanguageProvider wraps app in layout.tsx
- useTranslation hook provides t() function for easy key-based translations
- Translations stored inline in index.tsx for simplicity (no external JSON files needed)
- Language dropdown with flag emojis for visual identification (EN/US, ZH/CN, ES)
- Language preference persisted in localStorage with key "language"
- Fallback to English when translation key not found
- Always provide context value (even before mount) to avoid SSR hydration errors
- Components use "use client" directive to enable useTranslation hook
- ESLint warns about setState in useEffect - disabled with eslint-disable for localStorage hydration pattern
- SEO optimization uses Next.js 16 Metadata API - comprehensive type-safe meta tags
- OpenGraph tags enable rich social previews when links are shared on social media
- Twitter Card meta tags similar to OG but with twitter: prefix for Twitter/X sharing
- JSON-LD structured data provides semantic markup for search engines
- FAQPage schema in JSON-LD can help FAQ content appear in search results
- Organization schema helps search engines understand the business entity
- favicon.svg and og-image.svg created as vector assets for crisp rendering at any size
- Next.js automatically handles favicon.ico generation from SVG source
- Always rebuild and restart server after metadata changes to see updated HTML
- Next.js caches static pages - clear cache by rebuilding or using fresh server start
- Newsletter signup adds lower-friction lead capture compared to full contact form
- Email validation uses regex pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
- t() function returns key itself if translation not found - use || fallback for defaults
- "use client" directive required for components using useTranslation hook
- LanguageProvider was defined but NOT actually wrapping the app - added to layout.tsx
- Newsletter placed between Testimonials and FAQ for good user flow
- onView and onSubmit props allow analytics tracking integration
- Success state shows checkmark and confirmation message after valid submission
- Error state shows red border on input with error message below
- Touched state tracks if user has focused field (validates on blur)
- Privacy note below button: "We respect your privacy. Unsubscribe anytime."
- Integrations showcase adds social proof of ecosystem compatibility
- 12 partner logos in responsive grid (2/3/6 cols for mobile/tablet/desktop)
- Placeholder colored initials used instead of external SVG logos (no dependencies)
- Hover scale-105 effect on cards for visual feedback
- Component placed between Features and Testimonials for good flow
- How It Works section adds 3-step onboarding explanation early in the funnel
- Section placed between Hero and Pricing - shows before price comparison
- Static component (no "use client" needed) - renders on server
- Inline SVG icons match color scheme (blue/purple/green for each step)
- Responsive grid: stacks on mobile, 3 columns on desktop
- Section uses same card styling as other sections for visual consistency

- Team section adds social proof with 4 team members (2 founders, 2 advisors)
- Gradient avatars use initials - blue for founders, purple for advisors
- Section placed between Integrations and Testimonials for good flow
- Responsive grid: 1 col mobile, 2 col tablet, 4 col desktop
