'use client';

import type { Post } from '@/types';
import { PostCard } from '@/components/blog/PostCard';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor, dataAiHintMap } from '@/lib/sanity';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClientHomePageProps {
  posts: Post[];
}

export default function ClientHomePage({ posts }: ClientHomePageProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold font-headline">No Posts Found</h2>
      </div>
    );
  }

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  const featuredPostImageUrl = urlFor(featuredPost.coverImage);
  const featuredPostImageHint = dataAiHintMap[featuredPost.coverImage.asset._ref] || 'featured blog';

  return (
    <>
       <header className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-balance">
          Sanity & Serenity
        </h1>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
          A personal blog about modern web development, design, and everything in between.
        </p>
      </header>

      <section className="mb-16">
        <Link href={`/post/${featuredPost.slug.current}`} className="group block">
          <div className="relative aspect-[16/9] md:aspect-[2/1] w-full rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={featuredPostImageUrl}
              alt={featuredPost.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
              priority
              data-ai-hint={featuredPostImageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white w-full md:w-3/4 lg:w-2/3">
              <p className="font-semibold text-primary mb-2">Featured Post</p>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold font-headline text-primary-foreground text-balance leading-tight">
                {featuredPost.title}
              </h1>
              <p className="mt-2 md:mt-4 text-sm md:text-base text-primary-foreground/80 hidden md:block">
                {featuredPost.excerpt}
              </p>
            </div>
          </div>
        </Link>
      </section>

      <section>
        <h2 className="text-3xl font-bold font-headline mb-8">Recent Posts</h2>
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
    </>
  );
}
