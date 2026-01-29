#!/usr/bin/env node

/**
 * Secret Scanner for Ready Check
 *
 * PreToolUse hook that scans content being written to .ready-check/
 * for secrets before the write happens. Uses patterns from gitleaks.
 *
 * Exit codes:
 *   0 = Clean, allow write
 *   2 = Secrets found, block write (stderr shown to Claude)
 */

const fs = require('fs');
const path = require('path');

const patternsPath = path.join(__dirname, 'secret-patterns.json');
let patterns;

try {
  patterns = JSON.parse(fs.readFileSync(patternsPath, 'utf8'));
} catch (err) {
  console.error(`Warning: Could not load secret patterns: ${err.message}`);
  process.exit(0);
}

let input = '';

process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    const hookInput = JSON.parse(input);
    const result = scanForSecrets(hookInput);

    if (result.blocked) {
      // Exit 2 = block the tool call, stderr is shown to Claude
      console.error(result.message);
      process.exit(2);
    }

    // Exit 0 = allow the write
    process.exit(0);

  } catch (err) {
    console.error(`Warning: Secret scanner error: ${err.message}`);
    process.exit(0);
  }
});

/**
 * Scan hook input for secrets
 */
function scanForSecrets(hookInput) {
  const toolInput = hookInput.tool_input || {};
  const filePath = toolInput.file_path || '';

  // Only scan writes to .ready-check/ directory
  if (!filePath.includes('.ready-check')) {
    return { blocked: false };
  }

  // Get content to scan
  // For Write tool: content field
  // For Edit tool: new_string field
  const content = toolInput.content || toolInput.new_string || '';

  if (!content) {
    return { blocked: false };
  }

  // Scan against all patterns
  const findings = [];

  for (const rule of patterns.rules) {
    try {
      const regex = new RegExp(rule.regex, 'gi');
      const matches = content.match(regex);

      if (matches) {
        // Don't include the actual secret value - just report the type
        findings.push({
          id: rule.id,
          description: rule.description,
          count: matches.length
        });
      }
    } catch (regexErr) {
      // Skip invalid regex patterns
      continue;
    }
  }

  if (findings.length > 0) {
    const message = formatBlockMessage(filePath, findings);
    return { blocked: true, message };
  }

  return { blocked: false };
}

/**
 * Format the block message for Claude
 */
function formatBlockMessage(filePath, findings) {
  const lines = [
    `BLOCKED: Potential secrets detected in write to ${path.basename(filePath)}`,
    '',
    'The following secret patterns were found:',
    ''
  ];

  for (const finding of findings) {
    lines.push(`  - ${finding.description} (${finding.id}): ${finding.count} match(es)`);
  }

  lines.push('');
  lines.push('Ready Check files must not contain secrets. Please:');
  lines.push('  1. Remove the actual secret values from the content');
  lines.push('  2. Report only the TYPE and LOCATION of secrets (e.g., "OpenAI API key found in config.js:15")');
  lines.push('  3. Never include the actual key/token/password values');

  return lines.join('\n');
}
