import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import React from 'react';
import Image from 'next/image';
import { getRoundedTime } from '@/utils';
import { Asset } from '@/lib/server/types';
import { NFTMetadata, getNFTByTokenId } from '@/lib/simpleHash';

export default async function AssetDisplayComponent({ data }: { data: Asset }) {
  const nftMetadata: NFTMetadata = await getNFTByTokenId(data.tokenContract, data.tokenId);

  return (
    <div className="flex rounded-xl aspect-square bg-indigo-100 overflow-hidden justify-center items-center">
      {nftMetadata?.image_url ? (
        <Image
          width={600}
          height={600}
          alt={data.metadata.name}
          loading="lazy"
          decoding="async"
          data-nimg="1"
          src={`${nftMetadata.image_url}?date=${getRoundedTime(15)}`}
          unoptimized
        />
      ) : (
        <PuzzlePieceIcon className="w-20 h-20 text-indigo-500" />
      )}
    </div>
  );
}
