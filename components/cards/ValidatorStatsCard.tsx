import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ValidatorMetadata } from '@/lib/server/types';

const CardWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col col-span-12 md:col-span-6 bg-white rounded-2xl shadow-lg">
    <div className="flex items-center justify-between w-full h-12 px-6 pb-2 pt-3 border-b border-gray-200">
      <h4 className="font-semibold text-gray-800 text-base leading-none">Statistics</h4>
    </div>
    {children}
  </div>
);

const IPAStat = async ({ count }: { count: string }) => {
  return <span className="text-5xl md:text-6xl font-light">{count}</span>;
};
const LicenseStat = async ({ count }: { count: string }) => {
  return <span className="text-5xl md:text-6xl font-light">{count}</span>;
};

const DisputeStat = async ({ count }: { count: string }) => {
  return <span className="text-5xl md:text-6xl font-light">{count}</span>;
};

export default function ValidatorStatsCard({ data }: { data: ValidatorMetadata }) {
  return (
    <CardWrapper>
      <div className="flex flex-row h-full items-center justify-around w-full p-4">
      <div className="flex flex-col items-center gap-2 min-w-[6rem]">
          <Suspense fallback={<Skeleton className="h-12 mt-2 mb-1 w-16" />}>
            <LicenseStat count={data.validatorTotalStaked} />
          </Suspense>
          <span className="md:text-lg font-light">Total Staked</span>
        </div>
        <div className="flex flex-col items-center gap-2 min-w-[6rem]">
          <Suspense fallback={<Skeleton className="h-12 mt-2 mb-1 w-16" />}>
            <IPAStat count={data.commission} />
          </Suspense>
          <span className="md:text-lg font-light">Commission</span>
        </div>
        <div className="flex flex-col items-center gap-2 min-w-[6rem]">
          <Suspense fallback={<Skeleton className="h-12 mt-2 mb-1 w-16" />}>
            <LicenseStat count={data.maxCommission} />
          </Suspense>
          <span className="md:text-lg font-light">Max Commission</span>
        </div>
      </div>
    </CardWrapper>
  );
}
