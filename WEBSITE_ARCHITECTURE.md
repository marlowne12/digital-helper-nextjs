# Digital Helper Website Architecture Guide

## Purpose
This document provides strategic context for AI assistants (Claude Code, Gemini) working on the Digital Helper website. It covers navigation structure, page hierarchy, service organization, and UX patterns.

---

## Current Site Overview

**Live URL:** https://digital-helper.com  
**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS  
**Deployment:** Vercel  
**Business:** Web design, SEO, and AI automation agency in Richland, WA (Tri-Cities)

---

## Navigation Structure

### Current Nav (Issues Identified)
```
Home | Features | Pricing | SEO Services | Web Design | AI Agency | Case Studies | Get in Touch
```

**Problems:**
1. "Features" is vague — features of what?
2. Service pages (SEO, Web Design, AI Agency) are at same level as utility pages
3. No clear hierarchy between services
4. "AI Agency" naming is confusing — are we the agency or offering AI agency services?
5. Missing: About page, Blog/Resources, Contact (separate from booking)

### Recommended Nav Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│  LOGO   │  Services ▼  │  Work  │  Pricing  │  About  │  [Book Call]│
└─────────────────────────────────────────────────────────────────────┘
              │
              ├── Web Design & Development
              ├── SEO & Local Search  
              ├── AI Automation
              └── Lead Generation
```

**Mobile:** Hamburger menu with expandable Services section

---

## Page Hierarchy

### Tier 1: Primary Pages (In Main Nav)
| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Hero, value prop, social proof, CTA |
| Services (Hub) | `/services` | Overview of all services with links |
| Work/Portfolio | `/work` | Case studies and project showcase |
| Pricing | `/pricing` | Plans and packages |
| About | `/about` | Story, team, values, local connection |
| Contact/Book | `/contact` or `/book` | Cal.com embed + contact form |

### Tier 2: Service Pages (Under Services Dropdown)
| Page | URL | Purpose |
|------|-----|---------|
| Web Design | `/services/web-design` | Modern website builds |
| SEO | `/services/seo` | Local SEO, technical SEO |
| AI Automation | `/services/ai-automation` | Chatbots, workflows, voice AI |
| Lead Generation | `/services/lead-generation` | Pay-per-lead, prospecting systems |

### Tier 3: Supporting Pages (Footer/Secondary)
| Page | URL | Purpose |
|------|-----|---------|
| Blog | `/blog` | SEO content, thought leadership |
| Resources | `/resources` | Guides, tools, downloads |
| FAQ | `/faq` | Common questions (or section on relevant pages) |
| Privacy Policy | `/privacy` | Legal requirement |
| Terms of Service | `/terms` | Legal requirement |

### Tier 4: Individual Content (Dynamic)
| Type | URL Pattern | Example |
|------|-------------|---------|
| Case Studies | `/work/[slug]` | `/work/hvac-lead-gen` |
| Blog Posts | `/blog/[slug]` | `/blog/local-seo-guide` |

---

## Service Page Logic

### Why These Four Services?

**1. Web Design & Development**
- Primary entry point for most clients
- Visible, tangible deliverable
- Gateway to upselling other services

**2. SEO & Local Search**
- Essential for Tri-Cities service businesses
- Recurring revenue potential
- Complements web design

**3. AI Automation**
- Differentiator from traditional agencies
- Higher margins
- Future-focused positioning
- Includes: Chatbots, n8n workflows, voice AI, AI consulting

**4. Lead Generation**
- Pay-per-lead model = unique selling prop
- Performance-based = lower risk for clients
- Demonstrates confidence in results

### Service Page Template
Each service page should include:
1. **Hero** — Problem/solution headline
2. **Pain Points** — What's not working for them
3. **Solution** — How you fix it
4. **Process** — 3-4 step approach
5. **Deliverables** — What they get
6. **Results/Proof** — Stats, testimonials, case study links
7. **Pricing Preview** — Starting at / packages available
8. **CTA** — Book a call, get quote

---

## Dropdown Menu Structure

### Services Dropdown
```
Services
├── Web Design & Development
│   └── Fast, modern sites that convert
├── SEO & Local Search
│   └── Rank higher in Tri-Cities
├── AI Automation
│   └── Chatbots, workflows, voice AI
├── Lead Generation
│   └── Pay only for qualified leads
└── [View All Services →]
```

### Why Dropdown vs. Mega Menu
- 4 services = simple dropdown works
- Mega menu feels overkill for current service count
- Easier to maintain
- Better mobile experience

---

## Pages to Remove/Consolidate

### Remove
| Current | Reason |
|---------|--------|
| `/features` | Too vague, content belongs on home or service pages |

### Rename/Redirect
| Current | New | Reason |
|---------|-----|--------|
| `/seo` | `/services/seo` | Proper hierarchy |
| `/web-design` | `/services/web-design` | Proper hierarchy |
| `/ai-agency` | `/services/ai-automation` | Clearer naming |
| `/case-studies` | `/work` | Shorter, more common |
| `/booking` | `/contact` or `/book` | More intuitive |

---

## Homepage Sections (Recommended Order)

1. **Hero** — Headline, subhead, 2 CTAs
2. **Trust Bar** — Logos, ratings, "Trusted by X businesses"
3. **Problem/Agitation** — "Is your website helping or hurting?"
4. **Services Overview** — 4 cards linking to service pages
5. **How It Works** — 3-step process
6. **Results/Stats** — Big numbers proving ROI
7. **Featured Work** — 2-3 case study previews
8. **Testimonials** — Social proof carousel
9. **Pricing Preview** — Plans with "most popular" highlighted
10. **FAQ Accordion** — 4-6 common questions
11. **Final CTA** — Book a call + contact form

---

## Footer Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  LOGO + Tagline                    Services        Company          │
│  Richland, WA | Serving            • Web Design    • About          │
│  the Tri-Cities                    • SEO           • Work           │
│                                    • AI Automation • Pricing        │
│  (509) 555-0123                    • Lead Gen      • Blog           │
│  hello@digital-helper.com                          • Contact        │
│                                                                     │
│  Areas Served             Legal                                     │
│  • Richland               • Privacy Policy                          │
│  • Kennewick              • Terms of Service                        │
│  • Pasco                                                            │
│  • West Richland                                                    │
│                                                                     │
│  © 2025 Digital Helper. All rights reserved.                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## URL Structure Rules

### Good URLs
- `/services/web-design` — hierarchical, descriptive
- `/work/tri-cities-hvac` — clear, includes location
- `/blog/local-seo-tips` — readable, keyword-friendly

### Avoid
- `/services/1` — meaningless IDs
- `/our-amazing-web-design-services` — too long
- `/WebDesign` — inconsistent casing

### Conventions
- All lowercase
- Hyphens for spaces
- No trailing slashes
- Max 3 levels deep (`/services/seo/local`)

---

## Mobile Navigation

### Behavior
1. Hamburger icon on right
2. Full-screen overlay on tap
3. Services has expandable accordion
4. "Book a Call" CTA stays visible in header

### Priority (Mobile)
1. Home
2. Services (expandable)
3. Work
4. Pricing
5. About
6. Contact
7. [Book a Call button]

---

## SEO Considerations

### Each Page Needs
- Unique `<title>` with location: "Web Design in Richland, WA | Digital Helper"
- Meta description (150-160 chars)
- H1 that matches page intent
- Internal links to related pages
- Schema markup (LocalBusiness, Service, FAQPage)

### Location Keywords
Work these naturally into headings and copy:
- Richland
- Kennewick  
- Pasco
- Tri-Cities
- West Richland
- Benton City

---

## Implementation Checklist

### Phase 1: Structure
- [ ] Create `/services` hub page
- [ ] Create 4 service subpages
- [ ] Set up redirects from old URLs
- [ ] Create `/about` page
- [ ] Rename `/case-studies` to `/work`
- [ ] Remove `/features` page

### Phase 2: Navigation
- [ ] Implement dropdown for Services
- [ ] Update mobile nav with accordion
- [ ] Add sticky CTA button in header
- [ ] Update footer links

### Phase 3: Content
- [ ] Write unique content for each service page
- [ ] Add real testimonials
- [ ] Create 2-3 real case studies
- [ ] Write about page content

### Phase 4: Polish
- [ ] Add schema markup
- [ ] Optimize meta tags
- [ ] Test all redirects
- [ ] Mobile responsiveness check

---

## Quick Reference: Final Sitemap

```
digital-helper.com/
├── index (Home)
├── services/
│   ├── index (Services Hub)
│   ├── web-design
│   ├── seo
│   ├── ai-automation
│   └── lead-generation
├── work/
│   ├── index (Portfolio)
│   └── [case-study-slug]
├── pricing
├── about
├── contact (or /book)
├── blog/
│   ├── index
│   └── [post-slug]
├── privacy
└── terms
```
