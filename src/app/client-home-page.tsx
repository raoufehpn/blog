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
  const otherPosts = posts.slice(1, 7);

  const featuredPostImageUrl = urlFor(featuredPost.coverImage);
  const featuredPostImageHint = dataAiHintMap[featuredPost.coverImage.asset._ref] || 'featured blog';

  return (
    <>
      <section className="mb-16 md:mb-24">
        <Link href={`/post/${featuredPost.slug.current}`} className="group block rounded-2xl overflow-hidden">
          <div className="relative aspect-video md:aspect-[2.4/1] w-full">
            <Image
              src={featuredPostImageUrl}
              alt={featuredPost.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="100vw"
              priority
              data-ai-hint={featuredPostImageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
                <div className="max-w-2xl text-white">
                    <p className="font-semibold text-sm mb-2">Featured</p>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-balance leading-tight mb-4">
                        {featuredPost.title}
                    </h1>
                    <p className="text-white/80 text-lg hidden md:block mb-6">
                        {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 font-semibold text-white mt-4">
                        Read post <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1"/>
                    </div>
                </div>
                <div className="absolute top-6 right-6 md:top-12 md:right-12 text-white/80 transition-all group-hover:text-white group-hover:scale-110">
                    <ArrowRight className="h-8 w-8" />
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
