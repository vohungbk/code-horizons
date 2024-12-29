'use client';

import { CreatePostAction } from '@/app/actions';
import TailwindEditor from '@/app/components/dashboard/EditorWrapper';
import { postSchema } from '@/app/utils/schema';
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
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { ArrowLeft, Atom } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { JSONContent } from 'novel';
import { useActionState, useState } from 'react';
import { toast } from 'sonner';
import slugify from 'react-slugify';
import { SubmitButton } from '@/app/components/dashboard/SubmitButton';

export default function CreateArticleRoute({ params }: { params: { siteId: string } }) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [value, setValue] = useState<JSONContent | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [slugValue, setSlugValue] = useState<string | undefined>(undefined);

  const [lastResult, action] = useActionState(CreatePostAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: postSchema,
      });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const handleSlugGeneration = () => {
    const titleInput = title;
    if (titleInput?.length === 0 || title === undefined) {
      return toast.error('Please create a title first');
    }

    setSlugValue(slugify(titleInput));

    return toast.success('Slug has been created');
  };

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
          <form
            id={form.id}
            action={action}
            onSubmit={form.onSubmit}
            className="flex flex-col gap-6"
          >
            <Input type="hidden" name="siteId" value={params.siteId} />
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                key={fields.title.key}
                name={fields.title.name}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={fields.title.initialValue}
                placeholder="Nextjs blogging application"
              />
              <p className="text-sm text-red-500">{fields.title.errors}</p>
            </div>

            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input
                key={fields.slug.key}
                name={fields.slug.name}
                defaultValue={fields.slug.initialValue}
                placeholder="Article slug"
                value={slugValue}
                onChange={(e) => setSlugValue(e.target.value)}
              />
              <Button
                className="w-fit"
                variant="secondary"
                type="button"
                onClick={handleSlugGeneration}
              >
                <Atom className="mr-2 size-4" /> Generate Slug
              </Button>
              <p className="text-sm text-red-500">{fields.slug.errors}</p>
            </div>

            <div className="grid gap-2">
              <Label>Small Description</Label>
              <Textarea
                key={fields.smallDescription.key}
                name={fields.smallDescription.name}
                defaultValue={fields.smallDescription.initialValue}
                placeholder="Small description for your blog article..."
                className="h-32"
              />
              <p className="text-sm text-red-500">{fields.smallDescription.errors}</p>
            </div>

            <div className="grid gap-2">
              <Label>Cover Image</Label>
              <Input
                type="hidden"
                name={fields.coverImage.name}
                key={fields.coverImage.key}
                defaultValue={fields.coverImage.initialValue}
                value={imageUrl}
              />
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
                  className="!border-gray-200/20"
                />
              )}
              <p className="text-sm text-red-500">{fields.coverImage.errors}</p>
            </div>

            <div className="grid gap-2">
              <Label>Article Content</Label>
              <Input
                type="hidden"
                name={fields.articleContent.name}
                key={fields.articleContent.key}
                defaultValue={fields.articleContent.initialValue}
                value={JSON.stringify(value)}
              />
              <TailwindEditor initialState={value!} onChange={setValue}></TailwindEditor>
              <p className="text-sm text-red-500">{fields.articleContent.errors}</p>
            </div>
            <SubmitButton text="Create Article" />
          </form>
        </CardContent>
      </Card>
    </>
  );
}
