import { getPosts } from "@/lib/sanity";
import ClientPostsPage from "./client-posts-page";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <ClientPostsPage posts={posts} />
    </div>
  );
}