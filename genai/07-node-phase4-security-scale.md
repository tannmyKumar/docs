# Node.js — Phase 4: Security + Scale (~1 week)

**Track:** Node.js only.

## Goal

Production controls around GenAI routes: auth, quotas, cache, async jobs, rate limits.

## What to learn

- Protect AI routes with JWT and/or session cookies
- Role-based access to AI features
- Per-user daily quotas
- Redis cache for safe repeat answers
- Background jobs for long RAG ingest / slow calls (**BullMQ**)
- Rate limiting per IP / user

## Best learning sources

- Your existing auth patterns (JWT / cookies)
- Redis caching guides for API responses
- BullMQ docs for job queues
- Fastify rate-limit plugins or gateway-level limits

## What to skip early

- Edge LLM inference
- Perfect semantic caching before exact-key caching

## Final Node.js stack

| Layer | Tool |
|-------|------|
| Backend | Fastify (or Express) |
| AI integration | OpenAI SDK + Vercel AI SDK |
| RAG | Manual first, then LangChain.js optional |
| Vector DB | pgvector or Chroma → Pinecone |
| Auth | JWT / session cookies |
| Cache | Redis |
| Async | BullMQ / job queue |

## Checkpoint

Authenticated users hit quota limits; expensive RAG indexing runs async; provider outages return controlled errors.
