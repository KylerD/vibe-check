import type { MetadataRoute } from 'next';
import { FEATURES } from '@/lib/features';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vibe-check.cloud';

  const featurePages: MetadataRoute.Sitemap = FEATURES.map((feature) => ({
    url: `${baseUrl}/features/${feature.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...featurePages,
  ];
}
