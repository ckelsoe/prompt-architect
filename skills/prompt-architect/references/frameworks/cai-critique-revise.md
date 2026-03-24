# CAI Critique-Revise (Constitutional AI Critique-Revise Pattern)

## Overview

CAI Critique-Revise is a two-phase output improvement pattern derived from Anthropic's Constitutional AI methodology. A model generates an initial response, explicitly critiques it against a stated principle or standard, then revises the response to align with that principle. Unlike Self-Refine (which uses multi-dimensional quality feedback), CAI Critique-Revise is principle-driven: the critique is always measured against a specific, explicitly stated standard — a "constitution" of one or more principles.

**Research basis:** "Constitutional AI: Harmlessness from AI Feedback" (Bai et al., Anthropic, arXiv 2212.08073, 2022). Originally a training methodology; the critique-revise loop is directly usable as a prompting pattern. Key finding: generating an explicit critique before revising produces better alignment than asking for direct revision without a critique step.

## The Key Insight

Asking the model to revise directly ("make this better") is less effective than:
1. First critiquing against a specific principle ("does this violate X?")
2. Then revising using the critique as the specification

The intermediate critique step is load-bearing — it forces the model to identify the gap before filling it.

## Components

### Principle / Constitution
**Purpose:** The standard against which the output is evaluated. This is what makes CAI Critique-Revise different from generic improvement — there is a specific, articulated principle. Can be one principle or a small set.

**Examples:**
- "This response must not assume knowledge the reader hasn't stated they have"
- "All claims must be supported by reasoning or evidence — no assertions without backing"
- "The response must give the user agency to decide; it should not make decisions for them"
- "Plain language only: if a 12-year-old couldn't understand a sentence, rewrite it"
- "No hedging language ('might', 'could', 'perhaps') unless genuine uncertainty exists"

### Initial Generation
**Purpose:** The output to evaluate. Can be AI-generated or human-written.

### Critique Step
**Purpose:** Explicit evaluation of the output against the principle. The critique must be specific and quote the problematic passages.

**Critique trigger:** *"Identify specific ways in which the response above violates or falls short of the following principle: [principle]. Quote the specific passages that are problematic. Explain why each violates the principle."*

### Revision Step
**Purpose:** Rewrite the response to satisfy the principle. The revision should address every critique point.

**Revision trigger:** *"Revise the response to fully satisfy the principle. Address every critique point. Preserve all content that already satisfies the principle."*

### Iteration (optional)
**Purpose:** Run the critique-revise cycle again against the same principle (to catch remaining issues) or a different principle (multi-principle alignment).

## Template Structure

```
PRINCIPLE:
[State the specific standard the output must satisfy]

INITIAL OUTPUT:
[The output to evaluate — AI-generated or human-written]

CRITIQUE:
Identify specific ways the output above violates or falls short of
the principle stated above.
- Quote the specific passages that are problematic
- Explain precisely why each passage violates the principle
- Do not mention positives — focus only on failures

REVISION:
Rewrite the output to fully satisfy the principle.
- Address every critique point identified above
- Preserve all content that already meets the principle
- Do not introduce new violations
```

### Multi-Principle Version
```
PRINCIPLES:
P1: [First principle]
P2: [Second principle]
P3: [Third principle]

INITIAL OUTPUT:
[The output]

CRITIQUE — P1:
[Critique against P1]

CRITIQUE — P2:
[Critique against P2]

CRITIQUE — P3:
[Critique against P3]

REVISION:
Rewrite addressing all critique points across all three principles.
```

## Complete Examples

### Example 1: Plain Language Compliance

```
PRINCIPLE:
Plain language only. Every sentence must be understandable by someone
with no technical background. No jargon without immediate plain-language
definition. Maximum sentence length: 20 words.

INITIAL OUTPUT:
Our API leverages asynchronous microservice orchestration to facilitate
real-time event-driven data synchronization across distributed endpoints,
enabling seamless interoperability between heterogeneous enterprise systems.

CRITIQUE:
Identify every phrase that violates the plain language principle above.
Quote each problematic phrase and explain the violation.

REVISION:
Rewrite the description so a non-technical reader understands exactly
what the product does.
```

### Example 2: Evidence-Backed Claims

```
PRINCIPLE:
Every claim must be backed by reasoning, data, or an example.
No assertion may stand without support. Hedging language ("might",
"could") is acceptable only when genuine uncertainty exists.

INITIAL OUTPUT:
[Paste an analysis or recommendation]

CRITIQUE:
Identify every unsupported claim. Quote the specific assertion and
state what type of support is missing (reasoning, data, or example).

REVISION:
Rewrite adding appropriate support for every flagged claim.
If a claim cannot be supported, remove it or explicitly mark it
as an assumption.
```

### Example 3: User Agency Preservation

```
PRINCIPLE:
The response must preserve user agency. It may present options and
tradeoffs but must not make decisions for the user. The final choice
should always be explicitly left to the user with clear reasoning
for each option.

INITIAL OUTPUT:
[Paste an AI recommendation that made a firm choice for the user]

CRITIQUE:
Identify every place where the response makes a decision for the user
or removes their agency. Quote the specific passages.

REVISION:
Rewrite so the user has full information and clear options, but the
final decision remains with them.
```

### Example 4: Factual Precision

```
PRINCIPLE:
The response must distinguish between: (1) established facts,
(2) inferences based on evidence, and (3) speculation. Each claim
must be labeled accordingly. No mixing of categories without labels.

INITIAL OUTPUT:
[Paste a technical or analytical response]

CRITIQUE:
Identify claims that mix categories or present inferences as facts.
Quote each and categorize it.

REVISION:
Rewrite with explicit labeling: [FACT], [INFERENCE], [SPECULATION]
where appropriate.
```

## Best Use Cases

1. **Compliance and Standards Alignment**
   - Plain language requirements
   - Brand voice standards
   - Legal/regulatory language standards
   - Accessibility guidelines

2. **Quality Control Pipelines**
   - Automated review of AI outputs before publication
   - QA for customer-facing content
   - Documentation standards enforcement

3. **Bias and Fairness Checking**
   - Does this assume a particular demographic?
   - Does this perpetuate stereotypes?

4. **Epistemic Quality**
   - Are claims supported?
   - Is uncertainty appropriately flagged?
   - Is speculation distinguished from fact?

## Selection Criteria

**Choose CAI Critique-Revise when:**
- ✅ You have a specific, articulable principle to enforce
- ✅ The output needs alignment to a standard, not general improvement
- ✅ You want explicit documentation of what was wrong (audit trail)
- ✅ Compliance or quality gates apply

**Avoid when:**
- ❌ No specific principle — use Self-Refine for general quality
- ❌ You want the strongest opposing argument — use Devil's Advocate
- ❌ You want failure analysis — use Pre-Mortem

## CAI Critique-Revise vs. Self-Refine vs. CARE

| | CAI Critique-Revise | Self-Refine | CARE |
|---|---|---|---|
| Critique basis | Specific stated principle | Multi-dimensional quality | Rules defined upfront |
| Use case | Alignment to standard | General improvement | Constraint-governed creation |
| When applied | After generation | After generation | Before generation |
| Audit trail | Yes (critique is explicit) | Yes | No |

**Rule of thumb:** CARE sets rules *before* generation. CAI Critique-Revise enforces principles *after* generation. Self-Refine improves quality *after* generation without a specific standard.

## Quick Reference

| Component | Purpose |
|-----------|---------|
| Principle | The specific standard to enforce |
| Initial Output | The output to evaluate |
| Critique | Quote-specific violations of the principle |
| Revision | Rewrite satisfying all critique points |
