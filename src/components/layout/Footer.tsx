import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Logo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-foreground">
    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 7L12 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 22V12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 7L12 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 4.5L7 9.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


const footerLinks = {
  Product: ['Overview', 'Features', 'Solutions', 'Tutorials', 'Pricing', 'Releases'],
  Company: ['About us', 'Careers', 'Press', 'News', 'Media kit', 'Contact'],
  Resources: ['Blog', 'Newsletter', 'Events', 'Help centre', 'Tutorials', 'Support'],
  'Use cases': ['Startups', 'Enterprise', 'Government', 'SaaS centre', 'Marketplaces', 'Ecommerce'],
  Social: ['Twitter', 'LinkedIn', 'Facebook', 'GitHub', 'AngelList', 'Dribbble'],
  Legal: ['Terms', 'Privacy', 'Cookies', 'Licenses', 'Settings', 'Contact'],
};

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gray-900 text-primary-foreground rounded-2xl p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Let's get started on something great</h2>
            <p className="mt-2 text-muted-foreground">Join over 4,000+ startups already growing with Untitled.</p>
            <div className="mt-8 flex justify-center gap-4">
                <Button variant="outline" className="bg-gray-900 border-gray-700 hover:bg-gray-800">Chat to us</Button>
                <Button variant="secondary" className="bg-white text-gray-900 hover:bg-gray-200">Get started</Button>
            </div>
        </div>

        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
            <div className="col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center space-x-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                  <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M2 7L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12 22V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M22 7L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M17 4.5L7 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className="font-bold text-foreground">Untitled UI</span>
              </Link>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-semibold text-sm text-muted-foreground mb-4">{title}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-foreground font-semibold hover:text-primary transition-colors text-base">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Untitled UI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
