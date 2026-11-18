# 7. Frontend Dependency Definitions

Definitions for packages used in `frontend-platform` (root, apps, workspace packages, tooling).

## Framework and UI

**next** — React meta-framework with App Router, SSR/SSG, and API rewrites. Powers customer-web, internal-web, and broker-web.

**react** — Library for building component-based UIs.

**react-dom** — Renders React components to the browser DOM.

**@tanstack/react-query** — Asynchronous server-state management (caching, refetch, mutations). Used for API data and session queries.

**lucide-react** — Icon set as React components (sidebar, buttons, status).

**react-hot-toast** — Lightweight toast notification UI.

## First-party workspace packages

**@dhankirti/api-client** — Shared fetch wrapper: envelopes, cookie credentials, silent session refresh, domain API helpers (deals, orders, auth, etc.).

**@dhankirti/auth** — Auth providers, session hooks, guest gates, wrong-portal handling for web apps.

**@dhankirti/ui** — Shared design system: buttons, dialogs, tables, layouts, Tailwind theme.

**@dhankirti/config** — Shared env parsing (`zod`) and Next.js API proxy rewrite helpers.

**@dhankirti/logger** — Shared logging utilities for client and server (uses `pino` on server).

**@dhankirti/permissions** — Staff permission code constants and `can()` helpers for UI gating.

**@dhankirti/types** — Generated/shared TypeScript types (including OpenAPI-derived API types).

**@dhankirti/eslint-config** — Shared ESLint configuration for all frontend packages/apps.

**@dhankirti/tsconfig** — Shared TypeScript `tsconfig` bases.

## UI package libraries

**@radix-ui/react-dialog** — Unstyled, accessible dialog/modal primitives used by `@dhankirti/ui`.

**@radix-ui/react-slot** — Lets a component merge props onto a child element (composition pattern).

**@tanstack/react-table** — Headless table logic (sorting, columns) without owning styles.

**class-variance-authority (cva)** — Helper to define component style variants (size, intent) as class maps.

**clsx** — Conditionally joins CSS class name strings.

**tailwind-merge** — Merges Tailwind classes without conflicting utilities (e.g. `p-2` vs `p-4`).

## Config / logging shared with backend concepts

**zod** — Schema validation (env and config in `@dhankirti/config`; also used in logger package).

**pino** — Structured logger used by `@dhankirti/logger` on the server side of Next apps.

## CSS / build tooling

**tailwindcss** — Utility-first CSS framework for styling apps and the UI kit.

**postcss** — CSS transform pipeline used with Tailwind.

**autoprefixer** — Adds vendor prefixes to CSS for browser compatibility.

**@next/bundle-analyzer** — Visualizes Next.js production bundle sizes (analyze builds).

**openapi-typescript** — Generates TypeScript types from the backend OpenAPI JSON.

**turbo** — High-performance monorepo build/dev orchestrator (`turbo run build|dev|lint`).

## Lint and types

**eslint** — Linter for JS/TS.

**eslint-config-next** — ESLint rules recommended for Next.js projects.

**@eslint/js** — Core ESLint JS configs (pulled via shared eslint-config).

**eslint-config-prettier** — Turns off ESLint rules that conflict with Prettier formatting.

**eslint-plugin-react** — React-specific ESLint rules.

**eslint-plugin-react-hooks** — Enforces Rules of Hooks.

**typescript-eslint** — TypeScript-aware ESLint tooling.

**typescript** — TypeScript language/compiler for typechecking apps and packages.

**@types/node** — Node.js TypeScript types.

**@types/react** — React TypeScript types.

**@types/react-dom** — React DOM TypeScript types.
