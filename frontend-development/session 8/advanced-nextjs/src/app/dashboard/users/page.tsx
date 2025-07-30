import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Users List',
}

async function getData() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users`);
  const data = await response.json();
  return data;
}

export default async function DashboardUsersPage() {
  const data = await getData();

  return (
    <div>
      <h1>Dashboard users list page</h1>
      {data.map((user: Record<string, string>) => (
        <Link key={user.id} href={`/dashboard/users/${user.id}`} className="border border-solid border-white p-4 rounded-2xl mb-4 block">
          <div>id: {user.id}</div>
          <div>name: {user.name}</div>
          <div>username: {user.username}</div>
          <div>email: {user.email}</div>
        </Link>
      ))}
    </div>
  );
}
