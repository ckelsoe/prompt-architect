# Changelog

All notable changes to the Prompt Architect Claude Code skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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



## Version History

### [1.0.0] - 2025-01-24
Initial production release with 7 frameworks, analysis system, and complete documentation.

---

## Breaking Changes

### v1.0.0
- Initial release (no breaking changes)

---

## Migration Notes

### For v1.0.0 Users
- No migration needed
- All framework templates are backwards compatible
- Existing prompts work with new version

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
