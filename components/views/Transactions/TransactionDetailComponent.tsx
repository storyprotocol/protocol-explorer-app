import TransactionCard from '@/components/cards/TransactionCard';
import { getResource } from '@/lib/server/sdk';
import { RESOURCE_TYPE, Transaction } from '@/lib/server/types';
import React from 'react';

export default async function TransactionDetailComponent({ txHash }: { txHash: string }) {
  try {
    const txDetailRes = await getResource(RESOURCE_TYPE.TRANSACTION, txHash);
    const txData: Transaction = txDetailRes.data;

    return (
      <div>
        <TransactionCard data={txData} />
      </div>
    );
  } catch (e) {
    return <>Something went wrong</>;
  }
}
