
'use client';

import { PostCard } from '@/components/blog/PostCard';
import type { Post } from '@/types';

interface CategoryClientPageProps {
  posts: Post[];
  displayTitle: string;
  categorySlug: string;
}

export default function CategoryClientPage({ posts, displayTitle, categorySlug }: CategoryClientPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <p className="text-primary font-semibold font-headline">Category</p>
        <h1 className="text-5xl font-bold font-headline tracking-tighter text-balance">{displayTitle}</h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">
          {categorySlug === 'all'
            ? 'Browse all articles from every category.'
            : `Exploring topics related to ${displayTitle}.`}
        </p>
      </header>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-headline font-semibold">No Posts Found</h2>
          <p className="text-muted-foreground mt-2">There are no posts in this category yet.</p>
        </div>
      )}
    </div>
  );
}
