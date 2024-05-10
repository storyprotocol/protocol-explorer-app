'use client';

import CollectionsDataViewer from '@/components/views/Collections';
import { Suspense } from 'react';

export default function CollectionsPage() {
  return (
    <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto ">
      <div className="flex flex-col items-left pt-16 md:pt-10">
        <h1 className="text-xl md:text-2xl font-semibold leading-none">Collections</h1>
      </div>

      <div className="flex flex-col items-left gap-2 mt-3">
        <Suspense>
          <CollectionsDataViewer />
        </Suspense>
      </div>
    </div>
  );
}
