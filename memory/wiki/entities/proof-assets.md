---
title: Proof Assets
created: 2026-04-27
updated: 2026-04-27
type: entity
status: active
tags: [business, conversion, reputation, positioning, summary]
sources: [../../../BUSINESS.md, ../../../AGENTS.md, ../../../src/app/layout.tsx, ../../../src/lib/business-info.ts, ../../../memory/wiki/entities/digital-helper.md]
---

# Proof Assets

## Purpose
This page is the trust registry for Digital Helper. Use it before adding testimonials, review counts, case studies, rankings, statistics, client logos, or performance claims.

## Current rule
Prefer removing or neutralizing unverifiable proof over polishing it. A claim is safe only when there is a source file, production artifact, customer record, analytics export, public listing, or other evidence that a future agent can inspect.

## Approved proof categories
- Business identity: Digital Helper, Richland, WA, serving the Tri-Cities area.
- Service focus: web design, local SEO, AI automation, lead generation, and reputation management.
- Technical stack: Next.js, React, Tailwind CSS, Gemini/Google AI integrations, Supabase, Upstash, Vercel.
- Local market focus: Richland, Kennewick, Pasco, and West Richland.
- Offer positioning: local, outcome-focused, AI-enabled web and SEO services.

## Needs verification before use
- Review counts and aggregate ratings in structured data.
- Client names and case-study results.
- Ranking claims such as number-one local SEO results.
- Traffic, conversion, lead volume, revenue, or ROI statistics.
- Testimonials, awards, badges, and publication mentions.
- "Trusted by" or logo-wall style claims.

## Known risky areas to inspect
- `../../../src/app/layout.tsx` contains LocalBusiness JSON-LD rating fields. Verify these are backed by real review data before relying on them in public copy.
- Portfolio and case-study components may contain example businesses or placeholder outcomes. Confirm before presenting them as real results.
- Social proof widgets and tickers should avoid implying live customer proof unless the source is explicit.

## Safer copy patterns
- "Built for Tri-Cities businesses" is safer than an unsupported market-share claim.
- "Designed to improve calls, bookings, and local visibility" is safer than an unsupported ROI number.
- "Free website audit" is safer than claiming a guaranteed ranking increase.
- "AI-enabled workflows" is safer than implying a fully autonomous system where the implementation is still limited.

## Approval workflow
1. Find the claim in code or copy.
2. Trace it to a source file or external evidence.
3. If evidence exists, add a note here with the source.
4. If evidence is missing, rewrite the claim as a capability or remove it.
5. Update [Decision Log](../queries/decision-log.md) if the decision should persist.

## Related pages
- [Digital Helper](digital-helper.md)
- [Service Portfolio](service-portfolio.md)
- [Lead Capture System](../concepts/lead-capture-system.md)
- [Decision Log](../queries/decision-log.md)
