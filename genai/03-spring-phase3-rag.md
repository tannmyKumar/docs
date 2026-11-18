# Spring Boot — Phase 3: RAG (~2 weeks)

**Track:** Spring Boot only.

## Goal

Enterprise-grade “chat with your data”: embeddings, vector search, context injection, then LLM answer.

## What to learn

- Embeddings (what they are; why similarity search works)
- Vector databases
- Chunking documents / records
- Context injection into prompts
- Chat with PDFs and/or DB records

## RAG flow (memorize this)

```text
User question
  → Embed question
  → Similarity search in vector DB
  → Inject top chunks as context
  → Call LLM with grounded prompt
  → Answer (optionally with sources)
```

## Best learning sources

### 1. RAG concepts (most important)

Read/watch:

- How RAG works step-by-step
- Embedding → vector DB → similarity search → prompt

### 2. Vector databases (choose a path)

Learn basics of:

- **Chroma** (local / start here)
- **Pinecone** (managed / production-friendly)
- FAISS (advanced; optional later)

Suggested order: Chroma locally → then Pinecone for managed scale.

### 3. Spring integration

- **Spring AI** vector store integrations
- **LangChain4j** for RAG pipelines on the JVM

Build:

- Chat with a PDF
- Chat with selected DB records (product FAQ, policies, etc.)

## What to skip early

- Training custom embedding models
- Hybrid search research papers before a working baseline
- Multi-agent “RAG agents” before single-shot retrieve works reliably

## Why this phase matters

RAG is the #1 practical GenAI skill for enterprise resumes and internal tools: knowledge stays updateable without retraining the model.

## Checkpoint

Given a folder of PDFs, your Spring app answers questions using retrieved chunks—and you can explain when the answer is ungrounded.
