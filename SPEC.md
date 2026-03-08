# Feature Spec: Dark/Light Mode Toggle

## Feature Name
Dark/Light Mode Toggle - Theme Switcher

## Business Requirement
Add a theme toggle button in the navigation header that allows users to switch between dark mode (default) and light mode. The preference should persist across sessions using localStorage.

## Business Goal Alignment
- **Primary Goal**: Improve user experience by offering theme preference
- **Secondary Goal**: Modern, polished look that adapts to system preferences
- **Success Metric**: Users who engage with theme toggle have longer session times

## In-Scope
- Toggle button in navigation header (sun/moon icons)
- Smooth transition between themes
- Persist preference in localStorage
- Respect system preference on first visit (prefers-color-scheme)
- Light mode with proper contrast and readability
- Mobile-responsive (same toggle works on all screen sizes)

## Out-of-Scope
- Color scheme customization beyond dark/light
- OS-level theme sync after initial load
- Server-side rendering of theme (client-only is fine)

## Technical Details

### Component Structure
- New component: `ThemeToggle.tsx` in `src/components/`
- Uses React context or local state for theme management
- "use client" directive required for interactivity

### State Management
- Store theme in localStorage key: "theme" (value: "dark" | "light")
- Check system preference as fallback: window.matchMedia("(prefers-color-scheme: light)")

### Styling Approach
- Use Tailwind's `dark:` variant with class-based dark mode
- Configure Tailwind for class-based dark mode in globals.css
- Light mode: bg-gray-50, text-gray-900 for main content areas
- Smooth 300ms transition on background-color and color

### Dark Mode (Default)
- bg-[#030712] (current dark background)
- text-white / text-gray-300

### Light Mode
- bg-gray-50 / bg-white
- text-gray-900 / text-gray-700
- Adjusted card backgrounds with subtle shadows

## Implementation Plan

### Step 1: Configure Tailwind for Class-based Dark Mode
- Update globals.css to enable class strategy
- Add CSS variables for theme colors

### Step 2: Create ThemeToggle Component
- Create `src/components/ThemeToggle.tsx`
- Implement useState for theme (default: undefined/null = system)
- Add toggle function that switches dark/light
- Add localStorage persistence
- Render sun icon (light mode) / moon icon (dark mode)

### Step 3: Add Theme Script to Layout
- Add script to layout.tsx to prevent flash of wrong theme
- Read localStorage or system preference before React hydrates

### Step 4: Add Toggle to Navigation
- Import ThemeToggle in page.tsx
- Add to nav bar, right side

### Step 5: Test & Verify
- Run lint, type-check, build
- Browser snapshot test

## Acceptance Criteria
- [ ] Toggle button appears in navigation header
- [ ] Clicking toggle switches between dark and light mode
- [ ] Theme persists across page refreshes (localStorage)
- [ ] First visit respects system color scheme preference
- [ ] No flash of unstyled content on page load
- [ ] Light mode is readable with proper contrast
- [ ] Smooth transition between themes (no jarring changes)
- [ ] Mobile responsive - toggle visible on all screen sizes
- [ ] Lint, type-check, build all pass
