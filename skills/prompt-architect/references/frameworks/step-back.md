# Step-Back Prompting

## Overview

Step-Back Prompting is a two-step reasoning technique where the model first answers a higher-level "step-back" question that retrieves the underlying principles, concepts, or facts relevant to the original problem — then uses those retrieved principles as context to answer the original question. By abstracting first, the model grounds its reasoning in first principles rather than diving directly into a potentially error-prone specific answer.

**Research basis:** "Take a Step Back: Evoking Reasoning via Abstraction in Large Language Models" (Zheng et al., Google DeepMind, arXiv:2310.06117, ICLR 2024). Demonstrated +7-27% accuracy on MMLU Physics and Chemistry, +27% on TimeQA, +25% on MuSiQue vs. direct prompting.

## Components

### Step 1: The Step-Back Question
**Purpose:** Reformulate the original question into a higher-level, more abstract question that retrieves the underlying principles or concepts needed.

**Pattern:** Strip away specifics → ask for the general principle/rule/concept.

**Examples:**
- Original: "What happens to water pressure at 100m depth in salt water?" → Step-back: "What are the physics principles governing fluid pressure?"
- Original: "How should I structure a React component that fetches user data?" → Step-back: "What are the principles of separation of concerns in React component design?"
- Original: "Was the Battle of Stalingrad a turning point?" → Step-back: "What factors define a military turning point in a campaign?"

### Step 2: Principle Retrieval
**Purpose:** Answer the step-back question to retrieve the relevant principles/concepts/facts. This becomes the reasoning context.

### Step 3: Final Answer
**Purpose:** Use the retrieved principles as context to answer the original specific question.

**Trigger:** "Based on these principles, now answer the original question: [original question]"

## Template Structure

```
ORIGINAL QUESTION:
[The specific question you want answered]

STEP-BACK:
Before answering directly, first answer this higher-level question:
[Step-back question — the abstract principle/concept behind the original]

PRINCIPLE APPLICATION:
Using the principles/concepts you just described, now answer the original question:
[Restate original question]
```

### Auto Step-Back (Model generates its own step-back question):
```
Before answering the following question, first identify the underlying
principles or concepts that govern it. State those principles clearly.
Then use them as a foundation to answer the specific question.

Question: [your question]
```

## Complete Examples

### Example 1: Technical Decision

**Before Step-Back:**
"Should I use PostgreSQL or MongoDB for a social feed application?"

**After Step-Back:**
```
ORIGINAL QUESTION:
Should I use PostgreSQL or MongoDB for a social feed application?

STEP-BACK:
Before answering, first answer: What are the core principles that govern
database selection for applications requiring feed-style queries, social graphs,
and high read throughput? Consider data model fit, query patterns, and
consistency requirements.

PRINCIPLE APPLICATION:
Using those principles, now evaluate: should I use PostgreSQL or MongoDB
for a social feed application where users follow other users, see a ranked
feed of posts, and can like/comment?
```

### Example 2: Debugging

**Before Step-Back:**
"Why does my async function return undefined when I call it?"

**After Step-Back:**
```
ORIGINAL QUESTION:
Why does my async function return undefined when I call it?

STEP-BACK:
First explain: What are the core principles of how JavaScript async/await
works, specifically regarding what an async function returns and how callers
must handle it?

PRINCIPLE APPLICATION:
Using those principles, diagnose this specific issue: [paste code].
Why does this return undefined, and what is the fix?
```

### Example 3: Architecture Review

**Before Step-Back:**
"Is our current authentication flow secure?"

**After Step-Back:**
```
ORIGINAL QUESTION:
Is our current authentication flow secure?

STEP-BACK:
Before reviewing our specific implementation, first outline: What are the
fundamental security principles and threat models that a well-designed
authentication flow must address? Include: credential handling, session
management, token security, and common attack vectors.

PRINCIPLE APPLICATION:
Using those security principles as a checklist, review our authentication
flow below and identify any gaps or vulnerabilities.
[Paste authentication flow]
```

### Example 4: Content/Writing

**Before Step-Back:**
"Write an introduction for my article about climate change and agriculture."

**After Step-Back:**
```
ORIGINAL QUESTION:
Write an introduction for my article about climate change and agriculture.

STEP-BACK:
First answer: What are the rhetorical principles of an effective article
introduction? What should it accomplish, and what structural elements
make introductions work?

PRINCIPLE APPLICATION:
Using those principles, write an introduction for an article about how
climate change is disrupting agricultural yield patterns globally.
Target audience: policy-informed general readers. Goal: create urgency
without alarmism.
```

## Best Use Cases

1. **STEM Reasoning**
   - Physics, chemistry, math problems
   - Engineering trade-offs
   - Scientific analysis

2. **Technical Decision-Making**
   - Architecture and design choices
   - Technology selection
   - Security analysis

3. **Historical and Causal Analysis**
   - Evaluating decisions and their consequences
   - Understanding complex events
   - Root cause analysis

4. **Complex Debugging**
   - When the specific error needs first-principles understanding
   - Novel or unclear failure modes

5. **Any Task Where Principles Matter More Than Pattern-Matching**

## Selection Criteria

**Choose Step-Back when:**
- ✅ Task requires principled reasoning, not just recall
- ✅ Direct answers tend to be shallow or incorrect
- ✅ Underlying principles are known and applicable
- ✅ The question is specific but has a generalizable foundation
- ✅ Errors in past attempts suggest lack of principled grounding

**Avoid Step-Back when:**
- ❌ Task is straightforward and factual — overhead not worth it → use APE or RTF
- ❌ Content creation (no abstract principle needed) → use CO-STAR or BAB
- ❌ Already reasoning step-by-step → CoT may suffice
- ❌ The principle is unknowable or irrelevant

## Step-Back vs. Chain of Thought

| | Step-Back | Chain of Thought |
|---|---|---|
| Direction | Abstract → Specific | Step 1 → Step 2 → ... → Answer |
| Starting point | Higher-level principle | The problem itself |
| Best for | Principle-grounded reasoning | Known procedure, sequential steps |
| Failure mode | Step-back question too vague | Errors compound through chain |

**Rule of thumb:** If the question has a known procedure → CoT. If the question requires first-principles reasoning → Step-Back.

## Generating Good Step-Back Questions

**Pattern:** Remove specifics → ask for the governing rule/principle

| Original (Specific) | Step-Back (Abstract) |
|---|---|
| "What happens when thread A and thread B access shared memory?" | "What are the principles of memory consistency in concurrent programming?" |
| "How should I price my SaaS product?" | "What are the principles of value-based pricing for B2B software?" |
| "Was this code change the cause of our performance regression?" | "What are the principles for diagnosing performance regressions in production systems?" |

## Quick Reference

| Step | Purpose | Key Question |
|------|---------|--------------|
| Step-Back Question | Abstract the problem | "What principle governs this?" |
| Principle Retrieval | Get the foundation | "What are the rules?" |
| Final Answer | Apply principles to specifics | "Given these principles, what's the answer?" |
