import prisma from '@/app/utils/db';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Book, FileIcon, MoreHorizontal, PlusCircle, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function getData(userId: string, siteId: string) {
  const data = await prisma.post.findMany({
    where: {
      userId,
      siteId,
    },
    select: {
      image: true,
      title: true,
      createdAt: true,
      id: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
}

export default async function SiteIdRoute({ params }: { params: { siteId: string } }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/api/auth/login');
  }

  const data = await getData(user.id, params.siteId);

  return (
    <>
      <div className="flex items-center justify-end gap-x-4">
        <Button asChild variant="secondary">
          <Link href={'#'}>
            <Book className="mr-2 size-4" />
            View Blog
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={'#'}>
            <Settings className="mr-2 size-4" />
            Settings
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/sites/${params.siteId}/create`}>
            <PlusCircle className="mr-2 size-4" />
            Create Article
          </Link>
        </Button>
      </div>
      {data === undefined || data.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
            <FileIcon className="size-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">
            You don&apos;t have any Articles created
          </h2>
          <p className="mx-auto mb-8 mt-2 max-w-sm text-center text-sm leading-6 text-muted-foreground">
            You currently don&apos;t have any article created. Click the button above to
            create your first site.
          </p>
          <Button asChild>
            <Link href={`/dashboard/sites/${params.siteId}/create`}>
              <PlusCircle className="mr-2 size-4" /> Create Article
            </Link>
          </Button>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Articles</CardTitle>
            <CardDescription>
              Manage your Articles in a simple intuitive interface
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="size-16 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500/10 text-green-500">Published</Badge>
                    </TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
                        item.createdAt,
                      )}
                    </TableCell>
                    <TableCell className="text-end">
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
                            <Link href={`/dashboard/sites/${params.siteId}/${item.id}`}>
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
}
