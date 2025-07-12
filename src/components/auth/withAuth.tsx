
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import type { ComponentType } from 'react';
import type { Session } from '@supabase/supabase-js';

export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithAuth = (props: P) => {
    const router = useRouter();
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function checkSession() {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push('/login');
          return;
        }
        setSession(session);
        setLoading(false);
      }

      checkSession();
    }, [router]);

    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading...</p>
        </div>
      );
    }

    if (!session) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuth;
}
