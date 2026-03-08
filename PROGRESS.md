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
1. Add dark/light mode toggle (DONE)
2. Add live pricing API integration
3. Add analytics
4. Add multi-language support (i18n)

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
