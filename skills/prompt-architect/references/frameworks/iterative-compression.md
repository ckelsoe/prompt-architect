# Iterative Compression Framework

## Overview

Iterative Compression progressively tightens a piece of text through multiple passes. Each iteration cuts redundancy, sharpens phrasing, and raises information density — typically while reducing overall length toward a target. It rests on the observation that successive editing passes usually beat trying to get everything right in one shot.

**Origin:** General practitioner technique with no single documented originator — the multi-pass editing loop long predates LLMs. This is a house pattern, not a published method, and it is not research-backed. **Not to be confused with Chain of Density** (Adams et al., arXiv 2309.04269), which holds length *fixed* while raising entity density. The two techniques are frequently conflated, including in earlier versions of this package. If your goal is a shorter text, use this framework; if your goal is more information in the *same* number of words, use `chain-of-density.md`.

## Core Concept

Instead of requesting the perfect output immediately, Iterative Compression:
1. Starts with a basic/verbose version
2. Iteratively refines through multiple passes
3. Increases information density each time
4. Removes fluff and redundancy
5. Enhances clarity and precision
6. Converges on optimal output

Think of it as "progressive enhancement" for prompts.

## When to Use Iterative Compression

**Ideal for:**
- Summarization tasks
- Content compression
- Iterative improvement of writing
- Optimizing explanations
- Refining complex outputs
- Tasks where quality improves with iteration

**Not needed for:**
- Simple one-shot tasks
- When first draft is sufficient
- Time-critical quick tasks
- Tasks with fixed formats that can't improve

## Best Practices

### 1. Define What to Optimize
```
Good:
"Iterate to improve:
- Information density
- Clarity
- Conciseness
- Precision"

Poor:
"Make it better"
```

### 2. Specify Number of Iterations
```
Good:
"Refine through 4 iterations, showing each version"

Poor:
"Keep improving until it's good"
```

### 3. Show Evolution
```
Good:
"Show each iteration and explain what changed and why"

Poor:
"Just give me the final version"
```

### 4. Set Clear Constraints
```
Good:
"Each iteration should be 20% shorter while maintaining completeness"

Poor:
"Make it shorter"
```

## Template Structure

Section headers are stripped at emission, along with the divider rules that separate them in the shipped `.txt`, so every slot's meaning is carried by the unbracketed prose that travels with it rather than by the header above it. The one exception is the `Iteration 1:` / `Iteration 2:` / `Iteration 3:` labels — those are literal labels inside the protocol, not section headers, and they must survive into the emitted prompt exactly as written.

```
SOURCE MATERIAL:
[Paste the full text to be compressed here.]
Use the material above as the text to be compressed for the work described below.
Every version must be a rewrite of that material — never introduce a claim it does
not support.

OPTIMIZATION GOAL:
Every pass must move the text toward this goal:
[A full sentence naming what improves and by how much, not a bare label like
"concision." For example: "Reduce word count by 20% each pass while retaining all key
information," or "Raise information density — cut filler until every sentence earns
its place."]

TARGET:
The final version must reach this end state:
[A phrase completing the sentence above, e.g. "under 150 words and readable by a
non-specialist." Name the unit, not a bare number.]

NUMBER OF ITERATIONS:
Run this many passes in total:
[The count as a phrase completing the sentence above, e.g. "three passes."
Typical: 2-4]
Iteration 1: [What this first pass must do to the source text, as a full sentence.]
Iteration 2: [How this pass tightens the result of pass 1, as a full sentence.]
Iteration 3: [Optional — what this final polish pass must do, as a full sentence.
Delete this line if running fewer than three passes; add further Iteration lines in
the same form if running more.]

ITERATION INSTRUCTIONS:
In each pass, identify what can be cut, compressed, or clarified, apply the changes,
then check both that the result serves the goal above better than the version before
it and that nothing the goal requires keeping was lost. Stop when [a clause completing
this sentence, e.g. "no filler words remain" or "all three passes are complete"].

OUTPUT FORMAT:
Deliver the final version in this format:
[A phrase completing the sentence above, e.g. "a single paragraph of continuous
prose," a bullet list, or a one-sentence summary.]

INTERMEDIATE VERSIONS:
[Optional — keep exactly one of these two sentences as the entire content of this
block, or delete the block: "Show the output of every iteration in order, labelled by
pass number." / "Show only the final version — do not print the intermediate
passes."]

Compression has a floor. Past a point, passes strip meaning rather than filler. If a
pass would remove something a reader needs, stop at the previous version and deliver
that.
```

Two slots behave differently from their counterparts in other frameworks in this package. `SOURCE MATERIAL` is **not** optional here — several frameworks let you delete that block when you have nothing to paste, but this one cannot: compression is defined as a rewrite of supplied text, so with no source there is nothing to compress. `INTERMEDIATE VERSIONS` is the opposite — it is genuinely optional, and when kept it takes exactly one of the two supplied sentences as its entire content rather than free-form instructions.

The closing paragraph about compression's floor is unbracketed prose, not a fillable slot. It ships verbatim in every emitted prompt and is the stopping condition that keeps the last pass from stripping meaning.

The `Iteration N:` lines admit two shapes. A **length ladder** names a shrinking word count for each pass (200 → 150 → 100 → 75), which suits material with a hard limit to hit. **Progressive tightening** instead names what each pass removes — restatement first, then inferable detail, then hedges — which suits material where the floor matters more than the number. Either shape is on-method; what is not is assigning each pass a *different quality dimension* (clarity, then impact, then tone). That is multi-dimensional refinement rather than compression, the text does not get shorter, and it is what `self-refine.md` is for. Use this framework only when the text should shrink.

## Complete Examples

Every example below is shown in emitted form: each slot carries its own role in prose.
Read the section headers as scaffolding that will be deleted — the examples are written
so that nothing is lost when it is. The `Iteration N:` lines are the exception: they are
literal labels inside the protocol, not section headers, and they survive emission
exactly as written.

### Example 1: Summarization

**Without Iterative Compression:**
```
Summarize this research paper.
```

**With Iterative Compression:**
```
SOURCE MATERIAL:
[Paste the full text of the research paper here]
Use the material above as the text to be compressed for the work described below.
Every version must be a rewrite of that material — never introduce a claim it does
not support.

OPTIMIZATION GOAL:
Every pass must move the text toward this goal:
Cut roughly a quarter of the word count on each pass while retaining every finding,
the method that produced it, and the limitations the authors state.

TARGET:
The final version must reach this end state:
Under 75 words, covering the core findings, and readable by someone outside the field.

NUMBER OF ITERATIONS:
Run this many passes in total:
four passes.
Iteration 1: Write a comprehensive summary of roughly 200 words covering every major
point, prioritizing completeness over brevity.
Iteration 2: Cut that summary to roughly 150 words by removing repeated information
and combining related points.
Iteration 3: Cut to roughly 100 words, keeping only what a reader needs in order to
understand what was found and how it was established.
Iteration 4: Cut to 75 words, distilling to the core findings while preserving the
numbers and qualifiers that keep them accurate.

ITERATION INSTRUCTIONS:
In each pass, identify what can be cut, compressed, or clarified, apply the changes,
then check both that the result serves the goal above better than the version before
it and that nothing the goal requires keeping was lost. Stop when all four passes are
complete.

OUTPUT FORMAT:
Deliver the final version in this format:
a single paragraph of continuous prose.

INTERMEDIATE VERSIONS:
Show the output of every iteration in order, labelled by pass number.

Compression has a floor. Past a point, passes strip meaning rather than filler. If a
pass would remove something a reader needs, stop at the previous version and deliver
that.
```

### Example 2: Code Documentation

**Without Iterative Compression:**
```
Document this function.
```

**With Iterative Compression:**
```
SOURCE MATERIAL:
[Paste the function's signature and its existing documentation here]
Use the material above as the text to be compressed for the work described below.
Every version must be a rewrite of that material — never introduce a claim it does
not support.

OPTIMIZATION GOAL:
Every pass must move the text toward this goal:
Cut length while keeping every parameter, return value, raised exception, and edge
case a caller must know about — remove restatement of what the signature already
shows, not the behaviour it does not.

TARGET:
The final version must reach this end state:
Under 120 words, readable without scrolling, and complete enough that a caller never
has to open the implementation.

NUMBER OF ITERATIONS:
Run this many passes in total:
three passes.
Iteration 1: Cut every sentence that restates the signature or names types the
signature already declares.
Iteration 2: Merge the remaining prose so each parameter, return value, and raised
exception is described exactly once, in one place.
Iteration 3: Cut to 120 words by reducing the examples to the single shortest call
that still shows the edge case a caller is most likely to hit.

ITERATION INSTRUCTIONS:
In each pass, identify what can be cut, compressed, or clarified, apply the changes,
then check both that the result serves the goal above better than the version before
it and that nothing the goal requires keeping was lost. Stop when all three passes are
complete.

OUTPUT FORMAT:
Deliver the final version in this format:
a docstring with a one-line summary, a parameter list, a return description, and at
most one example.

INTERMEDIATE VERSIONS:
Show only the final version — do not print the intermediate passes.

Compression has a floor. Past a point, passes strip meaning rather than filler. If a
pass would remove something a reader needs, stop at the previous version and deliver
that.
```

### Example 3: Email Refinement

**Without Iterative Compression:**
```
Write an email announcing this feature.
```

**With Iterative Compression:**
```
SOURCE MATERIAL:
[Paste the full draft of the announcement email here]
Use the material above as the text to be compressed for the work described below.
Every version must be a rewrite of that material — never introduce a claim it does
not support.

OPTIMIZATION GOAL:
Every pass must move the text toward this goal:
Cut roughly a third of the word count on each pass while keeping what the feature
does, who it affects, when it ships, and what the reader has to do about it.

TARGET:
The final version must reach this end state:
Under 120 words, scannable in fifteen seconds, with the action the reader must take
stated in the first two sentences.

NUMBER OF ITERATIONS:
Run this many passes in total:
three passes.
Iteration 1: Move the action the reader must take to the opening and cut the
throat-clearing that currently precedes it.
Iteration 2: Cut the background to the single sentence a reader needs in order to
understand why the change is happening.
Iteration 3: Cut to 120 words by removing hedges, restated benefits, and any sentence
whose removal a reader would not notice.

ITERATION INSTRUCTIONS:
In each pass, identify what can be cut, compressed, or clarified, apply the changes,
then check both that the result serves the goal above better than the version before
it and that nothing the goal requires keeping was lost. Stop when all three passes are
complete.

OUTPUT FORMAT:
Deliver the final version in this format:
a subject line followed by no more than three short paragraphs.

INTERMEDIATE VERSIONS:
Show the output of every iteration in order, labelled by pass number.

Compression has a floor. Past a point, passes strip meaning rather than filler. If a
pass would remove something a reader needs, stop at the previous version and deliver
that.
```

### Example 4: Technical Explanation

**Without Iterative Compression:**
```
Explain how this algorithm works.
```

**With Iterative Compression:**
```
SOURCE MATERIAL:
[Paste the full existing explanation of the algorithm here]
Use the material above as the text to be compressed for the work described below.
Every version must be a rewrite of that material — never introduce a claim it does
not support.

OPTIMIZATION GOAL:
Every pass must move the text toward this goal:
Roughly halve the word count on each pass while keeping the algorithm's inputs, its
outputs, the step that does the real work, and its complexity.

TARGET:
The final version must reach this end state:
Under 100 words, understandable by a developer who has never seen the algorithm, with
no step omitted that they would need in order to implement it.

NUMBER OF ITERATIONS:
Run this many passes in total:
three passes.
Iteration 1: Cut to roughly 400 words by removing history, motivation, and
comparisons to other algorithms.
Iteration 2: Cut to roughly 200 words by reducing the worked example to its shortest
form and dropping any step the reader can infer from the ones around it.
Iteration 3: Cut to 100 words, keeping the inputs, the outputs, the central step, and
the complexity, and nothing else.

ITERATION INSTRUCTIONS:
In each pass, identify what can be cut, compressed, or clarified, apply the changes,
then check both that the result serves the goal above better than the version before
it and that nothing the goal requires keeping was lost. Stop when all three passes are
complete.

OUTPUT FORMAT:
Deliver the final version in this format:
a numbered list of steps followed by one sentence naming the time and space
complexity.

INTERMEDIATE VERSIONS:
Show the output of every iteration in order, labelled by pass number.

Compression has a floor. Past a point, passes strip meaning rather than filler. If a
pass would remove something a reader needs, stop at the previous version and deliver
that.
```

## Refinement Strategies

### What to Remove
- Redundant information
- Obvious statements
- Unnecessary qualifiers ("very", "really")
- Passive voice (often)
- Filler words
- Overly general statements

### What to Add
- Specific examples
- Precise numbers
- Concrete details
- Missing context (if essential)
- Clarifying examples

### What to Improve
- Vague language → specific language
- Long sentences → shorter, punchier
- Complex words → simpler alternatives (if clearer)
- Weak verbs → strong verbs
- Passive voice → active voice

## Quality Indicators

**Good Iterative Compression iterations show:**
- ✅ Measurable improvement each pass
- ✅ Increased information density
- ✅ Reduced redundancy
- ✅ Maintained accuracy
- ✅ Enhanced clarity
- ✅ Clear evolution path

**Poor Iterative Compression iterations show:**
- ❌ No meaningful change
- ❌ Loss of important information
- ❌ Decreased clarity
- ❌ Introduced errors
- ❌ Just made it shorter without improvement

## Use Cases

### 1. Content Summarization
Taking long documents and progressively distilling essence

### 2. Message Refinement
Iteratively improving emails, announcements, communications

### 3. Documentation Optimization
Making docs clearer and more concise through iteration

### 4. Explanation Enhancement
Progressively improving how concepts are explained

### 5. Writing Polish
Iterative editing of creative or professional writing

### 6. Presentation Optimization
Refining slides/talks through multiple passes

## Assessment Checklist

When using Iterative Compression:
- [ ] Task benefits from iteration
- [ ] Number of iterations specified
- [ ] Optimization goals are clear
- [ ] Each iteration has purpose
- [ ] Constraints defined for each pass
- [ ] Evolution is tracked/shown
- [ ] Quality criteria established
- [ ] Stopping condition exists
- [ ] Final version is actually better
- [ ] Process improved understanding

## Tips for Success

1. **Start Verbose**: First iteration should be complete, even if wordy
2. **One Focus Per Iteration**: Don't try to improve everything at once
3. **Show Your Work**: Display each iteration to see progress
4. **Set Constraints**: Give specific targets (word counts, focus areas)
5. **Verify Improvement**: Check that each iteration actually improves quality
6. **Don't Over-Iterate**: 3-5 iterations usually sufficient
7. **Preserve Accuracy**: Never sacrifice correctness for brevity
8. **Explain Changes**: Note what improved and why
