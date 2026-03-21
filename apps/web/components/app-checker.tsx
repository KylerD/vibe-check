'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FEATURE_ICONS } from '@/lib/feature-icons';
import {
  getApproachFromTools,
  TOOLS,
  type Tool,
  type RecommendationResult,
} from '@/lib/recommendation-engine';
import { checkApp } from '@/app/actions';

const RISK_STYLES: Record<string, { label: string; variant: 'destructive' | 'default' | 'secondary' }> = {
  critical: { label: 'Critical', variant: 'destructive' },
  high: { label: 'High', variant: 'default' },
  moderate: { label: 'Moderate', variant: 'secondary' },
};

export function AppChecker() {
  const [description, setDescription] = useState('');
  const [selectedTools, setSelectedTools] = useState<Set<Tool>>(new Set());
  const [results, setResults] = useState<RecommendationResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [isPending, startTransition] = useTransition();

  function toggleTool(tool: Tool) {
    setSelectedTools((previous) => {
      const next = new Set(previous);
      if (next.has(tool)) {
        next.delete(tool);
      } else {
        next.add(tool);
      }
      return next;
    });
  }

  function handleSubmit() {
    setError(null);
    startTransition(async () => {
      const result = await checkApp(
        description,
        Array.from(selectedTools)
      );

      if (result.success) {
        setResults(result.recommendations);
        setShowAll(false);
      } else {
        setError(result.error);
      }
    });
  }

  const approachHint = selectedTools.size > 0
    ? getApproachFromTools(Array.from(selectedTools))
    : null;

  const visibleResults = results
    ? showAll ? results : results.slice(0, 7)
    : null;

  const hasMore = results ? results.length > 7 : false;

  return (
    <section
      id="check-your-app"
      className="border-t border-border bg-muted/30"
    >
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Check Your Vibe-Coded App for Production Risks
          </h2>
          <p className="mt-3 text-muted-foreground">
            Describe what you&apos;re building and we&apos;ll show you the
            features that need the most attention before you ship.
          </p>
        </div>

        <div className="mx-auto max-w-2xl space-y-6">
          <div>
            <label
              htmlFor="app-description"
              className="mb-2 block text-sm font-medium"
            >
              What are you building?
            </label>
            <textarea
              id="app-description"
              rows={4}
              maxLength={1000}
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/50"
              placeholder="e.g. A marketplace for freelance designers with payments, messaging, and user profiles"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <fieldset>
            <legend className="mb-2 block text-sm font-medium">
              What tools are you using?
            </legend>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Select tools">
              {TOOLS.map((tool) => (
                <button
                  key={tool.id}
                  type="button"
                  aria-pressed={selectedTools.has(tool.id)}
                  onClick={() => toggleTool(tool.id)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    selectedTools.has(tool.id)
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-foreground hover:bg-muted'
                  }`}
                >
                  {tool.label}
                </button>
              ))}
            </div>
          </fieldset>

          <Button
            size="lg"
            className="w-full"
            onClick={handleSubmit}
            disabled={description.trim().length === 0 || isPending}
          >
            {isPending ? 'Analyzing...' : 'Check my app'}
          </Button>

          {error && (
            <p className="text-sm text-center text-destructive">{error}</p>
          )}
        </div>

        {isPending && !visibleResults && (
          <div className="mt-12">
            <div className="mb-6 mx-auto h-5 w-48 animate-pulse rounded bg-muted" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="rounded-lg border border-border p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-8 w-8 animate-pulse rounded bg-muted" />
                    <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
                  </div>
                  <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-full animate-pulse rounded bg-muted" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>
        )}

        {visibleResults && (
          <div className="mt-12">
            <h3 className="mb-6 text-center text-lg font-semibold">
              {results!.length === 0
                ? 'Top features to review'
                : `${results!.length} feature${results!.length === 1 ? '' : 's'} to review`}
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleResults.map((result) => {
                const icon = FEATURE_ICONS[result.featureId] ?? '📦';
                const risk = RISK_STYLES[result.riskLevel];
                const href = approachHint
                  ? `/features/${result.featureId}?approach=${approachHint}`
                  : `/features/${result.featureId}`;

                return (
                  <Link key={result.featureId} href={href} className="rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
                    <Card className="h-full transition-colors hover:bg-muted/50">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{icon}</span>
                          <Badge variant={risk.variant} className="rounded-full">
                            {risk.label}
                          </Badge>
                        </div>
                        <CardTitle className="text-base">
                          {result.featureName}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {result.headline || result.shortDescription}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {hasMore && !showAll && (
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  onClick={() => setShowAll(true)}
                >
                  Show all {results!.length} results
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
