import { ReactNode } from "react";
import Link from 'next/link'

export default function DashboardLayout({ children }: Readonly<{ children: ReactNode}>) {
  return (
    <div>
      <div className="border border-solid border-amber-50">
        <div>dashboard navigation menu...</div>
        <nav>
          <ul>
            <li><Link href="/dashboard">home</Link></li>
            <li><Link href="/dashboard/users">users</Link></li>
            <li><Link href="/dashboard/settings">settings</Link></li>
          </ul>
        </nav>
      </div>
      <div className="py-4 px-6">
        {children}
      </div>
    </div>
  )
}