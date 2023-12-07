import React from 'react';
import AssetRelationshipTableComponent from './AssetRelationshipTableComponent';
import { ListRelationshipResponse } from '@story-protocol/core-sdk';
import storyClient from '@/lib/SP';

export default async function AssetRelationshipTableWrapper({
  pageSize = 20,
  ipAssetId,
}: {
  pageSize?: number;
  ipOrgId?: string;
  ipAssetId?: string;
}) {
  const { relationships }: ListRelationshipResponse = await storyClient.relationship.list({
    tokenId: ipAssetId as string,
    contract: process.env.IP_ASSET_REGISTRY_CONTRACT as string,
  });

  return (
    <>
      <AssetRelationshipTableComponent data={relationships} pageSize={pageSize} ipAssetId={ipAssetId} />
    </>
  );
}
