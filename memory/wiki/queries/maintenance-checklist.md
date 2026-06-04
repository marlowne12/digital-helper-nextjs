---
title: Maintenance Checklist
created: 2026-04-27
updated: 2026-04-27
type: query
status: active
tags: [summary, memory-system, testing, roadmap, codebase]
sources: [../../../AGENTS.md, ../../../memory/wiki/SCHEMA.md, ../../../memory/wiki/index.md, ../../../memory/wiki/log.md, ../../../package.json]
---

# Maintenance Checklist

## Purpose
Use this checklist when refreshing the project memory or before relying on it for a major implementation pass.

## Monthly memory health check
- Read `../SCHEMA.md`, `../index.md`, and the latest entries in `../log.md`.
- Confirm every page listed in `../index.md` still exists.
- Search for unindexed wiki pages and add missing entries.
- Check for links that no longer resolve.
- Confirm frontmatter exists on all pages except `README.md`, `SCHEMA.md`, `index.md`, and `log.md`.
- Re-check source references that point outside `memory/wiki`, especially older relative paths.

## Codebase freshness check
- Compare [Where To Change Things](where-to-change-things.md) against the current `../../../src/` tree.
- Verify admin, content generator, reputation dashboard, lead scraper, and contact flow paths still exist.
- Refresh [Digital Helper Next.js](../entities/digital-helper-nextjs.md) when major app structure changes.
- Add new pages for major systems that become central to the business or codebase.

## Business truth check
- Compare `../../../BUSINESS.md`, `../../../DESIGN_SYSTEM.md`, and `../../../src/lib/business-info.ts`.
- Look for phone, email, city, booking URL, service, and CTA drift.
- Review [Proof Assets](../entities/proof-assets.md) before accepting public-facing proof claims.
- Update [Decision Log](decision-log.md) if a business decision changed.

## Verification check
- Prefer `npm test` for existing unit coverage.
- Use `npx tsc --noEmit` for type safety when TypeScript changes.
- Use `npm run build` for release readiness when route behavior or Next.js config changes.
- Treat noisy lint/build failures as findings to triage, not as proof that all changed files are broken.

## Suggested cadence
- Quick check: before every large coding session.
- Full check: monthly or after every 10 significant wiki updates.
- Proof check: before every public marketing or SEO copy pass.

## Related pages
- [Source Map](source-map.md)
- [Where To Change Things](where-to-change-things.md)
- [Decision Log](decision-log.md)
- [Proof Assets](../entities/proof-assets.md)
