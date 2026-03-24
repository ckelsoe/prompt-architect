# Reverse Role Prompting (AI-Led Interview)

## Overview

Reverse Role Prompting flips the traditional prompting dynamic: instead of you constructing a detailed prompt, you provide a minimal intent statement and the AI interviews you — asking targeted clarifying questions — until it has enough information to execute the task well. This is the framework for when you know what you want but struggle to articulate all the details needed for a good prompt.

**Research basis:** Widely circulated as "reverse prompting" in practitioner communities (2023–2024). Formalized academically as **FATA** (First Ask Then Answer), arXiv 2508.08308, August 2025 — showing ~40% improvement over standard prompting. Related to **Socratic Prompting** (Chang et al., arXiv 2303.08769, EMNLP 2023/NAACL 2024).

## When to Use

- You know roughly what you need but struggle to write a detailed prompt
- The task is complex and requirements aren't fully defined upfront
- You want the AI to surface considerations you haven't thought of
- You're a non-expert user in an unfamiliar domain
- You want the AI to generate the full prompt for you from the interview

## Components

### Intent Statement
**Purpose:** Your minimal starting point — what you want to achieve in 1-2 sentences. Intentionally brief; the AI will fill in the gaps through questions.

### Interview Trigger
**Purpose:** The instruction that activates the AI-led interview mode.

**Core triggers:**
- Minimal: *"Before responding, ask me all the questions you need to give me the best possible answer."*
- Structured: *"Interview me with sequential questions to understand my context, constraints, and goals. Only [start the task] once confident you have enough information."*
- Expert mode: *"You are an expert in [X]. Before beginning, conduct a discovery interview to understand my specific situation. Ask one question at a time."*

### Domain Scope
**Purpose:** Optionally specify the domain of expertise the AI should bring to the interview. This shapes the quality and relevance of its questions.

### Interview Mode
**Purpose:** Single-batch (FATA: all questions at once) vs. conversational (one question at a time). FATA is faster; conversational is more natural.

### Synthesis Instruction (optional)
**Purpose:** After the interview, instruct the AI to either (a) execute the task directly, or (b) first produce a written prompt you can reuse.

## Template Structure

### Minimal Version
```
[Your 1-2 sentence intent statement]

Before responding, ask me all the questions you need to give me the
best possible answer. Then, once I've answered, [execute the task / generate the full prompt].
```

### Structured Expert Version
```
You are an expert [domain] consultant.

My goal: [1-2 sentence intent]

Before you begin, interview me to understand my specific context,
constraints, goals, and any relevant background. Ask your questions
[one at a time / all at once]. Only proceed with [the task] once you
are confident you have everything you need.

After the interview: [execute directly / write a full structured prompt I can reuse]
```

### Two-Stage Version (Interview → Prompt Generation)
```
STAGE 1 — INTERVIEW:
You are an expert prompt engineer and [domain expert].
I want to [intent]. Before doing anything, interview me to gather all
the information needed to create an excellent prompt for this task.
Ask me [5-10] targeted questions covering: [specific dimensions relevant to task].

STAGE 2 — PROMPT GENERATION:
After I answer, synthesize my responses into a well-structured prompt
using the most appropriate framework (CO-STAR / RISEN / RACE / etc.).
Show me the prompt before executing it.
```

## Complete Examples

### Example 1: Minimal Trigger

**User intent:**
```
I want to create a training program for new customer success managers.
Before responding, ask me all the questions you need to give me the
best possible answer.
```

**AI interview questions (FATA style):**
```
1. What is the typical background of your CSM hires? (e.g., sales background,
   support, fresh graduates, industry-specific experience)
2. What does "trained" look like — what should a new CSM be able to do
   independently after completing the program?
3. How long is the onboarding period, and how much of it is dedicated to
   structured training vs. on-the-job learning?
4. What are the 2-3 biggest mistakes or gaps you currently see in new CSMs
   within their first 90 days?
5. Do you have existing training materials, playbooks, or product documentation
   I should build around?
6. What format should the program take? (e.g., written modules, video, live
   sessions, shadowing, quizzes)
7. Who else is involved in training — manager, buddy, product team?
```

### Example 2: Expert Domain Interview

```
You are an expert in B2B SaaS pricing strategy.

My goal: Help me design a pricing model for our new product launch.

Before advising, interview me to understand our specific situation.
Ask one question at a time. Cover: business model, customer segments,
competitive landscape, current revenue, and any pricing constraints.
Only advise once you have a full picture.
```

### Example 3: Two-Stage Prompt Builder

```
STAGE 1 — INTERVIEW:
You are an expert prompt engineer and technical writer.

I want to create documentation for a developer API. Before writing
anything, interview me with 6-8 targeted questions covering: the API's
purpose, target developer audience, existing documentation (if any),
format preferences, code example requirements, and any constraints.

STAGE 2 — PROMPT GENERATION:
After I answer all questions, write a complete structured prompt using
the RISEN or CO-STAR framework that I can use to generate the full
documentation. Show me the prompt and confirm before executing.
```

## Best Use Cases

1. **Complex Tasks with Fuzzy Requirements**
   - Strategy development
   - Training program design
   - Product planning

2. **Non-Expert Users**
   - Domain unfamiliar → AI surfaces the right questions
   - Removes the burden of knowing what details to provide

3. **Discovery and Scoping**
   - Project kickoffs
   - Requirements gathering
   - Consulting-style engagements

4. **Prompt Engineering Assistance**
   - Let the AI build the full prompt from an interview
   - Combine with any other framework as a pre-step

5. **Two-Stage Workflows**
   - Stage 1: Interview → Stage 2: Execute with synthesized context

## Selection Criteria

**Choose Reverse Role Prompting when:**
- ✅ Requirements are unclear or underdeveloped
- ✅ You're not sure what details the AI needs
- ✅ You want the AI to surface considerations you haven't thought of
- ✅ Task is complex enough to warrant a scoping conversation
- ✅ You want a reusable prompt generated from the interview

**Avoid when:**
- ❌ Requirements are clear → write the prompt directly, or use RPEF to recover one
- ❌ Simple, well-defined task → use APE, RTF, or CTF
- ❌ Time-sensitive → the interview adds a turn

## FATA vs. Conversational Interview

| | FATA (All Questions at Once) | Conversational (One at a Time) |
|---|---|---|
| Speed | Faster (one extra turn) | Slower (one turn per question) |
| Feel | Clinical, structured | Natural, adaptive |
| Depth | Fixed set upfront | Each answer shapes next question |
| Best for | Clear domain, standard questions | Complex tasks with branching requirements |

## Quick Reference

| Component | Purpose |
|-----------|---------|
| Intent Statement | Minimal starting point (1-2 sentences) |
| Interview Trigger | Activates the AI-led questioning mode |
| Domain Scope | Expert lens for the interview |
| Interview Mode | Batch (FATA) vs. conversational |
| Synthesis | Execute directly or generate a reusable prompt |
