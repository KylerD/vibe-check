---
name: help
description: Show vibe-check command reference and usage guide. Use when the user asks what vibe-check commands are available or how to use them.
user-invocable: true
---

# Readiness Command Reference

<objective>
Display the complete readiness command reference.

Output ONLY the reference content below. Do NOT add:

- Project-specific analysis
- Git status or file context
- Next-step suggestions
- Commentary beyond the reference
  </objective>

<reference>
# Vibe Check Command Reference

**Vibe Check** helps you assess production readiness and generate actionable outputs.

## Quick Start

```
/check
```

This single command analyzes your codebase, asks a few questions, and writes a complete assessment to `.vibe-check/`.

## Primary Commands

**/check**
Full production readiness assessment. Analyzes codebase, collects inputs, and writes all results to `.vibe-check/` directory including:

- `summary.md` — Quick 1-page overview
- `report.md` — Full readiness report with scores
- `action-plan.md` — Prioritized tasks
- `checklist/` — Individual items with fix instructions
- `metadata.json` — Machine-readable data

**/refresh**
Re-runs assessment on existing `.vibe-check/`. Shows what improved or regressed since last check. Use after fixing issues to track progress.

**/fix**
Auto-fix agent-doable checklist items. Each fix is verified and committed atomically.

```
/fix              # Fix all agent-doable items
/fix item-003     # Fix a specific item
```

**/discuss**
Interactive conversation about your report. Ask questions, get clarification on findings, dive deeper into specific items, or get help fixing issues.

**/help**
Show this command reference.

## Workflow

1. Run `/check` to generate initial assessment
2. Review `.vibe-check/summary.md` for overview
3. Run `/fix` to auto-fix agent-doable items
4. Run `/discuss` for items that need manual work
5. Run `/refresh` to see progress

## Utility Commands

**/map-codebase**
Standalone codebase analysis (stack, architecture, structure, conventions, testing, integrations, concerns).

## Output Directory

After running `/check`, your project will have:

```
.vibe-check/
├── README.md              # How to use this directory
├── summary.md             # Executive summary
├── report.md              # Full report
├── action-plan.md         # Prioritized tasks
├── checklist/
│   ├── index.md           # All items overview
│   └── item-001-*.md      # Individual items
└── metadata.json          # Machine-readable data
```

## Fixing Items

Each checklist item includes:

- **Current State** — What was found
- **Impact** — What happens if not fixed
- **How to Fix** — Step-by-step instructions
- **Agent Instructions** — What AI can do vs. what you must do

Items marked "Agent-Doable: Yes" or "Partial" can be auto-fixed:

```
/fix              # Fix all agent-doable items
/fix item-003     # Fix a specific item
```

Each fix is verified (lint, typecheck, tests) and committed atomically.

## Invocation by Harness

Skill invocation syntax varies by AI tool:

- **Claude Code:** `/skill-name` (e.g., `/check`, `/refresh`, `/fix`)
- **Cursor:** `@vibe-check skill-name` (e.g., `@vibe-check check`)
- **Gemini CLI:** Syntax may differ — consult the vibe-check integration docs
- **Other harnesses:** Check your tool's MCP skill invocation syntax

The skills work identically regardless of how they're invoked.
</reference>
