# RISEN Framework

## Overview

RISEN is a methodology-focused framework that emphasizes process, steps, and boundaries. It's ideal for complex multi-step tasks where following a specific procedure matters, and where defining what NOT to do is as important as what to do. A complete RISEN prompt emits as a flat block with its section headers stripped — the role and instructions survive as sentences, the steps as a numbered list, the end goal as a standing description of the deliverable, and the narrowing as explicit "Do not" lines — optionally preceded by a source-material block holding the artifact the procedure runs on.

**Origin:** Community framework, attributed to Kyle Balmer (AI educator, @iamkylebalmer). The earliest dated appearance is Moritz Kremb, "5 prompt frameworks to level up your prompts" (The Prompt Warrior, 13 October 2023), which credits Balmer with creating and sharing it; Balmer himself writes only "I call the RISEN framework" and makes no claim of invention. No academic source documents RISEN.

## Components

### R - Role
**Purpose:** Define the persona, expertise level, or perspective Claude should adopt, as a complete sentence. Nothing else in the emitted prompt establishes the role once the `ROLE` header is stripped, so a bare noun phrase leaves it unstated.

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
**Purpose:** Provide high-level guidance, principles, and overarching direction, as complete sentences. When it points at supplied material, name that material ("the module above") so the reference survives the header being stripped.

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
**Purpose:** Break down the task into detailed, sequential actions. The numbered list reads as an ordered procedure on its own and does not rely on the `STEPS` header to signal what it is, so each step should begin with a verb and name what it operates on where relevant.

**Questions to Ask:**
- What's the exact sequence of actions?
- What substeps are involved?
- Are there dependencies between steps?
- What should happen in what order?

**Examples:**
- "1. Analyze requirements, 2. Design architecture, 3. Implement core..."
- "First validate input, then process, finally output..."

### E - End Goal
**Purpose:** Define success criteria and the final desired outcome. Phrase it as a standing description of the deliverable ("A comprehensive report that…") so it reads as the target once the `END GOAL` header is removed, rather than dangling as a loose noun phrase.

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
**Purpose:** Set constraints, boundaries, and explicitly state what NOT to do. Each item must begin with "Do not", "Avoid", "Out of scope", or "Stay within" so the negation lives in the item itself — once the `NARROWING` header is stripped, a bare noun phrase would read as an instruction to DO the very thing being ruled out.

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

Section headers are stripped at emission, so every slot's meaning is carried by the prose around and inside it rather than by the header above it. This matters most for Narrowing: each constraint must begin with "Do not", "Avoid", "Out of scope", or "Stay within" so the boundary survives once the `NARROWING` header is gone — a bare noun phrase would read as an instruction to DO the very thing being ruled out. Role and Instructions are already complete sentences, the numbered Steps read as an ordered sequence on their own, and the End Goal should name the deliverable as a standing description so it does not dangle when its header is removed. The optional `SOURCE MATERIAL` block, when present, holds the artifact the procedure runs on, named concretely and tied to the steps by one line of prose; it is omitted entirely for from-scratch procedures.

```
SOURCE MATERIAL:
[OPTIONAL — include only if the procedure below operates on something the user already has.
If so, emit a literal paste instruction naming the specific artifact, e.g. "[Paste the authentication module source here]"
or "[Paste the Q3 sales dataset here]" — then one line of prose tying it to what follows,
e.g. "The material above is what the steps below are applied to."
If the task generates entirely from scratch, omit this section — do not emit an empty placeholder.]

ROLE:
[Define the expertise level, persona, or perspective to adopt. What knowledge should be demonstrated?]

INSTRUCTIONS:
[Provide high-level guidance, principles, and overarching direction. What methodology or approach should guide this work?]

STEPS:
1. [First specific action or stage]
2. [Second specific action or stage]
3. [Third specific action or stage]
[Continue with detailed, sequential steps...]

END GOAL:
[Define success criteria and final desired outcome. What should be true when complete? How will we know it's done correctly?]

NARROWING:
- Do NOT: [Specific thing to avoid]
- Avoid: [Approach or pattern to avoid]
- Out of scope: [What's not included]
- Stay within: [Boundaries and constraints]
- Constraints: [Limitations to respect]
```

## Complete Examples

Both examples below are shown in emitted form: each slot carries its own role in prose, so
nothing is lost when the headers are deleted. The first operates on supplied material and
opens with a `SOURCE MATERIAL` block; the second generates from scratch and omits it.

### Example 1: Security review of supplied code (source material supplied)

**Before RISEN:**
"Help me review this codebase."

**After RISEN:**
```
SOURCE MATERIAL:
[Paste the authentication module source here]
The material above is what the steps below are applied to.

ROLE:
You are a senior code reviewer with expertise in Python and system security. You have 10+ years of experience identifying vulnerabilities and architectural issues.

INSTRUCTIONS:
Conduct a thorough security-focused review of the module above following OWASP guidelines. Prioritize identifying security vulnerabilities over style issues. Consider both the code itself and its architectural implications.

STEPS:
1. Scan the module above for common security vulnerabilities (SQL injection, XSS, auth issues)
2. Review its authentication and authorization logic
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
- Can be shared with the development team for action

NARROWING:
- Do NOT focus on code style or formatting issues
- Do NOT suggest complete rewrites; focus on targeted fixes
- Avoid generic security advice; be specific to the module above
- Do NOT include theoretical vulnerabilities that don't apply
- Stay within the Python ecosystem; do not suggest language changes
- Do NOT redesign the architecture; work within the current structure
```

### Example 2: Onboarding runbook written from scratch (no source material)

**Before RISEN:**
"Write an onboarding runbook for new engineers."

**After RISEN** (no source material — the runbook is written from scratch, so the
`SOURCE MATERIAL` block is omitted):
```
ROLE:
You are a staff engineer who has onboarded dozens of new hires onto this team's backend services and knows where newcomers get stuck.

INSTRUCTIONS:
Write a first-week onboarding runbook for engineers joining the payments team. Assume the reader has general backend experience but no knowledge of our systems, and favor concrete commands over prose.

STEPS:
1. List the accounts, tools, and access a new engineer must request on day one
2. Walk through cloning the repositories and running the service locally
3. Explain how to run the test suite and read its output
4. Describe how to open, review, and merge a first pull request
5. Point to the runbooks and dashboards used during on-call

END GOAL:
A self-contained runbook a new engineer can follow unattended in their first week, ending with a working local environment and one merged trivial pull request.

NARROWING:
- Do NOT assume any prior knowledge of our internal tooling
- Avoid linking to documents that require access the reader does not yet have
- Out of scope: on-call rotation policy and compensation details
- Stay within the payments team's services; do not document unrelated systems
- Do NOT include real credentials or secrets in any example command
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

### Simplified RISEN (RISE-IE)
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
