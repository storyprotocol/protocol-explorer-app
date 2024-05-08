import { Suspense } from 'react';
import CollectionsDataViewer from '@/components/views/Collections';
import SkeletonGrid from '@/components/Skeletons/SkeletonGrid';
import Pagination from '@/components/ui/pagination';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function CollectionsPage({
  searchParams
}: any) {
  const page = Number(searchParams.page || 1);
  const pageSize = 50;
  return (
    <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto ">
      <div className="flex flex-col items-left pt-16 md:pt-10">
        <h1 className="text-xl md:text-2xl font-semibold leading-none">Collections</h1>
      </div>

      <div className="flex flex-col items-left gap-2 mt-3">
        <Suspense
          fallback={
            <div className="flex flex-col">
              <SkeletonGrid />
            </div>
          }
        >
          <CollectionsDataViewer limit={pageSize} offset={page - 1} />
          <Pagination currentPage={page} path='collections' />
        </Suspense>
      </div>
    </div>
  );
}
