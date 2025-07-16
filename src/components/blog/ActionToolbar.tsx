
'use client';

import { useState } from 'react';
import { Heart, Bookmark, MessageSquare, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ActionToolbar() {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = () => setIsLiked(!isLiked);
  const handleBookmark = () => setIsBookmarked(!isBookmarked);

  const actions = [
    {
      label: 'Like',
      icon: Heart,
      count: 12,
      isActive: isLiked,
      onClick: handleLike,
    },
    {
      label: 'Comment',
      icon: MessageSquare,
      count: 5,
      onClick: () => document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      label: 'Save',
      icon: Bookmark,
      count: 7,
      isActive: isBookmarked,
      onClick: handleBookmark,
    },
  ];

  return (
    <div className="flex items-center justify-between border-t border-b py-2 mb-12">
      <div className="flex items-center gap-2 sm:gap-4">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="ghost"
            size="sm"
            onClick={action.onClick}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <action.icon className={cn('h-5 w-5', action.isActive && 'fill-current text-red-500')} />
            <span className="hidden sm:inline">{action.label}</span>
            <span className="font-semibold text-sm">{action.count}</span>
          </Button>
        ))}
      </div>
      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
        <Share2 className="h-5 w-5 mr-2" />
        <span className="hidden sm:inline">Share</span>
      </Button>
    </div>
  );
}
