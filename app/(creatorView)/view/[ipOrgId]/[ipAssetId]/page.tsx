import { Suspense } from 'react';
import Link from 'next/link';
import storyClient from '@/lib/SP';

import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AssetDetailCard, { Fallback as FallbackDetailsCard } from './AssetDetailCard';
import AssetRelationshipTableWrapper from '@/components/views/Asset/AssetRelationshipTableWrapper';
import IpOrgLicenseDataViewer from '@/components/views/Licenses';



export default async function AssetDetailPage({
  params: { ipAssetId, ipOrgId },
}: {
  params: { ipAssetId: string; ipOrgId: string };
}) {
  const {ipAsset} = await storyClient.ipAsset.get({ ipAssetId });

  return (
    <div className="flex w-full ">
      <div className="md:flex shrink-0 w-[176px] h-lvh border-r pt-[34px] hidden md">
        <Link href="/" className="whitespace-nowrap  mx-auto">
          <img className="h-6 max-w-20" src="/story_logo.svg" alt="Story Protocol" />
        </Link>
      </div>
      <div className="flex px-10 py-9 max-w-[1600px] flex-col items-left gap-6 mx-auto">
        <div className="">
          <div className='flex flex-row gap-4 items-center mb-4'>
            <h1 className="text-2xl leading-2xl md:text-2xl font-bold leading-none">{ipAsset.name}</h1>
          </div>
        </div>
        <Suspense fallback={<FallbackDetailsCard />}>
          <AssetDetailCard ipAsset={ipAsset} />
        </Suspense>

        <div className="grid grid-cols-12 gap-6">
          <div className="flex col-span-12">
            <Tabs defaultValue="licenses" className="w-full">
              <TabsList>
                <TabsTrigger value="licenses">Licenses</TabsTrigger>
                <TabsTrigger value="relationships">Relationships</TabsTrigger>
              </TabsList>
              <TabsContent value="licenses">
                <Suspense fallback={<SkeletonTable />}>
                  <IpOrgLicenseDataViewer ipAssetId={ipAssetId} />
                </Suspense>
              </TabsContent>
              <TabsContent value="relationships">
                <Suspense fallback={<SkeletonTable />}>
                  <AssetRelationshipTableWrapper ipOrgId={ipOrgId} ipAssetId={ipAssetId} />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
