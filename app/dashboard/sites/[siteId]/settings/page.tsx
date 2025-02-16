import { DeleteSiteAction } from '@/app/actions';
import { UploadImageForm } from '@/app/components/dashboard/forms/UploadImageForm';
import { SubmitButton } from '@/app/components/dashboard/SubmitButton';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ siteId: string }>;
}) {
  const { siteId } = await params;
  return (
    <>
      <div className="flex items-center gap-x-2">
        <Button size={'icon'} variant="outline">
          <Link href={`/dashboard/sites/${siteId}`}>
            <ChevronLeft className="size-4" />
          </Link>
        </Button>
        <h3 className="text-xl font-semibold">Go back</h3>
      </div>
      <UploadImageForm siteId={siteId} />
      <Card>
        <CardHeader>
          <CardTitle className="text-red-500">Danger</CardTitle>
          <CardDescription>
            This will delete your site and all articles associated with it. Click the
            button below to delete everything
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form action={DeleteSiteAction}>
            <input type="hidden" name="siteId" value={siteId} />
            <SubmitButton variant="destructive" text="Delete Everything" />
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
