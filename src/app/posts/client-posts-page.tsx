'use client';

import type { Post } from '@/types';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { PostCard } from '@/components/blog/PostCard';
import { Search } from 'lucide-react';

interface ClientPostsPageProps {
  posts: Post[];
}

export default function ClientPostsPage({ posts }: ClientPostsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchQuery) {
      return posts;
    }
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  return (
    <>
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold font-headline tracking-tighter">All Posts</h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">
          Browse through our collection of articles and find what you're looking for.
        </p>
      </header>

      <div className="mb-12 max-w-lg mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 !h-12 text-base rounded-full"
          />
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-headline font-semibold">No Posts Found</h2>
          <p className="text-muted-foreground mt-2">
            Your search for "{searchQuery}" did not return any results.
          </p>
        </div>
      )}
    </>
  );
}