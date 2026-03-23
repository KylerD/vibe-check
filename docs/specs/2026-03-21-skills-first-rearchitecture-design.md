# Vibe Check v2.0: Skills-First Universal Distribution

**Date:** 2026-03-21
**Status:** Approved
**Author:** Kyle Davidson + Claude

## Summary

Rearchitect vibe-check from a Claude Code-specific command/agent system to a universal skills-based plugin that works across all 9 major AI harnesses (Claude Code, Cursor, Gemini CLI, Codex CLI, VS Code Copilot, Antigravity, Kiro, OpenCode, Pi). This is a clean break (v2.0) — new format, new distribution, new repo structure.

## Motivation

- The `skills` format (SKILL.md folders) has become the standard extension point across AI harnesses
- Leading plugins (impeccable.style, superpowers) prove that complex multi-agent workflows work as skills
- Our current Claude Code-only distribution limits reach to one harness
- The `npx skills` CLI (v1.4.5) provides cross-platform installation with auto-detection
- Anthropic's own teams use skills extensively — "one of the most used extension points in Claude Code"

## Design Principles

1. **Skills are folders, not files** — progressive disclosure via reference subdirectories, not one giant markdown file
2. **Description is a trigger matcher** — tells the AI *when* to invoke, not *what* it does
3. **Graceful degradation** — same SKILL.md works in Claude Code (multi-agent) and Cursor (single-agent inline)
4. **Don't state the obvious** — focus on what pushes the AI out of its normal thinking
5. **Gotchas are the highest-signal content** — built from real failure patterns
6. **Avoid railroading** — give the AI information and flexibility, not rigid scripts

---

## 1. Skill Architecture

Every command becomes a skill folder with `SKILL.md` + supporting files.

```
skills/
├── check/
│   ├── SKILL.md                    # Orchestrator instructions
│   ├── agents/
│   │   ├── mapper.md               # Spawn instructions for mapper agent
│   │   ├── assessor.md             # Spawn instructions for assessor agent
│   │   └── fixer.md                # Spawn instructions for fixer agent (read-only reference for check)
│   ├── reference/
│   │   ├── domains.md              # What "good" looks like per domain
│   │   ├── agent-classification.md # Agent-doable criteria
│   │   └── scoring.md              # Scoring methodology
│   └── templates/
│       ├── summary.md              # Executive summary template
│       ├── report.md               # Full report template
│       ├── checklist-item.md       # Individual finding template
│       ├── checklist-index.md      # All items overview
│       ├── action-plan.md          # Prioritized fix list template
│       └── vibe-check-readme.md    # Results folder README
│
├── fix/
│   ├── SKILL.md                    # Advisory fix presenter (never auto-invokes fixes)
│   └── reference/
│       └── agent-classification.md
│
├── idea/
│   ├── SKILL.md                    # Founder-lens idea validation
│   └── reference/
│       └── idea-validation.md      # Framework, scoring, mental models
│
├── plan/
│   ├── SKILL.md                    # Project planning
│   ├── reference/
│   │   └── project-planning.md     # Methodology
│   └── templates/
│       └── project-plan.md         # PROJECT-PLAN.md template
│
├── refresh/
│   └── SKILL.md                    # Re-run + delta comparison
│
├── discuss/
│   └── SKILL.md                    # Q&A about findings
│
├── map-codebase/
│   ├── SKILL.md                    # Standalone mapping
│   └── agents/
│       └── mapper.md               # Mapper agent instructions
│
├── help/
│   └── SKILL.md                    # Command reference
│
└── shared/                         # Cross-skill resources
    ├── persona.md                  # Target audience & tone
    ├── voice.md                    # Communication style
    ├── ui-brand.md                 # Visual output patterns
    └── scripts/
        ├── scan-secrets.js         # Secret scanner
        └── secret-patterns.json    # Gitleaks patterns
```

### Key decisions

- **Self-contained skills** — each skill tells the AI which reference files to read and when (progressive disclosure)
- **Agent instructions inside the skill** — not a separate top-level `agents/` directory
- **Templates inside the skill** that produces them
- **`shared/`** holds cross-cutting concerns referenced by multiple skills
- **Scripts in `shared/`** — secret scanner hook is an optional Claude Code enhancement

### Graceful degradation pattern

Inside SKILL.md orchestration sections:

```markdown
## Codebase Mapping

If your environment supports spawning subagents (Claude Code Agent tool,
or equivalent), read `agents/mapper.md` and dispatch a mapper agent to
analyze the codebase in parallel.

Otherwise, perform the analysis yourself by working through the checklist
in `reference/domains.md` for each applicable domain.
```

### Fix skill: advisory, not automatic

The `/fix` skill presents findings and suggested fixes but **waits for the user to confirm** before applying any changes. It should:
- List findings with proposed fixes
- Ask the user which fixes to apply (individually or as a batch)
- Only proceed with explicit approval
- Never auto-invoke fixes or assume consent

---

## 2. SKILL.md Format & Frontmatter

### Canonical source (what we author)

```yaml
---
name: check
description: Run full production readiness assessment. Use when the user wants to evaluate if their app is ready for real users — checks security, SEO, analytics, reliability, legal, and platform concerns.
user-invocable: true
args:
  - name: focus
    description: Optional domain to focus on (security, discoverability, analytics, platform, reliability, legal)
    required: false
---
```

### Per-harness frontmatter

| Field | Claude Code | Cursor | Gemini | Codex | Others |
|-------|------------|--------|--------|-------|--------|
| `name` | yes | yes | yes | yes | yes |
| `description` | yes | yes | yes | yes | yes |
| `user-invocable` | yes | omit | omit | omit | omit |
| `args` | yes | omit | omit | omit | omit |
| `argument-hint` | omit | omit | omit | yes | omit |

### Progressive disclosure pattern

SKILL.md stays lean. It tells the AI what files exist and when to read them:

```markdown
## Reference Files

Read these as needed during the assessment:

- `reference/domains.md` — criteria for what "good" looks like in each domain
- `reference/scoring.md` — how to calculate scores and bands
- `reference/agent-classification.md` — how to determine if an item is agent-fixable
- `agents/mapper.md` — instructions for spawning the codebase mapper
- `agents/assessor.md` — instructions for spawning domain assessors
- `templates/` — output templates for reports, checklists, summaries
```

### Gotchas section (per skill)

Each SKILL.md includes gotchas built from real failure patterns:

```markdown
## Gotchas

- Do NOT read every file in the repo. Use the analysis files in `.vibe-check/analysis/`.
- Do NOT hallucinate file paths or line numbers. Every finding must reference real code.
- The orchestrator should stay under 30% context usage. Delegate, don't absorb.
- N/A items are not written as checklist files — they only appear in return summaries.
- Critical-priority Fail items cap the band at "Needs Work" regardless of score.
```

---

## 3. Idea Validation Enhancements

The `/idea` skill gets enhanced with mental models from Garry Tan's gstack CEO review:

### New frameworks to incorporate

- **Premise Challenge** — "Is this the right problem? Could a different framing be simpler or more impactful?" Challenge the idea before evaluating it
- **Inversion Reflex (Munger)** — For every "how do we win?", also ask "what would make us fail?"
- **10-Star Product thinking** — "What's the version that's 10x more ambitious and delivers 10x more value for 2x the effort?"
- **Dream State Mapping** — Describe ideal end state in 12 months; does this idea move toward it?
- **"Boil the Lake" principle** — AI makes completeness cheap. Don't plan shortcuts when the full thing costs minutes more
- **Delight Opportunities** — 30-minute improvements where users think "oh, they thought of that"
- **Reversibility x Magnitude (Bezos)** — Categorize decisions: can it be undone? How much impact? Move fast on two-way doors
- **Mode selection** — Let the user choose posture:
  - EXPANSION: dream big, propose the ambitious version
  - HOLD: validate as-is, focus on execution risk
  - REDUCTION: strip to essentials, find the MVP

These complement the existing founder-lens validation (market sizing, competitive positioning, technical feasibility) with strategic thinking depth.

---

## 4. Distribution Strategy

### Four installation channels

#### Channel 1: `npx skills add Hypership-Software/vibe-check` (Primary)

The `skills` CLI auto-detects harnesses and installs skill folders.

- **Source:** `skills/` directory at repo root
- **Supports:** All 9 harnesses
- **Updates:** `npx skills update` or `npx skills check`

#### Channel 2: Claude Code Plugin Marketplace

`/plugin marketplace add Hypership-Software/vibe-check`

- Only channel where hooks (secret scanner) install automatically
- Discovered through Claude Code's built-in plugin browser

#### Channel 3: Universal ZIP (website download)

Pre-built directories for every harness at `vibe-check.cloud/download`:

```
vibe-check-universal/
├── .claude/skills/vibe-check/...
├── .cursor/skills/vibe-check/...
├── .gemini/skills/vibe-check/...
├── .codex/skills/vibe-check/...
├── .agents/skills/vibe-check/...
├── .kiro/skills/vibe-check/...
├── .opencode/skills/vibe-check/...
├── .pi/skills/vibe-check/...
└── README.txt
```

#### Channel 4: `npx vibe-check-cc` v2.0 (Migration + Hooks)

Simplified to:
1. Detect old install → offer cleanup
2. Install secret scanner hook to `settings.json`
3. Print guidance → "run `npx skills add Hypership-Software/vibe-check`"

### Transition plan (clean break)

1. **v2.0 of `vibe-check-cc`** — cleanup of old directories, migration message
2. **New skills directory** at repo root, `npx skills add` just works
3. **Build script** generates universal ZIP + per-harness frontmatter variants
4. **Website update** — logo bar, multi-method install, `/download` page

---

## 5. Website Updates (vibe-check.cloud)

### Redesigned homepage structure

```
/ (homepage)
├── Hero: "Production readiness for AI-built apps"
├── "Works on" logo bar (9 harnesses, grayscale → color on hover)
├── What it does (idea → plan → check → fix pipeline)
├── Before/After or example output
├── Install section (3 methods as tabs/cards)
├── Commands cheatsheet (8 skills reference)
├── FAQ
└── Footer
```

### Install section (3 tabs)

**Tab 1: CLI (recommended)**
```bash
npx skills add Hypership-Software/vibe-check
```

**Tab 2: Claude Code Plugin**
```
/plugin marketplace add Hypership-Software/vibe-check
```

**Tab 3: Manual Download**
Universal ZIP → copy relevant folder to project root.

### Commands cheatsheet

| Command | What it does |
|---------|-------------|
| `/idea` | Validate your product idea with a founder lens |
| `/plan` | Plan the build — produces PROJECT-PLAN.md |
| `/check` | Full production readiness assessment |
| `/fix` | Review findings and apply fixes (with your approval) |
| `/refresh` | Re-run assessment and show progress |
| `/discuss` | Ask questions about your report |
| `/map-codebase` | Standalone codebase analysis |
| `/help` | Command reference |

### What stays vs changes

- **Keeps:** Existing guides, features encyclopedia, interactive checker, SEO, JSON-LD
- **Changes:** Homepage hero, adds logo bar, 3-method install, `/download` page
- **Removes:** Nothing — additive changes

---

## 6. Build System & Repo Structure

### New repo structure

```
vibe-check/
├── skills/                          # CANONICAL SOURCE
│   ├── check/
│   ├── fix/
│   ├── idea/
│   ├── plan/
│   ├── refresh/
│   ├── discuss/
│   ├── map-codebase/
│   ├── help/
│   └── shared/
│
├── packages/
│   ├── cli/                         # npx vibe-check-cc v2.0 (migration + hooks)
│   │   ├── bin/install.js
│   │   └── package.json
│   └── build/                       # Build tooling
│       ├── generate-universal.js    # Per-harness directory generator
│       └── harness-config.json      # Frontmatter mappings
│
├── dist/                            # Generated output (gitignored)
│   └── universal/
│       ├── .claude/skills/vibe-check/...
│       ├── .cursor/skills/vibe-check/...
│       └── ... (all 9 harnesses)
│
├── apps/
│   └── web/                         # vibe-check.cloud
│
├── docs/
│   └── specs/                       # Design documents
│
└── turbo.json
```

### Build script (`packages/build/generate-universal.js`)

1. Reads `harness-config.json` for per-harness frontmatter rules
2. For each harness, copies all skill folders to `dist/universal/.<harness>/skills/vibe-check/`
3. Transforms SKILL.md frontmatter per harness
4. Packages into ZIP for website download

```json
{
  "claude": {
    "dir": ".claude/skills",
    "frontmatter": { "user-invocable": true, "args": true }
  },
  "cursor": {
    "dir": ".cursor/skills",
    "frontmatter": { "user-invocable": false, "args": false }
  },
  "codex": {
    "dir": ".codex/skills",
    "frontmatter": { "argument-hint": true }
  },
  "gemini": { "dir": ".gemini/skills", "frontmatter": {} },
  "agents": { "dir": ".agents/skills", "frontmatter": {} },
  "kiro": { "dir": ".kiro/skills", "frontmatter": {} },
  "opencode": { "dir": ".opencode/skills", "frontmatter": {} },
  "pi": { "dir": ".pi/skills", "frontmatter": {} }
}
```

### CI/CD

- **Turbo task:** `build:universal` runs `generate-universal.js`
- **GitHub Release:** attaches `vibe-check-universal.zip` to each release
- **npm publish:** `vibe-check-cc` v2.0 (hooks-only installer)

### `npx skills add` compatibility

The `skills` CLI discovers `skills/*/SKILL.md` at repo root. Running `npx skills add Hypership-Software/vibe-check`:
1. Clones/fetches from GitHub
2. Finds all SKILL.md files
3. Auto-detects local harnesses
4. Copies/symlinks into appropriate directories

---

## 7. Migration Path

### For existing users (v1.x → v2.0)

1. Run `npx vibe-check-cc@latest --global` (or `--local`)
2. v2.0 installer detects old install, offers cleanup
3. Removes old `commands/vibe-check/`, `vibe-check/`, `agents/vibe-*.md`
4. Installs secret scanner hook (if desired)
5. Prompts: "Now run `npx skills add Hypership-Software/vibe-check` to install skills"

### For new users

1. `npx skills add Hypership-Software/vibe-check` — done
2. Optionally `npx vibe-check-cc` for the secret scanner hook (Claude Code only)

### `.vibe-check/` output directory

Unchanged. Assessment output still writes to `.vibe-check/` in the project root. This is not affected by the rearchitecture.

---

## 8. Implementation Sequence

### Phase 1: Skill conversion
- Convert all 8 commands to SKILL.md format (see Section 10 migration map)
- Move agent instructions into skill subdirectories
- Move templates and references into skill subdirectories
- Extract scoring methodology from vibe-assessor.md into `skills/check/reference/scoring.md`
- Create `shared/` for cross-cutting resources (persona, voice, brand — inlined at build)
- Enhance `/idea` with gstack mental models (premise challenge, inversion, 10-star, mode selection)
- Make `/fix` advisory (present findings, wait for user approval before applying)
- Add on-demand secret scanner hook to `/check` skill

### Phase 2: Build system
- Create `packages/build/generate-universal.js`
- Create `harness-config.json`
- Add `build:universal` turbo task
- Generate and test output for all 9 harnesses

### Phase 3: Distribution
- Update `packages/cli` to v2.0 (migration + hooks only)
- Test `npx skills add Hypership-Software/vibe-check` flow
- Register as Claude Code plugin marketplace entry
- Set up GitHub Release with ZIP attachment

### Phase 4: Website
- Add "Works on" logo bar to homepage
- Add 3-method install section
- Create `/download` page for universal ZIP
- Add commands cheatsheet
- Update existing install instructions

### Phase 5: Launch
- Publish `vibe-check-cc@2.0.0` to npm
- Create GitHub release with universal ZIP
- Update website
- Announce on relevant channels

---

## 9. Resolved Design Decisions

### RD1. Shared files: inline at build time (not shipped as `shared/`)

`shared/` is a **source-only directory**. The build script inlines persona, voice, and brand content into each SKILL.md that needs it at build time. This avoids broken relative paths after `npx skills add` installs skills into harness directories. Scripts (scan-secrets.js) are embedded only in the skills that use them.

### RD2. Secret scanner: on-demand hook on `/check` skill

The secret scanner moves from a permanent `PreToolUse` hook to an on-demand hook registered by the `/check` skill. This eliminates the need for a separate `npx vibe-check-cc` hooks installer entirely. The v2.0 CLI becomes migration-only (cleanup old install, guide to `npx skills add`).

### RD3. Harness name → config key mapping

| Display Name | Config Key | Directory | Notes |
|-------------|-----------|-----------|-------|
| Claude Code | `claude` | `.claude/skills` | Full features (agents, hooks) |
| Cursor | `cursor` | `.cursor/skills` | |
| Gemini CLI | `gemini` | `.gemini/skills` | |
| Codex CLI | `codex` | `.codex/skills` | Uses `argument-hint` |
| VS Code Copilot | `agents` | `.agents/skills` | Shared dir with Antigravity |
| Antigravity | `agents` | `.agents/skills` | Same dir as VS Code Copilot |
| Kiro | `kiro` | `.kiro/skills` | |
| OpenCode | `opencode` | `.opencode/skills` | |
| Pi | `pi` | `.pi/skills` | |

**Count: 9 harnesses, 8 directories** (VS Code Copilot and Antigravity share `.agents/`).

### RD4. Frontmatter transformation rules

The build script applies these transformations:

| Source field | Claude Code | Cursor/Gemini/Others | Codex |
|-------------|------------|---------------------|-------|
| `user-invocable: true` | Keep | Remove | Remove |
| `args: [{name: "focus", ...}]` | Keep | Remove | Convert to `argument-hint: "[FOCUS=<domain>]"` |
| `name`, `description` | Keep | Keep | Keep |

### RD5. Skill invocation syntax varies by harness

The website commands cheatsheet uses `/skill-name` syntax (Claude Code convention). A note will indicate that invocation varies by harness (e.g., Cursor may use `@vibe-check check`).

---

## 10. Current State → New State Migration Map

### Commands (packages/cli/commands/)

| Current File | New Location | Notes |
|-------------|-------------|-------|
| `commands/check.md` | `skills/check/SKILL.md` | Rearchitected as skill |
| `commands/fix.md` | `skills/fix/SKILL.md` | Made advisory (no auto-apply) |
| `commands/idea.md` | `skills/idea/SKILL.md` | Enhanced with gstack mental models |
| `commands/plan.md` | `skills/plan/SKILL.md` | Add `templates/project-plan.md` |
| `commands/refresh.md` | `skills/refresh/SKILL.md` | |
| `commands/discuss.md` | `skills/discuss/SKILL.md` | |
| `commands/map-codebase.md` | `skills/map-codebase/SKILL.md` | |
| `commands/help.md` | `skills/help/SKILL.md` | |

### Agents (packages/cli/agents/)

| Current File | New Location | Notes |
|-------------|-------------|-------|
| `agents/vibe-mapper.md` | `skills/check/agents/mapper.md` | Also in `skills/map-codebase/agents/` |
| `agents/vibe-assessor.md` | `skills/check/agents/assessor.md` | |
| `agents/vibe-fixer.md` | `skills/check/agents/fixer.md` | Referenced by fix skill |

### Skills/Knowledge (packages/cli/skills/)

| Current File | New Location | Notes |
|-------------|-------------|-------|
| `skills/readiness-assessment/SKILL.md` | `skills/check/reference/domains.md` | Merged with domains reference |
| `skills/security-patterns/SKILL.md` | `skills/check/reference/domains.md` | Security section |
| `skills/web-discoverability/SKILL.md` | `skills/check/reference/domains.md` | Discoverability section |
| `skills/reliability-patterns/SKILL.md` | `skills/check/reference/domains.md` | Reliability section |
| `skills/idea-validation/SKILL.md` | `skills/idea/reference/idea-validation.md` | Enhanced with gstack models |
| `skills/project-planning/SKILL.md` | `skills/plan/reference/project-planning.md` | |

### References (packages/cli/references/)

| Current File | New Location | Notes |
|-------------|-------------|-------|
| `references/domains.md` | `skills/check/reference/domains.md` | Merged with knowledge skills |
| `references/persona.md` | `skills/shared/persona.md` (source only, inlined at build) | |
| `references/voice.md` | `skills/shared/voice.md` (source only, inlined at build) | |
| `references/ui-brand.md` | `skills/shared/ui-brand.md` (source only, inlined at build) | |
| `references/agent-classification.md` | `skills/check/reference/agent-classification.md` | Also in fix skill |

### Templates (packages/cli/templates/)

| Current File | New Location | Notes |
|-------------|-------------|-------|
| `templates/summary.md` | `skills/check/templates/summary.md` | |
| `templates/report.md` | `skills/check/templates/report.md` | |
| `templates/action-plan.md` | `skills/check/templates/action-plan.md` | |
| `templates/checklist-item.md` | `skills/check/templates/checklist-item.md` | |
| `templates/checklist-index.md` | `skills/check/templates/checklist-index.md` | Retained |
| `templates/vibe-check-readme.md` | `skills/check/templates/vibe-check-readme.md` | Retained |

### Scripts & Hooks

| Current File | New Location | Notes |
|-------------|-------------|-------|
| `scripts/scan-secrets.js` | `skills/shared/scripts/scan-secrets.js` (source) | Embedded in check skill as on-demand hook |
| `scripts/secret-patterns.json` | `skills/shared/scripts/secret-patterns.json` (source) | Bundled with scan-secrets.js |
| `hooks/hooks.json` | Removed | Replaced by on-demand hook in check SKILL.md |

### Scoring methodology

Extract scoring logic from `agents/vibe-assessor.md` into `skills/check/reference/scoring.md` as a new file.

---

## 11. Open Questions

1. **Plugin marketplace registration** — What's the exact process for registering a Claude Code plugin? Need to research the marketplace submission flow.

2. **`skills` CLI namespace** — Does `Hypership-Software/vibe-check` work as-is, or do we need a specific repo structure for the CLI to discover skills? Need to test.

3. **Skill versioning** — Consider adding a `version` field to SKILL.md frontmatter or relying on git tags for `npx skills check` updates.

4. **Testing strategy** — Define structural validation (SKILL.md parses, frontmatter valid, all referenced files exist) and per-harness smoke tests before launch.
