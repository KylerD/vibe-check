import { z } from 'zod';

const MAX_DESCRIPTION_LENGTH = 1000;
const MIN_ALPHA_RATIO = 0.5;

const ToolSchema = z.enum(['lovable', 'cursor', 'bolt', 'v0', 'chatgpt', 'claude-code']);

function sanitizeDescription(input: string): string {
  let sanitized = input.replace(/<[^>]*>/g, '');
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  sanitized = sanitized.replace(/[ \t]+/g, ' ');
  sanitized = sanitized.replace(/\n{3,}/g, '\n\n');
  return sanitized.trim();
}

function hasEnoughAlpha(input: string): boolean {
  const stripped = input.replace(/\s/g, '');
  if (stripped.length === 0) return false;
  const alphaCount = (stripped.match(/[a-zA-Z]/g) || []).length;
  return alphaCount / stripped.length >= MIN_ALPHA_RATIO;
}

export const CheckAppSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, 'Please describe what you are building')
    .max(MAX_DESCRIPTION_LENGTH, `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`)
    .transform(sanitizeDescription)
    .pipe(
      z.string()
        .min(1, 'Please describe what you are building')
        .refine(hasEnoughAlpha, {
          message: 'Please enter a real description of what you are building',
        })
    ),
  tools: z.array(ToolSchema).default([]),
});

export type CheckAppInput = z.infer<typeof CheckAppSchema>;
