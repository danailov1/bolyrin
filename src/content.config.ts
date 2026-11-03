import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    standfirst: z.string(),
    category: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string(),
    authorRole: z.string().optional(),
    readingTime: z.number().int().positive().optional(),
    badge: z.string().optional(),
    featured: z.boolean().default(false),
    lead: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    heroNote: z.string(),
    heroAlt: z.string(),
    heroSrc: z.string().optional(),
    heroCaption: z.string().optional(),
    heroCredit: z.string().optional(),
    paywalled: z.boolean().default(false),
    draft: z.boolean().default(false),
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional()
      })
      .optional()
  })
});

export const collections = { articles };
