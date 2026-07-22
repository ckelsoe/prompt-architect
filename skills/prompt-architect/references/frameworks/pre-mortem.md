# Pre-Mortem Prompting

## Overview

Pre-Mortem Prompting adapts Gary Klein's prospective hindsight technique to AI prompting. Instead of asking "what could go wrong?" (which triggers optimism bias and produces vague risks), it instructs the AI to *assume* the project or decision has already failed catastrophically — then work backwards to identify the specific reasons why. In practice this committed-failure frame tends to yield more specific, actionable failure identification than an open-ended "what could go wrong?" question.

**Research basis:** Mitchell, Russo & Pennington, "Back to the Future: Temporal Perspective in the Explanation of Events" (*Journal of Behavioral Decision Making*, 1989) found that prospective hindsight — imagining an event has *already occurred* — increases the ability to correctly identify **reasons for future outcomes** by ~30%, compared with imagining it *might* occur. Gary Klein popularized the technique as the "pre-mortem" (*Harvard Business Review*, September 2007), which is where the 30% figure is most often cited from. Note the measured comparison is already-happened vs. might-happen framing, not pre-mortem vs. forward risk analysis. Application to LLM prompting is practitioner-level (no dedicated AI paper), but the cognitive mechanism is well-established.

## Why the Assumed-Failure Frame Helps

Forward risk: *"What could go wrong?"* → Tends to produce vague, hedged answers ("there might be delays", "adoption could be low")

Pre-mortem: *"This has already failed — why did it fail?"* → Tends to produce specific, committed answers ("the integration with Salesforce took 3x longer than estimated because we didn't account for their API rate limits")

The mechanism: committing to the failure frame bypasses optimism bias and elicits specific causal narratives rather than probabilistic hedges. This is the practitioner rationale for the technique — the 1989 study measured the certainty framing itself, not a head-to-head against forward risk analysis, so treat the comparison above as an observed pattern rather than a measured result.

## Components

### Source Material (optional)
**Purpose:** The project plan, proposal, or decision document the analysis works from. Supplying it grounds the failure causes in what the plan actually says rather than in the model's assumptions about a project of that description. The template's slot is optional and self-deleting: if there is nothing to paste, the bracketed block and the sentence directly below it both come out.

### Project/Decision Description
**Purpose:** What is being analyzed. Include enough context for the model to generate specific (not generic) failure causes.

### Future Date
**Purpose:** Set the time horizon. "12 months from now" produces different analysis than "3 months from now." Match to the natural completion window of the project.

### Failure Framing
**Purpose:** The core assumption: this has failed. Not "might fail" — has failed. The framing is everything.

**Standard framing:** *"It is [future date] and [project/decision] has completely and catastrophically failed."*

**The frame has to be defended, not just stated.** A model given only the assumption will drift back into probabilistic language within a few sentences — "adoption may have lagged", "the integration could have slipped" — which collapses the pre-mortem back into ordinary forward risk analysis and throws away the entire mechanism. The template therefore opens by declaring the failure settled fact rather than a possibility, and closes that opening with an explicit prohibition: *do not hedge with "could," "might," or "may."* Keep both. Per SKILL.md step 5, a prohibition the user relies on must survive into the emitted prompt as explicit instruction text — it cannot be left to a section header, because headers are stripped at emission.

### Domain Analysis
**Purpose:** The specific dimensions to analyze for failure causes. More dimensions = more comprehensive coverage.

**Standard domains:**
- Technical / product
- People / team / organizational
- Market / customers / adoption
- Financial / resource
- External / dependencies
- Timeline / scope

### Warning Signs
**Purpose:** For each failure cause, identify the earliest observable warning sign. This is what makes pre-mortem actionable — not just "this could fail" but "this is what we'd see 30 days before it fails."

### Priority Assessment
**Purpose:** A closing pass over the causes already listed, singling out three things: the 3 most LIKELY to be what actually happened, the 3 most PREVENTABLE — where action taken today would have made the most difference — and any single point of failure that could have killed the project on its own.

These are two separate top-3 lists, not one ranking by a combined likelihood-and-preventability score. A cause can be near-certain and unpreventable, or unlikely and trivially preventable; collapsing them into a single ranking buries both. The preventable list is the one that converts the analysis into action. Unlike Source Material above, this slot is unconditional — the template gives it no bracketed block and no deletion instruction.

## Template Structure

Section headers are stripped at emission, so every slot's meaning is carried by the prose around and inside it rather than by the header above it. The opening paragraph is not a title — it is the instruction that establishes the settled-failure frame, and it ships with the prompt.

```
You are conducting a pre-mortem on the project described below. The failure stated further
down is settled fact, not a possibility — work backwards from it and explain why it happened.
Do not hedge with "could," "might," or "may."

SOURCE MATERIAL:
[Optional — paste the project plan, proposal, or decision document here. If you have nothing
to paste, delete this bracketed block along with the sentence directly below it.]
Use the material above as the factual basis for the work described below.

PROJECT/DECISION:
[Describe the project, plan, or decision being analyzed in full sentences — what is being
attempted, plus team size, timeline, resources, goals, and constraints]

FAILURE ASSUMPTION:
It is [DATE — e.g., 12 months from now] and [project/decision] has completely and
catastrophically failed. It did not achieve [primary goal].

FAILURE NARRATIVE:
Begin by describing how that failure unfolded, in 2-3 sentences, in past tense from the
perspective of someone looking back on it.

FAILURE CAUSES:
Then identify [8-12] specific reasons it failed, each stated as something that already went
wrong. Cover technical/product, team/organizational, market/adoption, financial/resource,
external dependencies, and timeline/scope. Give each cause three lines:
- CAUSE: [What specifically went wrong — be specific, not generic]
- DOMAIN: [Technical / People / Market / Financial / External / Timeline]
- WARNING SIGN: [What was the earliest observable indicator this was happening?]
"CAUSE:", "DOMAIN:" and "WARNING SIGN:" are literal labels in this protocol, not headings —
keep them exactly as written.

PRIORITY ASSESSMENT:
After listing every cause, close by singling out three things:
1. The 3 causes most LIKELY to be what actually happened, given the situation above.
2. The 3 most PREVENTABLE causes — where action taken today would have made the most
   difference.
3. Any single point of failure that could have killed the project on its own.
```

Three notes on why the shape is what it is:

`FAILURE NARRATIVE` and `FAILURE CAUSES` are separate slots because they ask for different things — one continuous retrospective paragraph, then a structured enumeration. Collapsing them into a single analysis slot reliably produces a list with a narrative sentence stapled to the front, losing the retrospective voice that carries the frame.

The `CAUSE` / `DOMAIN` / `WARNING SIGN` labels are the one place in this template where bare labels do survive into the output, because they are labels *inside* the requested response format rather than scaffolding headers around the prompt. The template says so explicitly, which is why that line is part of the prompt and not a comment about it.

Every instruction slot is phrased as a sequenced directive — "Begin by", "Then identify", "After listing every cause, close by" — so the ordering survives even with the headers removed.

## Complete Examples

Every example below keeps the headers on the page for readability, but is written in emitted form beneath them: the settled-failure paragraph first, then each slot carrying its own role in prose. Read the headers as scaffolding that will be deleted — the examples are written so that nothing is lost when it is. Note that only the user-supplied slots (source material, project, failure assumption) differ between examples; the instruction slots are the protocol and stay as written.

### Example 1: Product Launch

**Before Pre-Mortem:**
"What are the risks with our Q3 launch?"

**After Pre-Mortem** (source material supplied):
```
You are conducting a pre-mortem on the project described below. The failure stated further
down is settled fact, not a possibility — work backwards from it and explain why it happened.
Do not hedge with "could," "might," or "may."

SOURCE MATERIAL:
[Paste the Q3 launch plan and the three design partners' beta feedback notes here]
Use the material above as the factual basis for the work described below.

PROJECT/DECISION:
We are launching a new B2B project management tool for engineering teams in Q3. The team is
4 engineers, 1 designer, and 1 PM. Three design partners are signed up for the beta. The
target is 50 paying customers by the end of Q4, against two quarters of remaining runway.

FAILURE ASSUMPTION:
It is December 31st and the launch has completely and catastrophically failed. It did not
achieve 50 paying customers. The product shipped in October with 8 beta customers and
growth stalled there.

FAILURE NARRATIVE:
Begin by describing how that failure unfolded, in 2-3 sentences, in past tense from the
perspective of someone looking back on it.

FAILURE CAUSES:
Then identify 10 specific reasons it failed, each stated as something that already went
wrong. Cover technical/product, team/organizational, market/adoption, financial/resource,
external dependencies, and timeline/scope. Give each cause three lines:
- CAUSE: [What specifically went wrong — be specific, not generic]
- DOMAIN: [Technical / People / Market / Financial / External / Timeline]
- WARNING SIGN: [What was the earliest observable indicator this was happening?]
"CAUSE:", "DOMAIN:" and "WARNING SIGN:" are literal labels in this protocol, not headings —
keep them exactly as written.

PRIORITY ASSESSMENT:
After listing every cause, close by singling out three things:
1. The 3 causes most LIKELY to be what actually happened, given the situation above.
2. The 3 most PREVENTABLE causes — where action taken today would have made the most
   difference.
3. Any single point of failure that could have killed the launch on its own.
```

### Example 2: Organizational Change

**Before Pre-Mortem:**
"What could go wrong with our OKR rollout?"

**After Pre-Mortem** (no source material — the optional block and its follow-on sentence are both deleted):
```
You are conducting a pre-mortem on the project described below. The failure stated further
down is settled fact, not a possibility — work backwards from it and explain why it happened.
Do not hedge with "could," "might," or "may."

PROJECT/DECISION:
We are implementing a company-wide shift to OKRs across a 200-person organization.
Executive sponsorship is in place. The rollout starts with a 2-day offsite to train team
leads, then cascades to individual contributors over the following 6 weeks. No dedicated
program manager is assigned; team leads absorb the work alongside their existing roles.

FAILURE ASSUMPTION:
It is 6 months from now and the OKR implementation has completely and catastrophically
failed. It did not achieve durable adoption — most teams abandoned OKRs and reverted to
their old goal-setting methods.

FAILURE NARRATIVE:
Begin by describing how that failure unfolded, in 2-3 sentences, in past tense from the
perspective of someone looking back on it.

FAILURE CAUSES:
Then identify 10 specific reasons it failed, each stated as something that already went
wrong. Cover leadership behavior, middle-management incentives, culture, process design,
tooling, and timeline/scope. Give each cause three lines:
- CAUSE: [What specifically went wrong — be specific, not generic]
- DOMAIN: [Leadership / Middle management / Culture / Process / Tooling / Timeline]
- WARNING SIGN: [What was the earliest observable indicator this was happening?]
"CAUSE:", "DOMAIN:" and "WARNING SIGN:" are literal labels in this protocol, not headings —
keep them exactly as written.

PRIORITY ASSESSMENT:
After listing every cause, close by singling out three things:
1. The 3 causes most LIKELY to be what actually happened, given the situation above.
2. The 3 most PREVENTABLE causes — where action taken today would have made the most
   difference.
3. Any single point of failure that could have killed the rollout on its own.
```

Note the substituted `DOMAIN` values. The template's six domains are the general-purpose default; where a project's real failure surfaces are known, naming them gets better coverage than the generic set. The label itself stays literal.

### Example 3: Technical Decision

**Before Pre-Mortem:**
"Review our database migration plan for risks."

**After Pre-Mortem** (source material supplied):
```
You are conducting a pre-mortem on the project described below. The failure stated further
down is settled fact, not a possibility — work backwards from it and explain why it happened.
Do not hedge with "could," "might," or "may."

SOURCE MATERIAL:
[Paste the migration runbook, the current schema, and the rollback plan here]
Use the material above as the factual basis for the work described below.

PROJECT/DECISION:
We are migrating our primary database from MySQL to PostgreSQL over a 3-month timeline. The
team is 2 senior engineers working part-time on it. The system serves 2M daily active users
under a 99.9% uptime SLA, and neither engineer has run a migration at this scale before.

FAILURE ASSUMPTION:
It is 4 months from now and the migration has completely and catastrophically failed. It did
not achieve a clean cutover — we took significant downtime, hit data integrity problems, and
were forced to roll back.

FAILURE NARRATIVE:
Begin by describing how that failure unfolded, in 2-3 sentences, in past tense from the
perspective of someone looking back on it.

FAILURE CAUSES:
Then identify 10 specific reasons it failed, each stated as something that already went
wrong. Cover migration strategy, testing gaps, rollback planning, team knowledge gaps,
operational and on-call issues, and unforeseen dependencies. Give each cause three lines:
- CAUSE: [What specifically went wrong — be specific, not generic]
- DOMAIN: [Strategy / Testing / Rollback / Knowledge / Operations / Dependencies]
- WARNING SIGN: [What was the earliest observable indicator this was happening?]
"CAUSE:", "DOMAIN:" and "WARNING SIGN:" are literal labels in this protocol, not headings —
keep them exactly as written.

PRIORITY ASSESSMENT:
After listing every cause, close by singling out three things:
1. The 3 causes most LIKELY to be what actually happened, given the situation above.
2. The 3 most PREVENTABLE causes — where action taken today would have made the most
   difference.
3. Any single point of failure that could have forced a full rollback or caused data loss
   on its own.
```

## Best Use Cases

1. **Pre-Launch Risk Assessment**
   - Product launches
   - Marketing campaigns
   - Feature releases

2. **Organizational Initiatives**
   - Process changes, reorgs, new methodologies
   - Cultural initiatives

3. **Technical Decisions**
   - Migrations, rewrites, architecture changes
   - High-risk deployments

4. **Investment and Strategic Decisions**
   - New market entry
   - Major hires or partnerships
   - Significant capital allocation

5. **Any High-Stakes, Hard-to-Reverse Decision**

## Selection Criteria

**Choose Pre-Mortem when:**
- ✅ You're about to commit to something with significant stakes
- ✅ You want specific failure causes, not generic risks
- ✅ Optimism bias is a risk (you're attached to this plan)
- ✅ You want to surface the "what were we thinking?" failure modes

**Avoid when:**
- ❌ You want to attack the reasoning of a current position → use Devil's Advocate
- ❌ You want iterative output improvement → use Self-Refine
- ❌ The decision is already made and irreversible (too late for pre-mortem)

## Pre-Mortem vs. Devil's Advocate

| | Pre-Mortem | Devil's Advocate |
|---|---|---|
| Frame | "This has already failed" (committed) | "Here's why this is wrong" (oppositional) |
| Output | Specific failure causes + warning signs | Strongest opposing argument |
| Best for | Risk identification + mitigation | Testing reasoning + debiasing |
| Bias bypass | Optimism bias | Confirmation bias / groupthink |

**Combined use:** Run Devil's Advocate first (attack the reasoning), then Pre-Mortem (assume failure and find causes). They complement each other for high-stakes decisions.

## Quick Reference

| Template slot | Purpose |
|-----------|---------|
| Opening paragraph | Declares the failure settled fact; bans "could / might / may" |
| `SOURCE MATERIAL` | Optional plan or decision document to ground causes in; self-deleting |
| `PROJECT/DECISION` | What's being analyzed, with team, timeline, resources, constraints |
| `FAILURE ASSUMPTION` | Time horizon + "has already failed" + the goal it missed |
| `FAILURE NARRATIVE` | 2-3 sentences, past tense, retrospective voice |
| `FAILURE CAUSES` | 8-12 causes, each as CAUSE / DOMAIN / WARNING SIGN |
| `PRIORITY ASSESSMENT` | Most likely + most preventable + single points of failure |
