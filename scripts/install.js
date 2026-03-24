#!/usr/bin/env node

/**
 * Prompt Architect — Multi-Agent Installer
 *
 * Detects installed AI agents and lets users choose where to install.
 * Uses @clack/prompts for interactive UI, falls back to non-interactive
 * for postinstall hooks and CI environments.
 *
 * Usage:
 *   npx @ckelsoe/prompt-architect          # Interactive multi-agent install
 *   npx @ckelsoe/prompt-architect --all    # Install to all detected agents
 *   npx @ckelsoe/prompt-architect --claude # Install to Claude Code only
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

// Configuration
const SKILL_NAME = 'prompt-architect';
const PACKAGE_NAME = '@ckelsoe/prompt-architect';
const SKILL_SOURCE_DIR = 'skills';

// ─── Agent Registry ──────────────────────────────────────────────

const AGENTS = [
  {
    id: 'claude',
    name: 'Claude Code',
    detect: () => fs.existsSync(path.join(os.homedir(), '.claude')),
    installPath: (project) => project
      ? path.join(process.cwd(), '.claude', 'skills', SKILL_NAME)
      : path.join(os.homedir(), '.claude', 'skills', SKILL_NAME),
    format: 'skill',
    hint: (project) => project ? '.claude/skills/ (project)' : '~/.claude/skills/',
  },
  {
    id: 'gemini',
    name: 'Gemini CLI',
    detect: () => {
      if (fs.existsSync(path.join(os.homedir(), '.gemini'))) return true;
      try {
        execSync(process.platform === 'win32' ? 'where gemini' : 'which gemini', { stdio: 'ignore' });
        return true;
      } catch { return false; }
    },
    installPath: () => path.join(os.homedir(), '.gemini', 'skills', SKILL_NAME),
    format: 'skill',
    hint: () => '~/.gemini/skills/',
  },
  {
    id: 'agents',
    name: 'Agent Skills (universal)',
    detect: () => true, // Always available
    alwaysShow: true,
    installPath: () => path.join(os.homedir(), '.agents', 'skills', SKILL_NAME),
    format: 'skill',
    hint: () => '~/.agents/skills/ (30+ compatible agents)',
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    detect: () => {
      return fs.existsSync(path.join(process.cwd(), '.windsurfrules')) ||
             fs.existsSync(path.join(os.homedir(), '.windsurf'));
    },
    installPath: () => path.join(process.cwd(), '.windsurfrules'),
    format: 'adapter',
    adapterFile: 'for-windsurf.md',
    appendMode: true,
    hint: () => '.windsurfrules (project)',
  },
];

// ─── Source Path Resolution ──────────────────────────────────────

function findSourcePath() {
  // Try relative to this script (development or npm package)
  const fromScript = path.join(__dirname, '..', SKILL_SOURCE_DIR, SKILL_NAME);
  if (fs.existsSync(fromScript)) return fromScript;

  // Try local node_modules
  const localPath = path.join(process.cwd(), 'node_modules', PACKAGE_NAME, SKILL_SOURCE_DIR, SKILL_NAME);
  if (fs.existsSync(localPath)) return localPath;

  // Try global node_modules
  try {
    const globalRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
    const globalPath = path.join(globalRoot, PACKAGE_NAME, SKILL_SOURCE_DIR, SKILL_NAME);
    if (fs.existsSync(globalPath)) return globalPath;
  } catch { /* ignore */ }

  return null;
}

function findAdaptersPath() {
  const fromScript = path.join(__dirname, '..', 'adapters');
  if (fs.existsSync(fromScript)) return fromScript;

  const localPath = path.join(process.cwd(), 'node_modules', PACKAGE_NAME, 'adapters');
  if (fs.existsSync(localPath)) return localPath;

  try {
    const globalRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
    const globalPath = path.join(globalRoot, PACKAGE_NAME, 'adapters');
    if (fs.existsSync(globalPath)) return globalPath;
  } catch { /* ignore */ }

  return null;
}

// ─── File Operations ─────────────────────────────────────────────

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

const MARKER_START = '<!-- prompt-architect-start -->';
const MARKER_END = '<!-- prompt-architect-end -->';

function installSkillDir(sourcePath, destPath) {
  const parentDir = path.dirname(destPath);
  if (!fs.existsSync(parentDir)) fs.mkdirSync(parentDir, { recursive: true });

  // Remove existing installation
  if (fs.existsSync(destPath)) fs.rmSync(destPath, { recursive: true, force: true });

  copyRecursive(sourcePath, destPath);

  // Verify
  if (!fs.existsSync(path.join(destPath, 'SKILL.md'))) {
    throw new Error('SKILL.md not found after copy');
  }
}

function installAdapter(adaptersPath, agent, destPath) {
  const adapterSrc = path.join(adaptersPath, agent.adapterFile);
  if (!fs.existsSync(adapterSrc)) {
    throw new Error(`Adapter file not found: ${agent.adapterFile}`);
  }

  const adapterContent = fs.readFileSync(adapterSrc, 'utf8');
  const markedContent = `\n${MARKER_START}\n${adapterContent}\n${MARKER_END}\n`;

  if (agent.appendMode && fs.existsSync(destPath)) {
    const existing = fs.readFileSync(destPath, 'utf8');
    // Remove old content if present
    const cleaned = existing.replace(
      new RegExp(`\\n?${escapeRegex(MARKER_START)}[\\s\\S]*?${escapeRegex(MARKER_END)}\\n?`),
      ''
    );
    fs.writeFileSync(destPath, cleaned + markedContent, 'utf8');
  } else {
    const parentDir = path.dirname(destPath);
    if (!fs.existsSync(parentDir)) fs.mkdirSync(parentDir, { recursive: true });
    fs.writeFileSync(destPath, adapterContent, 'utf8');
  }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ─── Version ─────────────────────────────────────────────────────

function getVersion() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    return pkg.version || 'unknown';
  } catch { return 'unknown'; }
}

// ─── CLI Argument Parsing ────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const flags = {
    help: args.includes('--help') || args.includes('-h'),
    all: args.includes('--all') || args.includes('-a'),
    yes: args.includes('--yes') || args.includes('-y'),
    force: args.includes('--force') || args.includes('-f'),
    project: args.includes('--project') || args.includes('-p'),
    // Individual agent flags
    claude: args.includes('--claude'),
    gemini: args.includes('--gemini'),
    agents: args.includes('--agents'),
    windsurf: args.includes('--windsurf'),
  };

  const specificAgents = ['claude', 'gemini', 'agents', 'windsurf']
    .filter(a => flags[a]);

  return { flags, specificAgents };
}

// ─── Help ────────────────────────────────────────────────────────

function showHelp() {
  const version = getVersion();
  console.log(`
  Prompt Architect v${version} — Multi-Agent Installer

  Usage:
    npx ${PACKAGE_NAME}                Interactive multi-agent install
    npx ${PACKAGE_NAME} --all          Install to all detected agents
    npx ${PACKAGE_NAME} --claude       Install to Claude Code only

  Agent flags (skip interactive, install to specified targets):
    --claude       Claude Code (~/.claude/skills/)
    --gemini       Gemini CLI (~/.gemini/skills/)
    --agents       Agent Skills universal (~/.agents/skills/)
    --windsurf     Windsurf (.windsurfrules)

  Note: Cursor, Copilot, Codex, and 30+ other tools use the Agent Skills
  standard. Install with --agents to cover all of them.

  Options:
    -a, --all      Install to all detected agents
    -p, --project  Use project-local paths where applicable
    -f, --force    Overwrite existing installations
    -y, --yes      Accept defaults (all detected agents)
    -h, --help     Show this help
`);
}

// ─── Non-Interactive Install ─────────────────────────────────────

function installNonInteractive(agentIds, sourcePath, adaptersPath, isProject) {
  const version = getVersion();
  const results = [];

  for (const agent of AGENTS) {
    if (!agentIds.includes(agent.id)) continue;

    const destPath = agent.installPath(isProject);
    try {
      if (agent.format === 'skill') {
        installSkillDir(sourcePath, destPath);
      } else {
        installAdapter(adaptersPath, agent, destPath);
      }
      results.push({ agent: agent.name, path: destPath, success: true });
    } catch (err) {
      results.push({ agent: agent.name, path: destPath, success: false, error: err.message });
    }
  }

  // Print results
  console.log(`\n  Prompt Architect v${version}\n`);
  for (const r of results) {
    if (r.success) {
      console.log(`  \x1b[32m✓\x1b[0m ${r.agent} → ${r.path}`);
    } else {
      console.log(`  \x1b[31m✗\x1b[0m ${r.agent}: ${r.error}`);
    }
  }

  const succeeded = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  if (succeeded > 0) {
    console.log(`\n  \x1b[32m${succeeded} installed successfully.\x1b[0m Restart your AI agent to load the skill.\n`);
  }
  if (failed > 0) {
    console.log(`  \x1b[31m${failed} failed.\x1b[0m\n`);
    process.exit(1);
  }
}

// ─── Interactive Install ─────────────────────────────────────────

async function installInteractive(sourcePath, adaptersPath, isProject) {
  const p = require('@clack/prompts');
  const version = getVersion();

  p.intro(`Prompt Architect v${version}`);

  // Detect agents
  const detected = AGENTS.filter(a => a.detect());
  const notDetected = AGENTS.filter(a => !a.detect());

  if (detected.length === 0) {
    p.log.warn('No AI agents detected on your system.');
    p.log.info('You can still install to any location using the flags below.');
    showHelp();
    p.outro('No installation performed.');
    return;
  }

  const detectedNames = detected
    .filter(a => !a.alwaysShow)
    .map(a => a.name)
    .join(', ');
  if (detectedNames) {
    p.log.info(`Detected: ${detectedNames}`);
  }

  // Build options — detected first (pre-selected), then others
  const options = [];

  for (const agent of detected) {
    options.push({
      value: agent.id,
      label: agent.name,
      hint: agent.hint(isProject),
    });
  }

  for (const agent of notDetected) {
    options.push({
      value: agent.id,
      label: `${agent.name} (not detected)`,
      hint: agent.hint(isProject),
    });
  }

  const initialValues = detected
    .filter(a => !a.alwaysShow) // Don't pre-select "universal" since it's always available
    .map(a => a.id);

  const selected = await p.multiselect({
    message: 'Select agents to install for:',
    options,
    initialValues,
    required: true,
  });

  if (p.isCancel(selected)) {
    p.cancel('Installation cancelled.');
    process.exit(0);
  }

  // Install to each selected agent
  const s = p.spinner();
  const results = [];

  for (const agentId of selected) {
    const agent = AGENTS.find(a => a.id === agentId);
    if (!agent) continue;

    const destPath = agent.installPath(isProject);
    s.start(`Installing to ${agent.name}...`);

    try {
      if (agent.format === 'skill') {
        installSkillDir(sourcePath, destPath);
      } else {
        installAdapter(adaptersPath, agent, destPath);
      }
      s.stop(`${agent.name} → ${destPath}`);
      results.push({ agent: agent.name, success: true });
    } catch (err) {
      s.stop(`${agent.name}: ${err.message}`);
      results.push({ agent: agent.name, success: false, error: err.message });
    }
  }

  // Summary
  const succeeded = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  if (failed > 0) {
    p.log.warn(`${failed} installation(s) failed.`);
  }

  if (succeeded > 0) {
    p.outro(`${succeeded} agent(s) configured. Restart your AI agent to load the skill.`);
  } else {
    p.outro('No installations succeeded.');
    process.exit(1);
  }
}

// ─── Main ────────────────────────────────────────────────────────

async function main() {
  const { flags, specificAgents } = parseArgs();

  if (flags.help) {
    showHelp();
    process.exit(0);
  }

  // Find source files
  const sourcePath = findSourcePath();
  const adaptersPath = findAdaptersPath();

  if (!sourcePath) {
    console.error(`\n  \x1b[31mError: Could not find ${SKILL_NAME} skill files.\x1b[0m`);
    console.error(`  Try reinstalling: npm install -g ${PACKAGE_NAME}\n`);
    process.exit(1);
  }

  const isProject = flags.project;
  const isInteractive = process.stdin.isTTY && process.stdout.isTTY && !process.env.CI;

  // Mode 1: Specific agent flags provided
  if (specificAgents.length > 0) {
    installNonInteractive(specificAgents, sourcePath, adaptersPath, isProject);
    return;
  }

  // Mode 2: --all flag
  if (flags.all) {
    const detected = AGENTS.filter(a => a.detect()).map(a => a.id);
    installNonInteractive(detected, sourcePath, adaptersPath, isProject);
    return;
  }

  // Mode 3: --yes flag (accept defaults = all detected, non-interactive)
  if (flags.yes) {
    const detected = AGENTS.filter(a => a.detect() && !a.alwaysShow).map(a => a.id);
    installNonInteractive(detected.length > 0 ? detected : ['claude'], sourcePath, adaptersPath, isProject);
    return;
  }

  // Mode 4: Interactive
  if (isInteractive) {
    await installInteractive(sourcePath, adaptersPath, isProject);
    return;
  }

  // Mode 5: Non-interactive fallback (postinstall, CI)
  // Use stderr for postinstall — npm suppresses stdout from lifecycle scripts
  const log = console.error.bind(console);
  const version = getVersion();
  const results = [];

  for (const agent of AGENTS) {
    if (agent.id !== 'claude') continue;
    const destPath = agent.installPath(isProject);
    try {
      if (agent.format === 'skill') {
        installSkillDir(sourcePath, destPath);
      }
      results.push({ agent: agent.name, path: destPath, success: true });
    } catch (err) {
      results.push({ agent: agent.name, path: destPath, success: false, error: err.message });
    }
  }

  log('');
  log(`  \x1b[36mPrompt Architect v${version}\x1b[0m`);
  log('');
  for (const r of results) {
    if (r.success) {
      log(`  \x1b[32m✓\x1b[0m ${r.agent} → ${r.path}`);
    } else {
      log(`  \x1b[31m✗\x1b[0m ${r.agent}: ${r.error}`);
    }
  }
  log('');
  log(`  For multi-agent install: \x1b[36mnpx ${PACKAGE_NAME}\x1b[0m`);
  log('');
}

main().catch(err => {
  console.error(`\n  \x1b[31mInstallation error: ${err.message}\x1b[0m\n`);
  process.exit(1);
});
