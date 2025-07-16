
import type { Post, Author, Category } from '@/types';

export const mockAuthor: Author = {
  _id: 'author-1',
  _type: 'author',
  name: 'HPN',
  image: { _type: 'image', asset: { _ref: 'https://i.postimg.cc/9Q6z3d7q/male-avatar-profile-picture-black-hair-vector-illustration-1142-84333.jpg', _type: 'reference' } },
  bio: [{ 
    _key: 'bio-1', 
    _type: 'block', 
    style: 'normal',
    markDefs: [],
    children: [{_key: 'span-1', _type: 'span', marks: [], text: 'An experienced developer navigating the worlds of AI, web development, and everything in between. Passionate about creating beautiful and functional applications.'}]
  }],
  socials: [
      {name: 'Twitter', url: '#'},
      {name: 'GitHub', url: '#'}
  ]
};

export const mockCategories: Category[] = [
  { _id: 'cat-1', _type: 'category', title: 'Technology' },
  { _id: 'cat-2', _type: 'category', title: 'Design' },
  { _id: 'cat-3', _type: 'category', title: 'AI' },
  { _id: 'cat-4', _type: 'category', title: 'Security' },
];

export const mockPosts: Post[] = [
  {
    _id: 'post-1',
    _type: 'post',
    title: 'Getting Started with Next.js 14',
    slug: { _type: 'slug', current: 'getting-started-with-nextjs-14' },
    publishedAt: '2024-05-10T10:00:00Z',
    coverImage: { _type: 'image', asset: { _ref: 'https://i.postimg.cc/8P9bC17m/image.png', _type: 'reference' } },
    excerpt: 'A comprehensive guide to setting up your first project with the latest version of Next.js, including App Router and Server Components.',
    content: [{ _key: 'c1', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 's1', _type: 'span', marks: [], text: 'Next.js 14 introduced a paradigm shift with the App Router. This post will walk you through the essentials of project setup, routing, and data fetching in this new era of React development.'}] }],
    author: mockAuthor,
    categories: [mockCategories[0]],
    tags: ['Next.js', 'React', 'WebDev'],
  },
  {
    _id: 'post-2',
    _type: 'post',
    title: 'The Art of Minimalist Design',
    slug: { _type: 'slug', current: 'art-of-minimalist-design' },
    publishedAt: '2024-05-12T11:30:00Z',
    coverImage: { _type: 'image', asset: { _ref: 'https://i.postimg.cc/0j7bS2bB/image.png', _type: 'reference' } },
    excerpt: 'Discover the principles of minimalist design and how "less is more" can lead to more intuitive and impactful user experiences.',
    content: [{ _key: 'c2', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 's2', _type: 'span', marks: [], text: 'Minimalism is not just an aesthetic; it\'s a philosophy. It helps users focus on what truly matters in your application by removing unnecessary clutter and embracing whitespace.'}] }],
    author: mockAuthor,
    categories: [mockCategories[1]],
    tags: ['UI/UX', 'Design', 'Minimalism'],
  },
  {
    _id: 'post-3',
    _type: 'post',
    title: 'Deploying Apps with Docker',
    slug: { _type: 'slug', current: 'deploying-apps-with-docker' },
    publishedAt: '2024-05-15T09:00:00Z',
    coverImage: { _type: 'image', asset: { _ref: 'https://i.postimg.cc/5N8yY3tT/image.png', _type: 'reference' } },
    excerpt: 'A step-by-step tutorial on containerizing a Node.js application with Docker for consistent deployments across any environment.',
    content: [{ _key: 'c3', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 's3', _type: 'span', marks: [], text: 'Docker simplifies deployment and ensures your application runs the same everywhere. Learn how to create a Dockerfile, build an image, and run a container.'}] }],
    author: mockAuthor,
    categories: [mockCategories[0]],
    tags: ['Docker', 'DevOps', 'Node.js'],
  },
    {
    _id: 'post-4',
    _type: 'post',
    title: 'Mastering User Experience (UX) Writing',
    slug: { _type: 'slug', current: 'mastering-ux-writing' },
    publishedAt: '2024-05-18T14:00:00Z',
    coverImage: { _type: 'image', asset: { _ref: 'https://i.postimg.cc/d1BuH9pW/image.png', _type: 'reference' } },
    excerpt: 'Learn how to write clear, concise, and helpful copy that guides users and enhances their interaction with your product.',
    content: [{ _key: 'c4', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 's4', _type: 'span', marks: [], text: 'Good UX writing is invisible. It guides users without them even noticing. This guide covers the fundamentals of creating effective microcopy.'}] }],
    author: mockAuthor,
    categories: [mockCategories[1]],
    tags: ['UX', 'Writing', 'Design'],
  },
  {
    _id: 'post-5',
    _type: 'post',
    title: 'An Introduction to Generative AI',
    slug: { _type: 'slug', current: 'intro-to-generative-ai' },
    publishedAt: '2024-05-20T16:00:00Z',
    coverImage: { _type: 'image', asset: { _ref: 'https://i.postimg.cc/pL4DgZ4K/image.png', _type: 'reference' } },
    excerpt: 'Explore the fascinating world of Generative AI, from large language models like GPT to image generation with DALL-E and Midjourney.',
    content: [{ _key: 'c5', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 's5', _type: 'span', marks: [], text: 'Generative AI is changing the world. This article breaks down the core concepts behind this transformative technology and its potential applications.'}] }],
    author: mockAuthor,
    categories: [mockCategories[0], mockCategories[2]],
    tags: ['AI', 'Machine Learning', 'GPT'],
  },
   {
    _id: 'post-6',
    _type: 'post',
    title: 'Essential Cybersecurity Practices for Developers',
    slug: { _type: 'slug', current: 'essential-cybersecurity-practices' },
    publishedAt: '2024-05-22T11:00:00Z',
    coverImage: { _type: 'image', asset: { _ref: 'https://i.postimg.cc/Xv3w0ZJb/image.png', _type: 'reference' } },
    excerpt: 'As a developer, you are the first line of defense. Learn about common vulnerabilities and how to write more secure code from the start.',
    content: [{ _key: 'c6', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 's6', _type: 'span', marks: [], text: 'From SQL injection to Cross-Site Scripting (XSS), developers must be aware of security threats. We will cover 10 essential practices to protect your applications.'}] }],
    author: mockAuthor,
    categories: [mockCategories[0], mockCategories[3]],
    tags: ['Security', 'WebDev', 'Best Practices'],
  }
];
