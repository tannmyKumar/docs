# Speede (SPEED-e) Export — Overview

## What is Speede?

**SPEED-e** is NSDL’s electronic batch-instruction system. In the Dhankirti platform, **Speede export** means:

1. Ops selects eligible desk **BUY** orders that are in **WORKING** status and have a payment **UTR**.
2. The platform builds a **fixed-width `.txt` batch file** in NSDL SPEED-e upload format.
3. Ops downloads that file and uploads it to NSDL SPEED-e so shares can be delivered into the buyer’s demat account.
4. Optionally, a **response file** from NSDL can be uploaded back so the platform can mark matching orders as **order punched**.

This is **not** Excel or CSV. It is a strict character-position file that NSDL validates by length and totals.

## Why it exists in this product

Desk buy orders settle by delivering shares from the firm’s pool/account into the **client’s demat** (NSDL or CDSL). Speede is the operational bridge between:

- Order + payment data in the platform
- Depository delivery instructions on NSDL SPEED-e

## High-level flow

```text
WORKING BUY orders (with UTR)
        │
        ▼
 Preview (human-readable table)
        │
        ▼
 Export → BatchXXXXXXX.txt download
        │
        ▼
 Ops uploads file to NSDL SPEED-e
        │
        ▼
 (Optional) Upload response → mark orders punched
```

## Transaction types used

| Code | Name | When used |
|------|------|-----------|
| **904** | Delivery to client (BO–BO / NSDL) | Client demat portal is **NSDL** |
| **925** | Inter-depository delivery (IDT) | Client demat portal is **CDSL** |

Header record type is **11**. Detail record type is **12**. Trailer record type is **19**.

## Eligibility (order level)

An order can be included in Speede export when **all** of the following are true:

| Rule | Requirement |
|------|-------------|
| Side | `BUY` only |
| Status | `WORKING` |
| Payment UTR | Present on desk-order bank detail **or** latest payment line |
| Company | ISIN present |
| Client | Trading client linked on the order |
| Demat + bank | Resolvable from **desk accounts** and/or **linked verified KYC** (dual-read) |
| Settlement | If client has both NSDL and CDSL complete demats, order must have settlement depository set |

Maximum **500** orders per export batch.

## Dual-read demat / bank (important)

Speede does **not** read desk bank/demat only. The shared resolver loads:

1. Remaining desk `TradingClient` demat/bank rows
2. Linked customer’s **verified** KYC demat/bank as fallback

Per portal: if a complete desk demat exists, it wins; otherwise verified KYC fills the gap. Banks: usable desk banks win; else verified KYC bank.

If desk rows were stripped because they matched KYC (same account must not live in both places), Speede still works via KYC fallback.

## Configuration (no secrets in this doc)

Backend `.env` must define the firm’s Speede upload identity:

| Variable | Rule |
|----------|------|
| `NSDL_SPEEDE_UPLOAD_DP_ID` | Exactly 8 characters (e.g. `IN301330`) |
| `NSDL_SPEEDE_UPLOAD_CLIENT_ID` | Numeric; zero-padded to 8 digits in the file |

If these are missing or invalid, export returns HTTP 500 with a clear configuration error.

## Related code (backend)

| Area | Path |
|------|------|
| Bulk export + preview | `backend-platform/src/Domain/desk-orders/speede/speede-bulk-export.service.ts` |
| File assembly | `.../speede/build-file.ts` |
| 904 builder | `.../speede/build-bo-bo-904.ts` |
| 925 builder | `.../speede/build-idt-925.ts` |
| Fixed-width helpers | `.../speede/fixed-width.ts` |
| Client resolve | `.../speede/resolve-speede-client.ts` |
| Account dual-read | `.../trading-clients/service/trading-client-account-resolve.ts` |
| Response verify | `.../speede/speede-response-verify.service.ts` |
| Routes | `.../desk-orders/routes/desk-orders.routes.ts` |

## Related UI

Internal ops orders screen: preview dialog, bulk download, response upload. API client helpers live in `frontend-platform/packages/api-client/src/desk-orders.ts`.
