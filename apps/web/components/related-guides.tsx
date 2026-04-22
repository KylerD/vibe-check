import Link from 'next/link';

interface GuideInfo {
  slug: string;
  title: string;
  description: string;
}

const GUIDE_DATA: Record<string, GuideInfo> = {
  'vibe-coding-security': {
    slug: 'vibe-coding-security',
    title: 'Vibe Coding Security',
    description:
      'The biggest security risks in vibe coded apps and how to fix AI-generated code.',
  },
  'cursor-production-ready': {
    slug: 'cursor-production-ready',
    title: 'Is Your Cursor App Production Ready?',
    description:
      'Everything to check before shipping a Cursor-built app to production.',
  },
  'lovable-production-ready': {
    slug: 'lovable-production-ready',
    title: 'Is My Lovable App Production Ready?',
    description:
      'The production readiness checklist covering auth, rate limiting, and everything Lovable skips.',
  },
  'bolt-production-ready': {
    slug: 'bolt-production-ready',
    title: 'Is My Bolt App Production Ready?',
    description:
      'The production checklist for security, deployment, and the gaps Bolt leaves in AI-generated code.',
  },
  'v0-production-ready': {
    slug: 'v0-production-ready',
    title: 'Is My v0 App Production Ready?',
    description:
      'The production checklist for auth, API routes, database security, and error boundaries in v0 apps.',
  },
  'vibe-coding-risks': {
    slug: 'vibe-coding-risks',
    title: 'Vibe Coding Risks',
    description:
      'The complete risk landscape of AI-generated code — tech debt, reliability, scalability, and compliance.',
  },
  'vibe-coding-failures': {
    slug: 'vibe-coding-failures',
    title: 'Vibe Coding Failures of 2026',
    description:
      'Real AI-generated code failures — what broke and what a production readiness review would have caught.',
  },
  'ai-code-review-tools': {
    slug: 'ai-code-review-tools',
    title: 'AI Code Review Tools',
    description:
      'Compare the best tools for reviewing AI-generated code — static analysis, security scanners, and audits.',
  },
  'what-is-vibe-testing': {
    slug: 'what-is-vibe-testing',
    title: 'What Is Vibe Testing?',
    description:
      'How to systematically verify AI-generated code for hidden bugs, security gaps, and production risks.',
  },
};

const RELATED_GUIDES: Record<string, string[]> = {
  'vibe-coding-security': ['vibe-coding-risks', 'vibe-coding-failures', 'what-is-vibe-testing'],
  'cursor-production-ready': [
    'bolt-production-ready',
    'lovable-production-ready',
    'v0-production-ready',
  ],
  'lovable-production-ready': [
    'cursor-production-ready',
    'bolt-production-ready',
    'v0-production-ready',
  ],
  'bolt-production-ready': [
    'cursor-production-ready',
    'lovable-production-ready',
    'v0-production-ready',
  ],
  'v0-production-ready': [
    'cursor-production-ready',
    'bolt-production-ready',
    'lovable-production-ready',
  ],
  'vibe-coding-risks': ['vibe-coding-security', 'vibe-coding-failures', 'what-is-vibe-testing'],
  'vibe-coding-failures': ['vibe-coding-risks', 'vibe-coding-security', 'ai-code-review-tools'],
  'ai-code-review-tools': ['vibe-coding-security', 'what-is-vibe-testing', 'vibe-coding-risks'],
  'what-is-vibe-testing': ['ai-code-review-tools', 'vibe-coding-risks', 'vibe-coding-security'],
};

interface RelatedGuidesProps {
  slug: string;
}

export function RelatedGuides({ slug }: RelatedGuidesProps) {
  const relatedSlugs = RELATED_GUIDES[slug];
  if (!relatedSlugs) return null;

  const guides = relatedSlugs
    .map((relatedSlug) => GUIDE_DATA[relatedSlug])
    .filter(Boolean);

  if (guides.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="font-mono text-sm uppercase tracking-wide text-secondary-foreground mb-6">
        Related Guides
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`}>
            <div className="border-2 border-border p-4 hover:border-primary transition-colors h-full">
              <h3 className="font-mono text-sm font-semibold text-foreground mb-2">
                {guide.title}
              </h3>
              <p className="text-sm text-secondary-foreground">{guide.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
