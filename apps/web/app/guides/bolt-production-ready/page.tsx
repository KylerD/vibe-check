import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/game/game-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SiteFooter } from '@/components/site-footer';
import { RelatedGuides } from '@/components/related-guides';
import { getGuideArticleJsonLd, getBreadcrumbJsonLd, safeJsonLd } from '@/lib/seo';

const BASE_URL = 'https://vibe-check.cloud';
const PAGE_URL = `${BASE_URL}/guides/bolt-production-ready`;

export const metadata: Metadata = {
  title: 'Is My Bolt App Production Ready? Security and Deployment Checklist',
  description:
    'Built an app with Bolt.new? The production checklist for security, deployment, error handling, and the gaps Bolt leaves in AI-generated code.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Is My Bolt App Production Ready? Security and Deployment Checklist',
    description:
      'Built an app with Bolt.new? The production checklist for security, deployment, error handling, and the gaps Bolt leaves in AI-generated code.',
    url: PAGE_URL,
    images: [
      {
        url: '/vibe-check-og.png',
        width: 1200,
        height: 630,
        alt: 'Bolt Production Ready Checklist — Vibe Check',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is My Bolt App Production Ready? Security and Deployment Checklist',
    description:
      'Built an app with Bolt.new? The production checklist for security, deployment, error handling, and the gaps Bolt leaves in AI-generated code.',
    images: ['/vibe-check-og.png'],
  },
};

const CHECKLIST_ITEMS = [
  'Authentication endpoints have rate limiting configured',
  'Session tokens expire and rotate on privilege changes',
  'All API keys and secrets are in environment variables, not source code',
  'Server-side validation exists for every form and API endpoint',
  'Error tracking is configured with Sentry or equivalent',
  'Health check endpoint exists and is monitored externally',
  'Payment webhooks verify provider signatures before processing',
  'Database has automated backups on a tested restore schedule',
  'HTTPS is enforced on every route with HSTS headers',
  'CORS is configured to allow only your own domains',
  'File uploads are validated by type, size, and scanned for malware',
  'Deployment has a rollback strategy and is not limited to Bolt hosting',
  'Background jobs have retry logic with exponential backoff',
  'Privacy policy exists and is linked from registration flows',
  'Third-party dependencies have been audited for known vulnerabilities',
];

export default function BoltProductionReadyGuide() {
  const articleJsonLd = getGuideArticleJsonLd(
    'Is My Bolt App Production Ready? Security and Deployment Checklist',
    'Built an app with Bolt.new? The production checklist for security, deployment, error handling, and the gaps Bolt leaves in AI-generated code.',
    PAGE_URL
  );

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Vibe Check', url: BASE_URL },
    { name: 'Guides', url: `${BASE_URL}/guides` },
    { name: 'Bolt Production Ready', url: PAGE_URL },
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(articleJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(breadcrumbJsonLd),
        }}
      />

      <SiteHeader backHref="/" backLabel="Home" />

      <main id="main-content" className="flex-1">
        <article className="mx-auto max-w-3xl px-6 py-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Vibe Check
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground font-medium" aria-current="page">
                Bolt Production Ready
              </li>
            </ol>
          </nav>

          <header className="mb-8">
            <Badge className="mb-4">Production Readiness Guide</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Is My Bolt App Production Ready? The Complete Checklist
            </h1>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                What Bolt.new Gets Right
              </h2>
              <p className="mb-4 text-muted-foreground">
                Bolt.new has changed what a single person can build in an afternoon.
                Describe an application in natural language and Bolt generates a
                full-stack app with a working UI, backend logic, and one-click
                deployment — all inside the browser. There is no local setup, no
                dependency management, no build configuration. You go from idea to
                deployed URL in minutes. For rapid prototyping and validation, that
                speed is transformative.
              </p>
              <p className="mb-4 text-muted-foreground">
                The code Bolt generates is functional and modern. It uses popular
                frameworks, produces clean component structures, and handles basic
                routing and state management competently. The in-browser development
                environment removes friction that traditionally slows down the first
                hours of any project. For makers, indie hackers, and founders testing
                ideas, Bolt delivers on its promise of instant creation.
              </p>
              <p className="text-muted-foreground">
                The challenge appears when that prototype needs to serve real users
                with real data and real money. Bolt optimises for making things work
                quickly, not for making things safe, resilient, or compliant. The gap
                between a working Bolt app and a production-ready Bolt app is where
                most projects silently accumulate risk — and where this guide focuses.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                The Production Gaps in Bolt-Generated Code
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Security and Input Validation
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Bolt-generated code consistently trusts user input. Form fields
                    accept any value without length limits or format validation. API
                    endpoints pass request bodies directly to database operations
                    without sanitisation. User-submitted content renders in the browser
                    without escaping. These patterns enable SQL injection, cross-site
                    scripting, and command injection — the three most exploited web
                    vulnerabilities.
                  </p>
                  <p className="text-muted-foreground">
                    Authentication code generated by Bolt handles the basic flow —
                    sign up, log in, persist session — but lacks defensive measures.
                    Rate limiting is absent, so brute-force attacks face no resistance.
                    Sessions do not expire. Password reset tokens may be predictable.
                    CORS is often configured to accept all origins. Each of these is a
                    vulnerability that automated scanners probe for within hours of
                    your app going live. Review the{' '}
                    <Link href="/features/auth" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      authentication checklist
                    </Link>{' '}
                    for a complete audit of your auth implementation.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Deployment and Infrastructure
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Bolt&apos;s one-click deployment is convenient for demos but
                    creates infrastructure concerns for production. When your entire
                    application lives inside Bolt&apos;s hosting, you have limited
                    control over server configuration, scaling, caching, and monitoring.
                    There is no straightforward way to add a CDN, configure custom
                    headers, set up staging environments, or implement blue-green
                    deployments.
                  </p>
                  <p className="text-muted-foreground">
                    For production use, you need to export your Bolt app and deploy it
                    to infrastructure you control — Vercel, Railway, Fly.io, or
                    similar. This gives you environment variable management, custom
                    domains with proper SSL, deployment rollbacks, and the ability to
                    configure server-level security headers. Bolt gets you to a working
                    app fast, but the hosting strategy needs to mature before real
                    users depend on it.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Error Handling and Observability
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Bolt-generated apps have minimal error handling. Unhandled
                    exceptions crash the application or show blank screens. There is no
                    error tracking service, no structured logging, no health check
                    endpoint, and no alerting pipeline. When your app breaks in
                    production — and it will — you have no way to know what happened,
                    which users were affected, or how to reproduce the issue.
                  </p>
                  <p className="text-muted-foreground">
                    At minimum, production apps need an error tracking service like
                    Sentry that captures exceptions with full stack traces and user
                    context, a health check endpoint that uptime monitors can ping,
                    structured logging for request tracing, and graceful error
                    boundaries that show users a helpful message rather than a broken
                    page. The{' '}
                    <Link href="/features/monitoring" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      monitoring checklist
                    </Link>{' '}
                    covers the full set of observability requirements.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    API Keys and Secret Management
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Bolt&apos;s in-browser development model makes secret management
                    particularly risky. When you add third-party integrations —
                    Stripe, OpenAI, database connections — the keys often end up in
                    source code rather than environment variables. Since Bolt projects
                    can be shared or forked, secrets embedded in code travel with the
                    project.
                  </p>
                  <p className="text-muted-foreground">
                    Every API key in your Bolt app needs auditing. Stripe secret keys,
                    database connection strings, and any service credentials must be
                    moved to environment variables and never appear in client-side
                    bundles. If any key was ever in source code, rotate it immediately
                    — even after removing it from the code, the old value persists in
                    version history and browser caches.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Data Reliability and Backups
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Bolt generates database schemas and queries that work, but does
                    not address data durability. There are no automated backups, no
                    migration strategies, no connection pooling, and no retry logic for
                    failed database operations. If your database goes down or data gets
                    corrupted, there is no recovery path unless you have set one up
                    yourself.
                  </p>
                  <p className="text-muted-foreground">
                    External service calls in Bolt-generated code also lack resilience.
                    When a third-party API times out or returns a transient error, the
                    request simply fails with no retry. For any operation that involves
                    money, user data, or external state, you need idempotency keys,
                    retry logic with exponential backoff, and circuit breakers to
                    prevent cascading failures. The{' '}
                    <Link href="/features/data-export" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      data management checklist
                    </Link>{' '}
                    covers backup, export, and reliability requirements.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                Bolt Production Readiness Checklist
              </h2>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Essential Items Before Shipping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {CHECKLIST_ITEMS.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                How Vibe Check Automates This
              </h2>
              <p className="mb-4 text-muted-foreground">
                Manually reviewing a Bolt-generated codebase across every production
                domain takes hours. Vibe Check automates the entire process. The CLI
                plugin runs inside Claude Code and scans your actual codebase across
                all production readiness domains — security, monitoring, payments,
                reliability, legal compliance, and more. It identifies specific gaps
                in your Bolt app and generates actionable prompts to fix them. Install
                it with{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                  npx vibe-check-cc
                </code>{' '}
                and run a full scan with{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                  /vibe-check:check
                </code>{' '}
                in Claude Code.
              </p>
              <p className="text-muted-foreground">
                If you want to understand your production readiness risks before
                touching code, the web app at{' '}
                <Link href="/#check-your-app" className="text-primary underline underline-offset-4 hover:text-primary/80">
                  vibe-check.cloud
                </Link>{' '}
                provides guided assessments without requiring code access. Describe
                what you built with Bolt and Vibe Check identifies the domains that
                need attention based on your app&apos;s specific features and
                architecture.
              </p>
            </section>

            <Separator />

            <section className="text-center">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Get Your Bolt App Production Ready
              </h2>
              <p className="mb-6 text-muted-foreground">
                Find out what Bolt missed before your users do.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <a
                    href="https://github.com/Hypership-Software/vibe-check"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Install the CLI
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/#check-your-app">Try the web version</Link>
                </Button>
              </div>
            </section>

            <Separator className="my-10" />

            <section>
              <h2 className="mb-4 text-xl font-semibold">Related Guides</h2>
              <div className="space-y-4">
                <Link href="/guides/lovable-production-ready" className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
                  <Card className="transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Is My Lovable App Production Ready?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        The production readiness checklist for Lovable apps — Supabase
                        security, auth gaps, and what to fix before shipping.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/guides/v0-production-ready" className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
                  <Card className="transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Is My v0 App Production Ready?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        v0 generates great UI — but what about auth, API routes,
                        and database security? The full production checklist.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/guides/vibe-coding-security" className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
                  <Card className="transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Vibe Coding Security Guide
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        The top security risks in AI-generated code and how to fix them
                        before you ship.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </section>
          </div>

          <RelatedGuides slug="bolt-production-ready" />
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
