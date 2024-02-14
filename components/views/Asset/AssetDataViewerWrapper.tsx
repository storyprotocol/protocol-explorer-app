import React from 'react';
import AssetDataViewerComponent from '@/components/views/Asset/AssetDataViewerComponent';
import { Asset, RESOURCE_TYPE } from '@/lib/server/types';
import { listResource } from '@/lib/server/sdk';
import { Address } from 'viem';

export default async function AssetDataViewerWrapper({ collectionId, ...params }: any) {
  const listReq = {
    pagination: {
      limit: 1000,
      offset: 0,
    },
  };

  const assetListRes = await listResource(RESOURCE_TYPE.ASSET, listReq);

  let ipAssets: Asset[] = assetListRes.data;

  if (!ipAssets.length) {
    return <div className="w-full pt-8 text-center text-gray-500">No IPAs found</div>;
  }

  // filter ipAssets to match ipAssetType
  if (collectionId !== undefined) {
    ipAssets = ipAssets.filter((asset) => asset.tokenContract === collectionId);
    if (ipAssets.length == 0) return <div className="w-full pt-8 text-center text-gray-500">No IPAs found</div>;
  }

  return <AssetDataViewerComponent data={ipAssets} {...params} />;
}
