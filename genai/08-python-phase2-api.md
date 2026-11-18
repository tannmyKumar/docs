# Python — Phase 2: GenAI API Integration (1–2 weeks)

**Track:** Python only.

## Goal

A FastAPI service that calls an LLM, handles reliability, and stores usage metrics.

## What to learn

- **OpenAI Python SDK** (primary)
- Optional: Google GenAI / Gemini Python client
- **FastAPI** routes and Pydantic models
- **httpx** timeouts and retries (or SDK retry config)
- Persist prompt, response, tokens, cost

## Best learning sources

### 1. OpenAI Python documentation

Chat / responses APIs, streaming, usage objects.

### 2. FastAPI documentation

Request validation, dependency injection, settings/env.

### 3. Provider dashboards

Pricing pages and rate-limit docs so you can estimate cost per call.

## What to skip early

- Full LangChain / LlamaIndex apps before a plain chat endpoint works
- Notebooks-only learning without an HTTP API
- Fine-tuning notebooks

## Mini practice

```http
POST /ai/chat
Content-Type: application/json

{
  "prompt": "Explain JWT in simple terms"
}
```

Persist: prompt, response, tokens used, cost.

## Checkpoint

FastAPI returns chat answers and stores token usage reliably.
