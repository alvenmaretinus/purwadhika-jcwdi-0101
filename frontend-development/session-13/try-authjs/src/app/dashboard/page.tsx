// server side way of handling session

import Link from 'next/link';
import ServerSideSignOut from '@/components/ServerSideSignOut';
import { auth } from '@/auth';

export default async function DashboardPage() {
  const session = await auth();
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
      {!isLoggedIn ? <Link href="/signin">Sign in</Link> : <ServerSideSignOut />}
    </div>
  );
}
