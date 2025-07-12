'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import type { ComponentType } from 'react';

export function withAdminAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithAdminAuth = (props: P) => {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
      async function checkAdmin() {
        const { data: { session }, error } = await supabase.auth.getSession();
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@example.com";

        if (error || !session || session.user.email !== adminEmail) {
          router.push('/admin/login');
          setIsAdmin(false);
          return;
        }
        
        setIsAdmin(true);
      }

      checkAdmin();
    }, [router]);

    if (isAdmin === null) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading...</p>
        </div>
      );
    }
    
    if (isAdmin === false) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <p>Redirecting...</p>
        </div>
      )
    }

    return <WrappedComponent {...props} />;
  };

  WithAdminAuth.displayName = `WithAdminAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAdminAuth;
}
