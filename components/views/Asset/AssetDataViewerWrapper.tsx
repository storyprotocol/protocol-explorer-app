import storyClient from '@/lib/SP';
import React from 'react';
import AssetDataViewerComponent from '@/components/views/Asset/AssetDataViewerComponent';
import { ListIpAssetRequest, ListIpAssetResponse } from '@story-protocol/core-sdk';

type AssetDataViewerWrapperProps = {
  ipAssetType?: number;
  ipOrgId?: string;
};

export default async function AssetDataViewerWrapper({ ipOrgId }: AssetDataViewerWrapperProps) {
  const listReq: ListIpAssetRequest = {
    ipOrgId,
    options: {
      pagination: {
        limit: 1000,
        offset: 0,
      },
    },
  };
  const listRes: ListIpAssetResponse = await storyClient.ipAsset.list(listReq);
  let ipAssets = listRes.ipAssets;

  if (!ipAssets.length) return <div className="w-full pt-8 text-center text-gray-500">No IPAs found</div>;

  // filter ipAssets to match ipAssetType
  // if (ipAssetType !== undefined) {
  //   ipAssets = ipAssets.filter((ipAsset) => ipAsset.type === ipAssetType);
  //   if (ipAssets.length == 0) return <div className="w-full pt-8 text-center text-gray-500">No IPAs found</div>;
  // }

  return <AssetDataViewerComponent data={ipAssets} />;
}
