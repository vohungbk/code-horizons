'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React, { FC } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  text: string;
  className?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
}

export const SubmitButton: FC<SubmitButtonProps> = ({ text, className, variant }) => {
  const { pending } = useFormStatus();
  return pending ? (
    <Button disabled variant={variant} className={cn('w-fit', className)}>
      <Loader2 className="mr-2 size-4" /> Please Wait
    </Button>
  ) : (
    <Button className={cn('w-fit', className)} variant={variant} type="submit">
      {text}
    </Button>
  );
};
