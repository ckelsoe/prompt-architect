# RISE Framework - Dual Variant Support

## Overview

RISE is a streamlined 4-component framework that exists in **two legitimate variants**, each serving different use cases. Both versions are well-documented in authoritative sources and provide effective prompt structuring.

**Important**: This skill supports BOTH variants. Selection guidance is provided below to help choose the right version for your task.

---

## The Two RISE Variants

### RISE-IE: Input-Expectation (Data-Focused)
**Components**: Role, **Input**, Steps, **Expectation**

**Best for**: Data analysis, transformations, processing tasks

**Sources**: Fabio Vivas, Juuzt.ai

### RISE-IX: Instructions-Examples (Instruction-Focused)
**Components**: Role, **Instructions**, Steps, **Examples**

**Best for**: Content creation, learning tasks, example-based work

**Sources**: AiPromptsX, The Prompt Warrior, Thoughts Brewing

---

## RISE-IE (Input-Expectation Variant)

### When to Use RISE-IE

**Perfect for:**
- ✅ Data analysis and transformation tasks
- ✅ Input → output processing workflows
- ✅ Working with specific data formats (CSV, JSON, logs)
- ✅ Tasks where input characteristics are well-defined
- ✅ Analytical and technical tasks
- ✅ Report generation from structured data

**Use RISE-IE when you have**:
- Well-defined input data or content
- Clear transformation requirements
- Specific output format needs
- Analytical processing goals

### RISE-IE Components

#### R - Role
**Purpose:** Define the perspective or expertise needed for the task.

**Questions to Ask:**
- What expertise is required?
- What viewpoint should be taken?
- What knowledge level is needed?

**Examples:**
- "Act as a data analyst..."
- "You are a content editor..."
- "Take the perspective of a UX researcher..."

#### I - Input
**Purpose:** Specify what's being provided and its characteristics.

**Questions to Ask:**
- What data/content is being provided?
- What format is it in?
- Are there any input constraints?
- What should Claude expect to receive?

**Examples:**
- "You'll receive a CSV file with sales data..."
- "Input is a collection of user feedback emails..."
- "You have access to JSON API responses..."

#### S - Steps
**Purpose:** Define how to process the input.

**Questions to Ask:**
- How should the input be processed?
- What transformations are needed?
- What's the processing sequence?
- What analysis should be performed?

**Examples:**
- "1. Parse CSV, 2. Calculate metrics, 3. Identify trends..."
- "Extract key themes, categorize by sentiment, count occurrences..."

#### E - Expectation
**Purpose:** Define what the output should look like.

**Questions to Ask:**
- What format should output take?
- What should be included?
- How detailed should it be?
- What's the deliverable?

**Examples:**
- "Provide a summary table with top 10 items..."
- "Generate a JSON object with categorized results..."
- "Create a report with charts and key findings..."

### RISE-IE Template

```
ROLE:
[Perspective or expertise needed]

INPUT:
[Description of provided data/content:
- Format and structure
- Key characteristics
- Any quirks or special considerations]

STEPS:
1. [Processing action 1]
2. [Processing action 2]
3. [Processing action 3]
4. [Continue with transformation/analysis steps...]

EXPECTATION:
[Output format and content requirements:
- Format and structure
- Required elements
- Level of detail
- Length or size constraints]
```

### RISE-IE Complete Example

**Before RISE-IE:**
"Analyze these customer reviews."

**After RISE-IE:**
```
ROLE:
You are a customer insights analyst with expertise in sentiment analysis and theme extraction.

INPUT:
You'll receive 50 customer reviews from our mobile app. Each review contains:
- Star rating (1-5)
- Written feedback
- Date of review
- User segment (free/premium)

STEPS:
1. Categorize reviews by sentiment (positive, neutral, negative)
2. Extract common themes and topics mentioned
3. Identify feature requests vs. complaints vs. praise
4. Segment findings by user type (free vs. premium)
5. Highlight urgent issues mentioned multiple times
6. Note any patterns in timing or trends

EXPECTATION:
Provide a structured analysis with:
- Summary table showing sentiment distribution
- Top 5 themes with frequency counts
- List of feature requests ranked by mentions
- Critical issues requiring immediate attention
- Comparison of free vs. premium user feedback
- 2-3 actionable recommendations
```

---

## RISE-IX (Instructions-Examples Variant)

### When to Use RISE-IX

**Perfect for:**
- ✅ Content creation tasks
- ✅ Writing with specific style requirements
- ✅ Tasks benefiting from examples
- ✅ Learning and educational content
- ✅ Creative work requiring reference points
- ✅ Replicating existing formats or styles

**Use RISE-IX when you have**:
- A specific task or directive to follow
- Examples of desired output style
- Need to replicate a format or approach
- Creative or communication-focused goals

### RISE-IX Components

#### R - Role
**Purpose:** Define who the AI should embody (persona or expertise).

**Questions to Ask:**
- What persona is most appropriate?
- What expertise level is needed?
- What perspective should be taken?

**Examples:**
- "You are a senior content strategist..."
- "Act as a creative copywriter..."
- "Take on the role of a technical writer..."

#### I - Instructions
**Purpose:** Specify the main task or directive.

**Questions to Ask:**
- What is the primary task?
- What are the core requirements?
- What should be accomplished?
- What guidelines should be followed?

**Examples:**
- "Create a blog post outline about sustainable fashion"
- "Write product descriptions for eco-friendly products"
- "Develop an email sequence for customer onboarding"

#### S - Steps
**Purpose:** Outline the process or methodology to follow.

**Questions to Ask:**
- What's the sequence of actions?
- How should the task be approached?
- What's the workflow?
- What methodology should be used?

**Examples:**
- "1. Research trends, 2. Identify pain points, 3. Structure content, 4. Add CTAs"
- "Start with hook, develop key points, conclude with action items"

#### E - Examples
**Purpose:** Provide positive examples showing desired output.

**Questions to Ask:**
- What does good output look like?
- Can you provide reference examples?
- What style should be emulated?
- What format should be followed?

**Examples:**
- "Similar to our 'Eco-Friendly Living' post format with 3 main sections"
- "Follow the style of these product descriptions: [examples]"
- "Match the tone and structure of this email: [example]"

### RISE-IX Template

```
ROLE:
[Persona or expertise level]

INSTRUCTIONS:
[Main task or directive:
- What to create or accomplish
- Core requirements
- Key guidelines to follow]

STEPS:
1. [Approach or methodology step 1]
2. [Step 2]
3. [Step 3]
4. [Continue with workflow/process steps...]

EXAMPLES:
[Positive examples showing desired output:
- Reference materials
- Style to emulate
- Format to follow
- Similar successful outputs]
```

### RISE-IX Complete Example

**Before RISE-IX:**
"Write product descriptions for our sustainable clothing line."

**After RISE-IX:**
```
ROLE:
You are a senior copywriter specializing in sustainable fashion and eco-conscious brands.

INSTRUCTIONS:
Create compelling product descriptions for our new sustainable clothing line that:
- Highlight eco-friendly materials and production methods
- Appeal to environmentally conscious millennials
- Emphasize both style and sustainability
- Include specific product details and benefits
- Drive purchase intent through emotional connection

STEPS:
1. Start with an attention-grabbing opening about the product's unique appeal
2. Describe the sustainable materials and ethical production process
3. Highlight the product's style, fit, and versatility
4. Include specific technical details (materials, care, sizing)
5. End with a call-to-action emphasizing the impact of their purchase

EXAMPLES:
Similar to these high-performing descriptions:

Example 1: "The Ocean Breeze Tee - Crafted from 100% recycled ocean plastics,
this impossibly soft tee proves sustainability never has to sacrifice style. Each
purchase removes 5 plastic bottles from our oceans..."

Example 2: "Evergreen Denim Jacket - Timeless style meets zero-waste innovation.
Woven from organic cotton with natural indigo dye, this jacket gets better with
every wear while treading lightly on the planet..."
```

---

## Selection Guide: Which RISE Variant to Use?

### Quick Decision Matrix

| Your Task Type | Recommended Variant | Key Indicator |
|----------------|-------------------|---------------|
| Data analysis | **RISE-IE** | You have specific data to process |
| CSV/JSON processing | **RISE-IE** | Input format is technical |
| Report generation | **RISE-IE** | Transforming data → output |
| Content writing | **RISE-IX** | Creating new content |
| Style replication | **RISE-IX** | Need examples to follow |
| Email/blog creation | **RISE-IX** | Communication-focused |
| Code analysis | **RISE-IE** | Processing code as input |
| Creative work | **RISE-IX** | Examples show desired style |

### Detailed Selection Criteria

**Choose RISE-IE (Input-Expectation) when:**
- ✅ You have well-defined input data (files, datasets, content)
- ✅ Task is analytical or technical
- ✅ Focus is on transformation/processing
- ✅ Output format is more important than style
- ✅ Working with structured data (CSV, JSON, logs)
- ✅ Need to specify what you're providing as input

**Choose RISE-IX (Instructions-Examples) when:**
- ✅ Task is creative or communication-focused
- ✅ You have examples of desired output
- ✅ Need to replicate a specific style or format
- ✅ Instructions are the core driver (not input data)
- ✅ Examples would clarify expectations
- ✅ Creating content rather than processing data

### Can't Decide? Ask Yourself:

**"Am I providing specific data/content to be processed?"**
- YES → **RISE-IE** (Input-Expectation)
- NO → **RISE-IX** (Instructions-Examples)

**"Do I have examples that would help clarify what I want?"**
- YES → **RISE-IX** (Instructions-Examples)
- NO → **RISE-IE** might be better

**"Is this primarily a data transformation task?"**
- YES → **RISE-IE** (Input-Expectation)
- NO → **RISE-IX** (Instructions-Examples)

---

## Common Use Cases by Variant

### RISE-IE Use Cases

1. **Data Analysis**
   - CSV/Excel analysis
   - Log file processing
   - Survey data interpretation
   - Database query results processing

2. **Content Processing**
   - Text summarization
   - Document transformation
   - Email categorization
   - Content extraction

3. **Code Analysis**
   - Code review with specific focus
   - Dependency analysis
   - Performance profiling
   - Test coverage assessment

4. **Format Conversions**
   - JSON to CSV conversion
   - Markdown to HTML
   - Data cleaning and normalization

### RISE-IX Use Cases

1. **Content Creation**
   - Blog post writing
   - Product descriptions
   - Email campaigns
   - Social media content

2. **Documentation**
   - User guides following templates
   - API documentation matching style
   - Tutorial creation based on examples

3. **Creative Writing**
   - Marketing copy
   - Brand messaging
   - Storytelling with reference examples
   - Style-matched content

4. **Educational Content**
   - Lesson plans following examples
   - Quiz creation matching format
   - Study guides based on templates

---

## Comparison with Other Frameworks

### RISE-IE vs. RISE-IX

| Aspect | RISE-IE | RISE-IX |
|--------|---------|---------|
| **Focus** | Data transformation | Content creation |
| **Key Component** | Input specification | Examples provision |
| **Best For** | Analytical tasks | Creative tasks |
| **Learning Curve** | Technical | Accessible |
| **Example Type** | Input/output specs | Style references |

### RISE (Both) vs. RISEN

**Use RISE for:**
- Simpler transformations
- When narrowing/constraints aren't critical
- Standard processing or creation
- Routine tasks

**Use RISEN for:**
- Complex multi-step processes
- When boundaries and constraints matter
- Multiple valid approaches (need to specify one)
- Tasks requiring extensive guidance and limitations

### RISE (Both) vs. RTF

**Use RISE for:**
- Multi-step processing or creation
- When input or examples add clarity
- More complex than simple directives

**Use RTF for:**
- Simple, straightforward tasks
- Quick requests
- When role-task-format is sufficient

### RISE (Both) vs. CO-STAR

**Use RISE for:**
- Focused tasks without multiple audience considerations
- When tone/style are secondary
- Straightforward processing or creation

**Use CO-STAR for:**
- Complex communication requirements
- Multiple audience considerations
- When tone and style are critical

---

## Assessment Checklist

### For RISE-IE (Input-Expectation):
- [ ] Role is appropriate for the analytical task
- [ ] Input is thoroughly described
- [ ] Input format and structure are specified
- [ ] Steps are specific and sequential
- [ ] Processing methods are clear
- [ ] Expectation defines exact output format
- [ ] Output requirements are detailed
- [ ] All input characteristics are handled in steps

### For RISE-IX (Instructions-Examples):
- [ ] Role matches the creative/communication task
- [ ] Instructions are clear and comprehensive
- [ ] Steps outline the methodology
- [ ] Workflow is logical and sequential
- [ ] Examples effectively demonstrate desired output
- [ ] Examples match the task type
- [ ] Examples show style, format, or approach to emulate
- [ ] Sufficient examples provided (2-3 recommended)

---

## Tips for Effective Use

### RISE-IE Tips

1. **Be Specific About Input**
   - Mention format, structure, and characteristics
   - Note any data quirks or issues
   - Specify what to expect in the data

2. **Detail Processing Steps**
   - Be specific about transformations
   - Clarify calculation methods
   - Explain analysis approaches

3. **Define Clear Expectations**
   - Specify exact output format
   - Define completeness criteria
   - Mention all required sections

### RISE-IX Tips

1. **Write Clear Instructions**
   - Be specific about what to create
   - Include all requirements upfront
   - Mention any constraints or guidelines

2. **Provide Quality Examples**
   - Choose examples that clearly show desired output
   - Include 2-3 examples when possible
   - Highlight what makes examples good

3. **Align Steps with Instructions**
   - Ensure steps support the main directive
   - Make workflow logical and complete
   - Include creative process steps

---

## Quick Reference

### RISE-IE (Input-Expectation)

| Component | Focus | Key Question |
|-----------|-------|--------------|
| Role | Expertise | "What perspective is needed?" |
| Input | Source Data | "What am I working with?" |
| Steps | Processing | "How do I transform it?" |
| Expectation | Output | "What should I produce?" |

### RISE-IX (Instructions-Examples)

| Component | Focus | Key Question |
|-----------|-------|--------------|
| Role | Persona | "Who should I be?" |
| Instructions | Directive | "What should I create?" |
| Steps | Methodology | "How should I approach it?" |
| Examples | References | "What does good look like?" |

---

## Summary

RISE framework exists in two well-documented variants:

**RISE-IE (Input-Expectation)**: Best for data processing, analysis, and transformation tasks where you have specific input to work with.

**RISE-IX (Instructions-Examples)**: Best for content creation, writing, and tasks where examples help clarify desired output style.

Both variants are legitimate and effective. Choose based on whether your task is more analytical/data-focused (IE) or creative/instruction-focused (IX).

When in doubt, ask: **"Am I processing data or creating content?"**
- Processing data → **RISE-IE**
- Creating content → **RISE-IX**
