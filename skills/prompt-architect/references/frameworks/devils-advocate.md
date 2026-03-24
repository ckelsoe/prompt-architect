# Devil's Advocate Prompting

## Overview

Devil's Advocate Prompting instructs the AI to generate the strongest possible case *against* a position, plan, decision, or idea — not a balanced view, not a straw man, but the most forceful and substantive opposing argument possible. Named after the historical role in Catholic canonization proceedings where someone was appointed specifically to argue against sainthood, it is the framework for deliberately attacking your own thinking to find weaknesses before others do.

**Research basis:** "Enhancing AI-Assisted Group Decision Making through LLM-Powered Devil's Advocate" (ACM IUI 2024, peer-reviewed). Key finding: AI devil's advocates arguing against AI recommendations (not just the user's position) produced more appropriate human reliance on AI. Related: Steelman (steelman.dylanamartin.com) implements a four-round structured adversarial argumentation framework.

## When to Use

- Testing a plan, decision, or proposal before committing
- Preparing for pushback from stakeholders or opponents
- Debiasing: countering groupthink or confirmation bias
- Architecture/design reviews — find the fatal flaws first
- Any high-stakes decision where being wrong is costly

## Components

### Position Statement
**Purpose:** The argument, plan, or decision to attack. State it clearly — the stronger the devil's advocate, the clearer the target must be.

### Adversarial Instruction
**Purpose:** Explicit instruction to be adversarial, not balanced. This is what makes it devil's advocate rather than a pros/cons analysis.

### Attack Dimensions
**Purpose:** The specific dimensions to attack. Without these, critique stays superficial.

**Common dimensions:**
- **Assumptions**: What must be true for this to work? Attack each assumption.
- **Logic**: Where does the reasoning fail?
- **Risks**: What are the most likely failure modes?
- **Alternatives**: What better options are being ignored?
- **Blind spots**: What has the author failed to consider?
- **Falsification criteria**: What evidence would prove this wrong?

### Severity Ranking (optional)
**Purpose:** Rank identified weaknesses by how fatal they are. Separates show-stoppers from minor issues.

## Template Structure

```
You are a rigorous devil's advocate. Your task is NOT to give a balanced
view — your task is to generate the strongest possible case against the
following [position / plan / decision / proposal].

POSITION TO ATTACK:
[State the position, plan, or decision clearly]

ATTACK INSTRUCTIONS:
- Do not offer a balanced view or acknowledge positives
- Attack every assumption the position depends on
- Identify every logical gap or unsupported claim
- Surface every significant risk or failure mode
- Point out what better alternatives are being ignored
- Be as forceful and specific as possible — no vague objections

ATTACK DIMENSIONS:
Focus your attack on: [select relevant dimensions]
- Core assumptions (what must be true for this to work?)
- Internal logic (where does the reasoning break down?)
- Execution risks (what makes this fail in practice?)
- Overlooked alternatives (what better options exist?)
- [Add domain-specific dimensions as needed]

SEVERITY RANKING:
After the attack, list the THREE MOST FATAL flaws — the ones that, if
unaddressed, would cause this to fail regardless of execution quality.
```

## Complete Examples

### Example 1: Architecture Decision

```
You are a rigorous devil's advocate.

POSITION TO ATTACK:
We should rewrite our monolithic Python backend as microservices.
The motivation: our deployment pipeline is slow, different teams want
to deploy independently, and we're seeing performance issues in the
payments module.

ATTACK INSTRUCTIONS:
Generate the strongest possible case against this decision. Do not
acknowledge any benefits. Attack the reasoning, assumptions, and plan.

ATTACK DIMENSIONS:
- Core assumptions about what microservices solve
- Organizational and team readiness
- Technical complexity being introduced
- Whether the stated problems actually require microservices
- Migration risks and the transition period

SEVERITY RANKING:
End with the 3 most fatal flaws that would cause this to fail.
```

### Example 2: Business Strategy

```
You are a rigorous devil's advocate.

POSITION TO ATTACK:
We should expand to the European market in Q3. We have strong US NPS (72),
product-market fit with SMBs, and three European companies have expressed
interest. We'll hire a country manager in the UK and use them as a beachhead.

ATTACK INSTRUCTIONS:
Argue forcefully against this expansion strategy. Be specific — use
facts, numbers, and logic. No acknowledgment of positives.

ATTACK DIMENSIONS:
- Whether inbound interest indicates real market demand
- Resource/runway requirements vs. what's being allocated
- UK-as-beachhead strategy for EU expansion
- Timing relative to our current US growth trajectory
- GDPR, data residency, and regulatory readiness

SEVERITY RANKING:
The 3 most fatal flaws, in order.
```

### Example 3: Product Decision

```
You are a rigorous devil's advocate.

POSITION TO ATTACK:
We should add a native mobile app to our web SaaS product. Our top users
are asking for it, mobile usage of similar tools is growing, and a
competitor just launched one.

ATTACK DIMENSIONS:
- Whether "top users asking" is representative demand
- Resource cost vs. ROI for a 4-person engineering team
- Whether mobile actually expands our TAM or just cannibalizes web
- Competitor's mobile launch as a signal vs. noise
- What we're giving up by doing this instead of something else

SEVERITY RANKING:
3 most fatal flaws.
```

### Example 4: Self-Attack (Devil's Advocate on AI Output)

After receiving any AI recommendation:
```
Now argue forcefully against your own recommendation above. What are
the strongest reasons it's wrong? What did you overlook? What
assumptions did you make that may not hold? Be as critical as possible.
```

## Best Use Cases

1. **Pre-commitment Decision Reviews**
   - Before major investments, hires, or pivots
   - Architecture and technical design reviews
   - Product strategy validation

2. **Countering Groupthink**
   - When a team is too aligned ("everyone agrees" is a warning sign)
   - When you're emotionally attached to an idea
   - Pre-mortem supplement (DA finds weaknesses; pre-mortem assumes failure)

3. **Stakeholder Preparation**
   - What will your critics say? Find out first.
   - Board presentations, investor pitches, procurement reviews

4. **AI Output Validation**
   - Ask the AI to attack its own recommendation (Example 4 above)
   - Reduces over-reliance on AI confidence

## Selection Criteria

**Choose Devil's Advocate when:**
- ✅ You have a position, plan, or recommendation to stress-test
- ✅ You want the strongest *opposing* argument, not balance
- ✅ You're making a high-stakes decision
- ✅ Groupthink or confirmation bias is a risk
- ✅ You want to prepare for criticism

**Avoid when:**
- ❌ You want failure modes from a failure-assumption frame → use Pre-Mortem
- ❌ You want a quality improvement loop → use Self-Refine
- ❌ You want principle-based critique → use CAI Critique-Revise
- ❌ You need a balanced pros/cons analysis → use Tree of Thought

## Devil's Advocate vs. Pre-Mortem

| | Devil's Advocate | Pre-Mortem |
|---|---|---|
| Frame | "Here's why this is wrong" | "This has already failed — why?" |
| Output | Strongest opposing argument | Specific failure causes |
| Bias | Attacks position directly | Prospective hindsight |
| Best for | Testing reasoning and assumptions | Risk identification and mitigation |

**Use both:** Devil's Advocate finds the weakest arguments; Pre-Mortem finds the most likely failure paths. They complement each other.

## Quick Reference

| Component | Purpose |
|-----------|---------|
| Position Statement | What to attack |
| Adversarial Instruction | Be forceful, not balanced |
| Attack Dimensions | What aspects to critique |
| Severity Ranking | The 3 most fatal flaws |
