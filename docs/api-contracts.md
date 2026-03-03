# API Contracts — digital-helper-nextjs

> **Last Updated:** 2026-02-28 | **Auth:** None (all public)

---

## Overview

All API routes are under `src/app/api/`. None have authentication — they are intended for public use. Rate limiting is not yet implemented.

---

## `POST /api/chat`

**Purpose:** AI chatbot — Digital Helper sales assistant

**Request:**
```json
{
  "message": "I need help with my website",
  "history": [
    { "role": "user", "text": "Previous message" },
    { "role": "model", "text": "Previous response" }
  ]
}
```

**Response (200):**
```json
{
  "text": "Hi! I'd love to help..."
}
```

**Error (400, 500):**
```json
{ "error": "Message is required" }
```

**AI:** Gemini 1.5 Flash (`gemini-1.5-flash-latest`)
**System persona:** Digital Helper sales rep (Richland WA, packages from $3,000)

---

## `POST /api/website-audit`

**Purpose:** Audit any website URL with AI analysis

**Request:**
```json
{
  "url": "https://example.com",
  "email": "optional@email.com"
}
```

**Response (200) — Quick Preview (no email):**
```json
{
  "url": "https://example.com",
  "quickPreview": {
    "grade": "C",
    "score": 58,
    "topIssue": "No meta description",
    "issueCount": 12
  }
}
```

**Response (200) — Full Audit (email provided):**
```json
{
  "url": "https://example.com",
  "quickPreview": { ... },
  "fullResults": {
    "url": "https://example.com",
    "grade": "C",
    "score": 58,
    "summary": "The website has several issues...",
    "categories": {
      "performance": {
        "score": 45,
        "status": "needs-work",
        "issues": [
          {
            "title": "Slow page load",
            "description": "Page loaded in 4.2 seconds",
            "severity": "critical",
            "impact": "Higher bounce rate"
          }
        ]
      },
      "seo": { "score": 70, "status": "good", "issues": [] },
      "mobile": { "score": 60, "status": "needs-work", "issues": [] },
      "security": { "score": 80, "status": "good", "issues": [] }
    },
    "quickWins": [
      "Add meta description",
      "Enable HTTPS redirect",
      "Add image alt tags"
    ],
    "totalIssues": 12
  }
}
```

**Error (400):**
```json
{ "error": "Invalid URL format" }
```

**Error (422):**
```json
{
  "error": "Could not reach the website. Please check the URL and try again.",
  "details": "connect ECONNREFUSED"
}
```

**AI:** Gemini 2.0 Flash (`gemini-2.0-flash`)
**Validation:** `validateUrl()` + `validateEmail()` from `src/lib/validation.ts`
**Scraping:** `axios` + `cheerio` for DOM analysis

---

## `POST /api/contact`

**Purpose:** Contact form submission

**Request:**
```json
{
  "name": "John Smith",
  "email": "john@business.com",
  "phone": "509-555-1234",
  "message": "I want to revamp my website",
  "service": "Web Design",
  "honeypot": ""
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Thank you for reaching out! We'll get back to you within 24 hours.",
  "leadId": "uuid-here"
}
```

**Error (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": { "email": ["Invalid email format"] }
}
```

**Validation:** Zod schema (`contactFormSchema`)
**Spam protection:** Honeypot field check
**Storage:** `data/leads/contact-submissions.json` (⚠️ filesystem — not Vercel-safe)

---

## `GET /api/contact`

**Purpose:** Health check

**Response (200):**
```json
{
  "status": "ok",
  "endpoint": "contact-form"
}
```

---

## `POST /api/case-study`

**Purpose:** Generate AI case study for a given industry

**Request:**
```json
{
  "industry": "HVAC"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "client": "Tri-Cities HVAC Pro",
    "industry": "HVAC",
    "challenge": "Outdated website losing mobile customers",
    "solution": "AI-powered website with 24/7 chatbot",
    "results": ["200% increase in leads", "40% more bookings"],
    "imageUrl": "https://..."
  }
}
```

**AI:** OpenRouter (configured in route handler)

---

## `POST /api/seo-audit`

**Purpose:** SEO audit for a URL

**Request:**
```json
{
  "url": "https://example.com"
}
```

**Response:** Similar structure to website-audit but SEO-specific

---

## `POST /api/seo-analysis`

**Purpose:** AI-powered SEO analysis

**Request:**
```json
{
  "url": "https://example.com",
  "keywords": ["plumber richland wa"]
}
```

---

## `GET /api/pricing`

**Purpose:** Get pricing tier data

**Response (200):**
```json
{
  "tiers": [
    {
      "id": "starter",
      "name": "Starter",
      "price": 3000,
      "period": "one-time",
      "features": ["5-page website", "SEO basics", "Contact form"],
      "cta": "Get Started"
    }
  ],
  "currency": "USD",
  "disclaimer": "..."
}
```

---

## `POST /api/lead-magnet`

**Purpose:** Generate and deliver lead magnet PDF

**Request:**
```json
{
  "email": "user@business.com",
  "name": "Business Name",
  "type": "seo-checklist"
}
```

---

## `GET /api/downloads/[slug]`

**Purpose:** Download a specific resource by slug

**Params:** `slug` — resource identifier
**Response:** File download or redirect

---

## `POST /api/report-pdf`

**Purpose:** Generate a PDF audit report

**Request:**
```json
{
  "auditData": { ... },
  "businessName": "Example Business"
}
```

**Response:** PDF binary or download URL

---

## `POST /api/send-audit-email`

**Purpose:** Email the audit report to a user

**Request:**
```json
{
  "email": "user@business.com",
  "auditData": { ... },
  "url": "https://auditedsite.com"
}
```

---

## `POST /api/business-analysis`

**Purpose:** Full AI analysis of a local business

**Request:**
```json
{
  "businessName": "Plumber Example",
  "city": "Richland",
  "state": "WA"
}
```

---

## `POST /api/email-draft`

**Purpose:** AI-generated email draft for outreach

**Request:**
```json
{
  "businessName": "...",
  "issues": ["No mobile optimization", "Slow loading"],
  "template": "cold-outreach"
}
```

---

## `POST /api/generate-case-study`

**Purpose:** Alternative case study generator (see also `/api/case-study`)

---

## Server Actions (`src/app/actions/`)

These are Next.js Server Actions using `"use server"` directive.

| Action File | Functions | Usage |
|-------------|-----------|-------|
| `analyze.ts` | `analyzeWebsite()` | Business/website analysis |
| `competitor.ts` | `analyzeCompetitor()` | Competitor research |
| `gbp.ts` | `searchGBP()`, `getGBPData()` | Google Business Profile data |
| `lead-finder.ts` | `findLeads()` | Local business lead discovery |
| `leads.ts` | `saveLead()`, `getLeads()` | Lead management |
| `proposal.ts` | `generateProposal()` | AI proposal generation |
| `send-report.ts` | `sendReport()` | Email report delivery |

---

## Error Response Format

All API routes follow this error pattern:

```json
{
  "error": "Human-readable error message",
  "details": "Optional technical details"
}
```

Status codes:
- `400` — Validation error
- `422` — Processing error (unreachable site, etc.)
- `500` — Internal server error

---

## Known API Issues

1. **No authentication** — All endpoints publicly accessible; AI endpoints could be abused
2. **No rate limiting** — AI endpoints have no throttling
3. **Filesystem storage** — Contact form saves to disk (breaks on Vercel ephemeral FS)
4. **Missing error boundaries** — Some routes don't handle all edge cases
5. **Duplicate functionality** — `/api/case-study` and `/api/generate-case-study` may overlap
