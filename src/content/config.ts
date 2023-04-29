import { defineCollection, z } from 'astro:content';

export const collections = {
  projects: defineCollection({
    schema: z.object({
      draft: z.boolean().default(false),
      date: z.date().transform((s => new Date(s))),
      title: z.string(),
      tags: z.array(z.string()).optional(),
      share: z.object({
        image: z.string().optional(),
        title: z.string(),
        description: z.string(),
      }).strict()
    })
  })
};
