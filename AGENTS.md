# Agent Guidelines: digital-helper-nextjs

Welcome, agent. This document provides the necessary context, commands, and conventions for working in this repository.

## 🚀 Commands

### Build & Development
- **Dev Server:** `npm run dev` - Starts the development server on `http://localhost:3000`.
- **Build:** `npm run build` - Creates an optimized production build.
- **Start:** `npm run start` - Runs the built application.

### Quality Control
- **Lint:** `npm run lint` - Runs ESLint to check for code quality and style issues.
- **Type Check:** `npx tsc --noEmit` - Validates TypeScript types across the project.

### Testing
- **Note:** No testing framework (Jest, Vitest, etc.) is currently configured in this project. 
- If adding tests, prefer **Vitest** for speed and compatibility with the modern stack.
- To run a single test (hypothetical): `npx vitest -t "test name"`

---

## 🛠 Project Structure

- `src/app/`: Next.js App Router pages and layouts.
- `src/components/`: Reusable React components.
  - `ui/`: Low-level UI primitives (Radix UI based).
- `src/services/`: External API integrations (e.g., Gemini AI).
- `src/lib/`: Utility functions and shared logic.
- `src/types/`: TypeScript interfaces and enums.
- `src/assets/`: Static assets and icons.

---

## 🎨 Code Style Guidelines

### 1. Imports
- Use **absolute imports** with the `@/` alias defined in `tsconfig.json`.
- Order: React/Next.js built-ins -> External libraries -> Internal components/utils -> Types.
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
- **Animations:** Use standard Tailwind transitions or the `RevealOnScroll` wrapper for entry animations.
- **Icons:** Use `lucide-react` for consistent iconography.

### 3. TypeScript & Naming
- **Interfaces:** Use `PascalCase`. Name component props `[ComponentName]Props`.
- **Enums:** Use `PascalCase` for the enum name and `UPPER_SNAKE_CASE` for members.
- **Components:** Use `PascalCase` for filenames and export names (e.g., `HeroSection.tsx`).
- **Files:** App Router specific files should follow Next.js conventions (`page.tsx`, `layout.tsx`, `error.tsx`).
- **Strict Typing:** Avoid `any`. Always define interfaces for API responses and component props.

### 4. Error Handling
- **Services:** Wrap API calls in `try...catch` blocks. Log errors to the console and return sensible fallbacks or throw descriptive errors.
- **UI:** Use React Error Boundaries or Next.js `error.tsx` for component-level failures.
- **Validation:** Check `response.ok` when using `fetch`.

### 5. Components
- **Client Components:** Use the `"use client"` directive at the top of files that use hooks or browser APIs.
- **Functional Style:** Use functional components. `React.FC` is acceptable but direct function definitions are also common.
- **Single Responsibility:** Keep components focused. Break down large components in `src/app/page.tsx` into smaller ones in `src/components/`.

### 6. UI Components (shadcn/ui)
- This project uses **shadcn/ui**. New components should be added using `npx shadcn@latest add [component]`.
- UI primitives are located in `src/components/ui/`.
- Do not modify files in `src/components/ui/` directly unless necessary for project-wide styling consistency.
- Use the `cn()` utility for merging classes provided by shadcn.

---

## 🏗 Architectural Patterns

### Client vs. Server Components
- Default to **Server Components** for data fetching and static content.
- Use **Client Components** (`"use client"`) only when necessary for:
  - Interactivity (event listeners, state, effects).
  - Using browser APIs (Intersection Observer, LocalStorage).
  - Radix UI primitives that require client-side hydration.

### Data Fetching
- Prefer fetching data in Server Components or using Next.js Route Handlers (`src/app/api/`).
- Use the `GeminiService` for all AI-related functionality, ensuring calls are proxied through local API routes.

### State Management
- Use React `useState` and `useEffect` for local component state.
- For global UI state (like modals or sidebars), consider using a Context Provider or a lightweight library like `zustand` if complexity increases (verify current usage before adding).
- Currently, navigation state is often handled by Next.js router or simple local state in a layout component.

---

## 🤖 AI & Agent Instructions

### Context Awareness
- This is a digital agency website ("Digital Helper") focusing on local business digital transformation in Richland, WA.
- The stack is Next.js 16+, React 19+, Tailwind CSS 4, and TypeScript.
- API keys must NEVER be committed. Use `.env.local` and access via backend routes.

### Service Pattern
- Services are implemented as classes or singleton objects in `src/services/`.
- They should interact with `/api/*` routes rather than calling third-party APIs directly from the client to preserve security.
- See `GeminiService` for an example of this pattern.

### Interaction Patterns
- Use `RevealOnScroll` for section-level animations to maintain the "modern" feel.
- Maintain the responsive design (mobile-first approach).
- Use Lucide icons consistently.

### Documentation & Communication
- Update this `AGENTS.md` file if you introduce new significant architectural patterns or tools.
- Keep comments in code focused on the "why" rather than the "what".
- Use JSDoc for complex utility functions in `src/lib/`.

---

## 📝 Rules & Instructions
*No project-specific Cursor or Copilot rules were found during initialization.*

---
*Last Updated: 2026-01-17*
