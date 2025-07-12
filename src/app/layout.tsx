import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
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

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: {
    default: 'hpn blog',
    template: '%s | hpn blog',
  },
  description: 'A professional, responsive, SEO-optimized personal blog using Next.js, TypeScript, Tailwind CSS, and Sanity.io.',
  openGraph: {
    title: 'hpn blog',
    description: 'A modern blog for the modern developer.',
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com', 
    siteName: 'hpn blog',
  },
   twitter: {
    card: 'summary_large_image',
    title: 'hpn blog',
    description: 'A modern blog for the modern developer.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-body antialiased", inter.variable, spaceGrotesk.variable)}>
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
