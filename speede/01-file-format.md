# Speede File Format (Fixed-Width)

## Filename

```text
Batch{NNNNNNN}.txt
```

Examples: `Batch0000001.txt`, `Batch0000042.txt`

The seven-digit number is the platform batch counter (`SpeedeBatchCounter`), incremented on each successful export (not on preview).

## Overall file layout

```text
{}
<header line — exactly 50 characters>
<detail line 1 — exactly 600 characters>
<detail line 2 — exactly 600 characters>
...
<trailer line — exactly 150 characters>
{}
```

Rules:

- Encoding: UTF-8 plain text
- Lines joined with `\n`
- First and last lines are the literal two-character marker `{}`
- Dates and times use **Asia/Kolkata (IST)**
- Quantities are **12 integer digits + 3 decimal digits with no decimal point** (shares × 1000), left zero-padded to 15 characters

## Header record (type 11) — 50 characters

| Order | Width | Content | Notes |
|------:|------:|---------|-------|
| 1 | 7 | Batch number | Zero-padded |
| 2 | 2 | `11` | Header record type |
| 3 | 6 | Spaces | Filler |
| 4 | 8 | Upload DP ID | Firm Speede DP (`NSDL_SPEEDE_UPLOAD_DP_ID`) |
| 5 | 8 | Upload client ID | Firm Speede client (numeric, padded) |
| 6 | 5 | Detail count | Number of detail lines |
| 7 | 8 | File creation date | `YYYYMMDD` IST |
| 8 | 4 | File creation time | `HHMM` IST |
| 9 | 2 | Spaces | Filler |

**Total: 50**

## Detail record (type 12) — 600 characters

Every detail starts with:

| Order | Width | Content | Notes |
|------:|------:|---------|-------|
| 1 | 7 | Batch number | Same as header |
| 2 | 2 | `12` | Detail record type |
| 3 | 5 | Line number | 1-based within file |
| 4 | 3 | Transaction type | `904` or `925` |
| 5 | 1 | Transaction flag | Always `A` (add) |

Then portal-specific middle fields, then a shared **consideration / payment tail**, then padding to 600.

### 904 — NSDL delivery to client

After the common prefix (`904` + `A` + 7 spaces):

| Field | Width | Content |
|-------|------:|---------|
| ISIN | 12 | Security ISIN, right-padded with spaces |
| Quantity | 15 | Shares × 1000, zero-padded |
| Filler | 9 | Spaces (market/settlement unused in builder) |
| Execution date | 8 | `YYYYMMDD` |
| Target DP ID | 8 | Client NSDL DP (e.g. `IN302902`) |
| Target client ID | 8 | Client BO id, numeric zero-padded |
| Filler | 8 | Spaces |
| Internal reference | 20 | Batch number left-aligned, space-padded |
| Reason / payment tail | (fixed) | Consideration + mode of payment block |
| Trailing filler | 189 | Spaces |

NSDL target DP must match `IN` + 6 alphanumeric. Client ID must be 1–8 digits.

### 925 — CDSL inter-depository delivery

After the common prefix (`925` + `A` + 7 spaces):

| Field | Width | Content |
|-------|------:|---------|
| ISIN | 12 | Security ISIN |
| Quantity | 15 | Shares × 1000 |
| Filler | 9 | Spaces |
| Execution date | 8 | `YYYYMMDD` |
| Target client code | 16 | DP digits + client digits = exactly 16 digits |
| Other depository ID | 8 | Always `IN000026` (CDSL) |
| Internal reference | 20 | Batch number padded |
| Reason / payment tail | (fixed) | Consideration + mode of payment block |
| Extra fillers | various | Spaces / reserved fields to reach 600 |

### Payment / consideration tail (both 904 and 925)

Built for reason code **01** (consideration / off-market style used by this product):

| Field | Width | Content |
|-------|------:|---------|
| Consideration (₹) | 15 | Whole rupees, left-aligned, space-padded |
| Reason code | 2 | `01` |
| Spaces / fillers | varies | Slightly different layout for 904 vs 925 middle fillers |
| Mode of payment marker | 2 | `03` |
| Payment date | 8 | `YYYYMMDD` |
| Transferee name | 135 | Uppercase, space-padded |
| Bank account number | 30 | As stored, space-padded |
| Bank name | 35 | Uppercase, space-padded |
| Payment reference (UTR) | 25 | Required; space-padded |
| Flags | 3 | Space + `1` + `N` |

**UTR is mandatory.** Export fails if neither bank-detail UTR nor payment-line UTR is present.

## Trailer record (type 19) — 150 characters

| Order | Width | Content | Notes |
|------:|------:|---------|-------|
| 1 | 7 | Batch number | |
| 2 | 2 | `19` | Trailer |
| 3 | 6 | Spaces | |
| 4 | 15 | Pool qty total | Always 0 in current builder |
| 5 | 15 | Client (904) qty total | Sum of 904 quantities |
| 6 | 15 | IDT (925) qty total | Sum of 925 quantities |
| 7–11 | 15 each | Zero buckets | Reserved / unused |
| 12 | 15 | Grand total | Pool + client + IDT |

Quantities use the same 15-digit scaled format as detail lines. NSDL rejects files when trailer totals disagree with details.

## Quantity encoding example

| Shares | Stored as (15 chars) |
|-------:|----------------------|
| 1 | `000000000001000` |
| 100 | `000000000100000` |
| 1250 | `000000001250000` |

Formula: `padLeft(String(shares * 1000), 15, "0")`

## Preview vs download

| Action | Consumes batch number? | Output |
|--------|------------------------|--------|
| Preview | No (peeks next number) | JSON table for ops UI |
| Export / download | Yes (increments counter + stores `SpeedeUploadBatch`) | `.txt` file blob |

Preview columns include: batch, line, order id, client name/PAN, portal, txn type, script, ISIN, qty, price, amount, consideration, dates, UTR, bank, demat targets.
