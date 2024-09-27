'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if not authenticated and after the component has mounted
    if (status !== 'loading' && !session) {
      router.push('/signin');
    }
  }, [status, session, router]); // Re-run effect if status or session changes

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // If session doesn't exist but the redirect hasn't happened yet
  if (!session) {
    return <p>Redirecting...</p>;
  }

  return (
    <div>
      <p>Welcome, {session.user?.name}!</p>
      <button onClick={() => {
        signOut();
        router.push('/signin'); // Redirect after signing out
      }}>
        Sign out
      </button>
    </div>
  );
}
