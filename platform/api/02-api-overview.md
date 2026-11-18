# 3. API Overview

## Base URL

| Environment | Typical API host |
|-------------|------------------|
| Local | `http://localhost:4000` (or same-origin via Next.js rewrite) |
| Production customer BFF | Same origin as `app.dhankirti.co.in` → proxy to API |
| Production API | `https://app.api.dhankirti.co.in` |

All versioned REST routes use prefix **`/api/v1`**.

## OpenAPI / Swagger

- UI (non-production): `/api/v1/docs`
- JSON: `/api/v1/docs/json`
- Shared schemas: `backend-platform/src/shared/openapi-schemas.ts`
- Frontend types regenerated via `openapi-typescript` (`codegen:api`)

## Authentication

| Mechanism | Use |
|-----------|-----|
| Portal cookies | Web customer / internal / broker |
| `Authorization: Bearer` | Mobile / some refresh paths |
| `X-App-Context` | Distinguishes customer vs internal vs broker |
| Webhooks | Cashfree signature verification |
| WebSocket | Short-lived token from `/me/ws-token`, staff notification/support ws-token |

### Session endpoints

| Endpoint | Purpose |
|----------|---------|
| `POST /api/v1/auth/login` | Issue access + refresh cookies |
| `GET` or `POST /api/v1/auth/refresh` | Renew access cookie (static refresh) |
| `POST /api/v1/auth/logout` | Revoke session + clear cookies |
| `GET /api/v1/auth/me` | Current user + effective permissions |

Failed refresh clears portal auth cookies so zombie refresh cookies cannot keep the SPA stuck.

## Middleware helpers (auth notes used in catalog)

| Note | Meaning |
|------|---------|
| public | No auth required (may be rate-limited) |
| requireAuth | Valid access token |
| requireCustomer | Public customer role |
| requireVerifiedMobileCustomer | Customer with verified mobile |
| requirePermission(`CODE`) | Staff permission |
| requireInternalStaff | Any internal staff user |
| webhook | Signature-verified callback |

## Client libraries

| Package / tree | Consumers |
|----------------|-----------|
| `@dhankirti/api-client` | customer-web, internal-web |
| `mobile-app/src/lib/api` | Expo mobile app |
