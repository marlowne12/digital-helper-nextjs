# Digital Helper Prospect-to-Onboarding Workflow

Source workflow: `C:\Users\marz\Downloads\ai-consulting-onboarding-main\ai-consulting-onboarding-main`

Use this when a business in `prospects/*.md` moves from cold lead to real sales conversation or signed client. The source workflow is built for client onboarding, so do not send the full package to an unqualified prospect. Use the prospect list for outreach and qualification first, then generate the client package after the service, timeline, and contact details are known.

## When To Use

Use this workflow when a prospect has one of these statuses:

- They replied with interest.
- They booked a consultation.
- They asked for pricing or a proposal.
- They agreed to a web design, SEO, AI automation, reputation, or lead generation engagement.

Do not use it for raw daily leads that only have a business name, category, phone, address, and weak-web-presence note.

## Required Inputs

Collect these before creating onboarding docs:

1. Client name and business name.
2. Digital Helper as consultant, owner Mars.
3. Service type:
   - Web Design & Development
   - SEO & Local Search
   - AI Automation
   - AI Workflow Automation
   - Lead Generation
   - Reputation Management
   - Custom bundle
4. One-sentence project scope.
5. Timeline or desired launch date.
6. Budget or package price, if known.
7. Primary contact name, phone, and email.
8. Relevant context: industry, current website status, Google Business Profile issues, tools they use, pain points, competitors, and source lead file.

## Service Mapping

Map Digital Helper services to the closest source workflow service type:

| Digital Helper Service | Source Workflow Fit | Notes |
|---|---|---|
| Web Design & Development | Custom | Include site pages, conversion goals, local SEO foundations, launch support. |
| SEO & Local Search | AI Strategy & Roadmap / Custom | Use local visibility, GBP, citations, rankings, and reporting as the core scope. |
| AI Automation | AI Tool Implementation | Use chatbot, voice AI, workflow setup, and handoff docs. |
| AI Workflow Automation | AI Workflow Automation | Use n8n, Zapier, Make, CRM/email/calendar triggers, and testing. |
| Lead Generation | Custom | Include target market, qualification rules, delivery cadence, and pay-per-lead terms. |
| Reputation Management | AI Workflow Automation / Custom | Include review monitoring, response workflows, GBP improvements, and reporting. |

## Output Package

Create a client folder only after the prospect is qualified:

```text
prospects/clients/YYYY-MM-DD-business-slug/
├── intake-questionnaire.md
├── welcome-email.md
├── service-agreement.md
└── project-brief.md
```

Each file should use Digital Helper business truth from `BUSINESS.md`:

- Business name: Digital Helper.
- Owner: Mars.
- Location: Richland, WA, serving the Tri-Cities.
- Phone: `(509) 987-5060`.
- Website: `https://digital-helper.com`.
- Brand voice: direct, useful, local, technical without jargon.

## Generation Prompt

Use this prompt once the required inputs are known:

```text
Use the AI Consultant Onboarding workflow from
C:\Users\marz\Downloads\ai-consulting-onboarding-main\ai-consulting-onboarding-main
and adapt it for Digital Helper.

Create the four onboarding files in:
prospects/clients/YYYY-MM-DD-business-slug/

Client details:
- Client:
- Business:
- Service type:
- Project scope:
- Timeline:
- Budget:
- Primary contact:
- Email:
- Phone:
- Source lead file:
- Current web/GBP status:
- Industry/pain points/tools:

Use Digital Helper as the consultant:
- Owner: Mars
- Website: https://digital-helper.com
- Phone: (509) 987-5060
- Location: Richland, WA / Tri-Cities

Deliver:
1. intake-questionnaire.md
2. welcome-email.md
3. service-agreement.md
4. project-brief.md
```

## Quality Bar

- No visible placeholders in final client files.
- Keep the agreement plain-language and include the legal disclaimer.
- Do not promise rankings, exact revenue, or guaranteed lead volume unless those terms are explicitly agreed.
- For local service businesses, include mobile lead capture, Google visibility, trust signals, and quote/call conversion.
- For AI automation work, include handoff, testing, client responsibilities, and recurring maintenance boundaries.
- Keep source lead evidence in the project brief so the sales context is not lost.

