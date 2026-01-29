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
  Production readiness assessment for Claude Code
`;

console.log(banner);

// Show help
if (hasHelp) {
  console.log(`  ${yellow}Usage:${reset} npx vibe-check-cc [options]

  ${yellow}Options:${reset}
    ${cyan}-g, --global${reset}      Install globally (to ~/.claude)
    ${cyan}-l, --local${reset}       Install locally (to ./.claude in current directory)
    ${cyan}-u, --uninstall${reset}   Uninstall Vibe Check
    ${cyan}-h, --help${reset}        Show this help message

  ${yellow}Examples:${reset}
    ${dim}# Interactive install (prompts for location)${reset}
    npx vibe-check-cc

    ${dim}# Install globally${reset}
    npx vibe-check-cc --global

    ${dim}# Install to current project only${reset}
    npx vibe-check-cc --local

    ${dim}# Uninstall from global${reset}
    npx vibe-check-cc --global --uninstall
`);
  process.exit(0);
}

/**
 * Get the Claude config directory
 */
function getClaudeDir(isGlobal) {
  if (isGlobal) {
    // Check for custom config dir
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
 * Replace path references in markdown content
 */
function replacePathRefs(content, pathPrefix) {
  // References directory
  content = content.replace(/`references\//g, `\`${pathPrefix}vibe-check/references/`);
  content = content.replace(/- references\//g, `- ${pathPrefix}vibe-check/references/`);
  content = content.replace(/Read references\//g, `Read ${pathPrefix}vibe-check/references/`);
  content = content.replace(/Load references\//g, `Load ${pathPrefix}vibe-check/references/`);

  // Templates directory
  content = content.replace(/`templates\//g, `\`${pathPrefix}vibe-check/templates/`);
  content = content.replace(/- templates\//g, `- ${pathPrefix}vibe-check/templates/`);
  content = content.replace(/Use `templates\//g, `Use \`${pathPrefix}vibe-check/templates/`);

  // Agents directory
  content = content.replace(/Read agents\//g, `Read ${pathPrefix}agents/`);
  content = content.replace(/`agents\//g, `\`${pathPrefix}agents/`);

  return content;
}

/**
 * Recursively copy directory, replacing path references in .md files
 */
function copyWithPathReplacement(srcDir, destDir, pathPrefix) {
  // Clean existing destination
  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true });
  }
  fs.mkdirSync(destDir, { recursive: true });

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyWithPathReplacement(srcPath, destPath, pathPrefix);
    } else if (entry.name.endsWith('.md')) {
      let content = fs.readFileSync(srcPath, 'utf8');
      content = replacePathRefs(content, pathPrefix);
      fs.writeFileSync(destPath, content);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Copy agents with path replacement and prefix
 */
function copyAgents(srcDir, destDir, pathPrefix) {
  if (!fs.existsSync(srcDir)) return;

  fs.mkdirSync(destDir, { recursive: true });

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;

    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    let content = fs.readFileSync(srcPath, 'utf8');
    content = replacePathRefs(content, pathPrefix);
    fs.writeFileSync(destPath, content);
  }
}

/**
 * Uninstall Vibe Check
 */
function uninstall(isGlobal) {
  const claudeDir = getClaudeDir(isGlobal);
  const locationLabel = isGlobal ? '~/.claude' : './.claude';

  console.log(`  Uninstalling from ${cyan}${locationLabel}${reset}\n`);

  if (!fs.existsSync(claudeDir)) {
    console.log(`  ${yellow}Directory does not exist.${reset} Nothing to uninstall.\n`);
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

  // Remove vibe-check/ (references, templates, scripts)
  const vibeCheckDir = path.join(claudeDir, 'vibe-check');
  if (fs.existsSync(vibeCheckDir)) {
    fs.rmSync(vibeCheckDir, { recursive: true });
    removed++;
    console.log(`  ${green}✓${reset} Removed vibe-check/`);
  }

  // Remove agents (vibe-assessor.md, vibe-mapper.md)
  const agentsDir = path.join(claudeDir, 'agents');
  if (fs.existsSync(agentsDir)) {
    const agentFiles = ['vibe-assessor.md', 'vibe-mapper.md', 'vibe-fixer.md'];
    for (const file of agentFiles) {
      const agentPath = path.join(agentsDir, file);
      if (fs.existsSync(agentPath)) {
        fs.unlinkSync(agentPath);
        removed++;
        console.log(`  ${green}✓${reset} Removed agents/${file}`);
      }
    }
  }

  // Remove hooks from settings.json
  if (removeHooks(claudeDir)) {
    removed++;
    console.log(`  ${green}✓${reset} Removed secret scanner hook`);
  }

  if (removed === 0) {
    console.log(`  ${yellow}No Vibe Check files found.${reset}\n`);
  } else {
    console.log(`\n  ${green}Done!${reset} Vibe Check has been uninstalled.\n`);
  }
}

/**
 * Copy directory without path replacement (for scripts, etc.)
 */
function copyDirectory(srcDir, destDir) {
  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true });
  }
  fs.mkdirSync(destDir, { recursive: true });

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Install hooks into settings.json
 */
function installHooks(claudeDir, pathPrefix) {
  const settingsPath = path.join(claudeDir, 'settings.json');
  let settings = {};

  // Read existing settings if present
  if (fs.existsSync(settingsPath)) {
    try {
      settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    } catch (err) {
      // If settings file is invalid, start fresh
      settings = {};
    }
  }

  // Ensure hooks structure exists
  if (!settings.hooks) {
    settings.hooks = {};
  }
  if (!settings.hooks.PreToolUse) {
    settings.hooks.PreToolUse = [];
  }

  // Check if our hook is already installed
  const hookCommand = `node "${pathPrefix}vibe-check/scripts/scan-secrets.js"`;
  const existingHook = settings.hooks.PreToolUse.find(h =>
    h.hooks && h.hooks.some(hook => hook.command && hook.command.includes('scan-secrets.js'))
  );

  if (!existingHook) {
    // Add our hook
    settings.hooks.PreToolUse.push({
      matcher: 'Write|Edit',
      hooks: [
        {
          type: 'command',
          command: hookCommand,
          timeout: 10
        }
      ]
    });
  }

  // Write settings back
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
}

/**
 * Remove hooks from settings.json
 */
function removeHooks(claudeDir) {
  const settingsPath = path.join(claudeDir, 'settings.json');

  if (!fs.existsSync(settingsPath)) {
    return false;
  }

  try {
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));

    if (settings.hooks && settings.hooks.PreToolUse) {
      // Filter out our hook
      settings.hooks.PreToolUse = settings.hooks.PreToolUse.filter(h =>
        !(h.hooks && h.hooks.some(hook => hook.command && hook.command.includes('scan-secrets.js')))
      );

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
 * Install Vibe Check
 */
function install(isGlobal) {
  const claudeDir = getClaudeDir(isGlobal);
  const src = path.join(__dirname, '..');
  const locationLabel = isGlobal ? '~/.claude' : './.claude';

  // Path prefix for references in markdown files
  const pathPrefix = isGlobal ? '~/.claude/' : './.claude/';

  console.log(`  Installing to ${cyan}${locationLabel}${reset}\n`);

  // Create base directory
  fs.mkdirSync(claudeDir, { recursive: true });

  // 1. Copy commands to commands/vibe-check/
  const commandsSrc = path.join(src, 'commands');
  const commandsDest = path.join(claudeDir, 'commands', 'vibe-check');
  copyWithPathReplacement(commandsSrc, commandsDest, pathPrefix);
  console.log(`  ${green}✓${reset} Installed commands/vibe-check/`);

  // 2. Copy references to vibe-check/references/
  const refSrc = path.join(src, 'references');
  const refDest = path.join(claudeDir, 'vibe-check', 'references');
  if (fs.existsSync(refSrc)) {
    copyWithPathReplacement(refSrc, refDest, pathPrefix);
    console.log(`  ${green}✓${reset} Installed vibe-check/references/`);
  }

  // 3. Copy templates to vibe-check/templates/
  const tplSrc = path.join(src, 'templates');
  const tplDest = path.join(claudeDir, 'vibe-check', 'templates');
  if (fs.existsSync(tplSrc)) {
    copyWithPathReplacement(tplSrc, tplDest, pathPrefix);
    console.log(`  ${green}✓${reset} Installed vibe-check/templates/`);
  }

  // 4. Copy agents to agents/
  const agentsSrc = path.join(src, 'agents');
  const agentsDest = path.join(claudeDir, 'agents');
  if (fs.existsSync(agentsSrc)) {
    copyAgents(agentsSrc, agentsDest, pathPrefix);
    console.log(`  ${green}✓${reset} Installed agents/`);
  }

  // 5. Copy scripts to vibe-check/scripts/
  const scriptsSrc = path.join(src, 'scripts');
  const scriptsDest = path.join(claudeDir, 'vibe-check', 'scripts');
  if (fs.existsSync(scriptsSrc)) {
    copyDirectory(scriptsSrc, scriptsDest);
    console.log(`  ${green}✓${reset} Installed vibe-check/scripts/`);
  }

  // 6. Install hooks into settings.json
  installHooks(claudeDir, pathPrefix);
  console.log(`  ${green}✓${reset} Installed secret scanner hook`);

  console.log(`
  ${green}Done!${reset} Launch Claude Code and run ${cyan}/vibe-check:check${reset}

  ${yellow}Commands:${reset}
    /vibe-check:check        Run full assessment
    /vibe-check:fix          Auto-fix agent-doable items
    /vibe-check:refresh      Re-run and show progress
    /vibe-check:discuss      Ask questions about your report
    /vibe-check:help         Show command reference

  ${yellow}Security:${reset}
    Secret scanner hook installed - prevents secrets from being
    written to .vibe-check/ files (patterns from gitleaks)
`);
}

/**
 * Prompt for install location
 */
function promptLocation() {
  if (!process.stdin.isTTY) {
    console.log(`  ${yellow}Non-interactive mode, defaulting to global install${reset}\n`);
    install(true);
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
      console.log(`\n  ${yellow}Installation cancelled${reset}\n`);
      process.exit(0);
    }
  });

  console.log(`  ${yellow}Where would you like to install?${reset}

  ${cyan}1${reset}) Global ${dim}(~/.claude)${reset} - available in all projects
  ${cyan}2${reset}) Local  ${dim}(./.claude)${reset} - this project only
`);

  rl.question(`  Choice ${dim}[1]${reset}: `, (answer) => {
    answered = true;
    rl.close();
    const choice = answer.trim() || '1';
    install(choice !== '2');
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
  uninstall(hasGlobal);
} else if (hasGlobal || hasLocal) {
  install(hasGlobal);
} else {
  promptLocation();
}
