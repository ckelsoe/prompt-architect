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
const SKILL_DIR = path.join(__dirname, '..', 'skills', 'prompt-architect');
const SKILL_FILE = path.join(SKILL_DIR, 'SKILL.md');

const REQUIRED_DIRS = [
  'references/frameworks',
  'assets/templates',
];

const FRAMEWORKS_DIR = path.join(SKILL_DIR, 'references', 'frameworks');
const TEMPLATES_DIR = path.join(SKILL_DIR, 'assets', 'templates');

// Templates that are not named after a single framework.
const NON_FRAMEWORK_TEMPLATES = ['hybrid_template.txt'];

// Reference docs that define more than one independently-selectable framework.
// rise.md documents RISE-IE and RISE-IX, each with its own template and routing row.
const MULTI_FRAMEWORK_DOCS = { 'rise.md': ['rise-ie', 'rise-ix'] };

// Read the filesystem rather than hardcoding lists — a hardcoded subset is why
// count drift and a deleted reference doc could both pass CI silently.
function listFrameworkDocs() {
  return fs.readdirSync(FRAMEWORKS_DIR).filter(f => f.endsWith('.md')).sort();
}

function listTemplates() {
  return fs.readdirSync(TEMPLATES_DIR).filter(f => f.endsWith('.txt')).sort();
}

// The advertised framework count: one per reference doc, except docs that
// define several.
function expectedFrameworkCount() {
  return listFrameworkDocs().reduce(
    (n, doc) => n + (MULTI_FRAMEWORK_DOCS[doc] ? MULTI_FRAMEWORK_DOCS[doc].length : 1),
    0
  );
}

// Every template slug a framework doc implies.
function expectedTemplateSlugs() {
  const slugs = [];
  for (const doc of listFrameworkDocs()) {
    const base = doc.replace(/\.md$/, '');
    if (MULTI_FRAMEWORK_DOCS[doc]) slugs.push(...MULTI_FRAMEWORK_DOCS[doc]);
    else slugs.push(base);
  }
  return slugs;
}

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
  const frameworkDocs = listFrameworkDocs();
  if (frameworkDocs.length === 0) {
    error('No framework reference docs found');
    errorCount++;
  }
  frameworkDocs.forEach(framework => {
    const stats = fs.statSync(path.join(FRAMEWORKS_DIR, framework));
    if (stats.size < 5000) {
      warning(`Framework ${framework} seems small (< 5 KB)`);
      warningCount++;
    }
  });
  success(`${frameworkDocs.length} framework reference docs found`);

  // Check every framework has its template, and no template is orphaned
  info('\nValidating template files...');
  const templates = listTemplates();
  const templateSet = new Set(templates);
  let templateErrors = 0;

  for (const slug of expectedTemplateSlugs()) {
    const expected = `${slug}_template.txt`;
    if (!templateSet.has(expected)) {
      error(`Template missing for framework "${slug}": ${expected}`);
      errorCount++;
      templateErrors++;
    }
  }

  const expectedSet = new Set([
    ...expectedTemplateSlugs().map(s => `${s}_template.txt`),
    ...NON_FRAMEWORK_TEMPLATES,
  ]);
  for (const template of templates) {
    if (!expectedSet.has(template)) {
      error(`Orphaned template with no corresponding framework doc: ${template}`);
      errorCount++;
      templateErrors++;
    }
  }
  for (const template of NON_FRAMEWORK_TEMPLATES) {
    if (!templateSet.has(template)) {
      error(`Required non-framework template missing: ${template}`);
      errorCount++;
      templateErrors++;
    }
  }
  if (templateErrors === 0) {
    success(`${templates.length} templates found, all matched to frameworks`);
  }

  // Cross-check the advertised count against what is actually on disk
  validateFrameworkCount();

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

}

// Assert the advertised framework count matches the filesystem, everywhere it
// is stated. This is the check whose absence let "27" survive to v3.2.2 while
// 28 frameworks shipped.
function validateFrameworkCount() {
  info('\nValidating advertised framework count...');
  const actual = expectedFrameworkCount();
  const root = path.join(__dirname, '..');
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

  const declared = (pkg.claudeCode && pkg.claudeCode.frameworks) || [];
  if (declared.length !== actual) {
    error(`package.json claudeCode.frameworks lists ${declared.length} frameworks, but ${actual} exist on disk`);
    errorCount++;
  } else {
    success(`claudeCode.frameworks matches disk (${actual})`);
  }

  // Any prose that says "<N> ... framework" or "<N>-framework" must say N = actual.
  const proseSites = [
    'package.json',
    '.claude-plugin/plugin.json',
    '.claude-plugin/marketplace.json',
    'README.md',
    'adapters/system-prompt.md',
    path.join('skills', 'prompt-architect', 'SKILL.md'),
  ];
  const countPattern = /(\d+)[\s-]+(?:research-backed\s+)?frameworks?\b/gi;
  let mismatches = 0;

  for (const rel of proseSites) {
    const full = path.join(root, rel);
    if (!fs.existsSync(full)) continue;
    const lines = fs.readFileSync(full, 'utf8').split('\n');
    lines.forEach((line, i) => {
      let m;
      countPattern.lastIndex = 0;
      while ((m = countPattern.exec(line)) !== null) {
        const n = parseInt(m[1], 10);
        // Ignore small numbers — those are phrases like "two frameworks", or
        // "2 frameworks" inside an explanatory sentence, not the headline count.
        if (n >= 10 && n !== actual) {
          error(`${rel}:${i + 1} advertises ${n} frameworks, but ${actual} exist — "${m[0]}"`);
          errorCount++;
          mismatches++;
        }
      }
    });
  }
  if (mismatches === 0) {
    success(`All advertised framework counts agree (${actual})`);
  }
}

// CLAUDE.md claims CI validates the SKILL.md version. It did not. It does now,
// along with every other site that carries the version.
function validateVersionSites() {
  info('\nValidating version consistency across all sites...');
  const root = path.join(__dirname, '..');
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const expected = pkg.version;

  const sites = [];

  sites.push({ name: 'package.json claudeCode.version', value: pkg.claudeCode && pkg.claudeCode.version });

  const pluginPath = path.join(root, '.claude-plugin', 'plugin.json');
  if (fs.existsSync(pluginPath)) {
    sites.push({ name: 'plugin.json version', value: JSON.parse(fs.readFileSync(pluginPath, 'utf8')).version });
  }

  const marketPath = path.join(root, '.claude-plugin', 'marketplace.json');
  if (fs.existsSync(marketPath)) {
    const market = JSON.parse(fs.readFileSync(marketPath, 'utf8'));
    (market.plugins || []).forEach((p, i) => {
      sites.push({ name: `marketplace.json plugins[${i}].version`, value: p.version });
    });
  }

  if (fs.existsSync(SKILL_FILE)) {
    const fm = fs.readFileSync(SKILL_FILE, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const m = fm && fm[1].match(/^\s*version:\s*["']?([^"'\r\n]+)["']?\s*$/m);
    sites.push({ name: 'SKILL.md metadata.version', value: m ? m[1].trim() : undefined });
  }

  let bad = 0;
  for (const site of sites) {
    if (site.value === undefined) {
      error(`${site.name} is missing — cannot verify it matches package.json (${expected})`);
      errorCount++;
      bad++;
    } else if (site.value !== expected) {
      error(`${site.name} is ${site.value}, expected ${expected}`);
      errorCount++;
      bad++;
    }
  }
  if (bad === 0) {
    success(`All ${sites.length + 1} version sites agree (${expected})`);
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
  const requiredFields = ['name', 'description', 'version'];
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

function validatePluginManifest() {
  info('\nValidating Claude plugin manifest...');
  const pluginJsonPath = path.join(__dirname, '..', '.claude-plugin', 'plugin.json');
  const marketplacePath = path.join(__dirname, '..', '.claude-plugin', 'marketplace.json');

  if (!fs.existsSync(pluginJsonPath)) {
    error('.claude-plugin/plugin.json not found');
    errorCount++;
    return;
  }
  success('.claude-plugin/plugin.json found');

  try {
    const plugin = JSON.parse(fs.readFileSync(pluginJsonPath, 'utf8'));
    const requiredFields = ['name', 'description', 'version'];
    requiredFields.forEach(field => {
      if (!plugin[field]) {
        error(`plugin.json missing required field: ${field}`);
        errorCount++;
      } else {
        success(`plugin.json has ${field}`);
      }
    });

    // Cross-check version with package.json
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      if (plugin.version !== pkg.version) {
        error(`Version mismatch: plugin.json=${plugin.version}, package.json=${pkg.version}`);
        errorCount++;
      } else {
        success('plugin.json version matches package.json');
      }
    }
  } catch (err) {
    error(`plugin.json parse error: ${err.message}`);
    errorCount++;
  }

  if (!fs.existsSync(marketplacePath)) {
    warning('.claude-plugin/marketplace.json not found (optional for plugins)');
    warningCount++;
  } else {
    try {
      const mkt = JSON.parse(fs.readFileSync(marketplacePath, 'utf8'));
      if (!mkt.name || !mkt.owner || !mkt.plugins) {
        error('marketplace.json missing required fields (name, owner, plugins)');
        errorCount++;
      } else {
        success(`marketplace.json valid: ${mkt.plugins.length} plugin(s) defined`);
      }
    } catch (err) {
      error(`marketplace.json parse error: ${err.message}`);
      errorCount++;
    }
  }
}

// Run validation
try {
  validateSkill();
  validatePluginManifest();
  validateVersionSites();

  // Final summary
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
} catch (err) {
  error(`Validation error: ${err.message}`);
  console.error(err);
  process.exit(1);
}
