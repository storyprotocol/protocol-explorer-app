import React from 'react';
import TransactionTableComponent from './TransactionTableComponent';
import { listResource } from '@/lib/server/sdk';
import { RESOURCE_TYPE } from '@/lib/server/types';
import { Address } from 'viem';

export default async function TransactionTableWrapper({
  pageSize = 100,
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

  return (
    <>
      <TransactionTableComponent data={txnListRes.data} pageSize={pageSize} />
    </>
  );
}
