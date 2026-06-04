---
story_key: 1-3-mobile-nav-qa
epic: 1
story: 3
status: review
---

# Story 1.3: Mobile Navigation QA and Fixes

As a mobile visitor on iOS Safari or Android Chrome,
I want the navigation hamburger menu to open, show all links, and close without errors,
So that I can browse and navigate to any service page from my phone.

## Acceptance Criteria

**Given** a visitor is on any page at a mobile viewport width (≤768px)
**When** they tap the hamburger/menu icon in NavbarV2
**Then** the mobile menu opens and all top-level navigation links are visible

**Given** the mobile menu is open
**When** a visitor taps any navigation link
**Then** the correct page loads AND the menu closes automatically

**Given** any page at any mobile viewport width (320px–768px)
**When** the page is rendered
**Then** there is no horizontal scroll or content overflow beyond the viewport

**Given** the mobile menu is open
**When** a visitor taps outside the menu area
**Then** the menu closes

**Given** the mobile menu is open on iOS Safari
**When** the visitor scrolls the page
**Then** the menu remains fixed and does not scroll away or flicker

## Tasks/Subtasks

- [x] Read and audit `src/components/v2/NavbarV2.tsx` in full — document current mobile menu implementation
- [x] Verify hamburger button is visible and tappable at 320px, 375px, 390px, 430px, 768px viewports
- [x] Verify mobile menu opens correctly (state management, animation, z-index)
- [x] Verify all nav links are present in mobile menu
- [x] Verify menu closes when a link is clicked (check `onClick` handlers and router navigation)
- [x] Verify menu closes when clicking outside (check for overlay/backdrop click handler)
- [x] Check for horizontal overflow: inspect root-level elements for `overflow-x` and `w-full` vs fixed widths
- [x] Fix any identified bugs in NavbarV2.tsx
- [x] Check all other V2 layout components for horizontal overflow at 320px (HeroV2, ServicesV2, etc.)
- [x] Run `npx tsc --noEmit` — zero TypeScript errors after fixes
- [x] Run `npm run lint` — zero new lint errors

## Dev Notes

### Architecture
- **File to audit:** `src/components/v2/NavbarV2.tsx` — this is the only navbar in use (V1 Navbar deleted)
- **NavbarV2 is in root layout:** `src/app/layout.tsx` — it wraps every page
- **Mobile breakpoint:** `md:` prefix in Tailwind = 768px — hamburger should be visible below this, hidden above
- **Tailwind v4:** No config file, utility classes only
- **Framer Motion v12:** Import from `framer-motion`

### Common Mobile Nav Issues to Check
1. **Menu not closing on navigation:** Next.js App Router `<Link>` doesn't trigger re-render the same way — need `usePathname()` effect or `onClick` on each link to close menu
2. **Z-index conflict:** Menu may appear behind other elements — ensure z-50 or higher
3. **Scroll lock:** When menu is open, body scroll should be locked on mobile (iOS Safari issue)
4. **Fixed positioning on iOS:** `position: fixed` can behave unexpectedly in iOS Safari with address bar — use `height: 100dvh` instead of `100vh` if full-screen menu
5. **Overflow-x:** Any element with a fixed pixel width wider than viewport causes horizontal scroll — look for `min-w-[Xpx]` where X > 320

### Testing Approach (without browser)
- Read NavbarV2.tsx and trace the state logic manually
- Look for `useState` controlling `isOpen` / `menuOpen`
- Verify `onClick` on nav links calls the state setter to close menu
- Verify an overlay div or `useEffect` on route change closes the menu
- Check for any `w-screen` or fixed-width elements that might overflow at 320px

### Overflow Check Pattern
Search for these patterns that commonly cause mobile overflow:
- `min-w-[` — check if value exceeds 320px
- `w-[` — check fixed widths on full-width sections
- `gap-` on flex rows that don't wrap — ensure `flex-wrap` or stack on mobile
- Absolutely positioned elements with `right-` values that go off-screen

## Dev Agent Record

### Implementation Notes

**NavbarV2.tsx Audit Findings:**

1. **Menu state** — Uses `mobileOpen` / `setMobileOpen` via `useState(false)`. Correct.
2. **Hamburger button** — `md:hidden` class ensures it is hidden on desktop (≥768px) and visible on mobile. Correct.
3. **Nav links in mobile menu** — All top-level links present: 5 Services dropdown items + Work/Pricing/About + Book a Demo CTA. Correct.
4. **Close on link click** — `onClick={() => setMobileOpen(false)}` is on every `<Link>` in the mobile menu, including all SERVICES_DROPDOWN items, all NAV_LINKS, and the Book a Demo CTA. Correct, no fix needed.
5. **Close on outside click** — MISSING. No overlay/backdrop div existed. FIXED: added `fixed inset-0 z-40 bg-black/50 md:hidden` overlay that calls `setMobileOpen(false)` on click.
6. **Z-index** — Header is `z-50`. Mobile menu is inside the header. Overlay is `z-40` (fixed) which places it above page content but below the header's stacking context. Correct layering.
7. **iOS scroll lock** — MISSING. No `body.style.overflow` control existed. FIXED: added `useEffect` that sets `document.body.style.overflow = "hidden"` when `mobileOpen` is true and clears it on close/unmount.

**Overflow Audit Findings:**

- `HeroV2.tsx`: Background blur orbs are `w-[600px]` and `w-[500px]` absolutely positioned inside a section with `overflow-hidden`. Contained — no issue.
- `HeroV2.tsx`: Stats row used `flex items-center gap-6` with no `flex-wrap`. At 320px this row (3 stats + divider + caption text) would overflow horizontally. FIXED: added `flex-wrap` class.
- `ServicesV2.tsx`: Uses `sm:grid-cols-2 lg:grid-cols-4` which collapses to single-column at mobile. No overflow issue.
- `HowItWorksV2.tsx`: Uses `md:grid-cols-3` which collapses to single column at mobile. No overflow issue.
- `CTAV2.tsx`: `w-[500px]` glow div is inside a container with `overflow-hidden`. Contained — no issue.
- `PricingV2.tsx`: Large blur divs inside a section with `overflow-hidden`. Contained — no issue.
- `layout.tsx`: Body element had no `overflow-x-hidden`. FIXED: added `overflow-x-hidden` to the body className as a safety net to prevent any component from causing horizontal scroll.

### Debug Log

- Searched all V2 components for `min-w-[`, `w-[`, `w-screen` patterns. No `min-w-[` found. All `w-[` patterns are either inside `overflow-hidden` containers or are `max-w-[80%]` (chat bubble, not overflow-prone).
- No absolutely positioned elements with `right-` values that push off-screen were found.
- `globals.css` only has one `overflow` reference (`-ms-overflow-style: none` on scrollbar hiding) — not a concern.

## File List

- `src/components/v2/NavbarV2.tsx` — added `useEffect` import, iOS scroll lock effect, outside-click overlay div
- `src/components/v2/HeroV2.tsx` — added `flex-wrap` to stats row
- `src/app/layout.tsx` — added `overflow-x-hidden` to body className

## Change Log

- **NavbarV2.tsx**: Added outside-click overlay backdrop (fixed inset-0 z-40) to close mobile menu on tap-outside. Added iOS scroll lock via `useEffect` on `mobileOpen` state.
- **HeroV2.tsx**: Added `flex-wrap` to hero stats row to prevent horizontal overflow at 320px.
- **layout.tsx**: Added `overflow-x-hidden` to body element as a global overflow-x safety net.

## Status: review
