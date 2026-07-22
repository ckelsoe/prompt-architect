# Skeleton of Thought (SoT) Framework

## Overview

Skeleton of Thought (SoT) is a two-phase framework that first generates a concise structural outline ("skeleton") of the answer, then expands each skeleton point — either sequentially or in parallel — into full content. It improves both output quality (by forcing upfront structure) and can dramatically reduce latency when expansion is done in parallel API calls.

**Research basis:** "Skeleton-of-Thought: Prompting LLMs for Efficient Parallel Generation" (Ning et al., Microsoft Research, arXiv:2307.15337, ICLR 2024). Demonstrated 2x+ speedup (up to 2.39x) on 8 of 12 tested models, with quality parity in roughly 60% of cases; quality degrades on writing, math, and coding tasks.

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

Section headers are stripped at emission, so every header's meaning is carried by
unbracketed prose that ships with the prompt. Do not reintroduce header-only structure.

```
SOURCE MATERIAL:
[Optional — paste the document, data, or notes the answer must be drawn from here. If you
have nothing to paste, delete this bracketed block along with the sentence directly below
it.]
Use the material above as the factual basis for the work described below.

Answer the topic or question below in two phases: first a skeleton outline, then a full
expansion of every point in that skeleton.

TOPIC / QUESTION:
[Write out the full topic or question as a complete, self-contained sentence rather than a
bare noun phrase, including any audience, scope, or depth of coverage specified]

PHASE 1 — SKELETON:
First, outline the topic above. List only the key points, one per line, in this format:
N. [Point name] | [One-sentence description of what this point covers]
Replace N with the point's number and fill in both bracketed parts, keeping that line's
format exactly. Produce the skeleton and nothing else — do not expand any point yet.

PHASE 2 — EXPAND:
Once the skeleton is complete, expand each of its points into [2-4 sentences / a paragraph /
detailed coverage]. Restate a point's name before expanding it, and make each expansion
self-contained.
```

The two-phase framing sentence sits before `TOPIC / QUESTION` so that both phases are
announced before the topic appears; the topic in turn sits before both phases so that
Phase 1's "the topic above" resolves once the headers are gone.

**Parallel expansion is not part of the emitted prompt.** The template runs both phases in
a single self-contained prompt. Splitting Phase 2 into one request per skeleton point — the
source of the paper's latency gain — is a workflow the sender builds around the model, not
an instruction the model can act on. A line such as "[Optional: expand points in parallel by
sending each as a separate request]" addresses the human holding the prompt, and a
header-stripped prompt has nowhere to put a note to the sender: the model would read it as
an instruction it cannot execute. If that note is ever added for the sender's benefit, it
must be deleted before the prompt is sent.

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
Answer the topic or question below in two phases: first a skeleton outline, then a full
expansion of every point in that skeleton.

TOPIC / QUESTION:
Explain microservices architecture to a senior engineer who is evaluating whether to
migrate an existing monolith, covering the trade-offs that bear on that decision.

PHASE 1 — SKELETON:
First, outline the topic above. List 5-7 key points, one per line, in this format:
N. [Point name] | [One-sentence description of what this point covers]
Replace N with the point's number and fill in both bracketed parts, keeping that line's
format exactly. Produce the skeleton and nothing else — do not expand any point yet.

PHASE 2 — EXPAND:
Once the skeleton is complete, expand each of its points into 2-3 paragraphs. Restate a
point's name before expanding it, and make each expansion self-contained. Include the
specific trade-offs that bear on a migration decision.
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
Answer the topic or question below in two phases: first a skeleton outline, then a full
expansion of every point in that skeleton.

TOPIC / QUESTION:
Write a competitive analysis comparing our product against [you fill this in: name of the
first competitor] and [you fill this in: name of the second competitor], for an internal
audience deciding where to invest next.

PHASE 1 — SKELETON:
First, outline the topic above. List 6-8 comparison dimensions, one per line, in this
format:
N. [Dimension name] | [One-sentence description of what to compare on that dimension]
Replace N with the dimension's number and fill in both bracketed parts, keeping that line's
format exactly. Produce the skeleton and nothing else — do not write the analysis yet.

PHASE 2 — EXPAND:
Once the skeleton is complete, expand each dimension into one paragraph analyzing how our
product compares on it. Restate the dimension's name before expanding it, and make each
expansion self-contained. Use specific, concrete observations, and flag any dimension where
we have a clear advantage or a significant gap.
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
