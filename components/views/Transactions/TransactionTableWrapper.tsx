import React from 'react';
import TransactionTableComponent from './TransactionTableComponent';
import { listResource } from '@/lib/server/sdk';
import { RESOURCE_TYPE, Transaction } from '@/lib/server/types';

export default async function TransactionTableWrapper({
  pageSize = 100,
  collectionId,
  ipAssetId,
}: {
  pageSize?: number;
  collectionId?: string;
  ipAssetId?: string;
}) {
  const req = {
    pagination: {
      limit: 1000,
      offset: 0,
    },
  };

  const txnListRes = await listResource(RESOURCE_TYPE.TRANSACTION, req);

  console.log({ txnListRes });

  const filteredData = txnListRes.data.filter((tx: Transaction) =>
    collectionId ? tx.resourceId === collectionId : true,
  );
  return (
    <>
      <TransactionTableComponent data={filteredData} pageSize={pageSize} />
    </>
  );
}
