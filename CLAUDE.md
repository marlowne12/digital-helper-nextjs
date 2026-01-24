# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev           # Start development server (http://localhost:3000)
npm run build         # Production build
npm run start         # Start production server
npm run lint          # Run ESLint
npm test              # Run tests (Vitest)
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npx tsc --noEmit      # Type check without emitting files
```

## Architecture Overview

This is a **Next.js 16** marketing site for a web design agency ("Digital Helper") with AI-powered features. Uses the App Router with React 19, TypeScript, and Tailwind CSS v4.

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (Navbar, Footer, Chat, Contact)
│   ├── page.tsx            # Home page
│   ├── actions/            # Server Actions (7 files)
│   ├── api/                # API Routes (7 routes)
│   ├── services/           # Service pages (6 main + 9 sub-pages)
│   ├── blog/               # Blog system with dynamic routes
│   ├── work/               # Case studies/portfolio
│   ├── industries/         # Industry-specific pages (5)
│   ├── locations/          # Local area pages (4 Tri-Cities)
│   └── dashboard/          # Reputation dashboard
├── components/             # React Components (~72 files)
│   ├── ui/                 # shadcn/ui primitives (11 components)
│   ├── services/           # Service page components (14 files)
│   ├── reputation/         # Reputation audit components (9 files)
│   ├── industries/         # Industry page components
│   ├── locations/          # Location page components
│   └── [feature components]
├── lib/                    # Utilities & Services
│   ├── utils.ts            # cn() class merger, texture helper
│   ├── validators.ts       # Zod schemas for API validation
│   ├── analytics.ts        # Vercel Analytics tracking (14 events)
│   ├── blog.ts             # Static blog post data
│   ├── email-templates.ts  # HTML email templates
│   └── constants.ts        # Global constants
├── services/               # Business Logic
│   ├── aiTools.ts          # AI tool definitions for chat (6 tools)
│   └── pricingService.ts   # Pricing logic with tests
├── types/                  # TypeScript Definitions
│   ├── index.ts            # Core types (ChatMessage, CaseStudy, etc.)
│   └── reputation.ts       # GBP/reputation types
└── hooks/                  # Custom React Hooks
    ├── useExitIntent.ts    # Exit intent detection
    └── use-toast.ts        # Toast notification state
```

### Key Architectural Patterns

**Server Actions (`src/app/actions/`)**: AI-powered backend logic using Vercel AI SDK with Google Gemini:

| File | Purpose |
|------|---------|
| `analyze.ts` | Website scraping (Cheerio) + AI analysis (generateObject/generateText) |
| `gbp.ts` | Google Places API integration for business profile data |
| `lead-finder.ts` | Batch lead discovery with scoring algorithm (0-100) |
| `competitor.ts` | SWOT + competitive analysis |
| `leads.ts` | Multi-source lead capture & storage (Resend email) |
| `proposal.ts` | AI-powered proposal generation with ROI |
| `send-report.ts` | PDF generation (@react-pdf/renderer) + email delivery |

**API Routes (`src/app/api/`)**: Streaming chat and service endpoints:

| Route | Purpose |
|-------|---------|
| `chat/route.ts` | AI chat with 6 tool-calling capabilities |
| `seo-analysis/` | SEO analysis endpoint |
| `business-analysis/` | Business audit endpoint |
| `email-draft/` | Email composition |
| `generate-case-study/` | AI-generated case studies |
| `pricing/` | Dynamic pricing endpoint |
| `report-pdf/` | PDF report generation |

**Type System**:
- `src/types/index.ts` - Core types (ChatMessage, CaseStudy, SEOAnalysisResult, BlogPost, etc.)
- `src/types/reputation.ts` - GBP/reputation types (GBPProfile, AuditResult, SwotAnalysis, Review)

**Validation**: Zod schemas in `src/lib/validators.ts` for API inputs:
- `pricingRequestSchema`, `generateQuoteSchema`, `scheduleCallSchema`
- `analyzeWebsiteSchema`, `analyzeCompetitorsSchema`, `getPortfolioSchema`, `comparePlansSchema`

### AI Chat Tool System

The chat widget (`src/app/api/chat/route.ts`) uses Gemini 1.5 Flash with 6 callable tools defined in `src/services/aiTools.ts`:

1. `generateQuote` - Estimate pricing based on service type
2. `scheduleCall` - Return calendar link
3. `analyzeWebsite` - Website analysis with score and issues
4. `analyzeCompetitors` - Competitor analysis
5. `getPortfolio` - Case study retrieval
6. `comparePlans` - Pricing comparison

### Lead Management System

Multi-source lead tracking in `src/app/actions/leads.ts`:
- Sources: `website_audit`, `chat`, `contact`, `exit_intent`, `newsletter`
- Lead scoring (0-100) based on: review count, rating, website presence, phone availability
- Lead tiering: hot (70+), warm (50-70), cold (30-50), poor_fit (<30)
- Notifications via Resend email integration

### UI Component Structure

**Layout**: Root layout (`src/app/layout.tsx`) includes Navbar, Footer, ChatWidget, and Contact section on all pages. Uses Syne (headings) and DM Sans (body) fonts.

**Page Layouts**: Shared layout components for consistent structure:
- `ServicePageLayout` - Service pages with sticky sidebar
- `IndustryPageLayout` - Industry-specific pages
- `LocationPageLayout` - Location-specific pages

**UI Primitives** (`src/components/ui/`): Radix UI + shadcn/ui:
- button, card, input, textarea, badge, avatar
- accordion, sheet, dropdown-menu, toast, toaster

**Animations**: Framer Motion for page transitions; custom CSS animations in `globals.css`:
- `float` - 6s vertical oscillation
- `blob` - 7s shape morphing
- `shimmer` - Text shimmer effect
- `glow-pulse` - 2s glow pulsing
- `fadeInUp` - Entry animation

### Design System

Dark-mode-first with "Electric Midnight" theme:

```css
/* Backgrounds */
--color-background-primary: #0a0a0f;
--color-background-secondary: #0f1419;
--color-background-tertiary: #161b22;

/* Accent Gradient */
teal (#00d4aa) → blue (#0ea5e9) → cyan (#06b6d4)
```

Utility classes:
- `.glass`, `.glass-hover` - Glass morphism
- `.text-gradient` - Gradient text effect
- `.bg-accent-gradient` - Gradient background
- `.btn-primary`, `.btn-secondary` - Button styles
- `.noise-texture` - SVG noise overlay

### Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json)

### Environment Variables

**Required:**
```env
# AI (use either one)
GEMINI_API_KEY=                        # Primary
GOOGLE_GENERATIVE_AI_API_KEY=          # Fallback for Vercel

# APIs
GOOGLE_PLACES_API_KEY=                 # Google Places API for GBP data
```

**Optional:**
```env
# Email & Lead Notifications
RESEND_API_KEY=                        # Lead notification emails
LEAD_NOTIFICATION_EMAIL=               # Recipient for lead alerts

# Database/Cache (infrastructure-ready)
KV_REST_API_URL=                       # Vercel KV for lead storage
DATABASE_URL=                          # Prisma database
```

### Redirects

Legacy routes redirected in `next.config.ts`:
- `/seo` → `/services/seo`
- `/web-design` → `/services/web-design`
- `/ai-agency` → `/services/ai-automation`
- `/case-studies` → `/work`
- `/booking` → `/contact`
- `/features` → `/`

---

## Code Style Guidelines

### 1. Imports
- Use **absolute imports** with the `@/` alias
- Order: React/Next.js built-ins → External libraries → Internal components/utils → Types
- Example:
  ```tsx
  import { useEffect, useState } from 'react';
  import Link from 'next/link';
  import { cn } from '@/lib/utils';
  import { Button } from '@/components/ui/button';
  import type { ServiceItem } from '@/types';
  ```

### 2. Formatting & Styling
- **Tailwind CSS 4:** Use utility classes for all styling (via `@tailwindcss/postcss`)
- **Class Merging:** Use the `cn()` utility from `@/lib/utils` for conditional classes
- **Animations:** Use standard Tailwind transitions or the `RevealOnScroll` wrapper for entry animations
- **Icons:** Use `lucide-react` for consistent iconography

### 3. TypeScript & Naming
- **Interfaces:** Use `PascalCase`. Name component props `[ComponentName]Props`
- **Enums:** Use `PascalCase` for the enum name and `UPPER_SNAKE_CASE` for members
- **Components:** Use `PascalCase` for filenames and export names (e.g., `HeroSection.tsx`)
- **Files:** App Router files follow Next.js conventions (`page.tsx`, `layout.tsx`, `error.tsx`)
- **Strict Typing:** Avoid `any`. Always define interfaces for API responses and component props

### 4. Error Handling
- **Server Actions:** Wrap API calls in `try...catch` blocks. Log errors and return sensible fallbacks
- **UI:** Use React Error Boundaries or Next.js `error.tsx` for component-level failures
- **Validation:** Use Zod schemas for input validation; check `response.ok` when using `fetch`

### 5. Components
- **Client Components:** Use `"use client"` directive for hooks, browser APIs, or Radix UI primitives
- **Server Components:** Default for data fetching and static content
- **Functional Style:** Use functional components with hooks
- **Single Responsibility:** Keep components focused; break down large components

### 6. UI Components (shadcn/ui)
- Add new components: `npx shadcn@latest add [component]`
- UI primitives in `src/components/ui/` - avoid direct modification unless necessary
- Use `cn()` utility for class merging

### 7. Server Actions
- Mark all server action files with `'use server'` at the top
- All AI/external API calls should go through server actions
- Error handling with try-catch and graceful fallbacks
- Integrate lead tracking where appropriate

---

## Project Context

### Client vs. Server Components
- Default to **Server Components** for data fetching and static content
- Use **Client Components** (`"use client"`) only when necessary for:
  - Interactivity (event listeners, state, effects)
  - Using browser APIs (Intersection Observer, LocalStorage)
  - Radix UI primitives that require client-side hydration

### Data Fetching
- Prefer fetching data in Server Components
- Use Server Actions for AI-related functionality and external APIs
- API routes for streaming responses (e.g., chat)

### State Management
- Use React `useState` and `useEffect` for local component state
- Custom hooks in `src/hooks/` for reusable stateful logic
- For global UI state, consider Context Provider or `zustand`
- Navigation state handled by Next.js router

### Testing
- **Framework:** Vitest with Testing Library
- **Environment:** jsdom for DOM simulation
- Test files: `*.test.ts` or `*.test.tsx`
- Run: `npm test` or `npm run test:watch`

### Analytics
The `src/lib/analytics.ts` module tracks 14 event types via Vercel Analytics:
- `page_view`, `lead_captured`, `audit_started`, `audit_completed`
- `chat_opened`, `chat_message_sent`, `cta_click`, `form_submission`
- `exit_intent_shown`, `service_page_view`, `blog_post_view`
- `proposal_generated`, `report_exported`

### Blog System
- Static data in `src/lib/blog.ts` (can migrate to MDX/CMS)
- Dynamic routes: `/blog/[slug]`, `/blog/category/[category]`
- Features: featured posts, categories, search, reading time estimates

### Multi-Region Support
- **Locations:** Richland, Kennewick, Pasco, West Richland (Tri-Cities)
- **Industries:** Retail/E-commerce, Wineries, Agriculture, Manufacturing, Healthcare
- Each with dedicated pages using shared layout components
