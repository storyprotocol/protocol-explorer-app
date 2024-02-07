import { Suspense } from 'react';

import storyClient from '@/lib/SP';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AssetDataViewer from '@/components/views/Asset';
import TransactionTableWrapper from '@/components/views/Transactions/TransactionTableWrapper';
import { Skeleton } from '@/components/ui/skeleton';

import IPOrgBreadcrumbs, { Fallback as FallbackBreadcrumbs } from './IPOrgBreadcrumbs';
import IPOrgDetailCard, { Fallback as IPOrgDetailCardFallback } from './IPOrgDetailCard';
import IPOrgStatsCard from './IPOrgStatsCard';

import bannerFallbackImg from '@/assets/franchise-banner-fallback.jpg';
import IpAssetWriteAccordion from '@/app/(main)/admin/IPAssetWriteAccordion';
import Link from 'next/link';
import HookTableWrapper from '@/components/views/Hook/HookTableWrapper';
import ModuleTableWrapper from '@/components/views/Module/ModuleTableWrapper';
import { ConfigureLicenseRequest, CreateLicenseRequest, GetIPOrgRequest } from '@story-protocol/core-sdk';
import IpOrgLicenseDataViewer from '@/components/views/Licenses';
import CreateLicenseNftWriteAccordion from '@/app/(main)/admin/CreateLicenseNftWriteAccordion';
import RelationshipTypeWriteAccordion from '@/app/(main)/admin/RelationshipTypeWriteAccordion';

const PageTitle = async ({ ipOrgId }: { ipOrgId: string }) => {
  if (!ipOrgId) return null;

  const getReq: GetIPOrgRequest = {
    ipOrgId: ipOrgId,
  };
  const { ipOrg } = await storyClient.ipOrg.get(getReq);
  return <h1 className="font-medium text-xl md:text-3xl text-white md:mb-2">{ipOrg!.name}</h1>;
};

export default function IpOrgDetailPage({ params: { contractAddress } }: { params: { contractAddress: string } }) {
  const defaultIPOrgId = {
    ipOrgId: contractAddress,
  };

  const defaultCreateLicenseValues: CreateLicenseRequest = {
    ipOrgId: defaultIPOrgId.ipOrgId,
    ipaId: '0',
    params: [],
    parentLicenseId: '0',
    preHookData: [],
    postHookData: [],
    txOptions: {
      waitForTransaction: true,
    },
  };

  const defaultConfigureLicenseNftValues: ConfigureLicenseRequest = {
    ipOrg: defaultIPOrgId.ipOrgId,
    licensor: 2,
    frameworkId: 'SPUML-1.0',
    params: [],
    txOptions: {
      waitForTransaction: true,
    },
  };

  return (
    <div className="">
      <div className="relative w-full h-[32rem] bg-slate-500 mx-auto">
        {/* <BannerImage ipOrgId={contractAddress} /> */}
        <img src={bannerFallbackImg.src} alt="IP Org image" className="absolute w-full h-full object-cover" />
        <div className="absolute w-full bottom-0 left-0 right-0 h-4/5 bg-gradient-to-t from-[rgba(0,0,0,0.7)] via-[rgba(0,0,0,0.5)] to-transparent"></div>
      </div>
      <div className="relative w-full px-4 md:px-8 max-w-[1600px] -mt-48 mx-auto">
        <div className="flex w-full justify-between items-center mb-4">
          <div className="flex flex-col">
            <Suspense fallback={<Skeleton className="h-7 mt-1 w-56 mb-5" />}>
              <PageTitle ipOrgId={contractAddress} />
            </Suspense>
            <Suspense fallback={<FallbackBreadcrumbs />}>
              {contractAddress && <IPOrgBreadcrumbs ipOrgId={contractAddress} />}
            </Suspense>
          </div>
          <Link href={`/contractAddress/${contractAddress}/createIpa`}>
            <button className="bg-sp-purple hover:bg-sp-purple-dark py-2 px-4 md:px-6 rounded-3xl text-white text-xs md:text-base shadow-sm">
              Create New IPA
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-8">
          <Suspense fallback={<IPOrgDetailCardFallback />}>
            <IPOrgDetailCard ipOrgId={contractAddress} />
          </Suspense>
          <IPOrgStatsCard ipOrgId={contractAddress} />
        </div>

        <div className="grid grid-cols-12 gap-2">
          <div className="flex col-span-12">
            <Tabs defaultValue="tx" className="w-full">
              <TabsList>
                <TabsTrigger value="tx">Transactions</TabsTrigger>
                <TabsTrigger value="ipa">IPA</TabsTrigger>
                <TabsTrigger value="licenses">Licenses</TabsTrigger>
                {/* <TabsTrigger value="modules">Modules</TabsTrigger> */}
                <TabsTrigger value="hooks">Hooks</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>
              <TabsContent value="tx">
                <Suspense fallback={<SkeletonTable />}>
                  <TransactionTableWrapper ipOrgId={contractAddress} />
                </Suspense>
              </TabsContent>
              <TabsContent value="ipa">
                <Suspense fallback={<div className="w-full pt-8 text-center text-gray-500">No assets found</div>}>
                  <AssetDataViewer ipOrgId={contractAddress} />
                </Suspense>
              </TabsContent>
              <TabsContent value="licenses">
                <Suspense fallback={<SkeletonTable />}>
                  <IpOrgLicenseDataViewer ipOrgId={contractAddress} />
                </Suspense>
              </TabsContent>
              <TabsContent value="modules">
                <Suspense fallback={<SkeletonTable />}>
                  <ModuleTableWrapper ipOrgId={contractAddress} />
                </Suspense>
              </TabsContent>
              <TabsContent value="hooks">
                <Suspense fallback={<SkeletonTable />}>
                  <HookTableWrapper ipOrgId={contractAddress} />
                </Suspense>
              </TabsContent>
              <TabsContent value="actions">
                <Suspense fallback={<SkeletonTable />}>
                  <div className="flex flex-col gap-4">
                    <IpAssetWriteAccordion defaultValues={defaultIPOrgId} />
                    <CreateLicenseNftWriteAccordion
                      createDefaultValues={defaultCreateLicenseValues}
                      configureDefaultValues={defaultConfigureLicenseNftValues}
                    />
                    <RelationshipTypeWriteAccordion defaultValues={defaultIPOrgId} />
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
