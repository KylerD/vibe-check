import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { FEATURES } from '@/lib/features';
import { FEATURE_ICONS } from '@/lib/feature-icons';
import { getFeatureContent } from '@/lib/content/loader';
import { SiteHeader } from '@/components/game/game-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ApproachContent } from '@/components/approach-content';
import { SiteFooter } from '@/components/site-footer';
import { getFeatureArticleJsonLd, getBreadcrumbJsonLd, safeJsonLd } from '@/lib/seo';
import { getRelatedFeatures } from '@/lib/feature-relations';

export const dynamicParams = false;

export function generateStaticParams() {
  return FEATURES.map((feature) => ({ id: feature.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const feature = FEATURES.find((feature) => feature.id === id);
  if (!feature) return {};

  const content = getFeatureContent(feature.name);
  const title = `${feature.name} Checklist for AI-Built Apps`;
  const description = `Vibe coding ${feature.name.toLowerCase()}? AI tools like Cursor and Lovable miss critical production risks. Free ${feature.name.toLowerCase()} checklist for AI-built apps.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://vibe-check.cloud/features/${id}`,
    },
    openGraph: {
      title: `${feature.name} Checklist for AI-Built Apps — Vibe Check`,
      description,
      url: `https://vibe-check.cloud/features/${id}`,
      images: [
        {
          url: "/vibe-check-og.png",
          width: 1200,
          height: 630,
          alt: `${feature.name} production readiness guide — Vibe Check`,
        },
      ],
      type: "article",
      ...(content?.dangerZone && {
        section: 'Developer Tools',
        tags: [feature.name, 'vibe coding', 'production readiness', 'AI code review', content.dangerZone.riskLevel + ' risk'],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${feature.name} Checklist for AI-Built Apps — Vibe Check`,
      description,
      images: ["/vibe-check-og.png"],
    },
  };
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const feature = FEATURES.find((feature) => feature.id === id);
  if (!feature) notFound();

  const content = getFeatureContent(feature.name);
  const icon = FEATURE_ICONS[feature.id] ?? '📦';

  const baseUrl = 'https://vibe-check.cloud';

  const articleJsonLd = getFeatureArticleJsonLd(feature, content ?? undefined);
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Vibe Check', url: baseUrl },
    { name: 'Features', url: `${baseUrl}/features` },
    { name: feature.name, url: `${baseUrl}/features/${id}` },
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

      <SiteHeader backHref="/" backLabel="All features" />

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
              <li>
                <Link href="/features" className="transition-colors hover:text-foreground">
                  Features
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground font-medium" aria-current="page">
                {feature.name}
              </li>
            </ol>
          </nav>

          <header className="mb-8 flex items-center gap-4">
            <span className="text-4xl" role="img" aria-label={`${feature.name} icon`}>
              {icon}
            </span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {feature.name} Checklist for AI-Built Apps
              </h1>
              <p className="text-muted-foreground">{feature.shortDescription}</p>
            </div>
          </header>

          <p className="mb-8 text-muted-foreground">
            When you vibe code {feature.name.toLowerCase()} with tools like Cursor,
            Lovable, Bolt, v0, or Claude Code, the generated code often works in
            development but misses critical production requirements. This checklist
            helps you catch what AI missed before you ship.
          </p>

          {!content ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  Content coming soon for this feature.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-10">
              <DangerZoneSection dangerZone={content.dangerZone} />
              <Separator />
              <ApproachContent
                featureId={id}
                auditPrompts={content.auditPrompts}
                checklist={content.checklist}
              />
              <Separator />
              <SmartMoveSection smartMove={content.smartMove} />
              <Separator />
              <DidYouKnowSection didYouKnow={content.didYouKnow} />
            </div>
          )}

          <RelatedChecksSection featureId={id} />
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}

function DangerZoneSection({
  dangerZone,
}: {
  dangerZone: {
    headline: string;
    hiddenComplexity: string;
    failureScenario: string;
    riskLevel: string;
    timeToBreak: string;
    commonMistakes: string[];
  };
}) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">Danger Zone</h2>
        <Badge variant="destructive">{dangerZone.riskLevel} risk</Badge>
      </div>

      <p className="text-lg font-medium">{dangerZone.headline}</p>

      <p className="text-muted-foreground">{dangerZone.hiddenComplexity}</p>

      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="py-4">
          <p className="text-sm font-medium text-destructive mb-2">
            Failure scenario
          </p>
          <p className="text-sm">{dangerZone.failureScenario}</p>
        </CardContent>
      </Card>

      <div>
        <p className="mb-3 text-sm font-medium">Common mistakes</p>
        <ul className="space-y-2">
          {dangerZone.commonMistakes.map((mistake) => (
            <li key={mistake} className="flex items-start gap-2 text-sm">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
              <span className="text-muted-foreground">{mistake}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-muted-foreground">
        Time to break: {dangerZone.timeToBreak}
      </p>
    </section>
  );
}

function SmartMoveSection({
  smartMove,
}: {
  smartMove: {
    recommendation: string;
    reasoning: string;
    services: Array<{
      name: string;
      description: string;
      freeTier: string;
    }>;
    tradeoffs: string;
  };
}) {
  const recommendationLabel = {
    'fix-it': 'Fix it yourself',
    'use-a-service': 'Use a service',
    depends: 'It depends',
  }[smartMove.recommendation] ?? smartMove.recommendation;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">Smart Move</h2>
        <Badge>{recommendationLabel}</Badge>
      </div>

      <p className="text-muted-foreground">{smartMove.reasoning}</p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {smartMove.services.map((service) => (
          <Card key={service.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
              <p className="mt-2 text-sm font-medium">{service.freeTier}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-muted">
        <CardContent className="py-4">
          <p className="text-sm font-medium mb-1">Tradeoffs</p>
          <p className="text-sm text-muted-foreground">{smartMove.tradeoffs}</p>
        </CardContent>
      </Card>
    </section>
  );
}

function DidYouKnowSection({
  didYouKnow,
}: {
  didYouKnow: { stat: string; source: string };
}) {
  return (
    <section>
      <Card>
        <CardContent className="py-6">
          <p className="text-sm font-medium mb-2">Did you know?</p>
          <p className="text-sm">{didYouKnow.stat}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Source: {didYouKnow.source}
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

function RelatedChecksSection({ featureId }: { featureId: string }) {
  const related = getRelatedFeatures(featureId);
  if (related.length === 0) return null;

  return (
    <section className="mt-10 border-t border-border pt-10">
      <h2 className="mb-4 text-xl font-semibold">Related Checks</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {related.map((relatedFeature) => {
          const relatedIcon = FEATURE_ICONS[relatedFeature.id] ?? '📦';
          return (
            <Link
              key={relatedFeature.id}
              href={`/features/${relatedFeature.id}`}
              className="group rounded-lg border border-border p-4 transition-colors hover:bg-muted/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
            >
              <div className="flex items-center gap-2">
                <span role="img" aria-label={relatedFeature.name}>
                  {relatedIcon}
                </span>
                <span className="font-medium group-hover:underline">
                  {relatedFeature.name}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {relatedFeature.shortDescription}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
