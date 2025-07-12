
import { createClient } from '@supabase/supabase-js'
import type { Post, Author, Category } from '@/types';

// IMPORTANT: Create a .env.local file in your project root
// and add your Supabase URL and Anon Key there.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const mockAuthor: Author = {
    _id: 'author-1',
    _type: 'author',
    name: 'abde raoufe',
    image: { _type: 'image', asset: { _ref: 'https://i.postimg.cc/FKMsD7S4/Karakuzular.jpg', _type: 'reference' } },
    bio: [{ _key: '1', _type: 'block', children: [{ _key: '1-1', _type: 'span', marks: [], text: 'A passionate full-stack developer specializing in the MERN stack and Next.js.' }], markDefs: [], style: 'normal' }],
    socials: [
        { name: 'Twitter', url: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || '#' },
        { name: 'GitHub', url: process.env.NEXT_PUBLIC_SOCIAL_GITHUB || '#' }
    ],
};

const mockCategories: Category[] = [
    { _id: 'cat-1', _type: 'category', title: 'JavaScript', description: 'Articles about JavaScript' },
    { _id: 'cat-2', _type: 'category', title: 'Next.js', description: 'Articles about Next.js' },
    { _id: 'cat-3', _type: 'category', title: 'Web Design', description: 'Articles about Web Design' },
];

const mockPosts: Post[] = [
    {
        _id: 'post-1',
        _type: 'post',
        title: 'Mastering Asynchronous JavaScript',
        slug: { _type: 'slug', current: 'mastering-asynchronous-javascript' },
        publishedAt: '2024-05-15T10:00:00Z',
        coverImage: { _type: 'image', asset: { _ref: 'image-1', _type: 'reference' } },
        excerpt: 'A deep dive into Promises, async/await, and other asynchronous patterns in JavaScript. Perfect for developers looking to level up their skills.',
        content: [
            { _key: '1', _type: 'block', children: [{ _key: '1-1', _type: 'span', marks: [], text: 'Asynchronous operations are fundamental in JavaScript for non-blocking I/O operations, such as fetching data from an API, reading files, or interacting with a database.' }], markDefs: [], style: 'normal' },
            { _key: '2', _type: 'block', children: [{ _key: '2-1', _type: 'span', marks: [], text: 'Understanding Promises' }], markDefs: [], style: 'h2' },
            { _key: '3', _type: 'block', children: [{ _key: '3-1', _type: 'span', marks: [], text: "A Promise is an object representing the eventual completion or failure of an asynchronous operation. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason." }], markDefs: [], style: 'normal' }
        ],
        author: mockAuthor,
        categories: [mockCategories[0]],
        tags: ['async', 'promises', 'es6'],
    },
    {
        _id: 'post-2',
        _type: 'post',
        title: 'Building Modern UIs with Next.js 14',
        slug: { _type: 'slug', current: 'building-modern-uis-with-nextjs-14' },
        publishedAt: '2024-05-10T14:30:00Z',
        coverImage: { _type: 'image', asset: { _ref: 'image-2', _type: 'reference' } },
        excerpt: 'Explore the new features of Next.js 14, including Server Actions and the App Router, to build fast, scalable, and modern web applications.',
        content: [{ _key: '1', _type: 'block', children: [{ _key: '1-1', _type: 'span', marks: [], text: 'Next.js 14 introduced powerful features that streamline web development.' }], markDefs: [], style: 'normal' }],
        author: mockAuthor,
        categories: [mockCategories[1], mockCategories[0]],
        tags: ['nextjs', 'react', 'ssr'],
    },
    {
        _id: 'post-3',
        _type: 'post',
        title: 'The Principles of Clean UI Design',
        slug: { _type: 'slug', current: 'principles-of-clean-ui-design' },
        publishedAt: '2024-05-01T09:00:00Z',
        coverImage: { _type: 'image', asset: { _ref: 'image-3', _type: 'reference' } },
        excerpt: 'Learn the core principles of creating user interfaces that are not only beautiful but also intuitive and user-friendly. Less is more.',
        content: [{ _key: '1', _type: 'block', children: [{ _key: '1-1', _type: 'span', marks: [], text: 'Good design is about making something intelligible and memorable. Great design is making something memorable and meaningful.' }], markDefs: [], style: 'blockquote' }],
        author: mockAuthor,
        categories: [mockCategories[2]],
        tags: ['ui', 'ux', 'design'],
    },
    {
        _id: 'post-4',
        _type: 'post',
        title: 'Getting Started with Tailwind CSS',
        slug: { _type: 'slug', current: 'getting-started-with-tailwind-css' },
        publishedAt: '2024-04-25T11:00:00Z',
        coverImage: { _type: 'image', asset: { _ref: 'image-4', _type: 'reference' } },
        excerpt: 'A beginner-friendly guide to setting up and using Tailwind CSS in your projects for rapid UI development without leaving your HTML.',
        content: [{ _key: '1', _type: 'block', children: [{ _key: '1-1', _type: 'span', marks: [], text: 'Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs directly in your markup.' }], markDefs: [], style: 'normal' }],
        author: mockAuthor,
        categories: [mockCategories[2]],
        tags: ['css', 'tailwind', 'frontend'],
    },
];

// Helper to construct image URL.
// In a real app, you might want a more robust way to handle this,
// perhaps storing the full URL or using Supabase storage.
function getImageUrl(imagePath: string): string {
  if (!imagePath) return 'https://placehold.co/1200x630.png';
  if (imagePath.startsWith('http')) return imagePath;
  // For mock data, we use placeholders
  return `https://placehold.co/1200x630.png?text=${imagePath}`;
}

// Adapt functions are kept for future use when we fetch from Supabase
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
    content: postData.content || [],
    author: adaptAuthor(postData.authors),
    categories: postData.categories?.map(adaptCategory) || [],
    tags: postData.tags || [],
  };
}

function adaptAuthor(authorData: any): Author {
  if (!authorData) {
    return mockAuthor;
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
  // TODO: In the next step, we will fetch this from Supabase.
  // For now, we return mock data so the app is populated.
  return Promise.resolve(mockPosts);
}

export async function getPost(slug: string): Promise<Post | null> {
  // TODO: Fetch from Supabase
  const post = mockPosts.find((p) => p.slug.current === slug);
  return Promise.resolve(post || null);
}

export async function getPostsByCategory(categoryTitle: string): Promise<Post[]> {
  if (!categoryTitle) return Promise.resolve(mockPosts);
  
  // TODO: Fetch from Supabase
  const posts = mockPosts.filter(p => 
    p.categories.some(c => c.title.toLowerCase() === categoryTitle.toLowerCase())
  );
  return Promise.resolve(posts);
}

export async function getCategories(): Promise<Category[]> {
    // TODO: Fetch from Supabase
    return Promise.resolve(mockCategories);
}

export async function getAuthor(): Promise<Author | null> {
    // TODO: Fetch from Supabase
    return Promise.resolve(mockAuthor);
}

// This function is for resolving image URLs. We'll adapt it.
export function urlFor(source: { asset?: { _ref: string }, url?: string }): string {
    if (source?.url) return source.url; // Use pre-adapted URL if available
    return getImageUrl(source?.asset?._ref || '');
}

// This was used for AI hints on placeholder images. We can keep it simple for now.
export const dataAiHintMap: { [key: string]: string } = {
    'image-1': 'javascript code',
    'image-2': 'modern ui',
    'image-3': 'design sketch',
    'image-4': 'css framework',
    'https://i.postimg.cc/FKMsD7S4/Karakuzular.jpg': 'person face'
};
