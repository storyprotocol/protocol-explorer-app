import storyClient from '@/lib/SP';
import React from 'react';
import { ListLicenseResponse } from '@story-protocol/core-sdk';
import IPOrgLicenseDataViewerComponent from './IPOrgLicenseDataViewerComponent';

export default async function IPOrgLicenseDataViewerWrapper({
  ipOrgId,
  ipAssetId,
  // tableOnly,
  // gridOnly,
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
      if (ipAssetId && !ipOrgId) return <div className="mx-8 mt-4">No licenses found for this IP Asset</div>;
      if (!ipAssetId && ipOrgId) return <div className="mx-8 mt-4">No licenses found for this IP Org</div>;
      if (ipAssetId && ipOrgId) return <div className="mx-8 mt-4">No licenses found</div>;
    }

    return (
      <IPOrgLicenseDataViewerComponent
        data={licensesData}
        tableOnly={true}
        // tableOnly={tableOnly}
        // gridOnly={gridOnly}
        pageSize={pageSize}
      />
    );
  } catch (e) {
    console.log('Error:', e);
    return <div>Something went wrong. Unable to fetch licenses.</div>;
  }
}
