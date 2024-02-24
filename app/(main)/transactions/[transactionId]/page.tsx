import SkeletonTransactionCard from '@/components/Skeletons/SkeletonTransactionCard';
import TransactionDetailComponent from '@/components/views/Transactions/TransactionDetailComponent';
import React, { Suspense } from 'react';

export default function TransactionDetails({ params: { transactionId } }: { params: { transactionId: string } }) {
  return (
    <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col items-left gap-2 mt-12 w-full">
        <Suspense fallback={<SkeletonTransactionCard />}>
          <TransactionDetailComponent txHash={transactionId} />
        </Suspense>
      </div>
    </div>
  );
}
