# CTF Framework

## Overview

CTF is a simple 3-component framework focused on situational context, task clarity, and output format. It is ideal for tasks where background/situation is more important than AI persona framing, and the primary concern is getting a clearly defined output from a well-understood context.

## Components

### C - Context
**Purpose:** Describe the situation, background, or circumstances surrounding the task.

**Questions to Ask:**
- What is the current situation?
- What background does the AI need to know?
- What has already been done?
- Why is this task needed?
- What constraints or circumstances apply?

**Examples:**
- "We are mid-sprint and the client has changed the acceptance criteria for the login flow..."
- "I'm a junior developer onboarding to a legacy Python codebase with no documentation..."
- "Our team writes internal status reports weekly and we need to standardize the format..."

### T - Task
**Purpose:** State exactly what needs to be done.

**Questions to Ask:**
- What exactly needs to be done?
- What's the deliverable?
- What's the core action?

**Examples:**
- "Write a summary of the changed requirements for the team..."
- "Explain what this function does in plain language..."
- "Create a template for our weekly status report..."

### F - Format
**Purpose:** Specify how the output should be structured.

**Questions to Ask:**
- What format should the output take?
- How should it be structured?
- What's the preferred presentation?
- Any specific formatting requirements?

**Examples:**
- "Provide as a markdown table..."
- "Format as a bulleted list under three headings..."
- "Write as a concise paragraph, 100 words max..."

## Template Structure

```
CONTEXT:
[Situation, background, circumstances]

TASK:
[What needs to be done]

FORMAT:
[How output should be structured]
```

## Complete Examples

### Example 1: Requirement Change Summary

**Before CTF:**
"Summarize the new requirements."

**After CTF:**
```
CONTEXT:
We are in sprint 3 of a 6-sprint project. The client just revised the login flow
requirements: they now want SSO via Google instead of email/password. The dev team
hasn't been told yet and we need to communicate this clearly without causing panic.

TASK:
Write a brief summary of the requirement change to share with the development team
in Slack.

FORMAT:
- 3-5 bullet points
- Plain language, no jargon
- End with a single action item
- Keep total under 150 words
```

### Example 2: Code Explanation

**Before CTF:**
"Explain this code."

**After CTF:**
```
CONTEXT:
I'm a junior developer new to this codebase. The function below is from a legacy
authentication module that nobody has documented. I need to understand it before
refactoring it next week.

TASK:
Explain what this function does, why each section exists, and flag any potential
issues I should know before touching it.

FORMAT:
- Short plain-language summary (2-3 sentences)
- Line-by-line breakdown as a numbered list
- Potential issues section at the end (bullet points)
```

### Example 3: Template Creation

**Before CTF:**
"Create a status report template."

**After CTF:**
```
CONTEXT:
Our team of 6 engineers sends weekly status reports to a non-technical product
manager. Reports are currently inconsistent and take too long to write. We want
a reusable template that takes under 10 minutes to fill out.

TASK:
Create a weekly status report template that balances completeness with brevity.

FORMAT:
Markdown template with:
- Section headers with fill-in placeholders
- Brief instruction comment under each header
- Total estimated fill-in time: under 10 minutes
- Length when filled: 200-300 words
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
- ❌ Input→output transformation (use RISE-IE)

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
