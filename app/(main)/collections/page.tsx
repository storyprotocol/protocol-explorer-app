import { Suspense } from 'react';
import CollectionsDataViewer from '@/components/views/Collections';
import SkeletonGrid from '@/components/Skeletons/SkeletonGrid';
// import { Skeleton } from '@/components/ui/skeleton';
export const revalidate = 60;
export const fetchCache = 'force-no-store';

export default async function CollectionsPage() {
  return (
    <div>
      <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col items-left gap-6 mb-6">
          <h1 className="text-xl md:text-2xl font-semibold leading-none">Collections</h1>
        </div>

        <div className="flex flex-col items-left gap-2 mt-6">
          <Suspense
            fallback={
              <div className="flex flex-col">
                <SkeletonGrid />
              </div>
            }
          >
            <CollectionsDataViewer gridOnly />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
