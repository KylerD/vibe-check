import Link from 'next/link';
import { SiteHeader } from '@/components/game/game-header';
import { HeroSection } from '@/components/hero-section';
import { AppChecker } from '@/components/app-checker';
import { FaqSection } from '@/components/faq-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  getWebsiteJsonLd,
  getSoftwareApplicationJsonLd,
  getFaqJsonLd,
  safeJsonLd,
  HOME_FAQS,
} from '@/lib/seo';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(getWebsiteJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(getSoftwareApplicationJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(getFaqJsonLd(HOME_FAQS)),
        }}
      />

      <SiteHeader />

      <main className="flex-1">
        <HeroSection />
        <AppChecker />

        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-6 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Guides for Vibe Coders
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/guides/vibe-coding-security">
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-base">Vibe Coding Security Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    The top security risks in AI-generated code and how to fix them
                    before you ship.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/guides/cursor-production-ready">
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-base">Cursor Production Ready Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Everything to check before deploying an app built with Cursor or
                    other AI coding tools.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        <FaqSection faqs={HOME_FAQS} />
      </main>

      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center">
          <p className="text-sm text-muted-foreground">
            <Link
              href="/features"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              All checklists
            </Link>
            {' · '}
            Free and open source.{' '}
            <a
              href="https://github.com/KylerD/vibe-check"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
