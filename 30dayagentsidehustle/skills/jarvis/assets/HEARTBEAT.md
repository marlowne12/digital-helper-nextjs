# HEARTBEAT.md — Autonomous Work Cycles

## How It Works

On each heartbeat poll, read this file and follow it. Four rotating cycles ensure everything gets checked within an hour.

**Use minute of the hour to determine cycle. Check `date +%M`:**
- **Cycle A** (minutes 00-14): Notifications and communications check
- **Cycle B** (minutes 15-29): Community and ecosystem monitoring
- **Cycle C** (minutes 30-44): Usage monitoring and cleanup
- **Cycle D** (minutes 45-59): Autonomous work

## Cycle A: Communications

1. Check for new messages, mentions, or notifications
2. Reply to anything that needs a response
3. Flag anything urgent for your human

## Cycle B: Monitoring

1. Scan relevant sources for updates (news, community, competitors)
2. Log findings to daily memory under `## Community Learnings`
3. Flag anything actionable

## Cycle C: Maintenance

1. Check resource usage (tokens, API calls, storage)
2. Clean up temporary files, close browser tabs
3. Verify cron jobs are healthy

## Cycle D: Autonomous Work

1. Check for pending tasks from your human
2. Check context files for in-progress work
3. Do **one atomic chunk** of work on the highest-priority item
4. Update the relevant context file with current state + next step
5. If the queue is empty, reply HEARTBEAT_OK

**Rules:**
- One chunk per cycle. Small bites, steady progress.
- Never skip the context file update — that's how the next cycle picks up.
- If blocked, log why and move to next item.

---

## Customize This

This is a starting template. Adapt the cycles to your actual work:
- Add specific accounts to monitor in Cycle B
- Add specific integrations to check in Cycle C
- Define your work queue location for Cycle D

---

*If nothing needs attention on a heartbeat, reply: HEARTBEAT_OK*
