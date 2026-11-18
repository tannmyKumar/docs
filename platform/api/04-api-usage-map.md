# 5. API Usage Map

Maps endpoints (or api-client helpers) to UI surfaces. If no page/screen caller was found, marked **No UI caller found**.

## Auth & session

| Endpoint / helper | Customer web | Internal web | Mobile |
|-------------------|--------------|--------------|--------|
| `POST /auth/login` | `/login` | `/login` | `(auth)/login` |
| `POST /auth/mobile/send-otp` + `verify-otp` | `/login` (OTP tab) | — | `(auth)/login` |
| Register flow `/auth/register/*` | `/register` | — | `(auth)/register` |
| Invite `/auth/invite/*` | `/complete-invite` | — | `complete-invite` |
| `POST /auth/forgot-password` | `/forgot-password` | `/forgot-password` | `(auth)/forgot-password` |
| `POST /auth/reset-password` | `/reset-password` | `/reset-password` | `reset-password` |
| `GET /auth/me` | App-wide session | App-wide + `getStaffMe` after login | Session / `getMe` |
| `GET|POST /auth/refresh` | Silent restore (api-client) | Same | Native refresh |
| `POST /auth/logout` | Shell logout, `/verify-mobile` | Shell logout | Session logout |
| Google SSO `/auth/sso/*` | No UI caller found (commented) | — | login + `sso-callback` |
| `POST /auth/set-password` | No UI caller found (legacy) | — | — |

## Profile / verify mobile

| Endpoint | Customer web | Mobile | Internal |
|----------|--------------|--------|----------|
| `/me/verify-mobile/*` | `/verify-mobile` | `verify-mobile` | — |
| `GET|PATCH /me/profile` | `/profile` (+ auth hooks) | Profile tab | — |
| Profile photo CRUD | `/profile` | Profile tab | — |

## KYC

| Endpoint | Customer web | Mobile | Internal |
|----------|--------------|--------|----------|
| `GET /me/kyc` + PAN/Aadhaar/bank/demat/submit | `/profile/kyc` | `profile/kyc`, `update-bank` | — |
| `POST /me/kyc/aadhaar/complete` | `/aadhaar-status` | `aadhaar-status` | — |
| Digilocker callback / Cashfree bank webhook | Backend only | — | — |
| Staff KYC summaries/detail/approve/reject/send-back/demat | — | — | `/customers`, `/customers/[userId]` |

## Portfolio / reports / sell-requests (customer)

| Endpoint | Customer web | Mobile |
|----------|--------------|--------|
| `GET /me/portfolio` | `/dashboard`, `/portfolio`, sell-requests | home, portfolio, search, sell create |
| `GET|POST|PATCH /me/sell-requests` | `/sell-requests` | activity + create (`PATCH` status: No UI caller found on mobile) |
| `GET /me/reports` + download | `/reports` | `profile/reports` |

## Deals / companies (customer-facing)

| Endpoint | Customer web | Mobile | Internal |
|----------|--------------|--------|----------|
| `GET /deals` | `/deals`, `/dashboard` | deals tab, home, search | `/inventory/deals`, dashboard |
| `GET /deals/:id` | `/deals/[dealId]` | deal detail / checkout | deal sheet |
| `GET /companies` (list) | via deals embeds | via deals | companies list + create deal |

## Orders / payments (customer)

| Endpoint | Customer web | Mobile | Internal |
|----------|--------------|--------|----------|
| `POST /orders/portal` | Deal checkout | checkout | — |
| `POST /payments/cashfree/create` | Checkout | checkout / order pay | — |
| `POST /payments/cashfree/verify` | `/payment-status` | `payment-status` | — |
| Cashfree payment webhook | Backend only | — | — |
| `GET /orders` | `/orders`, `/dashboard` | activity, home | `/operations/ops-orders/portal`, dashboard, customer detail |
| `GET /orders/:id` | Orders sheet | order detail | order detail |
| Dealsheet / receipt PDF | Orders sheet | authenticated PDF helpers | order detail |

## Notifications / support (customer)

| Endpoint | Customer web | Mobile |
|----------|--------------|--------|
| `/me/notifications*` | App shell notifications panel | notifications tab |
| `/me/support*` + WS | Support shell / `/support` | chat tab |
| `/me/ws-token` | Realtime providers | chat / notifications |

## Internal — users / customers / RBAC

| Endpoint | Internal pages |
|----------|----------------|
| `GET /users`, create/update | `/admin/users`, `/admin/users/[userId]`, `/customers`, dashboard |
| Roles / permissions overrides | `/admin/users/[userId]` |
| `GET|PUT /rbac/matrix` | `/system/permissions`, staff user detail |
| `POST /customers/invite` | `/customers` |
| `PATCH /customers/:id/assign-rm` | **No UI caller found** |
| `GET /users/:id/portfolio` | `/customers/[userId]` |

## Internal — inventory

| Endpoint | Internal pages |
|----------|----------------|
| Companies CRUD + financials/news/logo | `/inventory/companies*` |
| Stock list/get/patch/adjust/movements | `/inventory/stock*` |
| Deals create/update/approve/reject/publish/unpublish/send-to-client | `/inventory/deals*` |

## Internal — orders / sell-requests

| Endpoint | Internal pages |
|----------|----------------|
| List/get order + payment/execution/share status + documents | `/operations/ops-orders/portal` |
| `POST /orders/firm-buy` | **No UI caller found** |
| Sell-request queue/detail/status/create-order/create-company | `/sales/sell-requests` |

## Internal — support / staff notifications

| Endpoint | Internal surfaces |
|----------|-------------------|
| `/support/*` | Support shell / `/support` |
| `/internal/notifications*` | App shell notifications |

## Unused / backend-only (examples)

| Endpoint | Notes |
|----------|-------|
| Webhooks (Cashfree payment/bank, Digilocker callback) | Provider → API only |
| `GET /api/v1/dev/ping-ops` | Non-prod only |
| `POST /orders/firm-buy` | Permission exists; no UI caller found |
| `PATCH /customers/:id/assign-rm` | No UI caller found |
| Goal 3 desk/ops/finance dedicated routes | Not shipped as separate pages yet (some order status APIs already used on Portal Orders) |
