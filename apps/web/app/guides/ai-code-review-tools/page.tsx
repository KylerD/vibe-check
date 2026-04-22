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
const PAGE_URL = `${BASE_URL}/guides/ai-code-review-tools`;

export const metadata: Metadata = {
  title: 'AI Code Review Tools: The Complete Guide for AI-Generated Code (2026)',
  description:
    'Compare the best tools for reviewing AI-generated code — static analysis, AI-powered reviewers, security scanners, and production readiness audits. A practical guide for developers using Cursor, Claude Code, and other vibe coding tools.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'AI Code Review Tools: The Complete Guide for AI-Generated Code',
    description:
      'Compare the best tools for reviewing AI-generated code — static analysis, AI-powered reviewers, security scanners, and production readiness audits.',
    url: PAGE_URL,
    images: [
      {
        url: '/vibe-check-og.png',
        width: 1200,
        height: 630,
        alt: 'AI Code Review Tools Guide — Vibe Check',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Code Review Tools: The Complete Guide for AI-Generated Code',
    description:
      'Compare the best tools for reviewing AI-generated code — static analysis, AI-powered reviewers, security scanners, and production readiness audits.',
    images: ['/vibe-check-og.png'],
  },
};

const TOOL_STACK = [
  {
    layer: 'Syntax and style',
    tool: 'ESLint + Prettier',
    cost: 'Free',
    when: 'Every save / pre-commit hook',
  },
  {
    layer: 'Security vulnerabilities',
    tool: 'Semgrep or Snyk Code',
    cost: 'Free tier available',
    when: 'Pre-commit + CI pipeline',
  },
  {
    layer: 'Dependency risks',
    tool: 'npm audit + Snyk',
    cost: 'Free tier available',
    when: 'CI pipeline + weekly schedule',
  },
  {
    layer: 'AI-powered review',
    tool: 'CodeRabbit or Sourcery',
    cost: 'Free for open source',
    when: 'Every pull request',
  },
  {
    layer: 'Production readiness',
    tool: 'Vibe Check',
    cost: 'Free / open source',
    when: 'Before launch + after major changes',
  },
  {
    layer: 'Human review',
    tool: 'Your own checklist',
    cost: 'Time',
    when: 'Before any user-facing deploy',
  },
];

export default function AICodeReviewToolsGuide() {
  const articleJsonLd = getGuideArticleJsonLd(
    'AI Code Review Tools: The Complete Guide for AI-Generated Code',
    'Compare the best tools for reviewing AI-generated code — static analysis, AI-powered reviewers, security scanners, and production readiness audits.',
    PAGE_URL
  );

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Vibe Check', url: BASE_URL },
    { name: 'Guides', url: `${BASE_URL}/guides` },
    { name: 'AI Code Review Tools', url: PAGE_URL },
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
                AI Code Review Tools
              </li>
            </ol>
          </nav>

          <header className="mb-8">
            <Badge className="mb-4">Comparison Guide</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              AI Code Review Tools: How to Audit Code You Didn&apos;t Write
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A practical comparison of the tools developers use to review, audit, and
              secure AI-generated code — from static analyzers to AI-powered reviewers
              to production readiness scanners.
            </p>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Why AI-Generated Code Needs Different Review Tools
              </h2>
              <p className="mb-4 text-muted-foreground">
                Traditional code review assumes a human author who understands the
                codebase, follows team conventions, and makes intentional trade-offs.
                AI-generated code breaks all three assumptions. When Cursor, Claude Code,
                or Lovable writes your implementation, the code works — but nobody made a
                conscious decision about session expiration, error handling granularity, or
                whether that database query needs an index.
              </p>
              <p className="mb-4 text-muted-foreground">
                Standard linters catch syntax issues and style violations. They&apos;ll
                flag an unused variable but won&apos;t notice that your authentication
                endpoint has no rate limiting, your file upload handler accepts any MIME
                type, or your payment webhook doesn&apos;t verify signatures. These are
                architectural gaps — the kind that AI tools create consistently because
                they optimize for &quot;does it work?&quot; rather than &quot;is it
                safe?&quot;
              </p>
              <p className="text-muted-foreground">
                Reviewing AI-generated code effectively requires layering multiple tools,
                each catching a different class of problem. No single tool covers
                everything. The goal is a stack that catches syntax errors, security
                vulnerabilities, dependency risks, architectural gaps, and production
                readiness issues — ideally before they reach users.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                Categories of Review Tools
              </h2>

              <div className="space-y-10">
                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Static Analysis Tools
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Static analyzers parse your code without executing it, checking for
                    patterns that indicate bugs, security issues, or style violations.
                    They&apos;re fast, deterministic, and run well in CI pipelines.
                  </p>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">ESLint</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          The standard JavaScript/TypeScript linter. Catches unused
                          variables, unreachable code, type inconsistencies, and import
                          errors. With security-focused plugins like{' '}
                          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                            eslint-plugin-security
                          </code>{' '}
                          it can flag basic patterns like{' '}
                          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                            eval()
                          </code>{' '}
                          usage or non-literal RegExp constructors.
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          <strong>Good at:</strong> Syntax errors, style enforcement,
                          basic code smells.{' '}
                          <strong>Misses in AI code:</strong> Architectural decisions,
                          missing security middleware, business logic gaps. ESLint sees
                          trees, not the forest.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">SonarQube / SonarCloud</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Enterprise-grade static analysis with a web dashboard. Tracks
                          code quality over time, measures test coverage, and flags
                          security hotspots. Supports 30+ languages.
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          <strong>Good at:</strong> Code duplication detection, complexity
                          metrics, maintaining quality gates across teams.{' '}
                          <strong>Misses in AI code:</strong> AI-generated code often
                          passes SonarQube&apos;s rules because it&apos;s syntactically
                          clean — the problems are in what&apos;s absent, not what&apos;s
                          present.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Semgrep</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Pattern-matching analysis that lets you write custom rules. The
                          open-source registry includes thousands of rules for security,
                          correctness, and best practices. Particularly strong at finding
                          injection vulnerabilities and unsafe API usage patterns.
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          <strong>Good at:</strong> Custom security rules, framework-specific
                          patterns, finding known vulnerable code patterns.{' '}
                          <strong>Misses in AI code:</strong> Requires someone to define
                          the rules. It catches what you tell it to look for, which means
                          you need to already know what AI tools get wrong.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    AI-Powered Code Reviewers
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    These tools use large language models to review code contextually —
                    they understand intent, not just syntax. They integrate with pull
                    requests and provide feedback similar to a human reviewer.
                  </p>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">CodeRabbit</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Automated PR reviewer that posts line-level comments on GitHub and
                          GitLab pull requests. Understands the diff in context and can catch
                          logic errors, performance issues, and security concerns that static
                          analysis misses.
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          <strong>Good at:</strong> Contextual feedback on diffs, catching
                          logic errors, suggesting improvements.{' '}
                          <strong>Limitations:</strong> Reviews changes in isolation — it
                          sees the PR, not the full codebase architecture. Can produce false
                          positives that create review fatigue.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Sourcery</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          AI code reviewer focused on code quality and refactoring. Suggests
                          cleaner implementations, identifies duplicated logic, and flags
                          overly complex functions. Works as a GitHub bot and IDE plugin.
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          <strong>Good at:</strong> Code simplification, DRY violations,
                          readability improvements.{' '}
                          <strong>Limitations:</strong> Primarily focused on code quality
                          rather than security or production readiness. Good for cleaning
                          up AI-generated code, less useful for finding dangerous gaps.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Codacy</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Combines static analysis with AI-assisted review. Provides a
                          quality dashboard, tracks issues over time, and integrates with
                          major Git platforms. The AI layer adds context-aware suggestions
                          beyond what rule-based analysis finds.
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          <strong>Good at:</strong> Continuous quality tracking, combining
                          multiple analysis engines, team dashboards.{' '}
                          <strong>Limitations:</strong> The AI layer is supplementary — most
                          findings still come from underlying static analysis rules.
                          Configuration can be complex for new teams.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Security-Focused Scanners
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Security scanners focus specifically on vulnerabilities — in your code,
                    your dependencies, and your configuration. They&apos;re essential for
                    AI-generated code because AI tools frequently pull in outdated packages
                    and generate patterns with known security weaknesses.
                  </p>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Snyk</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive security platform covering dependency vulnerabilities
                          (Snyk Open Source), code-level issues (Snyk Code), container images,
                          and infrastructure as code. The dependency scanner is particularly
                          valuable for AI-generated projects, which often have bloated or
                          outdated dependency trees.
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          <strong>Good at:</strong> Known CVE detection, dependency upgrade
                          paths, container scanning.{' '}
                          <strong>Limitations:</strong> Free tier has limited scans per month.
                          Focuses on known vulnerabilities — won&apos;t catch novel
                          architectural mistakes unique to AI-generated code.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">npm audit / Bandit / Safety</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Built-in and open-source dependency scanners.{' '}
                          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                            npm audit
                          </code>{' '}
                          checks JavaScript dependencies against the npm advisory database.
                          Bandit scans Python code for common security issues. Safety checks
                          Python packages against known vulnerabilities.
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          <strong>Good at:</strong> Zero-cost, zero-configuration dependency
                          checking. Should be in every CI pipeline regardless of other tools.{' '}
                          <strong>Limitations:</strong> Only covers known vulnerabilities
                          in published advisories. No awareness of how your code uses those
                          dependencies.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">GitHub Dependabot / Code Scanning</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Free for all GitHub repositories. Dependabot automatically opens
                          PRs to update vulnerable dependencies. Code scanning (powered by
                          CodeQL) runs semantic analysis to find security vulnerabilities in
                          your code — SQL injection, XSS, path traversal, and more.
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          <strong>Good at:</strong> Automated dependency updates, deep
                          semantic analysis for common vulnerability classes. Free and
                          always-on.{' '}
                          <strong>Limitations:</strong> CodeQL analysis can be slow on large
                          repos. Dependabot PRs require human review to avoid breaking changes.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Production Readiness Scanners
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    This is the newest category, built specifically for the vibe coding era.
                    Production readiness scanners don&apos;t just check for bugs or
                    vulnerabilities — they evaluate whether your codebase is genuinely ready
                    for real users. They look for the things AI tools consistently skip:
                    monitoring, error handling, backup strategies, rate limiting, compliance
                    requirements.
                  </p>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Vibe Check</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Open-source toolkit that scans AI-generated codebases across 12
                        production domains — security, performance, accessibility, testing,
                        monitoring, CI/CD, discoverability, analytics, reliability, legal,
                        platform compatibility, and AI security. Works as a skill for 9 AI
                        coding tools including Claude Code, Cursor, and Gemini CLI. Generates
                        prioritized findings with fix instructions you can feed directly back
                        into your AI tool.
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        <strong>Good at:</strong> Holistic codebase audit, catching what&apos;s
                        missing (not just what&apos;s wrong), AI-specific gap patterns,
                        actionable fix generation.{' '}
                        <strong>Limitations:</strong> Focused on production readiness rather
                        than line-level code quality. Best used alongside — not instead of —
                        static analysis and security scanners. Read more about the{' '}
                        <Link href="/guides/vibe-coding-security" className="text-primary underline underline-offset-4 hover:text-primary/80">
                          specific security risks in AI-generated code
                        </Link>.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Manual Review Checklists
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Tools catch patterns. Humans catch intent. There are categories of
                    problems that no automated tool reliably detects: business logic that
                    technically works but doesn&apos;t match what users need, UX flows that
                    are confusing but syntactically valid, data models that will become
                    unmaintainable at scale, and compliance requirements specific to your
                    industry or jurisdiction.
                  </p>
                  <p className="mb-4 text-muted-foreground">
                    A manual review checklist for AI-generated code should focus on the areas
                    where human judgment matters most:
                  </p>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Human Review Checklist for AI-Generated Code
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {[
                          'Does the data model support the actual business requirements, not just the demo flow?',
                          'Are there race conditions in concurrent operations (payments, inventory, bookings)?',
                          'Do error states provide useful feedback or silently fail?',
                          'Is authorization checked at every API endpoint, not just the UI layer?',
                          'Would a new team member understand the code structure in 6 months?',
                          'Are there any hardcoded values that should be configuration?',
                          'Does the database schema have proper indexes for the queries being made?',
                          'Are webhook handlers idempotent — can they safely process the same event twice?',
                          'Is there a clear separation between what runs server-side and client-side?',
                          'Have you tested with realistic data volumes, not just one or two records?',
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm">
                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                How to Choose the Right Tools
              </h2>
              <p className="mb-6 text-muted-foreground">
                The right combination depends on three factors: team size, budget, and
                risk tolerance. Here&apos;s a practical framework.
              </p>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Solo Developer / Side Project
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Budget is zero. Time is limited. You need maximum coverage with
                      minimum configuration. Use ESLint (already in most project templates),{' '}
                      <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                        npm audit
                      </code>{' '}
                      in your CI pipeline, GitHub Dependabot (free, enable it), and Vibe Check
                      before launch. Add CodeRabbit if your repo is public (free for open
                      source). This stack costs nothing and catches 80% of what you need.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Small Team / Startup (2-10 people)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      You&apos;re moving fast but handling real user data. Add Snyk or Semgrep
                      for security scanning in CI — their free tiers are generous enough for
                      most startups. Use CodeRabbit or Sourcery on pull requests to catch
                      issues before they merge. Run Vibe Check after major features land.
                      The investment is a few hours of setup and the returns compound as the
                      codebase grows.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Established Team / Regulated Industry
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Compliance requirements mean you need audit trails and comprehensive
                      coverage. SonarQube or Codacy for continuous quality tracking. Snyk
                      (paid tier) for full vulnerability management with SLA-based
                      remediation. Semgrep with custom rules for your domain-specific
                      patterns. Vibe Check for production readiness validation. And a formal
                      human review process with documented checklists — tools augment human
                      judgment here, they don&apos;t replace it.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                A Practical Review Stack
              </h2>
              <p className="mb-6 text-muted-foreground">
                If you&apos;re vibe coding and want a sensible default setup, this is what
                we&apos;d recommend. It covers each layer of risk with a specific tool,
                and everything except the human review step can be automated.
              </p>

              <Card>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-3 pr-4 text-left font-medium">Layer</th>
                          <th className="pb-3 pr-4 text-left font-medium">Tool</th>
                          <th className="pb-3 pr-4 text-left font-medium">Cost</th>
                          <th className="pb-3 text-left font-medium">When to Run</th>
                        </tr>
                      </thead>
                      <tbody>
                        {TOOL_STACK.map((row) => (
                          <tr key={row.layer} className="border-b last:border-0">
                            <td className="py-3 pr-4 text-muted-foreground">{row.layer}</td>
                            <td className="py-3 pr-4 font-medium">{row.tool}</td>
                            <td className="py-3 pr-4 text-muted-foreground">{row.cost}</td>
                            <td className="py-3 text-muted-foreground">{row.when}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <p className="mt-6 text-muted-foreground">
                The key insight is that each layer catches different problems. ESLint
                finds syntax errors that AI-powered reviewers ignore. Security scanners
                find CVEs that production readiness tools don&apos;t track. Production
                readiness scanners find architectural gaps that security tools
                don&apos;t look for. And humans catch business logic issues that no tool
                reliably detects. Skipping any layer leaves a class of risk unaddressed.
              </p>
              <p className="mt-4 text-muted-foreground">
                If you&apos;re building with{' '}
                <Link href="/guides/cursor-production-ready" className="text-primary underline underline-offset-4 hover:text-primary/80">
                  Cursor
                </Link>{' '}
                or another AI coding tool, the combination of automated scanning and
                intentional human review is what separates apps that survive contact with
                real users from apps that don&apos;t. The tools are available and mostly
                free — the only real cost is the discipline to use them.
              </p>
            </section>

            <Separator />

            <section className="text-center">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Check Your AI-Generated Code
              </h2>
              <p className="mb-6 text-muted-foreground">
                Vibe Check scans your codebase across 12 production domains and tells you
                exactly what your AI tool missed.
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
                        Vibe Coding Security: How to Ship AI-Built Apps Without Getting Hacked
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        The top security risks in AI-generated code and how to fix them — from
                        authentication gaps to exposed API keys.
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
                <Link href="/guides/what-is-vibe-testing" className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
                  <Card className="transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">
                        What Is Vibe Testing?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        How to test AI-generated code when you didn&apos;t write it — strategies
                        for validating vibe coded applications.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </section>
          </div>

          <RelatedGuides slug="ai-code-review-tools" />
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
