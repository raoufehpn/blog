"use client";

import Link from 'next/link';
import { Menu, ChevronDown, Rss } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useState } from 'react';

const navLinks = [
  { href: '/category/all', label: 'All Posts' },
  { href: '/about', label: 'About' },
  { href: '#', label: 'Contact' },
];

const Logo = () => (
    <div className="flex items-center justify-center h-8 w-8 bg-primary rounded-lg text-primary-foreground">
        <span className="font-bold text-lg">S</span>
    </div>
);


export function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="hidden font-bold sm:inline-block font-headline">
              Sanity & Serenity
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between md:justify-end">
          <div className="md:hidden">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
              <span className="font-bold font-headline">Sanity & Serenity</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="icon">
                    <Rss className="h-5 w-5" />
                    <span className="sr-only">Subscribe</span>
                </Button>
            </div>
            <ThemeToggle />
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="px-2 md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-6" onClick={() => setSheetOpen(false)}>
                  <Logo />
                  <span className="font-bold font-headline">Sanity & Serenity</span>
                </Link>
                <div className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.label} 
                      href={link.href} 
                      className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-1"
                      onClick={() => setSheetOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                 <div className="mt-6 pt-6 border-t">
                    <Button variant="ghost" className="w-full justify-start">
                        <Rss className="h-5 w-5 mr-2" />
                        Subscribe
                    </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
