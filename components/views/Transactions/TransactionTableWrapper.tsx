import React from 'react';
import TransactionTableComponent from './TransactionTableComponent';
import storyClient from '@/lib/SP';

export default async function TransactionTableWrapper({
  pageSize = 20,
  ipOrgId,
  ipAssetId,
}: {
  pageSize?: number;
  ipOrgId?: string;
  ipAssetId?: string;
}) {
  const req = {
    options: {
      pagination: {
        limit: 1000,
        offset: 0,
      },
    },
  };

  const txnListRes = await storyClient.transaction.list(req);

  const transactionData = txnListRes.transactions;

  const filteredData = transactionData.filter(
    (tx) => (ipOrgId ? tx.ipOrgId === ipOrgId : true) && (ipAssetId ? tx.resourceId === ipAssetId : true),
  );
  // console.log('Filtered data:', filteredData);
  return (
    <>
      <TransactionTableComponent data={filteredData} pageSize={pageSize} />
    </>
  );
}
