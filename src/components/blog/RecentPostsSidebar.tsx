import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import type { Post } from '@/types';
import { urlFor, dataAiHintMap } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';

interface RecentPostsSidebarProps {
  posts: Post[];
}

export function RecentPostsSidebar({ posts }: RecentPostsSidebarProps) {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Recent Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {posts.map((post) => {
            const postImageUrl = urlFor(post.coverImage);
            const dataAiHint = dataAiHintMap[post.coverImage.asset._ref] || 'blog post';
            return (
              <Link key={post._id} href={`/post/${post.slug.current}`} className="group flex items-start gap-4">
                <div className="relative w-20 h-20 rounded-md overflow-hidden shrink-0">
                  <Image
                    src={postImageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="80px"
                    data-ai-hint={dataAiHint}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-snug mb-1 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <time className="text-xs text-muted-foreground">
                    {format(new Date(post.publishedAt), 'd MMM yyyy')}
                  </time>
                </div>
              </Link>
            )
          })}
        </div>
        <Button variant="outline" className="w-full mt-8" asChild>
            <Link href="/posts">View All Posts</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
