import TransactionCard from '@/components/cards/TransactionCard';
import storyClient from '@/lib/SP';
import { GetTransactionRequest, GetTransactionResponse } from '@story-protocol/core-sdk';
import React from 'react';

export default async function TransactionDetailComponent({ txHash }: { txHash: string }) {
  try {
    const getReq: GetTransactionRequest = {
      transactionId: txHash,
    };
    const getRes: GetTransactionResponse = await storyClient.transaction.get(getReq);

    const txData = getRes.transaction;

    return (
      <div>
        <TransactionCard data={txData} />
      </div>
    );
  } catch (e) {
    return <>Something went wrong</>;
  }
}
