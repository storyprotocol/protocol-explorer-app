import storyClient from '@/lib/SP';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight } from 'lucide-react';
import { GetIPOrgRequest, GetIPOrgResponse } from '@story-protocol/core-sdk';

export const Fallback = () => (
  <div className="flex h-6 md:mb-2 items-center">
    <Skeleton className="h-4 w-[100px] bg-white" />
    <ChevronRight className="inline-block w-4 h-4 mx-1 text-white" />
    <Skeleton className="h-4 w-[100px] bg-white" />
  </div>
);

export default async function IPOrgBreadcrumbs({ ipOrgId }: { ipOrgId: string }) {
  const ipOrgGetReq: GetIPOrgRequest = {
    ipOrgId: ipOrgId,
  };
  const ipOrgGetRes: GetIPOrgResponse = await storyClient.ipOrg.get(ipOrgGetReq);
  const ipOrg = ipOrgGetRes.ipOrg;

  if (!ipOrg) {
    console.log('NO IPOrg found for id: ' + ipOrgId);
    return <Fallback />;
  }

  return (
    <Breadcrumbs
      crumbs={[{ url: '/ipo', name: 'IPA Organization' }, { name: ipOrg.name }]}
      className="md:mb-2 text-white text-xs md:text-lg"
    />
  );
}
