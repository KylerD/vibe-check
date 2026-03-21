import Link from 'next/link';
import type { Metadata } from 'next';
import { FEATURES } from '@/lib/features';
import { FEATURE_ICONS } from '@/lib/feature-icons';
import { SiteHeader } from '@/components/game/game-header';
import { SiteFooter } from '@/components/site-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getBreadcrumbJsonLd, getCollectionPageJsonLd, safeJsonLd } from '@/lib/seo';

const BASE_URL = 'https://vibe-check.cloud';

export const metadata: Metadata = {
  title: 'Production Readiness Checklists for AI-Built Apps',
  description:
    '19 free checklists covering every feature vibe coders build — from auth to payments to AI. Find the production risks Cursor, Lovable, and other AI tools miss.',
  alternates: {
    canonical: `${BASE_URL}/features`,
  },
  openGraph: {
    title: 'Production Readiness Checklists for AI-Built Apps — Vibe Check',
    description:
      '19 free checklists covering every feature vibe coders build — from auth to payments to AI.',
    url: `${BASE_URL}/features`,
    images: [
      {
        url: '/vibe-check-og.png',
        width: 1200,
        height: 630,
        alt: 'Vibe Check — Production readiness checklists for AI-built apps',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Production Readiness Checklists for AI-Built Apps — Vibe Check',
    description:
      '19 free checklists covering every feature vibe coders build.',
    images: ['/vibe-check-og.png'],
  },
};

export default function FeaturesPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Vibe Check', url: BASE_URL },
    { name: 'Features', url: `${BASE_URL}/features` },
  ]);

  const collectionJsonLd = getCollectionPageJsonLd(
    'Production Readiness Checklists',
    '19 feature checklists for vibe coders building with AI coding tools',
    `${BASE_URL}/features`,
    FEATURES.map((feature) => ({
      name: feature.name,
      url: `${BASE_URL}/features/${feature.id}`,
    }))
  );

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(collectionJsonLd) }}
      />

      <SiteHeader backHref="/" backLabel="Home" />

      <main id="main-content" className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Vibe Check
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-foreground" aria-current="page">
                Features
              </li>
            </ol>
          </nav>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Production Readiness Checklists
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            19 feature checklists for vibe coders building with Cursor, Lovable,
            Bolt, v0, and Claude Code. Each checklist covers the production risks
            AI coding tools commonly miss.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const icon = FEATURE_ICONS[feature.id] ?? '📦';
              return (
                <Link key={feature.id} href={`/features/${feature.id}`} className="rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
                  <Card className="h-full transition-colors hover:bg-muted/50">
                    <CardHeader className="pb-2">
                      <span className="text-2xl">{icon}</span>
                      <CardTitle className="text-base">{feature.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {feature.shortDescription}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
