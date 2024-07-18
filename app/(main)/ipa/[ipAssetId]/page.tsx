import { Suspense } from 'react';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AssetDetailCard from './AssetDetailCard';
import { Address } from 'viem';
import { getResource } from '@/lib/server/sdk';
import { Asset, RESOURCE_TYPE } from '@/lib/server/types';
import LicenseDataViewer from '@/components/views/Licenses';
import DisputeDataViewerWrapper from '@/components/views/Disputes/DisputeDataViewerWrapper';
// import PermissionDataViewerWrapper from '@/components/views/Permissions/PermissionDataViewerWrapper';
import AssetDataViewerComponent from '@/components/views/Asset/AssetDataViewerComponent';
import IPAPolicyDataViewerWrapper from '@/components/views/Policies/IPAPolicyDataViewerWrapper';
import RoyaltyPage from '@/components/views/Royalties/RoyaltyPage';

export const fetchCache = 'force-no-store';

export default async function AssetDetailPage({ params: { ipAssetId } }: { params: { ipAssetId: Address } }) {
  const assetDetailRes = await getResource(RESOURCE_TYPE.ASSET, ipAssetId);
  const assetData: Asset = assetDetailRes?.data;

  return (
    <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col items-left gap-6 mt-12">
        <AssetDetailCard data={assetData} />
        <div className="flex">
          <Tabs defaultValue="derivatives" className="w-full">
            <TabsList className="overflow-scroll">
              <TabsTrigger value="derivatives">Derivative IPAs</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
              <TabsTrigger value="licenses">Licenses</TabsTrigger>
              <TabsTrigger value="royalties">Royalties</TabsTrigger>
              <TabsTrigger value="disputes">Disputes</TabsTrigger>
              {/* <TabsTrigger value="permissions">Permissions</TabsTrigger> */}
            </TabsList>
            <TabsContent value="derivatives">
              {!assetData?.childIps ? (
                <div className="w-full pt-8 text-center text-gray-500">No IPAs found</div>
              ) : (
                <AssetDataViewerComponent gridOnly data={assetData?.childIps} />
              )}
            </TabsContent>
            <TabsContent value="policies">
              <IPAPolicyDataViewerWrapper ipId={ipAssetId} />
            </TabsContent>
            <TabsContent value="licenses">
              <Suspense fallback={<SkeletonTable />}>
                <LicenseDataViewer ipId={ipAssetId} />
              </Suspense>
            </TabsContent>
            <TabsContent value="royalties">
              <Suspense fallback={<SkeletonTable />}>
                <RoyaltyPage ipId={ipAssetId} />
              </Suspense>
            </TabsContent>
            <TabsContent value="disputes">
              <Suspense fallback={<SkeletonTable />}>
                <DisputeDataViewerWrapper ipId={ipAssetId} />
              </Suspense>
            </TabsContent>
            {/* <TabsContent value="permissions">
              <Suspense fallback={<SkeletonTable />}>
                <PermissionDataViewerWrapper ipId={ipAssetId} />
              </Suspense>
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
