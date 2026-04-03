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
const PAGE_URL = `${BASE_URL}/guides/vibe-coding-risks`;

export const metadata: Metadata = {
  title: 'Vibe Coding Risks: The Full Risk Landscape of AI-Generated Code',
  description:
    'Beyond security — the complete guide to vibe coding risks. Tech debt, reliability failures, scalability traps, compliance gaps, and how to add guardrails without slowing down.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Vibe Coding Risks: The Full Risk Landscape of AI-Generated Code',
    description:
      'Beyond security — the complete guide to vibe coding risks. Tech debt, reliability failures, scalability traps, compliance gaps, and how to add guardrails without slowing down.',
    url: PAGE_URL,
    images: [
      {
        url: '/vibe-check-og.png',
        width: 1200,
        height: 630,
        alt: 'Vibe Coding Risks — The Full Risk Landscape — Vibe Check',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Coding Risks: The Full Risk Landscape of AI-Generated Code',
    description:
      'Beyond security — the complete guide to vibe coding risks. Tech debt, reliability failures, scalability traps, compliance gaps, and how to add guardrails without slowing down.',
    images: ['/vibe-check-og.png'],
  },
};

const GUARDRAIL_CHECKLIST = [
  'Run a static analysis tool (ESLint, Semgrep, or SonarQube) on every AI-generated commit',
  'Enforce type-checking at the boundary — validate all external input with Zod, io-ts, or equivalent',
  'Require at least one integration test per API route before merge',
  'Use a secret scanner (gitleaks, trufflehog) in CI to catch hardcoded credentials',
  'Set database query timeouts and connection pool limits explicitly — never use defaults',
  'Add structured logging to every error path — not just console.log',
  'Review all AI-generated database queries for N+1 patterns and missing indexes',
  'Check every API endpoint for authentication and authorization — AI often skips one or both',
  'Audit third-party packages the AI added — check download counts, maintenance status, and CVEs',
  'Load test with realistic data volumes before launch — AI code is tested against empty databases',
];

export default function VibeCodingRisksGuide() {
  const articleJsonLd = getGuideArticleJsonLd(
    'Vibe Coding Risks: The Full Risk Landscape of AI-Generated Code',
    'Beyond security — the complete guide to vibe coding risks. Tech debt, reliability failures, scalability traps, compliance gaps, and how to add guardrails without slowing down.',
    PAGE_URL
  );

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Vibe Check', url: BASE_URL },
    { name: 'Guides', url: `${BASE_URL}/guides` },
    { name: 'Vibe Coding Risks', url: PAGE_URL },
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
                Vibe Coding Risks
              </li>
            </ol>
          </nav>

          <header className="mb-8">
            <Badge className="mb-4">Risk Guide</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Vibe Coding Risks: What AI-Generated Code Gets Wrong Beyond Security
            </h1>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                The Risk Goes Deeper Than Security
              </h2>
              <p className="mb-4 text-muted-foreground">
                Most conversations about vibe coding risk start and end with security.
                That&apos;s important — AI-generated code has well-documented{' '}
                <Link href="/guides/vibe-coding-security" className="text-primary underline underline-offset-4 hover:text-primary/80">
                  security vulnerabilities
                </Link>
                {' '}— but it&apos;s only one dimension of a much larger problem. Security
                gets attention because the consequences are dramatic: data breaches, stolen
                credentials, financial loss. But the risks that actually kill most vibe-coded
                projects are quieter: mounting tech debt, reliability failures at scale,
                compliance violations discovered too late, and maintenance costs that make
                the codebase unmovable.
              </p>
              <p className="mb-4 text-muted-foreground">
                AI coding tools are optimized for one thing: generating code that appears to
                work when you test it locally with a single user and an empty database. That
                is a useful capability. It is also a profoundly incomplete one. The gap
                between &ldquo;works in development&rdquo; and &ldquo;survives
                production&rdquo; is where businesses fail, and AI tools are structurally
                unable to close that gap on their own because they don&apos;t understand
                your business context, your scale requirements, or your regulatory
                obligations.
              </p>
              <p className="text-muted-foreground">
                This guide maps the full risk landscape — not to discourage vibe coding, but
                to help you do it with eyes open. The developers who get burned aren&apos;t
                the ones who use AI tools. They&apos;re the ones who trust AI output without
                verification.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                The &ldquo;Looks Plausible&rdquo; Problem
              </h2>
              <p className="mb-4 text-muted-foreground">
                AI-generated code has a unique failure mode that hand-written code
                doesn&apos;t: it always looks correct. When a junior developer writes bad
                code, it often looks bad — inconsistent naming, awkward structure, obvious
                gaps. When an AI writes bad code, it looks like it was written by a senior
                engineer who happened to make several critical architectural mistakes. The
                formatting is clean. The variable names are sensible. The patterns look
                familiar. And the bugs are invisible unless you know exactly what to look
                for.
              </p>
              <p className="mb-4 text-muted-foreground">
                This is the fundamental challenge. AI models generate code by predicting what
                code should look like based on patterns in their training data. They are
                exceptionally good at producing plausible output. They are not reasoning
                about whether a retry mechanism actually handles the failure modes your
                specific system will encounter, or whether a database query will perform
                acceptably when the table has ten million rows instead of ten.
              </p>
              <p className="text-muted-foreground">
                The &ldquo;looks plausible&rdquo; problem compounds across an entire
                codebase. Each individual file passes a visual code review. But the system as
                a whole accumulates dozens of subtle issues — missing timeouts here, no
                pagination there, an unindexed query somewhere else — that collectively make
                the application fragile. No single issue looks alarming. The aggregate is a
                production incident waiting to happen.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                Failure Modes by Category
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Security: The OWASP Patterns AI Loves to Generate
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    AI tools consistently reproduce the vulnerabilities catalogued in the
                    OWASP Top 10 — not because they&apos;re generating intentionally
                    insecure code, but because their training data is dominated by tutorials
                    and examples that prioritize clarity over hardening. Cross-site scripting
                    appears when AI renders user input directly into HTML without
                    sanitization. SQL injection surfaces when AI builds queries through
                    string concatenation instead of parameterized statements. Broken access
                    control is endemic — AI generates endpoints that check whether a user is
                    authenticated but rarely verifies they&apos;re authorized to access the
                    specific resource they&apos;re requesting.
                  </p>
                  <p className="text-muted-foreground">
                    The pattern is consistent across every major AI coding tool. When asked
                    to build a feature, the AI builds the feature. It does not build the
                    security boundary around the feature. For a thorough walkthrough of
                    these patterns, see our{' '}
                    <Link href="/guides/vibe-coding-security" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      vibe coding security guide
                    </Link>.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Reliability: The Happy Path Is the Only Path
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    AI-generated code almost universally handles the success case and
                    ignores everything else. API calls don&apos;t have timeouts — if a
                    third-party service hangs, your application hangs with it. There are no
                    retries with exponential backoff for transient failures. Circuit breakers
                    don&apos;t exist. Error handling, when present, consists of catching an
                    exception and logging it, with no recovery strategy and no user-facing
                    fallback.
                  </p>
                  <p className="mb-3 text-muted-foreground">
                    Database connections are particularly dangerous. AI code typically opens
                    connections without pooling, doesn&apos;t handle connection timeouts, and
                    never implements health checks. In production, this means your application
                    silently degrades when the database is under load, connections leak over
                    time, and a brief database restart cascades into an application-wide
                    outage because nothing reconnects gracefully.
                  </p>
                  <p className="text-muted-foreground">
                    The reliability gap is invisible in development because your local
                    database never goes down, your network never drops packets, and you
                    never have concurrent users competing for resources. Every one of these
                    assumptions breaks in production.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Scalability: Code That Works at 10 Rows, Breaks at 10,000
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    The most common scalability failure in AI-generated code is the N+1
                    query. AI tools love to write clean, readable data-fetching patterns that
                    load a list of items and then make a separate database query for each
                    item&apos;s related data. With 10 items, this executes 11 queries and
                    takes milliseconds. With 10,000 items, it executes 10,001 queries and
                    brings your database to its knees.
                  </p>
                  <p className="mb-3 text-muted-foreground">
                    Missing pagination is equally pervasive. AI-generated list endpoints
                    return all results by default. The developer tests with a dozen records
                    and everything is fast. Six months later, the table has 500,000 rows and
                    every list page loads the entire table into memory. AI also generates
                    queries without considering indexes — it creates the schema, adds the
                    queries, and never thinks about which columns need indexes because
                    indexing is a production concern, not a functionality concern.
                  </p>
                  <p className="text-muted-foreground">
                    Other scalability traps include loading entire files into memory instead
                    of streaming, synchronous processing where async would be appropriate,
                    missing caching for expensive computations, and webhook handlers that
                    process inline instead of queuing work for background processing.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Maintainability: Over-Engineered, Under-Understood
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    AI coding tools have a tendency to reach for patterns and abstractions
                    that aren&apos;t warranted by the problem they&apos;re solving. A
                    simple data fetch becomes a repository pattern wrapped in a service layer
                    wrapped in a factory. A straightforward form becomes a multi-step wizard
                    with a state machine. The code works, but nobody on your team can modify
                    it without understanding three layers of abstraction that exist for no
                    reason.
                  </p>
                  <p className="mb-3 text-muted-foreground">
                    Framework misuse is another common pattern. AI generates code that uses
                    frameworks in technically valid but unconventional ways — fighting the
                    framework&apos;s grain rather than working with it. In Next.js, this
                    might mean client-side data fetching where server components would be
                    appropriate, or manual route handling that duplicates built-in middleware
                    functionality. The code works, but it creates maintenance burden because
                    it doesn&apos;t follow patterns that framework documentation and
                    community knowledge support.
                  </p>
                  <p className="text-muted-foreground">
                    The cumulative effect is a codebase where every file is individually
                    readable but the architecture is incoherent. Different sections use
                    different patterns for the same problems. Abstractions leak. Dependencies
                    form cycles. Six months in, the team spends more time understanding the
                    AI-generated architecture than they would have spent building it
                    themselves from scratch.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Compliance: The Risks You Don&apos;t See Until the Audit
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    AI-generated code is compliance-unaware by default. It logs freely,
                    including personally identifiable information like email addresses, IP
                    addresses, and user agents, without considering GDPR, CCPA, or HIPAA
                    requirements. It stores data without retention policies. It processes
                    payments without PCI-aware architecture. It sends data to third-party
                    analytics services without consent mechanisms.
                  </p>
                  <p className="mb-3 text-muted-foreground">
                    Hardcoded secrets are a compliance issue as much as a security one. When
                    AI embeds API keys in source code, those keys end up in version control
                    history, CI logs, and potentially in client bundles — each a violation of
                    standards like SOC 2 that require secrets management practices. Audit
                    trails are almost never generated by AI tools. When a user modifies
                    sensitive data, updates their permissions, or accesses restricted
                    resources, there is no record of who did what and when.
                  </p>
                  <p className="text-muted-foreground">
                    These compliance gaps are invisible until you face a customer security
                    questionnaire, a regulatory audit, or a data subject access request. At
                    that point, retrofitting compliance into an AI-generated codebase is
                    orders of magnitude more expensive than building it in from the start.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                The Business Risk: Speed Today, Paralysis Tomorrow
              </h2>
              <p className="mb-4 text-muted-foreground">
                Vibe coding compresses the time from idea to working prototype from weeks to
                hours. That&apos;s genuinely valuable. But it also compresses the time from
                working prototype to unmaintainable codebase if you don&apos;t apply
                guardrails. The business risk isn&apos;t that the code doesn&apos;t work — it
                works on day one. The risk is that it becomes progressively harder to change,
                and you don&apos;t notice until you&apos;re trying to add a critical feature
                for your biggest customer and every change breaks something else.
              </p>
              <p className="mb-4 text-muted-foreground">
                Teams that vibe code without guardrails often hit a wall around the 3-6 month
                mark. The codebase has grown to tens of thousands of lines. No one fully
                understands the architecture because the AI made different decisions in
                different sessions. Test coverage is minimal or nonexistent. Refactoring is
                risky because there are no tests to catch regressions. The team that was
                shipping features daily is now spending most of its time debugging
                interactions between AI-generated modules that weren&apos;t designed to work
                together.
              </p>
              <p className="text-muted-foreground">
                The cost of fixing these issues scales nonlinearly. A missing auth check
                found during code review takes five minutes to fix. The same missing auth
                check found after a breach costs legal fees, customer notifications,
                reputation damage, and potentially regulatory fines. An N+1 query found
                before launch is a one-line fix. The same query found when your database is
                falling over in production is an emergency requiring immediate architectural
                changes under pressure.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                How to Add Guardrails Without Slowing Down
              </h2>
              <p className="mb-4 text-muted-foreground">
                The answer to vibe coding risk is not to stop vibe coding. The productivity
                gains are real, and for many projects, AI-assisted development is the right
                approach. The answer is to add systematic verification — automated checks
                that catch the categories of issues AI consistently misses, without requiring
                manual line-by-line code review of every AI-generated file.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-medium">Automated Static Analysis</h3>
                  <p className="text-muted-foreground">
                    Run linters and security scanners on every commit, not just at deploy
                    time. Tools like Semgrep can catch SQL injection patterns, hardcoded
                    secrets, and missing input validation automatically. ESLint rules can
                    enforce framework-idiomatic patterns. These checks take seconds and catch
                    the mechanical errors that AI generates most frequently. The key is making
                    them run automatically — if they require a human to remember to run them,
                    they won&apos;t get run.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Boundary Validation</h3>
                  <p className="text-muted-foreground">
                    Validate every external input at the application boundary using schema
                    validation libraries like Zod or io-ts. AI-generated code frequently
                    trusts incoming data shapes without verification. A single Zod schema at
                    each API endpoint eliminates entire categories of bugs — type mismatches,
                    missing fields, and injection payloads all get caught before they reach
                    your business logic.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Integration Testing Over Unit Testing</h3>
                  <p className="text-muted-foreground">
                    For AI-generated codebases, integration tests provide dramatically more
                    value than unit tests. AI code tends to work correctly at the function
                    level — the bugs are in the interactions between components. Write tests
                    that exercise full request/response cycles: send a request to your API,
                    verify the database state changed correctly, confirm the response shape
                    matches your contract. One integration test per endpoint catches more
                    real bugs than dozens of mocked unit tests.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Automated Codebase Scanning</h3>
                  <p className="text-muted-foreground">
                    Tools like Vibe Check scan AI-generated codebases across multiple
                    dimensions simultaneously — security, reliability, performance,
                    compliance, and more. Instead of manually reviewing every file for every
                    category of risk, run a single scan that identifies specific gaps with
                    actionable fix instructions. Install with{' '}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                      npx vibe-check-cc
                    </code>{' '}
                    and run{' '}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                      /vibe-check:check
                    </code>{' '}
                    in Claude Code to scan your codebase across 19{' '}
                    <Link href="/features" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      feature areas
                    </Link>.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Human Review at Architecture Boundaries</h3>
                  <p className="text-muted-foreground">
                    You don&apos;t need to review every line the AI writes. You do need a
                    human to review architectural decisions: database schema design, API
                    contracts, authentication flows, payment processing logic, and data
                    pipeline architecture. These are the decisions where getting it wrong has
                    cascading consequences, and where AI tools most frequently make choices
                    that are locally reasonable but globally problematic.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                Vibe Coding Guardrails Checklist
              </h2>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Essential Guardrails for AI-Generated Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {GUARDRAIL_CHECKLIST.map((item) => (
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
                The Role of Human Oversight
              </h2>
              <p className="mb-4 text-muted-foreground">
                None of this means you should stop using AI coding tools. The leverage they
                provide is real — tasks that took days now take minutes. But leverage without
                oversight is how you build fragile systems fast. The developers who succeed
                with vibe coding are the ones who treat AI output as a first draft, not a
                finished product. They use the AI to generate the implementation, then apply
                systematic checks to verify it meets production standards.
              </p>
              <p className="mb-4 text-muted-foreground">
                The shift is from &ldquo;write code&rdquo; to &ldquo;verify code.&rdquo;
                Your job as a developer using AI tools is no longer to type every line — it&apos;s
                to define requirements precisely, review output critically, and ensure the
                system as a whole is robust. That requires understanding what can go wrong,
                which is exactly what this guide and tools like{' '}
                <Link href="/guides/what-is-vibe-testing" className="text-primary underline underline-offset-4 hover:text-primary/80">
                  vibe testing
                </Link>{' '}
                are designed to help with.
              </p>
              <p className="text-muted-foreground">
                The best vibe coding workflow is fast generation with systematic
                verification. Ship quickly, but verify what you ship. The guardrails
                don&apos;t slow you down — they prevent the rework that actually slows you
                down.
              </p>
            </section>

            <Separator />

            <section className="text-center">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Find the Risks in Your Codebase
              </h2>
              <p className="mb-6 text-muted-foreground">
                Scan your AI-generated code across security, reliability, scalability,
                and compliance — before your users find the gaps.
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
                <Link href="/guides/vibe-coding-security" className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
                  <Card className="transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Vibe Coding Security Guide
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Deep dive into the specific security vulnerabilities in AI-generated
                        code — authentication gaps, input validation, exposed secrets, and
                        how to fix each one.
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
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
