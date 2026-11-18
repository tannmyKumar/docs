# 6. Backend Dependency Definitions

Plain-language definitions for every package in `backend-platform/package.json`.

## Runtime

**fastify** — High-performance Node.js HTTP framework. Dhankirti uses it as the API server (`src/app.ts`) for REST and plugins.

**@fastify/cookie** — Fastify plugin for reading and writing HTTP cookies. Used for portal access/refresh auth cookies.

**@fastify/cors** — Enables Cross-Origin Resource Sharing so browser apps on different origins can call the API.

**@fastify/helmet** — Sets secure HTTP response headers (XSS, clickjacking protections, etc.).

**@fastify/multipart** — Parses `multipart/form-data` for file uploads (KYC docs, logos, order documents).

**@fastify/rate-limit** — Limits how many requests a client can make in a time window (login/register abuse protection).

**@fastify/swagger** — Generates OpenAPI schemas from route definitions.

**@fastify/swagger-ui** — Serves interactive API docs UI at `/api/v1/docs` (typically non-production).

**@fastify/websocket** — Adds WebSocket support for realtime notifications and support chat presence.

**@prisma/client** — Auto-generated TypeScript database client from the Prisma schema. Used for all DB reads/writes.

**prisma** — ORM CLI and schema tooling: migrations, generate, studio, seed.

**zod** — Schema validation library for TypeScript. Used for request bodies, query params, and env parsing.

**jsonwebtoken** — Creates and verifies JWTs for access and refresh tokens.

**bcrypt** — Password hashing algorithm library. Stores one-way hashes of user passwords.

**ioredis** — Redis client for Node. Used for caching and as BullMQ’s backing store.

**bullmq** — Redis-based job queue. Runs background workers (emails, async tasks).

**@aws-sdk/client-s3** — Official AWS SDK module to talk to Amazon S3 object storage.

**@aws-sdk/s3-request-presigner** — Builds time-limited presigned URLs for private S3 objects.

**nodemailer** — Sends email via SMTP (OTP, invites, notifications).

**handlebars** — Logic-less HTML templating. Used for email/PDF HTML templates.

**puppeteer-core** — Controls a Chrome/Chromium browser without bundling Chrome. Used for HTML→PDF (receipts, dealsheets, reports).

**pino** — Fast JSON logger. Backend request and application logs.

**dotenv** — Loads environment variables from a `.env` file into `process.env` at startup.

## Dev

**typescript** — Typed JavaScript language and compiler. Compiles `src` to `dist`.

**tsx** — Runs TypeScript files directly (dev server, scripts, seed) without a separate build step.

**eslint** — Static code analysis for JS/TS style and bugs.

**@eslint/js** — Official ESLint recommended configs for JavaScript.

**typescript-eslint** — ESLint parser/rules that understand TypeScript.

**@types/node** — TypeScript type definitions for Node.js APIs.

**@types/bcrypt** — Type definitions for the `bcrypt` package.

**@types/jsonwebtoken** — Type definitions for `jsonwebtoken`.

**@types/nodemailer** — Type definitions for `nodemailer`.

**@types/pg** — Type definitions for the `pg` PostgreSQL driver.

**pg** — Node PostgreSQL client. Used in scripts/migration tooling that talk to Postgres directly.

**puppeteer** — Full Puppeteer including Chrome download. Used locally for PDF generation when a system Chrome path is not configured.
