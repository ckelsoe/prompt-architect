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

Five iterations, issued as a **single prompt** that returns all five summaries at once (not five separate turns):

1. **Write a deliberately sparse first summary.** Long (4-5 sentences, ~80 words) but highly non-specific, padded with filler like "this article discusses." The padding is intentional — it creates the slack that later steps convert into entities.
2. **Identify 1-3 missing entities** from the article that are absent from the current summary.
3. **Rewrite at identical length**, covering everything from the previous summary *plus* the new entities. Make room through fusion, compression, and removal of uninformative phrases.
4. **Repeat steps 2-3** until five summaries exist.
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

## The Prompt

This is the paper's actual prompt, lightly reformatted. It is reproduced closely because the specific wording — especially the fixed-length instruction and the entity criteria — is what makes the technique work.

```
Article: {{ARTICLE}}

You will generate increasingly concise, entity-dense summaries of the above Article.

Repeat the following 2 steps 5 times.

Step 1. Identify 1-3 informative Entities (";" delimited) from the Article which are
missing from the previously generated summary.
Step 2. Write a new, denser summary of identical length which covers every entity and
detail from the previous summary plus the Missing Entities.

A Missing Entity is:
- Relevant: to the main story.
- Specific: descriptive yet concise (5 words or fewer).
- Novel: not in the previous summary.
- Faithful: present in the Article.
- Anywhere: located anywhere in the Article.

Guidelines:
- The first summary should be long (4-5 sentences, ~80 words) yet highly non-specific,
  containing little information beyond the entities marked as missing. Use overly verbose
  language and fillers (e.g., "this article discusses") to reach ~80 words.
- Make every word count: re-write the previous summary to improve flow and make space for
  additional entities.
- Make space with fusion, compression, and removal of uninformative phrases like "the
  article discusses".
- The summaries should become highly dense and concise yet self-contained, e.g., easily
  understood without the Article.
- Missing entities can appear anywhere in the new summary.
- Never drop entities from the previous summary. If space cannot be made, add fewer new
  entities.

Remember, use the exact same number of words for each summary.

Answer in JSON. The JSON should be a list (length 5) of dictionaries whose keys are
"Missing_Entities" and "Denser_Summary".
```

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
