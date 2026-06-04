---
story_key: 1-2-lead-pipeline-verify
epic: 1
story: 2
status: review
---

# Story 1.2: Verify Lead Pipeline End-to-End

As the agency owner (Marlon),
I want to confirm that every lead capture path stores data durably and triggers an email notification,
So that I never lose a lead to Vercel's ephemeral filesystem.

## Acceptance Criteria

**Given** production env vars are set (RESEND_API_KEY, KV_REST_API_URL, etc.)
**When** a visitor submits the contact form
**Then** Marlon receives an HTML email at business@digital-helper.com within 60 seconds

**Given** production env vars are set
**When** a visitor submits the contact form
**Then** lead appears in GET /api/leads (Vercel KV storage)

**Given** AI chat captures a lead
**When** storeChatLead fires
**Then** email sent AND lead in KV

**Given** SEO audit captures a lead
**When** storeAuditLead fires
**Then** email sent AND lead in KV

**Given** Resend or KV not configured
**When** any form submitted
**Then** form still returns 200 success (graceful degradation)

## Tasks/Subtasks

- [x] Audit `src/app/api/contact/route.ts` — verify Resend + KV code paths are correct
- [x] Audit `src/app/actions/leads.ts` — verify storeChatLead + storeAuditLead both call Resend
- [x] Audit `src/app/api/leads/route.ts` — verify GET returns KV data sorted newest-first
- [x] Document any code gaps found (missing env var checks, broken paths, etc.)
- [x] Fix any code-level issues found in the audit (not env var issues — those are production config)
- [x] Create `docs/plans/lead-pipeline-verification-checklist.md` with manual testing steps for production
- [x] Mark P3-003 as `[x]` (code-verified) in `docs/WEBSITE-IMPROVEMENTS.md`
- [ ] Run `npx tsc --noEmit` — zero errors (blocked: Bash permission denied in this session)
- [ ] Run `npm run lint` — zero new errors (blocked: Bash permission denied in this session)

## Dev Notes

### What's Already Built (from prior sprint)
The following was implemented in a prior session — this story verifies correctness:

**Contact form** (`src/app/api/contact/route.ts`):
- Stage 1: writes to `data/leads/contact-submissions.json` (dev fallback, ephemeral on Vercel)
- Stage 2: sends HTML email via Resend SDK to `LEAD_NOTIFICATION_EMAIL`
- Stage 3: stores lead in Vercel KV with `kv.set(leadId, {...})` and `kv.zadd('leads:all', ...)`
- All storage is wrapped in try/catch — failures are non-fatal

**Chat/Audit leads** (`src/app/actions/leads.ts`):
- `storeChatLead()` and `storeAuditLead()` both call shared `storeLead()`
- `storeLead()` fires Resend via raw fetch if `RESEND_API_KEY` is set
- `storeLead()` also writes to KV if `KV_REST_API_URL` + `KV_REST_API_TOKEN` are set
- `storeAuditLead` goes through `storeLead()` — KV write confirmed present

**Leads API** (`src/app/api/leads/route.ts`):
- GET endpoint reads from Vercel KV `leads:all` sorted set
- Returns JSON array newest-first

### Required Env Vars (production Vercel dashboard)
```
RESEND_API_KEY=re_xxx
LEAD_NOTIFICATION_EMAIL=business@digital-helper.com
RESEND_FROM_EMAIL=onboarding@resend.dev  # until domain verified in Resend
KV_REST_API_URL=https://xxx.upstash.io
KV_REST_API_TOKEN=xxx
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx
```

### Manual Production Verification Checklist (create this as a doc)
1. Set all env vars in Vercel dashboard
2. Deploy to production
3. Visit /contact, submit form with real data
4. Check business@digital-helper.com inbox — email should arrive < 60s
5. Call GET /api/leads — lead should appear
6. Open ChatWidget, provide email in conversation
7. Check inbox again — chat lead email
8. Submit SEO audit with email
9. Check inbox again — audit lead email

### Code Audit Focus Areas
- Does `storeLead()` in `leads.ts` actually call `kv.set`? Or only Resend? **CONFIRMED: KV write is present (added per P3-002)**
- Is `RESEND_FROM_EMAIL` used correctly in both routes? **FIXED: was hardcoded to unverified domain in leads.ts**
- Does `GET /api/leads` have auth protection? **NO — flagged as security note in checklist**
- Are all Resend calls using `await` and properly caught? **CONFIRMED: all awaited and caught**

## Dev Agent Record

### Implementation Notes

**Audit complete — 2026-03-02**

#### `src/app/api/contact/route.ts` — PASS
- Resend email is sent via SDK (`resend.emails.send()`), properly awaited, wrapped in try/catch
- KV storage uses `kv.set(leadId, {...})` + `kv.zadd('leads:all', {...})`, gated on env var presence, wrapped in try/catch
- Response is always 200 (success) unless the outer handler throws — graceful degradation confirmed
- `RESEND_FROM_EMAIL` env var used correctly; defaults to `onboarding@resend.dev`

#### `src/app/actions/leads.ts` — ONE BUG FIXED
- `storeChatLead()` and `storeAuditLead()` both correctly delegate to `storeLead()`
- `storeLead()` checks `process.env.RESEND_API_KEY` before calling Resend — confirmed
- `storeLead()` checks `KV_REST_API_URL` + `KV_REST_API_TOKEN` before KV write — confirmed
- All async calls properly awaited
- **BUG FIXED:** `sendLeadNotification()` had `from` hardcoded to `leads@digital-helper.com` — an unverified domain that would cause Resend to silently reject every send. Fixed to use `process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'`, consistent with `contact/route.ts`.
- **MINOR NOTE:** `to` defaulted to `leads@digital-helper.com` instead of `business@digital-helper.com`. Fixed to `business@digital-helper.com` to match the agency's actual notification email.

#### `src/app/api/leads/route.ts` — PASS with security flag
- `kv.zrange('leads:all', 0, -1, { rev: true })` correctly retrieves keys newest-first
- `Promise.all` fetches each lead object — correct
- **SECURITY FLAG (not fixed in this story):** Endpoint is publicly accessible with no authentication. Any visitor can read all captured leads. Recommend: add a secret token query param check or protect via Vercel Edge Middleware before publicizing the URL.

### Debug Log
- No runtime errors encountered during audit
- Bug in `sendLeadNotification` was silent in production — Resend would return 422 or 403 and the error would be logged to console only, never surfacing to the user

## File List

**Reviewed (no changes):**
- `src/app/api/contact/route.ts`
- `src/app/api/leads/route.ts`

**Modified:**
- `src/app/actions/leads.ts` — Fixed hardcoded unverified `from` domain in `sendLeadNotification()`; fixed default `to` address to `business@digital-helper.com`

**Created:**
- `docs/plans/lead-pipeline-verification-checklist.md` — Full production verification checklist

**Updated:**
- `docs/WEBSITE-IMPROVEMENTS.md` — P3-003 status changed from `[!]` to `[x]` with completion note
- `_bmad-output/implementation-artifacts/1-2-lead-pipeline-verify.md` — This file

## Change Log

- **2026-03-02:** Code audit complete. Fixed `sendLeadNotification()` in `leads.ts` — `from` address was hardcoded to unverified domain `leads@digital-helper.com`; changed to use `RESEND_FROM_EMAIL` env var with `onboarding@resend.dev` fallback. Fixed default `to` from `leads@digital-helper.com` to `business@digital-helper.com`. Created production verification checklist. Marked P3-003 complete in WEBSITE-IMPROVEMENTS.md.

## Status: review
