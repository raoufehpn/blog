
import { getPost, getPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { format } from 'date-fns';
import { urlFor, dataAiHintMap } from '@/lib/data';
import { PortableText } from '@/components/blog/PortableText';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AIAssistant } from '@/components/blog/AIAssistant';
import { RecentPostsSidebar } from '@/components/blog/RecentPostsSidebar';
import { Separator } from '@/components/ui/separator';
import { ActionToolbar } from '@/components/blog/ActionToolbar';
import { CommentsSection } from '@/components/blog/CommentsSection';

interface PostPageProps {
  params: { slug: string };
};

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
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
      images: [
        {
          url: imageUrl,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug);
  const allPosts = await getPosts();

  if (!post) {
    notFound();
  }

  const recentPosts = allPosts.filter(p => p._id !== post._id).slice(0, 4);

  const postImageUrl = urlFor(post.coverImage);
  const authorImageUrl = urlFor(post.author.image);
  const dataAiHint = dataAiHintMap[post.coverImage.asset._ref] || 'blog post';
  const authorImageHint = dataAiHintMap[post.author.image.asset._ref] || 'person';

  return (
    <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
            <article className="lg:col-span-2">
                <header className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter mb-4 text-balance">
                    {post.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                        <AvatarImage src={authorImageUrl} alt={post.author.name} data-ai-hint={authorImageHint}/>
                        <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span>{post.author.name}</span>
                    </div>
                    <span>•</span>
                    <time dateTime={post.publishedAt}>
                        {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                    </time>
                    </div>
                </header>
                
                <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-8 shadow-lg">
                    <Image
                    src={postImageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    data-ai-hint={dataAiHint}
                    />
                </div>

                <div className="flex items-center justify-between mb-8">
                    <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
                    ))}
                    </div>
                    <AIAssistant summary={post.excerpt} />
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none mx-auto font-body">
                    <PortableText value={post.content} />
                </div>

                <Separator className="my-12" />

                <ActionToolbar />

                <CommentsSection />

            </article>

            <aside className="lg:col-span-1 mt-12 lg:mt-0">
                <RecentPostsSidebar posts={recentPosts} />
            </aside>
        </div>
    </div>
  );
}
