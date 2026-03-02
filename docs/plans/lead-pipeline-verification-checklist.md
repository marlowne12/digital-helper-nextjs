# Lead Pipeline Production Verification Checklist

**Story:** 1-2-lead-pipeline-verify
**Created:** 2026-03-02
**Covers:** Contact form, chat lead, SEO audit lead, /api/leads endpoint

---

## Required Environment Variables

Set all of these in the Vercel project dashboard under **Settings > Environment Variables**.

| Variable | Required | Value | Notes |
|---|---|---|---|
| `RESEND_API_KEY` | YES | `re_xxxxxxxxxxxx` | From resend.com dashboard > API Keys |
| `LEAD_NOTIFICATION_EMAIL` | YES | `business@digital-helper.com` | Destination for all lead notification emails |
| `RESEND_FROM_EMAIL` | YES (until domain verified) | `onboarding@resend.dev` | Must be `onboarding@resend.dev` until `digital-helper.com` is verified in Resend. After domain verification, switch to `leads@digital-helper.com` or similar. |
| `KV_REST_API_URL` | YES (for durable storage) | `https://xxx.upstash.io` | Auto-injected by Vercel when a KV store is linked to this project |
| `KV_REST_API_TOKEN` | YES (for durable storage) | `AXxx...` | Auto-injected by Vercel when a KV store is linked to this project |
| `UPSTASH_REDIS_REST_URL` | YES (for rate limiting) | `https://xxx.upstash.io` | Same Upstash instance as KV, or a separate Redis instance |
| `UPSTASH_REDIS_REST_TOKEN` | YES (for rate limiting) | `AXxx...` | Token for the Upstash Redis instance |

### How to Get These Values

**Resend (email):**
1. Sign up at [resend.com](https://resend.com)
2. Dashboard > API Keys > Create API Key
3. Copy `re_xxx` value into `RESEND_API_KEY`
4. While testing, `RESEND_FROM_EMAIL=onboarding@resend.dev` only sends to your registered Resend account email — verify `business@digital-helper.com` is registered in Resend or set `LEAD_NOTIFICATION_EMAIL` to the email you registered with

**Vercel KV (lead storage):**
1. Vercel dashboard > Storage > Create Database > KV
2. Give it a name (e.g., `digital-helper-kv`)
3. Connect it to the `digital-helper-nextjs` project
4. Vercel auto-injects `KV_REST_API_URL` and `KV_REST_API_TOKEN` — no manual copy needed

**Upstash Redis (rate limiting):**
1. [upstash.com](https://upstash.com) > Create Database > Redis
2. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from the database details page

---

## Step-by-Step Manual Test Plan

### Prerequisite: Deploy with all env vars set
Before testing, redeploy the project in Vercel with all env vars configured. Check the deployment logs for any startup errors.

---

### Test 1: Contact Form Lead

**Steps:**
1. Navigate to `https://digital-helper.com/contact`
2. Fill in all fields:
   - Full Name: `Test Lead [timestamp]`
   - Email: `your-test-email@example.com`
   - Phone: `(509) 555-0100`
   - Service: `AI Automation`
   - Budget: `$1,000 – $3,000`
   - Timeline: `Within 1 Month`
   - Message: `This is a pipeline verification test — [timestamp]`
3. Click Submit

**Expected outcomes:**
- Form shows success message: "Thank you for reaching out! We'll get back to you within 24 hours."
- HTTP response is `200 OK` with `{ success: true }`
- Within 60 seconds, `business@digital-helper.com` receives an HTML email with subject `New Lead: Test Lead — AI Automation`
- Email contains: name, email, phone, service, budget, timeline, message, lead ID, and a "Reply to Test Lead" button
- Lead appears in `GET /api/leads` response (see Test 4)

**How to verify in Vercel logs:**
- Vercel dashboard > Deployments > [latest] > Functions > `/api/contact`
- Look for: `[contact] Email notification sent for lead xxx`
- Look for: `[contact] Lead stored in KV as lead:xxx`

---

### Test 2: Chat Lead Capture

**Steps:**
1. Navigate to `https://digital-helper.com` (homepage)
2. Open the chat widget (bottom-right corner)
3. Start a conversation — when prompted, provide a real email address
4. Complete enough of the conversation that `storeChatLead` fires (the widget captures email after a few exchanges)

**Expected outcomes:**
- `business@digital-helper.com` receives a notification email with subject `New Lead: chat - [email]`
- Email contains: source=chat, email, metadata with message count and conversation summary
- Lead appears in `GET /api/leads` response

**How to verify in Vercel logs:**
- Vercel dashboard > Functions > `/api/chat`
- Look for: `[Lead Captured]` JSON log entry
- Look for: `[leads] Stored in KV as lead:xxx`

---

### Test 3: SEO Audit Lead Capture

**Steps:**
1. Navigate to `https://digital-helper.com/tools/seo-audit` (or wherever the audit widget is embedded)
2. Enter a business name, location, and email address
3. Submit the audit request

**Expected outcomes:**
- `business@digital-helper.com` receives a notification email with subject `New Lead: website_audit - [email]`
- Email contains: source=website_audit, businessName, location, email
- Lead appears in `GET /api/leads` response

**How to verify in Vercel logs:**
- Look for: `[Lead Captured]` JSON with `source: "website_audit"`
- Look for: `[leads] Stored in KV as lead:xxx`

---

### Test 4: Verify Leads in /api/leads

**Steps:**
1. After completing Tests 1-3, open your browser or use curl:
   ```
   curl https://digital-helper.com/api/leads
   ```
2. Check the JSON response

**Expected outcomes:**
- Response: `{ "leads": [...], "total": N }` where N >= 3 (from tests above)
- Leads are sorted newest-first (highest `timestamp` value first)
- Each lead object contains all the fields that were submitted

**Security note:** This endpoint has no authentication. It is publicly accessible. Any visitor can enumerate all leads by visiting `/api/leads`. This should be protected before the site has real traffic. Recommended fix: add a secret token check (`?token=xxx`) or move behind Vercel Edge middleware with basic auth. This is flagged for a future story — do NOT deploy and publicize this URL.

---

### Test 5: Graceful Degradation (Resend not configured)

**Steps:**
1. Temporarily remove `RESEND_API_KEY` from Vercel env vars (or test locally without it set)
2. Submit the contact form

**Expected outcomes:**
- Form still returns `200 OK` with success message — user is NOT shown an error
- Vercel logs show: `[contact] RESEND_API_KEY not set — skipping email notification`
- No email is sent (expected)
- Lead is still stored in KV if `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set

---

### Test 6: Graceful Degradation (KV not configured)

**Steps:**
1. Temporarily remove `KV_REST_API_URL` from Vercel env vars
2. Submit the contact form

**Expected outcomes:**
- Form still returns `200 OK` with success message
- If `RESEND_API_KEY` is set, email is still sent
- Vercel logs show no KV storage attempt (the KV block is gated on the env var presence)

---

## Checking Vercel KV Data in the Dashboard

1. Go to [vercel.com](https://vercel.com) and open the `digital-helper-nextjs` project
2. Click **Storage** in the left sidebar
3. Click the KV database you linked to this project
4. In the KV explorer, look for:
   - Key prefix `lead:` — individual lead records (JSON blobs)
   - Key `leads:all` — the sorted set that indexes all lead keys by timestamp
5. Click any `lead:xxx` key to view the full JSON for that lead
6. To see all leads in order, click `leads:all` — it shows members with their scores (epoch ms)

**CLI alternative** (if you have the Vercel CLI installed):
```bash
vercel env pull  # pulls env vars locally
# Then in a local Node script:
# const { kv } = require('@vercel/kv')
# const keys = await kv.zrange('leads:all', 0, -1, { rev: true })
# console.log(keys)
```

---

## Known Limitations

1. **No auth on /api/leads** — publicly readable. Flag for future story.
2. **Resend from address** — `onboarding@resend.dev` only delivers to the Resend account's registered email until `digital-helper.com` domain is verified in Resend. Verify the domain to unlock full delivery to `business@digital-helper.com`.
3. **Chat and audit leads use raw fetch to Resend** — not the Resend SDK. Both approaches work identically; just a style inconsistency between `leads.ts` and `contact/route.ts`.
4. **`storeLead()` calls `trackLeadCapture()` with a `window` guard** — on the server (which is always the case for server actions), analytics tracking is silently skipped. This is intentional and correct.
