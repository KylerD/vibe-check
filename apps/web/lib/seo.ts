import type { Feature } from '@/lib/types/game';

const BASE_URL = 'https://vibe-check.cloud';
const SITE_NAME = 'Vibe Check';

export function safeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    description:
      'Open source Claude Code plugin that scans AI-generated codebases for hidden production risks across security, payments, auth, and more.',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/vibe-check-og.png`,
        width: 1200,
        height: 630,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/#check-your-app`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getSoftwareApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'vibe-check-cc',
    description:
      'CLI plugin for Claude Code that scans AI-generated codebases for hidden production risks across security, payments, auth, and more.',
    url: BASE_URL,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS, Linux, Windows',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'Vibe Check',
      url: 'https://github.com/Hypership-Software/vibe-check',
    },
    softwareVersion: '1.3.0',
    downloadUrl: 'https://github.com/Hypership-Software/vibe-check',
    screenshot: `${BASE_URL}/vibe-check-og.png`,
  };
}

export function getFaqJsonLd(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getFeatureArticleJsonLd(feature: Feature, featureContent?: {
  dangerZone?: { headline: string; hiddenComplexity: string; riskLevel: string };
  smartMove?: { recommendation: string; reasoning: string };
  didYouKnow?: { stat: string; source: string };
}) {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${feature.name} — Production Readiness Guide for AI-Built Apps`,
    description: feature.shortDescription,
    url: `${BASE_URL}/features/${feature.id}`,
    image: `${BASE_URL}/vibe-check-og.png`,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/vibe-check-og.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/features/${feature.id}`,
    },
    about: {
      '@type': 'Thing',
      name: feature.name,
      description: feature.shortDescription,
    },
  };

  if (featureContent?.dangerZone) {
    jsonLd.articleBody = featureContent.dangerZone.hiddenComplexity;
  }

  return jsonLd;
}

export function getGuideArticleJsonLd(
  headline: string,
  description: string,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline,
    description,
    url,
    image: `${BASE_URL}/vibe-check-og.png`,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/vibe-check-og.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

export function getBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getCollectionPageJsonLd(
  name: string,
  description: string,
  url: string,
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

export const HOME_FAQS = [
  {
    question: 'What is Vibe Check?',
    answer:
      'Vibe Check is a free, open-source toolkit for catching hidden production risks in AI-generated codebases. It works with 9 major AI coding tools — Claude Code, Cursor, Gemini CLI, Codex CLI, VS Code Copilot, Kiro, OpenCode, Antigravity, and Pi. It scans your actual code across 12 production domains including security, performance, accessibility, testing, and monitoring — then gives you prioritized findings with plain-language fix instructions. The web app at vibe-check.cloud helps you explore what features your app needs and understand the risks involved before you start building.',
  },
  {
    question: 'What is vibe coding?',
    answer:
      'Vibe coding is the practice of building software primarily using AI coding assistants like Claude Code, Cursor, Lovable, Bolt, and v0. While these tools dramatically speed up development, they can miss critical production requirements around security, reliability, and compliance that experienced developers would catch.',
  },
  {
    question: 'How do I install Vibe Check?',
    answer:
      'Run "npx skills add Hypership-Software/vibe-check" in your terminal. It auto-detects your AI coding tool and installs the right skill files. Then use "/check" to scan your codebase for production risks. You can also download the universal ZIP from GitHub releases for manual installation. No installation is needed for the web app — just visit vibe-check.cloud.',
  },
  {
    question: 'What does Vibe Check scan for?',
    answer:
      'Vibe Check assesses your codebase across 12 domains: Security (secrets, auth, input validation, headers, CORS, rate limiting), Performance (images, code splitting, caching, fonts, database queries), Accessibility (alt text, form labels, keyboard navigation, ARIA, motion), Testing (test runner, test files, E2E, CI integration), Monitoring (error tracking, structured logging, health checks, APM), CI/CD (pipeline, build verification, migrations, environments), Discoverability (meta tags, OpenGraph, sitemap, robots.txt), Analytics (visitor tracking, conversions), Reliability (backups, error handling, database connections), and Legal (privacy policy, terms, cookie consent, data deletion). It also checks Platform compatibility and AI Security when applicable. The web app covers the same domains through guided feature recommendations.',
  },
  {
    question: 'Is Vibe Check free?',
    answer:
      'Yes, Vibe Check is completely free and open source. Both the skills toolkit and the web app are available at no cost. You can view the full source code on GitHub.',
  },
  {
    question: 'What AI coding tools does Vibe Check support?',
    answer:
      'Vibe Check works with 9 AI coding tools: Claude Code, Cursor, Gemini CLI, Codex CLI, VS Code Copilot, Kiro, OpenCode, Antigravity, and Pi. Install once with "npx skills add Hypership-Software/vibe-check" and it auto-detects your tool. The web app works with any workflow — describe what you built with any AI tool and get tailored recommendations.',
  },
  {
    question: 'How is Vibe Check different from a linter or static analysis tool?',
    answer:
      'Traditional linters check code syntax and style. Vibe Check goes deeper — it evaluates architectural decisions, missing security patterns, production readiness gaps, and business logic risks that AI coding tools commonly miss. It uses specialized agents to assess 12 domains in parallel and provides actionable fix instructions you can use directly in your AI tool.',
  },
  {
    question: 'When should I use the web app vs the skills toolkit?',
    answer:
      'Use the web app at vibe-check.cloud when planning your app or exploring what features you need — it gives personalized risk assessments and recommendations without requiring any code. Use the skills toolkit when you have an existing codebase and want a deep scan with specific, actionable findings tied to your actual code.',
  },
  {
    question: 'Is vibe coded software safe for production?',
    answer:
      'Vibe coded software can be production-ready, but it requires a systematic review first. AI coding tools like Cursor, Lovable, and Claude Code generate code that works in development but often misses security hardening, error handling, rate limiting, and compliance requirements. Vibe Check scans for these gaps automatically across 12 production domains.',
  },
  {
    question: 'What security risks does AI-generated code have?',
    answer:
      'Common security gaps in AI-generated code include missing rate limiting on login attempts, non-expiring session tokens, predictable password reset links, unvalidated file uploads, exposed API keys, missing input sanitization, insecure CORS configuration, and absent security headers. These are exactly the patterns that Vibe Check scans for across your codebase.',
  },
  {
    question: 'Can I use Cursor or Lovable to build a production app?',
    answer:
      'Yes — Cursor, Lovable, Bolt, v0, and Claude Code can all produce production-quality code, but the output needs review before shipping. AI tools optimize for making things work, not for making things safe and scalable. Use Vibe Check to identify the gaps between "it works" and "it\'s production ready."',
  },
  {
    question: 'What does production readiness mean for AI-built apps?',
    answer:
      'Production readiness means your app handles real-world conditions: authentication is secure, payments process correctly, errors are tracked, data is backed up, and you comply with privacy regulations. Vibe Check evaluates these across 12 domains — Security, Performance, Accessibility, Testing, Monitoring, CI/CD, Discoverability, Analytics, Reliability, and Legal — and scores your app out of 100 across four bands: Production Ready (90-100), Launch Ready (75-89), Needs Work (60-74), and Early Stage (0-59).',
  },
  {
    question: 'How do I know if my vibe coded app is ready to launch?',
    answer:
      'Run "/check" in your AI coding tool for a full codebase scan, or use the web app at vibe-check.cloud to get a feature-by-feature risk assessment. You\'ll get a score out of 100 with a clear band — Launch Ready (75+) means you\'re safe to put in front of early users. Use "/fix" to apply fixes and "/refresh" to track progress over time.',
  },
];
