# 2. Backend Dependencies Inventory

Source: `backend-platform/package.json`  
Package manager: pnpm · Node `>=20`

## Runtime dependencies

| Package | Version | Used in | Purpose |
|---------|---------|---------|---------|
| `fastify` | ^5.2.1 | API server | HTTP framework |
| `@fastify/cookie` | ^11.0.2 | Auth cookies | Cookie parse/set |
| `@fastify/cors` | ^10.0.2 | Browser apps | CORS headers |
| `@fastify/helmet` | ^13.0.2 | Security | HTTP security headers |
| `@fastify/multipart` | ^10.0.0 | Uploads | Multipart/form-data |
| `@fastify/rate-limit` | ^11.1.0 | Auth/public routes | Request rate limiting |
| `@fastify/swagger` | ^9.7.0 | OpenAPI | Schema generation |
| `@fastify/swagger-ui` | ^6.0.0 | Docs UI | Swagger UI (non-prod) |
| `@fastify/websocket` | ^11.3.0 | Realtime | WebSocket support |
| `@prisma/client` | ^6.19.3 | Data access | Generated Prisma client |
| `prisma` | ^6.19.3 | ORM/migrations | Schema + migrate CLI (also used at runtime tooling) |
| `zod` | ^3.24.2 | Validation | Request/env schemas |
| `jsonwebtoken` | ^9.0.3 | Auth | JWT sign/verify |
| `bcrypt` | ^6.0.0 | Auth | Password hashing |
| `ioredis` | ^5.11.1 | Cache/queues | Redis client |
| `bullmq` | ^5.79.2 | Background jobs | Redis-backed job queues |
| `@aws-sdk/client-s3` | ^3.1079.0 | Storage | S3 uploads/downloads |
| `@aws-sdk/s3-request-presigner` | ^3.1079.0 | Storage | Presigned S3 URLs |
| `nodemailer` | ^9.0.3 | Email | SMTP email sending |
| `handlebars` | ^4.7.9 | PDF/email templates | HTML templating |
| `puppeteer-core` | ^25.4.0 | PDF generation | Headless Chrome (system Chrome) |
| `pino` | ^9.6.0 | Logging | Structured JSON logs |
| `dotenv` | ^16.4.7 | Config | Load `.env` into `process.env` |

## Dev dependencies

| Package | Version | Used in | Purpose |
|---------|---------|---------|---------|
| `typescript` | ^5.7.3 | Build | TypeScript compiler |
| `tsx` | ^4.19.3 | Dev scripts | Run TS without emit |
| `eslint` | ^9.21.0 | Lint | JS/TS linting |
| `@eslint/js` | ^9.21.0 | Lint | ESLint JS configs |
| `typescript-eslint` | ^8.25.0 | Lint | TS ESLint rules |
| `@types/node` | ^22.13.5 | Types | Node typings |
| `@types/bcrypt` | ^6.0.0 | Types | bcrypt typings |
| `@types/jsonwebtoken` | ^9.0.10 | Types | JWT typings |
| `@types/nodemailer` | ^8.0.1 | Types | nodemailer typings |
| `@types/pg` | ^8.20.0 | Types | pg typings |
| `pg` | ^8.22.0 | Scripts/migrate | PostgreSQL driver |
| `puppeteer` | ^25.4.0 | PDF/dev | Full Puppeteer (bundled Chrome) for local PDF |
