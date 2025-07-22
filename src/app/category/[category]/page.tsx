
'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { getPostsByCategory } from '@/lib/data';
import { PostCard } from '@/components/blog/PostCard';
import type { Post } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoryPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  const params = useParams();
  const categorySlug = params.category as string;
  
  const displayTitle = categorySlug === 'all' 
    ? "All Categories" 
    : decodeURIComponent(categorySlug).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  useEffect(() => {
    if (!categorySlug) {
      notFound();
      return;
    }

    async function fetchData() {
      setLoading(true);
      const categoryTitle = decodeURIComponent(categorySlug).replace(/-/g, ' ');
      const fetchedPosts = await getPostsByCategory(categoryTitle);
      setPosts(fetchedPosts);
      setLoading(false);
    }

    fetchData();
  }, [categorySlug]);

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-96 rounded-lg" />)}
    </div>
  );

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

      {loading ? renderSkeletons() : posts.length > 0 ? (
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
