---
description: Run full production readiness assessment and export to .vibe-check/
disable-model-invocation: false
---

# Vibe Check

<objective>
Run a complete production readiness assessment and write all results to the `.vibe-check/` directory. This is the primary command for evaluating a project's production readiness.
</objective>

<architecture>

**You are the orchestrator.** You delegate heavy work to specialized agents and stay lean.

```
/vibe-check:check (orchestrator)
    │
    ├── Phase 1: Setup
    │   └── Create .vibe-check/ directory
    │
    ├── Phase 2: User Input
    │   └── Ask 4 context questions (what, who, data, stakes)
    │
    ├── Phase 3: Codebase Mapping
    │   └── Spawn: vibe-mapper agent
    │       └── Writes: .vibe-check/analysis/*.md
    │       └── Returns: confirmation only
    │
    ├── Phase 4: Domain Assessment
    │   └── Spawn: vibe-assessor agents (can be parallel)
    │       ├── security assessor
    │       ├── reliability assessor
    │       ├── observability assessor
    │       ├── deployability assessor
    │       └── operations assessor
    │       └── Each writes: .vibe-check/checklist/item-*.md
    │       └── Each returns: score summary only
    │
    ├── Phase 5: Aggregate & Write
    │   └── You write: summary.md, report.md, action-plan.md, index.md, metadata.json, README.md
    │
    └── Phase 6: Terminal Output
        └── Show score and next steps
```

**Why this architecture:**

- Mapper explores entire codebase (heavy context) — writes to files, returns nothing
- Assessors evaluate domains (heavy judgment) — write items, return scores
- Orchestrator stays under 30% context — can write final files clearly

</architecture>

## References

Before running, internalize these:

- `references/persona.md` — Who you're talking to
- `references/voice.md` — How to communicate
- `references/domains.md` — What "good" looks like
- `references/agent-classification.md` — Agent-doable criteria

Pass references to agents so they maintain consistent voice.

## Process

### Phase 1: Setup

Create output directory:

```bash
mkdir -p .vibe-check/checklist
```

### Phase 2: User Input

Ask only what you need. Use AskUserQuestion with concrete options. Questions should be answerable by someone who can't read code.

**Question 1: What is this?**

```
header: "Project"
question: "In a sentence, what does this thing do?"
options:
- "Let me describe it" (free text)
```

This is an open question. Let them describe it in their own words. You'll use this to contextualize findings.

**Question 2: Who's it for?**

```
header: "Users"
question: "Who will use this?"
options:
- "Just me / internal tool"
- "Specific people I know (clients, team)"
- "Anyone on the internet"
- "Let me explain"
```

This determines exposure level:
- Just me → relax on legal, auth can be simpler
- Specific people → moderate security, some legal
- Public → strict on everything

**Question 3: What data are you handling?**

```
header: "Data"
question: "What are users giving you?"
options:
- "Nothing sensitive (content, preferences)"
- "Account info (email, password)"
- "Money (payments, billing)"
- "Personal details (health, financial, identity)"
```

This determines compliance needs without asking about compliance:
- Nothing sensitive → no special requirements
- Account info → standard security practices
- Money → PCI considerations, stricter security
- Personal details → likely GDPR/HIPAA territory, strict everything

**Question 4: What's at stake?**

```
header: "Stakes"
question: "What happens if this breaks for a day?"
options:
- "Nothing, it's a side project"
- "Annoying, but no real damage"
- "I lose money or trust"
- "Serious consequences (legal, safety)"
```

This determines how strict to be overall:
- Side project → focus on quick wins only
- Annoying → standard rigor
- Lose money/trust → thorough assessment
- Serious → enterprise-grade expectations

**Defaults:**

If user skips or seems unsure, use sensible defaults:
- Users: Assume public
- Data: Assume account info
- Stakes: Assume "lose money or trust"

Err toward caution when defaulting.

**Store context:**

Save their answers for assessors. This goes in metadata.json under `context`:

```json
{
  "context": {
    "description": "{their description}",
    "audience": "personal|known|public",
    "dataSensitivity": "none|accounts|payments|sensitive",
    "stakes": "none|low|medium|high"
  }
}
```

Pass this context to assessors so they can calibrate scoring.

### Phase 3: Codebase Mapping

Spawn the `vibe-mapper` agent:

```
Task: Map codebase for readiness assessment

Read agents/vibe-mapper.md for your instructions.
Read references/persona.md and references/voice.md for context.

Explore this codebase and write analysis files to .vibe-check/analysis/

Return confirmation only when complete.
```

Wait for confirmation. The mapper writes 12 analysis files covering stack, secrets, auth, error handling, logging, monitoring, environments, CI/CD, dependencies, integrations, infrastructure, and data.

**Do not read the analysis files.** The assessors will read them.

### Phase 4: Domain Assessment

Spawn `vibe-assessor` agents for each domain group. These can run in parallel:

**Security Assessor:**

```
Task: Assess security domain

Read agents/vibe-assessor.md for your instructions.
Your domain assignment is: security

Project context (calibrate your assessment accordingly):
- Description: {description from user}
- Audience: {personal|known|public}
- Data sensitivity: {none|accounts|payments|sensitive}
- Stakes: {none|low|medium|high}

Load these analysis files:
- .vibe-check/analysis/secrets.md
- .vibe-check/analysis/auth.md
- .vibe-check/analysis/dependencies.md

Load references:
- references/persona.md
- references/voice.md
- references/domains.md
- references/agent-classification.md

Evaluate: Secrets Management, Authentication, Input Validation, Dependency Security, Rate Limiting

Write failing/unknown items to .vibe-check/checklist/
Return score summary only.
```

**Pass context to all assessors.** They use it to calibrate:
- Personal tool with no sensitive data → relax on legal, simpler auth is fine
- Public app handling payments → strict on everything
- Side project → focus on critical issues only

**Reliability Assessor:**

```
Task: Assess reliability domain
Domain assignment: reliability
Analysis files: error-handling.md, data.md, integrations.md
Evaluate: Backups & Recovery, Error Handling, Database Reliability
```

**Observability Assessor:**

```
Task: Assess observability domain
Domain assignment: observability
Analysis files: logging.md, monitoring.md
Evaluate: Logging, Monitoring & Alerting, Health Checks
```

**Deployability Assessor:**

```
Task: Assess deployability domain
Domain assignment: deployability
Analysis files: cicd.md, environments.md, infrastructure.md
Evaluate: CI/CD, Environment Configuration, Infrastructure
```

**Operations Assessor:**

```
Task: Assess operations domain
Domain assignment: operations
Analysis files: integrations.md, data.md, stack.md
Evaluate: Incident Response, Data Privacy
```

Collect score summaries from each assessor.

### Phase 5: Aggregate & Write

You now have:

- Score contributions from each assessor
- List of checklist item files written

Calculate total score and write final files:

#### metadata.json

```json
{
  "project": "{from package.json name or directory}",
  "analysisDate": "{YYYY-MM-DD}",
  "score": {total},
  "band": "{Not Ready|Needs Work|Ready}",
  "context": {
    "description": "{what they said it does}",
    "audience": "{personal|known|public}",
    "dataSensitivity": "{none|accounts|payments|sensitive}",
    "stakes": "{none|low|medium|high}"
  },
  "categories": {
    "reliability": {"earned": N, "max": 20},
    "security": {"earned": N, "max": 20},
    "performance": {"earned": N, "max": 15},
    "observability": {"earned": N, "max": 15},
    "deployability": {"earned": N, "max": 15},
    "operations": {"earned": N, "max": 10},
    "compliance": {"earned": N, "max": 5}
  },
  "checklist": {
    "pass": N,
    "fail": N,
    "unknown": N
  },
  "items": [
    {"id": "item-001", "slug": "secrets-management", "status": "Fail", ...}
  ]
}
```

#### summary.md

Use `templates/summary.md` as reference. Include:

- Score and band
- Top 3 risks
- Quick wins (agent-doable, high-impact)
- Next steps

#### report.md

Use `templates/report.md` as reference. Include:

- Executive summary
- Score breakdown by category
- Top risks with severity
- Assessment profile (deployment, compliance)
- Checklist overview table

#### action-plan.md

Use `templates/action-plan.md` as reference. Include:

- Short-term (critical/high priority fails)
- Mid-term (medium priority)
- Long-term (low priority, nice-to-haves)

#### checklist/index.md

Use `templates/checklist-index.md` as reference. Include:

- Summary counts
- Items grouped by priority
- Items grouped by domain
- Agent-doable items list

#### README.md

Use `templates/vibe-check-readme.md` as reference.

### Phase 6: Terminal Output

Display summary:

```
Vibe Check Complete

Score: {score}/100 ({band})

Created .vibe-check/ with {N} checklist items:
  {pass} passing
  {fail} failing
  {unknown} unknown

{If agent-doable items exist:}
{N} items are agent-doable. Top priorities:
1. {title} — {one-line description}
2. {title} — {one-line description}
3. {title} — {one-line description}
```

### Phase 7: Offer Discussion

After displaying the summary, ask the user if they want to discuss the results:

```
Would you like to:
1. Discuss the findings — Ask questions, dive deeper, get clarification
2. Start fixing — Pick an item to work on
3. Done for now — Review on your own later
```

Use AskUserQuestion with these options. Based on their choice:

- **Discuss**: Load the report context and enter discussion mode (behave like `/vibe-check:discuss`)
- **Start fixing**: Ask which item they want to tackle first, then help fix it
- **Done**: End with a brief note about next steps:
  ```
  Sounds good. When you're ready:
    Review: .vibe-check/summary.md
    Discuss: /vibe-check:discuss
    Re-check: /vibe-check:refresh
  ```

## Score Bands

- **0-39:** Not Ready — Critical gaps that must be addressed
- **40-69:** Needs Work — Significant improvements needed
- **70-100:** Ready — Production-ready with minor improvements

## Orchestrator Rules

**Stay lean.** You are a coordinator, not a worker.

**Delegate exploration.** Never glob/grep/read extensively yourself. That's the mapper's job.

**Delegate evaluation.** Never assess domains yourself. That's the assessors' job.

**Write final files.** Summary, report, action-plan, index — these are your job because they aggregate agent outputs.

**Keep agents focused.** Each agent has one job. Don't ask them to do extra work.

**Trust agent outputs.** Don't second-guess or re-evaluate. Agents have the full context you delegated.
