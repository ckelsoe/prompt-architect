# BROKE Framework

## Overview

BROKE (Background, Role, Objective, Key Results, Evolve) is a business-oriented prompt framework that combines OKR-style measurable outcomes with a built-in self-improvement loop. Its defining feature — the **Evolve** step — instructs the AI to critique its own output and suggest 3 ways to improve it, turning a single prompt into a structured iteration cycle without requiring manual re-prompting.

**Origin:** Community/practitioner framework (documented at myframework.net and in educational AI research). Cited in peer-reviewed educational technology research (Springer, 2025). Widely adopted in business and marketing AI workflows.

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
**Purpose:** Define measurable outcomes that the output should help achieve. This is the OKR element — it sets a business success bar, not just a quality bar.

**Questions to Ask:**
- What measurable outcome should this drive?
- How will we know this worked?
- What metric should improve?

**Examples:**
- "Key result: reduce average sales cycle from 90 to 60 days within one quarter"
- "Key result: reduce repeat tickets by 30% within 60 days of publishing"
- "Key result: increase trial-to-paid conversion from 12% to 18%"

### E — Evolve
**Purpose:** After completing the task, the AI provides 3 specific suggestions for improving the output or the prompt itself. This creates a self-improving loop.

**Standard Evolve instruction:**
"After completing your response, provide 3 suggestions for how this output or the prompt could be improved in a follow-up iteration."

**Variations:**
- "List 3 things you would do differently to make this more effective"
- "After your response, identify the 3 weakest aspects and how to address them"
- "After responding, suggest 3 ways to test whether this achieves the Key Results"

## Template Structure

```
BACKGROUND:
[Current situation, why this task exists, relevant constraints and history]

ROLE:
[Professional persona and expertise to embody]

OBJECTIVE:
[The specific task and deliverable]

KEY RESULTS:
[Measurable outcomes this output should help achieve — how success is defined]

EVOLVE:
After completing your response, provide 3 specific suggestions for improving
this output or approach in a follow-up iteration.
```

## Complete Examples

### Example 1: Sales Process Improvement

**Before BROKE:**
"Help us improve our sales process."

**After BROKE:**
```
BACKGROUND:
We're a B2B SaaS company (40 employees, $3M ARR) selling to mid-market
operations teams. Our average deal size is $24K ARR. Sales cycle has
lengthened from 45 days to 90 days over the last 2 quarters. Win rate
has held steady at 28% so the issue isn't qualification — it's cycle time.
Primary bottleneck appears to be the "legal review" stage, which now
averages 35 days after verbal agreement.

ROLE:
You are an experienced enterprise SaaS sales consultant who specializes
in deal velocity and reducing friction in the close process.

OBJECTIVE:
Identify the root causes of the 35-day legal review bottleneck and
provide a prioritized action plan to reduce it.

KEY RESULTS:
- Reduce legal review stage from 35 days to 15 days within 2 quarters
- Increase overall win rate from 28% to 32% by removing friction at close
- Reduce sales rep time spent on legal coordination by 50%

EVOLVE:
After your response, provide 3 suggestions for how this analysis or
action plan could be improved with additional information or a different
approach.
```

### Example 2: Content Strategy

**Before BROKE:**
"Create a content plan for our blog."

**After BROKE:**
```
BACKGROUND:
We are a developer tools company (open-source project management for engineers).
Our blog currently publishes 2 posts/month with low organic traffic (500
visits/month). Competitors publish 8-12 posts/month and dominate searches for
our core keywords. Our DevRel team has capacity for 4 posts/month.

ROLE:
You are a content strategist specializing in developer-focused technical
content marketing and SEO.

OBJECTIVE:
Create a 3-month content calendar targeting keywords with real traffic
potential and aligned with our product's value proposition.

KEY RESULTS:
- Increase organic blog traffic from 500 to 2,000 visits/month in 3 months
- Generate 50+ qualified leads from content monthly by month 4
- Rank on page 1 for at least 5 target keywords within 6 months

EVOLVE:
After your content calendar, suggest 3 improvements — either to the
plan itself or additional information that would make it more effective.
```

### Example 3: Team Process

**Before BROKE:**
"How should we run better sprint retrospectives?"

**After BROKE:**
```
BACKGROUND:
Our 8-person engineering team has been running 2-week sprints for 6 months.
Retrospectives currently take 45 minutes and follow Start/Stop/Continue.
Team feedback: retros feel repetitive, same issues come up every sprint,
no visible follow-through on action items between retros.

ROLE:
You are an experienced Agile coach who has worked with engineering teams
at growth-stage startups.

OBJECTIVE:
Redesign our retrospective format and process to make action items
stick and prevent the same issues from recurring.

KEY RESULTS:
- Reduce repeat items in retros by 70% within 2 months
- At least 80% of action items closed before next retro
- Team satisfaction with retros (currently 5/10) above 7.5/10 by month 2

EVOLVE:
After your recommendations, provide 3 things you would need to know
to make this advice more specific or likely to succeed.
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
| Key Results | Success metrics | "How will we measure success?" |
| Evolve | Self-improvement | "How can this be better?" |
