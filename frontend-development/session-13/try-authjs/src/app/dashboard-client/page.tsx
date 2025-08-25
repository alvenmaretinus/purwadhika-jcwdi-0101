// client side way of handling session

'use client';

import Link from 'next/link';
import ClientSideSignOut from '@/components/ClientSideSignOut';
import { useSession } from 'next-auth/react';

export default function DashboardPage() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      {isLoggedIn && (
        <>
          <p>Session expires at: {session?.expires}</p>
          <pre>
            user info: <br />
            {JSON.stringify(session?.user, null, 2)}
          </pre>
        </>
      )}
      <br />
      {!isLoggedIn ? <Link href="/signin">Sign in</Link> : <ClientSideSignOut />}
    </div>
  );
}
