# Phase 1 — GenAI Fundamentals (~1 week)

**Scope:** Shared for every stack. No SDK deep-dives yet.

## Goal

Understand how GenAI systems behave in products: prompts, tokens, cost, hallucinations, and why companies prefer RAG over fine-tuning for most internal knowledge use cases.

## What to learn

- What an **LLM** is (prediction of next tokens, not a database of truth)
- **Prompt engineering** (system vs user messages, constraints, examples)
- **Tokens** and **context window** (limits, truncation, cost drivers)
- **Hallucinations** (confident wrong answers; grounding and citations)
- **Cost and rate limiting** (per-request pricing, RPM/TPM quotas)
- **Fine-tuning vs RAG** (critical distinction for enterprise)

## Best learning sources (in order)

### 1. OpenAI official documentation (start here)

Read with focus on concepts, not SDK code yet:

- How LLMs work (high-level)
- Prompt engineering guide
- Tokens and pricing
- RAG vs fine-tuning guidance / patterns

Why: Clean, practical, industry-standard language used in real products.

### 2. YouTube (short and clear)

Search these exact terms:

- `LLM explained simply`
- `Prompt engineering best practices`
- `RAG vs Fine-tuning explained`
- `Why LLM hallucinate`

Trusted channels:

- Fireship
- Andrej Karpathy
- AssemblyAI

**Skip:** long ML/math theory playlists, research paper walkthroughs, GPU training courses.

### 3. Must-read blog themes

- “RAG explained for developers”
- “Why enterprises don’t fine-tune LLMs” (for most knowledge/Q&A cases)

Look for articles that explain: embed → retrieve → inject context → generate.

## What to skip in Phase 1

- Training or fine-tuning models yourself
- Backpropagation / transformer math
- Building multi-agent frameworks
- Vendor lock-in debates before you can ship a chat API

## Checkpoint

You should clearly answer:

> Why do companies usually use **RAG** instead of **fine-tuning** for internal documents and product knowledge?

Strong answer (summary): Fine-tuning is expensive, slow to update, and still can hallucinate. RAG keeps knowledge outside the model (vector store / docs), updates by re-indexing, and injects relevant context at ask time—better for changing enterprise data and auditability.
