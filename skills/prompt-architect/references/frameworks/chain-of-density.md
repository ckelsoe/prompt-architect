# Chain of Density (CoD) Framework

## Overview

Chain of Density is a summarization technique that produces a series of increasingly **entity-dense** summaries of a source document while holding the **length fixed**. It begins with a deliberately sparse, verbose summary, then repeatedly identifies salient entities missing from the previous version and fuses them in — making room by compressing and rewriting existing text rather than by adding words or dropping content.

**Research basis:** "From Sparse to Dense: GPT-4 Summarization with Chain of Density Prompting" (Adams, Fabbri, Ladhak, Lehman & Elhadad; arXiv 2309.04269; NewSum workshop at EMNLP 2023, ACL Anthology 2023.newsum-1.7). Entity density rose from 0.089 to 0.167 entities per token over five steps, against 0.151 for human-written summaries and 0.122 for a vanilla GPT-4 summary. In human evaluation, annotators preferred step 2 (30.8% of first-place votes) and step 3 (23.0%) over the sparse step 1 (8.3%) — density helps, but only up to a point.

## The Defining Constraint: Length Stays Fixed

This is the entire mechanism, and it is what separates CoD from ordinary iterative editing:

> "GPT-4 generates an initial entity-sparse summary before iteratively incorporating missing salient entities **without increasing the length**." — abstract

> "To maintain the same length while increasing the number of entities covered, abstraction, fusion, and compression is explicitly encouraged, rather than dropping meaningful content from previous summaries." — §2

Density rises because the *same word budget* is made to carry more information. If you shorten the text on each pass, you are not doing Chain of Density — you are doing generic compression. For that, use **Iterative Compression** (`iterative-compression.md`).

The paper controls length deliberately, because length is "a strong confounder when evaluating summaries." In practice the budget holds approximately: measured token counts across the five steps were 72, 67, 67, 69, 72.

## What Counts as a "Missing Entity"

The paper is deliberately non-prescriptive about entity *types*. An entity qualifies if it is:

- **Relevant** — to the main story
- **Specific** — descriptive yet concise (5 words or fewer)
- **Novel** — not in the previous summary
- **Faithful** — present in the source article
- **Anywhere** — located anywhere in the article, not just the opening

"Anywhere" is load-bearing: it is the explicit countermeasure to lead bias, and it is why later iterations start pulling content from the middle and end of the source.

Entity identification is done by the model itself inside the loop — there is no external extraction step.

## The Method

`[N]` iterations, issued as a **single prompt** that returns all `[N]` summaries at once (not `[N]` separate turns). The paper uses five, and that is the template's default when the user gives no number:

1. **Write a deliberately sparse first summary.** Long (4-5 sentences, ~`[TARGET]` words) but highly non-specific, padded with filler like "this article discusses." The padding is intentional — it creates the slack that later steps convert into entities.
2. **Identify 1-3 missing entities** from the article that are absent from the current summary.
3. **Rewrite at identical length**, covering everything from the previous summary *plus* the new entities. Make room through fusion, compression, and removal of uninformative phrases.
4. **Repeat steps 2-3** until `[N]` summaries exist.
5. **Choose the step you want.** Later is not automatically better — human raters preferred steps 2-3.

**Never drop entities from the previous summary.** If space cannot be made, add fewer new entities. Under pressure, density yields — length and prior content do not.

## When to Use Chain of Density

**Ideal for:**
- Summarizing an article, paper, or report where information density matters
- Producing a summary that must fit a fixed length but carry maximum substance
- Generating several density options to pick from
- Abstract, executive-summary, and TL;DR writing

**Not for:**
- General content rewriting or quality improvement → use **Self-Refine**
- Progressive shortening to a target word count → use **Iterative Compression**
- Non-summarization tasks. CoD is summarization-specific; the paper evaluates it only on news articles (CNN/DailyMail).

## Template Structure

The block below is the template's prompt region as authored — what you fill in, not what you send. (Its divider rules are omitted; they mark the guidance/prompt boundary inside the template file and never ship.) Section headers are stripped at emission, so every slot's meaning is carried by the prose around and inside it rather than by the header above it. `SOURCE MATERIAL:` is such a header — it goes, and the unbracketed sentence below it is what tells the model the pasted text is the article to summarize. `Step 1.`, `Step 2.` and `Guidelines:` are the exception: they are literal labels inside the paper's protocol, not document structure, and they ship verbatim.

`[TARGET]` is the fixed word budget and `[N]` the number of summaries, both as bare numerals. Substitute the same numeral at every occurrence of each — in the prompt body below, `[TARGET]` appears three times and `[N]` three times. (The template file names each twice more in its guidance region; those are descriptions of the fields, not slots, and never ship.) The paper's settings are `[TARGET]` = 80 and `[N]` = 5; use those if the user gave no numbers of their own.

```
SOURCE MATERIAL:
[Paste the full document to be summarized here.]
Use the material above as the article to be summarized for the work described below.

You will generate increasingly concise, entity-dense summaries of the article above.
Produce [N] summaries in total, each denser than the last, all in a single response.
Every summary must be exactly [TARGET] words long.

Repeat the following 2 steps [N] times.

Step 1. Identify 1-3 informative entities (";" delimited) from the article which
are missing from the previously generated summary.
Step 2. Write a new, denser summary of identical length which covers every entity
and detail from the previous summary plus the missing entities.

A missing entity is:
- Relevant: to the main story.
- Specific: descriptive yet concise (5 words or fewer).
- Novel: not in the previous summary.
- Faithful: present in the article.
- Anywhere: located anywhere in the article.

Guidelines:
- The first summary should be long (4-5 sentences, ~[TARGET] words) yet highly
  non-specific, containing little information beyond the entities marked as missing.
  Use overly verbose language and fillers (e.g., "this article discusses") to reach
  ~[TARGET] words.
- Make every word count: re-write the previous summary to improve flow and make
  space for additional entities.
- Make space with fusion, compression, and removal of uninformative phrases like
  "the article discusses".
- The summaries should become highly dense and concise yet self-contained, e.g.,
  easily understood without the article.
- Missing entities can appear anywhere in the new summary.
- Never drop entities from the previous summary. If space cannot be made, add
  fewer new entities.

Remember, use the exact same number of words for each summary.

Answer in JSON. The JSON should be a list (length [N]) of dictionaries whose keys are
"Missing_Entities" and "Denser_Summary".

After the JSON, and outside it, add one short paragraph naming which summary you
recommend and why. Do not default to the last one: in the paper's human evaluation,
summary 2 (30.8% of first-place votes) and summary 3 (23.0%) were preferred over the
sparse summary 1 (8.3%), because past a point density costs readability.
```

### Relationship to the paper's original prompt

The body above is the paper's prompt, reproduced closely on purpose — the specific wording, especially the fixed-length instruction and the entity criteria, is what makes the technique work. Three deliberate departures:

- **`SOURCE MATERIAL:` replaces the paper's `Article: {{ARTICLE}}` field.** Same job, house convention, and the trailing sentence survives header-stripping where a bare `Article:` label would not.
- **`[TARGET]` and `[N]` are parameterized** where the paper hardcodes 80 and 5, so the template serves a user-supplied budget and pass count.
- **The closing recommendation paragraph is an addition, not from the paper.** The paper reports the preference numbers; it does not instruct the model to act on them. This template does, so the user gets a pick rather than a default-to-last.

Sentence-case "missing entity" and "article" replace the paper's mid-sentence capitals. That is formatting only — no wording changed.

## Worked Example

**Source:** a 1,200-word news article about a municipal transit funding decision.

**Step 1 (sparse, ~80 words):**
> This article discusses a recent decision made by local government officials regarding transportation. It covers the various considerations that were taken into account during the deliberation process, as well as some of the reactions from different groups. The piece also touches on the broader context surrounding the issue and what it might mean going forward for the region and the people who live there.

Entities: 0 meaningful. Pure filler — by design.

**Step 2 (same length, entities fused in):**
> Portland's city council voted 4-1 on Tuesday to redirect $47 million from the Southwest Corridor light-rail project to bus rapid transit, citing a 30% cost overrun. Commissioner Dana Reyes cast the dissenting vote. TriMet, which operates the region's transit, had lobbied for the shift. Riders' advocacy group OPAL called the decision a setback for east-side commuters, while the Portland Business Alliance welcomed it.

Same word budget. The filler is gone; ten specific entities took its place.

**Steps 3-5** continue fusing — ridership figures, the revised completion date, the federal grant condition — each time compressing existing phrasing to make room.

## Best Practices

1. **Enforce the length constraint explicitly.** Models drift toward expanding. "Use the exact same number of words for each summary" is not optional boilerplate.
2. **Let the first summary be bad.** The instinct is to start strong; resist it. A dense first summary leaves no slack, and the chain stalls immediately.
3. **Ask for all iterations in one response.** The paper uses a single prompt returning a JSON list of five. Splitting it across turns loses the model's view of the prior chain.
4. **Pick the step, don't assume the last.** Step 5 is the densest but not the most readable. Steps 2-3 won the human evaluation.
5. **Watch for the readability tradeoff.** Past a point, dense summaries read as lists of facts. The paper found this explicitly.

## Combining CoD with Other Frameworks

### CoD + CO-STAR
Use CO-STAR to fix audience, tone, and format for the summary; use CoD to maximize what fits in that format. Useful when the summary has a specific reader.

### CoD + Chain of Thought
Ask the model to reason about which entities are most salient before selecting them. Helps when the source is long and salience is contested.

## Assessment Checklist

- [ ] Is the task actually summarization? (If not, CoD is the wrong framework.)
- [ ] Is a fixed target length stated?
- [ ] Is the first summary deliberately sparse and padded?
- [ ] Are entity criteria included in the prompt?
- [ ] Does each step preserve all prior entities?
- [ ] Is the word count roughly constant across steps?
- [ ] Was the chosen step selected on merit rather than defaulting to the last?

## Tips for Success

1. **Fixed length, rising density** — if length is falling, it is not CoD
2. **Start verbose on purpose** — the filler is the raw material
3. **1-3 entities per step** — more causes dropped content
4. **Five steps is the paper's number** — fewer works; more yields diminishing returns
5. **Compare steps before choosing** — the densest is rarely the most useful
