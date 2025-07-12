"use client";

import Link from 'next/link';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '#', label: 'Products', dropdown: true },
  { href: '#', label: 'Blog', dropdown: true },
  { href: '#', label: 'Pricing' },
  { href: '/about', label: 'About us' },
];

const Logo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 7L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 22V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 7L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 4.5L7 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


export function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="hidden font-bold sm:inline-block">
              Untitled UI
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
                {link.dropdown && <ChevronDown className="h-4 w-4" />}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between md:justify-end">
          <div className="md:hidden">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
              <span className="font-bold">Untitled UI</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost">Log in</Button>
              <Button>Sign up</Button>
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
                  <span className="font-bold">Untitled UI</span>
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
                      {link.dropdown && <ChevronDown className="h-4 w-4" />}
                    </Link>
                  ))}
                </div>
                 <div className="mt-6 pt-6 border-t flex flex-col gap-2">
                    <Button variant="ghost">Log in</Button>
                    <Button>Sign up</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
