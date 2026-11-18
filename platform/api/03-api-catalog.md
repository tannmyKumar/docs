# 4. API Catalog

Inventory of HTTP (and WebSocket) endpoints from `backend-platform` route registrations. Paths include `/api/v1` where applicable.

## Health

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| GET | `/health` | Health | Liveness | public |
| GET | `/healthz` | Health | Readiness (DB + Redis) | public |

## WebSocket

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| GET | `/api/v1/ws` | — | Notifications + support presence | WS token |

## Auth

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| POST | `/api/v1/auth/register` | Auth | Start registration (email OTP) | public |
| GET | `/api/v1/auth/register/status` | Auth | Registration status | public |
| POST | `/api/v1/auth/register/resend-email-otp` | Auth | Resend email OTP | public |
| POST | `/api/v1/auth/register/verify-email` | Auth | Verify email OTP | public |
| POST | `/api/v1/auth/register/send-mobile-otp` | Auth | Send register mobile OTP | public |
| POST | `/api/v1/auth/register/resend-mobile-otp` | Auth | Resend register mobile OTP | public |
| POST | `/api/v1/auth/register/verify-mobile` | Auth | Verify register mobile OTP | public |
| POST | `/api/v1/auth/register/complete` | Auth | Complete registration | public |
| POST | `/api/v1/auth/invite/start` | Auth | Validate staff invite token | public |
| POST | `/api/v1/auth/invite/send-mobile-otp` | Auth | Invite mobile OTP | public |
| POST | `/api/v1/auth/invite/verify-mobile` | Auth | Verify invite mobile | public |
| POST | `/api/v1/auth/invite/complete` | Auth | Complete invite | public |
| POST | `/api/v1/auth/login` | Auth | Email/password login | public |
| POST | `/api/v1/auth/forgot-password` | Auth | Request reset email | public |
| GET | `/api/v1/auth/refresh` | Auth | Refresh access | cookie refresh |
| POST | `/api/v1/auth/refresh` | Auth | Refresh access | cookie refresh |
| POST | `/api/v1/auth/reset-password` | Auth | Reset with token | public |
| POST | `/api/v1/auth/logout` | Auth | Logout | public |
| GET | `/api/v1/auth/me` | Auth | Current user + permissions | requireAuth |
| POST | `/api/v1/auth/set-password` | Auth | Legacy set password | public |
| POST | `/api/v1/auth/mobile/send-otp` | Auth | Mobile login OTP send | public |
| POST | `/api/v1/auth/mobile/verify-otp` | Auth | Mobile login OTP verify | public |
| GET | `/api/v1/auth/sso/google` | Auth | Google SSO start | public |
| GET | `/api/v1/auth/sso/google/callback` | Auth | Google SSO callback | public |
| POST | `/api/v1/auth/sso/exchange` | Auth | Exchange SSO code | public |

## Users

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| GET | `/api/v1/users/` | Users | List users | `VIEW_USERS` |
| GET | `/api/v1/users/:id` | Users | Get user | `VIEW_USERS` |
| GET | `/api/v1/users/:id/portfolio` | Users | Customer portfolio by user | `VIEW_USER_PORTFOLIO` |
| GET | `/api/v1/users/:id/photo` | Users | User photo | `VIEW_USERS` |
| POST | `/api/v1/users/` | Users | Create internal user | `CREATE_USER_PROFILE` |
| PATCH | `/api/v1/users/:id` | Users | Update user | `EDIT_USER_PROFILE` |
| POST | `/api/v1/users/:id/roles` | Users | Replace roles | `MANAGE_INTERNAL_ROLES` |
| DELETE | `/api/v1/users/:id/roles/:role` | Users | Revoke role | `MANAGE_INTERNAL_ROLES` |
| GET | `/api/v1/users/:id/permissions` | Users | Permission overrides | `EDIT_USER_PROFILE` or `ROLE_PERMISSION_MANAGEMENT` |
| PUT | `/api/v1/users/:id/permissions` | Users | Update overrides | `ROLE_PERMISSION_MANAGEMENT` |

## Customers

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| PATCH | `/api/v1/customers/:id/assign-rm` | Customers | Assign RM | `ASSIGN_RM_TO_CLIENT` |
| POST | `/api/v1/customers/invite` | Customers | Invite customer | `INVITE_CUSTOMER` |

## RBAC

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| GET | `/api/v1/rbac/matrix` | RBAC | Get matrix | `ROLE_PERMISSION_MANAGEMENT` |
| PUT | `/api/v1/rbac/matrix` | RBAC | Update matrix | `ROLE_PERMISSION_MANAGEMENT` |

## Me — profile

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| POST | `/api/v1/me/verify-mobile/send-otp` | Profile | Send mobile verify OTP | requireCustomer |
| POST | `/api/v1/me/verify-mobile/resend-otp` | Profile | Resend mobile verify OTP | requireCustomer |
| POST | `/api/v1/me/verify-mobile/verify` | Profile | Verify mobile OTP | requireCustomer |
| GET | `/api/v1/me/profile` | Profile | Get profile | requireVerifiedMobileCustomer |
| PATCH | `/api/v1/me/profile` | Profile | Update profile | requireVerifiedMobileCustomer |
| GET | `/api/v1/me/profile/photo` | Profile | Get photo | requireVerifiedMobileCustomer |
| POST | `/api/v1/me/profile/photo` | Profile | Upload photo | requireVerifiedMobileCustomer |
| DELETE | `/api/v1/me/profile/photo` | Profile | Delete photo | requireVerifiedMobileCustomer |

## Me — KYC (customer)

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| GET | `/api/v1/me/kyc` | KYC | KYC state | requireVerifiedMobileCustomer |
| POST | `/api/v1/me/kyc/pan/verify` | KYC | Verify PAN | requireVerifiedMobileCustomer |
| POST | `/api/v1/me/kyc/aadhaar/init` | KYC | Digilocker init | requireVerifiedMobileCustomer |
| POST | `/api/v1/me/kyc/aadhaar/complete` | KYC | Complete Aadhaar | requireVerifiedMobileCustomer |
| POST | `/api/v1/me/kyc/aadhaar/dev-skip` | KYC | Dev skip Aadhaar | requireVerifiedMobileCustomer |
| POST | `/api/v1/me/kyc/bank/verify` | KYC | Bank verify | requireVerifiedMobileCustomer |
| GET | `/api/v1/me/kyc/bank/poll` | KYC | Poll bank status | requireVerifiedMobileCustomer |
| POST | `/api/v1/me/kyc/demat` | KYC | Submit demat | requireVerifiedMobileCustomer |
| DELETE | `/api/v1/me/kyc/demat/:depository` | KYC | Remove demat | requireVerifiedMobileCustomer |
| POST | `/api/v1/me/kyc/submit` | KYC | Submit KYC for review | requireVerifiedMobileCustomer |

## Me — portfolio / sell-requests / reports / WS

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| GET | `/api/v1/me/portfolio` | Portfolio | Portfolio | requireVerifiedMobileCustomer |
| POST | `/api/v1/me/sell-requests` | SellRequests | Create sell request | requireVerifiedMobileCustomer |
| GET | `/api/v1/me/sell-requests` | SellRequests | List my sell requests | requireVerifiedMobileCustomer |
| PATCH | `/api/v1/me/sell-requests/:id` | SellRequests | Update my sell request | requireVerifiedMobileCustomer |
| GET | `/api/v1/me/reports` | Reports | List reports | requireVerifiedMobileCustomer |
| GET | `/api/v1/me/reports/:id/download` | Reports | Download report PDF | requireVerifiedMobileCustomer |
| GET | `/api/v1/me/ws-token` | Notifications | Customer WS token | requireVerifiedMobileCustomer |

## Me — notifications

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| GET | `/api/v1/me/notifications/` | Notifications | List | requireVerifiedMobileCustomer |
| GET | `/api/v1/me/notifications/unread-count` | Notifications | Unread count | requireVerifiedMobileCustomer |
| PATCH | `/api/v1/me/notifications/read-all` | Notifications | Mark all read | requireVerifiedMobileCustomer |
| PATCH | `/api/v1/me/notifications/:id/read` | Notifications | Mark one read | requireVerifiedMobileCustomer |

## Me — support

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| GET | `/api/v1/me/support/conversation` | Support | Get conversation | requireCustomer |
| GET | `/api/v1/me/support/messages` | Support | List messages | requireCustomer |
| POST | `/api/v1/me/support/messages` | Support | Send message | requireCustomer |
| PATCH | `/api/v1/me/support/read` | Support | Mark read | requireCustomer |
| GET | `/api/v1/me/support/unread-count` | Support | Unread count | requireCustomer |
| GET | `/api/v1/me/support/presence` | Support | Staff online | requireCustomer |
| DELETE | `/api/v1/me/support/notifications/:id` | Support | Dismiss support notif | requireCustomer |

## KYC (staff + webhooks)

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| GET | `/api/v1/kyc/callbacks/digilocker` | KYC | Digilocker OAuth callback | public |
| POST | `/api/v1/kyc/webhooks/cashfree-bank` | KYC | Bank webhook | Cashfree webhook |
| GET | `/api/v1/kyc/documents/:documentId/download` | KYC | Download document | (route-specific) |
| GET | `/api/v1/kyc/summaries` | KYC | KYC summaries | `VIEW_KYC_PROFILE` |
| GET | `/api/v1/kyc/queue` | KYC | KYC queue | `APPROVE_REJECT_KYC_PROFILE` |
| GET | `/api/v1/kyc/:userId` | KYC | Staff KYC detail | `VIEW_KYC_PROFILE` |
| POST | `/api/v1/kyc/:userId/approve` | KYC | Approve | `APPROVE_REJECT_KYC_PROFILE` |
| POST | `/api/v1/kyc/:userId/reject` | KYC | Reject | `APPROVE_REJECT_KYC_PROFILE` |
| POST | `/api/v1/kyc/:userId/send-back` | KYC | Send back | `APPROVE_REJECT_KYC_PROFILE` |
| POST | `/api/v1/kyc/:userId/verify-demat` | KYC | Verify demat | `MANAGE_KYC_DOCUMENTS` |
| POST | `/api/v1/kyc/:userId/demat` | KYC | Staff demat submit | `MANAGE_KYC_DOCUMENTS` |

## Companies

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| GET | `/api/v1/companies/` | Companies | List | optionalAuth |
| POST | `/api/v1/companies/` | Companies | Create | `CREATE_COMPANY` |
| GET | `/api/v1/companies/:id` | Companies | Detail | `VIEW_COMPANY` |
| PATCH | `/api/v1/companies/:id` | Companies | Update | `EDIT_COMPANY` |
| POST | `/api/v1/companies/logo` | Companies | Upload logo | `EDIT_COMPANY` |
| DELETE | `/api/v1/companies/logo` | Companies | Delete logo file | `EDIT_COMPANY` |
| GET | `/api/v1/companies/logo/file` | Companies | Serve logo | public |
| POST | `/api/v1/companies/:id/financials` | Companies | Add financial | `EDIT_COMPANY` |
| PATCH | `/api/v1/companies/:id/financials/:financialId` | Companies | Update financial | `EDIT_COMPANY` |
| DELETE | `/api/v1/companies/:id/financials/:financialId` | Companies | Delete financial | `EDIT_COMPANY` |
| POST | `/api/v1/companies/:id/news` | Companies | Add news | `EDIT_COMPANY` |
| PATCH | `/api/v1/companies/:id/news/:newsId` | Companies | Update news | `EDIT_COMPANY` |
| DELETE | `/api/v1/companies/:id/news/:newsId` | Companies | Delete news | `EDIT_COMPANY` |

## Inventory stock

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| GET | `/api/v1/inventory/stock/` | Inventory | List stock | `VIEW_INVENTORY` |
| GET | `/api/v1/inventory/stock/:companyId` | Inventory | Stock by company | `VIEW_INVENTORY` |
| PATCH | `/api/v1/inventory/stock/:companyId` | Inventory | Update buckets/price | `MANAGE_INVENTORY` or `EDIT_INVENTORY_PRICE` |
| POST | `/api/v1/inventory/stock/:companyId/adjustments` | Inventory | Manual adjustment | `MANAGE_INVENTORY` |
| GET | `/api/v1/inventory/stock/:companyId/movements` | Inventory | Movement history | `VIEW_INVENTORY` |

## Deals

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| GET | `/api/v1/deals/` | Deals | List | optionalAuth |
| GET | `/api/v1/deals/:id` | Deals | Detail | optionalAuth |
| POST | `/api/v1/deals/` | Deals | Create | `CREATE_DEAL` |
| PATCH | `/api/v1/deals/:id` | Deals | Update (+ price history snapshot) | `EDIT_DEAL` |
| POST | `/api/v1/deals/:id/approve` | Deals | Approve | `APPROVE_REJECT_DEAL` |
| POST | `/api/v1/deals/:id/reject` | Deals | Reject | `APPROVE_REJECT_DEAL` |
| POST | `/api/v1/deals/:id/publish` | Deals | Publish | `PUBLISH_UNPUBLISH_DEAL` |
| POST | `/api/v1/deals/:id/unpublish` | Deals | Unpublish | `PUBLISH_UNPUBLISH_DEAL` |
| POST | `/api/v1/deals/:id/send-to-client` | Deals | Email negotiated deal | `SEND_DEAL_TO_CLIENT` |

## Orders

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| POST | `/api/v1/orders/portal` | Orders | Create portal order | requireVerifiedMobileCustomer |
| POST | `/api/v1/orders/firm-buy` | Orders | Staff firm buy (customer sells) | `CREATE_SELL_TRANSACTION` |
| GET | `/api/v1/orders/` | Orders | List | requireAuth |
| GET | `/api/v1/orders/:id` | Orders | Detail | requireAuth |
| PATCH | `/api/v1/orders/:id/payment-status` | Orders | Payment status | payment status perms |
| PATCH | `/api/v1/orders/:id/execution-status` | Orders | Execution status | purchase execution perms |
| PATCH | `/api/v1/orders/:id/share-status` | Orders | Share transfer status | share settlement perms |
| GET | `/api/v1/orders/:id/dealsheet` | Orders | Deal sheet PDF | requireAuth |
| GET | `/api/v1/orders/:id/receipt` | Orders | Receipt PDF | requireAuth |
| GET | `/api/v1/orders/:id/documents/:type/download` | Orders | Download document | requireAuth |

## Payments

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| POST | `/api/v1/payments/cashfree/create` | Payments | Create payment session | requireVerifiedMobileCustomer |
| POST | `/api/v1/payments/cashfree/verify` | Payments | Verify payment | requireVerifiedMobileCustomer |
| POST | `/api/v1/payments/webhooks/cashfree` | Payments | Payment webhook | Cashfree webhook |

## Sell-requests (staff)

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| GET | `/api/v1/sell-requests/` | SellRequests | Queue | `VIEW_SELL_REQUEST` |
| GET | `/api/v1/sell-requests/:id` | SellRequests | Detail | `VIEW_SELL_REQUEST` |
| PATCH | `/api/v1/sell-requests/:id` | SellRequests | Update status | `CHANGE_SELL_REQUEST_STATUS` |
| POST | `/api/v1/sell-requests/:id/create-order` | SellRequests | Create order from request | `CREATE_SELL_TRANSACTION` |
| POST | `/api/v1/sell-requests/:id/create-company` | SellRequests | Create company from request | `CREATE_COMPANY` |

## Support (staff)

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| GET | `/api/v1/support/conversations` | Support | List conversations | `SEND_RECEIVE_MESSAGES` |
| GET | `/api/v1/support/conversations/:id/messages` | Support | List messages | `SEND_RECEIVE_MESSAGES` |
| POST | `/api/v1/support/conversations/:id/messages` | Support | Send message | `SEND_RECEIVE_MESSAGES` |
| PATCH | `/api/v1/support/conversations/:id/read` | Support | Mark read | `SEND_RECEIVE_MESSAGES` |
| GET | `/api/v1/support/conversations/:id/presence` | Support | Customer presence | `SEND_RECEIVE_MESSAGES` |
| GET | `/api/v1/support/unread-count` | Support | Unread count | `SEND_RECEIVE_MESSAGES` |
| GET | `/api/v1/support/notifications` | Support | Support notifications | `SEND_RECEIVE_MESSAGES` |
| GET | `/api/v1/support/ws-token` | Support | Staff support WS token | `SEND_RECEIVE_MESSAGES` |

## Staff notifications

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| GET | `/api/v1/internal/notifications/` | Staff Notifications | List | requireInternalStaff |
| GET | `/api/v1/internal/notifications/unread-count` | Staff Notifications | Unread | requireInternalStaff |
| PATCH | `/api/v1/internal/notifications/read-all` | Staff Notifications | Mark all read | requireInternalStaff |
| PATCH | `/api/v1/internal/notifications/:id/read` | Staff Notifications | Mark one read | requireInternalStaff |
| DELETE | `/api/v1/internal/notifications/support/:id` | Staff Notifications | Dismiss support notif | requireInternalStaff |
| GET | `/api/v1/internal/notifications/ws-token` | Staff Notifications | Staff WS token | requireInternalStaff |

## Dev (non-production only)

| Method | Path | Tag | Summary | Auth |
|--------|------|-----|---------|------|
| GET | `/api/v1/dev/ping-ops` | Dev | Ops ping | `APPROVE_REJECT_ORDER` |
