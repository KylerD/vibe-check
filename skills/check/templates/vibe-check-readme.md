# .vibe-check/

This directory contains your production readiness assessment.

## Files

| File | Description |
|------|-------------|
| [summary.md](./summary.md) | Quick 1-page overview with score and top priorities |
| [report.md](./report.md) | Full readiness report with scoring breakdown |
| [action-plan.md](./action-plan.md) | Prioritized tasks (short/mid/long-term) |
| [checklist/](./checklist/) | Individual checklist items with fix instructions |
| [metadata.json](./metadata.json) | Machine-readable data for CI/tracking |

## Quick Start

### 1. Review the Summary

Start with [summary.md](./summary.md) to understand your current readiness score and top risks.

### 2. Fix Issues

Each checklist item includes:

- **Current State** — What was found
- **Impact** — Business consequences in plain language
- **How to Fix** — Step-by-step instructions
- **Agent Instructions** — What AI can do vs. what you need to do

To fix an item, tell your AI assistant:

```
Read .vibe-check/checklist/item-NNN-{slug}.md and fix it
```

### 3. Track Progress

After making fixes, re-run the check to see updated scores.

---

## Scoring

```
SCORE BANDS
─────────────────────────────────────────────────

90-100  ████████████████████  ✓ Production Ready
        Exceeds launch requirements

75-89   ███████████████░░░░░  ◑ Launch Ready
        Ready to ship with minor gaps

60-74   ████████████░░░░░░░░  ◐ Needs Work
        Significant improvements needed

0-59    ████████░░░░░░░░░░░░  ✗ Early Stage
        Critical gaps must be addressed
```

Items marked N/A are excluded from the scoring pool. If any Critical-priority item is failing, the band is capped at "Needs Work" regardless of score.

---

## Symbol Legend

| Symbol | Meaning |
|--------|---------|
| ✓ | Pass — requirement met |
| ✗ | Fail — action required |
| ? | Unknown — insufficient data |
| ○ | N/A — not applicable (in Status column) |
| ℹ | Informational — advisory only |
| ◆ | Critical priority |
| ● | High priority |
| ◐ | Medium priority |
| ○ | Low priority (in Priority column) |
| ⚡ | Agent can fix completely |
| ½ | Agent + human effort |
| — | Human action required |

---

## Git

You may want to:

- **Commit** this directory to track readiness over time
- **Ignore** if you prefer to regenerate fresh each time

To ignore, add to `.gitignore`:

```
.vibe-check/
```
