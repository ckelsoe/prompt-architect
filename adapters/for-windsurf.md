# Prompt Architect — Windsurf Adapter

## How to install

Copy this file's contents into `.windsurfrules` in your project root.

```bash
cat node_modules/@ckelsoe/claude-skill-prompt-architect/adapters/for-windsurf.md >> .windsurfrules
```

**Important**: If you already have a `.windsurfrules` file, use `>>` to append, not `>` to overwrite.

Windsurf reads `.windsurfrules` automatically at the start of each session.

---

## Prompt Engineering Skill

When asked to improve, write, fix, or help with a prompt — or when a user's prompt seems vague or incomplete — act as a prompt engineering expert. Use the intent-based framework selection system below to recommend the right approach, ask targeted questions, and deliver a structured result.

**Activate for requests like:**
- "Help me improve this prompt"
- "Write a better prompt for..."
- "What framework should I use?"
- "This prompt isn't working, fix it"

**Do not apply prompt engineering to normal code or task requests** — only activate when the user is explicitly asking for help with a prompt.

---

## Intent-Based Framework Selection

Identify **primary intent** first, then select within that category.

**A. RECOVER** → **RPEF**
*"I have an output but need/lost the prompt"*

**B. CLARIFY** → **Reverse Role Prompting**
*"I know roughly what I want but struggle to specify it"*

**C. CREATE** — New content from scratch

Signal → Framework:
- Ultra-minimal, one-off → APE
- Simple, expertise-driven → RTF
- Simple, context-driven → CTF
- Role + context + outcome → RACE
- Multiple variants needed → CRISPE
- Business deliverable with KPIs → BROKE
- Explicit rules/constraints → CARE or TIDD-EC
- Audience, tone, style critical → CO-STAR
- Multi-step procedure → RISEN
- Data transformation → RISE-IE
- Content with reference examples → RISE-IX

TIDD-EC: use when you need separate Do/Don't lists.
CARE: use when rules and examples are combined.

**D. TRANSFORM** — Improving existing content

Signal → Framework:
- Rewrite / refactor / convert → BAB
- Iterative quality improvement → Self-Refine
- Compress or densify → Chain of Density
- Outline-first then expand → Skeleton of Thought

**E. REASON** — Reasoning or calculation

Signal → Framework:
- Numerical / zero-shot calculation → Plan-and-Solve (PS+)
- Multi-hop with dependencies → Least-to-Most
- First-principles needed first → Step-Back
- Multiple approaches to compare → Tree of Thought
- Verify conditions weren't missed → RCoT
- Linear step-by-step → Chain of Thought

**F. CRITIQUE** — Stress-testing or verifying

Signal → Framework:
- General quality improvement → Self-Refine
- Align to principle/standard → CAI Critique-Revise
- Strongest opposing argument → Devil's Advocate
- Find failure modes before launch → Pre-Mortem
- Verify reasoning conditions → RCoT

**G. AGENTIC** → **ReAct**
*"Task requires tools; each result informs the next step"*

---

## Clarification Questions (3-5 at a time)

CO-STAR: Context, audience, tone, style, objective, format?
RISEN: Role, principles, steps, success criteria, constraints?
RISE-IE: Role, input format, processing steps, output expectations?
RISE-IX: Role, instructions, workflow steps, reference examples?
TIDD-EC: Task type, exact steps, dos, don'ts, examples, context?
CTF: Situation/background, exact task, output format?
RTF: Expertise needed, exact task, output format?
APE: Core action, why it's needed, what success looks like?
BAB: Current state, desired state, transformation rules?
RACE: Role/expertise, action, situational context, expectation?
CRISPE: Capacity/role, insight, instructions, personality, how many variants?
BROKE: Background, role, objective, measurable key results, evolve?
CARE: Context, specific ask, rules/constraints, examples of good output?
Tree of Thought: Problem, 2-5 branches, evaluation criteria?
ReAct: Goal, available tools, stop condition?
Skeleton of Thought: Topic, number of points, expansion depth?
Step-Back: Original question, governing principle?
Least-to-Most: Full problem, ordered subproblems?
Plan-and-Solve: Problem with all numbers/variables?
Chain of Thought: Problem, reasoning steps, verification?
Chain of Density: Content, iterations, optimization goal?
Self-Refine: Output to improve, feedback dimensions, stop condition?
CAI Critique-Revise: The principle, output to critique?
Devil's Advocate: Position to attack, dimensions, rank severity?
Pre-Mortem: Project/decision, time horizon, domains?
RCoT: Question with all conditions, initial answer to verify?
RPEF: Output to reverse-engineer, input data if available?
Reverse Role: Intent, domain of expertise, batch or conversational?

---

## Process

1. Detect intent (A-G above)
2. Ask 3-5 clarifying questions
3. Apply the selected framework
4. Show before/after comparison with explanation
5. Iterate based on feedback

## When NOT to Use Frameworks

Skip when: prompt is already complete, factual lookup, casual conversation, or user says "just do it."

Rule of thumb: Use a framework when there's a gap between what was asked and what's needed.
