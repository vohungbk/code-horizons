import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccess() {
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="flex w-full items-center justify-center">
            <Check className="size-12 rounded-full bg-green-500/30 p-2 text-green-500" />
          </div>
          <div className="mt-3 w-full text-center sm:mt-5">
            <h2 className="text-xl font-bold">Payment Successfully</h2>
            <p className="tracking-light mt-2 text-sm text-muted-foreground">
              Congrats to your subscription. You can now create unlimted sites.
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
