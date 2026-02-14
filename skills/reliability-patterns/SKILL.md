---
description: "Reliability, error handling, and monitoring patterns for web applications. Use when improving error handling, adding monitoring, configuring backups, adding health checks, or when a user asks about making their app more resilient."
---

# Reliability Patterns for Web Applications

Your app will break. The database will hiccup, an API will timeout, a user will submit something unexpected. The question isn't whether — it's whether you'll handle it gracefully or crash in a way that loses data and confuses users.

## Error Handling Patterns

The most common reliability gap: errors that get swallowed, ignored, or crash the entire application.

### The Cardinal Sin: Swallowed Errors

```javascript
// Bad — error disappears silently. When this breaks, you'll have no idea why.
try {
  await processPayment(order);
} catch (e) {
  // nothing
}

// Bad — logs to console but only visible if you're watching server logs at that exact moment
try {
  await processPayment(order);
} catch (e) {
  console.log(e);
}

// Good — handle it meaningfully
try {
  await processPayment(order);
} catch (e) {
  logger.error('Payment processing failed', { orderId: order.id, error: e.message });
  throw new PaymentError('Payment failed. Please try again.');
}
```

### Unhandled Promise Rejections

Every async call that can fail needs a `.catch()` or needs to be in a `try/catch` block. Unhandled promise rejections will crash your Node.js process in newer versions.

```javascript
// Bad — if fetchData fails, the rejection is unhandled
fetchData().then(data => processData(data));

// Good — handle the rejection
fetchData()
  .then(data => processData(data))
  .catch(err => logger.error('Failed to fetch data', err));

// Good — async/await with try/catch
try {
  const data = await fetchData();
  await processData(data);
} catch (err) {
  logger.error('Data pipeline failed', err);
}
```

### React Error Boundaries

In React apps, an unhandled error in any component crashes the entire page. Error boundaries catch rendering errors and show a fallback instead.

```jsx
// ErrorBoundary.jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Report to error tracking service
    reportError(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Wrap your app or critical sections
<ErrorBoundary>
  <Dashboard />
</ErrorBoundary>
```

Place error boundaries around:
- The entire app (catch-all)
- Individual features that could fail independently (a broken chart shouldn't kill the whole dashboard)

### Global Error Handlers

Set up process-level error handlers as a safety net:

```javascript
// Node.js — catch unhandled errors before they crash the process
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled promise rejection', { reason });
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', { error });
  // Graceful shutdown — finish in-flight requests, then exit
  server.close(() => process.exit(1));
});
```

These are safety nets, not substitutes for proper error handling in your code.

## Error Tracking Setup

Console.log doesn't count as error tracking. You need a service that captures errors, groups duplicates, alerts you, and gives you stack traces with context.

### The Options

**Sentry** is the most popular. Free tier covers most indie projects.

```javascript
// Install: npm install @sentry/node (or @sentry/nextjs, @sentry/react, etc.)
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of transactions for performance monitoring
});
```

**For Next.js**, use `@sentry/nextjs` which auto-instruments both client and server:

```bash
npx @sentry/wizard@latest -i nextjs
```

This sets up Sentry config files, source maps, and both client/server error capturing.

**Other options:** Bugsnag, Rollbar, LogRocket (also records sessions). The specific tool matters less than having one at all.

### What Good Error Tracking Gives You

- You find out about errors before your users report them
- Stack traces with source maps (you can see the actual line that failed)
- Error grouping (1000 users hitting the same bug = 1 issue, not 1000)
- Context: which user, what browser, what they were doing
- Trends: is this error getting worse or better?

## Database Reliability

### Connection Pooling

Creating a new database connection for every request is slow and can exhaust your database's connection limit under load. Use a connection pool.

```javascript
// Bad — new connection per request
app.get('/users', async (req, res) => {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const result = await client.query('SELECT * FROM users');
  await client.end();
  res.json(result.rows);
});

// Good — shared connection pool
import { Pool } from 'pg';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // max connections in pool
});

app.get('/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});
```

If you're using an ORM (Prisma, Drizzle, TypeORM), connection pooling is built in. Just make sure you're creating a single client instance, not a new one per request.

```javascript
// Bad — new Prisma client per request (leaks connections)
app.get('/users', async (req, res) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  res.json(users);
});

// Good — single shared instance
const prisma = new PrismaClient();

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});
```

### Error Recovery

Database connections can drop — network blips, database restarts, failovers. Your app should handle this without crashing.

```javascript
// Handle connection errors gracefully
pool.on('error', (err) => {
  logger.error('Unexpected database pool error', err);
  // Don't crash — the pool will attempt reconnection automatically
});

// In request handlers, catch database errors specifically
try {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
  res.json(result.rows[0]);
} catch (err) {
  if (err.code === 'ECONNREFUSED') {
    logger.error('Database connection refused');
    return res.status(503).json({ error: 'Service temporarily unavailable' });
  }
  throw err; // Re-throw unexpected errors
}
```

### Graceful Shutdown

When your process receives a shutdown signal (deploy, restart, scaling), finish in-flight requests before closing:

```javascript
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');

  // Stop accepting new requests
  server.close(async () => {
    // Close database connections
    await pool.end();
    logger.info('Database connections closed');
    process.exit(0);
  });

  // Force shutdown after timeout
  setTimeout(() => {
    logger.error('Graceful shutdown timed out, forcing exit');
    process.exit(1);
  }, 10000);
});
```

## Backup Configuration

If your database disappears and you have no backups, you lose everything. Every user, every order, every piece of data. This happens more than you'd think — disk failures, accidental deletions, bad migrations.

### Managed Database Services (Most Common)

If you're using Supabase, PlanetScale, Neon, Railway Postgres, or any major cloud database: **backups are probably enabled by default, but verify it.**

Go to your database provider's dashboard and check:
- Automated backups are ON
- Retention period is at least 7 days
- Point-in-time recovery is available (for Postgres-based services)

This takes 2 minutes and could save your entire product.

### Self-Hosted or SQLite

If you're running your own database or using SQLite as a production database:
- SQLite in production needs an explicit backup strategy (Litestream is the go-to for streaming SQLite backups)
- Self-hosted Postgres/MySQL — set up `pg_dump` or `mysqldump` on a cron schedule, push to cloud storage
- Test your backups by actually restoring from one. Untested backups don't count.

### What to Watch For

- **SQLite as production database with no backup** — if the server dies, everything is gone
- **Self-hosted database with no backup scripts** — same problem
- **"I think my host does backups"** — verify it. Log into the dashboard. Check the settings.

## Health Check Endpoints

A health check endpoint lets your hosting platform (and monitoring tools) know if your app is actually working.

### Basic Health Check

```javascript
app.get('/health', async (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
```

### Health Check with Dependency Verification

A more useful health check verifies that your app can reach its dependencies:

```javascript
app.get('/health', async (req, res) => {
  const checks = { database: false, redis: false };

  try {
    await pool.query('SELECT 1');
    checks.database = true;
  } catch (e) {
    logger.error('Health check: database unreachable', e);
  }

  try {
    await redis.ping();
    checks.redis = true;
  } catch (e) {
    logger.error('Health check: redis unreachable', e);
  }

  const healthy = Object.values(checks).every(Boolean);
  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'ok' : 'degraded',
    checks,
    timestamp: new Date().toISOString(),
  });
});
```

### Where to Configure Health Checks

Most platforms support health check configuration:
- **Railway** — Add `RAILWAY_HEALTHCHECK_TIMEOUT_SEC` and point to your endpoint
- **Fly.io** — Configure in `fly.toml` under `[http_service.checks]`
- **Render** — Set in service settings under "Health Check Path"
- **AWS ECS/ELB** — Configure target group health checks

## Monitoring and Observability

You don't need a full observability stack. You need to know two things: "Is it up?" and "Are users hitting errors?"

### Minimum Viable Monitoring

1. **Error tracking** (Sentry) — You know when things break
2. **Uptime monitoring** — You know when the site is down

For uptime monitoring, set up a free check with Betterstack (formerly Better Uptime), UptimeRobot, or Checkly. They ping your health endpoint every minute and alert you if it goes down.

### When You Need More

As you grow, add:
- **Application Performance Monitoring (APM)** — Sentry has this built in. Shows slow routes, database queries, and bottlenecks.
- **Structured logging** — JSON logs with request IDs, user IDs, and timing data. Makes debugging production issues much faster.
- **Alerting rules** — Get notified when error rates spike, not on every individual error.

## Graceful Degradation

When a dependency fails, your app should degrade gracefully instead of crashing completely.

### Patterns

```javascript
// Bad — entire page crashes because a recommendation API is down
const products = await fetchProducts();
const recommendations = await fetchRecommendations(user.id); // throws, page 500s

// Good — show the page without recommendations
const products = await fetchProducts();
let recommendations = [];
try {
  recommendations = await fetchRecommendations(user.id);
} catch (e) {
  logger.warn('Recommendations unavailable, showing page without them');
}
```

### What to Apply This To

- **Non-critical features** (recommendations, analytics events, social proof) — fail silently, log warning
- **Critical features** (authentication, payment processing, data saving) — show clear error message, don't silently fail
- **Third-party APIs** — always wrap in try/catch, always have a timeout

### Timeouts

Never make an external API call without a timeout. A hanging request can cascade into all your server's connections being consumed.

```javascript
// Bad — no timeout, hangs indefinitely if API is slow
const response = await fetch('https://api.example.com/data');

// Good — timeout after 5 seconds
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch('https://api.example.com/data', {
    signal: controller.signal,
  });
  return await response.json();
} catch (e) {
  if (e.name === 'AbortError') {
    logger.warn('API request timed out');
    return fallbackData;
  }
  throw e;
} finally {
  clearTimeout(timeout);
}
```

## Platform-Appropriate Reliability

### PaaS (Vercel, Railway, Render, Fly.io)

These platforms handle a lot of reliability for you:
- Process restarts on crash (automatic)
- Zero-downtime deploys (built in)
- SSL/TLS (automatic)
- Basic scaling (configurable)

Focus your effort on: error handling in your code, database backups verification, health check endpoints, and error tracking setup.

### Self-Hosted (VPS, Docker, Kubernetes)

You own more of the reliability stack:
- Process management (PM2, systemd, Docker restart policies)
- Reverse proxy (nginx, Caddy) for SSL and load balancing
- Database backup scripts and cron jobs
- Log aggregation and rotation
- Firewall and security group configuration

This is significantly more work. If you're a small team, PaaS is almost always the right call until you have specific needs that require self-hosting.
