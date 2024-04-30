'use client';
import React, { useEffect, useState } from 'react';
import CardContainer from '@/components/cards/CardContainer';
import { listResource } from '@/lib/server/sdk';
import { RESOURCE_TYPE } from '@/lib/server/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import EChartLineTotalTxn from '@/components/charts/ECharts/transactions/TxnLineTotal';
import EChartLineTxnByDay from '@/components/charts/ECharts/transactions/TxnLineByDay';
import EChartTop10IpIdsPie from '@/components/charts/ECharts/transactions/TxnPieChartByTopIpId';
import LicensesByPolicyId from '@/components/charts/ECharts/licenses/LicensesByPolicyId';
import NivoStackedBarChart from '@/components/charts/Nivo/NivoStackedBarChart';
import Login from '@/components/login/Login';

async function recursiveFetchTxn(offset: number, accumulatedData = []) {
  try {
    const response = await listResource(RESOURCE_TYPE.TRANSACTION, {
      pagination: {
        limit: 1000,
        offset: offset,
      },
    });
    const data = response.data;
    console.log({ data });

    // Combine old data with new data
    const newData = accumulatedData.concat(data);
    console.log({ newData });

    // Check if the accumulated data is enough
    if (data.length < 1000) {
      return newData; // If less than 1000 items, it's likely the last page
    } else {
      // Recursively fetch next page
      return recursiveFetchTxn(offset + 1000, newData);
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Rethrow or handle error as necessary
  }
}

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [txnResponse, setTxnResponse] = useState<any>();

  const licenseReqOptions = {
    pagination: {
      limit: 1000,
      offset: 0,
    },
  };

  useEffect(() => {
    recursiveFetchTxn(0).then((data) => {
      setTxnResponse(data);
    });
  }, []);

  const { data: licenseResponse } = useQuery({
    queryKey: [RESOURCE_TYPE.LICENSE, licenseReqOptions],
    queryFn: () => listResource(RESOURCE_TYPE.LICENSE, licenseReqOptions),
    placeholderData: keepPreviousData,
  });

  const txnData = txnResponse;
  // TODO: add more charts
  // const assetData = assetResponse?.data;
  // const collectionData = collectionResponse?.data;
  const licenseData = licenseResponse?.data;
  // const licenseOwnerData = licenseOwnerResponse?.data;
  // const policyData = policyResponse?.data;

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
