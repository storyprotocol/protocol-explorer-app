import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { Asset } from '@/lib/server/types';
import { getRoundedTime } from '@/utils';
import { IoGitBranchOutline, IoGitNetworkOutline } from 'react-icons/io5';
import TooltipWrapper from '../tooltip/tooltip';
import { NFTMetadata, getNFTByTokenId } from '@/lib/simpleHash';

const AssetCard = ({ data }: { data: Asset }) => {
  const [nftMetadata, setNFTMetadata] = useState<NFTMetadata | null>(null);

  console.log({ nftMetadata });
  useEffect(() => {
    const fetchMetadata = async () => {
      const metadata = await getNFTByTokenId(data.nftMetadata.tokenContract, data.nftMetadata.tokenId);
      setNFTMetadata(metadata);
    };

    fetchMetadata();
  }, [data.nftMetadata.tokenContract, data.nftMetadata.tokenId]);

  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-indigo-500 hover:shadow-md">
      <div className="overflow-hidden aspect-square">
        <Link href={`/ipa/${data.id}`} className="hover:cursor-pointer">
          {nftMetadata?.image_url ? (
            <img
              width={'100%'}
              height={'100%'}
              alt={data.nftMetadata.name}
              className="h-full w-full object-cover transition-all hover:scale-125"
              src={`${nftMetadata.image_url}?date=${getRoundedTime(15)}`}
            />
          ) : (
            <div className="flex h-full justify-center items-center bg-gradient-to-br from-indigo-50 to-indigo-200 px-5">
              <PuzzlePieceIcon className="h-10 w-10 text-indigo-500" />
            </div>
          )}
        </Link>
      </div>

      <div className="text-xs p-4">
        <div className="flex flex-col items-start justify-between w-full">
          <div className="flex flex-row text-xs justify-between items-center w-full">
            <h3 className="truncate">{data.nftMetadata.name || 'Untitled'}</h3>

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
          <div className="flex flex-col w-full">
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
