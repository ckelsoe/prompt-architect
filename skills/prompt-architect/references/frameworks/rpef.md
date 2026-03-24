# Reverse Prompt Engineering Framework (RPEF)

## Overview

Reverse Prompt Engineering (RPEF) inverts the normal prompt-to-output direction. Instead of writing a prompt to get a desired output, you provide an existing output (or input+output pair) and ask the model to reconstruct the reusable prompt template that would consistently produce it. This is the framework for learning from outputs you already like — recovering what made them work.

**Research basis:** Li & Klabjan, "Reverse Prompt Engineering" (arXiv 2411.06729, EMNLP 2025). Practitioner template formalized by inaiwetrust.com as RPEF.

## When to Use RPEF

- You have an output you love and want to reproduce it reliably
- You want to build a reusable template from a successful one-time result
- You want to understand why a prompt worked
- You're trying to approximate a system prompt from observed AI behavior
- You want to generalize from a specific example to a repeatable pattern

## Components

### Input Sample (optional but powerful)
**Purpose:** If the output was generated from specific input data, include it. The model uses the relationship between input and output to infer transformation rules and prompt logic.

### Output Sample (required)
**Purpose:** The existing output you want to reverse-engineer. This is the primary source of truth — what you want to be able to reproduce.

### Analysis Instruction
**Purpose:** Directs the model to analyze the output for its implicit prompt properties: tone, structure, reasoning style, constraints, format, level of detail, persona, and assumptions.

### Confidence Threshold (optional)
**Purpose:** Instructs the model to only generate the recovered prompt when confident enough. Default: 80-90%.

### Generalization Directive
**Purpose:** Specifies whether the recovered prompt should be a specific single-use template or a generalized meta-prompt with fill-in placeholders.

## Template Structure

```
You are an expert Prompt Engineer performing reverse prompt engineering.

TASK:
Analyze the following [input and] output. Reconstruct the prompt that would
consistently produce this type of output. Your recovered prompt should be
reusable — replace specific details with clearly marked [PLACEHOLDER] variables.

[INPUT DATA (if applicable):]
[Paste input here, or omit if output-only]

OUTPUT SAMPLE:
[Paste the output you want to reverse-engineer]

ANALYSIS INSTRUCTIONS:
Examine the output for:
- Implied role or persona (who generated this?)
- Tone and voice (formal, casual, technical, etc.)
- Structural patterns (how is it organized?)
- Level of detail and scope
- Any implicit constraints (what did it not do?)
- Format conventions (length, sections, bullet style, etc.)
- Reasoning style (step-by-step, direct, narrative?)

RECOVERED PROMPT:
Generate a reusable prompt template that would reliably reproduce this
type of output. Use [PLACEHOLDER] notation for variable elements.
Only proceed when at least 80% confident in the reconstruction.
```

## Complete Examples

### Example 1: Recovering a Writing Style

**Scenario:** You got a great product description once and want to reproduce that tone.

```
You are an expert Prompt Engineer performing reverse prompt engineering.

TASK:
Analyze the following product description. Reconstruct the prompt that
would consistently produce this style of writing for other products.

OUTPUT SAMPLE:
"Mira is the meeting companion that thinks ahead. While you're present
in the conversation, Mira is quietly capturing every decision, action
item, and insight — then turning them into a clean summary the moment
you close your laptop. No more frantic note-taking. No more 'wait, what
did we decide?' Just clarity, automatically."

ANALYSIS INSTRUCTIONS:
Examine for: implied persona, tone, structure, what it does vs. doesn't
say, sentence length patterns, opening hook strategy, implicit audience.

RECOVERED PROMPT:
Generate a reusable template for writing product descriptions in this style.
```

**Recovered prompt output:**
```
ROLE: You are a B2B SaaS copywriter who specializes in product descriptions
for productivity tools.

TASK: Write a product description for [PRODUCT NAME], a tool that [CORE FUNCTION].

STYLE RULES:
- Open with the product name as subject in a short declarative sentence
- Use "while you [user action], [product] is [working for you]" structure for the value prop
- Contrast the painful before-state with the effortless after-state
- No feature lists — benefits only, in plain language
- End with a 3-word payoff phrase: "[adjective], [adverb]."
- Target: 3-4 sentences, under 80 words
- Voice: confident, warm, smart — like a trusted colleague, not a marketer
```

### Example 2: Recovering an Analysis Format

**Scenario:** A colleague produced a competitive analysis you want to replicate.

```
You are an expert Prompt Engineer performing reverse prompt engineering.

TASK:
Analyze the following competitive analysis excerpt. Reconstruct the prompt
template that produced this format and analytical approach.

INPUT DATA:
Companies to compare: Notion vs. Confluence vs. Linear
Use case: Engineering team wiki and documentation

OUTPUT SAMPLE:
[Paste the analysis here]

ANALYSIS INSTRUCTIONS:
Identify: comparison dimensions, how trade-offs are framed, what's
prioritized, how conclusions are drawn, what data is cited vs. inferred.

RECOVERED PROMPT:
Template should work for any set of tools in any category.
```

### Example 3: Output-Only Recovery

**Scenario:** You have a great email you wrote with AI assistance but can't find the original prompt.

```
You are an expert Prompt Engineer.

TASK:
I have an email I'm happy with but lost the prompt that generated it.
Reverse-engineer a reusable prompt from the email so I can produce
similar emails for other clients.

OUTPUT SAMPLE:
[Paste the email]

RECOVERED PROMPT:
Create a template with [CLIENT NAME], [SITUATION], and [SPECIFIC REQUEST]
as placeholder variables. Capture the tone, structure, and approach precisely.
```

## Best Use Cases

1. **Template Recovery**
   - Lost prompts that worked well
   - Successful AI outputs from colleagues or tools

2. **Style Codification**
   - Turn a one-off great result into a repeatable standard
   - Establish brand voice templates from approved examples

3. **System Prompt Approximation**
   - Understanding what instructions produce specific AI behaviors
   - Debugging AI product behavior

4. **Learning from Excellence**
   - Study what makes a well-structured prompt by working backwards
   - Train yourself in prompt engineering by reverse-engineering results

## Selection Criteria

**Choose RPEF when:**
- ✅ You have an existing output you want to reproduce or templatize
- ✅ A prompt worked once but you can't replicate it
- ✅ You want to extract generalizable rules from specific examples
- ✅ You want to understand *why* an output was good

**Avoid RPEF when:**
- ❌ You're creating from scratch (no existing output) → use another framework
- ❌ You want to improve an output → use Self-Refine or BAB
- ❌ You need requirements gathered first → use Reverse Role Prompting

## Quick Reference

| Component | Purpose |
|-----------|---------|
| Input Sample | The input data (if any) that produced the output |
| Output Sample | The output to reverse-engineer (required) |
| Analysis Instructions | What dimensions to examine |
| Recovered Prompt | Reusable template with [PLACEHOLDER] variables |
