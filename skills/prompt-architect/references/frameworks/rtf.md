# RTF Framework

## Overview

RTF is the simplest prompting framework, focusing on Role, Task, and Format. It's ideal for straightforward, well-defined tasks where minimal context is needed and the primary concern is output formatting.

## Components

### R - Role
**Purpose:** Define the expertise or perspective needed.

**Questions to Ask:**
- What expertise is required?
- What viewpoint matters?

**Examples:**
- "You are a technical writer..."
- "Act as a Python expert..."
- "You're a hiring manager..."

### T - Task
**Purpose:** State what needs to be done clearly and concisely.

**Questions to Ask:**
- What exactly needs to be done?
- What's the deliverable?
- What's the core action?

**Examples:**
- "Write a function that sorts a list..."
- "Create a job description for..."
- "Explain how authentication works..."

### F - Format
**Purpose:** Specify how the output should be structured.

**Questions to Ask:**
- What format should output take?
- How should it be structured?
- What's the preferred presentation?
- Any specific formatting requirements?

**Examples:**
- "Provide as a markdown table..."
- "Format as JSON with fields..."
- "Write as a bullet list with..."

## Template Structure

```
ROLE: [Expertise or perspective]

TASK: [What needs to be done]

FORMAT: [How output should be structured]
```

## Complete Examples

### Example 1: Code Generation

**Before RTF:**
"Write a sorting function."

**After RTF:**
```
ROLE: You are a Python developer who writes clean, efficient code.

TASK: Write a function that sorts a list of dictionaries by a specified key, with support for ascending/descending order.

FORMAT: Provide the solution as:
1. Function signature with type hints
2. Docstring with examples
3. Implementation
4. 2-3 usage examples
```

### Example 2: Content Creation

**Before RTF:**
"Write about API security."

**After RTF:**
```
ROLE: You are a technical documentation specialist.

TASK: Create a quick reference guide for API authentication best practices, covering OAuth 2.0, JWT, and API keys.

FORMAT: Structured as:
- Title
- One-paragraph overview
- Three sections (one per auth method) with:
  * When to use
  * Pros and cons (bullet points)
  * Implementation example
- Resources section with links
```

### Example 3: Data Presentation

**Before RTF:**
"Show me the comparison."

**After RTF:**
```
ROLE: You are a data analyst presenting to executives.

TASK: Compare three cloud providers (AWS, Azure, GCP) across cost, performance, and features for a mid-size company.

FORMAT: Provide as:
- Markdown table with providers as columns
- Rows: Cost (tier 1-3), Performance metrics, Key features, Pros, Cons
- Below table: 2-3 sentence recommendation
- Keep total output under 300 words
```

## Best Use Cases

1. **Quick Tasks**
   - Simple explanations
   - Short code snippets
   - Brief comparisons
   - Format conversions

2. **Format-Critical Tasks**
   - When output structure is primary concern
   - Template filling
   - Structured data generation
   - Report formatting

3. **Well-Defined Problems**
   - Requirements are clear
   - No ambiguity
   - Standard approach exists
   - Minimal context needed

4. **One-Off Requests**
   - Not part of larger workflow
   - Standalone task
   - Doesn't need extensive setup

## Selection Criteria

**Choose RTF when:**
- ✅ Task is simple and well-defined
- ✅ Minimal context required
- ✅ Output format is primary concern
- ✅ Quick, focused execution needed
- ✅ No complex methodology required
- ✅ One-off or standalone task

**Avoid RTF when:**
- ❌ Complex multi-step process (use RISEN)
- ❌ Rich context needed (use CO-STAR)
- ❌ Audience/tone matters (use CO-STAR)
- ❌ Specific methodology required (use RISEN)
- ❌ Input transformation needed (use RISE)

## Common Mistakes

1. **Insufficient Task Description**
   - Be specific about what's needed
   - Include key requirements
   - Define scope clearly

2. **Vague Format Requirements**
   - Specify exact structure
   - Mention required sections
   - Define length/detail level

3. **Missing Role Context**
   - Even simple tasks benefit from role
   - Expertise level affects output
   - Don't skip role definition

4. **Using RTF for Complex Tasks**
   - If you need more than 3-4 sentences per component
   - Switch to more comprehensive framework

## RTF Variations

### Minimal RTF
For very simple tasks:
```
As a [ROLE], [TASK] in [FORMAT].
```

Example:
```
As a Python developer, write a function to validate email addresses in a code block with docstring.
```

### Extended RTF
When slightly more detail needed:
```
ROLE: [Expertise]

TASK: [What needs doing]

REQUIREMENTS:
- [Key requirement 1]
- [Key requirement 2]

FORMAT: [Output structure]
```

### RTF with Examples
When showing examples helps:
```
ROLE: [Expertise]

TASK: [What needs doing]

EXAMPLES OF GOOD OUTPUT:
[Show 1-2 examples]

FORMAT: [Follow this structure]
```

## When to Upgrade from RTF

**Upgrade to RISE if:**
- Need to specify input characteristics
- Processing steps matter
- Input → output transformation

**Upgrade to RISEN if:**
- Multiple steps required
- Need constraints/boundaries
- Methodology matters
- Success criteria complex

**Upgrade to CO-STAR if:**
- Audience considerations important
- Tone/style matter
- Rich context needed
- Content creation task

## Quick Reference

| Component | Focus | Key Question |
|-----------|-------|--------------|
| Role | Expertise | "Who should do this?" |
| Task | Action | "What needs to be done?" |
| Format | Structure | "How should it look?" |

## Format Specification Best Practices

### Good Format Specifications:
```
FORMAT:
Return as JSON with structure:
{
  "summary": "1-2 sentence overview",
  "items": [
    {
      "name": "string",
      "priority": "high|medium|low",
      "details": "string"
    }
  ],
  "total_count": number
}
```

```
FORMAT:
Markdown document with:
- H1 title
- Brief intro paragraph
- 3-5 H2 sections, each with:
  * 2-3 paragraphs
  * Bullet points for key takeaways
- Conclusion paragraph
- Total length: 500-700 words
```

### Poor Format Specifications:
```
FORMAT: Make it nice
```

```
FORMAT: JSON or something
```

## Real-World Examples

### API Documentation
```
ROLE: Senior API documentation writer

TASK: Document the POST /users endpoint that creates a new user account with email, password, and optional profile data.

FORMAT:
Structure as:
- Endpoint details (method, path, auth required)
- Request body parameters (table: name, type, required, description)
- Response codes (200, 400, 409 with meanings)
- Example request (curl)
- Example response (JSON)
- Notes section for special behaviors
```

### Code Review Comment
```
ROLE: Experienced code reviewer

TASK: Review this function for security vulnerabilities and performance issues. Identify specific problems and suggest fixes.

FORMAT:
For each issue found:
🔴 ISSUE: [Brief title]
LINE: [Line number]
PROBLEM: [What's wrong]
FIX: [How to fix it]
SEVERITY: [High/Medium/Low]

End with overall assessment (2-3 sentences).
```

### Meeting Summary
```
ROLE: Executive assistant

TASK: Summarize this meeting transcript, focusing on decisions made and action items.

FORMAT:
Meeting Summary: [Title]
Date: [Date]

KEY DECISIONS:
- [Decision 1]
- [Decision 2]

ACTION ITEMS:
- [ ] [Task] - Assigned to [Person] - Due: [Date]

DISCUSSION POINTS:
- [Topic 1]: [Brief summary]

NEXT STEPS:
[What happens next]
```

## Assessment Checklist

When applying RTF, verify:
- [ ] Role defines clear expertise
- [ ] Task is specific and unambiguous
- [ ] Task scope is well-defined
- [ ] Format requirements are detailed
- [ ] Format is appropriate for task
- [ ] All three components work together
- [ ] Task isn't too complex for RTF
- [ ] No need for richer framework
- [ ] Output structure is clear
- [ ] Length/detail level specified
