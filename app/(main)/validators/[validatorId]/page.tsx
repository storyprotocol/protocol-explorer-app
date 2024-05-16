import SkeletonTransactionCard from '@/components/Skeletons/SkeletonTransactionCard';
import ValidatorDetailComponent from '@/components/views/Validators/ValidatorDetailComponent';
import React, { Suspense } from 'react';

export default function ValidatorDetails({ params: { validatorName } }: { params: { validatorName: string } }) {
  return (
    <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col items-left gap-2 mt-12 w-full">
        <Suspense fallback={<SkeletonTransactionCard />}>
          <ValidatorDetailComponent validatorName={validatorName} />
        </Suspense>
      </div>
    </div>
  );
}
