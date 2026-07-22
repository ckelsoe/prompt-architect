#!/usr/bin/env node

/**
 * Test Script
 * 
 * Runs basic tests to verify the skill package is properly configured.
 */

const fs = require('fs');
const path = require('path');

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

log('\n🧪 Running tests for Prompt Architect skill...\n', 'blue');

let passed = 0;
let failed = 0;

function test(description, fn) {
  try {
    fn();
    log(`✅ ${description}`, 'green');
    passed++;
  } catch (error) {
    log(`❌ ${description}`, 'red');
    log(`   ${error.message}`, 'red');
    failed++;
  }
}

// Tests
test('package.json exists', () => {
  if (!fs.existsSync('package.json')) throw new Error('Not found');
});

test('package.json is valid JSON', () => {
  JSON.parse(fs.readFileSync('package.json', 'utf8'));
});

test('SKILL.md exists', () => {
  if (!fs.existsSync('skills/prompt-architect/SKILL.md')) throw new Error('Not found');
});

test('LICENSE exists', () => {
  if (!fs.existsSync('LICENSE')) throw new Error('Not found');
});

test('README.md exists', () => {
  if (!fs.existsSync('README.md')) throw new Error('Not found');
});

test('CHANGELOG.md exists', () => {
  if (!fs.existsSync('CHANGELOG.md')) throw new Error('Not found');
});

const FRAMEWORKS_DIR = path.join('skills', 'prompt-architect', 'references', 'frameworks');
const TEMPLATES_DIR = path.join('skills', 'prompt-architect', 'assets', 'templates');

test('Framework reference docs exist', () => {
  const docs = fs.readdirSync(FRAMEWORKS_DIR).filter(f => f.endsWith('.md'));
  if (docs.length === 0) {
    throw new Error('No framework reference docs found');
  }
});

test('Every framework has a template', () => {
  // rise.md defines two independently-selectable frameworks.
  const multi = { 'rise.md': ['rise-ie', 'rise-ix'] };
  const templates = new Set(fs.readdirSync(TEMPLATES_DIR));
  const missing = [];

  for (const doc of fs.readdirSync(FRAMEWORKS_DIR).filter(f => f.endsWith('.md'))) {
    const slugs = multi[doc] || [doc.replace(/\.md$/, '')];
    for (const slug of slugs) {
      if (!templates.has(`${slug}_template.txt`)) missing.push(`${slug}_template.txt`);
    }
  }
  if (missing.length > 0) {
    throw new Error(`Missing templates: ${missing.join(', ')}`);
  }
  if (!templates.has('hybrid_template.txt')) {
    throw new Error('Missing hybrid_template.txt');
  }
});

test('package.json has required fields', () => {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const required = ['name', 'version', 'description', 'main', 'keywords', 'license'];
  required.forEach(field => {
    if (!pkg[field]) throw new Error(`Missing field: ${field}`);
  });
});

test('package.json keywords include "claude-code"', () => {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (!pkg.keywords || !pkg.keywords.includes('claude-code')) {
    throw new Error('Missing "claude-code" keyword');
  }
});

// Plugin manifest tests
test('.claude-plugin/plugin.json exists and is valid', () => {
  const pluginPath = '.claude-plugin/plugin.json';
  if (!fs.existsSync(pluginPath)) throw new Error('Not found');
  const plugin = JSON.parse(fs.readFileSync(pluginPath, 'utf8'));
  if (!plugin.name) throw new Error('Missing name');
  if (!plugin.description) throw new Error('Missing description');
  if (!plugin.version) throw new Error('Missing version');
});

test('.claude-plugin/marketplace.json exists and is valid', () => {
  const mktPath = '.claude-plugin/marketplace.json';
  if (!fs.existsSync(mktPath)) throw new Error('Not found');
  const mkt = JSON.parse(fs.readFileSync(mktPath, 'utf8'));
  if (!mkt.name) throw new Error('Missing name');
  if (!mkt.owner) throw new Error('Missing owner');
  if (!mkt.plugins || mkt.plugins.length === 0) throw new Error('No plugins defined');
});

test('plugin.json version matches package.json version', () => {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const plugin = JSON.parse(fs.readFileSync('.claude-plugin/plugin.json', 'utf8'));
  if (pkg.version !== plugin.version) {
    throw new Error(`Version mismatch: package.json=${pkg.version}, plugin.json=${plugin.version}`);
  }
});

// Adapter tests
test('All adapter files exist', () => {
  const adapters = [
    'system-prompt.md',
    'for-windsurf.md',
    'README.md',
  ];
  adapters.forEach(a => {
    if (!fs.existsSync(path.join('adapters', a))) throw new Error(`Adapter ${a} not found`);
  });
});

// SKILL.md <-> adapter drift guard.
// These two files are hand-maintained copies of the same instructions and have
// drifted before (the adapter was renumbered 1-7 while SKILL.md kept a duplicate
// step 4). Compare the sections that must stay identical.
test('Adapter has not drifted from SKILL.md', () => {
  const skill = fs.readFileSync('skills/prompt-architect/SKILL.md', 'utf8');
  const adapter = fs.readFileSync('adapters/system-prompt.md', 'utf8');

  // 1. Step headings must match in number, order, and title.
  const steps = s => (s.match(/^### \d+\. .+$/gm) || []).map(h => h.trim());
  const skillSteps = steps(skill);
  const adapterSteps = steps(adapter);
  if (skillSteps.join('|') !== adapterSteps.join('|')) {
    throw new Error(
      `Step headings differ.\n  SKILL.md: ${JSON.stringify(skillSteps)}\n  adapter:  ${JSON.stringify(adapterSteps)}`
    );
  }

  // 2. Step numbers must be a clean 1..N with no duplicates.
  const nums = skillSteps.map(h => parseInt(h.match(/^### (\d+)\./)[1], 10));
  const expected = nums.map((_, i) => i + 1);
  if (nums.join(',') !== expected.join(',')) {
    throw new Error(`Step numbering is not sequential: ${nums.join(',')}`);
  }

  // 3. The intent-routing framework names must match between the two files.
  const routed = s => [...s.matchAll(/\*\*([A-Za-z][A-Za-z0-9 +'’-]*?)\*\*/g)]
    .map(m => m[1]).filter(n => /^[A-Z]/.test(n));
  const missing = [...new Set(routed(skill))].filter(n => !routed(adapter).includes(n));
  const routingNames = ['CO-STAR', 'RISEN', 'RISE-IE', 'RISE-IX', 'TIDD-EC', 'CTF', 'RTF',
    'APE', 'BAB', 'RACE', 'CRISPE', 'BROKE', 'CARE', 'ReAct', 'RCoT', 'RPEF'];
  const dropped = routingNames.filter(n => skill.includes(n) && !adapter.includes(n));
  if (dropped.length > 0) {
    throw new Error(`Frameworks in SKILL.md but missing from adapter: ${dropped.join(', ')}`);
  }
  void missing;

  // 4. Load-bearing rules must be present in BOTH files.
  //    Checks 1-3 compare only step headings and framework names, so they cannot
  //    see prose drift. The adapter shipped without SKILL.md's entire output
  //    delivery contract -- the rules that define what the skill actually emits --
  //    while this test passed. Any rule that changes the emitted artifact goes here.
  const invariants = [
    'No framework section headers',
    'scaffolding, not part of the deliverable',
    'paste it verbatim with zero editing',
    'the absolute last element in the response',
    'Your revised prompt is ready.',
    'Never stack more than two',
    'Never default a fact about the user',
    'Never soften or drop a prohibition',
    // The anti-false-narration guardrail: the model must not invent a rationale
    // for a framework choice the stripped output cannot show. Lives in both files.
    'A confident rationale for an unobservable choice',
    // The few-shot hook must live in the Apply-Framework step of BOTH files, or
    // the composable technique is documented but never reached at build time.
    'Decide whether worked examples would materially improve the output',
    // The worked example must demonstrate the emission rules, not violate them.
    // The adapter previously shipped a BAB example with BEFORE:/AFTER:/BRIDGE: headers.
    'Now rewrite the job posting above.',
  ];
  const divergent = invariants.filter(r => skill.includes(r) !== adapter.includes(r));
  if (divergent.length > 0) {
    const detail = divergent
      .map(r => `${JSON.stringify(r)} (SKILL.md: ${skill.includes(r) ? 'yes' : 'NO'}, adapter: ${adapter.includes(r) ? 'yes' : 'NO'})`)
      .join('\n  ');
    throw new Error(`Emission-contract rules differ between SKILL.md and the adapter:\n  ${detail}`);
  }
});

// Agent Skills compliance tests
test('SKILL.md has Agent Skills required fields', () => {
  const content = fs.readFileSync('skills/prompt-architect/SKILL.md', 'utf8');
  const fm = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) throw new Error('No frontmatter');
  if (!fm[1].includes('name:')) throw new Error('Missing name');
  if (!fm[1].includes('description:')) throw new Error('Missing description');
});

test('SKILL.md has optional Agent Skills fields', () => {
  const content = fs.readFileSync('skills/prompt-architect/SKILL.md', 'utf8');
  const fm = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) throw new Error('No frontmatter');
  if (!fm[1].includes('license:')) throw new Error('Missing license');
  if (!fm[1].includes('compatibility:')) throw new Error('Missing compatibility');
  if (!fm[1].includes('metadata:')) throw new Error('Missing metadata');
});

test('SKILL.md name matches directory name', () => {
  const content = fs.readFileSync('skills/prompt-architect/SKILL.md', 'utf8');
  const nameMatch = content.match(/name:\s*([^\n\r]+)/);
  if (!nameMatch) throw new Error('No name field');
  if (nameMatch[1].trim() !== 'prompt-architect') {
    throw new Error(`Name "${nameMatch[1].trim()}" does not match directory "prompt-architect"`);
  }
});

// Summary
log('\n' + '='.repeat(50), 'blue');
log(`Tests completed: ${passed + failed} total`, 'blue');
log(`✅ Passed: ${passed}`, 'green');
if (failed > 0) {
  log(`❌ Failed: ${failed}`, 'red');
  log('='.repeat(50) + '\n', 'blue');
  process.exit(1);
} else {
  log('='.repeat(50), 'blue');
  log('\n✨ All tests passed!\n', 'green');
  process.exit(0);
}
