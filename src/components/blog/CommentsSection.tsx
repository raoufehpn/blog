
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const mockComments = [
    {
        id: 1,
        author: {
            name: 'Jane Doe',
            avatarUrl: 'https://placehold.co/100x100.png',
            initials: 'JD'
        },
        timestamp: '2 hours ago',
        text: 'This was an incredibly insightful read! I especially appreciated the breakdown of server components. Looking forward to more content like this.',
    },
    {
        id: 2,
        author: {
            name: 'John Smith',
            avatarUrl: 'https://placehold.co/100x100.png',
            initials: 'JS'
        },
        timestamp: '5 hours ago',
        text: 'Great article. One question though, how would you handle state management in a larger application using this architecture? Would love to see a follow-up post on that.',
    }
]

export function CommentsSection() {
    return (
        <section className="mt-12" id="comment-form">
            <h2 className="text-2xl font-bold font-headline mb-6">Comments ({mockComments.length})</h2>
            
            <Card className="mb-8">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <Avatar>
                            <AvatarImage src="https://placehold.co/100x100.png" alt="Your Avatar" data-ai-hint="person"/>
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="w-full">
                            <Textarea
                                placeholder="Add to the discussion..."
                                className="mb-2"
                                rows={3}
                            />
                            <div className="flex justify-end">
                                <Button>Submit Comment</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-8">
                {mockComments.map(comment => (
                    <div key={comment.id} className="flex items-start gap-4">
                        <Avatar>
                            <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} data-ai-hint="person"/>
                            <AvatarFallback>{comment.author.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-sm">{comment.author.name}</p>
                                <span className="text-xs text-muted-foreground">•</span>
                                <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
