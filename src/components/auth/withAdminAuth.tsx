
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

        if (error || !session) {
          router.push('/login');
          return;
        }
        
        // In this setup, any authenticated session is considered an admin session.
        // The login page is the gatekeeper.
        setIsAdmin(true);
      }

      checkAdmin();
    }, [router]);

    if (isAdmin === null) {
      // Loading state
      return (
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading...</p>
        </div>
      );
    }
    
    if (isAdmin === false) {
      // This will be briefly visible before redirect
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
