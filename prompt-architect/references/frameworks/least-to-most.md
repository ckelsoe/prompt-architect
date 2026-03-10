# Least-to-Most (LtM) Prompting

## Overview

Least-to-Most (LtM) prompting is a decomposition-first framework that breaks a complex problem into an ordered sequence of simpler subproblems, then solves them sequentially — using each prior answer as context for the next. Unlike Chain of Thought (which reasons through a problem in one pass), LtM explicitly separates decomposition from execution, and the subproblems are sequenced from simplest to most complex.

**Research basis:** "Least-to-Most Prompting Enables Complex Reasoning in Large Language Models" (Zhou et al., Google Brain, arXiv:2205.10625, ICLR 2023). On SCAN compositional generalization: LtM achieves 99.7% vs. CoT's 16%. On GSM8K math: matches or exceeds CoT with fewer errors.

## Why LtM Differs from Chain of Thought

| | Chain of Thought | Least-to-Most |
|---|---|---|
| Structure | Single-pass linear reasoning | Explicit decompose → solve sequence |
| Decomposition | Implicit (within the chain) | Explicit first step |
| Subproblem order | Not explicitly structured | Simplest → most complex |
| Answer reuse | May or may not reference prior steps | Each answer feeds explicitly into the next |
| Best for | Known procedure, moderate complexity | Compositional tasks, building-block problems |

## Components

### Phase 1: Decomposition
**Purpose:** Break the original problem into an ordered list of subproblems, from simplest to most complex. The key: later subproblems should build on earlier ones.

**Trigger:** "To solve [problem], we need to first solve: [list subproblems in order]"

**Questions to Ask:**
- What is the simplest thing that must be true before we can answer the full question?
- What building blocks does the final answer depend on?
- What is the correct ordering — which must come first?

### Phase 2: Sequential Solving
**Purpose:** Solve each subproblem in order, explicitly using prior answers as context.

**Pattern:** Answer subproblem 1 → use that answer when solving subproblem 2 → use both when solving subproblem 3 → ... → solve original problem.

## Template Structure

```
PROBLEM:
[The full, complex problem to solve]

DECOMPOSE:
Break this problem into ordered subproblems, from simplest to most complex.
Each later subproblem should build on the answer to the previous.

Subproblem 1: [Simplest prerequisite]
Subproblem 2: [Next level, may depend on #1]
Subproblem 3: [More complex, depends on #1-2]
...
Final: [The original problem, now solvable using all prior answers]

SOLVE SEQUENTIALLY:
Solve each subproblem in order. Use prior answers as context for each
subsequent subproblem. Show each solution before moving to the next.
```

### Single-Pass Trigger (model decomposes and solves itself):
```
To solve the following problem, first identify the simpler subproblems
that must be solved first (from least to most complex). Then solve each
in sequence, using prior answers as context. Show decomposition, then
sequential solutions.

Problem: [your problem]
```

## Complete Examples

### Example 1: Multi-Hop Reasoning

**Before LtM:**
"What would the tax implications be for a US remote employee working from Portugal for 3 months?"

**After LtM:**
```
PROBLEM:
What are the tax implications for a US citizen employed by a US company who
works remotely from Portugal for 3 months in one calendar year?

DECOMPOSE:
Subproblem 1: What are the US tax rules for citizens earning income abroad
(general principles, FEIE, FTC)?

Subproblem 2: What is Portugal's tax rule for foreigners working there —
specifically the threshold for establishing tax residency?

Subproblem 3: Does 3 months in Portugal trigger Portuguese tax residency?
(Use answers from 1 and 2)

Subproblem 4: If both US and Portuguese tax obligations potentially apply,
what does the US-Portugal tax treaty say about double taxation?

Final: Given the above, what are the practical tax implications and what
should the employee do?

SOLVE SEQUENTIALLY:
[Solve in order, each answer informing the next]
```

### Example 2: Code Architecture

**Before LtM:**
"How do I add real-time notifications to my Django app?"

**After LtM:**
```
PROBLEM:
I need to add real-time push notifications to a Django app with PostgreSQL.
Users should receive browser notifications when certain database records change.

DECOMPOSE:
Subproblem 1: What are the available mechanisms for real-time browser
communication in Django? (WebSockets, SSE, polling — trade-offs)

Subproblem 2: For the chosen mechanism, what Django-specific libraries
and setup are required?

Subproblem 3: How do we detect database record changes and trigger
notifications? (Django signals, PostgreSQL LISTEN/NOTIFY, or polling)

Subproblem 4: How do we route a database event → notification trigger →
connected browser client?

Final: What is the complete implementation plan and any gotchas?

SOLVE SEQUENTIALLY:
[Solve in order]
```

### Example 3: Business Analysis

**Before LtM:**
"Should we expand to the European market?"

**After LtM:**
```
PROBLEM:
Our B2B SaaS has strong US traction. Should we expand to the European market
now, given our current 20-person team and 18 months of runway?

DECOMPOSE:
Subproblem 1: What are the key differences between US and European B2B SaaS
markets that affect a US-native product? (GDPR, sales cycles, localization needs)

Subproblem 2: What resources are typically required for a credible EU market entry?
(team, timeline, cost estimates)

Subproblem 3: What are the signals that a company is or isn't ready for
international expansion?

Subproblem 4: Given our specific constraints (20 people, 18 months runway),
how do our resources map to those requirements?

Final: Should we expand to Europe now, wait, or explore a different
expansion approach? With clear reasoning from the above.

SOLVE SEQUENTIALLY:
[Solve each in order, carry answers forward]
```

## Best Use Cases

1. **Compositional Reasoning**
   - Multi-hop questions requiring chained facts
   - Problems where the answer depends on several intermediate results
   - Any question with "it depends on X, which depends on Y"

2. **Complex Technical Problems**
   - Architecture decisions with prerequisites
   - Debugging with unknown root cause
   - Implementation planning with dependencies

3. **Multi-Domain Questions**
   - Questions spanning legal + technical, financial + operational, etc.
   - Any question where different areas of knowledge must be combined

4. **Long Math / Calculation Chains**
   - Financial projections with multiple steps
   - Physics problems with multiple formulas
   - Anything where intermediate errors cascade

5. **When Chain of Thought Keeps Failing**
   - LtM's explicit decomposition reduces error propagation
   - If CoT gives wrong answers, decomposing first often helps

## Selection Criteria

**Choose LtM when:**
- ✅ Problem has multiple prerequisite subproblems
- ✅ Subproblems have a natural ordering (simplest first)
- ✅ Each answer genuinely builds on the previous
- ✅ CoT gives shallow or wrong answers on this type of question
- ✅ Decomposition is non-trivial (question is compositional)

**Avoid LtM when:**
- ❌ Problem is simple and self-contained → use CoT or APE
- ❌ No natural decomposition exists → use Tree of Thought instead
- ❌ Subproblems are independent (no ordering needed) → use SoT or ToT
- ❌ Content creation task → use CO-STAR or BAB

## Common Mistakes

1. **Subproblems That Don't Build**
   - Each subproblem should be a prerequisite for the next
   - If they're independent, that's SoT or Tree of Thought, not LtM

2. **Wrong Ordering**
   - More complex ≠ later; it's about dependency, not complexity per se
   - "What is X?" must come before "Given X, what is Y?"

3. **Not Carrying Answers Forward**
   - The key to LtM is that each answer is explicitly used in the next step
   - Don't solve subproblems in isolation

4. **Using LtM When CoT Is Sufficient**
   - If the problem has one reasoning path, CoT is simpler
   - LtM overhead is only worth it for genuinely compositional problems

## Quick Reference

| Phase | Purpose | Key Question |
|-------|---------|--------------|
| Decompose | Order the subproblems | "What must I know first?" |
| Solve (simplest) | Build the foundation | "What's the answer to this piece?" |
| Solve (sequentially) | Build on prior answers | "Given what we know, what's next?" |
| Final solve | Assemble the answer | "Now that I have all pieces, what's the answer?" |
