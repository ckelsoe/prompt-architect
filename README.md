# Claude Code Skill: Prompt Architect

Transform vague prompts into expert-level, structured prompts using 13 research-backed frameworks.

A comprehensive skill that analyzes, architects, and iteratively refines prompts through systematic framework application and guided dialogue.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Example Transformation](#example-transformation)
- [Supported Frameworks](#supported-frameworks)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [Framework Selection Guide](#framework-selection-guide)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Prompt Architect is a production-ready Claude Code Skill that elevates your prompting capabilities through:

- **Intelligent Analysis** - Evaluates prompts across 5 quality dimensions (clarity, specificity, context, completeness, structure)
- **Framework Recommendation** - Suggests the best framework(s) for your specific use case with clear reasoning
- **Guided Dialogue** - Asks targeted clarifying questions to gather missing information progressively
- **Systematic Application** - Applies selected framework to transform your prompt
- **Iterative Refinement** - Continues improving based on feedback until perfect

**Target Audience:**
- Developers using Claude Code for software engineering tasks
- Prompt engineers optimizing LLM interactions
- AI practitioners seeking systematic prompt improvement
- Teams wanting consistent, high-quality prompts

---

## Key Features

### 13 Research-Backed Frameworks

| Framework | Best For | Complexity |
|-----------|----------|------------|
| **CO-STAR** | Content creation, writing tasks | High |
| **RISEN** | Multi-step processes, procedures | High |
| **RISE-IE** | Data analysis, transformations (Input-Expectation) | Medium |
| **RISE-IX** | Content creation with examples (Instructions-Examples) | Medium |
| **TIDD-EC** | High-precision tasks with explicit dos/don'ts | Medium |
| **RACE** | Expert tasks requiring role + context + outcome clarity | Medium |
| **CTF** | Simple tasks where situational context drives the prompt | Low |
| **RTF** | Simple, focused tasks where expertise framing matters | Low |
| **APE** | Ultra-minimal one-off prompts | Low |
| **BAB** | Rewriting, refactoring, transforming existing content | Low |
| **Tree of Thought** | Decisions requiring exploration of multiple approaches | Medium |
| **ReAct** | Agentic / tool-use tasks with iterative reasoning | Medium |
| **Chain of Thought** | Reasoning, problem-solving | Medium |
| **Chain of Density** | Iterative refinement, summarization | Medium |

### Quality Scoring System

Every prompt is evaluated across:
- **Clarity** (1-10): Is the goal clear and unambiguous?
- **Specificity** (1-10): Are requirements detailed enough?
- **Context** (1-10): Is background information provided?
- **Completeness** (1-10): Are all necessary elements present?
- **Structure** (1-10): Is the prompt well-organized?

### Progressive Disclosure

- Asks 3-5 targeted questions at a time (never overwhelming)
- Adapts questions based on framework selection
- Builds understanding iteratively
- Confirms assumptions before proceeding

### Continuous Iteration

- Shows before/after comparisons with explanations
- Refines based on your feedback
- Can switch frameworks if initial choice doesn't fit
- Continues until you're satisfied

---

## Example Transformation

### Before
```
"Write about machine learning"
```

**Analysis Scores:**
- Clarity: 2/10 (vague goal)
- Specificity: 1/10 (no details)
- Context: 0/10 (no background)
- Completeness: 2/10 (missing most elements)
- Structure: 3/10 (single sentence)
- **Overall: 1.6/10**

---

### After (CO-STAR Framework)

```
CONTEXT:
Creating content for a business blog aimed at C-level executives exploring
how AI/ML could benefit their organizations. Readers understand business
strategy but have limited technical ML knowledge. Part of an emerging
technologies series.

OBJECTIVE:
Create an engaging article helping executives understand practical machine
learning applications relevant to their companies. Focus on demonstrating
tangible business value and real-world implementation without overwhelming
technical details.

STYLE:
Professional blog style combining narrative with bullet points. Include 2-3
real-world case studies. Structure with clear subheadings every 150-200 words.
Balance storytelling with concrete information. Avoid jargon; when necessary,
provide plain-language explanations.

TONE:
Professional yet approachable and conversational. Confident and authoritative
without being condescending. Practical and business-focused rather than
theoretical.

AUDIENCE:
C-suite executives and senior managers at mid-to-large enterprises who:
- Make strategic technology investment decisions
- Understand business metrics and ROI
- Have limited technical ML knowledge
- Value practical examples over theory

RESPONSE FORMAT:
800-word article structured as:
- Compelling headline (10 words max)
- Brief hook (2-3 sentences)
- 3-4 main sections with descriptive subheadings
- Mix of paragraphs and bullet points
- Clear call-to-action conclusion
```

**Result Scores:**
- Clarity: 9/10
- Specificity: 9/10
- Context: 10/10
- Completeness: 9/10
- Structure: 9/10
- **Overall: 8.8/10**

---

## Supported Frameworks

### CO-STAR (Context, Objective, Style, Tone, Audience, Response)

**Best for:** Content creation, writing tasks, communications

**Components:**
- **Context** - Background information and situation
- **Objective** - Clear goal and purpose
- **Style** - Writing style and formatting approach
- **Tone** - Voice and emotional quality
- **Audience** - Target reader characteristics
- **Response** - Expected format and structure

**Example Use Cases:** Blog posts, emails, presentations, marketing copy, documentation

---

### RISEN (Role, Instructions, Steps, End goal, Narrowing)

**Best for:** Multi-step processes, systematic procedures

**Components:**
- **Role** - Expertise and perspective needed
- **Instructions** - High-level guidance
- **Steps** - Detailed methodology
- **End goal** - Success criteria
- **Narrowing** - Constraints and boundaries

**Example Use Cases:** Code reviews, workflows, systematic analysis, project planning

---

### RISE (Dual Variants)

#### RISE-IE (Input-Expectation)
**Best for:** Data analysis, transformations, processing tasks

**Components:**
- **Role** - Expertise needed
- **Input** - Data format and characteristics
- **Steps** - Processing methodology
- **Expectation** - Output requirements

**Example Use Cases:** CSV analysis, data processing, file transformations, report generation

#### RISE-IX (Instructions-Examples)
**Best for:** Content creation with reference examples

**Components:**
- **Role** - Expertise needed
- **Instructions** - Task guidance
- **Steps** - Workflow process
- **Examples** - Reference samples

**Example Use Cases:** Creative writing, template-based content, style matching

---

### TIDD-EC (Task, Instructions, Do, Don't, Examples, Context)

**Best for:** High-precision tasks requiring explicit boundaries

**Components:**
- **Task type** - Nature of the work
- **Instructions** - What to accomplish
- **Do** - Explicit positive guidance
- **Don't** - Explicit negative guidance (what to avoid)
- **Examples** - Reference samples
- **Context** - Background information

**Example Use Cases:** Code generation with standards, compliance tasks, quality-critical work

---

### CTF (Context, Task, Format)

**Best for:** Simple tasks where situational background matters more than expertise framing

**Components:**
- **Context** - Situation and background
- **Task** - What needs to be done
- **Format** - Output structure

**Example Use Cases:** Handoff documents, mid-project updates, situation-driven requests

---

### RTF (Role, Task, Format)

**Best for:** Simple, well-defined tasks where expertise framing drives output quality

**Components:**
- **Role** - Expertise required
- **Task** - What needs to be done
- **Format** - Output structure

**Example Use Cases:** Quick conversions, simple formatting, straightforward requests

---

### APE (Action, Purpose, Expectation)

**Best for:** Ultra-minimal prompts — the simplest structured framework

**Components:**
- **Action** - What to do (one clear verb-driven instruction)
- **Purpose** - Why it's needed (one sentence)
- **Expectation** - What a good result looks like

**Example Use Cases:** Quick summaries, single-function code, one-off requests, rapid iteration

---

### BAB (Before, After, Bridge)

**Best for:** Transforming, rewriting, or refactoring existing content

**Components:**
- **Before** - Current state and what's wrong
- **After** - Desired end state
- **Bridge** - Transformation rules and constraints

**Example Use Cases:** Code refactoring, copy rewrites, tone changes, document restructuring, version migrations

---

### RACE (Role, Action, Context, Expectation)

**Best for:** Medium-complexity tasks needing expertise + background + explicit success criteria

**Components:**
- **Role** - Expertise or persona
- **Action** - What needs to be done
- **Context** - Situational background and constraints
- **Expectation** - What a good result looks like

**Example Use Cases:** Technical reviews, expert analysis, contextual recommendations, documentation with standards

---

### Tree of Thought

**Best for:** Decisions where multiple approaches need systematic comparison

**Approach:**
- Defines the problem and constraints
- Explores 2-5 distinct solution branches in parallel
- Evaluates each branch against defined criteria
- Synthesizes into a reasoned recommendation

**Example Use Cases:** Architecture decisions, debugging with multiple hypotheses, technology selection, strategic trade-offs

---

### ReAct (Reasoning + Acting)

**Best for:** Agentic tasks that interleave reasoning with tool use

**Approach:**
- Defines goal, available tools, and constraints
- Alternates Thought → Action → Observation cycles
- Each observation informs the next thought
- Continues until goal is reached

**Example Use Cases:** Agentic workflows, multi-step research, debugging with tools, data investigation

---

### Chain of Thought

**Best for:** Complex reasoning and problem-solving

**Approach:**
- Breaks down reasoning into explicit steps
- Shows work and intermediate conclusions
- Verifies logic at each stage
- Builds to final answer

**Example Use Cases:** Math problems, debugging, decision analysis, logical reasoning

---

### Chain of Density

**Best for:** Iterative refinement and compression

**Approach:**
- Starts with baseline version
- Progressively refines through iterations
- Increases information density
- Optimizes for specific goals

**Example Use Cases:** Summarization, content compression, explanation optimization

---

## Quick Start

### 1. Install via npm (Recommended)

```bash
# Install globally
npm install -g @ckelsoe/claude-skill-prompt-architect

# Run installation script
prompt-architect-install
```

**Alternative: Manual Installation**

If you prefer not to use npm:

**macOS/Linux:**
```bash
cp -r prompt-architect ~/.claude/skills/
```

**Windows (PowerShell):**
```powershell
Copy-Item -Path "prompt-architect" -Destination "$env:USERPROFILE\.claude\skills\prompt-architect" -Recurse
```

### 2. Restart Claude Code

Close and reopen Claude Code to load the skill.

### 3. Try It Out

```
"Help me improve this prompt: write a technical blog post"
```

The skill will automatically:
1. Analyze your prompt and score it
2. Recommend the best framework (likely CO-STAR)
3. Ask clarifying questions
4. Generate an improved, structured prompt
5. Explain the changes made

---

## Installation

### Method 1: npm (Recommended)

**Option A: Global Installation (User-Wide)**

```bash
# Install globally
npm install -g @ckelsoe/claude-skill-prompt-architect

# Run installation script
prompt-architect-install

# Restart Claude Code
```

**Option B: Local Installation (Without Global)**

```bash
# Install package
npm install @ckelsoe/claude-skill-prompt-architect

# Run installation script using npx
npx prompt-architect-install

# Restart Claude Code
```

**Option C: Project-Specific Installation**

```bash
# Install as dev dependency
npm install --save-dev @ckelsoe/claude-skill-prompt-architect

# Install to project .claude/skills/ folder
npx prompt-architect-install --project

# Restart Claude Code
```

### Method 2: Manual Installation

If you prefer not to use npm:

#### Prerequisites

- Claude Code installed and configured
- Python 3.7+ (optional, for analysis scripts)

#### Installation Steps

1. **Clone or Download this Repository**

```bash
git clone https://github.com/ckelsoe/claude-skill-prompt-architect.git
cd claude-skill-prompt-architect
```

2. **Copy Skill to Claude Code Directory**

The skill needs to be in your Claude Code skills folder.

**Default Locations:**
- Windows: `C:\Users\<YourName>\.claude\skills\`
- macOS: `~/.claude/skills/`
- Linux: `~/.claude/skills/`

**Installation Commands:**

```bash
# macOS/Linux
cp -r prompt-architect ~/.claude/skills/

# Windows (PowerShell)
Copy-Item -Path "prompt-architect" -Destination "$env:USERPROFILE\.claude\skills\prompt-architect" -Recurse

# Windows (Command Prompt)
xcopy prompt-architect %USERPROFILE%\.claude\skills\prompt-architect /E /I
```

3. **Verify Installation**

Check that all files are present:

```bash
# macOS/Linux
ls ~/.claude/skills/prompt-architect/

# Windows (PowerShell)
ls $env:USERPROFILE\.claude\skills\prompt-architect\

# Should see:
# - SKILL.md (required)
# - references/ (framework docs)
# - assets/ (templates)
# - scripts/ (analysis tools)
```

4. **Restart Claude Code**

The skill will be automatically loaded on restart.

### Verification

Test the skill with:
```
"Help me improve this prompt: analyze some data"
```

You should see the skill activate with prompt analysis and framework recommendations.

---

## Updating

### Update via npm

**If installed globally:**
```bash
# Update to latest version
npm update -g @ckelsoe/claude-skill-prompt-architect

# Or reinstall
npm install -g @ckelsoe/claude-skill-prompt-architect@latest

# Restart Claude Code
```

**If installed locally:**
```bash
# Update package
npm update @ckelsoe/claude-skill-prompt-architect

# Reinstall skill
npx prompt-architect-install

# Restart Claude Code
```

**Check current version:**
```bash
npm list -g @ckelsoe/claude-skill-prompt-architect
```

**Note:** npm packages do not auto-update. You must manually run the update command to get the latest version.

---

## Usage

### Basic Usage

Simply ask Claude Code to improve any prompt:

```
"Help me improve this prompt: [your prompt here]"
```

### Example Interaction

```
User: "Help me improve this prompt: create a function to process user data"

Skill: I'll analyze this prompt and help improve it.

**Analysis**:
- Clarity: 4/10 (basic goal stated)
- Specificity: 2/10 (what kind of data? what processing?)
- Context: 1/10 (no background)
- Completeness: 2/10 (missing many details)
- Structure: 3/10 (single sentence)
- **Overall: 2.4/10**

**Recommendation**: RISEN framework (multi-step process requiring methodology)

**Questions**:
1. What type of user data? (names, emails, profiles, etc.)
2. What processing is needed? (validation, transformation, storage?)
3. What's the tech stack? (Python, JavaScript, database type?)
4. Any constraints? (performance, security requirements?)
5. Expected error handling approach?

User: "It's a Python function processing CSV user registrations. Need to validate
emails, normalize names, and save to PostgreSQL. Should handle invalid data gracefully."

Skill: Perfect! Let me apply the RISEN framework...

[Improved prompt generated with clear role, instructions, steps, end goal, and constraints]
```

### Advanced Usage

**Request Specific Framework:**
```
"Use the CO-STAR framework to improve: write marketing copy"
```

**Iterate on Existing Prompts:**
```
"Review this prompt and suggest improvements: [existing structured prompt]"
```

**Switch Frameworks:**
```
"Try using TIDD-EC instead for more explicit guidance"
```

---

## Framework Selection Guide

### Decision Tree

```
Are you transforming existing content (rewrite, refactor, convert)?
├─ YES → BAB (Before, After, Bridge)
└─ NO ↓

Is it an agentic/tool-use task?
├─ YES → ReAct (Thought-Action-Observation cycles)
└─ NO ↓

Is it a decision between multiple approaches?
├─ YES → Tree of Thought (branching exploration)
└─ NO ↓

Is it content/writing focused with audience and tone?
├─ YES → CO-STAR
└─ NO ↓

Is it a multi-step process with methodology?
├─ YES → RISEN
└─ NO ↓

Is it a data transformation (input → output)?
├─ YES → RISE-IE
└─ NO ↓

Does it need reference examples?
├─ YES → RISE-IX
└─ NO ↓

Does it need explicit dos/don'ts?
├─ YES → TIDD-EC
└─ NO ↓

Is it complex reasoning (one clear path)?
├─ YES → Chain of Thought
└─ NO ↓

Does it need iterative refinement?
├─ YES → Chain of Density
└─ NO ↓

Is it a simple task? Choose by primary driver:
├─ Expert role matters most → RTF
├─ Situational context matters most → CTF
├─ Need role + context + outcome bar → RACE
└─ Ultra-minimal, one-off → APE
```

### Quick Reference

| Your Task | Recommended Framework | Why |
|-----------|----------------------|-----|
| Write blog post | CO-STAR | Audience and tone critical |
| Code review process | RISEN | Multi-step with constraints |
| Analyze CSV data | RISE-IE | Clear input→output transformation |
| Generate with examples | RISE-IX | Need reference samples |
| Generate secure code | TIDD-EC | Explicit dos/don'ts needed |
| Debug logic error | Chain of Thought | Requires reasoning steps |
| Compress explanation | Chain of Density | Iterative refinement |
| Simple conversion | RTF | Straightforward, expertise-driven |
| Mid-project update | CTF | Background is the key driver |
| Summarize a meeting | APE | Ultra-minimal, one-off |
| Refactor existing code | BAB | Clear before/after transformation |
| Rewrite copy for new audience | BAB | Current content → desired state |
| Architecture decision | Tree of Thought | Multiple approaches to compare |
| Choose database tech | Tree of Thought | Trade-offs need systematic analysis |
| Agentic research task | ReAct | Tool use with iterative reasoning |
| Expert review with context | RACE | Role + background + outcome bar |

---

## Project Structure

```
prompt-architect/
│
├── README.md                          # This file
├── LICENSE                            # MIT License
│
└── prompt-architect/                  # The skill
    ├── SKILL.md                       # Core skill instructions (5 KB)
    │
    ├── scripts/                       # Analysis Utilities
    │   ├── framework_analyzer.py      # Framework recommendation logic
    │   └── prompt_evaluator.py        # Quality scoring system
    │
    ├── references/                    # Framework Documentation
    │   └── frameworks/                # Loaded on-demand
    │       ├── co-star.md             # CO-STAR reference (600+ lines)
    │       ├── risen.md               # RISEN reference (600+ lines)
    │       ├── rise.md                # RISE (IE/IX) reference (700+ lines)
    │       ├── tidd-ec.md             # TIDD-EC reference (600+ lines)
    │       ├── ctf.md                 # CTF reference
    │       ├── rtf.md                 # RTF reference (500+ lines)
    │       ├── ape.md                 # APE reference
    │       ├── bab.md                 # BAB reference
    │       ├── race.md                # RACE reference
    │       ├── tree-of-thought.md     # Tree of Thought reference
    │       ├── react.md               # ReAct reference
    │       ├── chain-of-thought.md    # CoT reference (500+ lines)
    │       └── chain-of-density.md    # CoD reference (500+ lines)
    │
    └── assets/
        └── templates/                 # Framework Templates
            ├── co-star_template.txt
            ├── risen_template.txt
            ├── rise-ie_template.txt
            ├── rise-ix_template.txt
            ├── tidd-ec_template.txt
            ├── ctf_template.txt
            ├── rtf_template.txt
            ├── ape_template.txt
            ├── bab_template.txt
            ├── race_template.txt
            ├── tree-of-thought_template.txt
            ├── react_template.txt
            └── hybrid_template.txt
```

**Core Components:**
- **SKILL.md** - Main skill logic and instructions
- **13 Framework Docs** - Complete references with examples
- **13 Templates** - Ready-to-use structures
- **2 Python Scripts** - Analysis and scoring utilities

---

## Documentation

### Framework References

Detailed documentation for each framework in `prompt-architect/references/frameworks/`:

- **co-star.md** - Context, Objective, Style, Tone, Audience, Response
- **risen.md** - Role, Instructions, Steps, End goal, Narrowing
- **rise.md** - Dual variants (IE & IX)
- **tidd-ec.md** - Task, Instructions, Do, Don't, Examples, Context
- **ctf.md** - Context, Task, Format
- **rtf.md** - Role, Task, Format
- **ape.md** - Action, Purpose, Expectation
- **bab.md** - Before, After, Bridge
- **race.md** - Role, Action, Context, Expectation
- **tree-of-thought.md** - Branching multi-path exploration
- **react.md** - Reasoning + Acting (agentic tool use)
- **chain-of-thought.md** - Step-by-step reasoning
- **chain-of-density.md** - Iterative refinement

---

## Contributing

Contributions are welcome! Here's how you can help:

### Ways to Contribute

1. **Add New Frameworks** - Implement additional prompting frameworks
2. **Improve Existing Frameworks** - Enhance documentation and examples
3. **Bug Fixes** - Report and fix issues
4. **Documentation** - Improve guides and examples
5. **Testing** - Test with different use cases and report findings

### Adding New Frameworks

1. Research and validate the framework has backing
2. Create comprehensive framework reference (see existing in `references/frameworks/`)
3. Add template file in `assets/templates/`
4. Update SKILL.md framework selection logic
5. Test with multiple use cases
6. Submit pull request with examples and rationale

### Contribution Guidelines

**File Structure:**
```
New framework contributions should include:
- references/frameworks/your-framework.md (600+ lines with examples)
- assets/templates/your-framework_template.txt
- Updates to SKILL.md framework selection
- Examples in documentation
```

**Documentation Standards:**
- Clear component definitions
- Multiple use case examples
- Selection criteria explanation
- Before/after comparisons
- Research citations

**Testing Requirements:**
- Test with 3-5 diverse prompts
- Verify scoring improves
- Check framework selection logic
- Validate template structure

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-framework`)
3. Make your changes following the guidelines
4. Test thoroughly with multiple examples
5. Update relevant documentation
6. Commit with clear messages
7. Push to your fork
8. Submit a Pull Request with:
   - Clear description of changes
   - Examples of improvements
   - Test results
   - Documentation updates

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### License Summary

**Permissions:**
- Commercial use
- Modification
- Distribution
- Private use

**Conditions:**
- License and copyright notice must be included

**Limitations:**
- No liability
- No warranty

---

## Support

### Getting Help

- **Issues** - Report bugs or request features via [GitHub Issues](https://github.com/ckelsoe/prompt-architect/issues)
- **Documentation** - Check framework references in `references/frameworks/`

### FAQ

**Q: Why isn't the skill activating?**
A: Ensure the skill folder is in the correct location (`~/.claude-code/skills/prompt-architect/`) and restart Claude Code.

**Q: Can I use this without Claude Code?**
A: Yes! Include SKILL.md content in your Claude API system prompt.

**Q: Which framework should I use?**
A: The skill will recommend one, but check the Framework Selection Guide above.

**Q: Can I add my own framework?**
A: Yes! See the Contributing section for guidelines.

**Q: Does this work with other LLMs?**
A: The frameworks are universal, but the skill is optimized for Claude.

---

**Transforming your prompts with research-backed frameworks**
