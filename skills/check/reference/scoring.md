# Scoring Reference

How vibe-check scores are calculated, including domain weights, score bands, critical gate, and N/A adjustments.

## Domain Max Points

| Domain | Max Points | Items | Conditional |
|--------|-----------|-------|-------------|
| Security | 25 | 5 | No |
| Discoverability | 20 | 6 | No |
| Analytics | 15 | 3 | No |
| Platform | 15 | 4 | No |
| Reliability | 15 | 4 | No |
| Legal | 10 | 4 | No |
| AI Security | 20 | 5 | Yes -- only if AI patterns detected |

**Base total:** 100 points (6 core domains)
**With AI Security:** 120 points (normalized to 100)

## Score Bands

| Score | Band | Meaning |
|-------|------|---------|
| 70-100 | Ready | Production-ready with minor improvements. Ship it, then iterate. |
| 40-69 | Needs Work | Significant gaps to address. Prioritize critical and high items before launch. |
| 0-39 | Not Ready | Critical gaps that must be addressed. Don't launch until the blockers are resolved. |

## Critical Gate Rule

After calculating the numeric score, check for critical failures:

```
If ANY item has status=Fail AND priority=Critical:
  Band is capped at "Needs Work" regardless of score.
  criticalGate = true
  criticalItems = [list of Critical-priority Fail items]
```

Only Critical-priority items gate the band. High/Medium/Low are reflected in the score but don't cap the band.

**Example:** A project scores 85/100 but has a hardcoded API key (Critical fail). The band is "Needs Work" until that critical item is resolved, even though the numeric score says "Ready".

## N/A-Adjusted Scoring

Not all items apply to every project. When items are marked N/A, the scoring adjusts so projects aren't penalized for capabilities they don't have.

### Per-Domain Calculation

```
Per domain with some N/A items:
  effectiveMax = domainMax * (applicableItems / totalItems)

Per domain entirely N/A (or skipped):
  effectiveMax = 0, excluded from scoring
```

### Overall Score Calculation

```
adjustedEarned = sum of earned across applicable domains only
adjustedMax = sum of effectiveMax across applicable domains only

normalizedScore = round((adjustedEarned / adjustedMax) * 100)
```

### Example

A project with no database and no AI patterns:

| Domain | Max | Applicable Items | Total Items | effectiveMax | Earned |
|--------|-----|-----------------|-------------|-------------|--------|
| Security | 25 | 4 (auth N/A) | 5 | 20 | 16 |
| Discoverability | 20 | 6 | 6 | 20 | 18 |
| Analytics | 15 | 3 | 3 | 15 | 10 |
| Platform | 15 | 4 | 4 | 15 | 12 |
| Reliability | 15 | 2 (backups, DB N/A) | 4 | 7.5 | 5 |
| Legal | 10 | 4 | 4 | 10 | 6 |
| AI Security | 20 | 0 (skipped) | 5 | 0 | 0 |

```
adjustedEarned = 16 + 18 + 10 + 12 + 5 + 6 = 67
adjustedMax = 20 + 20 + 15 + 15 + 7.5 + 10 = 87.5
normalizedScore = round(67 / 87.5 * 100) = 77
Band = Ready (77 >= 70)
```

## Per-Item Deduction Guide

When an item fails or is unknown, deduct from the domain's earned score:

| Priority | Fail Deduction | Unknown Deduction |
|----------|---------------|-------------------|
| Critical | -4 to -5 points | -1 point |
| High | -2 to -3 points | -1 point |
| Medium | -1 to -2 points | -1 point |
| Low | -1 point | -1 point |

**N/A items:** No deduction. Set `na: true` and `deduction: 0`.

**Pass items:** No deduction.

### How Earned Score Works

Start with the domain's effectiveMax and subtract deductions:

```
earned = effectiveMax - sum(deductions for applicable items)
earned = max(0, earned)  // floor at 0
```

## Priority Calibration

Use these guidelines to assign priority consistently:

**Critical** -- Actual emergency:
- Secrets in code pushed to public repo
- No authentication on admin endpoints
- SQL injection in production
- No backups and database is the only copy

**High** -- Serious gap:
- Secrets in code (private repo)
- No rate limiting on auth endpoints
- No error tracking (you won't know when it's down)
- No HTTPS

**Medium** -- Important but not urgent:
- No analytics (harder to debug)
- Missing input validation (potential bugs)
- Missing meta tags

**Low** -- Nice to have:
- No Twitter cards (OG tags cover most cases)
- No infrastructure as code (fine for small projects)
- Informational items (managed services suggestions)

**Calibrate by context:**
- Personal side project -> most things drop a level
- Public handling payments -> most things raise a level
- stakes=high -> calibrate priority up for borderline items
- stakes=none -> focus on critical issues only
