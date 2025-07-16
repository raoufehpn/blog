
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
    default: 'Sanity & Serenity Blog',
    template: '%s | Sanity & Serenity Blog',
  },
  description: 'A blog about travel, food, and finding balance in a busy world. Discover new recipes, travel guides, and tips for a more mindful life.',
  openGraph: {
    title: 'Sanity & Serenity Blog',
    description: 'A blog about travel, food, and finding balance in a busy world.',
    type: 'website',
    locale: 'en_US',
    url: '/', 
    siteName: 'Sanity & Serenity Blog',
  },
   twitter: {
    card: 'summary_large_image',
    title: 'Sanity & Serenity Blog',
    description: 'A blog about travel, food, and finding balance in a busy world.',
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
