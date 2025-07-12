"use client";

import Link from 'next/link';
import { Menu, UserCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from '@/app/auth/actions';

const navLinks = [
  { href: '/posts', label: 'All Posts' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const Logo = () => (
    <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
        <span className="font-bold text-lg sm:text-xl">hpn blog</span>
    </div>
);


export function Header({ session }: { session: Session | null }) {
  const [isSheetOpen, setSheetOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex md:mr-0 md:flex-none">
            <Link href="/" className="flex items-center">
                <Logo />
            </Link>
        </div>
        
        <div className="md:hidden ml-auto">
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
                  {session ? (
                     <Button onClick={handleLogout} variant="ghost" className="w-full justify-center text-lg">Sign Out</Button>
                  ) : (
                    <>
                      <Button asChild variant="ghost" className="w-full justify-center text-lg">
                        <Link href="/login" onClick={() => setSheetOpen(false)}>Log In</Link>
                      </Button>
                      <Button asChild className="w-full justify-center text-lg">
                        <Link href="/signup" onClick={() => setSheetOpen(false)}>Sign Up</Link>
                      </Button>
                    </>
                  )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex">
            <nav className="flex items-center gap-6 text-sm">
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

        <div className="hidden md:flex items-center justify-end gap-2 ml-auto">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                     <UserCircle className="h-8 w-8" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">My Account</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
