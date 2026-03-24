# RACE Framework

## Overview

RACE (Role, Action, Context, Expectation) is a medium-complexity framework that sits between RTF's simplicity and CO-STAR's richness. It adds two critical improvements over RTF: situational context (missing from RTF) and an explicit expectation of success (missing from both RTF and CTF). RACE is ideal when you need all four pillars — expertise framing, task clarity, background, and a defined success bar — without the full overhead of CO-STAR or RISEN.

## Components

### R - Role
**Purpose:** Define the expertise or persona needed for the task.

**Questions to Ask:**
- What expertise is required?
- What viewpoint should the AI take?
- What level of knowledge is assumed?

**Examples:**
- "You are a senior backend engineer..."
- "Act as an experienced UX designer..."
- "You are a plain-language technical writer..."

### A - Action
**Purpose:** State what needs to be done — the task.

**Questions to Ask:**
- What exactly needs to happen?
- What is the deliverable?
- What's the scope?

**Examples:**
- "Review this API design for consistency..."
- "Write user onboarding copy for..."
- "Identify the top 3 risks in..."

### C - Context
**Purpose:** Provide the situational background needed to calibrate the output.

**Questions to Ask:**
- What's the situation?
- What's already happened?
- What constraints apply?
- What does the audience/recipient need?

**Examples:**
- "This is a public API used by third-party developers who expect stable contracts..."
- "The users are first-time app users who may be unfamiliar with our terminology..."
- "This is for a Series A startup with a 3-person engineering team..."

### E - Expectation
**Purpose:** Define what a successful output looks like — the quality bar.

**Questions to Ask:**
- What does success look like?
- What format should the output take?
- What should be true of a good result?
- Any specific requirements for the output?

**Examples:**
- "Should prioritize breaking changes and security risks over style issues"
- "Should be conversational, not instructional — guide rather than command"
- "Should fit in a single Confluence page, scannable with headers"

## Template Structure

```
ROLE: [Expertise or persona]

ACTION: [What needs to be done]

CONTEXT: [Background, situation, constraints]

EXPECTATION: [What a good result looks like]
```

## Complete Examples

### Example 1: API Review

**Before RACE:**
"Review my API design."

**After RACE:**
```
ROLE: You are a senior backend engineer with API design experience, familiar with
REST conventions and developer experience best practices.

ACTION: Review this REST API design for consistency, usability, and potential issues.

CONTEXT: This is a public API that will be used by third-party developers. We are
about to publish v1 and changes after launch will be breaking. The team is small
(3 engineers) and we have not done a formal API review before.

EXPECTATION: Prioritize issues by severity (breaking vs. cosmetic). Flag anything
that would frustrate external developers or cause versioning headaches. Format as
a prioritized list with issue, reason, and suggested fix for each.
```

### Example 2: Onboarding Copy

**Before RACE:**
"Write onboarding text for our app."

**After RACE:**
```
ROLE: You are a UX writer who specializes in onboarding flows for consumer apps.

ACTION: Write the copy for a 3-screen onboarding flow for our task management app.

CONTEXT: Users are downloading the app after seeing a social ad. Many are switching
from pen/paper or spreadsheets. They are not tech-savvy. They've already created
an account before seeing this onboarding. The screens are: (1) value prop, (2)
import/create first task, (3) invite team.

EXPECTATION: Each screen needs a headline (5 words max), one-sentence subhead, and
CTA button label. Tone: encouraging, simple, no jargon. The copy should build
momentum toward the first meaningful action.
```

### Example 3: Risk Assessment

**Before RACE:**
"What are the risks of this approach?"

**After RACE:**
```
ROLE: You are a software architect with experience in distributed systems and
enterprise migrations.

ACTION: Identify the top risks in the proposed database migration plan described below.

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

**After RACE:**
```
ROLE: You are a technical writer who writes developer documentation for open-source
libraries.

ACTION: Write documentation for the authentication module described below.

CONTEXT: This is an open-source library used by developers integrating our platform.
Readers are competent developers but unfamiliar with our specific auth flow. The
docs will live on our developer portal alongside API reference docs.

EXPECTATION: Include: overview paragraph, when-to-use section, installation snippet,
quickstart code example, and a table of configuration options. Should be completable
in one reading session (under 500 words). Use clear headings and real code examples.
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
