'use server';

import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'next/navigation';
import prisma from './utils/db';
import { requireUser } from './utils/requireUser';
import { postSchema, SiteCreationSchema } from './utils/schema';
import { stripe } from './utils/stripe';

export async function CreateSiteAction(preState: any, formData: FormData) {
  const user = await requireUser();

  const [subStatus, sites] = await Promise.all([
    prisma.subscription.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        status: true,
      },
    }),
    prisma.site.findMany({
      where: {
        userId: user.id,
      },
    }),
  ]);

  if (!subStatus || subStatus.status !== 'active') {
    if (sites.length < 1) {
      await createSite();
    } else {
      redirect('/dashboard/pricing');
    }
  } else if (subStatus.status === 'active') {
    await createSite();
  }
  async function createSite() {
    const submission = await parseWithZod(formData, {
      schema: SiteCreationSchema({
        async isSubdirectory() {
          const isSubdirectoryUnique = await prisma.site.findUnique({
            where: {
              subdirectory: formData.get('subdirectory') as string,
            },
          });
          return !isSubdirectoryUnique;
        },
      }),
      async: true,
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
  }
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

export async function CreateSubscription() {
  const user = await requireUser();

  let stripeUserId = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      email: true,
      customerId: true,
      firstName: true,
    },
  });

  if (!stripeUserId?.customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: stripeUserId?.email,
      name: stripeUserId?.firstName,
    });

    stripeUserId = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        customerId: stripeCustomer.id,
      },
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeUserId.customerId as string,
    mode: 'subscription',
    billing_address_collection: 'auto',
    payment_method_types: ['card'],
    customer_update: {
      address: 'auto',
      name: 'auto',
    },
    success_url:
      process.env.NODE_ENV === 'production'
        ? ''
        : 'http://localhost:3000/dashboard/payment/success',
    cancel_url:
      process.env.NODE_ENV === 'production'
        ? ''
        : 'http://localhost:3000/dashboard/payment/cancelled',
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
  });

  return redirect(session.url!);
}
