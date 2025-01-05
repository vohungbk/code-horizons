import { use } from 'react';
import prisma from '../utils/db';
import { requireUser } from '../utils/requireUser';
import { EmptyState } from '../components/dashboard/EmptyState';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DefaultImage from '@/public/default-image.jpg';

const getData = async (userId: string) => {
  const [sites, articles] = await Promise.all([
    prisma.site.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
    }),
    prisma.post.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
    }),
  ]);

  return { sites, articles };
};

export default async function Dashboard() {
  const user = await requireUser();
  const { sites, articles } = await getData(user.id);

  return (
    <>
      <h4 className="mb-5 text-xl font-semibold">Your Sites</h4>
      {sites === undefined || sites.length === 0 ? (
        <EmptyState
          description="You currently don't have any sites created. Click the button above to create your first site."
          title="You don't have any Sites created"
          buttonText="Create Site"
          href="/dashboard/sites/create"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {sites.map((site) => (
            <Card key={site.id}>
              <Image
                src={site.imageUrl ?? DefaultImage}
                alt={site.name}
                className="h-[200px] w-full rounded-t-lg object-cover"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{site.name}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {site.description}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Button asChild>
                  <Link className="w-full" href={`/dashboard/sites/${site.id}`}>
                    <span>View Articles</span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      <h4 className="mb-5 mt-10 text-xl font-semibold">Recent Articles</h4>
      {articles === undefined || articles.length === 0 ? (
        <EmptyState
          description="You currently don't have any article created. Click the button above to create your first site."
          title=" You don't have any Articles created"
          buttonText="Create Article"
          href={`/dashboard/sites`}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {articles.map((article) => (
            <Card key={article.id}>
              <Image
                src={article.image ?? DefaultImage}
                alt={article.title}
                className="h-[200px] w-full rounded-t-lg object-cover"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{article.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {article.smallDescription}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Button asChild>
                  <Link className="w-full" href={`/dashboard/sites/${article.siteId}`}>
                    <span>View Articles</span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
