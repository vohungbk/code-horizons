import { Button } from '@/components/ui/button';
import { FileIcon, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function SiteRoute() {
  return (
    <section>
      <div className="flex items-center justify-end">
        <Button asChild>
          <Link href={'/dashboard/sites/create'}>
            <PlusCircle className="mr-2 size-4" /> Create Site
          </Link>
        </Button>
      </div>
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
    </section>
  );
}

export default SiteRoute;
