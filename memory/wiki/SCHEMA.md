# Wiki Schema

## Domain
Digital Helper — the digital-helper.com business, its Next.js codebase, AI features, local SEO strategy, lead-generation workflows, and growth operations.

Primary workspace:
- Site/project root: `/mnt/c/Users/marz/Downloads/digital-helper-nextjs`
- Production/business context: `digital-helper.com`

## Intent
This wiki exists to serve as durable assistant working memory for the project.
The goal is fast orientation, low duplication, and clear synthesis across product, marketing, SEO, and engineering.

## Conventions
- File names: lowercase, hyphens, no spaces
- All wiki pages use YAML frontmatter
- Use standard markdown links with relative paths for maximum tool compatibility
- Prefer short, high-signal pages over large narrative dumps
- Every new page must be added to `index.md`
- Every meaningful change must be appended to `log.md`
- Keep source snapshots in `raw/`; do not edit them after creation
- Treat existing project files as living sources of truth; the wiki summarizes and connects them

## Frontmatter
```yaml
---
title: Page Title
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: entity | concept | comparison | query | summary
status: active | draft | archived
tags: [approved-tag]
sources: [relative/path/to/source]
---
```

## Tag Taxonomy
Business / org:
- business
- website
- service
- offer
- pricing
- positioning
- audience

Growth / marketing:
- seo
- local-seo
- keyword
- competitor
- content
- campaign
- analytics
- conversion
- reputation
- lead-gen

Product / engineering:
- project
- codebase
- architecture
- nextjs
- react
- tailwind
- ai
- gemini
- api
- ui
- testing
- infrastructure

Meta:
- summary
- glossary
- roadmap
- memory-system

## Page Thresholds
- Create a page when a topic is central to the business or codebase, or appears repeatedly across sources
- Update an existing page when new evidence extends or changes an existing topic
- Do not create pages for minor implementation trivia unless it repeatedly matters
- Split a page when it becomes hard to scan in under 1 minute

## Preferred Page Types
### Entity pages
Use for durable “things”:
- the business
- the website/codebase
- major services
- major competitors
- key systems

### Concept pages
Use for recurring themes:
- local SEO strategy
- AI chat/review/analyzer features
- content engine
- lead qualification
- design system

### Comparison pages
Use for alternatives and trade-offs:
- feature options
- competitor comparisons
- implementation choices

### Query pages
Use only for answers worth keeping and reusing.

## Update Policy
When information conflicts:
1. Prefer explicit source files over older summaries
2. Prefer recent project files/config over old notes
3. If both matter, document the conflict instead of overwriting silently
4. Add a follow-up note in `log.md`

## Session Orientation Procedure
At the start of future work on this project:
1. Read `memory/wiki/SCHEMA.md`
2. Read `memory/wiki/index.md`
3. Read the latest section of `memory/wiki/log.md`
4. Search the wiki for the current topic before creating anything new
5. Read relevant source files in the project if the wiki summary needs verification

## Seed Sources
Initial high-value sources for this wiki:
- `AGENTS.md`
- `package.json`
- `memory/glossary.md`
- `memory/competitors/primary-competitors.md`
- `memory/keywords/hero-keywords.md`
- `memory/keywords/secondary-keywords.md`
- `memory/content-calendar/active-calendar.md`

## Lint Priorities
When auditing the wiki, check for:
- orphan pages
- stale summaries vs project sources
- broken links
- missing index entries
- pages with weak sourcing
- duplicated business/SEO concepts across pages
