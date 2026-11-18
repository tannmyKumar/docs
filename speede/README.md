# Speede documentation

Maintainable markdown source for the Speede (NSDL SPEED-e) export PDF.

## Sources

| File | Topic |
|------|-------|
| `00-overview.md` | What Speede is, eligibility, dual-read, config, code map |
| `01-file-format.md` | Fixed-width header / 904 / 925 / trailer rules |
| `02-worked-example.md` | Full sample batch with field-by-field decode |
| `03-api-and-ops.md` | APIs, UI helpers, response verify, runbook |

## Generate PDF

From repo root:

```bash
node docs/scripts/build-speede-docs-pdf.mjs
```

Output: `docs/Speede-Export-Documentation.pdf`
