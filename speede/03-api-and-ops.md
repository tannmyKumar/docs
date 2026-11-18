# Speede APIs, Ops UI, and Response Verify

## HTTP APIs (internal)

Base path: `/api/v1/desk-orders`

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/working/speede-bulk-preview` | Validate selected orders; return readable preview table + next batch number (no file, no counter increment) |
| `POST` | `/working/speede-bulk-export` | Validate, allocate batch number, build `.txt`, return file download |
| `POST` | `/working/speede-response-verify` | Upload NSDL response file; punch matching orders |

### Preview body

```json
{ "orderIds": ["ORD...", "ORD..."] }
```

### Export body

Same JSON body. Response is a binary/text file download with filename like `Batch0000042.txt`.

### Common validation failures (HTTP 422)

The API returns a structured message listing order-level errors, for example:

- Only BUY orders can be included
- Order must be in WORKING status
- Company ISIN is missing
- Link a trading client…
- Add bank name and account number on the trading client **or linked KYC**
- Complete Speede fields on the trading client **or linked KYC**
- Payment UTR is required
- Two complete demat portals — select NSDL or CDSL on the desk order

## Frontend helpers

Package: `frontend-platform/packages/api-client`

| Function | Behavior |
|----------|----------|
| `previewSpeedeBulkExport(client, orderIds)` | POST preview |
| `downloadSpeedeBulkExportFile(client, baseUrl, orderIds)` | POST export, trigger browser download |
| `verifySpeedeResponseUpload(client, formData)` | POST multipart response file |

UI eligibility helper (`isSpeedeExportEligibleOrder`): BUY + WORKING + effective UTR present.

Effective UTR preference:

1. Desk-order bank-detail `utrNumber`
2. Else latest payment line `utr`

## Batch persistence

On successful export the platform:

1. Increments `SpeedeBatchCounter.lastBatchNumber`
2. Creates `SpeedeUploadBatch` with `batchNumber`, `lineCount`, `orderIds`, `createdByUserId`
3. Returns file bytes built from those detail records

Preview only **peeks** `(lastBatchNumber + 1)` and does not write the batch row.

## Response verify (after NSDL processing)

Ops can upload the Speede **response** file corresponding to a batch. The verifier:

1. Parses response lines / batch identity
2. Matches orders from the stored upload batch
3. Transitions eligible orders toward **order punched** (or reports unchanged / skipped)

Toast-style summary in UI reports punched / unchanged / skipped counts for `BatchNNNNNNN`.

## Operational runbook

1. On Ops Working orders, select Speede-eligible BUY rows.
2. Open Speede preview — fix any red validation errors (UTR, demat, bank, settlement portal).
3. Confirm export — browser downloads `BatchXXXXXXX.txt`.
4. Upload that file into NSDL SPEED-e using the firm’s Speede credentials (outside this app).
5. When NSDL response is available, upload it via Speede response verify to advance order workflow.

## Limits and constraints

| Item | Value |
|------|-------|
| Max orders per export | 500 |
| Max batch number | 9,999,999 |
| Detail line length | 600 |
| Header length | 50 |
| Trailer length | 150 |
| Calendar timezone | Asia/Kolkata |

## Security / compliance notes

- This documentation contains **sample** demat, bank, and UTR values only.
- Do not commit real Speede credentials or production UTRs into docs.
- Speede upload DP/client IDs belong in backend environment configuration, not in frontend.
