# Project Overview — digital-helper-nextjs

> **Status:** Active — `redesign-v2` branch (V2 redesign live on homepage)
> **Last Updated:** 2026-02-28

---

## Business Context

**Digital Helper** is a marketing automation agency based in Richland, WA (Tri-Cities area) serving local service businesses (HVAC, plumbing, dentists, restaurants, etc.). The core value proposition is turning outdated "brochure" websites into AI-powered lead machines.

- **Domain:** digital-helper.com
- **Contact:** hello@digitalhelper.com
- **Target Clients:** Local service businesses with websites from the 2010s or earlier
- **Primary Geography:** Tri-Cities WA (Kennewick, Pasco, Richland, West Richland)

---

## Core Services (Product Lines)

| Service | Route | Description |
|---------|-------|-------------|
| AI Automation | `/services/ai-automation` | Chatbots, voice AI, workflow automation |
| Web Design | `/services/web-design` | Full website overhauls |
| Local SEO | `/services/seo` | Google ranking + GBP optimization |
| Lead Generation | `/services/lead-generation` | Automated lead capture and follow-up |
| Reputation Management | `/services/reputation-management` | Review monitoring and response |

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.1.3 |
| React | React | 19.2.3 |
| Language | TypeScript | 5.x (strict mode) |
| Styling | Tailwind CSS | v4 (PostCSS, no config file) |
| Animation | Framer Motion | v12 |
| Icons | Lucide React | Latest |
| UI Components | shadcn/ui | Latest |
| AI (server) | @google/genai | Direct Gemini API |
| AI (SDK) | @ai-sdk/google | v3.0.10 |
| AI SDK | ai | v6.0.39 |
| Testing | Vitest | v4.0.18 |
| Validation | Zod | v4.3.6 |
| Deployment | Vercel | — |

---

## Current State

### Homepage
The homepage (`/`) is fully switched to V2 components (redesign-v2 branch). All 11 V2 sections are live:
- HeroV2 → SocialProofBarV2 → ProblemV2 → ServicesV2 → HowItWorksV2 → CaseStudiesV2 → PricingTeaserV2 → FAQV2 → CTAV2
- NavbarV2 and FooterV2 as layout frame
- SocialProofToast as floating element

### Inner Pages
Most inner pages (services, blog, locations, industries) still use **legacy V1 components** and styling patterns. They have not been redesigned for the V2 system yet.

### Design Theme
- **Mode:** Dark-only (no light mode). `dark` class hardcoded on `<html>` element.
- **Primary palette:** Near-black background `#0a0a0f`, indigo-600 primary, violet accent, zinc hierarchy for text.
- **Fonts:** Syne (headings via `--font-heading`), DM Sans (body via `--font-dm-sans`)

---

## Key Capabilities Built

1. **AI Website Audit Tool** — Scrapes any URL, analyzes it with Gemini 2.0 Flash, returns graded audit report (quick preview free; full audit requires email)
2. **AI Chat Widget** — Embedded chatbot powered by Gemini 1.5 Flash, trained as Digital Helper sales rep
3. **Reputation Dashboard** — `/dashboard/reputation` — GBP search, competitor comparison, SWOT, lead finder
4. **Case Study Generator** — AI-generated case studies via OpenRouter
5. **SEO Research Tool** — `/seo-research` — AI-powered keyword research
6. **Blog System** — Static blog at `/blog` with categories and slug routing
7. **Lead Magnet** — PDF lead magnet generation and email delivery
8. **A/B Testing** — `ABTestProvider` wrapping entire app for variant experiments
9. **Programmatic Pages** — Location pages (4 cities) and industry pages (5 sectors)

---

## Known Issues / Debt

- V1 and V2 components coexist — V1 not yet cleaned up
- Very limited image assets (only 3 images in `public/assets/`)
- Contact form saves to local JSON file (not yet connected to CRM/n8n)
- `geminiService.ts` is deprecated but still present
- Mixed AI client patterns (`@google/genai` direct vs. Vercel AI SDK)
- No HowTo/Service schema markup implemented
- Minimal performance/Lighthouse audit done
- ABTestProvider experiments partially utilized
