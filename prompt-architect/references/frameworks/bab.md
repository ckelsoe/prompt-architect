# BAB Framework

## Overview

BAB (Before, After, Bridge) is a transformation-focused framework ideal for rewrite, refactor, and conversion tasks. It explicitly defines the current state, the desired state, and asks for the path between them. Nothing in the standard framework set handles "change this into that" as cleanly as BAB.

## Components

### B - Before
**Purpose:** Describe the current state — what exists now, what's wrong with it, or what needs to change.

**Questions to Ask:**
- What is the current state?
- What problem does it have?
- What are the limitations?
- What does it look like right now?

**Examples:**
- "This function uses nested callbacks and is difficult to read..."
- "Our homepage copy is written for developers, not customers..."
- "This README is disorganized with no clear structure..."

### A - After
**Purpose:** Describe the desired end state — what it should look like once the transformation is complete.

**Questions to Ask:**
- What should the result look like?
- What qualities should it have?
- What problems should be solved?
- What does success look like?

**Examples:**
- "...should use async/await and be readable by a junior developer"
- "...should speak to non-technical buyers who care about outcomes"
- "...should have a clear structure with quick start and API docs sections"

### B - Bridge
**Purpose:** Describe how to get from Before to After — the approach, constraints, and rules for the transformation.

**Questions to Ask:**
- What rules govern the transformation?
- What must be preserved?
- What should be changed vs. left alone?
- Any constraints on approach?

**Examples:**
- "Preserve all existing functionality, only change syntax"
- "Keep the same information but reframe for a non-technical audience"
- "Maintain existing section content, just restructure the order and add missing sections"

## Template Structure

```
BEFORE:
[Current state — what exists, what's wrong, what needs to change]

AFTER:
[Desired state — what it should look like, qualities it should have]

BRIDGE:
[How to get there — transformation rules, constraints, what to preserve]
```

## Complete Examples

### Example 1: Code Refactoring

**Before BAB:**
"Refactor this code."

**After BAB:**
```
BEFORE:
This JavaScript function uses nested callbacks (callback hell) and is difficult
to read, test, and maintain. It fetches user data, then fetches their orders,
then fetches order details — all nested three levels deep.

AFTER:
The same logic implemented using async/await with proper error handling. Should
be readable by a junior developer who is comfortable with ES6+ but unfamiliar
with Promises. Each step should be clearly separated and independently testable.

BRIDGE:
- Preserve all existing functionality and API call structure
- Replace only the async pattern (callbacks → async/await)
- Add try/catch error handling at the top level
- Do not change variable names or data structures
- Add inline comments explaining the flow
```

### Example 2: Copy Rewrite

**Before BAB:**
"Rewrite our landing page."

**After BAB:**
```
BEFORE:
Our current homepage headline reads: "A robust, scalable event-driven
microservices orchestration platform." It was written by engineers for
engineers. Conversion rate is poor because our actual buyers are non-technical
operations managers.

AFTER:
A headline and 3-sentence description that immediately communicates business
value to an operations manager. Should answer "what problem does this solve
for me?" within the first 10 words. Should not use any technical jargon.

BRIDGE:
- Keep the core value proposition (automation, reliability, scale)
- Replace technical terms with business outcomes
- Use active voice and plain language
- Tone: confident, clear, outcome-focused
- Length: headline (8 words max) + 2-3 supporting sentences
```

### Example 3: Documentation Restructure

**Before BAB:**
"Fix our README."

**After BAB:**
```
BEFORE:
Our README starts with a 500-word technical architecture explanation. New
contributors can't find the quick start. There is no installation section —
setup instructions are buried in a wiki link. The API docs section is empty.

AFTER:
A README that a new contributor can use to be productive within 15 minutes.
Clear sections, scannable with headers, quick start in the first screen.

BRIDGE:
- Keep all existing content (do not delete information, only reorganize)
- Reorder sections: Overview → Quick Start → Installation → Usage → API → Contributing
- Move architecture explanation to a collapsible section or link to wiki
- Add a minimal API docs skeleton with TODO placeholders
- Add a table of contents at the top
```

### Example 4: Tone Transformation

**Before BAB:**
"Make this email sound better."

**After BAB:**
```
BEFORE:
This customer complaint response sounds defensive and shifts blame to the
customer. It uses passive voice and doesn't offer a clear resolution path.

AFTER:
A response that acknowledges the problem, takes responsibility, and gives the
customer a clear next step. Should feel warm, professional, and solution-focused.

BRIDGE:
- Keep the factual information (what happened, timeline)
- Remove defensive language and blame shifting
- Add an explicit apology in the first sentence
- End with a single, specific action item the customer should take
- Tone: empathetic but professional, not overly apologetic
- Length: match original (under 150 words)
```

## Best Use Cases

1. **Code Transformations**
   - Refactoring (callbacks → async/await, class → functional, etc.)
   - Language migration
   - Pattern replacement (e.g., raw SQL → ORM)

2. **Content Rewrites**
   - Tone changes (technical → business-friendly)
   - Audience shifts (developers → executives)
   - Style changes (formal → casual)

3. **Document Restructuring**
   - README reorganization
   - Proposal reformatting
   - Report restructuring

4. **Version Upgrades**
   - API migration guides
   - Framework upgrades
   - Standard/spec changes

5. **Communication Transforms**
   - Email tone adjustments
   - Feedback softening
   - Stakeholder translation

## Selection Criteria

**Choose BAB when:**
- ✅ You have existing content that needs transformation
- ✅ There is a clear current state and desired state
- ✅ Rules for transformation need to be explicit
- ✅ Something must be preserved while something else changes
- ✅ The task is "change this into that"

**Avoid BAB when:**
- ❌ Creating from scratch (no "before" exists) → use CO-STAR, RISEN, or RTF
- ❌ Reasoning through a problem → use Chain of Thought
- ❌ Need to specify audience, tone, style in detail → use CO-STAR
- ❌ Complex multi-step process → use RISEN

## Common Mistakes

1. **Vague Before**
   - Include specific details about current problems, not just "it's bad"
   - Quote actual content when possible

2. **Vague After**
   - Define success criteria explicitly
   - Include the audience/consumer of the result

3. **Missing Bridge Rules**
   - Always specify what must be preserved
   - Define constraints on the transformation approach
   - State what should NOT change

4. **Using BAB for Net-New Creation**
   - If there's no "before", use a different framework
   - BAB requires something to transform

## Quick Reference

| Component | Focus | Key Question |
|-----------|-------|--------------|
| Before | Current state | "What exists now / what's wrong?" |
| After | Desired state | "What should it become?" |
| Bridge | Transformation rules | "How do we get there?" |

## BAB vs. Other Frameworks

| Situation | Framework |
|---|---|
| Transform existing content | **BAB** |
| Create from scratch for an audience | CO-STAR |
| Simple task, no transformation | RTF / CTF |
| Multi-step process | RISEN |
| Reasoning through a problem | Chain of Thought |
