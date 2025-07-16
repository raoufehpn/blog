import Link from 'next/link';

const footerLinksGroups = [
    {
        title: 'Social',
        links: [
            { name: 'X', href: 'https://x.com/GhoutThe1731?t=BS7axAQye6gCCugDZHsPtA&s=09' },
            { name: 'LinkedIn', href: 'https://www.linkedin.com/in/raoufe-abde-b9b81636a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
            { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61577265774600' },
        ],
    },
    {
        title: 'Navigate',
        links: [
            { name: 'All Posts', href: '/posts' },
            { name: 'About', href: '/about' },
            { name: 'Contact', href: '/contact' },
        ],
    },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-3 mb-8 md:mb-0">
                <Link href="/">
                    <div className="flex items-center space-x-2">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
                        <span className="font-bold text-xl">Sanity & Serenity Blog</span>
                    </div>
                </Link>
                <p className="text-muted-foreground mt-4 max-w-sm">A blog about travel, food, and finding balance in a busy world. Discover new recipes, travel guides, and tips for a more mindful life.</p>
            </div>
            {footerLinksGroups.map(({ title, links }) => (
              <div key={title}>
                <h3 className="font-semibold text-sm mb-4">{title}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
        
        <div className="border-t mt-16 pt-8 flex flex-col-reverse md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
            <p>&copy; {new Date().getFullYear()} Sanity & Serenity Blog. All rights reserved.</p>
             <div className="flex space-x-4">
                <Link href="/posts" className="hover:text-foreground">All Posts</Link>
                <Link href="/about" className="hover:text-foreground">About</Link>
                <Link href="/contact" className="hover:text-foreground">Contact</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
