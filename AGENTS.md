<!-- This file is intended for AI coding agents. It contains project-specific context, conventions, and instructions. -->

# Digital Helper — SEO Memory (Hot Cache)

**Last Updated**: 2026-02-18
**Project Status**: Active/Growth

## Active Target Keywords (Top 10-20)

### Hero Keywords (Priority 1)
| Keyword | Current Rank | Target Rank | Volume | Status |
|---------|--------------|-------------|--------|--------|
| web design Richland WA | TBD | #1 | 880 | tracking |
| Richland WA web design | TBD | #1 | 590 | tracking |
| Tri-Cities web designer | TBD | #1 | 480 | tracking |
| website design Kennewick | TBD | #1 | 320 | tracking |
| Pasco WA web developer | TBD | #2 | 260 | tracking |

### Secondary Keywords (Priority 2)
| Keyword | Current Rank | Target Rank | Volume | Status |
|---------|--------------|-------------|--------|--------|
| local seo Richland | TBD | #1 | 720 | tracking |
| seo company Tri-Cities | TBD | #1 | 390 | tracking |
| ai website builder | TBD | #2 | 1100 | tracking |
| small business seo | TBD | #2 | 590 | tracking |

_Full keyword database: `memory/keywords/`_

## Primary Competitors (Top 3-5)

1. **webdesign-pasco.com** (DA: TBD)
   - Main strengths: Local citations, Google Business Profile optimization
   - Our position vs. them: Competitive

2. **tricitieswebdesign.com** (DA: TBD)
   - Main strengths: Content marketing, local backlinks
   - Our position vs. them: Competitive

3. **crescensivedesign.com** (DA: TBD)
   - Main strengths: E-commerce focus, portfolio depth
   - Our position vs. them: Behind

4. **pixelprodigy.com** (DA: TBD)
   - Main strengths: Fast turnaround, budget packages
   - Our position vs. them: Ahead on tech

5. **tri Cities Digital** (DA: TBD)
   - Main strengths: Full-service agency, brand identity
   - Our position vs. them: Competitive on AI features

_Detailed analyses: `memory/competitors/`_

## Current Optimization Priorities

1. **Local SEO Domination** - Claim top 3 positions for "web design [city]" queries
   - Status: in progress
   - Expected impact: high
   - Deadline: 2026-04-30

2. **AI Features Content** - Create content around AI website tools
   - Status: in progress
   - Expected impact: high
   - Deadline: 2026-03-31

3. **GBP Optimization** - Optimize Google Business Profile for all 4 Tri-Cities
   - Status: not started
   - Expected impact: medium
   - Deadline: 2026-03-15

## Key Metrics Snapshot

**Last Metrics Update**: 2026-02-18

| Metric | Current | Target |
|--------|---------|--------|
| Organic Traffic | TBD | 5000/mo |
| Avg. Position | TBD | #3 |
| Total Keywords Ranking | TBD | 200 |
| Page 1 Rankings | TBD | 50 |
| Domain Authority | TBD | 35 |
| Total Backlinks | TBD | 100 |

_Historical data: `memory/reports/`_

## Active Campaigns

### Tri-Cities Local Dominance
- **Duration**: 2026-01-15 - 2026-06-15
- **Goal**: Rank #1 for all "web design [city]" queries in Tri-Cities
- **Status**: active
- **Progress**: 15%
- **Key activities**:
  - Location page optimization (Richland, Kennewick, Pasco, West Richland)
  - Local citation building
  - GBP optimization

### AI Authority Building
- **Duration**: 2026-02-01 - 2026-05-01
- **Goal**: Become go-to resource for AI-powered web design
- **Status**: active
- **Progress**: 10%
- **Key activities**:
  - Blog content on AI website tools
  - AI feature pages on site
  - Thought leadership content

## Quick Reference Notes

- Target market: Richland, WA + Tri-Cities area
- Unique selling point: AI-powered web design + local SEO expertise
- Pricing: $1,999-$3,999 (starter to professional)
- Key differentiator: Real AI features, not just chatbots
- Current tech stack: Next.js 16, React 19, Tailwind CSS v4, Gemini AI

_For project terminology, see: `memory/glossary.md`_

---

# AGENTS.md — Project Development Guide

**Last Updated**: 2026-04-22
**Project**: Digital Helper (digital-helper.com)
**Type**: Next.js 16 marketing site with AI-powered features

## Project Overview

Digital Helper is a web design, SEO, and AI automation agency based in Richland, WA, serving the Tri-Cities area (Richland, Kennewick, Pasco, West Richland). This repository contains the full Next.js 16 marketing website with integrated AI tools, lead capture, reputation auditing, and content generation features.

The site is built as a dark-mode-first, glass-morphism themed marketing site with:
- Static marketing pages (home, services, locations, industries, pricing, work, blog, contact)
- Interactive AI tools (website audit, chat widget, lead scraper, competitor analysis)
- Admin dashboard (content generator with login protection)
- Reputation management dashboard (Google Business Profile audits)
- Lead capture and notification system

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.1.3 |
| React | react / react-dom | 19.2.3 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 |
| UI Primitives | Radix UI + shadcn/ui | new-york style |
| Animation | Framer Motion | ^12.26.2 |
| AI SDK | Vercel AI SDK + Google Gemini | @ai-sdk/google ^3.0.10 |
| Icons | lucide-react | ^0.562.0 |
| Validation | Zod | ^4.3.6 |
| Database | Supabase | @supabase/supabase-js ^2.97.0 |
| Rate Limiting | Upstash Redis | @upstash/ratelimit ^2.0.8 |
| Testing | Vitest + Testing Library | vitest ^4.0.18 |
| Linting | ESLint | ^9 with eslint-config-next |
| Hosting | Vercel | (production) |

## Build & Development Commands

```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
npm test           # Run tests once (vitest run)
npm run test:watch # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npx tsc --noEmit   # Type check without emitting files
```

## Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (routes)/                 # Marketing pages
│   │   ├── page.tsx              # Homepage
│   │   ├── about/
│   │   ├── blog/[slug]/
│   │   ├── booking/
│   │   ├── contact/
│   │   ├── industries/
│   │   ├── locations/            # Richland, Kennewick, Pasco, West Richland
│   │   ├── pricing/
│   │   ├── privacy/
│   │   ├── seo-research/
│   │   ├── services/             # web-design, seo, ai-automation, lead-generation, reputation-management
│   │   ├── terms/
│   │   ├── tools/lead-scraper/
│   │   └── work/
│   ├── actions/                  # Server Actions
│   │   ├── analyze.ts            # Website scraping + AI analysis
│   │   ├── competitor.ts         # Competitor analysis
│   │   ├── content/generate.ts   # AI content generation
│   │   ├── gbp.ts                # Google Places API integration
│   │   ├── lead-finder.ts        # Batch lead discovery
│   │   ├── leads.ts              # Lead storage server action
│   │   ├── proposal.ts           # Proposal generation
│   │   └── send-report.ts        # Report email delivery
│   ├── api/                      # API Route Handlers
│   │   ├── admin/auth/route.ts   # Admin auth endpoint
│   │   ├── business-analysis/route.ts
│   │   ├── chat/route.ts         # Streaming AI chat
│   │   ├── content-generator/
│   │   ├── email-draft/route.ts
│   │   ├── generate-case-study/route.ts
│   │   ├── lead-scraper/route.ts
│   │   ├── pricing/route.ts
│   │   ├── report-pdf/route.ts
│   │   └── seo-analysis/route.ts
│   ├── admin/                    # Admin dashboard pages
│   ├── dashboard/reputation/     # Reputation dashboard
│   ├── layout.tsx                # Root layout (Navbar, Footer, ChatWidget, etc.)
│   ├── globals.css               # Tailwind v4 theme + custom animations
│   ├── error.tsx                 # Error boundary
│   ├── loading.tsx               # Loading UI
│   └── not-found.tsx             # 404 page
├── components/
│   ├── ui/                       # shadcn/ui primitives (accordion, avatar, badge, button, card, dropdown-menu, input, sheet, textarea, toast, toaster)
│   ├── services/                 # Service page layouts and content
│   ├── reputation/               # Reputation dashboard components
│   ├── seo-research/             # SEO research components
│   ├── industries/               # Industry page components
│   ├── locations/                # Location page components
│   ├── content-generator/        # Admin content generator UI
│   ├── blog/                     # Blog components
│   └── tools/                    # Tool components (LeadScraper)
├── hooks/                        # Custom React hooks
│   ├── use-toast.ts
│   └── useExitIntent.ts
├── lib/                          # Utilities and helpers
│   ├── utils.ts                  # cn() utility + noiseTextureStyle
│   ├── validators.ts             # Zod schemas for API inputs
│   ├── validators.test.ts        # Validator unit tests
│   ├── database.ts               # Supabase lead CRUD operations
│   ├── supabase.ts               # Supabase client initialization
│   ├── rate-limit.ts             # Upstash Redis rate limiting
│   ├── api-middleware.ts         # Rate-limit wrapper for API routes
│   ├── admin-auth.ts             # PBKDF2 password hashing + session management
│   ├── analytics.ts              # Analytics tracking helpers
│   ├── business-info.ts          # Business metadata
│   ├── constants.ts              # App constants
│   ├── content-exporter.ts       # Content export utilities
│   ├── email-templates.ts        # Email template helpers
│   ├── google-sheets.ts          # Google Sheets CMS integration
│   ├── blog.ts                   # Blog data helpers
│   └── validators.ts             # Zod validation schemas
├── services/                     # Business logic services
│   ├── aiTools.ts                # AI tool definitions for chat (generateQuote, scheduleCall, analyzeWebsite, etc.)
│   ├── pricingService.ts         # Pricing tier logic
│   └── pricingService.test.ts    # Pricing service unit tests
├── types/                        # TypeScript type definitions
│   ├── index.ts                  # Core app types (ChatMessage, CaseStudy, SEOAnalysisResult, etc.)
│   ├── reputation.ts             # GBP/reputation audit types
│   ├── content.ts                # Content generator types
│   └── database.ts               # Supabase database types
├── test/
│   └── setup.ts                  # Vitest setup (jest-dom, cleanup)
└── middleware.ts                 # Next.js middleware (admin route protection)
```

## Architecture Patterns

### Client vs. Server Components
- **Default to Server Components** for data fetching and static content.
- Use `"use client"` only when necessary for:
  - Interactivity (event listeners, state, effects)
  - Browser APIs (Intersection Observer, LocalStorage)
  - Radix UI primitives that require client-side hydration
  - Framer Motion animations

### Data Fetching
- Prefer fetching data in Server Components or using Next.js Route Handlers (`src/app/api/`).
- Server Actions in `src/app/actions/` handle form submissions, AI generation, and mutations.
- The chat API (`src/app/api/chat/route.ts`) uses `streamText` from the Vercel AI SDK with Google Gemini for streaming responses.

### State Management
- React `useState` and `useEffect` for local component state.
- No global state library is currently used; navigation state is handled by Next.js router or simple local state.

### Path Aliases
`@/*` maps to `./src/*` (configured in `tsconfig.json`).

## Code Style Guidelines

### 1. Imports
- Use **absolute imports** with the `@/` alias.
- Order: React/Next.js built-ins → External libraries → Internal components/utils → Types.
- Example:
  ```tsx
  import { useEffect, useState } from 'react';
  import Link from 'next/link';
  import { cn } from '@/lib/utils';
  import { Button } from '@/components/ui/button';
  import type { ServiceItem } from '@/types';
  ```

### 2. Formatting & Styling
- **Tailwind CSS 4:** Use utility classes for all styling.
- **Class Merging:** Use the `cn()` utility from `@/lib/utils` for conditional classes.
- **Animations:** Use standard Tailwind transitions, custom CSS keyframes in `globals.css`, or the `RevealOnScroll` wrapper for entry animations.
- **Icons:** Use `lucide-react` for consistent iconography.

### 3. TypeScript & Naming
- **Interfaces:** Use `PascalCase`. Name component props `[ComponentName]Props`.
- **Enums:** Use `PascalCase` for the enum name and `UPPER_SNAKE_CASE` for members.
- **Components:** Use `PascalCase` for filenames and export names (e.g., `HeroSection.tsx`).
- **Files:** App Router files follow Next.js conventions (`page.tsx`, `layout.tsx`, `error.tsx`).
- **Strict Typing:** Avoid `any`. Always define interfaces for API responses and component props.

### 4. Error Handling
- **Services:** Wrap API calls in `try...catch`. Log errors to the console and return sensible fallbacks or throw descriptive errors.
- **UI:** Use React Error Boundaries or Next.js `error.tsx` for component-level failures.
- **Validation:** Check `response.ok` when using `fetch`.

### 5. UI Components (shadcn/ui)
- This project uses **shadcn/ui**. New components should be added using `npx shadcn@latest add [component]`.
- UI primitives are located in `src/components/ui/`.
- Do not modify files in `src/components/ui/` directly unless necessary for project-wide styling consistency.

## Design System

Dark-mode-first with the "Electric Midnight" theme:
- **Background:** `--color-background-primary: #0a0a0f`
- **Accent gradient:** teal (#00d4aa) → blue (#0ea5e9) → cyan (#06b6d4)
- **Glass morphism:** `.glass`, `.glass-hover`
- **Gradient text:** `.text-gradient`
- **Gradient backgrounds:** `.bg-accent-gradient`
- **Custom buttons:** `.btn-primary`, `.btn-secondary`
- **Fonts:** Syne (headings, weight 400-800), DM Sans (body, weight 400-700)
- **Animations:** `float`, `blob`, `fadeInUp`, `shimmer`, `glow-pulse`, `gradient-shift`

The root layout forces dark mode: `<html lang="en" className="dark scroll-smooth">`.

## Testing Strategy

- **Framework:** Vitest with jsdom environment.
- **Setup:** `src/test/setup.ts` imports `@testing-library/jest-dom` and cleans up after each test.
- **React Testing:** `@testing-library/react` with `@vitejs/plugin-react`.
- **Current Tests:**
  - `src/lib/validators.test.ts` — Zod schema validation tests.
  - `src/services/pricingService.test.ts` — Pricing tier logic tests.
- **Commands:**
  - `npm test` — run all tests once.
  - `npm run test:watch` — run in watch mode.
  - `npm run test:coverage` — run with coverage report.

## Environment Variables

Create a `.env.local` file with the following:

### Required
| Variable | Purpose |
|----------|---------|
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini AI for analysis and chat |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase database URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase admin key (server-side only) |
| `UPSTASH_REDIS_REST_URL` | Rate limiting Redis URL |
| `UPSTASH_REDIS_REST_TOKEN` | Rate limiting Redis token |

### Optional
| Variable | Purpose |
|----------|---------|
| `GOOGLE_PLACES_API_KEY` | Google Business Profile features |
| `GOOGLE_SHEETS_CLIENT_EMAIL` | Service account for content CMS |
| `GOOGLE_SHEETS_PRIVATE_KEY` | Service account private key |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | Content management spreadsheet |
| `RESEND_API_KEY` | Email notifications for leads |
| `LEAD_NOTIFICATION_EMAIL` | Email to receive lead notifications |
| `ADMIN_PASSWORD` | For admin authentication |
| `CALENDLY_LINK` | Booking link |

**Note:** The app gracefully degrades when optional services are not configured. For example, if Supabase is unavailable, leads still log to the console and can be emailed via Resend.

## Security Considerations

1. **Rate Limiting:** All AI-related API routes are wrapped with `withRateLimit()` from `@/lib/api-middleware.ts`. Limits are:
   - Chat: 10 requests/minute
   - SEO Analysis: 5 requests/minute
   - Business Analysis: 3 requests/minute
   - Content Generation: 3 requests/hour
   - Lead Scraper: 10 requests/hour
   - General API: 100 requests/minute

2. **Admin Authentication:** Uses PBKDF2 (100,000 iterations, HMAC-SHA-256) with a static salt for password hashing. Session tokens are base64-encoded JSON objects stored in HttpOnly, Secure, SameSite=Lax cookies. The middleware in `src/middleware.ts` protects `/admin` routes.

3. **Input Validation:** All API inputs are validated with Zod schemas in `src/lib/validators.ts`.

4. **Environment Variables:** Server-side keys (e.g., `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`) are never exposed to the client.

5. **CORS / Headers:** Rate limit headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`, `Retry-After`) are returned on API responses.

## Deployment

- **Platform:** Vercel
- **Production URL:** https://digital-helper.com
- **Build Output:** Static + SSR hybrid (Next.js App Router)
- **Analytics:** Vercel Analytics and Speed Insights are enabled in `src/app/layout.tsx`.

### Redirects (configured in `next.config.ts`)
| Source | Destination |
|--------|-------------|
| `/seo` | `/services/seo` |
| `/web-design` | `/services/web-design` |
| `/ai-agency` | `/services/ai-automation` |
| `/case-studies` | `/work` |
| `/booking` | `/contact` |
| `/features` | `/` |

### Image Configuration
- Remote hostname allowed: `picsum.photos`
- Formats: `image/webp`, `image/avif`
- Device sizes: 640, 750, 828, 1080, 1200, 1920
- Image sizes: 16, 32, 48, 64, 96

## Key Files for AI Agents

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout with metadata, JSON-LD schema, global wrappers |
| `src/app/globals.css` | Tailwind v4 theme config, custom keyframes, glass/gradient utilities |
| `src/middleware.ts` | Admin route protection |
| `src/lib/utils.ts` | `cn()` class merger, noise texture style |
| `src/lib/validators.ts` | Zod schemas for all API inputs |
| `src/services/aiTools.ts` | AI tool definitions for the chat widget |
| `src/app/api/chat/route.ts` | Streaming chat endpoint |
| `src/app/actions/analyze.ts` | Website scraping + AI analysis server actions |
| `src/lib/database.ts` | Supabase lead CRUD |
| `src/lib/rate-limit.ts` | Upstash Redis rate limit configuration |
| `src/lib/admin-auth.ts` | Secure admin password hashing and session management |

## Development Notes

- **Local Dev Issue on WSL/Linux:** If you encounter `Cannot find module '../lightningcss.linux-x64-gnu.node'`, run `npm install lightningcss` or use Windows PowerShell for local dev instead.
- **Supabase Status:** Currently paused in production. Leads are captured via email (Resend) as a fallback.
- **Type Checking:** Run `npx tsc --noEmit` before committing to catch TypeScript errors.
- **Adding shadcn Components:** Use `npx shadcn@latest add [component]`. The `components.json` is configured for the "new-york" style with CSS variables.
