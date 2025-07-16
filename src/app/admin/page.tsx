'use client';

import { withAdminAuth } from '@/components/auth/withAdminAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilePenLine, Trash2, PlusCircle, ExternalLink } from 'lucide-react';
import type { Post } from '@/types';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { getPosts } from '@/lib/data';

function AdminDashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-4xl font-bold font-headline tracking-tighter">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1 text-lg">Manage your blog content.</p>
        </div>
        <Button asChild>
          <Link href="/admin/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </header>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{posts.length}</div>
                <p className="text-xs text-muted-foreground">The total number of articles on your blog.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+23,458</div>
                <p className="text-xs text-muted-foreground">+12.1% from last month (mock data)</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+189</div>
                <p className="text-xs text-muted-foreground">Across all posts (mock data)</p>
            </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
           <CardDescription>A list of all the posts in your blog. Manage them here.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading posts...</p>
          ) : posts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden sm:table-cell">Published Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post._id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {post.categories[0] && <Badge variant="outline">{post.categories[0].title}</Badge>}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{format(new Date(post.publishedAt), 'd MMM, yyyy')}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/post/${post.slug.current}`} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <FilePenLine className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
             <div className="text-center py-16">
                <h2 className="text-xl font-headline font-semibold">No Posts Found</h2>
                <p className="text-muted-foreground mt-2">You haven't created any posts yet.</p>
                 <Button asChild className="mt-4">
                  <Link href="/admin/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create First Post
                  </Link>
                </Button>
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default withAdminAuth(AdminDashboardPage);
