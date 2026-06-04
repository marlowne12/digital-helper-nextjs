---
title: Digital Helper Next.js
created: 2026-04-08
updated: 2026-04-27
type: entity
status: active
tags: [project, codebase, architecture, nextjs, react, tailwind, ai, gemini, api, ui]
sources: [../raw/project-context/initial-project-context-2026-04-08.md, ../../package.json, ../../AGENTS.md]
---

# Digital Helper Next.js

## Overview
`digital-helper-nextjs` is the project-local Next.js codebase for the Digital Helper site.
It appears to be both a marketing site and an application surface for AI-assisted workflows.

## Technology stack
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Radix UI
- Gemini / Google AI integrations
- Supabase and Upstash-related dependencies

## Architectural themes from project notes
- App Router structure
- Server actions for AI-powered backend logic
- API routes for streaming chat/service endpoints
- Shared validation and typed domain models
- Strong design-system orientation

## Operational notes
- Primary commands are documented in `AGENTS.md`
- Environment variables are required for Google Places and Google Generative AI usage
- The existing `memory/` tree already functions as partial project memory, especially for SEO/growth work

## Related pages
- [Digital Helper](digital-helper.md)
- [Service Portfolio](service-portfolio.md)
- [AI Feature Stack](../concepts/ai-feature-stack.md)
- [Lead Capture System](../concepts/lead-capture-system.md)
- [SEO Memory System](../concepts/seo-memory-system.md)
- [Where To Change Things](../queries/where-to-change-things.md)
- [Maintenance Checklist](../queries/maintenance-checklist.md)
