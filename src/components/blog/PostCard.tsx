import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import type { Post } from '@/types';
import { urlFor, dataAiHintMap } from '@/lib/sanity';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const postImageUrl = urlFor(post.coverImage);
  const authorImageUrl = urlFor(post.author.image);
  const dataAiHint = dataAiHintMap[post.coverImage.asset._ref] || 'blog post';
  const authorImageHint = dataAiHintMap[post.author.image.asset._ref] || 'person';

  return (
    <Link href={`/post/${post.slug.current}`} className="group flex flex-col bg-secondary/30 dark:bg-secondary/50 p-4 rounded-xl border border-transparent hover:border-primary/50 transition-all duration-300">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg mb-4">
        <Image
          src={postImageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          data-ai-hint={dataAiHint}
        />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
            {post.categories.slice(0, 1).map((category) => (
                <Badge key={category._id} variant="default" className="bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:text-primary dark:hover:bg-primary/30">
                    {category.title}
                </Badge>
            ))}
        </div>
        <h3 className="font-bold font-headline text-2xl leading-snug mb-3 text-balance group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-base line-clamp-3 mb-6 flex-grow">{post.excerpt}</p>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-auto">
          <Avatar className="h-10 w-10">
            <AvatarImage src={authorImageUrl} alt={post.author.name} data-ai-hint={authorImageHint}/>
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{post.author.name}</p>
            <time dateTime={post.publishedAt}>
              {format(new Date(post.publishedAt), 'd MMM yyyy')}
            </time>
          </div>
        </div>
      </div>
    </Link>
  );
}
