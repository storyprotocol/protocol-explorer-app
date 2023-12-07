import { Suspense } from 'react';

import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TransactionTableWrapper from '@/components/views/Transactions/TransactionTableWrapper';

import AssetDetailCard, { Fallback as FallbackDetailsCard } from './AssetDetailCard';
import AssetBreadcrumbs, { Fallback as FallbackBreadcrumbs } from './AssetBreadcrumbs';
import LicenseReadAccordion from '@/app/admin/LicenseReadAccordion';
import AssetRelationshipTableWrapper from '@/components/views/Asset/AssetRelationshipTableWrapper';
import IpOrgLicenseDataViewer from '@/components/views/Licenses';
import CreateIpaBoundLicenseWriteAccordion from '@/app/admin/CreateIpaBoundLicenseWriteAccordion';
import { CreateIpaBoundLicenseRequest } from '@story-protocol/core-sdk';
import RelationshipWriteAccordion from '@/app/admin/RelationshipWriteAccordion';

export default function AssetDetailPage({
  params: { ipAssetId, ipOrgId },
}: {
  params: { ipAssetId: string; ipOrgId: string };
}) {
  const defaultIpAssetValues = {
    ipAssetId,
    ipOrgId,
  };

  const defaultRegisterRelationshipValues = {
    ...defaultIpAssetValues,
    relationshipType: '',
    srcContract: process.env.IP_ASSET_REGISTRY_CONTRACT,
    srcTokenId: ipAssetId,
  };

  const defaultCreateIpaBoundLicenseValues: CreateIpaBoundLicenseRequest = {
    ...defaultIpAssetValues,
    isCommercial: false, // Only support non-commercial terms for Alpha
    ipaId: parseInt(ipAssetId),
    preHooksCalldata: [],
    postHooksCalldata: [],
    txOptions: {
      waitForTransaction: true,
    },
  };

  return (
    <div className="w-full px-4 md:px-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col items-left gap-6 my-6">
        <div className="">
          <h1 className="text-xl md:text-4xl font-semibold leading-none mb-4">IP Asset Detail</h1>
          <Suspense fallback={<FallbackBreadcrumbs />}>
            <AssetBreadcrumbs ipAssetId={ipAssetId} ipOrgId={ipOrgId} />
          </Suspense>
        </div>

        {/* <div className="grid grid-cols-12 gap-2"> */}
        {/* <div className="flex h-52 md:h-72 xl:h-full col-span-12 xl:col-span-5 rounded-xl bg-indigo-100 overflow-hidden justify-center items-center">
            <PuzzlePieceIcon className="w-20 h-20 text-indigo-500" />
          </div> */}
        {/* <div className="flex h-full  col-span-12 xl:col-span-7"> */}
        <Suspense fallback={<FallbackDetailsCard />}>
          <AssetDetailCard ipAssetId={ipAssetId} ipOrgId={ipOrgId} />
        </Suspense>
        {/* </div> */}
        {/* </div> */}

        <div className="grid grid-cols-12 gap-2">
          <div className="flex col-span-12">
            <Tabs defaultValue="tx" className="w-full">
              <TabsList>
                <TabsTrigger value="tx">TX</TabsTrigger>
                <TabsTrigger value="licenses">Licenses</TabsTrigger>
                <TabsTrigger value="relationships">Relationships</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>
              <TabsContent value="tx">
                <Suspense fallback={<SkeletonTable />}>
                  <TransactionTableWrapper ipOrgId={ipOrgId} ipAssetId={ipAssetId} />
                </Suspense>
              </TabsContent>
              <TabsContent value="relationships">
                <Suspense fallback={<SkeletonTable />}>
                  <AssetRelationshipTableWrapper ipOrgId={ipOrgId} ipAssetId={ipAssetId} />
                </Suspense>
              </TabsContent>
              <TabsContent value="licenses">
                <Suspense fallback={<SkeletonTable />}>
                  <IpOrgLicenseDataViewer ipAssetId={ipAssetId} />
                </Suspense>
              </TabsContent>
              <TabsContent value="actions">
                <Suspense fallback={<SkeletonTable />}>
                  <div className="flex flex-col gap-4">
                    <RelationshipWriteAccordion defaultValues={defaultRegisterRelationshipValues} />
                    <LicenseReadAccordion defaultValues={defaultIpAssetValues} />
                    <CreateIpaBoundLicenseWriteAccordion defaultValues={defaultCreateIpaBoundLicenseValues} />
                  </div>
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
