# Digital Helper — Get First Customer & Run It Self

## Where We Are

| Item | Status |
|------|--------|
| Website (code) | ✅ Done — full Next.js site, contact form, service pages |
| Lead capture forms | ⚠️ Working but leaking — no database, leads disappear |
| Domain/hosting | ❓ Not verified — is digital-helper.com actually live? |
| CRM | ❌ None — manual tracking, cold leads |
| Follow-up automation | ❌ None — 24hr+ response time |
| Proposals | ❌ Manual — Mars writes each one from scratch |
| Invoicing | ❌ Manual — no automated system |
| Client portal | ❌ None |

---

## Phase 1: Stop Losing Leads (Critical — Do First)

**Goal:** Every lead that fills out any form gets stored, scored, and followed up.

### Task 1: Set Up Supabase Database

1. Go to https://supabase.com → Create free account → New project
2. Name it "digital-helper"
3. Wait for "Connection string" — copy the `postgres://...` URI
4. Add to your `.env.local`:
   ```
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"
   DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"
   ```
5. Install Prisma:
   ```bash
   npm install @prisma/client prisma
   npx prisma init
   ```
6. Create `prisma/schema.prisma`:
   ```prisma
   generator client {
     provider = "prisma-client-js"
   }

   datasource db {
     provider  = "postgresql"
     url       = env("DATABASE_URL")
     directUrl = env("DIRECT_URL")
   }

   model Lead {
     id        String   @id @default(uuid())
     email     String
     name      String?
     phone     String?
     company   String?
     source    String   // 'contact-form', 'audit', 'chat', 'exit-intent'
     status    String   @default("new") // new, contacted, qualified, proposal, won, lost
     score     Int      @default(50)     // 0-100
     notes     String?
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
   }

   model Waitlist {
     id        String   @id @default(uuid())
     email     String   @unique
     createdAt DateTime @default(now())
   }
   ```
7. Run `npx prisma db push` to create tables

### Task 2: Wire Contact Form to Database

Edit `/src/app/contact/actions.ts` or create a new server action:

```typescript
// src/app/actions/store-lead.ts
'use server';

import { prisma } from '@/lib/prisma';

export async function storeLead(formData: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  source: string;
}) {
  // 1. Save to DB
  const lead = await prisma.lead.create({
    data: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      company: formData.company || null,
      source: formData.source,
      status: 'new',
      score: calculateScore(formData),
    },
  });

  // 2. Send yourself a notification (email or Slack webhook)
  await fetch(process.env.SLACK_WEBHOOK_URL!, {
    method: 'POST',
    body: JSON.stringify({
      text: `New lead from ${formData.name} (${formData.email}) — ${formData.source}`,
    }),
  });

  // 3. Trigger welcome email via Resend
  await sendWelcomeEmail(formData.email, formData.name);

  return { success: true, leadId: lead.id };
}

function calculateScore(data: any): number {
  let score = 50;
  if (data.phone) score += 20;       // Has phone = serious
  if (data.company) score += 15;     // Has company = likely business
  if (data.message?.length > 20) score += 15; // Left a message = engaged
  return score;
}
```

Update the contact form component to call `storeLead()` instead of whatever it's doing now.

### Task 3: Wire Website Audit Form Too

The audit form at `/` is another lead source. Same pattern — point it at `storeLead()` with source `'audit'`.

### Task 4: Set Up Resend for Automated Emails

1. Go to https://resend.com → Create account
2. Add domain `digital-helper.com` (or use `noreply@digital-helper.com` for testing)
3. Get API key, add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxx
   ```
4. Create a welcome email template:

```typescript
// src/lib/email.ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, name: string) {
  await resend.emails.send({
    from: 'Digital Helper <noreply@digital-helper.com>',
    to: email,
    subject: 'Thanks for reaching out — we\'ll be in touch within 4 hours',
    html: `
      <h2>Hi ${name},</h2>
      <p>Thanks for contacting Digital Helper. We've received your message and a team member will reach out within <strong>4 business hours</strong>.</p>
      <p>While you wait, here are some resources:</p>
      <ul>
        <li><a href="https://digital-helper.com/work">Our portfolio</a></li>
        <li><a href="https://digital-helper.com/pricing">Service pricing</a></li>
        <li><a href="https://digital-helper.com/services/ai-automation">AI automation explained</a></li>
      </ul>
      <p>Questions? Text or call Mars directly: (509) 987-5060</p>
    `,
  });
}
```

**Install Resend:**
```bash
npm install resend
```

---

## Phase 2: Get Your Website Live (Do Second)

Your site is built but I need to know: **is it actually deployed and live?**

### Task 5: Deploy to Vercel (If Not Already)

```bash
# In your project directory
npm run build    # Verify it builds clean
npx vercel --prod   # First-time: log in with GitHub/GitLab
```

If you haven't connected to GitHub yet:
1. Push the code to a GitHub repo (create one at github.com/new)
2. Go to https://vercel.com → Import Project → select the repo
3. Add your environment variables (Supabase, Resend, etc.)
4. Deploy

**Verification:** Visit https://digital-helper.com — does it load?

### Task 6: Point Domain to Vercel (If Not Done)

In Vercel dashboard → your project → Settings → Domains:
- Add `digital-helper.com`
- Vercel gives you nameservers to set at your registrar

If you don't have a domain yet, buy one at Namecheap/Cloudflare ($10-15/year).

---

## Phase 3: Get Your First Customer

### Task 7: Make Your First Offer — "Website Rescue" Package

Create a simple landing page `/offer` or just use what you have. Lead with this:

**Offer:** "Your first website audit is free. If we can improve it, we'll fix one thing for $497. If we can't, you owe nothing."

Or even simpler — use your contact form. Every lead that comes in, you call within 4 hours.

**Your first customer actions:**
1. Tell everyone you know in Richland/Tri-Cities: "Hey, I built a web design agency, here's my number (509) 987-5060"
2. Post in local Facebook groups (Richland WA, Kennewick WA, Pasco WA community groups)
3. Post in Nextdoor about web design/AI automation
4. Post your audit tool link — "Free website audit — see how fast your site is"

### Task 8: Create a Simple Proposal Template

Don't over-engineer this yet. Create one Google Doc template:

```
Subject: Your website proposal — [Client Name]

Hi [Name],

Based on our conversation, here's what I recommend:

SITUATION: [What problem they have]

PROPOSED SOLUTION: [What you're going to build/do]

TIMELINE: [X weeks]

INVESTMENT: $[amount] (50% to start, 50% on completion)

WHAT'S INCLUDED:
- [Feature 1]
- [Feature 2]
- [Feature 3]

GUARANTEE: If you're not satisfied within 30 days, you pay nothing more.

To move forward, sign below and send 50% deposit.

[Mars signature block]
(509) 987-5060
```

Use Canva or Google Docs for this. Keep it simple.

---

## Phase 4: Make It Run Itself (Automation)

### Task 9: Set Up a Simple CRM (GoHighLevel or HubSpot Free)

**Recommended: HubSpot Free Tier** — it does everything you need right now:
1. Create free account at hubspot.com
2. Create a "pipeline" with stages: New → Contacted → Qualified → Proposal Sent → Won/Lost
3. Every time you get a lead, manually enter it OR sync from Supabase via this Zapier/Make.com flow:

```
Supabase (new lead) → Make.com → HubSpot (create contact)
```

For now (before automation), just manually enter leads in HubSpot. Check it daily.

### Task 10: Set Up a Weekly Review Habit

Every Friday, Mars spends 20 minutes:
1. Check HubSpot — any leads not contacted this week?
2. Follow up on stale leads
3. Review what sources are producing the best leads

This is the "run itself" part — it's a simple system, not a magic button.

---

## Phase 5: Invoicing (Simple, Free)

Use **Wave** (free accounting software) or **Phresh** (simple invoicing):

1. Create invoice template with your branding
2. When you close a project: send invoice, track payment
3. For $2,500 projects: 50% upfront, 50% on completion

Wave is free: https://waveapps.com

---

## What To Do This Week (In Order)

| Day | Action |
|-----|--------|
| **Day 1** | Set up Supabase account + get connection string |
| **Day 2** | Add Prisma schema + run `npx prisma db push` |
| **Day 3** | Wire contact form to database + test |
| **Day 4** | Set up Resend account + welcome email |
| **Day 5** | Deploy to Vercel + verify site is live |
| **Day 6** | Post in 3 local Facebook/Nextdoor groups |
| **Day 7** | Call every lead that came in (should be 3-5 minimum from local posts) |

---

## Quick Truth About "Making It Run Itself"

Here's the honest answer: **You need to close your first 3-5 customers manually.** That teaches you:
- What clients actually want to hear
- What your proposals need to include
- How to handle scope creep
- What to charge

Once you've done 3 projects, you can automate the rest. The automation is worthless without knowing what you're automating.

---

## Files You Still Need To Create

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Database schema |
| `src/lib/prisma.ts` | Prisma client singleton |
| `src/app/actions/store-lead.ts` | Lead capture server action |
| `src/lib/email.ts` | Resend email wrapper |

---

## Verification Commands

```bash
# Test the build
npm run build

# Test database connection
npx prisma studio    # Opens a web UI to see your DB

# Test locally
npm run dev          # Then submit your contact form and check Supabase
```

---

*Start with Phase 1, Task 1 today. Don't skip steps. Get the database in place first — everything else depends on it.*