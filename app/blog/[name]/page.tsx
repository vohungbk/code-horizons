import { ThemeToggle } from '@/app/components/dashboard/ThemeToggle';
import prisma from '@/app/utils/db';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DefaultImage from '@/public/default-image.jpg';

async function getData(subDir: string) {
  const data = await prisma.site.findUnique({
    where: {
      subdirectory: subDir,
    },
    select: {
      name: true,
      posts: {
        select: {
          smallDescription: true,
          title: true,
          image: true,
          createdAt: true,
          slug: true,
          id: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

async function BlogIndexPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const data = await getData(name);

  return (
    <>
      <nav className="my-10 grid grid-cols-3">
        <div className="col-span-1" />
        <div className="flex items-center justify-center gap-x-4">
          <Image src={'/logo.png'} alt="Logo" width={40} height={40} />
          <h1 className="text-3xl font-semibold tracking-tight">{data.name}</h1>
        </div>
        <div className="col-span-1 flex w-full justify-end">
          <ThemeToggle />
        </div>
      </nav>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {data.posts.map((site) => (
          <Card key={site.id}>
            <Image
              src={site.image ?? DefaultImage}
              alt={site.title}
              className="h-[200px] w-full rounded-t-lg object-cover"
              width={400}
              height={200}
            />
            <CardHeader>
              <CardTitle className="truncate">{site.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {site.smallDescription}
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Button asChild>
                <Link className="w-full" href={`/blog/${name}/${site.slug}`}>
                  <span>Read more</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default BlogIndexPage;
