# 3. Frontend Dependencies Inventory

Source: `frontend-platform` (root, apps, packages, tooling)  
Package manager: pnpm · Turbo · Node `>=20`

## Monorepo root (`frontend-platform/package.json`)

| Package | Version | Type | Purpose |
|---------|---------|------|---------|
| `turbo` | ^2.4.4 | dev | Monorepo task runner |
| `openapi-typescript` | ^7.13.0 | dev | Generate TS types from OpenAPI |
| `eslint` | ^9.21.0 | dev | Linting |
| `typescript` | ^5.7.3 | dev | TypeScript |
| `@dhankirti/eslint-config` | workspace:* | dev | Shared ESLint config |
| `@dhankirti/tsconfig` | workspace:* | dev | Shared TS configs |

## Apps (customer-web, internal-web, broker-web)

### Runtime — shared across apps

| Package | Version | Used by | Purpose |
|---------|---------|---------|---------|
| `next` | ^15.2.0 | all apps | Next.js App Router |
| `react` | ^19.0.0 | all apps | UI library |
| `react-dom` | ^19.0.0 | all apps | React DOM renderer |
| `@dhankirti/api-client` | workspace:* | all apps | HTTP API client |
| `@dhankirti/auth` | workspace:* | all apps | Auth/session providers |
| `@dhankirti/config` | workspace:* | all apps | Env/config helpers |
| `@dhankirti/logger` | workspace:* | all apps | Client/server logging |
| `@dhankirti/permissions` | workspace:* | all apps | Permission codes/helpers |
| `@dhankirti/ui` | workspace:* | all apps | Design system components |
| `@tanstack/react-query` | ^5.69.0 | customer, internal | Server-state cache |
| `lucide-react` | ^1.23.0 | customer, internal | Icons |
| `react-hot-toast` | ^2.5.2 | customer, internal | Toast notifications |

### Dev — shared across apps

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ^5.7.3 | Typecheck |
| `eslint` | ^9.21.0 | Lint |
| `eslint-config-next` | ^15.2.0 | Next ESLint rules |
| `tailwindcss` | ^3.4.17 | Utility CSS |
| `postcss` | ^8.5.3 | CSS pipeline |
| `autoprefixer` | ^10.4.20 | Vendor prefixes |
| `@types/node` | ^22.13.5 | Node typings |
| `@types/react` | ^19.0.10 | React typings |
| `@types/react-dom` | ^19.0.4 | React DOM typings |
| `@dhankirti/eslint-config` | workspace:* | Shared lint |
| `@dhankirti/tsconfig` | workspace:* | Shared TS |
| `@next/bundle-analyzer` | ^16.2.10 | customer, internal — bundle analysis |

## Workspace packages (first-party)

| Package | Depends on (external) | Purpose |
|---------|----------------------|---------|
| `@dhankirti/api-client` | config, logger, types | REST client + auth refresh |
| `@dhankirti/auth` | api-client, permissions, ui, react-query | Session/auth React layer |
| `@dhankirti/ui` | config, radix dialog/slot, react-table, cva, clsx, lucide, toast, tailwind-merge | UI kit |
| `@dhankirti/config` | zod | Env parsing / API proxy helpers |
| `@dhankirti/logger` | pino, zod | Logging helpers |
| `@dhankirti/permissions` | (none runtime) | Permission code catalog |
| `@dhankirti/types` | (none runtime) | Generated/shared API types |

### UI package external runtime deps

| Package | Version | Purpose |
|---------|---------|---------|
| `@radix-ui/react-dialog` | ^1.1.6 | Accessible dialog primitives |
| `@radix-ui/react-slot` | ^1.3.0 | Composition slot |
| `@tanstack/react-table` | ^8.21.2 | Headless tables |
| `class-variance-authority` | ^0.7.1 | Variant class helpers |
| `clsx` | ^2.1.1 | Conditional classNames |
| `tailwind-merge` | ^3.0.2 | Merge Tailwind classes |

## Tooling packages

| Package | External deps | Purpose |
|---------|---------------|---------|
| `@dhankirti/eslint-config` | `@eslint/js`, `eslint-config-prettier`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `typescript-eslint` | Shared ESLint |
| `@dhankirti/tsconfig` | (config only) | Shared TypeScript bases |
