import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Logo = () => (
    <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-primary-foreground">
            <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7C7 4.23858 9.23858 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-bold text-xl text-primary-foreground">Untitled UI</span>
    </div>
);


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
        title: 'Use cases',
        links: ['Startups', 'Enterprise', 'Government', 'SaaS centre', 'Marketplaces', 'Ecommerce'],
    },
    {
        title: 'Social',
        links: ['Twitter', 'LinkedIn', 'Facebook', 'GitHub', 'AngelList', 'Dribbble'],
    },
    {
        title: 'Legal',
        links: ['Terms', 'Privacy', 'Cookies', 'Licenses', 'Settings', 'Contact'],
    },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-sm">
              <h2 className="text-3xl font-bold mb-4">Let's get started on something great</h2>
              <p className="text-lg text-primary-foreground/70 mb-8">Join over 4,000+ startups already growing with us.</p>
               <div className="flex-shrink-0 flex items-center gap-3">
                <Button variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground hover:text-primary">Chat to us</Button>
                <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">Get started</Button>
            </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 w-full lg:w-auto">
                {footerLinksGroups.map(({ title, links }) => (
                  <div key={title}>
                    <h3 className="font-semibold text-sm text-primary-foreground/70 mb-4 uppercase tracking-wider">{title}</h3>
                    <ul className="space-y-3">
                      {links.map((link) => (
                        <li key={link}>
                          <Link href="#" className="text-primary-foreground hover:text-primary-foreground/80 transition-colors">
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/70 gap-4">
            <Link href="/"><Logo /></Link>
            <p>&copy; {new Date().getFullYear()} Untitled UI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}