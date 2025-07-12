import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Logo = () => (
    <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="h-8 w-8 text-primary-foreground">
            <path d="M16 31.5C24.5604 31.5 31.5 24.5604 31.5 16C31.5 7.43959 24.5604 0.5 16 0.5C7.43959 0.5 0.5 7.43959 0.5 16C0.5 24.5604 7.43959 31.5 16 31.5Z" stroke="currentColor" strokeMiterlimit="10"/>
            <path d="M16 25C20.9706 25 25 20.9706 25 16C25 11.0294 20.9706 7 16 7C11.0294 7 7 11.0294 7 16C7 20.9706 11.0294 25 16 25Z" stroke="currentColor" strokeMiterlimit="10"/>
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
    <footer className="bg-background text-foreground mt-24">
       <div className="container mx-auto px-4">
        <div className="bg-primary text-primary-foreground rounded-2xl p-12 lg:p-16 text-center">
            <h2 className="text-3xl font-bold mb-2">Let's get started on something great</h2>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-xl mx-auto">Join over 4,000+ startups already growing with us.</p>
            <div className="flex-shrink-0 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground hover:text-primary w-full sm:w-auto">Chat to us</Button>
                <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full sm:w-auto">Get started</Button>
            </div>
        </div>
      </div>
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
            <div className="flex flex-col gap-4">
                <Link href="/">
                    <div className="flex items-center space-x-2">
                         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="h-8 w-8 text-primary">
                            <path d="M16 31.5C24.5604 31.5 31.5 24.5604 31.5 16C31.5 7.43959 24.5604 0.5 16 0.5C7.43959 0.5 0.5 7.43959 0.5 16C0.5 24.5604 7.43959 31.5 16 31.5Z" stroke="currentColor" strokeMiterlimit="10"/>
                            <path d="M16 25C20.9706 25 25 20.9706 25 16C25 11.0294 20.9706 7 16 7C11.0294 7 7 11.0294 7 16C7 20.9706 11.0294 25 16 25Z" stroke="currentColor" strokeMiterlimit="10"/>
                        </svg>
                        <span className="font-bold text-xl">Untitled UI</span>
                    </div>
                </Link>
                <p className="text-muted-foreground">Design, build, and ship your blog with ease.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 w-full lg:w-auto">
                {footerLinksGroups.slice(0, 5).map(({ title, links }) => (
                  <div key={title}>
                    <h3 className="font-semibold text-sm mb-4">{title}</h3>
                    <ul className="space-y-3">
                      {links.slice(0,5).map((link) => (
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
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col-reverse md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
            <p>&copy; {new Date().getFullYear()} Untitled UI. All rights reserved.</p>
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
