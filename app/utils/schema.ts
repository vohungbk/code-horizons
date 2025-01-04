import { conformZodMessage } from '@conform-to/zod';
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

export function SiteCreationSchema(options?: { isSubdirectory: () => Promise<boolean> }) {
  return z.object({
    subdirectory: z
      .string()
      .min(1)
      .max(40)
      .regex(/^[a-z]+$/, 'Subdirectory must only use lowercase letters.')
      .transform((value) => value.toLowerCase())
      .pipe(
        z.string().superRefine((email, ctx) => {
          if (typeof options?.isSubdirectory !== 'function') {
            return ctx.addIssue({
              code: 'custom',
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true,
            });
          }

          return options.isSubdirectory().then((isUnique) => {
            if (!isUnique) {
              return ctx.addIssue({
                code: 'custom',
                message: 'Subdirectory is already taken...',
              });
            }
          });
        }),
      ),
    name: z.string().min(1).max(35),
    description: z.string().min(1).max(150),
  });
}
