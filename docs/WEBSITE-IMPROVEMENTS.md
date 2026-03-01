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

### [ ] P2-001: Replace fake testimonials
**Files:** `src/components/Testimonials.tsx`, `src/components/TestimonialsCarousel.tsx`
**Issue:** Sarah Jenkins, Mike Peterson, Lisa Chen — all fabricated names with no real photos. Trusted by 50+ local businesses claim is unverified.
**Options:**
- A: Replace with real client testimonials (preferred)
- B: Remove section entirely until real testimonials are collected
- C: Use generic text with Client names changed for privacy disclaimer
**Source:** Max audit

### [ ] P2-002: Verify case studies are real projects
**Issue:** Verify Columbia Basin Plumbing, Tri-City Dental Care are real client projects, not placeholders.
**Fix:** Confirm with Marlon — mark AI-generated example studies clearly as Example Project
**Source:** Max audit

### [ ] P2-003: Verify stats accuracy
**Issue:** Stats like 500+ projects, Trusted by 50+ local businesses may be aspirational, not actual.
**Fix:** Verify accuracy OR add Projected / Goal label.
**Source:** Max audit

---

## PRIORITY 3 — Complete Missing Functionality

### [ ] P3-001: Add email notifications to contact form
**File:** `src/app/api/contact/route.ts`
**Issue:** Form saves to JSON file only — no email is sent when a new lead submits.
**Fix:** Add Resend email notification using existing RESEND_API_KEY. Notify Marlon on each submission.
**Source:** Max audit

### [ ] P3-002: Migrate contact form storage off filesystem
**File:** `src/app/api/contact/route.ts`
**Issue:** Saves to `data/leads/contact-submissions.json` — Vercel ephemeral filesystem means data is lost on every deployment.
**Fix:** Migrate to Vercel KV, Supabase, or n8n/Zapier webhook.
**Source:** CRIT-002 from BMAD scan report

### [ ] P3-003: Verify lead storage end-to-end
**Files:** `src/app/actions/leads.ts` — `storeAuditLead()`, `storeChatLead()`
**Issue:** Unclear if chat lead capture and audit lead capture are actually persisting data anywhere durable.
**Fix:** Test each lead capture path in production; ensure data flows to a real destination.
**Source:** Max audit

### [ ] P3-004: Add API rate limiting to AI endpoints
**Files:** All `src/app/api/*/route.ts` (14 endpoints, 0 with rate limiting)
**Issue:** All AI endpoints are publicly accessible with no rate limiting — vulnerable to abuse and cost spikes.
**Fix:** Add Upstash Redis rate limiting via Vercel Edge middleware.
**Source:** CRIT-001 from BMAD scan report

---

## PRIORITY 4 — Polish & UX

### [ ] P4-001: Service pages — bulk up content and add clear CTAs
**Issue:** Some service pages have thin copy and unclear next steps for visitors.
**Fix:** Add pricing hints, outcome-focused copy, and Get a Quote / Book a Call CTA blocks.

### [ ] P4-002: Run Lighthouse audit
**Action:** Run Lighthouse on homepage + 2-3 key service pages. Document scores. Fix any score below 70.

### [ ] P4-003: Image alt text audit
**Issue:** Only 3 real images in `public/assets/`. Verify all have proper alt text for accessibility and SEO.

### [ ] P4-004: Mobile navigation testing
**File:** `src/components/v2/NavbarV2.tsx`
**Action:** Test mobile hamburger menu across iOS Safari, Android Chrome, various breakpoints.

### [ ] P4-005: Add breadcrumbs to inner pages
**Issue:** No breadcrumb navigation on service/location/industry pages. Hurts UX and SEO.
**Fix:** Add Breadcrumb component using NavbarV2 design tokens.

### [ ] P4-006: Expand schema markup
**Issue:** `StructuredData` component exists but is only implemented on a few pages.
**Fix:** Add LocalBusiness, Service, and HowTo schema to all service, location, and industry pages.
**Source:** MIN-003 from BMAD scan report

---

## PRIORITY 5 — V2 Redesign (Inner Pages)

The homepage V2 is complete. All inner pages are still on V1 styling.

| Page Type | Count | V2 Status | Notes |
|-----------|-------|-----------|-------|
| Service Pages | 9 | Not started | Highest priority inner pages |
| Blog | 1 | Not started | |
| About | 1 | Not started | |
| Contact | 1 | Not started | Also fix form backend (P3-001) |
| Pricing Page | 1 | Not started | Full page, not just teaser |
| Location Pages | 4 | Not started | |
| Industry Pages | 5 | Not started | |

See `docs/development-guide.md` for V2 component conventions and design tokens.

---

## TECHNICAL DEBT

### [ ] TD-001: Delete deprecated `src/services/geminiService.ts`
**Issue:** Marked deprecated, proxies to `/api/case-study`. Still in codebase confusing AI agents.
**Fix:** Delete file, verify no active imports remain.
**Source:** MOD-002 from BMAD scan report

### [ ] TD-002: Standardize AI SDK usage
**Issue:** Mix of `@google/genai` and `@ai-sdk/google` across routes.
**Fix:** Standardize on `@ai-sdk/google` + Vercel AI SDK v6 (supports streaming, structured output).
**Source:** MOD-003 from BMAD scan report

### [ ] TD-003: Resolve duplicate routes
**Issues:**
- `/case-studies` and `/work/case-studies` both exist
- `/web-design` and `/services/web-design` both exist
**Fix:** Pick canonical URL, implement 301 redirect from duplicate.
**Source:** MOD-001 from BMAD scan report

### [ ] TD-004: Clean up V1 components after full V2 migration
**Count:** 35 legacy V1 components in `src/components/` root
**Fix:** Delete after all pages using them are redesigned to V2.
**IMPORTANT:** Do NOT delete until dependent pages are migrated.
**Source:** MOD-004 from BMAD scan report

---

## COMPLETED

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
