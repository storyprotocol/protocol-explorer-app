'use client';
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { IPAsset } from '@story-protocol/core-sdk';
import React, { useState } from 'react';
import Image from 'next/image';
import { getRoundedTime } from '@/utils';
import { Asset } from '@/lib/server/types';
import { OpenSeaNFT, getOpenSeaNFTMetadata } from '@/lib/opensea/api';

export default async function AssetDisplayComponent({ data }: { data: Asset }) {
  // const [imageUrl, setImageUrl] = useState<string | null>(null);

  const openseaNFTdata: OpenSeaNFT | null = await getOpenSeaNFTMetadata('sepolia', data.tokenContract, data.tokenId);

  return (
    <div className="flex h-52 md:h-72 xl:h-full col-span-12 xl:col-span-6 rounded-xl bg-indigo-100 overflow-hidden justify-center items-center">
      {openseaNFTdata?.image_url ? (
        <Image
          width={700}
          height={600}
          alt={data.metadata.name}
          loading="lazy"
          decoding="async"
          data-nimg="1"
          src={`${openseaNFTdata.image_url}?date=${getRoundedTime(15)}`}
          unoptimized
        />
      ) : (
        <PuzzlePieceIcon className="w-20 h-20 text-indigo-500" />
      )}
    </div>
  );
}
