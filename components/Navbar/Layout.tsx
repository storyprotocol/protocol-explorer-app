'use client';

import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';
import Sidebar from './Sidebar';

const Layout = (props: PropsWithChildren) => {
  return (
    <Sidebar>
      <div
        className={classNames({
          'w-full': true,
        })}
      >
        {props.children}
      </div>
    </Sidebar>
  );
};

export default Layout;
