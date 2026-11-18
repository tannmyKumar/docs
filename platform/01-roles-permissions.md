# Roles and Permissions

Staff access in internal-web is **permission-driven**. A user gets permissions from their **internal role(s)**, then optional **per-user overrides**. APIs enforce permissions via `requirePermission` / `requireAnyPermission`. The sidebar and route guards use the same effective list.

**Source of truth (code + seed):**

| Layer | Path |
|-------|------|
| Permission catalog (seed) | `backend-platform/prisma/seed/permissions.ts` |
| Role → permission defaults | `backend-platform/prisma/seed/roles.ts` |
| Seed runner | `backend-platform/prisma/seed/index.ts` |
| Frontend permission codes | `frontend-platform/packages/permissions` |
| Effective permissions | `backend-platform/src/Domain/rbac/service/permissions.service.ts` |
| Page → API registry | `frontend-platform/apps/internal-web/src/config/page-permissions.ts` |
| Nav gates | `frontend-platform/apps/internal-web/src/config/nav.ts` (from registry) |
| Route access | `frontend-platform/apps/internal-web/src/config/internalRouteAccess.ts` |
| Backend page API allowlist | `backend-platform/src/Domain/rbac/page-api-allowlist.ts` |
| Admin UI | `/system/permissions` (`ROLE_PERMISSION_MANAGEMENT`) — **APIs** button per page permission |

---

## 1. Data model

```
Permission (code, name, module)
    ↑
RolePermission (role + permissionCode)     ← seeded defaults per InternalRole
    ↑
UserInternalRole (userId + role)           ← one or more roles per staff user
    ↑
UserPermissionOverride (userId + code + granted)  ← grant or revoke on top of roles
```

**Internal roles (enum):** `RM` · `OPERATION` · `ACCOUNT_MANAGER` · `MAINTAINER` · `ADMIN` · `SUPERADMIN`

**Public roles (portal):** `CUSTOMER` (customer web/mobile); `BROKER` (planned).

---

## 2. How effective permissions are computed

1. Load the user’s `UserInternalRole` rows.
2. If any role is **SUPERADMIN** → return **all** codes in `Permission`.
3. Else load all `RolePermission` rows for those roles and **union** the codes.
4. Apply `UserPermissionOverride`:
   - `granted: true` → add code
   - `granted: false` → remove code

Login/session exposes that list to the client (`usePermissions().can(...)`).

---

## 3. Seeding permissions

### Command

```bash
cd backend-platform
pnpm run db:seed
```

Requires `SUPERADMIN_EMAIL` and `SUPERADMIN_PASSWORD` in `.env`.

### What seed writes

| Step | Table(s) | Behavior |
|------|----------|----------|
| Permissions | `Permission` | Upsert every catalog code (create or update name/module) |
| Role permissions | `RolePermission` | Upsert each seeded `(role, code)` — **additive only** |
| Superadmin | `User`, `StaffProfile`, `UserInternalRole` | Upsert SUPERADMIN user from env |
| Website ingest actor | `User` (+ staff profile) | Inactive system user for lead ingest |
| Desk staff (optional) | Users + roles | Only if `SEED_DESK_STAFF_USERS=true` |

### Important: seed does not remove

`seedRoles` **never deletes** `RolePermission` rows. If ACCOUNT_MANAGER once had `VIEW_DESK_ORDER` in the DB and you remove it from `roles.ts`, re-seeding **will not** take it away. Clean extras via the Permissions UI or SQL.

### Not part of main seed

`pnpm run db:seed-test-data` creates demo customers/orders/companies. It is separate from RBAC seeding.

---

## 4. Public vs internal

| Role | Context | Notes |
|------|---------|--------|
| `CUSTOMER` | Customer web / mobile | Self-serve |
| `BROKER` | Broker portal | Planned (Goal 4) |

Internal staff use the roles below.

---

## 5. Internal roles (seed defaults)

### RM

Client-facing desk: trading clients, desk orders (create/edit/cancel), broker profiles (view/manage), leads (view/edit), deals, sell requests, dealsheet, support, portfolio.

**Does not** get `VIEW_SUB_BROKER_ORDER` or `VIEW_OPS_ORDER` by default (ops queues).

### OPERATION

Ops fulfillment: portal/ops/sub-broker order views, approve/reject orders, working directory, share settlement, purchase status/docs, payment lines (view), dealsheet, support.

**Does not** get `EDIT_DESK_ORDER` or `VIEW_DESK_ORDER` (Sales desk book) by default.

### ACCOUNT_MANAGER

Finance + sub-broker commission queue:

- Payments: view/manage lines, order payment status
- Orders: `VIEW_PORTAL_ORDER`, **`VIEW_SUB_BROKER_ORDER`** (Operations → Sub-broker orders + commission APIs)
- Reference data: clients/company/inventory/deals (view)

**Intentionally not seeded for AM:**

| Permission | Why omitted |
|------------|-------------|
| `VIEW_DESK_ORDER` | Would show Sales → Desk orders |
| `VIEW_BROKER_PROFILE` | Would show Sales → Sub-brokers (Admin uses seeded `VIEW_ORG_BROKER_PROFILE`) |
| `EDIT_DESK_ORDER` | RM payee/amount editing; AM marks lines Done via `VIEW_SUB_BROKER_ORDER` on split APIs |

Sales → Clients & dealers uses `VIEW_TRADING_CLIENT` (+ role `RM` / `ADMIN` / `SUPERADMIN`). Admin → Clients & dealers uses separate `VIEW_ORG_TRADING_CLIENT` (+ org-wide directory roles). AM may keep `VIEW_TRADING_CLIENT` for desk/API helpers without seeing the Sales page.

Sales → Sub-brokers uses `VIEW_BROKER_PROFILE`; Admin → Sub-brokers uses separate `VIEW_ORG_BROKER_PROFILE` (+ org-wide directory roles).

**Broker status:** AM cannot change status while order is **Pending** (backend `ACCOUNTS_PENDING_LOCKED`); Working/Verified/Done transitions follow org-wide rules.

### MAINTAINER

KYC, companies, inventory/pricing, ops order view, purchase execution/docs, dealsheet.

### ADMIN

Union of RM + OPERATION + ACCOUNT_MANAGER + MAINTAINER, plus assign RM, staff profiles, deal publish/approve, ops cancel approved, broker approve, leads admin, audit, staff users list.

### SUPERADMIN

Every permission in the catalog (including `ROLE_PERMISSION_MANAGEMENT`, `MANAGE_INTERNAL_ROLES`, `CREATE_ADMIN_USER`).

---

## 6. Seeded permission lists (exact codes)

### ACCOUNT_MANAGER

`VIEW_DASHBOARD`, `VIEW_TRADING_CLIENT`, `VIEW_ORG_TRADING_CLIENT`, `VIEW_ORG_BROKER_PROFILE`, `VIEW_USERS`, `VIEW_COMPANY`, `VIEW_INVENTORY`, `VIEW_DEAL`, `VIEW_PORTAL_ORDER`, `VIEW_OPS_ORDER`, `VIEW_SUB_BROKER_ORDER`, `VIEW_PAYMENT_LINES`, `MANAGE_PAYMENT_LINES`, `CHANGE_ORDER_PAYMENT_STATUS`, `RECEIVE_ORDER_PAID_NOTIFICATION`

### RM

`VIEW_DASHBOARD`, `VIEW_TRADING_CLIENT`, `CREATE_TRADING_CLIENT`, `EDIT_TRADING_CLIENT`, `VIEW_USERS`, `INVITE_CUSTOMER`, `VIEW_KYC_PROFILE`, `VIEW_COMPANY`, `VIEW_INVENTORY`, `VIEW_DEAL`, `CREATE_DEAL`, `EDIT_DEAL`, `SEND_DEAL_TO_CLIENT`, `VIEW_DESK_ORDER`, `CREATE_DESK_ORDER`, `EDIT_DESK_ORDER`, `CANCEL_DESK_ORDER`, `SEND_ASSISTED_PAYMENT_LINK`, `UPLOAD_DESK_ORDER_PAYMENT_DETAILS`, `GENERATE_DEALSHEET`, `VIEW_SELL_REQUEST`, `CHANGE_SELL_REQUEST_STATUS`, `CREATE_SELL_TRANSACTION`, `SEND_RECEIVE_MESSAGES`, `RECEIVE_NEW_SELL_REQUEST_NOTIFICATION`, `RECEIVE_KYC_SUBMITTED_NOTIFICATION`, `RECEIVE_ORDER_PAID_NOTIFICATION`, `RECEIVE_SUPPORT_NOTIFICATION`, `VIEW_USER_PORTFOLIO`, `VIEW_BROKER_PROFILE`, `MANAGE_BROKER_PROFILE`, `VIEW_LEADS`, `EDIT_LEAD`

### OPERATION

`VIEW_DASHBOARD`, `VIEW_TRADING_CLIENT`, `VIEW_ORG_TRADING_CLIENT`, `VIEW_ORG_BROKER_PROFILE`, `VIEW_USERS`, `VIEW_KYC_PROFILE`, `VIEW_COMPANY`, `VIEW_INVENTORY`, `VIEW_DEAL`, `VIEW_PORTAL_ORDER`, `VIEW_OPS_ORDER`, `VIEW_SUB_BROKER_ORDER`, `APPROVE_REJECT_ORDER`, `MANAGE_WORKING_DIRECTORY`, `OPS_MANAGE_DESK_ORDER_PAYMENT_UTR`, `MANAGE_SHARE_SETTLEMENT`, `CHANGE_ORDER_PAYMENT_STATUS`, `GENERATE_DEALSHEET`, `VIEW_PAYMENT_LINES`, `VIEW_SELL_REQUEST`, `SEND_RECEIVE_MESSAGES`, `RECEIVE_NEW_SELL_REQUEST_NOTIFICATION`, `RECEIVE_KYC_SUBMITTED_NOTIFICATION`, `RECEIVE_ORDER_PAID_NOTIFICATION`, `RECEIVE_SUPPORT_NOTIFICATION`

### MAINTAINER

`VIEW_DASHBOARD`, `VIEW_TRADING_CLIENT`, `VIEW_ORG_TRADING_CLIENT`, `VIEW_ORG_BROKER_PROFILE`, `LINK_CLIENT_PROFILE`, `VIEW_USERS`, `VIEW_KYC_PROFILE`, `MANAGE_KYC_DOCUMENTS`, `APPROVE_REJECT_KYC_PROFILE`, `VIEW_COMPANY`, `CREATE_COMPANY`, `EDIT_COMPANY`, `VIEW_INVENTORY`, `MANAGE_INVENTORY`, `EDIT_INVENTORY_PRICE`, `VIEW_DEAL`, `VIEW_PORTAL_ORDER`, `VIEW_OPS_ORDER`, `GENERATE_DEALSHEET`, `SEND_RECEIVE_MESSAGES`, `RECEIVE_KYC_SUBMITTED_NOTIFICATION`, `RECEIVE_ORDER_PAID_NOTIFICATION`, `RECEIVE_SUPPORT_NOTIFICATION`

### ADMIN extras (on top of the four role unions)

`ASSIGN_RM_TO_CLIENT`, `ASSIGN_RM_TO_BROKER`, `CREATE_USER_PROFILE`, `EDIT_USER_PROFILE`, `MANAGE_USER_SPECIFIC_PERMISSIONS`, `MANAGE_CUSTOMER_NOTES`, `MANAGE_CUSTOMER_LIST_VISIBILITY`, `PUBLISH_UNPUBLISH_DEAL`, `APPROVE_REJECT_DEAL`, `OPS_CANCEL_APPROVED_ORDER`, `CHANGE_SELL_REQUEST_STATUS`, `CREATE_SELL_TRANSACTION`, `VIEW_BROKER_PROFILE`, `APPROVE_BROKER_PROFILE`, `AUDIT_TRAIL`, `VIEW_LEADS`, `CREATE_LEAD`, `EDIT_LEAD`, `ASSIGN_LEAD`, `DELETE_LEAD`, `VIEW_STAFF_USERS`, `RECEIVE_DEAL_PENDING_APPROVAL_NOTIFICATION`, `RECEIVE_SYSTEM_NOTIFICATION`

---

## 7. Permission catalog (by module)

Codes from `permissions.ts` (keep in sync when adding new codes).

### Platform

| Code | Name |
|------|------|
| `VIEW_DASHBOARD` | View Dashboard |

### User / clients

| Code | Name |
|------|------|
| `VIEW_USERS` | View Users |
| `VIEW_STAFF_USERS` | View Staff Users |
| `CREATE_USER_PROFILE` | Create User Profile |
| `EDIT_USER_PROFILE` | Edit User Profile |
| `ASSIGN_RM_TO_CLIENT` | Assign RM to Customer |
| `ASSIGN_RM_TO_BROKER` | Assign RM to Broker |
| `MANAGE_USER_SPECIFIC_PERMISSIONS` | Manage User Specific Permissions (Staff Users → per-user grant/revoke overrides; not the role matrix) |
| `VIEW_TRADING_CLIENT` | View Trading Client |
| `VIEW_ORG_TRADING_CLIENT` | View Org Trading Clients |
| `CREATE_TRADING_CLIENT` | Create Trading Client |
| `EDIT_TRADING_CLIENT` | Edit Trading Client |
| `LINK_CLIENT_PROFILE` | Link Client Profile (Client Links review/unlink; desk clients are created/linked on KYC approve by PAN — not at registration) |
| `VIEW_KYC_PROFILE` | View KYC Profile |
| `MANAGE_KYC_DOCUMENTS` | Manage KYC Documents |
| `APPROVE_REJECT_KYC_PROFILE` | Approve Reject KYC Profile |
| `VIEW_USER_PORTFOLIO` | View User Portfolio |
| `INVITE_CUSTOMER` | Invite Customer |
| `MANAGE_CUSTOMER_NOTES` | Manage Customer Staff Notes |
| `MANAGE_CUSTOMER_LIST_VISIBILITY` | Hide or Show Customers in List |

### Company / inventory / deals

| Code | Name |
|------|------|
| `VIEW_COMPANY` | View Company |
| `CREATE_COMPANY` | Create Company |
| `EDIT_COMPANY` | Edit Company |
| `VIEW_INVENTORY` | View Inventory |
| `MANAGE_INVENTORY` | Manage Inventory |
| `EDIT_INVENTORY_PRICE` | Edit Inventory Price |
| `VIEW_DEAL` | View Deal |
| `CREATE_DEAL` | Create Deal |
| `EDIT_DEAL` | Edit Deal |
| `PUBLISH_UNPUBLISH_DEAL` | Publish Unpublish Deal |
| `APPROVE_REJECT_DEAL` | Approve Reject Deal |
| `SEND_DEAL_TO_CLIENT` | Send Deal to Client |

### Orders

| Code | Name |
|------|------|
| `VIEW_PORTAL_ORDER` | View Portal Orders |
| `VIEW_DESK_ORDER` | View Desk Orders (Sales desk book) |
| `VIEW_OPS_ORDER` | View Ops Orders |
| `VIEW_SUB_BROKER_ORDER` | View Sub-Broker Orders / commission queue |
| `CREATE_DESK_ORDER` | Create Desk Order |
| `EDIT_DESK_ORDER` | Edit Desk Order |
| `CANCEL_DESK_ORDER` | Cancel Desk Order |
| `SEND_ASSISTED_PAYMENT_LINK` | Send Assisted Payment Link |
| `APPROVE_REJECT_ORDER` | Approve Reject Order |
| `MANAGE_WORKING_DIRECTORY` | Manage Working Directory |
| `UPLOAD_DESK_ORDER_PAYMENT_DETAILS` | Upload Desk Order Payment Details (sales) |
| `OPS_MANAGE_DESK_ORDER_PAYMENT_UTR` | Ops Manage Desk Order Payment UTR |
| `MANAGE_SHARE_SETTLEMENT` | Manage Share Settlement |
| `GENERATE_DEALSHEET` | Generate Dealsheet |
| `OPS_CANCEL_APPROVED_ORDER` | Ops Cancel Approved Order |

**Helpers** (`frontend-platform/packages/permissions` / backend order-view helpers):

- `canViewDeskOrders` = `VIEW_DESK_ORDER`
- `canViewOpsOrders` = `VIEW_OPS_ORDER`
- `canViewSubBrokerOrders` = `VIEW_SUB_BROKER_ORDER` **or** `VIEW_OPS_ORDER`
- `canViewPortalOrders` = `VIEW_PORTAL_ORDER`

### Payments

| Code | Name |
|------|------|
| `VIEW_PAYMENT_LINES` | View Payment Lines |
| `MANAGE_PAYMENT_LINES` | Manage Payment Lines |
| `CHANGE_ORDER_PAYMENT_STATUS` | Change Order Payment Status |

### Purchase / sell transactions & sell requests

| Code | Name |
|------|------|
| `CREATE_SELL_TRANSACTION` | Create Sell Transaction |
| `VIEW_SELL_REQUEST` | View Sell Request |
| `CHANGE_SELL_REQUEST_STATUS` | Change Sell Request Status |

### Broker

| Code | Name |
|------|------|
| `VIEW_BROKER_PROFILE` | View Broker Profile (Sales directory) |
| `VIEW_ORG_BROKER_PROFILE` | View Org Broker Profiles (Admin directory) |
| `MANAGE_BROKER_PROFILE` | Manage Sub-Broker Profile |
| `APPROVE_BROKER_PROFILE` | Approve Broker Profile |
| `MANAGE_BROKER_CLIENTS` | Manage Broker Clients |

### Leads / support / system

| Code | Name |
|------|------|
| `VIEW_LEADS` | Leads page access |
| `CREATE_LEAD` | Create lead |
| `EDIT_LEAD` | Edit lead & notes |
| `ASSIGN_LEAD` | Assign / reassign leads |
| `DELETE_LEAD` | Delete lead |
| `SEND_RECEIVE_MESSAGES` | Support messaging |
| `AUDIT_TRAIL` | Audit Trail |
| `ROLE_PERMISSION_MANAGEMENT` | Role Permission Management (matrix UI) |
| `CREATE_ADMIN_USER` | Create Admin User |
| `MANAGE_INTERNAL_ROLES` | Manage Internal Roles |

### Notification (staff bell fan-out)

These codes control **who receives** in-app staff alerts. They do **not** gate page or API access (feature permissions still do that). In the permissions matrix they are managed under **Other → Notification → Features** (`OTHER_FEATURE_GROUPS`), not as flat Other rows.

| Code | Name | Alert |
|------|------|-------|
| `RECEIVE_NEW_SELL_REQUEST_NOTIFICATION` | Receive New Sell Request Notification | `NEW_SELL_REQUEST` |
| `RECEIVE_KYC_SUBMITTED_NOTIFICATION` | Receive KYC Submitted Notification | `KYC_SUBMITTED` |
| `RECEIVE_ORDER_PAID_NOTIFICATION` | Receive Order Paid Notification | `ORDER_PAID` |
| `RECEIVE_DEAL_PENDING_APPROVAL_NOTIFICATION` | Receive Deal Pending Approval Notification | `DEAL_PENDING_APPROVAL` |
| `RECEIVE_SYSTEM_NOTIFICATION` | Receive System Notification | `SYSTEM` (reserved; no creator yet) |
| `RECEIVE_SUPPORT_NOTIFICATION` | Receive Support Notification | Support chat bell rows |

Support chat page/API access remains `SEND_RECEIVE_MESSAGES` (needed to open Support and reply). WS chat invalidate still fans out to that permission.

**Support routing** (bell + inbox access):

| Customer | Bell (`RECEIVE_SUPPORT_NOTIFICATION`) | Open / reply (`SEND_RECEIVE_MESSAGES` + role) |
|----------|----------------------------------------|-----------------------------------------------|
| Assigned RM | That RM only | That RM, or Admin / Superadmin |
| Unassigned | Admin / Maintainer / Superadmin (with receive permission) | Admin / Maintainer / Superadmin |

Maintainer does **not** get bells or inbox access for customers already assigned to an RM.

---

## 8. Nav → permission (internal-web)

Full **page → API** map: [02-page-permissions.md](./02-page-permissions.md). Granting a page permission unlocks only that page’s listed APIs (shared endpoints accept any listing page).

Some items also require `anyInternalRole` (user must have at least one listed role).

| Nav item | Path | Permission | Role gate (if any) |
|----------|------|------------|--------------------|
| Dashboard | `/dashboard` | `VIEW_DASHBOARD` | — (not seeded for RM) |
| Clients & dealers (Sales) | `/sales/trading-clients` | `VIEW_TRADING_CLIENT` | RM, ADMIN, SUPERADMIN |
| Desk orders | `/sales/orders` | `VIEW_DESK_ORDER` | Features: `UPLOAD_DESK_ORDER_PAYMENT_DETAILS`, … |
| Sub-brokers (Sales) | `/sales/sub-brokers` | `VIEW_BROKER_PROFILE` | — |
| Customer sell requests | `/sales/sell-requests` | `VIEW_SELL_REQUEST` | — |
| Ops orders | `/operations/ops-orders` | `VIEW_OPS_ORDER` | Org-wide desk roles\* |
| Working directory | `/operations/working-directory` | `MANAGE_WORKING_DIRECTORY` | Features: `OPS_MANAGE_DESK_ORDER_PAYMENT_UTR`, … |
| Sub-broker orders | `/operations/sub-broker` | `VIEW_SUB_BROKER_ORDER` | Org-wide desk roles\* |
| Companies / Stock / Deals | `/inventory/...` | `VIEW_COMPANY` / `VIEW_INVENTORY` / `VIEW_DEAL` | — |
| Staff Users | `/admin/users` | `VIEW_STAFF_USERS` | — |
| Sub-brokers (Admin) | `/admin/brokers` | `VIEW_ORG_BROKER_PROFILE` | Org-wide broker directory roles\* |
| Clients & dealers (Admin) | `/admin/trading-clients` | `VIEW_ORG_TRADING_CLIENT` | Org-wide client directory roles\* |
| Permissions | `/system/permissions` | `ROLE_PERMISSION_MANAGEMENT` | — |
| Audit trail | `/system/audit` | `AUDIT_TRAIL` | — |
| Support | `/support` | `SEND_RECEIVE_MESSAGES` | — |
| Receivings | `/accounts/receivings` | `MANAGE_PAYMENT_LINES` | — |

\*Org-wide roles typically: `SUPERADMIN`, `ADMIN`, `OPERATION`, `ACCOUNT_MANAGER`, `MAINTAINER` (see `ORG_WIDE_*` in `nav.ts`).

---

## 9. Sub-broker commission access (ACCOUNT_MANAGER)

Design goal: AM works **commission** on Operations → Sub-broker orders **without** Sales Desk orders / Sub-brokers pages.

| Capability | Mechanism |
|------------|-----------|
| See Sub-broker orders nav | `VIEW_SUB_BROKER_ORDER` + org-wide role |
| List/get desk orders for that queue | Routes accept `VIEW_SUB_BROKER_ORDER` |
| Load broker banks in Commission popup | `GET /brokers/:id` accepts `VIEW_SUB_BROKER_ORDER` (list `/brokers` still needs `VIEW_BROKER_PROFILE`) |
| Save split lines / Mark Done | `PUT .../broker-commission-splits` accepts `EDIT_DESK_ORDER` **or** `VIEW_SUB_BROKER_ORDER`; service still enforces org-wide/book rules |
| Edit payee amounts (RM) | `EDIT_DESK_ORDER` (`canEdit` in popup) |
| Change broker status from Pending | Blocked for accounts-only (`ACCOUNTS_PENDING_LOCKED`) |

After changing seed permissions, **re-seed** and have the user **log out/in** so the session picks up the new set.

---

## 10. Changing permissions safely

1. Add the code to `permissions.ts` **and** `frontend-platform/packages/permissions` codes if the UI checks it.
2. Attach it to the right role lists in `roles.ts`.
3. Run `pnpm run db:seed`.
4. Wire API `preHandler` and/or nav/`internalRouteAccess`.
5. If **removing** a permission from a role, delete the `RolePermission` row (UI or SQL)—seed will not.

Use `/system/permissions` (`ROLE_PERMISSION_MANAGEMENT`) for live matrix edits without redeploying seed lists (still keep seed in sync for new environments).

---

## 11. Related docs

- [Page permissions → APIs](./02-page-permissions.md) — nav label, to-open permission, API list
- [Internal by role](./pages/08-internal-by-role.md) — which pages each role typically uses
- [Internal pages live](./pages/09-internal-pages-live.md) — page inventory
- [DATABASE-ERD.md](../DATABASE-ERD.md) — RBAC tables
