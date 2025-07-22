
import { getCategories, getPostsByCategory } from '@/lib/data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CategoryClientPage from './CategoryClientPage';

export async function generateStaticParams() {
  const categories = await getCategories();
  const paths = categories.map((category) => ({
    category: category.title.toLowerCase().replace(/\s+/g, '-'),
  }));
  paths.push({ category: 'all' });
  return paths;
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
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

export default async function CategoryPage({ params }: { params: { category: string } }) {
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

  return <CategoryClientPage posts={posts} displayTitle={displayTitle} categorySlug={categorySlug} />;
}
