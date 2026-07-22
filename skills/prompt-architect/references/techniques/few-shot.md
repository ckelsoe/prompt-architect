# Few-Shot / In-Context Learning (Composable Technique)

## What this is, and why it is not a framework

Few-shot prompting means showing the model a small number of worked examples —
input paired with the desired output — inside the prompt itself, so it induces the
pattern rather than working from an instruction alone. It is the single most
load-bearing prompting technique in general use, and it is deliberately **not** one
of this skill's routed frameworks.

The reason is structural. A framework answers "how should this request be shaped?"
and you pick exactly one. Few-shot answers "should this prompt carry examples, and if
so, which ones and in what order?" — and the answer can be yes for almost any
framework. It is a **layer**, not a choice. RACE-with-examples, CO-STAR-with-examples,
and Plan-and-Solve-with-examples are all still RACE, CO-STAR, and Plan-and-Solve. So
few-shot is applied *on top of* the chosen framework's emitted prompt, never selected
*instead of* it.

Two frameworks already carry a dedicated examples slot — **CARE** (its `E`) and
**RISE-IX** (its samples). Few-shot is the discipline of choosing, ordering, and
formatting those examples well. That discipline applies equally to the many frameworks
that have no examples slot at all, which is exactly why it lives here as a technique
instead of inside any one framework.

**Origin:** In-context / few-shot learning was named and popularized by Brown et al.,
"Language Models are Few-Shot Learners" (arXiv 2005.14165, NeurIPS 2020) — cite that
paper only for the *term*, not for any benchmark number; its abstract reports model
scale ("175 billion parameters"), not prompt-construction results. The practical
guidance below rests on later work that actually measured how example choice changes
outputs.

## When to add examples — and when not to

Add examples when:

- **The output format is easier to show than to describe.** A specific JSON shape, a
  table layout, a citation style, a commit-message convention — one example settles
  what a paragraph of instructions leaves ambiguous.
- **A consistent structure must repeat** across many outputs (every entry gets the same
  four fields in the same order).
- **A voice or style must be matched** and the user can supply samples of it.
- **The task is classification or extraction with a fixed label set**, where examples
  pin down the label space and the decision boundary.
- **Edge cases matter** that an instruction cannot cleanly enumerate — show the tricky
  input handled correctly.

Do **not** add examples when:

- **The task is open-ended reasoning.** Few-shot examples can lock the model into
  imitating the *surface pattern* of the examples instead of reasoning freshly;
  zero-shot chain-of-thought often beats few-shot on novel multi-step problems.
- **One clear instruction already fixes the output.** Examples are tokens; every one
  costs context and adds a pattern the model will over-fit to.
- **You would have to invent the examples.** A fabricated example teaches a fabricated
  standard. If neither the user nor the source material supplies a real one, prefer a
  precise instruction — do not manufacture a sample and present it as the target.

## How many, and in what order

- **Count:** 2–5 is the usual working range. Returns diminish fast; more examples is
  not reliably better, and past a handful the marginal example mostly adds cost and
  over-fitting risk. Start with the fewest that disambiguate the task.
- **Order is not neutral.** Models are measurably sensitive to example ordering, and to
  the point of a strong **recency bias** — the last example carries extra weight (Lu et
  al., "Fantastically Ordered Prompts…", ACL 2022, arXiv 2104.08786, which reports a 13%
  relative improvement across eleven text-classification tasks purely from ordering).
  Put the most representative example last, and do not accidentally sort all of one
  class to the end.

## What the examples actually teach

- **Format and label *space* teach more than per-example correctness.** Min et al.
  ("Rethinking the Role of Demonstrations…", EMNLP 2022, arXiv 2202.12837) found that
  randomly replacing the labels in demonstrations barely hurt performance — what the
  model reads off the examples is the *shape* of the task: the input distribution, the
  set of possible answers, and the output format. Practical consequence: keep every
  example in the **exact** format you want back, and make sure the examples span the
  real label set. A perfectly-labeled set of examples in the wrong format teaches the
  wrong thing.
- **Balance the examples to counter built-in bias.** Zhao et al. ("Calibrate Before
  Use…", ICML 2021, arXiv 2102.09690) documented majority-label bias, recency bias, and
  common-token bias — models drift toward whichever label appears most, appears last, or
  is lexically common (their contextual calibration recovered up to 30.0% absolute on
  the tasks studied). You will not calibrate logits inside a pasted prompt, but you get
  most of the benefit for free by **balancing label frequencies** and not stacking
  same-class examples.

## How it composes with a framework's emitted prompt

Because section headers are stripped at emission (see SKILL.md step 6), examples cannot
live under an `EXAMPLES:` label that survives — they have to read as part of the flat
prompt. After the chosen framework's prompt is drafted, and only if examples earn their
place:

1. Draft the framework prompt as normal.
2. Insert the examples **before the final instruction**, introduced by a plain prose
   line the stripped output can keep, e.g. *"Follow the format of these examples:"* —
   each example showing input and the exact desired output.
3. End with the actual task so the model acts after seeing the pattern, not before.

Emitted shape (the `Follow the format…` line and the examples are ordinary text in the
flat block; there are no headers):

```
[The framework-shaped instruction and context.]

Follow the format of these examples:

Input: <real example input 1>
Output: <desired output 1, in the exact target format>

Input: <real example input 2>
Output: <desired output 2>

Now do the same for:
[Paste the actual input here]
```

If the user has no real examples to supply and you cannot draw them from pasted source
material, say so and fall back to a precise instruction rather than inventing samples —
the same rule the frameworks follow for facts about the user's world.
