import { calculateTotalDisputes, shortenAddress } from '@/utils';
import React, { useEffect, useState } from 'react';
import { Address } from 'viem';
import Link from 'next/link';
import { Collection } from '@/lib/server/types';
import { IoGitBranchOutline } from 'react-icons/io5';
import TooltipWrapper from '../tooltip/tooltip';

import { ExclamationTriangleIcon, NewspaperIcon } from '@heroicons/react/24/outline';
import { getCollectionByAddress } from '@/lib/simpleHash';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const CollectionCard = ({ data }: { data: Collection }) => {
  const [collectionMetadata, setColletionMetadata] = useState<any>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      const metadata = await getCollectionByAddress(data.id as Address);
      setColletionMetadata(metadata);
    };

    fetchMetadata();
  }, []);

  console.log({ data });

  const disputeCount = calculateTotalDisputes(data);

  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-indigo-500 hover:shadow-md">
      <div className="overflow-hidden aspect-square">
        <Link href={`/collections/${data.id}`} className="hover:cursor-pointer">
          {collectionMetadata?.image_url ? (
            <img
              width={'100%'}
              height={'100%'}
              alt={data.id}
              loading="lazy"
              decoding="async"
              data-nimg="1"
              className="h-full w-full object-cover transition-all hover:scale-125"
              src={collectionMetadata?.image_url}
            />
          ) : (
            <div className="flex h-full justify-center items-center bg-gradient-to-br from-indigo-50 to-indigo-200 text-indigo-500 px-5 group">
              <h1 className="text-2xl text-center font-semibold inline-flex truncate  group-hover:max-w-none group-hover:whitespace-normal group-hover:overflow-visible">
                {shortenAddress(data.id)}
              </h1>
            </div>
          )}
        </Link>
      </div>

      <div className="text-xs p-4">
        <div className="flex flex-col items-start justify-between">
          <div className="flex flex-col w-full">
            <TooltipWrapper content={data.id}>
              <p className="text-xs text-left font-mono truncate text-indigo-400">{data.id}</p>
            </TooltipWrapper>
            <div className="flex flex-row text-xs justify-between items-center"></div>
          </div>
          <div className="flex flex-row gap-3 justify-between font-mono text-xs">
            <TooltipWrapper content={<p>{data.assetCount} Registered Assets</p>}>
              <div className="flex flex-row items-center">
                <IoGitBranchOutline className="h-3 w-3" />
                {data.assetCount}
              </div>
            </TooltipWrapper>
            <TooltipWrapper content={<p>{data.licensesCount} Licenses</p>}>
              <div className="flex flex-row items-center">
                <NewspaperIcon className="h-3 w-3" />
                {data.licensesCount}
              </div>
            </TooltipWrapper>
            <TooltipWrapper content={<p>{disputeCount} Disputes</p>}>
              <div className="flex flex-row items-center">
                <ExclamationTriangleIcon className="h-3 w-3" />
                {disputeCount}
              </div>
            </TooltipWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
