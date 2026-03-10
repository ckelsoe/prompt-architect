# Tree of Thought Framework

## Overview

Tree of Thought (ToT) extends Chain of Thought by enabling branching exploration rather than linear reasoning. Where Chain of Thought follows one reasoning path step-by-step, Tree of Thought explicitly explores multiple solution branches, evaluates each, and selects the best path forward. It is ideal for problems where the right approach is unknown upfront and multiple strategies need to be considered simultaneously.

**Research basis:** Introduced in "Tree of Thoughts: Deliberate Problem Solving with Large Language Models" (Yao et al., 2023).

## Components

### Problem
**Purpose:** Define the problem to be solved and what a solution should achieve.

**Questions to Ask:**
- What exactly needs to be solved?
- What constraints exist?
- What does a good solution look like?

### Branches
**Purpose:** Define the distinct approaches or solution paths to explore. Each branch is an independent line of reasoning.

**Questions to Ask:**
- What are the meaningfully different approaches?
- What dimensions of variation exist?
- How many branches are appropriate? (2-5 is typical)

### Evaluation Criteria
**Purpose:** Define how branches will be compared and which will be selected.

**Questions to Ask:**
- What makes one approach better than another?
- What trade-offs matter?
- Is there a single best answer or context-dependent?

### Conclusion
**Purpose:** Synthesize the branch analysis into a recommendation or decision.

## Template Structure

```
PROBLEM:
[What needs to be solved, constraints, success criteria]

EXPLORE THESE BRANCHES:
Branch 1: [Approach/strategy name]
Branch 2: [Approach/strategy name]
Branch 3: [Approach/strategy name]
[Add branches as needed]

For each branch:
- Describe the approach
- Work through the reasoning
- Identify strengths and weaknesses
- Note risks or edge cases

EVALUATION CRITERIA:
[How to compare branches — what matters most]

CONCLUSION:
[Select best branch with reasoning, or explain trade-offs if context-dependent]
```

## Complete Examples

### Example 1: Architecture Decision

**Before Tree of Thought:**
"What's the best database for our app?"

**After Tree of Thought:**
```
PROBLEM:
We are building a real-time collaborative document editor (like Google Docs).
Need to choose a primary database. Constraints: 10-person team, most have SQL
experience, 6-month timeline, expected 100k users at launch. Must support
real-time sync, offline mode, and conflict resolution.

EXPLORE THESE BRANCHES:

Branch 1: PostgreSQL with operational transforms
Branch 2: CRDTs with a document store (e.g., Firestore)
Branch 3: Event sourcing with an append-only log (e.g., EventStoreDB)

For each branch, analyze:
- How well it handles real-time sync and conflicts
- Team learning curve
- Operational complexity
- Scalability ceiling
- Known production use cases

EVALUATION CRITERIA:
Primary: correctness of conflict resolution
Secondary: team familiarity, time to production
Tertiary: long-term scalability

CONCLUSION:
Recommend one approach with clear reasoning. If it depends on a factor
we haven't decided (e.g., team preference), state what information would
change the recommendation.
```

### Example 2: Debugging with Multiple Hypotheses

**Before Tree of Thought:**
"Why is this failing?"

**After Tree of Thought:**
```
PROBLEM:
Our API endpoint is intermittently returning 500 errors — roughly 2% of requests.
Only occurs under load (>100 req/s). Errors started after deploying a new caching
layer last Tuesday. No obvious pattern in logs except "connection pool exhausted."

EXPLORE THESE BRANCHES:

Branch 1: Connection pool misconfiguration
Branch 2: Cache stampede causing downstream overload
Branch 3: Memory leak in the new caching layer code
Branch 4: Race condition in concurrent cache writes

For each branch:
- Describe the failure mechanism
- What evidence would confirm or rule it out
- What diagnostic steps to take first
- What the fix would look like

EVALUATION CRITERIA:
Likelihood given available evidence (especially "connection pool exhausted" message
and load threshold). Prioritize branches that can be confirmed quickly.

CONCLUSION:
Rank branches by likelihood. Recommend first diagnostic step. Identify any branch
that, if true, requires immediate action before others are investigated.
```

### Example 3: Product Strategy

**Before Tree of Thought:**
"Should we build this feature?"

**After Tree of Thought:**
```
PROBLEM:
We are deciding whether to build a native mobile app (iOS/Android) or improve our
responsive web app. We have 4 engineers, 6 months of runway, and 80% of current
users are on desktop. However, our top 20% of users (by revenue) use mobile.

EXPLORE THESE BRANCHES:

Branch 1: Build native mobile apps
Branch 2: Invest in progressive web app (PWA)
Branch 3: Do nothing mobile-specific; focus on desktop conversion

For each branch:
- Development cost and timeline estimate
- Impact on top-20% users
- Impact on new user acquisition
- Risk if we're wrong about our assumptions

EVALUATION CRITERIA:
Revenue impact on existing top users weighted 3x vs. new user acquisition.
Time to deliver weighted heavily given runway constraints.

CONCLUSION:
Recommend a path. State the single biggest assumption that could invalidate
the recommendation.
```

## Best Use Cases

1. **Architecture and Design Decisions**
   - Technology selection
   - System design trade-offs
   - API design choices

2. **Debugging with Unclear Root Cause**
   - Multiple plausible failure modes
   - Intermittent issues
   - After a recent change with unclear impact

3. **Strategic Decisions**
   - Build vs. buy vs. integrate
   - Feature prioritization
   - Market entry strategies

4. **Algorithm/Approach Selection**
   - When multiple algorithms could solve the problem
   - Optimization with multiple valid approaches
   - Design patterns selection

5. **Risk Analysis**
   - Scenario planning
   - "What could go wrong?" analysis across multiple failure modes

## Selection Criteria

**Choose Tree of Thought when:**
- ✅ Multiple meaningfully different approaches exist
- ✅ The right answer is not obvious upfront
- ✅ You want systematic comparison, not just one solution
- ✅ Trade-offs need to be explicit
- ✅ A decision needs to be defensible

**Avoid Tree of Thought when:**
- ❌ One clearly correct approach exists → use Chain of Thought
- ❌ Task is about creating content → use CO-STAR
- ❌ Linear step-by-step is sufficient → use Chain of Thought or RISEN
- ❌ Simple, well-defined task → use RTF, CTF, or APE

## Tree of Thought vs. Chain of Thought

| | Chain of Thought | Tree of Thought |
|---|---|---|
| Structure | Linear steps | Branching exploration |
| Best for | Known approach, complex execution | Unknown best approach |
| Output | Step-by-step reasoning to one answer | Comparison of multiple paths + recommendation |
| Use when | "How do I solve this?" | "Which approach should I take?" |

**Rule of thumb:** If you know what approach to use and need to work through it carefully → Chain of Thought. If you're unsure which approach is best → Tree of Thought.

## Branch Design Tips

1. **Branches should be meaningfully different**
   - Not just variations of the same approach
   - Each branch should lead to genuinely different outcomes

2. **2-5 branches is optimal**
   - Fewer than 2 = just Chain of Thought
   - More than 5 = too much to evaluate clearly

3. **Name branches clearly**
   - "Option A" is not a branch name
   - Name the approach: "PostgreSQL with row-level locking"

4. **Each branch gets equal treatment**
   - Don't telegraph your preferred answer in the problem statement
   - Give each branch a fair analysis

## Common Mistakes

1. **Branches That Aren't Really Different**
   - "Use Redis" and "Use Memcached" might be the same branch at the right level of abstraction

2. **Missing Evaluation Criteria**
   - Without criteria, the "conclusion" is just a preference, not a reasoned decision

3. **Using ToT for Linear Problems**
   - If the problem has one right answer, Chain of Thought is more efficient

4. **Too Many Branches**
   - 6+ branches leads to shallow analysis; reduce or group branches

## Quick Reference

| Component | Focus | Key Question |
|-----------|-------|--------------|
| Problem | What to solve | "What decision needs to be made?" |
| Branches | Solution paths | "What are the distinct approaches?" |
| Evaluation | Comparison criteria | "What makes one better than another?" |
| Conclusion | Decision | "Which path forward and why?" |
