'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function SignInPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Handle redirection if the user is already signed in
  useEffect(() => {
    if (session) {
      router.push('/'); // Redirect to home page if the user is signed in
    }
  }, [session, router]);

  // Show loading while session is being checked
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Sign in to Your Account</h1>
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}  // Redirect to home after sign-in
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
