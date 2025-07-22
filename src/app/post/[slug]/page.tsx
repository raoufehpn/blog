
'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { getPost, getPosts, urlFor, dataAiHintMap } from '@/lib/data';
import type { Post } from '@/types';
import Image from 'next/image';
import { format } from 'date-fns';
import { PortableText } from '@/components/blog/PortableText';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AIAssistant } from '@/components/blog/AIAssistant';
import { RecentPostsSidebar } from '@/components/blog/RecentPostsSidebar';
import { Separator } from '@/components/ui/separator';
import { ActionToolbar } from '@/components/blog/ActionToolbar';
import { CommentsSection } from '@/components/blog/CommentsSection';
import { Skeleton } from '@/components/ui/skeleton';

export default function PostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    if (!slug) return;

    async function fetchData() {
      setLoading(true);
      const fetchedPost = await getPost(slug);
      if (!fetchedPost) {
        notFound();
        return;
      }
      
      const allPosts = await getPosts();
      const fetchedRecentPosts = allPosts.filter(p => p._id !== fetchedPost._id).slice(0, 4);
      
      setPost(fetchedPost);
      setRecentPosts(fetchedRecentPosts);
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  if (loading) {
    return (
       <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <Skeleton className="h-14 w-3/4 mb-4" />
            <div className="flex items-center space-x-4 mb-8">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="aspect-video w-full rounded-lg mb-8" />
            <Skeleton className="h-10 w-full mb-8" />
            <Skeleton className="h-40 w-full" />
          </div>
          <aside className="lg:col-span-1 mt-12 lg:mt-0">
            <Skeleton className="h-96 w-full" />
          </aside>
        </div>
      </div>
    );
  }

  if (!post) {
    return null; 
  }

  const postImageUrl = urlFor(post.coverImage);
  const authorImageUrl = urlFor(post.author.image);
  const dataAiHint = dataAiHintMap[post.coverImage.asset._ref] || 'blog post';
  const authorImageHint = dataAiHintMap[post.author.image.asset._ref] || 'person';

  return (
     <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
        <article className="lg:col-span-2">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter mb-4 text-balance">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={authorImageUrl} alt={post.author.name} data-ai-hint={authorImageHint}/>
                  <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span>{post.author.name}</span>
              </div>
              <span>•</span>
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
              </time>
            </div>
          </header>
          
          <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-8 shadow-lg">
            <Image
              src={postImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              data-ai-hint={dataAiHint}
            />
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
              ))}
            </div>
            <AIAssistant summary={post.excerpt} />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mx-auto font-body">
            <PortableText value={post.content} />
          </div>

          <Separator className="my-12" />

          <ActionToolbar />

          <CommentsSection />
        </article>

        <aside className="lg:col-span-1 mt-12 lg:mt-0">
          <RecentPostsSidebar posts={recentPosts} />
        </aside>
      </div>
    </div>
  );
}
