---
title: AI Feature Stack
created: 2026-04-08
updated: 2026-04-08
type: concept
status: active
tags: [ai, gemini, api, lead-gen, conversion, project, architecture]
sources: [../../AGENTS.md, ../../memory/glossary.md, ../../src/app/api/chat/route.ts, ../../src/app/api/business-analysis/route.ts, ../../src/app/api/seo-analysis/route.ts, ../../src/app/actions/leads.ts]
---

# AI Feature Stack

## Overview
Digital Helper uses AI both as a product differentiator and as an operational lead-capture engine.
The current stack is centered on Gemini-backed experiences exposed through chat, business analysis, and SEO analysis workflows.

## Main AI-facing surfaces
- Chat widget with tool calling for quote generation, scheduling, and website analysis
- Business analysis endpoint that researches a business and proposes a website concept
- SEO analysis endpoint that scrapes a site, extracts simple metrics, and returns an AI-generated grade and quick wins
- Lead capture/storage workflows that tie AI interactions to downstream contact records

## Technical pattern
The implementation uses Google AI tooling in multiple ways:
- `@ai-sdk/google` with `streamText` for conversational streaming
- `@google/genai` for request/response style content generation
- rate-limited API routes to protect AI endpoints

## Business significance
This is one of the clearest expressions of the company's differentiator: AI is not only marketing copy, it is embedded in prospect-facing website utilities.

## Constraints and dependencies
- Gemini API credentials are required
- rate limiting matters because these endpoints are expensive and abusable
- lead capture quality depends on good handoff into contact, audit, or chat flows

## Related pages
- [Lead Capture System](lead-capture-system.md)
- [Digital Helper Next.js](../entities/digital-helper-nextjs.md)
- [Service Portfolio](../entities/service-portfolio.md)
- [Keyword Strategy](keyword-strategy.md)
