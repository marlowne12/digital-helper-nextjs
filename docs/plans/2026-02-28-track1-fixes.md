# Track 1 — P1 Bug Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix all 7 P1 broken/fake features so the site is honest and trustworthy before further development.

**Architecture:** Each task targets a single file or directory. All 7 tasks are independent and can run as parallel agents. No shared state. Each agent reads only its target file(s).

**Tech Stack:** Next.js 16.1.3, React 19, TypeScript 5, Tailwind v4, Vitest v4, @ai-sdk/react, Zod v4, path alias @/ = src/

**Critical Rules (read before editing anything):**
- Import Framer Motion from `framer-motion` not `motion/react`
- Use `vi.fn()` not `jest.fn()` in tests
- Use Zod `.safeParse()` not `.parse()` at API boundaries
- No tailwind.config.js — tokens go in globals.css @theme block
- Dark-only theme — never add light mode

---

## Task 1: Fix aiTools.ts — Remove fake analyzeWebsite data + fix Calendly placeholder

**Files:**
- Modify: `src/services/aiTools.ts`

### What the problem is

`analyzeWebsite` tool always returns hardcoded `score: 45` with identical 3 issues regardless of URL. The `scheduleCall` tool returns a placeholder Calendly URL `calendly.com/digitalhelper/consultation`.

### Step 1: Read the current file

```bash
cat src/services/aiTools.ts
```

Find the `analyzeWebsite` tool definition. It will look like:
```typescript
analyzeWebsite: tool({
  description: '...',
  parameters: analyzeWebsiteSchema,
  execute: async ({ url }) => {
    return {
      url,
      score: 45,
      issues: ['Mobile responsiveness issues detected', 'Slow page load times', 'Missing meta descriptions'],
      opportunity: 'High - modernizing this site could double your conversion rate.'
    }
  }
}),
```

Also find `scheduleCall` — it returns a Calendly link string.

### Step 2: Fix analyzeWebsite — call real API

Replace the `analyzeWebsite` execute function with a real API call. If the API fails, return a clear disclaimer instead of fake data:

```typescript
analyzeWebsite: tool({
  description: 'Analyze a website URL for SEO and performance issues',
  parameters: analyzeWebsiteSchema,
  execute: async ({ url }) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      const response = await fetch(`${baseUrl}/api/seo-analysis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) throw new Error(`API returned ${response.status}`)

      const data = await response.json()
      return {
        url,
        score: data.overallScore ?? data.score ?? 0,
        issues: data.quickWins ?? data.issues ?? [],
        opportunity: data.summary ?? 'Analysis complete.',
        disclaimer: undefined,
      }
    } catch (error) {
      return {
        url,
        score: null,
        issues: [],
        opportunity: null,
        disclaimer: 'Live analysis unavailable. Contact us for a free manual audit.',
      }
    }
  }
}),
```

### Step 3: Fix scheduleCall — remove placeholder URL

Find the `scheduleCall` tool. Update the Calendly URL to use an env var with a clear fallback comment:

```typescript
scheduleCall: tool({
  description: 'Schedule a consultation call',
  parameters: scheduleCallSchema,
  execute: async ({ preferredTime }) => {
    // TODO: Replace NEXT_PUBLIC_CALENDLY_URL with real booking link in .env
    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || null
    return {
      message: calendlyUrl
        ? `Book your call here: ${calendlyUrl}`
        : 'To schedule a call, please contact us directly at hello@digital-helper.com',
      url: calendlyUrl,
    }
  }
}),
```

### Step 4: Verify TypeScript compiles

```bash
npx tsc --noEmit
```

Expected: 0 errors

### Step 5: Commit

```bash
git add src/services/aiTools.ts
git commit -m "fix(ai-tools): connect analyzeWebsite to real API, remove Calendly placeholder"
```

---

## Task 2: Fix HeroAuditWidget.tsx — Replace random score fallback with error state

**Files:**
- Modify: `src/components/HeroAuditWidget.tsx`

### What the problem is

When the `/api/seo-analysis` call fails, the catch block generates random scores using `Math.random()`. Users see fake personalized data.

### Step 1: Read the current catch block

```bash
cat src/components/HeroAuditWidget.tsx
```

Find the error/catch block. It will look something like:

```typescript
} catch (error) {
  // Something like this — random scores
  setScore({
    overall: Math.floor(Math.random() * 35) + 35,
    seo: Math.floor(Math.random() * 40) + 30,
    speed: Math.floor(Math.random() * 40) + 25,
    mobile: Math.floor(Math.random() * 35) + 35,
  })
}
```

### Step 2: Add an error state type

Near the top of the component (after imports), add:

```typescript
type WidgetState = 'idle' | 'loading' | 'results' | 'error'
```

### Step 3: Replace the random fallback with error state

Change the state to track error separately. Replace the catch block:

```typescript
} catch (error) {
  setState('error')
}
```

### Step 4: Add error UI

Find where the component renders its result/loading states and add an error branch:

```typescript
{state === 'error' && (
  <div className="text-center py-6">
    <p className="text-zinc-400 text-sm mb-3">
      Analysis unavailable right now.
    </p>
    <a
      href="/contact"
      className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
    >
      Get a free manual audit →
    </a>
  </div>
)}
```

### Step 5: Verify no random score code remains

```bash
grep -n "Math.random" src/components/HeroAuditWidget.tsx
```

Expected: no output

### Step 6: Verify TypeScript

```bash
npx tsc --noEmit
```

### Step 7: Commit

```bash
git add src/components/HeroAuditWidget.tsx
git commit -m "fix(hero): replace random score fallback with honest error state"
```

---

## Task 3: Fix WebsiteAudit.tsx — Add proper error handling

**Files:**
- Modify: `src/components/WebsiteAudit.tsx`

### What the problem is

Component calls `/api/website-audit` and may silently fail or show confusing state on error.

### Step 1: Read the current file

```bash
cat src/components/WebsiteAudit.tsx
```

Find the submit handler and any try/catch blocks. Look for where errors are handled (or not).

### Step 2: Ensure error state is set properly on failure

Find the catch block in the submit handler. Make sure it:
1. Sets an explicit error state
2. Shows a user-facing error message

Add or update the error state display:

```typescript
// In state, ensure there's an error field:
const [error, setError] = useState<string | null>(null)

// In catch block:
} catch (err) {
  setError('We could not complete the audit. Please check the URL and try again, or contact us directly.')
  setState('input')
}
```

### Step 3: Add error UI above the form

```typescript
{error && (
  <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 mb-4">
    <p className="text-red-400 text-sm">{error}</p>
  </div>
)}
```

### Step 4: Clear error on new submission

```typescript
const handleSubmit = async () => {
  setError(null)  // ← add this at the top
  // ... rest of handler
}
```

### Step 5: Verify TypeScript

```bash
npx tsc --noEmit
```

### Step 6: Commit

```bash
git add src/components/WebsiteAudit.tsx
git commit -m "fix(audit): add explicit error state, remove silent failure"
```

---

## Task 4: Fix ChatWidget.tsx — Handle missing Calendly URL gracefully

**Files:**
- Modify: `src/components/ChatWidget.tsx`

### What the problem is

The `scheduleCall` tool result card renders a Calendly link. After Task 1 fixes aiTools.ts, the `scheduleCall` tool will now return `url: null` when no env var is set. The ChatWidget card renderer must handle this gracefully.

**Note:** Do Task 1 BEFORE this task. Task 1 fixes the source; this task fixes the display.

### Step 1: Read the current file

```bash
cat src/components/ChatWidget.tsx
```

Find the section that renders `scheduleCall` tool results. It will look something like:

```typescript
{toolName === 'scheduleCall' && (
  <div className="...">
    <a href={result.url}>Book a call</a>
  </div>
)}
```

### Step 2: Update the scheduleCall card to handle null URL

```typescript
{toolName === 'scheduleCall' && (
  <div className="rounded-lg bg-indigo-600/10 border border-indigo-500/20 p-3 mt-2">
    <p className="text-indigo-300 text-sm font-medium mb-2">📅 Schedule a Call</p>
    {result.url ? (
      <a
        href={result.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md transition-colors"
      >
        Book your free consultation →
      </a>
    ) : (
      <p className="text-zinc-400 text-xs">
        {result.message || 'Contact us at hello@digital-helper.com to schedule a call.'}
      </p>
    )}
  </div>
)}
```

### Step 3: Also update analyzeWebsite card to handle disclaimer

Find the `analyzeWebsite` tool result card. Add disclaimer rendering:

```typescript
{toolName === 'analyzeWebsite' && (
  <div className="rounded-lg bg-orange-600/10 border border-orange-500/20 p-3 mt-2">
    {result.disclaimer ? (
      <p className="text-orange-300 text-sm">{result.disclaimer}</p>
    ) : (
      <>
        <p className="text-orange-300 text-sm font-medium mb-1">
          Score: {result.score}/100
        </p>
        {result.issues?.map((issue: string, i: number) => (
          <p key={i} className="text-zinc-400 text-xs">• {issue}</p>
        ))}
      </>
    )}
  </div>
)}
```

### Step 4: Verify TypeScript

```bash
npx tsc --noEmit
```

### Step 5: Commit

```bash
git add src/components/ChatWidget.tsx
git commit -m "fix(chat): handle null Calendly URL and analyzeWebsite disclaimer gracefully"
```

---

## Task 5: Delete /dashboard/reputation broken route

**Files:**
- Delete: `src/app/dashboard/reputation/page.tsx`
- Delete: `src/app/dashboard/` directory (if empty after deletion)

### What the problem is

The reputation dashboard route depends on `GOOGLE_PLACES_API_KEY` which is not configured. Visitors hitting `/dashboard/reputation` see errors or broken UI.

### Step 1: Check for any nav links pointing to /dashboard

```bash
grep -rn "dashboard" src/components/v2/NavbarV2.tsx src/components/v2/FooterV2.tsx 2>/dev/null
grep -rn "/dashboard" src/ --include="*.tsx" --include="*.ts" | grep -v "node_modules"
```

If any links found, remove them before deleting the route.

### Step 2: Delete the route

```bash
rm -rf src/app/dashboard
```

### Step 3: Verify the directory is gone

```bash
ls src/app/dashboard 2>&1
```

Expected: "No such file or directory"

### Step 4: Verify the build still compiles

```bash
npx tsc --noEmit
```

### Step 5: Commit

```bash
git add -A
git commit -m "fix: remove broken /dashboard/reputation route (missing GOOGLE_PLACES_API_KEY)"
```

---

## Task 6: Create .env.example

**Files:**
- Create: `.env.example` at project root

### What the problem is

No .env.example exists. New devs and deployment environments have no reference for required variables.

### Step 1: Check for any env vars used in the codebase

```bash
grep -rn "process.env\." src/ --include="*.ts" --include="*.tsx" | grep -v "node_modules" | sed 's/.*process.env\.\([A-Z_]*\).*//' | sort -u
```

This will list all env vars the code reads.

### Step 2: Create .env.example

Create `.env.example` at the project root with this content:

```
# Digital Helper — Environment Variables
# Copy this file to .env.local and fill in your values
# NEVER commit .env.local to git

# ──────────────────────────────────────────────
# AI — Required for chat, audit, analysis features
# ──────────────────────────────────────────────
GEMINI_API_KEY=
# Some routes use this alternative name — set both to the same key
GOOGLE_GENERATIVE_AI_API_KEY=

# ──────────────────────────────────────────────
# Google Places — Required for reputation dashboard
# Currently: dashboard route removed. Set this if you re-enable it.
# ──────────────────────────────────────────────
GOOGLE_PLACES_API_KEY=

# ──────────────────────────────────────────────
# OpenRouter — Required for /api/case-study
# ──────────────────────────────────────────────
OPENROUTER_API_KEY=

# ──────────────────────────────────────────────
# Resend — Required for contact form email notifications
# ──────────────────────────────────────────────
RESEND_API_KEY=

# ──────────────────────────────────────────────
# Site URL — Required for absolute URL generation
# Local: http://localhost:3000
# Production: https://digital-helper.com
# ──────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ──────────────────────────────────────────────
# Calendly — Optional, for chat scheduling tool
# Example: https://calendly.com/your-real-link/30min
# ──────────────────────────────────────────────
NEXT_PUBLIC_CALENDLY_URL=
```

### Step 3: Verify .env.example is NOT in .gitignore

```bash
cat .gitignore | grep "env.example"
```

Expected: no output (env.example should NOT be ignored — it's safe to commit)

### Step 4: Commit

```bash
git add .env.example
git commit -m "chore: add .env.example with all required environment variables"
```

---

## Task 7: Delete conductor/ abandoned scaffolding

**Files:**
- Delete: `conductor/` at project root

### What the problem is

A `conductor/` directory exists at the project root. It is abandoned scaffolding with `setup_state.json` showing `last_successful_step: "2.3_tech_stack"`. It's incomplete and confusing.

### Step 1: Inspect what's in it first

```bash
ls -la conductor/
cat conductor/setup_state.json 2>/dev/null || echo "no setup_state.json"
```

Verify it's the abandoned scaffolding (not something else named conductor).

### Step 2: Delete it

```bash
rm -rf conductor/
```

### Step 3: Verify gone

```bash
ls conductor/ 2>&1
```

Expected: "No such file or directory"

### Step 4: Commit

```bash
git add -A
git commit -m "chore: delete abandoned conductor/ scaffolding directory"
```

---

## Final Step: Verify all P1 tasks complete

After all 7 tasks are done:

```bash
# 1. TypeScript clean
npx tsc --noEmit

# 2. Tests still pass
npm run test

# 3. No Math.random in components
grep -rn "Math.random" src/components/

# 4. No fake score:45 hardcode
grep -rn "score: 45" src/

# 5. No placeholder Calendly (should be gone or env-var driven)
grep -rn "calendly.com/digitalhelper" src/

# 6. No dashboard route
ls src/app/dashboard 2>&1

# 7. No conductor directory
ls conductor/ 2>&1

# 8. .env.example exists
cat .env.example
```

All checks should pass. Then update docs/WEBSITE-IMPROVEMENTS.md — mark P1-001 through P1-007 as [x] complete.
