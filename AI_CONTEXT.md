# DIGITAL HELPER - AI ASSISTANT CONTEXT

> **Drop this file into Claude Code or Gemini for instant context on the Digital Helper website project.**

---

## Quick Facts

| Key | Value |
|-----|-------|
| **Business** | Digital Helper (web design, SEO, AI automation agency) |
| **Location** | Richland, WA (Tri-Cities area) |
| **Website** | https://digital-helper.com |
| **Tech Stack** | Next.js 14+, React, TypeScript, Tailwind CSS, Framer Motion |
| **Hosting** | Vercel |
| **Calendar** | Cal.com (for booking) |
| **Notifications** | Slack webhooks |

---

## Site Structure

```
/                           → Homepage
/services                   → Services hub (overview)
  /services/web-design      → Web design service page
  /services/seo             → SEO service page
  /services/ai-automation   → AI automation service page
  /services/lead-generation → Lead gen service page
/work                       → Portfolio/case studies
  /work/[slug]              → Individual case study
/pricing                    → Pricing plans
/about                      → About page
/contact                    → Contact form + Cal.com embed
/blog                       → Blog (future)
/privacy                    → Privacy policy
/terms                      → Terms of service
```

---

## Navigation

**Desktop:**
```
LOGO | Services ▼ | Work | Pricing | About | [Book a Call]
```

**Services Dropdown:**
- Web Design & Development → `/services/web-design`
- SEO & Local Search → `/services/seo`
- AI Automation → `/services/ai-automation`
- Lead Generation → `/services/lead-generation`

**Mobile:** Hamburger menu, Services as expandable accordion

---

## Design System (Quick Reference)

### Colors
```css
--background: #0a0a0f
--background-secondary: #12121a
--text-primary: #ffffff
--text-secondary: #a1a1aa (zinc-400)
--accent-gradient: purple-400 → indigo-400 → blue-400
--card-bg: rgba(255, 255, 255, 0.03)
--card-border: rgba(255, 255, 255, 0.08)
```

### Key Tailwind Classes
```jsx
// Glassmorphism card
className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl"

// Gradient text
className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent"

// Primary button
className="px-6 py-3 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white rounded-lg"

// Secondary button
className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg"
```

### Typography
- Hero: `text-5xl md:text-6xl lg:text-7xl font-bold`
- H1: `text-4xl md:text-5xl font-bold`
- H2: `text-3xl md:text-4xl font-semibold`
- H3: `text-xl md:text-2xl font-semibold`
- Body: `text-base text-zinc-400`

---

## Four Core Services

### 1. Web Design & Development
**URL:** `/services/web-design`
**Pitch:** Modern, fast websites that turn visitors into customers
**Tech:** Next.js, React, Tailwind, optimized for Core Web Vitals
**Audience:** Businesses with outdated sites, slow sites, non-mobile sites

### 2. SEO & Local Search
**URL:** `/services/seo`
**Pitch:** Get found first when Tri-Cities customers search
**Includes:** Local SEO, GMB optimization, citations, on-page SEO
**Audience:** Service businesses not ranking in Google Maps

### 3. AI Automation
**URL:** `/services/ai-automation`
**Pitch:** Automate operations so your business works while you sleep
**Includes:** Chatbots, n8n workflows, voice AI, AI consulting
**Audience:** Owners drowning in repetitive tasks, slow response times

### 4. Lead Generation
**URL:** `/services/lead-generation`
**Pitch:** Qualified leads delivered to your inbox—pay only for results
**Model:** Pay-per-lead pricing (unique differentiator)
**Audience:** Businesses wanting predictable lead flow, risk-averse

---

## Homepage Sections (In Order)

1. Hero (headline, subhead, 2 CTAs)
2. Trust bar (ratings, "trusted by X businesses")
3. Problem/agitation ("Is your website helping or hurting?")
4. Services grid (4 cards)
5. How it works (3 steps)
6. Results/stats (big numbers)
7. Featured work (2-3 case studies)
8. Testimonials (carousel)
9. Pricing preview
10. FAQ accordion
11. Final CTA (contact form + booking)

---

## Voice & Tone

**Do:**
- Direct, not salesy
- Technical credibility without jargon
- Results-focused
- Local pride (mention Tri-Cities)
- Short paragraphs

**Don't:**
- "Cutting-edge", "revolutionary" (overused)
- "Synergy", "leverage" constantly
- Long walls of text
- Generic agency speak

---

## Key Differentiators (Use in Copy)

1. **Local** — Based in Richland, not outsourced
2. **Modern tech** — Next.js, not WordPress templates
3. **Pay-per-lead** — Only pay for results
4. **AI-native** — We use AI internally, not just sell it
5. **Fast** — Most projects in 2-4 weeks

---

## Environment Variables Needed

```env
# Slack
SLACK_WEBHOOK_LEADS=
SLACK_WEBHOOK_BOOKINGS=

# Cal.com
NEXT_PUBLIC_CAL_USERNAME=

# Analytics (optional)
NEXT_PUBLIC_GA_ID=
```

---

## Common Tasks

### Add a new service page
1. Create `/app/services/[service-name]/page.tsx`
2. Use the service page template (hero, pain points, solution, process, CTA)
3. Add to Services dropdown in nav
4. Update internal links from related pages

### Add a case study
1. Create `/app/work/[slug]/page.tsx` or add to case studies data
2. Include: client, industry, challenge, solution, results (3 metrics), testimonial
3. Add to portfolio grid on `/work`
4. Link from relevant service pages

### Update navigation
1. Edit nav component (likely `components/layout/Navbar.tsx`)
2. Update mobile menu accordion if adding Services items
3. Test dropdown and mobile behavior

### Add contact form endpoint
1. Create `/app/api/contact/route.ts`
2. Validate inputs
3. Send to Slack webhook with formatted blocks
4. Return JSON response

---

## File Structure (Expected)

```
/app
├── page.tsx                    # Homepage
├── layout.tsx                  # Root layout
├── globals.css
├── services/
│   ├── page.tsx                # Services hub
│   ├── web-design/page.tsx
│   ├── seo/page.tsx
│   ├── ai-automation/page.tsx
│   └── lead-generation/page.tsx
├── work/
│   ├── page.tsx                # Portfolio grid
│   └── [slug]/page.tsx         # Case study template
├── pricing/page.tsx
├── about/page.tsx
├── contact/page.tsx
└── api/
    └── contact/route.ts

/components
├── layout/
│   ├── Navbar.tsx
│   └── Footer.tsx
├── sections/
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Process.tsx
│   ├── Testimonials.tsx
│   ├── FAQ.tsx
│   └── CTA.tsx
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── Badge.tsx
└── integrations/
    └── CalEmbed.tsx

/lib
├── constants.ts
├── services.ts
└── case-studies.ts
```

---

## Related Documentation

For deeper context, reference these files:
- `WEBSITE_ARCHITECTURE.md` — Full site structure and navigation logic
- `SERVICE_DEFINITIONS.md` — Detailed service descriptions and copy
- `DESIGN_SYSTEM.md` — Complete design tokens and component patterns
- `AI_PROMPTS.md` — Ready-to-use prompts for specific tasks

---

## Quick Prompts

**Start a session:**
```
I'm working on the Digital Helper website. [Describe what you need]
Tech: Next.js 14, TypeScript, Tailwind, dark theme with purple accent gradient.
```

**Fix styling:**
```
This doesn't match Digital Helper's design. Should use: bg-white/[0.03], border-white/[0.08], zinc-400 text, purple gradient accent.
```

**Add component:**
```
Create a [component] for Digital Helper. Dark theme, glassmorphism cards, responsive, Framer Motion animations.
```
