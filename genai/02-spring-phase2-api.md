# Spring Boot — Phase 2: GenAI API Integration (1–2 weeks)

**Track:** Spring Boot only.

## Goal

Spring Boot calling an LLM end-to-end: accept a prompt, get a response, handle timeouts/retries, and persist usage metrics.

## What to learn

- Call **OpenAI** and/or **Gemini** from Spring
- Prefer **Spring AI** abstractions in production (`ChatClient`, prompt templates)
- Understand raw REST once (request/response, tokens, rate limits)
- **WebClient** (or RestClient) with timeouts and retries
- Persist: prompt, response, tokens used, estimated cost

## Best learning sources

### 1. Spring AI (primary)

- Spring AI official docs
- Learn: `ChatClient`, prompt templates, response handling, provider configuration

Why: Native Spring Boot style; clean abstraction over OpenAI, Gemini, and others; enterprise-friendly.

### 2. Raw provider APIs (do once)

- OpenAI API reference
- Google Gemini API reference

Learn: REST shapes, token usage fields, error codes, rate limits.

### 3. Spring HTTP client reliability

- WebClient / RestClient timeouts
- Retry with backoff (Spring Retry or Resilience4j — deeper in Phase 4)

## What to skip early

- Full LangChain4j RAG (save for Phase 3)
- Fine-tuning pipelines
- Complex agent graphs

## Mini practice

Build:

```http
POST /ai/chat
Content-Type: application/json

{
  "prompt": "Explain JWT in simple terms"
}
```

Persist for each call:

- prompt
- response
- tokens used
- estimated cost
- timestamp / user id (if authenticated)

## Checkpoint

You can demo a Spring Boot service that chats with an LLM, fails safely on timeouts, and shows token usage in the database.
