import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { Asset } from '@/lib/server/types';
import { OpenSeaNFT, getOpenSeaNFTMetadata } from '@/lib/opensea/api';
import { getRoundedTime } from '@/utils';
import { IoGitBranchOutline, IoGitNetworkOutline } from 'react-icons/io5';
import TooltipWrapper from '../tooltip/tooltip';

const AssetCard = ({ data }: { data: Asset }) => {
  const [openseaNFTdata, setOpenseaNFTdata] = useState<OpenSeaNFT | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      const metadata = await getOpenSeaNFTMetadata('sepolia', data.tokenContract, data.tokenId);
      setOpenseaNFTdata(metadata);
    };

    fetchMetadata();

    return () => {};
  }, [data.tokenContract, data.tokenId]);

  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-indigo-500 hover:shadow-md">
      <span data-state="closed">
        <div className="overflow-hidden aspect-square">
          <Link href={`/ipa/${data.id}`} className="hover:cursor-pointer">
            {openseaNFTdata?.image_url ? (
              <img
                width={400}
                height={400}
                alt={data.metadata.name}
                className="h-full w-full object-cover transition-all hover:scale-125"
                src={`${openseaNFTdata.image_url}?date=${getRoundedTime(15)}`}
              />
            ) : (
              <div className="flex h-full justify-center items-center bg-gradient-to-br from-indigo-50 to-indigo-200 px-5">
                <PuzzlePieceIcon className="h-10 w-10 text-indigo-500" />
              </div>
            )}
          </Link>
        </div>
      </span>
      <div className="text-xs p-4">
        <div className="flex flex-col items-start justify-between">
          <div className="w-full flex flex-col gap-1">
            <div className="flex flex-row text-xs justify-between items-center">
              <div className="flex flex-row gap-1 items-center">
                {/* {data.parentIpIds?.length === 0 && (
                  <span className="px-1.5 text-xs font-sans rounded-xl bg-indigo-400 text-white">Root</span>
                )} */}
                <h3 className="truncate">{data.metadata.name || 'Untitled'}</h3>
              </div>
              <div className="flex flex-row gap-1 font-mono">
                {data.parentIpIds && data.parentIpIds?.length > 0 ? (
                  <TooltipWrapper content={<p>{data.parentIpIds?.length} Parent IPs</p>}>
                    <div className="flex flex-row items-center">
                      <IoGitNetworkOutline className="h-3 w-3" />
                      {data.parentIpIds?.length}
                    </div>
                  </TooltipWrapper>
                ) : data.parentIpIds ? (
                  <span className="px-1.5 text-xs font-sans rounded-xl bg-indigo-500 text-white">Root</span>
                ) : (
                  ''
                )}

                {data.childIpIds && (
                  <TooltipWrapper content={<p>{data.childIpIds?.length} Child IPs</p>}>
                    <div className="flex flex-row items-center">
                      <IoGitBranchOutline className="h-3 w-3" />
                      {data.childIpIds?.length}
                    </div>
                  </TooltipWrapper>
                )}
              </div>
            </div>
            <TooltipWrapper content={data.id}>
              <p className="text-xs text-left font-mono truncate text-indigo-400">{data.id}</p>
            </TooltipWrapper>
          </div>
          {/* <div className="w-full flex flex-row justify-between">
            <p className="text-xs font-mono text-muted-foreground">
              <AddressComponent address={data.tokenContract} size="sm" />
            </p>
            <p className="font-mono text-xs">{data.tokenId}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
