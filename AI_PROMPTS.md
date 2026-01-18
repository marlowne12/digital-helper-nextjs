# AI Assistant Prompts for Digital Helper Website

## Purpose
Ready-to-use prompts for Claude Code, Gemini, and other AI coding assistants when working on the Digital Helper website.

---

## Quick Context Prompt (Copy This First)

Use this at the start of any coding session:

```
I'm working on the Digital Helper website (https://digital-helper.com).

Tech Stack: Next.js 14+ (App Router), React, TypeScript, Tailwind CSS, Framer Motion
Deployment: Vercel
Business: Web design, SEO, and AI automation agency in Richland, WA (Tri-Cities)

Key files to reference:
- WEBSITE_ARCHITECTURE.md - Site structure and navigation
- SERVICE_DEFINITIONS.md - Service pages and content
- DESIGN_SYSTEM.md - Colors, typography, components

Design: Dark theme, glassmorphism cards, purple/indigo/blue gradient accent.

I need help with: [YOUR REQUEST]
```

---

## Navigation Implementation Prompt

```
Create the main navigation component for Digital Helper.

Requirements:
1. Sticky header with backdrop blur on scroll
2. Services dropdown with 4 items:
   - Web Design & Development → /services/web-design
   - SEO & Local Search → /services/seo
   - AI Automation → /services/ai-automation
   - Lead Generation → /services/lead-generation
3. Main nav links: Services (dropdown), Work, Pricing, About
4. "Book a Call" CTA button on right (links to /contact)
5. Mobile: Hamburger menu with full-screen overlay
6. Services should be expandable accordion on mobile

Design tokens:
- Background: #0a0a0f with backdrop-blur on scroll
- Border: rgba(255, 255, 255, 0.08)
- Accent gradient: purple-400 → indigo-400 → blue-400
- Use Framer Motion for dropdown animation

Include: Logo placeholder, active state indicators, smooth transitions
```

---

## Service Page Template Prompt

```
Create a reusable service page template for Digital Helper.

The page should have these sections:
1. Hero - Gradient background, headline, subhead, 2 CTAs
2. Pain Points - 3-4 problems the service solves (icon + text)
3. Solution - How we solve it, with visual
4. Process - 3-step approach with numbered cards
5. Deliverables - What they get (checklist style)
6. Results/Proof - Stats, metrics, or testimonial
7. Pricing Preview - Starting price or "View Pricing" link
8. Final CTA - Book a call section

Props needed:
- serviceName: string
- headline: string
- subheadline: string
- painPoints: Array<{icon, title, description}>
- process: Array<{step, title, description}>
- deliverables: string[]
- stats: Array<{value, label}>
- pricingNote: string

Use dark theme with glassmorphism cards.
Include Framer Motion scroll animations.
Make it fully responsive.
```

---

## Homepage Section Prompts

### Hero Section
```
Create a hero section for Digital Helper homepage.

Content:
- Badge: "Serving Richland & Tri-Cities Businesses"
- Headline: "Transform Your Business with Intelligent Automation"
- Subheadline: "We build AI-powered systems that generate leads, automate workflows, and scale your operations—so you can focus on growth."
- CTA 1: "Get Started" (primary, links to /contact)
- CTA 2: "View Our Work" (secondary, links to /work)

Visual:
- Full viewport height
- Subtle gradient from purple to transparent at top
- Optional: animated grid or particles in background
- Centered text layout
- Large, bold typography

Include the green pulsing dot indicator from the badge pattern.
```

### Services Grid Section
```
Create a services overview section with 4 cards.

Services:
1. Web Design & Development
   - Icon: Globe or Monitor
   - Description: "Modern, lightning-fast websites built to convert visitors into customers."
   - Link: /services/web-design

2. SEO & Local Search
   - Icon: Search or TrendingUp
   - Description: "Dominate Google when Tri-Cities customers search for what you do."
   - Link: /services/seo

3. AI Automation
   - Icon: Bot or Zap
   - Description: "Chatbots, workflows, and voice AI that handle tasks while you sleep."
   - Link: /services/ai-automation

4. Lead Generation
   - Icon: Users or Target
   - Description: "Qualified leads delivered to your inbox. Pay only for results."
   - Link: /services/lead-generation

Design:
- 2x2 grid on desktop, stack on mobile
- Glassmorphism cards with hover glow
- Icon in colored container
- "Learn More →" link with arrow animation on hover
```

### Testimonials Section
```
Create a testimonials section with horizontal auto-scroll.

Testimonials:
1. "Digital Helper completely transformed our online presence. Our mobile traffic has doubled."
   - Sarah Jenkins, Owner at Tri-Cities Coffee Co.

2. "The AI chat feature is a game changer. It answers questions 24/7 and books appointments for us."
   - Mike Peterson, General Manager at Richland Auto Repair

3. "We went from invisible on Google to ranking #1 for our main keywords. The ROI has been incredible."
   - Lisa Chen, Director at Chen Real Estate Group

Design:
- Cards with quote, author avatar (initials), name, title
- Infinite horizontal scroll animation
- Pause on hover
- Rating stars or trust indicators
```

### FAQ Section
```
Create an FAQ accordion section.

Questions:
1. "What types of businesses do you work with?"
   → "We specialize in local service businesses (HVAC, plumbing, dental, legal) and B2B companies in the Tri-Cities area."

2. "How long does a typical project take?"
   → "Most websites launch in 2-4 weeks. Automation projects vary from 1-2 weeks for simple workflows to 4-6 weeks for complex systems."

3. "Do you offer ongoing support?"
   → "Yes! We offer monthly maintenance plans and are available for updates, optimizations, and troubleshooting."

4. "What makes you different from other agencies?"
   → "We're local (Richland-based), we build with modern tech (not WordPress templates), and we offer pay-per-lead pricing so you only pay for results."

5. "How does pay-per-lead pricing work?"
   → "You only pay for qualified leads that meet your criteria. No retainers, no wasted ad spend—just results."

Design:
- Accordion with smooth expand/collapse
- Plus/minus or chevron indicator
- Only one open at a time
- Subtle border between items
```

---

## Component-Specific Prompts

### Contact Form
```
Create a contact form component with Slack webhook integration.

Fields:
- Name (required)
- Email (required)
- Phone (optional)
- Message (required, textarea)
- Submit button

Features:
- Client-side validation
- Loading state on submit
- Success/error toast notifications
- Send to Slack webhook via API route

API route should:
- Validate inputs
- Format message with blocks for Slack
- Send to SLACK_WEBHOOK_LEADS env variable
- Return success/error response

Design:
- Dark input fields with subtle borders
- Focus states with purple glow
- Button with gradient background
```

### Pricing Toggle
```
Create a pricing section with monthly/annual toggle.

Plans:
1. Starter - $497/month ($4,970 annually, save $994)
   - 1 workflow automation
   - Basic chatbot
   - Monthly strategy call
   - Email support

2. Growth - $997/month ($9,970 annually, save $1,994) [MOST POPULAR]
   - 3 workflow automations
   - Advanced chatbot
   - Bi-weekly calls
   - Priority support
   - Lead generation setup

3. Enterprise - Custom
   - Unlimited automations
   - Custom AI solutions
   - Dedicated account manager
   - 24/7 support
   - Custom integrations

Features:
- Animated toggle switch
- Price updates smoothly when toggling
- "Save X%" badge on annual
- Most popular badge on Growth
- Feature checkmarks
```

### Case Study Card
```
Create a case study card component for the portfolio grid.

Props:
- title: string
- client: string
- industry: string
- description: string
- results: string[] (3 items)
- image: string
- slug: string

Design:
- Image on top (aspect ratio 16:9)
- Gradient overlay on image hover
- Industry badge
- Title and description
- 3 result metrics in row
- "View Case Study →" link

Hover: Image scales slightly, overlay fades in
```

---

## Page Creation Prompts

### About Page
```
Create the About page for Digital Helper.

Sections:
1. Hero
   - Headline: "Built in Richland, For the Tri-Cities"
   - Subhead: Story about why we started

2. Our Story
   - Founded to help local businesses compete
   - Frustrated with agencies that overpromise
   - Built on automation and modern tech

3. Our Approach (3 pillars)
   - Modern Tech: Next.js, not outdated WordPress
   - Automation First: Systems that scale
   - Results-Focused: Pay-per-lead model

4. Why Local Matters
   - We understand Tri-Cities businesses
   - Available for in-person meetings
   - Invested in community success

5. CTA: Ready to work with a local team that gets it?

No team photos needed (solo founder).
Focus on values and approach.
```

### Services Hub Page
```
Create the Services hub page (/services).

Sections:
1. Hero
   - Headline: "Services Built to Grow Your Business"
   - Subhead: Overview of what we offer

2. Service Cards (2x2 grid)
   - Web Design & Development
   - SEO & Local Search
   - AI Automation
   - Lead Generation
   (Use the detailed cards from SERVICE_DEFINITIONS.md)

3. "Not sure what you need?" section
   - Brief text about custom solutions
   - CTA to book a discovery call

4. How We Work Together
   - 3 steps: Discovery → Build → Launch & Support
   - Brief, reassuring process overview

5. Final CTA
   - "Let's discuss your goals"
   - Book a call button
```

---

## Debugging Prompts

### Layout Issues
```
My [component] is having layout issues.

Current behavior: [describe what's happening]
Expected behavior: [describe what should happen]

Here's the current code:
[paste code]

I'm using Next.js 14 with Tailwind CSS.
The design uses dark theme with these colors:
- Background: #0a0a0f
- Text: white and zinc-400
- Accent: purple-500/indigo-500/blue-500 gradient
```

### Animation Issues
```
I'm having trouble with Framer Motion animations in my Next.js component.

Issue: [describe]

Current code:
[paste code]

I want the animation to: [describe desired behavior]

Note: Using App Router, so components need 'use client' for Framer Motion.
```

---

## Code Review Prompt

```
Review this component for the Digital Helper website.

Check for:
1. Accessibility (aria labels, semantic HTML, focus states)
2. Responsive design (mobile-first, proper breakpoints)
3. Performance (unnecessary re-renders, optimized images)
4. TypeScript types (proper typing, no 'any')
5. Tailwind best practices (consistent spacing, no arbitrary values)
6. Dark theme consistency (using correct colors)

Code:
[paste code]

Suggest improvements with code examples.
```

---

## Quick Reference Commands

### New Component
```
Create a [component name] component for Digital Helper.
Follow the design system: dark theme, glassmorphism cards, purple accent.
Use TypeScript with proper types.
Make it responsive (mobile-first).
Include Framer Motion animations where appropriate.
```

### Fix Styling
```
This component doesn't match the Digital Helper design system.
Current: [describe issue]
Should be: [describe expected]
Design tokens: background #0a0a0f, accent gradient purple→indigo→blue, glass cards with border-white/[0.08]
```

### Add Interactivity
```
Add [interaction type] to this component.
Use Framer Motion for animations.
Make it accessible (keyboard navigation, aria labels).
Handle loading and error states.
```
