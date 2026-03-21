# Checklist

**Project:** {Project Name}
**Analysis Date:** {YYYY-MM-DD}

---

```
CHECKLIST SUMMARY
─────────────────────────────────────────────────

  ✓ Pass     {N} items
  ✗ Fail     {N} items
  ? Unknown  {N} items
  ○ N/A      {N} items
  ─────────────────────
  Total      {N} items
```

---

## By Priority

```
CRITICAL  ◆
═══════════════════════════════════════════════
```

| Item | Domain | Status | Agent |
|------|--------|--------|-------|
| [item-NNN-{slug}](./item-NNN-{slug}.md) | {Domain} | {✓/✗/?} | {⚡/½/—} |

```
HIGH  ●
═══════════════════════════════════════════════
```

| Item | Domain | Status | Agent |
|------|--------|--------|-------|
| [item-NNN-{slug}](./item-NNN-{slug}.md) | {Domain} | {✓/✗/?} | {⚡/½/—} |
| [item-NNN-{slug}](./item-NNN-{slug}.md) | {Domain} | {✓/✗/?} | {⚡/½/—} |

```
MEDIUM  ◐
═══════════════════════════════════════════════
```

| Item | Domain | Status | Agent |
|------|--------|--------|-------|
| [item-NNN-{slug}](./item-NNN-{slug}.md) | {Domain} | {✓/✗/?} | {⚡/½/—} |
| [item-NNN-{slug}](./item-NNN-{slug}.md) | {Domain} | {✓/✗/?} | {⚡/½/—} |

```
LOW  ○
═══════════════════════════════════════════════
```

| Item | Domain | Status | Agent |
|------|--------|--------|-------|
| [item-NNN-{slug}](./item-NNN-{slug}.md) | {Domain} | {✓/✗/?} | {⚡/½/—} |

---

## By Domain

### Security

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| [Secrets Management](./item-001-secrets-management.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Authentication](./item-002-authentication.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Input Validation](./item-003-input-validation.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Dependency Security](./item-004-dependency-security.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [HTTPS](./item-005-https.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

### Discoverability

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| [Meta Tags](./item-006-meta-tags.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [OpenGraph Tags](./item-007-opengraph.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Twitter Cards](./item-008-twitter-cards.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Sitemap](./item-009-sitemap.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [robots.txt](./item-010-robots-txt.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Semantic HTML](./item-011-semantic-html.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

### Analytics

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| [Visitor Tracking](./item-012-visitor-tracking.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Error Tracking](./item-013-error-tracking.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Conversion Tracking](./item-014-conversion-tracking.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

### Platform

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| [Hosting Compatibility](./item-015-hosting-compatibility.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Complexity Check](./item-016-complexity.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Cost Signals](./item-017-cost-signals.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Managed Services](./item-018-managed-services.md) | ℹ | ○ | — |

### Reliability

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| [Backups](./item-019-backups.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Error Handling](./item-020-error-handling.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Database Connections](./item-021-database-connections.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Health Checks](./item-022-health-checks.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

### Legal

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| [Privacy Policy](./item-023-privacy-policy.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Terms of Service](./item-024-terms-of-service.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Cookie Consent](./item-025-cookie-consent.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [User Data Deletion](./item-026-user-deletion.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

### AI Security — *Conditional*

{Only include this section if AI patterns were detected. Otherwise omit.}

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| [Prompt Injection Prevention](./item-027-prompt-injection.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Function Calling Safety](./item-028-function-calling.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [WebSocket Origin Validation](./item-029-websocket-origin.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Plugin Ecosystem Security](./item-030-plugin-security.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Context Isolation](./item-031-context-isolation.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

### N/A Domains

{For any domain that is entirely N/A, show:}

```
### {Domain Name} — N/A

○ Excluded from scoring — {brief reason, e.g., "no database detected", "no analytics SDK and stakes are minimal"}
```

---

## Agent-Doable Items

```
QUICK WINS  ⚡
═══════════════════════════════════════════════
```

These items can be fixed by an AI coding agent:

| Item | Domain | Priority |
|------|--------|----------|
| ⚡ [item-NNN-{slug}](./item-NNN-{slug}.md) | {Domain} | {◆/●/◐/○} |
| ⚡ [item-NNN-{slug}](./item-NNN-{slug}.md) | {Domain} | {◆/●/◐/○} |

To fix an item manually, tell your AI assistant:

```
Read .vibe-check/checklist/item-NNN-{slug}.md and fix it
```

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✓ | Pass — requirement met |
| ✗ | Fail — action required |
| ? | Unknown — insufficient data |
| ○ | N/A — not applicable to this project (in Status column) |
| ℹ | Info — informational only |
| ◆ | Critical priority |
| ● | High priority |
| ◐ | Medium priority |
| ○ | Low priority (in Priority column) |
| ⚡ | Agent can fix completely |
| ½ | Agent + human effort needed |
| — | Human action required |
