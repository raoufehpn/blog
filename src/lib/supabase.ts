import { createClient } from '@supabase/supabase-js'
import type { Post, Author, Category } from '@/types';

// IMPORTANT: Create a .env.local file in your project root
// and add your Supabase URL and Anon Key there.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to construct image URL.
// In a real app, you might want a more robust way to handle this,
// perhaps storing the full URL or using Supabase storage.
function getImageUrl(imagePath: string): string {
  if (!imagePath) return 'https://placehold.co/1200x630.png';
  if (imagePath.startsWith('http')) return imagePath;
  return `https://placehold.co/1200x630.png`; // Fallback placeholder
}

// The data structure from Supabase might be different from Sanity.
// We'll adapt the data here.
function adaptPost(postData: any): Post {
  return {
    _id: postData.id,
    _type: 'post',
    title: postData.title,
    slug: { _type: 'slug', current: postData.slug },
    publishedAt: postData.published_at,
    coverImage: {
      _type: 'image',
      asset: { _ref: postData.cover_image_url || '', _type: 'reference' },
      url: getImageUrl(postData.cover_image_url)
    },
    excerpt: postData.excerpt,
    // Assuming content is stored as JSONB in a structure compatible with our PortableText component
    content: postData.content || [],
    author: adaptAuthor(postData.authors),
    // Assuming categories is a many-to-many relationship and comes as an array
    categories: postData.categories?.map(adaptCategory) || [],
    tags: postData.tags || [],
  };
}

function adaptAuthor(authorData: any): Author {
  if (!authorData) {
    return {
      _id: 'user-placeholder',
      _type: 'author',
      name: 'Unknown Author',
      image: { _type: 'image', asset: { _ref: '', _type: 'reference' }, url: getImageUrl('') },
      bio: [],
      socials: []
    }
  }
  return {
    _id: authorData.id,
    _type: 'author',
    name: authorData.name,
    image: {
        _type: 'image',
        asset: { _ref: authorData.image_url || '', _type: 'reference'},
        url: getImageUrl(authorData.image_url)
    },
    bio: authorData.bio || [],
    socials: authorData.socials || [],
  }
}

function adaptCategory(categoryData: any): Category {
    return {
        _id: categoryData.id,
        _type: 'category',
        title: categoryData.title,
        description: categoryData.description,
    }
}


export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      authors(*),
      categories(*)
    `)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
  return data.map(adaptPost);
}

export async function getPost(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      authors(*),
      categories(*)
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }
  return adaptPost(data);
}

export async function getPostsByCategory(categoryTitle: string): Promise<Post[]> {
    const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('id')
        .eq('title', categoryTitle)
        .limit(1);

    if (catError || !categories || categories.length === 0) {
        console.error('Error finding category:', catError);
        return [];
    }

    const categoryId = categories[0].id;

    // This is a bit complex and assumes you have a join table `post_categories`
    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            authors(*),
            post_categories!inner(category_id),
            categories(*)
        `)
        .eq('post_categories.category_id', categoryId)

    if (error) {
        console.error('Error fetching posts by category:', error);
        return [];
    }
    
    return data.map(adaptPost);
}

export async function getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
        .from('categories')
        .select('*');
    
    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }

    return data.map(adaptCategory);
}

export async function getAuthor(): Promise<Author | null> {
    const { data, error } = await supabase
        .from('authors')
        .select('*')
        .limit(1)
        .single();
    
    if (error) {
        console.error('Error fetching author:', error);
        return null;
    }

    return adaptAuthor(data);
}

// This function is for resolving image URLs. We'll adapt it.
export function urlFor(source: { asset?: { _ref: string }, url?: string }): string {
    if (source?.url) return source.url; // Use pre-adapted URL if available
    return getImageUrl(source?.asset?._ref || '');
}

// This was used for AI hints on placeholder images. We can keep it simple for now.
export const dataAiHintMap: { [key: string]: string } = {};
