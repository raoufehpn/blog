import { getPostsByCategory, getCategories } from '@/lib/data';
import type { Metadata } from 'next';
import { PostCard } from '@/components/blog/PostCard';
import { notFound } from 'next/navigation';

type Props = {
  params: { category: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryTitle = decodeURIComponent(params.category).replace(/-/g, ' ');
  return {
    title: `Category: ${categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1)}`,
    description: `Posts categorized under ${categoryTitle}.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const categoryTitle = decodeURIComponent(params.category).replace(/-/g, ' ');
  const posts = await getPostsByCategory(categoryTitle);
  const categories = await getCategories();
  
  const categoryExists = categories.some(c => c.title.toLowerCase() === categoryTitle.toLowerCase());
  if (params.category !== 'all' && !categoryExists) {
    notFound();
  }
  
  const displayTitle = params.category === 'all' 
    ? "All Categories" 
    : categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <p className="text-primary font-semibold font-headline">Category</p>
        <h1 className="text-5xl font-bold font-headline tracking-tighter text-balance">{displayTitle}</h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">
          {params.category === 'all'
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
