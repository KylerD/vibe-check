---
description: Discuss your vibe-check report and get clarification on findings
disable-model-invocation: false
---

# Discuss Vibe Check Report

<objective>
Have an interactive conversation about an existing vibe-check assessment. Answer questions, clarify findings, dive deeper into specific items, and help the user understand their report.
</objective>

## Prerequisites

This command requires an existing `.vibe-check/` directory. If not found, suggest running `/vibe-check:check` first.

## Process

### Phase 1: Load Context

Read the existing assessment files to understand the current state:

```
.vibe-check/
├── summary.md          # Quick overview
├── report.md           # Full report with scores
├── metadata.json       # Structured data
└── checklist/
    ├── index.md        # All items
    └── item-*.md       # Individual findings
```

Load these files to have full context for the discussion:
- `metadata.json` — Score, categories, item list
- `summary.md` — Top risks and quick wins
- `checklist/index.md` — Overview of all items

### Phase 2: Understand the Question

The user may ask about:

**Specific items:**
- "Tell me more about the secrets management issue"
- "Why is authentication marked as failing?"
- "What exactly is wrong with my error handling?"

**Priorities:**
- "What should I fix first?"
- "Which items are most critical?"
- "What's the quickest win?"

**Implementation:**
- "How do I fix the backup issue?"
- "Can you help me implement rate limiting?"
- "Show me an example of proper error handling"

**Clarification:**
- "What does 'agent-doable' mean?"
- "Why is this marked as Unknown instead of Fail?"
- "What's the difference between Critical and High priority?"

**General:**
- "Summarize my biggest risks"
- "How close am I to production ready?"
- "What would get me to 70/100?"

### Phase 3: Respond Helpfully

**For item-specific questions:**
1. Read the relevant `checklist/item-*.md` file
2. Explain the finding in plain language
3. Offer to help fix it if agent-doable

**For priority questions:**
1. Reference `metadata.json` for scores
2. Explain the priority reasoning
3. Suggest a practical order of attack

**For implementation questions:**
1. Read the item's "How to Fix" section
2. Offer concrete next steps
3. If agent-doable, offer to implement it

**For clarification questions:**
1. Explain the concept clearly
2. Reference how it applies to their specific report
3. Point to relevant items as examples

## Conversation Style

Follow `references/voice.md` for tone:
- Direct and practical
- No unnecessary hedging
- Concrete over abstract
- Respect the user's time

## When User Wants to Fix Something

If the user asks to fix an item:

1. Read the full item file
2. Check if it's agent-doable
3. If yes: Offer to implement it now
4. If partial: Explain what you can do vs. what they need to do
5. If no: Walk them through the manual steps

Example:
```
User: "Fix the secrets management issue"

You: [Read item-001-secrets-management.md]

"I can help with this. The issue is hardcoded API keys in src/config.ts.

I'll:
1. Move the values to environment variables
2. Update the code to read from process.env
3. Add the keys to .env.example (without values)

You'll need to:
- Add the actual values to your .env.local
- Set these in your deployment platform

Want me to proceed?"
```

## Handling Missing Reports

If `.vibe-check/` doesn't exist:

```
No vibe-check report found in this project.

Run /vibe-check:check first to generate an assessment, then come back here to discuss it.
```

## Handling Stale Reports

If the report is old (check `analysisDate` in metadata.json):

```
Note: This report is from {date}. Your codebase may have changed since then.

I can still discuss the findings, but consider running /vibe-check:refresh for an updated assessment.
```
