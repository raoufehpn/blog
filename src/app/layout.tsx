import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: {
    default: 'Sanity & Serenity',
    template: '%s | Sanity & Serenity',
  },
  description: 'A professional, responsive, SEO-optimized personal blog using Next.js, TypeScript, Tailwind CSS, and Sanity.io.',
  openGraph: {
    title: 'Sanity & Serenity',
    description: 'A modern blog for the modern developer.',
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com', 
    siteName: 'Sanity & Serenity',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-body antialiased", inter.variable)}>
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
