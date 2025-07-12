"use client";

import Link from 'next/link';
import { Menu } from 'lucide-react';
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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
        <span className="font-bold text-lg sm:text-xl">hpn blog</span>
    </div>
);


export function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
            <Link href="/" className="flex items-center">
                <Logo />
            </Link>
        </div>
        
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="px-2" aria-label="Toggle Menu">
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
                    className="transition-colors hover:text-foreground text-foreground/80 text-lg py-2"
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

        <div className="flex flex-1 items-center justify-center">
            <Link href="/" className="flex items-center md:hidden">
                <Logo />
            </Link>
            <nav className="items-center gap-6 text-sm hidden md:flex">
                {navLinks.map((link) => (
                <Link
                    key={link.label}
                    href={link.href}
                    className="transition-colors hover:text-foreground/80 text-foreground/60 font-medium"
                >
                    {link.label}
                </Link>
                ))}
            </nav>
        </div>

        <div className="flex items-center justify-end gap-2">
            <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost">Log In</Button>
                <Button>Sign Up</Button>
            </div>
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
