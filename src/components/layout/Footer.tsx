import Link from 'next/link';

const Logo = () => (
    <div className="flex items-center justify-center h-8 w-8 bg-primary rounded-lg text-primary-foreground">
        <span className="font-bold text-lg">S</span>
    </div>
);


const footerLinks = {
  'Explore': ['All Posts', 'About', 'Contact', 'Categories'],
  'Connect': ['Twitter', 'LinkedIn', 'GitHub'],
  'Legal': ['Terms', 'Privacy', 'Cookies'],
};

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <div className="col-span-1 md:col-span-4 lg:col-span-3">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Logo />
                <span className="font-bold text-foreground font-headline text-lg">Sanity & Serenity</span>
              </Link>
              <p className="text-muted-foreground max-w-xs">
                A personal blog about modern web development, design, and everything in between.
              </p>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-semibold text-sm text-foreground mb-4 font-headline">{title}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-base">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
        
        <div className="border-t pt-8 mt-16 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Sanity & Serenity. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
