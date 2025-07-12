import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Untitled UI',
    template: '%s | Untitled UI',
  },
  description: 'A professional, responsive, SEO-optimized personal blog using Next.js, TypeScript, Tailwind CSS, and Sanity.io.',
  openGraph: {
    title: 'Untitled UI',
    description: 'A modern blog for the modern developer.',
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com', // Replace with your actual domain
    siteName: 'Untitled UI',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <div className="relative flex min-h-dvh flex-col bg-background">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
