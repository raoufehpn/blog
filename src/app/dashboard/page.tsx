
'use client';

import { withAuth } from '@/components/auth/withAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tighter">User Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-lg">Welcome back!</p>
      </header>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>This is your personal dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          {user ? (
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(DashboardPage);
