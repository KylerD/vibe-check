<domains>

What "good" looks like for each assessment domain.

**Critical distinction:** Some things are observable from code. Others require human verification. Be honest about what you can and can't assess.

**Focus:** Technical + discoverability. Code-checkable items only, skip subjective marketing assessment.

</domains>

<observability_guide>

## What the Agent Can See

**Fully observable from code:**
- Secrets hardcoded vs environment variables
- Auth library usage and implementation patterns
- Error handling patterns (try/catch, error boundaries)
- Dependency versions and lock files
- SQL query patterns (parameterized vs interpolated)
- HTML meta tags and OpenGraph tags
- Analytics SDK installation
- Legal page routes and files
- Sitemap and robots.txt presence
- Framework and hosting config files

**Partially observable:**
- Monitoring setup (can see Sentry SDK, can't verify dashboard config)
- Analytics configuration (can see SDK, can't verify tracking setup)
- Platform compatibility (can see stack, can't verify deployment config)
- Backup configuration (only visible if in IaC)

**Not observable from code:**
- Database backup settings (configured in hosting dashboard)
- Uptime monitoring (external service)
- DNS/SSL configuration
- Hosting platform settings
- Whether environment variables are actually set in production
- Cookie consent implementation details (often third-party widget)
- User deletion capability (may be admin dashboard feature)

## How to Handle Non-Observable Items

For items that can't be verified from code:

1. **Status = Unknown** (not Pass, not Fail)
2. **Create a checklist item** that tells user what to verify
3. **Explain where to check** (which dashboard, what setting)
4. **Mark as human-required** (not agent-doable)

Don't pretend to assess things you can't see.

</observability_guide>

<domain name="security">

**Observability:** Fully observable from code

## Secrets Management

**What you're looking for:**
- No secrets in code (API keys, database passwords, tokens)
- Secrets loaded from environment variables
- `.env` files excluded from git

**Pass if:**
- All secrets come from `process.env` / `os.environ` / similar
- `.gitignore` includes `.env` and similar files
- No hardcoded keys in source files

**Fail if:**
- Secrets hardcoded in source files
- `.env` files committed to git history
- Secrets visible in client-side code

**Common patterns that are problems:**
```javascript
// Bad - hardcoded
const stripe = new Stripe('sk_live_abc123');

// Bad - in client-side code
const FIREBASE_KEY = 'AIzaSy...';  // in a React component
```

**What good looks like:**
```javascript
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
```

## Authentication

**Observability:** Mostly observable from code

**What you CAN see:**
- Auth library used (NextAuth, Passport, Clerk, etc.)
- Password hashing approach
- Session/token implementation
- Route protection patterns

**What you CANNOT see:**
- OAuth app configuration in external dashboards
- Whether auth provider is configured correctly

**Pass if:**
- Using established auth library (NextAuth, Auth0, Supabase Auth, Clerk, Passport)
- Passwords hashed with bcrypt/argon2/scrypt
- Protected routes have middleware/guards

**Fail if:**
- Passwords stored in plaintext
- No authentication on routes that clearly need it
- Hand-rolled JWT with obvious flaws (no expiry, weak secret)
- Direct password comparison without hashing

**Watch for:**
```javascript
// Bad - plaintext password
await db.user.create({ password: req.body.password });

// Bad - no auth check on admin route
app.get('/admin', (req, res) => { /* returns admin panel */ });

// Bad - comparing passwords directly
if (user.password === req.body.password) { ... }

// Bad - weak JWT secret
jwt.sign(payload, 'secret123');
```

## Input Validation

**Observability:** Mostly observable from code

**What you CAN see:**
- ORM usage (Prisma, Drizzle = parameterized queries)
- Raw SQL patterns
- Input validation libraries (zod, yup, joi)

**Pass if:**
- Using ORM with parameterized queries
- Input validation on API endpoints
- No raw SQL with string interpolation

**Fail if:**
- Raw SQL with user input interpolated
- User input directly rendered as HTML (XSS)
- No validation on endpoints accepting user data

**Watch for:**
```javascript
// Bad - SQL injection
db.query(`SELECT * FROM users WHERE id = ${req.params.id}`);

// Bad - XSS
element.innerHTML = userInput;

// Bad - command injection
exec(`convert ${filename} output.pdf`);
```

## Dependency Security

**Observability:** Fully observable from code

**What you CAN see:**
- Lock file existence
- Dependency versions
- Vulnerability audit results

**Pass if:**
- Lock file exists and committed
- No critical vulnerabilities in `npm audit` / equivalent

**Fail if:**
- No lock file
- Critical security vulnerabilities
- Wildcard versions everywhere (`*`)

**Right-sizing:**
- Some outdated dependencies are fine
- Focus on high/critical CVEs, not "update available"

## HTTPS

**Observability:** Partially observable

**Almost always Pass** with modern platforms.

**Only fail if:**
- Hardcoded `http://` URLs for API calls
- Auth cookies explicitly set without secure flag

</domain>

<domain name="discoverability">

**Observability:** Fully observable (HTML inspection)

Code-checkable SEO and social sharing readiness.

## Meta Tags

**What you're looking for:**
- `<title>` tag present and meaningful
- `<meta name="description">` present

**Pass if:**
- Title tag exists with actual content (not just "React App" or framework default)
- Meta description exists and describes the site

**Fail if:**
- No title tag or default framework title
- No meta description

**What good looks like:**
```html
<title>MyApp - Project Management Made Simple</title>
<meta name="description" content="MyApp helps teams track projects and collaborate in real-time." />
```

## OpenGraph Tags

**What you're looking for:**
- `og:title` - Title for social sharing
- `og:description` - Description for social sharing
- `og:image` - Preview image for social sharing

**Pass if:**
- All three core OG tags present
- og:image points to an actual image

**Fail if:**
- No OpenGraph tags at all
- Missing og:image (links look bad when shared)

**What good looks like:**
```html
<meta property="og:title" content="MyApp - Project Management Made Simple" />
<meta property="og:description" content="Track projects and collaborate in real-time." />
<meta property="og:image" content="https://myapp.com/og-image.png" />
```

## Twitter Cards

**What you're looking for:**
- `twitter:card` - Card type (summary, summary_large_image)
- `twitter:title` - Title for Twitter
- `twitter:description` - Description for Twitter

**Pass if:**
- Twitter card tags present
- Card type specified

**Unknown if:**
- No Twitter tags but OG tags present (Twitter falls back to OG)

**Fail if:**
- No OG tags and no Twitter tags

## Sitemap

**What you're looking for:**
- `sitemap.xml` file exists at root
- Contains valid XML with page URLs

**Pass if:**
- sitemap.xml exists
- Auto-generated by framework (Next.js, Astro, etc.)

**Unknown if:**
- Dynamic site where sitemap would be generated at runtime

**Fail if:**
- Static site with no sitemap

## robots.txt

**What you're looking for:**
- `robots.txt` file exists
- Not blocking important pages

**Pass if:**
- robots.txt exists and allows crawling of main content
- Properly blocks admin/API routes if needed

**Fail if:**
- robots.txt blocks entire site (`Disallow: /`)
- No robots.txt at all

## Canonical URLs

**What you're looking for:**
- `<link rel="canonical">` tags to avoid duplicate content

**Pass if:**
- Canonical URLs present on pages
- Framework handles this automatically

**Unknown if:**
- Can't determine canonical URL strategy from code

## Semantic HTML

**What you're looking for:**
- Proper heading hierarchy (h1 → h2 → h3)
- Only one h1 per page
- Meaningful structure

**Pass if:**
- Single h1 per page pattern
- Heading hierarchy follows logical order

**Fail if:**
- Multiple h1 tags per page
- Skipped heading levels (h1 → h4)

</domain>

<domain name="analytics">

**Observability:** Mostly observable (SDK detection)

Can they see what's happening with their users?

## Visitor Tracking

**What you're looking for:**
- Analytics SDK installed (GA, Plausible, PostHog, Vercel Analytics, etc.)
- SDK initialized in code

**Pass if:**
- Analytics library in dependencies AND initialized in code

**Unknown if:**
- No analytics visible in code (might use server-side or external)

**Fail if:**
- No analytics setup visible anywhere

**Common analytics libraries:**
```javascript
// Google Analytics
import { GoogleAnalytics } from '@next/third-parties/google'
gtag('config', 'GA_MEASUREMENT_ID')

// Plausible
<script data-domain="myapp.com" src="https://plausible.io/js/script.js" />

// PostHog
import posthog from 'posthog-js'
posthog.init('phc_...')

// Vercel Analytics
import { Analytics } from '@vercel/analytics/react'
```

## Error Tracking

**What you're looking for:**
- Error tracking SDK installed (Sentry, Bugsnag, Rollbar, LogRocket)
- SDK initialized with proper configuration

**Pass if:**
- Error tracking SDK installed AND initialized in code
- Captures both client and server errors (for full-stack apps)

**Unknown if:**
- No error tracking SDK visible

**Fail if:**
- Errors caught and silently swallowed (empty catch blocks)
- No error tracking and no logging setup

**What good looks like:**
```javascript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

## Conversion Tracking

**What you're looking for:**
- Event tracking for key user actions (signup, purchase, etc.)
- Custom events in analytics code

**Pass if:**
- Evidence of custom event tracking in code

**Unknown if:**
- Can't determine if conversion events are configured

**Fail if:**
- Analytics installed but no custom events visible

**What good looks like:**
```javascript
// Track signup
analytics.track('user_signed_up', { plan: 'free' });

// Track purchase
gtag('event', 'purchase', { value: 99.00 });
```

</domain>

<domain name="platform">

**Observability:** Partial (config files)

Right tool for the job. Informational, not prescriptive.

## Hosting Compatibility

**What you're looking for:**
- Stack matches platform capabilities
- Config files indicate target platform

**Assessment approach:**
Identify the stack and list compatible platforms without recommending one.

**Output format:**
"You're using {framework}. Compatible platforms: {list}."

**Examples:**
- Next.js → Vercel, Netlify, Railway, AWS Amplify, Render
- Express/Node → Railway, Render, Fly.io, Heroku, AWS
- Static site → Vercel, Netlify, Cloudflare Pages, GitHub Pages
- Django/Flask → Railway, Render, Fly.io, Heroku, AWS

**Don't recommend. List options.**

## Complexity Check

**What you're looking for:**
- Over-engineering signals
- Right-sized infrastructure

**Flags to raise:**
- K8s manifests for a simple landing page
- Multiple microservices for a single-purpose app
- Complex IaC for a static site

**Pass if:**
- Infrastructure complexity matches app complexity

**Unknown if:**
- Can't determine deployment target from code

**Fail if:**
- Clear over-engineering visible (K8s for static site)

## Cost Signals

**What you're looking for:**
- Patterns that could lead to unexpected costs

**Warning signs:**
- Large file uploads without size limits
- No image optimization
- Serverless functions with long timeouts
- Database queries without pagination
- No caching strategy for expensive operations

**Pass if:**
- No obvious cost trap patterns

**Unknown if:**
- Can't determine cost implications

**Fail if:**
- Clear cost trap patterns (unlimited file uploads, no pagination)

## Managed Services

**What you're looking for:**
- Opportunities to simplify with SaaS

**Informational notes (not failures):**
- Hand-rolled auth → "Consider: Auth0, Clerk, Supabase Auth"
- Custom email sending → "Consider: Resend, SendGrid, Postmark"
- Self-managed database → "Consider: PlanetScale, Supabase, Neon"
- Custom file storage → "Consider: Uploadthing, Cloudinary, S3"

**Don't fail for not using managed services. Just note options.**

</domain>

<domain name="reliability">

**Observability:** Partial (backups need user verification)

Core reliability items only.

## Backups

**Observability:** NOT observable from code (usually)

**What you CAN see:**
- Database type being used (Postgres, MongoDB, etc.)
- Backup scripts in the repo (rare)
- IaC that configures backups (Terraform, Pulumi)

**What you CANNOT see:**
- Whether managed database has backups enabled
- Backup retention settings
- Whether backups actually work

**Pass if:**
- Explicit backup configuration in IaC
- Backup scripts in repo with clear scheduling

**Unknown if:** (most common case)
- Using managed database with no backup config visible in code
- Create checklist item asking user to verify their database dashboard

**Fail if:**
- Self-hosted database with no backup scripts
- SQLite file as production database with no backup strategy

**Checklist item for Unknown should explain:**
- Which dashboard to check (database provider)
- What setting to look for (automated backups)
- What's acceptable (daily backups, 7+ day retention)

## Error Handling

**Observability:** Mostly observable from code

**What you CAN see:**
- Try/catch usage patterns
- Error boundaries (React)
- Global error handlers
- Empty catch blocks

**Pass if:**
- Consistent error handling patterns
- Error boundaries for UI
- No swallowed errors

**Fail if:**
- Empty catch blocks
- Unhandled promise rejections
- No error boundaries in React apps

**Watch for:**
```javascript
// Bad - swallowed error
try {
  await riskyOperation();
} catch (e) {
  // nothing
}

// Bad - unhandled rejection
fetchData().then(data => process(data));
// no .catch()
```

## Database Connection Handling

**Observability:** Mostly observable from code

**What you CAN see:**
- Connection pooling configuration
- Connection retry logic
- Graceful shutdown handling

**Pass if:**
- Using ORM with built-in connection pooling
- Connection errors handled gracefully

**Fail if:**
- Creating new connections per request
- No connection error handling

## Health Checks

**Observability:** Observable from code

**What you CAN see:**
- Health check endpoints (/health, /healthz, /ready)
- What the health check verifies

**Pass if:**
- Health endpoint exists
- Checks database connectivity

**Unknown if:**
- Platform provides health checks automatically

**Fail if:**
- No health check endpoint
- Health check doesn't verify dependencies

</domain>

<domain name="legal">

**Observability:** Partial (file/route detection)

Minimum viable compliance.

## Privacy Policy

**What you're looking for:**
- Privacy policy page exists
- Accessible from the site

**Detection patterns:**
- Route: `/privacy`, `/privacy-policy`, `/legal/privacy`
- File: `privacy.md`, `privacy-policy.md`, `pages/privacy.tsx`
- Link in footer/navigation

**Pass if:**
- Privacy policy route or page exists

**Unknown if:**
- Can't find privacy policy but might be in CMS
- Create checklist item asking user to verify

**Fail if:**
- Site collects user data but no privacy policy visible

## Terms of Service

**What you're looking for:**
- Terms of service page exists
- Accessible from the site

**Detection patterns:**
- Route: `/terms`, `/tos`, `/terms-of-service`, `/legal/terms`
- File: `terms.md`, `tos.md`, `pages/terms.tsx`
- Link in footer/navigation

**Pass if:**
- Terms of service route or page exists

**Unknown if:**
- Can't find terms but might be in CMS

**Fail if:**
- User-generated content or payments but no terms visible

## Cookie Consent

**What you're looking for:**
- Cookie consent mechanism (if EU-targeted)
- Consent before non-essential cookies

**Detection patterns:**
- Cookie consent library in dependencies
- Cookie banner component

**Pass if:**
- Cookie consent mechanism visible in code
- Or: No non-essential cookies used

**Unknown if:**
- Can't determine cookie usage or target audience
- Create checklist item for EU-targeted sites

**Fail if:**
- Analytics/tracking cookies set without consent mechanism (EU-targeted)

## User Data Deletion

**What you're looking for:**
- Ability to delete user accounts/data (GDPR requirement)

**Detection patterns:**
- Delete account endpoint or function
- User deletion in admin panel

**Pass if:**
- User deletion capability visible in code

**Unknown if:**
- Can't determine deletion capability
- Create checklist item asking user to verify

**Fail if:**
- User accounts exist but no deletion capability visible

</domain>

<domain name="ai-security">

**Observability:** Mostly observable from code
**Conditional:** Only assess if AI/LLM patterns detected in codebase

This domain evaluates security considerations specific to AI-powered applications. It only appears in assessments for projects that use AI/LLM capabilities.

**Detection triggers (any of these activates this domain):**
- AI SDK packages in dependencies (openai, anthropic, @ai-sdk/*, @langchain/*, replicate, cohere, etc.)
- System prompt patterns in code
- Function calling / tool use patterns
- WebSocket connections with auth patterns (common in AI agent architectures)

## Prompt Injection Prevention

**Observability:** Mostly observable from code

**What you're looking for:**
- User input sanitization before sending to LLM
- System prompt isolation (not concatenated with user input)
- Context boundary enforcement between system and user content
- Input filtering for known injection patterns

**Pass if:**
- Clear separation between system prompts and user input
- User input passed as dedicated user messages (not interpolated into system prompt)
- Input validation or sanitization before LLM calls

**Fail if:**
- User input directly interpolated into system prompts
- No sanitization of user input before LLM calls
- System prompt exposed or modifiable by user input

**Watch for:**
```javascript
// Bad - user input in system prompt
const systemPrompt = `You are a helpful assistant. User context: ${userInput}`;

// Bad - no separation
const prompt = systemPrompt + userMessage;

// Good - proper separation
messages: [
  { role: 'system', content: SYSTEM_PROMPT },
  { role: 'user', content: sanitize(userInput) }
]
```

## Function Calling Safety

**Observability:** Mostly observable from code

**What you're looking for:**
- Explicit whitelist of allowed functions/tools
- Parameter validation before function execution
- Audit logging of function calls
- Dangerous functions excluded or heavily restricted

**Pass if:**
- Functions/tools explicitly defined and limited
- Parameters validated before execution
- No unrestricted shell/eval access from AI
- Audit trail for function invocations

**Fail if:**
- Dynamic function execution without validation
- Unrestricted shell access (exec, spawn) callable by AI
- No parameter validation on tool calls
- File system operations without path restrictions

**Watch for:**
```javascript
// Bad - unrestricted execution
tools: [{ name: 'run_command', execute: (cmd) => exec(cmd) }]

// Bad - no parameter validation
tools: [{ name: 'read_file', execute: (path) => fs.readFileSync(path) }]

// Good - restricted and validated
tools: [{
  name: 'read_file',
  execute: (path) => {
    if (!isAllowedPath(path)) throw new Error('Access denied');
    return fs.readFileSync(path, 'utf8');
  }
}]
```

## WebSocket/API Origin Validation

**Observability:** Mostly observable from code

**What you're looking for:**
- Origin header validation on WebSocket upgrade
- CORS properly configured for API endpoints
- No auto-connect from URL parameters (prevents SSRF-like attacks)
- Rate limiting on WebSocket connections

**Pass if:**
- WebSocket upgrade validates origin
- CORS configured with explicit allowed origins (not *)
- Connection parameters don't come from untrusted sources

**Fail if:**
- No origin validation on WebSocket connections
- CORS allows all origins (Access-Control-Allow-Origin: *)
- Gateway URL or connection params taken from user input

**Watch for:**
```javascript
// Bad - no origin check
wss.on('connection', (ws, req) => { /* accepts all */ });

// Bad - URL from query params
const gatewayUrl = new URL(req.query.gateway);
new WebSocket(gatewayUrl);

// Good - origin validation
wss.on('connection', (ws, req) => {
  if (!ALLOWED_ORIGINS.includes(req.headers.origin)) {
    ws.close(4001, 'Invalid origin');
    return;
  }
});
```

## Plugin/Skill Ecosystem Security

**Observability:** Mostly observable from code

**What you're looking for:**
- Plugin sandboxing mechanisms
- Permission model for extensions
- Supply chain verification for plugins
- Code execution boundaries

**Pass if:**
- Plugins run in isolated context (VM, sandbox, separate process)
- Explicit permission grants required
- Plugin sources verified or restricted

**Unknown if:**
- Plugin system exists but sandboxing approach unclear

**Fail if:**
- Plugins execute with full application privileges
- No isolation between plugins and core
- Dynamic require/import from user-controlled paths

**Watch for:**
```javascript
// Bad - dynamic require
const skill = require(userProvidedPath);

// Bad - eval
eval(pluginCode);

// Good - sandboxed execution
const sandbox = new vm.createContext({ allowedAPIs });
vm.runInContext(pluginCode, sandbox);
```

## Context Isolation

**Observability:** Mostly observable from code

**What you're looking for:**
- User data not leaked in system prompts to other users
- Conversation history properly bounded
- Token limits to prevent data exfiltration
- Multi-tenant isolation

**Pass if:**
- Each user/session has isolated context
- Conversation history cleared between sessions or bounded
- Token limits enforced
- No cross-user data leakage patterns

**Fail if:**
- Shared conversation history across users
- Unbounded context accumulation
- User A's data could appear in User B's responses

**Watch for:**
```javascript
// Bad - shared context
const globalContext = [];
function chat(msg) {
  globalContext.push(msg);
  return llm.complete({ messages: globalContext });
}

// Good - isolated context
function chat(sessionId, msg) {
  const context = getSessionContext(sessionId);
  context.push(msg);
  if (context.length > MAX_HISTORY) context.shift();
  return llm.complete({ messages: context });
}
```

</domain>

<domain name="security-enhancements">

**Note:** These items enhance the existing Security domain when detected.

## CVE Cross-Reference

**Observability:** Observable via GitHub Advisory API

Beyond npm audit, cross-reference dependencies against the GitHub Advisory Database for known vulnerabilities.

**Detection approach:**
```bash
# Extract package names and query GitHub Advisory Database
for pkg in $(jq -r '.dependencies,.devDependencies | keys[]' package.json); do
  gh api graphql -f query='
    query($pkg: String!) {
      securityVulnerabilities(first: 5, ecosystem: NPM, package: $pkg) {
        nodes {
          advisory { ghsaId severity summary }
          vulnerableVersionRange
          firstPatchedVersion { identifier }
        }
      }
    }
  ' -f pkg="$pkg" 2>/dev/null
done
```

**Pass if:**
- No GHSA advisories with severity HIGH or CRITICAL
- Or all HIGH/CRITICAL have patches available and applied

**Fail if:**
- Unpatched HIGH/CRITICAL vulnerabilities
- Dependencies with known RCE or auth bypass CVEs

**Unknown if:**
- GitHub API unavailable (offline mode)
- Unable to determine vulnerable version ranges

## Rate Limiting

**Observability:** Observable from code

**What you're looking for:**
- Rate limit middleware on auth endpoints
- Throttling on API routes
- IP-based or token-based limiting

**Pass if:**
- Rate limiting detected on auth endpoints
- Or: Using managed service with built-in protection (Auth0, Clerk, etc.)

**Unknown if:**
- Rate limiting might be handled at infrastructure layer (CDN, API gateway)

**Fail if:**
- Custom auth without any rate limiting
- No throttling on sensitive endpoints (login, password reset, API keys)

**Watch for:**
```javascript
// Good - rate limiting
app.use('/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Good - using managed auth (built-in protection)
import { clerkMiddleware } from '@clerk/nextjs';

// Bad - custom auth with no rate limiting
app.post('/login', async (req, res) => {
  // no throttling before password check
});
```

</domain>

<quick_reference>

## Observability by Domain

| Domain | Observable from Code | When Unknown |
|--------|---------------------|--------------|
| Security | ✅ Fully | — |
| Discoverability | ✅ Fully (HTML inspection) | — |
| Analytics | ✅ Mostly (SDK detection) | Ask about external analytics |
| Platform | ⚠️ Partial (config files) | Ask about hosting platform |
| Reliability | ⚠️ Partial (backups need verification) | Ask user to verify dashboard |
| Legal | ⚠️ Partial (file/route detection) | Ask about legal pages |
| AI Security | ✅ Mostly (conditional) | Only if AI patterns detected |

**When you can't verify something, mark Unknown and create a helpful checklist item that explains exactly what to check and where.**

## What's Demoted to "Nice to Have"

These items are good practices but not required for MVP launch:

- Rate limiting (unless custom auth)
- Runbooks and incident response processes
- Capacity planning
- Full observability stack

## When IaC Actually Matters

Infrastructure as Code is **only a hard requirement** when:
- Your customer requires deployment into **their** cloud infrastructure (enterprise B2B)
- You need to provision resources in a customer's AWS/GCP/Azure account

For modern deployment platforms (Vercel, Netlify, Railway, Render, Fly.io):
- **No config file required** — platforms work with sensible defaults
- Optional config files (vercel.json, netlify.toml, etc.) are for customization, not infrastructure
- **Don't flag missing IaC** — it's not applicable

**Bottom line:** Only mention IaC if the project has clear enterprise/customer-deployment requirements.

</quick_reference>
