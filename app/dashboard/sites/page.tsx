import prisma from '@/app/utils/db';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { FileIcon, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import DefaultImage from '@/public/default-image.jpg';

async function getData(userId: string) {
  const data = await prisma.site.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
}

async function SiteRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect('/api/auth/login');
  }
  const data = await getData(user.id);

  return (
    <section>
      <div className="mb-4 flex items-center justify-end">
        <Button asChild>
          <Link href={'/dashboard/sites/create'}>
            <PlusCircle className="mr-2 size-4" /> Create Site
          </Link>
        </Button>
      </div>
      {data === undefined || data.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
            <FileIcon className="size-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">
            You don&apos;t have any Sites created
          </h2>
          <p className="mx-auto mb-8 mt-2 max-w-sm text-center text-sm leading-6 text-muted-foreground">
            You currently don&apos;t have any sites created. Click the button above to
            create your first site.
          </p>
          <Button asChild>
            <Link href={'/dashboard/sites/create'}>
              <PlusCircle className="mr-2 size-4" /> Create Site
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {data.map((site) => (
            <Card key={site.id}>
              <Image
                src={site.imageUrl ?? DefaultImage}
                alt={site.name}
                className="h-[200px] w-full rounded-t-lg object-cover"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle>{site.name}</CardTitle>
                <CardDescription>{site.description}</CardDescription>
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
    </section>
  );
}

export default SiteRoute;
