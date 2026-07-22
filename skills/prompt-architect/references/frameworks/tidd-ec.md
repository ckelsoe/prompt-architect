# TIDD-EC Framework

## Overview

TIDD-EC is a precision-focused prompt template that provides clear boundaries and actionable guidance through explicit "Dos and Don'ts." It emphasizes clarity and specificity in task execution, making it useful for tasks requiring detailed instructions and explicit constraints.

**Origin:** Community convention, no verified originator. The earliest traceable appearance is "Mastering Prompt Engineering: A Guide to the CO-STAR and TIDD-EC Frameworks," published 5 February 2024 on Medium by the corporate account **Vivas.AI** (Vuram Technology Solutions Pvt. Ltd., Chennai). That post names no individual author and cites no source, introducing the framework only as "another framework emerges on the horizon." No earlier source, named originator, or published evaluation of TIDD-EC could be found. Not research-backed.

**Key Strength**: Explicit positive (Do) and negative (Don't) guidance prevents errors and misinterpretations.

## Components

### T - Task Type
**Purpose:** Clearly indicate the type of activity the LLM should perform.

**Questions to Ask:**
- What kind of task is this? (analysis, generation, transformation, etc.)
- What is the primary output type?
- What category does this fall into?

**Examples:**
- "Task Type: Data Analysis and Summarization"
- "Task Type: Technical Documentation Generation"
- "Task Type: Customer Support Response"
- "Task Type: Content Translation with Context Preservation"

### I - Instructions
**Purpose:** Outline the specific steps or guidelines to accomplish the task.

**Questions to Ask:**
- What are the exact steps to follow?
- What methodology should be used?
- What's the sequence of actions?
- What standards or guidelines apply?

**Examples:**
- "Read the customer feedback, categorize by sentiment, identify top 3 themes, provide quantitative summary"
- "Follow the company style guide for technical documentation"
- "Use a three-paragraph structure: problem, solution, next steps"

### D - Do
**Purpose:** Specify actions the LLM should take, language to use, structures to include, and information that must be present.

**Questions to Ask:**
- What MUST be included in the response?
- What language or terminology should be used?
- What structure should be followed?
- What tone or style is required?

**Examples:**
- "DO use professional, empathetic language"
- "DO include specific metrics and data points"
- "DO cite sources for all factual claims"
- "DO start with an executive summary"
- "DO use bullet points for lists over 3 items"

### D - Don't
**Purpose:** Highlight actions or elements to avoid, preventing common errors or misinterpretations.

**Questions to Ask:**
- What should absolutely NOT be included?
- What mistakes should be avoided?
- What language or approaches are inappropriate?
- What common errors need prevention?

**Examples:**
- "DON'T use technical jargon without explanation"
- "DON'T make assumptions about user expertise"
- "DON'T include information older than 6 months"
- "DON'T exceed 500 words"
- "DON'T use passive voice"

### E - Examples
**Purpose:** Provide concrete examples of desired outcomes or responses.

**Questions to Ask:**
- What does good output look like?
- Can you show 2-3 reference examples?
- What format should be followed?
- What quality level is expected?

**Examples:**
- "Example of good response: [detailed example]"
- "See attached sample reports for formatting"
- "Similar to our previous Q3 analysis format"

### C - Context (User Content)
**Purpose:** Provide data or background information for the LLM to reference.

**Questions to Ask:**
- What background information is needed?
- What data is being provided?
- What context affects the task?
- What constraints exist in the situation?

**Examples:**
- "Context: This is for a B2B SaaS company in healthcare sector"
- "User Content: Attached customer feedback CSV with 500 entries"
- "Background: Previous campaign had 15% conversion rate"

## Template Structure

Section headers are stripped at emission, so every slot's meaning is carried by the prose
around and inside it rather than by the header above it. This matters most for the Don't
list: the negation must live in each bullet itself. A bare noun phrase under a `DON'T:`
header reads as an instruction to DO the very thing being forbidden once the header is
gone. Do not reintroduce header-only structure.

```
SOURCE MATERIAL:
[Optional — paste the artifact this task operates on here, naming it concretely, e.g. "Paste
the customer's message here" or "Paste the draft to translate here". If this task generates
from scratch, delete this bracketed block along with the sentence directly below it.]
Use the material above as the content for the work described below.

TASK TYPE:
The category of task you are performing is: [name the activity category only — e.g. "Customer
Support Response", "Data Analysis and Summarization", "Content Translation with Context
Preservation". Specifics of this particular case belong in the background at the end.]

INSTRUCTIONS:
Carry out the task as follows.
1. [First step, as a complete imperative sentence beginning with a verb — e.g. "Read the
customer's message and identify the specific problem they report."]
2. [Continue in the same form, one step per line, for as many steps as the methodology needs.
If standing guidelines govern this task rather than an ordered procedure, delete the numbered
list and keep only the standards below.]

Observe these standards throughout:
[Optional — one per line, each a complete imperative sentence, e.g. "Follow the company style
guide.", "Use a three-paragraph structure: problem, solution, next steps." If the numbered
steps are the whole methodology, delete this bracketed block along with the sentence above it.]

DO:
The output must satisfy every requirement below:
- [Always <required action, element, or information>]
- [Use <required language, tone, or terminology>]
- [Follow <required structure or format>]
- [Add more as needed, each led by "Always" or an imperative verb so it reads as a
requirement on its own line.]

DON'T:
The output must respect every prohibition below:
- [Do not <error or mistake to prevent>]
- [Never <inappropriate language or approach>]
- [Do not <common pitfall to prevent>]
- [Do not <exceed a stated limit or cross a boundary>]
- [Add more as needed, each led by "Do not" or "Never". The negation must live in the item
itself — a bare noun phrase reads as an instruction to DO the very thing being forbidden.]

EXAMPLES:
[Optional — if no reference sample is needed, delete everything from this line through the
counter-example below.]
The examples below set the standard your output must meet. Match their format, tone,
structure, and level of detail.

Example 1 — produce output like this:
[Write the desired output in full — the actual text, not a description of it. If the user
supplied an approved sample or boilerplate, reproduce it here.]

Example 2 — also produce output like this:
[Optional — a second full example at the same quality bar. If one is enough, delete this
bracketed block along with the label line above it.]

Counter-example — do NOT produce output like this:
[Optional — a full counter-example of the failure mode, opening with a sentence naming it
unacceptable, e.g. "The following response would be unacceptable because it deflects blame:",
so the warning survives without its label. If not useful, delete this bracketed block along
with the label line above it.]

CONTEXT:
The background below describes the situation this task takes place in.
- [Optional — state each supplied background fact, constraint, situational factor, or
applicable standard as a complete sentence, one per line. Include only what the user supplied;
never invent one — if a needed fact is missing, leave a visible [you fill this in: <what is
needed>] placeholder instead of a guess. If the task needs no background, delete this
bracketed block along with the sentence above it.]
```

## Complete Example

### Before TIDD-EC:
"Help with customer complaint response."

### After TIDD-EC:
```
SOURCE MATERIAL:
"I ordered the ceramic serving set for my daughter's engagement party this Saturday
and it turned up in pieces. The box looked fine from the outside. I've been buying
from you for two years and this is the first time anything like this has happened,
but the timing could not be worse."
Use the material above as the content for the work described below.

TASK TYPE:
The category of task you are performing is: Customer Support Response.

INSTRUCTIONS:
Carry out the task as follows.
1. Acknowledge the customer's frustration and validate their concern.
2. Apologize for the inconvenience caused.
3. Explain what happened, in simple terms, if the cause is known.
4. Provide a concrete solution and the next steps you are taking.
5. State a specific timeline for resolution.
6. Offer a direct contact route for further support.

DO:
The output must satisfy every requirement below:
- Always use empathetic, professional language.
- Always address the customer by name.
- Always give specific action items with timeframes attached.
- Always include direct contact information for follow-up.
- Always express genuine concern for their experience.
- Keep the response between 150 and 250 words.

DON'T:
The output must respect every prohibition below:
- Do not make excuses or deflect blame onto the customer, a carrier, or a system.
- Never use template language that sounds robotic.
- Do not promise anything you cannot guarantee.
- Do not include technical jargon or internal system error codes.
- Never use passive voice to describe the failure (for example, "mistakes were made").
- Do not exceed 250 words, and do not write fewer than 150.

EXAMPLES:
The examples below set the standard your output must meet. Match their format, tone,
structure, and level of detail.

Example 1 — produce output like this:
"Dear Sarah, I'm truly sorry that your order arrived damaged. I understand how
frustrating this must be, especially since you needed it for this weekend's event.
This happened because of a packaging error in our warehouse. Here's what I'm doing
to fix this: (1) I'm sending a replacement via overnight shipping at no charge -
you'll have it by Friday 2 PM, (2) You'll receive a full refund for the original
order within 24 hours. If you have any concerns, please reach me directly at
sarah.smith@company.com or 555-1234. We value your business and will make this right."

Counter-example — do NOT produce output like this:
The following response would be unacceptable because it hides behind passive voice,
blames a system rather than taking responsibility, offers no remedy or timeline, and
redirects the customer to a ticket number instead of a person:
"We apologize for any inconvenience. Due to system errors, your order was damaged.
Please contact our support team for further assistance. Ticket #12345."

CONTEXT:
The background below describes the situation this task takes place in.
- The company is an e-commerce retailer specializing in home goods.
- The customer is a premium member who shops regularly.
- The customer received a damaged item that they needed for an event.
- Previous interactions have been generally positive, at a 4.5/5 satisfaction rating.
- Company policy allows a full refund plus a replacement for damaged items.
```

## Best Use Cases

### 1. Customer Support & Chatbots ✅
**Why TIDD-EC Excels:**
- Explicit dos/don'ts prevent common customer service mistakes
- Examples ensure consistent tone and quality
- Clear boundaries improve response accuracy

**Example Scenarios:**
- Complaint resolution
- Product inquiries
- Refund requests
- Technical support responses

### 2. Data Analysis & Reporting ✅
**Why TIDD-EC Excels:**
- Structured approach ensures completeness
- Dos/don'ts prevent analytical errors
- Examples standardize report format

**Example Scenarios:**
- Market research summaries
- Social media analysis
- Competitive intelligence reports
- Survey data interpretation

### 3. Technical Documentation ✅
**Why TIDD-EC Excels:**
- Clear instructions ensure consistency
- Don'ts prevent common documentation errors
- Examples show proper format and depth

**Example Scenarios:**
- API documentation
- User guides
- Installation instructions
- Troubleshooting guides

### 4. Content Translation ✅
**Why TIDD-EC Excels:**
- Dos specify required preservation (tone, meaning)
- Don'ts prevent cultural missteps
- Context ensures appropriate localization

**Example Scenarios:**
- Technical content translation
- Marketing material localization
- Legal document translation
- Product description adaptation

### 5. Constraint-Heavy Tasks ✅
**Why TIDD-EC Excels:**
- Explicit boundaries through dos/don'ts
- Prevents scope creep
- Ensures compliance with requirements

**Example Scenarios:**
- Regulatory compliance content
- Legal document generation
- Medical/healthcare content
- Financial reporting

## Selection Criteria

### Choose TIDD-EC when:
- ✅ Task requires very clear boundaries
- ✅ Need to explicitly state what NOT to do
- ✅ Common errors need prevention
- ✅ Quality consistency is critical
- ✅ Working with constrained domains (legal, medical, technical)
- ✅ Explicit examples significantly improve output
- ✅ Precision and accuracy matter more than creativity

### Avoid TIDD-EC when:
- ❌ Task is simple and straightforward (use RTF)
- ❌ Creative freedom is more important than constraints
- ❌ Open-ended exploration is the goal
- ❌ Dos/don'ts would limit beneficial creativity
- ❌ Task doesn't have clear right/wrong approaches

## TIDD-EC vs. Other Frameworks

### TIDD-EC vs. CO-STAR

| Aspect | TIDD-EC | CO-STAR |
|--------|---------|---------|
| **Focus** | Precision & boundaries | Communication & audience |
| **Unique Strength** | Explicit dos/don'ts | Tone & audience targeting |
| **Best For** | Constrained tasks | Content creation |
| **Creativity** | More constrained | More flexible |
| **Error Prevention** | Explicit | Implicit |

**Use TIDD-EC for**: Technical tasks, customer support, data analysis
**Use CO-STAR for**: Marketing content, blog posts, creative writing

### TIDD-EC vs. RISEN

| Aspect | TIDD-EC | RISEN |
|--------|---------|-------|
| **Focus** | Explicit guidance | Process & methodology |
| **Constraints** | Dos/Don'ts | Narrowing |
| **Examples** | Required component | Not required |
| **Best For** | High-precision tasks | Multi-step processes |

**Use TIDD-EC for**: Tasks requiring explicit positive/negative guidance
**Use RISEN for**: Complex workflows with sequential steps

### TIDD-EC vs. RISE-IE

| Aspect | TIDD-EC | RISE-IE |
|--------|---------|---------|
| **Focus** | Precision guidance | Data transformation |
| **Input Spec** | Context component | Input component |
| **Constraints** | Dos/Don'ts | Expectations |
| **Best For** | Constrained tasks | Analytical tasks |

**Use TIDD-EC for**: When explicit dos/don'ts add value
**Use RISE-IE for**: Standard data processing without heavy constraints

## Common Mistakes

### 1. Vague Dos/Don'ts
**Bad**:
- DO: "Be professional"
- DON'T: "Make errors"

**Good**:
- DO: "Use formal language, address customer by name, include specific metrics"
- DON'T: "Do not use contractions, do not include unverified information, and do not exceed 300 words"

### 2. Contradictory Instructions
**Bad**:
```
DO: Be comprehensive and thorough
DON'T: Exceed 100 words
```

**Good**:
```
DO: Include top 3 key points with supporting data
DON'T: Do not include tangential information, and do not exceed 150 words
```

### 3. Missing Context
**Bad**:
```
CONTEXT: Customer complaint
```

**Good**:
```
CONTEXT:
- Customer: Premium subscriber, 2 years
- Issue: Billing error, overcharged $50
- Previous contact: Positive interactions
- Company policy: Full refund + 10% credit for errors
```

### 4. Generic Examples
**Bad**:
```
EXAMPLES: Write a good response
```

**Good**:
```
EXAMPLES:
"Dear John, I've reviewed your account and I see exactly what happened. Due to
a system error, you were charged twice for your March subscription. I've immediately
processed a $50 refund to your original payment method (arrives in 3-5 business days)
and added a $5 account credit as an apology. This won't happen again - we've fixed
the system issue. Please let me know if you have any questions. - Sarah"
```

## Tips for Effective Use

### 1. Make Dos/Don'ts Specific
- Instead of "use good grammar" → "avoid sentence fragments, use active voice, check spelling"
- Instead of "be clear" → "define technical terms, use numbered lists, include headers"

### 2. Provide Concrete Examples
- Show both good and bad examples when helpful
- Include real or realistic examples, not abstract descriptions
- Match examples to the exact task type

### 3. Balance Constraints
- Enough guidance to prevent errors
- Not so many restrictions that creativity is stifled
- Focus dos/don'ts on high-impact areas

### 4. Use Context Effectively
- Include relevant background that affects the task
- Provide data or information the LLM needs to reference
- Mention constraints from the business/domain context

## Variations and Combinations

### TIDD-EC + Chain of Thought
For analytical tasks requiring both precision and reasoning:
```
[Standard TIDD-EC structure]

ADDITIONAL INSTRUCTION:
Show your reasoning step-by-step before providing the final answer.
```

### TIDD-EC Light (TIDD)
For simpler tasks that don't need all components:
```
TASK TYPE: [task]
INSTRUCTIONS: [steps]
DO: [requirements, each led by "Always" or an imperative verb]
DON'T: [restrictions, each led by "Do not" or "Never" so the negation survives header stripping]
```
(Omit Examples and Context if not needed)

### TIDD-EC + Style Guide
For content requiring adherence to brand standards:
```
[Standard TIDD-EC structure]

STYLE GUIDE:
- Tone: [specific tone]
- Voice: [first person / third person / etc.]
- Terminology: [approved terms list]
```

## Quick Reference

| Component | Focus | Key Question |
|-----------|-------|--------------|
| **T**ask Type | Category | "What kind of task is this?" |
| **I**nstructions | Steps | "What are the exact steps?" |
| **D**o | Requirements | "What MUST be included?" |
| **D**on't | Restrictions | "What must be AVOIDED?" |
| **E**xamples | Samples | "What does good look like?" |
| **C**ontext | Background | "What information is relevant?" |

## Assessment Checklist

When applying TIDD-EC, verify:
- [ ] Task type clearly defines the activity category
- [ ] Instructions are specific and sequential
- [ ] Dos specify concrete actions and requirements
- [ ] Don'ts prevent specific errors or approaches
- [ ] Dos and don'ts don't contradict each other
- [ ] Examples are concrete and realistic
- [ ] Examples match the task type and requirements
- [ ] Context provides necessary background
- [ ] Context includes relevant constraints
- [ ] All components work together coherently

## Provenance

TIDD-EC has no verified originator and no academic basis. The full traceable source set is three items, honestly assessed:

1. **Vivas.AI, "Mastering Prompt Engineering: A Guide to the CO-STAR and TIDD-EC Frameworks"** — Medium, 5 February 2024
   - [https://vivasai01.medium.com/mastering-prompt-engineering-a-guide-to-the-co-star-and-tidd-ec-frameworks-3334588cb908](https://vivasai01.medium.com/mastering-prompt-engineering-a-guide-to-the-co-star-and-tidd-ec-frameworks-3334588cb908)
   - *This is the origin, not corroboration of it.* Corporate account, no individual byline, no citations. Every later mention traces back here.

2. **GPT Teams, same title**
   - [https://gptteams.ai/articles/mastering-prompt-engineering-a-guide-to-the-co-star-and-tidd-ec-frameworks](https://gptteams.ai/articles/mastering-prompt-engineering-a-guide-to-the-co-star-and-tidd-ec-frameworks)
   - *Not independent.* Same title and content as (1), carrying a Vivas.AI-affiliated byline and pointing readers back to vivas.ai. A same-organization republication; it adds no evidentiary weight.

3. **Hélène Sauvé, "In conversation with AI — when Prompt Engineering meets Linguistics"** — Scott Logic, 12 July 2024
   - [https://blog.scottlogic.com/2024/07/12/when-prompt-engineering-meets-linguistics.html](https://blog.scottlogic.com/2024/07/12/when-prompt-engineering-meets-linguistics.html)
   - *Passing mention only.* TIDD-EC appears in a single clause, and is expanded there **without the E and C**. Evidence the acronym circulated; not evidence of origin or efficacy.

**These are not "authoritative sources."** They are one origin post, one republication of it, and one one-line mention. The template below remains practically useful — explicit Do/Don't constraints are a sound prompting tactic independent of this acronym — but the acronym itself carries no authority.

**Correction:** an earlier version of this file said TIDD-EC was "originally documented alongside CO-STAR." That was misleading. CO-STAR is separately attributable to **GovTech Singapore's Data Science & AI team** (popularized by Sheila Teo). Teo's article does not mention TIDD-EC, and no GovTech or Teo source connects the two. The only link is that one Medium post happened to describe both frameworks in the same article — which is not shared provenance.

**Naming caution:** "Vivas.AI" above (a Chennai company) is unrelated to "Fabio Vivas" (fvivas.com), cited in `rise.md`. Do not merge them.

**Confusable:** exabytes.my documents **TID-EC** = Task, Input, Desired Output, Example, Context. Different acronym, different framework.

## Key Takeaways

1. ✅ TIDD-EC excels in high-precision tasks requiring clear boundaries
2. ✅ The explicit "Dos and Don'ts" structure prevents common errors
3. ✅ Ideal for customer support, data analysis, technical documentation
4. ✅ Examples component ensures quality consistency
5. ✅ More constrained than CO-STAR, more explicit than RISEN
6. ✅ Best when accuracy and compliance matter more than creativity
7. ⚠️ Can be overkill for simple tasks or creative work

## Summary

TIDD-EC is a precision-focused framework that shines in scenarios requiring:
- **Explicit boundaries** (dos and don'ts)
- **Error prevention** (common mistakes explicitly avoided)
- **Quality consistency** (examples set standards)
- **Clear task definition** (task type categorization)
- **Complete context** (background information provided)

Use TIDD-EC when the cost of errors is high, precision matters more than creativity, and you can clearly articulate both what should and shouldn't be done.
