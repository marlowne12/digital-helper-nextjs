---
title: Source Map
created: 2026-04-09
updated: 2026-04-27
type: summary
status: active
tags: [summary, memory-system, roadmap, project]
sources: [../SCHEMA.md, ../index.md, ../log.md, ../../../AGENTS.md, ../../../package.json]
---

# Source Map

## Purpose
This page tells future agents what to read first depending on the task.
Use it as the fastest orientation layer before diving into the full repo.

## Universal first reads
Read these for almost any non-trivial task:
1. [SCHEMA](../SCHEMA.md)
2. [Index](../index.md)
3. [Log](../log.md)
4. [Decision Log](decision-log.md)
5. `../../../AGENTS.md`
6. `../../../package.json`

## If the task is about business positioning
Read in this order:
1. [Digital Helper](../entities/digital-helper.md)
2. [Service Portfolio](../entities/service-portfolio.md)
3. [Vertical Market Strategy](../concepts/vertical-market-strategy.md)
4. [Digital Helper vs Competitors](../comparisons/digital-helper-vs-competitors.md)
5. [Proof Assets](../entities/proof-assets.md)
6. `../../glossary.md`

## If the task is about SEO / content strategy
Read in this order:
1. [Local SEO Strategy](../concepts/local-seo-strategy.md)
2. [Keyword Strategy](../concepts/keyword-strategy.md)
3. [Tri-Cities Location Strategy](../concepts/tri-cities-location-strategy.md)
4. [Content Engine](../concepts/content-engine.md)
5. [Location Pages vs Keyword Clusters](../comparisons/location-pages-vs-keyword-clusters.md)
6. `../../keywords/hero-keywords.md`
7. `../../keywords/secondary-keywords.md`
8. `../../content-calendar/active-calendar.md`
9. `../../competitors/primary-competitors.md`

## If the task is about AI features / lead capture
Read in this order:
1. [AI Feature Stack](../concepts/ai-feature-stack.md)
2. [Lead Capture System](../concepts/lead-capture-system.md)
3. [Digital Helper Next.js](../entities/digital-helper-nextjs.md)
4. `../../../src/app/api/chat/route.ts`
5. `../../../src/app/api/business-analysis/route.ts`
6. `../../../src/app/api/seo-analysis/route.ts`
7. `../../../src/app/actions/leads.ts`
8. `../../../src/lib/api-middleware.ts`
9. `../../../src/lib/rate-limit.ts`

## If the task is about core site architecture / implementation
Read in this order:
1. [Where To Change Things](where-to-change-things.md)
2. [Digital Helper Next.js](../entities/digital-helper-nextjs.md)
3. [Maintenance Checklist](maintenance-checklist.md)
4. `../../../AGENTS.md`
5. `../../../package.json`
6. `../../../src/app/layout.tsx`
7. `../../../src/app/page.tsx`
8. `../../../src/app/services/page.tsx`
9. `../../../src/app/locations/page.tsx`
10. `../../../src/app/industries/page.tsx`

## If the task touches proof, testimonials, rankings, reviews, or case studies
Start with:
1. [Proof Assets](../entities/proof-assets.md)
2. [Decision Log](decision-log.md)
3. `../../../BUSINESS.md`
4. `../../../src/app/layout.tsx`
5. `../../../src/components/RecentWork.tsx`
6. `../../../src/components/SocialProofTicker.tsx`

## If the task is about services
Start with:
1. [Service Portfolio](../entities/service-portfolio.md)
2. [Services vs Verticals](../comparisons/services-vs-verticals.md)
3. `../../../src/app/services/web-design/page.tsx`
4. `../../../src/app/services/seo/page.tsx`
5. `../../../src/app/services/ai-automation/page.tsx`
6. `../../../src/app/services/lead-generation/page.tsx`
7. `../../../src/app/services/reputation-management/page.tsx`

## If the task is about local pages
Start with:
1. [Tri-Cities Location Strategy](../concepts/tri-cities-location-strategy.md)
2. [Location Pages vs Keyword Clusters](../comparisons/location-pages-vs-keyword-clusters.md)
3. `../../../src/app/locations/page.tsx`
4. `../../../src/app/locations/richland/page.tsx`
5. `../../../src/app/locations/kennewick/page.tsx`
6. `../../../src/app/locations/pasco/page.tsx`
7. `../../../src/app/locations/west-richland/page.tsx`

## If the task is about industries / verticals
Start with:
1. [Vertical Market Strategy](../concepts/vertical-market-strategy.md)
2. [Services vs Verticals](../comparisons/services-vs-verticals.md)
3. `../../../src/app/industries/page.tsx`
4. [Agriculture Vertical](../entities/industry-agriculture.md)
5. [Healthcare Vertical](../entities/industry-healthcare.md)
6. [Manufacturing Vertical](../entities/industry-manufacturing.md)
7. [Retail and E-commerce Vertical](../entities/industry-retail-ecommerce.md)
8. [Wineries Vertical](../entities/industry-wineries.md)

## If the task is about audits / reporting
Start with:
1. [Audit Framework](../concepts/audit-framework.md)
2. [Reporting Cadence](../concepts/reporting-cadence.md)
3. [Wiki Lint Query](../queries/wiki-lint-2026-04-09.md)
4. `../../audits/technical/README.md`
5. `../../audits/content/README.md`
6. `../../audits/domain/README.md`
7. `../../audits/backlink/README.md`
8. `../../reports/monthly/README.md`
9. `../../reports/quarterly/README.md`
10. `../../reports/campaign/README.md`

## Fast decision guide
- Need positioning? -> business + competitor pages
- Need rankings/content? -> SEO + keyword + location pages
- Need app behavior? -> AI stack + API routes + actions
- Need implementation context? -> where-to-change page + codebase page + source files
- Need campaign/audit context? -> audit/reporting pages + memory templates

## Related pages
- [SEO Memory System](../concepts/seo-memory-system.md)
- [Digital Helper Next.js](../entities/digital-helper-nextjs.md)
- [Digital Helper](../entities/digital-helper.md)
- [Where To Change Things](where-to-change-things.md)
- [Decision Log](decision-log.md)
- [Proof Assets](../entities/proof-assets.md)
