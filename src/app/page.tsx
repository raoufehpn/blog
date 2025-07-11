import { getPosts } from "@/lib/sanity";
import ClientHomePage from "./client-home-page";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold font-headline tracking-tighter text-balance">Sanity & Serenity</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          A tranquil corner of the web for thoughts on code and creativity.
        </p>
      </header>
      <ClientHomePage posts={posts} />
    </div>
  );
}
