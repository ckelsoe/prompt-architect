# CoVe (Chain-of-Verification)

## Overview

Chain-of-Verification (CoVe) is a verification framework that reduces hallucinated facts by making the model check its own draft against answers it produces without looking at that draft. The model first writes a baseline response, then plans a set of targeted verification questions aimed at the discrete factual claims the draft makes, then answers those questions independently — crucially without reference to the baseline — and finally regenerates the response, correcting anything the independent answers contradicted. The whole procedure fits inside a single pasted prompt: one response that walks through all four steps in order.

**Origin:** Dhuliawala et al., "Chain-of-Verification Reduces Hallucination in Large Language Models" (arXiv 2309.11495). First posted as a preprint in September 2023, it was published in the **Findings of the Association for Computational Linguistics: ACL 2024** (anthology id 2024.findings-acl.212) — so cite the venue as Findings of ACL **2024**, not 2023. The work is a collaboration: the first author holds a dual affiliation with **ETH Zürich** alongside Meta AI, so it is not accurate to credit Meta AI alone. Note also that the paper's **abstract contains no numbers** — it states qualitatively that CoVe decreases hallucinations across tasks. The frequently quoted precision improvement on list-based Wikidata questions (0.17 to 0.36 for Llama 65B) is a **body figure from the experiments**, not an abstract claim; only present it as a body/table result, and do not attach it to the abstract.

## Why CoVe Works

Hallucinated facts in a baseline draft are internally consistent and fluent, which is exactly why re-reading the draft does not catch them — the model that wrote the error will happily reaffirm it when asked to review its own text. CoVe breaks that loop by structural means rather than by asking harder:

- The draft is decomposed into discrete factual claims, each of which becomes a short, answerable verification question.
- Each verification question is answered **on its own**, not conditioned on the draft, so the model retrieves the fact fresh instead of echoing what it already wrote.
- The regenerated answer is forced to reconcile with those independent answers, so contradictions surface as edits.

**The independence of the verification step is the entire mechanism.** If the model answers the verification questions while looking at the baseline, it tends to repeat the baseline's errors — the check collapses into agreement with the thing being checked. The paper studies factored variants (answering verifications separately from the original draft) precisely to preserve this independence, and reports the largest gains when the verification answers are not conditioned on the initial response.

**Limitation:** CoVe targets hallucinated facts — fabricated names, dates, quantities, citations, list members. It is weaker on reasoning that is factually grounded but logically flawed, and it cannot verify a claim the model has no better knowledge of on the second pass than the first.

## Distinction from RCoT

CoVe and RCoT are both verification frameworks in this package, and they address different failure modes with different mechanisms. Keep them separate:

- **RCoT verifies reasoning.** It reconstructs the original question from a candidate answer and cross-checks the reconstruction against the actual question to find overlooked conditions, misinterpreted constraints, and unstated assumptions. Its failure mode is a *missed condition*.
- **CoVe verifies facts.** It drafts an answer, generates targeted verification questions about the claims in that draft, answers them independently, and revises. Its failure mode is a *hallucinated fact*.

Put plainly: RCoT asks "what question would produce this answer, and does it match what was actually asked?" CoVe asks "which specific claims did I just assert, are they individually true when I check each one cold, and what must change?" Reach for RCoT on multi-condition logic and constraint problems; reach for CoVe on fact-dense output like biographies, entity lists, and cited summaries.

## Components

### Baseline Response
**Purpose:** Draft an initial answer to the question. This draft is expected to be fluent and may contain hallucinated facts — it is the material to be checked, not the final output.

### Plan Verification Questions
**Purpose:** Break the draft into its discrete factual claims and turn each into a short, self-contained fact-checking question. Good verification questions are answerable on their own and target one claim each ("In what year was X founded?"), not the draft's conclusion as a whole.

**Trigger:** *"List the specific factual claims your draft makes, then write one short verification question for each claim."*

### Answer Verifications Independently
**Purpose:** Answer every verification question on its own terms, **without** consulting the baseline draft. This is the step that does the work: answering cold prevents the model from biasing the verification into simply confirming what it already wrote.

**Trigger:** *"Answer each verification question independently. Do not look back at your draft while answering — answer as if seeing each question fresh."*

### Final Verified Response
**Purpose:** Regenerate the answer, keeping what the independent answers confirmed and correcting anything they contradicted. Discrepancies between the draft and the independent answers become explicit edits.

## Template Structure

Section headers are stripped at emission, so every instruction below has to carry its meaning in prose — the model receives flat text, not a labeled form. The independence requirement is the one thing most easily lost when the `ANSWER VERIFICATIONS` header disappears, so it is written as an explicit "Do not…" sentence inside the step itself, where it survives stripping.

```
SOURCE MATERIAL:
[Optional — paste the draft answer you want fact-checked here, OR the factual
question you want answered with verification built in. If you are asking a fresh
question rather than checking an existing draft, delete this bracketed block and
the sentence directly below it.]
Treat the material above as the subject to be verified in the steps below.

Work through the following four steps in order, in a single response.

First, write a baseline answer to the question. Do not polish it — this draft is
what you will fact-check.

Second, list the specific factual claims your draft makes (names, dates,
quantities, entities, list members), and write one short verification question
for each claim.

Third, answer each verification question independently. Do not look back at your
draft while answering these questions — answer each one on its own, as if seeing
it fresh, so your checks are not biased into agreeing with the draft.

Fourth, write a final verified answer. Keep every claim your independent answers
confirmed, correct every claim they contradicted, and drop any claim you could
not verify. Note briefly what changed from the draft.
```

The `SOURCE MATERIAL` block carries no step number because it is optional and holds either of two things: an existing draft to be checked, or the factual question to be answered from scratch with verification built in. When it holds a draft, the first step reviews that draft rather than writing a new one. When there is no draft, delete the block and the sentence beneath it, and the model produces its own baseline in step one.

## Complete Examples

Every example below is shown in emitted form: the step headers are gone and each instruction carries its own role in prose, so nothing is lost when the scaffolding is deleted.

### Example 1: Fact-Checking an Existing Draft (source material supplied)

**Before CoVe:**
"Is this bio accurate?"

**After CoVe:**
```
SOURCE MATERIAL:
[Paste the draft biography you want fact-checked here]
Treat the material above as the subject to be verified in the steps below.

Work through the following four steps in order, in a single response.

First, treat the draft above as your baseline answer.

Second, list the specific factual claims the draft makes — every name, date,
title, place, and quantity — and write one short verification question for each.

Third, answer each verification question independently. Do not look back at the
draft while answering — answer each question on its own so your checks are not
biased into confirming what the draft already says.

Fourth, write a corrected version of the bio: keep every claim your independent
answers confirmed, fix every claim they contradicted, and remove any claim you
could not verify. List what you changed.
```

### Example 2: Named-Entity List Question (no source material)

**Before CoVe:**
"Name some politicians born in New York City."

**After CoVe** (no source material — the answer is generated from scratch, so the
`SOURCE MATERIAL` block and the sentence below it are both deleted):
```
Work through the following four steps in order, in a single response.

First, write a baseline answer listing politicians born in New York City. Do not
polish it — this draft is what you will fact-check.

Second, for each name on your list, write one short verification question of the
form "Was [name] born in New York City?"

Third, answer each verification question independently. Do not look back at your
list while answering — answer each question on its own, so a wrong name on the
draft does not get waved through.

Fourth, write a final list that keeps only the names your independent answers
confirmed were born in New York City, and drop the rest. Note which names you
removed and why.
```

### Example 3: Cited Factual Summary (source material supplied)

**Before CoVe:**
"Summarize this article and make sure the numbers are right."

**After CoVe:**
```
SOURCE MATERIAL:
[Paste the article you want summarized here]
Treat the material above as the subject to be verified in the steps below.

Work through the following four steps in order, in a single response.

First, write a baseline summary of the article above, including its key figures,
dates, and named parties.

Second, list every factual claim in your summary — each figure, date, and name —
and write one short verification question for each that can be checked against
the article.

Third, answer each verification question independently by locating the supporting
passage in the article. Do not answer from your summary — answer from the source,
so a number you misremembered while summarizing gets caught.

Fourth, write a final summary in which every figure, date, and name matches what
you verified against the article. Flag anything the article does not actually
state.
```

## Best Use Cases

1. **Fact-Dense Generation**
   - Biographies, company profiles, historical summaries
   - Anything where fabricated names, dates, or quantities are the main risk

2. **List and Entity Questions**
   - "Name all X that Y" questions, where the paper shows the clearest gains
   - Each list member becomes its own cheap verification question

3. **Cited or Sourced Summaries**
   - Summaries whose figures must match a supplied document
   - Verification questions check each figure against the source

4. **A Verification Layer for Draft Output**
   - Drop CoVe in after any first-pass factual draft
   - Especially before publishing or sending fact-heavy text

## Selection Criteria

**Choose CoVe when:**
- ✅ The output is fact-dense and hallucinated details are the main risk
- ✅ The claims decompose into discrete, individually checkable questions
- ✅ You are checking a draft you already have, or generating one you don't trust
- ✅ The model plausibly knows each fact better in isolation than buried in a paragraph

**Avoid CoVe when:**
- ❌ The failure mode is a missed condition or constraint → use RCoT
- ❌ The task is reasoning or arithmetic, not factual recall → use Plan-and-Solve or CoT
- ❌ Facts genuinely require external lookup the model cannot do → use a tool-grounded method (CRITIC)
- ❌ The task is creative or generative with no facts to verify

## CoVe vs. Other Verification Frameworks

| | CoVe | RCoT | Self-Refine | CRITIC |
|---|---|---|---|---|
| Verifies | Facts | Reasoning conditions | General quality | Facts (tool-grounded) |
| Failure mode caught | Hallucinated facts | Overlooked conditions | Vague weaknesses | Hallucinated facts |
| Mechanism | Independent re-answering of claims | Question reconstruction | Self-critique then revise | External tool checks |
| Key requirement | Verification not conditioned on draft | Reconstruct without re-reading question | Honest self-critique | Access to tools |
| Fits one prompt? | Yes | Yes | Yes | No (needs tool calls) |

## Common Mistakes

1. **Letting the verification see the draft**
   - This is the cardinal error — if the model answers verification questions while looking at its draft, it confirms its own hallucinations
   - The "Do not look back at your draft" instruction is load-bearing; do not drop it

2. **Verification questions that are too broad**
   - "Is this bio accurate?" is not a verification question — it just re-asks the whole task
   - Each question must target one discrete claim: one name, one date, one figure

3. **Skipping the correction step**
   - Finding contradictions is not the goal; fixing them is
   - The final answer must reconcile with the independent answers, not just report the mismatch

4. **Using CoVe where facts aren't the risk**
   - On reasoning or constraint problems, CoVe's questions have nothing factual to grip; RCoT fits those

## Quick Reference

| Step | Purpose |
|------|---------|
| Baseline Response | Draft an initial answer (may contain hallucinations) |
| Plan Verification Questions | Turn each discrete claim into a short fact-check question |
| Answer Independently | Answer each question cold — not conditioned on the draft |
| Final Verified Response | Regenerate, correcting whatever the checks contradicted |
