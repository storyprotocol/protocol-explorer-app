'use client';

import React from 'react';
import AssetDataViewerComponent from '@/components/views/Asset/AssetDataViewerComponent';
import { Asset, RESOURCE_TYPE } from '@/lib/server/types';
import { listResource } from '@/lib/server/sdk';
import { Address } from 'viem';
import { useQuery } from '@tanstack/react-query';
import SkeletonGrid from '@/components/Skeletons/SkeletonGrid';
import Pagination from '@/components/ui/pagination';
import { useSearchParams, usePathname } from 'next/navigation';

export default function AssetDataViewerWrapper({
  limit = 48, // this number is better for responsive layout display
  collectionId,
  ipId,
  ...params
}: any) {
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const routeParams = new URLSearchParams(searchParams.toString())
  const page = Number(routeParams.get('page')) || 1;
  const listReq = {
    pagination: {
      limit,
      offset: (page - 1) * limit,
    },
    where: {
      tokenContract: collectionId as Address,
      tokenId: params.tokenId,
    },
  };

  const { data: assetListRes, isLoading } = useQuery({
    queryKey: [RESOURCE_TYPE.ASSET, listReq],
    queryFn: () => listResource(RESOURCE_TYPE.ASSET, listReq),
  })

  let ipAssets: Asset[] = assetListRes?.data;

  if (isLoading) return <div className="flex flex-col">
    <SkeletonGrid number={12} />
  </div>

  if (!ipAssets?.length) {
    return <div className="w-full pt-8 text-center text-gray-500">No IPAs found</div>;
  }

  return <>
    <AssetDataViewerComponent
      data={ipAssets}
      {...params}
    />
    <Pagination
      currentPage={page}
      path={pathname}
      disableNextBtn={ipAssets.length < limit}
    />
  </>;
}
