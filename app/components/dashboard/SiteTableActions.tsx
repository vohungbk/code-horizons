'use client';

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { ModalConfirm } from '../ModalConfirm';
import { DeleteArticleForm } from './forms/DeleteArticleForm';

interface SiteTableActionsProps {
  siteId: string;
  articleId: string;
}

function SiteTableActions({ siteId, articleId }: SiteTableActionsProps) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <ModalConfirm
        open={isOpened}
        setIsOpen={setIsOpened}
        title="Delete Article"
        description="Are you sure you want to delete this article?"
      >
        <DeleteArticleForm
          setIsOpen={setIsOpened}
          articleId={articleId}
          siteId={siteId}
        />
      </ModalConfirm>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size="icon" asChild variant="ghost">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/sites/${siteId}/${articleId}`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem role="button">
            <Button
              className="!bg-transparent pl-0"
              onClick={() => setIsOpened(true)}
              type="button"
            >
              Delete
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default SiteTableActions;
