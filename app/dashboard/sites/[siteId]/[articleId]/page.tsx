import { Button } from '@/components/ui/button';
import { ArrowLeft, Backpack, BadgeCheck } from 'lucide-react';
import Link from 'next/link';

export default function EditArticleRoute({
  params,
}: {
  params: {
    siteId: string;
    articleId: string;
  };
}) {
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
    </>
  );
}
