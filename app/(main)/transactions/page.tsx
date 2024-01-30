import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import TransactionTableWrapper from '@/components/views/Transactions/TransactionTableWrapper';
import { Suspense } from 'react';

export const revalidate = 60;
export const fetchCache = 'force-no-store';

export default function Transactions() {
  return (
    <div>
      <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col items-left gap-6 mb-6">
          <h1 className="text-xl md:text-4xl font-semibold leading-none">Transactions</h1>
          <Suspense fallback={<SkeletonTable />}>
            <TransactionTableWrapper />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
