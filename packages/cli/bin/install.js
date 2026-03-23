#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

const cyan = '\x1b[36m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const dim = '\x1b[2m';
const reset = '\x1b[0m';

const pkg = require('../package.json');

const args = process.argv.slice(2);
const hasGlobal = args.includes('--global') || args.includes('-g');
const hasLocal = args.includes('--local') || args.includes('-l');
const hasUninstall = args.includes('--uninstall') || args.includes('-u');
const hasHelp = args.includes('--help') || args.includes('-h');

const banner = `
  ${cyan}Vibe Check${reset} ${dim}v${pkg.version}${reset}
  Migration helper for Vibe Check v2.0
`;

console.log(banner);

// Show help
if (hasHelp) {
  console.log(`  ${yellow}Usage:${reset} npx vibe-check-cc [options]

  ${yellow}Options:${reset}
    ${cyan}-g, --global${reset}      Clean up global install (~/.claude)
    ${cyan}-l, --local${reset}       Clean up local install (./.claude)
    ${cyan}-u, --uninstall${reset}   Remove old Vibe Check v1 files
    ${cyan}-h, --help${reset}        Show this help message

  ${yellow}Examples:${reset}
    ${dim}# Show migration guidance${reset}
    npx vibe-check-cc

    ${dim}# Clean up old global install${reset}
    npx vibe-check-cc --global --uninstall

    ${dim}# Clean up old local install${reset}
    npx vibe-check-cc --local --uninstall
`);
  process.exit(0);
}

/**
 * Get the Claude config directory
 */
function getClaudeDir(isGlobal) {
  if (isGlobal) {
    if (process.env.CLAUDE_CONFIG_DIR) {
      return expandTilde(process.env.CLAUDE_CONFIG_DIR);
    }
    return path.join(os.homedir(), '.claude');
  }
  return path.join(process.cwd(), '.claude');
}

/**
 * Expand ~ to home directory
 */
function expandTilde(filePath) {
  if (filePath && filePath.startsWith('~/')) {
    return path.join(os.homedir(), filePath.slice(2));
  }
  return filePath;
}

/**
 * Remove old scan-secrets.js hook from settings.json
 */
function removeHooks(claudeDir) {
  const settingsPath = path.join(claudeDir, 'settings.json');

  if (!fs.existsSync(settingsPath)) {
    return false;
  }

  try {
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));

    if (settings.hooks && settings.hooks.PreToolUse) {
      const before = settings.hooks.PreToolUse.length;
      settings.hooks.PreToolUse = settings.hooks.PreToolUse.filter(h =>
        !(h.hooks && h.hooks.some(hook => hook.command && hook.command.includes('scan-secrets.js')))
      );

      if (settings.hooks.PreToolUse.length === before) {
        return false;
      }

      // Clean up empty arrays
      if (settings.hooks.PreToolUse.length === 0) {
        delete settings.hooks.PreToolUse;
      }
      if (Object.keys(settings.hooks).length === 0) {
        delete settings.hooks;
      }

      fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
      return true;
    }
  } catch (err) {
    // Ignore errors
  }

  return false;
}

/**
 * Clean up old v1 Vibe Check files
 */
function cleanup(isGlobal) {
  const claudeDir = getClaudeDir(isGlobal);
  const locationLabel = isGlobal ? '~/.claude' : './.claude';

  console.log(`  Cleaning up old Vibe Check v1 files from ${cyan}${locationLabel}${reset}\n`);

  if (!fs.existsSync(claudeDir)) {
    console.log(`  ${yellow}Directory does not exist.${reset} Nothing to clean up.\n`);
    printMigrationGuidance();
    return;
  }

  let removed = 0;

  // Remove commands/vibe-check/
  const commandsDir = path.join(claudeDir, 'commands', 'vibe-check');
  if (fs.existsSync(commandsDir)) {
    fs.rmSync(commandsDir, { recursive: true });
    removed++;
    console.log(`  ${green}✓${reset} Removed commands/vibe-check/`);
  }

  // Remove vibe-check/ (references, templates, scripts, skills)
  const vibeCheckDir = path.join(claudeDir, 'vibe-check');
  if (fs.existsSync(vibeCheckDir)) {
    fs.rmSync(vibeCheckDir, { recursive: true });
    removed++;
    console.log(`  ${green}✓${reset} Removed vibe-check/`);
  }

  // Remove agents (vibe-mapper.md, vibe-assessor.md, vibe-fixer.md)
  const agentsDir = path.join(claudeDir, 'agents');
  if (fs.existsSync(agentsDir)) {
    const agentFiles = ['vibe-mapper.md', 'vibe-assessor.md', 'vibe-fixer.md'];
    for (const file of agentFiles) {
      const agentPath = path.join(agentsDir, file);
      if (fs.existsSync(agentPath)) {
        fs.unlinkSync(agentPath);
        removed++;
        console.log(`  ${green}✓${reset} Removed agents/${file}`);
      }
    }
  }

  // Remove old scan-secrets.js hook from settings.json
  if (removeHooks(claudeDir)) {
    removed++;
    console.log(`  ${green}✓${reset} Removed secret scanner hook from settings.json`);
  }

  if (removed === 0) {
    console.log(`  ${yellow}No Vibe Check v1 files found.${reset}\n`);
  } else {
    console.log(`\n  ${green}Done!${reset} Old Vibe Check v1 files removed.\n`);
  }

  printMigrationGuidance();
}

/**
 * Print v2.0 migration guidance
 */
function printMigrationGuidance() {
  console.log(`  ${cyan}Vibe Check v2.0 has moved to the universal skills format!${reset}

  ${yellow}Install skills:${reset}  npx skills add Hypership-Software/vibe-check
  ${yellow}Update skills:${reset}   npx skills update

  ${yellow}Works with:${reset} Claude Code, Cursor, Gemini CLI, Codex CLI,
              VS Code Copilot, Kiro, OpenCode, and more.
`);
}

/**
 * Prompt for cleanup location
 */
function promptCleanup() {
  if (!process.stdin.isTTY) {
    printMigrationGuidance();
    return;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let answered = false;

  rl.on('close', () => {
    if (!answered) {
      answered = true;
      printMigrationGuidance();
      process.exit(0);
    }
  });

  console.log(`  ${yellow}Would you like to clean up old Vibe Check v1 files?${reset}

  ${cyan}1${reset}) Global ${dim}(~/.claude)${reset}
  ${cyan}2${reset}) Local  ${dim}(./.claude)${reset}
  ${cyan}3${reset}) Skip   ${dim}(just show migration guidance)${reset}
`);

  rl.question(`  Choice ${dim}[3]${reset}: `, (answer) => {
    answered = true;
    rl.close();
    const choice = answer.trim() || '3';
    if (choice === '1') {
      cleanup(true);
    } else if (choice === '2') {
      cleanup(false);
    } else {
      printMigrationGuidance();
    }
  });
}

// Main
if (hasGlobal && hasLocal) {
  console.error(`  ${yellow}Cannot specify both --global and --local${reset}\n`);
  process.exit(1);
} else if (hasUninstall) {
  if (!hasGlobal && !hasLocal) {
    console.error(`  ${yellow}--uninstall requires --global or --local${reset}`);
    console.error(`  Example: npx vibe-check-cc --global --uninstall\n`);
    process.exit(1);
  }
  cleanup(hasGlobal);
} else if (hasGlobal || hasLocal) {
  cleanup(hasGlobal);
} else {
  promptCleanup();
}
