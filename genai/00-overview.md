# Overview

## Purpose

This guide is a practical GenAI learning roadmap for backend engineers. It covers shared fundamentals first, then three **separate** implementation tracks:

1. **Spring Boot (Java)** — enterprise GenAI with Spring AI
2. **Node.js** — product APIs with OpenAI SDK / Vercel AI SDK
3. **Python** — FastAPI plus the widest GenAI tooling ecosystem

Each track has its own Phase 2 (API), Phase 3 (RAG), and Phase 4 (security + scale). Do not mix stacks inside a single phase.

## How to use this guide

1. Complete **Phase 1 (Fundamentals)** — language-agnostic, about one week.
2. Pick **one** implementation track and finish Phases 2–4 on that track.
3. Optionally port the same mini-projects to a second stack after you can explain RAG, tokens, and production controls.
4. Read **Best tech verdict** for an industry-wide (not personal) ranking of stacks as of 2026.

## Phase map

| Phase | Focus | Duration | Scope |
|-------|--------|----------|--------|
| 1 | GenAI fundamentals | ~1 week | Shared (all tracks) |
| 2 | GenAI API integration | 1–2 weeks | Per stack |
| 3 | RAG (enterprise must) | ~2 weeks | Per stack |
| 4 | Security + scale | ~1 week | Per stack |

## Short industry verdict (2026)

There is no single “best language forever,” but **right now the strongest overall GenAI choice worldwide is Python** — largest ecosystem, most tutorials, research, and RAG tooling. **Node.js** is the best fit when GenAI must ship inside modern web product backends. **Java / Spring Boot** is the best fit for large enterprise platforms that already standardize on JVM.

**Do not learn Spring, Node, and Python GenAI in parallel.** Finish Phase 1, then one deep track.

## Document rules

- This document does **not** contain credentials or secrets.
- Prefer official docs and a few trusted channels over random courses.
- Skip heavy ML/math until you can build chat + RAG + quotas in production style.
