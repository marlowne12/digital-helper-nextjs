# Deploy Checklist — Digital Helper

## What Changed

`src/app/contact/ContactPageContent.tsx` — rewrote the form handler to:
- Call `storeContactLead()` server action on submit
- Store leads in Supabase when available
- Send email notification via Resend when configured
- Show success/error states properly (no more `alert()`)
- Capture name + service type + message

`src/app/actions/leads.ts` — already has full lead handling with:
- Supabase storage (when configured)
- Resend email notifications (when API key present)
- Console logging (for debugging)
- Graceful fallback if database is down

---

## Env Vars to Set on Vercel

Go to https://vercel.com → your project → Settings → Environment Variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `RESEND_API_KEY` | `re_xxxx...` | Get from resend.com → API Keys |
| `LEAD_NOTIFICATION_EMAIL` | `digitalhelperwebsite@gmail.com` | Where you get notified |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Only if you resume Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Only if you resume Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Only if you resume Supabase |

**Note:** Supabase is paused, so leads won't store in the database yet. They WILL come through via email notification (Resend) as long as `RESEND_API_KEY` is set on Vercel. This is your fallback.

---

## Steps to Deploy

1. **Commit the changes:**
```bash
git add -A
git commit -m "fix: wire contact form to storeContactLead with proper state handling"
git push
```

2. **Vercel picks up the push automatically.** Check https://vercel.com for the deploy status.

3. **Test it:**
   - Go to digital-helper.com/contact
   - Fill out the form
   - You should get an email at `digitalhelperwebsite@gmail.com` within seconds
   - The form shows a success screen with "Mars will get back to you within 4 business hours"

---

## Local Dev Fix (LightningCSS error on WSL/Linux)

If you want to run `npm run dev` locally on Linux/WSL and get the error:
```
Cannot find module '../lightningcss.linux-x64-gnu.node'
```

Fix:
```bash
npm install lightningcss
```

Or use Windows PowerShell to run dev instead:
```powershell
cd C:\Users\marz\Downloads\digital-helper-nextjs
npm run dev
```

The production build on Vercel uses the Windows build pipeline, so this isn't an issue there.

---

## Getting Your First Customer — Action List

### This Week

**Day 1-2: Verify the site is working**
- [ ] Fill out the contact form yourself at digital-helper.com/contact
- [ ] Check your email — did you get a notification?
- [ ] If not, check Vercel env vars

**Day 3-4: Get leads flowing**
- [ ] Post in Richland/Kennewick Facebook groups:
  > "Hey neighbors — I run a web design and AI automation agency in Richland. Just launched my site. If anyone wants a free website audit, I got you: https://digital-helper.com"
- [ ] Post on Nextdoor (same message, local feel)
- [ ] Text everyone you know in Tri-Cities that has a business

**Day 5-7: Follow up**
- [ ] Check email every few hours
- [ ] Call/text within 4 hours of any form submission
- [ ] If you're not getting form submissions, get on 5 calls this week

### Your First Proposal Template

Save this as a Google Doc. Fill in the brackets:

```
[Client Name] — Digital Helper Proposal
=====================================

Hi [Name],

Based on our conversation, here's what I recommend:

WHAT YOU NEED: [their problem described in one sentence]

WHAT I'LL BUILD: [the service — e.g., a modern 5-page website]

TIMELINE: [X weeks from deposit to launch]

INVESTMENT: $[2500-5000] (50% to start, 50% on launch)

WHAT'S INCLUDED:
- Custom [service]
- [Feature 1]
- [Feature 2]
- 30 days of support after launch

GUARANTEE: If you're not satisfied, you pay nothing more.

Ready to start? Sign below and send 50% deposit.

— Mars
Digital Helper
(509) 987-5060
```

---

## Supabase — What to Do When You're Ready to Scale

Right now: Supabase is paused, leads come via email only (Resend).
When you're ready to store leads in a database:

1. Log into supabase.com → your project → Resume
2. Vercel env vars already have `NEXT_PUBLIC_SUPABASE_URL` etc. — just flip the switch
3. The `createLead()` function in `src/lib/database.ts` will automatically start storing data
4. You can then build an admin dashboard at `/admin` to see all leads in a table

---

## Quick Q&A

**Q: The site builds fine on Vercel but fails locally. Why?**
A: LightningCSS binary issue on WSL/Linux. Doesn't affect production. Use Windows to run local dev, or ignore it since Vercel builds are fine.

**Q: Leads are coming via email but not storing in Supabase. Is that OK?**
A: Yes — for now email IS your lead system. Supabase adds a database, history, and future admin dashboard. But email notifications mean you still capture every lead.

**Q: I got my first lead — now what?**
A: Call them within 4 hours. Don't overthink it. Ask what they're working on, what their biggest challenge is, and if it sounds like a fit, send a proposal.

**Q: What should I charge?**
A: From your BUSINESS.md: websites $2,500–$15,000, SEO $750–$3,000/month, AI automation $497–$997/month. Start at the lower end to get your first few customers, then raise prices.