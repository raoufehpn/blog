'use client';

import type { Post } from '@/types';
import { PostCard } from '@/components/blog/PostCard';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor, dataAiHintMap } from '@/lib/sanity';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClientHomePageProps {
  posts: Post[];
}

export default function ClientHomePage({ posts }: ClientHomePageProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold">No Posts Found</h2>
      </div>
    );
  }

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  const featuredPostImageUrl = urlFor(featuredPost.coverImage);
  const featuredPostImageHint = dataAiHintMap[featuredPost.coverImage.asset._ref] || 'featured blog';

  return (
    <>
      <section className="mb-16 md:mb-24">
        <Link href={`/post/${featuredPost.slug.current}`} className="group block">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
              <Image
                src={featuredPostImageUrl}
                alt={featuredPost.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                data-ai-hint={featuredPostImageHint}
              />
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-primary mb-2">Featured Post</p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-balance leading-tight mb-4">
                {featuredPost.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-2 font-semibold text-primary">
                Read post <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
              </div>
            </div>
          </div>
        </Link>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8">Recent blog posts</h2>
        {otherPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {otherPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No other posts available.</p>
          </div>
        )}
      </section>

      <div className="text-center mt-16">
        <Button variant="outline" size="lg">
          Load more
        </Button>
      </div>
    </>
  );
}
