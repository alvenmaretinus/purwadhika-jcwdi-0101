import Link from 'next/link';

export default function Menu() {
  return (
    <div>
      <h1 className="text-xl text-red-400">Main Menu</h1>
      <Link href="/" className="block hover:text-blue-400">Homepage</Link>
      <Link href="/dashboard" className="block hover:text-blue-400">Dashboard</Link>
      <Link href="/profile" className="block hover:text-blue-400">Profile</Link>
      <hr />
    </div>
  )
}
