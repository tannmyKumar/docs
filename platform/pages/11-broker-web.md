# 12. Broker Web (Goal 4 — Planned)

**Status: Planned / stub.**

## Current app

- Path: `frontend-platform/apps/broker-web`
- Single placeholder home page (“Dhankirti broker-web”)
- Middleware: passthrough (no auth gate)
- Depends on shared packages (`api-client`, `auth`, `permissions`, `ui`) but **no feature pages or API usage**

## Intended product direction

| Area | Notes |
|------|--------|
| Public role | `BROKER` under broker app context |
| Staff permissions already seeded | `VIEW_BROKER_PROFILE`, `APPROVE_BROKER_PROFILE`, `MANAGE_BROKER_CLIENTS`, `ASSIGN_RM_TO_BROKER` |
| UI | **No UI caller found** for broker permissions yet |

## Page-wise (roadmap placeholders)

| Planned page (illustrative) | Purpose | Status |
|-----------------------------|---------|--------|
| Broker login | Broker portal auth cookies | Planned |
| Broker dashboard | Pipeline / clients overview | Planned |
| Broker clients | Manage introduced clients | Planned |
| Broker deals/orders | Assisted deal flow | Planned |
| Internal: broker approval | Staff approve broker profiles | Planned |

Until Goal 4 lands, brokers are not a live end-user surface in this repository beyond the stub shell.
