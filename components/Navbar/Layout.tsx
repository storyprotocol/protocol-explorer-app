'use client';

import classNames from 'classnames';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Navbar/Sidebar';
import { usePathname } from 'next/navigation';

const Layout = (props: PropsWithChildren) => {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const path = usePathname();

  useEffect(() => {
    const windowWidth = window.innerWidth;

    if (windowWidth < 768) {
      setShowSidebar(false);
      setSidebarCollapsed(false);
    }
  }, [path, collapsed]);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth < 768) {
        setShowSidebar(false);
        setSidebarCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={classNames({
        'grid bg-zinc-100 min-h-screen': true,
        'grid-cols-sidebar': !collapsed,
        'grid-cols-sidebar-collapsed': collapsed,
        'transition-[grid-template-columns] duration-300 ease-in-out': true,
      })}
    >
      <Sidebar
        collapsed={collapsed}
        onHide={() => {
          if (window.innerWidth < 768) {
            setShowSidebar(false);
          } else {
            setSidebarCollapsed((prev) => !prev);
          }
        }}
        shown={showSidebar}
      />
      <div className="overflow-scroll col-span-full md:col-span-1 md:col-start-2">
        <Navbar
          onMenuButtonClick={() => {
            setShowSidebar(true);
            setSidebarCollapsed(false);
          }}
        />
        <div
          className={classNames({
            'w-full': true,
          })}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
