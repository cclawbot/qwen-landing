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
- ✅ Blog section (company updates & tutorials)
- ✅ Trust/Security badges (SOC2, ISO 27001, GDPR, Enterprise SLA)
- ✅ Case studies section (detailed customer success stories)
- ✅ Interactive ROI calculator with business metrics
- ✅ Animated statistics counters section
- ✅ Back to top button
- ✅ Enhanced footer with social links & navigation
- ✅ Scroll progress indicator
- ✅ Cookie consent banner with preferences modal

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
2. Add more landing page sections (blog, team, integrations showcase) - all DONE
3. Add trust/security badges (SOC2, enterprise logos) - DONE
4. Add case studies section (detailed customer success stories) - DONE
5. Add interactive ROI calculator with more metrics - DONE
6. Add scroll progress indicator - DONE
7. Add cookie consent banner with preferences modal - DONE

---

## Notes
- Feature size: Must be small enough for single logical change
- Prefer multiple small commits over one large commit
- Document lessons learned after each feature

## Lessons Learned (March 9, 2026)
- Scroll progress indicator improves UX on long landing pages
- useState tracks scroll percentage, useEffect adds scroll listener with passive: true
- CSS transition on width for smooth progress animation
- Fixed position at top with z-[60] to stay above most content
- Purple gradient matching brand colors (linear-gradient from #8b5cf6 to #a855f7)
- aria attributes for accessibility compliance (role="progressbar", aria-valuenow/min/max)
- "use client" directive required for scroll event handling
- Initial calculation runs in useEffect to set starting position
- Cleanup removes scroll listener on unmount
- All quality checks pass (lint, type-check, build)
- Browser test confirmed progress bar renders and updates on scroll
- Back to Top button improves UX on long landing pages
- useState tracks visibility (scrollY > 200), useEffect adds scroll listener
- CSS transition on opacity/transform for smooth fade in/out
- Fixed position bottom-right with z-50 to stay above other content
- window.scrollTo({ top: 0, behavior: "smooth" }) for animated scroll
- aria-label for accessibility compliance
- "use client" directive required for scroll detection hooks
- Button hidden initially (opacity-0 + pointer-events-none), visible when scrolled
- All quality checks pass (lint, type-check, build)
- Browser test confirmed button appears after scrolling down
- ROI calculator complements pricing calculator with business-focused metrics
- ROI shows: payback period, 3-year savings, efficiency gains, productivity value
- Uses different inputs than pricing calculator: monthly spend, developer count, implementation cost
- Calculates year-by-year savings with 15% annual competitor growth factored in
- Payback period calculated as: implementation cost / monthly savings
- 3-year savings includes implementation cost deduction from year 1
- Productivity value: hours saved per year × $75/hr developer rate
- Default efficiency gain: 30% (conservative estimate for AI-assisted development)
- Placed between PricingCalculator and Features - good flow from cost to value
- useMemo used for calculations - runs on input change, no unnecessary recalcs
- Color-coded metrics: purple for primary (payback), green for savings, blue for efficiency
- Formatted currency helper handles K/M suffixes for large numbers
- CTA links to waitlist for detailed enterprise analysis
- Browser test confirmed all input fields and ROI metrics render correctly
- Build passed with no issues
- Enhanced footer adds social proof and improved navigation
- Footer includes Twitter, GitHub, LinkedIn social links with hover scale effect
- 4 navigation columns: Product, Company, Resources, Legal
- Grid layout responsive: 1 col mobile, 2 col tablet, 5 col desktop
- Brand section with company description adds context
- Uses existing CSS variables for dark/light mode compatibility
- Inline SVG icons - no external dependencies
- Replaced minimal footer with comprehensive footer for better UX
- aria-labels on social icons for accessibility
- Copyright includes current year dynamically via new Date().getFullYear()
- Case studies add deeper social proof than testimonials with quantifiable metrics
- Each case study includes: company name, industry, challenge, solution, and 2 key metrics
- Industry color-coded tags (blue for SaaS, green for finance, purple for healthcare)
- Metrics displayed prominently as large numbers with labels (87% Cost Reduction, $1.8M saved)
- Static component (no "use client" needed) - server-rendered for SEO
- Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop - same pattern as other sections
- Hover effects: scale-[1.02] and shadow-xl - consistent with Blog section styling
- Placed between Team and Testimonials - good flow from people to success stories to social proof
- Browser test confirmed all 3 case study cards render with correct data
- Animated statistics counters add social proof with key metrics (2B+ tokens, 500+ enterprises, 99.99% uptime, 15min support)
- Uses IntersectionObserver to trigger count-up animation when scrolled into view
- Two separate useRef flags: one per counter for individual animation, one for section-level analytics tracking
- Animation runs via setInterval over 2000ms with 60 steps for smooth 60fps count-up
- Numbers display with suffix (B+, %, min) and handle decimals for uptime (99.99)
- Values show as 0 before scroll - expected behavior, animation triggers on visibility
- Placed between TrustBadges and HowItWorks - good flow from security credibility to stats to onboarding steps
- Gradient text (purple-500 to purple-700) matches brand styling used elsewhere
- Responsive grid: 2 cols mobile, 4 cols desktop - adapts cleanly
- "use client" directive required for animation state and IntersectionObserver
- Cookie consent banner adds GDPR compliance and user privacy controls
- Fixed bottom banner with Accept All / Reject All / Preferences buttons
- Preferences modal includes toggles for Essential (disabled/always on), Analytics, and Marketing cookies
- localStorage key "cookie_consent" persists user preferences
- Banner hidden on return visits after consent is saved
- setTimeout delays banner appearance by 500ms for smoother UX
- useEffect checks localStorage on mount - no banner if consent already exists
- CSS transition for smooth banner appearance (though setState is synchronous so animation handled via delay)
- Modal uses fixed position with semi-transparent overlay backdrop
- Checkboxes use native HTML inputs with accentColor styling
- Essential cookies always required and disabled (cannot be turned off)
- Save Preferences button stores custom analytics/marketing settings to localStorage
- Browser test confirmed banner appears on first visit, modal opens on Preferences click
- All quality checks pass (lint, type-check, build)

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

- Blog section adds SEO-friendly content with company updates and tutorials
- 3 sample posts: Product Update (blue), Tutorial (green), Industry (purple)
- Category tags use Tailwind color classes matching brand palette
- Section placed between Integrations and Team - good flow from tools to content to people
- Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop
- Hover effects: scale-[1.02] and shadow-xl for interactivity
- "use client" directive enables potential future interactivity (filtering, etc)
- line-clamp-2 CSS truncates long titles/excerpts elegantly
- Trust/Security badges add enterprise credibility early in the conversion funnel
- 4 badges: SOC2 Type II, ISO 27001, GDPR Compliant, Enterprise SLA
- Inline SVG icons - no external dependencies
- Color-coded badges (blue/green/purple/orange) match brand palette
- Section placed between Hero and How It Works for high visibility
- Responsive grid: 2 cols mobile, 3 tablet, 4 desktop
- hover:scale-[1.02] provides subtle interactive feedback
- Static component (no "use client" needed) - server-rendered
