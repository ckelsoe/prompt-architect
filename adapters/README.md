# Prompt Architect — Adapters

Most AI tools now support the [Agent Skills standard](https://agentskills.io) natively and can use `skills/prompt-architect/SKILL.md` directly. The adapters in this folder are for the remaining tools that need a reformatted version.

---

## Installation by tool

### Agent Skills compatible tools (recommended)

These tools read `SKILL.md` natively. No adapter needed — just install to their skills directory:

| Tool | Install method |
|------|---------------|
| **Claude Code** | `npm install -g @ckelsoe/prompt-architect` or `/plugin marketplace add ckelsoe/prompt-architect` |
| **ChatGPT** | Download [`prompt-architect.skill`](https://github.com/ckelsoe/prompt-architect/releases/latest) → Profile → Skills → Upload |
| **Gemini CLI** | `gemini skills install https://github.com/ckelsoe/prompt-architect.git` |
| **Cursor** | Copy `skills/prompt-architect/` to `.agents/skills/` or `.cursor/skills/` in your project |
| **GitHub Copilot** | Copy `skills/prompt-architect/` to `.github/skills/` or `~/.copilot/skills/` |
| **OpenAI Codex** | Copy `skills/prompt-architect/` to `.agents/skills/` in your project |
| **VS Code** | Copy `skills/prompt-architect/` to `.agents/skills/` in your project |
| **Roo Code** | Copy `skills/prompt-architect/` to `.agents/skills/` or `~/.agents/skills/` |
| **Kiro, Amp, Junie, Goose, OpenHands, etc.** | Copy to `~/.agents/skills/` (universal path) |

Or use the interactive installer to auto-detect and install:
```bash
npx @ckelsoe/prompt-architect
```

### Windsurf

Windsurf does not yet support Agent Skills natively. Use the adapter file:

```bash
# New file
cp adapters/for-windsurf.md ./.windsurfrules

# Or append to existing
cat adapters/for-windsurf.md >> ./.windsurfrules
```

### Any LLM API or Chat Interface

Use `system-prompt.md` as your system prompt. Works with OpenAI API, Anthropic API, Google Gemini API, or any tool with a system prompt / custom instructions field.

**Direct link:** [system-prompt.md on GitHub](https://raw.githubusercontent.com/ckelsoe/prompt-architect/main/adapters/system-prompt.md)

**For ChatGPT Custom GPTs** (free/personal plans without Skills support):
1. Open the [system-prompt.md](https://raw.githubusercontent.com/ckelsoe/prompt-architect/main/adapters/system-prompt.md) link
2. Copy the entire contents
3. Go to [chat.openai.com](https://chat.openai.com) → Explore GPTs → Create a GPT → Configure
4. Paste into the "Instructions" field
5. Name it "Prompt Architect" and save

---

## Adapter files in this folder

| File | Use with |
|------|----------|
| `system-prompt.md` | Any LLM API, Custom GPTs, or tool without Agent Skills support |
| `for-windsurf.md` | Windsurf editor (`.windsurfrules` format) |

---

## Why most adapters were removed (v3.0)

In v2.x, this folder contained adapters for Cursor, GitHub Copilot, OpenAI Codex, and Gemini CLI. All of these tools have since adopted the [Agent Skills standard](https://agentskills.io) and now read `SKILL.md` natively. The old adapter files were:

- `for-cursor.mdc` → Cursor now scans `.cursor/skills/` and `.agents/skills/`
- `for-github-copilot.md` → Copilot now scans `.github/skills/` and `~/.copilot/skills/`
- `for-openai-codex-cli.md` → Codex now scans `.agents/skills/`
- `for-gemini-cli.md` → Gemini CLI scans `~/.gemini/skills/` and `~/.agents/skills/`

If you need these for legacy setups, check the [v2.1.4 release](https://github.com/ckelsoe/prompt-architect/tree/v2.1.4/adapters).
