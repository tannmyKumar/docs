# 1. Overview

This guide lists **all npm dependencies** used across the Dhankirti platform and maps **backend** Node packages to common **Java Spring Boot** alternatives.

## Projects covered

| Project | Path | Stack |
|---------|------|--------|
| Backend API | `backend-platform` | Node.js, Fastify, Prisma |
| Frontend monorepo | `frontend-platform` | Next.js, React, Turbo/pnpm |
| Mobile app | `mobile-app` | Expo, React Native |

## What is in this PDF

1. **Inventories** — package name, version range, runtime vs dev, where used, short purpose.
2. **Backend → Spring Boot map** — only for backend packages (frontend/mobile are not mapped to Spring Boot).
3. **Definitions** — plain-language glossaries for backend, frontend, mobile, and Spring Boot artifacts.

## Important notes

- Version ranges are taken from each project’s `package.json` (caret/tilde ranges as declared).
- Workspace packages (`@dhankirti/*`) are first-party code shared inside the monorepo.
- Spring Boot mappings are **suggested equivalents** for a hypothetical Java rewrite of the backend — not currently implemented in this repo.
