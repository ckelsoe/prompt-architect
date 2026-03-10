#!/usr/bin/env node

/**
 * Skill Structure Validator
 * 
 * Validates the Claude Code skill structure before publishing to npm.
 * Checks:
 * - SKILL.md exists and has valid frontmatter
 * - Required directories are present
 * - Framework files exist
 * - Templates exist
 * - File sizes are reasonable
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message) {
  log(`❌ ${message}`, 'red');
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function warning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function info(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// Configuration
const SKILL_DIR = path.join(__dirname, '..', 'prompt-architect');
const SKILL_FILE = path.join(SKILL_DIR, 'SKILL.md');

const REQUIRED_DIRS = [
  'scripts',
  'references/frameworks',
  'assets/templates',
];

const REQUIRED_FRAMEWORKS = [
  'co-star.md',
  'risen.md',
  'rise.md',
  'tidd-ec.md',
  'rtf.md',
  'chain-of-thought.md',
  'chain-of-density.md',
];

const REQUIRED_TEMPLATES = [
  'co-star_template.txt',
  'risen_template.txt',
  'rise-ie_template.txt',
  'rise-ix_template.txt',
  'tidd-ec_template.txt',
  'rtf_template.txt',
  'hybrid_template.txt',
];

const REQUIRED_SCRIPTS = [
  'framework_analyzer.py',
  'prompt_evaluator.py',
];

let errorCount = 0;
let warningCount = 0;

// Main validation
function validateSkill() {
  log('\n🔍 Validating Prompt Architect Skill Structure...\n', 'blue');

  // Check skill directory exists
  if (!fs.existsSync(SKILL_DIR)) {
    error(`Skill directory not found: ${SKILL_DIR}`);
    process.exit(1);
  }
  success('Skill directory found');

  // Check SKILL.md exists
  if (!fs.existsSync(SKILL_FILE)) {
    error('SKILL.md not found');
    errorCount++;
  } else {
    success('SKILL.md found');
    validateSkillFile();
  }

  // Check required directories
  REQUIRED_DIRS.forEach(dir => {
    const fullPath = path.join(SKILL_DIR, dir);
    if (!fs.existsSync(fullPath)) {
      error(`Required directory missing: ${dir}`);
      errorCount++;
    } else {
      success(`Directory found: ${dir}`);
    }
  });

  // Check framework files
  info('\nValidating framework files...');
  REQUIRED_FRAMEWORKS.forEach(framework => {
    const frameworkPath = path.join(SKILL_DIR, 'references', 'frameworks', framework);
    if (!fs.existsSync(frameworkPath)) {
      error(`Framework file missing: ${framework}`);
      errorCount++;
    } else {
      const stats = fs.statSync(frameworkPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      success(`Framework found: ${framework} (${sizeKB} KB)`);
      
      // Warn if framework file is too small
      if (stats.size < 5000) {
        warning(`Framework ${framework} seems small (< 5 KB)`);
        warningCount++;
      }
    }
  });

  // Check template files
  info('\nValidating template files...');
  REQUIRED_TEMPLATES.forEach(template => {
    const templatePath = path.join(SKILL_DIR, 'assets', 'templates', template);
    if (!fs.existsSync(templatePath)) {
      error(`Template file missing: ${template}`);
      errorCount++;
    } else {
      success(`Template found: ${template}`);
    }
  });

  // Check script files
  info('\nValidating script files...');
  REQUIRED_SCRIPTS.forEach(script => {
    const scriptPath = path.join(SKILL_DIR, 'scripts', script);
    if (!fs.existsSync(scriptPath)) {
      error(`Script file missing: ${script}`);
      errorCount++;
    } else {
      success(`Script found: ${script}`);
    }
  });

  // Check package structure
  info('\nValidating package structure...');
  const packageJson = path.join(__dirname, '..', 'package.json');
  if (!fs.existsSync(packageJson)) {
    error('package.json not found');
    errorCount++;
  } else {
    success('package.json found');
    validatePackageJson();
  }

  // Summary
  log('\n' + '='.repeat(50), 'blue');
  if (errorCount === 0 && warningCount === 0) {
    success('\n✨ All validation checks passed! Ready to publish. ✨\n');
    process.exit(0);
  } else if (errorCount === 0) {
    warning(`\n⚠️  Validation passed with ${warningCount} warning(s)\n`);
    process.exit(0);
  } else {
    error(`\n❌ Validation failed with ${errorCount} error(s) and ${warningCount} warning(s)\n`);
    process.exit(1);
  }
}

function validateSkillFile() {
  const content = fs.readFileSync(SKILL_FILE, 'utf8');
  
  // Check for YAML frontmatter (handle both LF and CRLF line endings)
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) {
    error('SKILL.md missing YAML frontmatter (---\\n...\\n---)');
    errorCount++;
    return;
  }
  success('YAML frontmatter found');
  
  const frontmatter = frontmatterMatch[1];
  
  // Check required fields
  const requiredFields = ['name', 'description'];
  requiredFields.forEach(field => {
    if (!frontmatter.includes(`${field}:`)) {
      error(`SKILL.md missing required field: ${field}`);
      errorCount++;
    } else {
      success(`Required field found: ${field}`);
    }
  });
  
  // Validate name format
  const nameMatch = frontmatter.match(/name:\s*([^\n]+)/);
  if (nameMatch) {
    const name = nameMatch[1].trim();
    if (!/^[a-z0-9-]+$/.test(name)) {
      error(`Invalid skill name format: "${name}" (use lowercase, numbers, hyphens only)`);
      errorCount++;
    } else if (name.length > 64) {
      error(`Skill name too long: ${name.length} characters (max 64)`);
      errorCount++;
    } else {
      success(`Valid skill name: ${name}`);
    }
  }
  
  // Validate description length
  const descMatch = frontmatter.match(/description:\s*([^\n]+)/);
  if (descMatch && descMatch[1].length > 1024) {
    error(`Description too long: ${descMatch[1].length} characters (max 1024)`);
    errorCount++;
  } else if (descMatch) {
    success(`Valid description length: ${descMatch[1].length} characters`);
  }
  
  // Check content size
  const sizeKB = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(2);
  info(`SKILL.md size: ${sizeKB} KB`);
  if (sizeKB > 100) {
    warning('SKILL.md is quite large (> 100 KB). Consider splitting content.');
    warningCount++;
  }
}

function validatePackageJson() {
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Check required fields
  const requiredFields = ['name', 'version', 'description', 'main', 'keywords', 'license'];
  requiredFields.forEach(field => {
    if (!packageJson[field]) {
      error(`package.json missing required field: ${field}`);
      errorCount++;
    } else {
      success(`package.json has ${field}`);
    }
  });
  
  // Check keywords include claude-code
  if (packageJson.keywords && !packageJson.keywords.includes('claude-code')) {
    warning('package.json keywords should include "claude-code"');
    warningCount++;
  }
  
  // Check files array
  if (!packageJson.files || packageJson.files.length === 0) {
    warning('package.json should specify "files" array for npm publish');
    warningCount++;
  } else {
    success(`package.json specifies ${packageJson.files.length} file patterns`);
  }
  
  // Validate version format
  const versionRegex = /^\d+\.\d+\.\d+(-[a-z0-9.]+)?$/;
  if (!versionRegex.test(packageJson.version)) {
    error(`Invalid version format: ${packageJson.version} (use semver: X.Y.Z)`);
    errorCount++;
  } else {
    success(`Valid version: ${packageJson.version}`);
  }
}

// Run validation
try {
  validateSkill();
} catch (err) {
  error(`Validation error: ${err.message}`);
  console.error(err);
  process.exit(1);
}
