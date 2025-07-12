import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import type { Post } from '@/types';
import { urlFor, dataAiHintMap } from '@/lib/supabase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    <Link 
      href={`/post/${post.slug.current}`} 
      className="group block overflow-hidden rounded-lg border bg-card text-card-foreground transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={postImageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          data-ai-hint={dataAiHint}
        />
      </div>
      <div className="p-5">
        <Badge variant="outline" className="mb-3">
            {post.categories[0]?.title || 'Blog'}
        </Badge>
        <h3 className="font-bold text-lg leading-snug mb-3 text-balance">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{post.excerpt}</p>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-auto pt-4 border-t">
          <Avatar className="h-8 w-8">
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
