# Page permissions → APIs

**Rule:** Grant a **page** permission (the code that shows a navbar item) → the user may open that page and call **only the APIs listed for that page**. Shared APIs accept **any** listing page’s permission (`requireAnyPermission` union).

**System → Permissions matrix**

| Control | What it does |
|---------|----------------|
| Page row checkbox | Page access (nav + route), e.g. Sales Sub-brokers → `VIEW_BROKER_PROFILE`, Admin → `VIEW_ORG_BROKER_PROFILE` |
| **Features** button | Editable popup of **in-page actions** (label + code + role checkboxes), e.g. Add sub-broker → `MANAGE_BROKER_PROFILE` |
| **APIs** button | Read-only list of endpoints that page uses |
| **Other** | Leftover codes **not** used as a page gate and **not** listed in any page’s `features[]` or `OTHER_FEATURE_GROUPS` |
| **Other → feature groups** | Matrix-only rows (e.g. **Notification**) with a **Features** button; no page gate / nav |

**Rule:** If a code is in a page Features popup **or** an `OTHER_FEATURE_GROUPS` Features popup, it must **not** appear as a flat Other row.

**Code source of truth**

| Layer | Path |
|-------|------|
| Frontend registry | `frontend-platform/apps/internal-web/src/config/page-permissions.ts` (`permission`, `apis[]`, `features[]`, `OTHER_FEATURE_GROUPS`) |
| Nav (icons + visibility) | `frontend-platform/apps/internal-web/src/config/nav.ts` (driven by registry) |
| Route guards | `frontend-platform/apps/internal-web/src/config/internalRouteAccess.ts` |
| Backend allowlist (order APIs) | `backend-platform/src/Domain/rbac/page-api-allowlist.ts` |
| Matrix Features / APIs popups | `/system/permissions` |

Paths below are `/api/v1`-stripped (`METHOD /path`). In-page actions are listed under each page’s **Features** in the matrix (registry `features[]`).

---

## Platform

### Dashboard
- **Path:** `/dashboard`
- **To open:** `VIEW_DASHBOARD` (seeded for Operation, Account Manager, Maintainer, Admin, Superadmin — **not** RM by default)
- **APIs:** `GET /internal/dashboard/stats`, `GET /orders`, `GET /orders/:id`, order status patches, receipt/dealsheet downloads

### Customers
- **Path:** `/customers`
- **To open:** `VIEW_USERS`
- **APIs:** users/KYC/customers notes & invite, list visibility, assign RM, linked portal orders

### Client links
- **Path:** `/customers/links`
- **To open:** `LINK_CLIENT_PROFILE`
- **APIs:** client-links CRUD/preview/hints/identity-search, `GET /trading-clients`, `GET /kyc/:userId`

---

## Leads

### All leads
- **Path:** `/sales/leads`
- **To open:** `ASSIGN_LEAD` (+ Admin/Maintainer/Superadmin desk roles)
- **APIs:** `GET|POST /leads`, summary, assignable RMs, assign/messages/delete/update

### Assigned leads
- **Path:** `/sales/assigned-leads`
- **To open:** `VIEW_LEADS`
- **APIs:** `GET /leads`, my-summary, detail, messages/update/delete

---

## Sales

### Clients & dealers
- **Path:** `/sales/trading-clients`
- **To open:** `VIEW_TRADING_CLIENT` (+ RM / Admin / Superadmin)
- **APIs:** trading-clients CRUD/docs/claim/verify-pan, `GET /users`, `GET /desk-orders`, `GET /desk-orders/:id`

### Desk orders
- **Path:** `/sales/orders`
- **To open:** `VIEW_DESK_ORDER`
- **APIs:** desk-orders list/detail/create/edit/cancel/approve/reject, commission/payees/splits, payment-link, lines read, dealsheet, companies/clients/brokers helpers  
- **Action codes still required for mutations:** `CREATE_DESK_ORDER`, `EDIT_DESK_ORDER`, `CANCEL_DESK_ORDER`, `APPROVE_REJECT_ORDER`, `SEND_ASSISTED_PAYMENT_LINK`, `GENERATE_DEALSHEET`, working-directory / payment-line managers as applicable

### Sub-brokers (Sales)
- **Path:** `/sales/sub-brokers`
- **To open:** `VIEW_BROKER_PROFILE`
- **Features:** Add / manage sub-broker → `MANAGE_BROKER_PROFILE`; Assign RM → `ASSIGN_RM_TO_BROKER`
- **APIs:** brokers CRUD/banks/access, `GET /desk-orders`, `GET /desk-orders/:id`

### Customer sell requests
- **Path:** `/sales/sell-requests`
- **To open:** `VIEW_SELL_REQUEST`
- **APIs:** sell-requests list/detail/status/create-order/create-company, `GET /orders/:id`

---

## Operations

### Ops orders
- **Path:** `/operations/ops-orders` (children: Portal, Buy, Sell, Approved, Cancelled)
- **To open:** `VIEW_OPS_ORDER` (+ org-wide desk roles); Portal child also uses `VIEW_PORTAL_ORDER`
- **APIs:** desk-orders org list/detail, ops-amount-summary, status-counts, filter options, working transitions / settlement & payment mutations (action codes), lines read, dealsheet, trading-client helpers

### Working directory
- **Path:** `/operations/working-directory`
- **To open:** `MANAGE_WORKING_DIRECTORY`
- **APIs:** same ops desk reads + bulk/single working transitions (gated by this permission)

### Sub-broker orders
- **Path:** `/operations/sub-broker` (Verified / Working / Done)
- **To open:** `VIEW_SUB_BROKER_ORDER` (+ org-wide desk roles)
- **APIs:**
  - `GET /desk-orders`, `GET /desk-orders/:id`
  - `GET /desk-orders/sub-broker-summary`, `GET /desk-orders/sub-broker-amount-summary`
  - `GET /desk-orders/entered-by-options`, `GET /desk-orders/company-options`
  - `PATCH /desk-orders/:id/broker-status`
  - `PATCH /desk-orders/:id/broker-payees`
  - `PUT /desk-orders/:id/broker-commission-splits`
  - `GET /desk-orders/:id/settlement-lines`, `GET /desk-orders/:id/payment-lines`
  - dealsheet (needs `GENERATE_DEALSHEET`)
  - `GET /brokers/:id`
  - trading-client helpers (needs `VIEW_TRADING_CLIENT` where enforced)

---

## Inventory

### Companies
- **Path:** `/inventory/companies`
- **To open:** `VIEW_COMPANY`
- **APIs:** companies CRUD, website sync/import, logo

### Stock
- **Path:** `/inventory/stock`
- **To open:** `VIEW_INVENTORY`
- **APIs:** stock list/get/patch/adjust/movements

### Deals
- **Path:** `/inventory/deals`
- **To open:** `VIEW_DEAL`
- **APIs:** deals CRUD + approve/reject/publish/unpublish/send-to-client, companies/users/stock helpers

---

## Administration

### Staff Users
- **Path:** `/admin/users`
- **To open:** `VIEW_STAFF_USERS`
- **Features:** Create/edit staff, Admin role, internal roles, **Manage user permission** → `MANAGE_USER_SPECIFIC_PERMISSIONS`
- **APIs:** users CRUD, reset-password, roles, permission overrides, `GET /rbac/matrix`

### Sub-brokers (Admin)
- **Path:** `/admin/brokers`
- **To open:** `VIEW_ORG_BROKER_PROFILE` (+ org-wide broker directory roles)
- **APIs:** same as Sales Sub-brokers (`scope=org`; requires `VIEW_ORG_BROKER_PROFILE`)

### Clients & dealers (Admin)
- **Path:** `/admin/trading-clients`
- **To open:** `VIEW_ORG_TRADING_CLIENT` (+ org-wide client directory roles)
- **APIs:** same as Sales Clients & dealers (`scope=org`; requires `VIEW_ORG_TRADING_CLIENT`)

### Permissions
- **Path:** `/system/permissions`
- **To open:** `ROLE_PERMISSION_MANAGEMENT`
- **APIs:** `GET /rbac/matrix`, `PUT /rbac/matrix`

### Audit trail
- **Path:** `/system/audit`
- **To open:** `AUDIT_TRAIL`
- **APIs:** `GET /system/audit`

---

## Support

### Support
- **Path:** `/support`
- **To open:** `SEND_RECEIVE_MESSAGES`
- **APIs:** support conversations/messages/read/presence, `GET /support/ws-token`

---

## Related

- [Roles and permissions](./01-roles-permissions.md)
- [API usage map](./api/04-api-usage-map.md)
