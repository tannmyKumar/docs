# 9. Spring Boot Dependency Definitions

Definitions for Java / Spring artifacts named as alternatives to the Node backend.

## Core Spring Boot

**spring-boot-starter-web** — Starter for building REST APIs with Spring MVC and an embedded servlet container (Tomcat by default).

**spring-boot-starter-webflux** — Reactive alternative to starter-web (Netty, non-blocking). Optional mapping for high-concurrency APIs.

**spring-boot-starter-validation** — Jakarta Bean Validation (`@NotNull`, `@Email`, etc.) for request DTOs — analogue of Zod schemas.

**spring-boot-starter-data-jpa** — Spring Data JPA + Hibernate for relational DB access — analogue of Prisma Client.

**spring-boot-starter-data-redis** — Redis integration (caching, sessions, simple structures) — analogue of ioredis usage.

**spring-boot-starter-mail** — Email sending via JavaMail — analogue of nodemailer.

**spring-boot-starter-security** — Authentication/authorization filters, password encoders, security headers.

**spring-boot-starter-oauth2-resource-server** — Validates JWT bearer tokens for APIs — common replacement for hand-rolled `jsonwebtoken` checks.

**spring-boot-starter-websocket** — WebSocket (and optional STOMP) messaging — analogue of `@fastify/websocket`.

**spring-security-crypto** — Crypto helpers including `BCryptPasswordEncoder` — analogue of bcrypt.

## API docs and migrations

**springdoc-openapi-starter-webmvc-ui** — Generates OpenAPI 3 docs and serves Swagger UI — analogue of `@fastify/swagger` + swagger-ui.

**flyway-core** — Versioned SQL migrations for the database — analogue of Prisma Migrate.

**liquibase** — Alternative migration tool to Flyway (XML/YAML/SQL changelogs).

## Persistence and AWS

**org.postgresql:postgresql** — Official PostgreSQL JDBC driver used by Spring Data / Flyway.

**AWS SDK for Java v2 (S3)** — Official Java SDK for Amazon S3 operations and presigning — analogue of `@aws-sdk/client-s3` + presigner.

## Templates, PDF, jobs, logging

**thymeleaf** — Server-side HTML template engine integrated with Spring — analogue of Handlebars for email/PDF HTML.

**mustache** — Simpler logic-less templates; optional alternative to Thymeleaf.

**OpenHTMLToPDF** — Renders HTML/CSS to PDF in Java without a full browser.

**Flying Saucer** — Older HTML/CSS → PDF library often used with iText.

**Playwright for Java** — Browser automation; can print pages to PDF similarly to Puppeteer.

**Quartz** — Job scheduling library commonly used with Spring for timed/background work.

**RabbitMQ / Kafka (Spring AMQP / Spring Kafka)** — Message brokers for async work — common enterprise alternative to Redis job queues like BullMQ.

**SLF4J** — Logging facade API used by Spring applications.

**Logback** — Default logging implementation in Spring Boot — analogue of pino for structured app logs.

## Tooling (not Maven coordinates 1:1 with npm)

**Maven / Gradle** — Java build systems — analogue of pnpm + TypeScript compile (`tsc`/`tsx`).

**Checkstyle / SpotBugs / Error Prone / Spotless** — Static analysis and formatting tools — rough analogue of ESLint.

**MapStruct** — Compile-time bean mappers between entities and DTOs (often paired with validation).

**JJWT** — Popular Java JWT create/parse library if not using Spring’s OAuth2 resource server helpers alone.

**Bucket4j** — Rate-limiting library often combined with Redis or local buckets — analogue of `@fastify/rate-limit`.

**application.yml / Spring profiles** — Externalized configuration — analogue of dotenv + env vars.
