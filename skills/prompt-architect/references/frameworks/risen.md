# RISEN Framework

## Overview

RISEN is a methodology-focused framework that emphasizes process, steps, and boundaries. It's ideal for complex multi-step tasks where following a specific procedure matters, and where defining what NOT to do is as important as what to do.

## Components

### R - Role
**Purpose:** Define the persona, expertise level, or perspective Claude should adopt.

**Questions to Ask:**
- What expertise should be demonstrated?
- What perspective is needed?
- Should Claude adopt a specific persona?
- What level of knowledge should be shown?

**Examples:**
- "Act as a senior software architect..."
- "Take the perspective of a security auditor..."
- "You are a patient teacher explaining to beginners..."

### I - Instructions
**Purpose:** Provide high-level guidance, principles, and overarching direction.

**Questions to Ask:**
- What are the governing principles?
- What approach should be taken?
- Are there important guidelines to follow?
- What methodology should guide the work?

**Examples:**
- "Follow test-driven development principles..."
- "Prioritize security over convenience..."
- "Use clear, simple language throughout..."

### S - Steps
**Purpose:** Break down the task into detailed, sequential actions.

**Questions to Ask:**
- What's the exact sequence of actions?
- What substeps are involved?
- Are there dependencies between steps?
- What should happen in what order?

**Examples:**
- "1. Analyze requirements, 2. Design architecture, 3. Implement core..."
- "First validate input, then process, finally output..."

### E - End Goal
**Purpose:** Define success criteria and the final desired outcome.

**Questions to Ask:**
- What does success look like?
- What should be true when complete?
- How will we know it's done correctly?
- What are the acceptance criteria?

**Examples:**
- "A fully tested API with 95%+ code coverage..."
- "A comprehensive report that stakeholders can act on..."
- "Working code that passes all integration tests..."

### N - Narrowing
**Purpose:** Set constraints, boundaries, and explicitly state what NOT to do.

**Questions to Ask:**
- What should be avoided?
- What's out of scope?
- What constraints exist?
- What approaches should NOT be used?
- What common mistakes to avoid?

**Examples:**
- "Do NOT use deprecated libraries..."
- "Avoid premature optimization..."
- "Stay within the current architecture; don't redesign..."

## Template Structure

```
ROLE:
[Expertise, perspective, or persona to adopt]

INSTRUCTIONS:
[High-level principles and guidance]

STEPS:
1. [First action]
2. [Second action]
3. [Third action]
[Continue with detailed sequence]

END GOAL:
[Success criteria and final outcome]

NARROWING:
- Do NOT: [Constraint 1]
- Avoid: [Constraint 2]
- Out of scope: [Constraint 3]
- Stay within: [Boundary]
```

## Complete Example

### Before RISEN:
"Help me review this codebase."

### After RISEN:
```
ROLE:
You are a senior code reviewer with expertise in Python and system security. You have 10+ years of experience identifying vulnerabilities and architectural issues.

INSTRUCTIONS:
Conduct a thorough security-focused code review following OWASP guidelines. Prioritize identifying security vulnerabilities over style issues. Consider both the code itself and its architectural implications.

STEPS:
1. Scan for common security vulnerabilities (SQL injection, XSS, auth issues)
2. Review authentication and authorization logic
3. Examine data validation and sanitization
4. Check for sensitive data exposure
5. Analyze third-party dependencies for known vulnerabilities
6. Assess error handling and logging practices
7. Evaluate API security measures
8. Review configuration and secrets management
9. Document findings with severity ratings
10. Provide remediation recommendations

END GOAL:
A comprehensive security assessment report that:
- Categorizes vulnerabilities by severity (Critical, High, Medium, Low)
- Includes specific code references with line numbers
- Provides concrete remediation steps for each issue
- Prioritizes fixes by risk and effort
- Can be shared with development team for action

NARROWING:
- Do NOT focus on code style or formatting issues
- Do NOT suggest complete rewrites; focus on targeted fixes
- Avoid generic security advice; be specific to this codebase
- Do NOT include theoretical vulnerabilities that don't apply
- Stay within Python ecosystem; don't suggest language changes
- Do NOT redesign the architecture; work within current structure
```

## Best Use Cases

1. **Development Tasks**
   - Code generation with specific methodology
   - Refactoring with constraints
   - Testing with particular approach

2. **Analysis Projects**
   - Data analysis with defined process
   - Audits following standards
   - Research with methodology

3. **Process Documentation**
   - Creating procedures
   - Workflow documentation
   - Standard operating procedures

4. **Complex Multi-Step Tasks**
   - Tasks with clear sequential dependencies
   - Projects with important boundaries
   - Work with specific methodology requirements

## Selection Criteria

**Choose RISEN when:**
- ✅ Task has clear sequential steps
- ✅ Process needs to be followed precisely
- ✅ Multiple approaches exist but one is preferred
- ✅ Important to define what NOT to do
- ✅ Role/expertise context matters
- ✅ Methodology or principles are important
- ✅ Success criteria need explicit definition

**Avoid RISEN when:**
- ❌ Task is simple and doesn't need steps
- ❌ No specific process required
- ❌ Boundaries and constraints don't matter
- ❌ Any approach is acceptable
- ❌ Quick, simple transformation needed

## Common Mistakes

1. **Steps Too High-Level**
   - Be specific and actionable
   - Break down complex steps into substeps
   - Include decision points

2. **Narrowing Too Restrictive**
   - Don't over-constrain unnecessarily
   - Focus on important boundaries
   - Explain why constraints exist

3. **Missing Dependencies**
   - Note when steps depend on each other
   - Clarify what needs to complete first
   - Mention parallel vs. sequential

4. **Vague End Goal**
   - Make success criteria measurable
   - Be specific about deliverables
   - Include quality standards

## Variations and Combinations

### RISEN + CO-STAR
For procedural tasks with audience considerations:
```
ROLE: [From RISEN]
CONTEXT: [From CO-STAR]
INSTRUCTIONS: [From RISEN]
STEPS: [From RISEN]
END GOAL: [From RISEN]
AUDIENCE: [From CO-STAR]
NARROWING: [From RISEN]
```

### RISEN + Chain of Thought
For complex reasoning with process:
```
[Standard RISEN structure]

Within each step, add:
REASONING: Think through why and how for this step
```

### Simplified RISEN (RISE)
When narrowing isn't critical:
```
ROLE:
INPUT:
STEPS:
EXPECTATION:
```

## Quick Reference

| Component | Focus | Key Question |
|-----------|-------|--------------|
| Role | Expertise | "What perspective is needed?" |
| Instructions | Principles | "What approach should guide this?" |
| Steps | Process | "What's the exact sequence?" |
| End Goal | Success | "What defines completion?" |
| Narrowing | Boundaries | "What should be avoided?" |

## Step Design Best Practices

### Good Steps:
```
1. Validate input data against schema (check types, ranges, required fields)
2. Sanitize user input (escape HTML, strip dangerous chars)
3. Query database with parameterized statements
4. Transform results into response format
5. Log operation with timestamp and user ID
```

### Poor Steps:
```
1. Get the data
2. Process it
3. Return results
```

### Effective Narrowing:
```
NARROWING:
- Do NOT trust user input without validation
- Avoid loading entire dataset into memory (use pagination)
- Do NOT use string concatenation for SQL queries
- Stay within 200ms response time target
- Avoid external API calls in this phase
```

### Ineffective Narrowing:
```
NARROWING:
- Be careful
- Don't make mistakes
```

## Assessment Checklist

When applying RISEN, verify:
- [ ] Role defines clear expertise or perspective
- [ ] Instructions provide guiding principles
- [ ] Steps are specific, actionable, and sequential
- [ ] Dependencies between steps are noted
- [ ] End goal has measurable success criteria
- [ ] Narrowing identifies important constraints
- [ ] Narrowing explains why boundaries exist
- [ ] All steps contribute to end goal
- [ ] Nothing in narrowing contradicts instructions
- [ ] Process is feasible and practical
