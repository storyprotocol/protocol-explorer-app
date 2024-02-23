import { Asset } from '@/lib/server/types';
import React from 'react';
import TooltipWrapper from '../tooltip/tooltip';
import classNames from 'classnames';
import { shortenAddress } from '@/utils';
import Link from 'next/link';
import AddressComponent from './AddressComponent';

export default function AddressStack({ data }: { data: Asset[] }) {
  const [expand, setExpand] = React.useState(false);

  if (expand) {
    return (
      <>
        <div className="flex flex-col gap-0 items-start">
          {data.map((asset, index) => (
            <Link href={`/ipa/${asset.id}`} key={index} className="font-mono text-indigo-400 hover:text-indigo-500">
              <AddressComponent address={asset.id} />
            </Link>
          ))}
        </div>
        <div className="underline text-xs cursor-pointer" onClick={() => setExpand(false)}>
          Collapse
        </div>
      </>
    );
  }
  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="isolate flex -space-x-3 overflow-hidden">
        {data.slice(0, 3).map((asset, index) => (
          <TooltipWrapper content={asset.id} key={index}>
            <img
              className={classNames(
                'relative inline-block h-6 w-6 rounded-full ring-2 ring-white',
                `z-${(data.length - index) * 10}`,
              )}
              src={`https://cdn.stamp.fyi/avatar/eth:${asset.id}?s=300`}
              alt={asset.id}
            />
          </TooltipWrapper>
        ))}
      </div>
      <TooltipWrapper content={'abc'}>
        <Link href={`/ipa/${data[0].id}`} className="font-mono text-indigo-400 hover:text-indigo-500">
          {shortenAddress(data[0].id)}
        </Link>
      </TooltipWrapper>
      {data.length - 1 > 0 && (
        <div className="text-xs">
          and {data.length - 1} more{' '}
          <span
            className="underline cursor-pointer"
            onClick={() => {
              setExpand(true);
            }}
          >
            ({data.length} Total)
          </span>
        </div>
      )}
    </div>
  );
}
