# Vibe Check v2.0: Skills-First Rearchitecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rearchitect vibe-check from Claude Code-specific commands/agents into universal SKILL.md skill folders, with a build system for 9-harness distribution and updated website.

**Architecture:** Canonical skill source in `skills/` at repo root. Each skill is a folder with SKILL.md + reference/agent/template subdirectories. A build script generates per-harness variants into `dist/universal/`. The existing `packages/cli` becomes a v2.0 migration-only tool.

**Tech Stack:** Node.js (build script), Markdown/YAML (skills), Next.js (website), Turborepo (orchestration)

**Spec:** `docs/specs/2026-03-21-skills-first-rearchitecture-design.md`

---

## File Structure

### New files to create

```
skills/
├── check/
│   ├── SKILL.md
│   ├── agents/mapper.md
│   ├── agents/assessor.md
│   ├── agents/fixer.md
│   ├── reference/domains.md
│   ├── reference/scoring.md
│   ├── reference/agent-classification.md
│   ├── scripts/scan-secrets.js
│   ├── scripts/secret-patterns.json
│   ├── templates/summary.md
│   ├── templates/report.md
│   ├── templates/checklist-item.md
│   ├── templates/checklist-index.md
│   ├── templates/action-plan.md
│   └── templates/vibe-check-readme.md
├── fix/
│   ├── SKILL.md
│   └── reference/agent-classification.md
├── idea/
│   ├── SKILL.md
│   └── reference/idea-validation.md
├── plan/
│   ├── SKILL.md
│   ├── reference/project-planning.md
│   └── templates/project-plan.md
├── refresh/
│   ├── SKILL.md
│   └── agents/
│       ├── mapper.md               # Copy from check/agents/mapper.md
│       └── assessor.md             # Copy from check/agents/assessor.md
├── discuss/
│   └── SKILL.md
├── map-codebase/
│   ├── SKILL.md
│   └── agents/mapper.md
├── help/
│   └── SKILL.md
└── shared/                          # Source-only, inlined at build time
    ├── persona.md
    ├── voice.md
    ├── ui-brand.md
    └── scripts/
        ├── scan-secrets.js
        └── secret-patterns.json

packages/build/
├── generate-universal.js
├── harness-config.json
└── package.json

apps/web/app/download/
└── page.tsx
```

### Files to modify

```
packages/cli/bin/install.js          # v2.0: migration + hooks only
packages/cli/package.json            # Bump to 2.0.0, update files array
apps/web/app/page.tsx                # Add logo bar, install section, cheatsheet
apps/web/app/layout.tsx              # Update meta if needed
turbo.json                           # Add build:universal task
package.json                         # Root workspace: add packages/build
.gitignore                           # Add dist/
```

### Files to delete (after migration)

```
packages/cli/commands/               # Entire directory (replaced by skills/)
packages/cli/agents/                 # Entire directory (moved into skills/)
packages/cli/references/             # Entire directory (moved into skills/)
packages/cli/templates/              # Entire directory (moved into skills/)
packages/cli/skills/                 # Entire directory (merged into skills/)
packages/cli/scripts/                # Entire directory (moved to shared/)
packages/cli/hooks/                  # Entire directory (replaced by on-demand hook)
```

---

## Shared Content Inlining Contract

Skills reference shared resources (persona, voice, ui-brand) that must be self-contained after installation. The canonical SKILL.md files use HTML comment markers that the build script replaces with file content:

```markdown
<!-- inline:shared/persona.md -->
<!-- inline:shared/voice.md -->
<!-- inline:shared/ui-brand.md -->
```

**Authoring convention:** Place these markers in the SKILL.md where the shared content should appear (typically at the end, in a `## Context` section). The build script reads the referenced file from `skills/shared/` and replaces the marker with the file content.

**Skills that need shared content inlined:**
- `check/SKILL.md` — persona, voice, ui-brand (all three)
- `fix/SKILL.md` — persona, voice, ui-brand
- `idea/SKILL.md` — persona, voice
- `plan/SKILL.md` — persona, voice
- `refresh/SKILL.md` — persona, voice, ui-brand
- `discuss/SKILL.md` — voice
- `map-codebase/SKILL.md` — none
- `help/SKILL.md` — none

**Secret scanner scripts:** Copy `scan-secrets.js` and `secret-patterns.json` directly into `skills/check/scripts/` (NOT in shared/) so they ship with the check skill. The on-demand hook references them at `scripts/scan-secrets.js` relative to the skill directory.

## Cross-Skill Reference Policy

Skills must NOT reference files in other skills via `../check/reference/domains.md`. Instead:
- **Duplicate** small files (e.g., `agent-classification.md` at 178 lines appears in both check and fix)
- **For refresh skill:** Include its own copy of `agents/mapper.md` and reference the check skill's `reference/` files only by instructing the AI to "read the check skill's reference files if available, otherwise use the domain criteria below" with a condensed inline version

## Parallelization Notes

- Tasks 1-2: Sequential (scaffolding first, then shared resources)
- Tasks 3-7: Partially parallel. Task 3 (check) must complete first since Tasks 4 and 7 copy files from it. Tasks 5 (idea) and 6 (plan) can run in parallel with Task 3.
- Task 8 (build system): Independent of Tasks 3-7, can start in parallel
- Tasks 9-10 (CLI update, cleanup): Sequential, after Tasks 3-7 complete
- Tasks 11-12 (website): Independent, can run in parallel with Tasks 8-10
- Tasks 13-15 (testing): After all other tasks complete

---

## Task 1: Create skill directory scaffolding

**Files:**
- Create: `skills/` directory tree (empty SKILL.md stubs)

- [ ] **Step 1: Create all skill directories**

```bash
mkdir -p skills/check/agents skills/check/reference skills/check/templates
mkdir -p skills/fix/reference
mkdir -p skills/idea/reference
mkdir -p skills/plan/reference skills/plan/templates
mkdir -p skills/refresh
mkdir -p skills/discuss
mkdir -p skills/map-codebase/agents
mkdir -p skills/help
mkdir -p skills/shared/scripts
```

- [ ] **Step 2: Commit scaffolding**

```bash
# Create a .gitkeep in each leaf directory so git tracks them
find skills -type d -empty -exec touch {}/.gitkeep \;
git add skills/
git commit -m "chore: scaffold skills directory structure for v2.0"
```

---

## Task 2: Migrate shared resources

Move cross-cutting reference files into `skills/shared/`. These are source-only files that the build script will inline into each skill.

**Files:**
- Create: `skills/shared/persona.md` (from `packages/cli/references/persona.md`)
- Create: `skills/shared/voice.md` (from `packages/cli/references/voice.md`)
- Create: `skills/shared/ui-brand.md` (from `packages/cli/references/ui-brand.md`)
- Create: `skills/shared/scripts/scan-secrets.js` (from `packages/cli/scripts/scan-secrets.js`)
- Create: `skills/shared/scripts/secret-patterns.json` (from `packages/cli/scripts/secret-patterns.json`)

- [ ] **Step 1: Copy persona.md**

Copy `packages/cli/references/persona.md` (84 lines) to `skills/shared/persona.md`. Content is unchanged — this is a reference doc with no path references to rewrite.

- [ ] **Step 2: Copy voice.md**

Copy `packages/cli/references/voice.md` (150 lines) to `skills/shared/voice.md`. No path references to rewrite.

- [ ] **Step 3: Copy ui-brand.md**

Copy `packages/cli/references/ui-brand.md` (406 lines) to `skills/shared/ui-brand.md`. No path references to rewrite.

- [ ] **Step 4: Copy scripts**

Copy `packages/cli/scripts/scan-secrets.js` (129 lines) and `packages/cli/scripts/secret-patterns.json` (258 lines) to `skills/shared/scripts/`. The scan-secrets.js references `./secret-patterns.json` — this relative path still works since both files move together.

- [ ] **Step 5: Commit**

```bash
git add skills/shared/
git commit -m "chore: migrate shared resources to skills/shared/"
```

---

## Task 3: Create check skill

The largest and most complex skill. Converts `commands/check.md` (577 lines) into a SKILL.md orchestrator with progressive disclosure to agents, references, and templates.

**Files:**
- Create: `skills/check/SKILL.md`
- Create: `skills/check/agents/mapper.md` (from `packages/cli/agents/vibe-mapper.md`, 705 lines)
- Create: `skills/check/agents/assessor.md` (from `packages/cli/agents/vibe-assessor.md`, 565 lines)
- Create: `skills/check/agents/fixer.md` (from `packages/cli/agents/vibe-fixer.md`, 285 lines — read-only reference for check)
- Create: `skills/check/reference/domains.md` (from `packages/cli/references/domains.md`, 1008 lines)
- Create: `skills/check/reference/agent-classification.md` (from `packages/cli/references/agent-classification.md`, 178 lines)
- Create: `skills/check/reference/scoring.md` (NEW — extracted from vibe-assessor.md scoring logic)
- Create: `skills/check/scripts/scan-secrets.js` (from `packages/cli/scripts/scan-secrets.js`, 129 lines)
- Create: `skills/check/scripts/secret-patterns.json` (from `packages/cli/scripts/secret-patterns.json`, 258 lines)
- Create: `skills/check/templates/summary.md` (from `packages/cli/templates/summary.md`, 133 lines)
- Create: `skills/check/templates/report.md` (from `packages/cli/templates/report.md`, 283 lines)
- Create: `skills/check/templates/checklist-item.md` (from `packages/cli/templates/checklist-item.md`, 84 lines)
- Create: `skills/check/templates/checklist-index.md` (from `packages/cli/templates/checklist-index.md`, 184 lines)
- Create: `skills/check/templates/action-plan.md` (from `packages/cli/templates/action-plan.md`, 150 lines)
- Create: `skills/check/templates/vibe-check-readme.md` (from `packages/cli/templates/vibe-check-readme.md`, 114 lines)

### Step-by-step

- [ ] **Step 1: Write check SKILL.md**

Convert `packages/cli/commands/check.md` (577 lines) to SKILL.md format. Use this skeleton as the target structure (~300-350 lines for the SKILL.md itself, with progressive disclosure to reference files):

```markdown
---
name: check
description: Run full production readiness assessment. Use when the user wants to evaluate if their app is ready for real users — checks security, SEO, analytics, reliability, legal, and platform concerns.
user-invocable: true
args:
  - name: focus
    description: Optional domain to focus on (security, discoverability, analytics, platform, reliability, legal)
    required: false
hooks:
  PreToolUse:
    - matcher: "Write|Edit"
      hooks:
        - type: command
          command: "node \"${SKILL_DIR}/scripts/scan-secrets.js\""
          timeout: 10
---

# Vibe Check

Run a complete production readiness assessment. Results go to `.vibe-check/`.

## Reference Files

Read these as needed — not all at once upfront:

- `reference/domains.md` — criteria for what "good" looks like in each domain
- `reference/scoring.md` — score calculation, bands, critical gate rule
- `reference/agent-classification.md` — how to classify items as agent-fixable
- `agents/mapper.md` — spawn instructions for codebase mapper
- `agents/assessor.md` — spawn instructions for domain assessors
- `templates/` — output templates (summary, report, checklist-item, action-plan, etc.)

## Architecture

You are the orchestrator. Delegate heavy work to agents. Stay under 30% context.

[Phases 1-7 from commands/check.md, with these path rewrites:]
- references/persona.md → (inlined, see Context section below)
- references/voice.md → (inlined, see Context section below)
- references/domains.md → reference/domains.md
- references/agent-classification.md → reference/agent-classification.md
- references/ui-brand.md → (inlined, see Context section below)
- templates/summary.md → templates/summary.md
- templates/report.md → templates/report.md
- (etc. for all template references)

## Phase 1: Setup
[From commands/check.md Phase 1 — create .vibe-check/ directory]

## Phase 2: User Context
[From commands/check.md Phase 2 — 4 context questions]

## Phase 3: Codebase Mapping

If your environment supports spawning subagents (Claude Code Agent tool,
or equivalent), read `agents/mapper.md` and dispatch a mapper agent to
analyze the codebase. It writes 13 analysis files to `.vibe-check/analysis/`.

Otherwise, perform the analysis yourself by working through `reference/domains.md`
for each applicable domain, writing findings to `.vibe-check/analysis/`.

## Phase 4: Domain Assessment

If your environment supports spawning subagents, read `agents/assessor.md`
and dispatch one assessor per domain (up to 7, can be parallel).

Otherwise, evaluate each domain yourself using `reference/domains.md` criteria.
Write checklist items to `.vibe-check/checklist/` using `templates/checklist-item.md`.

[Include: conditional domain skipping based on mapper capabilities]
[Include: N/A detection rules]

## Phase 5: Aggregate & Write
[From commands/check.md Phase 5 — scoring, file generation]
Read `reference/scoring.md` for calculation methodology.
Use templates from `templates/` for output files.

## Phase 6: Terminal Output
[From commands/check.md Phase 6 — visual display]

## Phase 7: Post-Assessment
[From commands/check.md Phase 7 — offer discussion]

## Gotchas

- Do NOT read every file in the repo. Use `.vibe-check/analysis/` files.
- Do NOT hallucinate file paths or line numbers. Every finding must reference real code.
- Stay under 30% context. Delegate to agents, don't absorb their work.
- N/A items are not written as checklist files — only in return summaries.
- Critical-priority Fail items cap band at "Needs Work" regardless of score.
- When spawning assessors, pass them the user context from Phase 2.
- The mapper returns a confirmation message, not analysis content. Read the files it wrote.

## Context

<!-- inline:shared/persona.md -->
<!-- inline:shared/voice.md -->
<!-- inline:shared/ui-brand.md -->
```

Source content for each phase comes from `packages/cli/commands/check.md`. The key transformation is:
- Frontmatter: command format → skill format
- Path references: all rewritten per the mapping above
- Agent spawning: wrapped in graceful degradation blocks
- Shared content: replaced with `<!-- inline:... -->` markers
- Progressive disclosure: reference files listed at top, read on demand

- [ ] **Step 2: Copy agent files**

Copy the three agent files with path adjustments:

- `packages/cli/agents/vibe-mapper.md` → `skills/check/agents/mapper.md`
  - Remove references to `references/` paths (these are now in the parent skill's reference/ dir)
  - The mapper agent is self-contained (reads codebase, writes to `.vibe-check/analysis/`)
  - Path references in the mapper are mostly to `.vibe-check/analysis/` output — these don't change

- `packages/cli/agents/vibe-assessor.md` → `skills/check/agents/assessor.md`
  - Replace `references/persona.md` → content will be provided by the orchestrator's context
  - Replace `references/voice.md` → same
  - Replace `references/domains.md` → orchestrator provides domain context
  - Replace `references/agent-classification.md` → orchestrator provides classification context
  - The assessor reads from `.vibe-check/analysis/` and writes to `.vibe-check/checklist/` — these paths don't change

- `packages/cli/agents/vibe-fixer.md` → `skills/check/agents/fixer.md`
  - Included as read-only reference for the check skill (fixer is primarily used by the fix skill)
  - Minimal path changes needed — fixer reads from `.vibe-check/checklist/` and writes to the codebase

- [ ] **Step 3: Copy reference files**

- `packages/cli/references/domains.md` (1008 lines) → `skills/check/reference/domains.md`
  - Merge in relevant content from `packages/cli/skills/readiness-assessment/SKILL.md` (scoring methodology, domain point values)
  - Merge in relevant content from `packages/cli/skills/security-patterns/SKILL.md`, `web-discoverability/SKILL.md`, `reliability-patterns/SKILL.md` (domain-specific patterns)
  - This becomes the single comprehensive reference for domain evaluation

- `packages/cli/references/agent-classification.md` (178 lines) → `skills/check/reference/agent-classification.md`
  - No content changes needed

- [ ] **Step 4: Extract scoring.md**

Create `skills/check/reference/scoring.md` by extracting scoring logic from:
- `packages/cli/agents/vibe-assessor.md` (scoring contribution section, deduction guide)
- `packages/cli/commands/check.md` (score bands, critical gate, N/A adjusted scoring)
- `packages/cli/skills/readiness-assessment/SKILL.md` (domain max points)

Content should include:
- Domain max points table: Security=25, Discoverability=20, Analytics=15, Platform=15, Reliability=15, Legal=10, AI Security=20 (conditional)
- Score bands: 0-39 (Not Ready), 40-69 (Needs Work), 70-100 (Ready)
- Critical gate rule: Any Critical-priority Fail item caps band at "Needs Work"
- N/A adjustment: adjustedEarned/adjustedMax replaces rawScore/maxPoints
- Per-item deduction guide: Critical fail -4 to -5, High fail -2 to -3, Medium fail -1 to -2, Low fail -1, Unknown -1

- [ ] **Step 5: Copy template files**

Copy all 6 templates unchanged:
- `packages/cli/templates/summary.md` → `skills/check/templates/summary.md`
- `packages/cli/templates/report.md` → `skills/check/templates/report.md`
- `packages/cli/templates/checklist-item.md` → `skills/check/templates/checklist-item.md`
- `packages/cli/templates/checklist-index.md` → `skills/check/templates/checklist-index.md`
- `packages/cli/templates/action-plan.md` → `skills/check/templates/action-plan.md`
- `packages/cli/templates/vibe-check-readme.md` → `skills/check/templates/vibe-check-readme.md`

Templates reference `.vibe-check/` output paths and internal links (e.g., `./checklist/item-NNN-slug.md`) — these don't change.

- [ ] **Step 6: Verify and commit**

```bash
# Verify all files exist
ls -la skills/check/SKILL.md
ls -la skills/check/agents/
ls -la skills/check/reference/
ls -la skills/check/templates/
git add skills/check/
git commit -m "feat: create check skill with agents, references, and templates"
```

---

## Task 4: Create fix skill (advisory)

Converts `commands/fix.md` (286 lines) to an advisory skill that presents findings and waits for user approval before applying fixes.

**Files:**
- Create: `skills/fix/SKILL.md`
- Create: `skills/fix/reference/agent-classification.md` (copy from check skill)

- [ ] **Step 1: Write fix SKILL.md**

Convert `packages/cli/commands/fix.md` to SKILL.md format:

1. Skill frontmatter:
   ```yaml
   ---
   name: fix
   description: Review vibe-check findings and apply fixes with your approval. Use when the user wants to address issues found by /check — presents findings, suggests fixes, and only applies changes after explicit confirmation.
   user-invocable: true
   args:
     - name: item
       description: Specific item to fix (e.g., item-003) or omit for all
       required: false
   ---
   ```

2. **Critical change: Make advisory.** The current fix.md auto-applies fixes in a loop. The new SKILL.md must:
   - Load and present all fixable items with proposed changes
   - Ask the user which items to fix (individually or batch)
   - Only proceed with explicit approval
   - Never auto-invoke fixes or assume consent

   Add this section prominently:
   ```markdown
   ## Important: User Approval Required

   This skill is advisory. It presents findings and proposed fixes but
   NEVER applies changes without explicit user approval.

   Flow:
   1. Load fixable items from .vibe-check/checklist/
   2. Present each item with: what's wrong, proposed fix, files affected
   3. Ask the user: "Which items would you like me to fix?"
   4. Only after approval: apply fixes one at a time with verification
   5. Report results after each fix
   ```

3. Add graceful degradation for agent spawning (fixer agents).

4. Add progressive disclosure referencing `reference/agent-classification.md`.

- [ ] **Step 2: Copy agent-classification.md**

Copy `skills/check/reference/agent-classification.md` to `skills/fix/reference/agent-classification.md`. Same content.

- [ ] **Step 3: Commit**

```bash
git add skills/fix/
git commit -m "feat: create advisory fix skill"
```

---

## Task 5: Create idea skill (enhanced with gstack mental models)

Converts `commands/idea.md` (156 lines) + `skills/idea-validation/SKILL.md` (185 lines) into a single enhanced skill.

**Files:**
- Create: `skills/idea/SKILL.md`
- Create: `skills/idea/reference/idea-validation.md`

- [ ] **Step 1: Write idea SKILL.md**

Convert `packages/cli/commands/idea.md` to SKILL.md format:

1. Skill frontmatter:
   ```yaml
   ---
   name: idea
   description: Validate your product idea with founder-level scrutiny. Use when the user has a product or startup idea they want honest, specific feedback on — covers problem validation, distribution, defensibility, and timing.
   user-invocable: true
   args:
     - name: idea
       description: Brief description of the idea (or omit to be asked)
       required: false
   ---
   ```

2. Enhance the conversation flow with gstack mental models. New phase ordering:
   - **Phase 1 (Premise Challenge — NEW):** "Is this the right problem? Could a different framing be simpler or more impactful?" Before diving into the idea.
   - **Phase 2 (Understand the Idea):** Existing open-ended question.
   - **Phase 3 (Probe Hard Questions):** Existing 5 probes, enhanced with:
     - Inversion Reflex: "What would make this fail?" alongside each probe
     - 10-Star Product thinking: "What's the version 10x more ambitious for 2x effort?"
   - **Phase 4 (Mode Selection — NEW):** Ask the user their posture:
     - EXPANSION: Dream big, what's the ambitious version?
     - HOLD: Validate as-is, focus on execution risks
     - REDUCTION: Strip to MVP essentials
   - **Phase 5 (Assessment):** Existing honest assessment, enhanced with:
     - Dream State Mapping: "Where does this idea put you in 12 months?"
     - "Boil the Lake" principle: "AI makes completeness cheap — don't plan shortcuts"
     - Delight Opportunities: "What 30-minute improvements would make users think 'they thought of that'?"
     - Reversibility × Magnitude rating on each scorecard dimension
   - **Phase 6 (Write idea-brief.md):** Existing output.
   - **Phase 7 (Next Step):** Existing handoff to /plan.

3. Keep existing persona/voice (will be inlined at build time).

4. Reference `reference/idea-validation.md` for deep methodology.

- [ ] **Step 2: Write idea-validation.md reference**

Merge and enhance `packages/cli/skills/idea-validation/SKILL.md` (185 lines):
- Keep existing 5 Questions framework, Distribution Channels, Form Factor Decision Tree, Revenue Model Patterns, Common Idea Traps
- Add section: "Mental Models for Idea Evaluation"
  - Reversibility × Magnitude (Bezos): decision categorization framework
  - Inversion Reflex (Munger): failure mode identification
  - 10-Star Product: ambitious version thinking
  - Dream State Mapping: 12-month trajectory
  - "Boil the Lake" principle: completeness via AI compression
  - Mode Selection: EXPANSION / HOLD / REDUCTION postures

- [ ] **Step 3: Commit**

```bash
git add skills/idea/
git commit -m "feat: create idea skill with enhanced gstack mental models"
```

---

## Task 6: Create plan skill

Converts `commands/plan.md` (233 lines) + `skills/project-planning/SKILL.md` (222 lines).

**Files:**
- Create: `skills/plan/SKILL.md`
- Create: `skills/plan/reference/project-planning.md`
- Create: `skills/plan/templates/project-plan.md`

- [ ] **Step 1: Write plan SKILL.md**

Convert `packages/cli/commands/plan.md` to SKILL.md format:

1. Skill frontmatter:
   ```yaml
   ---
   name: plan
   description: Plan your build with an interactive session that produces PROJECT-PLAN.md. Use when the user wants to scope and plan an app before coding — covers tech stack, data model, MVP scope, and build order.
   user-invocable: true
   ---
   ```

2. Preserve 5-phase conversation flow (Load Context → Core Questions → Tech Stack → Synthesis → Review).

3. Reference `reference/project-planning.md` for methodology.

4. Reference `templates/project-plan.md` for output structure.

- [ ] **Step 2: Write project-planning.md reference**

Copy `packages/cli/skills/project-planning/SKILL.md` (222 lines) to `skills/plan/reference/project-planning.md`. No content changes needed.

- [ ] **Step 3: Extract PROJECT-PLAN.md template**

Extract the PROJECT-PLAN.md output structure from `packages/cli/commands/plan.md` (Phase 4 synthesis section) into `skills/plan/templates/project-plan.md`. This template defines the 10-section output: Overview, Target User, Core User Flow, Tech Stack, Data Model, Pages/Screens, MVP Scope, Implementation Order, API/Integrations, Open Questions.

- [ ] **Step 4: Commit**

```bash
git add skills/plan/
git commit -m "feat: create plan skill with project planning reference"
```

---

## Task 7: Create remaining skills (refresh, discuss, map-codebase, help)

These are simpler conversions — mostly frontmatter changes and path rewrites.

**Files:**
- Create: `skills/refresh/SKILL.md` (from `commands/refresh.md`, 268 lines)
- Create: `skills/discuss/SKILL.md` (from `commands/discuss.md`, 145 lines)
- Create: `skills/map-codebase/SKILL.md` (from `commands/map-codebase.md`, 43 lines)
- Create: `skills/map-codebase/agents/mapper.md` (copy from `skills/check/agents/mapper.md`)
- Create: `skills/help/SKILL.md` (from `commands/help.md`, 122 lines)

- [ ] **Step 1: Write refresh SKILL.md**

Convert `packages/cli/commands/refresh.md`:

```yaml
---
name: refresh
description: Re-run production readiness assessment and compare against previous results. Use when the user has fixed issues and wants to see their progress — shows before/after scores and what improved.
user-invocable: true
---
```

Preserve 7-phase pipeline. Add graceful degradation for agent spawning. Per the cross-skill reference policy, include its own copies of `agents/mapper.md` and `agents/assessor.md` (duplicated from check skill). For domain reference, embed a condensed inline version of the domain criteria and instruct the AI to "read the check skill's reference/domains.md if available in a sibling directory."

Add `agents/` subdirectory to the refresh skill:
```
skills/refresh/
├── SKILL.md
└── agents/
    ├── mapper.md      # Copy from check/agents/mapper.md
    └── assessor.md    # Copy from check/agents/assessor.md
```

- [ ] **Step 2: Write discuss SKILL.md**

Convert `packages/cli/commands/discuss.md`:

```yaml
---
name: discuss
description: Ask questions about your vibe-check assessment results. Use when the user wants to understand findings, get clarification on recommendations, or discuss priorities from a previous /check run.
user-invocable: true
---
```

Minimal changes — this is a conversational skill with no agents or complex references.

- [ ] **Step 3: Write map-codebase SKILL.md**

Convert `packages/cli/commands/map-codebase.md`:

```yaml
---
name: map-codebase
description: Run standalone codebase analysis at a conceptual level. Use when the user wants to understand their project structure, stack, conventions, and architecture without running a full assessment.
user-invocable: true
---
```

Add `agents/mapper.md` (copy from check skill) and graceful degradation.

- [ ] **Step 4: Write help SKILL.md**

Convert `packages/cli/commands/help.md`:

```yaml
---
name: help
description: Show vibe-check command reference and usage guide. Use when the user asks what vibe-check commands are available or how to use them.
user-invocable: true
---
```

Update command names from `/vibe-check:command` to `/command` (universal skill invocation). Update workflow descriptions to reference skill names. Add a "Invocation by Harness" section noting that syntax varies: Claude Code uses `/skill-name`, Cursor uses `@vibe-check skill-name`, Gemini CLI may differ, etc.

- [ ] **Step 5: Commit**

```bash
git add skills/refresh/ skills/discuss/ skills/map-codebase/ skills/help/
git commit -m "feat: create refresh, discuss, map-codebase, and help skills"
```

---

## Task 8: Create build system

The build script generates per-harness skill directories from canonical source.

**Files:**
- Create: `packages/build/package.json`
- Create: `packages/build/harness-config.json`
- Create: `packages/build/generate-universal.js`
- Modify: `turbo.json` (add build:universal task)
- Modify: `package.json` (root — add packages/build to workspaces)
- Modify: `.gitignore` (add dist/)

- [ ] **Step 1: Write harness-config.json**

```json
{
  "harnesses": {
    "claude": {
      "dir": ".claude/skills",
      "frontmatter": {
        "keepUserInvocable": true,
        "keepArgs": true
      }
    },
    "cursor": {
      "dir": ".cursor/skills",
      "frontmatter": {
        "keepUserInvocable": false,
        "keepArgs": false
      }
    },
    "codex": {
      "dir": ".codex/skills",
      "frontmatter": {
        "keepUserInvocable": false,
        "keepArgs": false,
        "convertArgsToHint": true
      }
    },
    "gemini": {
      "dir": ".gemini/skills",
      "frontmatter": {
        "keepUserInvocable": false,
        "keepArgs": false
      }
    },
    "agents": {
      "dir": ".agents/skills",
      "frontmatter": {
        "keepUserInvocable": false,
        "keepArgs": false
      },
      "displayNames": ["VS Code Copilot", "Antigravity"]
    },
    "kiro": {
      "dir": ".kiro/skills",
      "frontmatter": {
        "keepUserInvocable": false,
        "keepArgs": false
      }
    },
    "opencode": {
      "dir": ".opencode/skills",
      "frontmatter": {
        "keepUserInvocable": false,
        "keepArgs": false
      }
    },
    "pi": {
      "dir": ".pi/skills",
      "frontmatter": {
        "keepUserInvocable": false,
        "keepArgs": false
      }
    }
  }
}
```

- [ ] **Step 2: Write generate-universal.js**

Node.js script that:
1. Reads `harness-config.json`
2. For each harness config:
   - Copies all skill folders from `skills/` to `dist/universal/<dir>/vibe-check/`
   - Skips `skills/shared/` (source-only)
   - Transforms SKILL.md frontmatter per harness rules:
     - Strip `user-invocable` and `args` when `keepUserInvocable: false`
     - Convert `args` to `argument-hint` string when `convertArgsToHint: true`
   - Inlines shared content: reads `skills/shared/persona.md`, `voice.md`, `ui-brand.md` and appends to each SKILL.md that references them (or embeds as a `## Context` section)
3. Generates `dist/universal/README.txt`
4. Optionally zips to `dist/vibe-check-universal.zip`

Key implementation details:
- Parse YAML frontmatter with a simple regex (split on `---` markers)
- For `convertArgsToHint`: take `args[0].name` → `[NAME=<value>]` format
- For shared content inlining: scan SKILL.md for `<!-- inline:shared/persona.md -->` markers and replace with file content. This keeps the canonical source clean while the build output is self-contained.

- [ ] **Step 3: Write packages/build/package.json**

```json
{
  "name": "@vibe-check/build",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "node generate-universal.js",
    "build:zip": "node generate-universal.js --zip"
  }
}
```

- [ ] **Step 4: Update turbo.json**

Add `build:universal` pipeline task:
```json
{
  "build:universal": {
    "dependsOn": [],
    "outputs": ["dist/**"]
  }
}
```

- [ ] **Step 5: Update root package.json workspaces**

Ensure `packages/build` is in the workspaces array.

- [ ] **Step 6: Add dist/ to .gitignore**

```
dist/
```

- [ ] **Step 7: Test build**

```bash
cd packages/build
node generate-universal.js
ls dist/universal/
# Verify: .claude/skills/vibe-check/check/SKILL.md exists
# Verify: .cursor/skills/vibe-check/check/SKILL.md exists (no user-invocable)
# Verify: .codex/skills/vibe-check/check/SKILL.md exists (has argument-hint)
# Verify: shared/ not present in output
# Verify: README.txt exists
```

- [ ] **Step 8: Commit**

```bash
git add packages/build/ turbo.json package.json .gitignore
git commit -m "feat: add build system for universal skill distribution"
```

---

## Task 9: Update CLI installer to v2.0

The existing `npx vibe-check-cc` becomes a migration helper + optional hooks installer.

**Files:**
- Modify: `packages/cli/bin/install.js`
- Modify: `packages/cli/package.json`

- [ ] **Step 1: Rewrite install.js**

The v2.0 installer does three things:

1. **Detect and clean up old install:**
   - Check for `commands/vibe-check/` directory → offer to remove
   - Check for `vibe-check/` directory (references, templates, etc.) → offer to remove
   - Check for `agents/vibe-mapper.md`, `vibe-assessor.md`, `vibe-fixer.md` → offer to remove
   - Remove old hook from `settings.json` (scan-secrets.js)

2. **Print migration guidance:**
   ```
   Vibe Check v2.0 has moved to the universal skills format!

   Install skills:  npx skills add Hypership-Software/vibe-check
   Update skills:   npx skills update

   Works with: Claude Code, Cursor, Gemini CLI, Codex CLI,
               VS Code Copilot, Kiro, OpenCode, and more.
   ```

3. **Keep `--global`/`--local`/`--uninstall` flags** for cleanup operations.

- [ ] **Step 2: Update package.json**

```json
{
  "version": "2.0.0",
  "description": "Migration helper for Vibe Check v2.0 — installs via npx skills add Hypership-Software/vibe-check",
  "files": [
    "bin/",
    "README.md"
  ]
}
```

Remove commands, agents, references, templates, skills from `files` array — these no longer ship via npm.

- [ ] **Step 3: Commit**

```bash
git add packages/cli/
git commit -m "feat: update CLI to v2.0 migration helper"
```

---

## Task 10: Clean up old file structure

Remove the old `packages/cli` content directories that have been migrated to `skills/`.

**Files:**
- Delete: `packages/cli/commands/` (8 files)
- Delete: `packages/cli/agents/` (3 files)
- Delete: `packages/cli/references/` (5 files)
- Delete: `packages/cli/templates/` (6 files)
- Delete: `packages/cli/skills/` (6 directories)
- Delete: `packages/cli/scripts/` (2 files)
- Delete: `packages/cli/hooks/` (1 file)

- [ ] **Step 1: Verify all content has been migrated**

Before deleting, verify each source file has a corresponding destination in `skills/`:
```bash
# Check that every file in packages/cli/commands/ has a SKILL.md equivalent
for cmd in check fix idea plan refresh discuss map-codebase help; do
  test -f "skills/$cmd/SKILL.md" && echo "✓ $cmd" || echo "✗ $cmd MISSING"
done
```

- [ ] **Step 2: Delete old directories**

```bash
rm -rf packages/cli/commands/
rm -rf packages/cli/agents/
rm -rf packages/cli/references/
rm -rf packages/cli/templates/
rm -rf packages/cli/skills/
rm -rf packages/cli/scripts/
rm -rf packages/cli/hooks/
```

- [ ] **Step 3: Commit**

```bash
git add -A packages/cli/
git commit -m "chore: remove old command/agent structure (migrated to skills/)"
```

---

## Task 11: Update website — logo bar and install section

Add the "Works on" logo bar and 3-method install section to the homepage.

**Files:**
- Modify: `apps/web/app/page.tsx`
- Create: `apps/web/components/harness-logos.tsx` (logo bar component)
- Create: `apps/web/components/install-section.tsx` (tabbed install instructions)
- Create: `apps/web/public/logos/` (harness logo SVGs/PNGs)

- [ ] **Step 1: Create harness logo assets**

Add SVG or PNG logos for each harness to `apps/web/public/logos/`:
- claude-code.svg, cursor.svg, gemini.svg, codex.svg, vscode-copilot.svg, kiro.svg, opencode.svg, antigravity.svg, pi.svg

Use grayscale versions with color-on-hover CSS treatment.

- [ ] **Step 2: Create harness-logos component**

Build a horizontal logo bar component:
- Displays all 9 harness logos in a row
- Grayscale by default, colorize on hover (CSS filter)
- Responsive: wraps on mobile
- Accessible: alt text for each logo

- [ ] **Step 3: Create install-section component**

Build a tabbed install section with 3 methods:
- Tab 1 "CLI": `npx skills add Hypership-Software/vibe-check` with copy button
- Tab 2 "Claude Code": `/plugin marketplace add Hypership-Software/vibe-check` with copy button
- Tab 3 "Download": Link to `/download` page + brief instructions

- [ ] **Step 4: Integrate into homepage**

Modify `apps/web/app/page.tsx`:
- Add `<HarnessLogos />` below the hero section
- Add `<InstallSection />` before FAQ section
- Add commands cheatsheet grid (8 skills with descriptions)
- **Preserve all existing sections** (hero, guides, features encyclopedia, interactive checker, FAQ, SEO/JSON-LD). These are additive changes only — do not remove or replace existing content.
- Add a note below the cheatsheet: "Skill invocation syntax varies by harness. Claude Code uses `/skill-name`, Cursor uses `@vibe-check skill-name`, etc."

- [ ] **Step 5: Verify and commit**

```bash
cd apps/web && npm run build
git add apps/web/
git commit -m "feat(web): add harness logo bar and install section to homepage"
```

---

## Task 12: Create download page

A dedicated page for the universal ZIP download with per-harness instructions.

**Files:**
- Create: `apps/web/app/download/page.tsx`

- [ ] **Step 1: Write download page**

Create `apps/web/app/download/page.tsx`:
- Hero: "Download Vibe Check"
- Download button for universal ZIP (link to GitHub Release asset)
- Per-harness instructions accordion:
  - Claude Code: copy `.claude/skills/vibe-check/` to project root
  - Cursor: copy `.cursor/skills/vibe-check/` to project root
  - etc.
- "Or install via CLI" section linking back to homepage install instructions
- SEO meta tags

- [ ] **Step 2: Add to sitemap**

Ensure `/download` is included in `apps/web/app/sitemap.ts`.

- [ ] **Step 3: Verify and commit**

```bash
cd apps/web && npm run build
git add apps/web/
git commit -m "feat(web): add universal download page"
```

---

## Task 13: Test npx skills add compatibility

Verify the `skills` CLI can discover and install our skills from the repo.

**Files:**
- No file changes — testing only

- [ ] **Step 1: Test local install**

```bash
# From a test directory
mkdir /tmp/test-project && cd /tmp/test-project
mkdir .claude  # Simulate having Claude Code
npx skills add ../path/to/vibe-check --copy
ls .claude/skills/vibe-check/
# Verify: check/, fix/, idea/, plan/, refresh/, discuss/, map-codebase/, help/ present
# Verify: shared/ NOT present
# Verify: SKILL.md in each folder has correct frontmatter
```

- [ ] **Step 2: Test with --list flag**

```bash
npx skills add Hypership-Software/vibe-check --list
# Should show all 8 skills available
```

- [ ] **Step 3: Test auto-detection**

```bash
# Create multiple harness dirs
mkdir /tmp/test-multi && cd /tmp/test-multi
mkdir .claude .cursor .gemini
npx skills add ../path/to/vibe-check --copy --all
ls .claude/skills/vibe-check/
ls .cursor/skills/vibe-check/
ls .gemini/skills/vibe-check/
```

- [ ] **Step 4: Document any issues**

If the `skills` CLI requires specific repo structure (e.g., skills must be at root, specific naming), document the requirements and adjust our structure.

---

## Task 14: GitHub Release and CI setup

Configure automated builds and releases.

**Files:**
- Create: `.github/workflows/release.yml` (or modify existing)
- Modify: `turbo.json` (if not already done)

- [ ] **Step 1: Create release workflow**

GitHub Actions workflow that on tag push (e.g., `v2.0.0`):
1. Runs `npm run build` in `packages/build` to generate `dist/universal/`
2. Zips `dist/universal/` into `vibe-check-universal.zip`
3. Creates GitHub Release with the ZIP as an asset
4. Publishes `packages/cli` to npm (v2.0.0)

- [ ] **Step 2: Test locally**

```bash
cd packages/build && node generate-universal.js --zip
# Verify dist/vibe-check-universal.zip exists
# Unzip and verify structure matches impeccable-style-universal pattern
```

- [ ] **Step 3: Commit**

```bash
git add .github/
git commit -m "ci: add release workflow for universal ZIP distribution"
```

---

## Task 15: Final verification

End-to-end testing of all distribution channels.

- [ ] **Step 1: Test skill format**

For each of the 8 skills, verify:
- SKILL.md parses (valid YAML frontmatter)
- All referenced files exist (agents/, reference/, templates/)
- No broken relative paths
- Graceful degradation blocks present where needed

- [ ] **Step 2: Test build output**

```bash
cd packages/build && node generate-universal.js
# For each of 8 harnesses:
# - SKILL.md frontmatter matches harness config
# - shared content inlined (no references to shared/)
# - All subdirectories present
```

- [ ] **Step 3: Test npx vibe-check-cc v2.0**

```bash
# Simulate old install, then run migration
npx vibe-check-cc --global
# Should detect no old install, print migration guidance
```

- [ ] **Step 4: Test website**

```bash
cd apps/web && npm run build && npm run start
# Verify: homepage shows logo bar
# Verify: install section has 3 tabs
# Verify: /download page loads
# Verify: commands cheatsheet is accurate
```

- [ ] **Step 5: Final commit and tag**

```bash
git tag v2.0.0
git push origin main --tags
```
