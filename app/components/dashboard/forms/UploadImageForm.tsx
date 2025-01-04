'use client';

import { UploadDropzone } from '@/app/utils/uploadthing';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { SubmitButton } from '../SubmitButton';
import { UpdateImage } from '@/app/actions';

interface IUploadImageFormProps {
  siteId: string;
}

export function UploadImageForm({ siteId }: IUploadImageFormProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image</CardTitle>
        <CardDescription>
          This is the image of your site. You can change it here
        </CardDescription>
      </CardHeader>
      <CardContent>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Upload image"
            width={200}
            height={200}
            className="size-[200px] rounded-lg object-cover"
          />
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
              toast.success('Image has been uploaded');
            }}
            onUploadError={() => {
              toast.error('Something went wrong...');
            }}
            className="!border-gray-200/20"
          />
        )}
      </CardContent>
      <CardFooter>
        <form action={UpdateImage}>
          <input type="hidden" name="siteId" value={siteId} />
          <input type="hidden" name="imageUrl" value={imageUrl} />
          <SubmitButton text="Change Image" />
        </form>
      </CardFooter>
    </Card>
  );
}
