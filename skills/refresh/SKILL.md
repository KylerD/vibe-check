---
name: refresh
description: Re-run production readiness assessment and compare against previous results. Use when the user has fixed issues and wants to see their progress — shows before/after scores and what improved.
user-invocable: true
---

# Vibe Check Refresh

<objective>
Run a complete fresh assessment and compare against the previous results. This is NOT a shallow re-check — it's a full re-analysis that catches new issues, validates fixes, and removes false positives.
</objective>

<architecture>

**You are the orchestrator.** Same as `/check`, but you also track changes.

```
/refresh (orchestrator)
    │
    ├── Phase 1: Load Previous State
    │   └── Read metadata.json, note old scores and items
    │
    ├── Phase 2: Clear Analysis (fresh start)
    │   └── Delete analysis/ folder contents
    │
    ├── Phase 3: Full Re-mapping
    │   └── Spawn: mapper agent (runs npm audit, etc.)
    │       └── Writes: .vibe-check/analysis/*.md
    │
    ├── Phase 4: Full Re-assessment
    │   └── Spawn: assessor agents (parallel)
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

## Reference Files

Read these as needed:

- `agents/mapper.md` — Spawn instructions for codebase mapper
- `agents/assessor.md` — Spawn instructions for domain assessors

For domain criteria, read `../check/reference/domains.md` if available in a sibling directory. If not found, fall back to the inline domain summary below.

<domain_summary>

**Security (max 15):** Secrets, auth, input validation, dependencies, HTTPS, security headers, CORS, rate limiting, CSRF.

**Performance (max 12):** Image optimization, code splitting, data fetching & caching, font optimization, DB query performance.

**Accessibility (max 12):** Image alt text, form labels, keyboard navigation, ARIA & semantic HTML, motion accessibility.

**Testing (max 10):** Test runner configured, test files exist, E2E testing, tests in CI.

**Monitoring (max 10):** Error tracking, structured logging, health checks, APM.

**CI/CD (max 10):** CI pipeline, build verification, DB migrations, environment separation.

**Discoverability (max 10):** Meta tags, OpenGraph, Twitter cards, sitemap, robots.txt, semantic HTML.

**Analytics (max 8):** Visitor tracking, conversion tracking.

**Reliability (max 8):** Backups, error handling, database connections.

**Legal (max 5):** Privacy policy, terms, cookie consent, user deletion.

**Platform (informational):** Hosting compatibility, complexity, cost signals, managed services. Unscored.

**AI Security (max 12, conditional):** Prompt injection, function calling, WebSocket origin, plugin security, context isolation.

</domain_summary>

## Prerequisites

Requires existing `.vibe-check/metadata.json`. If not found:

```
No existing assessment found.
Run /check first to create an initial assessment.
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

**If subagent spawning is available**, spawn the mapper agent:

```
Task: Map codebase for readiness assessment

Read agents/mapper.md for your instructions.

Explore this codebase and write analysis files to .vibe-check/analysis/

This is a REFRESH run. Be thorough — run all checks including npm audit.

Return confirmation only when complete.
```

**If subagent spawning is NOT available**, perform the mapping yourself:
1. Read `agents/mapper.md` for the exploration process
2. Follow compact mode or standard mode steps depending on codebase size
3. Write all 17 analysis files to `.vibe-check/analysis/`
4. Continue to Phase 4

Wait for confirmation. The mapper runs the full analysis including:
- `npm audit` / `yarn audit` / `pnpm audit`
- Git status checks for .env files
- All other exploration steps

### Phase 4: Full Re-assessment

Spawn `assessor` agents for each domain — exactly like `/check`:

**If subagent spawning is available**, spawn for each domain using the same prompts as the check skill. Use item numbers starting at 100+ for new items to avoid conflicts during comparison.

Example for Security Assessor:
```
Task: Assess security domain

Read agents/assessor.md for your instructions.
Your domain assignment is: security

Load analysis files from .vibe-check/analysis/
Read agents/assessor.md for criteria.

This is a REFRESH run. Evaluate fresh — ignore previous checklist items.
Write NEW items to .vibe-check/checklist/ with fresh item numbers starting at 100.

Return score summary only.
```

**If subagent spawning is NOT available**, assess each domain yourself using the criteria in `agents/assessor.md`.

Spawn all domain assessors (security, performance, accessibility, testing, monitoring, ci-cd, discoverability, analytics, platform, reliability, legal). Spawn AI security assessor only if mapper indicated AI patterns detected.

### Phase 5: Compare & Reconcile

Now you have:
- **Old items:** `.vibe-check/checklist/item-001-*.md` through `item-0XX-*.md`
- **New items:** `.vibe-check/checklist/item-100-*.md` through `item-1XX-*.md`

For each OLD item, check if a corresponding NEW item exists (match by slug/topic):

| Old Status | New Status | Action |
|------------|------------|--------|
| Fail | Pass (or no new item) | **Improved** — delete old item |
| Fail | Fail | **Unchanged** — update old item with new findings |
| Fail | N/A | **Now N/A** — delete old item (capability removed or context changed) |
| Pass | Fail | **Regressed** — update old item |
| Pass | N/A | **Now N/A** — note in delta (not a regression) |
| Unknown | Pass/Fail | **Resolved** — update status |
| Unknown | N/A | **Now N/A** — delete old item |
| N/A | Fail | **Now applicable** — treat as new issue |
| N/A | Pass | **Now applicable** — no action needed |
| Any | No match | **False positive or N/A** — DELETE the old item |

For NEW items with no OLD match:
- **New issue discovered** — keep with renumbered ID

#### Scoring Version Migration

If the previous assessment used v1.2 scoring (check `metadata.json` for absence of `scoringVersion` field or `scoringVersion: "v1.2"`):

**Item migration mapping:**
- Old Analytics item-013 (Error Tracking) → New Monitoring item-030
- Old Reliability item-022 (Health Checks) → New Monitoring item-032
- Match migrated items by slug, not by item ID

**Band shift handling:**
- If the score would have been "Ready" under v1.2 bands (70-100) but is now "Needs Work" (60-74) or "Launch Ready" (75-89) under v2 bands, note this in the progress output:

```
NOTE: Scoring bands updated from v1.2 to v2.
Your band shifted from "Ready" to "{new band}" due to revised thresholds,
not due to regressions. See .vibe-check/README.md for band definitions.
```

**Platform domain:**
- Old Platform items (015-018) were scored. New Platform items (040-043) are informational.
- If old assessment had Platform contributing to score, note that Platform is now unscored.

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
  "scoringVersion": "v2",
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

Use consistent visual patterns for output. Display progress with comparison bars:

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
  ○ {N} items now N/A

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
│  • Fix:    /fix                             │
│  • Discuss: /discuss                        │
│                                             │
└─────────────────────────────────────────────┘
```

Then offer discussion (same as `/check`):

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

## Context

<!-- inline:shared/persona.md -->
<!-- inline:shared/voice.md -->
<!-- inline:shared/ui-brand.md -->
