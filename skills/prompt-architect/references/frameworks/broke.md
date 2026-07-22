# BROKE Framework

## Overview

BROKE (Background, Role, Objective, Key Results, Evolve) is a business-oriented prompt framework that combines OKR-style measurable outcomes with a built-in self-improvement loop. Its defining feature — the **Evolve** step — instructs the AI to critique its own output and suggest 3 ways to improve it, turning a single prompt into a structured iteration cycle without requiring manual re-prompting.

**Origin:** Community/practitioner framework, documented at myframework.net. Practitioner framework — no controlled evaluation of BROKE has been published.

*Correction:* an earlier version of this file stated that BROKE was "Cited in peer-reviewed educational technology research (Springer, 2025)" and "widely adopted in business and marketing AI workflows." The first named no title, author, or DOI and was not checkable as written; the second was an unsupported adoption claim. Both have been removed.

## Components

### B — Background
**Purpose:** Provide the situational context the AI needs — the current state, why this task exists, and any relevant history or constraints.

**Questions to Ask:**
- What is the current situation?
- Why does this task need to be done?
- What constraints apply?
- What has already been tried?

**Examples:**
- "We are a 50-person B2B SaaS company approaching Series B. Our sales cycle has lengthened from 45 to 90 days over the past 2 quarters..."
- "Our support team is handling 500 tickets/day and 40% are repeat questions about the same 10 topics..."

### R — Role
**Purpose:** Define the professional persona and expertise the AI should embody.

**Questions to Ask:**
- What domain expertise is needed?
- What professional perspective?

**Examples:**
- "You are an experienced B2B sales consultant who specializes in enterprise deal acceleration..."
- "Act as a senior customer success manager with experience building help content..."

### O — Objective
**Purpose:** State the specific task — what needs to be delivered.

**Questions to Ask:**
- What is the deliverable?
- What exactly needs to be done?

**Examples:**
- "Analyze our sales process and identify the top 3 friction points causing deal elongation..."
- "Create a set of 10 FAQ entries covering the most common support topics..."

### K — Key Results

**Purpose:** Define measurable *business* outcomes the output should help achieve — a business success bar, not only a quality bar. This is the reading BROKE is routed on in this package, and it is what the template's `KEY RESULTS` slot holds.

**Source reading, and how this package splits it.** The source framework at myframework.net glosses K as the key result of the *answer* — a specification of what the response must contain and what form it must take. This package does not discard that reading; it carries it in a separate slot. `broke_template.txt` holds response-shape requirements in `OUTPUT FORMAT` (placed immediately after `OBJECTIVE`) and business outcomes in `KEY RESULTS`. Both readings are implemented; they simply live in different slots, because a single slot holding both produced templates that specified neither well.

*Correction:* an earlier version of this file gave the business-KPI reading alone — "Define measurable outcomes that the output should help achieve. This is the OKR element" — and presented it as the source framework's own definition of K, with no note that it diverged. It does diverge: myframework.net's gloss of K is the key result of the answer, i.e. a specification of the response itself. The divergence is now disclosed rather than silent, and the discarded half is implemented as `OUTPUT FORMAT`. Caveat on this correction's evidence: myframework.net is a practitioner site with no versioning or archival copy, and the gloss above is a paraphrase of a short entry rather than a quotation from a stable document. Treat the split as this package's disclosed design choice, not as a settled reading of the source.

**Questions to Ask:**
- What measurable business outcome should this drive?
- What metric should improve, and how will we know this worked?
- *(feeds `OUTPUT FORMAT`)* What must the response itself contain, and in what form, length, and depth?

**Examples — business outcome (`KEY RESULTS`):**
- "Key result: reduce average sales cycle from 90 to 60 days within one quarter"
- "Key result: reduce repeat tickets by 30% within 60 days of publishing"
- "Key result: increase trial-to-paid conversion from 12% to 18%"

**Examples — answer specification (`OUTPUT FORMAT`):**
- "Rank the top 3 friction points, with supporting evidence and a proposed fix for each"
- "Cover all 10 topics, one FAQ entry each, in question-and-answer form"

### E — Evolve
**Purpose:** After completing the task, the AI provides 3 specific suggestions for improving the output or the prompt itself. This creates a self-improving loop.

**Standard Evolve instruction:**
"After completing your response, provide 3 suggestions for how this output or the prompt could be improved in a follow-up iteration."

**Variations:**
- "List 3 things you would do differently to make this more effective"
- "After your response, identify the 3 weakest aspects and how to address them"
- "After responding, suggest 3 ways to test whether this achieves the Key Results"

## Template Structure

Section headers are stripped at emission, so every slot's meaning is carried by the prose around and inside it rather than by the header above it.

```
This is a business task with a defined success bar. Everything below describes one
deliverable.

SOURCE MATERIAL:
[Optional — paste the material this task works from here, named specifically: the current
process document, the performance data, the existing draft. If you have nothing to paste,
delete this bracketed block along with the sentence directly below it.]
Use the material above as the factual basis for the work described below.

BACKGROUND:
Here is the situation this task arises from:
[Describe the current state as narrative prose: what the organization is, what is
happening now, and why this task exists. Add prior attempts and constraints only where the
user supplied them; never invent them.]

ROLE:
Take on this professional persona for the work:
[One second-person sentence beginning "You are…", naming the domain expertise and level of
experience this task requires.]

OBJECTIVE:
Your task is to do the following:
[One imperative sentence naming what to analyze or produce and what the finished artifact
is.]

OUTPUT FORMAT:
Deliver your response in this shape:
[Name the sections the response should contain, its approximate length or item count, and
how much supporting detail each part carries.]

KEY RESULTS:
Your response will be judged on whether it can plausibly move the measurable outcomes
below. They are the success bar, not tasks to carry out:
[List each outcome as a statement naming the metric and its target. Add a baseline or time
frame only where the user gave one; never invent one — write "[you fill this in: current
value of <metric>]" instead.]

EVOLVE:
After completing your response, provide 3 specific suggestions for improving this output
or approach in a follow-up iteration.
```

`OUTPUT FORMAT` is a sixth element in a five-letter acronym. It exists because this package reads K as a business success bar (see the K component above), which leaves the deliverable's shape unspecified. It sits between `OBJECTIVE` and `KEY RESULTS` so that the response's shape is fixed before the metrics appear — which keeps the metrics readable as an evaluation bar for an already-defined artifact rather than as a second set of tasks.

## Complete Examples

Every example below is shown in emitted form: the framing sentence first, then each
slot carrying its own role in prose. Read the headers as scaffolding that will be
deleted — the examples are written so that nothing is lost when it is.

### Example 1: Sales Process Improvement

**Before BROKE:**
"Help us improve our sales process."

**After BROKE** (source material supplied):
```
This is a business task with a defined success bar. Everything below describes one
deliverable.

SOURCE MATERIAL:
[Paste the CRM stage-duration export for the last two quarters here]
Use the material above as the factual basis for the work described below.

BACKGROUND:
Here is the situation this task arises from:
We are a B2B SaaS company of 40 employees at $3M ARR, selling to mid-market
operations teams at an average deal size of $24K ARR. Our sales cycle has
lengthened from 45 days to 90 days over the last two quarters. Win rate has held
steady at 28%, so the problem is not qualification — it is cycle time. The primary
bottleneck appears to be the legal review stage, which now averages 35 days after
verbal agreement.

ROLE:
Take on this professional persona for the work:
You are an experienced enterprise SaaS sales consultant who specializes in deal
velocity and in removing friction from the close process.

OBJECTIVE:
Your task is to do the following:
Identify the root causes of the 35-day legal review bottleneck and produce a
prioritized action plan for reducing it.

OUTPUT FORMAT:
Deliver your response in this shape:
Open with a ranked list of root causes, each stated in one sentence with the
evidence from the material above that supports it. Follow with an action plan of
five to eight items ordered by expected impact, giving each item an owning role, an
effort estimate, and the root cause it addresses. Close with a short paragraph
naming which causes the supplied data cannot settle.

KEY RESULTS:
Your response will be judged on whether it can plausibly move the measurable outcomes
below. They are the success bar, not tasks to carry out:
- Reduce the legal review stage from 35 days to 15 days within 2 quarters.
- Increase overall win rate from 28% to 32% by removing friction at close.
- Reduce sales rep time spent on legal coordination by 50%.

EVOLVE:
After completing your response, provide 3 specific suggestions for improving this
analysis or action plan in a follow-up iteration.
```

### Example 2: Content Strategy

**Before BROKE:**
"Create a content plan for our blog."

**After BROKE** (no source material — the calendar is generated from scratch, so the
`SOURCE MATERIAL` block and the sentence below it are both deleted):
```
This is a business task with a defined success bar. Everything below describes one
deliverable.

BACKGROUND:
Here is the situation this task arises from:
We are a developer tools company building open-source project management for
engineers. Our blog currently publishes 2 posts per month and draws about 500
organic visits per month. Competitors publish 8 to 12 posts per month and dominate
search for our core keywords. Our DevRel team has capacity for 4 posts per month.

ROLE:
Take on this professional persona for the work:
You are a content strategist who specializes in developer-focused technical content
marketing and technical SEO.

OBJECTIVE:
Your task is to do the following:
Create a 3-month content calendar targeting keywords with real traffic potential
and aligned with our product's value proposition.

OUTPUT FORMAT:
Deliver your response in this shape:
Produce a month-by-month calendar of 12 posts, 4 per month. Give each post a
working title, its target keyword, the search intent it serves, the funnel stage it
belongs to, and a two-sentence summary of the angle. Follow the calendar with a
short section explaining the sequencing logic across the three months.

KEY RESULTS:
Your response will be judged on whether it can plausibly move the measurable outcomes
below. They are the success bar, not tasks to carry out:
- Increase organic blog traffic from 500 to 2,000 visits per month within 3 months.
- Generate 50 or more qualified leads from content per month by month 4.
- Rank on page 1 for at least 5 target keywords within 6 months.

EVOLVE:
After completing your calendar, provide 3 specific suggestions for improving this
plan, or name the additional information that would make it more effective.
```

### Example 3: Team Process

**Before BROKE:**
"How should we run better sprint retrospectives?"

**After BROKE** (source material supplied):
```
This is a business task with a defined success bar. Everything below describes one
deliverable.

SOURCE MATERIAL:
[Paste the notes and action-item lists from the last 4 retrospectives here]
Use the material above as the factual basis for the work described below.

BACKGROUND:
Here is the situation this task arises from:
Our 8-person engineering team has been running 2-week sprints for 6 months.
Retrospectives currently take 45 minutes and follow a Start/Stop/Continue format.
The team reports that retros feel repetitive, that the same issues resurface every
sprint, and that there is no visible follow-through on action items between retros.

ROLE:
Take on this professional persona for the work:
You are an experienced Agile coach who has worked with engineering teams at
growth-stage startups.

OBJECTIVE:
Your task is to do the following:
Redesign our retrospective format and the process around it so that action items
stick and the same issues stop recurring.

OUTPUT FORMAT:
Deliver your response in this shape:
Begin with a short diagnosis of why the current format is recycling issues, citing
specific patterns from the retro notes above. Then give the redesigned format as a
timeboxed agenda totalling 45 minutes or less. Then describe the between-retro
follow-through process, naming who owns each step. Close with the first three
changes to make and the order to make them in.

KEY RESULTS:
Your response will be judged on whether it can plausibly move the measurable outcomes
below. They are the success bar, not tasks to carry out:
- Reduce repeat items across retros by 70% within 2 months.
- Close at least 80% of action items before the next retro.
- Raise team satisfaction with retros from 5/10 to above 7.5/10 by month 2.

EVOLVE:
After completing your recommendations, provide 3 specific things you would need to
know to make this advice more specific or more likely to succeed.
```

## Best Use Cases

1. **Business Deliverables with Measurable Goals**
   - Strategy and planning documents
   - Process improvement plans
   - Marketing campaigns with KPIs

2. **When Iteration is Expected**
   - First-pass drafts meant for refinement
   - Exploratory analysis where the initial output will be critiqued
   - Any prompt where "try and improve" is the workflow

3. **OKR-Aligned Work**
   - Tasks tied to company objectives
   - Work that must justify its business impact
   - Anything where "did it work?" must be answerable

4. **Self-Improving Workflows**
   - When you want the AI to help you improve your own prompts
   - Iterative content creation
   - When you expect to run multiple versions

## Selection Criteria

**Choose BROKE when:**
- ✅ Business impact (Key Results) needs to be explicit
- ✅ You plan to iterate on the output
- ✅ Self-critique / suggestions are valuable
- ✅ Measurable success criteria exist
- ✅ Task is business/strategy/process oriented

**Avoid BROKE when:**
- ❌ Simple technical task → use RTF or APE
- ❌ No measurable outcome (creative/expressive) → use CO-STAR or CRISPE
- ❌ Already iterating → the Evolve step is redundant
- ❌ Complex multi-step process → use RISEN

## BROKE vs. RACE vs. RISEN

| | BROKE | RACE | RISEN |
|---|---|---|---|
| Unique feature | Key Results (OKR) + Evolve loop | Explicit Expectation | Steps + methodology |
| Best for | Business deliverables with KPIs | Expert task with context | Multi-step procedures |
| Iteration built in? | Yes (Evolve) | No | No |
| Business focus | High | Medium | Low |

## Quick Reference

| Component | Focus | Key Question |
|-----------|-------|--------------|
| Background | Situation | "What's the context and history?" |
| Role | Expertise | "Who should do this?" |
| Objective | Task | "What needs to be delivered?" |
| Output Format | Response shape | "What structure, length, and depth does the answer need?" |
| Key Results | Business success metrics | "What metric should this move, and by how much?" |
| Evolve | Self-improvement | "How can this be better?" |
