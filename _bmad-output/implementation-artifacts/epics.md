---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories']
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - docs/architecture.md
---

# digital-helper-nextjs - Epic Breakdown

## Overview

Complete epic and story breakdown for the **V2 Completion Initiative** — the remaining MVP tasks required before production launch of digital-helper.com. All prior P1–P4 work (ship blockers, fake content, backend hardening, V2 inner-page redesign) is complete. This document tracks the final four launch gates.

---

## Requirements Inventory

### Functional Requirements

FR1: Pay-for-results offer copy is prominently displayed on all service pages (AI Automation, Web Design, SEO, Lead Generation, Reputation Management, Chatbots, Voice AI, Workflow Automation, Local SEO, GBP)
FR2: Pay-for-results offer copy is prominently displayed on the pricing page
FR3: All service page CTAs are rewritten to reflect the value-upfront offer model (e.g. "Get a Free Audit", "Book a Call — No Upfront Cost")
FR4: Contact form submission triggers a Resend email notification to business@digital-helper.com with full lead data
FR5: Contact form lead is stored durably in Vercel KV (not only filesystem)
FR6: AI audit lead capture path (storeAuditLead) sends email notification and stores lead durably
FR7: Chat lead capture path (storeChatLead) sends email notification and stores lead durably
FR8: GET /api/leads returns all stored leads sorted newest-first
FR9: Mobile hamburger menu opens and closes correctly on iOS Safari and Android Chrome
FR10: All mobile menu links navigate correctly and menu closes after navigation
FR11: No horizontal overflow or layout breaks at mobile viewport widths (320px–768px)
FR12: Lighthouse audit is run on homepage and 3 key service pages; scores are documented
FR13: Any Lighthouse score below 70 is diagnosed and fixed before launch

### Non-Functional Requirements

NFR1: Lighthouse mobile performance score ≥80 on homepage and 3 key service pages
NFR2: Lighthouse desktop performance score ≥90 on homepage and 3 key service pages
NFR3: Zero 500 errors on critical user paths (contact form, AI chat, SEO audit) at launch
NFR4: Rate limiting active on /api/chat and /api/seo-analysis (sliding window 10 req/10s per IP)
NFR5: Lead email delivery 100% when RESEND_API_KEY is configured in Vercel
NFR6: Lead storage gracefully degrades — form submission never fails due to KV/Resend being unconfigured
NFR7: All new UI follows V2 design tokens: bg-[#0a0a0f], indigo-600/400/300 accent, glass = bg-white/5 backdrop-blur-sm border border-white/10

### Additional Requirements (from Architecture)

- **Env vars required in Vercel dashboard:** `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, `RESEND_FROM_EMAIL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- **Tailwind v4:** No tailwind.config.js — use `@theme` in globals.css for any new tokens
- **Path aliases:** Always `@/` imports, never relative paths
- **Framer Motion v12:** Import from `framer-motion`, not `motion/react`
- **AI SDK v6:** `@ai-sdk/google v3`, use `streamText` + `toTextStreamResponse`
- **CTA links:** `/contact` for forms, `https://calendly.com/marlowne12/30min` for booking

### FR Coverage Map

| FR | Epic | Story | Description |
|----|------|-------|-------------|
| FR1 | 1 | 1.1 | Pay-for-results offer on all service pages |
| FR2 | 1 | 1.1 | Pay-for-results offer on pricing page |
| FR3 | 1 | 1.1 | Service page CTAs updated to value-upfront language |
| FR4 | 1 | 1.2 | Contact form → Resend email notification |
| FR5 | 1 | 1.2 | Contact form → Vercel KV durable storage |
| FR6 | 1 | 1.2 | Audit lead path verified end-to-end |
| FR7 | 1 | 1.2 | Chat lead path verified end-to-end |
| FR8 | 1 | 1.2 | GET /api/leads returns stored leads |
| FR9 | 1 | 1.3 | Mobile hamburger menu open/close |
| FR10 | 1 | 1.3 | Mobile nav links work and close menu |
| FR11 | 1 | 1.3 | No horizontal overflow at mobile widths |
| FR12 | 1 | 1.4 | Lighthouse audit run, scores documented |
| FR13 | 1 | 1.4 | Sub-70 scores fixed |

---

## Epic List

### Epic 1: Launch-Ready MVP
Marlon can send any prospect to any page on digital-helper.com and the site closes them autonomously — the pay-for-results offer is visible, the AI features work, every lead is durably captured and emailed to Marlon, mobile visitors have a smooth experience, and the site meets performance benchmarks.
**FRs covered:** FR1–FR13

---

## Epic 1: Launch-Ready MVP

**Goal:** Complete the four remaining launch gates so the site can operate as a 24/7 autonomous closer with zero manual pitching required.

---

### Story 1.1: Add Pay-For-Results Offer to Service Pages and Pricing

As a skeptical small business owner visiting a service page,
I want to clearly see that Digital Helper only gets paid when I get results — before I even reach the CTA,
So that my primary objection ("what if it doesn't work?") is eliminated without a sales call.

**Acceptance Criteria:**

**Given** a visitor is on any of the 10 service pages (AI Automation, Web Design, SEO, Lead Generation, Reputation Management, Chatbots, Voice AI, Workflow Automation, Local SEO, GBP)
**When** they scroll past the hero section
**Then** they see a clearly marked offer block stating the pay-for-results model (no upfront cost, pay only for results)

**Given** a visitor is on the pricing page
**When** they view pricing options
**Then** the pay-for-results model is explained prominently at the top of the page (not buried in fine print)

**Given** a visitor reaches the CTA section on any service page
**When** they read the CTA copy
**Then** the CTA reinforces the no-risk offer (e.g. "Start for free", "No upfront cost", "30-day guarantee", "Book a Call — Zero Risk")

**Given** a new pay-for-results section is added to any service page
**When** the page is rendered
**Then** it uses V2 design tokens: bg-[#0a0a0f] background, indigo-600 accent, glass card style, and links to /contact or https://calendly.com/marlowne12/30min

**Files:**
- `src/components/services/AIAutomationPageContent.tsx`
- `src/components/services/WebDesignPageContent.tsx`
- `src/components/services/SEOPageContent.tsx`
- `src/components/services/LeadGenerationPageContent.tsx`
- `src/components/services/ReputationManagementPageContent.tsx`
- `src/components/services/ChatbotsPageContent.tsx`
- `src/components/services/VoiceAIPageContent.tsx`
- `src/components/services/WorkflowAutomationPageContent.tsx`
- `src/components/services/LocalSEOPageContent.tsx`
- `src/components/services/GBPPageContent.tsx`
- Pricing page component (locate via `src/app/pricing/`)

**Dev Notes:**
- Consider a shared `PayForResultsBlock` component to avoid duplicating the section across 10 files
- Core offer copy: "We only get paid when you get results. No setup fees. No long-term contracts. 30-day guarantee."
- Do not change existing hero, FAQ, or pricing table sections — add the offer block between existing sections

---

### Story 1.2: Verify Lead Pipeline End-to-End

As the agency owner (Marlon),
I want to confirm that every lead capture path (contact form, AI chat, SEO audit) stores data durably and triggers an email notification,
So that I never lose a lead to Vercel's ephemeral filesystem.

**Acceptance Criteria:**

**Given** production env vars are set (RESEND_API_KEY, KV_REST_API_URL, KV_REST_API_TOKEN, LEAD_NOTIFICATION_EMAIL)
**When** a visitor submits the contact form at /contact
**Then** Marlon receives an HTML email at business@digital-helper.com within 60 seconds containing the lead's name, email, phone, service interest, and message

**Given** production env vars are set
**When** a visitor submits the contact form
**Then** the lead is stored in Vercel KV and appears in GET /api/leads (sorted newest-first)

**Given** the AI chat widget captures a lead (user provides email in chat)
**When** storeChatLead fires
**Then** an email notification is sent to LEAD_NOTIFICATION_EMAIL AND the lead is retrievable from Vercel KV

**Given** the SEO audit widget captures a lead (user provides email for results)
**When** storeAuditLead fires
**Then** an email notification is sent to LEAD_NOTIFICATION_EMAIL AND the lead is retrievable from Vercel KV

**Given** Resend or KV is not configured (env vars missing)
**When** any form is submitted
**Then** the form submission still returns a 200 success response to the user (graceful degradation — storage failure is non-fatal)

**Given** GET /api/leads is called
**When** leads exist in Vercel KV
**Then** the response is a JSON array sorted newest-first with all captured lead data

**Verification steps (manual, requires production deploy + env vars):**
1. Set all required env vars in Vercel dashboard
2. Submit contact form → verify email received + lead in GET /api/leads
3. Trigger chat lead (type email in ChatWidget) → verify email received
4. Trigger audit lead (submit SEO audit with email) → verify email received

**Files to review (code changes likely not needed — verification only):**
- `src/app/api/contact/route.ts`
- `src/app/actions/leads.ts`
- `src/app/api/leads/route.ts`
- `src/lib/ratelimit.ts`

---

### Story 1.3: Mobile Navigation QA and Fixes

As a mobile visitor on iOS Safari or Android Chrome,
I want the navigation hamburger menu to open, show all links, and close without errors,
So that I can browse and navigate to any service page from my phone.

**Acceptance Criteria:**

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
**When** the visitor scrolls the page behind the menu
**Then** the menu remains fixed and does not scroll away or flicker

**Testing approach:**
- Chrome DevTools → Toggle Device Toolbar → test iPhone SE (375px), Pixel 5 (393px), iPad Mini (768px)
- Check all breakpoints: 320px, 375px, 390px, 430px, 768px
- Verify: hamburger visible, menu opens, all links present, menu closes on link tap, no overflow

**Files:**
- `src/components/v2/NavbarV2.tsx`

---

### Story 1.4: Lighthouse Audit and Performance Fixes

As the site owner,
I want documented Lighthouse scores on all key pages with any sub-70 issues fixed,
So that the site meets minimum performance standards before launch and ranks competitively in search.

**Acceptance Criteria:**

**Given** the dev server is running at http://localhost:3000
**When** Lighthouse is run on: `/` (homepage), `/services/ai-automation`, `/services/web-design`, `/services/seo`
**Then** scores for Performance, Accessibility, Best Practices, and SEO are recorded for each page

**Given** any page scores below 70 on Performance
**When** the Lighthouse report is reviewed for root causes
**Then** a targeted fix is applied (e.g. add `priority` prop to hero image, defer non-critical scripts, fix CLS-causing elements)

**Given** any page scores below 80 on Accessibility
**When** the Lighthouse report identifies specific elements
**Then** ARIA labels, color contrast, or focus management issues are fixed

**Given** fixes are applied and dev server restarted
**When** Lighthouse is re-run on all 4 pages
**Then** all pages score ≥80 mobile Performance, ≥90 desktop Performance

**Given** the audit is complete
**When** results are final
**Then** `lighthouse-report.json` is updated with new scores and `docs/WEBSITE-IMPROVEMENTS.md` P4-002 is marked `[x]`

**Run commands:**
```bash
# Automated headless run
npx lighthouse http://localhost:3000 --output json --output-path ./lighthouse-report.json --chrome-flags="--headless"
npx lighthouse http://localhost:3000/services/ai-automation --output json --chrome-flags="--headless"
npx lighthouse http://localhost:3000/services/web-design --output json --chrome-flags="--headless"
npx lighthouse http://localhost:3000/services/seo --output json --chrome-flags="--headless"
```

**Common fixes to try first:**
- Add `priority` prop to first-visible `<Image>` components (fixes LCP)
- Add `width` + `height` to any images missing them (fixes CLS)
- Ensure all interactive elements have accessible labels (fixes Accessibility)
- Check for render-blocking scripts in `layout.tsx`

**Files likely affected:**
- `src/components/v2/HeroV2.tsx` (hero image priority)
- `src/app/layout.tsx` (script loading order)
- Whatever page components have the lowest scores
