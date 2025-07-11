import { getAuthor, urlFor, dataAiHintMap } from '@/lib/sanity';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Github, Twitter } from 'lucide-react';
import { PortableText } from '@/components/blog/PortableText';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about the author of Sanity & Serenity.',
};

export default async function AboutPage() {
    const author = await getAuthor();

    if (!author) {
        return <div className="container mx-auto px-4 py-8">Author not found.</div>;
    }

    const authorImageUrl = urlFor(author.image);
    const authorImageHint = dataAiHintMap[author.image.asset._ref] || 'person';

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-bold font-headline tracking-tighter">About the Author</h1>
                <p className="text-muted-foreground mt-2 text-lg">The mind behind the words.</p>
            </header>

            <div className="max-w-4xl mx-auto">
                <Card className="overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/3 bg-secondary p-8 flex flex-col items-center justify-center">
                            <Avatar className="w-32 h-32 border-4 border-background shadow-lg mb-4">
                                <AvatarImage src={authorImageUrl} alt={author.name} data-ai-hint={authorImageHint}/>
                                <AvatarFallback className="text-4xl">{author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h2 className="text-2xl font-headline font-semibold mt-4">{author.name}</h2>
                            <div className="flex space-x-2 mt-4">
                                {author.socials.map((social) => (
                                    <Button key={social.name} variant="ghost" size="icon" asChild>
                                        <Link href={social.url} target="_blank" rel="noopener noreferrer">
                                            {social.name.toLowerCase() === 'twitter' && <Twitter className="h-5 w-5" />}
                                            {social.name.toLowerCase() === 'github' && <Github className="h-5 w-5" />}
                                            <span className="sr-only">{social.name}</span>
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="md:w-2/3 p-8">
                            <CardHeader>
                                <CardTitle className="font-headline text-3xl">Bio</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose dark:prose-invert max-w-none font-body text-muted-foreground">
                                    <PortableText value={author.bio} />
                                </div>
                            </CardContent>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
