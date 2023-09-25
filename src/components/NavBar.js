'use client';

import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/images/Logo.png';

const navigation = [
  { name: 'Featured', href: '/', current: true },
  { name: 'Overlays', href: '/overlays/', current: false },
  { name: 'Emotes', href: '/work-in-progress', current: false },
  { name: 'Alerts', href: '/work-in-progress', current: false },
  { name: 'Pets', href: '/work-in-progress', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
  const { data: session } = useSession();
  return (
    <Disclosure
      as="nav"
      className="fixed top-0 left-0 z-10 w-full bg-hard-blue dark:bg-hard-blue print:hidden"
    >
      {({ open }) => (
        // CHANGE LATER '<>' TO  <div>
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-14 items-center justify-between">
              {/* Mobile menu button*/}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-800 text-gray-900 hover:text-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                {/* Main logo on left side */}
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <Image
                      width={40}
                      height={40}
                      className="block h-8 w-auto"
                      src={Logo}
                      alt="Logo"
                    />
                  </Link>
                </div>

                {/* Desktop Navigation bar */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-3">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        // CHANGE LATER
                        className={classNames(
                          item.current
                            ? 'bg-gray-600 text-gray-50'
                            : 'text-gray-900 transition duration-[50ms] ease-out hover:bg-gray-100 hover:text-gray-900',
                          'rounded-md px-3 py-2 text-sm md:text-base font-medium active:bg-gray-200'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Notification Bell */}
                {/* <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}
                {/* Profile dropdown */}
                {session ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex items-center font-semibold text-gray-800">
                        <span className="sr-only">Open user menu</span>
                        {session.user.email}
                        {/* <Image
                        width={40}
                        height={40}
                        className="h-8 w-8 rounded-full"
                        src={mainLogo}
                        alt="Logo"
                      /> */}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-[50ms]"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-[50ms]"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute -right-4 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/my-account"
                              className={classNames(
                                active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                'block px-4 py-2 text-sm text-gray-700 dark:text-gray-100'
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/work-in-progress"
                              className={classNames(
                                active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                'block px-4 py-2 text-sm text-gray-700 dark:text-gray-100'
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {/* <button onClick={() => signOutDialog()} className="flex rounded-2xl text-gray-800 text-lg font-bold">Sign Out</button> */}
                          {({ active }) => (
                            <Link
                              href="/api/auth/signout"
                              className={classNames(
                                active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                'block px-4 py-2 text-sm text-gray-700 dark:text-gray-100'
                              )}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <button
                    onClick={() => signIn()}
                    className="text-gray-900 transition duration-[50ms] ease-out hover:bg-gray-100 hover:text-gray-900 rounded-md md:text-base font-semibold px-3 py-2"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-gray-50'
                      : 'text-gray-800 hover:bg-gray-50',
                    'block rounded-md px-3 py-2 text-sm font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
