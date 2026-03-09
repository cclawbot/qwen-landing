# Feature SPEC: SEO Optimization

## Feature Name
SEO Optimization

## Business Requirement
Add comprehensive SEO meta tags, OpenGraph tags, Twitter cards, and structured data to improve search visibility and social sharing.

## Business Goal Alignment
- Improve organic search rankings with proper meta tags
- Enable rich social previews when links are shared
- Enhance credibility with structured data
- Zero external dependencies (native Next.js SEO)

## In-Scope
- OpenGraph meta tags (og:title, og:description, og:image, og:url, og:type)
- Twitter Card meta tags (twitter:card, twitter:site, twitter:title, twitter:description, twitter:image)
- JSON-LD structured data for Organization and FAQ
- Canonical URL
- Theme-color meta tag
- Favicon and apple-touch-icon
- Robots meta tag

## Out-of-Scope
- Sitemap.xml generation
- robots.txt
- RSS feed
- Blog/Article structured data (no blog yet)
- Schema markup beyond Organization/FAQ

## Technical Details

### Implementation Approach
1. Update layout.tsx with comprehensive metadata
2. Add JSON-LD structured data script
3. Create or update favicon files in public/
4. Verify with browser devtools

### File Changes
```
src/app/layout.tsx - Add SEO metadata and JSON-LD
public/ - Add og-image.png, favicon.ico (if missing)
```

### Metadata Structure
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://qwenresell.com'),
  title: {
    default: 'QwenResell | Enterprise Qwen API Tokens',
    template: '%s | QwenResell'
  },
  description: '...',
  keywords: ['Qwen API', 'AI tokens', 'LLM pricing', 'Alibaba Qwen', ...],
  authors: [{ name: 'QwenResell' }],
  creator: 'QwenResell',
  publisher: 'QwenResell',
  robots: { index: true, follow: true },
  openGraph: { ... },
  twitter: { ... },
  alternates: { canonical: 'https://qwenresell.com' },
  verification: { ... },
};
```

## Implementation Plan

### Phase 1: Metadata (15 min)
1. Update layout.tsx with full metadata
2. Add OpenGraph tags
3. Add Twitter Card tags

### Phase 2: Structured Data (10 min)
1. Add Organization JSON-LD
2. Add FAQ schema (from FAQ component)

### Phase 3: Assets (5 min)
1. Verify/create og-image.png
2. Verify/create favicon.ico

### Phase 4: Verification (5 min)
1. Run build to verify no errors
2. Browser test - view page source

## Acceptance Criteria
- [ ] OpenGraph tags render correctly in page source
- [ ] Twitter Card tags render correctly
- [ ] JSON-LD structured data is valid (validate with schema.org)
- [ ] Canonical URL is set
- [ ] Favicon loads without 404
- [ ] og:image shows when link shared on social
- [ ] Build passes with no errors
