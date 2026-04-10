import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/game/game-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SiteFooter } from '@/components/site-footer';
import { getGuideArticleJsonLd, getBreadcrumbJsonLd, safeJsonLd } from '@/lib/seo';

const BASE_URL = 'https://www.vibe-check.cloud';
const PAGE_URL = `${BASE_URL}/guides/lovable-production-ready`;

export const metadata: Metadata = {
  title: 'Is My Lovable App Production Ready? The Complete Checklist',
  description:
    'Built an app with Lovable? The production readiness checklist covering auth, rate limiting, error handling, monitoring, and everything Lovable skips by default.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Is My Lovable App Production Ready? The Complete Checklist',
    description:
      'Built an app with Lovable? The production readiness checklist covering auth, rate limiting, error handling, monitoring, and everything Lovable skips by default.',
    url: PAGE_URL,
    images: [
      {
        url: '/vibe-check-og.png',
        width: 1200,
        height: 630,
        alt: 'Lovable Production Ready Checklist — Vibe Check',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is My Lovable App Production Ready? The Complete Checklist',
    description:
      'Built an app with Lovable? The production readiness checklist covering auth, rate limiting, error handling, monitoring, and everything Lovable skips by default.',
    images: ['/vibe-check-og.png'],
  },
};

const CHECKLIST_ITEMS = [
  'Authentication endpoints have rate limiting configured',
  'Session tokens expire and rotate on privilege changes',
  'Supabase Row Level Security policies are enabled on every table',
  'API keys and Supabase credentials are not exposed in client-side code',
  'Error tracking is configured with Sentry or equivalent',
  'Health check endpoint exists and is monitored externally',
  'Payment webhooks verify provider signatures before processing',
  'Database has automated backups on a tested restore schedule',
  'Environment variables are never hardcoded in source',
  'HTTPS is enforced on every route with HSTS headers',
  'Input validation exists on both client and server side',
  'File uploads are validated by type, size, and scanned for malware',
  'CORS is configured to allow only your own domains',
  'Privacy policy exists and is linked from registration flows',
  'Deployment pipeline has rollback capability',
];

export default function LovableProductionReadyGuide() {
  const articleJsonLd = getGuideArticleJsonLd(
    'Is My Lovable App Production Ready? The Complete Checklist',
    'Built an app with Lovable? The production readiness checklist covering auth, rate limiting, error handling, monitoring, and everything Lovable skips by default.',
    PAGE_URL
  );

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Vibe Check', url: BASE_URL },
    { name: 'Guides', url: `${BASE_URL}/guides` },
    { name: 'Lovable Production Ready', url: PAGE_URL },
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
                Lovable Production Ready
              </li>
            </ol>
          </nav>

          <header className="mb-8">
            <Badge className="mb-4">Production Readiness Guide</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Is My Lovable App Production Ready? The Complete Checklist
            </h1>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                What Lovable Gets Right
              </h2>
              <p className="mb-4 text-muted-foreground">
                Lovable is genuinely impressive at what it does. Describe an app in
                plain language and it generates a working full-stack application with
                a polished UI, Supabase backend, authentication flows, and deployment
                configuration — often in under a minute. The code it produces follows
                modern React patterns, uses TypeScript, and integrates shadcn/ui
                components with sensible defaults. For getting from zero to a
                functional prototype, Lovable compresses weeks of work into a single
                session.
              </p>
              <p className="mb-4 text-muted-foreground">
                The Supabase integration is particularly well executed. Lovable
                scaffolds database tables, generates type-safe queries, and wires up
                authentication with Supabase Auth. It handles the plumbing that
                typically consumes the first few days of any project — routing, layout,
                basic CRUD operations, and responsive design. The result looks and
                feels like a real product, not a prototype.
              </p>
              <p className="text-muted-foreground">
                But looking like a real product and being ready for real users are two
                different things. Lovable optimises for the demo — the scenario where
                everything works, every input is valid, and every user behaves as
                expected. The gaps only become visible when you start stress-testing
                the edges: what happens when someone submits malformed data, when the
                database connection drops, when a user tries to access another
                user&apos;s data, or when your Stripe webhook fires twice for the same
                event.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                What Lovable Misses
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Authentication and Authorisation
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Lovable generates Supabase Auth integration that handles sign-up,
                    login, and session management. That&apos;s the happy path. What it
                    rarely includes is rate limiting on authentication endpoints,
                    account lockout after failed attempts, session expiration policies,
                    or token rotation on privilege changes. Without rate limiting, an
                    attacker can brute-force passwords at thousands of attempts per
                    second. Without session expiration, a stolen token grants permanent
                    access.
                  </p>
                  <p className="text-muted-foreground">
                    The bigger gap is authorisation. Lovable sets up Supabase Row Level
                    Security (RLS) in some cases, but the policies are often too
                    permissive or missing entirely on certain tables. If RLS is not
                    configured correctly, any authenticated user can read or modify any
                    other user&apos;s data by crafting direct Supabase queries. Check
                    every table has RLS enabled and every policy matches your actual
                    access requirements. See the full{' '}
                    <Link href="/features/auth" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      authentication checklist
                    </Link>{' '}
                    for a complete audit guide.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Rate Limiting and Abuse Prevention
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Lovable-generated apps have no rate limiting by default. Every API
                    endpoint, every form submission, every authentication attempt can
                    be called as frequently as an attacker wants. This is not just a
                    security concern — it is a cost concern. A single bot hitting your
                    Supabase instance or third-party APIs in a tight loop can run up
                    significant charges before you notice.
                  </p>
                  <p className="text-muted-foreground">
                    Rate limiting needs to be applied at multiple layers: authentication
                    endpoints, API routes that trigger external services, form
                    submissions that write to the database, and any endpoint that sends
                    emails or notifications. Supabase Edge Functions can implement rate
                    limiting, but Lovable does not generate this code.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Error Handling and Monitoring
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    When a Lovable-generated app encounters an error, the user
                    typically sees a blank screen or a generic React error boundary.
                    There is no error tracking service configured, no structured
                    logging, no health check endpoint, and no alerting. When something
                    breaks in production, you will learn about it from a user
                    complaining on social media rather than an automated alert.
                  </p>
                  <p className="text-muted-foreground">
                    Production apps need error tracking with full context — Sentry or
                    equivalent — so you can see exactly what failed, for which user,
                    and what state the application was in. They need health check
                    endpoints that external monitors can ping. They need structured
                    logging that makes it possible to trace a request through your
                    system. The{' '}
                    <Link href="/features/monitoring" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      monitoring checklist
                    </Link>{' '}
                    covers the full set of observability requirements.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Payment Security
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Lovable can scaffold Stripe integration, but the generated payment
                    code frequently has critical gaps. Price calculations may happen on
                    the client side, where users can manipulate the values. Webhook
                    endpoints may accept payloads without verifying Stripe signatures,
                    meaning an attacker can forge payment confirmations. Idempotency
                    keys are typically missing, so network retries can charge customers
                    multiple times.
                  </p>
                  <p className="text-muted-foreground">
                    Subscription status is another common gap — Lovable apps often
                    check subscription state by reading local data rather than
                    verifying with Stripe, which means users can bypass paywalls by
                    manipulating client-side state. The{' '}
                    <Link href="/features/payments" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      payments checklist
                    </Link>{' '}
                    walks through every critical check for AI-generated payment code.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Environment Variables and Secrets
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Lovable connects to Supabase during generation and sometimes
                    includes connection strings or API keys directly in the generated
                    code. Even when keys are placed in environment variables, the
                    Supabase anon key — which is intended to be public — is sometimes
                    confused with the service role key, which must never be exposed to
                    the client. The service role key bypasses all Row Level Security
                    policies, giving full database access to anyone who finds it.
                  </p>
                  <p className="text-muted-foreground">
                    Audit every environment variable in your Lovable app. The Supabase
                    anon key belongs in client-side code. The service role key belongs
                    only in server-side functions. Any third-party API keys — Stripe,
                    SendGrid, OpenAI — must never appear in client bundles. Check your
                    git history as well; if a key was ever committed, it needs to be
                    rotated even after deletion.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                Lovable Production Readiness Checklist
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
                Manually auditing a Lovable-generated codebase takes hours, and the
                results depend on your knowledge of each domain. Vibe Check automates
                the entire process. The CLI plugin runs inside Claude Code and scans
                your actual codebase across all production readiness domains —
                security, monitoring, payments, reliability, legal compliance, and
                more. It identifies specific gaps in your Lovable app and generates
                actionable prompts to fix them. Install it with{' '}
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
                writing any code, the web app at{' '}
                <Link href="/#check-your-app" className="text-primary underline underline-offset-4 hover:text-primary/80">
                  vibe-check.cloud
                </Link>{' '}
                provides guided assessments without requiring code access. Describe
                what you built with Lovable and Vibe Check identifies the domains
                that need attention based on your app&apos;s specific features and
                architecture.
              </p>
            </section>

            <Separator />

            <section className="text-center">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Get Your Lovable App Production Ready
              </h2>
              <p className="mb-6 text-muted-foreground">
                Find out what Lovable missed before your users do.
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
                <Link href="/guides/bolt-production-ready" className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
                  <Card className="transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Is My Bolt App Production Ready?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        The production readiness checklist for apps built with Bolt.new
                        — security, deployment, and everything to check before shipping.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/guides/cursor-production-ready" className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
                  <Card className="transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Is Your Cursor App Production Ready?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        The complete production readiness checklist for apps built with
                        Cursor and other AI coding tools.
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
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
