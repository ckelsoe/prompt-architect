# Self-Refine Framework

## Overview

Self-Refine is an iterative output improvement framework where a single model acts as its own generator, critic, and refiner — with no external training, no additional models, and no labeled data required. The core loop: generate an initial output → produce specific, actionable feedback → refine using that feedback → repeat until a stopping criterion is met.

**Research basis:** "Self-Refine: Iterative Refinement with Self-Feedback" (Madaan et al., arXiv 2303.17651, NeurIPS 2023). Tested across 7 task types — improvement of 5-40% over single-pass generation from GPT-3.5 and GPT-4. Humans preferred Self-Refined outputs in blind evaluation. Project site: selfrefine.info.

## The Core Loop

```
GENERATE → FEEDBACK → REFINE → [repeat] → STOP
```

Each phase:
1. **Generate**: Produce an initial output (can be your first draft or AI-generated)
2. **Feedback**: Analyze the output for specific, actionable weaknesses across defined dimensions
3. **Refine**: Rewrite addressing every feedback point — with the feedback visible as context
4. **Stop**: When quality threshold met, max iterations reached, or feedback says "looks good"

**Key insight:** Maintaining a history of previous outputs + feedback in context prevents regression and helps the model track progress across iterations.

## Components

### Initial Output
**Purpose:** The starting point. Can be a first AI generation or something you've already written that needs improvement.

### Feedback Dimensions
**Purpose:** The specific aspects to evaluate. Defining these explicitly produces much better critiques than asking for generic feedback.

**Common dimensions by task type:**
- **Code**: correctness, efficiency, readability, edge cases, error handling
- **Writing**: clarity, structure, tone, specificity, conciseness, audience fit
- **Reasoning**: logical validity, completeness, unsupported claims, missed considerations
- **Plans/strategies**: feasibility, completeness, risks, measurability

### Refinement Instruction
**Purpose:** Directs the model to rewrite addressing every feedback point, using the critique as a direct specification.

### Stop Condition
**Purpose:** When to stop iterating. Options:
- Fixed iterations (e.g., "run 2 refinement cycles")
- Quality signal ("stop when feedback has no major issues")
- Manual review (you decide when it's good enough)

## Template Structure

### Single Cycle (most common)
```
INITIAL OUTPUT:
[Paste the output to improve, or ask the AI to generate a first draft]

FEEDBACK DIMENSIONS:
Review the output above for:
1. [Dimension 1 — e.g., "Clarity: Is every sentence clear and unambiguous?"]
2. [Dimension 2 — e.g., "Completeness: What important points are missing?"]
3. [Dimension 3 — e.g., "Tone: Is the voice appropriate for the audience?"]
4. [Dimension 4 — add as needed]

For each dimension: identify specific problems with quoted examples,
explain why each is a problem, and suggest concrete improvements.

REFINEMENT:
Now rewrite the output addressing every point of your feedback.
Show the refined version only (no commentary).
```

### Multi-Cycle with History
```
ITERATION 1:
[Generate initial output or paste existing]

ITERATION 1 FEEDBACK:
Analyze for [dimensions]. Be specific and actionable.

ITERATION 2:
Rewrite addressing all feedback above.
[AI produces refined version]

ITERATION 2 FEEDBACK:
Analyze the refined version for any remaining issues.

ITERATION 3 (if needed):
Rewrite addressing remaining issues.

STOP when feedback says "no major issues remaining."
```

### Self-Refine as a Single Compound Prompt
```
TASK: [What you want to produce]

GENERATE: Write an initial [output type] for the above.

FEEDBACK: Review your output for: [dimension 1], [dimension 2], [dimension 3].
List specific issues with quoted examples and concrete suggestions.

REFINE: Rewrite addressing all feedback. Show only the final refined version.
```

## Complete Examples

### Example 1: Code Review and Improvement

```
INITIAL OUTPUT:
def get_user_data(user_id):
    db = connect_to_database()
    result = db.query(f"SELECT * FROM users WHERE id = {user_id}")
    return result

FEEDBACK DIMENSIONS:
Review for:
1. Security: Any injection vulnerabilities or unsafe patterns?
2. Error handling: What happens if the DB is unavailable or user doesn't exist?
3. Resource management: Are connections properly managed?
4. Code quality: Any Python best practices violations?

REFINEMENT:
Rewrite the function addressing all feedback points.
```

### Example 2: Writing Improvement

```
INITIAL OUTPUT:
[Paste a paragraph or email draft]

FEEDBACK DIMENSIONS:
Review for:
1. Clarity: Any sentences that are ambiguous or require re-reading?
2. Conciseness: What can be cut without losing meaning?
3. Opening: Does the first sentence earn the reader's attention?
4. Call to action: Is the desired reader action explicit and easy to take?

REFINEMENT:
Rewrite addressing every point. Match the original length or shorter.
```

### Example 3: Strategic Plan

```
INITIAL OUTPUT:
[Paste a strategy or plan]

FEEDBACK DIMENSIONS:
Review for:
1. Completeness: What important scenarios or stakeholders are not addressed?
2. Feasibility: Which actions assume resources or capabilities we may not have?
3. Measurability: Which outcomes have no defined success metric?
4. Risk: What's the biggest single point of failure?

REFINEMENT:
Revise the plan addressing all feedback. Add a risk mitigation note for the
biggest single point of failure identified.
```

## Best Use Cases

1. **Any Output Quality Improvement**
   - Code, writing, plans, analysis, summaries
   - When the first draft is never the final draft

2. **Domain-Specific Quality Gates**
   - Code correctness + security
   - Medical/legal content accuracy
   - Brand voice compliance

3. **Iterative Document Refinement**
   - Proposals, reports, documentation
   - Any output where multiple review dimensions apply

4. **Self-QA Before Submitting**
   - Run Self-Refine before using any AI output in high-stakes contexts

## Selection Criteria

**Choose Self-Refine when:**
- ✅ You have an output that needs improvement
- ✅ Multiple quality dimensions apply
- ✅ The first pass is rarely final
- ✅ You want systematic critique, not just vague "make it better"

**Avoid when:**
- ❌ You need a specific type of critique → use CAI Critique-Revise (principle-based) or Devil's Advocate (opposing argument)
- ❌ Task is brand new (nothing to refine yet) → generate first, then Self-Refine
- ❌ Simple task → direct prompt is faster

## Self-Refine vs. Similar Frameworks

| | Self-Refine | CAI Critique-Revise | BAB | Chain of Density |
|---|---|---|---|---|
| Direction | Any output → improvement | Output vs. explicit principle | Before state → after state | Content → denser compression |
| Critique type | Multi-dimensional quality | Principle-aligned alignment | Transformation rules | Density/information |
| Iterations | Configurable loop | One cycle (or more) | Single transform | N passes |
| Best for | General quality improvement | Alignment/compliance | Rewriting existing content | Summarization |

## Quick Reference

| Phase | Purpose | Key Question |
|-------|---------|--------------|
| Generate | Initial output | "What's a first pass?" |
| Feedback | Specific critique | "What's wrong and why?" |
| Refine | Improved version | "Fix every problem found" |
| Stop | Termination | "Is it good enough?" |
