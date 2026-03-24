# Migration Guide: v2.x → v3.0

## Package Rename

The npm package has been renamed:

- **Old:** `@ckelsoe/claude-skill-prompt-architect`
- **New:** `@ckelsoe/prompt-architect`

The old name included "claude-skill" which was misleading — the skill now works with 30+ AI agents via the Agent Skills standard, not just Claude Code.

## How to Migrate

### 1. Uninstall the old package

```bash
npm uninstall -g @ckelsoe/claude-skill-prompt-architect
```

### 2. Install the new package

```bash
npm install -g @ckelsoe/prompt-architect
```

The interactive installer will detect your AI agents and let you choose where to install.

### 3. (Optional) Clean up old skill files

If you previously had the skill installed at `~/.claude/skills/prompt-architect/`, the new installer will overwrite it automatically. No manual cleanup needed.

## What Changed

### Directory Structure

```
# Before (v2.x)
prompt-architect/SKILL.md

# After (v3.0)
skills/prompt-architect/SKILL.md
.claude-plugin/plugin.json
.claude-plugin/marketplace.json
```

### New Install Methods

| Method | Command |
|--------|---------|
| npm (interactive) | `npm install -g @ckelsoe/prompt-architect` |
| Claude Code Plugin | `/plugin marketplace add ckelsoe/prompt-architect` |
| Gemini CLI | `gemini skills install https://github.com/ckelsoe/prompt-architect.git` |
| Multi-agent | `npx @ckelsoe/prompt-architect --all` |

### The skill itself is unchanged

The `SKILL.md` content, all 27 frameworks, reference docs, and templates are identical. Only the packaging and distribution have changed.

## GitHub Repository

The repository has also been renamed:

- **Old:** `github.com/ckelsoe/claude-skill-prompt-architect`
- **New:** `github.com/ckelsoe/prompt-architect`

GitHub automatically redirects from the old URL, so existing links and git remotes continue to work.
