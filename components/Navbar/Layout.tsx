'use client';

import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';
import Sidebar2 from './Sidebar2';

const Layout = (props: PropsWithChildren) => {
  return (
    <Sidebar2>
      <div
        className={classNames({
          'w-full': true,
        })}
      >
        {props.children}
      </div>
    </Sidebar2>
  );
};

export default Layout;
