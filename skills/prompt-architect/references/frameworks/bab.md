# BAB Framework

## Overview

BAB (Before, After, Bridge) is a transformation-focused framework ideal for rewrite, refactor, and conversion tasks. It explicitly defines the current state, the desired state, and asks for the path between them. Nothing in the standard framework set handles "change this into that" as cleanly as BAB.

**Origin:** Predates LLMs as a direct-response copywriting formula. The earliest verified dated appearance is Kevan Lee's "27 Best Copywriting Formulas" (Buffer blog, 13 October 2014), which lists Before-After-Bridge as formula #1 and — unlike the other formulas in that article, which it credits to named copywriters such as Bob Stone — presents it as already-common property with no attributed author. No individual coiner has been verified. Its use in prompt engineering is a later community adaptation of the copywriting formula.

## Components

### B - Before
**Purpose:** Describe the current state — what exists now, what's wrong with it, or what needs to change.

**Questions to Ask:**
- What is the current state?
- What problem does it have?
- What are the limitations?
- What does it look like right now?

**Examples** (complete sentences, not bare noun phrases):
- "The function above nests three fetch calls as callbacks, so the control flow is hard to follow and no step can be tested on its own."
- "The homepage copy above is written for developers rather than for the operations managers who actually buy the product."
- "The README above has no section headers and buries the setup instructions behind a wiki link."

### A - After
**Purpose:** Describe the desired end state — what it should look like once the transformation is complete.

**Questions to Ask:**
- What should the result look like?
- What qualities should it have?
- What problems should be solved?
- What does success look like?

**Examples** (complete sentences, not bare noun phrases):
- "The same logic implemented with async/await, readable by a junior developer who has not worked with Promises."
- "Copy that speaks to non-technical buyers in terms of the outcomes they care about."
- "A README with a clear structure, a quick start on the first screen, and a populated API docs section."

### B - Bridge
**Purpose:** Describe how to get from Before to After — the approach, constraints, and rules for the transformation.

**Questions to Ask:**
- What rules govern the transformation?
- What must be preserved?
- What should be changed vs. left alone?
- Any constraints on approach?

**Examples** (each a self-contained imperative carrying its own verb):
- "Preserve all existing functionality and change only the syntax."
- "Keep the same information but reframe it for a non-technical audience."
- "Maintain the existing section content; restructure the order and add the missing sections."
- *Prohibitions take explicit "Do not…" / "Never…" form:* "Do not rename any variable." / "Never introduce a new dependency."

## Template Structure

Section headers are stripped at emission, so every header's meaning is carried by the
unbracketed prose that ships inside each slot rather than by the label above it. Do not
reintroduce header-only structure.

Two elements of the shipped template are not framework components. The leading
`SOURCE MATERIAL` block holds the artifact being transformed and is **not optional here** —
BAB requires something to transform, so unlike the source-material slot in other templates
it is never deleted. The closing `Now …` line restates the transformation as an imperative
so the prompt ends with an instruction rather than with a list of constraints.

```
SOURCE MATERIAL:
[Paste the artifact to be transformed here — the artifact itself, never a description of it.
Name it concretely and keep it bracketed for the user to fill in, e.g. "[Paste the current
job posting here]".]
Use the material above as the material to be transformed for the work described below.

BEFORE:
This is the state that material is in now, and why it must change:
[Describe the current state in complete sentences, not a bare noun phrase. Say what exists
now, what is wrong with it, and what needs to change. Quote the material above wherever a
specific flaw is visible in it.]

AFTER:
This is what it must become once the transformation is complete:
[Describe the desired end state in complete sentences. Cover the qualities the result must
have and the criteria that make it successful. Name the audience only if the user identified
one; otherwise leave "[you fill this in: who will read the result]".]

BRIDGE:
Follow these rules when carrying out the transformation:
[State each rule as a self-contained imperative carrying its own verb — "Preserve every salary
and benefits detail exactly as written", not "salary details". Write prohibitions as
"Do not…" or "Never…". Cover:
- What must be preserved unchanged, and what should change
- Any constraint on approach, style, tone, length, or format]

Now [state the transformation as an imperative naming the material, e.g. "rewrite the job
posting above"].
```

## Complete Examples

Every example below is shown in emitted form: the source material first, then each slot
carrying its own role in prose, then the closing imperative. Read the headers as scaffolding
that will be deleted — the examples are written so that nothing is lost when it is.

### Example 1: Code Refactoring

**Before BAB:**
"Refactor this code."

**After BAB:**
```
SOURCE MATERIAL:
[Paste the JavaScript function to be refactored here]
Use the material above as the material to be transformed for the work described below.

BEFORE:
This is the state that material is in now, and why it must change:
The function above fetches user data, then that user's orders, then the details for
each order, with the three calls nested inside one another as callbacks. The nesting
makes the control flow hard to follow, error handling is repeated separately at every
level, and no individual step can be tested on its own.

AFTER:
This is what it must become once the transformation is complete:
The same logic implemented with async/await, with each of the three fetch steps clearly
separated and independently testable, and with error handling consolidated in one place
rather than repeated per level. The result must be readable by a junior developer who is
comfortable with ES6+ syntax but has not worked with Promises.

BRIDGE:
Follow these rules when carrying out the transformation:
- Preserve every existing behavior, along with the sequence and shape of the API calls, exactly as written.
- Replace only the asynchronous pattern, converting the nested callbacks to async/await.
- Add a single try/catch at the top level that covers all three fetch steps.
- Do not rename any variable and do not change any data structure.
- Add one inline comment per fetch step stating what that step retrieves.

Now rewrite the JavaScript function above.
```

### Example 2: Copy Rewrite

**Before BAB:**
"Rewrite our landing page."

**After BAB:**
```
SOURCE MATERIAL:
[Paste the current homepage headline and body copy here]
Use the material above as the material to be transformed for the work described below.

BEFORE:
This is the state that material is in now, and why it must change:
The headline above reads "A robust, scalable event-driven microservices orchestration
platform." It was written by engineers for engineers, and it names the architecture
rather than the problem the product solves. Our actual buyers are non-technical
operations managers, and conversion on this page is poor.

AFTER:
This is what it must become once the transformation is complete:
A headline plus a three-sentence description that communicates business value to a
non-technical operations manager. The reader must be able to answer "what problem does
this solve for me?" from the first ten words alone, without knowing what a microservice
is.

BRIDGE:
Follow these rules when carrying out the transformation:
- Preserve the core value proposition of automation, reliability, and scale.
- Replace every technical term with the business outcome it produces.
- Write in active voice and plain language.
- Keep the tone confident, clear, and outcome-focused.
- Limit the headline to 8 words and the supporting copy to 2-3 sentences.
- Do not use technical jargon anywhere in the result.

Now rewrite the homepage headline and body copy above.
```

### Example 3: Documentation Restructure

**Before BAB:**
"Fix our README."

**After BAB:**
```
SOURCE MATERIAL:
[Paste the current README here]
Use the material above as the material to be transformed for the work described below.

BEFORE:
This is the state that material is in now, and why it must change:
The README above opens with a 500-word technical architecture explanation, so a new
contributor cannot find the quick start without scrolling past it. There is no
installation section — setup instructions exist only behind a wiki link — and the API
docs section is present but empty.

AFTER:
This is what it must become once the transformation is complete:
A README that a new contributor can follow to a working local setup within 15 minutes,
organized into clearly headed sections that can be scanned rather than read, with the
quick start visible on the first screen.

BRIDGE:
Follow these rules when carrying out the transformation:
- Preserve all existing content; reorganize it rather than deleting any information.
- Order the sections as Overview, Quick Start, Installation, Usage, API, Contributing.
- Move the architecture explanation into a collapsible section or replace it with the wiki link.
- Add a minimal API docs skeleton with TODO placeholders where content is missing.
- Add a table of contents at the top.

Now restructure the README above.
```

### Example 4: Tone Transformation

**Before BAB:**
"Make this email sound better."

**After BAB:**
```
SOURCE MATERIAL:
[Paste the draft response to the customer complaint here]
Use the material above as the material to be transformed for the work described below.

BEFORE:
This is the state that material is in now, and why it must change:
The draft above reads as defensive and shifts blame onto the customer. It states what
happened in passive voice, and it closes without telling the customer what will happen
next or what they should do.

AFTER:
This is what it must become once the transformation is complete:
A response that acknowledges the problem, takes responsibility for it, and gives the
customer one clear next step. It must read as warm, professional, and focused on
resolving the issue.

BRIDGE:
Follow these rules when carrying out the transformation:
- Preserve the factual account of what happened and the timeline exactly as given.
- Open with an explicit apology in the first sentence.
- Close with a single specific action item for the customer.
- Remove all defensive language and every statement that assigns blame to the customer.
- Keep the tone empathetic but professional, and do not over-apologize.
- Match the original length and stay under 150 words.

Now rewrite the customer complaint response above.
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
