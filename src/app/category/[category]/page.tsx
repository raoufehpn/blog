
import type { Metadata } from 'next';
import { getCategories, getPostsByCategory } from '@/lib/data';
import { PostCard } from '@/components/blog/PostCard';
import { notFound } from 'next/navigation';

// Define the props type for the page component
type CategoryPageProps = {
  params: {
    category: string;
  };
};

// Generate static paths for better performance
export async function generateStaticParams() {
  const categories = await getCategories();
  const paths = categories.map((category) => ({
    category: category.title.toLowerCase().replace(/\s+/g, '-'),
  }));
  paths.push({ category: 'all' });
  return paths;
}

// Generate metadata for the page
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categorySlug = params.category;
  if (!categorySlug) return {};

  const categoryTitle = decodeURIComponent(categorySlug).replace(/-/g, ' ');
  const displayTitle = categorySlug === 'all'
    ? 'All Categories'
    : categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1);

  return {
    title: `Category: ${displayTitle}`,
    description: `Posts categorized under ${displayTitle}.`,
  };
}

// The page component
const CategoryPage = async ({ params }: CategoryPageProps) => {
  const categorySlug = params.category;
  const categoryTitle = decodeURIComponent(categorySlug).replace(/-/g, ' ');
  
  const posts = await getPostsByCategory(categoryTitle);
  
  if (categorySlug !== 'all') {
    const categories = await getCategories();
    const categoryExists = categories.some(c => c.title.toLowerCase() === categoryTitle.toLowerCase());
    if (!categoryExists) {
      notFound();
    }
  }
  
  const displayTitle = categorySlug === 'all' 
    ? "All Categories" 
    : categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1);
  
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

export default CategoryPage;
