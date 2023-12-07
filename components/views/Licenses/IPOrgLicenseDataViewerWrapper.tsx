import storyClient from '@/lib/SP';
import React from 'react';
import IPOrgDataViewerComponent from '@/components/views/IPOrg/IPOrgDataViewerComponent';
import { ListLicenseResponse } from '@story-protocol/core-sdk';

export default async function IPOrgLicenseDataViewerWrapper({
  ipOrgId,
  ipAssetId,
  tableOnly,
  gridOnly,
  pageSize,
}: {
  ipOrgId?: string;
  ipAssetId?: string;
  tableOnly?: boolean;
  gridOnly?: boolean;
  pageSize?: number;
}) {
  try {
    const data: ListLicenseResponse = await storyClient.license.list({ ipOrgId, ipAssetId });
    const licensesData = data?.licenses;

    if (licensesData.length === 0) {
      if (ipAssetId && !ipOrgId) return <div>No licenses found for this IP Asset</div>;
      if (!ipAssetId && ipOrgId) return <div>No licenses found for this IP Org</div>;
      if (ipAssetId && ipOrgId) return <div>No licenses found</div>;
    }

    return (
      <IPOrgDataViewerComponent data={licensesData} tableOnly={tableOnly} gridOnly={gridOnly} pageSize={pageSize} />
    );
  } catch (e) {
    console.log('Error:', e);
    return <div>Something went wrong. Unable to fetch licenses.</div>;
  }
}
