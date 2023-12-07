import { Suspense } from 'react';

import storyClient from '@/lib/SP';
import { Skeleton } from '@/components/ui/skeleton';

import IPOrgBreadcrumbs, { Fallback as FallbackBreadcrumbs } from '../IPOrgBreadcrumbs';
import IPOrgDetailCard, { Fallback as IPOrgDetailCardFallback } from '../IPOrgDetailCard';
import IPOrgStatsCard from '../IPOrgStatsCard';

import bannerFallbackImg from '@/assets/franchise-banner-fallback.jpg';
import { GetIPOrgRequest } from '@story-protocol/core-sdk';
import { CreateIpaForm } from './CreateIpaForm';

const PageTitle = async ({ ipOrgId }: { ipOrgId: string }) => {
  if (!ipOrgId) return null;

  const getReq: GetIPOrgRequest = {
    ipOrgId: ipOrgId,
  };
  const { ipOrg } = await storyClient.ipOrg.get(getReq);
  return <h1 className="font-medium text-xl md:text-3xl text-white md:mb-2">{ipOrg!.name}</h1>;
};

export default function CreateIpaPage({ params: { ipOrgId } }: { params: { ipOrgId: string } }) {
  return (
    <div className="">
      <div className="relative w-full h-[32rem] bg-slate-500 mx-auto">
        <img src={bannerFallbackImg.src} alt="IP Org image" className="absolute w-full h-full object-cover" />
        <div className="absolute w-full bottom-0 left-0 right-0 h-4/5 bg-gradient-to-t from-[rgba(0,0,0,0.7)] via-[rgba(0,0,0,0.5)] to-transparent"></div>
      </div>
      <div className="relative w-full px-4 md:px-8 max-w-[1600px] -mt-48 mx-auto">
        <div className="flex w-full justify-between items-center mb-4">
          <div className="flex flex-col">
            <Suspense fallback={<Skeleton className="h-7 mt-1 w-56 mb-5" />}>
              <PageTitle ipOrgId={ipOrgId} />
            </Suspense>
            <Suspense fallback={<FallbackBreadcrumbs />}>{ipOrgId && <IPOrgBreadcrumbs ipOrgId={ipOrgId} />}</Suspense>
          </div>
          <button className="bg-sp-purple hover:bg-sp-purple-dark py-2 px-4 md:px-6 rounded-3xl text-white text-xs md:text-base shadow-sm">
            Create New IPA
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-8">
          <Suspense fallback={<IPOrgDetailCardFallback />}>
            <IPOrgDetailCard ipOrgId={ipOrgId} />
          </Suspense>
          <IPOrgStatsCard ipOrgId={ipOrgId} />
        </div>

        <div className="grid grid-cols-12 gap-2">
          <div className="flex col-span-12">
            <div className="w-full">
              <div className="p-5 bg-white w-full rounded-lg border bg-card text-card-foreground shadow-sm mx-auto">
                <h1 className=" text-2xl font-semibold">Create IPA</h1>
                <div className="pb-12">
                  <CreateIpaForm ipOrgId={ipOrgId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
