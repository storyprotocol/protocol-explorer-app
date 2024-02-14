import { shortenAddress } from '@/utils';
import classNames from 'classnames';
import React from 'react';

export default function AddressComponent({
  address,
  displayFull = false,
  size = 'md',
}: {
  address: string;
  displayFull?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  return (
    <div className="capitalize flex flex-row items-center gap-2">
      <img
        className={classNames({
          'rounded-full': true,
          'h-4 w-4': size === 'sm',
          'h-6 w-6': size === 'md',
          'h-8 w-8': size === 'lg',
        })}
        src={`https://cdn.stamp.fyi/avatar/eth:${address}?s=300`}
        alt={address}
      />
      <a
        className="inline-flex items-center space-x-2 rounded-lg text-sm min-w-[100px]"
        href={`${process.env.NEXT_PUBLIC_EXTERNAL_CHAIN_EXPLORER_URL}/address/${address}`}
      >
        <span
          className={classNames({
            'font-mono': true,
            'text-xs': size === 'sm',
            'text-sm': size === 'md',
            'text-md': size === 'lg',
          })}
        >
          {displayFull ? address : shortenAddress(address as string, 3)}
        </span>
      </a>
    </div>
  );
}
