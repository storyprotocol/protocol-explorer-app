'use client';

import React from 'react';
import CollectionsDataViewerComponent from '@/components/views/Collections/CollectionsDataViewerComponent';
import { RESOURCE_TYPE } from '@/lib/server/types';
import { listResource } from '@/lib/server/sdk';
import { useQuery } from '@tanstack/react-query';
import SkeletonGrid from '@/components/Skeletons/SkeletonGrid';
import { usePathname, useSearchParams } from 'next/navigation';
import Pagination from '@/components/ui/pagination';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default function CollectionsDataViewerWrapper({
  tableOnly,
  gridOnly,
  limit = 24,
}: {
  limit?: number,
  offset?: number,
  tableOnly?: boolean;
  gridOnly?: boolean;
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const routeParams = new URLSearchParams(searchParams.toString())
  const page = Number(routeParams.get('page')) || 1;

  let listParams = {
    pagination: {
      limit,
      offset: (page - 1) * limit,
    },
  };

  const { data: collectionRes, isLoading } = useQuery({
    queryKey: [RESOURCE_TYPE.COLLECTION, listParams],
    queryFn: () => listResource(RESOURCE_TYPE.COLLECTION, listParams),
  })

  const collectionData = collectionRes?.data;

  if (isLoading) return <div className="flex flex-col">
    <SkeletonGrid />
  </div>

  if (!collectionData?.length) {
    return <div className="w-full pt-8 text-center text-gray-500">No Connection found</div>;
  }

  return (
    <>
      <CollectionsDataViewerComponent
        data={collectionData}
        tableOnly={tableOnly}
        gridOnly={gridOnly}
        pageSize={limit}
        showTablePagination={false}
      />
      <Pagination currentPage={page} path={pathname} disableNextBtn={collectionData.length < limit} />
    </>
  );
}
