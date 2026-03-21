# Production Readiness Report

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

---

## Executive Summary

{Paragraph overview of the assessment findings. Be direct about the current state, what's working, what's not, and what the path forward looks like.}

---

## Domain Breakdown

```
DOMAIN SCORES
═══════════════════════════════════════════════
```

### Security ({earned}/25)

```
{bar}  {pct}%  {status}
```

{Brief assessment of security posture}

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| Secrets Management | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Authentication | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Input Validation | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Dependency Security | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| HTTPS | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

---

### Discoverability ({earned}/20)

```
{bar}  {pct}%  {status}
```

{Brief assessment of SEO and social sharing setup}

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| Meta Tags | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| OpenGraph Tags | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Twitter Cards | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Sitemap | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| robots.txt | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Semantic HTML | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

---

### Analytics ({earned}/15)

```
{bar}  {pct}%  {status}
```

{Brief assessment of analytics and tracking setup}

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| Visitor Tracking | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Error Tracking | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Conversion Tracking | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

---

### Platform ({earned}/15)

```
{bar}  {pct}%  {status}
```

{Brief assessment of hosting and infrastructure}

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| Hosting Compatibility | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Complexity Check | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Cost Signals | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Managed Services | ℹ | ○ | — |

---

### Reliability ({earned}/15)

```
{bar}  {pct}%  {status}
```

{Brief assessment of error handling and data safety}

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| Backups | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Error Handling | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Database Connections | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Health Checks | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

---

### Legal ({earned}/10)

```
{bar}  {pct}%  {status}
```

{Brief assessment of compliance and legal requirements}

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| Privacy Policy | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Terms of Service | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Cookie Consent | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| User Data Deletion | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

---

### AI Security ({earned}/20) — *Conditional*

{Only include this section if AI patterns were detected in the codebase. If not detected, omit entirely or show "N/A - No AI patterns detected"}

```
{bar}  {pct}%  {status}
```

{Brief assessment of AI-specific security posture}

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| Prompt Injection Prevention | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Function Calling Safety | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| WebSocket Origin Validation | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Plugin Ecosystem Security | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Context Isolation | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

### N/A Domains

{For domains that are entirely N/A, show a brief explanation instead of a score bar and table:}

```
### Analytics — N/A

○ Not applicable — no analytics SDK detected and stakes are minimal. This domain is excluded from scoring.
```

{For domains with some N/A items, show those items in the table with `○` status:}

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| Backups | ○ N/A | - | - |
| Error Handling | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

---

## Critical Gate

{Only include this section if criticalGate is true:}

```
┌─ WARNING ───────────────────────────────────┐
│                                             │
│  ⚠ Critical issues prevent Ready status:    │
│  • {critical item title}                    │
│  • {critical item title}                    │
│                                             │
└─────────────────────────────────────────────┘
```

Band is capped at "Needs Work" until all Critical-priority items are resolved.

---

## Risk Assessment

```
TOP RISKS
═══════════════════════════════════════════════
```

### ◆ {Critical Risk Title}

**Impact:** {What could go wrong — business consequences}

**Mitigation:** {How to address it}

---

### ● {High Risk Title}

**Impact:** {What could go wrong — business consequences}

**Mitigation:** {How to address it}

---

### ● {High Risk Title}

**Impact:** {What could go wrong — business consequences}

**Mitigation:** {How to address it}

---

## Assessment Profile

```
┌─ PROFILE ───────────────────────────────────┐
│                                             │
│  App Type:    {type}                        │
│  Stack:       {frameworks, runtime}         │
│  Database:    {database or "None detected"} │
│  Hosting:     {platform or "Not determined"}│
│                                             │
│  Compatible with:                           │
│  • {Platform 1}                             │
│  • {Platform 2}                             │
│  • {Platform 3}                             │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Assumptions

{If any information was unavailable, list assumptions made:}

- {Assumption 1}
- {Assumption 2}

---

## Score Bands Reference

| Score | Band | Meaning |
|-------|------|---------|
| 70-100 | ✓ Ready | Production-ready with minor improvements |
| 40-69 | ◐ Needs Work | Significant improvements needed |
| 0-39 | ✗ Not Ready | Critical gaps must be addressed |

**Note:** N/A items are excluded from the scoring pool. Critical-priority failures cap the band at "Needs Work" regardless of score.

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✓ | Pass |
| ✗ | Fail |
| ? | Unknown |
| ○ | N/A — not applicable (in Status column) |
| ◆ | Critical priority |
| ● | High priority |
| ◐ | Medium priority |
| ○ | Low priority (in Priority column) |
| ⚡ | Agent can fix |
| ½ | Agent + human |
| — | Human only |

---

See [action-plan.md](./action-plan.md) for prioritized next steps.
See [checklist/](./checklist/) for detailed findings on each item.
