# Dhankirti Platform Documentation

Maintainable source for the product documentation PDF.

## Contents

| File | Section |
|------|---------|
| [00-overview.md](./00-overview.md) | Platform overview |
| [01-roles-permissions.md](./01-roles-permissions.md) | Roles and permissions |
| [02-page-permissions.md](./02-page-permissions.md) | Page access → APIs |
| [api/02-api-overview.md](./api/02-api-overview.md) | API auth model |
| [api/03-api-catalog.md](./api/03-api-catalog.md) | Full API catalog |
| [api/04-api-usage-map.md](./api/04-api-usage-map.md) | Endpoint → page usage |
| [pages/05-customer-web.md](./pages/05-customer-web.md) | Customer web pages |
| [pages/06-mobile-app.md](./pages/06-mobile-app.md) | Mobile app screens |
| [pages/07-internal-web-overview.md](./pages/07-internal-web-overview.md) | Internal portal overview |
| [pages/08-internal-by-role.md](./pages/08-internal-by-role.md) | Internal by role |
| [pages/09-internal-pages-live.md](./pages/09-internal-pages-live.md) | Live internal pages |
| [pages/10-internal-goal3-planned.md](./pages/10-internal-goal3-planned.md) | Goal 3 planned pages |
| [pages/11-broker-web.md](./pages/11-broker-web.md) | Broker portal (planned) |

## Generate PDF

From the repository root:

```bash
node docs/scripts/build-platform-docs-pdf.mjs
```

Output: `docs/Dhankirti-Platform-Documentation.pdf`

This document does **not** include environment credentials. Keep secrets in private runbooks only.
