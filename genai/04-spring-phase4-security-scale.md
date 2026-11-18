# Spring Boot — Phase 4: Security + Scale (~1 week)

**Track:** Spring Boot only.

## Goal

Production readiness: auth, quotas, caching, async, and resilience around GenAI endpoints.

## What to learn

- JWT-protected AI APIs
- Role-based AI access
- Per-user / per-plan quotas
- Caching repeated prompts
- Async processing for slow LLM calls
- Rate limiting and circuit breakers

## Best learning sources

### 1. Security (Spring Security)

You likely know basics. Extend to AI:

- Per-user token / call limits
- Admin vs user prompt policies
- Audit logs (who asked what, when, tokens spent)

Example policy:

| Plan | Limit |
|------|--------|
| FREE_USER | 5 AI calls / day |
| PREMIUM | Higher or unlimited (business rule) |

### 2. Performance and scale

- Redis caching for identical / near-identical AI responses where safe
- Async with `@Async` / `CompletableFuture`
- Rate limiting per user
- Circuit breakers (Resilience4j) when the LLM provider is down or slow

## What to skip early

- Multi-region LLM routing
- Custom GPU hosting
- Perfect semantic cache before basic exact-key cache works

## Final Spring Boot stack

| Layer | Tool |
|-------|------|
| Backend | Spring Boot |
| AI integration | Spring AI |
| RAG | LangChain4j |
| Vector DB | Chroma → Pinecone |
| Auth | JWT + Spring Security |
| Cache | Redis |
| Async | `@Async` / CompletableFuture |

## Checkpoint

AI endpoints require auth, enforce quotas, log usage, and degrade gracefully when the provider times out.
