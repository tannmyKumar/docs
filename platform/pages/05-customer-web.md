# 6. Page-Wise — Customer Web

App: `frontend-platform/apps/customer-web`  
Nav: Dashboard, Deals, Portfolio, Orders, Sell Requests, Reports, Profile, Chat Support.

## Auth flows

### `/login`

- **Purpose:** Sign in (email/password or mobile OTP).
- **APIs:** `login`, `sendMobileLoginOtp`, `verifyMobileLoginOtp`.
- **Notes:** After success, full page navigation to dashboard/callback. Guest gate restores session silently if cookies exist.

### `/register`

- **Purpose:** Multi-step customer registration.
- **APIs:** `registerStart`, email/mobile OTP verify/resend, `completeRegister`.

### `/forgot-password` / `/reset-password`

- **APIs:** `forgotPassword`, `resetPassword`.

### `/complete-invite`

- **Purpose:** Activate invited customer account.
- **APIs:** `inviteStart`, `inviteSendMobileOtp`, `inviteVerifyMobile`, `inviteComplete`.

### `/verify-mobile`

- **Purpose:** Force mobile verification for customers with unverified mobile.
- **APIs:** send/resend/verify account mobile OTP; `logout`.

## App pages

### `/dashboard`

- **Purpose:** Home overview — portfolio snapshot, trending deals, recent orders, pending sell requests.
- **APIs:** `getPortfolio`, `listDeals`, `listOrders`, `listMySellRequests`, profile via auth.

### `/deals` and `/deals/[dealId]`

- **Purpose:** Browse published deals; open detail; start checkout.
- **APIs:** `listDeals`, `getDeal`; checkout: `createPortalOrder`, `createCashfreePayment`.

### `/portfolio`

- **Purpose:** Holdings view.
- **APIs:** `getPortfolio`.

### `/orders`

- **Purpose:** Order list + detail sheet (dealsheet/receipt download).
- **APIs:** `listOrders`, `getOrder`, `downloadOrderDealsheet`, `downloadOrderReceipt`.

### `/sell-requests`

- **Purpose:** Create/list sell-to-others requests; update status where allowed.
- **APIs:** `listMySellRequests`, `createSellRequest`, `updateMySellRequestStatus`, `getKyc`, `getPortfolio`.

### `/reports`

- **Purpose:** Quarterly report list and PDF download.
- **APIs:** `listReports`, `downloadReport`.

### `/profile` and `/profile/kyc`

- **Purpose:** Profile photo/name; full KYC wizard (PAN, Aadhaar, bank, demat, submit).
- **APIs:** profile CRUD/photo; KYC suite (`getKyc`, `verifyPan`, Aadhaar, bank, demat, `submitKyc`).

### `/support`

- **Purpose:** Opens support chat (shell providers).
- **APIs:** `/me/support/*` via support shell.

### `/payment-status` / `/aadhaar-status`

- **Purpose:** Return URLs after Cashfree / Digilocker.
- **APIs:** `getOrder`, `verifyCashfreePayment`; `completeAadhaar`.

### `/help`

- Static help content — No domain API caller.

## Shell (all authenticated pages)

- Notifications: list / mark read / dismiss support notification / WS token.
- Search: `listDeals`, `listOrders`.
- Logout: `logout`.
