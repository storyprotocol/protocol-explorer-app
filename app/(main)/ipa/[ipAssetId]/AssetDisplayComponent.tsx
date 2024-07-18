import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { getRoundedTime } from '@/utils';
import { Asset } from '@/lib/server/types';
import { NFTMetadata, getNFTByTokenId } from '@/lib/simpleHash';
import Link from 'next/link';

function LinkToRootIp({ rootIpId }: { rootIpId: string }) {
  return (
    <Link
      href={`/ipa/${rootIpId}`}
      className="absolute bottom-4 left-4 px-3 py-3 rounded-xl max-w-full bg-indigo-900/50 text-white hover:bg-indigo-900/80 cursor-pointer"
    >
      <div className="font-medium text-sm">Navigate to Root IPA</div>
      <div className="text-xs">{rootIpId}</div>
    </Link>
  );
}
export default async function AssetDisplayComponent({ data }: { data: Asset }) {
  const nftMetadata: NFTMetadata = await getNFTByTokenId(data.nftMetadata.tokenContract, data.nftMetadata.tokenId);

  const rootIpId = data?.rootIps && data?.rootIps?.length > 0 ? data.rootIps[0].id : null;

  return (
    <div className="relative transition-all flex rounded-xl aspect-square bg-indigo-100 overflow-hidden justify-center items-center">
      {rootIpId && <LinkToRootIp rootIpId={rootIpId} />}
      {nftMetadata?.image_url ? (
        <img
          width={'100%'}
          height={'100%'}
          alt={data.nftMetadata.name}
          loading="lazy"
          decoding="async"
          data-nimg="1"
          src={`${nftMetadata.image_url}?date=${getRoundedTime(15)}`}
        />
      ) : (
        <PuzzlePieceIcon className="w-20 h-20 text-indigo-500" />
      )}
    </div>
  );
}
