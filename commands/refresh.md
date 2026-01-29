---
description: Re-run assessment on existing .vibe-check/ and show progress
disable-model-invocation: false
---

# Vibe Check Refresh

<objective>
Run a complete fresh assessment and compare against the previous results. This is NOT a shallow re-check — it's a full re-analysis that catches new issues, validates fixes, and removes false positives.
</objective>

<architecture>

**You are the orchestrator.** Same as `/vibe-check:check`, but you also track changes.

```
/vibe-check:refresh (orchestrator)
    │
    ├── Phase 1: Load Previous State
    │   └── Read metadata.json, note old scores and items
    │
    ├── Phase 2: Clear Analysis (fresh start)
    │   └── Delete analysis/ folder contents
    │
    ├── Phase 3: Full Re-mapping
    │   └── Spawn: vibe-mapper agent (runs npm audit, etc.)
    │       └── Writes: .vibe-check/analysis/*.md
    │
    ├── Phase 4: Full Re-assessment
    │   └── Spawn: vibe-assessor agents (parallel)
    │       └── Each writes NEW checklist items
    │
    ├── Phase 5: Compare & Reconcile
    │   └── Compare new items vs old items
    │   └── DELETE items that were false positives
    │   └── Track improvements and regressions
    │
    ├── Phase 6: Update Files
    │   └── Rewrite all output files with new findings
    │
    └── Phase 7: Show Progress
        └── Display what changed
```

**Key difference from check:** You compare new results against old, track deltas, and explicitly remove items that shouldn't exist.

</architecture>

## References

Load these for consistent voice and visual style:

- `references/persona.md` — Who you're talking to
- `references/voice.md` — How to communicate
- `references/domains.md` — What "good" looks like
- `references/agent-classification.md` — Agent-doable criteria
- `references/ui-brand.md` — Visual patterns for output formatting

## Prerequisites

Requires existing `.vibe-check/metadata.json`. If not found:

```
No existing assessment found.
Run /vibe-check:check first to create an initial assessment.
```

## Process

### Phase 1: Load Previous State

Read `.vibe-check/metadata.json` and note:

- Previous analysis date
- Previous score
- Previous item list (IDs, slugs, statuses)
- Deployment and compliance context (reuse these — don't re-ask)

Store this for comparison later.

### Phase 2: Clear Analysis Folder

Delete contents of `.vibe-check/analysis/` to ensure fresh data:

```bash
rm -rf .vibe-check/analysis/*
```

**Do NOT delete checklist items yet** — you need them for comparison.

### Phase 3: Full Re-mapping

Spawn the `vibe-mapper` agent — exactly like `/vibe-check:check`:

```
Task: Map codebase for readiness assessment

Read agents/vibe-mapper.md for your instructions.
Read references/persona.md and references/voice.md for context.

Explore this codebase and write analysis files to .vibe-check/analysis/

This is a REFRESH run. Be thorough — run all checks including npm audit.

Return confirmation only when complete.
```

Wait for confirmation. The mapper runs the full analysis including:
- `npm audit` / `yarn audit` / `pnpm audit`
- Git status checks for .env files
- All other exploration steps

### Phase 4: Full Re-assessment

Spawn `vibe-assessor` agents for each domain — exactly like `/vibe-check:check`:

**Security Assessor:**
```
Task: Assess security domain

Read agents/vibe-assessor.md for your instructions.
Your domain assignment is: security

Load analysis files from .vibe-check/analysis/
Load references for voice and criteria.

This is a REFRESH run. Evaluate fresh — ignore previous checklist items.
Write NEW items to .vibe-check/checklist/ with fresh item numbers starting at 100.

Return score summary only.
```

Use item numbers starting at 100+ for new items to avoid conflicts during comparison.

Spawn all domain assessors (security, discoverability, analytics, platform, reliability, legal).

### Phase 5: Compare & Reconcile

Now you have:
- **Old items:** `.vibe-check/checklist/item-001-*.md` through `item-0XX-*.md`
- **New items:** `.vibe-check/checklist/item-100-*.md` through `item-1XX-*.md`

For each OLD item, check if a corresponding NEW item exists (match by slug/topic):

| Old Status | New Status | Action |
|------------|------------|--------|
| Fail | Pass (or no new item) | **Improved** — delete old item |
| Fail | Fail | **Unchanged** — update old item with new findings |
| Pass | Fail | **Regressed** — update old item |
| Unknown | Pass/Fail | **Resolved** — update status |
| Any | No match | **False positive or N/A** — DELETE the old item |

For NEW items with no OLD match:
- **New issue discovered** — keep with renumbered ID

After reconciliation:
1. Delete all `item-100+` temporary files
2. Renumber remaining items sequentially
3. Update `checklist/index.md`

### Phase 6: Update Files

Rewrite all output files:

1. **metadata.json** — New scores with `previousAnalysis` field:
```json
{
  "analysisDate": "{today}",
  "score": {new score},
  "previousAnalysis": {
    "date": "{old date}",
    "score": {old score}
  },
  ...
}
```

2. **summary.md** — Updated with progress section

3. **report.md** — Full fresh report

4. **action-plan.md** — Reprioritized based on current state

5. **checklist/index.md** — Updated item list

### Phase 7: Terminal Output & Discussion

Use the visual patterns from `references/ui-brand.md`. Display progress with comparison bars:

```
┌──────────────────────────────────────────────┐
│                                              │
│   VIBE CHECK REFRESH                         │
│                                              │
│   Score: {new_score}/100                     │
│   {progress_bar}  {band}                     │
│                                              │
└──────────────────────────────────────────────┘

PROGRESS
═══════════════════════════════════════════════

Previous:  {old_score}/100  {old_bar}  {old_band}
Current:   {new_score}/100  {new_bar}  {new_band}
                            ─────────────────────
Change:                     {+/-delta} points  {▲/▼}

SUMMARY
─────────────────────────────────────────────────
  ✓ {N} items fixed
  ○ {N} items unchanged
  ✗ {N} items regressed
  + {N} new issues found
  − {N} false positives removed

{If fixed items:}
IMPROVEMENTS
─────────────────────────────────────────────────
✓  {item title}
✓  {item title}

{If regressions:}
REGRESSIONS
─────────────────────────────────────────────────
✗  {item title} — was passing, now failing

{If still failing:}
STILL FAILING
─────────────────────────────────────────────────
●  {title} — {one-line description}
●  {title} — {one-line description}

┌─ NEXT ──────────────────────────────────────┐
│                                             │
│  • Review: .vibe-check/summary.md           │
│  • Fix:    /vibe-check:fix                  │
│  • Discuss: /vibe-check:discuss             │
│                                             │
└─────────────────────────────────────────────┘
```

Then offer discussion (same as `/vibe-check:check`):

```
Would you like to:
1. Discuss the changes — Ask about specific items
2. Start fixing — Pick an item to work on
3. Done for now
```

## Critical Rules

**RUN THE FULL PIPELINE.** Spawn mapper and assessors. Don't try to shortcut by just re-reading old analysis files.

**DELETE FALSE POSITIVES.** If the new assessment doesn't flag something, remove it. Don't keep stale items around.

**FRESH ANALYSIS FILES.** Clear and regenerate analysis/ folder. Old analysis data causes stale findings.

**RENUMBER ITEMS.** After reconciliation, items should be numbered 001, 002, 003... sequentially.

**TRACK DELTAS.** The whole point is showing progress. Make sure to report what changed.
