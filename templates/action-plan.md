# Action Plan

**Project:** {Project Name}
**Analysis Date:** {YYYY-MM-DD}

---

## Overview

This plan prioritizes fixes based on risk severity and implementation complexity.

```
CHECKLIST SUMMARY
─────────────────────────────────────────────────

  ✓ Pass     {N} items
  ✗ Fail     {N} items    ← {agent-doable} agent-fixable
  ? Unknown  {N} items
```

---

## Short-term (Critical + High Priority)

```
IMMEDIATE ACTION
═══════════════════════════════════════════════
```

Items that should be addressed before launch or as soon as possible.

### ◆ Critical

| Item | Domain | Agent | Effort |
|------|--------|-------|--------|
| [{Title}](./checklist/item-NNN-{slug}.md) | {Domain} | {⚡/½/—} | {Low/Med/High} |

### ● High

| Item | Domain | Agent | Effort |
|------|--------|-------|--------|
| [{Title}](./checklist/item-NNN-{slug}.md) | {Domain} | {⚡/½/—} | {Low/Med/High} |
| [{Title}](./checklist/item-NNN-{slug}.md) | {Domain} | {⚡/½/—} | {Low/Med/High} |

---

## Mid-term (Medium Priority)

```
BEFORE SCALING
═══════════════════════════════════════════════
```

Important improvements to complete after initial launch stabilizes.

### ◐ Medium

| Item | Domain | Agent | Effort |
|------|--------|-------|--------|
| [{Title}](./checklist/item-NNN-{slug}.md) | {Domain} | {⚡/½/—} | {Low/Med/High} |
| [{Title}](./checklist/item-NNN-{slug}.md) | {Domain} | {⚡/½/—} | {Low/Med/High} |

---

## Long-term (Low Priority)

```
NICE TO HAVE
═══════════════════════════════════════════════
```

Strategic improvements for scale, compliance, or operational excellence.

### ○ Low

| Item | Domain | Agent | Effort |
|------|--------|-------|--------|
| [{Title}](./checklist/item-NNN-{slug}.md) | {Domain} | {⚡/½/—} | {Low/Med/High} |

---

## Agent-Fixable Items

```
QUICK WINS  ⚡
═══════════════════════════════════════════════
```

These items can be fixed automatically by running `/vibe-check:fix`:

| Item | Domain | Priority |
|------|--------|----------|
| ⚡ [{Title}](./checklist/item-NNN-{slug}.md) | {Domain} | {◆/●/◐/○} |
| ⚡ [{Title}](./checklist/item-NNN-{slug}.md) | {Domain} | {◆/●/◐/○} |
| ⚡ [{Title}](./checklist/item-NNN-{slug}.md) | {Domain} | {◆/●/◐/○} |

To fix all agent-doable items:

```
/vibe-check:fix
```

To fix a specific item:

```
/vibe-check:fix item-NNN
```

---

## Human-Required Items

```
┌─ WARNING ───────────────────────────────────┐
│                                             │
│  These items require human action:          │
│                                             │
│  — {Item} — {what you need to do}           │
│  — {Item} — {what you need to do}           │
│  — {Item} — {what you need to do}           │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Progress Tracking

After making fixes, run:

```
/vibe-check:refresh
```

This re-analyzes your codebase and shows what improved or regressed.

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ◆ | Critical — fix immediately |
| ● | High — fix before launch |
| ◐ | Medium — fix soon |
| ○ | Low — when time allows |
| ⚡ | Agent can fix completely |
| ½ | Agent + human effort |
| — | Human action required |
