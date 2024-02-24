import storyClient from '@/lib/SP';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight } from 'lucide-react';

export const Fallback = () => (
  <div className="flex h-6 md:mb-2 items-center">
    <Skeleton className="h-4 w-[100px] bg-gray-500" />
    <ChevronRight className="inline-block w-4 h-4 mx-1 text-gray-500" />
    <Skeleton className="h-4 w-[100px] bg-gray-500" />
  </div>
);

export default async function AssetBreadcrumbs({ ipAssetId }: { ipAssetId: string; ipOrgId: string }) {
  // const getReq: GetIpAssetRequest = {
  //   ipAssetId,
  // };
  // const getRes: GetIpAssetResponse = await storyClient.ipAsset.get(getReq);
  // const ipAsset: IPAsset = getRes.ipAsset;
  return <Breadcrumbs crumbs={[{ url: '/assets', name: 'IP Assets' }, { name: '' }]} className="md:mb-2" />;
}
