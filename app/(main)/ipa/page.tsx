import { Suspense } from 'react';
import AssetDataViewer from '@/components/views/Asset';
import SkeletonGrid from '@/components/Skeletons/SkeletonGrid';
import { Skeleton } from '@/components/ui/skeleton';
export const revalidate = 60;
export const fetchCache = 'force-no-store';

export default function Assets() {
  return (
    <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col items-left gap-6 mb-6 pt-10">
        <h1 className="text-xl md:text-2xl font-semibold leading-none">IP Assets</h1>
      </div>

      <div className="flex flex-col items-left gap-2 mt-6">
        <Suspense
          fallback={
            <div className="flex flex-col">
              {/* <Skeleton className="h-9 w-24 bg-white" /> */}
              <SkeletonGrid />
            </div>
          }
        >
          <AssetDataViewer />
        </Suspense>
      </div>
    </div>
  );
}
