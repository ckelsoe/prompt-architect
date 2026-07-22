# CO-STAR Framework

## Overview

CO-STAR is a comprehensive prompting framework that emphasizes context, audience, and communication style. It's particularly effective for content creation, writing tasks, and scenarios where tone and audience considerations significantly impact output quality. Section headers are stripped at emission, so a CO-STAR prompt lands as a flat block of prose — a paragraph of context, a stated objective, and self-standing sentences for style, tone, audience, and response format — preceded by an optional source-material block whenever the content is built from an artifact the user already has. Because the `STYLE`, `TONE`, and `AUDIENCE` labels do not survive, those slots have to be written as complete sentences rather than the bare descriptors ("professional yet friendly," "senior executives") they would otherwise collapse to.

**Origin:** Developed by the Data Science & AI team at GovTech (Government Technology Agency of Singapore), and popularized by Sheila Teo, who won GovTech's "Prompt Royale" — Singapore's first GPT-4 prompt engineering competition, 400+ participants, finale 8 November 2023. Teo credits the framework to GovTech rather than to herself: "The CO-STAR framework, a brainchild of GovTech Singapore's Data Science & AI team, is a handy template for structuring prompts." Practitioner framework — no controlled evaluation of CO-STAR has been published.

## Components

### C - Context
**Purpose:** Provide background information, situational details, and constraints. It fills as a self-contained paragraph and survives header stripping on its own, so long as it reads as description of a situation rather than a bare label.

**Questions to Ask:**
- What's the background situation?
- What constraints exist?
- What's happened previously?
- What environment/platform is this for?
- Are there any limitations or restrictions?

**Examples:**
- "You're working with a startup that has limited resources."
- "This is for a formal government report."
- "The user base is primarily non-technical."

### O - Objective
**Purpose:** Define the clear, specific goal to be achieved, as one complete imperative sentence. Nothing else in the prompt states the task, so once the `OBJECTIVE` header is gone a bare goal fragment leaves the emitted prompt without an instruction.

**Questions to Ask:**
- What exactly do you want accomplished?
- What does success look like?
- What's the primary outcome?
- Are there secondary goals?

**Examples:**
- "Create a comprehensive product comparison of the three tools above."
- "Generate ideas for reducing customer churn."
- "Explain the concept in simple terms."

### S - Style
**Purpose:** Specify the writing style, format, and structural preferences. Phrase it as an instruction ("Write in…", "Follow…"), not a bare descriptor, because the `STYLE` header is stripped and a fragment like "journalistic, short paragraphs" no longer reads as a directive on its own.

**Questions to Ask:**
- What writing style is appropriate?
- Should it be formal or casual?
- Are there format requirements?
- Should it follow a specific structure?
- Any style guides to follow?

**Examples:**
- "Use a journalistic style with short paragraphs."
- "Follow AP style guidelines."
- "Write in a conversational, blog-post style."

### T - Tone
**Purpose:** Set the emotional quality and attitude of the response. Because the `TONE` header does not survive emission, write the slot as a complete sentence ("Keep the tone…", "Sound…") — a bare adjective phrase like "professional yet friendly" dangles once the label is deleted.

**Questions to Ask:**
- What emotional quality should it have?
- Should it be serious or light-hearted?
- Authoritative or humble?
- Urgent or measured?

**Examples:**
- "Keep the tone professional yet friendly."
- "Make it urgent and action-oriented."
- "Keep it empathetic and supportive."
- "Sound confident and authoritative."

### A - Audience
**Purpose:** Identify who will consume the output and their characteristics. Name the audience in a complete sentence ("The audience is…"), because the `AUDIENCE` header is stripped and a bare noun phrase like "senior executives" would otherwise sit in the flat block with nothing marking it as the reader.

**Questions to Ask:**
- Who is the target audience?
- What's their expertise level?
- What do they care about?
- What are their pain points?
- What's their context?

**Examples:**
- "The audience is senior executives with limited technical knowledge."
- "The audience is junior developers learning the framework."
- "The audience is parents of elementary school children."

### R - Response
**Purpose:** Define the expected output format and structure. Phrase it as an instruction about the output ("Provide…", "Format the result as…") so it still reads as a directive once the `RESPONSE FORMAT` header is removed.

**Questions to Ask:**
- What format should the output take?
- How long should it be?
- Should it include specific sections?
- Are there structural requirements?
- What level of detail is needed?

**Examples:**
- "Provide a 500-word article with 3 main sections."
- "Format the result as a bulleted list of 10 items."
- "Generate a table comparing features."

## Template Structure

Section headers are stripped at emission, so every slot's meaning is carried by the prose
around and inside it rather than by the header above it. Context is a self-contained
paragraph and survives on its own; Objective must be a complete imperative sentence; and
Style, Tone, Audience, and Response Format each have to be phrased as a full sentence,
because the labels that would otherwise mark them as style, tone, audience, or format are
the first thing deleted.

```
SOURCE MATERIAL:
[OPTIONAL — include only if the content is built from material the user already has.
If so, emit a literal paste instruction naming the specific artifact, e.g. "[Paste the Q3 revenue report here]"
or "[Paste the blog post whose voice should be matched here]" — never a generic word like "content" —
then one line of prose tying it to what follows, e.g. "Use the material above as the factual and stylistic
basis for what you produce; do not invent details it does not support."
If the content is written entirely from scratch, omit this section — do not emit an empty placeholder.]

CONTEXT:
[Provide background information, situation, and any relevant constraints. What's the setting? What's happened before? What limitations exist?]

OBJECTIVE:
[State the clear, specific goal you want to achieve. What exactly do you want accomplished? What does success look like?]

STYLE:
[Specify the writing style, format preferences, and structural approach. Should it follow a particular style guide? What format is needed?]

TONE:
[Define the emotional quality and attitude. Should it be professional, casual, urgent, friendly, authoritative, empathetic, etc.?]

AUDIENCE:
[Identify who will consume this output. What's their expertise level? What do they care about? What are their characteristics?]

RESPONSE FORMAT:
[Specify the expected output structure. How long? What sections? What level of detail? Any specific format requirements?]
```

`SOURCE MATERIAL` is a seventh block in a six-letter acronym, and it carries no letter
because it is optional. Much CO-STAR work rewrites, repurposes, or matches the voice of
something that already exists — a report to summarize, a press release to adapt, a post
whose style should be echoed — and that artifact is pasted here, named concretely (never
the generic word "content"), and referred to as "the … above" from inside the Objective.
Delete the block whenever the content is written entirely from scratch; do not leave an
empty placeholder.

## Complete Examples

Every example below is shown in emitted form: each slot carries its own role in prose.
Read the headers as scaffolding that will be deleted — the examples are written so that
nothing is lost when it is, which is why Style, Tone, Audience, and Response Format each
read as a complete sentence.

### Example 1: Health Blog Article

**Before CO-STAR:**
"Write about the benefits of exercise."

**After CO-STAR** (no source material — the article is written from scratch, so the
`SOURCE MATERIAL` block is omitted):
```
CONTEXT:
I'm creating content for a health blog aimed at busy professionals who struggle to find time for fitness. Previous articles have focused on nutrition, and this is part of a series on lifestyle improvements.

OBJECTIVE:
Write an engaging article that convinces time-pressed professionals that exercise is worth prioritizing, focusing on benefits beyond just physical health.

STYLE:
Use a conversational blog style with short paragraphs (2-3 sentences), subheadings every 150-200 words, and occasional bullet points for key takeaways. Include specific examples and avoid medical jargon.

TONE:
Keep the tone encouraging and motivating without being preachy. Acknowledge their time constraints and show empathy for their challenges, and stay practical and realistic rather than idealistic.

AUDIENCE:
The audience is professionals aged 30-50 who work 50+ hour weeks, have limited free time, may have families, and currently don't exercise regularly. They're skeptical of fitness advice that seems unrealistic for their lifestyle.

RESPONSE FORMAT:
Produce an 800-word article with an engaging headline, a brief 2-3 sentence introduction, 4-5 main sections with subheadings, bullet points highlighting key benefits, and a practical conclusion with next steps.
```

### Example 2: Executive Summary from a Report

**Before CO-STAR:**
"Summarize this report for the board."

**After CO-STAR** (source material supplied):
```
SOURCE MATERIAL:
[Paste the Q3 revenue report here]
Use the material above as the factual and stylistic basis for what you produce; do not invent details it does not support.

CONTEXT:
I'm the head of finance at a mid-size SaaS company, preparing a summary of our Q3 performance for the board's quarterly meeting. The full report above is 20 pages of financial detail, and the board sees dozens of documents per meeting.

OBJECTIVE:
Distill the Q3 revenue report above into a one-page summary the board can absorb in two minutes, surfacing the numbers and trends that bear on strategic decisions.

STYLE:
Write in a crisp executive-brief style: lead with the conclusion, use short declarative sentences, and support each claim with a figure drawn from the report above rather than a general statement.

TONE:
Keep the tone measured and factual — neither alarmist about the misses nor promotional about the wins.

AUDIENCE:
The audience is board members who are financially literate but not close to day-to-day operations; they care about growth, runway, and risk, not implementation detail.

RESPONSE FORMAT:
Produce a single page: three sentences of headline takeaways, then a short table of the key metrics with quarter-over-quarter change, then a four-item bulleted list of the decisions or risks that need the board's attention.
```

## Best Use Cases

1. **Content Creation**
   - Blog posts, articles, marketing copy
   - When multiple stakeholders will review
   - When brand voice matters

2. **Communication Tasks**
   - Emails to specific audiences
   - Presentations
   - Reports with specific readers

3. **Creative Writing**
   - When tone significantly impacts effectiveness
   - When audience understanding is critical
   - When style consistency matters

4. **Educational Content**
   - Teaching materials
   - Explanations for specific skill levels
   - Documentation for user groups

## Selection Criteria

**Choose CO-STAR when:**
- ✅ Task involves writing or content creation
- ✅ Multiple stakeholders or diverse audience
- ✅ Tone and style significantly impact success
- ✅ Rich contextual requirements exist
- ✅ Brand or voice consistency matters
- ✅ Audience characteristics are well-defined

**Avoid CO-STAR when:**
- ❌ Task is purely analytical/technical
- ❌ Audience doesn't matter
- ❌ Tone is irrelevant
- ❌ Simple, quick task without context needs
- ❌ Format is the only concern

## Common Mistakes

1. **Too Much Context**
   - Include only relevant background
   - Avoid tangential information
   - Focus on what impacts the task

2. **Vague Objective**
   - Be specific about desired outcome
   - Quantify when possible
   - Clarify success criteria

3. **Confusing Style and Tone**
   - Style = structural/format choices
   - Tone = emotional quality
   - Keep them separate

4. **Generic Audience Description**
   - Be specific about audience characteristics
   - Include their knowledge level
   - Mention their goals/pain points

## Variations and Combinations

### CO-STAR + Chain of Thought
Use for complex content that requires reasoning:
```
[Standard CO-STAR components]

PROCESS:
Think through this step-by-step:
1. Identify key themes
2. Organize supporting evidence
3. Structure argument flow
4. Draft with examples
```

### CO-STAR + RISEN
For content creation with specific methodology:
```
[Use CO-STAR for context/audience/tone]
[Use RISEN's Steps for the creation process]
[Use CO-STAR's Response for output format]
```

## Quick Reference

| Component | Focus | Key Question |
|-----------|-------|--------------|
| Context | Background | "What's the situation?" |
| Objective | Goal | "What do you want achieved?" |
| Style | Format/Structure | "How should it be written?" |
| Tone | Emotional Quality | "What feeling should it convey?" |
| Audience | Reader | "Who is this for?" |
| Response | Output | "What should the output look like?" |

## Assessment Checklist

When applying CO-STAR, verify:
- [ ] Context provides necessary background without excess
- [ ] Objective is specific and measurable
- [ ] Style guidance is clear and actionable
- [ ] Tone matches audience and objective
- [ ] Audience is well-defined with characteristics
- [ ] Response format is detailed and specific
- [ ] All components work together cohesively
- [ ] Nothing contradicts other components
