#!/usr/bin/env node

/**
 * Prompt Architect Installation Script
 * 
 * Automatically installs the Prompt Architect skill to Claude Code.
 * Supports both user-wide and project-specific installations.
 * 
 * Usage:
 *   npm install -g @ckelsoe/claude-skill-prompt-architect
 *   prompt-architect-install           # User-wide installation
 *   prompt-architect-install --project # Project-specific installation
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

// Configuration
const SKILL_NAME = 'prompt-architect';
const PACKAGE_NAME = '@ckelsoe/claude-skill-prompt-architect';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Parse command line arguments
const args = process.argv.slice(2);
const isProjectInstall = args.includes('--project') || args.includes('-p');
const isForce = args.includes('--force') || args.includes('-f');
const isHelp = args.includes('--help') || args.includes('-h');

// Show help
if (isHelp) {
  log('\nPrompt Architect Installation Script\n', 'cyan');
  log('Usage:', 'blue');
  log('  prompt-architect-install              Install for current user');
  log('  prompt-architect-install --project    Install for current project');
  log('  prompt-architect-install --force      Overwrite existing installation');
  log('  prompt-architect-install --help       Show this help\n');
  log('Options:', 'blue');
  log('  -p, --project    Install to .claude/skills/ (project-specific)');
  log('  -f, --force      Force installation even if skill exists');
  log('  -h, --help       Show help information\n');
  log('Examples:', 'blue');
  log('  # Global installation (all projects)');
  log('  npm install -g ' + PACKAGE_NAME);
  log('  prompt-architect-install\n');
  log('  # Project installation (current project only)');
  log('  npm install --save-dev ' + PACKAGE_NAME);
  log('  prompt-architect-install --project\n');
  process.exit(0);
}

// Determine source path (where the skill files are in the npm package)
let sourcePath;
try {
  // Try to find the package in node_modules
  const localPath = path.join(process.cwd(), 'node_modules', PACKAGE_NAME, SKILL_NAME);
  const globalPath = path.join(execSync('npm root -g', { encoding: 'utf8' }).trim(), PACKAGE_NAME, SKILL_NAME);
  
  if (fs.existsSync(localPath)) {
    sourcePath = localPath;
  } else if (fs.existsSync(globalPath)) {
    sourcePath = globalPath;
  } else {
    // Fallback: relative to this script (for development)
    sourcePath = path.join(__dirname, '..', SKILL_NAME);
  }
} catch (error) {
  sourcePath = path.join(__dirname, '..', SKILL_NAME);
}

// Verify source exists
if (!fs.existsSync(sourcePath)) {
  log('❌ Error: Could not find prompt-architect skill files', 'red');
  log(`   Looked in: ${sourcePath}`, 'red');
  log('\n   Try reinstalling the package:', 'yellow');
  log('   npm install -g ' + PACKAGE_NAME + '\n', 'yellow');
  process.exit(1);
}

// Determine installation path
const installPath = isProjectInstall
  ? path.join(process.cwd(), '.claude', 'skills', SKILL_NAME)
  : path.join(os.homedir(), '.claude', 'skills', SKILL_NAME);

// Get current package version
const currentVersion = (() => {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    return pkg.version || 'unknown';
  } catch { return 'unknown'; }
})();

// Install the skill
try {
  log('\n🚀 Installing Prompt Architect skill...\n', 'cyan');
  log(`   From: ${sourcePath}`, 'blue');
  log(`   To:   ${installPath}\n`, 'blue');

  // Create directory structure
  const skillsDir = path.dirname(installPath);
  if (!fs.existsSync(skillsDir)) {
    log('   Creating skills directory...', 'blue');
    fs.mkdirSync(skillsDir, { recursive: true });
  }

  // Remove any existing installation before copying fresh
  if (fs.existsSync(installPath)) {
    log('   Removing existing installation...', 'blue');
    fs.rmSync(installPath, { recursive: true, force: true });
  }

  // Copy files
  log('   Copying skill files...', 'blue');
  copyRecursive(sourcePath, installPath);

  // Verify installation
  const skillFile = path.join(installPath, 'SKILL.md');
  if (!fs.existsSync(skillFile)) {
    throw new Error('SKILL.md not found after installation');
  }

  log(`\n✅ Prompt Architect ${currentVersion} installed successfully!\n`, 'green');
  log('📍 Installation location:', 'cyan');
  log(`   ${installPath}\n`);
  
  if (isProjectInstall) {
    log('📝 Project installation notes:', 'cyan');
    log('   - Skill is only available in this project');
    log('   - Consider adding .claude/skills/ to git for team sharing\n');
  } else {
    log('📝 User installation notes:', 'cyan');
    log('   - Skill is available in all your Claude Code projects\n');
  }

  log('🎯 Next steps:', 'cyan');
  log('   1. Restart Claude Code to load the skill');
  log('   2. Test with: "Help me improve this prompt: write about AI"');
  log('   3. Check documentation: https://github.com/ckelsoe/claude-skill-prompt-architect\n');
  
  log('💡 Tip: Ask Claude about available frameworks:', 'blue');
  log('   "What prompting frameworks does Prompt Architect support?"\n');

} catch (error) {
  log('\n❌ Installation failed:', 'red');
  log(`   ${error.message}\n`, 'red');
  
  if (error.code === 'EACCES' || error.code === 'EPERM') {
    log('   Permission denied. Try:', 'yellow');
    if (process.platform === 'win32') {
      log('   - Run as Administrator', 'yellow');
    } else {
      log('   - Use sudo: sudo prompt-architect-install', 'yellow');
    }
    log('   - Or install to project: prompt-architect-install --project\n', 'yellow');
  }
  
  process.exit(1);
}

/**
 * Recursively copy directory contents
 */
function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  
  if (stats.isDirectory()) {
    // Create directory
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    // Copy contents
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      const srcPath = path.join(src, entry);
      const destPath = path.join(dest, entry);
      copyRecursive(srcPath, destPath);
    }
  } else {
    // Copy file
    fs.copyFileSync(src, dest);
  }
}
