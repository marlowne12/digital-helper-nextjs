# Agent Platform Architecture — Digital Helper

> **Status:** v1.0 — Approved architecture for client-facing AI agent systems
> **Last Updated:** 2026-03-29
> **Owner:** CTO

---

## Overview

Digital Helper delivers AI agent systems to local service businesses. This document defines the canonical technical architecture: which frameworks we use, how we deploy, what infrastructure we run, and how we package work for clients. Every client engagement is built on this foundation.

---

## Technology Stack

### AI Layer

| Component | Technology | Use Case |
|-----------|-----------|---------|
| Primary LLM | Claude (Anthropic) via `@anthropic-ai/sdk` | Reasoning, chat, analysis |
| Fallback LLM | Google Gemini via `@ai-sdk/google` | Already deployed in site |
| Streaming SDK | Vercel AI SDK (`ai` v6+) | `streamText`, `generateObject`, `generateText` |
| Model selection | Claude Haiku (fast/cheap), Sonnet (quality), Opus (complex) | Per-tier |

### Orchestration Layer

| Component | Technology | Use Case |
|-----------|-----------|---------|
| Client-facing agents | Vercel AI SDK tool calling | Chat widgets, lead capture |
| Workflow automation | n8n (self-hosted VPS) | Business process automation |
| Agent runtime (internal) | OpenClaw + Paperclip | Internal team agents |
| Vector search / RAG | Supabase pgvector | Knowledge bases, semantic search |

### Infrastructure

| Layer | Technology | Details |
|-------|-----------|---------|
| Hosting | Vercel Pro | Next.js, edge functions, serverless |
| Database / Vector | Supabase | PostgreSQL + pgvector + Auth + Realtime |
| Automation VPS | Contabo VPS (`62.146.173.211`) | n8n + OpenClaw, already running |
| CI/CD | GitHub Actions | lint → type-check → test → build |
| Secrets | Vercel Env Vars | `GOOGLE_GENERATIVE_AI_API_KEY`, `ANTHROPIC_API_KEY` |

---

## Agent Framework Evaluation

| Framework | Verdict | Rationale |
|-----------|---------|-----------|
| **Vercel AI SDK** | ✅ Primary | Already in use, edge-ready, great DX, `streamText` + tool calling built-in |
| **n8n** | ✅ Automation | Visual builder for business workflows; clients can modify without code |
| **Anthropic SDK direct** | ✅ Complex agents | Maximum control for multi-step agentic loops |
| **Paperclip** | ✅ Internal | Powers our own agent team — not for client delivery |
| **LangChain.js** | ❌ Avoid | Over-engineered for our use cases; Vercel AI SDK covers 90% |
| **CrewAI / AutoGen** | ❌ Avoid | Python-only; doesn't fit Next.js stack |
| **OpenAI Assistants API** | ❌ Avoid | Vendor lock-in to OpenAI; Claude preferred |

---

## Client Delivery Tiers

### Tier 1 — AI Chat Assistant
**Price:** $500–1,500/mo
**Best for:** Service businesses (HVAC, dentist, restaurant) wanting 24/7 lead capture

**What's included:**
- Embedded chat widget (JavaScript snippet or Next.js embed)
- Business context from Google Business Profile + website scrape
- Tool calling: quote request, appointment scheduling, FAQ answers
- Lead data stored in Supabase, emailed to client daily

**Stack:**
```
Next.js chat widget → Vercel AI SDK streamText → Claude Haiku
                   → Tool: scheduleCall (Calendly API)
                   → Tool: generateQuote (business rules)
                   → Tool: captureLead (Supabase)
```

**Deployment:** Vercel (shared Digital Helper infrastructure)
**Infrastructure cost:** ~$30/mo (API + hosting)

---

### Tier 2 — Lead Generation Agent
**Price:** $1,500–3,000/mo
**Best for:** Businesses wanting automated outreach and follow-up

**What's included:**
- Automated lead scoring from GBP data and web scraping
- Email/SMS follow-up sequences (AI-written, personalized)
- Apollo.io or Google Maps scraping for prospect lists
- Integration: Gmail, Google Sheets, or client CRM

**Stack:**
```
n8n workflow trigger (schedule/webhook)
→ Lead scraping (Apollo.io MCP or custom scraper)
→ Claude Sonnet (score lead, write personalized email)
→ Gmail MCP or SMTP (send outreach)
→ Google Sheets (track pipeline)
→ Supabase (persist state)
```

**Deployment:** VPS n8n (shared instance, dedicated workflow partition)
**Infrastructure cost:** ~$50/mo

---

### Tier 3 — Business Automation Suite
**Price:** $3,000–8,000/mo
**Best for:** Growing businesses with repetitive back-office tasks

**What's included:**
- End-to-end process automation (invoicing, scheduling, follow-ups, reviews)
- Custom integrations (Quickbooks, Calendly, Square, etc.)
- AI-drafted responses to Google reviews
- Automated reporting dashboard

**Stack:**
```
Trigger layer: webhooks, cron, Zapier (bridging legacy tools)
→ n8n orchestration (business logic)
→ Claude Sonnet (drafting, classification, extraction)
→ Supabase (audit log, state machine)
→ Client tools via REST APIs
```

**Deployment:** Dedicated n8n partition or client VPS
**Infrastructure cost:** ~$100/mo

---

### Tier 4 — Agentic Agency System
**Price:** $8,000+/mo (or project-based)
**Best for:** Scaling service businesses wanting to automate high-skill tasks

**What's included:**
- Multi-agent system with persistent memory (vector + relational)
- Autonomous task loops with human-in-the-loop approval gates
- Agent roles: researcher, writer, qualifier, scheduler, analyst
- Real-time monitoring dashboard (built on this Next.js platform)

**Stack:**
```
Paperclip-style task queue (Supabase-backed)
→ Agent roles (Vercel AI SDK + Anthropic SDK)
  → ResearchAgent: web scrape + summarize
  → WriterAgent: draft content/emails
  → QualifierAgent: score and route leads
  → SchedulerAgent: book appointments
→ Human approval gate (Next.js dashboard)
→ Audit trail (Supabase)
```

**Deployment:** Vercel Pro + Supabase Pro + dedicated VPS
**Infrastructure cost:** ~$200–400/mo

---

## Standard Deployment Patterns

### Pattern A: Embedded Widget (Tier 1)
```
Client website (any platform)
  ↓  <script> tag or iframe
Digital Helper subdomain (widget.digital-helper.com)
  ↓  Next.js App Router
Vercel edge function → Claude API
```
- Zero changes to client's existing site
- Widget context pre-loaded from GBP + site scrape at deploy time
- Lead data flows to client via email + Supabase dashboard

### Pattern B: Dedicated Subdomain (Tier 2–3)
```
[clientname].digital-helper.com
  ↓  Next.js + Supabase Auth
Client admin dashboard (view leads, configure agent)
  ↓  Server actions
n8n VPS (workflow execution)
```
- Client gets a branded portal to manage their agent
- We control the infrastructure; client never touches code

### Pattern C: White-label on Client Domain (Tier 4)
```
tools.clientdomain.com (CNAME to Vercel)
  ↓  Custom Next.js deployment
Full agentic stack (Supabase-backed)
```
- Fully white-labeled
- Requires client's domain access and DNS change
- Delivered as a separate Vercel project

---

## Infrastructure Requirements by Tier

| Resource | Shared | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|----------|--------|--------|--------|--------|--------|
| Vercel | Pro team $200/mo | Included | Included | Included | Separate project |
| Supabase | Pro $25/mo | Shared | Shared | Shared | Dedicated |
| VPS | Contabo $18/mo | — | Shared partition | Dedicated partition | Separate VPS |
| Claude Haiku API | — | ~$30/mo | — | — | — |
| Claude Sonnet API | — | — | ~$150/mo | ~$300/mo | ~$500/mo |
| **Total infra/client** | | **~$30** | **~$50** | **~$100** | **~$200–400** |

---

## Data Architecture

### Per-Client Data Isolation
- Each client gets a Supabase schema (e.g., `client_acme`)
- Row-level security (RLS) enforced via Supabase policies
- API keys rotated per-client; never shared across clients

### Knowledge Base (RAG)
```sql
-- Per-client vector store
CREATE TABLE client_knowledge (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  content text,
  embedding vector(1536),  -- Claude / text-embedding-3-small
  source text,             -- 'gbp', 'website', 'manual', 'faq'
  created_at timestamptz DEFAULT now()
);
CREATE INDEX ON client_knowledge USING ivfflat (embedding vector_cosine_ops);
```

### Agent State Machine
```sql
-- Conversation + task state
CREATE TABLE agent_sessions (
  id uuid PRIMARY KEY,
  client_id uuid,
  session_type text,  -- 'chat', 'lead_gen', 'automation'
  status text,        -- 'active', 'pending_approval', 'completed'
  messages jsonb DEFAULT '[]',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz,
  updated_at timestamptz
);
```

---

## Security & Compliance

- **API keys**: Never in client-side code; always server-side via Vercel env vars
- **PII**: Lead data stored in Supabase with encryption at rest; GDPR-ready
- **Rate limiting**: All API routes use Vercel's built-in rate limiting + `upstash/ratelimit`
- **Input validation**: Zod `safeParse` at every API boundary
- **Agent guardrails**: System prompts explicitly scope Claude to client's business context; no jailbreak surface exposed to public

---

## Monitoring & Observability

| Signal | Tool | Alert Threshold |
|--------|------|----------------|
| Deployment failures | Vercel + GitHub Actions | Any failure |
| API errors (5xx) | Vercel Analytics | > 1% error rate |
| AI cost spike | Anthropic dashboard | > 2x baseline |
| n8n workflow failures | n8n built-in alerting | Any failure |
| Agent loop runaway | Token budget enforcer in system prompt | > 20 tool calls/session |

---

## Technical Capabilities One-Pager (Client-Facing)

> **Save this section as a PDF for sales calls.**

---

### What We Build

**Digital Helper** builds AI agent systems that run your business while you sleep. We deploy custom AI workers that handle customer conversations, capture leads, book appointments, and follow up — automatically.

---

### Our Three Core Products

**1. AI Chat Assistant**
Your website answers questions and captures leads 24/7 — even at 2am. Typical results: 3–5x more leads per month, zero extra staff.

**2. Lead Generation Agent**
We build automated systems that find your ideal customers, research them, and send personalized outreach on your behalf. You review, we execute.

**3. Business Automation Suite**
We automate the repetitive work: booking reminders, review requests, invoice follow-ups, and reporting. Your team focuses on the work only humans can do.

---

### How It Works

1. **We audit** your current website, Google Business Profile, and workflow gaps (1 hour, free)
2. **We deploy** in 2–4 weeks with no disruption to your current operations
3. **You manage** through a simple dashboard — or we manage it for you

---

### What Makes Us Different

- Built on **Claude AI** (Anthropic) — the most capable, safest AI available
- **No long-term contracts** — cancel any time
- **Tri-Cities based** — we're your neighbors, not a faceless SaaS company
- **Measurable ROI** — every engagement tracked against your actual revenue

---

### Contact

Marlon McGuire — Founder
📍 Richland, WA | 📧 business@digital-helper.com
🌐 digital-helper.com

---

*Architecture version 1.0 — Approved 2026-03-29*
