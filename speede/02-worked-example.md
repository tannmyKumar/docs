# Speede Worked Example (Full Walkthrough)

This chapter uses one realistic sample order and shows exactly how it appears in the downloaded Speede file.

## Sample business data

| Field | Value |
|-------|-------|
| Batch number | `42` |
| Download filename | `Batch0000042.txt` |
| Firm upload DP | `IN301330` |
| Firm upload client | `00001234` |
| Order side / status | BUY / WORKING |
| Script | Reliance Industries |
| ISIN | `INE002A01018` |
| Quantity | `100` shares |
| Order amount / consideration | ₹`250000` |
| Client name (transferee) | `RAHUL SHARMA` |
| Demat portal | **NSDL** → txn type **904** |
| Client DP ID | `IN302902` |
| Client BO ID | `12345678` |
| Bank name | `HDFC BANK` |
| Bank account | `50100123456789` |
| Payment UTR | `HDFC123456789012` |
| File created (IST) | 18 Nov 2026, 15:03 |

## What the file means in plain language

> From our firm Speede account (`IN301330` / `00001234`), in batch 42, deliver **100** shares of ISIN `INE002A01018` into Rahul Sharma’s NSDL demat (`IN302902` / `12345678`). Consideration is ₹2,50,000. Payment reference UTR is `HDFC123456789012`.

## Full file skeleton

```text
{}
<header 50 chars>
<one 904 detail line 600 chars>
<trailer 150 chars>
{}
```

## Header decoded (50 characters)

Conceptual concatenation:

```text
0000042 + 11 + ______ + IN301330 + 00001234 + 00001 + 20261118 + 1503 + __
```

| Segment | Value | Meaning |
|---------|-------|---------|
| Batch | `0000042` | Batch 42 |
| Type | `11` | Header |
| Filler | 6 spaces | Unused |
| Upload DP | `IN301330` | Our Speede DP |
| Upload client | `00001234` | Our Speede client |
| Detail count | `00001` | One order line |
| Date | `20261118` | 18-Nov-2026 |
| Time | `1503` | 15:03 IST |
| Filler | 2 spaces | Unused |

## Detail 904 decoded (600 characters)

### Instruction identity (front)

| Segment | Value | Meaning |
|---------|-------|---------|
| Batch | `0000042` | Same batch |
| Type | `12` | Detail |
| Line | `00001` | First line |
| Txn | `904` | NSDL delivery to client |
| Flag | `A` | Add |
| Filler | 7 spaces | — |
| ISIN | `INE002A01018` | Security |
| Qty | `000000000100000` | 100 shares (= 100 × 1000) |
| Filler | 9 spaces | — |
| Exec date | `20261118` | Execution date |
| Target DP | `IN302902` | Client DP |
| Target client | `12345678` | Client BO |
| Filler | 8 spaces | — |
| Internal ref | `0000042` + spaces → 20 | Batch reference |

### Payment / consideration tail

| Segment | Value | Meaning |
|---------|-------|---------|
| Consideration | `250000` + spaces → 15 | ₹2,50,000 |
| Reason | `01` | Reason used by builder |
| Fillers | spaces | Layout fillers |
| Mode | `03` | Mode-of-payment section start |
| Payment date | `20261118` | Payment / UTR date |
| Transferee | `RAHUL SHARMA` padded to 135 | Name in file |
| Bank A/c | `50100123456789` padded to 30 | Account |
| Bank name | `HDFC BANK` padded to 35 | Bank |
| UTR | `HDFC123456789012` padded to 25 | Payment reference |
| Flags | ` 1N` | Fixed flags from builder |
| Trailing spaces | to length 600 | Fixed-width padding |

## Trailer decoded (150 characters)

| Segment | Meaning in this example |
|---------|-------------------------|
| Batch `0000042` + type `19` | Trailer |
| Pool qty | `0` |
| Client/904 qty | `100` → `000000000100000` |
| IDT/925 qty | `0` (no CDSL lines) |
| Other buckets | zeros |
| Grand total | `100` |

NSDL checks that trailer totals match detail quantities.

## Same order if demat were CDSL (925)

If Rahul’s demat were CDSL with DP digits + client digits combining to 16 digits (example `1208160012345678`):

| Difference | 904 (NSDL) | 925 (CDSL) |
|------------|------------|------------|
| Transaction type | `904` | `925` |
| Target identity | DP 8 + client 8 | Client code 16 |
| Other depository | (n/a in 904 path) | `IN000026` |
| Trailer bucket | Client qty | IDT qty |

Header/trailer structure stays the same; only the detail middle and which trailer bucket accumulates quantity change.

## How dual-read affects this example

| Desk bank/demat | Linked verified KYC | What Speede uses |
|-----------------|---------------------|------------------|
| Same as KYC (stripped) | Present | KYC values in file |
| Different from KYC | Present | Desk preferred; KYC fills other portal gaps |
| Present, no link | — | Desk only |
| Empty, KYC linked | Present | KYC only |

For this sample, if desk bank was deleted because it matched KYC, the file still contains HDFC account + UTR path still requires order UTR; bank name/account come from KYC via resolver.

## Ops checklist for this sample

1. Order is BUY + WORKING.
2. UTR `HDFC123456789012` uploaded / recorded.
3. Client has resolvable NSDL demat + bank (desk or KYC).
4. Company ISIN set.
5. Preview looks correct in UI.
6. Download `Batch0000042.txt` and upload to NSDL SPEED-e.
7. Later: upload Speede response to punch the order in the platform.
