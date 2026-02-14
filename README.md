<div align="center">

```txt
 __     __  ______  _______   ________         ______   __    __  ________   ______   __    __ 
|  \   |  \|      \|       \ |        \       /      \ |  \  |  \|        \ /      \ |  \  /  \
| $$   | $$ \$$$$$$| $$$$$$$\| $$$$$$$$      |  $$$$$$\| $$  | $$| $$$$$$$$|  $$$$$$\| $$ /  $$
| $$   | $$  | $$  | $$__/ $$| $$__          | $$   \$$| $$__| $$| $$__    | $$   \$$| $$/  $$ 
 \$$\ /  $$  | $$  | $$    $$| $$  \         | $$      | $$    $$| $$  \   | $$      | $$  $$  
  \$$\  $$   | $$  | $$$$$$$\| $$$$$         | $$   __ | $$$$$$$$| $$$$$   | $$   __ | $$$$$\  
   \$$ $$   _| $$_ | $$__/ $$| $$_____       | $$__/  \| $$  | $$| $$_____ | $$__/  \| $$ \$$\ 
    \$$$   |   $$ \| $$    $$| $$     \       \$$    $$| $$  | $$| $$     \ \$$    $$| $$  \$$\
     \$     \$$$$$$ \$$$$$$$  \$$$$$$$$        \$$$$$$  \$$   \$$ \$$$$$$$$  \$$$$$$  \$$   \$$
```
**Validate ideas. Plan the build. Ship with confidence.**

**From "should I build this?" to "is it ready to ship?" — one toolkit for the entire vibe coder journey.**

[![npm version](https://img.shields.io/npm/v/vibe-check-cc?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/vibe-check-cc)
[![npm downloads](https://img.shields.io/npm/dm/vibe-check-cc?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/vibe-check-cc)
[![GitHub stars](https://img.shields.io/github/stars/KylerD/vibe-check?style=for-the-badge&logo=github&color=181717)](https://github.com/KylerD/vibe-check)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

```bash
npx vibe-check-cc
```

Works on Mac, Windows, and Linux.

</div>

---


## Why I Built This

We're in the vibe coding era. Building is cheap — AI collapsed the cost of shipping software from months to days. But the hard parts haven't changed: knowing *what* to build, and knowing when it's *ready* to ship.

I keep running into founders who vibe-coded their way to a working prototype and hit two walls:
1. **Before building:** They jumped straight to code without validating the idea or planning the scope
2. **After building:** They have no idea if what they built is production-ready

Vibe Check covers the full journey:

- **`/vibe-check:idea`** — Validate your idea with an experienced founder perspective. Is this worth building?
- **`/vibe-check:plan`** — Plan the build. Easy questions in, detailed spec out — optimized for AI coding tools.
- **`/vibe-check:check`** — Assess production readiness. Prioritized findings with plain-language fix instructions.
- **`/vibe-check:fix`** — Auto-fix agent-doable issues with verified, atomic commits.

It's founder-focused. It knows the difference between "enterprise best practice" and "good enough to get in front of users."


---

## How It Works

### Starting Fresh? Validate → Plan → Build → Check

#### 1. Validate Your Idea

```
/vibe-check:idea
```

Interactive conversation with an experienced founder perspective. Covers the questions that matter: Who has this problem? How will they find it? What stops someone from cloning it? Writes an idea brief to `.vibe-check/idea-brief.md`.

#### 2. Plan the Build

```
/vibe-check:plan
```

Easy questions in, detailed spec out. Asks you what you're building and for whom, then produces a complete `PROJECT-PLAN.md` with tech stack, data model, pages, scope, and implementation order — optimized for AI coding tools. If you ran `/vibe-check:idea` first, it builds on that context.

#### 3. Build Your App

Use `PROJECT-PLAN.md` as context for Claude Code, Cursor, or your tool of choice.

#### 4. Check Production Readiness

```
/vibe-check:check
```

The system:
1. **Asks context** — What you're building, who it's for, what data you handle, what's at stake
2. **Maps your codebase** — Spawns an agent to analyze secrets, auth, errors, dependencies, infrastructure, and detect capabilities (database, auth, analytics, etc.)
3. **Assesses domains** — Parallel agents evaluate security, discoverability, analytics, platform, reliability, legal (calibrated to your context). Domains that don't apply are automatically skipped.
4. **Writes results** — Score, report, prioritized action plan

You get a score out of 100 and a clear breakdown of what needs attention. Small codebases (<50 files) get a fast-path mapper that cuts assessment time significantly.

### Already Have Code? Check → Fix → Discuss → Refresh

#### Discuss the Findings

```
/vibe-check:discuss
```

Ask questions about your report:
- "Tell me more about the secrets management issue"
- "What should I fix first?"
- "Why is authentication marked as failing?"

#### Fix Issues

Auto-fix agent-doable items with verified, atomic commits:

```
/vibe-check:fix              # Fix all agent-doable items
/vibe-check:fix item-003     # Fix a specific item
```

Each fix is verified (lint, typecheck, tests as applicable) and committed individually.

#### Track Progress

```
/vibe-check:refresh
```

Re-runs the assessment and shows what improved or regressed since last check.

---

## What You Get

After `/vibe-check:idea`:
```
.vibe-check/idea-brief.md    # Structured idea assessment
```

After `/vibe-check:plan`:
```
PROJECT-PLAN.md              # Detailed build spec in project root
```

After `/vibe-check:check`:
```
.vibe-check/
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

## Commands

| Command | Description |
|---------|-------------|
| `/vibe-check:idea` | Validate your product idea with a founder perspective |
| `/vibe-check:plan` | Plan your build — produces a detailed PROJECT-PLAN.md |
| `/vibe-check:check` | Full production readiness assessment |
| `/vibe-check:fix` | Auto-fix agent-doable items with atomic commits |
| `/vibe-check:refresh` | Re-run and compare with previous results |
| `/vibe-check:discuss` | Ask questions about your report |
| `/vibe-check:help` | Show command reference |
| `/vibe-check:map-codebase` | Standalone codebase analysis |

---

## Score Bands

| Score | Band | Meaning |
|-------|------|---------|
| 70-100 | **Ready** | Production-ready with minor improvements |
| 40-69 | **Needs Work** | Significant gaps to address |
| 0-39 | **Not Ready** | Critical issues that must be fixed |

Domains and items that don't apply to your project (no database, no analytics, etc.) are automatically marked **N/A** and excluded from scoring — so your score reflects reality for *your* project type. If any Critical-priority item is failing, the band is capped at "Needs Work" regardless of score.

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
npx vibe-check-cc
```

The installer prompts you to choose:
- **Global** (`~/.claude`) — Available in all projects
- **Local** (`./.claude`) — Current project only

### Non-Interactive Install

```bash
# Global install
npx vibe-check-cc --global

# Local install
npx vibe-check-cc --local

# Uninstall
npx vibe-check-cc --global --uninstall
```

### Verify Installation

```
/vibe-check:help
```

### Recommended: Skip Permissions Mode

Vibe Check spawns multiple agents and runs various tools. For a frictionless experience, run Claude Code with:

```bash
claude --dangerously-skip-permissions
```

---

## Updating

```bash
npx vibe-check-cc@latest
```

---

## How It's Built

### Multi-Agent Architecture

Vibe Check uses specialized agents to keep context focused:

| Agent | Job |
|-------|-----|
| **Orchestrator** | Coordinates the assessment, writes final reports |
| **Mapper** | Explores codebase, writes analysis files |
| **Assessors** | Evaluate specific domains, write checklist items |
| **Fixer** | Applies fixes with verification and atomic commits |

The orchestrator stays lean (under 30% context). Heavy exploration and evaluation happen in subagents with fresh context windows.

### On Secrets

The assessment output lives in `.vibe-check/` which you might commit. Here's how we handle secrets:

**What we do:**
- Agents are instructed to never read `.env` files, only check if they exist
- Agents are instructed to report secret *types* and *locations*, never actual values
- A pre-write hook scans all output for 50+ secret patterns (from [gitleaks](https://github.com/gitleaks/gitleaks)) and blocks writes if detected

**What we can't guarantee:**
- The agents are non-deterministic — instructions aren't guarantees
- The regex scanner catches common patterns but not everything
- Novel secret formats or obfuscated values could slip through

**What you should do:**
- Review `.vibe-check/` before committing
- Keep `.vibe-check/` in `.gitignore` if you're not sure
- Run `git diff` before pushing

---

## Troubleshooting

**Commands not found?**
- Restart Claude Code to reload commands
- Verify files exist in `~/.claude/commands/vibe-check/`

**Want to re-run?**
- Delete `.vibe-check/` and run `/vibe-check:check` again
- Or use `/vibe-check:refresh` to update existing assessment

---

## Vibe Check on Vibe Check

We run vibe-check on itself. Here's the result:

<div align="center">

[![Vibe Check Score](https://img.shields.io/badge/Vibe_Check-100%2F100-22c55e?style=for-the-badge&logo=checkmarx&logoColor=white)](/.vibe-check/)
[![Status](https://img.shields.io/badge/Status-✓_Ready-22c55e?style=for-the-badge)](/.vibe-check/summary.md)

| | |
|:--|:--|
| ![Security](https://img.shields.io/badge/Security-20%2F20-22c55e?style=flat-square) | ![Discoverability](https://img.shields.io/badge/Discoverability-15%2F15-22c55e?style=flat-square) |
| ![Analytics](https://img.shields.io/badge/Analytics-15%2F15-22c55e?style=flat-square) | ![Platform](https://img.shields.io/badge/Platform-20%2F20-22c55e?style=flat-square) |
| ![Reliability](https://img.shields.io/badge/Reliability-20%2F20-22c55e?style=flat-square) | ![Legal](https://img.shields.io/badge/Legal-10%2F10-22c55e?style=flat-square) |

</div>

The perfect score comes from being appropriately minimal: zero dependencies (no supply chain risk), no secrets required, no user data collected, and operates entirely on the local filesystem.

<div align="center">

[**View Full Assessment →**](.vibe-check/report.md)

</div>

---

## Acknowledgements

The multi-agent architecture, orchestration patterns and even this README in Vibe Check are heavily inspired by [GSD (Get Shit Done)](https://github.com/glittercowboy/get-shit-done) — a structured planning and execution framework for Claude Code. If you're building AI-assisted workflows with parallel agents and good context engineering principles, check out their approach.

---

## License

MIT

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=KylerD/vibe-check&type=date&legend=top-left)](https://www.star-history.com/#KylerD/vibe-check&type=date&legend=top-left)