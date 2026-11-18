# Order status model (v2)

Two fields on `Order`:

| Field | Role | Values |
|-------|------|--------|
| `status` | Share / ops (settlement) | `PENDING`, `WORKING`, `ORDER_PUNCHED`, `WAITING_FOR_BALANCE`, `RECEIVED`, `TRANSFERRED`, `CANCELLED`, `EXPIRED` |
| `paymentStatus` | Money / checkout | `PAYMENT_PENDING`, `PARTIAL`, `PAID`, `EXPIRED`, `REFUND` |

Removed from `Order`: `shareStatus`, `executionStatus` (settlement is `status` only).

## Awaiting payment

- `paymentStatus = PAYMENT_PENDING`, `status = PENDING`
- Checkout uses `expiresAt`, `cfOrderId`; never `PAYMENT_PENDING` on `status`
- After capture: `paymentStatus = PAID`; `status` stays `PENDING` until ops/release/working

## Checkout expiry

- `paymentStatus = EXPIRED`, `status = EXPIRED` (portal checkout TTL; deal quantity restored)

## Payment captured

`isPaymentCaptured(order)` ⇔ `paymentStatus === PAID` (never infer from `status`).

## Ops paths

**Firm sell / customer buy (`side = BUY`):**  
`PENDING` → `WORKING` → `ORDER_PUNCHED` → `WAITING_FOR_BALANCE` → `TRANSFERRED`

**Firm buy / customer sell (`side = SELL`):**  
`PENDING` → `WORKING` → `RECEIVED`

**Cancel:** `status = CANCELLED` with `paymentStatus` per cancel rules (`EXPIRED` for checkout timeout, unchanged or reversed otherwise).

## Portal legacy mapping

| Old | New |
|-----|-----|
| `status = PAYMENT_PENDING` | `status = PENDING`, `paymentStatus = PAYMENT_PENDING` |
| `status = PAID` | `paymentStatus = PAID`, `status = PENDING` (or ops step from history) |
| `executionStatus = COMPLETED` | `status = WORKING` (if not yet in working chain) |
| `shareStatus = TRANSFERRED` / `RECEIVED` | `status = TRANSFERRED` / `RECEIVED` |
| `status = APPROVED` (desk) | `status = WORKING` when ops starts; approve API removed |
| `status = REJECTED` | `status = CANCELLED` |
| `status = EXPIRED` (legacy) | `paymentStatus = EXPIRED`, `status = EXPIRED` |

## Settlement complete

`isSettlementComplete(side, status)` ⇔ terminal ops: `TRANSFERRED` (BUY) or `RECEIVED` (SELL).

## Portal orders in Operations

When `channel = PORTAL` and payment is captured (`paymentStatus = PAID`), the order appears on the main ops book and desk-orders APIs (payment lines, settlement, move to working) without a separate RM release step.

## History

New rows: `OrderStatusHistory.kind = ORDER_STATUS` only for ops/payment-driven changes that affect displayed settlement (payment line changes may omit order status history).

Legacy `EXECUTION_STATUS` / `SHARE_STATUS` rows remain readable in UI.

Linked from [DATABASE-ERD.md](../DATABASE-ERD.md). Manual QA: [ORDER_STATUS_QA.md](./ORDER_STATUS_QA.md).
