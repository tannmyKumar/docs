# Python — Phase 4: Security + Scale (~1 week)

**Track:** Python only.

## Goal

Production-minded FastAPI GenAI: auth, quotas, cache, async workers, rate limits.

## What to learn

- JWT auth with FastAPI security utilities
- Role / plan based AI access
- Per-user call quotas
- Redis caching where safe
- Background work: FastAPI `BackgroundTasks` and/or **Celery**
- Rate limiting (middleware or API gateway)

## Best learning sources

- FastAPI security / OAuth2 password bearer patterns
- Redis + Python client docs
- Celery (or alternative workers) for long ingest jobs
- Provider rate-limit handling and backoff

## What to skip early

- Kubernetes LLM serving
- Custom model hosting before API-based RAG works in production shape

## Final Python stack

| Layer | Tool |
|-------|------|
| Backend | FastAPI |
| AI integration | OpenAI Python SDK |
| RAG | Manual first, then LlamaIndex (or LangChain) |
| Vector DB | Chroma → Pinecone |
| Auth | JWT (FastAPI security) |
| Cache | Redis |
| Async | BackgroundTasks / Celery |

## Checkpoint

Protected AI routes enforce quotas; document ingest is async; failures are logged with token/cost context.
