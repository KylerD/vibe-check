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
const PAGE_URL = `${BASE_URL}/guides/vibe-coding-security`;

export const metadata: Metadata = {
  title: 'Vibe Coding Security: Risks, Guardrails & How to Fix AI-Generated Code',
  description:
    'The biggest security risks in vibe coded apps — exposed API keys, missing auth, unsafe dependencies. A practical guide to securing AI-generated code from Cursor, Lovable, and Bolt.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Vibe Coding Security: Risks, Guardrails & How to Fix AI-Generated Code',
    description:
      'The biggest security risks in vibe coded apps — exposed API keys, missing auth, unsafe dependencies. A practical guide to securing AI-generated code from Cursor, Lovable, and Bolt.',
    url: PAGE_URL,
    images: [
      {
        url: '/vibe-check-og.png',
        width: 1200,
        height: 630,
        alt: 'Vibe Coding Security Guide — Vibe Check',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Coding Security: Risks, Guardrails & How to Fix AI-Generated Code',
    description:
      'The biggest security risks in vibe coded apps — exposed API keys, missing auth, unsafe dependencies. A practical guide to securing AI-generated code from Cursor, Lovable, and Bolt.',
    images: ['/vibe-check-og.png'],
  },
};

const CHECKLIST_ITEMS = [
  'Rate limiting on all authentication endpoints',
  'Session tokens expire and rotate on privilege changes',
  'Passwords hashed with bcrypt or argon2 — never reversible encryption',
  'File uploads validated by MIME type, extension, and size',
  'API keys and secrets never present in client-side code or git history',
  'All user input sanitized before database queries and HTML rendering',
  'HTTPS enforced on every route with proper HSTS headers',
  'Error messages return generic text — no stack traces or internal details',
  'Payment webhooks verified with provider signatures before processing',
  'CORS configured to allow only your own domains',
];

export default function VibeCodingSecurityGuide() {
  const articleJsonLd = getGuideArticleJsonLd(
    'Vibe Coding Security: How to Ship AI-Built Apps Without Getting Hacked',
    'Is your vibe coded app secure? The top security risks in AI-generated code from Cursor, Lovable, Bolt, and Claude Code — and how to fix them.',
    PAGE_URL
  );

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Vibe Check', url: BASE_URL },
    { name: 'Guides', url: `${BASE_URL}/guides` },
    { name: 'Vibe Coding Security', url: PAGE_URL },
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
                Vibe Coding Security
              </li>
            </ol>
          </nav>

          <header className="mb-8">
            <Badge className="mb-4">Security Guide</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Vibe Coding Security: How to Ship AI-Built Apps Without Getting Hacked
            </h1>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                What Is Vibe Coding?
              </h2>
              <p className="mb-4 text-muted-foreground">
                Vibe coding is the practice of building software primarily through AI coding
                assistants. Instead of writing every line by hand, developers describe what
                they want in natural language and let tools like Cursor, Lovable, Bolt, v0,
                and Claude Code generate the implementation. The term captures the shift from
                precise engineering to high-level direction — you set the vibe, the AI writes
                the code.
              </p>
              <p className="mb-4 text-muted-foreground">
                This approach has dramatically lowered the barrier to shipping software.
                Solo founders launch SaaS products in a weekend. Designers build functional
                prototypes without backend experience. Teams that used to spend months on an
                MVP now ship in days. The productivity gains are real and significant.
              </p>
              <p className="text-muted-foreground">
                But speed creates blind spots. When you move from idea to deployed app in
                hours, entire categories of requirements get skipped — not because the
                developer is careless, but because AI tools don&apos;t surface what they
                don&apos;t build. Security is the most dangerous of these blind spots, because
                the consequences are invisible until someone exploits them.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Why AI-Generated Code Has Security Gaps
              </h2>
              <p className="mb-4 text-muted-foreground">
                AI coding tools are optimized for a specific outcome: generating code that
                works. When you ask Cursor to build a login page, it produces a login page
                that accepts credentials and authenticates users. That&apos;s what you asked
                for, and it delivers. What it doesn&apos;t do — unless you specifically
                request it — is add rate limiting to prevent brute force attacks, set session
                expiration policies, implement account lockout after failed attempts, or log
                authentication events for monitoring.
              </p>
              <p className="mb-4 text-muted-foreground">
                This isn&apos;t a flaw in any single tool. It&apos;s a structural problem
                with how AI code generation works. These models are trained on vast
                quantities of open-source code, tutorials, and documentation. Most of that
                source material demonstrates functionality, not hardening. A Stack Overflow
                answer showing how to handle file uploads rarely includes MIME type validation,
                size limits, or storage isolation. The AI learns to replicate what it has
                seen most often, which is code that works in development.
              </p>
              <p className="text-muted-foreground">
                The result is a consistent pattern: AI-generated code uses default
                configurations, skips defensive programming, and omits environment-specific
                hardening. Database connections use default ports with no connection pooling.
                Error handlers return raw exception messages. CORS is configured to allow all
                origins. Each of these is a small decision that an experienced developer
                would catch in code review — but when the AI is both the author and the
                first reviewer, these gaps compound silently.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                The Top Security Risks in Vibe-Coded Apps
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Authentication Vulnerabilities
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Authentication is the front door to your application, and AI-generated
                    auth code consistently leaves it unlocked. The most common issue is
                    missing rate limiting — without it, an attacker can attempt thousands
                    of password combinations per second with no friction. AI tools also
                    generate sessions that never expire, meaning a stolen token grants
                    permanent access.
                  </p>
                  <p className="text-muted-foreground">
                    Other frequent gaps include predictable password reset tokens (sequential
                    IDs or short numeric codes that can be brute-forced), missing
                    multi-factor authentication, and session tokens that aren&apos;t
                    invalidated on password change. If you built auth with an AI tool, these
                    are the first things to check. See the full{' '}
                    <Link href="/features/auth" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      authentication checklist
                    </Link>{' '}
                    for a complete audit guide.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Insecure File Uploads
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    File upload is one of the most exploited attack vectors on the web, and
                    AI-generated upload handlers are almost always missing critical
                    safeguards. A typical AI implementation accepts any file, stores it in
                    a publicly accessible directory, and uses the original filename — which
                    opens the door to path traversal attacks, executable uploads, and
                    storage abuse.
                  </p>
                  <p className="text-muted-foreground">
                    Secure file upload requires validating both the MIME type and file
                    extension, enforcing size limits, generating random filenames, storing
                    files outside the web root, and scanning for malware. Most AI tools
                    implement none of these by default. Review the{' '}
                    <Link href="/features/file-uploads" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      file uploads checklist
                    </Link>{' '}
                    to see what your implementation may be missing.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Exposed API Keys and Secrets
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    AI coding assistants frequently place API keys directly in source code.
                    When you ask an AI to integrate with Stripe, SendGrid, or any third-party
                    service, it often hardcodes the key in the file where it&apos;s used
                    rather than referencing environment variables. If that file is client-side
                    JavaScript, the key is visible to anyone who opens browser dev tools.
                  </p>
                  <p className="text-muted-foreground">
                    Even when keys land in server-side code, they end up committed to git
                    history where they persist even after deletion. Without secret rotation
                    policies and proper environment variable management, a single exposed
                    key can grant attackers access to your payment processor, email service,
                    or database. The{' '}
                    <Link href="/features/monitoring" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      monitoring checklist
                    </Link>{' '}
                    covers how to detect and prevent secret exposure.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Missing Input Validation
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    When AI generates forms, API endpoints, or database queries, it typically
                    trusts user input implicitly. Form fields accept any value without length
                    limits or format validation. API endpoints pass request bodies directly
                    to database queries. User-submitted content renders in the browser
                    without sanitization.
                  </p>
                  <p className="text-muted-foreground">
                    These patterns enable the three most common web vulnerabilities: SQL
                    injection (manipulating database queries through form fields), cross-site
                    scripting or XSS (injecting malicious JavaScript that runs in other
                    users&apos; browsers), and command injection (executing system commands
                    through unsanitized input). A single unsanitized input field can
                    compromise your entire database or every user who visits your site.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    Insecure Payment Handling
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Payment integration is where security gaps become directly expensive.
                    AI-generated payment code often processes sensitive operations
                    client-side, where they can be manipulated. Price calculations happen in
                    the browser. Subscription status is checked by reading local state
                    rather than verifying with the payment provider. Webhook endpoints accept
                    payloads without verifying signatures.
                  </p>
                  <p className="text-muted-foreground">
                    Without idempotency keys, network retries can charge customers multiple
                    times. Without webhook verification, attackers can forge payment
                    confirmations and access paid features for free. The{' '}
                    <Link href="/features/payments" className="text-primary underline underline-offset-4 hover:text-primary/80">
                      payments checklist
                    </Link>{' '}
                    walks through every critical check for AI-generated payment code.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                How to Audit Your Vibe-Coded App for Security
              </h2>
              <p className="mb-4 text-muted-foreground">
                Spot-checking individual files is not enough. Security gaps in AI-generated
                code are distributed across the entire codebase — a missing rate limiter
                here, an unvalidated input there, a hardcoded secret somewhere else. An
                effective audit requires a systematic scan across every domain: authentication,
                file handling, payment processing, API security, data storage, and
                infrastructure configuration.
              </p>
              <p className="text-muted-foreground">
                Vibe Check automates this process. The CLI plugin runs inside Claude Code
                and scans your actual codebase across 19 feature areas, identifying specific
                gaps and generating the exact prompts to fix them. Install it with{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                  npx vibe-check-cc
                </code>{' '}
                and run a full scan with{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                  /vibe-check:check
                </code>{' '}
                in Claude Code. If you prefer a browser-based approach, the web app at{' '}
                <Link href="/#check-your-app" className="text-primary underline underline-offset-4 hover:text-primary/80">
                  vibe-check.cloud
                </Link>{' '}
                provides guided assessments without requiring any code access.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                Security Checklist for Vibe Coders
              </h2>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Essential Security Items
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

            <section className="text-center">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Scan Your App for Security Gaps
              </h2>
              <p className="mb-6 text-muted-foreground">
                Find out what your AI coding tool missed before an attacker does.
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
              <Link href="/guides/cursor-production-ready" className="rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
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
            </section>
          </div>

          <RelatedGuides slug="vibe-coding-security" />
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
