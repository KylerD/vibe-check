# {Title}

```
{status_indicator}  {Domain}  •  Priority: {priority_symbol}  •  Agent: {agent_symbol}
```

**Analysis Date:** {YYYY-MM-DD}

| Field | Value |
|-------|-------|
| Status | {✓ Pass / ✗ Fail / ? Unknown} |
| Priority | {◆ Critical / ● High / ◐ Medium / ○ Low} |
| Agent-Doable | {⚡ Yes / ½ Partial / — No} |
| Complexity | {Low / Medium / High} |

---

## Current State

{Description of what was found in the codebase. Be specific with file paths and line numbers.}

---

## Impact

{What happens if this isn't fixed. Be specific: data breach, compliance failure, outage, lost revenue, blocked enterprise sales. No jargon.}

---

## How to Fix

### Recommended Approach

{Step-by-step instructions for the recommended fix. Be specific and actionable.}

1. {Step 1}
2. {Step 2}
3. {Step 3}

### Alternative Approach

{Optional: describe an alternative if one exists, with trade-offs.}

---

## Agent Instructions

```
{⚡/½/—}  This item is {agent-doable / partially agent-doable / not agent-doable}.
```

{If agent-doable or partial:}

**Agent tasks:**
- [ ] {Task the agent can complete}
- [ ] {Task the agent can complete}

{If human work required:}

```
┌─ YOU NEED TO ───────────────────────────────┐
│                                             │
│  • {Task requiring human action}            │
│  • {Task requiring human action}            │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Evidence

| Location | Details |
|----------|---------|
| File | `{path/to/file}` |
| Lines | {line numbers} |
| Pattern | `{search pattern or specific code snippet}` |

---

## Related Items

- [{Related Item Title}](./item-NNN-{slug}.md)
