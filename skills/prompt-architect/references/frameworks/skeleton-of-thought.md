# Skeleton of Thought (SoT) Framework

## Overview

Skeleton of Thought (SoT) is a two-phase framework that first generates a concise structural outline ("skeleton") of the answer, then expands each skeleton point — either sequentially or in parallel — into full content. It improves both output quality (by forcing upfront structure) and can dramatically reduce latency when expansion is done in parallel API calls.

**Research basis:** "Skeleton-of-Thought: Prompting LLMs for Efficient Parallel Generation" (Ning et al., Microsoft Research, arXiv:2307.15337, ICLR 2024). Demonstrated 2x+ speedup on 8 of 12 tested models with maintained or improved quality.

## Components

### Phase 1: Skeleton Generation
**Purpose:** Generate a concise, ordered list of the key points, sections, or sub-answers that will form the complete response. No expansion yet — just the bare bones.

**Trigger prompt:**
```
You're an organizer of responses. Please provide me with a one-line point outline
of [topic/question] without any explanation. Your outline must be:
X. [brief point name] | [one-line description]
```

### Phase 2: Point Expansion
**Purpose:** Expand each skeleton point into full content. Each point is independent and can be expanded in isolation (enabling parallelism).

**Trigger prompt per point:**
```
Please expand on the following point in 3-5 sentences:
Point X: [point name] — [one-line description]
```

### SoT-R Variant (Router)
**Purpose:** Adds a routing step before Phase 1. If the question is NOT suitable for SoT (e.g., requires continuous prose, math derivation, or linear reasoning), the router falls back to standard generation.

**Not suitable for SoT:** Mathematical proofs, code that must flow sequentially, narrative story, continuous logical arguments where each step depends on the last.

## Template Structure

```
PHASE 1 — SKELETON:
Generate a skeleton outline for the following question. List only key points,
one per line, in the format: [number]. [Point name] | [One-sentence description].
Do not expand yet.

QUESTION/TOPIC:
[Your question or topic]

PHASE 2 — EXPAND:
Now expand each point into [2-4 sentences / a paragraph / detailed explanation].
Each point should be self-contained and complete.

[Optional: expand points in parallel by sending each as a separate request]
```

### Minimal Single-Pass SoT
For use in a single prompt when parallel API calls aren't available:
```
First, create a brief skeleton outline of [topic] (one line per point).
Then, expand each skeleton point into [length/detail level].
Present as: Skeleton → then Full Expansion.
```

## Complete Examples

### Example 1: Technical Explanation

**Before SoT:**
"Explain microservices architecture."

**After SoT:**
```
PHASE 1 — SKELETON:
Create a skeleton outline for explaining microservices architecture to a
senior engineer evaluating whether to migrate from a monolith. List 5-7 key
points in format: N. [name] | [one-sentence description]. Do not expand.

PHASE 2 — EXPAND:
Expand each skeleton point into 2-3 paragraphs. Each section should be
self-contained. Include specific trade-offs relevant to a migration decision.
```

**Skeleton output (Phase 1):**
```
1. Core concept | Each service owns one business capability and runs independently
2. Service boundaries | How to decompose a monolith into services without creating distributed spaghetti
3. Communication patterns | Sync (REST/gRPC) vs async (events) and when each applies
4. Data ownership | Each service owns its database; consequences for queries and consistency
5. Operational complexity | What microservices add: service mesh, CI per service, distributed tracing
6. Migration strategy | Strangler fig vs. big-bang; risk profile of each
7. When NOT to use | Scale thresholds below which microservices create more problems than they solve
```

**Expansion (Phase 2, point 6):**
```
Migration Strategy: The strangler fig pattern incrementally wraps the monolith
by routing new traffic to microservices while the legacy system handles the rest.
This allows parallel operation and rollback if needed, making it the lower-risk
option for most teams. The big-bang rewrite is faster in theory but carries high
risk of scope creep, integration failures, and a multi-month feature freeze...
```

### Example 2: Structured Report

**Before SoT:**
"Write a competitive analysis of our product vs. competitors."

**After SoT:**
```
PHASE 1 — SKELETON:
Create a skeleton for a competitive analysis covering our product vs. [Competitor A]
and [Competitor B]. List 6-8 comparison dimensions in format:
N. [dimension] | [what to compare]. Do not write the analysis yet.

PHASE 2 — EXPAND:
For each dimension, write 1 paragraph analyzing how our product compares on that
dimension. Include specific, concrete observations. Flag any dimension where we
have a clear advantage or significant gap.
```

### Example 3: Learning Content

**Before SoT:**
"Explain how React hooks work."

**After SoT (single-pass):**
```
First, create a 5-7 point skeleton outline of the key concepts needed to
understand React hooks (for a developer who knows JavaScript but is new to React).
Format: N. [concept] | [one sentence]

Then expand each skeleton point into 1-2 paragraphs with a code example where relevant.
Show: skeleton first, then full expansion.
```

## Best Use Cases

1. **Structured Explanations**
   - Technical docs
   - Tutorial content
   - Concept breakdowns

2. **Long-Form Content Where Structure Matters**
   - Reports and analyses
   - Documentation sections
   - Comparative content

3. **When Parallel Generation is Available**
   - API workflows where each skeleton point can be expanded concurrently
   - Systems requiring minimum latency
   - Batch content generation

4. **Improving Output Organization**
   - When prose responses tend to meander
   - When you need consistent structure across multiple outputs
   - When you want to review/approve structure before full generation

## Selection Criteria

**Choose SoT when:**
- ✅ Output has multiple semi-independent sections
- ✅ You want to validate structure before full generation
- ✅ Parallel expansion would reduce latency
- ✅ Content organization is a primary concern
- ✅ Multiple similar documents need consistent structure

**Avoid SoT when:**
- ❌ Answer requires continuous linear reasoning → use Chain of Thought
- ❌ Mathematical proof or derivation → use Plan-and-Solve or CoT
- ❌ Narrative that flows as a whole → use CO-STAR
- ❌ Simple, short answer → use APE or RTF
- ❌ Each section depends on the previous → use Least-to-Most

## SoT vs. Other Frameworks

| | SoT | Chain of Thought | RISEN | CO-STAR |
|---|---|---|---|---|
| Structure | Skeleton → expansion | Linear steps | Methodology-driven | Audience/context-driven |
| Parallelizable | Yes | No | No | No |
| Best for | Structured multi-section content | Reasoning | Complex procedures | Writing |
| Shows work | Structure only | Reasoning steps | Process | N/A |

## Quick Reference

| Phase | Purpose | Key Question |
|-------|---------|--------------|
| Skeleton | Structure first | "What are the key points?" |
| Expansion | Fill each point | "What does each point contain?" |
| Router (SoT-R) | Appropriateness check | "Is this suitable for SoT?" |
