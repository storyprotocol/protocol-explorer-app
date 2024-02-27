'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { License } from '@/lib/server/types';
import { getRoundedTime } from '@/utils';
import { Address } from 'viem';
import { NFTMetadata, getNFTByTokenId } from '@/lib/simpleHash';

const LicenseCard = ({ data }: { data: License }) => {
  const [nftMetadata, setNFTMetadata] = useState<NFTMetadata | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      const metadata = await getNFTByTokenId(process.env.NEXT_PUBLIC_LICENSE_REGISTRY_CONTRACT as Address, data.id);
      setNFTMetadata(metadata);
    };

    fetchMetadata();
  }, []);

  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-indigo-500 hover:shadow-md">
      <span data-state="closed">
        <div className="overflow-hidden aspect-square relative">
          <div className="absolute top-2 left-2 text-xs text-white rounded-lg py-1 px-2 bg-black/20">
            x{data.amount}
          </div>
          <Link
            href={`https://testnets.opensea.io/assets/sepolia/${process.env.NEXT_PUBLIC_LICENSE_REGISTRY_CONTRACT}/${data.id}`}
            target="_blank"
            className="hover:cursor-pointer"
          >
            {nftMetadata?.image_url ? (
              <img
                width={400}
                height={400}
                alt={data.id}
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
      </span>
      <div className="text-xs p-4">
        <div className="flex flex-col items-start justify-between">
          <div className="w-full flex flex-col">
            <div className="flex flex-row gap-1 items-center justify-between">
              <h3 className="font-medium truncate">#{data.id}</h3>
              <span className="px-1.5 py-1 text-xs font-sans rounded-xl bg-indigo-500 text-white">
                Policy {data.policyId}
              </span>
            </div>
          </div>
          <div className="w-full flex flex-row justify-between">
            {/* <p className="text-xs font-mono text-muted-foreground">
              <AddressComponent address={data.licensorIpId} size="sm" />
            </p> */}
            {/* <p className="font-mono text-xs truncate">{data.licensorIpId}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicenseCard;
