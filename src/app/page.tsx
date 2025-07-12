import { getPosts } from "@/lib/sanity";
import ClientHomePage from "./client-home-page";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <ClientHomePage posts={posts} />
    </div>
  );
}
