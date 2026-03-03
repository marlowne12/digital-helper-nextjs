# Design: Parallel Tracks Improvement Plan
**Date:** 2026-02-28 | **Project:** digital-helper-nextjs | **Branch:** redesign-v2

## Decision
Option B — Parallel Tracks with dedicated agents per task and fresh context windows.

## Architecture

Two independent tracks run simultaneously. Track 1 clears broken/fake features while Track 2 advances the V2 visual redesign. Each task gets one dedicated agent with a fresh context window.

## Track 1 — Fix Team (7 agents, all parallel)

| Agent | Task | File(s) |
|-------|------|---------|
| 1A | Fix aiTools.ts fake analyzeWebsite | src/services/aiTools.ts |
| 1B | Fix HeroAuditWidget random fallback | src/components/HeroAuditWidget.tsx |
| 1C | Fix WebsiteAudit.tsx silent failure | src/components/WebsiteAudit.tsx |
| 1D | Fix ChatWidget Calendly placeholder | src/components/ChatWidget.tsx |
| 1E | Delete /dashboard/reputation route | src/app/dashboard/ |
| 1F | Create .env.example | .env.example |
| 1G | Find + delete conductor/ scaffolding | project root |

## Track 2 — V2 Redesign Team (sequential within track)

Order: Pricing page -> Service pages (9) -> About -> Contact -> Blog -> Locations (4) -> Industries (5)

Each agent reads: globals.css (V2 tokens), NavbarV2.tsx, FooterV2.tsx, and the existing V1 page being replaced.

## BMAD Workflow Role

bmad-agent-bmb-workflow-builder creates a reusable workflow that:
1. Reads open tasks from docs/WEBSITE-IMPROVEMENTS.md
2. Spawns the correct agent type per task
3. Marks tasks [x] complete after each agent finishes
4. Gates contact page redesign on form backend fix (P3-001)

## Success Criteria

- Phase 1 complete: all 7 P1 tasks marked [x], no fake data anywhere
- Track 2 milestone 1: Pricing page fully on V2
- Project complete: all inner pages V2, all P1-P3 tasks [x]

## Execution Model

- Agent teams over single-agent serial execution
- Fresh context window per task (no context bloat)
- Parallel where files do not overlap; sequential within track where order matters
- WEBSITE-IMPROVEMENTS.md is the single source of truth for task status
