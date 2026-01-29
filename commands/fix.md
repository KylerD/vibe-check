---
description: Auto-fix agent-doable checklist items with atomic commits
disable-model-invocation: false
---

# Ready Check Fix

<objective>
Automatically fix agent-doable checklist items from an existing ready-check assessment. Each fix is verified and committed atomically.
</objective>

<usage>

```
/ready-check:fix              # Fix all agent-doable items
/ready-check:fix item-003     # Fix specific item
```

</usage>

<architecture>

```
/ready-check:fix (orchestrator)
    │
    ├── Phase 1: Validate
    │   └── Check .ready-check/ exists
    │
    ├── Phase 2: Load Items
    │   └── Read checklist, filter to agent-doable
    │
    ├── Phase 3: Fix Loop (sequential)
    │   └── For each item:
    │       ├── Spawn: ready-fixer agent (fresh context)
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

Requires existing `.ready-check/` directory with checklist items. If not found:

```
No ready-check assessment found.

Run /ready-check:check first to identify issues, then come back to fix them.
```

## Process

### Phase 1: Validate

Check that `.ready-check/checklist/` exists and contains item files.

```bash
ls .ready-check/checklist/item-*.md
```

If no items exist:

```
No checklist items found. Either:
- No issues were identified (congrats!)
- Assessment hasn't been run yet

Run /ready-check:check to generate an assessment.
```

### Phase 2: Load Items

Read `metadata.json` to get the item list, or scan the checklist directory.

Filter items to those where:
- `Agent-Doable: Yes` or `Agent-Doable: Partial`
- `Status: Fail` (don't fix Unknown or Pass)

**If specific item requested** (e.g., `/ready-check:fix item-003`):
- Parse the item ID from the argument
- Filter to just that item
- If not found or not agent-doable, explain why and suggest alternatives

**Sort by priority:** Critical > High > Medium > Low

Store the filtered list for the fix loop.

### Phase 3: Fix Loop

For each item in the filtered list, spawn a `ready-fixer` agent:

```
Task: Fix checklist item {item-id}

Read agents/ready-fixer.md for your instructions.

Item file: .ready-check/checklist/{item-filename}

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
3. Add a note at the top: `**Fixed:** {date} by ready-check:fix`
4. Write the updated file

For items marked as `failed`:

1. Read the checklist item file
2. Add a note: `**Fix Attempted:** {date} — Agent could not complete. See error below.`
3. Append the error details to the file
4. Keep Status as Fail

### Phase 5: Summary

Display results:

```
Ready Check Fix Complete

Fixed: {N} items
├── item-001: Secrets Management
├── item-003: Input Validation
└── item-012: Error Handling

Failed: {N} items
├── item-007: Authentication — {brief reason}

Skipped: {N} items (partial — needs human action)
├── item-015: Error Tracking — You need to create a Sentry account

Run /ready-check:refresh to update your score.
```

If all items fixed:

```
All agent-doable items fixed!

Run /ready-check:refresh to verify and update your score.
```

If nothing to fix:

```
No agent-doable items to fix.

Your failing items require manual action:
- item-023: Privacy Policy — You need to write and host a privacy policy
- item-019: Backups — You need to enable backups in your database dashboard

Run /ready-check:discuss to get help with these.
```

## Handling Partial Items

Items with `Agent-Doable: Partial` need both agent work and human work.

For partial items:
1. Spawn the fixer agent to complete the agent tasks
2. Mark as `fixed` for the agent portion
3. In the summary, list what the human still needs to do

```
Partially fixed: {N} items
├── item-015: Error Tracking
│   ✓ Installed Sentry SDK
│   ✓ Added error boundary
│   → You need to: Create Sentry account and set DSN in env vars
```

## Commit Message Format

Agents should commit with this format:

```
fix(ready-check): {item-slug} - {brief description}

Fixes ready-check item {item-id}.
See .ready-check/checklist/{item-filename} for details.
```

Example:
```
fix(ready-check): secrets-management - move API keys to env vars

Fixes ready-check item item-001.
See .ready-check/checklist/item-001-secrets-management.md for details.
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
