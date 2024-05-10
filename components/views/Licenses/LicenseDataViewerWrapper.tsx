import React from 'react';
import LicenseDataViewerComponent from './LicenseDataViewerComponent';
import { listResource } from '@/lib/server/sdk';
import { License, RESOURCE_TYPE } from '@/lib/server/types';

export default async function LicenseDataViewerWrapper({ collectionId, ipId, ...params }: any) {
  try {
    const listReq = {
      pagination: {
        limit: 1000,
        offset: 0,
      },
      where: {
        // tokenContract: collectionId as Address,
        licensorIpId: ipId,
      },
    };

    const licenseListRes = await listResource(RESOURCE_TYPE.LICENSE_TOKEN, listReq);
    const licenseData: License[] = licenseListRes.data;

    if (licenseData.length === 0) {
      return <div className="mx-8 mt-4">No licenses found for this IP Asset</div>;
    }

    return <LicenseDataViewerComponent data={licenseData} tableOnly />;
  } catch (e) {
    console.log('Error:', e);
    return <div>Something went wrong. Unable to fetch licenses.</div>;
  }
}
