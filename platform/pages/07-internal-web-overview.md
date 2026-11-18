# 8. Internal Web — Overview

App: `frontend-platform/apps/internal-web`  
Audience: staff (`INTERNAL` roleType) with RBAC permissions.

## Live nav sections

| Section | Items |
|---------|-------|
| Platform | Dashboard, Customers |
| Inventory | Companies, Stock, Deals |
| Orders | Portal Orders, Customer sell requests |
| Administration | Staff Users, Permissions |
| Support | Support chat |

Goal 3 Desk / Ops / Finance nav is **not rendered yet** (see planned pages chapter).

## Shell APIs (all authenticated pages)

- `logout`
- Staff notifications list/read/dismiss + WS token
- Support inbox conversations/messages/presence + WS token (when `SEND_RECEIVE_MESSAGES`)

## Auth pages

| Path | APIs |
|------|------|
| `/login` | `login`, then `getStaffMe` for first authorized href |
| `/forgot-password` | `forgotPassword` |
| `/reset-password` | `resetPassword` |

## Permission model

Sidebar items hide without the nav permission. In-page actions use finer codes (e.g. `APPROVE_REJECT_DEAL`, `MANAGE_INVENTORY`). See roles chapter and live pages chapter.
