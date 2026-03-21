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
Security         {bar}  {earned}/15   {pct}%  {status}
Performance      {bar}  {earned}/12   {pct}%  {status}
Accessibility    {bar}  {earned}/12   {pct}%  {status}
Testing          {bar}  {earned}/10   {pct}%  {status}
Monitoring       {bar}  {earned}/10   {pct}%  {status}
CI/CD            {bar}  {earned}/10   {pct}%  {status}
Discoverability  {bar}  {earned}/10   {pct}%  {status}
Analytics        {bar}  {earned}/8    {pct}%  {status}
Reliability      {bar}  {earned}/8    {pct}%  {status}
Legal            {bar}  {earned}/5    {pct}%  {status}
Platform         ℹ      —             —       Advisory
AI Security      {bar or ○ N/A}
```

{Show N/A domains with `○` and no bar. Show applicable domains with their effectiveMax (which accounts for any individual N/A items within the domain). Platform is always shown as informational advisory.}

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
