---
title: SEO Memory System
created: 2026-04-08
updated: 2026-04-08
type: concept
status: active
tags: [memory-system, seo, content, competitor, keyword, summary, project]
sources: [../raw/project-context/initial-project-context-2026-04-08.md, ../../AGENTS.md, ../../memory/glossary.md]
---

# SEO Memory System

## Overview
The project already contains a `memory/` directory that stores SEO and growth context such as keywords, competitors, calendars, audits, and reports.
This wiki extends that system instead of replacing it.

## Practical division of labor
- `memory/keywords/`, `memory/competitors/`, `memory/audits/`, `memory/reports/`:
  source-like operational project memory
- `memory/wiki/raw/`:
  immutable snapshots used to seed or justify wiki updates
- `memory/wiki/entities/`, `concepts/`, `comparisons/`, `queries/`:
  synthesized assistant-friendly knowledge pages

## Why this helps
- makes project orientation faster for future sessions
- separates source material from summaries
- keeps durable explanations in stable markdown pages
- avoids depending on long chat history or tool output alone

## Maintenance rule
When a topic already exists in `memory/`, prefer linking to or summarizing it rather than duplicating large blocks of content inside the wiki.

## Related pages
- [Digital Helper](../entities/digital-helper.md)
- [Digital Helper Next.js](../entities/digital-helper-nextjs.md)
- [Keyword Strategy](keyword-strategy.md)
- [Competitor Landscape](competitor-landscape.md)
- [Content Engine](content-engine.md)
