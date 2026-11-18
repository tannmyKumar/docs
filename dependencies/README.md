# Dhankirti Dependencies & Spring Boot Guide

Markdown sources for the dependencies PDF.

## Contents

| File | Section |
|------|---------|
| [00-overview.md](./00-overview.md) | Overview |
| [01-backend-dependencies.md](./01-backend-dependencies.md) | Backend inventory |
| [02-frontend-dependencies.md](./02-frontend-dependencies.md) | Frontend inventory |
| [03-mobile-dependencies.md](./03-mobile-dependencies.md) | Mobile inventory |
| [04-backend-to-spring-boot-map.md](./04-backend-to-spring-boot-map.md) | Backend → Spring Boot map |
| [05-backend-dependency-definitions.md](./05-backend-dependency-definitions.md) | Backend definitions |
| [06-frontend-dependency-definitions.md](./06-frontend-dependency-definitions.md) | Frontend definitions |
| [07-mobile-dependency-definitions.md](./07-mobile-dependency-definitions.md) | Mobile definitions |
| [08-spring-boot-dependency-definitions.md](./08-spring-boot-dependency-definitions.md) | Spring Boot definitions |

## Generate PDF

From the repository root:

```bash
node docs/scripts/build-dependencies-docs-pdf.mjs
```

Output: `docs/Dhankirti-Dependencies-SpringBoot-Guide.pdf`

This document does **not** include credentials or secrets.
