# Feature: Cookie Consent Banner

## Description
Add a cookie consent banner at the bottom of the page that allows users to accept or reject non-essential cookies, with preference persistence.

## Business Requirement
Ensure GDPR/compliance with cookie consent requirements while providing a good user experience. Users should be able to manage their cookie preferences.

## Business Goal
Build trust through transparency and comply with privacy regulations without blocking essential functionality.

## In-Scope
- Fixed bottom banner with cookie policy notice
- "Accept All" and "Reject All" buttons
- "Preferences" link for granular control
- Preferences modal with toggle switches (Essential, Analytics, Marketing)
- localStorage persistence for user consent
- Smooth fade-in animation on first visit
- No banner shown if user already consented

## Out-of-Scope
- Cookie scanning/auto-detection
- Cookie policy detailed page
- Consent history/log

## Technical Details
- "use client" directive for localStorage and UI interaction
- useState for modal open/close state
- useState for consent preferences (analytics, marketing toggles)
- useEffect for checking localStorage on mount
- Fixed position at bottom with z-index
- CSS transition for fade in/out
- localStorage key: "cookie_consent"

## Implementation Plan
1. Create CookieConsent component in /src/components/CookieConsent.tsx
2. Add to page.tsx before EnhancedFooter
3. Test banner appears on first visit
4. Test preferences modal functionality
5. Test localStorage persistence

## Acceptance Criteria
- [ ] Banner appears on first visit (no localStorage)
- [ ] Accept All saves full consent and hides banner
- [ ] Reject All saves minimal consent and hides banner
- [ ] Preferences button opens modal with toggles
- [ ] Saving preferences hides banner
- [ ] Banner does NOT appear on return visits after consent
- [ ] Lint passes
- [ ] Type-check passes
- [ ] Build passes
