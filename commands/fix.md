---
description: Auto-fix agent-doable checklist items with atomic commits
disable-model-invocation: false
---

# Vibe Check Fix

<objective>
Automatically fix agent-doable checklist items from an existing vibe-check assessment. Each fix is verified and committed atomically.
</objective>

<usage>

```
/vibe-check:fix              # Fix all agent-doable items
/vibe-check:fix item-003     # Fix specific item
```

</usage>

<architecture>

```
/vibe-check:fix (orchestrator)
    │
    ├── Phase 1: Validate
    │   └── Check .vibe-check/ exists
    │
    ├── Phase 2: Load Items
    │   └── Read checklist, filter to agent-doable
    │
    ├── Phase 3: Fix Loop (sequential)
    │   └── For each item:
    │       ├── Spawn: vibe-fixer agent (fresh context)
    │       ├── Agent: reads item, applies fix, verifies, commits
    │       └── Returns: fixed | failed | skipped
    │
    ├── Phase 4: Update Status
    │   └── Update checklist items with new status
    │
    └── Phase 5: Summary
        └── Show what was fixed, what failed
```

**Why sequential:** Each fix may affect subsequent fixes. Fresh context per item keeps agents focused.

</architecture>

## Prerequisites

Requires existing `.vibe-check/` directory with checklist items. If not found:

```
No vibe-check assessment found.

Run /vibe-check:check first to identify issues, then come back to fix them.
```

## Process

### Phase 1: Validate

Check that `.vibe-check/checklist/` exists and contains item files.

```bash
ls .vibe-check/checklist/item-*.md
```

If no items exist:

```
No checklist items found. Either:
- No issues were identified (congrats!)
- Assessment hasn't been run yet

Run /vibe-check:check to generate an assessment.
```

### Phase 2: Load Items

Read `metadata.json` to get the item list, or scan the checklist directory.

Filter items to those where:
- `Agent-Doable: Yes` or `Agent-Doable: Partial`
- `Status: Fail` (don't fix Unknown or Pass)

**If specific item requested** (e.g., `/vibe-check:fix item-003`):
- Parse the item ID from the argument
- Filter to just that item
- If not found or not agent-doable, explain why and suggest alternatives

**Sort by priority:** Critical > High > Medium > Low

Store the filtered list for the fix loop.

### Phase 3: Fix Loop

For each item in the filtered list, spawn a `vibe-fixer` agent:

```
Task: Fix checklist item {item-id}

Read agents/vibe-fixer.md for your instructions.

Item file: .vibe-check/checklist/{item-filename}

Load references:
- references/persona.md
- references/voice.md

Apply the fix, verify it works, and commit if successful.

Return status: fixed | failed | skipped
```

**Wait for each agent to complete before starting the next.** This ensures:
- No conflicts between fixes
- Each commit is atomic
- Failures don't cascade

Collect results:
```
{
  "item-001": "fixed",
  "item-003": "fixed",
  "item-007": "failed",
  "item-012": "skipped"
}
```

### Phase 4: Update Status

For items marked as `fixed`:

1. Read the checklist item file
2. Update `Status: Fail` to `Status: Pass`
3. Add a note at the top: `**Fixed:** {date} by vibe-check:fix`
4. Write the updated file

For items marked as `failed`:

1. Read the checklist item file
2. Add a note: `**Fix Attempted:** {date} — Agent could not complete. See error below.`
3. Append the error details to the file
4. Keep Status as Fail

### Phase 5: Summary

Use the visual patterns from `references/ui-brand.md`. Display results:

```
┌──────────────────────────────────────────────┐
│                                              │
│   VIBE CHECK FIX COMPLETE                    │
│                                              │
│   ✓ {N} fixed  ✗ {N} failed  ○ {N} skipped   │
│                                              │
└──────────────────────────────────────────────┘

FIXED  ✓
═══════════════════════════════════════════════
✓  item-001: Secrets Management
✓  item-003: Input Validation
✓  item-012: Error Handling

FAILED  ✗
═══════════════════════════════════════════════
✗  item-007: Authentication — {brief reason}

SKIPPED  ○
═══════════════════════════════════════════════
○  item-015: Error Tracking — needs human action

┌─ NEXT ──────────────────────────────────────┐
│                                             │
│  Run /vibe-check:refresh to update score    │
│                                             │
└─────────────────────────────────────────────┘
```

If all items fixed:

```
┌──────────────────────────────────────────────┐
│                                              │
│   VIBE CHECK FIX COMPLETE                    │
│                                              │
│   ✓ All agent-doable items fixed!            │
│                                              │
└──────────────────────────────────────────────┘

Run /vibe-check:refresh to verify and update your score.
```

If nothing to fix:

```
┌──────────────────────────────────────────────┐
│                                              │
│   VIBE CHECK FIX                             │
│                                              │
│   No agent-doable items to fix.              │
│                                              │
└──────────────────────────────────────────────┘

┌─ WARNING ───────────────────────────────────┐
│                                             │
│  Your failing items require manual action:  │
│                                             │
│  — Privacy Policy: write and host a policy  │
│  — Backups: enable in database dashboard    │
│                                             │
└─────────────────────────────────────────────┘

Run /vibe-check:discuss to get help with these.
```

## Handling Partial Items

Items with `Agent-Doable: Partial` need both agent work and human work.

For partial items:
1. Spawn the fixer agent to complete the agent tasks
2. Mark as `fixed` for the agent portion
3. In the summary, list what the human still needs to do

```
PARTIALLY FIXED  ½
═══════════════════════════════════════════════
½  item-015: Error Tracking
   ✓ Installed Sentry SDK
   ✓ Added error boundary
   → You need to: Create Sentry account and set DSN in env vars
```

## Commit Message Format

Agents should commit with this format:

```
fix(vibe-check): {item-slug} - {brief description}

Fixes vibe-check item {item-id}.
See .vibe-check/checklist/{item-filename} for details.
```

Example:
```
fix(vibe-check): secrets-management - move API keys to env vars

Fixes vibe-check item item-001.
See .vibe-check/checklist/item-001-secrets-management.md for details.
```

## Error Handling

**If fixer agent fails:**
- Capture the error
- Ensure any partial changes are rolled back (`git restore .`)
- Mark item as failed with reason
- Continue to next item

**If verification fails:**
- Roll back the changes
- Mark as failed: "Fix applied but verification failed"
- Include verification output in error details

**If git operations fail:**
- Stop the fix loop
- Report which items were successfully committed
- Leave remaining items for retry

## Orchestrator Rules

**Don't fix items yourself.** Spawn fixer agents. They have fresh context for each item.

**Process sequentially.** Parallel fixes can conflict.

**Verify before commit.** Never commit broken code.

**Roll back failures.** Don't leave partial changes.

**Update checklist files.** Keep them accurate.

**Be specific in summary.** User should know exactly what happened.
