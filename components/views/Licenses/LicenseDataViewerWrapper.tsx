import React from 'react';
import { License } from '@story-protocol/core-sdk';
import LicenseDataViewerComponent from './LicenseDataViewerComponent';
import { listResource } from '@/lib/server/sdk';
import { RESOURCE_TYPE } from '@/lib/server/types';

import { Address } from 'viem';

export default async function LicenseDataViewerWrapper({ collectionId, ipId, ...params }: any) {
  try {
    const listReq = {
      pagination: {
        limit: 1000,
        offset: 0,
      },
      where: {
        // tokenContract: collectionId as Address,
        licensorIpdId: ipId,
      },
    };

    const licenseListRes = await listResource(RESOURCE_TYPE.LICENSE, listReq);
    const licenseData: License[] = licenseListRes.data;

    if (licenseData.length === 0) {
      return <div className="mx-8 mt-4">No licenses found for this IP Asset</div>;
    }

    return <LicenseDataViewerComponent data={licenseData} gridOnly={true} />;
  } catch (e) {
    console.log('Error:', e);
    return <div>Something went wrong. Unable to fetch licenses.</div>;
  }
}
