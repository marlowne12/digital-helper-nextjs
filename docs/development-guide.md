# Development Guide — digital-helper-nextjs

> **Last Updated:** 2026-02-28 | **Branch:** redesign-v2

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build

# Type check
npx tsc --noEmit
```

---

## Critical Rules (Non-Negotiable)

### 1. Tailwind v4 — No tailwind.config.js
Tailwind CSS v4 uses PostCSS and a CSS-native `@theme` block. **Never create a `tailwind.config.js`.**

```css
/* globals.css — Add new design tokens here */
@theme inline {
  --color-my-new-token: #hexvalue;
  --animate-my-animation: myAnimation 2s ease infinite;
}
```

### 2. Dark Mode — Don't use prefers-color-scheme
The `dark` class is hardcoded on `<html>`. Tailwind `dark:` prefix works via `&:is(.dark *)`.

```tsx
// ✅ Correct
<div className="bg-white dark:bg-zinc-900">...</div>

// ❌ Wrong — never add a theme toggle
```

### 3. Framer Motion v12 Import
```tsx
// ✅ Correct
import { motion, AnimatePresence } from "framer-motion"

// ❌ Wrong (v13 future API - not yet)
import { motion } from "motion/react"
```

### 4. Zod v4 — Always use safeParse at API boundaries
```typescript
// ✅ Correct
const result = schema.safeParse(body)
if (!result.success) {
  return NextResponse.json({ error: 'Validation failed' }, { status: 400 })
}
const data = result.data

// ❌ Wrong — will throw uncaught exception
const data = schema.parse(body)
```

### 5. Vitest — Never use Jest
```typescript
// ✅ Correct
import { describe, it, expect, vi } from 'vitest'
const mockFn = vi.fn()

// ❌ Wrong
const mockFn = jest.fn()
```

### 6. Path Aliases — Always use @/
```typescript
// ✅ Correct
import { cn } from "@/lib/utils"
import { NavbarV2 } from "@/components/v2/NavbarV2"

// ❌ Wrong
import { cn } from "../../lib/utils"
```

### 7. ABTestProvider — Never Wrap Outside It
```tsx
// layout.tsx — Provider order (DO NOT change)
<ABTestProvider>          ← Must be outermost custom provider
  <NavbarV2 />
  {children}             ← All routes go here
  <FooterV2 />
</ABTestProvider>

// ✅ If you add a new provider:
<ABTestProvider>
  <MyNewProvider>        ← Nest inside ABTestProvider
    {children}
  </MyNewProvider>
</ABTestProvider>
```

### 8. suppressHydrationWarning — Do Not Remove
Both `<html>` and `<body>` have `suppressHydrationWarning`. This is intentional (dark mode class + font loading). Leave it alone.

### 9. backdrop-blur Requirement
Any element using `backdrop-blur-*` must have a parent with `overflow-hidden`:
```tsx
<div className="overflow-hidden">
  <div className="backdrop-blur-xl ...">...</div>
</div>
```

---

## Component Conventions

### Creating a V2 Component

```tsx
// src/components/v2/MyComponentV2.tsx
"use client"

import { motion } from "framer-motion"
import { SomeIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// Type your props
interface MyComponentV2Props {
  // ...
}

// Named export (not default)
export function MyComponentV2({ }: MyComponentV2Props) {
  return (
    <section className="relative bg-[#0a0a0f] ...">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute ... bg-indigo-600/10 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* ... */}
        </motion.div>
      </div>
    </section>
  )
}
```

### V2 Design Tokens

| Token | Value | Use |
|-------|-------|-----|
| Background | `bg-[#0a0a0f]` | Main section background |
| Surface | `bg-white/5` | Cards, glass surfaces |
| Border | `border-white/10` | Card borders |
| Border subtle | `border-white/[0.08]` | Dividers |
| Primary | `bg-indigo-600` / `hover:bg-indigo-500` | CTAs |
| Primary text | `text-indigo-300` | Accent text |
| Text primary | `text-white` | Headlines |
| Text secondary | `text-zinc-400` | Body text |
| Text tertiary | `text-zinc-500` | Labels, captions |
| Glow | `bg-indigo-600/20 blur-3xl` | Card glow effects |
| Glass | `bg-white/5 backdrop-blur-sm border border-white/10` | Glass cards |

### Font Usage
```tsx
// Headings — Syne
<h1 style={{ fontFamily: "var(--font-heading)" }}>
  Headline Text
</h1>

// Body — DM Sans (automatic via CSS, or explicit)
<p style={{ fontFamily: "var(--font-sans)" }}>
  Body text
</p>
```

---

## API Route Pattern

```typescript
// src/app/api/my-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { mySchema } from '@/lib/validators'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // 1. Validate input
    const result = mySchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    // 2. Check env vars before using them
    const apiKey = process.env.MY_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 })
    }

    // 3. Business logic
    const data = result.data
    // ...

    // 4. Return success
    return NextResponse.json({ success: true, data })

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('My Endpoint Error:', message)
    return NextResponse.json(
      { error: 'Internal server error', details: message },
      { status: 500 }
    )
  }
}
```

---

## AI Integration Patterns

### Gemini Direct (existing pattern — for simple completions)
```typescript
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

const result = await ai.models.generateContent({
  model: 'gemini-2.0-flash',
  contents: [{ role: 'user', parts: [{ text: prompt }] }],
  config: {
    systemInstruction: 'Your instruction here',
    responseMimeType: 'application/json',  // For structured output
  },
})

const data = JSON.parse(result.text || '{}')
```

### Vercel AI SDK v6 (for streaming)
```typescript
import { streamText } from 'ai'
import { google } from '@ai-sdk/google'

const result = streamText({
  model: google('gemini-2.0-flash'),
  system: 'System prompt',
  messages: userMessages,
})

return result.toDataStreamResponse()
```

---

## Testing

### Running Tests
```bash
npm run test          # Run all tests
npm run test:ui       # Open Vitest UI
npx vitest --watch    # Watch mode
```

### Test File Convention
```typescript
// src/lib/myModule.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { myFunction } from './myModule'

describe('myFunction', () => {
  it('should do something', () => {
    expect(myFunction('input')).toBe('expected')
  })
})
```

### Existing Test Files
- `src/lib/validators.test.ts` — Zod validator tests
- `src/services/pricingService.test.ts` — Pricing service tests
- `src/test/setup.ts` — Global test setup

---

## Environment Variables

| Variable | Required | Used In |
|----------|---------|---------|
| `GEMINI_API_KEY` | Yes | `/api/chat`, `/api/website-audit`, `/api/business-analysis` |
| `OPENROUTER_API_KEY` | Yes | `/api/case-study` |
| `RESEND_API_KEY` | Yes | Email sending |
| `NEXT_PUBLIC_*` | As needed | Client-side env vars (prefix required) |

---

## Deployment

### Vercel
```bash
# Deploy to Vercel
vercel --prod

# Or via git push to main
git push origin main
```

### Build Verification
```bash
npm run build
# Must succeed with 0 errors before deploying
```

### Known Deployment Issues
- **Contact form** saves to filesystem — breaks on Vercel. Must migrate to external storage.
- **Dynamic robots.ts + sitemap.ts** — Works correctly on Vercel.

---

## Code Quality

### ESLint
```bash
npm run lint           # Run ESLint
```

### TypeScript Check
```bash
npx tsc --noEmit      # Type check without building
```

---

## Adding a New Page

1. Create `src/app/[route]/page.tsx`
2. Export a default `async function Page()` (Server Component by default)
3. Add to sitemap in `src/app/sitemap.ts`
4. Add to navbar if needed (edit `NavbarV2.tsx`)
5. Add metadata export for SEO

```tsx
// src/app/my-page/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title | Digital Helper',
  description: 'Page description for SEO',
}

export default function MyPage() {
  return <div>...</div>
}
```

---

## Adding a New V2 Section to Homepage

1. Create `src/components/v2/MySectionV2.tsx`
2. Follow V2 component conventions (named export, "use client", dark theme)
3. Import in `src/app/page.tsx`
4. Place in the correct position in the page flow

---

## Git Workflow

```bash
# Current branch: redesign-v2
git checkout redesign-v2

# Feature branch
git checkout -b feat/my-feature

# Commit
git add src/components/v2/MyComponent.tsx
git commit -m "feat(v2): add MyComponent section"

# Merge back
git checkout redesign-v2
git merge feat/my-feature
```
