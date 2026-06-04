---
title: Lead Capture System
created: 2026-04-08
updated: 2026-04-08
type: concept
status: active
tags: [lead-gen, conversion, api, ai, analytics, infrastructure]
sources: [../../AGENTS.md, ../../memory/glossary.md, ../../src/app/actions/leads.ts, ../../src/app/api/chat/route.ts, ../../src/app/api/seo-analysis/route.ts, ../../src/app/api/business-analysis/route.ts]
---

# Lead Capture System

## Overview
Digital Helper's site is designed not just to inform visitors but to capture and qualify them through multiple entry points.
The code and memory files imply a blended funnel of chat, website audits, contact forms, exit-intent capture, and newsletter-style collection.

## Capture channels
- website audit submissions
- chat interactions
- contact form submissions
- exit-intent collection
- newsletter collection

## Storage/notification pattern
Lead handling currently supports:
- structured lead object creation
- optional analytics tracking
- optional email notification via Resend
- optional Supabase persistence with graceful fallback when unavailable

## Funnel logic
This system complements the AI feature stack:
- AI tools create engagement and perceived value
- structured lead actions persist the prospect data
- notifications and storage make follow-up possible

## Strategic significance
For a services business, this is the operational backbone connecting marketing traffic to sales conversations.
It also supports the pitch that the company builds websites that behave like sales systems, not brochures.

## Related pages
- [AI Feature Stack](ai-feature-stack.md)
- [Service Portfolio](../entities/service-portfolio.md)
- [Digital Helper Next.js](../entities/digital-helper-nextjs.md)
- [Content Engine](content-engine.md)
