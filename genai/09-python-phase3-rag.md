# Python — Phase 3: RAG (~2 weeks)

**Track:** Python only.

## Goal

Implement the standard RAG pipeline with the Python ecosystem (largest set of examples worldwide).

## What to learn

- Embeddings and chunking
- Vector DB usage
- Context injection and grounded answers
- Chat with PDFs / folders of docs

## RAG flow (same as every stack)

```text
User question
  → Embed question
  → Similarity search in vector DB
  → Inject top chunks as context
  → Call LLM
  → Answer
```

## Best learning sources

### 1. RAG concepts

Same conceptual material as Phase 1 / Spring / Node — implement it in Python.

### 2. Vector databases

- Start: **Chroma** (very common in Python tutorials)
- Then: **Pinecone** for managed production

### 3. Python frameworks (after a manual baseline)

- **LlamaIndex** — strong for document Q&A
- **LangChain** — broad tooling; learn selectively, not every module

Build:

- Chat with PDF
- Simple eval set (10 questions with expected sources)

## What to skip early

- Training embedding models
- Multi-agent frameworks before single-shot RAG is solid

## Checkpoint

You can explain each RAG step in your own code (or framework config) and show retrieved chunks for an answer.
