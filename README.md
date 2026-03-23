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
[![GitHub stars](https://img.shields.io/github/stars/Hypership-Software/vibe-check?style=for-the-badge&logo=github&color=181717)](https://github.com/Hypership-Software/vibe-check)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

```bash
npx skills add Hypership-Software/vibe-check
```

Works with **Claude Code**, **Cursor**, **Gemini CLI**, **Codex CLI**, **VS Code Copilot**, **Kiro**, **OpenCode**, **Antigravity**, and **Pi**.

</div>

---


## Why I Built This

We're in the vibe coding era. Building is cheap — AI collapsed the cost of shipping software from months to days. But the hard parts haven't changed: knowing *what* to build, and knowing when it's *ready* to ship.

I keep running into founders who vibe-coded their way to a working prototype and hit two walls:
1. **Before building:** They jumped straight to code without validating the idea or planning the scope
2. **After building:** They have no idea if what they built is production-ready

Vibe Check covers the full journey:

- **`/idea`** — Validate your idea with an experienced founder perspective. Is this worth building?
- **`/plan`** — Plan the build. Easy questions in, detailed spec out — optimized for AI coding tools.
- **`/check`** — Assess production readiness. Prioritized findings with plain-language fix instructions.
- **`/fix`** — Review findings and apply fixes with your approval.

It's founder-focused. It knows the difference between "enterprise best practice" and "good enough to get in front of users."


---

## How It Works

### Starting Fresh? Validate → Plan → Build → Check

#### 1. Validate Your Idea

```
/idea
```

Interactive conversation with an experienced founder perspective. Covers the questions that matter: Who has this problem? How will they find it? What stops someone from cloning it? Writes an idea brief to `.vibe-check/idea-brief.md`.

#### 2. Plan the Build

```
/plan
```

Easy questions in, detailed spec out. Asks you what you're building and for whom, then produces a complete `PROJECT-PLAN.md` with tech stack, data model, pages, scope, and implementation order — optimized for AI coding tools. If you ran `/idea` first, it builds on that context.

#### 3. Build Your App

Use `PROJECT-PLAN.md` as context for Claude Code, Cursor, or your tool of choice.

#### 4. Check Production Readiness

```
/check
```

The system:
1. **Asks context** — What you're building, who it's for, what data you handle, what's at stake
2. **Maps your codebase** — Spawns an agent to analyze secrets, auth, errors, dependencies, infrastructure, and detect capabilities (database, auth, analytics, etc.)
3. **Assesses domains** — Parallel agents evaluate security, performance, accessibility, testing, monitoring, CI/CD, discoverability, analytics, reliability, and legal (calibrated to your context). Domains that don't apply are automatically skipped.
4. **Writes results** — Score, report, prioritized action plan

You get a score out of 100 and a clear breakdown of what needs attention. Small codebases (<50 files) get a fast-path mapper that cuts assessment time significantly.

### Already Have Code? Check → Fix → Discuss → Refresh

#### Discuss the Findings

```
/discuss
```

Ask questions about your report:
- "Tell me more about the secrets management issue"
- "What should I fix first?"
- "Why is authentication marked as failing?"

#### Fix Issues

Review findings and apply fixes with your approval:

```
/fix              # Review and fix all fixable items
/fix item-003     # Fix a specific item
```

Each fix is verified (lint, typecheck, tests as applicable) and committed individually.

#### Track Progress

```
/refresh
```

Re-runs the assessment and shows what improved or regressed since last check.

---

## What You Get

After `/idea`:
```
.vibe-check/idea-brief.md    # Structured idea assessment
```

After `/plan`:
```
PROJECT-PLAN.md              # Detailed build spec in project root
```

After `/check`:
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
- **Agent-Doable** — Whether the AI can fix it for you

---

## Skills

| Skill | Description |
|-------|-------------|
| `/idea` | Validate your product idea with a founder perspective |
| `/plan` | Plan your build — produces a detailed PROJECT-PLAN.md |
| `/check` | Full production readiness assessment |
| `/fix` | Review findings and apply fixes with approval |
| `/refresh` | Re-run and compare with previous results |
| `/discuss` | Ask questions about your report |
| `/help` | Show skill reference |
| `/map-codebase` | Standalone codebase analysis |

> **Note:** Skill invocation syntax varies by harness. Claude Code uses `/skill-name`, Cursor uses `@vibe-check skill-name`, VS Code Copilot uses `#vibe-check skill-name`, etc.

---

## Score Bands

| Score | Band | Meaning |
|-------|------|---------|
| 90-100 | **Production Ready** | Enterprise and scale concerns addressed. Safe for high-traffic or regulated environments. |
| 75-89 | **Launch Ready** | Safe to put in front of early users. Core security, reliability, and legal bases covered. |
| 60-74 | **Needs Work** | Functional but has gaps that will bite you. Missing monitoring, testing, or security hardening. |
| 0-59 | **Early Stage** | Prototype territory. Multiple critical domains unaddressed. Not safe for real users. |

Domains and items that don't apply to your project (no database, no analytics, etc.) are automatically marked **N/A** and excluded from scoring — so your score reflects reality for *your* project type. If any Critical-priority item is failing, the band is capped at "Needs Work" regardless of score.

---

## What Gets Assessed

### Security (15 pts)
- Secrets management, authentication, input validation
- Dependency vulnerabilities, HTTPS
- Security headers, CORS, rate limiting, CSRF protection

### Performance (12 pts)
- Image optimization, code splitting & lazy loading
- Data fetching & caching, font optimization
- Database query performance

### Accessibility (12 pts)
- Image alt text, form label association
- Keyboard navigation & focus management
- ARIA & semantic HTML, motion accessibility

### Testing (10 pts)
- Test runner configured, test files exist
- E2E testing setup, tests run in CI

### Monitoring (10 pts)
- Error tracking (Sentry, etc.), structured logging
- Health check endpoints, APM

### CI/CD (10 pts)
- CI pipeline, build verification
- Database migration strategy, environment separation

### Discoverability (10 pts)
- Meta tags, OpenGraph, Twitter cards
- Sitemap, robots.txt, semantic HTML

### Analytics (8 pts)
- Visitor tracking, conversion tracking

### Reliability (8 pts)
- Backup configuration, error handling
- Database connection management

### Legal (5 pts)
- Privacy policy, terms of service
- Cookie consent, user data deletion

### Platform (informational)
- Hosting compatibility, complexity check
- Cost signals, managed services
- *Advisory only — does not affect score*

### AI Security (12 pts, conditional)
- Prompt injection, function calling safety
- WebSocket origin, plugin security, context isolation
- *Only assessed if AI patterns detected*

---

## Installation

### Universal (all harnesses)

```bash
npx skills add Hypership-Software/vibe-check
```

Auto-detects your AI coding tool and installs the right skill files. Works with Claude Code, Cursor, Gemini CLI, Codex CLI, VS Code Copilot, Kiro, OpenCode, Antigravity, and Pi.

### Manual download

Download the [universal ZIP](https://github.com/Hypership-Software/vibe-check/releases/latest/download/vibe-check-universal.zip), extract it, and copy the folder for your harness into your project root. See [vibe-check.cloud/download](https://vibe-check.cloud/download) for per-harness instructions.

### Updating

```bash
npx skills update
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

### Skills Architecture

Each skill is a self-contained folder with a `SKILL.md` orchestrator, plus agents, references, and templates as needed. A build system generates per-harness variants from a single canonical source, handling frontmatter differences and shared content inlining.

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

**Skills not found?**
- Restart your AI coding tool to reload skills
- Verify files exist (e.g., `.claude/skills/vibe-check/` for Claude Code)

**Want to re-run?**
- Delete `.vibe-check/` and run `/check` again
- Or use `/refresh` to update existing assessment

**Migrating from v1?**
- Run `npx vibe-check-cc` — it will detect old files and offer to clean them up
- Then install v2: `npx skills add Hypership-Software/vibe-check`

---

## Vibe Check on Vibe Check

We run vibe-check on itself. Here's the result:

<div align="center">

[![Vibe Check Score](https://img.shields.io/badge/Vibe_Check-100%2F100-22c55e?style=for-the-badge&logo=checkmarx&logoColor=white)](/.vibe-check/)
[![Status](https://img.shields.io/badge/Status-✓_Production_Ready-22c55e?style=for-the-badge)](/.vibe-check/summary.md)

| | |
|:--|:--|
| ![Security](https://img.shields.io/badge/Security-15%2F15-22c55e?style=flat-square) | ![Performance](https://img.shields.io/badge/Performance-12%2F12-22c55e?style=flat-square) |
| ![Accessibility](https://img.shields.io/badge/Accessibility-12%2F12-22c55e?style=flat-square) | ![Testing](https://img.shields.io/badge/Testing-10%2F10-22c55e?style=flat-square) |
| ![Monitoring](https://img.shields.io/badge/Monitoring-10%2F10-22c55e?style=flat-square) | ![CI/CD](https://img.shields.io/badge/CI%2FCD-10%2F10-22c55e?style=flat-square) |
| ![Discoverability](https://img.shields.io/badge/Discoverability-10%2F10-22c55e?style=flat-square) | ![Analytics](https://img.shields.io/badge/Analytics-8%2F8-22c55e?style=flat-square) |
| ![Reliability](https://img.shields.io/badge/Reliability-8%2F8-22c55e?style=flat-square) | ![Legal](https://img.shields.io/badge/Legal-5%2F5-22c55e?style=flat-square) |

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

[![Star History Chart](https://api.star-history.com/svg?repos=Hypership-Software/vibe-check&type=date&legend=top-left)](https://www.star-history.com/#Hypership-Software/vibe-check&type=date&legend=top-left)
