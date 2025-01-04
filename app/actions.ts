'use server';

import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'next/navigation';
import prisma from './utils/db';
import { requireUser } from './utils/requireUser';
import { postSchema, siteSchema } from './utils/schema';

export async function CreateSiteAction(preState: any, formData: FormData) {
  const user = await requireUser();

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

export async function CreatePostAction(preState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: postSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const response = await prisma.post.create({
    data: {
      title: submission.value.title,
      slug: submission.value.slug,
      smallDescription: submission.value.smallDescription,
      articleContent: JSON.parse(submission.value.articleContent),
      image: submission.value.coverImage,
      userId: user.id,
      siteId: formData.get('siteId') as string,
    },
  });
  return redirect(`/dashboard/sites/${formData.get('siteId')}`);
}

export async function EditPostAction(preState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: postSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const data = await prisma.post.update({
    where: {
      userId: user.id,
      id: formData.get('articleId') as string,
    },
    data: {
      title: submission.value.title,
      smallDescription: submission.value.smallDescription,
      slug: submission.value.slug,
      image: submission.value.coverImage,
      articleContent: JSON.parse(submission.value.articleContent),
    },
  });

  return redirect(`/dashboard/sites/${formData.get('siteId')}`);
}

export async function DeletePostAction(preState: any, formData: FormData) {
  const user = await requireUser();

  const response = await prisma.post.delete({
    where: {
      userId: user.id,
      id: formData.get('articleId') as string,
    },
  });

  return response;
}

export async function UpdateImage(formData: FormData) {
  const user = await requireUser();

  const data = await prisma.site.update({
    where: {
      userId: user.id,
      id: formData.get('siteId') as string,
    },
    data: {
      imageUrl: formData.get('imageUrl') as string,
    },
  });

  redirect(`/dashboard/sites`);
}

export async function DeleteSiteAction(formData: FormData) {
  const user = await requireUser();

  const response = await prisma.site.delete({
    where: {
      userId: user.id,
      id: formData.get('siteId') as string,
    },
  });

  return redirect('/dashboard/sites');
}
