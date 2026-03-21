import dynamic from 'next/dynamic';
import Link from 'next/link';
import { SiteHeader } from '@/components/game/game-header';
import { SiteFooter } from '@/components/site-footer';
import { HeroSection } from '@/components/hero-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AppChecker = dynamic(() =>
  import('@/components/app-checker').then((mod) => mod.AppChecker)
);
const FaqSection = dynamic(() =>
  import('@/components/faq-section').then((mod) => mod.FaqSection)
);
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

      <main id="main-content" className="flex-1">
        <HeroSection />
        <AppChecker />

        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-6 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Guides for Vibe Coders
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/guides/vibe-coding-security" className="rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
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
            <Link href="/guides/cursor-production-ready" className="rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
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

      <SiteFooter />
    </div>
  );
}
