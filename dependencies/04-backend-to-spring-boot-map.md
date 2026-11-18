# 5. Backend Node → Spring Boot Alternatives

This chapter maps **backend-platform** Node packages to common **Java Spring Boot** equivalents. Frontend and mobile stacks are not mapped (they stay on React / React Native).

These are design alternatives for a hypothetical Java backend — not code that exists in this repository today.

## Framework and HTTP

| Node package | Spring Boot / Java alternative | Notes |
|--------------|--------------------------------|-------|
| `fastify` | `spring-boot-starter-web` (Servlet) or `spring-boot-starter-webflux` | Fastify is a Node HTTP framework; Spring Boot provides embedded Tomcat/Netty and controllers |
| `@fastify/cors` | Spring MVC `CorsRegistry` / `CorsConfiguration` | Built into Spring Web |
| `@fastify/cookie` | Servlet cookies / Spring Session as needed | `HttpServletResponse.addCookie` or Spring Session |
| `@fastify/helmet` | Spring Security headers (`HeadersConfigurer`) | Security headers via Spring Security |
| `@fastify/multipart` | `spring-boot-starter-web` multipart (`MultipartFile`) | Commons FileUpload under the hood |
| `@fastify/rate-limit` | Bucket4j / Redis rate limiter / API gateway | No single built-in; often Filter + Redis |
| `@fastify/swagger` + `@fastify/swagger-ui` | `springdoc-openapi-starter-webmvc-ui` | OpenAPI 3 + Swagger UI |
| `@fastify/websocket` | `spring-boot-starter-websocket` | STOMP or raw WebSocket |

## Data and validation

| Node package | Spring Boot / Java alternative | Notes |
|--------------|--------------------------------|-------|
| `@prisma/client` + `prisma` | `spring-boot-starter-data-jpa` + Flyway or Liquibase | JPA/Hibernate entities; migrations via Flyway/Liquibase |
| `zod` | `spring-boot-starter-validation` (`jakarta.validation`) (+ MapStruct optional) | Annotations on DTOs; MapStruct for mapping |
| `pg` | PostgreSQL JDBC driver (`org.postgresql:postgresql`) | Used by Spring Data / Flyway |

## Auth and security

| Node package | Spring Boot / Java alternative | Notes |
|--------------|--------------------------------|-------|
| `jsonwebtoken` | Spring Security OAuth2 Resource Server and/or JJWT | Prefer Spring Security JWT resource server for APIs |
| `bcrypt` | Spring Security `BCryptPasswordEncoder` | Part of `spring-security-crypto` |

## Cache, queues, storage, email, PDF

| Node package | Spring Boot / Java alternative | Notes |
|--------------|--------------------------------|-------|
| `ioredis` | `spring-boot-starter-data-redis` | Lettuce/Jedis client |
| `bullmq` | Spring + Redis workers, Quartz, or RabbitMQ/Kafka | BullMQ is Redis job queues; Java often uses messaging brokers |
| `@aws-sdk/client-s3` + presigner | AWS SDK for Java v2 S3 | Same S3 APIs |
| `nodemailer` | `spring-boot-starter-mail` (`JavaMailSender`) | SMTP |
| `handlebars` | Thymeleaf (or Mustache) | Server-side HTML templates |
| `puppeteer` / `puppeteer-core` | OpenHTMLToPDF, Flying Saucer, or Playwright Java | PDF from HTML; approach differs |

## Logging, config, toolchain

| Node package | Spring Boot / Java alternative | Notes |
|--------------|--------------------------------|-------|
| `pino` | SLF4J + Logback | Default Spring Boot logging |
| `dotenv` | `application.yml` / `application-{profile}.yml` + env vars | Spring Boot Externalized Configuration |
| `typescript` + `tsx` | JDK + Maven or Gradle | Compile/run toolchain — not a library swap |
| `eslint` + `typescript-eslint` | Checkstyle, SpotBugs, Error Prone, or Spotless | Static analysis equivalents |

## Suggested Spring Boot starters (summary list)

For a Spring Boot rewrite of this backend you would typically start with:

- `spring-boot-starter-web`
- `spring-boot-starter-validation`
- `spring-boot-starter-data-jpa`
- `spring-boot-starter-data-redis`
- `spring-boot-starter-mail`
- `spring-boot-starter-security`
- `spring-boot-starter-oauth2-resource-server` (or JWT library)
- `spring-boot-starter-websocket`
- `springdoc-openapi-starter-webmvc-ui`
- `flyway-core` (or Liquibase)
- AWS SDK Java S3
- Thymeleaf (templates)
- A PDF library (OpenHTMLToPDF / Playwright Java)
