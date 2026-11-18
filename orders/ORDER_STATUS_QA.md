# Order status v2 — manual QA matrix

| Flow | Payment column | Settlement column | Notes |
|------|----------------|-------------------|--------|
| Portal buy checkout | `PAYMENT_PENDING` → `PAID` | stays `PENDING` until working/settlement | Cashfree; expiry → `EXPIRED` + `CANCELLED` |
| Portal buy ops | `PAID` | `PENDING` → `WORKING` → … → `TRANSFERRED` | Execution doc + transfer doc |
| Portal sell | `PAID` | `PENDING` → `WORKING` → `RECEIVED` | Sell-request finalize at `RECEIVED` |
| Desk buy (payment link) | `PAYMENT_PENDING` → `PAID` | `PENDING` → working chain | Guest pay |
| Desk approve | unchanged | `PENDING` → `WORKING` | No `APPROVED` status |
| Desk reject | — | → `CANCELLED` | |
| Portal paid — pending ops (bridge list) | filter `paymentStatus=PAID`, `status=PENDING`, `channel=PORTAL` | same order id in ops | No manual release |
| Partial desk bank pay | `PARTIAL` → `PAID` | per side path | |
| Cancel paid portal | `PAID` or reverted | `CANCELLED` | Inventory rollback per side |

Automated: `backend-platform/src/Domain/orders/service/order-payment.util.test.ts`, existing desk inventory tests.
