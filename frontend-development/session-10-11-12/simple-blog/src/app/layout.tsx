import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get('user-token')?.value ?? '';

  const userNavigation = [
    ...(userToken
      ? [
          { name: 'New article', href: '/admin/new-article' },
          {
            name: 'Sign out',
            href: '/api/logout',
          },
        ]
      : [{ name: 'Sign up', href: '/register' }, { name: 'Sign in', href: '/login' }]),
  ];

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased !bg-[#111828]`}>
        <Disclosure as="header" className="relative bg-gray-800">
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-white/10 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <Link href="/" className="relative z-10 flex px-2 lg:px-0">
                <div className="flex shrink-0 items-center">
                  <Image
                    src="/blog.png"
                    width={60}
                    height={60}
                    alt="Blog Logo"
                    className="h-[60px] w-auto"
                  />
                </div>
              </Link>
              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-gray-300 focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                </DisclosureButton>
              </div>
              <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-4 shrink-0">
                  <MenuButton className="relative flex rounded-full focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <Image
                      src="/profile.jpg"
                      width={500}
                      height={500}
                      alt="Picture of logged in user"
                      className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                    />
                  </MenuButton>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name} as="div">
                        <a
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer hover:bg-gray-100 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel as="nav" aria-label="Global" className="lg:hidden">
            <div className="pt-4 pb-3">
              <div className="flex items-center px-4">
                <div className="shrink-0">
                  <Image
                    src="/profile.jpg"
                    width={500}
                    height={500}
                    alt="Picture of logged in user"
                    className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{user.name}</div>
                  <div className="text-sm font-medium text-gray-400">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 py-10">{children}</div>
      </body>
    </html>
  );
}
