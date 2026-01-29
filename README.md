<div align="center">

# READY CHECK

**You built something with AI. You can't read the code. Is it actually ready to ship?**

**Get a structured assessment you can understand, discuss, and hand off.**

[![npm version](https://img.shields.io/npm/v/ready-check-cc?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/ready-check-cc)
[![npm downloads](https://img.shields.io/npm/dm/ready-check-cc?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/ready-check-cc)
[![GitHub stars](https://img.shields.io/github/stars/KylerD/ready-check?style=for-the-badge&logo=github&color=181717)](https://github.com/KylerD/ready-check)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

```bash
npx ready-check-cc
```

Works on Mac, Windows, and Linux.

</div>

---

## Why I Built This

We're in the vibe coding era. People who can't read code are building real software - shipping apps, automating workflows, creating tools that actually work. The barrier to entry has dropped.

But there's a problem. You built something. It runs. **Is this production-ready?** You have no idea. You can't read the code. You're taking the AI's word for it.

I've spent over a decade as a full-stack developer and enterprise architect. Now as a founder, I mostly orchestrate AI agents - and I keep running into non-technical founders who vibe-coded their way to a working prototype and hit a wall. They don't know what's broken. They don't know what's "good enough" to ship. They just know they can't read the code.

So I built this. One command gives you:

- **A prioritized action plan** — What to fix first, what can wait, what's fine
- **Plain-language findings** — What's actually wrong, with file paths you can point at
- **Agent vs. human classification** — What your AI tool can auto-fix, what needs a human
- **Handoff artifacts** — Documents you can give to a technical co-founder, a freelancer, or your next AI session

It's founder-focused. It knows the difference between "enterprise best practice" and "good enough to get in front of users."


---

## What You Get

```
.ready-check/
├── summary.md           # 1-page executive overview
├── report.md            # Full report with scores
├── action-plan.md       # Prioritized fix list
├── metadata.json        # Machine-readable data
├── analysis/            # Raw codebase analysis
└── checklist/
    ├── index.md         # All items overview
    └── item-001-*.md    # Individual findings with fix instructions
```

Each checklist item includes:
- **Current State** — What was found, with file paths and line numbers
- **Impact** — What happens if you don't fix it (plain language)
- **How to Fix** — Step-by-step instructions
- **Agent-Doable** — Whether Claude can fix it for you

---

## How It Works

### 1. Run the Assessment

```
/ready-check:check
```

The system:
1. **Asks context** — What you're building, who it's for, what data you handle, what's at stake
2. **Maps your codebase** — Spawns an agent to analyze secrets, auth, errors, dependencies, infrastructure
3. **Assesses domains** — Parallel agents evaluate security, reliability, observability, deployability, operations (calibrated to your context)
4. **Writes results** — Score, report, prioritized action plan

You get a score out of 100 and a clear breakdown of what needs attention.

### 2. Discuss the Findings

```
/ready-check:discuss
```

Ask questions about your report:
- "Tell me more about the secrets management issue"
- "What should I fix first?"
- "Why is authentication marked as failing?"

### 3. Fix Issues

Auto-fix agent-doable items with verified, atomic commits:

```
/ready-check:fix              # Fix all agent-doable items
/ready-check:fix item-003     # Fix a specific item
```

Each fix is verified (lint, typecheck, tests as applicable) and committed individually.

For items that need manual work, ask for help:

```
/ready-check:discuss
> "Help me with the privacy policy item"
```

### 4. Track Progress

```
/ready-check:refresh
```

Re-runs the assessment and shows what improved or regressed since last check.

---

## Commands

| Command | Description |
|---------|-------------|
| `/ready-check:check` | Full production readiness assessment |
| `/ready-check:fix` | Auto-fix agent-doable items with atomic commits |
| `/ready-check:refresh` | Re-run and compare with previous results |
| `/ready-check:discuss` | Ask questions about your report |
| `/ready-check:help` | Show command reference |
| `/ready-check:map-codebase` | Standalone codebase analysis |

---

## Score Bands

| Score | Band | Meaning |
|-------|------|---------|
| 70-100 | **Ready** | Production-ready with minor improvements |
| 40-69 | **Needs Work** | Significant gaps to address |
| 0-39 | **Not Ready** | Critical issues that must be fixed |

---

## What Gets Assessed

### Security
- Secrets management (hardcoded keys, .env handling)
- Authentication patterns
- Input validation
- Dependency vulnerabilities
- HTTPS configuration

### Discoverability
- Meta tags (title, description)
- OpenGraph tags for social sharing
- Twitter cards
- Sitemap and robots.txt
- Semantic HTML structure

### Analytics
- Visitor tracking setup
- Error tracking (Sentry, etc.)
- Conversion event tracking

### Platform
- Hosting compatibility
- Complexity check (over-engineering signals)
- Cost trap patterns
- Managed service opportunities

### Reliability
- Backup configuration
- Error handling patterns
- Database connection management
- Health check endpoints

### Legal
- Privacy policy
- Terms of service
- Cookie consent
- User data deletion capability

---

## Installation

```bash
npx ready-check-cc
```

The installer prompts you to choose:
- **Global** (`~/.claude`) — Available in all projects
- **Local** (`./.claude`) — Current project only

### Non-Interactive Install

```bash
# Global install
npx ready-check-cc --global

# Local install
npx ready-check-cc --local

# Uninstall
npx ready-check-cc --global --uninstall
```

### Verify Installation

```
/ready-check:help
```

### Recommended: Skip Permissions Mode

Ready Check spawns multiple agents and runs various tools. For a frictionless experience, run Claude Code with:

```bash
claude --dangerously-skip-permissions
```

---

## Updating

```bash
npx ready-check-cc@latest
```

---

## How It's Built

### Multi-Agent Architecture

Ready Check uses specialized agents to keep context focused:

| Agent | Job |
|-------|-----|
| **Orchestrator** | Coordinates the assessment, writes final reports |
| **Mapper** | Explores codebase, writes analysis files |
| **Assessors** | Evaluate specific domains, write checklist items |
| **Fixer** | Applies fixes with verification and atomic commits |

The orchestrator stays lean (under 30% context). Heavy exploration and evaluation happen in subagents with fresh context windows.

### On Secrets

The assessment output lives in `.ready-check/` which you might commit. Here's how we handle secrets:

**What we do:**
- Agents are instructed to never read `.env` files, only check if they exist
- Agents are instructed to report secret *types* and *locations*, never actual values
- A pre-write hook scans all output for 50+ secret patterns (from [gitleaks](https://github.com/gitleaks/gitleaks)) and blocks writes if detected

**What we can't guarantee:**
- The agents are non-deterministic — instructions aren't guarantees
- The regex scanner catches common patterns but not everything
- Novel secret formats or obfuscated values could slip through

**What you should do:**
- Review `.ready-check/` before committing
- Keep `.ready-check/` in `.gitignore` if you're not sure
- Run `git diff` before pushing

---

## Troubleshooting

**Commands not found?**
- Restart Claude Code to reload commands
- Verify files exist in `~/.claude/commands/ready-check/`

**Want to re-run?**
- Delete `.ready-check/` and run `/ready-check:check` again
- Or use `/ready-check:refresh` to update existing assessment

---

## License

MIT

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=KylerD/ready-check&type=date&legend=top-left)](https://www.star-history.com/#KylerD/ready-check&type=date&legend=top-left)