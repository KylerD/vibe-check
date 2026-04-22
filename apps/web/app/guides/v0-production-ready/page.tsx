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
const PAGE_URL = `${BASE_URL}/guides/v0-production-ready`;

export const metadata: Metadata = {
  title: 'Is My v0 App Production Ready? Security and Quality Checklist',
  description:
    'Built an app with v0? Great UI is just the start. The production checklist for auth, API routes, database security, environment variables, and error boundaries.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Is My v0 App Production Ready? Security and Quality Checklist',
    description:
      'Built an app with v0? Great UI is just the start. The production checklist for auth, API routes, database security, environment variables, and error boundaries.',
    url: PAGE_URL,
    images: [
      {
        url: '/vibe-check-og.png',
        width: 1200,
        height: 630,
        alt: 'v0 Production Ready Checklist — Vibe Check',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is My v0 App Production Ready? Security and Quality Checklist',
    description:
      'Built an app with v0? Great UI is just the start. The production checklist for auth, API routes, database security, environment variables, and error boundaries.',
    images: ['/vibe-check-og.png'],
  },
};

const CHECKLIST_ITEMS = [
  'Authentication endpoints have rate limiting configured',
  'Session tokens expire and rotate on privilege changes',
  'API route handlers validate and sanitise all input',
  'Environment variables are never hardcoded in source code',
  'Error boundaries exist on every route and major component tree',
  'Error tracking is configured with Sentry or equivalent',
  'Health check endpoint exists and is monitored externally',
  'Database queries use parameterised statements, not string concatenation',
  'Payment webhooks verify provider signatures before processing',
  'Database has automated backups on a tested restore schedule',
  'HTTPS is enforced on every route with HSTS headers',
  'CORS is configured to allow only your own domains',
  'File uploads are validated by type, size, and scanned for malware',
  'Privacy policy exists and is linked from registration flows',
  'Server Components do not leak sensitive data to the client',
];

export default function V0ProductionReadyGuide() {
  const articleJsonLd = getGuideArticleJsonLd(
    'Is My v0 App Production Ready? Security and Quality Checklist',
    'Built an app with v0? Great UI is just the start. The production checklist for auth, API routes, database security, environment variables, and error boundaries.',
    PAGE_URL
  );

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Vibe Check', url: BASE_URL },
    { name: 'Guides', url: `${BASE_URL}/guides` },
    { name: 'v0 Production Ready', url: PAGE_URL },
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
                v0 Production Ready
              </li>
            </ol>
          </nav>

          <header className="mb-8">
            <Badge className="mb-4">Production Readiness Guide</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Is My v0 App Production Ready? The Complete Checklist
            </h1>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                What v0 Gets Right
              </h2>
              <p className="mb-4 text-muted-foreground">
                v0 by Vercel generates some of the best UI code of any AI tool on the
                market. Describe a component or page in natural language and v0
                produces polished React code using Next.js App Router conventions,
                Tailwind CSS, and shadcn/ui components. The output is clean,
                accessible, and follows modern patterns — proper semantic HTML,
                responsive design, dark mode support, and sensible component
                decomposition. For frontend development, v0 genuinely saves days of
                work per feature.
              </p>
              <p className="mb-4 text-muted-foreground">
                The Next.js integration is a particular strength. v0 understands the
                App Router, generates proper Server Components and Client Components,
                uses the right file conventions for layouts, loading states, and error
                boundaries, and produces code that deploys cleanly to Vercel. If your
                goal is a beautiful, functional frontend, v0 delivers at a level that
                is hard to match manually.
              </p>
              <p className="text-muted-foreground">
                The limitation is scope. v0 excels at the presentation layer — what
                users see and interact with. But production applications are icebergs:
                the visible UI is a fraction of what needs to work correctly. Behind
                every polished dashboard is authentication logic, API route security,
                database access patterns, environment variable management, error
                tracking, and compliance requirements. These are the layers that v0
                either generates minimally or skips entirely.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                The Production Gaps in v0-Generated Code
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Authentication and Session Management
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    When you ask v0 to build a login page, you get a beautiful login
                    page — well-designed form fields, proper validation feedback,
                    accessible labels, and a clean layout. What you do not get is the
                    backend logic that makes authentication secure. Rate limiting on
                    login attempts, session expiration policies, token rotation on
                    privilege changes, account lockout after failed attempts, and CSRF
                    protection are all absent unless you specifically request them.
                  </p>
                  <p className="text-muted-foreground">
                    v0-generated auth UIs often connect to providers like NextAuth.js
                    or Clerk, but the configuration is minimal — default settings with
                    no hardening. Default session durations may be too long. OAuth
                    callback URLs may not be validated strictly. Middleware that
                    protects authenticated routes may cover some paths but miss API
                    routes or Server Actions. Review the{' '}
                    <Link href="/features/auth" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      authentication checklist
                    </Link>{' '}
                    to audit every layer of your auth implementation.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    API Routes and Server Actions
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    v0 generates API route handlers and Server Actions that work, but
                    they consistently lack defensive programming. Input validation is
                    minimal or absent — request bodies are used directly without schema
                    validation. Authentication checks may be missing from individual
                    routes, relying solely on middleware that might not cover every
                    path. Error responses may leak internal details like stack traces
                    or database error messages.
                  </p>
                  <p className="text-muted-foreground">
                    Every API route and Server Action in your v0 app needs to validate
                    its input with a schema library like Zod, verify that the
                    requesting user is authenticated and authorised, return generic
                    error messages to the client, and log detailed errors server-side
                    for debugging. Without these layers, your API is a direct attack
                    surface — and AI-generated APIs have predictable patterns that
                    make them easier to probe.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Database Security and Access Patterns
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    When v0 generates code that interacts with a database — through
                    Prisma, Drizzle, or raw queries — it focuses on making the query
                    work. What it rarely addresses is whether the query is safe under
                    adversarial conditions. String interpolation in queries opens the
                    door to SQL injection. Missing authorisation checks mean any
                    authenticated user can access any record. Queries that work fine
                    with ten records may be catastrophically slow with ten thousand.
                  </p>
                  <p className="text-muted-foreground">
                    Production database access requires parameterised queries
                    exclusively, authorisation checks that verify the requesting user
                    owns the requested resource, proper indexing for queries that
                    appear in list views or search results, and connection pooling to
                    prevent exhaustion under load. The{' '}
                    <Link href="/features/data-export" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      data management checklist
                    </Link>{' '}
                    covers backup, access, and reliability requirements.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Environment Variables and Configuration
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    v0 generates code that references environment variables, but the
                    boundary between server-side and client-side secrets is not always
                    handled correctly. In Next.js, any environment variable prefixed
                    with{' '}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                      NEXT_PUBLIC_
                    </code>{' '}
                    is bundled into client-side JavaScript and visible to anyone who
                    views your page source. Database connection strings, API secret
                    keys, and service credentials must never have this prefix.
                  </p>
                  <p className="text-muted-foreground">
                    Audit every environment variable in your v0 app. Anything with{' '}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                      NEXT_PUBLIC_
                    </code>{' '}
                    should be safe for public exposure — publishable Stripe keys,
                    analytics IDs, public API endpoints. Everything else should only be
                    accessible in Server Components, API routes, and Server Actions. If
                    a secret was ever exposed client-side, rotate it immediately.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Error Boundaries and Monitoring
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    v0 understands Next.js error boundary conventions and may generate{' '}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                      error.tsx
                    </code>{' '}
                    files, but the implementation is usually minimal — a generic
                    &ldquo;Something went wrong&rdquo; message with a retry button.
                    There is no error reporting to an external service, no structured
                    logging, no way to identify which users are affected by errors, and
                    no alerting when error rates spike.
                  </p>
                  <p className="text-muted-foreground">
                    Production apps need error tracking that captures full context —
                    the user, the route, the request payload, and the stack trace.
                    Sentry or a similar service should be integrated at both the
                    server and client level. Health check endpoints should exist for
                    external monitoring. Not-found pages should be instrumented to
                    detect broken links and crawl errors. The{' '}
                    <Link href="/features/monitoring" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      monitoring checklist
                    </Link>{' '}
                    covers the complete observability stack.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                v0 Production Readiness Checklist
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
                Manually auditing a v0-generated codebase across every production
                domain takes hours. Vibe Check automates the entire process. The CLI
                plugin runs inside Claude Code and scans your actual codebase across
                all production readiness domains — security, monitoring, payments,
                reliability, legal compliance, and more. It identifies specific gaps
                in your v0 app and generates actionable prompts to fix them. Install
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
                what you built with v0 and Vibe Check identifies the domains that
                need attention based on your app&apos;s specific features and
                architecture.
              </p>
            </section>

            <Separator />

            <section className="text-center">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Get Your v0 App Production Ready
              </h2>
              <p className="mb-6 text-muted-foreground">
                Find out what v0 missed before your users do.
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
                <Link href="/guides/bolt-production-ready" className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
                  <Card className="transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Is My Bolt App Production Ready?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        The production readiness checklist for Bolt.new apps — security,
                        deployment, and everything to check before shipping.
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
              </div>
            </section>
          </div>

          <RelatedGuides slug="v0-production-ready" />
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
