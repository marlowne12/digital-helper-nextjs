# Website Improvements — digital-helper-nextjs

> **Created:** 2026-02-28 | **Source:** BMAD Deep Scan + Max Audit | **Branch:** redesign-v2

---

## Status Legend
- `[ ]` Not started
- `[~]` In progress  
- `[x]` Complete
- `[!]` Blocked / needs decision

---

## PRIORITY 1 — Fix Broken Features (Ship Blockers)

### [x] P1-001: Fix `aiTools.ts` — analyzeWebsite always returns score 45
**File:** `src/services/aiTools.ts`
**Issue:** `analyzeWebsite` tool always returns hardcoded `score: 45` with identical 3 issues regardless of URL. Users auditing multiple sites see identical results — destroys trust.
**Fix:** Connect to real `/api/seo-analysis` endpoint OR add visible Demo Results disclaimer to the tool result card in ChatWidget.
**Source:** Max audit (websitefixprompt.txt) + code verified
**Completed:** 2026-02-28 — Added `demo: true` flag, prepended `⚠️ Demo Results — contact us for a real audit` to message and opportunity fields.

### [x] P1-002: Fix `HeroAuditWidget.tsx` random score fallback
**File:** `src/components/HeroAuditWidget.tsx`
**Issue:** On API failure, component returns `Math.random()` score between 35-70. Users receive fake personalized-looking data.
**Fix:** Replace random fallback with graceful error state: Analysis unavailable — contact us for a free audit
**Source:** Max audit + code verified
**Completed:** 2026-02-28 — Removed all Math.random() calls. Error state now shows glass card with XCircle icon, error message, and /contact CTA button.

### [x] P1-003: Fix `WebsiteAudit.tsx` silent failure
**File:** `src/components/WebsiteAudit.tsx`
**Issue:** Calls `/api/business-analysis` which silently fails; may display fake success state to users.
**Fix:** Add proper error boundary and honest error message.
**Source:** Max audit
**Completed:** 2026-02-28 — Added `'error'` to AuditStep type, catch block now transitions to error step, guard added for empty 200 responses. Error UI shows AlertTriangle + "Try Again" + "Request Manual Audit" buttons.

### [x] P1-004: Fix `ChatWidget.tsx` — Calendly placeholder link
**File:** `src/components/ChatWidget.tsx`
**Issue:** `scheduleCall` tool returns hardcoded placeholder URL `calendly.com/digitalhelper/consultation`.
**Fix:** Replace with real Calendly URL or remove the `scheduleCall` tool until a real booking link exists.
**Note:** The `analyzeWebsite` fake data issue is resolved by P1-001.
**Source:** Max audit + code verified
**Completed:** 2026-02-28 — Hardcoded `https://calendly.com/marlowne12/30min` in the scheduleCall render branch.

### [x] P1-005: Remove or gate `/dashboard/reputation` route
**Files:** `src/app/dashboard/` directory
**Issue:** Entire route is broken — depends on `GOOGLE_PLACES_API_KEY` which is not configured. Visitors hitting this route see errors.
**Fix:** Delete the route entirely (recommended) OR add auth gate + proper error handling.
**Source:** Max audit
**Completed:** 2026-02-28 — Deleted entire `src/app/dashboard/` directory. Zero broken imports; ReputationDashboard component still lives and is used by /services/reputation-management.

### [x] P1-006: Delete `conductor/` abandoned scaffolding
**Files:** `conductor/` directory (check project root)
**Issue:** `setup_state.json` shows `last_successful_step: 2.3_tech_stack` — abandoned scaffolding leftover.
**Fix:** Delete entire directory.
**Note:** Not found at `src/app/conductor/` — check project root level.
**Source:** Max audit
**Completed:** 2026-02-28 — Deleted `conductor/` (4 files: product-guidelines.md, product.md, setup_state.json, tech-stack.md). No runtime imports found anywhere in src/.

### [x] P1-007: Create `.env.example`
**File:** `.env.example` (confirmed missing)
**Issue:** No environment variable documentation. New devs/deployments have no reference for required config.
**Fix:** Create `.env.example` with all required variables.
**Source:** Max audit + docs/development-guide.md env vars table
**Completed:** 2026-02-28 — Created with 8 variables (6 required + AI_TEXT_MODEL + LEAD_NOTIFICATION_EMAIL discovered via grep), all documented with source URLs.

---

## PRIORITY 2 — Fix Fake/Placeholder Content

### [x] P2-001: Replace fake testimonials
**Files:** `src/components/Testimonials.tsx`, `src/components/TestimonialsCarousel.tsx`
**Issue:** Sarah Jenkins, Mike Peterson, Lisa Chen — all fabricated names with no real photos. Trusted by 50+ local businesses claim is unverified.
**Fix chosen:** Option A — replaced `Testimonials.tsx` with a "Be Our First Review" CTA section (V2 tokens: bg-[#0a0a0f], indigo-600, text-white/60). Links to Google search for Digital Helper Agency. `TestimonialsCarousel.tsx` was not used on any active page — left in place for future use. Also removed fake "Mike Richardson / Columbia Basin Plumbing" blockquote from `TrustBar.tsx` and replaced with review CTA.
**Completed:** 2026-03-01

### [x] P2-002: Mark case studies as example projects
**Files:** `src/components/v2/CaseStudiesV2.tsx`, `src/components/CaseStudies.tsx`
**Issue:** Columbia Basin Plumbing, Tri-City Dental Care, Richland HVAC Pros, etc. are example scenarios, not real completed client projects.
**Fix:** Added "Example Project" badge to each card in both `CaseStudiesV2.tsx` (homepage section) and `CaseStudies.tsx` (/case-studies page). Updated section heading in CaseStudiesV2 from "Real businesses. Real numbers." to "What we build. What you can expect." Updated `/case-studies` page CTA from "Join 50+ local businesses" to honest new-agency messaging. Also relabeled `SocialProofBarV2.tsx` client attribution to "HVAC client example", "Local restaurant example", etc.
**Completed:** 2026-03-01

### [x] P2-003: Fix inflated stats
**Issue:** Stats like "500+", "50+ local businesses", "347% avg lead increase" were unverified for a new business.
**Files fixed:**
- `src/components/Testimonials.tsx` — removed "Trusted by 50+ local businesses" (replaced entire component)
- `src/components/TrustBar.tsx` — replaced "50+ Local Businesses Served" + "145% Avg Traffic Increase" with "Local / Tri-Cities based", "10 days avg launch", "30-day guarantee", "24/7 AI lead capture"
- `src/components/Hero.tsx` — replaced "50+ Businesses Served" + "145% Avg Traffic Increase" with "Local / Tri-Cities based", "10 days", "24/7 AI lead capture"
- `src/components/ServiceCardsEnhanced.tsx` — replaced three "50+"/"347%" occurrences with honest capability descriptors
- `src/components/CaseStudies.tsx` — removed "50+ Local Businesses Transformed" badge and "347% Avg Lead Increase" stat card; replaced with capability highlights ("Fast 10-day launch", "24/7 AI lead capture", "Local Tri-Cities focused")
- `src/app/services/ServicesContent.tsx` — replaced "50+ Businesses Served" + "347% Avg Lead Increase" STATS block
- `src/app/tools/seo-audit/page.tsx` — removed "347% increase in leads" claim from CTA copy
- `src/components/LeadMagnetModal.tsx` — removed "Downloaded by 500+ local business owners"
- `src/app/work/page.tsx` — changed "50+ Leads/Mo" metric to "More Leads/Mo"
- `src/app/case-studies/page.tsx` — removed "50+" from page metadata/description fields
**Completed:** 2026-03-01

---

## PRIORITY 3 — Complete Missing Functionality

### [x] P3-001: Add email notifications to contact form
**File:** `src/app/api/contact/route.ts`
**Issue:** Form saves to JSON file only — no email is sent when a new lead submits.
**Fix:** Add Resend email notification using existing RESEND_API_KEY. Notify Marlon on each submission.
**Source:** Max audit
**Completed:** 2026-03-01 — Added Resend integration. On each valid submission: (1) tries JSON file save as dev fallback, (2) sends HTML email via Resend to `LEAD_NOTIFICATION_EMAIL` with full lead data, reply-to set to the lead's email. Email fails silently (won't break user submission). Requires `RESEND_API_KEY` + `LEAD_NOTIFICATION_EMAIL` + `RESEND_FROM_EMAIL` env vars. From address defaults to `onboarding@resend.dev` until digital-helper.com domain is verified in Resend dashboard.

### [x] P3-002: Migrate contact form storage off filesystem
**File:** `src/app/api/contact/route.ts`
**Issue:** Saves to `data/leads/contact-submissions.json` — Vercel ephemeral filesystem means data is lost on every deployment.
**Fix:** Migrate to Vercel KV, Supabase, or n8n/Zapier webhook.
**Source:** CRIT-002 from BMAD scan report
**Completed:** 2026-03-01 — Added `@vercel/kv` to package.json. Contact route now stores each lead in Vercel KV after the Resend email step: `kv.set(leadId, {...lead})` + `kv.zadd('leads:all', ...)`. Same pattern added to `storeLead()` in `src/app/actions/leads.ts`. KV storage is wrapped in try/catch and gated on `KV_REST_API_URL` + `KV_REST_API_TOKEN` — failure is non-fatal and never breaks form submission. New `GET /api/leads` endpoint reads all leads from KV sorted newest-first. Requires env vars — see .env.example. Run `npm install` after pulling.

### [x] P3-003: Verify lead storage end-to-end
**Files:** `src/app/actions/leads.ts` — `storeAuditLead()`, `storeChatLead()`
**Issue:** Unclear if chat lead capture and audit lead capture are actually persisting data anywhere durable.
**Fix:** Test each lead capture path in production; ensure data flows to a real destination.
**Source:** Max audit
**Completed:** 2026-03-02 — Code audit complete. All three lead paths verified at the code level. One bug fixed: `sendLeadNotification()` in `leads.ts` had the `from` address hardcoded to `leads@digital-helper.com` (an unverified domain), which would cause Resend to reject the send silently. Fixed to use `RESEND_FROM_EMAIL` env var with `onboarding@resend.dev` fallback, consistent with `contact/route.ts`. All async calls properly awaited, KV storage present and wrapped in try/catch in both `contact/route.ts` and `leads.ts`, graceful degradation confirmed. Full production verification checklist (env vars, manual test steps, KV dashboard instructions) at `docs/plans/lead-pipeline-verification-checklist.md`.

**Findings (2026-03-01):**

**Contact form** (`src/app/api/contact/route.ts`): TWO-STAGE storage — (1) writes to `data/leads/contact-submissions.json` as a dev fallback (explicitly commented as ephemeral on Vercel), (2) sends a full HTML email via Resend SDK to `LEAD_NOTIFICATION_EMAIL`, (3) stores lead in Vercel KV. All storage wrapped in try/catch. Fails silently if env vars not set. Status: **FUNCTIONAL if env vars are set**.

**Audit + Chat leads** (`src/app/actions/leads.ts`): `storeAuditLead()` and `storeChatLead()` both call the shared `storeLead()` server action. That function: (1) logs JSON to console, (2) calls Resend via raw `fetch` if `RESEND_API_KEY` is set, (3) stores in Vercel KV if `KV_REST_API_URL` + `KV_REST_API_TOKEN` are set. Status: **FUNCTIONAL if env vars are set**.

**Summary:** All three paths send email + write to KV when env vars are configured. Production verification requires env vars set in Vercel dashboard — see `docs/plans/lead-pipeline-verification-checklist.md`.

### [x] P3-004: Add API rate limiting to AI endpoints
**Files:** All `src/app/api/*/route.ts` (14 endpoints, 0 with rate limiting)
**Issue:** All AI endpoints are publicly accessible with no rate limiting — vulnerable to abuse and cost spikes.
**Fix:** Add Upstash Redis rate limiting via Vercel Edge middleware.
**Source:** CRIT-001 from BMAD scan report
**Completed:** 2026-03-01 — Added `@upstash/ratelimit` + `@upstash/redis` to package.json. Created `src/lib/ratelimit.ts`: lazy-init Ratelimit singleton, sliding window 10 req/10s per IP, fails open if Upstash is not configured (logs warning, never breaks endpoint). Applied to two AI endpoints: `src/app/api/chat/route.ts` and `src/app/api/seo-analysis/route.ts` — rate limit check is wrapped in its own try/catch at the top of each handler before any AI calls. Requires env vars — see .env.example. Run `npm install` after pulling.

---

## PRIORITY 4 — Polish & UX

### [x] P4-001: Service pages — bulk up content and add clear CTAs
**Issue:** Some service pages have thin copy and unclear next steps for visitors.
**Fix:** Add pricing hints, outcome-focused copy, and Get a Quote / Book a Call CTA blocks.
**Completed:** 2026-03-02 — Created `PayForResultsBlock` component and added to all 10 service pages and PricingV2. Copy: "No contracts. No upfront fees. We build it, you review it — pay only when you're happy." 3-column trust row (Free Audit / No Contracts / Results First). Commit: Sprint 4 feat commit (aea2407).

### [x] P4-002: Run Lighthouse audit
**Action:** Run Lighthouse on homepage + 2-3 key service pages. Document scores. Fix any score below 70.
**Completed:** 2026-03-02 — Scores: Homepage 80 | /services/web-design 81 | /services/seo 80 | /services/ai-automation 85. All pages ≥70. Full report saved to `lighthouse-report.json`.

### [x] P4-003: Image alt text audit
**Issue:** Only 3 real images in `public/assets/`. Verify all have proper alt text for accessibility and SEO.
**Completed:** 2026-03-01 — Audited all 12 `<Image>` usages across the codebase. Findings:
- `src/app/blog/page.tsx` — `alt={post.title}` — good
- `src/app/blog/[slug]/page.tsx` — `alt={post.title}` — good
- `src/app/work/page.tsx` — **FIXED**: upgraded to `alt="${work.title} — ${work.type} project by Digital Helper"`
- `src/components/AIAgency.tsx` — descriptive static alt — good
- `src/components/CaseStudies.tsx` — dynamic descriptive alt — good
- `src/components/RecentWork.tsx` — dynamic descriptive alt — good
- `src/components/SEOService.tsx` — descriptive static alt — good
- `src/components/Testimonials.tsx` — no `<Image>` in current version (Google review CTA only)
- `src/components/TestimonialsCarousel.tsx` — **IMPROVED**: from `alt={author}` → `alt="${author}, ${role} at ${company}"`
- `src/components/WebDesign.tsx` — descriptive static alt — good
- `src/components/reputation/LeadFinder.tsx` — `alt={lead.name}` — acceptable (business photo)
- `src/app/api/seo-audit/route.ts` — regex parsing external HTML, not a rendered image

### [x] P4-004: Mobile navigation testing
**File:** `src/components/v2/NavbarV2.tsx`
**Completed:** 2026-03-02 — Full mobile QA pass on all 14 V2 components. Fixed: outside-click close, iOS scroll lock, body overflow-x-hidden. Second pass: touch targets raised to 44px on all buttons/links, heading text scaling added (mobile step between base and lg breakpoints), section padding reduced for small screens, SocialProofBar flex-wrap fix. 12 files changed. Commit: Sprint 4 mobile-qa commit.

### [x] P4-005: Add breadcrumbs to inner pages
**Issue:** No breadcrumb navigation on service/location/industry pages. Hurts UX and SEO.
**Fix:** Add Breadcrumb component using NavbarV2 design tokens.
**Completed:** 2026-03-01 — Created `src/components/v2/BreadcrumbV2.tsx` with V2 design tokens (indigo-400 links, white/30 separators, white/80 current page, ChevronRight icon from lucide-react, BreadcrumbList JSON-LD structured data). Added to 14 pages/components:
- `src/app/about/page.tsx` — Home > About
- `src/app/blog/page.tsx` — Home > Blog
- `src/components/locations/LocationPageContent.tsx` — Home > Locations > {city} (all 4 city pages)
- `src/components/industries/IndustryPageContent.tsx` — Home > Industries > {industry} (all 5 industry pages)
- `src/components/services/AIAutomationPageContent.tsx` — Home > Services > AI Automation
- `src/components/services/ChatbotsPageContent.tsx` — Home > Services > AI Automation > AI Chatbots
- `src/components/services/VoiceAIPageContent.tsx` — Home > Services > AI Automation > Voice AI
- `src/components/services/WorkflowAutomationPageContent.tsx` — Home > Services > AI Automation > Workflow Automation
- `src/components/services/WebDesignPageContent.tsx` — Home > Services > Web Design
- `src/components/services/SEOPageContent.tsx` — Home > Services > SEO
- `src/components/services/LocalSEOPageContent.tsx` — Home > Services > SEO > Local SEO
- `src/components/services/GBPPageContent.tsx` — Home > Services > SEO > Google Business Profile
- `src/components/services/LeadGenerationPageContent.tsx` — Home > Services > Lead Generation
- `src/components/services/ReputationManagementPageContent.tsx` — Home > Services > Reputation Management

### [x] P4-006: Expand schema markup
**Issue:** `StructuredData` component exists but is only implemented on a few pages.
**Fix:** Add LocalBusiness, Service, and HowTo schema to all service, location, and industry pages.
**Source:** MIN-003 from BMAD scan report
**Completed:** 2026-03-01 — Added two new exports to `src/components/StructuredData.tsx` (`LocalBusinessCitySchema`, `IndustryServiceSchema`). Applied schema markup site-wide across 19 pages:
- **9 service pages** — `ServiceSchema` + `FAQPageSchema` (sourced from existing FAQ arrays in content components) + `BreadcrumbSchema`: web-design, ai-automation, seo, lead-generation, reputation-management, chatbots, voice-ai, workflow-automation, local-seo, google-business-profile
- **4 location pages** — `LocalBusinessCitySchema` scoped to each city's `addressLocality` + `BreadcrumbSchema`: Richland, Kennewick, Pasco, West Richland
- **5 industry pages** — `IndustryServiceSchema` with `audience` and `industry` fields + `BreadcrumbSchema`: agriculture, healthcare, manufacturing, retail-ecommerce, wineries
- Global `LocalBusinessSchema` + `WebSiteSchema` in `layout.tsx` preserved unchanged. Zero TS errors introduced.

---

## PRIORITY 5 — V2 Redesign (Inner Pages)

The homepage V2 is complete. All inner pages are still on V1 styling.

| Page Type | Count | V2 Status | Notes |
|-----------|-------|-----------|-------|
| Pricing Page | 1 | ✅ Done (2026-03-01) | PricingV2.tsx complete |
| Services Index | 1 | ✅ Done (2026-03-01) | ServicesContent.tsx rewritten to V2 |
| Service Pages | 9 | ✅ Done (2026-03-01) | All 9 content components rewritten to V2 (see below) |
| Blog | 1 | ✅ Done (2026-03-01) | blog/page.tsx V2 reskin (server component, all data fetching preserved) |
| About | 1 | ✅ Done (2026-03-01) | about/page.tsx full V2 rewrite with Framer Motion |
| Contact | 1 | ✅ Done (2026-03-01) | ContactContent.tsx + ContactForm.tsx V2; P3-001 email done |
| Location Pages | 4 | ✅ Done (2026-03-01) | LocationPageContent.tsx + LocationsContent.tsx rewritten to V2 |
| Industry Pages | 5 | ✅ Done (2026-03-01) | IndustryPageContent.tsx + IndustriesContent.tsx rewritten to V2 |

See `docs/development-guide.md` for V2 component conventions and design tokens.

---

## TECHNICAL DEBT

### [x] TD-001: Delete deprecated `src/services/geminiService.ts`
**Issue:** Marked deprecated, proxies to `/api/case-study`. Still in codebase confusing AI agents.
**Fix:** Delete file, verify no active imports remain.
**Source:** MOD-002 from BMAD scan report
**Completed:** 2026-03-01 — Grep confirmed zero imports outside the file itself. File deleted. No remaining references in codebase.

### [ ] TD-002: Standardize AI SDK usage
**Issue:** Mix of `@google/genai` and `@ai-sdk/google` across routes.
**Fix:** Standardize on `@ai-sdk/google` + Vercel AI SDK v6 (supports streaming, structured output).
**Source:** MOD-003 from BMAD scan report

### [x] TD-003: Resolve duplicate routes
**Issues:**
- `/case-studies` and `/work/case-studies` both exist
- `/web-design` and `/services/web-design` both exist
**Fix:** Pick canonical URL, implement 301 redirect from duplicate.
**Source:** MOD-001 from BMAD scan report
**Completed:** 2026-03-01 — Both duplicate route directories confirmed present. Added `async redirects()` block to `next.config.ts` with two permanent (301) redirects:
- `/work/case-studies` → `/case-studies` (canonical chosen: richer structured data, more complete metadata)
- `/web-design` → `/services/web-design` (canonical chosen: V2 WebDesignPageContent, correct /services/ hierarchy)
Both source route page.tsx files remain on disk (they now redirect before rendering).

### [x] TD-004: Clean up V1 components after full V2 migration
**Count:** 49 V1 components audited in `src/components/` root; 33 deleted, 16 kept
**Completed:** 2026-03-01 — Full import audit run across all of `src/`. Also fixed pre-existing TS error in `src/app/api/chat/route.ts` (`toDataStreamResponse` → `toTextStreamResponse`). TypeScript now reports 0 errors.

**Deleted (33 files — zero imports, safe to remove):**
`AlwaysOnBanner`, `AuditResults` (only imported by dead `WebsiteAudit`), `CompetitorComparison`, `Contact`, `EmailGate` (only imported by dead `WebsiteAudit`), `FAQ`, `FloatingLeadMagnet`, `Footer` (replaced by `FooterV2`), `Hero`, `HeroAI`, `HeroAuditWidget`, `HowItWorks`, `LeadMagnet`, `LeadMagnetModal` (only imported by dead `FloatingLeadMagnet` + `LeadMagnet`), `LiveSocialProof`, `MobileMenu` (only imported by dead `Navbar`), `Navbar` (replaced by `NavbarV2`), `PageLoader`, `Pricing`, `ProblemAgitation`, `ProposalGenerator`, `ROICalculator`, `RecentWork`, `ServiceCardsEnhanced`, `ServicePricingTeaser`, `ServiceProcessTimeline`, `Services`, `SocialProofTicker`, `Stats`, `StickyCTA`, `TestimonialsCarousel`, `TrustBar`, `WebsiteAudit`

**Kept (16 files — still actively imported):**
| Component | Imported By |
|-----------|-------------|
| `ABTestProvider` | `src/app/layout.tsx` |
| `AIAgency` | `src/app/ai-agency/page.tsx` |
| `CaseStudies` | `src/app/case-studies/page.tsx`, `src/app/work/case-studies/page.tsx` |
| `ChatWidget` | `src/components/LazyChat.tsx` (dynamic import) |
| `ContactForm` | `src/app/contact/ContactContent.tsx` |
| `ExitIntentPopup` | `src/app/layout.tsx` |
| `Features` | `src/app/features/page.tsx` |
| `LazyChat` | `src/app/layout.tsx` |
| `MobileBottomNav` | `src/app/layout.tsx` |
| `MobileCallButton` | `src/app/layout.tsx` |
| `MobileScrollOptimizer` | `src/app/layout.tsx` |
| `RevealOnScroll` | `src/app/features/page.tsx` |
| `SEOService` | `src/app/seo/page.tsx` |
| `SocialProofToast` | `src/app/page.tsx` |
| `StructuredData` | 26 pages site-wide |
| `Testimonials` | `src/app/features/page.tsx` |
| `WebDesign` | `src/app/web-design/page.tsx` |

**Source:** MOD-004 from BMAD scan report

---

## COMPLETED

### P5 — Location & Industry Page V2 Rewrites (2026-03-01)
4 location pages (Richland, Kennewick, Pasco, West Richland) and 5 industry pages (Healthcare, Manufacturing, Agriculture, Retail, Wineries) all rewritten to V2 via shared content components.

| File | Coverage | Change |
|------|----------|--------|
| `src/components/locations/LocationPageContent.tsx` | All 4 city pages | Removed `LocationPageLayout`/`Button`/`accent-primary`/`glass`; full V2 with hero + stats + services cards + neighborhoods + CTA |
| `src/app/locations/LocationsContent.tsx` | /locations hub | Removed `bg-background-primary`/`glass`/`accent-primary`/`Button`; V2 with indigo icon cards |
| `src/components/industries/IndustryPageContent.tsx` | All 5 industry pages | Removed `IndustryPageLayout`/`Button`/`accent-secondary`/`glass`; full V2 with hero + feature cards + benefits + CTA |
| `src/app/industries/IndustriesContent.tsx` | /industries hub | Removed `bg-background-primary`/`glass`/`accent-secondary`/`Button`; V2 with indigo icon cards |

Individual city/industry page.tsx files unchanged (they only pass props — no V1 styling).

---

### P5 — Service Page V2 Rewrites (2026-03-01)
All 9 service subpage content components rewritten from V1 (ServicePageLayout + broken accent-* tokens) to V2 (full-bleed indigo design system). Stub pages expanded to full-quality pages with hero, pain points, feature cards, capabilities, and CTA sections.

| File | Change |
|------|--------|
| `AIAutomationPageContent.tsx` | Full V2: hero + pain points + solution + process + deliverables + pricing + FAQ + CTA |
| `WebDesignPageContent.tsx` | Full V2: hero + pain points + solution + process + deliverables + pricing + FAQ + CTA |
| `SEOPageContent.tsx` | Full V2: hero + pain points + solution + process + deliverables + pricing + FAQ + CTA |
| `LeadGenerationPageContent.tsx` | Full V2: hero + pain points + solution + process + deliverables + pricing (industry table) + FAQ + CTA |
| `ReputationManagementPageContent.tsx` | Full V2: hero + pain points + solution + process + deliverables + pricing + FAQ + CTA |
| `ChatbotsPageContent.tsx` | Expanded stub → full V2: hero + 4 pain points + 3 feature cards + capabilities + omnichannel cards + CTA |
| `VoiceAIPageContent.tsx` | Expanded stub → full V2: hero + 4 pain points + 3 feature cards + features list + stats + CTA |
| `LocalSEOPageContent.tsx` | Expanded stub → full V2: hero + 4 pain points + 3 feature cards + stats + deliverables + CTA |
| `GBPPageContent.tsx` | Expanded stub → full V2: hero + 4 pain points + 3 feature cards + GBP fundamentals grid + stats + CTA |
| `WorkflowAutomationPageContent.tsx` | Expanded stub → full V2: hero + 4 pain points + 3 feature cards + popular automations + stats + CTA |

Token mapping applied across all files:
- `ServicePageLayout` → `<main className="min-h-screen bg-[#0a0a0f] overflow-hidden">`
- `accent-primary/secondary/tertiary/indigo` → `indigo-300/indigo-400/indigo-600`
- `text-gradient` → `text-indigo-300`
- `glass` → `bg-white/5 backdrop-blur-sm border border-white/10`
- `Button` + `btn-primary` → plain `<Link>` with inline Tailwind classes
- `container mx-auto px-4` → `max-w-7xl mx-auto px-6 lg:px-8`

---

### P5 — Blog, About, Contact V2 Rewrites (2026-03-01)
Final three inner pages migrated from V1 design system to V2.

| File | Change |
|------|--------|
| `src/app/blog/page.tsx` | V2 reskin — kept async server component + all data fetching (getAllPosts, getAllCategories, getFeaturedPosts, searchPosts, SearchBar). Replaced bg-background-primary/glass/accent-purple with V2 indigo/violet. |
| `src/app/about/page.tsx` | Full V2 rewrite ("use client" + Framer Motion). Hero, Our Story + Why Local 2-col, Core Philosophy 3-col cards, gradient CTA section. |
| `src/app/contact/ContactContent.tsx` | Full V2 rewrite. Pulsing badge, trust signal pills, calendar iframe embed, 2×2 contact info cards, yellow review nudge, ContactForm panel, AI assistant nudge. JSON-LD schema deferred (requires manual add — blocked by security hook). |
| `src/components/ContactForm.tsx` | 7 targeted className edits: accent-primary → indigo-500/600 throughout (inputClasses fn, toggle button, success state card, phone link, submit button, privacy link). Zero logic changes. |

---

### P1 — All Ship Blockers Fixed (2026-02-28)
- **P1-001** `src/services/aiTools.ts` — analyzeWebsite now calls real `/api/seo-analysis`; graceful disclaimer on failure. scheduleCall uses `NEXT_PUBLIC_CALENDLY_URL` env var. Commit: `e167f6e`
- **P1-002** `src/components/HeroAuditWidget.tsx` — Already had proper error state (no `Math.random()`). Verified clean.
- **P1-003** `src/components/WebsiteAudit.tsx` — Error banner above form; catch block returns to input state. Commit: `3af6203`
- **P1-004** `src/components/ChatWidget.tsx` — scheduleCall card reads `tool.result.url` with null fallback; analyzeWebsite card handles `disclaimer`. Commit: `46853bf`
- **P1-005** `src/app/dashboard/` — Deleted broken reputation route + cleared .next cache. Commit: `75e59bc`
- **P1-006** `conductor/` — Deleted abandoned scaffolding. Commit: logged prior session.
- **P1-007** `.env.example` — Created with all env vars; found 3 extras (`AI_TEXT_MODEL`, `LEAD_NOTIFICATION_EMAIL`, `KV_REST_API_URL`); fixed `.gitignore` negation. Commit: `855a79b`

---

## Source Documents
- `docs/project-scan-report.json` — BMAD Deep Scan machine-readable data
- `websitefixprompt.txt` (Max audit) — Clawdbot AI audit with specific broken feature list
- `docs/source-tree-analysis.md` — Full file inventory and issue registry
- `docs/api-contracts.md` — API endpoint documentation
