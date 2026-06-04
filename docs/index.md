# Documentation Index — digital-helper-nextjs

> **Generated:** 2026-02-28 | **Branch:** redesign-v2 | **Scan:** Deep Scan (BMAD document-project)

---

## 📋 Document Registry

| Document | Path | Description |
|----------|------|-------------|
| **Project Overview** | `docs/project-overview.md` | Business context, tech stack, current state, known issues |
| **Architecture** | `docs/architecture.md` | System design, routing, component layers, data flow, gotchas |
| **Source Tree Analysis** | `docs/source-tree-analysis.md` | Full directory map, all routes, file inventory, issues |
| **Component Inventory** | `docs/component-inventory.md` | Every component documented with type, status, patterns |
| **API Contracts** | `docs/api-contracts.md` | All API routes with request/response schemas |
| **Data Models** | `docs/data-models.md` | TypeScript interfaces, Zod schemas, enums, constants |
| **Development Guide** | `docs/development-guide.md` | Setup, conventions, patterns, critical rules |
| **Design System** | `DESIGN_SYSTEM.md` | Brand colors, typography, spacing (root-level) |
| **Business Context** | `BUSINESS.md` | Business goals, target clients, services (root-level) |
| **Improvement Plan** | `docs/WEBSITE-IMPROVEMENTS.md` | Tracked improvement tasks with completion status |
| **Content Structure** | `docs/CONTENT-STRUCTURE.md` | Content organization plan |

---

## 🏗️ Project At-a-Glance

```
Business:     Digital Helper — AI Marketing Agency (Richland WA)
Framework:    Next.js 16.1.3 + React 19.2.3 (App Router)
Styling:      Tailwind CSS v4 (no config file, @theme in globals.css)
Theme:        Dark-only (Electric Midnight) — indigo-600 primary
Fonts:        Syne (headings) + DM Sans (body)
AI:           Gemini 2.0 Flash + @google/genai + Vercel AI SDK v6
Testing:      Vitest v4 (not Jest)
Deployment:   Vercel
Branch:       redesign-v2
```

---

## 🧭 Where Things Live

### Pages & Routes
→ See `docs/source-tree-analysis.md` → "App Router Routes" section

### Components
→ See `docs/component-inventory.md`
- **V2 (active):** `src/components/v2/`
- **Legacy V1:** `src/components/` (root)
- **Primitives:** `src/components/ui/`

### API Endpoints
→ See `docs/api-contracts.md`
- All at `src/app/api/*/route.ts`

### Design Tokens
→ See `src/app/globals.css` → `@theme inline { ... }`
→ See `DESIGN_SYSTEM.md`

### Types
→ See `docs/data-models.md`
→ Source: `src/types/index.ts`, `src/types/audit.types.ts`

---

## ⚠️ Critical Issues (For AI Agents)

1. **No Tailwind config** — Use `@theme` in `globals.css` for new tokens
2. **Dark-only** — Don't add light mode support
3. **ABTestProvider wraps everything** — New providers go INSIDE it
4. **Framer Motion v12** — Import from `framer-motion` not `motion/react`
5. **Vitest not Jest** — Use `vi.fn()` not `jest.fn()`
6. **Zod v4 safeParse** — Never use `.parse()` at API boundaries
7. **Contact form filesystem storage** — Broken on Vercel (⚠️ needs migration)
8. **No API auth** — All AI endpoints are publicly accessible

---

## 🚀 Redesign Status (redesign-v2 branch)

| Section | V2 Status | Notes |
|---------|-----------|-------|
| Navbar | ✅ V2 Live | NavbarV2 with services dropdown |
| Homepage Hero | ✅ V2 Live | Chat demo + stats |
| Social Proof Bar | ✅ V2 Live | Trust bar |
| Problem Section | ✅ V2 Live | |
| Services | ✅ V2 Live | |
| How It Works | ✅ V2 Live | |
| Case Studies | ✅ V2 Live | |
| Pricing Teaser | ✅ V2 Live | |
| FAQ | ✅ V2 Live | |
| CTA | ✅ V2 Live | |
| Footer | ✅ V2 Live | FooterV2 |
| **Service Pages** | ❌ V1 Only | Needs redesign |
| **Blog** | ❌ V1 Only | Needs redesign |
| **About** | ❌ V1 Only | Needs redesign |
| **Contact** | ❌ V1 Only | Needs redesign |
| **Pricing Page** | ❌ V1 Only | Needs redesign |
| **Location Pages** | ❌ V1 Only | Needs redesign |
| **Industry Pages** | ❌ V1 Only | Needs redesign |

---

## 📌 Scan Report

→ See `docs/project-scan-report.json` for machine-readable scan data
