import { Royalty, RESOURCE_TYPE } from '@/lib/server/types';
import { listResource } from '@/lib/server/sdk';
import RoyaltyDataViewerComponent from './RoyaltyDataViewerComponent';

export default async function RoyaltyDataViewerWrapper({ royaltyPolicy, ipId, ...params }: any) {
  const listReq = {
    pagination: {
      limit: 1000,
      offset: 0,
    },
    where: {
      // tokenContract: collectionId as Address,
      ipId: ipId,
      royaltyPolicy,
    },
  };

  const royaltyListRes = await listResource(RESOURCE_TYPE.ROYALTY, listReq);

  let royaltyData: Royalty[] = royaltyListRes.data;

  if (!royaltyData.length) {
    return <div className="w-full pt-8 text-center text-gray-500">No Royalty data found</div>;
  }

  return <RoyaltyDataViewerComponent data={royaltyData} {...params} />;
}
