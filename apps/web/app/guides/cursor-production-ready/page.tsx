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
const PAGE_URL = `${BASE_URL}/guides/cursor-production-ready`;

export const metadata: Metadata = {
  title: 'Is Your Cursor App Production Ready? The Complete Checklist',
  description:
    'Built something with Cursor? This checklist covers the security, auth, payments, and monitoring gaps AI misses — so you can ship without breaking prod.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Is Your Cursor App Production Ready? The Complete Checklist',
    description:
      'Built something with Cursor? This checklist covers the security, auth, payments, and monitoring gaps AI misses — so you can ship without breaking prod.',
    url: PAGE_URL,
    images: [
      {
        url: '/vibe-check-og.png',
        width: 1200,
        height: 630,
        alt: 'Cursor Production Ready Checklist — Vibe Check',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Your Cursor App Production Ready? The Complete Checklist',
    description:
      'Built something with Cursor? This checklist covers the security, auth, payments, and monitoring gaps AI misses — so you can ship without breaking prod.',
    images: ['/vibe-check-og.png'],
  },
};

const CHECKLIST_ITEMS = [
  'Authentication endpoints are rate limited',
  'Session tokens expire and rotate on privilege changes',
  'Error tracking is configured with Sentry or equivalent',
  'Health check endpoint exists and is monitored',
  'Payment webhooks verify provider signatures before processing',
  'Database has automated backups on a tested schedule',
  'Environment variables are never hardcoded in source',
  'HTTPS is enforced on every route with HSTS headers',
  'Privacy policy exists and is linked from registration flows',
  'Analytics tracking is implemented for key user actions',
  'SEO metadata is present on all public pages',
  'Deployment pipeline has rollback capability',
  'Background jobs have retry logic with exponential backoff',
  'File uploads are validated by type, size, and scanned for malware',
  'CORS is configured to allow only your own domains',
];

export default function CursorProductionReadyGuide() {
  const articleJsonLd = getGuideArticleJsonLd(
    'Is Your Cursor App Production Ready? The Complete Checklist',
    'Built an app with Cursor or another AI coding tool? Everything to check before production — security, monitoring, payments, and more.',
    PAGE_URL
  );

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Vibe Check', url: BASE_URL },
    { name: 'Guides', url: `${BASE_URL}/guides` },
    { name: 'Cursor Production Ready', url: PAGE_URL },
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
                Cursor Production Ready
              </li>
            </ol>
          </nav>

          <header className="mb-8">
            <Badge className="mb-4">Production Readiness Guide</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Is Your Cursor App Production Ready? The Complete Checklist
            </h1>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                When &ldquo;It Works&rdquo; Isn&apos;t Enough
              </h2>
              <p className="mb-4 text-muted-foreground">
                You built something with Cursor, Lovable, Bolt, v0, or Claude Code and it
                works. The demo is impressive. Users can sign up, click around, and see
                real data. But &ldquo;it works on my machine&rdquo; is a fundamentally
                different statement than &ldquo;it works for 10,000 users at 3am when the
                database connection drops.&rdquo; The gap between a working prototype and
                production-ready software is where most AI-built apps silently fail.
              </p>
              <p className="mb-4 text-muted-foreground">
                Production readiness is not a single feature you add at the end. It is a
                collection of concerns that span every layer of your application: how
                errors are caught and reported, how the system behaves under load, whether
                sensitive data is properly protected, and what happens when things
                inevitably go wrong. AI coding tools are exceptional at building the happy
                path. They generate clean UI code, wire up API routes, and scaffold
                database schemas in minutes. But they rarely build the safety nets that
                keep your app running when conditions are less than ideal.
              </p>
              <p className="text-muted-foreground">
                This guide walks through every category of production readiness that AI
                coding tools typically skip. Whether you built your entire app with Cursor
                or used AI assistants for specific features, this checklist will help you
                identify what needs attention before real users depend on your software.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                What Cursor and AI Coding Tools Get Right
              </h2>
              <p className="mb-4 text-muted-foreground">
                AI coding tools deserve credit for what they do well. Cursor and similar
                assistants produce clean, idiomatic code that follows modern framework
                conventions. They scaffold Next.js apps with proper file structure, generate
                React components with sensible prop interfaces, and wire up database queries
                using ORMs correctly. The initial architecture is often solid — proper
                separation of concerns, typed interfaces, and reasonable project organization.
                For getting from zero to a working prototype, nothing else comes close to
                the speed these tools provide.
              </p>
              <p className="text-muted-foreground">
                The problem is not the code quality on the happy path. The problem is
                everything that surrounds it. AI tools optimize for the scenario where every
                request succeeds, every input is valid, and every external service responds
                instantly. They skip edge cases not because they cannot handle them, but
                because you did not ask for them. Error states, retry logic, security
                hardening, monitoring, graceful degradation — these are the concerns that
                separate a demo from a product. And they are precisely the concerns that
                AI-generated codebases consistently lack.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                The Production Readiness Gap
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-xl font-medium">Security</h3>
                  <p className="mb-3 text-muted-foreground">
                    Security is the highest-stakes gap in AI-generated code. Authentication
                    endpoints often lack rate limiting, which means an attacker can brute-force
                    passwords with no resistance. Session tokens may never expire. API keys
                    get hardcoded into source files and committed to git history. Input
                    validation is frequently absent, leaving your app vulnerable to SQL
                    injection, cross-site scripting, and command injection attacks.
                  </p>
                  <p className="text-muted-foreground">
                    These are not theoretical risks. Automated scanners probe every
                    publicly deployed application for exactly these weaknesses, and AI-generated
                    code has predictable patterns that make it easier to exploit. Review the{' '}
                    <Link href="/features/auth" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      authentication checklist
                    </Link>{' '}
                    to audit your auth implementation and close the most critical gaps first.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Monitoring and Error Tracking
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    A production app without monitoring is flying blind. When your AI tool
                    generated your backend, it almost certainly did not set up error tracking,
                    alerting, health check endpoints, or structured logging. This means when
                    something breaks in production — and it will — you will learn about it
                    from an angry user rather than an automated alert. By then, the problem
                    may have been affecting users for hours.
                  </p>
                  <p className="text-muted-foreground">
                    At minimum, production apps need an error tracking service like Sentry
                    that captures unhandled exceptions with full context, a health check
                    endpoint that external monitors can ping, and structured logging that
                    makes it possible to trace a request through your system. The{' '}
                    <Link href="/features/monitoring" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      monitoring checklist
                    </Link>{' '}
                    covers the full set of observability requirements.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">Payments</h3>
                  <p className="mb-3 text-muted-foreground">
                    Payment handling is where production readiness gaps become directly
                    expensive. AI-generated payment code frequently processes price
                    calculations on the client side, where users can manipulate the values.
                    Webhook endpoints accept payloads without verifying signatures from the
                    payment provider. Idempotency keys are missing, so network retries can
                    charge customers multiple times for the same transaction.
                  </p>
                  <p className="text-muted-foreground">
                    Subscription management is another common gap — AI tools often check
                    subscription status by reading local state rather than verifying with
                    Stripe or your payment provider, which means users can bypass paywalls
                    by manipulating client-side data. See the{' '}
                    <Link href="/features/payments" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      payments checklist
                    </Link>{' '}
                    for a complete audit of AI-generated payment code.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">Data and Reliability</h3>
                  <p className="mb-3 text-muted-foreground">
                    AI coding tools generate database schemas and queries that work, but
                    they rarely address what happens when things go wrong. Backup strategies
                    are absent. Migration plans do not exist. Database-level validation
                    constraints are missing, which means your application code is the only
                    thing preventing invalid data from entering the system. If a bug
                    bypasses your app logic, the database accepts whatever it receives.
                  </p>
                  <p className="text-muted-foreground">
                    Retry logic for external service calls is almost never present in
                    AI-generated code. When a third-party API times out or returns a
                    transient error, your app simply fails instead of retrying with
                    exponential backoff. Connection pooling, graceful shutdown handling, and
                    circuit breakers are all absent by default. The{' '}
                    <Link href="/features/data-export" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      data management checklist
                    </Link>{' '}
                    covers backup, export, and reliability requirements.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">Legal and Compliance</h3>
                  <p className="mb-3 text-muted-foreground">
                    Legal compliance is the category that AI coding tools ignore most
                    completely. No AI assistant will generate a privacy policy, implement
                    cookie consent, or build a data deletion workflow unless you explicitly
                    ask for it. Yet these are legal requirements in most jurisdictions.
                    GDPR requires that European users can request deletion of their personal
                    data. CCPA gives California residents similar rights. Without these
                    capabilities, your app is non-compliant from day one.
                  </p>
                  <p className="text-muted-foreground">
                    Beyond privacy regulations, there are practical concerns: terms of
                    service that limit your liability, cookie consent banners that satisfy
                    ePrivacy requirements, clear data retention policies, and transparent
                    disclosure of how user data is processed. These are not optional extras
                    for a production app — they are baseline requirements that protect both
                    your users and your business.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                The Production Readiness Checklist
              </h2>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Essential Production Readiness Items
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
                Manually auditing every domain in this guide takes hours, and the results
                are only as good as your knowledge of each area. Vibe Check automates the
                entire process. The CLI plugin runs inside Claude Code and scans your actual
                codebase across all production readiness domains — security, monitoring,
                payments, reliability, legal compliance, and more. It identifies specific
                gaps and generates actionable prompts to fix them. Install it with{' '}
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
                If you want to understand your production readiness risks before writing
                any code, the web app at{' '}
                <Link href="/#check-your-app" className="text-primary underline underline-offset-4 hover:text-primary/80">
                  vibe-check.cloud
                </Link>{' '}
                provides guided assessments without requiring code access. Describe what
                you are building and Vibe Check identifies the domains that need attention
                based on your app&apos;s specific features and architecture. Either way, you
                get a clear picture of what stands between your working prototype and a
                production-ready application.
              </p>
            </section>

            <Separator />

            <section className="text-center">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Get Your App Production Ready
              </h2>
              <p className="mb-6 text-muted-foreground">
                Find out what your AI coding tool missed before your users do.
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
              <Link href="/guides/vibe-coding-security" className="rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
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
            </section>
          </div>

          <RelatedGuides slug="cursor-production-ready" />
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
