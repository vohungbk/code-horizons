import { z } from 'zod';

export const siteSchema = z.object({
  name: z.string().min(1).max(35),
  subdirectory: z.string().min(1).max(40),
  description: z.string().min(1).max(150),
});
