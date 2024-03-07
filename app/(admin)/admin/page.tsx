'use client';
import React from 'react';
import CardContainer from '@/components/cards/CardContainer';
import { listResource } from '@/lib/server/sdk';
import { RESOURCE_TYPE } from '@/lib/server/types';
import { useQuery } from '@tanstack/react-query';
import EChartBarByActionType from '@/components/charts/ECharts/transactions/TxnByActionType';
import EChartLineTotalTxn from '@/components/charts/ECharts/transactions/TxnLineTotal';
import EChartLineTxnByDay from '@/components/charts/ECharts/transactions/TxnLineByDay';
import EChartTop10IpIdsPie from '@/components/charts/ECharts/transactions/TxnPieChartByTopIpId';
import LicensesByPolicyId from '@/components/charts/ECharts/licenses/LicensesByPolicyId';

export default function Admin() {
  const txnReqOptions = {
    pagination: {
      limit: 1000,
      offset: 0,
    },
  };

  const { data: txnResponse } = useQuery({
    queryKey: [RESOURCE_TYPE.TRANSACTION, txnReqOptions],
    queryFn: () => listResource(RESOURCE_TYPE.TRANSACTION, txnReqOptions),
  });

  // const { data: collectionResponse } = useQuery({
  //   queryKey: [RESOURCE_TYPE.COLLECTION, txnReqOptions],
  //   queryFn: () => listResource(RESOURCE_TYPE.COLLECTION, txnReqOptions),
  // });

  const { data: licenseResponse } = useQuery({
    queryKey: [RESOURCE_TYPE.LICENSE, txnReqOptions],
    queryFn: () => listResource(RESOURCE_TYPE.LICENSE, txnReqOptions),
  });

  // const { data: licenseOwnerResponse } = useQuery({
  //   queryKey: [RESOURCE_TYPE.LICENSE_OWNER, txnReqOptions],
  //   queryFn: () => listResource(RESOURCE_TYPE.LICENSE_OWNER, txnReqOptions),
  // });

  // const { data: policyResponse } = useQuery({
  //   queryKey: [RESOURCE_TYPE.POLICY, txnReqOptions],
  //   queryFn: () => listResource(RESOURCE_TYPE.POLICY, txnReqOptions),
  // });

  // const { data: assetResponse } = useQuery({
  //   queryKey: [RESOURCE_TYPE.ASSET, txnReqOptions],
  //   queryFn: () => listResource(RESOURCE_TYPE.ASSET, txnReqOptions),
  // });

  const txnData = txnResponse?.data;
  // TODO: add more charts
  // const assetData = assetResponse?.data;
  // const collectionData = collectionResponse?.data;
  const licenseData = licenseResponse?.data;
  // const licenseOwnerData = licenseOwnerResponse?.data;
  // const policyData = policyResponse?.data;

  return (
    <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col items-left pt-16 md:pt-10">
        {/* <h1 className="text-xl md:text-2xl font-semibold leading-none">Admin</h1> */}
        {txnData && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col xl:flex-row gap-4">
              <CardContainer>
                <EChartLineTxnByDay data={txnData} />
              </CardContainer>
              <CardContainer>
                <EChartLineTotalTxn data={txnData} />
              </CardContainer>
            </div>
            <div className="flex flex-col xl:flex-row gap-4">
              <CardContainer>
                <EChartBarByActionType data={txnData} />
              </CardContainer>
              <CardContainer>
                <EChartTop10IpIdsPie data={txnData} />
              </CardContainer>
            </div>
            <div className="flex flex-col xl:flex-row gap-4">
              <CardContainer>
                <LicensesByPolicyId data={licenseData} />
              </CardContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}