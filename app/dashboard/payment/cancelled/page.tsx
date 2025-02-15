import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { XIcon } from 'lucide-react';
import Link from 'next/link';

export default function CancelledRoute() {
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="flex w-full items-center justify-center">
            <XIcon className="size-12 rounded-full bg-red-500/30 p-2 text-red-500" />
          </div>
          <div className="mt-3 w-full text-center sm:mt-5">
            <h2 className="text-xl font-bold">Payment Cancelled</h2>
            <p className="tracking-light mt-2 text-sm text-muted-foreground">
              No worries, you wont be charged. Please try again.
            </p>
            <Button className="mt-5 w-full" asChild>
              <Link href={'/dashboard'}>Go back to dashboard</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
