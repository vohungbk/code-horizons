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
  params: Promise<{
    siteId: string;
    articleId: string;
  }>;
}) {
  const { articleId, siteId } = await params;
  const data = await getData(articleId);

  return (
    <>
      <div className="flex items-center">
        <Button size="icon" variant="outline" className="mr-2">
          <Link href={`/dashboard/sites/${siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1>Edit Article</h1>
      </div>
      <EditArticleForm data={data} siteId={siteId} />
    </>
  );
}
