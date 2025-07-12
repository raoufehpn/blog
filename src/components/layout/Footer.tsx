import Link from 'next/link';
import { Button } from '@/components/ui/button';

const footerLinksGroups = [
    {
        title: 'Product',
        links: ['Overview', 'Features', 'Solutions', 'Tutorials', 'Pricing', 'Releases'],
    },
    {
        title: 'Company',
        links: ['About us', 'Careers', 'Press', 'News', 'Media kit', 'Contact'],
    },
    {
        title: 'Resources',
        links: ['Blog', 'Newsletter', 'Events', 'Help centre', 'Tutorials', 'Support'],
    },
    {
        title: 'Social',
        links: ['Twitter', 'LinkedIn', 'Facebook', 'GitHub'],
    },
    {
        title: 'Legal',
        links: ['Terms', 'Privacy', 'Cookies', 'Licenses'],
    },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-24">
      <div className="container mx-auto px-4 pt-16 pb-8">
         <div className="pb-16">
            <h2 className="text-3xl font-bold mb-2 text-center">Let's get started on something great</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto text-center">Join over 4,000+ startups already growing with us.</p>
            <div className="flex-shrink-0 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button variant="outline" className="w-full sm:w-auto">Chat to us</Button>
                <Button variant="default" className="w-full sm:w-auto">Get started</Button>
            </div>
        </div>
        
        <div className="border-t border-border/50 pt-16 grid grid-cols-2 md:grid-cols-6 gap-8">
            <div className="col-span-2 mb-8 md:mb-0">
                <Link href="/">
                    <div className="flex items-center space-x-2">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
                        <span className="font-bold text-xl">hpn blog</span>
                    </div>
                </Link>
                <p className="text-muted-foreground mt-2">Design, build, and ship your blog with ease.</p>
            </div>
            {footerLinksGroups.map(({ title, links }) => (
              <div key={title}>
                <h3 className="font-semibold text-sm mb-4">{title}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
        
        <div className="border-t border-border/50 mt-16 pt-8 flex flex-col-reverse md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
            <p>&copy; {new Date().getFullYear()} hpn blog. All rights reserved.</p>
             <div className="flex space-x-4">
                <Link href="#" className="hover:text-foreground">Terms</Link>
                <Link href="#" className="hover:text-foreground">Privacy</Link>
                <Link href="#" className="hover:text-foreground">Cookies</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
