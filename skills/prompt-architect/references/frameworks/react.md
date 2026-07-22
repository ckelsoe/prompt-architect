# ReAct Framework

## Overview

ReAct (Reasoning + Acting) is an agentic prompting framework that interleaves reasoning steps with concrete actions. Rather than reasoning once and then acting, ReAct prompts the model to alternate between: thinking about what to do next (Thought), taking a specific action (Action), and observing the result (Observation) — in a cycle until the goal is reached.

ReAct is the framework of choice when the task requires using tools, querying external sources, writing and executing code, or navigating a multi-step process where each step's result informs the next.

**Research basis:** Introduced in "ReAct: Synergizing Reasoning and Acting in Language Models" (Yao et al., arXiv 2210.03629, 2022; ICLR 2023), where grounding a reasoning trace in executed tool calls beat action-only baselines and reduced the fabrication that reasoning-only prompting produced. Those results come from *executed* trajectories — a live tool backend (Wikipedia search and lookup, among others) returned every Observation, and a controller dispatched each Action and fed the real result back into the next step. What this framework ships is a prompt that *specifies* that protocol: it does not implement the tool dispatch, the Observation source, or the loop that carries results forward, and all three must already exist in the environment where the prompt is pasted. Where they do not, there is nothing to act on and the cycle degrades to formatted reasoning — the case the "Avoid ReAct when" guidance below routes away from.

## Components

### Goal
**Purpose:** Define what needs to be achieved — the end state the agent should reach.

### Available Tools
**Purpose:** List what the agent can use to accomplish the goal. This tells the model what actions are possible, and — because the template forbids calling anything not on the list — what it may not do.

Describe each tool only from what the user actually told you. Do not invent inputs or return values they did not state; a tool described with a return value it does not have produces a plan that fails at the first call.

**Common tool types:**
- Search / web lookup
- Code execution
- File read/write
- API calls
- Calculator / computation
- Database queries

### Constraints
**Purpose:** Bound every action with requirements and prohibitions, and — mandatory in this template — name the stop condition.

The `CONSTRAINTS:` block always carries a "Stop and deliver your Final Answer when …" line naming the observable situation that means the goal is reached or cannot be. Without it an agent loop has no terminating condition. An optional hard ceiling on tool calls can be added; delete that line when there is no limit.

### ReAct Cycle
**Purpose:** The repeating Thought → Action → Observation loop.

- **Thought:** Reason about the current state and what to do next
- **Action:** Take a specific, concrete action using an available tool
- **Observation:** The result the tool actually returned — the one component the emitted prompt never authors (see below)
- *(Repeat until goal is reached)*

**The model filling this template must never write an Observation.** An Observation is the output of an executed tool call, produced by the environment at run time. It is not a slot to fill. Writing one produces a fabricated investigation that reads as though it happened — a plausible trace, a confident Final Answer, and no execution behind either.

This overrides the "fill missing elements with reasonable defaults" instruction in SKILL.md step 5. An unfilled Observation is not a missing element awaiting a sensible default; it is a result that cannot exist until something runs. `react_template.txt` carries this ban explicitly. Emit the `Observation:` label with the template's description of what the tool will return, and leave the value to the run.

### Final Answer
**Purpose:** Once the goal is achieved, provide the answer or deliverable.

## Template Structure

Two rules govern this template's labels, and they point in opposite directions:

Section headers (`GOAL:`, `AVAILABLE TOOLS:`, `CONSTRAINTS:`, `APPROACH:`) are stripped at emission, so every header's meaning is carried by the unbracketed prose that ships beneath it. Do not reintroduce header-only structure.

The cycle labels (`Thought:`, `Action:`, `Observation:`, `Final Answer:`) are the exception — they are literal tokens of the ReAct protocol, not headings, and they survive into the emitted prompt exactly as written. Stripping them breaks the loop.

This is the template as shipped in `assets/templates/react_template.txt`:

```
You are an agent that reaches a goal by calling tools, not by answering in one pass from what
you already know. Work in a Thought → Action → Observation loop, letting each real tool result
decide your next step. If the tools below are not actually callable here, stop and say so —
without live tools this protocol is only formatted guesswork, and plain step-by-step reasoning
fits better.

GOAL:
The end state you must reach before you stop:
[A full sentence naming what must be produced or determined. Write it as an outcome, not an
activity.]

AVAILABLE TOOLS:
Do not call any tool that is not named here:
- [tool_name]: [Full sentence on what this tool does and what input it takes, drawn only from
  what the user actually told you — do not invent inputs or return values they did not state.]
- [tool_name]: [Same form, one line per tool the user named. Delete any unused line rather
  than inventing a tool to fill it.]

CONSTRAINTS:
Every action is bound by these rules — each is a requirement or a prohibition, not a
suggestion:
- [A self-contained imperative, e.g. "Base every conclusion on data you actually retrieved."
  Phrase restrictions as "Do not…" or "Never…" so each prohibition stands on its own line.]
- Stop and deliver your Final Answer when [full clause naming the observable situation that
  means the goal is reached, or that it cannot be].
- [Optional — a hard ceiling as a full sentence, e.g. "Make no more than 8 tool calls in
  total." Delete this line if there is no limit.]

APPROACH:
Repeat this cycle until the goal is reached, each step on its own line starting with its
label. Replace each description below with your actual content:

Thought: your reasoning about where things stand and what to do next
Action: the tool name, then an em dash, then the exact input you are passing to that tool
Observation: the exact result that tool returned

When the cycle has stopped, write this one line, one time only:

Final Answer: the deliverable the goal asked for, supported by what your Observations showed

Rules for the cycle:
- Every Action must name one tool from the list above, never prose — e.g. Action:
  search_docs — "token refresh policy"
- Take ONE action at a time, then wait for its real Observation before continuing; each
  Thought must respond to the Observation directly before it.
- Never write an Observation yourself. An Observation is the actual output of an actual tool
  call. Inventing one produces a fabricated investigation that reads as though it happened.
- "Thought:", "Action:", "Observation:" and "Final Answer:" are literal labels in this
  protocol, not headings — keep them exactly as written.
```

Note what the emitted prompt ends with: the cycle *instructions*. It does not contain a filled-in cycle. The three lines under `APPROACH:` are descriptions of what each label should carry once the agent runs — they are not a first turn to be completed on the user's behalf.

## Complete Examples

**Read these as two separate things.** Each example shows the prompt that gets emitted, and then — separately — a transcript of a run that already happened in an environment with live tools. The transcripts are illustrations of a completed run, not part of the deliverable. Every `Observation:` in them is a value a real tool returned; none was written by the model that composed the prompt.

When you emit a ReAct prompt, you emit the first block only. The trace is what the run produces afterward. Writing a trace into the prompt is the failure mode the template's Observation ban exists to prevent.

The `APPROACH:` bodies below are abbreviated for readability — the real emitted prompt carries the full cycle instructions and "Rules for the cycle" block verbatim from Template Structure above.

### Example 1: Research Task (Agentic)

**Before ReAct:**
"Find out which JavaScript framework is most popular right now."

**After ReAct — the emitted prompt:**
```
You are an agent that reaches a goal by calling tools, not by answering in one pass from
what you already know. [...framing paragraph as in Template Structure...]

GOAL:
The end state you must reach before you stop:
Determine which JavaScript frontend framework has the highest current adoption, and
produce a brief evidence-based recommendation for a new project.

AVAILABLE TOOLS:
Do not call any tool that is not named here:
- web_search: Searches the web for a query string and returns result snippets with their
  source URLs.
- fetch_page: Retrieves the full text content of a single URL you pass to it.

CONSTRAINTS:
Every action is bound by these rules — each is a requirement or a prohibition, not a
suggestion:
- Base every conclusion on data you actually retrieved.
- Prioritize data published within the last 12 months.
- Never rely on a single survey.
- Stop and deliver your Final Answer when at least two independent sources agree on a
  ranking, or when you have established that they disagree irreconcilably.

APPROACH:
[...cycle instructions and "Rules for the cycle" block, verbatim from the template...]
```

**The run that followed** — transcript, tools live; each Observation is what the tool returned:
```
Thought: I need current data on JS framework popularity. I'll start with the Stack
Overflow Developer Survey and corroborate against npm download stats.
Action: web_search — "JavaScript framework popularity Stack Overflow developer survey"
Observation: Snippets from the survey's web-frameworks section, with React ahead of
Angular and Vue among all respondents, plus the survey methodology page.

Thought: That is one source, and the constraint forbids relying on a single survey.
Download volume is an independent signal, so I will check npm next.
Action: web_search — "React vs Vue vs Angular npm downloads"
Observation: npm trends comparison showing weekly download counts for the three
packages over the trailing year.

Thought: Two independent sources now agree on the ordering. The stop condition is met.

Final Answer: Based on [sources], React leads in adoption at X%, followed by...
```

### Example 2: Debugging with Tool Use

**Before ReAct:**
"Debug why the tests are failing."

**After ReAct — the emitted prompt:**
```
You are an agent that reaches a goal by calling tools, not by answering in one pass from
what you already know. [...framing paragraph as in Template Structure...]

GOAL:
The end state you must reach before you stop:
Identify and fix the root cause of the 3 failing unit tests in auth.test.js, which began
failing after the auth module refactor.

AVAILABLE TOOLS:
Do not call any tool that is not named here:
- read_file: Takes a path and returns the full contents of that file from the codebase.
- run_tests: Takes a test file path, executes that suite, and returns the pass/fail
  output with error text.
- search_code: Takes a string and returns every location in the codebase where it appears.

CONSTRAINTS:
Every action is bound by these rules — each is a requirement or a prohibition, not a
suggestion:
- Fix the root cause, not the symptom.
- Do not change test code unless you have established the tests themselves are wrong.
- Never report a fix you have not verified by re-running the suite.
- Stop and deliver your Final Answer when run_tests reports all 3 tests passing, or when
  you have determined the fix requires information not available through these tools.

APPROACH:
[...cycle instructions and "Rules for the cycle" block, verbatim from the template...]
```

**The run that followed** — transcript, tools live; each Observation is what the tool returned:
```
Thought: I need to understand what the tests expect before I look at the implementation.
Action: read_file — auth.test.js
Observation: The three test cases, each calling auth.validateToken(token) with a
different fixture.

Thought: The tests call `auth.validateToken(token)`. The refactor PR description
mentions a rename, so I should check what the implementation exports now.
Action: read_file — auth.js
Observation: The module exports verifyToken; no validateToken export remains.

Thought: Confirmed — the function was renamed to `auth.verifyToken()` and the tests use
the old name. I need to know whether this was an intentional API change or an oversight,
which depends on whether other callers were updated.
Action: search_code — "validateToken"
Observation: Three call sites outside the test file, all still using the old name.

Thought: validateToken is used in 3 other places that were never updated. This is a
breaking rename, not an intentional API change — the tests are correct and the
implementation changed names without updating its callers. I will restore the original
name and add the new one as an alias, then verify.
Action: run_tests — auth.test.js
Observation: 3 passed, 0 failed.

Final Answer: Root cause was a function rename in auth.js that broke all callers.
Restored the original function name and added `verifyToken` as an alias for forward
compatibility. Verified by run_tests: all 3 tests pass.
```

### Example 3: Data Investigation

**Before ReAct:**
"Why are sales down this month?"

**After ReAct — the emitted prompt:**
```
You are an agent that reaches a goal by calling tools, not by answering in one pass from
what you already know. [...framing paragraph as in Template Structure...]

GOAL:
The end state you must reach before you stop:
Produce a ranked list of the factors driving the 23% month-over-month sales decline this
quarter, each supported by the data that establishes it.

AVAILABLE TOOLS:
Do not call any tool that is not named here:
- query_database: Takes a SQL query and runs it against the sales database, returning the
  result rows.
- fetch_analytics: Takes a metric name and date range and returns that series from the
  analytics dashboard.
- read_file: Takes a path and returns the contents of an exported report or CSV.

CONSTRAINTS:
Every action is bound by these rules — each is a requirement or a prohibition, not a
suggestion:
- Base every conclusion on data you actually retrieved.
- Consider at least 3 potential causes before concluding.
- Do not present a cause as established when the data only makes it plausible; say which
  it is.
- If the available data is insufficient to conclude, state exactly what additional data
  is needed rather than closing the gap with an assumption.
- Stop and deliver your Final Answer when you can rank the causes by supported effect
  size, or when you have established which data you are missing.

APPROACH:
[...cycle instructions and "Rules for the cycle" block, verbatim from the template...]
```

**The run that followed** — transcript, tools live; each Observation is what the tool returned:
```
Thought: A 23% decline is large enough to have a dominant cause. I should first
establish whether it is volume, order value, or both, and whether it is spread across
segments or concentrated in one.
Action: query_database — "SELECT COUNT(*), AVG(order_value), segment FROM orders
WHERE month IN (current, previous) GROUP BY segment, month"
Observation: Order count down 18% overall; average order value down 5%; the drop is
concentrated in the Enterprise segment, with SMB roughly flat.

Thought: So this is mostly a volume problem in one segment, not a pricing problem
across the book. Fewer Enterprise orders could be lost acquisition or lost accounts, and
those have different fixes, so I need to separate them.
Action: query_database — "SELECT new_customers, churned_customers, segment FROM
customer_events WHERE period = last_30_days"
Observation: Enterprise churn roughly 3x the trailing average; new Enterprise customers
near normal.

Thought: Churn, not acquisition. Before ranking causes I need to know whether the weakness
is confined to existing Enterprise accounts or also shows at the top of the funnel, so I
will pull conversion over a window wide enough to place the churn spike inside it.
Action: fetch_analytics — "trial_to_paid_conversion, last 90 days"
Observation: Conversion down 12% over the window, with the decline beginning in the same
week as the churn spike.

Final Answer: Ranked by supported effect size.
1. Enterprise churn — established. Churn ran roughly 3x the trailing average while new
   Enterprise customers stayed near normal, and the order-count drop is concentrated in
   that same segment. This is the bulk of the 18% volume decline.
2. Trial-to-paid conversion — established. Down 12% across the 90-day window.
3. Average order value — established but minor. Down 5% overall; too small to account for
   a 23% total decline on its own. I did not break this figure out by segment.

The churn spike and the conversion decline begin in the same week. That timing makes a
single underlying cause plausible, not established: nothing I retrieved identifies what
changed in that window. Confirming it requires the product and pricing change log for
those dates joined to the churned account list, which none of these three tools expose.
```

## Best Use Cases

1. **Agentic / Tool-Use Tasks**
   - Tasks where the model needs to use tools iteratively
   - Research with multiple lookups
   - Debugging with read-test-fix cycles

2. **Multi-Step Investigation**
   - Data investigation where each finding informs the next query
   - Root cause analysis
   - Audit tasks

3. **Autonomous Task Execution**
   - Tasks that should complete without human intervention per step
   - Workflows that use Claude Code's tool ecosystem

4. **When the Path Is Unknown**
   - Tasks where you can't specify every step upfront
   - Exploratory analysis
   - Open-ended problem-solving with tools

## Selection Criteria

**Choose ReAct when:**
- ✅ Tools or external resources will be used
- ✅ Each step's result determines the next step
- ✅ The path to solution is not fully known upfront
- ✅ Reasoning should be shown alongside actions
- ✅ Task is agentic in nature

**Avoid ReAct when:**
- ❌ Task has a fixed, known sequence of steps → use RISEN
- ❌ No tools needed, just reasoning → use Chain of Thought
- ❌ Creative or writing task → use CO-STAR or BAB
- ❌ Simple, well-defined → use RTF, APE, or CTF

## ReAct vs. Chain of Thought vs. RISEN

| | Chain of Thought | RISEN | ReAct |
|---|---|---|---|
| Structure | Linear reasoning steps | Defined methodology | Thought-Action-Observation cycles |
| Tool use | No | No | Yes |
| Path known upfront? | Yes | Yes | No (emergent) |
| Best for | Complex reasoning | Multi-step procedures | Agentic tool use |

## Writing Good ReAct Prompts

### Goals Should Be Outcome-Focused
```
✅ "Identify the root cause of the auth failures and produce a fix"
❌ "Look at the auth code"
```

### Tools Should Be Named and Described

A full sentence naming what the tool does *and what input it takes*. A verb fragment omits the
input, so the agent has to guess how to call it:
```
✅ - run_tests: Takes a test file path, executes that suite, and returns the pass/fail output
     with error text.
❌ - run_tests: Execute the test suite and return pass/fail results with error output
❌ - testing tool
```
Draw the description only from what the user actually told you. A tool documented with an input
or a return value it does not have produces a plan that fails at the first call.

### Constraints Prevent Loops
```
✅ "If you cannot confirm a hypothesis after 3 tool calls, state it as unconfirmed and move on"
❌ (no constraints — model may loop indefinitely)
```

### Include a Stop Condition

Write it as the template's mandatory line — the full imperative, not a label standing in for one:
```
✅ "Stop and deliver your Final Answer when run_tests reports the suite passing, or when you
   have determined the fix requires information not available through these tools."
❌ "Stop when: fix confirmed or blocked"
```
The ❌ form leaves the label carrying the meaning. `Stop when:` is a heading; the agent needs a
sentence it can act on, naming the observable situation that ends the loop.

## Common Mistakes

1. **Specifying Every Step**
   - If you know all the steps, use RISEN instead
   - ReAct is for when the path is emergent

2. **No Tool List**
   - Without knowing what tools are available, the model invents them
   - Always list available tools explicitly

3. **No Constraints**
   - Unconstrained ReAct can loop or over-explore
   - Add max iterations or a stop condition

4. **Using ReAct for Static Tasks**
   - If no tools are needed, Chain of Thought is simpler and more effective

5. **Writing Observations Into the Prompt**
   - The single most damaging mistake this framework invites, because the result looks like success
   - An Observation is a returned value, not a slot — filling one in fabricates a run
   - The output reads as an executed investigation: real-looking results, a confident Final Answer, nothing behind either
   - Emit the `Observation:` label and its description; the value belongs to the run

6. **Emitting a Completed Cycle**
   - The prompt ends with the cycle *instructions*, not a worked first turn
   - A pre-filled Thought/Action pair also pre-commits the agent to a path before it has seen any real result, which is the opposite of what ReAct is for

## Quick Reference

| Component | Focus | Key Question |
|-----------|-------|--------------|
| Goal | End state | "What does success look like?" |
| Tools | Available actions | "What can the agent do?" |
| Constraints | Rules and stop condition | "What is forbidden, and when does it stop?" |
| Thought | Reasoning | "What should I do next and why?" |
| Action | Tool use | "What specific action to take?" |
| Observation | Returned result — **never authored by the prompt** | "What did the tool actually return?" |
| Final Answer | Deliverable | "Goal achieved — what's the answer?" |
