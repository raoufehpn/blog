
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPost, getPosts, urlFor } from '@/lib/data';
import PostClientPage from './PostClientPage';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(post => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) {
    return {};
  }
  const imageUrl = urlFor(post.coverImage);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      url: `/post/${post.slug.current}`,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  const allPosts = await getPosts();

  if (!post) {
    notFound();
  }

  const recentPosts = allPosts.filter(p => p._id !== post._id).slice(0, 4);

  return <PostClientPage post={post} recentPosts={recentPosts} />;
}
