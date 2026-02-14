# PLAN: SEO Expansion & Page Fixes

## Goal
Expand the Digital Helper website with targeted location, industry, and AI service pages, while optimizing existing core service pages for high-intent keywords identified in the Tri-Cities market research.

---

## Project Type
**WEB** (Next.js 16 / App Router / React 19)

---

## Success Criteria
- [ ] 4 new location pages created (`/locations/{richland,kennewick,pasco,west-richland}`)
- [ ] 5 new industry pages created (`/industries/{healthcare,manufacturing,agriculture,retail-ecommerce,wineries}`)
- [ ] 5 new sub-service pages created (`/services/seo/{local-seo,google-business-profile}`, `/services/ai-automation/{chatbots,voice-ai,workflow-automation}`)
- [ ] Primary service pages (`/services/{web-design,seo,ai-automation,lead-generation,reputation-management}`) updated to follow the template in `BUSINESS.md`
- [ ] Homepage optimized for "web design richland wa" and "digital marketing tri cities"
- [ ] All pages pass Lighthouse SEO (90+) and Accessibility (WCAG AA) audits
- [ ] Schema markup (LocalBusiness, Service, FAQ) correctly implemented on all new/updated pages

---

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui, Radix UI, Framer Motion
- **Icons**: Lucide React
- **AI**: Gemini (via Vercel AI SDK / Server Actions)
- **Validation**: Zod

---

## Task Breakdown

### Phase 1: Foundation & SEO Setup
- [ ] **Task 1.1**: Define shared layout components for Industries and Locations using `ServicePageLayout` logic.
    - Agent: `frontend-specialist`
    - Input: `BUSINESS.md`, `src/components/services/ServicePageLayout.tsx`
    - Output: `src/components/locations/LocationPageLayout.tsx`, `src/components/industries/IndustryPageLayout.tsx`
    - Verify: Consistent look and feel across navigation.
- [ ] **Task 1.2**: Update Sitemap and Metadata utilities to handle new slugs.
    - Agent: `seo-specialist`
    - Verify: `sitemap.xml` includes new routes.

### Phase 2: Core Page Fixes (Optimization)
- [ ] **Task 2.1**: Optimize Homepage (`src/app/page.tsx`) and Hero component with target keywords.
    - Agent: `frontend-specialist`
    - Verify: Page title and h1 match `BUSINESS.md` strategy.
- [ ] **Task 2.2**: Update existing Service Pages to follow the 9-part template in `BUSINESS.md`.
    - Agent: `frontend-specialist` / `seo-specialist`
    - Files: `service/{web-design,seo,ai-automation,lead-generation,reputation-management}/page.tsx`
    - Verify: All sections (Pain Points, Process, FAQ, etc.) are present and high-quality.

### Phase 3: Location & Industry Pages
- [ ] **Task 3.1**: Create Location pages for Richland, Kennewick, Pasco, and West Richland.
    - Agent: `frontend-specialist`
    - Verify: Unique geographic content for each city ( landmarks, market stats from research).
- [ ] **Task 3.2**: Create Industry pages for Healthcare, Manufacturing, Agriculture, Retail, and Wineries.
    - Agent: `frontend-specialist` / `seo-specialist`
    - Verify: Industry-specific pain points and solutions defined in `BUSINESS.md`.

### Phase 4: AI Service Deep-Dives
- [ ] **Task 4.1**: Create/Update specific AI service pages (Chatbots, Voice AI, Workflows).
    - Agent: `frontend-specialist`
    - Verify: Content highlights ROI and specific use cases (e.g., n8n, 24/7 lead capture).

---

## Phase X: Verification

### Automated Checks
```bash
# 1. Lint & Type Check
npm run lint && npx tsc --noEmit

# 2. Security Scan
python .agent/skills/vulnerability-scanner/scripts/security_scan.py .

# 3. UX Audit (Critical for new designs)
python .agent/skills/frontend-design/scripts/ux_audit.py .

# 4. Lighthouse Performance & SEO
# (Requires dev server running)
# python .agent/skills/performance-profiling/scripts/lighthouse_audit.py http://localhost:3000
```

### Manual Verification
- [ ] Check mobile responsiveness on all 15+ new/updated pages.
- [ ] Verify internal linking structure (Navbar dropdowns, Footer links, upsell paths).
- [ ] Test Contact form and booking widget integration on new pages.
- [ ] Validate Schema markup using Rich Results Test (manual).

---

## ✅ Phase X COMPLETE
- [ ] Status: Pending Implementation
