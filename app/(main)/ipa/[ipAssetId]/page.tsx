import { Suspense } from 'react';

import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TransactionTableWrapper from '@/components/views/Transactions/TransactionTableWrapper';

import AssetDetailCard, { Fallback as FallbackDetailsCard } from './AssetDetailCard';
// import AssetBreadcrumbs, { Fallback as FallbackBreadcrumbs } from './AssetBreadcrumbs';
// import LicenseReadAccordion from '@/app/(main)/admin/LicenseReadAccordion';
// import IpOrgLicenseDataViewer from '@/components/views/Licenses';
// import CreateIpaBoundLicenseWriteAccordion from '@/app/(main)/admin/CreateIpaBoundLicenseWriteAccordion';
// import { CreateLicenseRequest } from '@story-protocol/core-sdk';
// import RelationshipWriteAccordion from '@/app/(main)/admin/RelationshipWriteAccordion';
import { Badge } from '@/components/ui/badge';
import { Address } from 'viem';
import { getResource } from '@/lib/server/sdk';
import { Asset, RESOURCE_TYPE } from '@/lib/server/types';

export const revalidate = 60;
export const fetchCache = 'force-no-store';

export default async function AssetDetailPage({ params: { ipAssetId } }: { params: { ipAssetId: Address } }) {
  const defaultIpAssetValues = {
    ipAssetId,
  };

  const assetDetailRes = await getResource(RESOURCE_TYPE.ASSET, ipAssetId);
  const assetData: Asset = assetDetailRes.data;

  // const defaultRegisterRelationshipValues = {
  //   ...defaultIpAssetValues,
  //   relationshipType: '',
  //   srcContract: process.env.IP_ASSET_REGISTRY_CONTRACT,
  //   srcTokenId: ipAssetId,
  // };

  // const defaultCreateIpaBoundLicenseValues: CreateLicenseRequest = {
  //   ...defaultIpAssetValues,
  //   ipaId: ipAssetId,
  //   parentLicenseId: '',
  //   params: [],
  //   preHookData: [],
  //   postHookData: [],
  //   txOptions: {
  //     waitForTransaction: true,
  //   },
  // };

  return (
    <div className="w-full p-4 md:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col items-left gap-6">
        <div>
          <div className="flex flex-row gap-4 items-center mb-4">
            <h1 className="text-xl md:text-4xl font-semibold leading-none">IP Asset Detail</h1>
            <Badge className="bg-indigo-500 hover:bg-indigo-500">Root</Badge>
          </div>
          {/* <Suspense fallback={<FallbackBreadcrumbs />}>
            <AssetBreadcrumbs ipAssetId={ipAssetId} ipOrgId={ipOrgId} />
          </Suspense> */}
        </div>
        <Suspense fallback={<FallbackDetailsCard />}>
          <AssetDetailCard data={assetData} />
        </Suspense>

        <div className="grid grid-cols-12 gap-2">
          <div className="flex col-span-12">
            <Tabs defaultValue="tx" className="w-full">
              <TabsList>
                <TabsTrigger value="tx">Transactions</TabsTrigger>
                <TabsTrigger value="derivatives">Derivative IPAs</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
                <TabsTrigger value="licenses">Licenses</TabsTrigger>
                <TabsTrigger value="royalties">Royalties</TabsTrigger>
                <TabsTrigger value="disputes">Disputes</TabsTrigger>
                <TabsTrigger value="permissions">Permissions</TabsTrigger>
                {/* <TabsTrigger value="relationships">Relationships</TabsTrigger> */}
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>
              <TabsContent value="tx">
                <Suspense fallback={<SkeletonTable />}>
                  <TransactionTableWrapper ipAssetId={ipAssetId} />
                </Suspense>
              </TabsContent>
              <TabsContent value="derivatives">
                <h2>Derivatives IPA</h2>
              </TabsContent>
              <TabsContent value="policies">
                <h2>policies</h2>
              </TabsContent>
              <TabsContent value="licenses">
                <h2>licenses</h2>
                <Suspense fallback={<SkeletonTable />}>
                  {/* <IpOrgLicenseDataViewer ipAssetId={ipAssetId} /> */}
                </Suspense>
              </TabsContent>

              <TabsContent value="royalties">
                <h2>royalties</h2>
              </TabsContent>
              <TabsContent value="disputes">
                <h2>disputes</h2>
              </TabsContent>
              <TabsContent value="permissions">
                <h2>permissions</h2>
              </TabsContent>
              <TabsContent value="actions">
                {/* <Suspense fallback={<SkeletonTable />}>
                  <div className="flex flex-col gap-4">
                    <RelationshipWriteAccordion defaultValues={defaultRegisterRelationshipValues} />
                    <LicenseReadAccordion defaultValues={defaultIpAssetValues} />
                    <CreateIpaBoundLicenseWriteAccordion defaultValues={defaultCreateIpaBoundLicenseValues} />
                  </div>
                </Suspense> */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
