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
const PAGE_URL = `${BASE_URL}/guides/vibe-coding-failures`;

export const metadata: Metadata = {
  title: 'Vibe Coding Failures of 2026: What Actually Went Wrong',
  description:
    'The biggest AI-generated code failures of 2026 — real incidents, what broke, and what a production readiness review would have caught before shipping.',
  keywords: [
    'vibe coding failures',
    'AI generated code bugs',
    'AI code security incidents',
    'vibe coding risks',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Vibe Coding Failures of 2026: What Actually Went Wrong',
    description:
      'The biggest AI-generated code failures of 2026 — real incidents, what broke, and what a production readiness review would have caught before shipping.',
    url: PAGE_URL,
    images: [
      {
        url: '/vibe-check-og.png',
        width: 1200,
        height: 630,
        alt: 'Vibe Coding Failures of 2026 — Vibe Check',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Coding Failures of 2026: What Actually Went Wrong',
    description:
      'The biggest AI-generated code failures of 2026 — real incidents, what broke, and what a production readiness review would have caught before shipping.',
    images: ['/vibe-check-og.png'],
  },
};

const PATTERN_ITEMS = [
  'Boundary conditions the AI didn\u2019t consider',
  'Security defaults assumed instead of enforced',
  'Defensive patterns skipped entirely',
  'Data exposure unrestricted at the API layer',
];

const ACTION_ITEMS = [
  {
    title: 'Automated scanning at every push',
    description:
      'Run production readiness checks as part of your CI pipeline, not as an afterthought. Tools like Vibe Check catch the patterns AI tools consistently miss — boundary conditions, missing auth rejection, absent idempotency keys.',
  },
  {
    title: 'Human review at trust boundaries',
    description:
      'Auth, payments, data access, and anything that touches PII. These are the areas where AI-generated code fails silently. A senior engineer reviewing these boundaries for 30 minutes catches more than a week of automated testing.',
  },
  {
    title: 'Test what AI won\u2019t',
    description:
      'Boundary conditions at exact multiples. Malformed input on every endpoint. Concurrent access to shared state. Race conditions in webhook handlers. These are the test cases AI tools never write because they never think to.',
  },
  {
    title: 'Default-deny everything',
    description:
      'Every auth handler should reject by default. Every API response should explicitly select fields. Every webhook handler should deduplicate. The cost of being explicit is minutes. The cost of being implicit is incidents.',
  },
];

export default function VibeCodingFailuresGuide() {
  const articleJsonLd = getGuideArticleJsonLd(
    'Vibe Coding Failures of 2026: What Actually Went Wrong',
    'The biggest AI-generated code failures of 2026 — real incidents, what broke, and what a production readiness review would have caught before shipping.',
    PAGE_URL
  );

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Vibe Check', url: BASE_URL },
    { name: 'Guides', url: `${BASE_URL}/guides` },
    { name: 'Vibe Coding Failures', url: PAGE_URL },
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
                Vibe Coding Failures
              </li>
            </ol>
          </nav>

          <header className="mb-8">
            <Badge className="mb-4">The Crash File</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Vibe Coding Failures of 2026: What Actually Went Wrong
            </h1>
          </header>

          <div className="space-y-10">
            <section>
              <p className="mb-4 text-muted-foreground">
                AI-generated code ships fast. Most of it works. Some of it
                doesn&apos;t. When it fails, it fails in ways traditional testing
                never anticipated — not syntax errors or crashed builds, but subtle
                logic gaps that pass every test and break in production.
              </p>
              <p className="text-muted-foreground">
                This is the crash file. A curated collection of the biggest
                AI-generated code incidents of 2026 — what went wrong, why it
                wasn&apos;t caught, and what a production readiness review would
                have flagged before it shipped. Not fear-mongering. Just the
                record.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                The Incidents
              </h2>

              <div className="space-y-10">
                <div>
                  <h3 className="mb-1 text-xl font-medium">
                    1. The Order Processing Edge Case
                  </h3>
                  <p className="mb-3 text-sm text-muted-foreground/70">
                    Pagination logic &middot; Data processing pipeline
                  </p>
                  <p className="mb-3 text-muted-foreground">
                    An AI-generated pagination loop processed records in batches of
                    100. Standard pattern, nothing unusual. Except when the total
                    record count was an exact multiple of the page size — 500, 1000,
                    10000 — the final batch was silently skipped. The loop
                    termination condition used a strict less-than comparison instead
                    of less-than-or-equal, so a dataset of exactly 1000 records
                    processed 900 and reported success.
                  </p>
                  <p className="mb-3 text-muted-foreground">
                    Millions of order records were processed incorrectly over weeks
                    before a finance reconciliation flagged the discrepancy. The fix
                    was a single character change. The data recovery took three
                    months.
                  </p>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        What review would have caught
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Boundary condition testing. AI-generated loops consistently
                        miss exact-multiple edge cases because the training data
                        overwhelmingly contains off-by-one errors that get fixed —
                        not off-by-one errors hiding in loop termination conditions.
                        A production readiness scan flags pagination logic without
                        boundary tests as a{' '}
                        <Link
                          href="/guides/vibe-coding-risks"
                          className="text-primary underline underline-offset-4 hover:text-primary/80"
                        >
                          known risk pattern
                        </Link>
                        .
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="mb-1 text-xl font-medium">
                    2. The Auth Bypass That Looked Like a Feature
                  </h3>
                  <p className="mb-3 text-sm text-muted-foreground/70">
                    JWT middleware &middot; Authentication
                  </p>
                  <p className="mb-3 text-muted-foreground">
                    An AI-generated authentication middleware wrapped JWT token
                    parsing in a try-catch block — reasonable defensive programming.
                    The catch block logged the error and called{' '}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                      next()
                    </code>{' '}
                    to continue the request chain. This meant that any request with
                    a malformed, expired, or entirely absent JWT token was silently
                    treated as authenticated. Default-allow instead of default-deny.
                  </p>
                  <p className="mb-3 text-muted-foreground">
                    The bypass went undetected for 11 days. Every automated test
                    passed because they all used valid tokens. Nobody tested with an
                    invalid token because the middleware was &ldquo;already
                    handling&rdquo; errors — the catch block proved it. The
                    vulnerability was discovered when an expired session still
                    loaded user data.
                  </p>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        What review would have caught
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Auth catch blocks that don&apos;t explicitly reject. This is
                        one of the most common patterns in AI-generated auth code —
                        the model knows to add error handling but defaults to
                        permissive fallthrough. A{' '}
                        <Link
                          href="/guides/vibe-coding-security"
                          className="text-primary underline underline-offset-4 hover:text-primary/80"
                        >
                          security-focused review
                        </Link>{' '}
                        checks every auth code path to confirm that the default
                        outcome is rejection, not continuation.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="mb-1 text-xl font-medium">
                    3. The Database That Grew 400x Overnight
                  </h3>
                  <p className="mb-3 text-sm text-muted-foreground/70">
                    Webhook handlers &middot; Data integrity
                  </p>
                  <p className="mb-3 text-muted-foreground">
                    An AI-generated webhook handler for a payment provider processed
                    events correctly — once. It had no idempotency key, no
                    deduplication logic, and no rate limiting. When the payment
                    provider experienced a temporary outage and retried a backlog of
                    webhook deliveries, every event was processed multiple times.
                    The database grew from 2GB to 800GB overnight.
                  </p>
                  <p className="mb-3 text-muted-foreground">
                    The storage costs were the least of the problems. Duplicate
                    payment records triggered duplicate fulfillment. Customers
                    received multiple shipments. Refund logic double-credited
                    accounts. The cascade took weeks to unwind because the duplicate
                    records were structurally identical to legitimate ones — there
                    was no idempotency key to distinguish originals from retries.
                  </p>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        What review would have caught
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Missing idempotency keys, absent deduplication, and no rate
                        limiting on inbound webhooks. AI tools generate webhook
                        handlers that process the happy path perfectly but treat
                        every delivery as unique. Production readiness checks flag
                        webhook endpoints without idempotency as critical — because
                        every webhook provider retries, and every retry without
                        deduplication creates duplicates.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="mb-1 text-xl font-medium">
                    4. The PII Leak Nobody Tested For
                  </h3>
                  <p className="mb-3 text-sm text-muted-foreground/70">
                    API response payloads &middot; Data exposure
                  </p>
                  <p className="mb-3 text-muted-foreground">
                    An AI-generated API endpoint returned full user objects from the
                    database — every field, every column, including hashed passwords,
                    email verification tokens, internal role flags, and billing
                    metadata. The frontend only rendered names and avatars, so in the
                    browser it looked fine. Nobody opened the Network tab.
                  </p>
                  <p className="mb-3 text-muted-foreground">
                    The API was public. No authentication required for the user
                    listing endpoint — it was a directory feature. Every user&apos;s
                    hashed password, email, and internal metadata was available to
                    anyone who sent a GET request. The exposure was reported through
                    a responsible disclosure program after six weeks in production.
                  </p>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        What review would have caught
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        API response schema validation and explicit field selection.
                        AI tools default to returning entire database objects because
                        that&apos;s the simplest working implementation. A production
                        readiness scan checks for{' '}
                        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                          SELECT *
                        </code>{' '}
                        patterns and API endpoints that return unfiltered data — both
                        are{' '}
                        <Link
                          href="/features"
                          className="text-primary underline underline-offset-4 hover:text-primary/80"
                        >
                          standard checklist items
                        </Link>{' '}
                        in any security review.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                The Pattern
              </h2>
              <p className="mb-6 text-muted-foreground">
                These incidents share a structure. The AI-generated code worked
                correctly in the expected case. It passed tests. It shipped. And it
                failed at exactly the boundary between &ldquo;works in
                development&rdquo; and &ldquo;survives production.&rdquo; Four
                failure modes recur across every incident:
              </p>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {PATTERN_ITEMS.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <p className="mt-4 text-muted-foreground">
                None of these are novel vulnerability classes. They&apos;re the same
                gaps that experienced engineers have caught in code review for
                decades. The difference is volume — AI tools generate code faster
                than humans can review it, and the gaps are distributed across every
                file instead of concentrated in one developer&apos;s commits.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                What To Do About It
              </h2>
              <div className="space-y-6">
                {ACTION_ITEMS.map((actionItem) => (
                  <div key={actionItem.title}>
                    <h3 className="mb-2 text-lg font-medium">
                      {actionItem.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {actionItem.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            <section className="text-center">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Don&apos;t Ship the Next Incident
              </h2>
              <p className="mb-6 text-muted-foreground">
                Every failure on this page had a detectable pattern before it
                shipped. Scan your codebase before production does the scanning for
                you.
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
                <Link
                  href="/guides/vibe-coding-security"
                  className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                >
                  <Card className="transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Vibe Coding Security Guide
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        The top security risks in AI-generated code and how to fix
                        them before they reach production.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link
                  href="/guides/vibe-coding-risks"
                  className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                >
                  <Card className="transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Vibe Coding Risks
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Understanding the risk landscape when shipping AI-generated
                        code to production.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </section>
          </div>

          <RelatedGuides slug="vibe-coding-failures" />
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
