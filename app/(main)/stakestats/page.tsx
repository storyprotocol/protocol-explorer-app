import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import StakeStatsWrapper from '@/components/views/Stake/StakeStatsWrapper';
import { Suspense } from 'react';

export const revalidate = 60;
export const fetchCache = 'force-no-store';

export default function Transactions() {
  return (
    <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col items-left pt-16 md:pt-10">
        <h1 className="text-xl md:text-2xl font-semibold leading-none">Stake</h1>
        <Suspense fallback={<SkeletonTable />}>
          <StakeStatsWrapper />
        </Suspense>
      </div>
    </div>
  );
}
