'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Linkedin, Facebook } from 'lucide-react';
import { getAuthor, urlFor } from '@/lib/data';
import type { Author } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

const XLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153Zm-1.61 19.933h2.51l-13.9-19.933H3.78l13.511 19.933Z"/>
    </svg>
);


export default function AboutPage() {
    const [author, setAuthor] = useState<Author | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const fetchedAuthor = await getAuthor();
            setAuthor(fetchedAuthor);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return (
             <div className="container mx-auto px-4 py-12">
                <header className="text-center mb-12">
                    <Skeleton className="h-12 w-1/2 mx-auto" />
                    <Skeleton className="h-6 w-1/3 mx-auto mt-4" />
                </header>
                <div className="max-w-4xl mx-auto">
                    <Card className="overflow-hidden">
                        <div className="md:flex">
                            <div className="md:w-1/3 bg-secondary p-8 flex flex-col items-center justify-center">
                                <Skeleton className="w-32 h-32 rounded-full" />
                                <Skeleton className="h-8 w-32 mt-4" />
                                <div className="flex space-x-2 mt-4">
                                    <Skeleton className="h-10 w-10" />
                                    <Skeleton className="h-10 w-10" />
                                    <Skeleton className="h-10 w-10" />
                                </div>
                            </div>
                            <div className="md:w-2/3 p-8">
                                <CardHeader>
                                    <Skeleton className="h-10 w-24" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-5 w-full mb-2" />
                                    <Skeleton className="h-5 w-full mb-2" />
                                    <Skeleton className="h-5 w-4/5" />
                                </CardContent>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }

    if (!author) {
        return <div className="container mx-auto px-4 py-8">Author not found.</div>
    }
    
    const authorImageUrl = urlFor(author.image);

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
                                <AvatarImage src={authorImageUrl} alt={author.name} data-ai-hint="person face"/>
                                <AvatarFallback className="text-4xl">{author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <h2 className="text-2xl font-headline font-semibold mt-4">{author.name}</h2>
                            <div className="flex space-x-2 mt-4">
                               <Button variant="ghost" size="icon" asChild>
                                    <Link href={author.socials.find(s => s.name === 'X')?.url || '#'} target="_blank" rel="noopener noreferrer">
                                        <XLogo className="h-5 w-5" />
                                        <span className="sr-only">X</span>
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={author.socials.find(s => s.name === 'LinkedIn')?.url || '#'} target="_blank" rel="noopener noreferrer">
                                        <Linkedin className="h-5 w-5" />
                                        <span className="sr-only">LinkedIn</span>
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={author.socials.find(s => s.name === 'Facebook')?.url || '#'} target="_blank" rel="noopener noreferrer">
                                        <Facebook className="h-5 w-5" />
                                        <span className="sr-only">Facebook</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <div className="md:w-2/3 p-8">
                            <CardHeader>
                                <CardTitle className="font-headline text-3xl">Bio</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose dark:prose-invert max-w-none font-body text-muted-foreground">
                                    <p>{author.bio[0]?.children[0]?.text || ''}</p>
                                </div>
                            </CardContent>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
