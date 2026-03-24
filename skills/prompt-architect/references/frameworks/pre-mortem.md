# Pre-Mortem Prompting

## Overview

Pre-Mortem Prompting adapts Gary Klein's prospective hindsight technique to AI prompting. Instead of asking "what could go wrong?" (which triggers optimism bias and produces vague risks), it instructs the AI to *assume* the project or decision has already failed catastrophically — then work backwards to identify the specific reasons why. This committed-failure frame consistently produces more specific, actionable failure identification than forward risk analysis.

**Research basis:** Gary Klein's prospective hindsight research (Cognitive Systems Engineering; Brookings Institution). Studies show ~30% improvement in correct identification of failure causes compared to standard forward risk analysis. Application to LLM prompting is practitioner-level (no dedicated AI paper), but the cognitive mechanism is well-established.

## Why Assumed Failure Outperforms Forward Risk Analysis

Forward risk: *"What could go wrong?"* → Produces vague, hedged answers ("there might be delays", "adoption could be low")

Pre-mortem: *"This has already failed — why did it fail?"* → Produces specific, committed answers ("the integration with Salesforce took 3x longer than estimated because we didn't account for their API rate limits")

The difference: by committing to the failure frame, the model bypasses optimism bias and generates specific causal narratives rather than probabilistic hedges.

## Components

### Project/Decision Description
**Purpose:** What is being analyzed. Include enough context for the model to generate specific (not generic) failure causes.

### Future Date
**Purpose:** Set the time horizon. "12 months from now" produces different analysis than "3 months from now." Match to the natural completion window of the project.

### Failure Framing
**Purpose:** The core assumption: this has failed. Not "might fail" — has failed. The framing is everything.

**Standard framing:** *"It is [future date] and [project/decision] has completely and catastrophically failed."*

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

### Mitigation Pass (optional)
**Purpose:** A second pass ranking the failure causes by likelihood × preventability and suggesting pre-emptive actions.

## Template Structure

```
PRE-MORTEM ANALYSIS

PROJECT/DECISION:
[Describe the project, plan, or decision being analyzed]

FAILURE ASSUMPTION:
It is [DATE — e.g., 12 months from now] and [project/decision] has
completely and catastrophically failed. It did not achieve [primary goal].

FAILURE ANALYSIS:
Describe the failure in 2-3 sentences from the perspective of someone
looking back on it.

Then identify [8-12] specific reasons this failed. For each reason:
- CAUSE: [What specifically went wrong — be specific, not generic]
- DOMAIN: [Technical / People / Market / Financial / External / Timeline]
- WARNING SIGN: [What was the earliest observable indicator this was happening?]

PRIORITY:
After listing all causes, identify:
1. The 3 most likely failure causes (given our specific situation)
2. The 3 most preventable failure causes (where action now would help most)
3. Any single point of failure that could kill the project alone
```

## Complete Examples

### Example 1: Product Launch

```
PROJECT:
We are launching a new B2B project management tool for engineering teams
in Q3. Our team is 4 engineers, 1 designer, and 1 PM. We have 3 design
partners signed up for beta. Target: 50 paying customers by end of Q4.

FAILURE ASSUMPTION:
It is December 31st and we have failed to reach 50 paying customers.
The product launched in October with 8 beta customers but growth stalled.

FAILURE ANALYSIS:
Describe how this played out. Then identify 10 specific failure causes
with domain, and earliest warning sign for each.

PRIORITY:
Rank by likelihood. Flag any single points of failure.
```

### Example 2: Organizational Change

```
PROJECT:
We are implementing a company-wide shift to OKRs across a 200-person
organization. Executive sponsorship is in place. We're starting with
a 2-day offsite to train team leads, then cascading to individual
contributors over the following 6 weeks.

FAILURE ASSUMPTION:
It is 6 months from now and the OKR implementation has failed.
Most teams have abandoned OKRs and reverted to old goal-setting methods.

FAILURE ANALYSIS:
10 specific reasons the rollout failed. Include: leadership domain,
middle management domain, cultural domain, process domain, and tooling.
For each: earliest warning sign.

PRIORITY:
The 3 most likely. The most preventable. Any single point of failure.
```

### Example 3: Technical Decision

```
PROJECT:
We are migrating our primary database from MySQL to PostgreSQL. Timeline:
3 months. Team: 2 senior engineers part-time. We're running 2M daily
active users with a 99.9% uptime SLA.

FAILURE ASSUMPTION:
It is 4 months from now and the migration has failed. We experienced
significant downtime, data integrity issues, or were forced to roll back.

FAILURE ANALYSIS:
10 specific technical and organizational failure causes.
Cover: migration strategy, testing gaps, rollback planning,
team knowledge gaps, operational issues, and unforeseen dependencies.
For each: earliest warning sign.

PRIORITY:
The 3 most likely. The most preventable. Any single point of failure
that could cause a full rollback or data loss.
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

| Component | Purpose |
|-----------|---------|
| Project Description | What's being analyzed |
| Future Date | Time horizon |
| Failure Framing | "Has already failed" (committed, not probabilistic) |
| Domain Analysis | Dimensions to cover |
| Warning Signs | Earliest observable indicators |
| Priority Pass | Most likely + most preventable + single points of failure |
