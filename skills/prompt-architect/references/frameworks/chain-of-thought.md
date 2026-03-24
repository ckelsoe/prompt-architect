# Chain of Thought (CoT) Framework

## Overview

Chain of Thought is a prompting technique that encourages step-by-step reasoning and makes the thinking process explicit. Instead of jumping to answers, it guides Claude to break down complex problems, show intermediate steps, and verify logic along the way.

## Core Concept

CoT works by:
1. Breaking complex problems into smaller steps
2. Making reasoning explicit at each step
3. Showing work rather than just final answers
4. Verifying logic progressively
5. Enabling error detection and correction

## When to Use Chain of Thought

**Ideal for:**
- Mathematical problem-solving
- Logical reasoning tasks
- Complex multi-step analysis
- Debugging and troubleshooting
- Decision-making with trade-offs
- Tasks where "showing your work" matters

**Not needed for:**
- Simple lookups or facts
- Straightforward transformations
- Tasks with obvious single steps
- Creative writing without logic requirements

## Implementation Approaches

### Approach 1: Explicit Instruction
Directly instruct Claude to think step-by-step.

**Example:**
```
Solve this problem step-by-step, showing your reasoning at each stage:

A company's revenue grew 15% in Q1, decreased 8% in Q2, grew 20% in Q3, and grew 5% in Q4. If they started the year with $1M in quarterly revenue, what was their Q4 revenue?

Think through this carefully:
1. Calculate Q1 revenue
2. Calculate Q2 revenue
3. Calculate Q3 revenue
4. Calculate Q4 revenue
5. Verify your calculation
```

### Approach 2: Zero-Shot CoT
Use trigger phrases that activate reasoning.

**Magic phrases:**
- "Let's think step by step."
- "Let's work through this systematically."
- "Let's break this down."
- "Think carefully about this."

**Example:**
```
What's the best database choice for a real-time analytics platform handling 1M events/second with complex aggregations? Let's think step by step.
```

### Approach 3: Few-Shot CoT
Provide examples showing step-by-step reasoning.

**Example:**
```
Example 1:
Q: If a train travels 120 miles in 2 hours, what's its speed?
A: Let's break this down:
1. Speed = Distance / Time
2. Distance = 120 miles
3. Time = 2 hours
4. Speed = 120 / 2 = 60 mph
Therefore: 60 mph

Example 2:
Q: A store offers 20% off, then an additional 10% off. What's the total discount on a $100 item?
A: Let's work through this:
1. First discount: 20% of $100 = $20
2. Price after first discount: $100 - $20 = $80
3. Second discount: 10% of $80 = $8
4. Final price: $80 - $8 = $72
5. Total discount: $100 - $72 = $28
6. Total discount percentage: 28/100 = 28%
Therefore: 28% total discount (not 30%)

Now solve:
Q: [Your problem]
A: Let's break this down:
```

### Approach 4: Structured CoT
Provide a template for reasoning.

**Example:**
```
Analyze whether we should migrate to microservices using this reasoning structure:

STEP 1 - CURRENT STATE:
[Describe current architecture]

STEP 2 - PROBLEMS:
[What problems exist?]

STEP 3 - MICROSERVICES BENEFITS:
[How would microservices help?]

STEP 4 - MICROSERVICES COSTS:
[What are the downsides?]

STEP 5 - ALTERNATIVES:
[What else could we do?]

STEP 6 - COMPARISON:
[Compare options systematically]

STEP 7 - RECOMMENDATION:
[Final decision with reasoning]
```

## Best Practices

### 1. Be Explicit About Steps
```
Good:
"Calculate the ROI step by step:
1. Calculate total costs
2. Calculate total revenue
3. Calculate profit (revenue - costs)
4. Calculate ROI (profit / costs * 100)
5. Interpret the result"

Poor:
"Calculate the ROI"
```

### 2. Request Verification
```
Good:
"After solving, verify your answer makes sense and check your math."

Poor:
[No verification step]
```

### 3. Encourage Self-Correction
```
Good:
"If you find an error in your reasoning, acknowledge it and correct your approach."

Poor:
[No mention of error handling]
```

### 4. Ask for Uncertainty Acknowledgment
```
Good:
"If you're uncertain at any step, state your assumptions and why you made them."

Poor:
[Assumes certainty at all steps]
```

## Complete Examples

### Example 1: Debugging

**Without CoT:**
```
Why isn't this code working?
[code snippet]
```

**With CoT:**
```
Debug this code by thinking through it step-by-step:

[code snippet]

Use this process:
1. Read the code and state what it's supposed to do
2. Identify the input and expected output
3. Trace through execution line by line
4. Note any suspicious patterns or red flags
5. Form hypotheses about the bug
6. Test each hypothesis against the code
7. Identify the root cause
8. Propose a fix
9. Verify the fix addresses the issue
```

### Example 2: System Design

**Without CoT:**
```
Design a URL shortener.
```

**With CoT:**
```
Design a URL shortener by working through these steps:

STEP 1 - REQUIREMENTS:
Think through what the system needs to do.
- Functional requirements?
- Non-functional requirements?
- Scale expectations?

STEP 2 - API DESIGN:
What endpoints do we need?
- Consider: creation, retrieval, analytics

STEP 3 - DATA MODEL:
How should we store URLs?
- What fields are needed?
- What indexes?

STEP 4 - URL GENERATION:
How do we create short codes?
- Base62 encoding? Hash? Counter?
- Collision handling?

STEP 5 - SCALABILITY:
How does this scale?
- Bottlenecks?
- Caching strategy?
- Database sharding?

STEP 6 - TRADE-OFFS:
What are we optimizing for vs. sacrificing?

For each step, explain your reasoning.
```

### Example 3: Decision Making

**Without CoT:**
```
Should we use MongoDB or PostgreSQL?
```

**With CoT:**
```
Decide between MongoDB and PostgreSQL by reasoning through:

STEP 1 - USE CASE ANALYSIS:
What are we building and what data patterns will we have?
- Data structure (structured/unstructured?)
- Relationships (complex/simple?)
- Query patterns (known/unknown?)

STEP 2 - MONGODB EVALUATION:
Pros for our use case:
[List and explain]
Cons for our use case:
[List and explain]

STEP 3 - POSTGRESQL EVALUATION:
Pros for our use case:
[List and explain]
Cons for our use case:
[List and explain]

STEP 4 - CRITICAL REQUIREMENTS:
What are our non-negotiables?
- [Requirement 1 and why it matters]
- [Requirement 2 and why it matters]

STEP 5 - SCORING:
Rate each database against our requirements.

STEP 6 - DECISION:
Based on the analysis above, choose one and explain why.

STEP 7 - VALIDATE:
Does this decision make sense? Any red flags?
```

## Combining CoT with Other Frameworks

### CoT + CO-STAR
```
CONTEXT: [Situation]
OBJECTIVE: [Goal]
...

PROCESS (Chain of Thought):
Work through this step-by-step:
1. [Step 1]
2. [Step 2]
...
```

### CoT + RISEN
```
ROLE: [Expertise]
INSTRUCTIONS: Use step-by-step reasoning for each stage
STEPS:
1. [Step 1] - Think through: [reasoning points]
2. [Step 2] - Consider: [reasoning points]
...
```

### CoT + RISE
```
ROLE: [Analyst]
INPUT: [Data]
STEPS:
1. [Action] - Reasoning: [Why this step?]
2. [Action] - Reasoning: [What are we looking for?]
...
```

## Advanced Techniques

### Self-Consistency
Generate multiple reasoning paths and choose the most common answer:

```
Solve this problem using three different approaches:

APPROACH 1:
[Method 1 with step-by-step reasoning]

APPROACH 2:
[Method 2 with step-by-step reasoning]

APPROACH 3:
[Method 3 with step-by-step reasoning]

COMPARISON:
Which approach is most reliable and why?

FINAL ANSWER:
Based on the most consistent result.
```

### Uncertainty Quantification
```
For each step, rate your confidence:
1. [Step 1] - Confidence: High/Medium/Low - Because: [reason]
2. [Step 2] - Confidence: High/Medium/Low - Because: [reason]

If any step has low confidence, explore alternatives.
```

### Backward Chaining
```
Start with the desired outcome and work backwards:

GOAL: [What we want to achieve]

STEP -1: To achieve this, what must be true immediately before?
STEP -2: To achieve that, what must be true before it?
STEP -3: Keep working backwards...
STEP -N: What's our starting point?

Now verify the forward path makes sense.
```

## Common Patterns

### Mathematical Problem Solving
```
1. Understand: Restate the problem in your own words
2. Identify: What do we know? What do we need to find?
3. Plan: What formula or approach applies?
4. Execute: Work through the math step-by-step
5. Verify: Does the answer make sense? Check units, magnitude
```

### Logical Reasoning
```
1. Premises: State what we know to be true
2. Inference: What can we deduce from premises?
3. Test: Do our deductions hold up?
4. Conclusion: What can we conclude?
5. Verify: Are there any logical fallacies?
```

### Troubleshooting
```
1. Observe: What's the symptom?
2. Hypothesize: What could cause this?
3. Test: How can we test each hypothesis?
4. Eliminate: Rule out what doesn't fit
5. Identify: What's the root cause?
6. Solve: How do we fix it?
7. Verify: Did it work?
```

## Quality Indicators

**Good CoT reasoning shows:**
- ✅ Each step builds on previous ones
- ✅ Assumptions are stated explicitly
- ✅ Calculations/logic are shown
- ✅ Intermediate results are verified
- ✅ Uncertainties are acknowledged
- ✅ Final answer follows logically

**Poor CoT reasoning shows:**
- ❌ Jumping to conclusions
- ❌ Skipping intermediate steps
- ❌ Hiding assumptions
- ❌ No verification
- ❌ Unjustified leaps in logic

## Assessment Checklist

When using Chain of Thought:
- [ ] Problem is complex enough to warrant CoT
- [ ] Steps are explicitly requested
- [ ] Reasoning structure is provided or suggested
- [ ] Verification is included
- [ ] Self-correction is encouraged
- [ ] Each step is actionable
- [ ] Logic flow is clear
- [ ] Assumptions are acknowledged
- [ ] Final answer connects to reasoning
- [ ] Work shown, not just answer
