# CRISPE Framework

## Overview

CRISPE is a comprehensive general-purpose prompting framework covering six dimensions: Capacity and Role, Insight, Instructions, Personality, and Experiment. Its defining feature — the **Experiment** component — sets it apart from similar frameworks by explicitly asking the AI to produce multiple variants, approaches, or versions, enabling the user to compare and choose the best output rather than accepting a single answer.

**Origin:** Developed by Matt Nigh (community framework, 2022). Since adopted in clinical AI literature (cited in PMC peer-reviewed medical AI studies, 2024-2025) and educational technology research (Springer, 2025).

## Components

### C — Capacity and Role
**Purpose:** Define the expertise level and professional role the AI should embody. More specific than a simple "you are a..." — it combines the *type* of expertise with the *level* of sophistication expected.

**Questions to Ask:**
- What domain expertise is needed?
- At what level? (practitioner, expert, specialist, world-class?)
- Any specific sub-specialty?

**Examples:**
- "Act as an expert in marketing strategy with deep experience in B2B SaaS go-to-market..."
- "You are a senior software architect specializing in distributed systems..."
- "Act as a world-class UX researcher who has run hundreds of user interviews..."

### R — Insight
**Purpose:** Provide the background context, data, or knowledge the AI needs to perform the task effectively. This is the "briefing" — what you'd tell a new consultant before they start work.

**Questions to Ask:**
- What background does the AI need?
- What relevant data, constraints, or history applies?
- What does the AI need to know about the situation?

**Examples:**
- "Here's what we know: our churn rate is 8% monthly, concentrated in the SMB segment..."
- "Context: our team uses Python exclusively, we have a 3-month deadline, and our infrastructure is AWS..."
- "Background: this is for a Series A startup pitching to enterprise buyers for the first time..."

### I — Instructions
**Purpose:** State clearly and specifically what the AI should do. The task itself, with enough detail to remove ambiguity.

**Questions to Ask:**
- What exactly should be done?
- What's the deliverable?
- Any specific requirements for the output?

**Examples:**
- "Write a 6-week email drip campaign for free trial users..."
- "Create a technical design document for this feature..."
- "Analyze this data and identify the top 3 risk factors..."

### S — Personality (Style)
**Purpose:** Define the tone, voice, and communication style of the response. Sets how the output should *feel* — the personality it should embody.

**Questions to Ask:**
- What tone is appropriate?
- What writing style?
- How should the AI communicate — formal, casual, direct, nurturing?
- Any persona to embody?

**Examples:**
- "Write in the style of a direct, no-nonsense VP of Engineering..."
- "Use a warm, conversational tone that feels human and approachable..."
- "Be concise and data-driven; avoid fluff; treat the reader as intelligent..."

### E — Experiment
**Purpose:** Explicitly request multiple variants, approaches, or versions of the output. This is CRISPE's unique differentiator — instead of one answer, get 2-4 options with different approaches so you can compare and select or combine.

**Questions to Ask:**
- How many variants would be useful?
- What dimension of variation? (tone, approach, structure, length, angle)
- Should variants be compared or presented side-by-side?

**Examples:**
- "Provide 3 variations: one data-heavy, one narrative, one bulleted"
- "Give me 2 versions — one for a technical audience, one for executives"
- "Write 3 headline options with different angles"
- "Provide your best answer, then offer 2 alternative approaches I could take instead"

## Template Structure

```
CAPACITY AND ROLE:
[Define expertise level and professional role]

INSIGHT:
[Background context, data, and situation the AI needs to know]

INSTRUCTIONS:
[What exactly needs to be done — the task and deliverable]

PERSONALITY (STYLE):
[Tone, voice, communication style]

EXPERIMENT:
[Request N variants along a specific dimension — tone, approach, format, etc.]
```

## Complete Examples

### Example 1: Marketing Campaign

**Before CRISPE:**
"Write email campaigns for our SaaS product."

**After CRISPE:**
```
CAPACITY AND ROLE:
Act as an expert B2B SaaS email marketer with 10+ years of experience in
trial-to-paid conversion campaigns.

INSIGHT:
Our product is a project management tool for engineering teams. Free trial is
14 days. Current trial-to-paid conversion is 12%. Data shows most conversions
happen on days 3-5 or not at all. Our best customers are teams of 5-20 engineers
at growth-stage startups. Key value props: GitHub integration, sprint planning,
and automated reporting.

INSTRUCTIONS:
Write a 3-email drip sequence for free trial users. Emails trigger on: Day 1
(welcome), Day 4 (mid-trial activation), Day 12 (pre-expiry urgency).

PERSONALITY:
Direct, peer-to-peer tone — like advice from a fellow engineer, not a sales rep.
No corporate speak. Short. Respect the reader's time.

EXPERIMENT:
Provide 2 versions of the Day 12 urgency email: one that leads with FOMO/loss
framing, one that leads with social proof/success stories. Note which performs
better in most A/B tests and why.
```

### Example 2: Technical Documentation

**Before CRISPE:**
"Document our REST API."

**After CRISPE:**
```
CAPACITY AND ROLE:
You are a senior technical writer specializing in developer documentation for
APIs, with experience at developer-tools companies.

INSIGHT:
This is a public REST API for a payment processing service. Primary users are
backend developers integrating payments into their apps. Most are comfortable
with REST but may be unfamiliar with our specific auth flow (OAuth 2.0 with
JWT). The API has 12 endpoints. The most commonly used are: POST /charges,
GET /charges/{id}, POST /refunds.

INSTRUCTIONS:
Document the POST /charges endpoint. Include: endpoint description, authentication
requirements, request body parameters (table), response codes, example request
(curl), example response (JSON), and common errors.

PERSONALITY:
Clear, precise technical writing. Minimal prose — mostly structured tables,
code blocks, and bullet points. Treat the reader as an experienced developer
who wants facts, not hand-holding.

EXPERIMENT:
Provide 2 formats: (1) full formal API reference style, (2) a quick-start
"cookbook" style with opinionated examples. Note which format works best for
onboarding vs. reference.
```

### Example 3: Strategic Analysis

**Before CRISPE:**
"Analyze our pricing strategy."

**After CRISPE:**
```
CAPACITY AND ROLE:
Act as a SaaS pricing strategy consultant with expertise in value-based pricing,
packaging, and competitive positioning.

INSIGHT:
We offer 3 plans: Free (limited features), Pro ($49/month), Enterprise (custom).
Current split: 60% free, 35% Pro, 5% Enterprise. Our main competitor charges
$39/month for similar Pro features. We're seeing strong NPS (72) but sluggish
expansion revenue — most Pro users stay on Pro indefinitely. Our top 10%
customers drive 60% of revenue and are all on Enterprise.

INSTRUCTIONS:
Analyze our current pricing structure and recommend improvements to increase
expansion revenue and ARPU without hurting free-to-paid conversion.

PERSONALITY:
Direct, CEO-level strategic thinking. Back recommendations with data logic.
Be willing to challenge assumptions. Avoid hedging everything — take a position.

EXPERIMENT:
Give 3 strategic options: (1) a conservative tweak, (2) a mid-range restructure,
(3) a bold rethink. For each, state the hypothesis, expected impact on ARPU and
churn risk, and one key assumption that must be true for it to work.
```

## Best Use Cases

1. **When You Want Options, Not Just One Answer**
   - Creative decisions with multiple valid approaches
   - A/B test candidates
   - Exploratory analysis with multiple angles

2. **Content Creation With Quality Bar**
   - Marketing copy, campaigns, messaging
   - Documentation with different audience cuts
   - Communications requiring tone judgment

3. **Strategic or Analytical Work**
   - When multiple strategic options should be compared
   - Analysis that might have different valid conclusions

4. **When Style/Personality Matters Significantly**
   - Brand voice must be carefully calibrated
   - Audience-sensitive communications
   - High-stakes external communications

## Selection Criteria

**Choose CRISPE when:**
- ✅ You want multiple output variants to compare
- ✅ Tone and personality need explicit control
- ✅ Background context is extensive and critical
- ✅ High-quality content where first draft is rarely final
- ✅ Expertise level significantly affects output quality

**Avoid CRISPE when:**
- ❌ You need one definitive answer → use CO-STAR or RACE
- ❌ Task is simple → use APE, RTF, or CTF
- ❌ Multi-step process with methodology → use RISEN
- ❌ Transforming existing content → use BAB

## CRISPE vs. CO-STAR

| | CRISPE | CO-STAR |
|---|---|---|
| Unique feature | Experiment — multiple variants | Style + Tone as explicit components |
| Best when | You want options to compare | You know exactly what you want |
| Output count | Multiple variants | Single polished output |
| Audience component | Implicit in Insight/Personality | Explicit (Audience component) |
| Complexity | Medium | High |

**Rule of thumb:** If you want one great output → CO-STAR. If you want multiple options to compare → CRISPE.

## Quick Reference

| Component | Focus | Key Question |
|-----------|-------|--------------|
| Capacity & Role | Expertise | "What level of expert should do this?" |
| Insight | Background | "What does the AI need to know?" |
| Instructions | Task | "What exactly needs to be done?" |
| Personality | Style | "How should it sound?" |
| Experiment | Variants | "How many options do I want to compare?" |
