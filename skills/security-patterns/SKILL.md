---
description: "Web application security patterns and common vulnerabilities. Use when reviewing security, discussing authentication, handling secrets, validating input, managing dependencies, or when a user asks about security concerns in their codebase."
---

# Web Application Security Patterns

Practical security guidance for web apps. Not enterprise paranoia — the stuff that actually matters when you're shipping a product and don't want to get hacked.

## Secrets Management

The single most common security mistake: hardcoding API keys and database credentials in source code.

### Why It Matters

If your code leaks — through a public repo, a compromised laptop, or a disgruntled contractor — attackers get instant access to everything those keys unlock. Your database, your payment processor, your users' data. And leaked keys get exploited fast: bots scan GitHub for secrets constantly.

### What Bad Looks Like

```javascript
// Hardcoded API key — anyone who sees this code owns your Stripe account
const stripe = new Stripe('sk_live_abc123');

// Firebase key in client-side code — visible in browser dev tools
const FIREBASE_KEY = 'AIzaSy...';

// Database URL with credentials in source
const db = new Pool({ connectionString: 'postgres://admin:password@db.example.com/prod' });
```

### What Good Looks Like

```javascript
// Secrets come from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const db = new Pool({ connectionString: process.env.DATABASE_URL });
```

### How to Fix It

1. Create a `.env` file in your project root with your secrets: `STRIPE_SECRET_KEY=sk_live_xxx`
2. Add `.env` to your `.gitignore` (and `.env.local`, `.env.production`)
3. Replace every hardcoded secret with `process.env.VARIABLE_NAME`
4. Create a `.env.example` file with placeholder values so other developers know what's needed
5. Set the same environment variables in your hosting platform's dashboard (Vercel, Railway, etc.)

### What to Watch For

- `.env` files that aren't in `.gitignore`
- Secrets already committed to git history (adding to .gitignore doesn't remove history — you'll need `git filter-branch` or BFG Repo Cleaner)
- Client-side code that references secrets (anything in a React component, Next.js page without `getServerSideProps`, or a Vite/CRA bundle is visible to users)
- Config files like `firebase.json` or `supabase/config.toml` that might contain keys

## Authentication

Don't roll your own. Seriously.

### Use an Established Library

The good options: NextAuth/Auth.js, Clerk, Auth0, Supabase Auth, Passport.js, Lucia. These handle the hard parts — session management, CSRF protection, token rotation, password hashing.

Hand-rolling auth means you're responsible for every edge case: timing attacks on password comparison, session fixation, token invalidation on password change, secure cookie settings. A library handles all of this.

### Password Hashing

If you're storing passwords (rather than using OAuth), they must be hashed with bcrypt, argon2, or scrypt. Never MD5, never SHA-256 (too fast), never plaintext.

```javascript
// Bad — plaintext storage
await db.user.create({ data: { password: req.body.password } });

// Bad — direct comparison
if (user.password === req.body.password) { /* ... */ }

// Bad — fast hash (crackable)
const hash = crypto.createHash('sha256').update(password).digest('hex');

// Good — bcrypt
import bcrypt from 'bcrypt';
const hash = await bcrypt.hash(password, 12);
const valid = await bcrypt.compare(inputPassword, storedHash);
```

### Route Protection

Every route that returns user-specific data or performs privileged actions needs an auth check. Middleware is the cleanest pattern — it keeps auth logic in one place instead of scattered across handlers.

```javascript
// Bad — no auth check on admin route
app.get('/admin/users', (req, res) => {
  return db.user.findMany();
});

// Good — middleware-based protection
app.get('/admin/users', requireAuth, requireAdmin, (req, res) => {
  return db.user.findMany();
});
```

### Session Management

- Use httpOnly cookies (not accessible from JavaScript, prevents XSS theft)
- Set the secure flag (cookies only sent over HTTPS)
- Set SameSite=Lax or Strict (prevents CSRF)
- Set reasonable expiration times
- Invalidate sessions on password change and logout

### JWT Pitfalls

If you're using JWTs instead of sessions:
- Use a strong, random secret (not `'secret123'` or your app name)
- Set expiration (`exp` claim) — tokens should not live forever
- Store in httpOnly cookies, not localStorage (localStorage is accessible to any XSS attack)
- Implement token refresh rather than long-lived tokens

## Input Validation

Treat all user input as hostile. Not because your users are malicious — but because attackers will find every endpoint that accepts input.

### SQL Injection

The fix is simple: never construct SQL queries with string concatenation or template literals using user input. Use parameterized queries or an ORM.

```javascript
// Bad — SQL injection
const user = await db.query(`SELECT * FROM users WHERE id = ${req.params.id}`);
const results = await db.query(`SELECT * FROM products WHERE name LIKE '%${search}%'`);

// Good — parameterized query
const user = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);

// Good — ORM (Prisma, Drizzle, etc. use parameterized queries automatically)
const user = await prisma.user.findUnique({ where: { id: req.params.id } });
```

If you're using an ORM like Prisma, Drizzle, or Sequelize, you're safe by default — they generate parameterized queries. The risk is when you drop to raw SQL.

### XSS (Cross-Site Scripting)

Never render user input as raw HTML. Modern frameworks (React, Vue, Svelte) escape output by default, but watch for escape hatches.

```javascript
// Bad — React escape hatch, renders raw HTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// Bad — direct DOM manipulation
element.innerHTML = userComment;

// Good — React default behavior (auto-escaped)
<div>{userInput}</div>

// If you MUST render HTML, sanitize it first
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

### Validation Libraries

Validate input shape and type at your API boundaries. Zod is the most popular choice in the TypeScript ecosystem:

```typescript
import { z } from 'zod';

const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().int().positive().optional(),
});

// In your handler
const result = CreateUserSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ errors: result.error.issues });
}
```

Other good options: Yup, Joi, Valibot. The specific library matters less than having validation at all.

### Command Injection

If you're running shell commands with user input (file processing, conversions, etc.), never interpolate input directly.

```javascript
// Bad — command injection
exec(`convert ${filename} output.pdf`);

// Good — use array arguments (no shell interpretation)
execFile('convert', [filename, 'output.pdf']);
```

## Dependency Security

Your app inherits every vulnerability in your dependency tree.

### Lock Files

Always commit your lock file (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`). Without it:
- Builds are non-reproducible (different machines get different versions)
- A compromised package update automatically flows into your next deploy
- You can't audit exactly what's running in production

### Auditing for Vulnerabilities

Run `npm audit` (or `yarn audit`, `pnpm audit`) periodically. Focus on **high** and **critical** severity issues. Low and moderate issues are usually not exploitable in practice.

```bash
# Check for vulnerabilities
npm audit

# Auto-fix what's safe to update
npm audit fix

# See what needs manual attention
npm audit --omit=dev
```

### What to Worry About

- **Critical/High CVEs** in production dependencies — fix these promptly
- **Wildcard versions** (`"*"` or `"latest"`) — pin your versions
- **Abandoned packages** with known vulnerabilities and no patches available

### What NOT to Worry About

- Every outdated package (outdated !== vulnerable)
- Dev dependency vulnerabilities (they don't run in production)
- Low-severity issues in transitive dependencies

## HTTPS and Transport Security

Modern hosting platforms (Vercel, Netlify, Railway, Render, Fly.io) handle HTTPS automatically. You generally don't need to configure certificates.

What to check:
- No hardcoded `http://` URLs for API calls in your code
- Auth cookies have the `secure` flag set
- If you're using a custom domain, verify SSL is active

What almost never applies anymore:
- Manual certificate management (Let's Encrypt + platforms handle this)
- HSTS headers (your platform usually sets these)

## Rate Limiting on Auth Endpoints

If you're using a managed auth service (Clerk, Auth0, Supabase Auth), rate limiting is built in. If you've built custom auth, you need rate limiting on:

- Login endpoint
- Registration endpoint
- Password reset endpoint
- API key generation

Without rate limiting, attackers can brute-force passwords at thousands of attempts per second.

```javascript
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 attempts per window
  message: 'Too many attempts. Try again in 15 minutes.',
});

app.use('/auth', authLimiter);
app.use('/api/login', authLimiter);
```

## AI Security Considerations

If your app uses AI/LLM features, additional security concerns apply:

### Prompt Injection

Keep system prompts and user input strictly separated. Never interpolate user input into system prompts.

```javascript
// Bad — user input in system prompt
const systemPrompt = `You are a helpful assistant. Context: ${userInput}`;

// Good — proper message separation
const messages = [
  { role: 'system', content: SYSTEM_PROMPT },
  { role: 'user', content: userInput }
];
```

### Function Calling Safety

If your AI can call functions/tools, validate parameters before execution. Never give AI unrestricted shell access or file system access.

### Context Isolation

Each user session needs its own conversation context. Shared or global context means User A's data can leak into User B's responses.

## Common Fix Patterns

Most security issues follow predictable fix patterns:

| Issue | Fix |
|-------|-----|
| Hardcoded secrets | Move to env vars, add `.env` to `.gitignore` |
| No auth on routes | Add middleware that checks session/token |
| Raw SQL with user input | Switch to parameterized queries or ORM methods |
| No input validation | Add Zod/Yup schema validation at API boundaries |
| No lock file | Run `npm install` to generate, commit it |
| Missing rate limiting | Add `express-rate-limit` or equivalent middleware |
| Insecure cookies | Set `httpOnly`, `secure`, `sameSite` flags |
| XSS via dangerouslySetInnerHTML | Use DOMPurify or avoid rendering raw HTML |
