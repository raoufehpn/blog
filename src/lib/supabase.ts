
import { createClient } from '@supabase/supabase-js'
import type { Post, Author, Category, Block } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to construct image URL from Supabase storage
function getSupabaseImageUrl(path: string): string {
    if (!path) return 'https://placehold.co/1200x630.png';
    if (path.startsWith('http')) return path;
    const { data } = supabase.storage.from('images').getPublicUrl(path);
    return data.publicUrl || 'https://placehold.co/1200x630.png';
}

// Convert Supabase post record to our Post type
const mapSupabasePostToPostType = (post: any): Post => {
    return {
        _id: post.id,
        _type: 'post',
        title: post.title,
        slug: { _type: 'slug', current: post.slug },
        publishedAt: post.published_at,
        coverImage: { _type: 'image', asset: { _ref: post.cover_image_url, _type: 'reference' } },
        excerpt: post.excerpt,
        content: post.content as Block[],
        author: {
            ...post.authors,
            _id: post.authors.id,
            _type: 'author',
            image: { _type: 'image', asset: { _ref: post.authors.image_url, _type: 'reference' } },
            bio: [{ _key: '1', _type: 'block', children: [{ _key: '1-1', _type: 'span', marks: [], text: post.authors.bio }], markDefs: [], style: 'normal' }]
        },
        categories: post.categories.map((cat: any) => ({ ...cat, _id: cat.id, _type: 'category' })),
        tags: post.tags || [],
    };
};

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

  return data.map(mapSupabasePostToPostType);
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

    if (error || !data) {
        console.error('Error fetching post by slug:', error?.message);
        return null;
    }
    
    return mapSupabasePostToPostType(data);
}


export async function getPostsByCategory(categoryTitle: string): Promise<Post[]> {
    if (!categoryTitle) return getPosts();

    const { data: category, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('title', categoryTitle)
        .single();

    if (categoryError || !category) {
        console.error('Error fetching category:', categoryError);
        return [];
    }

    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            authors(*),
            post_categories!inner(category_id),
            categories(*)
        `)
        .eq('post_categories.category_id', category.id)
        .order('published_at', { ascending: false });


    if (error) {
        console.error('Error fetching posts by category:', error);
        return [];
    }
    
    const filteredPosts = data.filter(post => post.categories.some((c: any) => c.title === categoryTitle));

    return filteredPosts.map(mapSupabasePostToPostType);
}

export async function getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
        .from('categories')
        .select('*');

    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }

    return data.map(cat => ({
        ...cat,
        _id: cat.id,
        _type: 'category',
    }));
}

export function urlFor(source: { asset?: { _ref: string }, url?: string }): string {
    if (source?.url) return source.url;
    if (source?.asset?._ref.startsWith('http')) return source.asset._ref;
    return getSupabaseImageUrl(source?.asset?._ref || '');
}

// This can now be simplified as we're not using mock data hints
export const dataAiHintMap: { [key: string]: string } = {};
