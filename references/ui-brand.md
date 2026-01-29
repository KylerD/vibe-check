# Vibe Check UI Brand

Visual patterns for consistent, scannable output across all Vibe Check files.

---

## Score Display

### Progress Bars

Use 20-character bars for scores. `█` for filled, `░` for empty.

```
████████████████████  100%  (20/20)
████████████████░░░░   80%  (16/20)
████████████░░░░░░░░   60%  (12/20)
████████░░░░░░░░░░░░   40%  (8/20)
████░░░░░░░░░░░░░░░░   20%  (4/20)
░░░░░░░░░░░░░░░░░░░░    0%  (0/20)
```

### Score Calculation

```
bar_length = 20
filled = round((earned / max) * bar_length)
empty = bar_length - filled
```

### Band Indicators

| Score   | Band       | Display                    |
|---------|------------|----------------------------|
| 70-100  | Ready      | `✓ Ready`                  |
| 40-69   | Needs Work | `◐ Needs Work`             |
| 0-39    | Not Ready  | `✗ Not Ready`              |

---

## Main Score Banner

The primary score display at the top of summary and report files:

```
┌──────────────────────────────────────────────┐
│                                              │
│   VIBE CHECK                                 │
│                                              │
│   Score: 67/100                              │
│   ██████████████░░░░░░  Needs Work           │
│                                              │
└──────────────────────────────────────────────┘
```

For different bands:

```
┌──────────────────────────────────────────────┐
│                                              │
│   VIBE CHECK                                 │
│                                              │
│   Score: 84/100                              │
│   █████████████████░░░  ✓ Ready              │
│                                              │
└──────────────────────────────────────────────┘
```

```
┌──────────────────────────────────────────────┐
│                                              │
│   VIBE CHECK                                 │
│                                              │
│   Score: 28/100                              │
│   ██████░░░░░░░░░░░░░░  ✗ Not Ready          │
│                                              │
└──────────────────────────────────────────────┘
```

---

## Domain Scores

Display each domain with inline progress bar:

```
DOMAIN SCORES
─────────────────────────────────────────────────

Security         ████████████████░░░░  20/25   80%
Discoverability  ████████████████████  20/20  100%  ✓
Analytics        ████████░░░░░░░░░░░░   6/15   40%
Platform         ████████████░░░░░░░░   9/15   60%
Reliability      ████░░░░░░░░░░░░░░░░   3/15   20%
Legal            ████████████████████   9/10   90%  ✓
```

---

## Status Indicators

### Item Status

| Status  | Symbol | Usage                           |
|---------|--------|---------------------------------|
| Pass    | `✓`    | Requirement met                 |
| Fail    | `✗`    | Action required                 |
| Unknown | `?`    | Insufficient data               |

### Priority Markers

| Priority | Symbol | Visual Weight |
|----------|--------|---------------|
| Critical | `◆`    | Solid diamond — immediate action |
| High     | `●`    | Solid circle — urgent            |
| Medium   | `◐`    | Half circle — important          |
| Low      | `○`    | Empty circle — when time allows  |

### Agent-Doable Indicators

| Status  | Symbol | Meaning                    |
|---------|--------|----------------------------|
| Yes     | `⚡`    | Agent can fix completely   |
| Partial | `½`    | Agent + human effort       |
| No      | `—`    | Human action required      |

---

## Section Headers

Use consistent dividers for major sections:

```
TOP RISKS
═══════════════════════════════════════════════

◆ Critical: Hardcoded API keys in source code
● High: No error tracking configured
● High: Missing rate limiting on auth endpoints
```

```
QUICK WINS
═══════════════════════════════════════════════

These items are agent-doable and high-impact:

⚡ Move API keys to environment variables
⚡ Add meta description tags
⚡ Install error tracking SDK
```

---

## Checklist Display

### Summary Block

```
CHECKLIST
─────────────────────────────────────────────────

  ✓ Pass     12 items
  ✗ Fail      8 items
  ? Unknown   2 items
  ─────────────────────
  Total      22 items
```

### Item Lists by Priority

```
CRITICAL  ◆
─────────────────────────────────────────────────
✗  Secrets Management      Security      ⚡ Agent
✗  Authentication          Security      — Human

HIGH  ●
─────────────────────────────────────────────────
✗  Error Tracking          Analytics     ½ Partial
✗  Input Validation        Security      ⚡ Agent
✗  Backups                 Reliability   — Human

MEDIUM  ◐
─────────────────────────────────────────────────
✗  Meta Tags               Discoverability  ⚡ Agent
?  Cookie Consent          Legal            — Human
```

---

## Progress Tracking (Refresh)

When showing before/after comparison:

```
PROGRESS
═══════════════════════════════════════════════

Previous:  52/100  ████████████░░░░░░░░  Needs Work
Current:   71/100  ██████████████░░░░░░  ✓ Ready
                   ─────────────────────
Change:           +19 points  ▲

IMPROVEMENTS
─────────────────────────────────────────────────
✓  Secrets Management — moved to env vars
✓  Meta Tags — added title and description
✓  Input Validation — added zod schemas

REGRESSIONS
─────────────────────────────────────────────────
✗  Rate Limiting — was passing, now failing

STILL FAILING
─────────────────────────────────────────────────
●  Error Tracking — needs Sentry account setup
●  Backups — needs database config
```

---

## Callout Boxes

### Info Box

```
┌─ INFO ──────────────────────────────────────┐
│                                             │
│  Your stack is compatible with:             │
│  • Vercel                                   │
│  • Netlify                                  │
│  • Railway                                  │
│                                             │
└─────────────────────────────────────────────┘
```

### Warning Box

```
┌─ WARNING ───────────────────────────────────┐
│                                             │
│  3 items require human action:              │
│  • Create Sentry account                    │
│  • Enable database backups                  │
│  • Write privacy policy                     │
│                                             │
└─────────────────────────────────────────────┘
```

### Next Steps Box

```
┌─ NEXT STEPS ────────────────────────────────┐
│                                             │
│  1. Run /vibe-check:fix to auto-fix 5 items │
│  2. Set up Sentry account for error tracking│
│  3. Run /vibe-check:refresh to update score │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Terminal Output

When displaying results in the terminal (not written to files):

```
┌──────────────────────────────────────────────┐
│                                              │
│   VIBE CHECK COMPLETE                        │
│                                              │
│   Score: 67/100                              │
│   ██████████████░░░░░░  Needs Work           │
│                                              │
└──────────────────────────────────────────────┘

Created .vibe-check/ with 22 checklist items:
  ✓ 12 passing
  ✗  8 failing
  ?  2 unknown

5 items are agent-doable. Top priorities:
  ⚡ Secrets Management — move API keys to env vars
  ⚡ Meta Tags — add title and description
  ⚡ Input Validation — add request validation

┌─ NEXT ──────────────────────────────────────┐
│                                             │
│  • Review: .vibe-check/summary.md           │
│  • Fix:    /vibe-check:fix                  │
│  • Discuss: /vibe-check:discuss             │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Color Guidance (for future CLI enhancement)

If terminal colors are added later:

| Element        | Color   | ANSI Code |
|----------------|---------|-----------|
| Score bar fill | Cyan    | `\x1b[36m` |
| Pass/Ready     | Green   | `\x1b[32m` |
| Fail/Not Ready | Red     | `\x1b[31m` |
| Warning        | Yellow  | `\x1b[33m` |
| Muted text     | Dim     | `\x1b[2m`  |
| Headers        | Bold    | `\x1b[1m`  |

---

## Anti-Patterns

Avoid these inconsistencies:

- **Varying bar widths** — Always use 20 characters
- **Mixed status symbols** — Stick to `✓`, `✗`, `?`
- **Emoji overload** — No `🚀`, `✨`, `💫`, `🎉`
- **Inconsistent boxes** — Use the defined box styles only
- **Raw percentages without bars** — Always pair with visual
- **Tables where lists work better** — Use the right format for the content

---

## File-Specific Templates

### summary.md Structure

```
{Score Banner}

## Overview
{2-3 sentences}

## Top Risks
{Priority-marked list}

## Domain Scores
{Inline progress bars}

## Checklist Summary
{Summary block}

## Quick Wins
{Agent-doable list}

## Next Steps
{Callout box}
```

### report.md Structure

```
{Score Banner}

## Executive Summary
{Paragraph}

## Domain Breakdown
{Each domain with bar + details}

## Risk Assessment
{Prioritized findings}

## Checklist Overview
{Full item table}

## Recommendations
{Prioritized action items}
```

### Terminal Output Structure

```
{Score Banner}

{Item counts}

{Agent-doable priorities}

{Next Steps Box}
```
