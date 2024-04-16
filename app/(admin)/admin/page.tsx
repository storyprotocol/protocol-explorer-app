'use client';
import React, { useState } from 'react';
import CardContainer from '@/components/cards/CardContainer';
import { listResource } from '@/lib/server/sdk';
import { RESOURCE_TYPE } from '@/lib/server/types';
import { useQuery } from '@tanstack/react-query';
import EChartLineTotalTxn from '@/components/charts/ECharts/transactions/TxnLineTotal';
import EChartLineTxnByDay from '@/components/charts/ECharts/transactions/TxnLineByDay';
import EChartTop10IpIdsPie from '@/components/charts/ECharts/transactions/TxnPieChartByTopIpId';
import LicensesByPolicyId from '@/components/charts/ECharts/licenses/LicensesByPolicyId';
import NivoStackedBarChart from '@/components/charts/Nivo/NivoStackedBarChart';
import Login from '@/components/login/Login';

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
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

  const { data: licenseResponse } = useQuery({
    queryKey: [RESOURCE_TYPE.LICENSE, txnReqOptions],
    queryFn: () => listResource(RESOURCE_TYPE.LICENSE, txnReqOptions),
  });

  const txnData = txnResponse?.data;
  // TODO: add more charts
  const licenseData = licenseResponse?.data;

  if (!isAdmin) {
    return <Login setIsAdmin={setIsAdmin} />;
  }

  return (
    <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col items-left pt-16 md:pt-10">
        {/* <h1 className="text-xl md:text-2xl font-semibold leading-none">Admin</h1> */}
        {txnData && licenseData && (
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
                <LicensesByPolicyId data={licenseData} />
              </CardContainer>

              <CardContainer>
                <EChartTop10IpIdsPie data={txnData} />
              </CardContainer>
            </div>
            <div className="flex flex-col xl:flex-row gap-4">
              <CardContainer className="relative h-96">
                <h1 className="absolute top-4 left-9 text-lg">Total ActionType and Resource</h1>
                <NivoStackedBarChart data={txnData as any[]} />
                {/* <EChartBarByActionType data={txnData} /> */}
              </CardContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
