---
title: Where To Change Things
created: 2026-04-27
updated: 2026-04-27
type: query
status: active
tags: [summary, codebase, architecture, conversion, seo, ai, lead-gen]
sources: [../../../AGENTS.md, ../../../BUSINESS.md, ../../../DESIGN_SYSTEM.md, ../../../package.json, ../../../src/app/layout.tsx, ../../../src/lib/business-info.ts, ../../../src/lib/validators.ts]
---

# Where To Change Things

## Purpose
Use this page as the practical routing map before changing the codebase. It points future agents to the highest-likelihood file groups for common Digital Helper tasks.

## Business facts and brand truth
- Company positioning, services, market, and audience: `../../../BUSINESS.md`
- Visual direction and dark premium design rules: `../../../DESIGN_SYSTEM.md`
- Project-specific agent instructions and SEO hot cache: `../../../AGENTS.md`
- Reusable contact, location, service-area, and URL constants: `../../../src/lib/business-info.ts`

## Global site shell
- Metadata, fonts, JSON-LD, global wrappers, chat widget, footer, and analytics: `../../../src/app/layout.tsx`
- Navbar links and desktop/mobile navigation: `../../../src/components/Navbar.tsx`
- Footer links, contact details, and local service-area links: `../../../src/components/Footer.tsx`
- Global theme utilities, Tailwind v4 tokens, glass classes, and animations: `../../../src/app/globals.css`

## Homepage and conversion flow
- Homepage route composition: `../../../src/app/page.tsx`
- Hero and primary above-the-fold CTA: `../../../src/components/Hero.tsx`
- Website audit widget on homepage: `../../../src/components/HeroAuditWidget.tsx`
- Contact section and consultation CTA: `../../../src/components/Contact.tsx`
- Exit intent lead capture: `../../../src/components/ExitIntentPopup.tsx`

## Lead capture and validation
- Lead server action: `../../../src/app/actions/leads.ts`
- Lead persistence and Supabase fallback behavior: `../../../src/lib/database.ts`
- Shared Zod schemas for API inputs: `../../../src/lib/validators.ts`
- Contact, audit, scraper, and AI API behavior should be checked against the relevant route in `../../../src/app/api/`

## AI tools and API routes
- Chat endpoint and streaming model configuration: `../../../src/app/api/chat/route.ts`
- Chat tool definitions and sales assistant capabilities: `../../../src/services/aiTools.ts`
- Business analysis endpoint: `../../../src/app/api/business-analysis/route.ts`
- SEO analysis endpoint: `../../../src/app/api/seo-analysis/route.ts`
- Website analysis server action: `../../../src/app/actions/analyze.ts`
- Competitor analysis server action: `../../../src/app/actions/competitor.ts`

## Admin and content generator
- Admin auth API: `../../../src/app/api/admin/auth/route.ts`
- Admin middleware protection: `../../../src/middleware.ts`
- Admin password/session helpers: `../../../src/lib/admin-auth.ts`
- Content generator pages: `../../../src/app/admin/content-generator/`
- Content generator API: `../../../src/app/api/content-generator/`
- Content generator UI components: `../../../src/components/content-generator/`

## SEO and local pages
- Service hub: `../../../src/app/services/page.tsx`
- Web design page: `../../../src/app/services/web-design/page.tsx`
- SEO page: `../../../src/app/services/seo/page.tsx`
- Local SEO page: `../../../src/app/services/seo/local-seo/page.tsx`
- Google Business Profile page: `../../../src/app/services/seo/google-business-profile/page.tsx`
- Location hub and city pages: `../../../src/app/locations/`
- Industry hub and vertical pages: `../../../src/app/industries/`
- Keyword memory: `../../keywords/`
- Local SEO wiki context: [Local SEO Strategy](../concepts/local-seo-strategy.md)

## Reputation and lead-scraper products
- Reputation dashboard page: `../../../src/app/dashboard/reputation/page.tsx`
- Reputation components: `../../../src/components/reputation/`
- Reputation types: `../../../src/types/reputation.ts`
- Google Places/GBP action: `../../../src/app/actions/gbp.ts`
- Lead scraper page: `../../../src/app/tools/lead-scraper/page.tsx`
- Lead scraper component: `../../../src/components/tools/LeadScraper.tsx`
- Lead scraper API: `../../../src/app/api/lead-scraper/route.ts`

## Testing and verification
- Unit tests: `../../../src/lib/validators.test.ts`, `../../../src/services/pricingService.test.ts`
- Test setup: `../../../src/test/setup.ts`
- Commands: `npm test`, `npm run lint`, `npx tsc --noEmit`, `npm run build`
- Known caution: older memory says root lint/type/build signals can be noisy when generated artifacts or nested apps are included, so separate main-app failures from unrelated workspace noise.

## Related pages
- [Digital Helper Next.js](../entities/digital-helper-nextjs.md)
- [Lead Capture System](../concepts/lead-capture-system.md)
- [AI Feature Stack](../concepts/ai-feature-stack.md)
- [Decision Log](decision-log.md)
- [Maintenance Checklist](maintenance-checklist.md)
