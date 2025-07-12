'use client';

import { withAdminAuth } from '@/components/auth/withAdminAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold font-headline tracking-tighter">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2 text-lg">Welcome, Admin!</p>
      </header>
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is your admin dashboard. From here, you will be able to manage posts, view users, and more.</p>
            <p className="mt-4 text-sm text-muted-foreground">More features coming soon!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withAdminAuth(AdminPage);
