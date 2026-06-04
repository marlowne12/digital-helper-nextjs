# HEARTBEAT.md

## Heartbeat Philosophy
Heartbeat fires every 30 minutes. Read heartbeat-state.json first — don't re-check anything within its cooldown window unless there's a new entry. Wake for: failed builds, urgent messages, cron failures, things ready for review. Stay quiet when nothing needs attention.

## Always Check
- [ ] **daily-briefs/** — any new morning-prep reports? Read if unread.
- [ ] **prospects/** — new leads from overnight-lead-hunter?
- [ ] **outreach/** — any new email drafts or responses ready for review?

## Rotate (2-4x/day)
- [ ] Workspace health — quick `npm run build` smoke test (only if not run in last 4h)
- [ ] SEO keyword snapshot — any ranking changes worth noting in memory/keywords/tracking.md?
- [ ] Competitor check — any competitor sites that changed significantly?

## Quiet Hours
Stay silent between **11 PM – 7 AM** unless there's something urgent.

## State File
Check **heartbeat-state.json** before any check. Update it after each check.
