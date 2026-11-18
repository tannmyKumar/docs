# 9. Internal Web — By Role

What each seeded internal role typically uses in the **live** portal today, plus Goal 3 expectations.

## RM

| Focus | Live pages | Typical actions |
|-------|------------|-----------------|
| Clients | `/customers`, customer detail | Invite customer; view KYC/orders/portfolio |
| Deals | `/inventory/deals`, new deal | Create/edit deals; send negotiated deal to client |
| Sell requests | `/sales/sell-requests` | View **assigned clients’** Sell-to-Dhankirti requests; approve/reject; create order from approved request (unassigned customers → org-wide staff only) |
| Support | `/support` | Chat with customers |
| Goal 3 (planned) | Trading Clients, Desk Orders | Desk order create/edit/cancel; assisted payment link |

## OPERATION

| Focus | Live pages | Typical actions |
|-------|------------|-----------------|
| Orders | `/operations/ops-orders/portal` | Update payment / execution / share status; upload docs; dealsheet; release to ops |
| Inventory | companies/stock/deals (view) | Context for fulfillment |
| Sell requests | `/sales/sell-requests` | View / progress requests |
| Support | `/support` | Ops messaging |
| Goal 3 (planned) | Approvals, Working Directory, Share Settlement | Dedicated ops screens |

## ACCOUNT_MANAGER

| Focus | Live pages | Typical actions |
|-------|------------|-----------------|
| Orders | `/operations/ops-orders/portal` | Payment status; execution; documents |
| Goal 3 (planned) | Payment Lines, Reconciliation | Cashfree verify; reconcile payment lines |

## MAINTAINER

| Focus | Live pages | Typical actions |
|-------|------------|-----------------|
| KYC | `/customers/[userId]` | Approve/reject/send-back; demat verify |
| Master data | companies, stock | Create/edit company; manage inventory/price |
| Orders | `/operations/ops-orders/portal` | Execution status + documents as needed |

## ADMIN

All of the above plus: publish/unpublish and approve/reject deals; assign RM (API exists — UI assign-RM not wired); create/edit staff profiles; change sell-request status; broker approve (when Goal 4 UI exists).

## SUPERADMIN

Everything ADMIN can do, plus: `/system/permissions` RBAC matrix; manage internal roles on staff users; create admin users; sell-transaction create (`CREATE_SELL_TRANSACTION` used by sell-request → order); audit trail (API/permission may lack dedicated UI).

## Role → live nav visibility (approximate)

Visibility is permission-driven, not hard-coded to role name. Seed defaults imply:

| Nav | RM | OPERATION | ACCOUNT_MANAGER | MAINTAINER | ADMIN | SUPERADMIN |
|-----|----|-----------|-----------------|------------|-------|------------|
| Dashboard | Y | Y | Y | Y | Y | Y |
| Customers | Y | Y | Y | Y | Y | Y |
| Companies / Stock / Deals | Y | Y | Y | Y | Y | Y |
| Portal Orders | Y | Y | Y | Y | Y | Y |
| Sell requests | Y | Y | —* | —* | Y | Y |
| Staff Users | — | — | — | — | Y* | Y |
| Permissions | — | — | — | — | — | Y |
| Support | Y | Y | —* | —* | Y | Y |

\*Depends on exact seeded codes; empty cells mean seed typically lacks the nav permission.
