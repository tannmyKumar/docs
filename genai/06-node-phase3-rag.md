# Node.js — Phase 3: RAG (~2 weeks)

**Track:** Node.js only.

## Goal

Same enterprise RAG skill as Spring, implemented in Node: embed → retrieve → inject → generate.

## What to learn

- Embeddings via provider APIs
- Vector store basics
- Chunking PDFs / markdown / DB text
- Grounded prompts with citations where possible

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

Reuse Phase 1 understanding; implement the pipeline manually first.

### 2. Vector databases

- Start: **Chroma** (local) or **PostgreSQL pgvector** (fits many Node products)
- Then: **Pinecone** (managed)

### 3. Node libraries

- Manual RAG with OpenAI embeddings + vector client (preferred first)
- **LangChain.js** only after you can explain each step without the framework

Build:

- Chat with PDF / docs folder
- Chat with a subset of DB content

## What to skip early

- Multi-agent RAG before single retrieve works
- Fine-tuned embedding models

## Checkpoint

Your Node service answers from your documents and fails closed when nothing relevant is retrieved (or clearly says it does not know).
