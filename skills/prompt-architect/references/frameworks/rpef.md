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

**Template slot:** `SOURCE MATERIAL — ORIGINAL INPUT`. It is the only optional block in the template, and it is deleted together with the sentence directly beneath it when the recovery is output-only.

### Output Sample (required)
**Purpose:** The existing output you want to reverse-engineer. This is the primary source of truth — what you want to be able to reproduce.

**Template slot:** `SOURCE MATERIAL — OUTPUT SAMPLE`. Paste it verbatim; paraphrasing the sample destroys exactly the formatting and phrasing signals the analysis is meant to read.

### Analysis Instruction
**Purpose:** Directs the model to analyze the output for its implicit prompt properties, and to *report* that analysis before writing anything else.

**Template slot:** `ANALYSIS INSTRUCTIONS`, which names six dimensions: implied role or persona, tone and voice, structural and formatting patterns, level of detail and scope, implicit constraints (what it did NOT do), and reasoning style. Structure and format are one merged dimension, not two. An earlier revision of *this document* listed seven by splitting them apart; that was drift in the doc's copy, not a change to the template, which has carried the merged dimension unchanged since it was introduced.

### Confidence Threshold
**Purpose:** Stops the model from presenting a guess as a recovered prompt when one sample is too thin to support one.

**Template slot:** the closing sentences of `RECOVERED PROMPT`. The threshold is only useful when it is paired with a defined alternative action — see the note under Template Structure on why the earlier "only proceed when 80% confident" phrasing did nothing.

### Generalization Directive
**Purpose:** Specifies whether the recovered prompt should be a specific single-use template or a generalized meta-prompt with fill-in placeholders.

**Template slot:** folded into `RECOVERED PROMPT` as the `[PLACEHOLDER]` instruction — the template always asks for the generalized form, and marks variability at the token level rather than asking a separate yes/no question about it.

## Template Structure

Section headers are stripped at emission, so every slot's meaning is carried by the
unbracketed prose around it rather than by the header above it. This template also depends
on sequencing — the analysis must be reported *before* the recovered prompt is written —
and that sequencing lives in the prose ("First, examine…", "After completing that
analysis…"), not in the order the headers happen to appear. Do not reintroduce
header-only structure.

```
You are an expert Prompt Engineer performing reverse prompt engineering.

TASK:
Analyze the sample material below and reconstruct the prompt that would
consistently produce this type of output.

SOURCE MATERIAL — ORIGINAL INPUT:
[Optional — paste here, verbatim, the input that originally produced the output
sample below. If you have nothing to paste, delete this bracketed block along with
the sentence directly below it.]
Use the material above as the input that produced the output sample below.

SOURCE MATERIAL — OUTPUT SAMPLE:
[Paste here, verbatim, the output you want to reverse-engineer.]
Use the material above as the finished output to reverse-engineer.

ANALYSIS INSTRUCTIONS:
First, examine the output above and report what you find for each of these dimensions:
- Implied role or persona
- Tone and voice
- Structural and formatting patterns
- Level of detail and scope
- Implicit constraints (what it did NOT do)
- Reasoning style

RECOVERED PROMPT:
After completing that analysis, write out a reusable prompt template that reliably
reproduces this type of output. Mark every variable element with the literal token
[PLACEHOLDER], written exactly that way rather than replaced with a specific value.
If you are less than 80% confident in the reconstruction, do not guess: say so, and
name the additional sample material that would resolve the uncertainty.
```

Two sentences in `RECOVERED PROMPT` do work that is easy to lose when editing this
template, and both replaced phrasings that failed in a specific way:

- **"written exactly that way rather than replaced with a specific value."** The earlier
  phrasing, "Use [PLACEHOLDER] for variable elements," reads two ways: emit the literal
  token, or fill each position with a plausible concrete value. The second reading returns
  a filled-in example rather than the reusable template that is the entire point of the
  framework, so the instruction is made explicit to close it off. How often the ambiguity
  actually resolves the wrong way has not been measured here.
- **"If you are less than 80% confident … say so, and name the additional sample
  material."** The earlier phrasing, "Only proceed when at least 80% confident," named no
  alternative action, so it gated nothing: no behavior was defined for the failing branch,
  leaving nothing in the text to stop the model proceeding anyway. A threshold is only a
  gate when the below-threshold
  path is spelled out, and naming the missing material makes that path useful rather than
  merely a refusal.

Because RPEF's source material is the user's own pasted sample, the two `SOURCE MATERIAL`
blocks are the framework's legitimate `[...]` placeholders under SKILL.md step 5 — they are
material only the user can supply, not defaults the model should invent.

## Complete Examples

Every example below is shown in emitted form: each slot carries its own role in prose, so
nothing is lost when the headers are deleted. The output samples are filled with real
material rather than left as paste instructions, because an RPEF prompt with an empty
sample demonstrates nothing — the sample is the only thing the framework operates on.

### Example 1: Recovering a Writing Style

**Scenario:** You got a great product description once and want to reproduce that tone. Output-only, so the `ORIGINAL INPUT` block and the sentence below it are both deleted.

```
You are an expert Prompt Engineer performing reverse prompt engineering.

TASK:
Analyze the sample material below and reconstruct the prompt that would
consistently produce this type of output.

SOURCE MATERIAL — OUTPUT SAMPLE:
"Mira is the meeting companion that thinks ahead. While you're present in the
conversation, Mira is quietly capturing every decision, action item, and insight
— then turning them into a clean summary the moment you close your laptop. No
more frantic note-taking. No more 'wait, what did we decide?' Just clarity,
automatically."
Use the material above as the finished output to reverse-engineer.

ANALYSIS INSTRUCTIONS:
First, examine the output above and report what you find for each of these dimensions:
- Implied role or persona
- Tone and voice
- Structural and formatting patterns
- Level of detail and scope
- Implicit constraints (what it did NOT do)
- Reasoning style

RECOVERED PROMPT:
After completing that analysis, write out a reusable prompt template that reliably
reproduces this type of output. Mark every variable element with the literal token
[PLACEHOLDER], written exactly that way rather than replaced with a specific value.
If you are less than 80% confident in the reconstruction, do not guess: say so, and
name the additional sample material that would resolve the uncertainty.
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

**Scenario:** A colleague produced a competitive analysis you want to replicate. You have both the brief they worked from and the analysis itself, so both `SOURCE MATERIAL` blocks are used.

```
You are an expert Prompt Engineer performing reverse prompt engineering.

TASK:
Analyze the sample material below and reconstruct the prompt that would
consistently produce this type of output.

SOURCE MATERIAL — ORIGINAL INPUT:
Companies to compare: Notion vs. Confluence vs. Linear
Use case: Engineering team wiki and documentation
Audience: VP Engineering, 200-person org
Use the material above as the input that produced the output sample below.

SOURCE MATERIAL — OUTPUT SAMPLE:
"**Structure and hierarchy.** Confluence wins outright here. Spaces, page trees,
and page-level restrictions map cleanly onto how engineering orgs already think
about ownership. Notion's database-plus-nesting model is more flexible but
degrades past roughly 500 pages without deliberate curation. Linear's documents
are deliberately shallow — they attach to projects rather than organizing
independently — so it is not a wiki candidate at all on this dimension.

**Search.** Confluence's search is the weakest of the three despite being the
oldest: it indexes attachments well but ranks stale pages highly. Notion's search
handles partial-title matching acceptably since its 2023 rebuild. Linear's search
is the fastest and best-scoped, but there is comparatively little to search.

**Permissioning.** Confluence again, and the gap widens with headcount. Notion's
permissions are workspace- and page-level but become expensive to audit past
about 100 seats. Linear does not attempt document-level permissioning.

**Recommendation.** For an engineering wiki proper: Confluence above roughly 150
engineers, where permissioning and hierarchy dominate; Notion below that, where
flexibility outweighs structure. Linear is complementary rather than a candidate
— pair it with whichever wiki you choose.

*Caveat: the page-count and seat-count thresholds above come from practitioner
reports, not vendor benchmarks.*"
Use the material above as the finished output to reverse-engineer.

ANALYSIS INSTRUCTIONS:
First, examine the output above and report what you find for each of these dimensions:
- Implied role or persona
- Tone and voice
- Structural and formatting patterns
- Level of detail and scope
- Implicit constraints (what it did NOT do)
- Reasoning style

RECOVERED PROMPT:
After completing that analysis, write out a reusable prompt template that reliably
reproduces this type of output. Mark every variable element with the literal token
[PLACEHOLDER], written exactly that way rather than replaced with a specific value.
If you are less than 80% confident in the reconstruction, do not guess: say so, and
name the additional sample material that would resolve the uncertainty.
```

**Recovered prompt output:**
```
ROLE: You are a senior technical evaluator who compares tools for engineering
leadership audiences.

TASK: Compare [TOOL A], [TOOL B], and [TOOL C] for [USE CASE], writing for
[AUDIENCE AND ORG SIZE].

METHOD:
- Choose 3-4 dimensions that actually matter for the stated use case. Use the same
  dimensions for every tool, as bold headings.
- Under each dimension, name the winner in the first sentence, then justify it.
- Where a tool is not a genuine candidate on a dimension, say so plainly instead of
  scoring it — do not manufacture a three-way comparison that isn't there.
- Close with a recommendation conditional on a named threshold (org size, seat count,
  volume) rather than a single unqualified pick.
- Mark any figure sourced from practitioner reports rather than vendor benchmarks
  with an explicit caveat line at the end.

TONE: Direct and evaluative — verdict first, reasoning second. No feature-matrix
tables, no vendor marketing language, no hedging on the recommendation.
```

### Example 3: Output-Only Recovery, Where the Confidence Gate Fires

**Scenario:** You have an email you're happy with but lost the prompt. One sample is often too thin to generalize from — this example shows what the template's confidence rule is for.

```
You are an expert Prompt Engineer performing reverse prompt engineering.

TASK:
Analyze the sample material below and reconstruct the prompt that would
consistently produce this type of output.

SOURCE MATERIAL — OUTPUT SAMPLE:
"Hi Dana,

Quick update on the Q3 rollout: we're on track for the Sept 15 launch, but I want
to flag something early rather than at the last minute. The data migration is
running about 30% longer than we scoped, which eats most of our buffer. That
doesn't put the date at risk yet — it means we've lost the room to absorb a
second surprise.

Two options. We hold the date and move the reporting dashboard to a fast-follow
in early October, or we hold scope and move the launch to Sept 29. I'd recommend
the first: the dashboard is the piece your team flagged as least useful in month
one.

Happy to talk it through Thursday if that's easier. Either way you'll have a firm
recommendation from me by Friday.

Best,
Ray"
Use the material above as the finished output to reverse-engineer.

ANALYSIS INSTRUCTIONS:
First, examine the output above and report what you find for each of these dimensions:
- Implied role or persona
- Tone and voice
- Structural and formatting patterns
- Level of detail and scope
- Implicit constraints (what it did NOT do)
- Reasoning style

RECOVERED PROMPT:
After completing that analysis, write out a reusable prompt template that reliably
reproduces this type of output. Mark every variable element with the literal token
[PLACEHOLDER], written exactly that way rather than replaced with a specific value.
If you are less than 80% confident in the reconstruction, do not guess: say so, and
name the additional sample material that would resolve the uncertainty.
```

**Recovered prompt output** — here the gate fires, which is the correct behavior rather than a failure:
```
Confidence in a reusable reconstruction: roughly 60%. That is below the 80% bar you
set, so I am not going to hand you a template and let it look more reliable than it is.

What the sample supports confidently: the structure is stable and readable — status
line, early flag, explicit statement of what the impact is and is not, exactly two
named options, a recommendation justified by the recipient's own stated priority, an
offer to discuss, and a committed date for the firm answer. The register is candid and
non-defensive; the bad news arrives in the second sentence rather than buried below a
paragraph of reassurance.

What one sample cannot settle, and why each matters:
- Whether "exactly two options" is a rule or an artifact of this situation. A template
  that hardcodes two will force false binaries where the honest answer is one or three.
- Whether the recommendation systematically favors protecting the date, or whether that
  was specific to this trade-off.
- Whether this register holds for an external client, or only for an internal
  stakeholder like Dana with whom the writer has standing rapport.

Send two or three more emails you were happy with — ideally one carrying
straightforwardly good news, and one written to a client rather than a colleague — and
I can separate the fixed structure from this instance's specifics.
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

| Component | Template slot | Purpose |
|-----------|---------------|---------|
| Input Sample | `SOURCE MATERIAL — ORIGINAL INPUT` | The input data (if any) that produced the output — optional, deleted with its trailing sentence when unused |
| Output Sample | `SOURCE MATERIAL — OUTPUT SAMPLE` | The output to reverse-engineer, pasted verbatim (required) |
| Analysis Instruction | `ANALYSIS INSTRUCTIONS` | The six dimensions to examine, reported before anything else is written |
| Generalization Directive | `RECOVERED PROMPT` | Reusable template marking variables with the literal token `[PLACEHOLDER]` |
| Confidence Threshold | `RECOVERED PROMPT` (closing) | Below 80%, say so and name the sample material that would resolve it |
