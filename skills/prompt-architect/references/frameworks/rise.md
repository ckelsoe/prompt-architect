# RISE Framework - Dual Variant Support

## Overview

RISE is a streamlined 4-component framework for structuring prompts around a role, the material to work from, a process, and a target output. This skill supports two variants, described below. Both emit as a flat block of prose with their section headers stripped, so each slot must read on its own once its label is gone: the role and the process survive as sentences and an ordered list, while the material each variant works from lives inside a named slot — the pasted input for RISE-IE, the pasted reference samples for RISE-IX — rather than under a header that will be deleted.

**Origin:** Community convention with no identifiable originator and no academic basis. The dominant documented expansion is **Role, Input, Steps, Expectation** — Fabio Vivas (fvivas.com); Juuzt.ai; Damien Griffin, "AI Quick Tips 111: Prompt Framework — R.I.S.E." (Thoughts Brewing, 17 December 2024). RISE's first appearance and original author could not be established. Not research-backed. Distinct from **RISEN** (Role, Instructions, Steps, End goal, Narrowing), which is a separate framework.

---

## Naming note — read before using this file

**"RISE-IE" and "RISE-IX" are this skill's internal shorthand.** They are not established terminology, and no external source uses either term. Do not present them to users as standard vocabulary — say "the Input-Expectation form of RISE" instead.

Verified published expansions of RISE:

| Expansion | Sources | Status |
|---|---|---|
| Role, **Input**, Steps, **Expectation** | fvivas.com; juuzt.ai; thoughtsbrewing.com; promptfoundry.me | **Dominant form** — 4+ independent sources |
| Role, **Instructions**, Steps, **Expectations** | promptwizz.com | Minority variant |
| Role, **Instruction**, **Specifics**, **Examples** | aipromptsx.com | Minority variant — note S = Specifics, not Steps |
| Role, Instructions, Steps, **Examples** | *none found* | **Unverified** — the pattern this file calls "RISE-IX" |

**RISE-IX is this skill's own composition, not a documented variant.** It remains a sound prompt pattern — role + directive + method + worked examples is good practice — but it is presented here as our construction, not as an established framework.

*Correction:* an earlier version of this file described both variants as "well-documented in authoritative sources." That was incorrect for RISE-IX. Of its three previously-cited sources: AiPromptsX defines S as "Specifics" rather than "Steps"; The Prompt Warrior documents RISEN and contains no RISE framework at all; and Thoughts Brewing documents the Input-Expectation form, making it a RISE-IE source. None supports Role/Instructions/Steps/Examples.

---

## The Two RISE Variants

### RISE-IE: Input-Expectation (Data-Focused)
**Components**: Role, **Input**, Steps, **Expectation**

**Best for**: Data analysis, transformations, processing tasks

**Provenance**: The documented community form. Sources: Fabio Vivas (fvivas.com); Juuzt.ai; Damien Griffin / Thoughts Brewing (17 December 2024).

### RISE-IX: Instructions-Examples (Instruction-Focused)
**Components**: Role, **Instructions**, Steps, **Examples**

**Best for**: Content creation, learning tasks, example-based work

**Provenance**: This skill's own composition — no external source documents this exact expansion. The nearest published forms are Role/Instructions/Steps/**Expectations** (promptwizz.com) and Role/Instruction/**Specifics**/Examples (aipromptsx.com). Use as a house pattern; do not cite it as an established framework.

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
**Purpose:** Define the perspective or expertise needed for the task, as a complete sentence. Nothing else in the emitted prompt establishes who is doing the work once the `ROLE` header is gone, so a bare noun phrase ("data analyst") leaves the perspective unstated.

**Questions to Ask:**
- What expertise is required?
- What viewpoint should be taken?
- What knowledge level is needed?

**Examples:**
- "Act as a data analyst experienced with sales exports."
- "You are a content editor who works with long-form drafts."
- "Take the perspective of a UX researcher who reads raw session logs."

#### I - Input
**Purpose:** Carry the actual data or content the task runs on. This is where RISE-IE's source material lives — the input is pasted directly into this slot, then a short prose line ("About the material above: …") describes its format and quirks and ties it to the steps that follow. Because the material sits inside the slot rather than under a deletable header, name it in the paste line ("the customer review export (CSV)"), never as a generic "content".

**Questions to Ask:**
- What data/content is being provided?
- What format is it in?
- Are there any input constraints?
- What should Claude expect to receive?

**Examples:**
- "About the material above: a CSV export of 50 rows of sales data, one order per row, with a header line."
- "About the material above: a collection of user feedback emails, some with mixed English and Spanish."
- "About the material above: JSON API responses, occasionally with null fields where a value is missing."

#### S - Steps
**Purpose:** Define how to process the input, as an ordered list of actions. The numbered sequence reads as a procedure on its own, so it does not need the `STEPS` header to signal what it is, but each step should name what it operates on ("the reviews above") so the reference survives.

**Questions to Ask:**
- How should the input be processed?
- What transformations are needed?
- What's the processing sequence?
- What analysis should be performed?

**Examples:**
- "1. Parse the CSV above, 2. Calculate per-region totals, 3. Identify month-over-month trends..."
- "Extract key themes from the emails above, categorize each by sentiment, count occurrences..."

#### E - Expectation
**Purpose:** Define what the output should look like — the deliverable and its shape. Phrase it as a standing description ("Produce a summary table that…") so it reads as the target output once the `EXPECTATION` header is removed rather than dangling as a loose noun phrase.

**Questions to Ask:**
- What format should output take?
- What should be included?
- How detailed should it be?
- What's the deliverable?

**Examples:**
- "Produce a summary table listing the top 10 items by revenue..."
- "Return a JSON object with the categorized results..."
- "Deliver a report with the key findings and one chart per region..."

### RISE-IE Template

Section headers are stripped at emission, so every slot's meaning is carried by the prose around and inside it rather than by the header above it. The `INPUT` slot is where RISE-IE's source material goes — the data is pasted directly into it, and the `About the material above:` line ties that pasted data to the description and the steps below. Because RISE-IE is the data-processing variant, there is no from-scratch form: without input to work on, the framework has nothing to do, so the input slot is never deleted.

```
ROLE:
[Define the perspective or expertise needed for this task]

INPUT:
[Paste the data or content to be processed here — name it specifically in this line, e.g.
"Paste the customer review export (CSV) here". Paste the material itself, not a description of it.]

About the material above:
[Specify what data/content is being provided:
- Format and structure (CSV, JSON, text, etc.)
- Key characteristics and fields
- Any quirks or special considerations
- What to expect in the data]

STEPS:
1. [How to process the input - first action]
2. [Processing step 2 - transformation or analysis]
3. [Processing step 3 - continue with methodology]
4. [Add more processing/analysis steps as needed...]

EXPECTATION:
[Define what the output should look like:
- Format and structure
- Required elements and sections
- Level of detail needed
- Length or size constraints
- Specific deliverables]
```

### RISE-IE Complete Example

The example below is shown in emitted form: the material is pasted into the input slot,
and every later slot references "the reviews above" so nothing is lost when the headers
are deleted.

**Before RISE-IE:**
"Analyze these customer reviews."

**After RISE-IE:**
```
ROLE:
You are a customer insights analyst with expertise in sentiment analysis and theme extraction.

INPUT:
[Paste the 50 customer reviews exported from the mobile app here]

About the material above:
50 customer reviews from our mobile app. Each review contains a star rating (1-5), the
written feedback, the date of the review, and the user segment (free or premium).

STEPS:
1. Categorize the reviews above by sentiment (positive, neutral, negative)
2. Extract the common themes and topics they mention
3. Identify feature requests vs. complaints vs. praise
4. Segment the findings by user type (free vs. premium)
5. Highlight urgent issues mentioned by multiple reviewers
6. Note any patterns in timing or trends

EXPECTATION:
Produce a structured analysis containing:
- A summary table showing the sentiment distribution
- The top 5 themes with frequency counts
- A list of feature requests ranked by number of mentions
- The critical issues requiring immediate attention
- A comparison of free vs. premium user feedback
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
**Purpose:** Define who the AI should embody (persona or expertise), as a complete sentence. Once the `ROLE` header is stripped nothing else names the persona, so a bare noun phrase leaves the emitted prompt without one.

**Questions to Ask:**
- What persona is most appropriate?
- What expertise level is needed?
- What perspective should be taken?

**Examples:**
- "You are a senior content strategist..."
- "Act as a creative copywriter..."
- "Take on the role of a technical writer..."

#### I - Instructions
**Purpose:** Specify the main task or directive, as a complete imperative sentence. This is the only slot that states what to produce, so it must carry the instruction on its own once the `INSTRUCTIONS` header is gone.

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
**Purpose:** Outline the process or methodology to follow, as an ordered list. The numbered sequence reads as a workflow on its own and does not depend on the `STEPS` header to signal what it is.

**Questions to Ask:**
- What's the sequence of actions?
- How should the task be approached?
- What's the workflow?
- What methodology should be used?

**Examples:**
- "1. Research trends, 2. Identify pain points, 3. Structure content, 4. Add CTAs"
- "Start with hook, develop key points, conclude with action items"

#### E - Examples
**Purpose:** Carry the actual reference samples the output should match. This is where RISE-IX's material lives — the samples themselves are pasted into this slot, not descriptions of them, and they are what the framework works from in place of a source-material block. Because they land here, RISE-IX needs no separate material slot: each pasted sample should be the real piece whose style and format the output should emulate, introduced by a line ("Match the style of the samples below:") so the samples read as models once the `EXAMPLES` header is gone.

**Questions to Ask:**
- What does good output look like?
- Can you provide reference examples?
- What style should be emulated?
- What format should be followed?

**Examples:**
- "Match the style of the two product descriptions pasted below."
- "Follow the structure of the onboarding email pasted below."
- "Produce copy in the voice of the sample post pasted below."

### RISE-IX Template

Section headers are stripped at emission, so every slot's meaning is carried by the prose around and inside it rather than by the header above it. RISE-IX has no source-material block: the reference samples are its material, and they are pasted into the `EXAMPLES` slot as the actual pieces to match. The role and instructions must be complete sentences, and the samples must be reproduced in full rather than described.

```
ROLE:
[Define who the AI should embody - persona or expertise level]

INSTRUCTIONS:
[Specify the main task or directive:
- What to create or accomplish
- Core requirements
- Key guidelines to follow
- Specific constraints or considerations]

STEPS:
1. [Approach or methodology step 1]
2. [Step 2 - how to execute the task]
3. [Step 3 - continue with workflow]
4. [Add more steps as needed for the creative/instruction process...]

EXAMPLES:
[Provide positive examples showing desired output:
- Reference materials that demonstrate the style
- Format examples to emulate
- Successful outputs from similar tasks
- 2-3 concrete examples recommended]

Example 1: [Paste the first reference sample here — the actual piece whose style and format the output should match, not a description of it]

Example 2: [Paste a second reference sample here]

Example 3: [Optional — paste a third reference sample here if more clarity is needed. If you only have two, delete this line and the blank line above it.]
```

### RISE-IX Complete Example

The example below is shown in emitted form: the instructions read as a standing directive,
and the reference samples are pasted in full into the examples slot as the models the
output must match. RISE-IX has no source-material block to delete — its samples are what
it works from, so the examples slot is always present.

**Before RISE-IX:**
"Write product descriptions for our sustainable clothing line."

**After RISE-IX:**
```
ROLE:
You are a senior copywriter specializing in sustainable fashion and eco-conscious brands.

INSTRUCTIONS:
Write compelling product descriptions for our new sustainable clothing line that
highlight eco-friendly materials and production methods, appeal to environmentally
conscious millennials, emphasize both style and sustainability, include specific product
details and benefits, and drive purchase intent through an emotional connection.

STEPS:
1. Start with an attention-grabbing opening about the product's unique appeal
2. Describe the sustainable materials and ethical production process
3. Highlight the product's style, fit, and versatility
4. Include specific technical details (materials, care, sizing)
5. End with a call-to-action emphasizing the impact of the purchase

EXAMPLES:
Match the style, tone, and structure of the two reference descriptions below.

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

This file documents two RISE patterns:

**RISE-IE (Input-Expectation)**: The documented community form of RISE. Best for data processing, analysis, and transformation tasks where you have specific input to work with.

**RISE-IX (Instructions-Examples)**: This skill's own variant, not an externally documented form. Best for content creation, writing, and tasks where examples help clarify desired output style.

Both are practically effective. Only RISE-IE has external documentation — say so if a user asks where these come from. Choose based on whether your task is more analytical/data-focused (IE) or creative/instruction-focused (IX).

When in doubt, ask: **"Am I processing data or creating content?"**
- Processing data → **RISE-IE**
- Creating content → **RISE-IX**
