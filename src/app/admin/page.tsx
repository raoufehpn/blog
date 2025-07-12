'use client';

import { withAdminAuth } from '@/components/auth/withAdminAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilePenLine, Trash2 } from 'lucide-react';
import { getPosts } from '@/lib/supabase';
import type { Post } from '@/types';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

function AdminPage() {
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
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tighter">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-lg">Manage your blog content.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
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
                    <TableCell className="text-right">
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
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default withAdminAuth(AdminPage);
