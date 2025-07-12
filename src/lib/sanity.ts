import type { Post, Author, Category, SanityImage } from '@/types';

// This is a mock implementation. In a real project, you would use
// import { createClient } from 'next-sanity'
// and configure it with your project ID, dataset, and API version.

const MOCK_AUTHORS: Author[] = [
  {
    _id: 'author-1',
    _type: 'author',
    name: 'abde raoufe',
    image: { _type: 'image', asset: { _ref: 'image-person1', _type: 'reference' } },
    bio: [{ _key: '1', _type: 'block', children: [{ _key: '1-1', _type: 'span', marks: [], text: 'abde raoufe is a full-stack developer with expertise in the MERN stack and Next.js. He is passionate about building modern, scalable web applications.' }], markDefs: [], style: 'normal' }],
    socials: [
        { name: 'Twitter', url: process.env.TWITTER_URL || '#' },
        { name: 'GitHub', url: process.env.GITHUB_URL || '#' }
    ]
  },
];

const MOCK_CATEGORIES: Category[] = [
  { _id: 'cat-1', _type: 'category', title: 'JavaScript', description: 'Articles about JavaScript' },
  { _id: 'cat-2', _type: 'category', title: 'Next.js', description: 'Articles about Next.js' },
  { _id: 'cat-3', _type: 'category', title: 'Web Design', description: 'Articles about Web Design' },
];

const MOCK_POSTS: Post[] = [
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
      { _key: '3', _type: 'block', children: [{ _key: '3-1', _type: 'span', marks: [], text: 'A Promise is an object representing the eventual completion or failure of an asynchronous operation. It allows you to associate handlers with an asynchronous action\'s eventual success value or failure reason.' }], markDefs: [], style: 'normal' },
    ],
    author: MOCK_AUTHORS[0],
    categories: [MOCK_CATEGORIES[0]],
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
    author: MOCK_AUTHORS[0],
    categories: [MOCK_CATEGORIES[1], MOCK_CATEGORIES[0]],
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
    author: MOCK_AUTHORS[0],
    categories: [MOCK_CATEGORIES[2]],
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
    author: MOCK_AUTHORS[0],
    categories: [MOCK_CATEGORIES[2]],
    tags: ['css', 'tailwind', 'frontend'],
  },
];

// Mock API functions
export async function getPosts(): Promise<Post[]> {
  return Promise.resolve(MOCK_POSTS);
}

export async function getPost(slug: string): Promise<Post | null> {
  const post = MOCK_POSTS.find(p => p.slug.current === slug) || null;
  return Promise.resolve(post);
}

export async function getPostsByCategory(categoryTitle: string): Promise<Post[]> {
    if (!categoryTitle) {
      return Promise.resolve(MOCK_POSTS);
    }
    const normalizedCategory = categoryTitle.toLowerCase();
    const posts = MOCK_POSTS.filter(p => 
        p.categories.some(c => c.title.toLowerCase() === normalizedCategory)
    );
    return Promise.resolve(posts);
}

export async function getCategories(): Promise<Category[]> {
    return Promise.resolve(MOCK_CATEGORIES);
}

export async function getAuthor(): Promise<Author | null> {
    return Promise.resolve(MOCK_AUTHORS[0]);
}

// Mock function to get a placeholder URL for images
// In a real Sanity project, you'd use @sanity/image-url
export function urlFor(source: SanityImage): string {
    // A simple mapping from ref to a placeholder image URL
    const imageMap: { [key: string]: string } = {
        'image-1': 'https://placehold.co/1200x630.png',
        'image-2': 'https://placehold.co/1200x630.png',
        'image-3': 'https://placehold.co/1200x630.png',
        'image-4': 'https://placehold.co/1200x630.png',
        'image-person1': 'https://i.postimg.cc/FKMsD7S4/Karakuzular.jpg',
    };
    const key = source?.asset?._ref;
    return imageMap[key] || 'https://placehold.co/1200x630.png';
}

export const dataAiHintMap: { [key: string]: string } = {
    'image-1': 'technology code',
    'image-2': 'modern architecture',
    'image-3': 'minimalist design',
    'image-4': 'web development',
    'image-person1': 'profile picture',
};
