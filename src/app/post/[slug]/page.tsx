
import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/lib/data';
import PostClientPage from './PostClientPage';

// Simplified component props, no complex interface needed.
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }

  const allPosts = await getPosts();
  const recentPosts = allPosts.filter(p => p._id !== post._id).slice(0, 4);

  return <PostClientPage post={post} recentPosts={recentPosts} />;
}
