import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { SubmitButton } from '../dashboard/SubmitButton';
import { CreateSubscription } from '@/app/actions';

interface iAppProps {
  id: number;
  cardTitle: string;
  cardDescription: string;
  priceTitle: string;
  benefits: string[];
}

export const PricingPlans: iAppProps[] = [
  {
    id: 0,
    cardTitle: 'Freelancer',
    cardDescription: 'The best pricing plan for people starting out.',
    benefits: [
      '1 Site',
      'Up to 1000 Visitors',
      'Up to 1000 Visitors',
      'Up to 1000 Visitors',
    ],
    priceTitle: 'Free',
  },
  {
    id: 1,
    cardTitle: 'Startup',
    cardDescription: 'The best pricing plan for professionals',
    priceTitle: '$39',
    benefits: [
      'Unlimited Sites',
      'Unlimited Visitors',
      'Unlimited Visitors',
      'Unlimited Visitors',
    ],
  },
];

export function PricingTable() {
  return (
    <>
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-semibold text-primary">Pricing</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Pricing Plans for everyone and every budget!
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-center leading-tight text-muted-foreground">
          Our pricing plans are designed to be affordable for everyone, catering to
          different needs and budgets. Choose a plan that fits you best, with flexible
          options for individuals and businesses alike
        </p>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {PricingPlans.map((item) => (
          <Card key={item.id} className={item.id === 1 ? 'border-primary' : ''}>
            <CardHeader>
              <CardTitle>
                {item.id === 1 ? (
                  <div className="flex items-center justify-between">
                    <h3 className="text-primary">Startup</h3>
                    <p className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold leading-5 text-primary">
                      Most popular
                    </p>
                  </div>
                ) : (
                  item.cardTitle
                )}
              </CardTitle>
              <CardDescription>{item.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-6 text-4xl font-bold tracking-tight">{item.priceTitle}</p>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {item.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-x-3">
                    <Check className="size-5 text-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {item.id === 1 ? (
                <form className="w-full" action={CreateSubscription}>
                  <SubmitButton className="mt-5 w-full" text="Buy Plan" />
                </form>
              ) : (
                <Button asChild variant="outline" className="mt-5 w-full">
                  <Link href={'/dashboard'}>Try for free</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
