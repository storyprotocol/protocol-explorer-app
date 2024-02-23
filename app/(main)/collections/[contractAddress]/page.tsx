import { Suspense } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AssetDataViewer from '@/components/views/Asset';
import { Skeleton } from '@/components/ui/skeleton';

import CollectionBreadcrumbs, { Fallback as FallbackBreadcrumbs } from './CollectionBreadcrumbs';
import CollectionDetailCard, { Fallback as CollectionDetailCardFallback } from './CollectionDetailCard';
import CollectionStatsCard from './CollectionStatsCard';
import { Address } from 'viem';
import { getResource } from '@/lib/server/sdk';
import { Collection, RESOURCE_TYPE } from '@/lib/server/types';
import { CollectionMetadata, getCollectionByAddress } from '@/lib/simpleHash';

const PageTitle = async ({ collectionId }: { collectionId: string }) => {
  return <h1 className="font-medium text-xl md:text-3xl text-white md:mb-2">{collectionId}</h1>;
};

export const fetchCache = 'force-no-store';

export default async function CollectionDetailPage({
  params: { contractAddress },
}: {
  params: { contractAddress: Address };
}) {
  const collectionMetadata: CollectionMetadata = await getCollectionByAddress(contractAddress as Address);
  const collectionRes = await getResource(RESOURCE_TYPE.COLLECTION, contractAddress);
  const collectionData: Collection = collectionRes.data;

  return (
    <div className="w-full">
      <div className="relative w-full h-[24rem] bg-slate-500 mx-auto">
        {collectionMetadata.banner_image_url && (
          <img
            src={collectionMetadata.banner_image_url}
            alt="IP Org image"
            className="absolute w-full h-full object-cover"
          />
        )}
        <div className="absolute w-full bottom-0 left-0 right-0 h-4/5 bg-gradient-to-t from-[rgba(0,0,0,0.7)] via-[rgba(0,0,0,0.5)] to-transparent"></div>
      </div>
      <div className="relative w-full px-4 md:px-8 max-w-[1600px] -mt-48 mx-auto">
        <div className="flex w-full justify-between items-center mb-4">
          <div className="flex flex-col">
            <Suspense fallback={<Skeleton className="h-7 mt-1 w-56 mb-5" />}>
              <PageTitle collectionId={contractAddress} />
            </Suspense>
            <Suspense fallback={<FallbackBreadcrumbs />}>
              {contractAddress && <CollectionBreadcrumbs collectionId={contractAddress} />}
            </Suspense>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-8">
          <Suspense fallback={<CollectionDetailCardFallback />}>
            <CollectionDetailCard collectionMetadata={collectionMetadata} collectionId={contractAddress} />
          </Suspense>
          <CollectionStatsCard data={collectionData} />
        </div>

        <div className="flex">
          <Tabs defaultValue="assets" className="w-full">
            <TabsList className="overflow-scroll">
              {/* <TabsTrigger value="tx">Transactions</TabsTrigger> */}
              <TabsTrigger value="assets">Assets</TabsTrigger>
            </TabsList>
            {/* <TabsContent value="tx">
                <Suspense fallback={<SkeletonTable />}>
                  <TransactionTableWrapper collectionId={contractAddress} />
                </Suspense>
              </TabsContent> */}
            <TabsContent value="assets">
              <Suspense fallback={<div className="w-full pt-8 text-center text-gray-500">No assets found</div>}>
                <AssetDataViewer collectionId={contractAddress} />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
