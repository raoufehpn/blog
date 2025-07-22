
import { getPostsByCategory } from '@/lib/data';
import { notFound } from 'next/navigation';
import CategoryClientPage from './CategoryClientPage';

// Simplified component props, no complex interface needed.
export default async function CategoryPage({ params }: { params: { category: string } }) {
  const categorySlug = params.category;
  
  if (!categorySlug) {
    notFound();
  }
  
  const categoryTitle = decodeURIComponent(categorySlug).replace(/-/g, ' ');
  
  const posts = await getPostsByCategory(categoryTitle);
  
  const displayTitle = categorySlug === 'all' 
    ? "All Categories" 
    : categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1);

  return <CategoryClientPage posts={posts} displayTitle={displayTitle} categorySlug={categorySlug} />;
}
