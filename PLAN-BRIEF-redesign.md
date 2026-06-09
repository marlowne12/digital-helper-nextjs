# Plan Brief — High-End Finish + Page-One Local SEO

> Context seed for the planning agent. Read this first. This repo is the live source for
> **https://digital-helper.com** — a Richland, WA (Tri-Cities) digital agency selling web
> design, SEO, and AI automation to local small businesses.

## Goal

Make digital-helper.com **(a) uniformly high-end and beautiful** and **(b) optimized to rank
on page one for Tri-Cities local-intent keywords** — then ship it deployable. Run as
autonomously as possible.

## Current state (branch `redesign/operator-grade-finish`)

- Next.js 16 (App Router), Tailwind, Radix, framer-motion; deploy target Vercel.
- **54 routes** under `src/app` — home, services (+ai-automation/chatbots/voice-ai),
  locations (richland/kennewick/pasco/west-richland + *-wa pages), industries
  (agriculture/healthcare/manufacturing/retail/wineries), blog, /audit tool, pricing,
  case-studies, about, contact, booking, demo, admin/*.
- **Operator-grade brand redesign just recovered** onto this branch: `src/brand/` (Mark,
  Wordmark, Logo, Monogram), 5 landing sections in `src/components/landing/`, operator
  tokens in `src/app/globals.css`, Geist+Geist_Mono in `layout.tsx`, reworked `Navbar.tsx`
  and `Footer.tsx`. The home page uses the new sections.
- Prior known issues to re-verify, not assume: production build (`npm run build`) had
  dependency gaps in API routes (`@notionhq/client`, `@vercel/kv`, `resend`,
  `lightningcss-linux-x64-gnu`); some inner routes inherited new tokens without visual QA.

## Brand canon (BINDING — do not redesign the identity, complete its rollout)

- **Palette:** Operator Black `#0E0F11`, Signal Amber `#E89A3C` (max 1 accent per surface),
  Arterial Red `#B83A2C` (light-mode/alerts only), Charcoal `#2A2C30`, Steel `#5C6066`,
  Mist `#A4A8AE`, Warm Bone `#F2EFE9` (light base).
- **Type:** Geist Mono (display/headlines), Geist (body); wordmark ALL CAPS +0.08em.
- **Personality:** calm authority, senior engineer at a small friendly firm. Not corporate,
  not growth-hacker.
- **Anti-slop (forbidden):** marquees, glassmorphism, gradient text, glow shadows,
  decorative status dots, fake "trusted by" logos, em-dash spam, section-number eyebrows.

## SEO targets

- Keyword clusters: see `tri-cities-keyword-opportunities.md` (and `PLAN-seo-expansion.md`).
- Local intent: "web design Richland WA", "Tri-Cities web design", "SEO Kennewick", etc.
- NAP must be consistent: Digital Helper, Richland WA, digitalhelperwebsite@gmail.com.

## Success criteria

1. Operator-grade brand applied consistently across **all 54 routes**; zero legacy "Axiom"
   template artifacts; passes a design-quality review.
2. `npm run build` passes clean (all deps declared in package.json — no `--no-save`).
3. Lighthouse (mobile): Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 90 on home + top pages.
4. Every page: unique title/description/OG, sitemap.xml, robots.txt, LocalBusiness +
   Service JSON-LD, consistent NAP, internal links from home to priority keyword pages.
5. Lead paths (contact form → Notion CRM, /audit tool) work end-to-end.

## Out of scope

Paid ads, off-site link-building outreach, new backend products, Hermes/OpenClaw integration.

## What the plan should produce

A staged, dependency-ordered plan: **audit → brand-consistency pass → SEO/technical pass →
build-fix → QA/visual-verify → security/launch checklist**, with each stage scoped to
specific files/routes so it can be executed by parallel agents. Flag anything that needs a
human decision (e.g., real business address for schema, domain/Vercel env access).
