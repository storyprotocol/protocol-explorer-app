import { Fragment, Suspense, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { defaultNavItems } from './defaultNavItems';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';
import Link from 'next/link';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaGithub, FaDiscord } from 'react-icons/fa';

const teams = [
  // { id: 1, name: 'Telegram', href: '', icons: FaTelegram },
  { id: 2, name: 'Twitter (X)', href: 'https://twitter.com/storyProtocol/', icons: FaSquareXTwitter },
  { id: 3, name: 'Github', href: 'https://github.com/storyprotocol', icons: FaGithub },
  { id: 4, name: 'Discord', href: 'https://discord.gg/storyprotocol', icons: FaDiscord },
];

interface LogoProps {
  className: string;
}

const Logo: React.FC<LogoProps> = ({ className = '', ...props }) => {
  return (
    <svg
      viewBox="0 0 401 92"
      className={className}
      {...props}
      fill="white"
      stroke="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="s-parts"
        d="M34.9,92C54,92,69.5,80.5,69.5,61.1C69.5,43,56,30.3,34.9,30.3v13.4c-9.7,0-16.9-4.3-16.9-13.1
		c0-8.8,6.2-14,17.4-14c9.2,0,14.7,3.8,16.1,8.8h17C67.2,11.4,54,0,35,0C14.9,0,0.6,12.6,0.6,31c0,18.4,14.9,29.5,34.3,29.5V47.8
		c10.3,0,17.4,4.6,17.4,13.7c0,9-7.2,14.1-17.3,14.1c-9.1,0-15.4-4-17.3-9.5H0C2.5,80.6,15.8,92,34.9,92z"
      />

      <polygon id="t-default" points="101,90 120.3,90 120.3,19.5 147.9,19.5 147.9,2.1 73.4,2.1 73.4,19.5 101,19.5 	" />

      <path
        id="o-parts"
        d="M192.9,92v-9c20.3,0,35.5-15.9,35.5-37h9.4c0-25-19.4-46-44.9-46c-27.4,0-45.1,19.1-45.1,46
		C147.8,71,167.4,92,192.9,92z M220.5,46h-8.6c0,11.4-8.4,19.8-19,19.8v8.6c-15.5,0-26.7-12.9-26.7-28.3c0-16.7,10-28,26.7-28
		C208.4,18,220.5,29.9,220.5,46z"
      />
      <path
        id="r-default"
        d="M297.8,32.5c0,9-4.9,13.4-14.2,13.4h-17.8V19.6H283C292.3,19.6,297.8,23.5,297.8,32.5z M246.8,90h19.1V63.3
		h17.8c1.1,0,2.1-0.1,3.2-0.1L300.7,90h20.4L304,57.8c8.1-5.6,12.1-14.8,12.1-25.2c0-17-10.4-30.4-33.1-30.4h-36.2V90z"
      />

      <path
        id="y-parts"
        d="M354.8,90h18.4V52.9L401,2.2h-21.2l-25,46.9V90z M338.7,40.6h20.7L338.7,2.2h-20.7L338.7,40.6z"
      />
    </svg>
  );
};

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const path = usePathname();
  return (
    <>
      <div className="bg-gray-100">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-2 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                    <Link href={'/'} className="flex h-16 shrink-0 items-center">
                      <Logo className="w-28 ml-1 shrink-0" />
                    </Link>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {defaultNavItems.map((item) => (
                              <li key={item.label}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    (item.href === '/' && path === '/') ||
                                      (path.indexOf(item.href) === 0 && item.href !== '/')
                                      ? 'bg-sp-purple text-white fill-white'
                                      : 'text-gray-400 hover:text-white hover:fill-white hover:bg-sp-purple-dark',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all duration-300',
                                  )}
                                >
                                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                  {item.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">Socials</div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                  )}
                                >
                                  <team.icons className="h-6 w-6 shrink-0" aria-hidden="true" />
                                  {/* <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                    {team.initial}
                                  </span> */}
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        {/* <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                          >
                            <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            Settings
                          </a>
                        </li> */}
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-2 overflow-y-auto bg-sp-purple-veryDark px-6 pb-4">
            <Link href={'/'} className="flex h-16 shrink-0 items-center">
              <Logo className="w-28 ml-1 shrink-0" />
            </Link>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {defaultNavItems.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className={classNames(
                            (item.href === '/' && path === '/') || (path.indexOf(item.href) === 0 && item.href !== '/')
                              ? 'bg-sp-purple text-white'
                              : 'text-gray-400 hover:text-white hover:bg-sp-purple-dark',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all duration-300',
                          )}
                        >
                          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">Socials</div>
                  <ul role="list" className="flex flex-row -mx-2 mt-2">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            'text-gray-400 hover:text-white hover:bg-sp-purple-dark',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                          )}
                        >
                          {/* <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            {team.initial}
                          </span> */}
                          <team.icons className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {/* <span className="truncate">{team.name}</span> */}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                {/* <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    Settings
                  </a>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-60">
          <div className="lg:pr-64 fixed top-0 z-40 flex h-16 shrink-0 items-center gap-x-3 bg-transparent px-2 sm:gap-x-3 sm:px-6 w-full">
            <button
              type="button"
              className="p-1 -m-1 text-gray-700 lg:hidden bg-white h-10 rounded-md px-2 shadow-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            {/* <div className="h-6 w-px bg-transparent lg:hidden" aria-hidden="true" /> */}

            <div className="flex flex-1 gap-x-2 self-stretch lg:gap-x-6">
              <SearchBar />

              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* Separator */}
                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                {/* Profile dropdown */}
                <Suspense fallback={null}>
                  <ConnectButton
                    accountStatus={{
                      smallScreen: 'avatar',
                    }}
                  />
                </Suspense>
              </div>
            </div>
          </div>

          <main className="">{children}</main>
        </div>
      </div>
    </>
  );
}
