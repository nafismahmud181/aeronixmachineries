import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Files are written by Keystatic (see keystatic.config.ts). The file name is the URL slug.
const categories = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/categories' }),
  schema: z.object({
    name: z.string(),
    subtitle: z.string().default(''),
    icon: z.string().default('factory'),
    image: z.string().nullable().optional(),
    order: z.number().default(99)
  })
});

const products = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    model: z.string(),
    category: reference('categories'),
    image: z.string().nullable().optional(),
    description: z.string().default(''),
    capacity: z.string().default(''),
    power: z.string().default(''),
    voltage: z.string().default(''),
    weight: z.string().default(''),
    dimensions: z.string().default(''),
    scale: z.enum(['both', 'small', 'factory']).default('both'),
    featured: z.boolean().default(false),
    features: z.array(z.string()).default([]),
    bestFor: z.string().default(''),
    order: z.number().default(99)
  })
});

export const collections = { categories, products };
