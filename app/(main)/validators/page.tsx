import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ValidatorTableWrapper from '@/components/views/Validators/ValidatorTableWrapper';
import { Suspense } from 'react';

export const revalidate = 60;
export const fetchCache = 'force-no-store';

export default function Validators() {
  return (
    <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col items-left pt-16 md:pt-10">
        <h1 className="text-xl md:text-2xl font-semibold leading-none">Validators</h1>
        <Suspense fallback={<SkeletonTable />}>
          <ValidatorTableWrapper />
        </Suspense>
      </div>
    </div>
  );
}
