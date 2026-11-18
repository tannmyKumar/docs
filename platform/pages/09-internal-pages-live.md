# 10. Internal Web — Live Pages

## `/dashboard`

- **Permission:** authenticated staff.
- **Purpose:** Counts/widgets for companies, stock, deals, KYC, orders, sell requests, users (each widget gated by `can(...)`).
- **APIs:** `listCompanies`, `listStock`, `listDeals`, `listKycSummaries`, `listOrders`, `listSellRequests`, `listUsers`.

## `/customers` and `/customers/[userId]`

- **Nav permission:** `VIEW_USERS`.
- **Purpose:** Customer directory; invite; open detail for profile, KYC review, orders, portfolio, photo.
- **APIs:** `listUsers`, `listKycSummaries`, `inviteCustomer`; detail: `getUser`, `updateUser`, KYC staff APIs, `listOrders`, `getUserPortfolio`, `getUserPhotoUrl`.
- **In-page gates:** `APPROVE_REJECT_KYC_PROFILE`, `MANAGE_KYC_DOCUMENTS`, etc.

## `/customers/links`

- **Nav permission:** `LINK_CLIENT_PROFILE`.
- **Purpose:** Review ACTIVE portal↔desk ClientLinks (paired name/email/PAN/mobile); **Unlink** wrong auto-links. Desk clients are created or PAN-matched on KYC approve (no registration stubs). Manual Link wizard deferred.
- **APIs:** `listClientLinks`, `revokeClientLink` (`PATCH /client-links/:id/revoke`).

## `/inventory/companies` (+ `/new`, `/[companyId]`)

- **Nav:** `VIEW_COMPANY`.
- **Purpose:** Company catalog CRUD; financials; news; logo.
- **APIs:** `listCompanies`, `createCompany`, `getCompany`, `updateCompany`, financials/news CRUD, logo upload/delete.
- **Create gate:** `CREATE_COMPANY`; edit: `EDIT_COMPANY`.

## `/inventory/stock` (+ `/[companyId]`)

- **Nav:** `VIEW_INVENTORY`.
- **Purpose:** Stock buckets, price, adjustments, movement history.
- **APIs:** `listStock`, `getStock`, `patchStock`, `adjustStock`, `listStockMovements`.
- **Gates:** `MANAGE_INVENTORY`, `EDIT_INVENTORY_PRICE`.

## `/inventory/deals` (+ expired, new, negotiated)

- **Nav:** `VIEW_DEAL`.
- **Purpose:** Deal queue; create direct/negotiated; approve/reject; publish/unpublish; edit (with price-history audit); send to client.
- **APIs:** `listDeals`, `getDeal`, `createDeal`, `updateDeal`, `approveDeal`, `rejectDeal`, `publishDeal`, `unpublishDeal`, `sendDealToClient`, `getStock`, `listUsers`, `listCompanies`.
- **Gates:** `CREATE_DEAL`, `EDIT_DEAL`, `APPROVE_REJECT_DEAL`, `PUBLISH_UNPUBLISH_DEAL`, `SEND_DEAL_TO_CLIENT`.

## `/operations/ops-orders/portal`

- **Nav:** Operations → Ops orders → Portal (`VIEW_PORTAL_ORDER`).
- **Purpose:** Customer portal checkout orders; payment/execution/share status; release to ops; PDF dealsheet/receipt. Legacy `/admin/orders` redirects here.
- **APIs:** `listOrders`, `getOrder`, `updateOrderPaymentStatus`, `updateOrderExecutionStatus`, `updateOrderShareStatus`, downloads.
- **Gates:** `CHANGE_ORDER_PAYMENT_STATUS`, `MANAGE_WORKING_DIRECTORY`, `MANAGE_SHARE_SETTLEMENT`.

## `/sales/sell-requests`

- **Nav:** Sales → Customer sell requests; `VIEW_SELL_REQUEST`. Legacy `/admin/sell-requests` redirects here.
- **Purpose:** Customer sell-request queue; status changes; create order; create company from request.
- **APIs:** `listSellRequests`, `getSellRequest`, `updateSellRequestStatus`, `createOrderFromSellRequest`, `createCompanyFromSellRequest`.
- **Gates:** `CHANGE_SELL_REQUEST_STATUS`, `CREATE_SELL_TRANSACTION`, `CREATE_COMPANY`.

## `/admin/users` and `/admin/users/[userId]`

- **Nav:** `VIEW_USERS`.
- **Purpose:** Staff directory; create staff; roles; permission overrides.
- **APIs:** `listUsers`, `createUser`, `getUser`, `updateUser`, `replaceUserRoles`, `getUserPermissions`, `updateUserPermissions`, `getRbacMatrix`.
- **Gates:** `CREATE_USER_PROFILE`, `MANAGE_INTERNAL_ROLES`, `ROLE_PERMISSION_MANAGEMENT`, `CREATE_ADMIN_USER`.

## `/system/permissions`

- **Nav:** `ROLE_PERMISSION_MANAGEMENT`.
- **Purpose:** Edit role × permission matrix.
- **APIs:** `getRbacMatrix`, `updateRbacMatrix`.

## `/support`

- **Nav:** `SEND_RECEIVE_MESSAGES`.
- **Purpose:** Staff support inbox (shell-driven realtime chat).
- **APIs:** support conversation list/messages/send/read/presence + WS token.
