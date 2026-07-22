# RACE Framework

## Overview

RACE (Role, Action, Context, Expectation) is a medium-complexity framework that sits between RTF's simplicity and CO-STAR's richness. It adds two critical improvements over RTF: situational context (missing from RTF) and an explicit expectation of success (missing from both RTF and CTF). RACE is ideal when you need all four pillars — expertise framing, task clarity, background, and a defined success bar — without the full overhead of CO-STAR or RISEN. Section headers are stripped at emission, so a RACE prompt lands as a flat block — a role sentence, an action sentence, a paragraph of context, and a success-bar statement — preceded by an optional source-material block whenever the task applies to an artifact the user already has.

**Origin:** No single documented originator. RACE is a community prompt-engineering convention documented in practitioner guides (e.g. fvivas.com, 20 April 2025) with no attributed creator, and does not appear in any peer-reviewed prompting survey. **Not to be confused with** the RACE digital-marketing planning model (Reach, Act, Convert, Engage), created by Dave Chaffey of Smart Insights in 2010 — an unrelated marketing framework that shares only the acronym.

## Components

### R - Role
**Purpose:** Define the expertise or persona needed for the task. Written as a complete sentence — usually beginning "You are…" — so it still reads as a persona assignment once the `ROLE` header is stripped.

**Questions to Ask:**
- What expertise is required?
- What viewpoint should the AI take?
- What level of knowledge is assumed?

**Examples:**
- "You are a senior backend engineer familiar with REST conventions."
- "Act as an experienced UX designer who works on consumer onboarding flows."
- "You are a plain-language technical writer for developer documentation."

### A - Action
**Purpose:** State what needs to be done — the task — as one complete imperative sentence. When source material is supplied above, refer to it as "the … above," never "described below": the artifact precedes the action once emitted, so a downward reference would dangle.

**Questions to Ask:**
- What exactly needs to happen?
- What is the deliverable?
- What's the scope?

**Examples:**
- "Review the REST API design above for consistency, usability, and potential issues."
- "Write the copy for a 3-screen onboarding flow for our task management app."
- "Identify the top 5 risks in the migration plan above."

### C - Context
**Purpose:** Provide the situational background needed to calibrate the output. It fills as a self-contained paragraph and survives header stripping on its own, so long as it reads as description of a situation rather than a bare label.

**Questions to Ask:**
- What's the situation?
- What's already happened?
- What constraints apply?
- What does the audience/recipient need?

**Examples:**
- "This is a public API used by third-party developers who expect stable contracts."
- "The users are first-time app users who may be unfamiliar with our terminology."
- "This is for a Series A startup with a 3-person engineering team."

### E - Expectation
**Purpose:** Define what a successful output looks like — the quality bar. Phrase it as a complete statement about the result, not a bare fragment: a phrase like "prioritized list" dangles once the `EXPECTATION` header is deleted, whereas "The review should prioritize the highest-severity issues" still names the standard.

**Questions to Ask:**
- What does success look like?
- What format should the output take?
- What should be true of a good result?
- Any specific requirements for the output?

**Examples:**
- "The review should prioritize breaking changes and security risks over style issues."
- "The copy should be conversational, not instructional — guiding rather than commanding."
- "The output should fit on a single Confluence page, scannable with headers."

## Template Structure

Section headers are stripped at emission, so every slot's meaning is carried by the prose
around and inside it rather than by the header above it. Role fills as a "You are…"
sentence and Context as a self-contained paragraph, so both stand on their own; Action must
be a complete imperative sentence, and Expectation must be phrased as a statement about the
result, because neither can lean on a header once emitted.

```
SOURCE MATERIAL:
[OPTIONAL — include only if this task operates on something the user already has.
If so, emit a literal paste instruction naming the specific artifact, e.g. "[Paste the REST API design here]"
or "[Paste the migration plan here]" — then one line of prose tying it to what follows,
e.g. "The material above is what the task below applies to."
When this section is used, word ACTION to refer to the material ABOVE ("the migration plan above"),
never "described below" — the artifact precedes it and a downward reference would dangle.
If the task generates entirely from scratch, omit this section — do not emit an empty placeholder.]

ROLE:
[Define the expertise or persona needed — who should do this task and at what level]

ACTION:
[State clearly what needs to be done — the task and deliverable]

CONTEXT:
[Provide the situational background:
- What's the current state / situation?
- Who is the audience or recipient of the output?
- Any relevant constraints or prior decisions?
- What has already been done?]

EXPECTATION:
[Define what a successful output looks like:
- Format and structure requirements
- Quality bar or success criteria
- What should be prioritized
- Length or scope constraints]
```

`SOURCE MATERIAL` is a fifth block in a four-letter acronym, and it carries no letter
because it is optional. When RACE is pointed at something that already exists — an API
design, a migration plan, a module — that artifact is pasted here, and the Action refers to
it as "the … above." The upward reference is deliberate: the artifact precedes the Action
once headers are gone, so any "described below" phrasing would point past the end of the
prompt. Delete the block and the sentence beneath it whenever the task generates from
scratch.

## Complete Examples

Every example below is shown in emitted form: each slot carries its own role in prose.
Read the headers as scaffolding that will be deleted — the examples are written so that
nothing is lost when it is.

### Example 1: API Review

**Before RACE:**
"Review my API design."

**After RACE** (source material supplied):
```
SOURCE MATERIAL:
[Paste the REST API design here]
The material above is what the task below applies to.

ROLE: You are a senior backend engineer with API design experience, familiar with
REST conventions and developer experience best practices.

ACTION: Review the REST API design above for consistency, usability, and potential issues.

CONTEXT: This is a public API that will be used by third-party developers. We are
about to publish v1 and changes after launch will be breaking. The team is small
(3 engineers) and we have not done a formal API review before.

EXPECTATION: Prioritize issues by severity (breaking vs. cosmetic). Flag anything
that would frustrate external developers or cause versioning headaches. Format the
result as a prioritized list with issue, reason, and suggested fix for each.
```

### Example 2: Onboarding Copy

**Before RACE:**
"Write onboarding text for our app."

**After RACE** (no source material — the copy is written from scratch, so the
`SOURCE MATERIAL` block and the sentence below it are both deleted):
```
ROLE: You are a UX writer who specializes in onboarding flows for consumer apps.

ACTION: Write the copy for a 3-screen onboarding flow for our task management app.

CONTEXT: Users are downloading the app after seeing a social ad. Many are switching
from pen/paper or spreadsheets. They are not tech-savvy. They've already created
an account before seeing this onboarding. The screens are: (1) value prop, (2)
import/create first task, (3) invite team.

EXPECTATION: Each screen needs a headline (5 words max), one-sentence subhead, and
CTA button label. Keep the tone encouraging, simple, and jargon-free, and let the
copy build momentum toward the first meaningful action.
```

### Example 3: Risk Assessment

**Before RACE:**
"What are the risks of this approach?"

**After RACE** (source material supplied):
```
SOURCE MATERIAL:
[Paste the proposed database migration plan here]
The material above is what the task below applies to.

ROLE: You are a software architect with experience in distributed systems and
enterprise migrations.

ACTION: Identify the top risks in the database migration plan above.

CONTEXT: We are migrating from a monolithic PostgreSQL database to a microservices
architecture with separate databases per service. Timeline is 6 months. Team has
strong SQL skills but limited microservices experience. The system handles financial
transactions and has a 99.9% uptime SLA.

EXPECTATION: List the top 5 risks ranked by likelihood × impact. For each: name,
description (2 sentences), and one mitigation approach. Flag any risks that could
violate the SLA or create data integrity issues as critical.
```

### Example 4: Code Documentation

**Before RACE:**
"Document this module."

**After RACE** (source material supplied):
```
SOURCE MATERIAL:
[Paste the authentication module source here]
The material above is what the task below applies to.

ROLE: You are a technical writer who writes developer documentation for open-source
libraries.

ACTION: Write documentation for the authentication module above.

CONTEXT: This is an open-source library used by developers integrating our platform.
Readers are competent developers but unfamiliar with our specific auth flow. The
docs will live on our developer portal alongside API reference docs.

EXPECTATION: Include an overview paragraph, a when-to-use section, an installation
snippet, a quickstart code example, and a table of configuration options. It should be
completable in one reading session (under 500 words), with clear headings and real
code examples.
```

## Best Use Cases

1. **Technical Reviews**
   - Code reviews with context
   - Architecture assessments
   - Design critiques

2. **Content with Expertise**
   - Technical documentation
   - UX/product copy
   - Expert analysis

3. **Contextual Analysis**
   - Risk assessments
   - Recommendations with constraints
   - Prioritization tasks

4. **When RTF Isn't Enough**
   - Role alone doesn't capture enough
   - Background materially changes the output
   - "What does good look like?" is unclear

## Selection Criteria

**Choose RACE when:**
- ✅ Role/expertise matters
- ✅ Background context is needed
- ✅ Success criteria need to be explicit
- ✅ RTF feels too thin but CO-STAR feels too heavy
- ✅ Task has both "who" and "why" dimensions

**Avoid RACE when:**
- ❌ No role/expertise needed → use CTF or APE
- ❌ Audience, tone, style are critical → use CO-STAR
- ❌ Complex methodology required → use RISEN
- ❌ Transforming existing content → use BAB
- ❌ Ultra-simple task → use APE or RTF

## RACE vs. RTF vs. CO-STAR

| | APE | RTF | RACE | CO-STAR |
|---|---|---|---|---|
| Role | No | Yes | Yes | Implicit |
| Context | Minimal | No | Yes | Yes (rich) |
| Expectation | Yes | Partial (Format) | Yes (explicit) | Yes (Response) |
| Audience/Tone | No | No | No | Yes |
| Complexity | Minimal | Low | Medium | High |
| Best for | One-liners | Format-driven | Expert + context | Full content |

**Rule of thumb:**
- No role needed, quick → APE
- Role matters, no context → RTF
- Role + context + explicit outcome → RACE
- Full content with audience/tone → CO-STAR

## Common Mistakes

1. **Weak Expectation**
   - "Good quality" is not an expectation
   - Define format, length, priority, tone, or success criteria specifically

2. **Context Overload**
   - Context should be background, not instructions
   - Instructions belong in Action
   - If Context is longer than Role + Action combined, consider CO-STAR

3. **Skipping Role**
   - Even when obvious, Role calibrates expertise level and perspective
   - Don't skip it

4. **Confusing Action and Expectation**
   - Action = what to do
   - Expectation = what a good result looks like after it's done

## Quick Reference

| Component | Focus | Key Question |
|-----------|-------|--------------|
| Role | Expertise | "Who should do this?" |
| Action | Task | "What needs to be done?" |
| Context | Background | "What's the situation?" |
| Expectation | Success bar | "What does good look like?" |
