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
    <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="h-8 w-8 text-foreground">
            <path d="M16 31.5C24.5604 31.5 31.5 24.5604 31.5 16C31.5 7.43959 24.5604 0.5 16 0.5C7.43959 0.5 0.5 7.43959 0.5 16C0.5 24.5604 7.43959 31.5 16 31.5Z" stroke="currentColor" strokeMiterlimit="10"/>
            <path d="M16 25C20.9706 25 25 20.9706 25 16C25 11.0294 20.9706 7 16 7C11.0294 7 7 11.0294 7 16C7 20.9706 11.0294 25 16 25Z" stroke="currentColor" strokeMiterlimit="10"/>
        </svg>
        <span className="font-bold text-xl">Sanity & Serenity</span>
    </div>
);


export function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-20 items-center">
        <div className="mr-8 hidden md:flex">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
        </div>
        
        <nav className="items-center gap-6 text-sm hidden md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-muted-foreground font-medium flex items-center gap-1"
              >
                {link.label}
              </Link>
            ))}
        </nav>

        <div className="flex flex-1 items-center justify-end">
          <div className="md:hidden flex-1">
            <Link href="/" className="flex items-center">
               <Logo />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost">Log In</Button>
                <Button>Sign Up</Button>
            </div>
            <ThemeToggle />
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="px-2 md:hidden" aria-label="Toggle Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0 w-full max-w-xs">
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-6" onClick={() => setSheetOpen(false)}>
                  <Logo />
                </Link>
                <div className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.label} 
                      href={link.href} 
                      className="transition-colors hover:text-foreground text-muted-foreground text-lg py-2"
                      onClick={() => setSheetOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                 <div className="mt-6 pt-6 border-t flex flex-col gap-2">
                    <Button variant="ghost" className="w-full justify-start text-lg">Log In</Button>
                    <Button className="w-full justify-start text-lg">Sign Up</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
