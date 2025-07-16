
'use client';

import type { ComponentType } from 'react';

// This is a mock HOC for the preview. It assumes the user is an admin.
// In a real app, you'd have actual logic here to check for admin roles.
export function withAdminAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithAdminAuth = (props: P) => {
    // Since this is a preview, we'll just render the component directly.
    // In a real app, you would check for authentication and admin status here.
    return <WrappedComponent {...props} />;
  };

  WithAdminAuth.displayName = `WithAdminAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAdminAuth;
}
