# 11. Internal Web — Goal 3 Planned Pages

**Status: Planned / not shipped.** Nav comments in `internal-web/src/config/nav.ts` list these sections; they are not rendered until APIs and UI ship.

Some related **permission codes and order-status APIs already exist** and are partially used on live Portal Orders. Dedicated Goal 3 destinations below are still missing.

## Desk

| Planned page | Intended purpose | Related permissions |
|--------------|------------------|---------------------|
| Trading Clients | Manage trading client records linked to customers | `VIEW_TRADING_CLIENT`, `CREATE_TRADING_CLIENT`, `EDIT_TRADING_CLIENT`, `LINK_CLIENT_PROFILE` |
| Desk Orders | Staff-assisted buy/sell desk orders | `CREATE_DESK_ORDER`, `EDIT_DESK_ORDER`, `CANCEL_DESK_ORDER`, `SEND_ASSISTED_PAYMENT_LINK`, `SEND_DEAL_TO_CLIENT`, `VIEW_USER_PORTFOLIO`, `INVITE_CUSTOMER` |

**Primary roles:** RM, ADMIN, SUPERADMIN.

## Ops

| Planned page | Intended purpose | Related permissions |
|--------------|------------------|---------------------|
| Approvals | Order approval / reject / cancel-approved workflows | `APPROVE_REJECT_ORDER`, `OPS_CANCEL_APPROVED_ORDER` |
| Working Directory | Ops working set of in-flight settlements | `MANAGE_WORKING_DIRECTORY` |
| Share Settlement | Share transfer lifecycle | `MANAGE_SHARE_SETTLEMENT`, purchase share/execution/document codes, `GENERATE_DEALSHEET` |

**Primary roles:** OPERATION, ADMIN, SUPERADMIN.  
**Today:** payment/execution/share controls appear on `/operations/ops-orders/portal` order detail for permitted users.

## Finance

| Planned page | Intended purpose | Related permissions |
|--------------|------------------|---------------------|
| Payment Lines | View/manage payment line items | `VIEW_PAYMENT_LINES`, `MANAGE_PAYMENT_LINES`, `CHANGE_ORDER_PAYMENT_STATUS` |
| Reconciliation | Reconcile gateway vs ledger | *(permission TBD when page ships)* |

**Primary roles:** ACCOUNT_MANAGER, ADMIN, SUPERADMIN.

## Documentation note

When Goal 3 ships, update:

1. This chapter (mark Live).
2. API catalog with new routes.
3. Usage map and by-role nav tables.
4. Regenerate the PDF.
