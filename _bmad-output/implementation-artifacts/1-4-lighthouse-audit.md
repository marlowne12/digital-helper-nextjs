---
story_key: 1-4-lighthouse-audit
epic: 1
story: 4
status: ready-for-dev
---

# Story 1.4: Lighthouse Audit and Performance Fixes

As the site owner,
I want documented Lighthouse scores on all key pages with any sub-70 issues fixed,
So that the site meets minimum performance standards before launch and ranks competitively in search.

## Acceptance Criteria

**Given** the dev server is running at http://localhost:3000
**When** Lighthouse is run on homepage and 3 key service pages
**Then** scores for Performance, Accessibility, Best Practices, and SEO are recorded

**Given** any page scores below 70 on Performance
**When** the Lighthouse report identifies root causes
**Then** targeted fixes are applied (LCP image priority, CLS-causing elements, etc.)

**Given** fixes are applied
**When** Lighthouse is re-run
**Then** all pages score ≥80 mobile Performance, ≥90 desktop Performance

**Given** audit is complete
**When** results are final
**Then** `lighthouse-report.json` is updated and `docs/WEBSITE-IMPROVEMENTS.md` P4-002 is marked `[x]`

## Tasks/Subtasks

- [ ] Start dev server: `npm run dev` in project root
- [ ] Run Lighthouse on homepage (`/`) — record scores
- [ ] Run Lighthouse on `/services/ai-automation` — record scores
- [ ] Run Lighthouse on `/services/web-design` — record scores
- [ ] Run Lighthouse on `/services/seo` — record scores
- [ ] Document all scores in a results table
- [ ] Identify any scores below 70 and their root causes from the report
- [ ] Apply fixes for sub-70 scores (prioritize LCP, CLS, accessibility)
- [ ] Re-run Lighthouse to verify fixes — confirm ≥80 mobile, ≥90 desktop
- [ ] Update `lighthouse-report.json` with final scores
- [ ] Mark `P4-002` as `[x]` in `docs/WEBSITE-IMPROVEMENTS.md`
- [ ] Run `npx tsc --noEmit` — zero errors
- [ ] Run `npm run lint` — zero new errors

## Dev Notes

### Lighthouse Commands
```bash
# Run dev server first (separate terminal)
npm run dev

# Then run Lighthouse (headless Chrome)
npx lighthouse http://localhost:3000 --output json --output-path ./lighthouse-report.json --chrome-flags="--headless --no-sandbox"

npx lighthouse http://localhost:3000/services/ai-automation --output json --chrome-flags="--headless --no-sandbox"

npx lighthouse http://localhost:3000/services/web-design --output json --chrome-flags="--headless --no-sandbox"

npx lighthouse http://localhost:3000/services/seo --output json --chrome-flags="--headless --no-sandbox"
```

### Targets
- Mobile Performance: ≥80
- Desktop Performance: ≥90
- Accessibility: ≥90 (fix anything flagged)
- SEO: ≥90 (should already be high given schema work done)

### Common Fixes

**LCP (Largest Contentful Paint) — most common issue:**
- Find the hero `<Image>` in `src/components/v2/HeroV2.tsx`
- Add `priority` prop: `<Image priority ...>`
- This preloads the hero image and eliminates LCP delay

**CLS (Cumulative Layout Shift):**
- All `<Image>` components must have explicit `width` and `height` props
- Or use `fill` prop with a sized parent container
- Avoid inserting content above the fold after page load

**Accessibility:**
- All interactive elements need `aria-label` if no visible text
- Color contrast: indigo-600 on dark bg — check Lighthouse flagged elements
- Form inputs need associated `<label>` elements

**Best Practices:**
- Usually auto-passes if no console errors — check browser console on each page

### Architecture Notes
- **Next.js Image component:** Always use `next/image` `<Image>` — never `<img>`
- **Tailwind v4:** No config file, add any new CSS to `globals.css` via `@theme`
- **Dark bg:** `bg-[#0a0a0f]` — check contrast ratios against this for accessibility

### Previous Lighthouse Report
Existing `lighthouse-report.json` in project root has baseline scores — compare before/after.

## Dev Agent Record

### Implementation Notes
(agent fills this in)

### Debug Log
(agent fills this in)

## File List

(agent fills in all modified files)

## Change Log

(agent fills in summary)

## Status: ready-for-dev
