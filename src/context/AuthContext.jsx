import React from 'react';
import { ClerkProvider, SignedIn, SignedOut, useUser } from '@clerk/clerk-react';

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Create a wrapper component to provide user data
const UserProvider = ({ children }) => {
  const { user, isSignedIn } = useUser();
  return children({ user, isSignedIn });
};

export const AuthProvider = ({ children }) => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      {children}
    </ClerkProvider>
  );
};

// Custom hook to use authentication
export const useAuth = () => {
  const { user, isSignedIn } = useUser();
  return { user, isSignedIn };
};

export const RequireAuth = ({ children }) => {
  return (
    <SignedIn>
      {children}
    </SignedIn>
  );
};

export const RequireNoAuth = ({ children }) => {
  return (
    <SignedOut>
      {children}
    </SignedOut>
  );
}; 