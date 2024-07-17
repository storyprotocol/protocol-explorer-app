import React from 'react';
import TransactionTableComponent from './TransactionTableComponent';
import { listResource } from '@/lib/server/sdk';
import { RESOURCE_TYPE, Transaction } from '@/lib/server/types';
import { Address } from 'viem';

export default async function TransactionTableWrapper({
  pageSize = 100,
  collectionId,
  ipId,
}: {
  pageSize?: number;
  collectionId?: Address;
  ipId?: Address;
}) {
  // try {
  const req = {
    pagination: {
      limit: 1000,
      offset: 0,
    },
    where: {
      ipId,
    },
  };

  const txnListRes = await listResource(RESOURCE_TYPE.TRANSACTION, req);

  console.log({ txnListRes });

  const filteredData = txnListRes.data.filter((tx: Transaction) => {
    return true;
  });
  return (
    <>
      <TransactionTableComponent data={filteredData} pageSize={pageSize} />
    </>
  );
}
