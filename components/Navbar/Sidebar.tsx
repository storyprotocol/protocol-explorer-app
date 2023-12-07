import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { defaultNavItems, NavItem } from './defaultNavItems';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  DocumentCheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import ClientOnly from '@/utils/ClientOnly';
import { cn } from '@/utils';
import { usePathname } from 'next/navigation';

// add NavItem prop to component prop
type Props = {
  collapsed: boolean;
  navItems?: NavItem[];
  // setCollapsed(collapsed: boolean): void;
  // setShowSidebar(show: boolean): void;
  onHide(): void;
  shown: boolean;
};

interface LogoProps {
  collapsed: boolean;
  className: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ collapsed, className = '', onClick, ...props }) => {
  return (
    <svg
      viewBox="0 0 401 92"
      className={className}
      onClick={onClick}
      {...props}
      fill="currentColor"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="s-parts"
        d="M34.9,92C54,92,69.5,80.5,69.5,61.1C69.5,43,56,30.3,34.9,30.3v13.4c-9.7,0-16.9-4.3-16.9-13.1
		c0-8.8,6.2-14,17.4-14c9.2,0,14.7,3.8,16.1,8.8h17C67.2,11.4,54,0,35,0C14.9,0,0.6,12.6,0.6,31c0,18.4,14.9,29.5,34.3,29.5V47.8
		c10.3,0,17.4,4.6,17.4,13.7c0,9-7.2,14.1-17.3,14.1c-9.1,0-15.4-4-17.3-9.5H0C2.5,80.6,15.8,92,34.9,92z"
      />

      <polygon
        id="t-default"
        className={cn('transition-opacity', collapsed ? 'opacity-0 delay-[150ms]' : 'opacity-100 delay-[0ms]')}
        points="101,90 120.3,90 120.3,19.5 147.9,19.5 147.9,2.1 73.4,2.1 73.4,19.5 101,19.5 	"
      />

      <path
        id="o-parts"
        className={cn('transition-opacity', collapsed ? 'opacity-0 delay-[100ms]' : 'opacity-100 delay-[50ms]')}
        d="M192.9,92v-9c20.3,0,35.5-15.9,35.5-37h9.4c0-25-19.4-46-44.9-46c-27.4,0-45.1,19.1-45.1,46
		C147.8,71,167.4,92,192.9,92z M220.5,46h-8.6c0,11.4-8.4,19.8-19,19.8v8.6c-15.5,0-26.7-12.9-26.7-28.3c0-16.7,10-28,26.7-28
		C208.4,18,220.5,29.9,220.5,46z"
      />
      <path
        id="r-default"
        className={cn('transition-opacity', collapsed ? 'opacity-0 delay-[50ms]' : 'opacity-100 delay-[100ms]')}
        d="M297.8,32.5c0,9-4.9,13.4-14.2,13.4h-17.8V19.6H283C292.3,19.6,297.8,23.5,297.8,32.5z M246.8,90h19.1V63.3
		h17.8c1.1,0,2.1-0.1,3.2-0.1L300.7,90h20.4L304,57.8c8.1-5.6,12.1-14.8,12.1-25.2c0-17-10.4-30.4-33.1-30.4h-36.2V90z"
      />

      <path
        id="y-parts"
        className={cn('transition-opacity', collapsed ? 'opacity-0 delay-[0ms]' : 'opacity-100 delay-[150ms]')}
        d="M354.8,90h18.4V52.9L401,2.2h-21.2l-25,46.9V90z M338.7,40.6h20.7L338.7,2.2h-20.7L338.7,40.6z"
      />
    </svg>
  );
};

const Sidebar = ({ collapsed, navItems = defaultNavItems, shown, onHide }: Props) => {
  const path = usePathname();
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;

  return (
    <div
      className={classNames({
        'bg-sp-purple-veryDark text-gray-500 fixed md:static md:translate-x-0 z-30': true,
        'transition-all duration-300 ease-in-out': true,
        'w-screen md:w-[200px]': !collapsed,
        'w-16': collapsed,
        'translate-x-full md:translate-x-0': !shown,
      })}
    >
      <div
        className={classNames({
          'flex flex-col justify-center h-screen sticky inset-0 w-full': true,
        })}
      >
        <button
          className=" absolute flex md:hidden top-4 right-4 w-10 h-10 items-center justify-center"
          onClick={() => onHide()}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* <button
            className="grid place-content-center hover:bg-gray-200 w-10 h-10 rounded-3xl opacity-100"
            onClick={() => {
              onHide();
            }}
          >
            <XMarkIcon className="w-6 h-6" />
          </button> */}

        {/* logo and collapse button */}
        <div
          className={cn(
            'flex w-full items-center text-white p-2 pt-10 mx-3',
            // collapsed ? 'py-4 justify-center' : 'p-4',
          )}
        >
          {/* {!collapsed && (
            <Link href="/" className="whitespace-nowrap">
              <img className="h-6 w-auto" src="/story_logo.svg" alt="Story Protocol" />
            </Link>
          )} */}
          <Logo
            collapsed={collapsed}
            className="w-28 ml-1 shrink-0"
            onClick={() => {
              onHide();
            }}
          />
        </div>

        {/* <button onClick={() => onHide()}>
          <span
            className={classNames({
              'flex mt-4 items-center text-white text-opacity-50 text-xs hover:bg-sp-purple-dark': true, //colors
              'transition-colors duration-300': true, //animation
              'rounded-md p-2 mx-3 gap-4 ': !collapsed,
              'rounded-3xl justify-center p-2 mx-3 w-10 h-10': collapsed,
              // 'flex gap-2': !collapsed,
            })}
          >
            <Icon className="w-5 h-5" /> <span>{!collapsed && 'Collapse'}</span>
          </span>
        </button> */}

        {/* <nav className="flex-grow border-t border-sp-purple-dark mt-4 border-opacity-50"> */}

        <div className="flex-grow">
          <nav className=" mt-6 ">
            <ul
              className={classNames({
                'flex flex-col gap-2 items-stretch': true,
              })}
            >
              {navItems.map((item, index) => {
                return (
                  <Link key={index} href={item.href}>
                    <li
                      className={classNames({
                        ' flex gap-4': true, //layout
                        'text-white items-center hover:bg-sp-purple-dark': true, //colors
                        'transition-all duration-300': true, //animation
                        'rounded-md p-2 mx-3 ': !collapsed,
                        'rounded-3xl p-2 mx-3 w-10 h-10': collapsed,
                        // 'flex gap-2': !collapsed,
                        'bg-sp-purple-dark':
                          (item.href === '/' && path === '/') || (path.indexOf(item.href) === 0 && item.href !== '/'),
                      })}
                    >
                      {item.icon}
                      <span className={cn('shrink-0 transition-opacity', collapsed ? 'opacity-0' : 'opacity-100')}>
                        {item.label}
                      </span>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </nav>

          <div className="w-full mt-4" onClick={() => onHide()}>
            <span className="flex mx-4 border-t border-white border-opacity-10"></span>
            <div className="flex w-full">
              {/* <button
                className={classNames({
                  'flex w-full mt-4 items-center text-white text-xs hover:bg-sp-purple-dark': true, //colors
                  'transition-colors duration-300': true, //animation
                  'rounded-md p-2 mx-3 gap-2 ': !collapsed,
                  'rounded-3xl justify-center p-2 mx-3 w-10 h-10': collapsed,
                  // 'flex gap-2': !collapsed,
                })}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className={cn('shrink-0 transition-opacity', collapsed ? 'opacity-0' : 'opacity-100')}>
                  Collapse
                </span>
              </button> */}

              <button
                className={cn(
                  'mt-4 w-full flex gap-4',
                  'text-white items-center hover:bg-sp-purple-dark',
                  'transition-all duration-300',
                  collapsed ? 'rounded-3xl p-2 mx-3 !w-10 h-10' : 'rounded-md p-2 mx-3',
                )}
              >
                <Icon className="w-4 h-4 ml-1 shrink-0" />
                <span className={cn('shrink-0 transition-opacity', collapsed ? 'opacity-0' : 'opacity-100')}>
                  Collapse
                </span>
              </button>
            </div>
          </div>
        </div>

        <Link href="/tos.pdf" target="_blank" className="flex flex-row my-auto pb-2">
          <div
            className={classNames({
              'transition-colors duration-300': true, //animation
              'rounded-md p-2 mx-3 gap-4 ': !collapsed,
              'rounded-3xl p-2 mx-3 w-10 h-10': collapsed,
            })}
          >
            <ClientOnly>
              <Link href="/tos.pdf" target="_blank" className="flex gap-2 ">
                {collapsed ? (
                  <DocumentCheckIcon className="w-5 h-5" />
                ) : (
                  <p className="hover:underline whitespace-nowrap">Terms of Service</p>
                )}
              </Link>
            </ClientOnly>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Sidebar;
