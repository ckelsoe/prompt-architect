# Changelog

All notable changes to the Prompt Architect Claude Code skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-03-24

### Breaking Changes
- **Package renamed**: `@ckelsoe/claude-skill-prompt-architect` → `@ckelsoe/prompt-architect`
- **Directory restructured**: `prompt-architect/` moved to `skills/prompt-architect/` for Claude Code plugin system compatibility

### Added
- **Claude Code Plugin System support**: `.claude-plugin/plugin.json` and `marketplace.json` — install via `/plugin marketplace add` and `/plugin install`
- **Gemini CLI support**: Native Agent Skills compatibility. Install via `gemini skills install`
- **Agent Skills standard compliance** (agentskills.io): Added `license`, `compatibility`, and `metadata` fields to SKILL.md frontmatter. Works with 30+ compatible agents including Cursor, Copilot, Kiro, Roo Code, Amp, OpenHands, and more
- **Interactive multi-agent installer**: Detects installed AI agents (Claude Code, Gemini CLI, Cursor, Copilot, Windsurf, Codex) and presents a selection UI using @clack/prompts
- **Universal install path**: `~/.agents/skills/` for Agent Skills standard compatible tools
- **CLI flags**: `--all`, `--claude`, `--gemini`, `--agents`, `--cursor`, `--copilot`, `--windsurf`, `--codex`, `--yes`
- **Gemini CLI adapter**: `adapters/for-gemini-cli.md` with installation instructions
- **Append-mode safety**: Marker comments prevent duplicate content when appending adapters to existing files
- **MIGRATION.md**: Step-by-step guide for migrating from the old package name

### Changed
- `scripts/install.js` fully rewritten as multi-agent installer with @clack/prompts UI
- `scripts/test.js` expanded from 11 to 19 tests (plugin manifests, Agent Skills compliance, all adapters)
- `scripts/validate-skill.js` now validates plugin manifest and cross-checks version consistency
- Added `@clack/prompts` as a runtime dependency (previously zero dependencies)
- Non-interactive postinstall still defaults to Claude Code only for backwards compatibility

---

## [2.1.3] - 2026-03-10

### Fixed
- **`npm install -g` now automatically installs the Claude Code skill** — no separate command needed
  - Root cause: npm was stripping the `bin[prompt-architect-install]` entry during publish, so the install command never existed after `npm install -g`
  - Fix: added `"postinstall": "node scripts/install.js"` — npm runs this automatically after every install
  - Global installs (`npm install -g`) auto-install the skill to `~/.claude/skills/`
  - Project installs (`npm install`) print a message explaining how to install for the project
- Added `scripts/` to the `files` array so `install.js` is explicitly included in the npm package
- Removed the broken `bin` entry that npm kept stripping

---

## [2.1.2] - 2026-03-10

### Fixed
- **`scripts/install.js` — simplified to always install, no conditions**
  - Removed all version-checking logic (unnecessary complexity)
  - `prompt-architect-install` now always removes any existing installation and copies the current version fresh
  - Running it multiple times is safe and always gives you the version from the npm package you installed

---

## [2.1.1] - 2026-03-10

### Fixed
- **`scripts/install.js` — install script never updated an existing installation**
  - Old behavior: if skill was already installed, the script exited immediately without copying new files. Running `prompt-architect-install` after an npm update silently kept the old version.
  - New behavior: script compares the installed version against the current package version. If they differ, it updates automatically. Only skips if already at the same version.
  - Writes a `.version` marker file at install time so future runs can detect version mismatches.
  - Success message now shows the installed version number.

---

## [2.1.0] - 2026-03-10

### Added
- **Cross-platform adapters** in `adapters/` — ready-to-use versions for AI tools other than Claude Code:
  - `adapters/system-prompt.md` — Universal system prompt for any LLM API, ChatGPT Custom GPT, etc.
  - `adapters/for-openai-codex-cli.md` — For OpenAI Codex CLI (`AGENTS.md`)
  - `adapters/for-cursor.mdc` — For Cursor editor (`.cursor/rules/` MDC format)
  - `adapters/for-github-copilot.md` — For GitHub Copilot (`.github/copilot-instructions.md`)
  - `adapters/for-windsurf.md` — For Windsurf editor (`.windsurfrules`)
  - `adapters/README.md` — Full documentation: install steps, limitations, troubleshooting per platform
- **README "Use with Other AI Tools" section** — quick-install commands for all supported platforms
- `adapters/` added to `package.json` files array — adapters now ship inside the npm package

---

## [2.0.0] - 2026-03-10

### Breaking Changes
- **SKILL.md completely restructured** with intent-based framework selection replacing the flat 20-item use-case list. Seven intent categories (Recover, Clarify, Create, Transform, Reason, Critique, Agentic) now route to frameworks with discriminating tables within each category. Downstream tooling that parsed the old flat list format must be updated.

### Added
- **Intent-based framework selection system**: 7 categories with discriminating tables replace the flat list
- **"When NOT to use frameworks" guidance**: Explicit conditions for skipping framework overhead
- **Updated example interaction**: Demonstrates full intent-detection → framework-selection → delivery flow using BAB (not just CO-STAR)
- **27-framework `hybrid_template.txt`**: Updated with 6 named combination patterns (Reverse Role → CREATE, BAB + Self-Refine, Devil's Advocate + Pre-Mortem, Step-Back + Chain of Thought, RPEF + Self-Refine, CO-STAR/RISEN + CAI Critique-Revise)
- **Rewritten `framework_analyzer.py`**: Intent-based 27-framework system with two-phase scoring (detect intent → score within category)
- **Updated `package.json`**: v2.0.0, 27 frameworks, expanded keywords, `intentCategories` and `frameworkCombinations` metadata fields
- **Framework quick-reference taxonomy** in SKILL.md grouping all 27 by family

### Changed
- `package.json` version: 1.0.8 → 2.0.0
- `package.json` description: updated to reference 27 frameworks across 7 intent categories
- `framework_analyzer.py`: Rewritten from 8-framework flat scoring to 27-framework intent-based system
- `hybrid_template.txt`: Updated from 4-framework references to all 7 framework family sections + 6 named combination patterns

---

## [1.3.0] - 2026-03-10

### Added
- **7 New Frameworks** (total now 27):
  - **RPEF** — Reverse Prompt Engineering: recover a reusable prompt from an existing output (EMNLP 2025)
  - **Reverse Role Prompting** — AI-Led Interview: AI interviews you before executing (FATA, arXiv 2025, ~40% improvement)
  - **Self-Refine** — Generate → Feedback → Refine loop for any output quality improvement (NeurIPS 2023, +5-40%)
  - **Devil's Advocate** — Generate the strongest opposing argument against a position (ACM IUI 2024)
  - **Pre-Mortem** — Assume failure, work backwards to specific causes with warning signs (Gary Klein)
  - **CAI Critique-Revise** — Principle-based critique and revision (Anthropic Constitutional AI, 2022)
  - **RCoT** — Reverse Chain-of-Thought: verify reasoning by reconstructing the question from the answer
- **7 New Framework Reference Docs** in `references/frameworks/`
- **7 New Templates** in `assets/templates/`

### Changed
- **SKILL.md completely restructured** with intent-based framework selection system:
  - Replaced flat 20-item list with 7 intent categories: Recover, Clarify, Create, Transform, Reason, Critique, Agentic
  - Each category has a discriminating table/decision for selecting among similar frameworks
  - Added quick-reference taxonomy grouping all 27 frameworks by family
  - Added clarification questions for all 7 new frameworks
- README updated: framework count, table, supported frameworks entries, decision tree, quick reference, project structure, documentation
- Framework count references updated to 27 throughout

---

## [1.2.0] - 2026-03-10

### Added
- **7 New Frameworks** (total now 20):
  - **Skeleton of Thought (SoT)** — Generate skeleton outline first, expand each point (ICLR 2024, Microsoft Research)
  - **Step-Back Prompting** — Abstract to underlying principles before answering (Google DeepMind, ICLR 2024)
  - **Least-to-Most (LtM)** — Decompose into ordered subproblems, solve sequentially (Google Brain, ICLR 2023)
  - **Plan-and-Solve (PS+)** — Zero-shot: plan + extract variables + calculate step by step (ACL 2023)
  - **CRISPE** — Capacity+Role, Insight, Instructions, Personality, Experiment (multiple variants)
  - **BROKE** — Background, Role, Objective, Key Results, Evolve (business OKR-style with self-critique)
  - **CARE** — Context, Ask, Rules, Examples (Nielsen Norman Group, constraint-driven)
- **7 New Framework Reference Docs** in `references/frameworks/`
- **7 New Templates** in `assets/templates/`
- Updated reasoning ladder notes in SKILL.md
- Expanded decision tree and quick reference in README

### Changed
- SKILL.md updated to 20 frameworks
- README framework table, decision tree, quick reference, and project structure updated
- Framework count references updated throughout

---

## [1.1.0] - 2026-03-10

### Added
- **6 New Frameworks** (total now 13):
  - **CTF** (Context, Task, Format) — Simple tasks where situational context drives the prompt more than AI persona framing
  - **APE** (Action, Purpose, Expectation) — Ultra-minimal framework for one-off quick prompts
  - **BAB** (Before, After, Bridge) — Transformation tasks: rewriting, refactoring, converting existing content
  - **RACE** (Role, Action, Context, Expectation) — Medium complexity with role + background + explicit success bar
  - **Tree of Thought** — Decision-making via systematic exploration of multiple solution branches
  - **ReAct** (Reasoning + Acting) — Agentic tasks interleaving reasoning with tool/action use
- **6 New Framework Reference Docs** in `references/frameworks/`
- **6 New Templates** in `assets/templates/`
- Updated framework selection decision tree in SKILL.md and README
- Added complexity ladder notes: simple task ladder and reasoning ladder

### Changed
- SKILL.md description updated to reflect 13 frameworks
- README framework table, decision tree, quick reference, project structure, and documentation sections updated
- Framework count references updated throughout documentation

---

## [1.0.0] - 2025-01-24

### Added
- Initial production release of Prompt Architect skill
- **7 Framework Support**:
  - CO-STAR (Context, Objective, Style, Tone, Audience, Response)
  - RISEN (Role, Instructions, Steps, End goal, Narrowing)
  - RISE-IE (Role, Input, Steps, Expectation) for data analysis
  - RISE-IX (Role, Instructions, Steps, Examples) for content creation
  - TIDD-EC (Task, Instructions, Do, Don't, Examples, Context)
  - RTF (Role, Task, Format)
  - Chain of Thought for reasoning tasks
  - Chain of Density for iterative refinement
- **Prompt Analysis System**:
  - Quality scoring across 5 dimensions (clarity, specificity, context, completeness, structure)
  - Automatic framework recommendation based on use case
  - Before/after comparison with explanations
- **Interactive Workflow**:
  - Progressive clarification questions (3-5 at a time)
  - Framework-specific question sets
  - Iterative refinement based on feedback
  - Framework switching capability
- **Complete Documentation**:
  - 7 comprehensive framework references (500-700 lines each)
  - 7 ready-to-use templates
  - Detailed usage examples
  - Framework selection guide
- **Analysis Scripts**:
  - `framework_analyzer.py` - Framework recommendation logic
  - `prompt_evaluator.py` - Quality scoring system
- **Installation Tools**:
  - Automated installation script
  - Multi-platform support (Windows, macOS, Linux)
  - Project and user-wide installation options

### Documentation
- Comprehensive README with quick start guide
- Framework selection decision tree
- Example transformations with scoring
- Complete API documentation
- Contributing guidelines
- MIT License

### Framework Details
- **CO-STAR**: 600+ lines of documentation with 5 complete examples
- **RISEN**: 600+ lines with systematic methodology guidance
- **RISE**: 700+ lines covering both IE and IX variants
- **TIDD-EC**: 600+ lines with explicit dos/don'ts patterns
- **RTF**: 500+ lines for simple task structuring
- **Chain of Thought**: 500+ lines on reasoning techniques
- **Chain of Density**: 500+ lines on iterative compression



---

## Migration Notes

### v1.x → v2.0.0

The framework selection system in SKILL.md was completely restructured:

- **Old format**: flat "use case → framework" list (20 items)
- **New format**: 7 intent categories (A–G), each with a discriminating table

**Impact on users**: No breaking changes to templates or prompts themselves. The change is in how the skill reasons about which framework to apply. If you have custom tooling that parsed the old flat list format, update it to use the 7-category intent system.

**Impact on `framework_analyzer.py`**: Rewritten with intent-based two-phase scoring. If you imported this script directly, the function signatures for `analyze_use_case()` are unchanged but the internal scoring logic is different.

### For v1.0.0 Users

- No migration needed for prompts or templates
- All 27 framework templates are backwards compatible
- The 7 new frameworks added in v1.1.0–v1.3.0 are additive only

---

## Notes

- All dates in format: YYYY-MM-DD
- Version numbers follow SemVer: MAJOR.MINOR.PATCH
- [Unreleased] section tracks upcoming changes
- Each version includes upgrade instructions if needed

## Links

- [npm Package](https://www.npmjs.com/package/@ckelsoe/claude-skill-prompt-architect)
- [GitHub Repository](https://github.com/ckelsoe/claude-skill-prompt-architect)
- [Issue Tracker](https://github.com/ckelsoe/claude-skill-prompt-architect/issues)
- [Contributing Guidelines](https://github.com/ckelsoe/claude-skill-prompt-architect/blob/main/README.md#contributing)
