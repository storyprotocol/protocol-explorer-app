import React from 'react';
import AssetDataViewerComponent from '@/components/views/Asset/AssetDataViewerComponent';
import { Asset, RESOURCE_TYPE } from '@/lib/server/types';
import { listResource } from '@/lib/server/sdk';
import { Address } from 'viem';
import ErrorComponent from '@/components/Error/ErrorComponent';

export const fetchCache = 'force-no-store';

export default async function AssetDataViewerWrapper({ collectionId, ipId, ...params }: any) {
  try {
    const listReq = {
      pagination: {
        limit: 1000,
        offset: 0,
      },
      where: {
        chainId: params.chainId,
        metadataResolverAddress: params.metadataResolverAddress as Address,
        tokenContract: collectionId as Address,
        tokenId: params.tokenId,
      },
    };

    const assetListRes = await listResource(RESOURCE_TYPE.ASSET, listReq);

    let ipAssets: Asset[] = assetListRes.data;

    console.log({ ipAssets });

    if (!ipAssets.length) {
      return <div className="w-full pt-8 text-center text-gray-500">No IPAs found</div>;
    }

    return <AssetDataViewerComponent data={ipAssets} {...params} />;
  } catch (error) {
    return <ErrorComponent />;
  }
}
