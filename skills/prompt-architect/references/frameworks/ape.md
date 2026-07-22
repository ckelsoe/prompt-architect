# APE Framework

## Overview

APE (Action, Purpose, Expectation) is the most minimal structured prompt framework — even simpler than RTF or CTF. It is designed for ultra-quick, self-contained tasks where adding more structure would be overkill. APE answers three essential questions in the fewest possible words: what to do, why it matters, and what success looks like. A complete APE prompt emits as three short sentences, which makes it the shortest template in this package.

**Origin:** No single documented originator. Action-Purpose-Expectation is a community prompt-engineering convention, documented in practitioner guides from 2024 onward (earliest found: fvivas.com, 15 March 2024) with no attributed creator. It does not appear in any peer-reviewed prompting survey, including The Prompt Report (arXiv 2406.06608). **Not to be confused with** APE = "Automatic Prompt Engineer" from Zhou et al., "Large Language Models Are Human-Level Prompt Engineers" (arXiv 2211.01910, ICLR 2023) — an unrelated automated method that searches over LLM-generated candidate instructions and selects the highest-scoring one. That APE is an algorithm, not a prompt template; the two share only the acronym.

## Components

### A - Action
**Purpose:** State the core action to take, as one complete imperative sentence. Nothing else in an APE prompt states the task, so a bare noun phrase ("meeting summary") leaves the emitted prompt with no instruction in it at all.

**Questions to Ask:**
- What exactly should happen?
- What is the deliverable?
- What's the one thing needed?

**Examples:**
- "Write a JSDoc comment for the function above."
- "Summarize the key decisions in the transcript above."
- "Translate the error message above into Brazilian Portuguese."
- "List three alternative approaches to the indexing problem described above."

### P - Purpose
**Purpose:** State why this action is needed. Provides just enough context to calibrate the output without a full background brief. It ships inside the carrier sentence `Calibrate the result to this purpose: …`, so the slot itself may be a fragment.

**Questions to Ask:**
- Why is this needed?
- What will this be used for?
- Who needs it and why?

**Examples:**
- "a new engineer who needs to understand the codebase quickly"
- "inclusion in a weekly stakeholder email"
- "end users in Brazil, who will see this message in production"
- "the team deciding which approach to pursue in tomorrow's planning session"

### E - Expectation
**Purpose:** Define what a good result looks like. The standard for success. It ships inside the carrier sentence `A good result meets this standard: …`, so the slot itself may be a fragment, and may hold several clauses.

**Questions to Ask:**
- What does a good result look like?
- Any quality bar to meet?
- Length, format, or tone requirements?

**Examples:**
- "under 100 words and jargon-free"
- "actionable, not just descriptive"
- "short enough to fit in a single Slack message"
- "ends with a clear recommendation"

## Template Structure

Section headers are stripped at emission, so every slot's meaning is carried by the prose around and inside it rather than by the header above it. That is why `ACTION` has to be a complete sentence, and why `PURPOSE` and `EXPECTATION` ship with carrier sentences that let their own slots stay fragments.

```
SOURCE MATERIAL:
[Optional — paste the artifact the task operates on here, named concretely (the meeting
transcript, the function). If the task creates something from scratch, delete this
bracketed block along with the sentence directly below it.]
Use the material above as the input for the task described below.

ACTION:
[One complete imperative sentence naming what to produce, e.g. "Summarize the decisions in
the transcript above." Never a bare noun phrase like "meeting summary" — nothing else here
states the task. The two fields below may be fragments.]

PURPOSE:
Calibrate the result to this purpose: [who needs it and what they will do with it].

EXPECTATION:
A good result meets this standard: [the success bar — length, format, tone, or quality].
```

`SOURCE MATERIAL` is a fourth block in a three-letter acronym, and it carries no letter because it is optional. APE is usually pointed at something that already exists — a transcript, a function, a draft — and with no named place to put it, that artifact gets pasted into `ACTION`, the one field that cannot afford to lose its shape. Delete the block and the sentence beneath it whenever the task creates something from scratch.

There is no collapsed single-sentence variant; see **Why There Is No Inline Form** below.

## Complete Examples

Every example below is shown in emitted form: each slot carries its own role in prose.
Read the headers as scaffolding that will be deleted — the examples are written so that
nothing is lost when it is.

### Example 1: Code Comment

**Before APE:**
"Add a comment to this function."

**After APE** (source material supplied):
```
SOURCE MATERIAL:
[Paste the function you want documented here]
Use the material above as the input for the task described below.

ACTION:
Write a JSDoc comment for the function above.

PURPOSE:
Calibrate the result to this purpose: a new team member who needs to understand what the
function does without reading its implementation.

EXPECTATION:
A good result meets this standard: covers every parameter and the return value, includes
one usage example, and stays under 8 lines.
```

### Example 2: Meeting Summary

**Before APE:**
"Summarize this meeting."

**After APE** (source material supplied):
```
SOURCE MATERIAL:
[Paste the meeting transcript here]
Use the material above as the input for the task described below.

ACTION:
Summarize the key decisions and action items in the transcript above.

PURPOSE:
Calibrate the result to this purpose: team members who missed the meeting and need to
catch up quickly.

EXPECTATION:
A good result meets this standard: bullet points only, at most 10 bullets, each under 15
words.
```

### Example 3: Alternative Ideas

**Before APE:**
"Give me options."

**After APE** (source material supplied):
```
SOURCE MATERIAL:
[Paste the description of the database indexing problem here]
Use the material above as the input for the task described below.

ACTION:
List three alternative approaches to the indexing problem described above.

PURPOSE:
Calibrate the result to this purpose: the team deciding which direction to pursue in
tomorrow's planning session.

EXPECTATION:
A good result meets this standard: each option gets a one-sentence tradeoff naming one
advantage and one cost, and none of them go into implementation detail yet.
```

### Example 4: Translation

**Before APE:**
"Translate this."

**After APE** (source material supplied):
```
SOURCE MATERIAL:
[Paste the error message to be translated here]
Use the material above as the input for the task described below.

ACTION:
Translate the error message above into Brazilian Portuguese.

PURPOSE:
Calibrate the result to this purpose: end users in Brazil, who will see this message in
production when the app fails.

EXPECTATION:
A good result meets this standard: natural-sounding Brazilian Portuguese rather than a
literal translation, with technical terms left in English.
```

### Example 5: Deploy Freeze Announcement

**Before APE:**
"Write an announcement."

**After APE** (no source material — the announcement is written from scratch, so the
`SOURCE MATERIAL` block and the sentence below it are both deleted):
```
ACTION:
Write a Slack announcement telling the engineering team that Friday deploys are frozen
until January 5.

PURPOSE:
Calibrate the result to this purpose: engineers who need to know what changed and what to
do instead, not why the policy exists.

EXPECTATION:
A good result meets this standard: one short paragraph, plain and direct, no more than
four sentences, ending with who to contact for an exception.
```

## Best Use Cases

1. **Quick Tasks**
   - Short code generation
   - Simple translations
   - Brief summaries
   - List generation

2. **When Speed Matters**
   - Rapid iteration
   - One-off requests
   - Low-stakes outputs

3. **When Role Is Obvious**
   - The AI's role is implied by the action
   - No persona setup needed

4. **Single-Sentence Prompts Made Better**
   - Takes any vague one-liner and adds just enough structure
   - Minimal overhead

## Selection Criteria

**Choose APE when:**
- ✅ Task is very simple and self-contained
- ✅ Role/persona is obvious or irrelevant
- ✅ You want minimum overhead
- ✅ Quick iteration is needed
- ✅ Expectation is the missing piece in your current prompt

**Avoid APE when:**
- ❌ Background/situation matters → use CTF
- ❌ Expertise framing affects quality → use RTF
- ❌ Complex multi-step → use RISEN
- ❌ Audience and tone are critical → use CO-STAR
- ❌ Transforming existing content → use BAB

## APE vs. RTF vs. CTF

| | APE | CTF | RTF |
|---|---|---|---|
| Complexity | Minimal | Simple | Simple |
| Focus | Action + why + bar | Situation + task + format | Persona + task + format |
| Role needed? | No | No | Yes |
| Context needed? | Minimal (Purpose) | Yes | No |
| Best for | Ultra-quick, one-off | Context-heavy | Expertise-driven |

## Why There Is No Inline Form

Earlier versions of this document offered a collapsed single sentence as an equal option,
in two different and mutually inconsistent syntaxes — `[ACTION] so that [PURPOSE], and it
should [EXPECTATION].` and `[ACTION] for [PURPOSE], and it should [EXPECTATION].` The
shipped template implements neither, and the emitted prompt should not use them. Two
things break when APE is collapsed:

- **There is nowhere to put source material.** Most APE tasks operate on something that
  already exists. In the collapsed form that artifact has to be pasted into the middle of
  the instruction sentence, which is the one field the template protects.
- **The connectives are load-bearing and rigid.** `so that` and `and it should` only fit
  purposes and expectations that happen to be single clauses. A real expectation is
  usually several ("bullet points only, at most 10 bullets, each under 15 words"), and
  splicing that after `and it should` yields a sentence that no longer parses as an
  instruction.

Brevity is preserved without the collapse. A complete APE prompt is three sentences, and
for a from-scratch task the emitted block is three lines of prose — still the shortest
output any template in this package produces. The brevity comes from APE having only
three fields, not from compressing them onto one line.

## Common Mistakes

1. **Skipping Expectation**
   - Most one-liner prompts have Action but no Expectation
   - Expectation is what APE adds most value on

2. **Over-engineering Purpose**
   - Purpose should be one sentence, not a paragraph
   - If it needs more context, upgrade to CTF

3. **Using APE for Complex Tasks**
   - If Action has multiple sub-steps, upgrade to RISEN
   - If Expectation requires detailed format spec, upgrade to RTF

## Quick Reference

| Component | Focus | Key Question |
|-----------|-------|--------------|
| Action | What to do | "What should happen?" |
| Purpose | Why it matters | "Why is this needed?" |
| Expectation | Success bar | "What does good look like?" |
