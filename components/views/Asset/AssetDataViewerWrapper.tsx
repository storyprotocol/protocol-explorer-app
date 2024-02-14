import storyClient from '@/lib/SP';
import React from 'react';
import AssetDataViewerComponent from '@/components/views/Asset/AssetDataViewerComponent';
import { ListIpAssetRequest, ListIpAssetResponse } from '@story-protocol/core-sdk';
import { RESOURCE_TYPE } from '@/lib/server/types';
import { listResource } from '@/lib/server/sdk';

export default async function AssetDataViewerWrapper() {
  const listReq = {
    pagination: {
      limit: 1000,
      offset: 0,
    },
  };

  const assetListRes = await listResource(RESOURCE_TYPE.ASSET, listReq);

  let ipAssets = assetListRes.data;

  if (!ipAssets.length) return <div className="w-full pt-8 text-center text-gray-500">No IPAs found</div>;

  // filter ipAssets to match ipAssetType
  // if (ipAssetType !== undefined) {
  //   ipAssets = ipAssets.filter((ipAsset) => ipAsset.type === ipAssetType);
  //   if (ipAssets.length == 0) return <div className="w-full pt-8 text-center text-gray-500">No IPAs found</div>;
  // }

  return <AssetDataViewerComponent data={ipAssets} />;
}
