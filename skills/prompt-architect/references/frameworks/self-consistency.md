# Self-Consistency Framework

## Overview

Self-Consistency is a reasoning technique that replaces a single greedy answer with a majority vote over many independently sampled reasoning paths. Instead of asking the model to think step by step once and trust the result, you run the *same* prompt several times at non-zero temperature, collect the final answer from each run, and return the answer that appears most often. The reasoning inside each run still looks like Chain-of-Thought; what changes is that the decision is made across runs rather than within one. The insight is that a correct answer tends to be reachable by several different valid lines of reasoning, while the various ways of being wrong scatter — so agreement across independent samples is itself evidence.

When prompt-architect emits a Self-Consistency prompt, its framework section headers — `PROBLEM:` and `SOURCE MATERIAL:` — are stripped and the model receives a flat block. The solve instruction is written as a complete sentence so it survives on its own, and the `FINAL ANSWER: [answer]` line is a literal output label the model is being told to produce, not a section header, so it stays in place exactly as written. The optional `SOURCE MATERIAL` block holds the data the solution runs on and is deleted when the problem is self-contained.

**Origin:** "Self-Consistency Improves Chain of Thought Reasoning in Language Models" (Wang et al., arXiv 2203.11171, ICLR 2023). The abstract reports the technique's headline gain as a relative delta of **+17.9%** on GSM8K. The corresponding absolute figures — greedy Chain-of-Thought decoding at **56.5%** rising to **74.4%** with a majority vote over 40 sampled paths, using PaLM 540B — are **Table 1** body figures, not abstract figures. A notable finding: the plain, unweighted majority vote matched or beat every weighted aggregation scheme the authors tested, so there is no need to weight votes by probability or confidence.

## How This Framework Is Delivered

Self-Consistency is operational, not a single instruction: the gain comes from *sampling the same prompt N times and voting across the results*. A single pasted prompt cannot run itself N times, so no one prompt can perform the vote on its own. That constraint is handled honestly rather than hidden:

- **The emitted prompt** is a clean solve-prompt. It forces step-by-step reasoning and ends with a machine-parseable `FINAL ANSWER:` line so the outputs of separate runs can be lined up and tallied. It is a single-path prompt by design.
- **The skill's ANALYSIS section** is where the user is told to run that prompt N times at non-zero temperature and take the majority vote *externally* — in a script, a notebook, or by hand. The voting lives outside the model.

Do not pretend one prompt does the voting. Stating plainly that the aggregation happens outside the model is a feature: it is what keeps the technique faithful to the paper instead of collapsing it into something weaker.

## Components

### The Solve Prompt (emitted)
**Purpose:** Produce one full reasoning path and one cleanly extractable answer. The prompt demands step-by-step work — the diversity of reasoning across runs is the whole engine, so each run must actually reason rather than guess — and pins the answer to a fixed `FINAL ANSWER: [answer]` line so a program can find it identically in every sample.

**What it must contain:**
- A complete solve instruction that survives header stripping ("Solve the problem above. Work through it step by step…").
- The exact terminal line `FINAL ANSWER: [answer]`, with nothing else on that line, so every run's answer sits in the same parseable position.
- Optionally, a `SOURCE MATERIAL` block naming the data the solution runs on.

### The Sampling Parameters (analysis-side)
**Purpose:** Generate the independent reasoning paths. The paper samples **40**; in practice **5-10** is usually enough to see the benefit. Sampling must be at **non-zero temperature** — **~0.7** is a reasonable default — because temperature 0 collapses every run to the same greedy path and destroys the diversity the vote depends on.

### The Aggregation (analysis-side)
**Purpose:** Turn N answers into one. Extract the `FINAL ANSWER:` value from each sample, count how often each distinct answer appears, and return the most frequent one. This is a **plain, unweighted majority vote** — not a confidence-weighted or probability-weighted scheme, both of which the authors found no better. A near-tie is a signal of genuine uncertainty, not an invitation to ask the model to break the tie.

## Template Structure

Section headers — `PROBLEM:` and `SOURCE MATERIAL:` — are stripped at emission, so the solve instruction that follows is written as a complete sentence and survives on its own. The `FINAL ANSWER:` line is a literal output label, not a header, and survives verbatim. The `SOURCE MATERIAL` block is optional and is deleted when the problem already states every value needed.

```
PROBLEM:
[Your question, calculation, or reasoning problem]

SOURCE MATERIAL:
[Optional — paste the problem data the solution runs on here (the word problem, dataset, table, figures, or constraint list). Delete this line and the one below it if the problem above already states every value needed.]
The figures and constraints in the material above are authoritative — extract from them rather than from assumed or recalled values.

Solve the problem above. Work through it step by step, showing your reasoning
at each stage. When you reach an answer, state it on its own line, in exactly
this form and with nothing else on that line:

FINAL ANSWER: [answer]
```

## Complete Examples

Every example below is shown in emitted form: the solve instruction and the `FINAL ANSWER:` line are the same in each — they are what survives header stripping. Where the reasoning runs on a pasted dataset or constraint list, the `SOURCE MATERIAL` block carries it and the problem refers to "the problem above"; where every value is already in the problem statement, that block is deleted. In every case the emitted artifact is a single-path solve-prompt, and the vote is run afterward per the analysis note.

### Example 1: Math / Word Problem

**Before Self-Consistency:**
"A shipment has 3 crates of 24 units and 5 crates of 18 units. If 12% are defective, how many good units are there?"

**After Self-Consistency** (no source material — every value is stated in the problem, so the `SOURCE MATERIAL` block is deleted):
```
PROBLEM:
A shipment has 3 crates of 24 units and 5 crates of 18 units. 12% of all
units are defective. How many good (non-defective) units are there?

Solve the problem above. Work through it step by step, showing your reasoning
at each stage. When you reach an answer, state it on its own line, in exactly
this form and with nothing else on that line:

FINAL ANSWER: [answer]
```

**Analysis note handed to the user:** Run this prompt 5-10 times at temperature ~0.7. Extract each run's `FINAL ANSWER:` value, count them, and return the most frequent. If two answers tie, treat that as real uncertainty and inspect the reasoning rather than asking the model to pick.

### Example 2: Logic / Reasoning Over Pasted Constraints

**Before Self-Consistency:**
"Given these seating constraints, who sits in seat 3?"

**After Self-Consistency** (source material supplied):
```
PROBLEM:
Determine who sits in seat 3, working only from the constraints in the
problem above.

SOURCE MATERIAL:
[Paste the full list of seating constraints — people, seats, and adjacency rules — here]
The figures and constraints in the material above are authoritative — extract from them rather than from assumed or recalled values.

Solve the problem above. Work through it step by step, showing your reasoning
at each stage. When you reach an answer, state it on its own line, in exactly
this form and with nothing else on that line:

FINAL ANSWER: [answer]
```

### Example 3: Business Calculation

**Before Self-Consistency:**
"If CAC is $1,200, MRR per customer is $150, and gross margin is 70%, what's the payback period in months?"

**After Self-Consistency** (no source material — every value is stated, so the `SOURCE MATERIAL` block is deleted):
```
PROBLEM:
Customer Acquisition Cost (CAC): $1,200. Average MRR per customer: $150.
Gross margin: 70%. What is the payback period in months?

Solve the problem above. Work through it step by step, showing your reasoning
at each stage. When you reach an answer, state it on its own line, in exactly
this form and with nothing else on that line:

FINAL ANSWER: [answer]
```

Because a payback-period calculation admits several valid routes — dividing CAC by gross-margin-adjusted MRR, or building up contribution month by month — Self-Consistency is well suited here: independent runs that reach the same number through different arithmetic reinforce the result, and a run that fumbles the margin adjustment is outvoted.

## Best Use Cases

1. **High-Stakes Single Answers**
   - Numerical problems where one wrong step flips the result
   - Financial calculations where accuracy is worth the extra compute
   - Answers you will act on and cannot easily re-check by hand

2. **Problems With Multiple Valid Solution Routes**
   - Word problems solvable by more than one method
   - Logic puzzles with several deduction orders
   - Any task where convergent independent reasoning is meaningful evidence

3. **When Greedy Chain-of-Thought Is Almost Right**
   - Prior single-path CoT gave inconsistent answers across attempts
   - The model clearly can solve it but sometimes slips
   - You can afford N samples and want to buy down the error rate

4. **Discrete, Comparable Answers**
   - The final answer is a number, a label, or a short choice that can be compared for equality across runs and tallied

## Selection Criteria

**Choose Self-Consistency when:**
- ✅ The answer is discrete and comparable across runs (a number, a category, a choice)
- ✅ You can sample the prompt multiple times at non-zero temperature
- ✅ You can aggregate the results outside the model (script, notebook, or by hand)
- ✅ Accuracy justifies spending N times the compute of a single run
- ✅ Single-path CoT is close but not reliable enough

**Avoid Self-Consistency when:**
- ❌ You can only run the prompt once → use Chain-of-Thought instead
- ❌ The output is open-ended prose with no comparable "final answer" to vote on
- ❌ The task needs to explore and keep branching structure → use Tree of Thought
- ❌ The problem must be decomposed into dependent sub-problems → use Least-to-Most
- ❌ You need explicit variable extraction and planning within one run → use Plan-and-Solve

## Self-Consistency vs. Chain-of-Thought vs. Tree of Thought

Chain-of-Thought is the single-path neighbor of Self-Consistency: they use the *same* kind of step-by-step reasoning prompt. The distinction is entirely in how the answer is chosen. CoT commits to one path (typically greedy); Self-Consistency samples many CoT paths and lets them vote. Tree of Thought is different again — it explores and prunes a branching search *within* a single run rather than voting across independent runs.

| | Chain-of-Thought | Self-Consistency | Tree of Thought |
|---|---|---|---|
| Reasoning paths | One | Many, independently sampled | One branching search |
| Temperature | Any (often greedy) | Non-zero (~0.7) required | Any |
| How the answer is chosen | The single run's output | Majority vote across runs | Best surviving branch |
| Aggregation location | None | Outside the model | Inside the run |
| Runs needed | 1 | N (5-10 typical; 40 in paper) | 1 |
| Best for | General step-by-step reasoning | Discrete answers worth N-fold compute | Problems needing lookahead/backtracking |

## Common Mistakes

1. **Asking the model to vote on itself**
   - Self-Consistency is *not* asking the model to generate several approaches in one response and then judge which it likes best. That is self-assessment — a different and weaker technique, because the model is not a reliable judge of its own reasoning. The vote must happen across independent runs, outside the model.

2. **Sampling at temperature 0**
   - Greedy decoding produces the same path every time, so N identical runs vote unanimously for one answer and the method reduces to plain CoT with wasted compute. Sampling must be at non-zero temperature.

3. **Weighting the votes**
   - The paper found an unweighted majority vote matched or beat every weighted scheme tested. Confidence- or probability-weighting adds complexity for no gain.

4. **Omitting or reformatting the FINAL ANSWER line**
   - If runs end their answers differently, they cannot be extracted and compared programmatically. The `FINAL ANSWER: [answer]` line must appear verbatim, alone on its line, in every run.

5. **Forcing a tie-break**
   - A near-tie means genuine uncertainty. Asking the model to break it discards the very signal the method surfaced; inspect the split reasoning instead.

## Quick Reference

| Component | Location | Purpose |
|-----------|----------|---------|
| Solve prompt | Emitted | One reasoning path plus a parseable `FINAL ANSWER:` line |
| Step-by-step instruction | Emitted | Forces reasoning so independent paths diverge meaningfully |
| Sampling (N, temperature) | Analysis-side | Generate independent paths; N≈5-10 (40 in paper), temp ~0.7 |
| Aggregation | Analysis-side | Plain unweighted majority vote over extracted answers |
| Tie handling | Analysis-side | Treat near-ties as uncertainty, not as a prompt to break the tie |
