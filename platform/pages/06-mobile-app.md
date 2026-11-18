# 7. Page-Wise — Mobile App

App: `mobile-app` (Expo, customer). Tabs: Home, Deals, Portfolio, Activity, Chat. Profile and Notifications are routed (not always on tab bar).

## Auth

| Screen | Purpose | APIs |
|--------|---------|------|
| `(auth)/login` | Email or OTP login; Google SSO entry | `login`, mobile OTP, `getGoogleSsoUrl` |
| `(auth)/register` | Registration | register flow |
| `(auth)/forgot-password` | Reset request | `forgotPassword` |
| `reset-password` | Reset with token | `resetPassword` |
| `complete-invite` | Invite activation | invite flow |
| `sso-callback` | Google code exchange | `exchangeGoogleSsoCode` |
| `verify-mobile` | Mobile verification gate | account mobile OTP |

## Tabs and screens

### Home

- Snapshot of deals, orders, portfolio, sell requests.
- APIs: `listDeals`, `listOrders`, `getPortfolio`, `listMySellRequests`.
- Nested order detail: `getOrder`, Cashfree create, authenticated PDF download.

### Deals

- List + `[dealId]` detail + checkout.
- APIs: `listDeals`, `getDeal`, `createPortalOrder`, `createCashfreePayment`.

### Portfolio

- Holdings: `getPortfolio`.

### Activity

- Orders and sell requests; sell-request create form uses `getPortfolio`, `createSellRequest`.
- Order detail same as home.

### Chat

- Support conversation: list/send/read/presence + WS token.

### Notifications

- List/mark read/dismiss support notification; unread count.

### Profile

- Profile update + photo; KYC screen; update-bank; reports list/download.
- APIs: profile + full KYC suite + `listReports` / PDF helper.

## Other

| Screen | APIs |
|--------|------|
| Search | deals, orders, portfolio, sell requests |
| `payment-status` | `getOrder`, `verifyCashfreePayment` |
| `aadhaar-status` | `completeAadhaar` |
| App config | `fetchMobileAppConfig` (force update) |

**Note:** `updateMySellRequestStatus` — No UI caller found on mobile (available on customer web).
