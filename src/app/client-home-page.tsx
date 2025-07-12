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
      <section className="mb-16">
        <Link href={`/post/${featuredPost.slug.current}`} className="group block">
          <div className="relative aspect-[16/9] md:aspect-[2/1] lg:aspect-[2.4/1] w-full rounded-2xl overflow-hidden">
            <Image
              src={featuredPostImageUrl}
              alt={featuredPost.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
              priority
              data-ai-hint={featuredPostImageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white w-full md:w-3/4 lg:w-2/3">
              <p className="font-semibold text-primary-foreground/80 mb-2">Featured</p>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary-foreground text-balance leading-tight">
                {featuredPost.title}
              </h1>
              <p className="mt-2 md:mt-4 text-sm md:text-base text-primary-foreground/80 hidden md:block">
                {featuredPost.excerpt}
              </p>
            </div>
             <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10">
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10">
                <ArrowRight className="text-white w-6 h-6" />
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

      {posts.length > 6 && (
        <div className="text-center mt-16">
          <Button variant="outline" size="lg">Loading more...</Button>
        </div>
      )}
    </>
  );
}
