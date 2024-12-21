'use client';

import { navLinks } from '@/app/dashboard/layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function DashboardItems() {
  const pathname = usePathname();
  return (
    <>
      {navLinks?.map((item) => (
        <Link
          href={item.href}
          key={item.name}
          className={cn(
            pathname === item.href
              ? 'bg-muted text-primary'
              : 'bg-none text-muted-foreground',
            'flex items-center gap-3 rounded-lg p-2 transition-all hover:text-primary/40',
          )}
        >
          <item.icon className="size-4" />
          {item.name}
        </Link>
      ))}
    </>
  );
}

export default DashboardItems;
