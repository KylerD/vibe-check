# Scoring Reference

How vibe-check scores are calculated, including domain weights, score bands, critical gate, N/A adjustments, and per-item deductions.

## Domain Max Points

| Domain | Max Points | Items | Conditional | Scored |
|--------|-----------|-------|-------------|--------|
| Security | 15 | 9 | No | Yes |
| Performance | 12 | 5 | No | Yes |
| Accessibility | 12 | 5 | No | Yes |
| Testing | 10 | 4 | No | Yes |
| Monitoring | 10 | 4 | No | Yes |
| CI/CD | 10 | 4 | No | Yes |
| Discoverability | 10 | 6 | No | Yes |
| Analytics | 8 | 2 | No | Yes |
| Reliability | 8 | 3 | No | Yes |
| Legal | 5 | 4 | No | Yes |
| Platform | — | 4 | No | Informational only |
| AI Security | 12 | 5 | Yes — only if AI patterns detected | Yes |

**Base total:** 100 points (11 scored domains, 46 scored items + 4 informational Platform items = 50 base items)
**With AI Security:** 112 points (normalized to 100), 55 total items (46 scored + 4 informational + 5 conditional)
**Platform:** 4 informational items (unscored, advisory only — assessed and reported but carry 0 points and do not affect the numeric score or band)

Points check: 15+12+12+10+10+10+10+8+8+5 = 100 ✓
Item count: 9+5+5+4+4+4+6+2+3+4 = 46 scored + 4 Platform = 50 base + 5 AI Security = 55 total ✓

## Score Bands

**BREAKING CHANGE from v1.2:** 4 bands (up from 3), with higher thresholds.

| Score | Band | Meaning |
|-------|------|---------|
| 90-100 | Production Ready | Enterprise and scale concerns addressed. Safe for high-traffic, high-stakes, or regulated environments. |
| 75-89 | Launch Ready | Safe to put in front of early users. Core security, reliability, and legal bases covered. |
| 60-74 | Needs Work | Functional but has gaps that will bite you. Missing monitoring, incomplete testing, or security hardening gaps. |
| 0-59 | Early Stage | Prototype territory. Multiple critical domains unaddressed. Not safe for real users or real data. |

## Critical Gate Rule

After calculating the numeric score, check for critical failures:

```
If ANY item has status=Fail AND priority=Critical:
  Band is capped at "Needs Work" regardless of score.
  criticalGate = true
  criticalItems = [list of Critical-priority Fail items]
```

Only Critical-priority items gate the band. High/Medium/Low are reflected in the score but don't cap the band.

**Example:** A project scores 92/100 but has a hardcoded API key (Critical fail). The band is "Needs Work" until that critical item is resolved, even though the numeric score says "Production Ready".

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

A project with no database, no AI patterns, and limited accessibility requirements:

| Domain | Max | Applicable Items | Total Items | effectiveMax | Earned |
|--------|-----|-----------------|-------------|-------------|--------|
| Security | 15 | 7 (auth N/A, DB N/A) | 9 | ~11.7 | 9 |
| Performance | 12 | 5 | 5 | 12 | 10 |
| Accessibility | 12 | 4 (motion N/A) | 5 | 9.6 | 8 |
| Testing | 10 | 4 | 4 | 10 | 7 |
| Monitoring | 10 | 4 | 4 | 10 | 8 |
| CI/CD | 10 | 4 | 4 | 10 | 9 |
| Discoverability | 10 | 6 | 6 | 10 | 8 |
| Analytics | 8 | 2 | 2 | 8 | 6 |
| Reliability | 8 | 2 (backups N/A) | 3 | ~5.3 | 4 |
| Legal | 5 | 4 | 4 | 5 | 4 |
| AI Security | 12 | 0 (skipped) | 5 | 0 | 0 |

```
adjustedEarned = 9 + 10 + 8 + 7 + 8 + 9 + 8 + 6 + 4 + 4 = 73
adjustedMax = 11.7 + 12 + 9.6 + 10 + 10 + 10 + 10 + 8 + 5.3 + 5 = 91.6
normalizedScore = round(73 / 91.6 * 100) = 80
Band = Launch Ready (75 <= 80 <= 89)
```

## Per-Item Deduction Guide

**BREAKING CHANGE from v1.2:** Deductions are now percentage-based rather than absolute point values. This ensures fair scaling across domains with different point densities.

When an item fails or is unknown, deduct a percentage of that item's point value from the domain's earned score:

| Priority | Fail Deduction | Unknown Deduction |
|----------|---------------|-------------------|
| Critical | -100% of item value | -25% of item value |
| High | -75% of item value | -25% of item value |
| Medium | -50% of item value | -25% of item value |
| Low | -25% of item value | -25% of item value |

**N/A items:** No deduction. Set `na: true` and `deduction: 0`.

**Pass items:** No deduction.

### Points-per-Item Reference

Use this to calculate actual deduction amounts per item:

| Pts/item | Domains |
|----------|---------|
| ~4.0 | Analytics (8 ÷ 2) |
| ~2.7 | Reliability (8 ÷ 3) |
| ~2.5 | Performance (12 ÷ 5), Accessibility (12 ÷ 5), Testing (10 ÷ 4), Monitoring (10 ÷ 4), CI/CD (10 ÷ 4), AI Security (12 ÷ 5) |
| ~1.7 | Security (15 ÷ 9), Discoverability (10 ÷ 6) |
| ~1.25 | Legal (5 ÷ 4) |
| unscored | Platform (4 informational items) |

### How Earned Score Works

Start with the domain's effectiveMax and subtract deductions:

```
earned = effectiveMax - sum(deductions for applicable items)
earned = max(0, earned)  // floor at 0
```

**Example:** A Monitoring item (worth ~2.5 pts) with High priority fails:
- Deduction = 75% × 2.5 = 1.875 pts

**Example:** An Analytics item (worth ~4.0 pts) with Critical priority fails:
- Deduction = 100% × 4.0 = 4.0 pts (full item value lost)

## Platform Informational Items

Platform items appear in reports and action plans as advisory recommendations. They are assessed and written as checklist items but:

- Carry 0 points
- Do not affect the numeric score
- Do not affect the score band
- Do not trigger the critical gate (even if Priority=Critical)

Platform advisories typically cover infrastructure choices, managed service recommendations, and operational maturity suggestions. They are still surfaced to the user because they represent meaningful improvements even though they aren't scored.

## Priority Calibration

Use these guidelines to assign priority consistently:

**Critical** — Actual emergency:
- Secrets in code pushed to public repo
- No authentication on admin endpoints
- SQL injection in production
- No backups and database is the only copy
- No CI pipeline blocking deploys for a public app
- No test runner configured at all (untestable codebase)

**High** — Serious gap:
- Secrets in code (private repo)
- No rate limiting on auth endpoints
- No error tracking (you won't know when it's down)
- No HTTPS
- No security headers (X-Frame-Options, CSP, etc.)
- No structured logging
- No health check endpoint on a deployed service

**Medium** — Important but not urgent:
- No analytics (harder to debug)
- Missing input validation (potential bugs)
- Missing meta tags
- No code splitting on a large frontend bundle
- No E2E tests for critical user flows
- No APM / performance monitoring
- No env separation (staging vs. production)

**Low** — Nice to have:
- No Twitter cards (OG tags cover most cases)
- No infrastructure as code (fine for small projects)
- Font optimization opportunities
- Motion/reduced-motion accessibility (niche audience)
- Informational items (managed service suggestions)

**Calibrate by context:**
- Personal side project → most things drop a level
- Public handling payments → most things raise a level
- stakes=high → calibrate priority up for borderline items
- stakes=none → focus on critical issues only
