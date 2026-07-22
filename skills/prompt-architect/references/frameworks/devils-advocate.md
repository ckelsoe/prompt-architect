# Devil's Advocate Prompting

## Overview

Devil's Advocate Prompting instructs the AI to generate the strongest possible case *against* a position, plan, decision, or idea — not a balanced view, not a straw man, but the most forceful and substantive opposing argument possible. Named after the historical role in Catholic canonization proceedings where someone was appointed specifically to argue against sainthood, it is the framework for deliberately attacking your own thinking to find weaknesses before others do. A complete Devil's Advocate prompt emits as an opening instruction paragraph that establishes the adversarial frame, followed by the position under attack, an optional supporting document, and the attack directives — the section headers are stripped at emission, so each block is written to carry its own meaning in prose rather than lean on the header above it.

**Research basis:** "Enhancing AI-Assisted Group Decision Making through LLM-Powered Devil's Advocate" (ACM IUI 2024, peer-reviewed). Key finding: AI devil's advocates arguing against AI recommendations (not just the user's position) produced more appropriate human reliance on AI. Related: Steelman (steelman.dylanamartin.com) implements a four-round structured adversarial argumentation framework.

## When to Use

- Testing a plan, decision, or proposal before committing
- Preparing for pushback from stakeholders or opponents
- Debiasing: countering groupthink or confirmation bias
- Architecture/design reviews — find the fatal flaws first
- Any high-stakes decision where being wrong is costly

## Components

### Position Statement
**Purpose:** The argument, plan, or decision to attack. State it clearly — the stronger the devil's advocate, the clearer the target must be. Write it as complete sentences: the opening instruction promises a case "against the following position," and once the `POSITION TO ATTACK` header is stripped, nothing else names what that position is, so the statement itself has to read as the thing being attacked.

### Supporting Material (optional)
**Purpose:** The proposal, design doc, or strategy memo that sets the position out in full. Supplying it lets the attack engage the position's actual claims and reasoning rather than the model's assumptions about a position of that description. The template's slot is optional and self-deleting: if there is nothing to paste, the bracketed block and the carrier sentence directly below it both come out. That carrier sentence — "Treat the document above as the detailed source of the position's claims, assumptions, and reasoning" — lets the pasted document stay a bare artifact by naming, in prose, what to do with it once its header is gone.

### Adversarial Instruction
**Purpose:** Explicit instruction to be adversarial, not balanced. This is what makes it devil's advocate rather than a pros/cons analysis. It ships as a list of standing imperatives, and the prohibition among them — "Do not acknowledge positives or offer a balanced view" — must survive into the emitted prompt as that explicit "Do not…" text. Per SKILL.md step 5, a restriction the user relies on cannot be left to a section header, because headers are stripped at emission; phrased as a standing imperative, the instruction carries with or without its header.

### Attack Dimensions
**Purpose:** The specific dimensions to attack. Without these, critique stays superficial. They ship under a "Focus on:" carrier line as an enumerated list, so the dimensions read as directives once `ATTACK DIMENSIONS` is removed rather than as a bare heading over a list of nouns.

**Common dimensions:**
- **Assumptions**: What must be true for this to work? Attack each assumption.
- **Logic**: Where does the reasoning fail?
- **Risks**: What are the most likely failure modes?
- **Alternatives**: What better options are being ignored?
- **Blind spots**: What has the author failed to consider?
- **Falsification criteria**: What evidence would prove this wrong?

### Severity Ranking (optional)
**Purpose:** Rank identified weaknesses by how fatal they are. Separates show-stoppers from minor issues. When included it ships as a closing instruction — "After the full attack, list the THREE MOST FATAL flaws…" — phrased as a sequenced directive so the "do this last" ordering survives the header being stripped.

## Template Structure

Section headers are stripped at emission, so every slot's meaning is carried by the prose around and inside it rather than by the header above it. The opening paragraph is not a title — it is the instruction that sets the adversarial frame, and it ships with the prompt. `POSITION TO ATTACK` comes first so the document that follows reads as backing an already-stated claim; the `SUPPORTING MATERIAL` block is optional and self-deleting, and its bracketed contents and the carrier sentence beneath them both come out whenever the position is stated inline with no document behind it.

```
You are a rigorous devil's advocate. Your task is NOT to give a balanced view —
your task is to generate the strongest possible case against the following position.

POSITION TO ATTACK:
[State the position, plan, decision, or proposal clearly]

SUPPORTING MATERIAL (optional):
[Optional — paste the proposal, design doc, strategy memo, or other document
that sets out this position here. If you have nothing to paste, delete this
bracketed block and the sentence below it.]
Treat the document above as the detailed source of the position's claims,
assumptions, and reasoning.

ATTACK INSTRUCTIONS:
- Do not acknowledge positives or offer a balanced view
- Attack every assumption the position depends on
- Identify every logical gap or unsupported claim
- Surface every significant risk or failure mode
- Point out what better alternatives are being ignored
- Be as forceful and specific as possible

ATTACK DIMENSIONS:
Focus on:
1. Core assumptions (what must be true for this to work?)
2. Internal logic (where does the reasoning break down?)
3. Execution risks (what makes this fail in practice?)
4. Overlooked alternatives (what better options exist?)
5. [Add domain-specific dimensions as needed]

SEVERITY RANKING:
After the full attack, list the THREE MOST FATAL flaws — the ones that,
if unaddressed, would cause this to fail regardless of execution quality.
```

## Complete Examples

Every example below keeps the headers on the page for readability, but is written in emitted form beneath them: the opening instruction paragraph first, then each slot carrying its own role in prose. Read the headers as scaffolding that will be deleted — the examples are written so that nothing is lost when it is.

### Example 1: Architecture Decision

**Before Devil's Advocate:**
"Should we move to microservices?"

**After Devil's Advocate** (supporting material supplied):
```
You are a rigorous devil's advocate. Your task is NOT to give a balanced view —
your task is to generate the strongest possible case against the following position.

POSITION TO ATTACK:
We should rewrite our monolithic Python backend as microservices. The motivation:
our deployment pipeline is slow, different teams want to deploy independently, and
we're seeing performance issues in the payments module.

SUPPORTING MATERIAL:
[Paste the migration RFC and the current deployment-pipeline metrics here]
Treat the document above as the detailed source of the position's claims,
assumptions, and reasoning.

ATTACK INSTRUCTIONS:
- Do not acknowledge positives or offer a balanced view
- Attack every assumption the position depends on
- Identify every logical gap or unsupported claim
- Surface every significant risk or failure mode
- Point out what better alternatives are being ignored
- Be as forceful and specific as possible

ATTACK DIMENSIONS:
Focus on:
1. Core assumptions about what microservices actually solve
2. Organizational and team readiness
3. The technical complexity being introduced
4. Whether the stated problems actually require microservices
5. Migration risks and the transition period

SEVERITY RANKING:
After the full attack, list the THREE MOST FATAL flaws — the ones that,
if unaddressed, would cause this to fail regardless of execution quality.
```

### Example 2: Business Strategy

**Before Devil's Advocate:**
"Is expanding to Europe a good idea?"

**After Devil's Advocate** (no supporting material — the position is stated inline, so the optional block and its carrier sentence are both deleted):
```
You are a rigorous devil's advocate. Your task is NOT to give a balanced view —
your task is to generate the strongest possible case against the following position.

POSITION TO ATTACK:
We should expand to the European market in Q3. We have strong US NPS (72),
product-market fit with SMBs, and three European companies have expressed
interest. We'll hire a country manager in the UK and use them as a beachhead.

ATTACK INSTRUCTIONS:
- Do not acknowledge positives or offer a balanced view
- Attack every assumption the position depends on
- Identify every logical gap or unsupported claim
- Surface every significant risk or failure mode
- Point out what better alternatives are being ignored
- Be as forceful and specific as possible

ATTACK DIMENSIONS:
Focus on:
1. Whether inbound interest indicates real market demand
2. Resource and runway requirements versus what's being allocated
3. The UK-as-beachhead strategy for EU expansion
4. Timing relative to the current US growth trajectory
5. GDPR, data residency, and regulatory readiness

SEVERITY RANKING:
After the full attack, list the THREE MOST FATAL flaws — the ones that,
if unaddressed, would cause this to fail regardless of execution quality.
```

### Example 3: Product Decision

**Before Devil's Advocate:**
"Should we build a mobile app?"

**After Devil's Advocate** (supporting material supplied; severity ranking omitted — the opening paragraph already carries the adversarial frame, so a leaner variant still stands):
```
You are a rigorous devil's advocate. Your task is NOT to give a balanced view —
your task is to generate the strongest possible case against the following position.

POSITION TO ATTACK:
We should add a native mobile app to our web SaaS product. Our top users are asking
for it, mobile usage of similar tools is growing, and a competitor just launched one.

SUPPORTING MATERIAL:
[Paste the product one-pager and the top-user feature requests here]
Treat the document above as the detailed source of the position's claims,
assumptions, and reasoning.

ATTACK DIMENSIONS:
Focus on:
1. Whether "top users asking" is representative demand
2. Resource cost versus ROI for a 4-person engineering team
3. Whether mobile actually expands the TAM or just cannibalizes web
4. The competitor's mobile launch as a signal versus noise
5. What is given up by doing this instead of something else
```

### Example 4: Self-Attack (Devil's Advocate on AI Output)

This one needs no template. It is a follow-up turn pasted after any AI recommendation, and "your own recommendation above" points at that prior output — which is the source material, already in place:
```
Now argue forcefully against your own recommendation above. What are the
strongest reasons it's wrong? What did you overlook? What assumptions did
you make that may not hold? Be as critical as possible.
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
| Position Statement | What to attack, stated as complete sentences |
| Supporting Material | Optional document behind the position; self-deleting |
| Adversarial Instruction | Be forceful, not balanced |
| Attack Dimensions | What aspects to critique |
| Severity Ranking | The 3 most fatal flaws |
