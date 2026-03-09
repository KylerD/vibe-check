'use server';

import { aiService } from '@/services/ai.service';
import { getFeatureContent } from '@/lib/content/loader';
import { FEATURES } from '@/lib/features';
import { prettifyError } from '@/lib/utils';
import {
  getRecommendations,
  type RecommendationResult,
} from '@/lib/recommendation-engine';
import { CheckAppSchema } from '@/models/recommendation-schema';

export async function checkApp(
  description: string,
  tools: string[] = []
): Promise<RecommendationResult[]> {
  const validated = CheckAppSchema.safeParse({ description, tools });

  if (!validated.success) {
    throw new Error(prettifyError(validated.error));
  }

  const { description: trimmedDescription, tools: validatedTools } = validated.data;

  try {
    const { features: matched } = await aiService.matchFeatures(trimmedDescription, validatedTools);

    if (matched.length === 0) {
      throw new Error(
        'That doesn\'t look like an app description. Try something like "A marketplace for freelance designers with payments and messaging".'
      );
    }

    const featureMap = new Map(FEATURES.map((feature) => [feature.id, feature]));

    return matched
      .map((match) => {
        const feature = featureMap.get(match.id);
        if (!feature) return null;

        const content = getFeatureContent(feature.name);
        const riskLevel = content?.dangerZone.riskLevel ?? 'moderate';

        return {
          featureId: feature.id,
          featureName: feature.name,
          shortDescription: feature.shortDescription,
          headline: content?.dangerZone.headline ?? '',
          riskLevel: riskLevel as RecommendationResult['riskLevel'],
          score: 0,
          icon: '',
        };
      })
      .filter((result): result is RecommendationResult => result !== null);
  } catch (error) {
    if (error instanceof Error && error.message.includes('doesn\'t look like')) {
      throw error;
    }
    return getRecommendations(trimmedDescription);
  }
}
