import { EditArticleForm } from '@/app/components/dashboard/forms/EditArticleForm';
import prisma from '@/app/utils/db';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const getData = async (id: string) => {
  const data = await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
      articleContent: true,
      smallDescription: true,
      image: true,
      slug: true,
      id: true,
    },
  });
  if (!data) return notFound();

  return data;
};

export default async function EditArticleRoute({
  params,
}: {
  params: {
    siteId: string;
    articleId: string;
  };
}) {
  const data = await getData(params.articleId);

  return (
    <>
      <div className="flex items-center">
        <Button size="icon" variant="outline" className="mr-2">
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1>Edit Article</h1>
      </div>
      <EditArticleForm data={data} siteId={params.siteId} />
    </>
  );
}
