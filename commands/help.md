---
description: Show available readiness commands and usage guide
disable-model-invocation: false
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
/vibe-check:check
```

This single command analyzes your codebase, asks a few questions, and writes a complete assessment to `.vibe-check/`.

## Primary Commands

**/vibe-check:check**
Full production readiness assessment. Analyzes codebase, collects inputs, and writes all results to `.vibe-check/` directory including:

- `summary.md` — Quick 1-page overview
- `report.md` — Full readiness report with scores
- `action-plan.md` — Prioritized tasks
- `checklist/` — Individual items with fix instructions
- `metadata.json` — Machine-readable data

**/vibe-check:refresh**
Re-runs assessment on existing `.vibe-check/`. Shows what improved or regressed since last check. Use after fixing issues to track progress.

**/vibe-check:fix**
Auto-fix agent-doable checklist items. Each fix is verified and committed atomically.

```
/vibe-check:fix              # Fix all agent-doable items
/vibe-check:fix item-003     # Fix a specific item
```

**/vibe-check:discuss**
Interactive conversation about your report. Ask questions, get clarification on findings, dive deeper into specific items, or get help fixing issues.

**/vibe-check:help**
Show this command reference.

## Workflow

1. Run `/vibe-check:check` to generate initial assessment
2. Review `.vibe-check/summary.md` for overview
3. Run `/vibe-check:fix` to auto-fix agent-doable items
4. Run `/vibe-check:discuss` for items that need manual work
5. Run `/vibe-check:refresh` to see progress

## Utility Commands

**/vibe-check:map-codebase**
Standalone codebase analysis (stack, architecture, structure, conventions, testing, integrations, concerns).

## Output Directory

After running `/vibe-check:check`, your project will have:

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
/vibe-check:fix              # Fix all agent-doable items
/vibe-check:fix item-003     # Fix a specific item
```

Each fix is verified (lint, typecheck, tests) and committed atomically.
</reference>
