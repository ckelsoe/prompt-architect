# CAI Critique-Revise (Constitutional AI Critique-Revise Pattern)

## Overview

CAI Critique-Revise is a two-phase output improvement pattern derived from Anthropic's Constitutional AI methodology. A model generates an initial response, explicitly critiques it against a stated principle or standard, then revises the response to align with that principle. Unlike Self-Refine (which uses multi-dimensional quality feedback), CAI Critique-Revise is principle-driven: the critique is always measured against a specific, explicitly stated standard — a "constitution" of one or more principles.

**Research basis:** "Constitutional AI: Harmlessness from AI Feedback" (Bai et al., Anthropic, arXiv 2212.08073, 2022). Originally a training methodology; the critique-revise loop is directly usable as a prompting pattern. Key finding: generating an explicit critique before revising produces better alignment than asking for direct revision without a critique step. The effect is strongest for smaller models; the authors found no noticeable difference at 52B and retained critiques primarily for transparency into the model's reasoning.

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
**Purpose:** The output to evaluate. Can be AI-generated or human-written. This fills the template's `SOURCE MATERIAL` slot, and unlike in frameworks that generate from scratch, it is required — there is nothing to critique without it.

### Critique Step
**Purpose:** Explicit evaluation of the material against the principle. The critique must be specific and quote the problematic passages. It is the first of the template's two phases, and the framing paragraph exists to stop the model collapsing it into the rewrite.

**Critique trigger:** *"Before rewriting anything, identify the specific ways the material above violates or falls short of the principle. Quote the specific passages that are problematic. Explain precisely why each passage violates the principle."*

### Revision Step
**Purpose:** Rewrite the material to satisfy the principle. The revision should address every critique point.

**Revision trigger:** *"Then rewrite the material above so it fully satisfies the principle. Address every critique point identified above. Preserve all content that already satisfies the principle."*

### Iteration (optional)
**Purpose:** Run the critique-revise cycle again against the same principle (to catch remaining issues) or a different principle (multi-principle alignment).

## Template Structure

Section headers are stripped at emission, so every header's meaning is carried by
unbracketed prose that ships with the prompt. Do not reintroduce header-only structure.

The two-phase rule is stated once, in the opening framing paragraph, and the pasted
material is delimited by the `SOURCE MATERIAL:` block together with the anchor sentence
directly beneath it. That anchor sentence is what keeps the pasted text readable as
material to be critiqued rather than as instructions to follow — do not delete it while
keeping the block.

```
You are enforcing a stated principle against an existing piece of writing. This is a
two-phase task: write a critique, then write a revision. Do not skip the critique and go
straight to the rewrite, and do not merge the two.

PRINCIPLE:
The principle to enforce is this:
[State the standard the output must satisfy — one principle or a small set — as complete
sentences whose compliance a reader could check. Be precise and measurable.]

SOURCE MATERIAL:
[Paste the output to be critiqued here — AI-generated or human-written.]
Use the material above as the text to be critiqued and revised for the work described
below.

CRITIQUE:
Before rewriting anything, identify the specific ways the material above violates or falls
short of the principle.
- Quote the specific passages that are problematic
- Explain precisely why each passage violates the principle
- Focus only on failures against the principle, not general quality

REVISION:
Then rewrite the material above so it fully satisfies the principle.
- Address every critique point identified above
- Preserve all content that already satisfies the principle
- Do not introduce new violations
```

The slot is named `SOURCE MATERIAL`, not `INITIAL OUTPUT`, and it is not optional here —
unlike the same-named slot in frameworks that generate from scratch, this framework has
nothing to critique without it.

### Multi-Principle Version

Same shape as above. The principles are enumerated in the single `PRINCIPLE` slot with
stable labels, and the critique phase is run once per principle in the order they were
listed. The framing paragraph, the `SOURCE MATERIAL` anchor sentence, and the revision
prose are unchanged.

```
You are enforcing a set of stated principles against an existing piece of writing. This is
a two-phase task: write a critique, then write a revision. Do not skip the critique and go
straight to the rewrite, and do not merge the two.

PRINCIPLE:
The principles to enforce are the following, and only the following:
P1: [State the first standard as complete, checkable sentences.]
P2: [State the second one the same way.]
P3: [State the third one the same way.]
"P1", "P2" and "P3" are literal labels used by the critique below — keep them exactly as
written. [Add or remove P lines, then delete this line.]

SOURCE MATERIAL:
[Paste the output to be critiqued here — AI-generated or human-written.]
Use the material above as the text to be critiqued and revised for the work described
below.

CRITIQUE:
Before rewriting anything, work through the principles in order and, for each one
separately, identify the specific ways the material above violates or falls short of it.
Label each group of findings with the principle it belongs to.
- Quote the specific passages that are problematic
- Explain precisely why each passage violates that principle
- Focus only on failures against the principles, not general quality
- Where one passage violates more than one principle, say so under each

REVISION:
Then rewrite the material above so it fully satisfies every principle.
- Address every critique point identified above, across all principles
- Preserve all content that already satisfies the principles
- Do not introduce new violations
- Where two principles pull against each other, satisfy the earlier-listed one and say
  which trade-off you made
```

## Complete Examples

Every example below is shown in emitted form: the framing paragraph first, then each slot
carrying its own role in prose. Read the headers as scaffolding that will be deleted — the
examples are written so that nothing is lost when it is. Only the `SOURCE MATERIAL` block
keeps a `[...]` placeholder, because the text to be critiqued is the one thing the user
must supply.

### Example 1: Plain Language Compliance

```
You are enforcing a stated principle against an existing piece of writing. This is a
two-phase task: write a critique, then write a revision. Do not skip the critique and go
straight to the rewrite, and do not merge the two.

PRINCIPLE:
The principle to enforce is this:
Plain language only. Every sentence must be understandable by a reader with no technical
background. No jargon may appear without an immediate plain-language definition. No
sentence may exceed 20 words.

SOURCE MATERIAL:
Our API leverages asynchronous microservice orchestration to facilitate real-time
event-driven data synchronization across distributed endpoints, enabling seamless
interoperability between heterogeneous enterprise systems.
Use the material above as the text to be critiqued and revised for the work described
below.

CRITIQUE:
Before rewriting anything, identify the specific ways the material above violates or falls
short of the principle.
- Quote every phrase that is jargon, that stands undefined, or that carries a sentence
  past 20 words
- Explain precisely which part of the principle each quoted phrase breaks
- Focus only on failures against the principle, not general quality

REVISION:
Then rewrite the material above so it fully satisfies the principle.
- Address every critique point identified above
- Preserve all content that already satisfies the principle
- Do not introduce new violations
- State plainly what the product does; do not compensate for lost jargon with new
  abstraction
```

### Example 2: Evidence-Backed Claims

```
You are enforcing a stated principle against an existing piece of writing. This is a
two-phase task: write a critique, then write a revision. Do not skip the critique and go
straight to the rewrite, and do not merge the two.

PRINCIPLE:
The principle to enforce is this:
Every claim must be backed by reasoning, data, or an example. No assertion may stand
without support. Hedging language such as "might" or "could" is acceptable only where
genuine uncertainty exists, and the uncertainty must be named.

SOURCE MATERIAL:
[Paste the analysis or recommendation to be critiqued here.]
Use the material above as the text to be critiqued and revised for the work described
below.

CRITIQUE:
Before rewriting anything, identify the specific ways the material above violates or falls
short of the principle.
- Quote each unsupported assertion in full
- For each one, name which type of support is missing: reasoning, data, or example
- Quote separately any hedge that stands in for evidence rather than marking real
  uncertainty
- Focus only on failures against the principle, not general quality

REVISION:
Then rewrite the material above so it fully satisfies the principle.
- Address every critique point identified above
- Preserve all content that already satisfies the principle
- Do not introduce new violations
- Where a claim cannot be supported from the material given, either cut it or mark it
  explicitly as an assumption; do not invent supporting data
```

### Example 3: User Agency Preservation

```
You are enforcing a stated principle against an existing piece of writing. This is a
two-phase task: write a critique, then write a revision. Do not skip the critique and go
straight to the rewrite, and do not merge the two.

PRINCIPLE:
The principle to enforce is this:
The response must preserve the reader's agency. It may lay out options and their
trade-offs, but it must not make the decision for them. The final choice must be left to
the reader explicitly, with the reasoning for each option stated so the reader can weigh
them.

SOURCE MATERIAL:
[Paste the recommendation to be critiqued here — the one that made a firm choice on the
reader's behalf.]
Use the material above as the text to be critiqued and revised for the work described
below.

CRITIQUE:
Before rewriting anything, identify the specific ways the material above violates or falls
short of the principle.
- Quote every passage that settles the decision for the reader or narrows it to one option
- Explain precisely how each quoted passage removes the reader's choice
- Quote any option that is presented without the reasoning needed to weigh it
- Focus only on failures against the principle, not general quality

REVISION:
Then rewrite the material above so it fully satisfies the principle.
- Address every critique point identified above
- Preserve all content that already satisfies the principle
- Do not introduce new violations
- Keep every substantive recommendation intact as a stated option with its reasoning;
  preserving agency means returning the choice, not withholding the analysis
```

### Example 4: Factual Precision

```
You are enforcing a stated principle against an existing piece of writing. This is a
two-phase task: write a critique, then write a revision. Do not skip the critique and go
straight to the rewrite, and do not merge the two.

PRINCIPLE:
The principle to enforce is this:
The response must distinguish established fact from evidence-based inference and from
speculation. Every claim must be labeled as one of those three. No sentence may blend
categories without labeling each part.

SOURCE MATERIAL:
[Paste the technical or analytical response to be critiqued here.]
Use the material above as the text to be critiqued and revised for the work described
below.

CRITIQUE:
Before rewriting anything, identify the specific ways the material above violates or falls
short of the principle.
- Quote each claim that is unlabeled, mislabeled, or blends two categories in one sentence
- State which of the three categories each quoted claim actually belongs to, and why
- Focus only on failures against the principle, not general quality

REVISION:
Then rewrite the material above so it fully satisfies the principle.
- Address every critique point identified above
- Preserve all content that already satisfies the principle
- Do not introduce new violations
- Label every claim [FACT], [INFERENCE], or [SPECULATION], splitting any sentence that
  carries more than one category
- Do not promote a claim to a stronger category to avoid an awkward label
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

| Component | Template slot | Purpose |
|-----------|---------------|---------|
| Principle | `PRINCIPLE` | The specific standard to enforce |
| Initial Generation | `SOURCE MATERIAL` | The output to evaluate (required) |
| Critique | `CRITIQUE` | Quote-specific violations of the principle |
| Revision | `REVISION` | Rewrite satisfying all critique points |
