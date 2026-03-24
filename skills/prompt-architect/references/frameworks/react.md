# ReAct Framework

## Overview

ReAct (Reasoning + Acting) is an agentic prompting framework that interleaves reasoning steps with concrete actions. Rather than reasoning once and then acting, ReAct prompts the model to alternate between: thinking about what to do next (Thought), taking a specific action (Action), and observing the result (Observation) — in a cycle until the goal is reached.

ReAct is the framework of choice when the task requires using tools, querying external sources, writing and executing code, or navigating a multi-step process where each step's result informs the next.

**Research basis:** Introduced in "ReAct: Synergizing Reasoning and Acting in Language Models" (Yao et al., 2022).

## Components

### Goal
**Purpose:** Define what needs to be achieved — the end state the agent should reach.

### Tools / Resources Available
**Purpose:** List what the agent can use to accomplish the goal. This tells the model what actions are possible.

**Common tool types:**
- Search / web lookup
- Code execution
- File read/write
- API calls
- Calculator / computation
- Database queries

### ReAct Cycle
**Purpose:** The repeating Thought → Action → Observation loop.

- **Thought:** Reason about the current state and what to do next
- **Action:** Take a specific, concrete action using an available tool
- **Observation:** Record the result of the action
- *(Repeat until goal is reached)*

### Final Answer
**Purpose:** Once the goal is achieved, provide the answer or deliverable.

## Template Structure

```
GOAL:
[What needs to be achieved — the end state]

AVAILABLE TOOLS:
- [Tool 1]: [What it does]
- [Tool 2]: [What it does]
- [Tool 3]: [What it does]

CONSTRAINTS:
- [Any rules, limits, or guardrails on actions]

APPROACH:
Use the Thought → Action → Observation cycle:

Thought: [Reason about current state and next step]
Action: [Tool name] — [specific query or operation]
Observation: [Result of the action]

Thought: [Reason about observation and what to do next]
Action: [Tool name] — [next operation]
Observation: [Result]

[Continue until goal is reached]

Final Answer: [Deliver the result]
```

## Complete Examples

### Example 1: Research Task (Agentic)

**Before ReAct:**
"Find out which JavaScript framework is most popular right now."

**After ReAct:**
```
GOAL:
Determine which JavaScript frontend framework has the highest current adoption
and provide a brief evidence-based recommendation for a new project.

AVAILABLE TOOLS:
- web_search: Search for current information
- fetch_page: Retrieve content from a specific URL

CONSTRAINTS:
- Use at least 2 independent sources
- Prioritize data from the last 12 months
- Do not rely on a single survey

APPROACH:
Thought: I need current data on JS framework popularity. I'll start with
the Stack Overflow Developer Survey and npm download stats.

Action: web_search — "JavaScript framework popularity 2024 Stack Overflow survey"
Observation: [Search results]

Thought: Found Stack Overflow survey data. Let me also check npm trends for
download numbers to corroborate.

Action: web_search — "React vs Vue vs Angular npm downloads 2024"
Observation: [Search results]

Thought: I have data from two sources. Let me synthesize the findings.

Final Answer: Based on [sources], React leads in adoption at X%, followed by...
```

### Example 2: Debugging with Tool Use

**Before ReAct:**
"Debug why the tests are failing."

**After ReAct:**
```
GOAL:
Identify and fix the root cause of the failing unit tests in the auth module.
All 3 tests in auth.test.js are failing after the refactor.

AVAILABLE TOOLS:
- read_file: Read any file in the codebase
- run_tests: Execute test suite and return output
- search_code: Search codebase for patterns

CONSTRAINTS:
- Fix the root cause, not the symptoms
- Do not change test code unless tests themselves are wrong
- Verify fix by running tests again after changes

APPROACH:
Thought: I need to understand what the tests expect before I look at the implementation.

Action: read_file — auth.test.js
Observation: [File contents]

Thought: Tests are calling `auth.validateToken(token)` but based on the refactor
PR description, the function was renamed. Let me check the new implementation.

Action: read_file — auth.js
Observation: [File contents]

Thought: Confirmed — function was renamed to `auth.verifyToken()`. Tests use old name.
Let me check if this was an intentional API change or a mistake.

Action: search_code — "validateToken"
Observation: [All usages across codebase]

Thought: validateToken is used in 3 other places too. This is a breaking rename.
The tests are correct — the implementation changed names without updating callers.
I'll restore the original name in the implementation and add an alias if needed.

[Apply fix]

Action: run_tests — auth.test.js
Observation: All 3 tests passing.

Final Answer: Root cause was function rename in auth.js that broke all callers.
Restored original function name and added `verifyToken` as an alias for forward
compatibility.
```

### Example 3: Data Investigation

**Before ReAct:**
"Why are sales down this month?"

**After ReAct:**
```
GOAL:
Identify the primary factor(s) driving the 23% month-over-month decline in
sales this quarter. Provide a ranked list of likely causes with supporting data.

AVAILABLE TOOLS:
- query_database: Run SQL queries against the sales database
- fetch_analytics: Pull data from the analytics dashboard
- read_file: Read exported reports and CSV files

CONSTRAINTS:
- Base conclusions on data, not assumptions
- Consider at least 3 potential causes before concluding
- If data is insufficient to conclude, state what additional data is needed

APPROACH:
Thought: 23% decline is significant. I should check whether it's volume (fewer
orders), value (smaller orders), or both. Also check if it's across all segments
or concentrated.

Action: query_database — "SELECT COUNT(*), AVG(order_value), segment FROM orders
WHERE month = current AND month = previous GROUP BY segment"
Observation: [Query results]

Thought: Volume is down 18% but average order value is down only 5%. The decline
is concentrated in the Enterprise segment. Let me check acquisition vs. churn.

Action: query_database — "SELECT new_customers, churned_customers, segment FROM
customer_events WHERE period = last_30_days"
Observation: [Query results]

Thought: Enterprise churn is 3x normal. Let me check if there's a product or
pricing event that coincides.

[Continue investigation...]

Final Answer: Primary driver is Enterprise churn (elevated 3x), concentrated
in accounts that received the new pricing email on [date]. Secondary factor is
reduced trial-to-paid conversion, down 12%.
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
```
✅ - run_tests: Execute the test suite and return pass/fail results with error output
❌ - testing tool
```

### Constraints Prevent Loops
```
✅ "If you cannot confirm a hypothesis after 3 tool calls, state it as unconfirmed and move on"
❌ (no constraints — model may loop indefinitely)
```

### Include a Stop Condition
```
✅ "Stop when: the fix is confirmed by passing tests OR you've determined the fix requires information not available to you"
```

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

## Quick Reference

| Component | Focus | Key Question |
|-----------|-------|--------------|
| Goal | End state | "What does success look like?" |
| Tools | Available actions | "What can the agent do?" |
| Thought | Reasoning | "What should I do next and why?" |
| Action | Tool use | "What specific action to take?" |
| Observation | Result | "What happened?" |
| Final Answer | Deliverable | "Goal achieved — what's the answer?" |
