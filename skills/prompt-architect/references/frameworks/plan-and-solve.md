# Plan-and-Solve (PS+) Prompting

## Overview

Plan-and-Solve (PS+) is a zero-shot prompting technique that improves upon standard Chain of Thought by instructing the model to explicitly plan the solution approach before executing it — and to be careful about extracting variables and calculating intermediate results. It requires no examples or demonstrations and consistently outperforms Zero-Shot CoT ("Let's think step by step") on reasoning tasks.

**Research basis:** "Plan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning by Large Language Models" (Wang et al., ACL 2023, arXiv:2305.04091). Tested across 10 reasoning datasets — consistently outperforms Zero-Shot-CoT and is competitive with few-shot CoT.

## The Core Trigger Phrases

### PS (Basic):
```
Let's first understand the problem and devise a plan to solve it.
Then, let's carry out the plan and solve the problem step by step.
```

### PS+ (Enhanced — recommended):
```
Let's first understand the problem, extract relevant variables and their
corresponding numerals, and devise a complete plan. Then, let's carry out
the plan, calculate intermediate values, pay attention to computation,
and solve the problem step by step.
```

The PS+ additions over PS:
1. **"Extract relevant variables"** — forces the model to identify all given information before starting
2. **"Calculate intermediate values"** — prevents skipping computational steps
3. **"Pay attention to computation"** — explicit reminder to be accurate with numbers

## Template Structure

```
PROBLEM:
[Your problem or question]

INSTRUCTION:
Let's first understand the problem, extract relevant variables and their
corresponding numerals, and devise a complete plan. Then, let's carry out
the plan, calculate intermediate values, pay attention to computation,
and solve the problem step by step.
```

### Inline Version (append to any question):
```
[Your question]. Let's first understand the problem, extract relevant
variables and their corresponding numerals, and devise a complete plan.
Then let's carry out the plan, calculate intermediate values, and solve
step by step.
```

## Complete Examples

### Example 1: Math / Calculation

**Before PS+:**
"If a SaaS company has 500 customers at $200/month each, 5% monthly churn, and adds 30 new customers per month, what is the MRR in 6 months?"

**After PS+:**
```
PROBLEM:
A SaaS company has 500 customers paying $200/month each. Monthly churn
is 5%. The company acquires 30 new customers per month. What is the MRR
in 6 months?

Let's first understand the problem, extract relevant variables and their
corresponding numerals, and devise a complete plan. Then, let's carry out
the plan, calculate intermediate values, pay attention to computation,
and solve the problem step by step.
```

**Expected model behavior:**
```
Variables:
- Starting customers: 500
- Monthly price: $200/month
- Monthly churn rate: 5% = 0.05
- Monthly new customers: 30
- Target period: 6 months

Plan:
1. Calculate customers lost per month (churn)
2. Calculate net new customers per month (acquired - churned)
3. Calculate customer count at end of each month (months 1-6)
4. Calculate MRR for month 6

Execution:
Month 0: 500 customers, MRR = $100,000
Month 1: 500 × (1 - 0.05) + 30 = 475 + 30 = 505 customers, MRR = $101,000
Month 2: 505 × 0.95 + 30 = 479.75 + 30 = 509.75 ≈ 510 customers, MRR = $102,000
...
[continues through month 6]

Final answer: Month 6 MRR = $X
```

### Example 2: Multi-Step Technical Problem

**Before PS+:**
"Our API is returning responses in 800ms average. We want to get it under 200ms. What should we do?"

**After PS+:**
```
PROBLEM:
Our REST API averages 800ms response time. Target is under 200ms.
The API serves product catalog queries (read-heavy), is Node.js with
PostgreSQL, and currently has no caching layer. Database queries are
the main bottleneck (600ms average per request).

Let's first understand the problem, extract relevant variables and their
corresponding numerals, and devise a complete plan. Then, let's carry out
the plan and solve step by step.
```

### Example 3: Business Calculation

**Before PS+:**
"What's our payback period if CAC is $1,200 and average MRR per customer is $150 with 70% gross margin?"

**After PS+:**
```
PROBLEM:
Customer Acquisition Cost (CAC): $1,200
Average MRR per customer: $150
Gross margin: 70%

What is our payback period?

Let's first understand the problem, extract relevant variables and their
corresponding numerals, and devise a complete plan. Then, let's carry out
the plan, calculate intermediate values, pay attention to computation,
and solve the problem step by step.
```

### Example 4: Logic / Reasoning

**Before PS+:**
"Given these constraints [complex scheduling problem], is there a valid schedule?"

**After PS+:**
```
PROBLEM:
[Complex scheduling problem with constraints]

Let's first understand the problem, extract all constraints and their
relationships, and devise a complete plan for finding a valid schedule
or proving none exists. Then, let's carry out the plan step by step.
```

## Best Use Cases

1. **Numerical Reasoning**
   - Financial calculations (MRR, CAC, payback, LTV)
   - Math word problems
   - Rate/proportion problems
   - Statistical computations

2. **Multi-Step Technical Problems**
   - Performance optimization (where numbers matter)
   - Resource estimation
   - Capacity planning

3. **Logic Problems**
   - Constraint satisfaction
   - Scheduling
   - Eligibility determination

4. **Zero-Shot Reasoning Improvement**
   - When you don't have few-shot examples
   - When vanilla CoT ("think step by step") isn't accurate enough
   - Drop-in improvement for any reasoning prompt

5. **Any Prompt Where Prior CoT Answers Were Wrong**
   - PS+ reduces calculation errors
   - Forces variable extraction before calculation
   - Reduces "skipped step" errors

## Selection Criteria

**Choose PS+ when:**
- ✅ Numerical calculation involved
- ✅ Multi-step reasoning with intermediate values
- ✅ No few-shot examples available (zero-shot context)
- ✅ Prior CoT attempts gave calculation errors
- ✅ Variables need explicit extraction before solving

**Avoid PS+ when:**
- ❌ Task is not a reasoning/calculation problem → use other frameworks
- ❌ Few-shot examples are available → consider manual CoT instead
- ❌ Problem requires branching (multiple approaches) → use Tree of Thought
- ❌ Compositional multi-hop → use Least-to-Most

## PS+ vs. Chain of Thought vs. Least-to-Most

| | Zero-Shot CoT | PS+ | Least-to-Most |
|---|---|---|---|
| Trigger | "Think step by step" | "Plan first, then execute" | Decompose → solve sequentially |
| Variable extraction | No | Yes (explicit) | Partial |
| Planning step | No | Yes (explicit) | Decomposition step |
| Best for | General reasoning | Numerical/variable problems | Compositional multi-hop |
| Few-shot needed | No | No | Optional |

## Quick Reference

| Component | Purpose |
|-----------|---------|
| Understand problem | Ensure full comprehension before starting |
| Extract variables | Identify all given values explicitly |
| Devise plan | State the approach before executing |
| Calculate intermediates | Show all calculation steps |
| Solve step by step | Execute the plan with attention to detail |
