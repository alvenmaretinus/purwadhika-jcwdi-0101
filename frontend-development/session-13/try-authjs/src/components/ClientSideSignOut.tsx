'use client';

import { signOut } from 'next-auth/react';

export default function ClientSideSignOut() {
  return (
    <button onClick={() => signOut()}>Sign Out</button>
  );
}
