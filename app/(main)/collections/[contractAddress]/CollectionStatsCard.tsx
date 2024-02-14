import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CardWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col col-span-12 md:col-span-6 bg-white rounded-2xl shadow-lg">
    <div className="flex items-center justify-between w-full h-12 px-6 pb-2 pt-3 border-b border-gray-200">
      <h4 className="font-semibold text-gray-800 text-base leading-none">Statistics</h4>
    </div>
    {children}
  </div>
);

const IPAStat = async ({ collectionId }: { collectionId: string }) => {
  // const listReq: ListIpAssetRequest = {
  //   ipOrgId,
  // };
  // const listRes: ListIpAssetResponse = await storyClient.ipAsset.list(listReq);
  // const ipAssets = listRes.ipAssets;
  return <span className="text-5xl md:text-6xl font-light">12</span>;
};
const LicenseStat = async ({ collectionId }: { collectionId: string }) => {
  // const listReq: ListLicenseRequest = {
  //   ipOrgId,
  // };
  // const listRes: ListLicenseResponse = await storyClient.license.list(listReq);
  // const licenses = listRes.licenses;
  return <span className="text-5xl md:text-6xl font-light">21</span>;
};

const DisputeStat = async ({ collectionId }: { collectionId: string }) => {
  // const listReq: ListLicenseRequest = {
  //   ipOrgId,
  // };
  // const listRes: ListLicenseResponse = await storyClient.license.list(listReq);
  // const licenses = listRes.licenses;
  return <span className="text-5xl md:text-6xl font-light">34</span>;
};

export default function CollectionStatsCard({ collectionId }: { collectionId: string }) {
  return (
    <CardWrapper>
      <div className="flex flex-row h-full items-center justify-around w-full p-4">
        <div className="flex flex-col items-center gap-2 min-w-[6rem]">
          <Suspense fallback={<Skeleton className="h-12 mt-2 mb-1 w-16" />}>
            <IPAStat collectionId={collectionId} />
          </Suspense>
          <span className="md:text-lg font-light">IPAs</span>
        </div>
        <div className="flex flex-col items-center gap-2 min-w-[6rem]">
          <Suspense fallback={<Skeleton className="h-12 mt-2 mb-1 w-16" />}>
            <LicenseStat collectionId={collectionId} />
          </Suspense>
          <span className="md:text-lg font-light">Licenses</span>
        </div>
        <div className="flex flex-col items-center gap-2 min-w-[6rem]">
          <Suspense fallback={<Skeleton className="h-12 mt-2 mb-1 w-16" />}>
            <DisputeStat collectionId={collectionId} />
          </Suspense>
          <span className="md:text-lg font-light">Disputes</span>
        </div>
      </div>
    </CardWrapper>
  );
}
