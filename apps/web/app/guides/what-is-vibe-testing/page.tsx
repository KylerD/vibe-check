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
const PAGE_URL = `${BASE_URL}/guides/what-is-vibe-testing`;

export const metadata: Metadata = {
  title: 'What Is Vibe Testing? A Guide to Testing AI-Generated Code',
  description:
    'Vibe testing is the practice of systematically verifying AI-generated code for hidden bugs, security gaps, and production risks. Learn the vibe testing checklist, tools, and CI/CD integration.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'What Is Vibe Testing? A Guide to Testing AI-Generated Code',
    description:
      'Vibe testing is the practice of systematically verifying AI-generated code for hidden bugs, security gaps, and production risks. Learn the vibe testing checklist, tools, and CI/CD integration.',
    url: PAGE_URL,
    images: [
      {
        url: '/vibe-check-og.png',
        width: 1200,
        height: 630,
        alt: 'What Is Vibe Testing — Vibe Check',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Vibe Testing? A Guide to Testing AI-Generated Code',
    description:
      'Vibe testing is the practice of systematically verifying AI-generated code for hidden bugs, security gaps, and production risks. Learn the vibe testing checklist, tools, and CI/CD integration.',
    images: ['/vibe-check-og.png'],
  },
};

const VIBE_TESTING_CHECKLIST = [
  'Grep for hardcoded secrets, API keys, and tokens in client-side code',
  'Verify every authenticated route actually checks authentication server-side',
  'Test all user inputs with malicious payloads — SQL injection, XSS, command injection',
  'Confirm error handlers return safe messages, not stack traces or internal state',
  'Check that rate limiting exists on auth endpoints, API routes, and form submissions',
  'Validate that database queries use parameterized statements, not string concatenation',
  'Audit dependencies — AI tools pull in packages freely and don\u2019t evaluate supply chain risk',
  'Verify data validation happens server-side, not just in the browser',
  'Look for N+1 query patterns, unbounded data fetches, and missing pagination',
  'Check that environment-specific config isn\u2019t hardcoded for development defaults',
  'Test what happens when external services fail — does the app crash or degrade gracefully?',
  'Verify CORS, CSP, and security headers are set for production, not left wide open',
];

export default function WhatIsVibeTestingGuide() {
  const articleJsonLd = getGuideArticleJsonLd(
    'What Is Vibe Testing? A Complete Guide to Testing AI-Generated Code',
    'Vibe testing is the practice of systematically verifying AI-generated code for hidden bugs, security gaps, and production risks. Learn the vibe testing checklist, tools, and CI/CD integration.',
    PAGE_URL
  );

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Vibe Check', url: BASE_URL },
    { name: 'Guides', url: `${BASE_URL}/guides` },
    { name: 'What Is Vibe Testing', url: PAGE_URL },
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
                What Is Vibe Testing
              </li>
            </ol>
          </nav>

          <header className="mb-8">
            <Badge className="mb-4">Testing Guide</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What Is Vibe Testing? How to Test Code You Didn&apos;t Write
            </h1>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Vibe Testing, Defined
              </h2>
              <p className="mb-4 text-muted-foreground">
                Vibe testing is the practice of systematically reviewing and verifying
                AI-generated code for the specific categories of bugs, security vulnerabilities,
                and production risks that AI coding tools consistently introduce. It&apos;s not a
                replacement for traditional testing — it&apos;s an additional layer designed for
                the reality that most of your codebase was written by something that optimizes
                for &ldquo;it compiles and runs&rdquo; rather than &ldquo;it&apos;s correct,
                secure, and production-ready.&rdquo;
              </p>
              <p className="mb-4 text-muted-foreground">
                The term emerged alongside vibe coding — the practice of building software by
                describing what you want to AI tools like Cursor, Claude Code, Lovable, and Bolt,
                then shipping whatever they generate. Vibe coding made building fast. Vibe testing
                is what keeps that speed from becoming a liability.
              </p>
              <p className="text-muted-foreground">
                If you&apos;ve inherited a codebase that was mostly AI-generated, or you&apos;ve
                been vibe coding and are now preparing to put real users on it, this guide covers
                what to check, why traditional testing misses it, and how to build vibe testing
                into your workflow.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Why Traditional Testing Falls Short for AI-Generated Code
              </h2>
              <p className="mb-4 text-muted-foreground">
                Traditional testing assumes a human wrote the code. That assumption shapes
                everything about how we test: unit tests verify the logic the developer intended,
                integration tests confirm components work together as designed, and code review
                catches mistakes the author made. The entire framework is built around the idea
                that a person understood what they were building and might have made specific,
                human-shaped errors.
              </p>
              <p className="mb-4 text-muted-foreground">
                AI-generated code breaks this model. The failure modes are fundamentally
                different. A human developer who builds a login system probably understands
                authentication and might forget edge cases. An AI that generates a login system
                produces plausible-looking code that may have no real understanding of the
                security model underneath. It might generate a JWT implementation that never
                verifies signatures, or an OAuth flow that stores tokens in localStorage where
                any XSS payload can steal them. The code looks right. It even works in the happy
                path. But the failure isn&apos;t a missed edge case — it&apos;s a fundamental
                misunderstanding of the domain that happens to produce working code.
              </p>
              <p className="mb-4 text-muted-foreground">
                There&apos;s a second problem: AI tools generate their own tests. When you ask
                Cursor to build a feature and write tests for it, you get tests that validate
                the AI&apos;s implementation of the feature — not the feature&apos;s actual
                requirements. If the AI implemented the feature wrong in a subtle way, the tests
                will confirm the wrong behavior passes. You end up with 100% test coverage and
                zero confidence, because the same blind spots that produced the code also
                produced the tests.
              </p>
              <p className="text-muted-foreground">
                Vibe testing addresses this gap. Instead of testing whether the code does what
                the AI intended, it tests whether the code does what production actually requires:
                secure authentication, safe data handling, proper error boundaries, and all the
                non-functional requirements that AI tools consistently skip.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                The Vibe Testing Checklist
              </h2>
              <p className="mb-6 text-muted-foreground">
                This is not an exhaustive list. It&apos;s a prioritized set of the issues that
                appear most frequently in AI-generated codebases, organized by the damage they
                cause when missed.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Security Patterns
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Security is where AI-generated code fails most dangerously, because the
                    failures are invisible during development. The app works perfectly — it just
                    also works perfectly for attackers.
                  </p>
                  <p className="mb-3 text-muted-foreground">
                    Start by grepping your codebase for hardcoded secrets. AI tools embed API
                    keys, database URLs, and tokens directly in source files with alarming
                    frequency. Check client-side bundles especially — a Stripe secret key in a
                    React component is a live credit card processing credential visible to anyone
                    who opens DevTools.
                  </p>
                  <p className="mb-3 text-muted-foreground">
                    Next, trace every authenticated route. AI tools often add auth checks to the
                    UI layer (hiding a button, redirecting in a useEffect) but skip server-side
                    verification entirely. A direct API call bypasses the UI, and if the server
                    doesn&apos;t check the session, any unauthenticated request succeeds. This is
                    the single most common security gap in vibe coded apps.
                  </p>
                  <p className="text-muted-foreground">
                    Finally, test input handling. AI-generated code frequently builds SQL queries
                    with string interpolation, renders user input as raw HTML, and passes
                    unsanitized data to shell commands. These aren&apos;t edge cases — they&apos;re
                    the default patterns that AI tools reach for unless specifically instructed
                    otherwise. For a deeper dive, see the{' '}
                    <Link href="/guides/vibe-coding-security" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      vibe coding security guide
                    </Link>.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Production Readiness
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    AI-generated code is optimized for the demo. It works when one user hits
                    the happy path. Production is not the demo. Production is a thousand
                    concurrent users hitting edge cases your AI never considered while your
                    third-party payment provider is having an outage.
                  </p>
                  <p className="mb-3 text-muted-foreground">
                    Check error handling first. AI tools wrap code in try/catch blocks that
                    either swallow errors silently or return the full stack trace to the client.
                    Neither is acceptable. Every error boundary should log the error with enough
                    context to debug it, return a safe message to the user, and surface in your
                    monitoring system. If your app doesn&apos;t have a monitoring system, that is
                    the first thing to fix.
                  </p>
                  <p className="mb-3 text-muted-foreground">
                    Check rate limiting. AI tools almost never add it. Without rate limiting,
                    a single script can exhaust your API quotas, run up your cloud bill, or
                    brute-force every account on your platform. Authentication endpoints, form
                    submissions, and any route that triggers external API calls need rate limits.
                  </p>
                  <p className="text-muted-foreground">
                    Check data validation. AI tools validate on the client and trust on the
                    server. Every API route that accepts user input needs server-side validation
                    with a schema library like Zod — not just type checking, but business logic
                    validation. Is that quantity field actually a positive integer? Is that email
                    address in a valid format? Is that date in the future when it should be?
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Architecture Smells
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    AI tools have a distinctive architectural fingerprint. They over-abstract
                    early, create unnecessary wrapper classes, and pull in dependencies for
                    problems that don&apos;t exist yet. A three-page marketing site doesn&apos;t
                    need a state management library. A CRUD app doesn&apos;t need an event
                    sourcing framework.
                  </p>
                  <p className="mb-3 text-muted-foreground">
                    Audit your dependency tree. AI tools add packages without evaluating
                    maintenance status, bundle size, or security posture. You might find packages
                    with known vulnerabilities, packages that haven&apos;t been updated in years,
                    or five different libraries that all do the same thing because the AI used
                    a different one each time it generated a feature.
                  </p>
                  <p className="text-muted-foreground">
                    Look for dead code. AI tools generate utility functions, helper classes, and
                    abstraction layers that nothing uses — artifacts of earlier prompts that were
                    superseded but never cleaned up. Dead code isn&apos;t just clutter; it&apos;s
                    surface area for bugs and a tax on every developer who has to understand
                    the codebase.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Performance
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    AI-generated code works. It does not necessarily work efficiently. The
                    performance patterns AI tools produce are the ones most commonly found in
                    tutorials and Stack Overflow answers — which are optimized for clarity, not
                    for scale.
                  </p>
                  <p className="mb-3 text-muted-foreground">
                    The most common issue is N+1 queries. AI tools fetch a list of items, then
                    loop through and fetch related data for each item individually. With 10 items,
                    this is 11 database queries instead of 2. With 1,000 items, it&apos;s 1,001
                    queries, and your database is the bottleneck. Check every loop that contains
                    a database call or API request.
                  </p>
                  <p className="mb-3 text-muted-foreground">
                    Check for unbounded data fetching. AI tools write queries that fetch all
                    records without pagination or limits. This works in development with 50 rows
                    in the database. It crashes in production when the table has 500,000 rows and
                    your server runs out of memory trying to serialize the response.
                  </p>
                  <p className="text-muted-foreground">
                    Look at database indexes. AI tools create tables and write queries but
                    rarely add indexes for the columns being filtered and sorted. Your queries
                    work fine until the table grows past a few thousand rows, then response times
                    climb from milliseconds to seconds. Check every WHERE clause and ORDER BY
                    against your index definitions.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                The Checklist
              </h2>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Vibe Test Your Codebase
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {VIBE_TESTING_CHECKLIST.map((item) => (
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
                Vibe Testing Tools
              </h2>
              <p className="mb-4 text-muted-foreground">
                No single tool covers everything. A practical vibe testing setup combines
                several approaches, each targeting a different failure mode.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-medium">Static Analysis</h3>
                  <p className="text-muted-foreground">
                    ESLint with security-focused plugins (eslint-plugin-security,
                    eslint-plugin-no-secrets) catches hardcoded credentials and common injection
                    patterns. Semgrep provides deeper taint analysis — tracking data flow from
                    user input to dangerous sinks like SQL queries and HTML rendering. These
                    tools run fast, catch the mechanical issues, and integrate into any CI
                    pipeline.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Dependency Auditing</h3>
                  <p className="text-muted-foreground">
                    npm audit, Snyk, and Socket.dev scan your dependency tree for known
                    vulnerabilities and supply chain risks. This matters more for AI-generated
                    code because AI tools add dependencies without evaluating them. Run these on
                    every PR, not just periodically.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">AI-Aware Code Review</h3>
                  <p className="text-muted-foreground">
                    Tools like{' '}
                    <Link href="/features" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      Vibe Check
                    </Link>{' '}
                    are designed specifically for AI-generated codebases. Rather than looking
                    for generic code quality issues, they scan for the specific patterns AI tools
                    produce: missing server-side auth checks, client-side-only validation,
                    hardcoded development configs, and the other failure modes covered in this
                    guide. Vibe Check runs as a plugin inside your AI coding tool and scans
                    across 12 production domains, generating fix prompts you can apply directly.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Manual Review</h3>
                  <p className="text-muted-foreground">
                    Automated tools catch patterns. They don&apos;t catch logic errors, business
                    rule violations, or architectural decisions that are technically valid but
                    wrong for your specific context. Every AI-generated feature needs at least
                    one human reading the code with the question: &ldquo;does this actually do
                    what we need, or does it do what the AI assumed we need?&rdquo; This is
                    especially important for payment flows, permission systems, and anything
                    involving user data.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Vibe Testing in CI/CD
              </h2>
              <p className="mb-4 text-muted-foreground">
                Vibe testing belongs in your CI pipeline, not in a quarterly audit. The whole
                point is catching issues before they reach production, and in a vibe coding
                workflow where features ship in hours, &ldquo;we&apos;ll review it later&rdquo;
                means &ldquo;it&apos;s already in production with real user data.&rdquo;
              </p>
              <p className="mb-4 text-muted-foreground">
                A minimal CI vibe testing pipeline has three stages. First, static analysis
                runs on every commit — ESLint security rules, secret detection, and dependency
                auditing. These are fast (under 30 seconds) and catch the highest-severity
                issues. Second, an AI-aware scan runs on every pull request — tools like Vibe
                Check or Semgrep with custom rules for AI-generated patterns. This is slower
                (1-3 minutes) but catches architectural and logic issues that static analysis
                misses. Third, a human reviews every PR that touches authentication, payments,
                data access, or user permissions. No exceptions.
              </p>
              <p className="text-muted-foreground">
                The goal is not to slow down the vibe coding workflow. It&apos;s to make the
                feedback loop tight enough that issues get caught in the PR, not in production.
                A developer who sees &ldquo;missing server-side auth check on /api/admin&rdquo;
                in their PR within 2 minutes will fix it immediately. The same developer
                discovering it in a security audit three months later has to context-switch back
                into code they&apos;ve forgotten, while the vulnerability has been exploitable
                the entire time.
              </p>
            </section>

            <Separator />

            <section className="text-center">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Vibe Test Your Codebase Now
              </h2>
              <p className="mb-6 text-muted-foreground">
                Find out what your AI coding tool missed — across security, performance,
                and 10 other production domains.
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
                      Vibe Coding Security: How to Ship AI-Built Apps Without Getting Hacked
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      The top security risks in AI-generated code and how to fix them —
                      authentication, file uploads, API keys, input validation, and payments.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </section>
          </div>

          <RelatedGuides slug="what-is-vibe-testing" />
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
