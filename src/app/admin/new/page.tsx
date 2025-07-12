
'use client';
import { withAdminAuth } from '@/components/auth/withAdminAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { createPost } from '@/app/auth/actions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function NewPostPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Button variant="ghost" asChild>
            <Link href="/admin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Link>
        </Button>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Create a New Post</CardTitle>
          <CardDescription>Fill out the details below to publish a new article.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createPost} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Your post title" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" placeholder="your-post-title" required />
              <p className="text-sm text-muted-foreground">This is the URL-friendly version of the title.</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" name="excerpt" placeholder="A short summary of the post" required className="min-h-[100px]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" name="content" placeholder="Write your full post content here..." required className="min-h-[250px]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" name="tags" placeholder="React, Next.js, WebDev" />
              <p className="text-sm text-muted-foreground">Separate tags with a comma.</p>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Publish Post</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAdminAuth(NewPostPage);
