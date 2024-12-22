import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

function NewSiteRoute() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Card className="max-w-[450px]">
        <CardHeader>
          <CardTitle>Crete Site</CardTitle>
          <CardDescription>
            Create your Site here. Click the button below once you done ...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="grid gap-2">
              <Label>Site name</Label>
              <Input placeholder="Site Name" />
            </div>

            <div className="grid gap-2">
              <Label>Subdirectory</Label>
              <Input placeholder="Subdirectory" />
            </div>

            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea placeholder="Description for your site" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Create Site</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default NewSiteRoute;
