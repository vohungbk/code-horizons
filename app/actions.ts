/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { parseWithZod } from '@conform-to/zod';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import prisma from './utils/db';
import { siteSchema } from './utils/schema';

export async function CreateSiteAction(preState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || user?.id === null) {
    return redirect('/api/auth/login');
  }

  const submission = parseWithZod(formData, {
    schema: siteSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const response = await prisma.site.create({
    data: {
      description: submission.value.description,
      name: submission.value.name,
      subdirectory: submission.value.subdirectory,
      userId: user.id,
    },
  });

  return redirect('/dashboard/sites');
}
