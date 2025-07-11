import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <AlertTriangle className="w-16 h-16 text-primary mb-4" />
        <h1 className="text-6xl font-extrabold font-headline tracking-tighter text-primary">404</h1>
        <h2 className="text-3xl font-bold font-headline mt-2 mb-4">Page Not Found</h2>
        <p className="max-w-md text-muted-foreground mb-8">
            Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Button asChild>
            <Link href="/">Return to Homepage</Link>
        </Button>
    </div>
  );
}
