import { z } from 'zod';

export const siteSchema = z.object({
  name: z.string().min(1).max(35),
  subdirectory: z.string().min(1).max(40),
  description: z.string().min(1).max(150),
});

export const postSchema = z.object({
  title: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  coverImage: z.string().min(1),
  smallDescription: z.string().min(1),
  articleContent: z.string().min(1),
});
