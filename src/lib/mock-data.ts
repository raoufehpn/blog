
import type { Post, Author, Category } from '@/types';

export const mockAuthor: Author = {
  _id: 'author-1',
  _type: 'author',
  name: 'HPN',
  image: { _type: 'image', asset: { _ref: 'https://i.postimg.cc/FKMsD7S4/Karakuzular.jpg', _type: 'reference' } },
  bio: [{ 
    _key: 'bio-1', 
    _type: 'block', 
    style: 'normal',
    markDefs: [],
    children: [{_key: 'span-1', _type: 'span', marks: [], text: 'An experienced developer navigating the worlds of AI, web development, and everything in between. Passionate about creating beautiful and functional applications.'}]
  }],
  socials: [
      {name: 'X', url: 'https://x.com/GhoutThe1731?t=BS7axAQye6gCCugDZHsPtA&s=09'},
      {name: 'LinkedIn', url: 'https://www.linkedin.com/in/raoufe-abde-b9b81636a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'}
  ]
};

export const mockCategories: Category[] = [
  { _id: 'cat-1', _type: 'category', title: 'Travel' },
  { _id: 'cat-2', _type: 'category', title: 'Food' },
  { _id: 'cat-3', _type: 'category', title: 'Lifestyle' },
  { _id: 'cat-4', _type: 'category', title: 'Wellness' },
];

export const mockPosts: Post[] = [
  {
    _id: 'post-1',
    _type: 'post',
    title: 'The Ultimate Guide to Packing for a Weekend Getaway',
    slug: { _type: 'slug', current: 'ultimate-guide-to-packing-for-weekend-getaway' },
    publishedAt: '2024-05-10T10:00:00Z',
    coverImage: { _type: 'image', asset: { _ref: 'https://i.postimg.cc/Qdn7nLbZ/man-with-backpack-strolling-by-beach-fluffy-clouds.jpg', _type: 'reference' } },
    excerpt: 'Learn how to pack light and smart for your next weekend trip. This guide covers everything from choosing the right bag to essential items you can\'t forget.',
    content: [{ _key: 'c1', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 's1', _type: 'span', marks: [], text: 'Packing for a short trip can be deceptively tricky. Our guide breaks down the process into simple, actionable steps to ensure you have everything you need without overpacking.'}] }],
    author: mockAuthor,
    categories: [mockCategories[0]],
    tags: ['Travel Tips', 'Packing', 'Lifestyle'],
  },
  {
    _id: 'post-2',
    _type: 'post',
    title: '10 Simple Recipes for a Healthy and Delicious Week',
    slug: { _type: 'slug', current: '10-simple-healthy-recipes' },
    publishedAt: '2024-05-12T11:30:00Z',
    coverImage: { _type: 'image', asset: { _ref: 'https://i.postimg.cc/8kKTv1PG/pexels-ella-olsson-572949-1640777.jpg', _type: 'reference' } },
    excerpt: 'Eating healthy doesn\'t have to be boring or time-consuming. Here are 10 easy-to-make recipes that are both nutritious and packed with flavor.',
    content: [{ _key: 'c2', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 's2', _type: 'span', marks: [], text: 'From quick breakfasts to satisfying dinners, these recipes are designed for busy people who want to maintain a healthy lifestyle without spending hours in the kitchen.'}] }],
    author: mockAuthor,
    categories: [mockCategories[1], mockCategories[3]],
    tags: ['Healthy Eating', 'Recipes', 'Meal Prep'],
  },
  {
    _id: 'post-3',
    _type: 'post',
    title: '5 Morning Habits to Supercharge Your Productivity',
    slug: { _type: 'slug', current: '5-morning-habits-for-productivity' },
    publishedAt: '2024-05-15T09:00:00Z',
    coverImage: { _type: 'image', asset: { _ref: 'https://i.postimg.cc/hvjs7849/pexels-arina-krasnikova-5951553.jpg', _type: 'reference' } },
    excerpt: 'How you start your day sets the tone for everything that follows. Discover five simple morning habits that can dramatically boost your focus and productivity.',
    content: [{ _key: 'c3', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 's3', _type: 'span', marks: [], text: 'Implementing small, consistent changes to your morning routine can have a massive impact. We explore scientifically-backed habits to help you win the day before it even begins.'}] }],
    author: mockAuthor,
    categories: [mockCategories[2]],
    tags: ['Productivity', 'Habits', 'Self-Improvement'],
  },
    {
    _id: 'post-4',
    _type: 'post',
    title: 'The Beginner\'s Guide to Mindfulness and Meditation',
    slug: { _type: 'slug', current: 'beginners-guide-to-mindfulness' },
    publishedAt: '2024-05-18T14:00:00Z',
    coverImage: { _type: 'image', asset: { _ref: 'https://i.postimg.cc/RZc7hp1k/pexels-kelvin809-810775.jpg', _type: 'reference' } },
    excerpt: 'Feeling stressed or overwhelmed? This guide introduces the basic principles of mindfulness and provides simple meditation exercises to help you find calm.',
    content: [{ _key: 'c4', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 's4', _type: 'span', marks: [], text: 'Mindfulness is the practice of being present. You don\'t need a special cushion or a silent retreat to start. Learn how to incorporate mindfulness into your daily life for a greater sense of peace.'}] }],
    author: mockAuthor,
    categories: [mockCategories[3]],
    tags: ['Mental Health', 'Meditation', 'Wellness'],
  },
  {
    _id: 'post-5',
    _type: 'post',
    title: 'How to Create a Cozy and Stylish Living Room on a Budget',
    slug: { _type: 'slug', current: 'cozy-living-room-on-a-budget' },
    publishedAt: '2024-05-20T16:00:00Z',
    coverImage: { _type: 'image', asset: { _ref: 'https://i.postimg.cc/g0ggscSy/spacejoy-Kh4ted-Fd-Hz4-unsplash.jpg', _type: 'reference' } },
    excerpt: 'You don\'t need to spend a fortune to have a living room you love. Discover our top tips for budget-friendly decor that makes a big impact.',
    content: [{ _key: 'c5', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 's5', _type: 'span', marks: [], text: 'With a few clever tricks, you can transform your living space. From smart furniture choices to DIY decor, we show you how to create a stylish and inviting atmosphere without breaking the bank.'}] }],
    author: mockAuthor,
    categories: [mockCategories[2]],
    tags: ['Home Decor', 'DIY', 'Budget Living'],
  },
   {
    _id: 'post-6',
    _type: 'post',
    title: 'A Step-by-Step Guide to Starting Your First Vegetable Garden',
    slug: { _type: 'slug', current: 'starting-your-first-vegetable-garden' },
    publishedAt: '2024-05-22T11:00:00Z',
    coverImage: { _type: 'image', asset: { _ref: 'https://i.postimg.cc/sXZ5W3tg/pexels-mykeh-18943896.jpg', _type: 'reference' } },
    excerpt: 'Growing your own food is a rewarding experience. This guide provides everything you need to know, from choosing the right spot to harvesting your first crop.',
    content: [{ _key: 'c6', _type: 'block', style: 'normal', markDefs: [], children: [{_key: 's6', _type: 'span', marks: [], text: 'Whether you have a large backyard or a small balcony, you can enjoy fresh, homegrown vegetables. We walk you through the entire process, making it easy for anyone to get started.'}] }],
    author: mockAuthor,
    categories: [mockCategories[2], mockCategories[1]],
    tags: ['Gardening', 'Hobby', 'Sustainability'],
  }
];
