---
title: Decision Log
created: 2026-04-27
updated: 2026-04-27
type: query
status: active
tags: [summary, roadmap, memory-system, business, conversion, ui, seo]
sources: [../../../AGENTS.md, ../../../BUSINESS.md, ../../../DESIGN_SYSTEM.md, ../../../memory/wiki/index.md, ../../../memory/wiki/log.md]
---

# Decision Log

## Purpose
This page captures durable choices that future agents should preserve unless a newer source explicitly changes them.

## Durable decisions

### BUSINESS.md is the business source of truth
Use `../../../BUSINESS.md` for company messaging, services, market, and positioning. Do not reintroduce older upstream defaults or generic agency language when a business-specific source exists.

### DESIGN_SYSTEM.md is the visual source of truth
Use `../../../DESIGN_SYSTEM.md` and the current app styling for dark premium, glass, teal/cyan/blue accent behavior. Avoid broad visual resets unless the task explicitly asks for a redesign.

### Conversion comes before decoration
Public pages should prioritize clear consultation and audit flows over decorative marketing sections. Copy should be direct, local, and outcome-focused.

### CTA hierarchy should stay consultation-first
Preserve the known hierarchy where the primary CTA is the consultation path and the secondary CTA is the free website audit path, unless the business owner changes the funnel.

### Local SEO is a core growth channel
Richland and Tri-Cities service-location pages are not filler. They are part of the ranking strategy for web design, SEO, and related local service queries.

### Proof must be verifiable
Do not invent or strengthen unsupported claims. Use [Proof Assets](../entities/proof-assets.md) before touching reviews, case studies, stats, rankings, or social proof.

### Reuse existing app patterns
Prefer the current Next.js App Router structure, existing components, shadcn/Radix primitives, Tailwind v4 utilities, and `@/` imports over new abstractions.

### Runtime readiness matters
For setup, repair, or launch work, finish with real verification where practical: tests, build, typecheck, lint, health check, smoke route, or dev-server check.

## Change policy
If a future task changes one of these decisions:
- Update the relevant source file first.
- Update this page with the new decision.
- Append the change to `../log.md`.

## Related pages
- [Where To Change Things](where-to-change-things.md)
- [Proof Assets](../entities/proof-assets.md)
- [SEO Memory System](../concepts/seo-memory-system.md)
- [Digital Helper](../entities/digital-helper.md)
