# CARE Framework

## Overview

CARE (Context, Ask, Rules, Examples) is a practitioner framework from Nielsen Norman Group that adds an explicit **Rules** component to the standard context-task-examples pattern. This makes it particularly effective for tasks where constraints, guardrails, or quality standards need to be enforced — the Rules component directly addresses what the AI should and should not do, reducing the need for post-hoc correction.

**Origin:** Nielsen Norman Group (nngroup.com) — a leading UX and AI research firm. The NNg formulation focuses on making prompts "CAREFUL" — ensuring AI outputs are constrained, targeted, and appropriately scoped.

## Components

### C — Context
**Purpose:** Provide the background and situation needed to understand the task — who you are, what the situation is, and why this task matters.

**Questions to Ask:**
- Who are you in this situation?
- What's the broader context?
- Why is this task being done?

**Examples:**
- "I am a UX designer preparing for a usability study..."
- "We are a healthcare startup building a patient-facing mobile app..."
- "I am a manager writing a performance review for a direct report..."

### A — Ask
**Purpose:** State the specific request — what you want the AI to produce or do.

**Questions to Ask:**
- What is the exact deliverable?
- What should the output be?

**Examples:**
- "Write a set of 5 interview questions for testing navigation usability..."
- "Draft a 3-paragraph executive summary of this technical report..."
- "Create a rubric for evaluating onboarding email effectiveness..."

### R — Rules
**Purpose:** Define explicit constraints, guardrails, standards, and dos/don'ts that govern the output. This is the defining component of CARE — it makes requirements explicit rather than assumed.

**Questions to Ask:**
- What must be included?
- What must be avoided?
- What quality standards apply?
- What are the constraints (length, format, tone, reading level)?
- What would make this output wrong or unusable?

**Examples:**
- "Rules: Use plain language (max grade 8 reading level). Avoid medical jargon. Each question must be open-ended, not yes/no. Do not suggest answers in the question wording."
- "Rules: Under 300 words. No bullet points — prose only. Must include a clear recommendation. Do not mention competitor names."
- "Rules: Must comply with ADA language guidelines. No deficit-based language. First-person framing only."

### E — Examples
**Purpose:** Provide 1-3 examples that demonstrate the desired output format, tone, style, or quality level.

**Questions to Ask:**
- Is there an existing example of what good looks like?
- What format should it match?
- What tone should it mirror?

**Examples:**
- "Example question: 'Walk me through how you would find the settings for your account.'"
- "Example summary paragraph: [paste existing example]"
- "Example format: [show template]"

## Template Structure

```
CONTEXT:
[Who you are, the situation, why this task exists]

ASK:
[The specific request and deliverable]

RULES:
[Explicit constraints — what must be included, what must be avoided,
quality standards, format requirements, length limits, tone requirements,
compliance requirements, reading level, etc.]

EXAMPLES:
[1-3 examples of desired output format, tone, or style]
```

## Complete Examples

### Example 1: UX Research

**Before CARE:**
"Write interview questions for our usability study."

**After CARE:**
```
CONTEXT:
I am a UX researcher preparing for a moderated usability study on our
mobile banking app's new money transfer flow. Participants are adults
aged 35-65 who are non-technical but regular smartphone users. The
study will be conducted remotely via Zoom with screen sharing.

ASK:
Write 6 interview questions for the post-task debrief, focusing on
comprehension, confidence, and friction points in the transfer flow.

RULES:
- All questions must be open-ended (no yes/no questions)
- Use plain, everyday language — no banking or UX jargon
- Do not suggest answers within the question (no leading questions)
- Each question should address one thing only (no double-barreled)
- Avoid "why" questions (use "what made you..." instead)
- Questions should take no more than 3 minutes each to answer

EXAMPLES:
Good: "What went through your mind when you reached the confirmation screen?"
Bad: "Was the confirmation screen clear and easy to understand?" (yes/no, leading)
```

### Example 2: Healthcare Content

**Before CARE:**
"Write patient education content about diabetes management."

**After CARE:**
```
CONTEXT:
I am a health content writer for a patient portal used by adults with
Type 2 diabetes. Many patients have low health literacy. The content
will appear in a mobile app alongside their care plan.

ASK:
Write a 200-word article explaining why blood sugar monitoring matters
and how often to check.

RULES:
- Maximum 6th grade reading level (use Flesch-Kincaid as guide)
- Avoid medical jargon; if medical term must be used, define it
- Use active voice and second-person ("you") throughout
- No numbers or statistics unless critical — prefer plain descriptions
- Must include a clear, simple call to action at the end
- Do not recommend specific monitoring frequency — use "as directed by your doctor"
- Comply with plain language guidelines (short sentences, common words)

EXAMPLES:
Good sentence: "Checking your blood sugar helps you and your doctor
understand how your body responds to food and activity."
Bad sentence: "Glycemic monitoring enables patients to assess metabolic
response to dietary and physical stimuli."
```

### Example 3: Technical Writing

**Before CARE:**
"Write error messages for our app."

**After CARE:**
```
CONTEXT:
I am a product designer writing UI error messages for a B2B data analytics
platform. Users are data analysts — technically literate but not developers.
Errors occur during data upload, query execution, and report generation.

ASK:
Write error messages for these 3 error states: (1) file format not supported,
(2) query timeout, (3) insufficient permissions to view a report.

RULES:
- Maximum 2 sentences per error message
- Must include: what happened + what the user can do about it
- Use plain language — no HTTP status codes, no stack traces, no internal IDs
- Active voice, direct address ("You can..." not "The user can...")
- Do not blame the user ("You uploaded the wrong format" is bad)
- Must include a specific actionable next step (not just "try again")
- Tone: calm, helpful, matter-of-fact — not apologetic or alarming

EXAMPLES:
Good: "This file type isn't supported. Try uploading a .CSV or .XLSX file."
Bad: "ERROR 415: Unsupported Media Type. The file format you attempted to
upload is not compatible with the system's ingestion pipeline."
```

## Best Use Cases

1. **Compliance and Standards-Driven Content**
   - Healthcare, legal, accessibility-compliant content
   - Brand voice guidelines enforcement
   - Plain language requirements

2. **User-Facing Copy**
   - UI text, error messages, onboarding
   - When exact wording constraints matter
   - When reading level or language standards apply

3. **Research and Interview Materials**
   - Survey questions, interview guides
   - When question bias must be avoided
   - When methodological standards apply

4. **Any Task With Explicit Guardrails**
   - Legal constraints ("do not mention X")
   - Style guide compliance
   - Format requirements that must not be violated

## Selection Criteria

**Choose CARE when:**
- ✅ Explicit rules/constraints need to be enforced
- ✅ Quality standards are specific and non-negotiable
- ✅ Examples help clarify the standard
- ✅ The "what not to do" is as important as "what to do"
- ✅ Compliance, accessibility, or style guide requirements exist

**Avoid CARE when:**
- ❌ No specific rules apply → use simpler RTF, CTF, or APE
- ❌ Rich audience/tone work needed → use CO-STAR
- ❌ Multi-step process → use RISEN
- ❌ Transforming existing content → use BAB
- ❌ Need explicit Do/Don't lists with more structure → use TIDD-EC

## CARE vs. TIDD-EC

Both have explicit constraint components. Key differences:

| | CARE | TIDD-EC |
|---|---|---|
| Rules format | Single Rules section (combined) | Separate Do and Don't sections |
| Examples position | At end | In the middle |
| Context | Yes | Yes |
| Best for | Constraint + example-driven tasks | High-precision tasks needing detailed positive/negative guidance |

**Rule of thumb:** If you need separate "do this" and "don't do this" lists → TIDD-EC. If rules can be combined in one section and examples are critical → CARE.

## Quick Reference

| Component | Focus | Key Question |
|-----------|-------|--------------|
| Context | Situation | "What's the background?" |
| Ask | Request | "What do I need?" |
| Rules | Constraints | "What must / must not be done?" |
| Examples | Standard | "What does good look like?" |
