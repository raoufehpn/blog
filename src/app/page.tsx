import { getPosts } from "@/lib/sanity";
import ClientHomePage from "./client-home-page";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <ClientHomePage posts={posts} />
    </div>
  );
}
