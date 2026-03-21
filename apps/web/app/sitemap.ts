import type { MetadataRoute } from 'next';
import { FEATURES } from '@/lib/features';

const LAST_CONTENT_UPDATE = '2026-03-09';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vibe-check.cloud';
  const contentDate = new Date(LAST_CONTENT_UPDATE);

  const featurePages: MetadataRoute.Sitemap = FEATURES.map((feature) => ({
    url: `${baseUrl}/features/${feature.id}`,
    lastModified: contentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: contentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: contentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/vibe-coding-security`,
      lastModified: contentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/cursor-production-ready`,
      lastModified: contentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...featurePages,
  ];
}
