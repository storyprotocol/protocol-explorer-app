import React, { Suspense } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { ConnectButton } from '@rainbow-me/rainbowkit';
type Props = {
  /**
   * Allows the parent component to modify the state when the
   * menu button is clicked.
   */
  onMenuButtonClick(): void;
};

const Navbar = (props: Props) => {
  return (
    <>
      <nav
        className={classNames({
          'flex top-0 w-full items-center justify-between md:hidden': true,
          'sticky z-20 px-4 h-[72px] top-0 ': true, //positioning & styling
        })}
      >
        <div></div>
        <div className="flex items-center gap-2 md:gap-4">
          <Suspense fallback={null}>
            {/* <ConnectWalletButton /> */}
            <ConnectButton />
            {/* <ConnectWalletButton /> */}
          </Suspense>
          <button className="w-10 h-10 flex items-center justify-center md:hidden" onClick={props.onMenuButtonClick}>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* <nav className="fixed flex md:hidden top-4 right-4 z-50 transform-gpu">
        <Suspense fallback={null}>
          <ConnectWalletButton />
        </Suspense>
        <button className="md:hidden" onClick={props.onMenuButtonClick}>
          <Bars3Icon className="h-6 w-6" />
        </button>
      </nav> */}
      <div className="absolute hidden md:flex top-8 right-8 z-50 transform-gpu">
        <Suspense fallback={null}>
          <ConnectButton />
        </Suspense>
      </div>
    </>
  );
};

export default Navbar;
