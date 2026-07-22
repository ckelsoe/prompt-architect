# CTF Framework

## Overview

CTF is a simple 3-component framework focused on situational context, task clarity, and output format. It is ideal for tasks where background/situation is more important than AI persona framing, and the primary concern is getting a clearly defined output from a well-understood context. Section headers are stripped when the prompt is emitted, so a CTF prompt lands as a short flat block — a paragraph of situation, a sentence naming the task, and a format specification — preceded by an optional source-material block whenever the task operates on an artifact that already exists.

**Origin:** No single documented originator. CTF appears in the community framework literature as a variant of RTF, with Context substituted for Role, documented alongside it in unattributed practitioner listings from 2024 onward (e.g. fvivas.com, 15 March 2024). No academic treatment; absent from The Prompt Report (arXiv 2406.06608).

## Components

### C - Context
**Purpose:** Describe the situation, background, or circumstances surrounding the task. It fills naturally as a self-contained paragraph of situational prose, so it survives header stripping on its own — but keep it descriptive narrative, not a bare label like "legacy code," so the paragraph still reads as a situation once the `CONTEXT` header is gone.

**Questions to Ask:**
- What is the current situation?
- What background does the AI need to know?
- What has already been done?
- Why is this task needed?
- What constraints or circumstances apply?

**Examples:**
- "We are mid-sprint and the client has revised the acceptance criteria in the requirements doc above; the dev team has not been told yet."
- "I am a junior developer onboarding to the legacy Python module above, which nobody has documented."
- "Our team writes internal status reports weekly and the format drifts every time, so we want one reusable structure."

### T - Task
**Purpose:** State exactly what needs to be done, as one complete imperative sentence. Nothing else in a CTF prompt states the task, so once the `TASK` header is stripped a bare noun phrase ("a summary") leaves the emitted prompt with no instruction in it.

**Questions to Ask:**
- What exactly needs to be done?
- What's the deliverable?
- What's the core action?

**Examples:**
- "Summarize the changed requirements in the doc above for the development team."
- "Explain in plain language what the function above does."
- "Create a reusable weekly status report template the team can fill out in under 10 minutes."

### F - Format
**Purpose:** Specify how the output should be structured. Phrase it as an instruction about the output rather than a bare descriptor — a fragment like "markdown table" dangles once the `FORMAT` header is deleted, whereas "Provide the output as a markdown table" still reads as a directive.

**Questions to Ask:**
- What format should the output take?
- How should it be structured?
- What's the preferred presentation?
- Any specific formatting requirements?

**Examples:**
- "Provide the output as a markdown table."
- "Format the answer as a bulleted list under three headings."
- "Write the answer as a single paragraph of 100 words or fewer."

## Template Structure

Section headers are stripped at emission, so every slot's meaning is carried by the prose
around and inside it rather than by the header above it. Context is a self-contained
paragraph and survives on its own; Task must be a complete imperative sentence, and Format
must be phrased as an instruction about the output, because neither has a header to lean on
once emitted.

```
SOURCE MATERIAL:
[Optional — include only if this task operates on material you already have. Paste the
specific artifact here and name it in this line, e.g. "Paste the legacy authentication
function here", "Paste the revised requirements doc here" — the artifact itself, not a
description of it. If this task generates from scratch, delete this bracketed block along
with the sentence directly below it.]
Use the material above as the basis for the task described below.

CONTEXT:
[Describe the situation, background, or circumstances surrounding this task.
Include relevant details like: current state, constraints, what's already been done,
why this is needed, and any important background the AI should know.]

TASK:
[State clearly and specifically what needs to be done. Be explicit about the deliverable.]

FORMAT:
[Specify exactly how the output should be structured:
- Overall format (document, code, list, table, etc.)
- Required sections or components
- Length constraints
- Style requirements
- Any specific formatting rules]
```

`SOURCE MATERIAL` is a fourth block in a three-letter acronym, and it carries no letter
because it is optional. CTF is often pointed at something that already exists — a legacy
function, a revised requirements doc, a draft — and that artifact is pasted here and
referred to as "the … above" from inside the Task. Delete the block and the sentence
beneath it whenever the task generates something from scratch.

## Complete Examples

Every example below is shown in emitted form: each slot carries its own role in prose.
Read the headers as scaffolding that will be deleted — the examples are written so that
nothing is lost when it is.

### Example 1: Requirement Change Summary

**Before CTF:**
"Summarize the new requirements."

**After CTF** (source material supplied):
```
SOURCE MATERIAL:
[Paste the client's revised login-flow requirements here]
Use the material above as the basis for the task described below.

CONTEXT:
We are in sprint 3 of a 6-sprint project. The client just revised the login flow
requirements in the document above: they now want SSO via Google instead of
email/password. The dev team hasn't been told yet and we need to communicate this
clearly without causing panic.

TASK:
Write a brief summary of the requirement change above to share with the development team
in Slack.

FORMAT:
Format the summary as 3-5 bullet points in plain language with no jargon, ending with a
single action item, and keep the total under 150 words.
```

### Example 2: Code Explanation

**Before CTF:**
"Explain this code."

**After CTF** (source material supplied):
```
SOURCE MATERIAL:
[Paste the undocumented legacy authentication function here]
Use the material above as the basis for the task described below.

CONTEXT:
I'm a junior developer new to this codebase. The function above is from a legacy
authentication module that nobody has documented. I need to understand it before
refactoring it next week.

TASK:
Explain what the function above does, why each section exists, and flag any potential
issues I should know before touching it.

FORMAT:
Open with a short plain-language summary of 2-3 sentences, then give a line-by-line
breakdown as a numbered list, and end with a bulleted "Potential issues" section.
```

### Example 3: Template Creation

**Before CTF:**
"Create a status report template."

**After CTF** (no source material — the template is designed from scratch, so the
`SOURCE MATERIAL` block and the sentence below it are both deleted):
```
CONTEXT:
Our team of 6 engineers sends weekly status reports to a non-technical product
manager. Reports are currently inconsistent and take too long to write. We want
a reusable template that takes under 10 minutes to fill out.

TASK:
Create a weekly status report template that balances completeness with brevity.

FORMAT:
Produce a markdown template with section headers, a fill-in placeholder under each header,
and a brief instruction comment beneath it. Aim for under 10 minutes of fill-in time and a
filled length of 200-300 words.
```

## Best Use Cases

1. **Situational Tasks**
   - When background drives everything
   - Handoff documents
   - Mid-project updates
   - Onboarding assistance

2. **Context-Heavy Requests**
   - Legacy code explanations
   - Requirement change communication
   - Stakeholder summaries

3. **Simple, Well-Defined Tasks with Rich Background**
   - Template creation
   - Meeting prep
   - Quick documentation

4. **When Role is Obvious or Irrelevant**
   - The expertise is implied by the context
   - No need to establish an AI persona

## Selection Criteria

**Choose CTF when:**
- ✅ Background/situation is the key driver
- ✅ Role/persona is obvious or irrelevant
- ✅ Task is simple and well-defined
- ✅ Output format is a primary concern
- ✅ Quick, focused execution needed
- ✅ Context would be redundant in a Role definition

**Avoid CTF when:**
- ❌ AI expertise/persona materially changes output quality (use RTF)
- ❌ Audience and tone are critical (use CO-STAR)
- ❌ Multi-step process with methodology needed (use RISEN)
- ❌ Explicit dos/don'ts required (use TIDD-EC)
- ❌ Input→output transformation (use RISE-IE — the Role/Input/Steps/Expectation form)

## CTF vs RTF

| | CTF | RTF |
|---|---|---|
| First component | **Context** — situational background | **Role** — AI persona/expertise |
| Primary driver | "What's the situation?" | "Who should answer this?" |
| Best for | Context-heavy, obvious expertise | Expertise-driven, minimal background |
| Weakness | No persona framing | Context must fit inside Role |

**Rule of thumb**: If you'd start writing "You are a..." → use RTF. If you'd start writing "Here's the situation..." → use CTF.

## Common Mistakes

1. **Vague Context**
   - Include specific details: what already happened, what the constraints are, why it matters
   - Don't just say "I need help with a project"

2. **Insufficient Task Description**
   - Be specific about the deliverable
   - Define scope clearly

3. **Missing Format Specification**
   - Don't assume default output is correct
   - Specify structure, length, and presentation

4. **Using CTF for Complex Tasks**
   - If context is long and task has multiple steps, upgrade to RISEN or CO-STAR

## Quick Reference

| Component | Focus | Key Question |
|-----------|-------|--------------|
| Context | Situation | "What's the background?" |
| Task | Action | "What needs to be done?" |
| Format | Structure | "How should it look?" |
