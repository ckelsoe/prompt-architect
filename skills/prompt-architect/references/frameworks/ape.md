# APE Framework

## Overview

APE (Action, Purpose, Expectation) is the most minimal structured prompt framework — even simpler than RTF or CTF. It is designed for ultra-quick, single-sentence or two-sentence prompts where adding more structure would be overkill. APE answers three essential questions in the fewest possible words: what to do, why it matters, and what success looks like.

## Components

### A - Action
**Purpose:** State the core action to take. One clear verb-driven instruction.

**Questions to Ask:**
- What exactly should happen?
- What is the deliverable?
- What's the one thing needed?

**Examples:**
- "Write a function that..."
- "Summarize this document..."
- "Translate the following..."
- "List three alternatives to..."

### P - Purpose
**Purpose:** State why this action is needed. Provides just enough context to calibrate the output without a full background brief.

**Questions to Ask:**
- Why is this needed?
- What will this be used for?
- Who needs it and why?

**Examples:**
- "...so a new engineer can understand the codebase quickly"
- "...for inclusion in a weekly stakeholder email"
- "...because our target market is in Brazil"
- "...to help decide which approach to take"

### E - Expectation
**Purpose:** Define what a good result looks like. The standard for success.

**Questions to Ask:**
- What does a good result look like?
- Any quality bar to meet?
- Length, format, or tone requirements?

**Examples:**
- "Should be under 100 words and jargon-free"
- "Should be actionable, not just descriptive"
- "Should fit in a single Slack message"
- "Should have a clear recommendation at the end"

## Template Structure

```
ACTION: [What to do]
PURPOSE: [Why it's needed]
EXPECTATION: [What a good result looks like]
```

Or as a single sentence:
```
[ACTION] so that [PURPOSE], and it should [EXPECTATION].
```

## Complete Examples

### Example 1: Code Comment

**Before APE:**
"Add a comment to this function."

**After APE:**
```
ACTION: Write a JSDoc comment for this function.
PURPOSE: So a new team member can understand what it does without reading the implementation.
EXPECTATION: Should cover parameters, return value, and one usage example. Under 8 lines.
```

### Example 2: Meeting Summary

**Before APE:**
"Summarize this meeting."

**After APE:**
```
ACTION: Summarize the key decisions and action items from this meeting transcript.
PURPOSE: For team members who missed the meeting and need to catch up quickly.
EXPECTATION: Bullet points only, max 10 bullets, each under 15 words.
```

### Example 3: Alternative Ideas

**Before APE:**
"Give me options."

**After APE:**
```
ACTION: List 3 alternative approaches to the database indexing problem described below.
PURPOSE: To help the team decide which direction to pursue in tomorrow's planning session.
EXPECTATION: Each option needs a one-sentence tradeoff (pro and con). No implementation details yet.
```

### Example 4: Translation

**Before APE:**
"Translate this."

**After APE:**
```
ACTION: Translate the following error message into Portuguese (Brazilian).
PURPOSE: Our app is launching in Brazil and this error will be seen by end users.
EXPECTATION: Natural-sounding Brazilian Portuguese, not a literal translation. Keep technical terms in English.
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

## Inline APE Pattern

APE works especially well as a single sentence:

```
[ACTION] for [PURPOSE], and it should [EXPECTATION].
```

**Examples:**
```
Summarize this PR description for a non-technical stakeholder, and it should fit in two sentences.
```
```
List three naming alternatives for this function for a code review discussion, and each should be self-explanatory without comments.
```
```
Write a commit message for these changes for git history, and it should follow conventional commits format.
```

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
