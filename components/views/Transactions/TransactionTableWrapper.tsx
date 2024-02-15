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
      chainId: 'string',
      metadataResolverAddress: 'string',
      tokenContract: 'string',
      tokenId: 'string',
    },
  };

  const txnListRes = await listResource(RESOURCE_TYPE.TRANSACTION, req);

  const filteredData = txnListRes.data.filter((tx: Transaction) => {
    return true;
  });
  return (
    <>
      <TransactionTableComponent data={filteredData} pageSize={pageSize} />
    </>
  );
  // } catch (error) {
  //   console.log('TEST', { error });
  //   // return <ErrorComponent />;
  // }
}
