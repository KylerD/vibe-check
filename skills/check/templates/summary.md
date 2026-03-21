# Vibe Check Summary

```
┌──────────────────────────────────────────────┐
│                                              │
│   VIBE CHECK                                 │
│                                              │
│   Score: {score}/100                         │
│   {progress_bar}  {band}                     │
│                                              │
└──────────────────────────────────────────────┘
```

**Project:** {Project Name}
**Analysis Date:** {YYYY-MM-DD}

{If criticalGate is true, show immediately after the banner:}

```
┌─ WARNING ───────────────────────────────────┐
│                                             │
│  ⚠ Critical issues prevent Ready status:    │
│  • {critical item title}                    │
│  • {critical item title}                    │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Overview

{2-3 sentence summary of the project's production readiness state. Be direct about what's working and what's not.}

---

## Top Risks

```
TOP RISKS
═══════════════════════════════════════════════
```

◆ **{Critical Risk}** — {One-line description of impact}
● **{High Risk}** — {One-line description of impact}
● **{High Risk}** — {One-line description of impact}

---

## Domain Scores

```
DOMAIN SCORES
─────────────────────────────────────────────────
```

```
Security         {bar}  {earned}/{effectiveMax}  {pct}%  {status}
Discoverability  {bar}  {earned}/{effectiveMax}  {pct}%  {status}
Analytics        ○ N/A — not applicable
Platform         {bar}  {earned}/{effectiveMax}  {pct}%  {status}
Reliability      {bar}  {earned}/{effectiveMax}  {pct}%  {status}
Legal            ○ N/A — not applicable
```

{Show N/A domains with `○` and no bar. Show applicable domains with their effectiveMax (which accounts for any individual N/A items within the domain).}

---

## Checklist Summary

```
CHECKLIST
─────────────────────────────────────────────────

  ✓ Pass     {N} items
  ✗ Fail     {N} items
  ? Unknown  {N} items
  ○ N/A      {N} items
  ─────────────────────
  Total      {N} items
```

---

## Quick Wins

```
QUICK WINS
═══════════════════════════════════════════════
```

These items are agent-doable and high-impact:

⚡ [{Item Title}](./checklist/item-NNN-{slug}.md) — {brief description}
⚡ [{Item Title}](./checklist/item-NNN-{slug}.md) — {brief description}
⚡ [{Item Title}](./checklist/item-NNN-{slug}.md) — {brief description}

---

## Platform Compatibility

```
┌─ INFO ──────────────────────────────────────┐
│                                             │
│  Your stack ({framework}) is compatible     │
│  with these hosting platforms:              │
│                                             │
│  • {Platform 1}                             │
│  • {Platform 2}                             │
│  • {Platform 3}                             │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Next Steps

```
┌─ NEXT STEPS ────────────────────────────────┐
│                                             │
│  1. {Immediate action}                      │
│  2. {This week priority}                    │
│  3. {Before launch must-have}               │
│                                             │
└─────────────────────────────────────────────┘
```

---

See [report.md](./report.md) for full analysis or browse [checklist/](./checklist/) for individual items.
