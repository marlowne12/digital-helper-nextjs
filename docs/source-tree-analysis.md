# Source Tree Analysis — digital-helper-nextjs

> **Scan Date:** 2026-02-28 | **Branch:** redesign-v2 | **Depth:** Deep Scan

---

## Top-Level Directory Map

```
digital-helper-nextjs/
├── src/                        ← All application source
│   ├── app/                    ← Next.js App Router (pages + API)
│   ├── components/             ← React components
│   │   ├── v2/                 ← V2 redesign components (active on homepage)
│   │   ├── ui/                 ← shadcn/ui primitives
│   │   ├── blog/               ← Blog-specific components
│   │   ├── industries/         ← Industry page components
│   │   ├── locations/          ← Location page components
│   │   ├── reputation/         ← Reputation dashboard components
│   │   ├── seo-research/       ← SEO research UI
│   │   └── services/           ← Service page components
│   ├── hooks/                  ← Custom React hooks
│   ├── lib/                    ← Utilities, constants, validators
│   ├── services/               ← External service wrappers
│   ├── test/                   ← Test setup
│   └── types/                  ← TypeScript type definitions
├── docs/                       ← Project documentation (this folder)
├── public/                     ← Static assets
│   └── assets/                 ← 3 image pairs (png + webp)
├── _bmad/                      ← BMAD method config
├── _bmad-output/               ← BMAD generated outputs
├── .agent/                     ← Agent skills and workflows
├── scripts/                    ← Build/utility scripts
├── next.config.ts              ← Next.js config
├── tsconfig.json               ← TypeScript config (strict, bundler)
├── vitest.config.ts            ← Test config
├── postcss.config.mjs          ← PostCSS (Tailwind v4)
├── eslint.config.mjs           ← ESLint config
├── components.json             ← shadcn/ui config
└── package.json                ← Dependencies
```

---

## `src/app/` — Routes and API

### Page Routes (78 total routes)

| Route Pattern | File | Notes |
|---------------|------|-------|
| `/` | `app/page.tsx` | Homepage — all V2 components |
| `/about` | `app/about/page.tsx` | About page |
| `/ai-agency` | `app/ai-agency/page.tsx` | AI agency service page |
| `/blog` | `app/blog/page.tsx` | Blog index |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Blog post |
| `/blog/category/[category]` | `app/blog/category/[category]/page.tsx` | Blog category |
| `/booking` | `app/booking/page.tsx` | Booking page |
| `/case-studies` | `app/case-studies/page.tsx` | Case studies |
| `/contact` | `app/contact/page.tsx` | Contact form |
| `/dashboard/reputation` | `app/dashboard/reputation/page.tsx` | Reputation dashboard |
| `/features` | `app/features/page.tsx` | Features page |
| `/industries` | `app/industries/page.tsx` | Industries hub |
| `/industries/agriculture` | `app/industries/agriculture/page.tsx` | Agriculture industry |
| `/industries/healthcare` | `app/industries/healthcare/page.tsx` | Healthcare industry |
| `/industries/manufacturing` | `app/industries/manufacturing/page.tsx` | Manufacturing |
| `/industries/retail-ecommerce` | `app/industries/retail-ecommerce/page.tsx` | Retail/ecommerce |
| `/industries/wineries` | `app/industries/wineries/page.tsx` | Wineries |
| `/locations` | `app/locations/page.tsx` | Locations hub |
| `/locations/kennewick` | `app/locations/kennewick/page.tsx` | Kennewick |
| `/locations/pasco` | `app/locations/pasco/page.tsx` | Pasco |
| `/locations/richland` | `app/locations/richland/page.tsx` | Richland |
| `/locations/west-richland` | `app/locations/west-richland/page.tsx` | West Richland |
| `/pricing` | `app/pricing/page.tsx` | Pricing page |
| `/privacy` | `app/privacy/page.tsx` | Privacy policy |
| `/redesign` | `app/redesign/page.tsx` | V2 preview sandbox |
| `/resources` | `app/resources/page.tsx` | Resources |
| `/seo` | `app/seo/page.tsx` | SEO page |
| `/seo-research` | `app/seo-research/page.tsx` | SEO research tool |
| `/services` | `app/services/page.tsx` | Services hub |
| `/services/ai-automation` | `app/services/ai-automation/page.tsx` | AI automation |
| `/services/ai-automation/chatbots` | subpage | Chatbots service |
| `/services/ai-automation/voice-ai` | subpage | Voice AI |
| `/services/ai-automation/workflow-automation` | subpage | Workflow automation |
| `/services/lead-generation` | subpage | Lead generation |
| `/services/reputation-management` | subpage (with layout) | Reputation management |
| `/services/seo` | subpage | SEO services |
| `/services/seo/google-business-profile` | subpage | GBP |
| `/services/seo/local-seo` | subpage | Local SEO |
| `/services/web-design` | subpage | Web design |
| `/terms` | `app/terms/page.tsx` | Terms of service |
| `/tools` | `app/tools/page.tsx` | Tools hub |
| `/tools/seo-audit` | subpage (with layout) | SEO audit tool |
| `/web-design` | `app/web-design/page.tsx` | Web design (duplicate?) |
| `/work` | `app/work/page.tsx` | Work/portfolio |
| `/work/case-studies` | subpage | Case studies (duplicate of /case-studies?) |

### Special App Files

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout — fonts, dark mode, ABTestProvider, NavbarV2, FooterV2 |
| `app/globals.css` | Tailwind v4 theme, custom animations, CSS variables |
| `app/error.tsx` | Global error boundary |
| `app/loading.tsx` | Global loading UI |
| `app/not-found.tsx` | 404 page |
| `app/robots.ts` | Dynamic robots.txt |
| `app/sitemap.ts` | Dynamic sitemap.xml |
| `app/favicon.ico` | Favicon |

### API Routes

| Route | Method | Handler File | Auth Required |
|-------|--------|-------------|---------------|
| `/api/chat` | POST | `api/chat/route.ts` | No |
| `/api/contact` | GET, POST | `api/contact/route.ts` | No |
| `/api/website-audit` | POST | `api/website-audit/route.ts` | No |
| `/api/business-analysis` | POST | `api/business-analysis/route.ts` | No |
| `/api/case-study` | POST | `api/case-study/route.ts` | No |
| `/api/generate-case-study` | POST | `api/generate-case-study/route.ts` | No |
| `/api/downloads/[slug]` | GET | `api/downloads/[slug]/route.ts` | No |
| `/api/email-draft` | POST | `api/email-draft/route.ts` | No |
| `/api/lead-magnet` | POST | `api/lead-magnet/route.ts` | No |
| `/api/pricing` | GET | `api/pricing/route.ts` | No |
| `/api/report-pdf` | POST | `api/report-pdf/route.ts` | No |
| `/api/send-audit-email` | POST | `api/send-audit-email/route.ts` | No |
| `/api/seo-analysis` | POST | `api/seo-analysis/route.ts` | No |
| `/api/seo-audit` | POST | `api/seo-audit/route.ts` | No |

### Server Actions

| File | Actions |
|------|---------|
| `app/actions/analyze.ts` | Business/website analysis |
| `app/actions/competitor.ts` | Competitor research |
| `app/actions/gbp.ts` | Google Business Profile data |
| `app/actions/lead-finder.ts` | Find local business leads |
| `app/actions/leads.ts` | Lead management |
| `app/actions/proposal.ts` | Proposal generation |
| `app/actions/send-report.ts` | Email report delivery |

---

## `src/components/` — Component Inventory (Summary)

### Count by Category

| Category | Count | Status |
|----------|-------|--------|
| V2 (redesign) | 11 | Active on homepage |
| Legacy V1 | ~35 | Active on inner pages |
| shadcn/ui | 13 | Shared primitives |
| Feature (cross-cutting) | ~12 | Mixed usage |
| Domain (blog/industry/etc.) | ~25 | Active |

---

## `src/lib/` — Utilities

| File | Purpose |
|------|---------|
| `utils.ts` | `cn()` — Tailwind class merging (clsx + tailwind-merge) |
| `constants.ts` | `SIZES` object — button/input/text size constants |
| `validation.ts` | `validateUrl()`, `validateEmail()`, `normalizeUrl()` |
| `validators.ts` | Zod schemas — `contactFormSchema` and others |
| `analytics.ts` | Analytics event helpers |
| `blog.ts` | Blog post utilities (static data) |
| `email-templates.ts` | Email HTML templates |
| `pdf/lead-magnet-templates.tsx` | PDF generation templates |

---

## `src/services/` — Service Layer

| File | Status | Purpose |
|------|--------|---------|
| `geminiService.ts` | **DEPRECATED** | Legacy Gemini API wrapper; use `/api/case-study` instead |
| `aiTools.ts` | Active | AI tool definitions for Gemini |
| `pricingService.ts` | Active | Pricing tier data and logic |

---

## `src/types/` — Type Definitions

| File | Key Types |
|------|-----------|
| `index.ts` | `ServiceItem`, `ChatMessage`, `CaseStudy`, `SEOAnalysisResult`, `PricingTier`, `BlogPost`, `BusinessAuditResult` |
| `audit.types.ts` | `AuditRequest`, `AuditResponse`, `QuickPreview`, `AuditFullResult`, `AuditIssue`, `CategoryScore` |
| `reputation.ts` | Reputation dashboard types |

---

## `src/hooks/` — Custom Hooks

| Hook | Purpose |
|------|---------|
| `use-toast.ts` | shadcn toast hook |
| `useExitIntent.ts` | Mouse exit detection for popups |

---

## `public/` — Static Assets

| File | Type | Notes |
|------|------|-------|
| `assets/ai_workflows.png` + `.webp` | Image | AI workflow illustration |
| `assets/seo_analytics.png` + `.webp` | Image | SEO analytics screenshot |
| `assets/web_design_showcase.png` + `.webp` | Image | Web design example |
| `robots.txt` | Text | Static robots (also dynamic via `app/robots.ts`) |
| `sitemap.xml` | XML | Static sitemap (also dynamic via `app/sitemap.ts`) |

> ⚠️ **Image Debt:** Only 3 real images available. Many sections use placeholder/generic images. This is a major gap for the redesign.

---

## Root Config Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js configuration |
| `tsconfig.json` | TypeScript: strict, bundler resolution, `@/*` → `./src/*` |
| `vitest.config.ts` | Vitest test runner config |
| `postcss.config.mjs` | PostCSS + Tailwind v4 |
| `eslint.config.mjs` | ESLint flat config |
| `components.json` | shadcn/ui config |
| `package.json` | Dependencies and scripts |
| `CLAUDE.md` | Instructions for Claude Code |
| `DESIGN_SYSTEM.md` | Design system reference |
| `BUSINESS.md` | Business rules and context |

---

## Identified Issues (Source Tree Level)

### 🔴 Critical
- No auth on any API route — public access to all AI endpoints
- Contact form saves to filesystem (`data/leads/`) — not suitable for Vercel (ephemeral filesystem)

### 🟡 Moderate
- Duplicate routes: `/case-studies` and `/work/case-studies`; `/web-design` and `/services/web-design`
- `geminiService.ts` deprecated but still in codebase
- Mixed AI SDK usage (`@google/genai` direct vs. `@ai-sdk/google`)
- No consistent page structure between V1 inner pages and V2 homepage

### 🟢 Acceptable
- Only 3 real images — needs photography/design work
- No test files for most components — only `validators.test.ts` and `pricingService.test.ts`
- `.agent/` and `_bmad/` directories add overhead but are not included in build
