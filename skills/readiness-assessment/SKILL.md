---
description: "Production readiness assessment methodology for web applications. Use when evaluating whether an app is ready to launch, interpreting vibe-check results, planning what to address before deployment, or when a user asks if their app is production-ready."
---

# Production Readiness Assessment

You're helping someone figure out if their app is ready to ship. They can build things — often impressive things — but they've never shipped to production at scale. They don't know what they don't know, and they're worried about getting overwhelmed.

Your job: tell them what actually matters for their stage, in plain language, with specific actions.

## What "Production Ready" Actually Means

Production ready doesn't mean perfect. It means:

- **Your users' data is safe.** Secrets aren't in the code, passwords are hashed, backups exist.
- **You'll know when something breaks.** Error tracking, basic monitoring, health checks.
- **People can find you.** Meta tags, OpenGraph images, sitemap — so sharing your link doesn't look broken.
- **You won't get sued.** Privacy policy and terms of service exist if you're collecting data.
- **Your app handles failure gracefully.** Errors don't crash the whole thing, database connections recover, payments don't silently fail.

It does NOT mean:
- Kubernetes, microservices, or complex infrastructure
- 100% test coverage
- Perfect CI/CD pipelines
- Enterprise-grade observability
- SOC 2 compliance (unless you actually need it)

## The 6 Core Domains

Production readiness breaks down into 6 domains (plus a conditional 7th for AI apps). Each catches a different category of "things that bite you after launch."

### Security (25 points)

The stuff that keeps you off the front page of Hacker News.

- **Secrets management** — Are API keys in environment variables, not hardcoded in source files?
- **Authentication** — Using an established library? Passwords hashed? Routes protected?
- **Input validation** — Parameterized queries? Validation on user input? No raw SQL with string interpolation?
- **Dependency security** — Lock file committed? No critical CVEs in your dependencies?
- **HTTPS** — Not hardcoding http:// URLs? Secure cookie flags set?
- **Rate limiting** — Auth endpoints protected from brute force?

Quick self-check: "If my source code leaked tomorrow, could an attacker access my database, my users' data, or my payment processor?"

### Discoverability (20 points)

The difference between your shared link looking professional and looking broken.

- **Meta tags** — Real title and description, not "React App"
- **OpenGraph tags** — og:title, og:description, og:image so links look good when shared
- **Twitter Cards** — Twitter-specific meta tags (or OG fallback)
- **Sitemap** — sitemap.xml so search engines can find your pages
- **robots.txt** — Not accidentally blocking your entire site from crawlers
- **Semantic HTML** — Proper heading hierarchy, single h1 per page

Quick self-check: "If someone shares my link on Slack or Twitter, does it show a title, description, and image — or a blank card?"

### Analytics (15 points)

Can you see what's happening with your users?

- **Visitor tracking** — GA, Plausible, PostHog, Vercel Analytics — anything that tells you who's visiting
- **Error tracking** — Sentry, Bugsnag, or similar — so you know when things break before your users tell you
- **Conversion tracking** — Custom events for key actions (signups, purchases, core feature usage)

Quick self-check: "If my app crashed right now, how would I find out?"

### Platform (15 points)

Right-sized infrastructure for your stage.

- **Hosting compatibility** — Does your stack match your deployment platform?
- **Complexity check** — Are you over-engineering? K8s for a landing page is a red flag.
- **Cost signals** — Unlimited file uploads without size limits? No pagination on database queries? These become expensive fast.
- **Managed services** — Where could SaaS simplify your stack? (Informational, not a failure.)

Quick self-check: "Am I using infrastructure that matches the complexity of my app, or did I cargo-cult a setup from a company with 100 engineers?"

### Reliability (15 points)

What happens when things go wrong (and they will).

- **Backups** — If your database disappears, can you recover? Verify this in your hosting dashboard.
- **Error handling** — Consistent try/catch, error boundaries, no swallowed errors
- **Database connections** — Connection pooling, error recovery, graceful shutdown
- **Health checks** — A /health endpoint that verifies your app and its dependencies are running

Quick self-check: "If my database goes down for 5 minutes, does my app crash, hang, or gracefully show an error page?"

### Legal (10 points)

Minimum viable compliance. Not optional if you're collecting user data.

- **Privacy policy** — Required if you collect any user data. Period.
- **Terms of service** — Required if users create accounts, generate content, or make payments.
- **Cookie consent** — Required for EU-targeted sites with non-essential cookies.
- **User data deletion** — Users need a way to delete their data (GDPR).

Quick self-check: "If a user asked me to delete all their data, could I do it?"

### AI Security (20 points — conditional)

Only applies if your app uses AI/LLM features. Covers prompt injection prevention, function calling safety, WebSocket origin validation, plugin security, and context isolation between users.

## Scoring Bands

Your overall score maps to one of three bands:

| Score | Band | What It Means |
|-------|------|---------------|
| 70-100 | Ready | Production-ready with minor improvements. Ship it, then iterate. |
| 40-69 | Needs Work | Significant gaps to address. Prioritize critical and high items before launch. |
| 0-39 | Not Ready | Critical gaps that must be addressed. Don't launch until the blockers are resolved. |

**N/A items are excluded from scoring.** If your app doesn't have a database, backup-related items don't count against you. The effective maximum adjusts to what's actually applicable to your project.

**The critical gate:** If any Critical-priority item is a Fail, your band is capped at "Needs Work" regardless of your numeric score. Fix the critical items first — everything else is secondary.

## How to Prioritize Fixes

Not everything matters equally. Here's the order:

### 1. Critical Priority — Fix Before Launch

These are actual emergencies. If any of these are failing, stop and fix them now.

- Secrets hardcoded in source code (especially if the repo is public)
- No authentication on admin endpoints
- SQL injection vulnerabilities
- No backups and database is the only copy of your data

### 2. High Priority — Fix This Week

Serious gaps that increase your risk significantly.

- No error tracking (you won't know when things break)
- No rate limiting on auth endpoints
- Missing input validation on user-facing endpoints
- Passwords stored without hashing

### 3. Medium Priority — Fix Before Growth

Important for a professional launch, but won't cause a disaster if you ship without them.

- Missing meta tags and OpenGraph images
- No analytics (you're flying blind on usage)
- No health check endpoint
- Missing privacy policy or terms of service

### 4. Low Priority — Nice to Have

Good practices that can wait until you have traction.

- Twitter Card meta tags (OG tags cover most cases)
- Conversion tracking
- Infrastructure as code
- Cookie consent (unless EU-targeted)

## Stage-Appropriate Expectations

What "ready" looks like depends on where you are.

### MVP / Just Shipping

Focus on: Security basics (secrets, auth, input validation), backups, one error tracking tool, basic meta tags.

Skip for now: Analytics events, perfect SEO, health checks, rate limiting (unless custom auth).

The bar: "My users' data is safe, I'll know if it breaks, and shared links don't look broken."

### Growing / First Real Users

Add: Error tracking, visitor analytics, full OpenGraph tags, privacy policy, terms of service, health checks.

The bar: "I'm running a real product and I can see what's happening with it."

### Scaling / Serious Product

Add: Conversion tracking, rate limiting, database connection hardening, cookie consent, user data deletion, cost optimization.

The bar: "I'm operating a business and my infrastructure reflects that."

## Using Vibe-Check Results

If you've run `/vibe-check:check`, here's how to read the output:

- **Summary** (summary.md) — Top-line score, band, top risks, and quick wins. Start here.
- **Report** (report.md) — Domain-by-domain breakdown with every item's status.
- **Checklist** (checklist/ folder) — Individual files for each failing or unknown item, with specific fix instructions.
- **Quick wins** — Items marked as agent-doable that you can fix immediately with `/vibe-check:fix`.

The most efficient path: fix quick wins first (they're agent-doable and high-impact), then work through critical and high priority items, then medium items before launch.
