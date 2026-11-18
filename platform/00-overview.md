# 1. Platform Overview

Dhankirti is a Pre-IPO trading platform with a shared Fastify backend and multiple client apps.

## Applications

| App | Purpose | Status |
|-----|---------|--------|
| **Customer web** (`frontend-platform/apps/customer-web`) | Customer invest / sell portal | Live |
| **Internal web** (`frontend-platform/apps/internal-web`) | Staff operations portal | Live (Goals 1–2) |
| **Mobile app** (`mobile-app`) | Customer Expo app (Android/iOS) | Live |
| **Broker web** (`frontend-platform/apps/broker-web`) | Broker portal | Planned (Goal 4 stub) |
| **Backend** (`backend-platform`) | REST + WebSocket API (`/api/v1`) | Live |

## Goals roadmap (product)

| Goal | Scope | Status |
|------|--------|--------|
| Goals 1–2 | Auth, customers, KYC, inventory, deals, portal orders, sell requests, support, RBAC | Shipped |
| Goal 3 | Desk (trading clients, desk orders), Ops (approvals, working directory, share settlement), Finance (payment lines, reconciliation) | Planned |
| Goal 4 | Broker web | Planned / stub |

## Document map

This PDF has two main parts:

1. **API documentation** — catalog of HTTP endpoints and where each is used in UI.
2. **Page-wise documentation** — customer, mobile, internal (by role and by page), Goal 3 planned pages, broker.

## Auth model (summary)

- Portal-scoped HTTP-only cookies: `{portal}_access_token`, `{portal}_refresh_token` (`customer` | `internal` | `broker`).
- Access token is short-lived; refresh renews access without rotating the refresh token (static refresh).
- Mobile may also receive tokens in JSON for native storage.
- Staff actions are gated by RBAC permission codes; customer actions require a verified-mobile customer session where noted.
