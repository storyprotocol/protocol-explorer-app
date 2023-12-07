import storyClient from '@/lib/SP';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ListIpAssetRequest, ListIpAssetResponse } from '@story-protocol/core-sdk';

const CardWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col col-span-12 md:col-span-6 bg-white rounded-2xl shadow-lg">
    <div className="flex items-center justify-between w-full h-12 px-6 pb-2 pt-3 border-b border-gray-200">
      <h4 className="font-semibold text-gray-800 text-base leading-none">Statistics</h4>
    </div>
    {children}
  </div>
);

const IPAStat = async ({ ipOrgId }: { ipOrgId: string }) => {
  const listReq: ListIpAssetRequest = {
    ipOrgId,
  };
  const listRes: ListIpAssetResponse = await storyClient.ipAsset.list(listReq);
  const ipAssets = listRes.ipAssets;
  return <span className="text-5xl md:text-6xl font-light">{ipAssets.length}</span>;
};

export default function IPOrgStatsCard({ ipOrgId }: { ipOrgId: string }) {
  return (
    <CardWrapper>
      <div className="flex h-full items-center justify-around w-full p-4">
        <div className="flex flex-col items-center gap-2 min-w-[6rem]">
          <Suspense fallback={<Skeleton className="h-12 mt-2 mb-1 w-16" />}>
            <IPAStat ipOrgId={ipOrgId} />
          </Suspense>
          <span className="md:text-lg font-light">IPAs</span>
        </div>
      </div>
    </CardWrapper>
  );
}
