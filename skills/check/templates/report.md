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

### Security ({earned}/15)

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
| Security Headers | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| CORS Configuration | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Rate Limiting | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| CSRF Protection | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

---

### Performance ({earned}/12)

```
{bar}  {pct}%  {status}
```

{Brief assessment of performance and loading characteristics}

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| Image Optimization | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Code Splitting & Lazy Loading | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Data Fetching & Caching Strategy | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Font Optimization | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Database Query Performance | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

---

### Accessibility ({earned}/12)

```
{bar}  {pct}%  {status}
```

{Brief assessment of accessibility posture}

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| Image Alt Text | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Form Label Association | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Keyboard Navigation & Focus Management | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| ARIA & Semantic HTML | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Motion & Animation Accessibility | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

---

### Testing ({earned}/10)

```
{bar}  {pct}%  {status}
```

{Brief assessment of test coverage and strategy}

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| Test Runner Configured | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Test Files Exist | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| E2E Testing Setup | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Tests Run in CI | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

---

### Monitoring ({earned}/10)

```
{bar}  {pct}%  {status}
```

{Brief assessment of observability and monitoring}

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| Error Tracking | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Structured Logging | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Health Check Endpoint | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Application Performance Monitoring | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

---

### CI/CD ({earned}/10)

```
{bar}  {pct}%  {status}
```

{Brief assessment of CI/CD pipeline and deployment practices}

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| CI Pipeline Exists | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Build Verification in CI | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Database Migration Strategy | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Environment Separation | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

---

### Discoverability ({earned}/10)

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

### Analytics ({earned}/8)

```
{bar}  {pct}%  {status}
```

{Brief assessment of analytics and tracking setup}

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| Visitor Tracking | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Conversion Tracking | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

---

### Reliability ({earned}/8)

```
{bar}  {pct}%  {status}
```

{Brief assessment of error handling and data safety}

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| Backups | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Error Handling | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| Database Connection Handling | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

---

### Legal ({earned}/5)

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

### Platform — Unscored — advisory only

{Brief assessment of hosting and infrastructure}

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| Hosting Compatibility | ℹ | — | — |
| Complexity Check | ℹ | — | — |
| Cost Signals | ℹ | — | — |
| Managed Services | ℹ | — | — |

---

### AI Security ({earned}/12) — *Conditional*

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
| 90-100 | ✓ Production Ready | Exceeds launch requirements |
| 75-89 | ◑ Launch Ready | Ready to ship with minor gaps |
| 60-74 | ◐ Needs Work | Significant improvements needed |
| 0-59 | ✗ Early Stage | Critical gaps must be addressed |

**Note:** N/A items are excluded from the scoring pool. Critical-priority failures cap the band at "Needs Work" regardless of score.

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✓ | Pass |
| ✗ | Fail |
| ? | Unknown |
| ○ | N/A — not applicable (in Status column) |
| ℹ | Informational — advisory only |
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
