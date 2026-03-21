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

**Domain max points: 15**

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

## Security Headers

**Observability:** Observable from code

**What you're looking for:**
- HTTP security headers configured in application or deployment config
- Key headers: HSTS, X-Content-Type-Options, X-Frame-Options, CSP, Referrer-Policy, Permissions-Policy

**Pass if:**
- `helmet` package in Express apps (sets 15 security headers automatically)
- `next.config.js` `headers()` includes security headers
- `vercel.json`, `netlify.toml`, or `_headers` file configures headers
- At minimum: `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`

**Fail if:**
- No security headers configured anywhere
- No `helmet` in Express apps
- No `headers()` in Next.js config
- No header configuration in deployment platform config

**Watch for:**
```javascript
// Bad - no security headers at all
const app = express();
app.listen(3000);

// Good - helmet sets sensible defaults
const app = express();
app.use(helmet());
app.listen(3000);
```

**Why it matters:** Missing HSTS allows SSL stripping attacks. Missing CSP enables XSS. Missing X-Frame-Options enables clickjacking. These are "free wins" that prevent entire attack classes.

## CORS Configuration

**Observability:** Observable from code

**What you're looking for:**
- CORS not set to wildcard `*` (especially not with credentials)
- Explicit origin allowlist
- No dynamic origin reflection without validation

**Pass if:**
- CORS `origin` set to explicit list of allowed domains
- Or CORS not configured (same-origin only -- safe default)
- Credentials not combined with wildcard origin

**Fail if:**
- `Access-Control-Allow-Origin: *` with `credentials: true`
- `cors()` called with no options in Express (defaults to all origins)
- `req.headers.origin` reflected back without validation
- `CORS_ALLOW_ALL_ORIGINS = True` in Django

**Watch for:**
```javascript
// Bad - wildcard with credentials
app.use(cors({ origin: '*', credentials: true }));

// Bad - origin reflection (mirrors any origin)
app.use(cors({ origin: req.headers.origin, credentials: true }));

// Good - explicit allowlist
app.use(cors({ origin: ['https://myapp.com', 'https://staging.myapp.com'], credentials: true }));
```

**Why it matters:** CORS wildcard with credentials allows any website to make authenticated requests to your API. This is the starting point of ~90% of API-based attacks.

## CSRF Protection

**Observability:** Observable from code

**What you're looking for:**
- SameSite cookie attribute set (Strict or Lax)
- Anti-CSRF tokens on state-changing endpoints (if using cookie auth)
- CSRF middleware in framework

**Pass if:**
- Cookies set with `SameSite: Strict` or `SameSite: Lax`
- Or token-based auth (JWT in Authorization header -- inherently CSRF-resistant)
- Or framework CSRF middleware active (Django `CsrfViewMiddleware`)
- Or SPA with API using non-cookie auth

**Fail if:**
- Cookie-based auth without `SameSite` attribute
- `@csrf_exempt` on sensitive Django views
- `SameSite: None` without compensating CSRF tokens
- State-changing GET requests

**Watch for:**
```javascript
// Bad - no SameSite on auth cookie
res.cookie('session', token, { httpOnly: true });

// Good - SameSite set
res.cookie('session', token, { httpOnly: true, sameSite: 'lax', secure: true });
```

**Why it matters:** CSRF attacks force authenticated users to perform unintended actions. SameSite=Lax (default in modern browsers) provides baseline protection, but explicit configuration prevents older browser vulnerabilities.

## Rate Limiting

**Observability:** Observable from code

**What you're looking for:**
- Rate limiting middleware on auth endpoints
- Rate limiting on API routes
- Rate limiting on sensitive operations (password reset, signup)

**Pass if:**
- `express-rate-limit`, `rate-limiter-flexible`, `@upstash/ratelimit`, or `bottleneck` in dependencies
- Rate limiting applied to at least `/login`, `/register`, `/forgot-password`
- Or infrastructure-level rate limiting configured (Cloudflare, Vercel)
- Or: Using managed auth service with built-in protection (Auth0, Clerk, etc.)

**Unknown if:**
- Rate limiting might be handled at infrastructure layer (CDN, API gateway)

**Fail if:**
- No rate limiting library in dependencies
- No rate limiting middleware on auth/API routes
- No infrastructure-level rate limiting config

**Watch for:**
```javascript
// Bad - no rate limiting on login
app.post('/login', loginHandler);

// Good - rate limited
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });
app.post('/login', loginLimiter, loginHandler);
```

**Why it matters:** Without rate limiting, attackers can brute-force passwords (testing millions of combinations), enumerate users, and DDoS endpoints. Login without rate limiting is a critical vulnerability.

</domain>

<domain name="discoverability">

**Observability:** Fully observable (HTML inspection)

**Domain max points: 10**

Code-checkable SEO and social sharing readiness.

## Meta Tags

**What you're looking for:**
- `<title>` tag present and meaningful
- `<meta name="description">` present
- Title length 50-60 characters (not too short, not truncated in SERPs)
- Description length 150-160 characters
- Title is unique per page (not same title on every page)

**Pass if:**
- Title tag exists with actual content (not just "React App" or framework default)
- Meta description exists and describes the site
- Title contains primary keyword near beginning
- Description includes call-to-action or value proposition

**Fail if:**
- No title tag or default framework title
- No meta description
- Same title on every page (dynamic sites)
- Title under 30 characters or over 70 characters

**What good looks like:**
```html
<title>MyApp - Project Management Made Simple</title>
<meta name="description" content="MyApp helps teams track projects and collaborate in real-time. Start free and upgrade as your team grows." />
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
- `<lastmod>` dates present and reasonable
- Sitemap registered in `robots.txt` with `Sitemap:` directive

**Pass if:**
- sitemap.xml exists
- Auto-generated by framework (Next.js, Astro, etc.)
- `<lastmod>` dates present on entries
- `robots.txt` includes `Sitemap:` directive pointing to sitemap URL

**Unknown if:**
- Dynamic site where sitemap would be generated at runtime

**Fail if:**
- Static site with no sitemap
- Sitemap references dead/404 pages
- No `Sitemap:` directive in `robots.txt`

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

## Semantic HTML

**What you're looking for:**
- Proper heading hierarchy (h1 -> h2 -> h3)
- Only one h1 per page
- Meaningful structure
- `<main>` landmark present
- Structured data / JSON-LD present

**Pass if:**
- Single h1 per page pattern
- Heading hierarchy follows logical order
- `<main>` element or `role="main"` exists in layout
- JSON-LD structured data present (`Organization`, `WebSite`, `SoftwareApplication`, or `Article` schema as appropriate)

**Fail if:**
- Multiple h1 tags per page
- Skipped heading levels (h1 -> h4)
- No `<main>` landmark in layout
- No structured data on a public-facing site

**What good looks like:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "MyApp",
  "offers": { "@type": "Offer", "price": "0" }
}
</script>
```

</domain>

<domain name="analytics">

**Observability:** Mostly observable (SDK detection)

**Domain max points: 8**

Can they see what's happening with their users? Focused on user and business analytics. Error tracking has moved to the Monitoring domain.

## Visitor Tracking

**What you're looking for:**
- Analytics SDK installed (GA, Plausible, PostHog, Vercel Analytics, etc.)
- SDK initialized in code
- Tracking fires on SPA route changes (not just initial page load)
- No PII leaking in analytics events (email, name, phone in event properties)
- Privacy: consent mode implemented if EU-targeted

**Pass if:**
- Analytics library in dependencies AND initialized in code
- SPA navigation events tracked (router integration or page view calls on route change)
- No PII visible in event payloads
- Consent mode configured if analytics supports it (GA consent mode, PostHog opt-in)

**Unknown if:**
- No analytics visible in code (might use server-side or external)

**Fail if:**
- No analytics setup visible anywhere
- PII (email, name, phone) passed directly in analytics event properties
- Analytics fires before cookie consent on EU-targeted sites

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

## Conversion Tracking

**What you're looking for:**
- Event tracking for key user actions (signup, purchase, etc.)
- Custom events in analytics code
- Events use consistent naming convention (`object_action` format: `signup_completed`, `plan_upgraded`)
- Key conversion events tracked: signup, first value moment, upgrade/purchase
- UTM parameters captured on landing pages

**Pass if:**
- Evidence of custom event tracking in code
- Events follow consistent naming convention
- Key conversion events identified and tracked (signup, purchase, or equivalent)

**Unknown if:**
- Can't determine if conversion events are configured

**Fail if:**
- Analytics installed but no custom events visible
- Events use inconsistent naming (mix of camelCase, snake_case, random names)
- Over-tracking: excessive properties on every event

**What good looks like:**
```javascript
// Track signup with consistent naming
analytics.track('signup_completed', { plan: 'free' });

// Track purchase
gtag('event', 'purchase_completed', { value: 99.00 });

// Capture UTM parameters
const utmParams = new URLSearchParams(window.location.search);
analytics.track('landing_page_viewed', {
  utm_source: utmParams.get('utm_source'),
  utm_medium: utmParams.get('utm_medium'),
});
```

</domain>

<domain name="platform">

**Observability:** Partial (config files)

**Domain max points: — (informational only, unscored)**
**Scored:** No — items are advisory recommendations. They appear in reports but do not affect the numeric score or band.

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
- Next.js -> Vercel, Netlify, Railway, AWS Amplify, Render
- Express/Node -> Railway, Render, Fly.io, Heroku, AWS
- Static site -> Vercel, Netlify, Cloudflare Pages, GitHub Pages
- Django/Flask -> Railway, Render, Fly.io, Heroku, AWS

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
- Hand-rolled auth -> "Consider: Auth0, Clerk, Supabase Auth"
- Custom email sending -> "Consider: Resend, SendGrid, Postmark"
- Self-managed database -> "Consider: PlanetScale, Supabase, Neon"
- Custom file storage -> "Consider: Uploadthing, Cloudinary, S3"

**Don't fail for not using managed services. Just note options.**

</domain>

<domain name="reliability">

**Observability:** Partial (backups need user verification)

**Domain max points: 8**

Core reliability items only. Health Checks has moved to the Monitoring domain.

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

</domain>

<domain name="legal">

**Observability:** Partial (file/route detection)

**Domain max points: 5**

Minimum viable compliance.

## Privacy Policy

**What you're looking for:**
- Privacy policy page exists
- Accessible from the site
- Mentions specific data types collected
- Updated within last 12 months (check for date)
- Contact information or DPO listed
- Third-party data sharing disclosed

**Detection patterns:**
- Route: `/privacy`, `/privacy-policy`, `/legal/privacy`
- File: `privacy.md`, `privacy-policy.md`, `pages/privacy.tsx`
- Link in footer/navigation

**Pass if:**
- Privacy policy route or page exists
- Policy mentions specific data types collected (if content is inspectable)
- Contact information or data protection officer listed

**Unknown if:**
- Can't find privacy policy but might be in CMS
- Create checklist item asking user to verify
- Policy exists but content can't be assessed from code

**Fail if:**
- Site collects user data but no privacy policy visible
- Policy exists but appears to be a generic template with no project-specific data types

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
- Consent is granular (not just accept all / reject all)
- Analytics cookies don't fire before consent
- Consent preference is persisted (cookie or localStorage)

**Detection patterns:**
- Cookie consent library in dependencies
- Cookie banner component

**Pass if:**
- Cookie consent mechanism visible in code
- Consent is granular (categories: necessary, analytics, marketing)
- Analytics SDK initialization gated on consent
- Consent preference persisted in cookie or localStorage
- Or: No non-essential cookies used

**Unknown if:**
- Can't determine cookie usage or target audience
- Create checklist item for EU-targeted sites

**Fail if:**
- Analytics/tracking cookies set without consent mechanism (EU-targeted)
- Analytics fires before consent is given (pre-consent tracking)
- Accept-all-only consent (no granular choice)

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

<domain name="performance">

**Observability:** Mostly observable from code

**Domain max points: 12**

Optimization patterns detectable from code. Core Web Vitals thresholds need runtime measurement, but the patterns that cause poor performance are code-detectable.

## Image Optimization

**What you're looking for:**
- Framework image components used instead of raw `<img>` tags
- `loading="lazy"` on below-fold images
- `width` and `height` attributes set (prevents layout shift / CLS)
- Modern formats (WebP/AVIF) configured or served

**Pass if:**
- Next.js projects use `<Image>` from `next/image` (or Astro equivalent)
- Non-framework projects have `loading="lazy"` on images
- Images have explicit `width`/`height` or aspect-ratio CSS
- Image optimization pipeline exists (sharp, imagemin, CDN transform)

**Fail if:**
- Raw `<img>` tags in React/Next.js projects without `next/image`
- No `loading` attribute on any images
- No `width`/`height` on images (causes CLS)
- Large uncompressed images (`.bmp`, `.tiff`) referenced in source

**Watch for:**
```jsx
// Bad - raw img in Next.js
<img src="/hero.png" />

// Good - framework image component
import Image from 'next/image'
<Image src="/hero.png" width={1200} height={630} alt="Hero" loading="lazy" />
```

**Why it matters:** Unoptimized images are the #1 cause of poor LCP. Switching from PNG to AVIF with preloading has been shown to reduce LCP from 4.8s to 1.9s.

## Code Splitting & Lazy Loading

**What you're looking for:**
- Route-level code splitting (not all routes statically imported)
- Dynamic imports for heavy components
- Suspense boundaries for lazy-loaded content

**Pass if:**
- `React.lazy()`, `next/dynamic`, or `import()` used for route/component loading
- `<Suspense>` boundaries present
- Build config has `splitChunks` or framework handles it automatically

**Fail if:**
- All routes/pages imported statically at top level in a 10+ route app
- No `lazy()`, `dynamic()`, or dynamic `import()` anywhere in codebase
- No `<Suspense>` boundaries

**Watch for:**
```javascript
// Bad - all routes statically imported
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Admin from './pages/Admin';

// Good - dynamic imports with Suspense
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
```

**Why it matters:** Without code splitting, users download the entire application JS upfront. For apps >200KB JS, this directly impacts FCP and TTI.

## Data Fetching & Caching Strategy

**What you're looking for:**
- Client-side data caching library (React Query, SWR, Apollo)
- No raw `useEffect` + `fetch` pattern for data loading
- HTTP cache headers on API responses

**Pass if:**
- `@tanstack/react-query`, `swr`, `apollo-client`, or `urql` in dependencies
- Server components used for data fetching in Next.js App Router
- Cache headers set on API routes (`Cache-Control`, `stale-while-revalidate`)

**Fail if:**
- All data fetching uses raw `fetch()` or `axios` in `useEffect` without caching
- No caching library in dependencies
- No HTTP cache headers on any API response

**Watch for:**
```javascript
// Bad - raw useEffect fetch
useEffect(() => {
  fetch('/api/data').then(r => r.json()).then(setData);
}, []);

// Good - React Query with caching
const { data } = useQuery({ queryKey: ['data'], queryFn: fetchData });
```

**Why it matters:** Without client-side caching, every navigation re-fetches data. SWR/React Query provide instant stale data + background revalidation, dramatically improving perceived performance.

## Font Optimization

**What you're looking for:**
- `font-display: swap` or `font-display: optional` on custom fonts
- Preconnect hints for font CDNs
- Framework font optimization (`next/font`)

**Pass if:**
- `@font-face` declarations include `font-display: swap` or `font-display: optional`
- Google Fonts links include `&display=swap`
- Next.js projects use `next/font` (auto-optimizes)
- `<link rel="preconnect">` before font CDN links

**Fail if:**
- `@font-face` without any `font-display` property
- Google Fonts loaded without `display=swap`
- No preconnect hints for font CDNs
- Large font files (>100KB) without subsetting

**Watch for:**
```css
/* Bad - no font-display */
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2');
}

/* Good - font-display set */
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2');
  font-display: swap;
}
```

**Why it matters:** Font loading blocks text rendering (FOIT). Without `font-display: swap`, users see invisible text for 1-3 seconds.

## Database Query Performance

**What you're looking for:**
- No N+1 query patterns (queries inside loops)
- Pagination on list endpoints
- No `SELECT *` in raw queries
- Index definitions on commonly queried fields

**Pass if:**
- ORM used with eager loading (`include`, `select_related`, `joinedload`)
- List queries have `.limit()`/`.take()`/`LIMIT`
- Prisma schema has `@@index` on frequently queried fields
- No raw SQL with `SELECT *`

**Fail if:**
- `findMany`/`find()` called inside `for`/`forEach`/`map` loops (N+1)
- List endpoints return unbounded results (no pagination)
- Raw SQL with `SELECT *` and no column selection
- Deep ORM `include:` nesting without limits

**Watch for:**
```javascript
// Bad - N+1 query
const users = await db.user.findMany();
for (const user of users) {
  const posts = await db.post.findMany({ where: { authorId: user.id } });
}

// Good - eager loading
const users = await db.user.findMany({ include: { posts: true } });
```

**Why it matters:** N+1 queries turn a single page load into 100+ database roundtrips. Missing pagination loads entire tables into memory.

**N/A if:** No database detected

</domain>

<domain name="accessibility">

**Observability:** Mostly observable from code

**Domain max points: 12**

Accessibility patterns detectable from code. Color contrast needs computed values, but structural a11y patterns are fully code-detectable. AI-generated code almost always ignores accessibility.

## Image Alt Text

**What you're looking for:**
- All `<img>` elements have `alt` attribute
- Decorative images use `alt=""` (empty alt)
- Framework image components include `alt` prop

**Pass if:**
- All `<img>` and `<Image>` elements have `alt` attribute
- Decorative images use `alt=""` or `aria-hidden="true"` with `role="presentation"`

**Fail if:**
- `<img>` elements without `alt` attribute
- `<Image>` (Next.js) components without `alt` prop

**Watch for:**
```jsx
// Bad - no alt attribute
<img src="/logo.png" />

// Good - meaningful alt
<img src="/logo.png" alt="MyApp logo" />

// Good - decorative image
<img src="/divider.png" alt="" role="presentation" />
```

**WCAG criterion:** 1.1.1 Non-text Content (Level A)
**Why it matters:** Screen readers announce images without alt text as just "image," giving no context. This is the single most common a11y violation across the web.

## Form Label Association

**What you're looking for:**
- Every `<input>`, `<select>`, `<textarea>` has an associated label
- Labels use `htmlFor`/`for` pointing to input `id`
- Or inputs wrapped in `<label>` elements
- Or `aria-label`/`aria-labelledby` present

**Pass if:**
- All form fields have associated labels via `htmlFor`/`for`, wrapping, or ARIA
- No `placeholder` used as the sole label

**Fail if:**
- `<input>` elements without `<label>`, `aria-label`, or `aria-labelledby`
- `placeholder` is the only "label" on form fields

**Watch for:**
```jsx
// Bad - placeholder as only label
<input placeholder="Email" type="email" />

// Good - proper label association
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Good - wrapping label
<label>
  Email
  <input type="email" />
</label>
```

**WCAG criteria:** 1.3.1 Info and Relationships (Level A), 4.1.2 Name, Role, Value (Level A)
**Why it matters:** Unlabeled form fields are unusable for screen reader users and break voice navigation ("Click email field" fails).

## Keyboard Navigation & Focus Management

**What you're looking for:**
- `onClick` on non-interactive elements (`<div>`, `<span>`) has keyboard equivalents
- No `outline: none`/`outline: 0` without replacement focus styles
- No `tabIndex` values > 0 (disrupts tab order)

**Pass if:**
- Interactive divs/spans have `role="button"`, `tabIndex={0}`, and `onKeyDown`
- Focus styles are visible (`:focus-visible` or custom focus styles)
- No `tabIndex` > 0 anywhere

**Fail if:**
- `onClick` on `<div>`/`<span>`/`<li>` without keyboard handler + role + tabIndex
- `outline: none` or `outline: 0` in CSS without replacement `:focus-visible` style
- `*:focus { outline: none }` global reset without `:focus-visible` replacement

**Watch for:**
```jsx
// Bad - click handler on div without keyboard support
<div onClick={handleClick}>Click me</div>

// Good - full keyboard support
<div role="button" tabIndex={0} onClick={handleClick} onKeyDown={handleKeyDown}>
  Click me
</div>
```

```css
/* Bad - removes focus indicator */
*:focus { outline: none; }

/* Good - visible focus indicator */
*:focus-visible { outline: 2px solid #4A90D9; outline-offset: 2px; }
```

**WCAG criteria:** 2.1.1 Keyboard (Level A), 2.4.7 Focus Visible (Level AA)
**Why it matters:** Keyboard-only users cannot activate click handlers on divs. Removing focus outlines makes tab navigation invisible. ~15% of users navigate primarily by keyboard.

## ARIA & Semantic HTML

**What you're looking for:**
- Correct ARIA roles on custom widgets
- `aria-live` regions for dynamic content (toasts, notifications)
- `<main>` landmark present
- `lang` attribute on `<html>` element

**Pass if:**
- `role="button"` paired with `tabIndex` and `onKeyDown`
- Toast/notification components use `aria-live="polite"` or `role="alert"`
- `<main>` element or `role="main"` exists in layout
- `<html lang="...">` set in root document/layout

**Fail if:**
- `role="button"` without `tabIndex` and keyboard handler
- `aria-hidden="true"` on focusable elements
- No `<main>` landmark in layout
- No `lang` attribute on `<html>` element
- `aria-label` used on elements with visible text (redundant/confusing)

**Watch for:**
```jsx
// Bad - aria-hidden on focusable element
<button aria-hidden="true">Submit</button>

// Bad - no lang attribute
<html>

// Good - proper landmark and lang
<html lang="en">
  <body>
    <main>{children}</main>
  </body>
</html>
```

**WCAG criteria:** 1.3.1 (Level A), 3.1.1 (Level A), 4.1.2 (Level A)
**Why it matters:** Incorrect ARIA is worse than no ARIA -- it actively misleads assistive technology. Missing `lang` means screen readers use wrong pronunciation for the entire page.

## Motion & Animation Accessibility

**What you're looking for:**
- `prefers-reduced-motion` media query respects user OS settings
- No autoplay video without user control
- Animation library reduced-motion configuration

**Pass if:**
- `@media (prefers-reduced-motion: reduce)` blocks exist alongside animations
- Framer Motion has `reducedMotion` configuration
- Tailwind uses `motion-reduce:` variants
- Autoplay videos have controls and pause ability

**Fail if:**
- CSS animations/transitions exist with no `prefers-reduced-motion` override anywhere
- `<video autoplay>` without controls
- Infinite animations with no way to pause

**Watch for:**
```css
/* Bad - animation with no reduced-motion override */
.hero { animation: fadeIn 1s ease-in; }

/* Good - respects user preference */
.hero { animation: fadeIn 1s ease-in; }
@media (prefers-reduced-motion: reduce) {
  .hero { animation: none; }
}
```

**WCAG criterion:** 2.3.3 (Level AAA, but practically important at AA)
**Why it matters:** Motion can trigger vestibular disorders, migraines, and seizures. 35% of adults over 40 have some vestibular dysfunction.

</domain>

<domain name="testing">

**Observability:** Fully observable from code

**Domain max points: 10**

Test infrastructure and coverage detectable from code. The #1 gap in vibe-coded projects -- AI-generated code ships without tests 80%+ of the time.

## Test Runner Configured

**What you're looking for:**
- Test runner in devDependencies
- Test configuration file present
- `test` script in `package.json` that actually runs tests

**Pass if:**
- `jest`, `vitest`, `mocha`, or `ava` in devDependencies
- Corresponding config file exists (`jest.config.*`, `vitest.config.*`)
- `package.json` `scripts.test` is not `echo "Error: no test specified"` or `exit 1`
- For Python: `pytest` in requirements + `pyproject.toml` `[tool.pytest]` section

**Fail if:**
- No test runner in dependencies
- `scripts.test` is the default npm placeholder or missing
- Test config file missing

**Watch for:**
```json
// Bad - default npm stub
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
}

// Good - real test runner
"scripts": {
  "test": "vitest run"
}
```

**Why it matters:** No test runner means no tests. Period. This is the foundation of all quality assurance. Vibe-coded projects ship without this 80%+ of the time.

## Test Files Exist

**What you're looking for:**
- Actual test files in the repository
- Tests that contain real assertions (not empty stubs)
- Reasonable test-to-source ratio

**Pass if:**
- Test files found matching `**/*.{test,spec}.{ts,tsx,js,jsx}` or `**/__tests__/**`
- Test files contain actual test cases (`it(`, `test(`, `describe(`, `def test_`)
- Test-to-source file ratio is above 0.1 (10%)

**Fail if:**
- Zero test files in the repository
- Test files exist but are empty or contain only stubs
- Test-to-source ratio below 0.05 (5%) in a project with 20+ source files

**Watch for:**
```javascript
// Bad - empty test stub
describe('UserService', () => {
  it.todo('should create user');
  it.todo('should delete user');
});

// Good - real assertions
describe('UserService', () => {
  it('should create user', async () => {
    const user = await createUser({ email: 'test@example.com' });
    expect(user.id).toBeDefined();
  });
});
```

**Why it matters:** Having a test runner without tests provides a false sense of security. Even minimal tests catch regressions on critical paths.

## E2E Testing Setup

**What you're looking for:**
- End-to-end testing framework installed
- E2E test files present
- E2E tests cover critical user paths

**Pass if:**
- `cypress`, `@playwright/test`, or `puppeteer` in dependencies
- Corresponding config file exists (`cypress.config.*`, `playwright.config.*`)
- E2E test files exist in `cypress/`, `e2e/`, or `tests/` directories

**Fail if:**
- No E2E testing framework installed
- Framework installed but zero E2E test files
- No config file for the framework

**Watch for:**
```javascript
// Good - Playwright test for critical path
test('user can sign up', async ({ page }) => {
  await page.goto('/signup');
  await page.fill('[name="email"]', 'test@example.com');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

**Why it matters:** Unit tests verify pieces; E2E tests verify entire user flows work. Critical paths (signup, checkout, core feature) should have E2E coverage. Vibe-coded apps almost never have this.

## Tests Run in CI

**What you're looking for:**
- Test step in CI pipeline
- Tests gate deployment (not `continue-on-error: true`)
- Coverage reporting (bonus)

**Pass if:**
- CI config includes `npm test`, `yarn test`, `pnpm test`, `npx vitest`, or `pytest`
- Test step is required (not marked `continue-on-error: true`)
- Build/deploy steps depend on test step passing

**Fail if:**
- CI config exists but has no test step
- Test step has `continue-on-error: true`
- No CI config at all (covered by CI/CD domain, but cross-referenced here)

**Watch for:**
```yaml
# Bad - tests don't gate deployment
- run: npm test
  continue-on-error: true

# Good - tests required before deploy
- run: npm test
- run: npm run build
- run: npm run deploy
```

**Why it matters:** Tests that don't run in CI are tests that get skipped. CI enforcement prevents broken code from reaching production. Without this, the tests might as well not exist.

</domain>

<domain name="monitoring">

**Observability:** Partial (SDKs detectable, dashboard/alert config is external)

**Domain max points: 10**

Production observability. Can they see what's happening in production?

> **Migration notes:** Error Tracking moved here from Analytics domain. Health Check Endpoint moved here from Reliability domain. This consolidates all observability/monitoring concerns under one domain.

## Error Tracking

**What you're looking for:**
- Error tracking SDK installed and initialized
- Both client AND server error capture for full-stack apps
- DSN/key loaded from environment variable

**Pass if:**
- Sentry, Bugsnag, Rollbar, or LogRocket SDK in dependencies AND initialized in code
- Both `sentry.client.config.*` and `sentry.server.config.*` for full-stack apps
- DSN/configuration loaded from `process.env`, not hardcoded

**Fail if:**
- No error tracking SDK in dependencies
- SDK installed but no initialization code found
- DSN hardcoded in source code
- Errors caught and silently swallowed (empty catch blocks)

**Watch for:**
```javascript
// Good - properly initialized with env var
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

// Bad - DSN hardcoded
Sentry.init({
  dsn: "https://abc123@o456.ingest.sentry.io/789",
});
```

**Why it matters:** Without error tracking, bugs in production are invisible until users complain. Average detection time without tracking: days. With tracking: minutes.

## Structured Logging

**What you're looking for:**
- Logging library with structured output (JSON format)
- Consistent log levels (info, warn, error)
- No bare `console.log` in production server code

**Pass if:**
- `winston`, `pino`, `bunyan`, `tslog` in dependencies (JS/TS)
- `structlog`, `loguru`, `python-json-logger` in dependencies (Python)
- Logger used with levels: `logger.info(`, `logger.error(`, `logger.warn(`
- Minimal `console.log` in server-side source files

**Fail if:**
- No logging library in dependencies
- Server code exclusively uses `console.log` for all output
- No structured format (JSON) configuration

**Watch for:**
```javascript
// Bad - unstructured console.log
console.log('User signed up: ' + user.email);

// Good - structured logging
import pino from 'pino';
const logger = pino({ level: 'info' });
logger.info({ userId: user.id, event: 'signup' }, 'User signed up');
```

**Why it matters:** `console.log` output is unstructured, unsearchable, and lacks context. Structured logs enable filtering, alerting, and correlation across services. In production incidents, structured logs are the difference between 5-minute and 5-hour resolution.

## Health Check Endpoint

**What you're looking for:**
- `/health`, `/healthz`, `/ready`, or `/api/health` endpoint exists
- Checks database connectivity (not just returns 200)
- Returns meaningful status

**Pass if:**
- Health endpoint route exists
- Endpoint verifies at least one dependency (database, cache)
- Returns status object (not just empty 200)

**Fail if:**
- No health endpoint anywhere in routing
- Health endpoint returns static 200 without checking dependencies

**Watch for:**
```javascript
// Bad - static 200
app.get('/health', (req, res) => res.sendStatus(200));

// Good - checks dependencies
app.get('/health', async (req, res) => {
  const dbOk = await db.$queryRaw`SELECT 1`.then(() => true).catch(() => false);
  res.json({ status: dbOk ? 'healthy' : 'degraded', db: dbOk });
});
```

**Why it matters:** Without health checks, load balancers route traffic to dead instances. Container orchestrators can't restart failed services. Average downtime increases 5-10x.

**N/A if:** Pure static site with no server component

## Application Performance Monitoring (APM)

**What you're looking for:**
- APM/tracing SDK installed
- Tracing configuration present
- Performance metrics collection

**Pass if:**
- `@sentry/tracing`, `dd-trace`, `@opentelemetry/sdk-node`, `newrelic`, or `elastic-apm-node` in dependencies
- Tracing initialization code present (`tracesSampleRate`, `TracerProvider`)
- OpenTelemetry auto-instrumentation configured

**Fail if:**
- No APM/tracing SDK in dependencies
- SDK installed but no initialization/configuration

**Watch for:**
```javascript
// Good - OpenTelemetry configured
import { NodeSDK } from '@opentelemetry/sdk-node';

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter(),
  instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();
```

**Why it matters:** Without APM, slow endpoints are invisible. You cannot improve what you cannot measure. Debugging latency issues without tracing requires reproducing in development -- which often can't replicate production conditions.

</domain>

<domain name="ci-cd">

**Observability:** Fully observable from code

**Domain max points: 10**

CI/CD configuration and deployment safety. Automated quality gates prevent broken deploys. AI never sets up CI/CD, so this is almost always missing from vibe-coded projects.

## CI Pipeline Exists

**What you're looking for:**
- CI/CD configuration file present
- At least build + test steps defined
- Pipeline is not a stub

**Pass if:**
- `.github/workflows/*.yml`, `.gitlab-ci.yml`, `Jenkinsfile`, `bitbucket-pipelines.yml`, or `.circleci/config.yml` exists
- At least one workflow has `build` or `test` step
- Config is not empty or commented out

**Fail if:**
- No CI config file anywhere in repository
- CI config exists but is empty or only contains stub steps

**Watch for:**
```yaml
# Good - basic CI pipeline
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
      - run: npm run build
```

**Why it matters:** Without CI, code goes from local machine directly to production with no automated quality gate. This is the single biggest deployment risk indicator for vibe-coded projects.

## Build Verification in CI

**What you're looking for:**
- Build step runs in CI
- TypeScript compilation checked
- Build failure blocks deployment

**Pass if:**
- CI config includes `npm run build`, `yarn build`, `next build`, or `tsc --noEmit`
- Build step is not `continue-on-error: true`
- Build runs before any deploy step

**Fail if:**
- CI exists but has no build step
- Build step has `continue-on-error: true`
- Deploy happens without build verification

**Watch for:**
```yaml
# Bad - build doesn't gate deploy
- run: npm run build
  continue-on-error: true
- run: deploy

# Good - build required before deploy
- run: npm run build
- run: deploy
```

**Why it matters:** A project that doesn't build cannot deploy. CI build step catches TypeScript errors, import issues, and configuration problems before they reach production.

## Database Migration Strategy

**What you're looking for:**
- Migration files managed by a framework
- Migration step in deploy pipeline
- Migrations version-controlled

**Pass if:**
- Migration directory exists: `prisma/migrations/`, `alembic/versions/`, `drizzle/`, `db/migrate/`
- Migration scripts in `package.json`: `db:migrate`, `prisma migrate deploy`
- Migrations not in `.gitignore`
- CI/deploy pipeline includes migration step

**Fail if:**
- Database exists but no migration directory or tooling
- Migrations are `.gitignore`d
- No migration step in deploy pipeline

**Watch for:**
```json
// Good - migration scripts defined
"scripts": {
  "db:migrate": "prisma migrate deploy",
  "db:generate": "prisma generate",
  "postinstall": "prisma generate"
}
```

**Why it matters:** Without managed migrations, database schema changes are manual and irreversible. A bad manual schema change can take down production with no rollback path.

**N/A if:** No database detected

## Environment Separation

**What you're looking for:**
- Distinct configurations for dev/staging/production
- Environment-specific env files documented
- `.env.example` documenting required variables

**Pass if:**
- `.env.example` or `.env.local.example` exists documenting required vars
- Environment-specific files (`.env.development`, `.env.production`) or equivalent
- `NODE_ENV` checks in application code for environment-specific behavior
- Env validation at startup (zod schema, `envalid`, `@t3-oss/env-nextjs`)

**Fail if:**
- No `.env.example` file
- No environment distinction in code or config
- `process.env.` used without any validation or fallback
- Same configuration used across all environments

**Watch for:**
```typescript
// Bad - no env validation
const dbUrl = process.env.DATABASE_URL; // might be undefined

// Good - validated at startup
import { z } from 'zod';
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'staging', 'production']),
});
export const env = envSchema.parse(process.env);
```

**Why it matters:** Without environment separation, dev API keys end up in production, or production data gets wiped by a dev migration. Missing `.env.example` means every new developer plays "guess the required env vars."

</domain>

<domain name="ai-security">

**Observability:** Mostly observable from code
**Conditional:** Only assess if AI/LLM patterns detected in codebase

**Domain max points: 12**

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

<quick_reference>

## Observability by Domain

| Domain | Observable from Code | When Unknown |
|--------|---------------------|--------------|
| Security | Fully | -- |
| Performance | Mostly (patterns detectable) | Runtime measurement needed for thresholds |
| Accessibility | Mostly (structural patterns) | Color contrast needs computed values |
| Testing | Fully | -- |
| Monitoring | Partial (SDKs detectable) | Dashboard/alert config is external |
| CI/CD | Fully (config files) | -- |
| Discoverability | Fully (HTML inspection) | -- |
| Reliability | Partial (backups need verification) | Ask user to verify dashboard |
| Analytics | Mostly (SDK detection) | Ask about external analytics |
| Platform | Partial (config files, **informational only**) | Ask about hosting platform |
| Legal | Partial (file/route detection) | Ask about legal pages |
| AI Security | Mostly (conditional) | Only if AI patterns detected |

**When you can't verify something, mark Unknown and create a helpful checklist item that explains exactly what to check and where.**

## What's Demoted to "Nice to Have"

These items are good practices but not required for MVP launch:

- Runbooks and incident response processes
- Capacity planning
- Full observability stack (APM is checked, but alerting config is external)

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
