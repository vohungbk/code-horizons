'use client';

import { DeletePostAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';

interface DeleteArticleFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  articleId: string;
  siteId: string;
}

export const DeleteArticleForm: FC<DeleteArticleFormProps> = ({
  setIsOpen,
  articleId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('articleId', articleId);

    const response = await DeletePostAction(null, formData);
    setIsLoading(false);
    if (response.id) {
      setIsOpen(false);
      router.refresh();
    }
  };

  return (
    <form className="space-y-6 px-4 sm:px-0">
      <div className="flex w-full justify-center sm:space-x-6">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
        <Button className="w-full" variant="destructive" onClick={handleDelete}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Deleting
            </>
          ) : (
            <span>Delete</span>
          )}
        </Button>
      </div>
    </form>
  );
};
