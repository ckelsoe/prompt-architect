# Prompt Architect — Cross-Platform Adapters

This folder contains ready-to-use versions of the Prompt Architect skill for AI tools **other than Claude Code**.

---

## Why adapters exist

The `prompt-architect/SKILL.md` file uses Claude Code's skill discovery system:
- It has a YAML frontmatter block (`---\nname:\ndescription:\n---`) that Claude Code reads to auto-discover skills
- It references on-disk files (`references/frameworks/`, `assets/templates/`) that Claude Code loads on demand

**Other AI tools do not do any of this.** They won't find the SKILL.md automatically. They won't load reference files. The frontmatter will appear as raw text if you paste it in.

The adapters in this folder solve both problems:
- The YAML frontmatter is removed
- File-loading references are replaced with self-contained instructions
- Each adapter is formatted exactly as the target tool expects

**The framework knowledge (all 27 frameworks, intent categories, clarification questions) is identical across all adapters.** Only the packaging changes.

---

## What "installing" means for each tool

| Tool | Where instructions go | Auto-discovered? | How to activate |
|------|----------------------|------------------|-----------------|
| **Claude Code** | `~/.claude/skills/prompt-architect/` | ✅ Yes — automatic | Ask Claude to improve a prompt |
| **OpenAI Codex CLI** | `AGENTS.md` in your project root | ✅ Yes — read per session | Ask Codex to improve a prompt |
| **Cursor** | `.cursor/rules/prompt-architect.mdc` | ✅ Yes — loaded automatically | Ask Cursor to improve a prompt |
| **GitHub Copilot** | `.github/copilot-instructions.md` | ✅ Yes — loaded per workspace | Ask Copilot to improve a prompt |
| **Windsurf** | `.windsurfrules` in your project root | ✅ Yes — read per session | Ask Windsurf to improve a prompt |
| **Any LLM API / ChatGPT / custom** | Paste into system prompt field | Manual | Call the API / open the chat |

---

## Adapter files in this folder

| File | Use with | What to do with it |
|------|----------|--------------------|
| `system-prompt.md` | Any LLM (API, ChatGPT, Gemini, etc.) | Paste contents into the system prompt field |
| `for-openai-codex-cli.md` | OpenAI Codex CLI | Copy contents into `AGENTS.md` in your project root |
| `for-cursor.mdc` | Cursor editor | Copy file to `.cursor/rules/prompt-architect.mdc` |
| `for-github-copilot.md` | GitHub Copilot | Copy contents into `.github/copilot-instructions.md` |
| `for-windsurf.md` | Windsurf editor | Copy contents into `.windsurfrules` in your project root |

---

## Limitations vs. Claude Code

Claude Code's version has one capability the adapters cannot replicate:

> **On-demand reference loading**: When Claude Code applies a framework, it can load the detailed 600-800 line reference doc for that specific framework (e.g., `references/frameworks/co-star.md`). This gives it richer examples and selection criteria.

The adapters work from:
1. The full intent-based selection system (all 7 categories, all 27 frameworks)
2. The complete clarification question sets
3. The LLM's training knowledge of each framework

For most use cases, this is equivalent. The reference docs add depth for edge cases and complex applications.

---

## Installation instructions by tool

### OpenAI Codex CLI

**What is AGENTS.md?**
The Codex CLI reads `AGENTS.md` from your project root at the start of each session. It's the Codex equivalent of Claude Code's `CLAUDE.md` — project-level instructions that shape how the AI behaves.

**Steps:**
```bash
# Option A: Create a new AGENTS.md with just this skill
cp /path/to/adapters/for-openai-codex-cli.md ./AGENTS.md

# Option B: Append to an existing AGENTS.md
cat /path/to/adapters/for-openai-codex-cli.md >> ./AGENTS.md

# Option C: After npm install
cat node_modules/@ckelsoe/claude-skill-prompt-architect/adapters/for-openai-codex-cli.md >> ./AGENTS.md
```

**Verify it's working:**
```
codex "Help me improve this prompt: write a blog post"
```
You should see intent detection, framework recommendation, and clarifying questions.

---

### Cursor

**What is .cursor/rules/?**
Cursor loads `.mdc` files from `.cursor/rules/` in your project. Each file can apply always or only for specific file patterns. The `prompt-architect.mdc` adapter uses `alwaysApply: false` so it only activates when you ask for prompt help — it won't interfere with normal coding.

**Steps:**
```bash
# Create the rules directory if it doesn't exist
mkdir -p .cursor/rules

# Copy the adapter
cp /path/to/adapters/for-cursor.mdc .cursor/rules/prompt-architect.mdc

# Or after npm install
cp node_modules/@ckelsoe/claude-skill-prompt-architect/adapters/for-cursor.mdc .cursor/rules/prompt-architect.mdc
```

**Verify it's working:**
Open Cursor, ask: `"Help me improve this prompt: write a blog post"`

**Note:** Cursor will load this rule when the description matches the context of your request. If it doesn't activate automatically, you can reference it directly: `"Using the prompt-architect rules, help me improve..."`

---

### GitHub Copilot

**What is copilot-instructions.md?**
GitHub Copilot reads `.github/copilot-instructions.md` from your repository root. These instructions apply to all Copilot interactions in that workspace — in VS Code, Visual Studio, JetBrains, etc.

**Important**: This file applies to ALL Copilot interactions in the repo, not just prompt engineering tasks. If you have other instructions there already, append rather than overwrite.

**Steps:**
```bash
# Create the .github directory if needed
mkdir -p .github

# Option A: New file
cp /path/to/adapters/for-github-copilot.md .github/copilot-instructions.md

# Option B: Append to existing
cat /path/to/adapters/for-github-copilot.md >> .github/copilot-instructions.md

# Or after npm install
cat node_modules/@ckelsoe/claude-skill-prompt-architect/adapters/for-github-copilot.md >> .github/copilot-instructions.md
```

**Verify it's working:**
In a Copilot chat window, ask: `"Help me improve this prompt: write a blog post"`

---

### Windsurf

**What is .windsurfrules?**
Windsurf reads `.windsurfrules` from your project root. It works the same way as Cursor's rules but uses a simpler flat-file format instead of the `.mdc` directory structure.

**Steps:**
```bash
# Option A: New file
cp /path/to/adapters/for-windsurf.md ./.windsurfrules

# Option B: Append to existing .windsurfrules
cat /path/to/adapters/for-windsurf.md >> ./.windsurfrules

# Or after npm install
cat node_modules/@ckelsoe/claude-skill-prompt-architect/adapters/for-windsurf.md >> ./.windsurfrules
```

**Verify it's working:**
Ask Windsurf: `"Help me improve this prompt: write a blog post"`

---

### Any LLM API or Chat Interface (Universal)

Use `system-prompt.md` as your system prompt. This works with:
- OpenAI API (`gpt-4o`, `o1`, etc.)
- Anthropic API (when not using Claude Code)
- Google Gemini API
- ChatGPT (paste into a Custom GPT's "Instructions" field)
- Any chat interface that has a system prompt or custom instructions field

**For ChatGPT Custom GPT:**
1. Go to [chat.openai.com](https://chat.openai.com) → Explore GPTs → Create a GPT
2. Click "Configure"
3. Copy the entire contents of `system-prompt.md`
4. Paste into the "Instructions" field
5. Name it "Prompt Architect"
6. Save and publish (or keep private)

**For direct API use:**
```python
import openai

with open("adapters/system-prompt.md", "r") as f:
    system_prompt = f.read()

response = openai.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "Help me improve this prompt: write a blog post"}
    ]
)
```

---

## After npm install — quick reference

If you installed via `npm install -g @ckelsoe/claude-skill-prompt-architect`, the adapters are at:

```
# Find your npm global prefix
npm prefix -g

# Adapters are at:
$(npm prefix -g)/lib/node_modules/@ckelsoe/claude-skill-prompt-architect/adapters/
```

Or find them directly:
```bash
ls $(npm root -g)/@ckelsoe/claude-skill-prompt-architect/adapters/
```

---

## Troubleshooting

**The AI isn't using the framework system — it's just answering directly.**
→ Try explicitly triggering it: `"Use the Prompt Architect framework to improve this prompt: [your prompt]"`

**The AI says it can't load the reference files.**
→ This is expected. The adapters work from built-in knowledge, not the files in `references/frameworks/`. This is not an error — just a difference from the Claude Code version.

**The instructions are too long and getting truncated.**
→ Use the Claude Code version instead, which handles large reference docs via progressive loading. Alternatively, use only the `system-prompt.md` content and ask the AI to focus on a subset of frameworks.

**Copilot is applying prompt engineering to all my code requests, not just when I ask.**
→ The Copilot adapter uses trigger language to activate only when you ask about prompts. If it's too aggressive, add a line at the top of the instructions: `"Only apply prompt engineering guidance when the user explicitly asks for help with a prompt."`
