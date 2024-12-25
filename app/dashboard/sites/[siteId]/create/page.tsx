'use client';

import TailwindEditor from '@/app/components/dashboard/EditorWrapper';
import { UploadDropzone } from '@/app/utils/uploadthing';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Atom } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { JSONContent } from 'novel';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CreateArticleRoute({ params }: { params: { siteId: string } }) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [value, setValue] = useState<JSONContent | undefined>(undefined);

  return (
    <>
      <div className="flex items-center">
        <Button size="icon" variant="outline" className="mr-3">
          <Link href={`/dashboard/sites/${params?.siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Create Article</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Article Details</CardTitle>
          <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input placeholder="Nextjs blogging application" />
            </div>

            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input placeholder="Article slug" />
              <Button className="w-fit" variant="secondary" type="button">
                <Atom className="mr-2 size-4" /> Generate Slug
              </Button>
            </div>

            <div className="grid gap-2">
              <Label>Small Description</Label>
              <Textarea
                placeholder="Small description for your blog article..."
                className="h-32"
              />
            </div>

            <div className="grid gap-2">
              <Label>Cover Image</Label>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Cover image"
                  width={200}
                  height={200}
                  className="h-[200px] w-[200px] rounded-lg object-cover"
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
                />
              )}
            </div>

            <div className="grid gap-2">
              <Label>Article Content</Label>
              <TailwindEditor initialState={value!} onChange={setValue}></TailwindEditor>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
