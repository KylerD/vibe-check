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
| [Security Headers](./item-006-security-headers.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [CORS Configuration](./item-007-cors-configuration.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Rate Limiting](./item-008-rate-limiting.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [CSRF Protection](./item-009-csrf-protection.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

### Discoverability

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| [Meta Tags](./item-010-meta-tags.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [OpenGraph Tags](./item-011-opengraph.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Twitter Cards](./item-012-twitter-cards.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Sitemap](./item-013-sitemap.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [robots.txt](./item-014-robots-txt.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Semantic HTML](./item-015-semantic-html.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

### Performance

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| [Image Optimization](./item-016-image-optimization.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Code Splitting & Lazy Loading](./item-017-code-splitting.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Data Fetching & Caching Strategy](./item-018-data-fetching.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Font Optimization](./item-019-font-optimization.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Database Query Performance](./item-020-db-query-performance.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

### Accessibility

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| [Image Alt Text](./item-021-image-alt-text.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Form Label Association](./item-022-form-labels.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Keyboard Navigation & Focus Management](./item-023-keyboard-nav.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [ARIA & Semantic HTML](./item-024-aria-semantic.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Motion & Animation Accessibility](./item-025-motion-accessibility.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

### Testing

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| [Test Runner Configured](./item-026-test-runner.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Test Files Exist](./item-027-test-files.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [E2E Testing Setup](./item-028-e2e-testing.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Tests Run in CI](./item-029-tests-in-ci.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

### Monitoring

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| [Error Tracking](./item-030-error-tracking.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Structured Logging](./item-031-structured-logging.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Health Check Endpoint](./item-032-health-check.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Application Performance Monitoring](./item-033-apm.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

### CI/CD

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| [CI Pipeline Exists](./item-034-ci-pipeline.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Build Verification in CI](./item-035-build-verification.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Database Migration Strategy](./item-036-db-migrations.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Environment Separation](./item-037-env-separation.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

### Analytics

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| [Visitor Tracking](./item-038-visitor-tracking.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Conversion Tracking](./item-039-conversion-tracking.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

### Platform — ℹ (informational)

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| [Hosting Compatibility](./item-040-hosting-compatibility.md) | ℹ | — | — |
| [Complexity Check](./item-041-complexity.md) | ℹ | — | — |
| [Cost Signals](./item-042-cost-signals.md) | ℹ | — | — |
| [Managed Services](./item-043-managed-services.md) | ℹ | — | — |

### Reliability

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| [Backups](./item-044-backups.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Error Handling](./item-045-error-handling.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Database Connection Handling](./item-046-database-connections.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

### Legal

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| [Privacy Policy](./item-047-privacy-policy.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Terms of Service](./item-048-terms-of-service.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Cookie Consent](./item-049-cookie-consent.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [User Data Deletion](./item-050-user-deletion.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

### AI Security — *Conditional*

{Only include this section if AI patterns were detected. Otherwise omit.}

| Item | Status | Priority | Agent |
|------|--------|----------|-------|
| [Prompt Injection Prevention](./item-051-prompt-injection.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Function Calling Safety](./item-052-function-calling.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [WebSocket Origin Validation](./item-053-websocket-origin.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Plugin Ecosystem Security](./item-054-plugin-security.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |
| [Context Isolation](./item-055-context-isolation.md) | {✓/✗/?} | {◆/●/◐/○} | {⚡/½/—} |

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
| ℹ | Informational — advisory only |
| ◆ | Critical priority |
| ● | High priority |
| ◐ | Medium priority |
| ○ | Low priority (in Priority column) |
| ⚡ | Agent can fix completely |
| ½ | Agent + human effort needed |
| — | Human action required |
