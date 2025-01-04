import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage({ params }: { params: { siteId: string } }) {
  return (
    <>
      <div className="flex items-center gap-x-2">
        <Button size={'icon'} variant="outline">
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ChevronLeft className="size-4" />
          </Link>
        </Button>
        <h3 className="text-xl font-semibold">Go back</h3>
      </div>
    </>
  );
}
