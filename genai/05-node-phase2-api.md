# Node.js — Phase 2: GenAI API Integration (1–2 weeks)

**Track:** Node.js only.

## Goal

A Fastify or Express API that calls an LLM end-to-end, streams when useful, and stores usage.

## What to learn

- Official **OpenAI Node SDK** (and optionally Anthropic / Gemini)
- **Vercel AI SDK** for streaming and provider helpers
- Timeouts, retries, and error mapping
- Persist prompt, response, tokens, cost
- SSE / streaming responses for chat UX

## Best learning sources

### 1. OpenAI Node SDK docs

Chat completions / responses API, usage fields, rate-limit headers.

### 2. Vercel AI SDK docs

Streaming patterns that map cleanly to web and mobile clients.

### 3. Fastify (or Express) production basics

Body validation, env secrets, structured logging.

## What to skip early

- Heavy LangChain.js graphs before a plain chat route works
- Fine-tuning
- Complex agent frameworks

## Mini practice

Build the same contract as Spring:

```http
POST /ai/chat
Content-Type: application/json

{
  "prompt": "Explain JWT in simple terms"
}
```

Persist: prompt, response, tokens used, cost.

Optional stretch: `POST /ai/chat/stream` with SSE.

## Checkpoint

You can call OpenAI from Node, handle failures, and show token usage in storage.
