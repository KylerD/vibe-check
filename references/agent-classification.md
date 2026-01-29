<agent_classification>

How to determine if a checklist item can be fixed by an AI coding agent, requires human action, or is a hybrid.

</agent_classification>

<the_principle>

**Agent-doable = code changes only, no external dependencies.**

If you can fix it by editing files in the repo, it's agent-doable.
If you need to sign up for something, configure an external dashboard, or make a business decision, it requires a human.

</the_principle>

<classification_criteria>

## Agent-Doable (Yes)

ALL of these must be true:
- Only requires code/config changes within the repo
- No external account signups needed
- No credentials to obtain
- No external dashboard configuration
- No business decisions required
- No access to systems the agent can't reach

**Examples:**
- Move hardcoded secrets to environment variables (code change)
- Add `.env` to `.gitignore` (config change)
- Add input validation to an endpoint (code change)
- Wrap API calls in try/catch (code change)
- Add rate limiting middleware (code change, using existing libraries)
- Fix SQL injection by using parameterized queries (code change)
- Add HTTPS redirect middleware (code change)
- Configure CORS properly (code change)

## Human-Required (No)

ANY of these means human required:
- Needs signup for external service
- Requires obtaining API keys or credentials
- Needs configuration in external dashboard
- Requires business decision (vendor selection, pricing tier)
- Needs access to systems outside the codebase
- Requires human verification (testing in production, visual review)

**Examples:**
- Set up Sentry account and get DSN
- Configure database backups in hosting dashboard
- Choose and set up auth provider
- Configure DNS records
- Set up domain and SSL certificate
- Create production database
- Set environment variables in hosting platform
- Enable monitoring in Vercel/Railway dashboard
- Set up payment processor account

## Partial (Hybrid)

Agent does the code work, human completes setup:

**Examples:**
- Error tracking: Agent adds Sentry SDK + code, human creates account and sets DSN
- Auth: Agent adds NextAuth config, human creates OAuth app and sets credentials
- Database backups: Agent adds backup script, human configures cloud storage
- Monitoring: Agent adds health endpoint, human configures uptime monitor
- Rate limiting: Agent adds middleware, human may need to configure Redis if stateful

</classification_criteria>

<how_to_write_agent_instructions>

For each checklist item, clearly separate what the agent can do from what the human must do.

**Format:**

```markdown
## Agent Instructions

**This item is [agent-doable|partially agent-doable|not agent-doable].**

An agent can:
- [ ] Task 1 (specific code change)
- [ ] Task 2 (specific code change)

**You need to:**
- [ ] Human task 1 (signup, credential, decision)
- [ ] Human task 2 (external configuration)
```

**Good example (partial):**

```markdown
## Agent Instructions

**This item is partially agent-doable.**

An agent can:
- [x] Install Sentry SDK (`npm install @sentry/nextjs`)
- [x] Add Sentry initialization to `_app.tsx`
- [x] Configure error boundary component
- [x] Create `.env.example` with `SENTRY_DSN` placeholder

**You need to:**
- [ ] Create Sentry account at sentry.io
- [ ] Create a new project for your app
- [ ] Copy the DSN to your `.env` file
- [ ] Set `SENTRY_DSN` in your hosting platform's environment variables
```

**Good example (agent-doable):**

```markdown
## Agent Instructions

**This item is agent-doable.**

An agent can:
- [x] Find all hardcoded secrets in the codebase
- [x] Create `.env.example` with placeholder values
- [x] Refactor code to use `process.env.VARIABLE_NAME`
- [x] Add `.env` to `.gitignore`
- [x] Add `.env.local` to `.gitignore`

**You need to:**
- [ ] Copy `.env.example` to `.env` and fill in real values
- [ ] Set environment variables in your hosting platform
```

**Good example (human-required):**

```markdown
## Agent Instructions

**This item is not agent-doable.**

This requires configuration in your hosting platform's dashboard.

**You need to:**
- [ ] Log into your database provider (PlanetScale, Supabase, etc.)
- [ ] Navigate to backup settings
- [ ] Enable automated daily backups
- [ ] Verify backup retention period is at least 7 days
```

</how_to_write_agent_instructions>

<edge_cases>

**Installing npm packages** — Agent-doable. The agent can add to package.json.

**Creating new files** — Agent-doable. `.env.example`, config files, etc.

**Setting environment variables** — Partial. Agent creates `.env.example`, human sets real values.

**Database migrations** — Agent-doable for schema changes. Human runs in production.

**Adding authentication** — Usually partial. Agent adds code, human creates OAuth apps.

**Configuring hosting platform** — Human-required. Agent can't access Vercel dashboard.

**"Enable X in settings"** — Human-required if settings are in external dashboard.

**Writing tests** — Agent-doable.

**Updating dependencies** — Agent-doable for code changes. Human verifies nothing broke.

</edge_cases>

<honesty>

Don't overestimate what the agent can do. It's better to mark something as partial and have the human do less than expected, than to mark it agent-doable and have them get stuck.

If you're unsure, mark it partial and clearly state what the agent can attempt vs. what might need human help.

</honesty>
