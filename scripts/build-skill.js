#!/usr/bin/env node

/**
 * Build .skill file (zip archive of the skill directory)
 *
 * Creates prompt-architect.skill in the repo root — a zip of
 * skills/prompt-architect/ that can be uploaded to ChatGPT,
 * Gemini CLI, or any Agent Skills compatible tool.
 *
 * Usage:
 *   node scripts/build-skill.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SKILL_DIR = path.join(__dirname, '..', 'skills', 'prompt-architect');
const OUTPUT_FILE = path.join(__dirname, '..', 'prompt-architect.skill');

if (!fs.existsSync(SKILL_DIR)) {
  console.error('Error: skills/prompt-architect/ not found');
  process.exit(1);
}

// Remove old .skill file if exists
if (fs.existsSync(OUTPUT_FILE)) {
  fs.unlinkSync(OUTPUT_FILE);
}

// Use tar on all platforms (available in Git Bash on Windows, native on macOS/Linux)
// Create a zip using Node.js built-in zlib won't work for directories,
// so we use the platform's zip/tar command.
try {
  const skillsRoot = path.join(__dirname, '..', 'skills');

  if (process.platform === 'win32') {
    // PowerShell's Compress-Archive via child process
    execSync(
      `powershell -NoProfile -Command "Compress-Archive -Path '${SKILL_DIR}\\*' -DestinationPath '${OUTPUT_FILE}.zip' -Force"`,
      { stdio: 'inherit' }
    );
    // Rename .zip to .skill
    fs.renameSync(OUTPUT_FILE + '.zip', OUTPUT_FILE);
  } else {
    // Unix: use zip command from the skills/ directory
    execSync(
      `cd "${skillsRoot}" && zip -r "${OUTPUT_FILE}" prompt-architect/`,
      { stdio: 'inherit' }
    );
  }

  const stats = fs.statSync(OUTPUT_FILE);
  const sizeKB = (stats.size / 1024).toFixed(1);
  console.log(`\n  Built: prompt-architect.skill (${sizeKB} KB)\n`);
  console.log('  Upload this file to:');
  console.log('    - ChatGPT: Profile → Skills → New skill → Upload');
  console.log('    - Gemini CLI: gemini skills install ./prompt-architect.skill');
  console.log('    - Any Agent Skills compatible tool\n');

} catch (err) {
  console.error(`Build failed: ${err.message}`);
  process.exit(1);
}
