
import type { Post, Author, Category, Block, SanityImage } from '@/types';
import { mockAuthor, mockPosts, mockCategories } from './mock-data';

// Simulate an async data fetching operation
export async function getPosts(): Promise<Post[]> {
  return Promise.resolve(mockPosts);
}

export async function getPost(slug: string): Promise<Post | null> {
  const post = mockPosts.find(p => p.slug.current === slug) || null;
  return Promise.resolve(post);
}

export async function getPostsByCategory(categoryTitle: string): Promise<Post[]> {
    if (!categoryTitle || categoryTitle === 'all') {
        return Promise.resolve(mockPosts);
    }
    const posts = mockPosts.filter(post => 
        post.categories.some(cat => cat.title.toLowerCase() === categoryTitle.toLowerCase())
    );
    return Promise.resolve(posts);
}

export async function getCategories(): Promise<Category[]> {
  return Promise.resolve(mockCategories);
}

export async function getAuthor(): Promise<Author | null> {
    return Promise.resolve(mockAuthor);
}


// A simple utility for image placeholders, as we don't have a real CMS/storage.
export function urlFor(source: SanityImage): string {
    if (!source || !source.asset || !source.asset._ref) {
        return 'https://placehold.co/1200x630.png';
    }
    return source.asset._ref;
}

// This map helps connect mock image refs to AI hints for better placeholder generation.
export const dataAiHintMap: { [key: string]: string } = {
  'https://i.postimg.cc/FKMsD7S4/Karakuzular.jpg': 'person face',
  'https://i.postimg.cc/Qdn7nLbZ/man-with-backpack-strolling-by-beach-fluffy-clouds.jpg': 'travel beach',
  'https://i.postimg.cc/0j7bS2bB/image.png': 'healthy food',
  'https://i.postimg.cc/5N8yY3tT/image.png': 'morning routine',
  'https://i.postimg.cc/d1BuH9pW/image.png': 'zen meditation',
  'https://i.postimg.cc/pL4DgZ4K/image.png': 'cozy livingroom',
  'https://i.postimg.cc/Xv3w0ZJb/image.png': 'vegetable garden',
};
