import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vibe Check — Production Readiness Scanner for AI-Built Apps',
    short_name: 'Vibe Check',
    description:
      'Free, open-source Claude Code plugin that scans AI-generated codebases for hidden production risks across security, payments, auth, and more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#09090b',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
