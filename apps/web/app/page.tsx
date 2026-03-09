import { SiteHeader } from '@/components/game/game-header';
import { HeroSection } from '@/components/hero-section';
import { AppChecker } from '@/components/app-checker';
import { FaqSection } from '@/components/faq-section';
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
        <FaqSection faqs={HOME_FAQS} />
      </main>

      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center">
          <p className="text-sm text-muted-foreground">
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
