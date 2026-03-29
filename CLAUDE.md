# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npx tsc --noEmit     # Type check without emitting files
npm run test         # Run Vitest unit tests
npm run test:watch   # Vitest watch mode
npm run test:coverage
```

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `master` | Production — auto-deploys via Vercel. Merge via PR only. |
| `feature/<description>` | New features |
| `fix/<description>` | Bug fixes |
| `<agent-key>/<description>` | Agent-authored branches (e.g. `cto/add-ci`) |

**CI checks** (GitHub Actions) run on all PRs and pushes to master: lint → type-check → test → build. All must pass before merging.

## Commit Convention

```
<type>(<scope>): <description>

Co-Authored-By: Paperclip <noreply@paperclip.ing>  # when Paperclip agents commit
```

Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`

## Architecture Overview

This is a **Next.js 16** marketing site for a web design agency ("Digital Helper") with AI-powered features. Uses the App Router with React 19, TypeScript, and Tailwind CSS v4.

### Key Architectural Patterns

**Server Actions (`src/app/actions/`)**: AI-powered backend logic using Vercel AI SDK with Google Gemini:
- `analyze.ts` - Website scraping (cheerio) + AI analysis (generateObject/generateText)
- `gbp.ts` - Google Places API integration for business profile data
- `lead-finder.ts` - Batch lead discovery

**API Routes (`src/app/api/`)**: Streaming chat and service endpoints:
- `chat/route.ts` - AI chat widget with tool calling (generateQuote, scheduleCall, analyzeWebsite)
- Uses `@ai-sdk/google` with `streamText` for streaming responses

**Type System**:
- `src/types/index.ts` - Core app types (ChatMessage, CaseStudy, SEOAnalysisResult, etc.)
- `src/types/reputation.ts` - GBP/reputation audit types (GBPProfile, AuditResult, SwotAnalysis)

**Validation**: Zod schemas in `src/lib/validators.ts` for API inputs

### UI Component Structure

**Layout**: Root layout (`src/app/layout.tsx`) includes Navbar, Footer, ChatWidget, and Contact section on all pages. Uses Syne (headings) and DM Sans (body) fonts.

**Service Pages**: Use shared `ServicePageLayout` component with sticky sidebar navigation (`src/components/services/`).

**UI Primitives**: Radix UI + shadcn/ui patterns in `src/components/ui/` (button, card, sheet, accordion, etc.)

**Animations**: Framer Motion for page transitions; custom CSS animations defined in `globals.css` (float, blob, shimmer, glow-pulse).

### Design System

Dark-mode-first with "Electric Midnight" theme:
- Background: `--color-background-primary: #0a0a0f`
- Accent gradient: teal (#00d4aa) → blue (#0ea5e9) → cyan (#06b6d4)
- Glass morphism utilities: `.glass`, `.glass-hover`
- Gradient text: `.text-gradient`, `.bg-accent-gradient`

### Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json)

### Environment Variables Required

- `GOOGLE_PLACES_API_KEY` - For Google Business Profile lookups
- `GOOGLE_GENERATIVE_AI_API_KEY` - For Gemini AI features (via @ai-sdk/google)

### Redirects

Legacy routes are redirected in `next.config.ts` (e.g., `/seo` → `/services/seo`, `/booking` → `/contact`).

---

## Code Style Guidelines

### 1. Imports
- Use **absolute imports** with the `@/` alias defined in `tsconfig.json`
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
- **Tailwind CSS 4:** Use utility classes for all styling
- **Class Merging:** Use the `cn()` utility from `@/lib/utils` for conditional classes
- **Animations:** Use standard Tailwind transitions or the `RevealOnScroll` wrapper for entry animations
- **Icons:** Use `lucide-react` for consistent iconography

### 3. TypeScript & Naming
- **Interfaces:** Use `PascalCase`. Name component props `[ComponentName]Props`
- **Enums:** Use `PascalCase` for the enum name and `UPPER_SNAKE_CASE` for members
- **Components:** Use `PascalCase` for filenames and export names (e.g., `HeroSection.tsx`)
- **Files:** App Router specific files should follow Next.js conventions (`page.tsx`, `layout.tsx`, `error.tsx`)
- **Strict Typing:** Avoid `any`. Always define interfaces for API responses and component props

### 4. Error Handling
- **Services:** Wrap API calls in `try...catch` blocks. Log errors to the console and return sensible fallbacks or throw descriptive errors
- **UI:** Use React Error Boundaries or Next.js `error.tsx` for component-level failures
- **Validation:** Check `response.ok` when using `fetch`

### 5. Components
- **Client Components:** Use the `"use client"` directive at the top of files that use hooks or browser APIs
- **Functional Style:** Use functional components. `React.FC` is acceptable but direct function definitions are also common
- **Single Responsibility:** Keep components focused. Break down large components into smaller ones

### 6. UI Components (shadcn/ui)
- This project uses **shadcn/ui**. New components should be added using `npx shadcn@latest add [component]`
- UI primitives are located in `src/components/ui/`
- Do not modify files in `src/components/ui/` directly unless necessary for project-wide styling consistency
- Use the `cn()` utility for merging classes provided by shadcn

---

## Project Context

### Client vs. Server Components
- Default to **Server Components** for data fetching and static content
- Use **Client Components** (`"use client"`) only when necessary for:
  - Interactivity (event listeners, state, effects)
  - Using browser APIs (Intersection Observer, LocalStorage)
  - Radix UI primitives that require client-side hydration

### Data Fetching
- Prefer fetching data in Server Components or using Next.js Route Handlers (`src/app/api/`)
- Use the `GeminiService` for all AI-related functionality, ensuring calls are proxied through local API routes

### State Management
- Use React `useState` and `useEffect` for local component state
- For global UI state (like modals or sidebars), consider using a Context Provider or a lightweight library like `zustand` if complexity increases
- Navigation state is handled by Next.js router or simple local state in layout components

---

## Recent Updates (2026-02-03)

### GEO Optimization (AI Visibility)
Enhanced LocalBusiness schema in `layout.tsx` for better AI parsing:
- Added `description` with official tagline
- Added `email` (business@digital-helper.com)
- Added `founder` (Marlon McGuire)
- Added `areaServed` with all 4 Tri-Cities (Richland, Kennewick, Pasco, West Richland)
- Added `hasOfferCatalog` with all 5 services as structured Service schema

### Hero Tagline
Updated Hero component to use official tagline: "We build systems that work while you sleep"

### AntiGravity Kit
Installed ag-kit v2.0 with:
- 20 specialist agents
- 36 skills (including ui-ux-pro-max)
- 11 workflows (including /orchestrate)

Use `/orchestrate` for multi-agent tasks, `/ui-ux-pro-max` for design system work.

### Task Tracking
See `docs/WEBSITE-IMPROVEMENTS.md` for current improvement sprint.
