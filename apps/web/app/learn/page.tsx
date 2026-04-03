import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/game/game-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { SiteFooter } from '@/components/site-footer';
import { getFaqJsonLd, getBreadcrumbJsonLd, safeJsonLd } from '@/lib/seo';

const BASE_URL = 'https://www.vibe-check.cloud';
const PAGE_URL = `${BASE_URL}/learn`;

export const metadata: Metadata = {
  title:
    'Learn About Vibe Coding, Vibe Testing & AI Code Safety | vibe-check',
  description:
    'What is vibe coding? What is vibe testing? Learn about AI-assisted code generation, its risks, and how to make AI-generated code production ready. A practical knowledge base for developers using Claude Code, Cursor, Lovable, Bolt, v0, and Copilot.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title:
      'Learn About Vibe Coding, Vibe Testing & AI Code Safety | vibe-check',
    description:
      'What is vibe coding? What is vibe testing? Learn about AI-assisted code generation, its risks, and how to make AI-generated code production ready.',
    url: PAGE_URL,
    images: [
      {
        url: '/vibe-check-og.png',
        width: 1200,
        height: 630,
        alt: 'Learn About Vibe Coding & AI Code Safety — Vibe Check',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Learn About Vibe Coding, Vibe Testing & AI Code Safety | vibe-check',
    description:
      'What is vibe coding? What is vibe testing? Learn about AI-assisted code generation, its risks, and how to make AI-generated code production ready.',
    images: ['/vibe-check-og.png'],
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is vibe coding?',
    answer:
      'Vibe coding is AI-assisted software development where developers describe their intent in natural language and AI tools generate the implementation. Rather than writing every line manually, developers guide tools like Claude Code, Cursor, Lovable, Bolt, v0, and GitHub Copilot to produce functional code from high-level descriptions. The term was coined by Andrej Karpathy in early 2025 to describe the shift from precise line-by-line engineering to directing AI with conversational prompts. Vibe coding has dramatically lowered the barrier to shipping software — solo founders launch SaaS products in a weekend and designers build functional prototypes without backend experience.',
  },
  {
    question: 'What is vibe testing?',
    answer:
      'Vibe testing is a set of testing strategies designed specifically for AI-generated codebases. It differs from traditional testing because AI-generated code has distinct failure modes: inconsistent error handling patterns, implicit assumptions about data shapes, missing edge case coverage, and security gaps that pass functional tests. Vibe testing focuses on validating that AI-generated code handles real-world conditions — not just the happy path the AI optimized for. This includes boundary testing, integration contract verification, security regression testing, and production simulation.',
  },
  {
    question: 'What is a vibe check for code?',
    answer:
      'A vibe check for code is the process of auditing AI-generated software for production readiness. It evaluates whether code that works in development will survive real-world conditions: user abuse, security attacks, traffic spikes, and compliance requirements. The term applies both to the general practice and to the open-source tool vibe-check, which automates this audit across 12 production domains including security, performance, accessibility, testing, monitoring, and legal compliance.',
  },
  {
    question: 'Is vibe coding safe?',
    answer:
      'Vibe coding is a powerful development approach but requires guardrails to be safe for production use. AI coding tools generate code that works functionally but often omits security hardening, rate limiting, input validation, and error handling that experienced developers would include by default. The risks are manageable with systematic review — automated scanning, security audits, and production readiness checks significantly reduce the gap between "it works" and "it is safe."',
  },
  {
    question: 'How do you make AI-generated code production ready?',
    answer:
      'Making AI-generated code production ready requires a systematic review across multiple domains: run automated security scanning to catch exposed secrets, missing auth protections, and input validation gaps; perform dependency auditing to identify vulnerable or outdated packages; conduct load testing to verify the application handles real traffic; review error handling to ensure failures are graceful and logged; check compliance requirements like privacy policies, cookie consent, and data deletion flows; and validate infrastructure configuration including HTTPS enforcement, CORS policies, and security headers.',
  },
  {
    question: 'What are the risks of AI-generated code?',
    answer:
      'The main risks of AI-generated code fall into six categories: security vulnerabilities (missing rate limiting, exposed API keys, unvalidated inputs, insecure defaults), reliability gaps (poor error handling, missing retries, no graceful degradation), performance issues (unoptimized queries, missing caching, large bundle sizes), compliance omissions (no privacy policy, missing cookie consent, absent data deletion flows), testing gaps (no edge case coverage, missing integration tests, untested failure paths), and architectural debt (inconsistent patterns, tight coupling, duplicated logic across files).',
  },
  {
    question: 'What are best practices for vibe coding?',
    answer:
      'Best practices for vibe coding include: always review AI-generated code before shipping, especially authentication and payment handling; run automated production readiness scans using tools like vibe-check; write explicit security requirements in your prompts rather than assuming the AI will include them; test edge cases and failure modes that the AI likely did not consider; audit dependencies the AI introduced for known vulnerabilities; use version control and review diffs rather than accepting wholesale changes; keep AI-generated code modular so problems can be isolated; and establish a pre-launch checklist covering security, performance, accessibility, and legal compliance.',
  },
];

export default function LearnPage() {
  const faqJsonLd = getFaqJsonLd(FAQ_ITEMS);

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Vibe Check', url: BASE_URL },
    { name: 'Learn', url: PAGE_URL },
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(faqJsonLd),
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
                <Link
                  href="/"
                  className="transition-colors hover:text-foreground"
                >
                  Vibe Check
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-foreground" aria-current="page">
                Learn
              </li>
            </ol>
          </nav>

          <header className="mb-8">
            <Badge className="mb-4">Knowledge Base</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Vibe Coding, Vibe Testing & AI Code Safety
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A practical reference for developers building with AI coding tools.
              Clear definitions, real risks, and actionable guidance.
            </p>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                What is vibe coding?
              </h2>
              <p className="mb-4 text-muted-foreground">
                Vibe coding is AI-assisted software development where developers
                describe their intent in natural language and AI tools generate
                the implementation. Rather than writing every line manually,
                developers guide tools like Claude Code, Cursor, Lovable, Bolt,
                v0, and GitHub Copilot to produce functional code from
                high-level descriptions.
              </p>
              <p className="mb-4 text-muted-foreground">
                The term was coined by Andrej Karpathy in early 2025 to describe
                the shift from precise line-by-line engineering to directing AI
                with conversational prompts. It captures a fundamental change in
                how software gets built: you set the direction and the AI writes
                the code.
              </p>
              <p className="mb-4 text-muted-foreground">
                Vibe coding has dramatically lowered the barrier to shipping
                software. Solo founders launch SaaS products in a weekend.
                Designers build functional prototypes without backend experience.
                Teams that used to spend months on an MVP now ship in days.
              </p>
              <p className="text-muted-foreground">
                The trade-off is that speed creates blind spots. AI tools
                optimize for code that works, not code that is secure, scalable,
                or compliant. Features like rate limiting, input validation,
                error monitoring, and privacy compliance are routinely omitted
                unless explicitly requested.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                What is vibe testing?
              </h2>
              <p className="mb-4 text-muted-foreground">
                Vibe testing is a set of testing strategies designed specifically
                for AI-generated codebases. It differs from traditional testing
                because AI-generated code has distinct failure modes that
                conventional test suites do not catch.
              </p>
              <p className="mb-4 text-muted-foreground">
                AI-generated code tends to have inconsistent error handling
                patterns across files, implicit assumptions about data shapes
                that break with real input, missing edge case coverage for
                scenarios the AI did not encounter in training, and security gaps
                that pass functional tests but fail under adversarial conditions.
              </p>
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Key Vibe Testing Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      'Boundary testing — validate inputs at limits the AI did not consider (empty strings, maximum lengths, special characters, concurrent requests)',
                      'Integration contract verification — ensure AI-generated modules agree on data shapes, error formats, and authentication flows',
                      'Security regression testing — check that authentication, authorization, and input sanitization survive code changes',
                      'Production simulation — test under realistic load, latency, and failure conditions rather than ideal development scenarios',
                      'Dependency auditing — verify that AI-selected packages are maintained, secure, and appropriately licensed',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <p className="text-muted-foreground">
                The goal of vibe testing is not to replace traditional testing
                but to extend it. Standard unit and integration tests still
                matter. Vibe testing adds the layer that catches what AI tools
                consistently miss.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                What is a vibe check for code?
              </h2>
              <p className="mb-4 text-muted-foreground">
                A vibe check for code is the process of auditing AI-generated
                software for production readiness. It evaluates whether code that
                works in development will survive real-world conditions: user
                abuse, security attacks, traffic spikes, and compliance
                requirements.
              </p>
              <p className="mb-4 text-muted-foreground">
                The concept applies broadly to any systematic review of
                AI-generated code. The open-source tool{' '}
                <Link
                  href="https://github.com/Hypership-Software/vibe-check"
                  className="text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  vibe-check
                </Link>{' '}
                automates this audit. It scans codebases across 12 production
                domains — security, performance, accessibility, testing,
                monitoring, CI/CD, discoverability, analytics, reliability,
                legal compliance, platform compatibility, and AI security — then
                returns prioritized findings with actionable fix instructions.
              </p>
              <p className="text-muted-foreground">
                Install with{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                  npx skills add Hypership-Software/vibe-check
                </code>{' '}
                and run{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                  /check
                </code>{' '}
                in your AI coding tool. For a browser-based assessment without
                code access, use the web app at{' '}
                <Link
                  href="/"
                  className="text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  vibe-check.cloud
                </Link>
                .
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Is vibe coding safe?
              </h2>
              <p className="mb-4 text-muted-foreground">
                Vibe coding is a powerful development approach but requires
                guardrails to be safe for production use. AI coding tools
                generate code that works functionally but often omits security
                hardening, rate limiting, input validation, and error handling
                that experienced developers would include by default.
              </p>
              <p className="mb-4 text-muted-foreground">
                The most common risks are well-documented and predictable:
                missing rate limiting on authentication endpoints, non-expiring
                session tokens, exposed API keys in client-side code, unvalidated
                file uploads, insecure CORS configuration, and absent security
                headers. These are not edge cases — they appear in the majority
                of AI-generated codebases.
              </p>
              <p className="text-muted-foreground">
                The risks are manageable with systematic review. Automated
                scanning tools catch the majority of these gaps. The key
                principle is to treat AI-generated code the same way you would
                treat code from a junior developer: it works, it is often clever,
                but it needs review before it faces the real world. See the full{' '}
                <Link
                  href="/guides/vibe-coding-security"
                  className="text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  vibe coding security guide
                </Link>{' '}
                for a detailed breakdown.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                How to make AI-generated code production ready
              </h2>
              <p className="mb-4 text-muted-foreground">
                Making AI-generated code production ready requires a systematic
                review across multiple domains. No single check is sufficient —
                production readiness is the sum of security, reliability,
                performance, compliance, and operational maturity.
              </p>
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Production Readiness Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      'Automated security scanning — catch exposed secrets, missing auth protections, input validation gaps, and insecure defaults across the entire codebase',
                      'Dependency audit — identify vulnerable, outdated, or unmaintained packages the AI introduced',
                      'Load testing — verify the application handles real traffic patterns, not just single-user development scenarios',
                      'Error handling review — ensure failures are graceful, logged, and do not leak internal details to users',
                      'Compliance check — confirm privacy policies, cookie consent, terms of service, and data deletion flows are in place',
                      'Infrastructure hardening — validate HTTPS enforcement, CORS policies, security headers, and environment variable management',
                      'Monitoring setup — confirm error tracking, structured logging, health checks, and alerting are operational before launch',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <p className="text-muted-foreground">
                Vibe Check automates the assessment across these domains. Run a
                scan with{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                  /check
                </code>{' '}
                in your AI coding tool to get a scored report with prioritized
                findings and plain-language fix instructions.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                What are the risks of AI-generated code?
              </h2>
              <p className="mb-4 text-muted-foreground">
                The risks of AI-generated code fall into six categories. Each
                represents a class of problems that AI coding tools consistently
                produce across different projects and frameworks.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: 'Security vulnerabilities',
                    description:
                      'Missing rate limiting on login endpoints, exposed API keys in client bundles, unvalidated user input passed to database queries, insecure default configurations, absent security headers, and predictable session tokens.',
                  },
                  {
                    title: 'Reliability gaps',
                    description:
                      'Poor error handling that crashes on unexpected input, missing retry logic for external API calls, no graceful degradation when services are unavailable, and database connections without pooling or timeout configuration.',
                  },
                  {
                    title: 'Performance issues',
                    description:
                      'Unoptimized database queries (N+1 patterns, missing indexes), no caching strategy, large uncompressed assets, missing code splitting, and synchronous operations that block the event loop.',
                  },
                  {
                    title: 'Compliance omissions',
                    description:
                      'No privacy policy, missing cookie consent mechanisms, absent terms of service, no data deletion capability for GDPR/CCPA compliance, and inadequate data processing documentation.',
                  },
                  {
                    title: 'Testing gaps',
                    description:
                      'No edge case coverage for unusual inputs, missing integration tests between AI-generated modules, untested failure and timeout paths, and no security regression tests.',
                  },
                  {
                    title: 'Architectural debt',
                    description:
                      'Inconsistent patterns across files (different error formats, mixed async styles), tight coupling between modules, duplicated logic, and no clear separation of concerns.',
                  },
                ].map((risk) => (
                  <div key={risk.title}>
                    <h3 className="mb-2 text-lg font-medium">{risk.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {risk.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Best practices for vibe coding
              </h2>
              <p className="mb-4 text-muted-foreground">
                Effective vibe coding combines the speed of AI generation with
                the discipline of production engineering. These practices
                separate teams that ship reliably from those that accumulate
                invisible risk.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Do</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        'Review all AI-generated code before shipping, especially authentication and payment handling',
                        'Include security requirements explicitly in your prompts — AI will not add them unprompted',
                        'Run automated production readiness scans before every launch',
                        'Test edge cases and failure modes the AI did not consider',
                        'Audit every dependency the AI introduced for vulnerabilities and maintenance status',
                        'Use version control and review diffs rather than accepting wholesale changes',
                        'Keep AI-generated code modular so problems can be isolated and fixed',
                        'Establish a pre-launch checklist covering security, performance, accessibility, and legal compliance',
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm"
                        >
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Don&apos;t</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        'Ship AI-generated code without reviewing the authentication and authorization logic',
                        'Assume the AI handled security because you mentioned it in your prompt',
                        'Accept large code changes without reading the diff',
                        'Skip testing because the AI said the code works',
                        'Deploy to production without checking for exposed secrets in the codebase',
                        'Ignore dependency warnings or use packages the AI selected without verification',
                        'Trust client-side validation as your only input validation layer',
                        'Launch without monitoring, error tracking, or alerting in place',
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm"
                        >
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator />

            <section className="text-center">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Check Your AI-Generated Code
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
              <div className="space-y-4">
                <Link
                  href="/guides/vibe-coding-security"
                  className="rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                >
                  <Card className="transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Vibe Coding Security Guide
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        The top security risks in AI-generated code and how to
                        fix them before an attacker finds them.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link
                  href="/guides/cursor-production-ready"
                  className="rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                >
                  <Card className="transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Is Your Cursor App Production Ready?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        The complete production readiness checklist for apps
                        built with Cursor and other AI coding tools.
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
