export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  url?: string; // Adding optional URL for adapted Supabase data
}

export interface Slug {
  _type: 'slug';
  current: string;
}

export interface Block {
  _key: string;
  _type: 'block';
  children: Span[];
  markDefs: any[];
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
}

export interface Span {
  _key: string;
  _type: 'span';
  marks: string[];
  text: string;
}

export interface Author {
  _id: string;
  _type: 'author';
  name: string;
  image: SanityImage;
  bio: Block[];
  socials: { name: string; url: string }[];
}

export interface Category {
  _id: string;
  _type: 'category';
  title: string;
  description?: string;
}

export interface Post {
  _id: string;
  _type: 'post';
  title: string;
  slug: Slug;
  publishedAt: string;
  coverImage: SanityImage;
  excerpt: string;
  content: Block[];
  author: Author;
  categories: Category[];
  tags?: string[];
}
